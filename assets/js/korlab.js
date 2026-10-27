// Laboratório KOR: prova da estratégia com dados reais, igual no navegador e no Node.
//
// Protocolo fixado antes de ver os resultados:
//   - período de ajuste: até 31/12/2024; período cego: de 01/01/2025 em diante (roda uma vez);
//   - custos: taxa 0,05% por lado, escorregão 0,02% nas saídas a mercado/stop, funding 0,01%/8h;
//   - uma operação por ativo de cada vez;
//   - comparação com entradas aleatórias (mesmo ativo, lado, distância de stop, alvo e gestão);
//   - aprovação no período cego: >= 150 operações, expectativa > 0, profit factor > 1,3,
//     maioria dos ativos positiva e melhor que o aleatório (intervalo de 95% da diferença acima de 0).

import { aggregate, korSetups, simulateKor, mirrorCandles, KOR_DEFAULTS } from './kor.js?v=2026.10.27-0007';

export const CUT = Date.UTC(2025, 0, 1);
export const LAB_START = Date.UTC(2022, 0, 1);
export const LAB_SYMBOLS = ['BTCUSDT', 'ETHUSDT', 'BNBUSDT', 'SOLUSDT', 'XRPUSDT', 'ADAUSDT', 'DOGEUSDT', 'AVAXUSDT',
  'LINKUSDT', 'DOTUSDT', 'LTCUSDT', 'BCHUSDT', 'ATOMUSDT', 'NEARUSDT', 'FILUSDT', 'ETCUSDT', 'TRXUSDT', 'UNIUSDT',
  'AAVEUSDT', 'XLMUSDT'];
export const TF_MS = { '15m': 900e3, '1h': 3600e3, '4h': 4 * 3600e3, '1d': 86400e3 };

const CLOSED = new Set(['perda', 'ganho', 'ganho-parcial', 'trailing', 'tempo']);

export function rng(seed) {
  let s = seed >>> 0;
  return () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 2 ** 32; };
}

export function metrics(trades) {
  const n = trades.length;
  const R = trades.map((t) => t.R);
  const sum = R.reduce((s, x) => s + x, 0);
  const gw = R.filter((x) => x > 0).reduce((s, x) => s + x, 0);
  const gl = -R.filter((x) => x <= 0).reduce((s, x) => s + x, 0);
  let cum = 0, peak = 0, dd = 0;
  for (const t of [...trades].sort((a, b) => a.exitT - b.exitT)) { cum += t.R; peak = Math.max(peak, cum); dd = Math.max(dd, peak - cum); }
  return {
    trades: n, winRate: n ? R.filter((x) => x > 0).length / n : 0,
    avgR: n ? sum / n : 0, totalR: sum, profitFactor: gl > 0 ? gw / gl : gw > 0 ? 99 : 0, maxDDR: dd,
  };
}

function bootstrapMean(a, seed, reps = 3000) {
  const r = rng(seed), out = [];
  for (let k = 0; k < reps; k++) {
    let s = 0;
    for (let i = 0; i < a.length; i++) s += a[Math.floor(r() * a.length)];
    out.push(s / a.length);
  }
  return out;
}
const q = (sorted, p) => sorted[Math.min(sorted.length - 1, Math.floor(p * sorted.length))];

export function meanCI(a, seed = 7) {
  if (!a.length) return [0, 0];
  const m = bootstrapMean(a, seed).sort((x, y) => x - y);
  return [q(m, 0.025), q(m, 0.975)];
}

export function diffCI(a, b, seed = 3) {
  if (!a.length || !b.length) return [0, 0];
  const ma = bootstrapMean(a, seed), mb = bootstrapMean(b, seed + 1);
  const d = ma.map((x, i) => x - mb[i]).sort((x, y) => x - y);
  return [q(d, 0.025), q(d, 0.975)];
}

