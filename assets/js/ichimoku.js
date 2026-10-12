// Ichimoku Kinko Hyo (parâmetros 9, 26, 52).
//   Tenkan = meio da faixa de 9 candles; Kijun = meio da faixa de 26;
//   Senkou A = (Tenkan + Kijun) / 2 e Senkou B = meio da faixa de 52, projetados 26 candles à frente (a nuvem);
//   Chikou = fechamento atual comparado com o preço de 26 candles atrás.
// A nuvem "de hoje" foi calculada 26 candles atrás, então nada aqui olha o futuro.
//
// Sinais de COMPRA (a venda é o espelho):
//   - Rompimento da nuvem: fecha acima da nuvem pela primeira vez, com Tenkan > Kijun,
//     Chikou acima da máxima de 26 candles atrás e nuvem futura de alta (Senkou A > Senkou B).
//   - Recuo na Kijun: já acima da nuvem e com Tenkan > Kijun, a mínima toca a Kijun
//     e o candle fecha de volta acima dela.
// Entrada no fechamento; stop abaixo da Kijun ou da mínima recente (o mais baixo);
// alvo na próxima liquidez ou 3× o risco. Saída antecipada: fechamento abaixo da Kijun.

import { isPivotHigh } from './indicators.js';
import { findTarget } from './engine.js';

const SHIFT = 26;

function mid(cs, n) {
  const out = new Array(cs.length).fill(NaN);
  for (let i = n - 1; i < cs.length; i++) {
    let hi = -Infinity, lo = Infinity;
    for (let t = i - n + 1; t <= i; t++) { hi = Math.max(hi, cs[t].h); lo = Math.min(lo, cs[t].l); }
    out[i] = (hi + lo) / 2;
  }
  return out;
}

// Linhas calculadas no próprio candle. A nuvem visível no candle i usa spanA[i-26] e spanB[i-26].
export function ichimoku(cs) {
  const tenkan = mid(cs, 9), kijun = mid(cs, 26), b = mid(cs, 52);
  const spanA = tenkan.map((t, i) => (t + kijun[i]) / 2);
  return { tenkan, kijun, spanA, spanB: b };
}

export const cloudAt = (ich, i) => {
  const j = i - SHIFT;
  if (j < 0 || Number.isNaN(ich.spanA[j]) || Number.isNaN(ich.spanB[j])) return null;
  return { top: Math.max(ich.spanA[j], ich.spanB[j]), bottom: Math.min(ich.spanA[j], ich.spanB[j]) };
};

export function detectIchimokuLong(cs, o, ind) {
  const ich = ichimoku(cs);
  const k = o.pivot;
  const highs = [];
  const setups = [];
  let lastSignal = -Infinity;
  for (let i = 0; i < cs.length; i++) {
    const p = i - k;
    if (p >= k && isPivotHigh(cs, p, k)) highs.push({ i: p, p: cs[p].h });
    if (i < 52 + SHIFT + 1) continue;
    const c = cs[i];
    const cloud = cloudAt(ich, i), prevCloud = cloudAt(ich, i - 1);
    if (!cloud || !prevCloud) continue;
    const tk = ich.tenkan[i] > ich.kijun[i];
    const chikouFree = c.c > cs[i - SHIFT].h;
    const futureBull = ich.spanA[i] > ich.spanB[i];
    let trigger = null;
    if (c.c > cloud.top && cs[i - 1].c <= prevCloud.top && tk && chikouFree && futureBull) trigger = 'nuvem';
    else if (c.c > cloud.top && tk && c.l <= ich.kijun[i] && c.c > ich.kijun[i] && cs[i - 1].c > ich.kijun[i - 1]) trigger = 'kijun';
    if (!trigger || i - lastSignal < 5) continue;
    const a = ind.atr[i];
    const entry = c.c;
    const recentLow = Math.min(cs[i].l, cs[i - 1].l, cs[i - 2].l);
    const stop = Math.min(ich.kijun[i], recentLow) - 0.1 * a;
    const risk = entry - stop;
    if (!(risk > 0) || risk > 4 * a) continue;
    let { target, targetIdx } = findTarget(cs, highs, i, entry + o.minRR * risk, o);
    if (target === null) { target = entry + Math.max(o.minRR, 3) * risk; targetIdx = -1; }
    lastSignal = i;
    setups.push({
      i, market: true, entry, stop, target, targetIdx,
      rr: (target - entry) / risk,
      anchorIdx: i,
      trigger,
      tenkan: ich.tenkan[i], kijun: ich.kijun[i], cloudTop: cloud.top, cloudBottom: cloud.bottom,
      chikouFree, futureBull,
      exitLevels: ich.kijun, exitStatus: 'kijun', // sai quando fechar abaixo da Kijun
      volRatio: ind.volAvg[i] > 0 ? c.v / ind.volAvg[i] : 0,
      rsi: ind.rsi[i],
    });
  }
  return setups;
}

// Estado atual para o contexto.
export function ichimokuState(cs) {
  const ich = ichimoku(cs);
  const n = cs.length - 1;
  const cloud = cloudAt(ich, n);
  const c = cs[n].c;
  return {
    pos: !cloud ? 'sem dados' : c > cloud.top ? 'acima' : c < cloud.bottom ? 'abaixo' : 'dentro',
    tk: ich.tenkan[n] > ich.kijun[n] ? 'acima' : 'abaixo',
    chikou: n >= SHIFT ? (c > cs[n - SHIFT].h ? 'acima' : c < cs[n - SHIFT].l ? 'abaixo' : 'dentro') : 'sem dados',
    futureBull: ich.spanA[n] > ich.spanB[n],
    kijun: ich.kijun[n],
    cloud,
  };
}
