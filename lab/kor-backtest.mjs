// Prova da Estratégia KOR no Node, com os CSVs de lab/dados (ver baixar-dados.sh).
// A mesma prova roda no navegador, na aba "Laboratório KOR" do site.
//
// Uso: node lab/kor-backtest.mjs [--ctx 4h] [--exec 15m] [--periodo ajuste|cego|tudo] [--opcao chave=valor ...]

import { readFileSync, readdirSync, writeFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { runSymbol, buildReport, TF_MS } from '../assets/js/korlab.js';

const DIR = new URL('.', import.meta.url).pathname;
const args = process.argv.slice(2);
const arg = (k, d) => { const i = args.indexOf(k); return i >= 0 ? args[i + 1] : d; };
const ctx = arg('--ctx', '4h'), exe = arg('--exec', '15m'), periodo = arg('--periodo', 'ajuste');
const opts = {};
args.forEach((a, i) => {
  if (a === '--opcao') { const [k, v] = args[i + 1].split('='); opts[k] = Number.isNaN(Number(v)) ? v : Number(v); }
});

function load(file) {
  const cs = [];
  for (const r of readFileSync(file, 'utf8').trim().split('\n')) {
    const [t, op, h, l, c, v] = r.split(',').map(Number);
    if (!Number.isFinite(t)) continue;
    const ms = t > 1e14 ? Math.floor(t / 1000) : t; // arquivos novos vêm em microssegundos
    cs.push({ t: ms, T: ms + TF_MS['15m'] - 1, o: op, h, l, c, v });
  }
  cs.sort((a, b) => a.t - b.t);
  return cs.filter((c, i) => i === 0 || c.t !== cs[i - 1].t);
}

const files = readdirSync(join(DIR, 'dados')).filter((f) => f.endsWith('-15m.csv')).sort();
if (!files.length) { console.error('Sem dados em lab/dados. Rode: bash lab/baixar-dados.sh'); process.exit(1); }
const cfg = { ctx, exe, periodo, opts };
const results = [];
for (const f of files) {
  const r = runSymbol(f.replace('-15m.csv', ''), load(join(DIR, 'dados', f)), cfg);
  results.push(r);
  console.error(`${r.symbol}: ${r.setups} setups, ${r.trades.length} operações`);
}
const rep = buildReport(results, cfg);
mkdirSync(join(DIR, 'resultados'), { recursive: true });
writeFileSync(join(DIR, 'resultados', `kor-${ctx}-${exe}-${periodo}.json`), JSON.stringify(rep, null, 1));

const m = rep.geral, pct = (x) => (x * 100).toFixed(1) + '%';
console.log(`\nKOR ${ctx}→${exe} | período: ${periodo}`);
console.log(`operações ${m.trades} | acerto ${pct(m.winRate)} | média ${m.avgR.toFixed(3)}R (IC95 ${rep.ic95MediaR.map((x) => x.toFixed(3)).join(' a ')}) | PF ${m.profitFactor.toFixed(2)} | total ${m.totalR.toFixed(1)}R | DD ${m.maxDDR.toFixed(1)}R`);
console.log(`aleatório: média ${rep.aleatorio.avgR.toFixed(3)}R | diferença IC95 ${rep.ic95Diferenca.map((x) => x.toFixed(3)).join(' a ')}`);
console.log(`ativos positivos ${rep.ativosPositivos} | Monte Carlo DD (1%/op): mediana ${pct(rep.monteCarloDD1pct.mediana)}, pior 5% ${pct(rep.monteCarloDD1pct.p95)}`);
for (const [k, v] of Object.entries({ ...rep.porClasse, ...rep.porTipo })) console.log(`  ${k}: ${v.trades} op, ${v.avgR.toFixed(3)}R, PF ${v.profitFactor.toFixed(2)}`);
for (const [k, v] of Object.entries(rep.criterios)) console.log(`  [${v ? 'ok' : '  '}] ${k}`);
