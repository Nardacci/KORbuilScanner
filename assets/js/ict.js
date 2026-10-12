// ICT / SMC por confluência: contexto (estrutura de Dow), local (zona de demanda na metade
// barata do impulso), gatilho (mudança de estrutura interna dentro da zona) e alvo (liquidez oposta).
//
// COMPRA (a venda é o espelho, com os candles invertidos):
//   1. Um impulso de alta rompe um topo confirmado (BOS). Ele deixa duas possíveis zonas de demanda:
//      o order block (último candle de baixa no começo do impulso) e o maior FVG do impulso.
//   2. Local: o preço volta até a zona sem fechar abaixo dela. A zona precisa estar na metade de
//      baixo (desconto) do impulso que a criou.
//   3. Gatilho: dentro da zona, o preço fecha acima do último topo interno (pivô de 1 candle),
//      o equivalente a uma mudança de estrutura num gráfico menor (MSS).
//   4. Entrada no fechamento do MSS, stop abaixo da mínima feita na zona, alvo na próxima
//      liquidez acima (topo não rompido) ou 3× o risco.
// Se a reação na zona varreu um fundo anterior (pegou liquidez), o setup ganha nota maior.
// Saída antecipada: fechamento abaixo de um fundo formado depois da entrada (a estrutura virou contra).
// Cada zona é usada uma vez; ela morre se o preço fechar abaixo dela ou se o gatilho não vier
// em 30 candles depois do toque.

import { isPivotHigh, isPivotLow } from './indicators.js?v=2026.10.12-2153';
import { findTarget } from './engine.js?v=2026.10.12-2153';

const MAX_ZONE_AGE = 150;

// Percorre os candles atualizando as zonas. `onSignal(i, zona)` é chamado no candle do MSS.
// Devolve as zonas ainda vivas no fim (para a lista "em formação").
function scan(cs, o, atr, onSignal) {
  const k = o.pivot;
  const highs = [], lows = [], minor = [];
  let zones = [];
  for (let i = 0; i < cs.length; i++) {
    const c = cs[i], a = atr[i];
    const p = i - k;
    if (p >= k) {
      if (isPivotHigh(cs, p, k)) highs.push({ i: p, p: cs[p].h, broken: false });
      if (isPivotLow(cs, p, k)) lows.push({ i: p, p: cs[p].l });
    }
    if (i >= 2 && isPivotHigh(cs, i - 1, 1)) minor.push({ i: i - 1, p: cs[i - 1].h });

    // 1) BOS de alta: cria as zonas do impulso.
    const H = highs.length ? highs[highs.length - 1] : null;
    if (H && !H.broken && c.c > H.p) {
      H.broken = true;
      let lo = H.i;
      for (let t = H.i; t <= i; t++) if (cs[t].l < cs[lo].l) lo = t;
      const leg = { low: cs[lo].l, high: c.h };
      let ob = -1;
      for (let t = Math.min(lo + 2, i - 1); t >= Math.max(0, lo - 3); t--) if (cs[t].c < cs[t].o) { ob = t; break; }
      if (ob >= 0) {
        zones.push({ type: 'OB', top: Math.max(cs[ob].o, cs[ob].c), bottom: cs[ob].l, src: ob, created: i, leg, touched: -1 });
      }
      let best = null;
      for (let t = lo + 1; t < i; t++) {
        const gapLo = cs[t - 1].h, gapHi = cs[t + 1].l;
        if (gapHi - gapLo >= 0.1 * a && (!best || gapHi - gapLo > best.top - best.bottom)) best = { top: gapHi, bottom: gapLo, src: t };
      }
      if (best) zones.push({ type: 'FVG', ...best, created: i, leg, touched: -1 });
    }

    // 2) Zonas existentes.
    for (const z of zones) {
      if (z.dead || i <= z.created) continue;
      if (z.touched < 0 && c.h > z.leg.high) z.leg.high = c.h;
      if (c.c < z.bottom - 0.1 * a || i - z.created > MAX_ZONE_AGE) { z.dead = true; continue; }
      if (z.touched < 0) {
        if (c.l > z.top) continue;
        const eq = z.leg.low + 0.5 * (z.leg.high - z.leg.low);
        if (z.top > eq) { z.dead = true; continue; } // zona na metade cara do impulso
        z.touched = i; z.minLow = c.l; z.minIdx = i;
        const mh = minor.length ? minor[minor.length - 1] : null;
        z.mss = mh && mh.i >= z.created ? mh.p : Math.max(cs[i - 1].h, cs[i - 2].h, cs[i - 3].h);
        continue;
      }
      if (c.l < z.minLow) {
        z.minLow = c.l; z.minIdx = i;
        const mh = minor.length ? minor[minor.length - 1] : null;
        if (mh && mh.i >= z.touched - 5) z.mss = mh.p;
      }
      if (i - z.touched > 30) { z.dead = true; continue; }
      if (c.c > z.mss && i > z.touched) {
        z.dead = true; z.used = true;
        if (onSignal) onSignal(i, z, highs, lows);
      }
    }
    if (zones.length > 60) zones = zones.filter((z) => !z.dead);
  }
  return zones.filter((z) => !z.dead);
}

export function detectIctLong(cs, o, ind) {
  const setups = [];
  scan(cs, o, ind.atr, (i, z, highs, lows) => {
    const c = cs[i], a = ind.atr[i];
    const entry = c.c;
    const stop = z.minLow - 0.1 * a;
    const risk = entry - stop;
    if (!(risk > 0) || risk > 3 * a) return;
    let { target, targetIdx } = findTarget(cs, highs, i, entry + o.minRR * risk, o);
    if (target === null) { target = entry + Math.max(o.minRR, 3) * risk; targetIdx = -1; }
    // A reação na zona varreu um fundo confirmado anterior?
    const swept = lows.some((L) => L.i < z.touched && z.touched - L.i <= 100 && L.p > z.minLow && L.p < z.top + a);
    setups.push({
      i, market: true, entry, stop, target, targetIdx,
      rr: (target - entry) / risk,
      anchorIdx: z.minIdx,
      exitOnStructure: true, // sai se perder (no fechamento) um fundo formado depois da entrada
      zoneType: z.type, zoneTop: z.top, zoneBottom: z.bottom, zoneIdx: z.src, zoneCreated: z.created,
      touchIdx: z.touched, lowIdx: z.minIdx, mssLevel: z.mss,
      swept,
      volRatio: ind.volAvg[i] > 0 ? c.v / ind.volAvg[i] : 0,
      rsi: ind.rsi[i],
    });
  });
  return setups;
}

// Zonas ainda vivas (compra e venda), para mostrar o gatilho antes de ele acontecer.
export function ictZones(cs, o, atr) {
  const mirror = cs.map((c) => ({ ...c, o: -c.o, h: -c.l, l: -c.h, c: -c.c }));
  const out = [];
  for (const z of scan(cs, o, atr)) {
    out.push({ side: 'long', type: z.type, top: z.top, bottom: z.bottom, touched: z.touched >= 0, mss: z.touched >= 0 ? z.mss : null, created: z.created });
  }
  for (const z of scan(mirror, o, atr)) {
    out.push({ side: 'short', type: z.type, top: -z.bottom, bottom: -z.top, touched: z.touched >= 0, mss: z.touched >= 0 ? -z.mss : null, created: z.created });
  }
  return out;
}