export function monteCarloDD(a, riskPct = 1, seed = 11, reps = 3000) {
  if (!a.length) return { mediana: 0, p95: 0 };
  const r = rng(seed), dds = [];
  for (let k = 0; k < reps; k++) {
    const x = a.slice();
    for (let i = x.length - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [x[i], x[j]] = [x[j], x[i]]; }
    let eq = 1, peak = 1, dd = 0;
    for (const v of x) { eq *= 1 + riskPct / 100 * v; peak = Math.max(peak, eq); dd = Math.max(dd, 1 - eq / peak); }
    dds.push(dd);
  }
  dds.sort((u, v) => u - v);
  return { mediana: q(dds, 0.5), p95: q(dds, 0.95) };
}

const inPeriod = (periodo, t) => (periodo === 'ajuste' ? t < CUT : periodo === 'cego' ? t >= CUT : true);

// Operações KOR de um ativo e as entradas aleatórias de comparação.
export function runSymbol(symbol, base15m, { ctx = '4h', exe = '15m', periodo = 'ajuste', opts = {}, draws = 20 } = {}) {
  const o = { ...KOR_DEFAULTS, ...opts };
  const L = exe === '15m' ? base15m : aggregate(base15m, TF_MS[exe]);
  const H = aggregate(base15m, TF_MS[ctx]);
  const setups = korSetups(H, L, o);
  let busyUntil = -Infinity;
  const trades = [];
  for (const s of setups) {
    if (!inPeriod(periodo, s.confirmT) || s.confirmT <= busyUntil) continue;
    const r = s.result;
    if (r.exitT) busyUntil = r.exitT;
    if (!CLOSED.has(r.status)) continue;
    trades.push({
      symbol, side: s.side, kind: s.kind, cls: s.cls, context: s.context, rr: s.rr, riskPct: s.riskPct,
      entry: s.entry, stop: s.stop, tp1: s.tp1, R: r.R, status: r.status, confirmT: s.confirmT, exitT: r.exitT,
    });
  }
  const random = [];
  const rand = rng([...symbol].reduce((s, ch) => s * 31 + ch.charCodeAt(0), 7) >>> 0);
  const idx = [];
  for (let i = 200; i < L.length - 200; i++) if (inPeriod(periodo, L[i].T)) idx.push(i);
  const views = { long: [L, H], short: [mirrorCandles(L), mirrorCandles(H)] };
  for (const t of trades) {
    for (let d = 0; d < draws && idx.length; d++) {
      const j = idx[Math.floor(rand() * idx.length)];
      const [l, h] = views[t.side];
      const entry = l[j].c, risk = Math.abs(entry) * t.riskPct / 100;
      const res = simulateKor(l, h, { j, entry, stop: entry - risk, tp1: entry + t.rr * risk }, o);
      if (CLOSED.has(res.status)) random.push(res.R);
    }
  }
  return { symbol, setups: setups.length, trades, random, from: base15m[0]?.t, to: base15m[base15m.length - 1]?.T };
}

