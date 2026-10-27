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

import { isPivotHigh, isPivotLow } from './indicators.js?v=2026.10.27-0007';
import { findTarget } from './engine.js?v=2026.10.27-0007';

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
  return { zones: zones.filter((z) => !z.dead), highs, lows };
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

// Plano antecipado para uma zona viva (no espaço de compra): o que o preço precisa fazer
// para a entrada acontecer, com entrada, stop e alvo estimados e o caminho projetado.
function planLong(cs, o, atr, z, highs, lows) {
  const n = cs.length - 1, a = atr[n], price = cs[n].c;
  const h = z.top - z.bottom;
  const touched = z.touched >= 0;
  const stop = (touched ? Math.min(z.minLow, z.bottom) : z.bottom) - 0.1 * a;
  // Entrada: com a zona tocada, o gatilho é exato (fechar acima do topo interno);
  // antes do toque, estima-se o MSS logo acima da zona.
  const entry = touched ? z.mss : z.top + 0.25 * a;
  const risk = entry - stop;
  if (!(risk > 0)) return null;
  let target = null;
  for (const H of highs) {
    if (n - H.i > o.targetLookback || H.p < entry + o.minRR * risk) continue;
    let taken = false;
    for (let t = H.i + 1; t <= n; t++) if (cs[t].h > H.p) { taken = true; break; }
    if (!taken && (target === null || H.p < target)) target = H.p;
  }
  const targetIsLiq = target !== null;
  if (target === null) target = entry + Math.max(o.minRR, 3) * risk;
  // Liquidez: fundo confirmado ANTES do toque, dentro da zona ou logo abaixo dela.
  // Com a zona já tocada, se a mínima da reação passou dele, a varredura já aconteceu.
  // Zona já tocada: só conta a liquidez que a reação já varreu (uma nova varredura mudaria o stop).
  const liqs = lows.filter((L) => n - L.i <= 150 && (!touched || L.i < z.touched) && L.p <= z.top && L.p >= z.bottom - a
    && (!touched || z.minLow < L.p) && L.p > stop);
  const liq = liqs.length ? Math.min(...liqs.map((L) => L.p)) : null;
  const liqSwept = touched && liq !== null;
  const floor = (v) => Math.max(v, stop + 0.05 * a);
  const path = touched
    ? [[0, price], [2, floor(Math.min(price, z.minLow + 0.3 * h))], [4, entry + 0.3 * a], [6, entry - 0.25 * risk], [16, target]]
    : [[0, price], [4, z.top - 0.3 * h], [7, floor(liq !== null && liq - 0.2 * a > stop ? liq - 0.2 * a : z.bottom + 0.2 * h)],
      [10, entry + 0.3 * a], [12, entry - 0.25 * risk], [22, target]];
  return {
    type: z.type, top: z.top, bottom: z.bottom, touched, created: z.created,
    entry, stop, target, rr: (target - entry) / risk, targetIsLiq,
    mss: touched ? z.mss : null, low: touched ? z.minLow : null, liq, liqSwept,
    dist: touched ? 0 : Math.abs((price - z.top) / price),
    path,
  };
}

// Planos de todas as zonas vivas (compra e venda), em preços reais.
// O mais relevante primeiro: zona já tocada, depois a mais próxima do preço.
export function ictZones(cs, o, atr) {
  const mirror = cs.map((c) => ({ ...c, o: -c.o, h: -c.l, l: -c.h, c: -c.c }));
  const out = [];
  const L = scan(cs, o, atr);
  for (const z of L.zones) {
    const p = planLong(cs, o, atr, z, L.highs, L.lows);
    if (p) out.push({ side: 'long', ...p });
  }
  const S = scan(mirror, o, atr);
  for (const z of S.zones) {
    const p = planLong(mirror, o, atr, z, S.highs, S.lows);
    if (!p) continue;
    out.push({
      side: 'short', ...p,
      top: -p.bottom, bottom: -p.top,
      entry: -p.entry, stop: -p.stop, target: -p.target,
      mss: p.mss == null ? null : -p.mss, low: p.low == null ? null : -p.low, liq: p.liq == null ? null : -p.liq,
      path: p.path.map(([k, v]) => [k, -v]),
    });
  }
  return out.sort((a, b) => (b.touched - a.touched) || a.dist - b.dist);
}
