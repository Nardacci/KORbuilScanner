// Prova da Estratégia KOR com dados reais (lab/dados/<ATIVO>-15m.csv, ver baixar-dados.sh).
//
// Protocolo fixado antes de ver os resultados:
//   - período de ajuste: até 31/12/2024; período cego: de 01/01/2025 em diante (roda uma vez);
//   - custos: taxa 0,05% por lado, escorregão 0,02% nas saídas a mercado/stop, funding 0,01%/8h;
//   - uma operação por ativo de cada vez;
//   - comparação com entradas aleatórias (mesmo ativo, lado, distância de stop, alvo e gestão);
//   - aprovação no período cego: >= 150 operações, expectativa > 0, profit factor > 1,3,
//     maioria dos ativos positiva, melhor que o aleatório (intervalo de 95% da diferença acima de 0).
//
// Uso: node lab/kor-backtest.mjs [--ctx 4h] [--exec 15m] [--periodo ajuste|cego|tudo] [--opcao chave=valor ...]

import { readFileSync, readdirSync, writeFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { aggregate, korSetups, simulateKor, mirrorCandles, KOR_DEFAULTS } from '../assets/js/kor.js';

const DIR = new URL('.', import.meta.url).pathname;
const CUT = Date.UTC(2025, 0, 1);
const MS = { '5m': 300e3, '15m': 900e3, '1h': 3600e3, '4h': 4 * 3600e3, '1d': 86400e3 };

const args = process.argv.slice(2);
const arg = (k, d) => { const i = args.indexOf(k); return i >= 0 ? args[i + 1] : d; };
const ctx = arg('--ctx', '4h'), exe = arg('--exec', '15m'), periodo = arg('--periodo', 'ajuste');
const opts = {};
args.forEach((a, i) => {
  if (a === '--opcao') { const [k, v] = args[i + 1].split('='); opts[k] = Number.isNaN(Number(v)) ? v : Number(v); }
});
const o = { ...KOR_DEFAULTS, ...opts };

function load(file) {
  const rows = readFileSync(file, 'utf8').trim().split('\n');
  const cs = [];
  for (const r of rows) {
    const [t, op, h, l, c, v] = r.split(',').map(Number);
    if (!Number.isFinite(t)) continue;
    const ms = t > 1e14 ? Math.floor(t / 1000) : t; // arquivos novos vêm em microssegundos
    cs.push({ t: ms, T: ms + MS['15m'] - 1, o: op, h, l, c, v });
  }
  cs.sort((a, b) => a.t - b.t);
  return cs.filter((c, i) => i === 0 || c.t !== cs[i - 1].t);
}

// Gerador aleatório com semente (resultados reproduzíveis).
function rng(seed) {
  let s = seed >>> 0;
  return () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 2 ** 32; };
}

const CLOSED = new Set(['perda', 'ganho', 'ganho-parcial', 'trailing', 'tempo']);

function inPeriod(t) {
  if (periodo === 'ajuste') return t < CUT;
  if (periodo === 'cego') return t >= CUT;
  return true;
}

function metrics(trades) {
  const n = trades.length;
  const R = trades.map((t) => t.R);
  const sum = R.reduce((s, x) => s + x, 0);
  const gw = R.filter((x) => x > 0).reduce((s, x) => s + x, 0);
  const gl = -R.filter((x) => x <= 0).reduce((s, x) => s + x, 0);
  let cum = 0, peak = 0, dd = 0;
  for (const t of [...trades].sort((a, b) => a.exitT - b.exitT)) { cum += t.R; peak = Math.max(peak, cum); dd = Math.max(dd, peak - cum); }
  return {
    trades: n, winRate: n ? R.filter((x) => x > 0).length / n : 0,
    avgR: n ? sum / n : 0, totalR: sum, profitFactor: gl > 0 ? gw / gl : gw > 0 ? Infinity : 0, maxDDR: dd,
  };
}

function bootstrapMeanCI(xs, seed = 7, reps = 4000) {
  if (!xs.length) return [0, 0];
  const r = rng(seed), means = [];
  for (let k = 0; k < reps; k++) {
    let s = 0;
    for (let i = 0; i < xs.length; i++) s += xs[Math.floor(r() * xs.length)];
    means.push(s / xs.length);
  }
  means.sort((a, b) => a - b);
  return [means[Math.floor(0.025 * reps)], means[Math.floor(0.975 * reps)]];
}

function monteCarloDD(xs, seed = 11, reps = 4000, riskPct = 1) {
  const r = rng(seed), dds = [];
  for (let k = 0; k < reps; k++) {
    const a = xs.slice();
    for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
    let eq = 1, peak = 1, dd = 0;
    for (const x of a) { eq *= 1 + riskPct / 100 * x; peak = Math.max(peak, eq); dd = Math.max(dd, 1 - eq / peak); }
    dds.push(dd);
  }
  dds.sort((a, b) => a - b);
  return { mediana: dds[Math.floor(0.5 * reps)], p95: dds[Math.floor(0.95 * reps)] };
}

const files = readdirSync(join(DIR, 'dados')).filter((f) => f.endsWith('-15m.csv')).sort();
if (!files.length) { console.error('Sem dados em lab/dados. Rode: bash lab/baixar-dados.sh'); process.exit(1); }

