// Teoria de Dow: tendência de alta = topos e fundos ascendentes.
//
// Sinal de COMPRA (a venda é o espelho, com os candles invertidos):
//   1. Dois fundos confirmados, o mais recente acima do anterior (fundo mais alto).
//   2. O preço fecha acima do topo que ficou entre esses dois fundos:
//      agora há topo e fundo ascendentes, a tendência de alta está confirmada.
//   3. Entrada a mercado no fechamento desse candle; stop abaixo do fundo mais alto;
//      alvo na próxima liquidez acima ou, se não houver, 3× o risco.
//   Saída antecipada: fechamento abaixo de um fundo novo formado depois da entrada
//   (a sequência de fundos ascendentes se desfez).
// O volume acima da média no rompimento é a "confirmação pelo volume" de Dow e soma pontos.

import { isPivotHigh, isPivotLow } from './indicators.js';
import { findTarget } from './engine.js';

export function detectDowLong(cs, o, ind) {
  const k = o.pivot;
  const highs = [], lows = [];
  const used = new Set(); // cada topo só gera um sinal
  const setups = [];
  for (let i = 0; i < cs.length; i++) {
    const p = i - k;
    if (p >= k) {
      if (isPivotHigh(cs, p, k)) highs.push({ i: p, p: cs[p].h });
      if (isPivotLow(cs, p, k)) lows.push({ i: p, p: cs[p].l });
    }
    if (lows.length < 2) continue;
    const L2 = lows[lows.length - 1], L1 = lows[lows.length - 2];
    if (!(L2.p > L1.p)) continue;
    let H = null;
    for (let h = highs.length - 1; h >= 0 && highs[h].i > L1.i; h--) {
      if (highs[h].i < L2.i && (!H || highs[h].p > H.p)) H = highs[h];
    }
    if (!H || used.has(H.i)) continue;
    const c = cs[i];
    if (!(c.c > H.p)) continue;
    used.add(H.i);
    // O fundo mais alto não pode ter sido perdido depois de formado.
    let broken = false;
    for (let t = L2.i + 1; t <= i; t++) if (cs[t].l < L2.p) { broken = true; break; }
    const a = ind.atr[i];
    if (broken || c.c - H.p > 1.5 * a) continue; // rompimento antigo ou esticado demais
    const entry = c.c;
    const stop = L2.p - 0.1 * a;
    const risk = entry - stop;
    if (!(risk > 0) || risk > 4 * a) continue;
    let { target, targetIdx } = findTarget(cs, highs, i, entry + o.minRR * risk, o);
    if (target === null) { target = entry + Math.max(o.minRR, 3) * risk; targetIdx = -1; }
    setups.push({
      i, market: true, entry, stop, target, targetIdx,
      rr: (target - entry) / risk,
      anchorIdx: L2.i,
      exitOnStructure: true, // sai se perder (no fechamento) um fundo formado depois da entrada
      swingL1: { i: L1.i, p: L1.p }, swingH: { i: H.i, p: H.p }, swingL2: { i: L2.i, p: L2.p },
      volRatio: ind.volAvg[i] > 0 ? c.v / ind.volAvg[i] : 0,
      rsi: ind.rsi[i],
    });
  }
  return setups;
}

// Leitura de Dow para o contexto: os dois últimos topos e fundos confirmados.
export function dowState(cs, k) {
  const highs = [], lows = [];
  for (let p = k; p < cs.length - k; p++) {
    if (isPivotHigh(cs, p, k)) highs.push(cs[p].h);
    if (isPivotLow(cs, p, k)) lows.push(cs[p].l);
  }
  if (highs.length < 2 || lows.length < 2) return { trend: 'indefinida', highs, lows };
  const hh = highs.at(-1) > highs.at(-2), hl = lows.at(-1) > lows.at(-2);
  const trend = hh && hl ? 'alta' : !hh && !hl ? 'baixa' : 'indefinida';
  return { trend, hh, hl, lastHighs: highs.slice(-2), lastLows: lows.slice(-2) };
}
