// Price action (no estilo de Al Brooks): recuo até a média de 20 em tendência,
// candle de rejeição e entrada por rompimento da máxima do candle de sinal.
//
// COMPRA (a venda é o espelho):
//   1. Contexto: média exponencial de 20 subindo e o fechamento acima dela.
//   2. Recuo: a mínima do candle de sinal (ou do anterior) chega perto da média (até 0,2 ATR acima).
//   3. Candle de sinal:
//      - pin bar / martelo: pavio inferior >= 2× o corpo e >= 55% do candle, fechamento no terço de cima;
//      - engolfo de alta: candle de alta cujo corpo cobre o corpo de baixa anterior.
//   4. Ordem de stop 1 tick acima da máxima do candle de sinal, válida por 3 candles;
//      stop abaixo da mínima do sinal (e do anterior). Se o preço cair até o stop antes, cancela.
//   Alvo: próxima liquidez acima ou 2× o risco.

import { ema, isPivotHigh } from './indicators.js?v=2026.10.27-0007';
import { findTarget } from './engine.js?v=2026.10.27-0007';

export function pattern(cs, i) {
  const c = cs[i], p = cs[i - 1];
  const range = c.h - c.l;
  if (!(range > 0)) return null;
  const body = Math.abs(c.c - c.o);
  const lowerWick = Math.min(c.o, c.c) - c.l;
  if (lowerWick >= 2 * body && lowerWick >= 0.55 * range && c.c >= c.l + (2 / 3) * range) return 'pin';
  if (c.c > c.o && p.c < p.o && c.c >= p.o && c.o <= p.c && body > Math.abs(p.c - p.o)) return 'engolfo';
  return null;
}

export function detectPaLong(cs, o, ind) {
  const e20 = ema(cs.map((c) => c.c), 20);
  const k = o.pivot;
  const highs = [];
  const setups = [];
  for (let i = 0; i < cs.length; i++) {
    const p = i - k;
    if (p >= k && isPivotHigh(cs, p, k)) highs.push({ i: p, p: cs[p].h });
    if (i < 30) continue;
    const c = cs[i];
    const a = ind.atr[i];
    if (!(e20[i] > e20[i - 5]) || !(c.c > e20[i])) continue;
    const touch = Math.min(c.l, cs[i - 1].l) <= e20[i] + 0.2 * a;
    if (!touch) continue;
    const pat = pattern(cs, i);
    if (!pat) continue;
    const tick = Math.max(Math.abs(c.h) * 1e-4, 1e-12);
    const entry = c.h + tick;
    const stop = Math.min(c.l, cs[i - 1].l) - 0.1 * a;
    const risk = entry - stop;
    if (!(risk > 0) || risk > 3 * a) continue;
    let { target, targetIdx } = findTarget(cs, highs, i, entry + o.minRR * risk, o);
    if (target === null) { target = entry + o.minRR * risk; targetIdx = -1; }
    setups.push({
      i, entryType: 'stop', expiry: 3, entry, stop, target, targetIdx,
      rr: (target - entry) / risk,
      anchorIdx: i,
      pattern: pat,
      ema20: e20[i],
      volRatio: ind.volAvg[i] > 0 ? c.v / ind.volAvg[i] : 0,
      rsi: ind.rsi[i],
    });
  }
  return setups;
}

// Estado atual para o contexto.
export function paState(cs) {
  const e20 = ema(cs.map((c) => c.c), 20);
  const n = cs.length - 1;
  const rising = e20[n] > e20[n - 5], falling = e20[n] < e20[n - 5];
  const above = cs[n].c > e20[n];
  return {
    trend: rising && above ? 'alta' : falling && !above ? 'baixa' : 'lateral',
    ema20: e20[n],
    distAtr: null,
    lastPattern: pattern(cs, n),
  };
}