const all = [], random = [];
const bySymbol = {};
for (const f of files) {
  const sym = f.replace('-15m.csv', '');
  const base = load(join(DIR, 'dados', f));
  if (base.length < 5000) continue;
  const L = exe === '15m' ? base : aggregate(base, MS[exe]);
  const H = aggregate(base, MS[ctx]);
  const setups = korSetups(H, L, o);
  let busyUntil = -Infinity;
  const trades = [];
  for (const s of setups) {
    if (!inPeriod(s.confirmT) || s.confirmT <= busyUntil) continue;
    const r = s.result;
    if (r.exitT) busyUntil = r.exitT;
    if (!CLOSED.has(r.status)) continue;
    trades.push({ symbol: sym, side: s.side, kind: s.kind, cls: s.cls, rr: s.rr, riskPct: s.riskPct, R: r.R, status: r.status, confirmT: s.confirmT, exitT: r.exitT });
  }
  // Aleatório: mesmas condições, entrada em um candle sorteado do mesmo período.
  const rand = rng(f.length * 7919 + 13);
  const idx = L.map((c, i) => (inPeriod(c.T) ? i : -1)).filter((i) => i > 200 && i < L.length - 200);
  const mirrored = { long: [L, H], short: [mirrorCandles(L), mirrorCandles(H)] };
  for (const t of trades) {
    for (let d = 0; d < 20 && idx.length; d++) {
      const j = idx[Math.floor(rand() * idx.length)];
      const [l, h] = mirrored[t.side];
      const entry = l[j].c, risk = Math.abs(entry) * t.riskPct / 100;
      const res = simulateKor(l, h, { j, entry, stop: entry - risk, tp1: entry + t.rr * risk }, o);
      if (CLOSED.has(res.status)) random.push({ symbol: sym, R: res.R });
    }
  }
  all.push(...trades);
  bySymbol[sym] = metrics(trades);
  console.error(`${sym}: ${setups.length} setups, ${trades.length} operações, média ${bySymbol[sym].avgR.toFixed(3)}R`);
}

const m = metrics(all);
const ci = bootstrapMeanCI(all.map((t) => t.R));
const rm = metrics(random);
const diffCI = (() => {
  const r = rng(3), reps = 4000, ds = [];
  const a = all.map((t) => t.R), b = random.map((t) => t.R);
  if (!a.length || !b.length) return [0, 0];
  for (let k = 0; k < reps; k++) {
    let sa = 0, sb = 0;
    for (let i = 0; i < a.length; i++) sa += a[Math.floor(r() * a.length)];
    for (let i = 0; i < b.length; i++) sb += b[Math.floor(r() * b.length)];
    ds.push(sa / a.length - sb / b.length);
  }
  ds.sort((x, y) => x - y);
  return [ds[Math.floor(0.025 * reps)], ds[Math.floor(0.975 * reps)]];
})();
const group = (key) => Object.fromEntries([...new Set(all.map((t) => t[key]))].sort().map((v) => [v, metrics(all.filter((t) => t[key] === v))]));
const syms = Object.values(bySymbol).filter((x) => x.trades > 0);
const positivos = syms.filter((x) => x.avgR > 0).length;
const mc = monteCarloDD(all.map((t) => t.R));

const criterios = {
  'operações >= 150': m.trades >= 150,
  'expectativa > 0': m.avgR > 0,
  'profit factor > 1,3': m.profitFactor > 1.3,
  'maioria dos ativos positiva': positivos > syms.length / 2,
  'melhor que o aleatório (IC 95% > 0)': diffCI[0] > 0,
};

const report = {
  periodo, ctx, exe, parametros: o, geral: m, ic95MediaR: ci, aleatorio: rm, ic95Diferenca: diffCI,
  porClasse: group('cls'), porTipo: group('kind'), porLado: group('side'), porAtivo: bySymbol,
  ativosPositivos: `${positivos}/${syms.length}`, monteCarloDD1pct: mc, criterios,
  aprovado: periodo === 'cego' ? Object.values(criterios).every(Boolean) : null,
};
mkdirSync(join(DIR, 'resultados'), { recursive: true });
const name = `kor-${ctx}-${exe}-${periodo}`;
writeFileSync(join(DIR, 'resultados', `${name}.json`), JSON.stringify(report, null, 1));
const pct = (x) => (x * 100).toFixed(1) + '%';
console.log(`\nKOR ${ctx}→${exe} | período: ${periodo}`);
console.log(`operações ${m.trades} | acerto ${pct(m.winRate)} | média ${m.avgR.toFixed(3)}R (IC95 ${ci[0].toFixed(3)} a ${ci[1].toFixed(3)}) | PF ${m.profitFactor.toFixed(2)} | total ${m.totalR.toFixed(1)}R | DD ${m.maxDDR.toFixed(1)}R`);
console.log(`aleatório: média ${rm.avgR.toFixed(3)}R | diferença IC95 ${diffCI[0].toFixed(3)} a ${diffCI[1].toFixed(3)}`);
console.log(`ativos positivos ${positivos}/${syms.length} | Monte Carlo DD (1% por operação): mediana ${pct(mc.mediana)}, pior 5% ${pct(mc.p95)}`);
for (const [k, v] of Object.entries(report.porClasse)) console.log(`  classe ${k}: ${v.trades} op, ${v.avgR.toFixed(3)}R, PF ${v.profitFactor.toFixed(2)}`);
for (const [k, v] of Object.entries(report.porTipo)) console.log(`  ${k}: ${v.trades} op, ${v.avgR.toFixed(3)}R, PF ${v.profitFactor.toFixed(2)}`);
for (const [k, v] of Object.entries(criterios)) console.log(`  [${v ? 'ok' : '  '}] ${k}`);
