// Registro dos métodos de análise. Cada método fornece um detector de compras
// (as vendas saem dos candles espelhados) e usa a mesma simulação e o mesmo backtest.

import { analyze, detectSmcLong, runDetector } from './engine.js';
import { detectDowLong } from './dow.js';
import { detectOndaLong } from './onda34.js';

export const METHODS = {
  smc: { id: 'smc', name: 'SMC + Wyckoff', short: 'SMC', detector: detectSmcLong },
  dow: { id: 'dow', name: 'Teoria de Dow', short: 'Dow', detector: detectDowLong },
  onda34: { id: 'onda34', name: 'Onda 34 (Raghee Horner)', short: 'Onda', detector: detectOndaLong },
};
export const METHOD_IDS = Object.keys(METHODS);

export function detectWith(method, cs, opts, htfTrendAt) {
  return runDetector(cs, opts, htfTrendAt, METHODS[method].detector, method);
}

// Análise de um ativo com todos os métodos de uma vez (mesmos candles).
export function analyzeAll(cs, htf, opts) {
  const detectors = Object.fromEntries(METHOD_IDS.map((id) => [id, METHODS[id].detector]));
  return analyze(cs, htf, opts, detectors);
}

// Consenso: quantos métodos têm setup ativo de compra e de venda.
export function consensus(all) {
  const out = { long: [], short: [] };
  for (const id of METHOD_IDS) {
    const a = all.methods[id].active;
    if (a) out[a.side].push(id);
  }
  return out;
}