// Junta os ativos e monta o relatório com o veredito.
export function buildReport(results, { ctx = '4h', exe = '15m', periodo = 'ajuste', opts = {} } = {}) {
  const all = results.flatMap((r) => r.trades);
  const random = results.flatMap((r) => r.random);
  const m = metrics(all);
  const R = all.map((t) => t.R);
  const ci = meanCI(R);
  const dci = diffCI(R, random);
  const rm = metrics(random.map((x) => ({ R: x, exitT: 0 })));
  const group = (key) => Object.fromEntries([...new Set(all.map((t) => t[key]))].sort().map((v) => [v, metrics(all.filter((t) => t[key] === v))]));
  const bySymbol = Object.fromEntries(results.map((r) => [r.symbol, metrics(r.trades)]));
  const syms = Object.values(bySymbol).filter((x) => x.trades > 0);
  const positivos = syms.filter((x) => x.avgR > 0).length;
  const criterios = {
    'Pelo menos 150 operações': m.trades >= 150,
    'Expectativa positiva depois dos custos': m.avgR > 0,
    'Profit factor acima de 1,3': m.profitFactor > 1.3,
    'Maioria dos ativos positiva': syms.length > 0 && positivos > syms.length / 2,
    'Melhor que entradas aleatórias (IC 95% acima de 0)': dci[0] > 0,
  };
  const byMonth = {};
  for (const t of all) {
    const d = new Date(t.exitT);
    const k = `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, '0')}`;
    byMonth[k] = (byMonth[k] || 0) + t.R;
  }
  return {
    gerado: new Date().toISOString(), periodo, ctx, exe, parametros: { ...KOR_DEFAULTS, ...opts },
    dados: results.map((r) => ({ symbol: r.symbol, de: r.from, ate: r.to, setups: r.setups })),
    geral: m, ic95MediaR: ci, aleatorio: { trades: random.length, avgR: rm.avgR, profitFactor: rm.profitFactor }, ic95Diferenca: dci,
    porClasse: group('cls'), porTipo: group('kind'), porLado: group('side'), porContexto: group('context'), porAtivo: bySymbol,
    porMes: byMonth, ativosPositivos: `${positivos}/${syms.length}`, monteCarloDD1pct: monteCarloDD(R), criterios,
    aprovado: Object.values(criterios).every(Boolean),
    operacoes: all.sort((a, b) => a.exitT - b.exitT),
  };
}

// Variações testadas no período de ajuste, definidas a partir do diagnóstico da primeira rodada
// (alvos longe demais, stops curtos demais no 15m, custos altos) e do próprio material.
const V3 = { stopRef: 'ctx', tpMaxRR: 3 };
export const VARIANTS = [
  { id: 'v0', nome: 'Atual (v2)', opts: {} },
  { id: 'v1', nome: 'Stop com folga do tempo maior', opts: { stopRef: 'ctx' } },
  { id: 'v2', nome: 'Alvo 1 até 3R', opts: { tpMaxRR: 3 } },
  { id: 'v3', nome: 'Stop do tempo maior + alvo até 3R', opts: V3 },
  { id: 'v4', nome: 'v3 + alvo até 2R', opts: { ...V3, tpMaxRR: 2 } },
  { id: 'v5', nome: 'v3 + stop mínimo de 0,8%', opts: { ...V3, minRiskPct: 0.8 } },
  { id: 'v6', nome: 'v3 + só a favor do contexto', opts: { ...V3, onlyAligned: true } },
  { id: 'v7', nome: 'v3 + entrada no meio da perna', opts: { ...V3, entryMode: 'meio' } },
  { id: 'v8', nome: 'v3 + sem saída parcial', opts: { ...V3, partial: 0 } },
];

// Resumo de uma variação (sem a lista de operações, para comparar lado a lado).
export function variantSummary(v, results) {
  const all = results.flatMap((r) => r.trades);
  const random = results.flatMap((r) => r.random);
  const m = metrics(all);
  const bySym = results.map((r) => metrics(r.trades)).filter((x) => x.trades > 0);
  const half = (from, to) => metrics(all.filter((t) => t.exitT >= from && t.exitT < to));
  return {
    id: v.id, nome: v.nome, opts: v.opts, ...m,
    aleatorioR: random.length ? random.reduce((s, x) => s + x, 0) / random.length : 0,
    ic95Diferenca: diffCI(all.map((t) => t.R), random),
    ativosPositivos: `${bySym.filter((x) => x.avgR > 0).length}/${bySym.length}`,
    compras: metrics(all.filter((t) => t.side === 'long')).avgR,
    vendas: metrics(all.filter((t) => t.side === 'short')).avgR,
    anos: { 2022: half(Date.UTC(2022, 0, 1), Date.UTC(2023, 0, 1)).avgR, 2023: half(Date.UTC(2023, 0, 1), Date.UTC(2024, 0, 1)).avgR, 2024: half(Date.UTC(2024, 0, 1), Date.UTC(2025, 0, 1)).avgR },
  };
}
