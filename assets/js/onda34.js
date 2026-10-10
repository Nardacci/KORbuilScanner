// Onda 34 da Raghee Horner: três médias exponenciais de 34 períodos
// (máximas, fechamentos e mínimas) e os candles GRaB:
//   verde = fechou acima da onda, vermelho = abaixo, azul = dentro (ficar de fora).
//
// Sinal de COMPRA (a venda é o espelho):
//   1. Tendência de alta: onda subindo e a maioria dos últimos 20 fechamentos acima do meio dela.
//   2. Recuo: o preço tocou a onda nos últimos 3 candles sem fechar abaixo dela.
//   3. Retomada: o primeiro candle verde depois do recuo. Entrada a mercado no fechamento,
//      stop abaixo da mínima do recuo (ou da onda), alvo na próxima liquidez ou 3× o risco.

import { ema, isPivotHigh } from './indicators.js';
import { findTarget } from './engine.js';

export function waves(cs) {
  return {
    hi: ema(cs.map((c) => c.h), 34),
    mid: ema(cs.map((c) => c.c), 34),
    lo: ema(cs.map((c) => c.l), 34),
  };
}

// Cor GRaB de cada candle: 'g' verde, 'r' vermelho, 'b' azul, null sem dados.
export function grab(cs, w = waves(cs)) {
  return cs.map((c, i) => (Number.isNaN(w.hi[i]) ? null : c.c > w.hi[i] ? 'g' : c.c < w.lo[i] ? 'r' : 'b'));
}

export function detectOndaLong(cs, o, ind) {
  const w = waves(cs);
  const k = o.pivot;
  const highs = [];
  const setups = [];
  for (let i = 0; i < cs.length; i++) {
    const p = i - k;
    if (p >= k && isPivotHigh(cs, p, k)) highs.push({ i: p, p: cs[p].h });
    if (i < 60) continue;
    const c = cs[i];
    const green = c.c > w.hi[i];
    const prevGreen = cs[i - 1].c > w.hi[i - 1];
    if (!green || prevGreen) continue;
    const rising = w.mid[i] > w.mid[i - 10] && w.lo[i] > w.lo[i - 10];
    let above = 0;
    for (let t = i - 19; t <= i; t++) if (cs[t].c > w.mid[t]) above++;
    if (!rising || above < 14) continue;
    let touched = false, held = true, lowIdx = i;
    for (let t = i - 3; t < i; t++) if (cs[t].l <= w.hi[t]) touched = true;
    for (let t = i - 5; t <= i; t++) {
      if (cs[t].c < w.lo[t]) held = false;
      if (cs[t].l < cs[lowIdx].l) lowIdx = t;
    }
    if (!touched || !held) continue;
    const a = ind.atr[i];
    const entry = c.c;
    const stop = Math.min(cs[lowIdx].l, w.lo[i]) - 0.1 * a;
    const risk = entry - stop;
    if (!(risk > 0) || risk > 4 * a) continue;
    let { target, targetIdx } = findTarget(cs, highs, i, entry + o.minRR * risk, o);
    if (target === null) { target = entry + Math.max(o.minRR, 3) * risk; targetIdx = -1; }
    setups.push({
      i, market: true, entry, stop, target, targetIdx,
      rr: (target - entry) / risk,
      anchorIdx: lowIdx,
      pullbackIdx: lowIdx,
      waveHi: w.hi[i], waveLo: w.lo[i],
      volRatio: ind.volAvg[i] > 0 ? c.v / ind.volAvg[i] : 0,
      rsi: ind.rsi[i],
    });
  }
  return setups;
}

// Estado atual da onda para o contexto.
export function ondaState(cs) {
  const w = waves(cs);
  const n = cs.length - 1;
  const colors = grab(cs, w);
  const last = colors.slice(-10);
  const slope = w.mid[n] > w.mid[n - 10] ? 'subindo' : w.mid[n] < w.mid[n - 10] ? 'caindo' : 'plana';
  return {
    color: colors[n],
    slope,
    counts: { g: last.filter((x) => x === 'g').length, r: last.filter((x) => x === 'r').length, b: last.filter((x) => x === 'b').length },
    hi: w.hi[n], lo: w.lo[n],
  };
}
