// Registro dos métodos de análise. Cada método fornece um detector de compras
// (as vendas saem dos candles espelhados) e usa a mesma simulação e o mesmo backtest.

import { analyze, detectSmcLong, runDetector } from './engine.js?v=2026.10.27-0013';
import { detectDowLong } from './dow.js?v=2026.10.27-0013';
import { detectOndaLong } from './onda34.js?v=2026.10.27-0013';
import { detectIchimokuLong } from './ichimoku.js?v=2026.10.27-0013';
import { detectPaLong } from './priceaction.js?v=2026.10.27-0013';
import { detectIctLong } from './ict.js?v=2026.10.27-0013';

export const METHODS = {
  smc: { id: 'smc', letter: 'S', name: 'SMC + Wyckoff', short: 'SMC', detector: detectSmcLong },
  dow: { id: 'dow', letter: 'D', name: 'Teoria de Dow', short: 'Dow', detector: detectDowLong },
  onda34: { id: 'onda34', letter: 'O', name: 'Onda 34 (Raghee Horner)', short: 'Onda', detector: detectOndaLong },
  pa: { id: 'pa', letter: 'P', name: 'Price action', short: 'PA', detector: detectPaLong },
  ichimoku: { id: 'ichimoku', letter: 'I', name: 'Ichimoku', short: 'Ichimoku', detector: detectIchimokuLong },
  ict: { id: 'ict', letter: 'C', name: 'ICT (confluência)', short: 'ICT', detector: detectIctLong },
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
