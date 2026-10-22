// Estratégia KOR (docs/base-conhecimento/estrategia.md): um único modelo em dois tempos gráficos.
//
//   1. Contexto (tempo maior): estrutura por topos/fundos confirmados (BOS/CHoCH).
//   2. Região onde o dinheiro grande agiu:
//        - lateral (Wyckoff) com Volume Profile e nota de força de fundo;
//        - order block da perna que fez BOS/CHoCH, em desconto;
//        - lateral rompida (região abandonada: do topo da lateral até a POC).
//   3. Liquidez criada perto da região (fundo da lateral; fundos formados depois do bloco).
//   4. Captura: Spring (candle FECHA abaixo do suporte e volta em até `springBars`) ou
//      varredura dos fundos + toque na região.
//   5. Confirmação no tempo menor: fechamento acima do último topo antes da mínima da captura,
//      com intenção (FVG ou candle de alta com volume alto na perna que saiu da captura).
//   6. Entrada limitada na POC da perna de confirmação; stop abaixo da mínima da captura;
//      alvo 1 na liquidez oposta (topo ainda não rompido do tempo maior, no mínimo `minRR`);
//      metade sai no alvo 1, o stop vai para a entrada e o resto segue com trailing pelos
//      fundos do tempo maior.
//
// Tudo é calculado candle a candle com o que já era conhecido (sem olhar o futuro).
// A venda é o espelho: os mesmos cálculos nos candles invertidos.

import { atr, sma, isPivotHigh, isPivotLow } from './indicators.js';

export const KOR_DEFAULTS = {
  pivot: 3,            // topos/fundos do tempo maior (candles de cada lado)
  liqPivot: 2,         // fundos que contam como liquidez criada perto da região
  ltfPivot: 2,         // topos do tempo menor para a confirmação
  rangeBars: 30,       // candles para reconhecer uma lateral
  rangeMaxAtr: 8,      // largura máxima da lateral, em ATRs do tempo maior
  springBars: 3,       // candles para o Spring voltar para dentro
  legMinAtr: 2,        // perna mínima (em ATRs) para o BOS/CHoCH criar um order block
  maxZoneAge: 150,     // candles do tempo maior que uma região fica válida
  confirmBars: 6,      // candles do tempo maior para a confirmação aparecer depois da captura
  volIntent: 1.5,      // volume do candle de rompimento acima de X vezes a média (intenção)
  entryMode: 'poc',    // 'poc' | 'meio' | 'poc-desconto'
  stopAtr: 0.5,        // folga do stop abaixo da captura, em ATRs do tempo menor
  minRR: 2,
  fallbackRR: 3,       // alvo quando não há liquidez oposta
  targetLookback: 300,
  expiryBars: 3,       // candles do tempo maior para a ordem limite executar
  partial: 0.5,        // fração que sai no alvo 1 (0 = sai tudo no alvo 1)
  maxHoldBars: 90,     // candles do tempo maior até fechar a operação a mercado
  maxRiskPct: 6,       // descarta setups com stop mais longe que isso (% do preço)
  feePct: 0.05,        // taxa por lado (%)
  slipPct: 0.02,       // escorregão nas saídas a mercado/stop (%)
  fundingPct8h: 0.01,  // custo de funding por 8h de posição (%), cobrado sempre contra
  minClass: 'B',
};

export const mirrorCandles = (cs) => cs.map((c) => ({ ...c, o: -c.o, h: -c.l, l: -c.h, c: -c.c }));

// Agrega candles do tempo menor em um tempo maior (ex.: 16 × 15m = 4h), alinhado ao relógio UTC.
export function aggregate(cs, ms) {
  const out = [];
  let cur = null;
  for (const c of cs) {
    const t = Math.floor(c.t / ms) * ms;
    if (!cur || cur.t !== t) {
      if (cur) out.push(cur);
      cur = { t, T: t + ms - 1, o: c.o, h: c.h, l: c.l, c: c.c, v: c.v, n: 1 };
    } else {
      cur.h = Math.max(cur.h, c.h); cur.l = Math.min(cur.l, c.l); cur.c = c.c; cur.v += c.v; cur.n++;
    }
  }
  if (cur) out.push(cur);
  return out;
}

// Volume Profile: distribui o volume de cada candle entre os níveis que ele percorreu.
export function volumeProfile(cs, from, to, bins = 24) {
  let lo = Infinity, hi = -Infinity;
  for (let i = from; i <= to; i++) { lo = Math.min(lo, cs[i].l); hi = Math.max(hi, cs[i].h); }
  if (!(hi > lo)) return { poc: lo, vah: hi, val: lo, lo, hi };
  const step = (hi - lo) / bins;
  const vol = new Array(bins).fill(0);
  for (let i = from; i <= to; i++) {
    const c = cs[i];
    const a = Math.max(0, Math.floor((c.l - lo) / step)), b = Math.min(bins - 1, Math.floor((c.h - lo) / step));
    const per = c.v / (b - a + 1);
    for (let k = a; k <= b; k++) vol[k] += per;
  }
  let p = 0;
  for (let k = 1; k < bins; k++) if (vol[k] > vol[p]) p = k;
  const total = vol.reduce((s, x) => s + x, 0);
  let a = p, b = p, acc = vol[p];
  while (acc < 0.7 * total && (a > 0 || b < bins - 1)) {
    const down = a > 0 ? vol[a - 1] : -1, up = b < bins - 1 ? vol[b + 1] : -1;
    if (up >= down) acc += vol[++b]; else acc += vol[--a];
  }
  return { poc: lo + (p + 0.5) * step, vah: lo + (b + 1) * step, val: lo + a * step, lo, hi };
}

// Índice do último candle de `cs` já fechado no instante T.
function lastClosed(cs, T) {
  let lo = 0, hi = cs.length - 1, ans = -1;
  while (lo <= hi) {
    const m = (lo + hi) >> 1;
    if (cs[m].T <= T) { ans = m; lo = m + 1; } else hi = m - 1;
  }
  return ans;
}

function firstFrom(cs, t) {
  let lo = 0, hi = cs.length - 1, ans = cs.length;
  while (lo <= hi) {
    const m = (lo + hi) >> 1;
    if (cs[m].t >= t) { ans = m; hi = m - 1; } else lo = m + 1;
  }
  return ans;
}

// Força de fundo de uma lateral (0–4): mais tempo na metade de cima, POC na metade de cima,
// UA (furou o topo e voltou) e volume caindo ao longo da lateral.
function bottomStrength(H, from, to, top, bottom, vp) {
  const mid = (top + bottom) / 2;
  let above = 0, ua = false, v1 = 0, v2 = 0;
  const half = from + Math.floor((to - from) / 2);
  for (let i = from; i <= to; i++) {
    if (H[i].c > mid) above++;
    if (H[i].h > top && H[i].c <= top) ua = true;
    if (i <= half) v1 += H[i].v; else v2 += H[i].v;
  }
  const n = to - from + 1;
  const parts = {
    tempoEmCima: above / n > 0.5,
    pocEmCima: vp.poc > mid,
    ua,
    volumeCaindo: v2 / Math.max(1, to - half) < v1 / Math.max(1, half - from + 1),
  };
  return { score: Object.values(parts).filter(Boolean).length, parts };
}

// ---------------------------------------------------------------------------
// Etapas 1–4 no tempo maior: devolve as capturas (região + liquidez varrida).
export function contextCaptures(H, o, atrH) {
  const k = o.pivot, kl = o.liqPivot;
  const highs = [], lows = [], liqLows = [];
  const zones = [];
  const caps = [];
  let trend = 0, lastHigh = null, lastLow = null, lastEventIdx = -1;
  let range = null, rangeCooldown = -1;

  for (let i = 0; i < H.length; i++) {
    const c = H[i], a = atrH[i];
    const p = i - k;
    if (p >= k) {
      if (isPivotHigh(H, p, k)) { lastHigh = { i: p, p: H[p].h, broken: false }; highs.push({ i: p, p: H[p].h }); }
      if (isPivotLow(H, p, k)) { lastLow = { i: p, p: H[p].l, broken: false }; lows.push({ i: p, p: H[p].l }); }
    }
    if (i - kl >= kl && isPivotLow(H, i - kl, kl)) liqLows.push({ i: i - kl, p: H[i - kl].l, conf: i });

    // Estrutura: BOS/CHoCH de alta cria um order block na origem da perna.
    if (lastHigh && !lastHigh.broken && c.c > lastHigh.p) {
      lastHigh.broken = true;
      const type = trend === 1 ? 'BOS' : 'CHoCH';
      trend = 1; lastEventIdx = i;
      let lo = lastHigh.i;
      for (let t = lastHigh.i; t <= i; t++) if (H[t].l < H[lo].l) lo = t;
      const leg = { low: H[lo].l, high: c.h };
      if (leg.high - leg.low >= o.legMinAtr * a) {
        let ob = -1;
        for (let t = Math.min(lo + 2, i - 1); t >= Math.max(0, lo - 3); t--) if (H[t].c < H[t].o) { ob = t; break; }
        if (ob >= 0) {
          let fvg = false;
          for (let t = lo + 1; t < i; t++) if (H[t + 1].l > H[t - 1].h) { fvg = true; break; }
          const vp = volumeProfile(H, lo, i);
          const top = Math.max(H[ob].o, H[ob].c), bottom = H[ob].l;
          zones.push({
            kind: 'ob', top, bottom, created: i, src: ob, leg, type, fvg,
            pocInZone: vp.poc >= bottom && vp.poc <= top,
          });
        }
      }
    }
    if (lastLow && !lastLow.broken && c.c < lastLow.p) {
      lastLow.broken = true;
      trend = -1; lastEventIdx = i;
    }

    // Lateral (Wyckoff): procura uma nova quando não há nenhuma ativa.
    if (!range && i >= o.rangeBars && i > rangeCooldown) {
      let hi = -Infinity, lo = Infinity;
      for (let t = i - o.rangeBars + 1; t <= i; t++) { hi = Math.max(hi, H[t].h); lo = Math.min(lo, H[t].l); }
      if (hi - lo <= o.rangeMaxAtr * a) range = { from: i - o.rangeBars + 1, top: hi, bottom: lo, spring: null };
    } else if (range && i > range.from + o.rangeBars - 1) {
      const R = range;
      if (R.spring) {
        if (c.l < R.spring.low) { R.spring.low = c.l; R.spring.lowIdx = i; }
        if (c.c > R.bottom) {
          // Spring confirmado: fechou abaixo e voltou para dentro.
          const to = R.spring.start - 1;
          const vp = volumeProfile(H, R.from, to);
          const fs = bottomStrength(H, R.from, to, R.top, R.bottom, vp);
          caps.push({
            kind: 'spring', hIdx: i, startT: H[R.spring.start].t, validT: c.T,
            invalid: R.spring.low - 0.5 * a, low: R.spring.low,
            region: { top: R.top, bottom: R.bottom, poc: vp.poc, vah: vp.vah, val: vp.val, from: R.from, to },
            forca: fs.score, forcaParts: fs.parts,
            context: lastEventIdx < R.from ? 'equilibrio' : trend === 1 ? 'alta' : 'baixa',
            highs: highs.slice(),
          });
          range = null; rangeCooldown = i + 5;
        } else if (i - R.spring.start >= o.springBars) {
          range = null; rangeCooldown = i; // não voltou: rompimento de verdade
        }
      } else if (c.c < R.bottom) {
        R.spring = { start: i, low: c.l, lowIdx: i };
      } else if (c.c > R.top) {
        // Rompeu para cima: a lateral vira região de interesse (do topo até a POC).
        const vp = volumeProfile(H, R.from, i - 1);
        const fs = bottomStrength(H, R.from, i - 1, R.top, R.bottom, vp);
        if (vp.poc < R.top) {
          zones.push({
            kind: 'lateral', top: R.top, bottom: vp.poc, created: i, leg: { low: R.bottom, high: c.h },
            forca: fs.score, region: { top: R.top, bottom: R.bottom, poc: vp.poc, vah: vp.vah, val: vp.val },
          });
        }
        range = null; rangeCooldown = i;
      }
    }

    // Regiões vivas: toque depois de varrer a liquidez criada depois delas.
    for (const z of zones) {
      if (z.dead || i <= z.created) continue;
      if (c.c < z.bottom || i - z.created > o.maxZoneAge) { z.dead = true; continue; }
      if (c.l > z.top) { if (c.h > z.leg.high) z.leg.high = c.h; continue; }
      z.dead = true; // cada região é usada uma vez
      if (z.kind === 'ob' && z.top > z.leg.low + 0.5 * (z.leg.high - z.leg.low)) continue; // fora do desconto
      const liq = liqLows.filter((L) => L.i > z.created && L.conf <= i && L.p > z.top && L.p < z.leg.high);
      if (!liq.length) continue; // sem liquidez criada antes da mitigação: não há setup
      caps.push({
        kind: z.kind, hIdx: i, startT: c.t, validT: c.t,
        invalid: z.bottom - 0.25 * a, low: c.l,
        region: { top: z.top, bottom: z.bottom, poc: z.region?.poc },
        liquidity: Math.min(...liq.map((L) => L.p)),
        forca: z.forca ?? null, fvg: z.fvg, pocInZone: z.pocInZone, bosType: z.type,
        context: trend === 1 ? 'alta' : trend === -1 ? 'baixa' : 'equilibrio',
        highs: highs.slice(),
      });
    }
    if (zones.length > 80) {
      const alive = zones.filter((z) => !z.dead);
      zones.length = 0; zones.push(...alive);
    }
  }
  return caps;
}

// ---------------------------------------------------------------------------
// Etapa 5 no tempo menor: CHoCH com intenção depois da captura. Devolve o setup ou null.
export function confirmLtf(L, cap, o, atrL, volAvgL, ratio) {
  const kp = o.ltfPivot;
  const s0 = firstFrom(L, cap.startT);
  if (s0 >= L.length) return null;
  const end = Math.min(L.length - 1, firstFrom(L, cap.validT) + o.confirmBars * ratio);
  const look = Math.max(0, s0 - 4 * ratio);
  const tops = [];
  for (let j = look + kp; j < s0; j++) if (isPivotHigh(L, j - kp, kp) && j - kp >= look) tops.push(j - kp);
  let capLow = Infinity, capIdx = -1;
  for (let j = s0; j <= end; j++) {
    const c = L[j];
    if (j - kp >= look && isPivotHigh(L, j - kp, kp)) tops.push(j - kp);
    if (c.l < capLow) { capLow = c.l; capIdx = j; }
    if (capLow < cap.invalid) return null;
    if (c.T < cap.validT) continue;
    let lvl = null;
    for (let t = tops.length - 1; t >= 0; t--) if (tops[t] < capIdx) { lvl = L[tops[t]].h; break; }
    if (lvl === null || c.c <= lvl) continue;
    // Intenção: FVG ou volume alto em algum candle da perna que saiu da captura.
    let fvg = false, volHigh = false;
    for (let t = capIdx + 1; t < j; t++) if (L[t + 1].l > L[t - 1].h) { fvg = true; break; }
    for (let t = capIdx; t <= j; t++) if (volAvgL[t] > 0 && L[t].c > L[t].o && L[t].v >= o.volIntent * volAvgL[t]) { volHigh = true; break; }
    if (!fvg && !volHigh) return null;
    let legHigh = -Infinity;
    for (let t = capIdx; t <= j; t++) legHigh = Math.max(legHigh, L[t].h);
    const vp = volumeProfile(L, capIdx, j);
    const mid = capLow + 0.5 * (legHigh - capLow);
    let entry = o.entryMode === 'meio' ? mid : o.entryMode === 'poc-desconto' ? Math.min(vp.poc, mid) : vp.poc;
    entry = Math.min(entry, c.c);
    const stop = capLow - o.stopAtr * atrL[j];
    return { j, entry, stop, capLow, capIdx, legHigh, chochLevel: lvl, ltfFvg: fvg, volHigh, poc: vp.poc };
  }
  return null;
}

const CLASS_MIN = { 'A+': 8, A: 6, B: 4, C: 0 };
export function classOf(score, context, kind) {
  const against = context === 'baixa' && kind !== 'spring';
  let c = score >= 8 ? 'A+' : score >= 6 ? 'A' : score >= 4 ? 'B' : 'C';
  if (against && (c === 'A+' || c === 'A')) c = 'B';
  return c;
}

function scoreOf(cap, conf, rr) {
  let s = 0;
  const parts = {};
  if (cap.context === 'alta' || (cap.kind === 'spring' && cap.context !== 'baixa')) { s += 2; parts.contexto = 2; }
  if (cap.forca != null && cap.forca >= 3) { s += 2; parts.forca = 2; }
  if (cap.pocInZone) { s += 1; parts.pocNaZona = 1; }
  if (cap.fvg) { s += 1; parts.fvgRegiao = 1; }
  if (conf.ltfFvg) { s += 1; parts.fvgConfirmacao = 1; }
  if (conf.volHigh) { s += 1; parts.volumeConfirmacao = 1; }
  if (rr >= 3) { s += 1; parts.rr3 = 1; }
  return { score: s, parts };
}

// ---------------------------------------------------------------------------
// Simulação no tempo menor, com saída parcial, stop na entrada e trailing no tempo maior.
export function simulateKor(L, H, st, o) {
  const { entry, stop, tp1 } = st;
  const risk = entry - stop;
  const res = { status: 'pendente', fillIdx: -1, exitIdx: -1, R: null };
  const expiryT = L[st.j].T + o.expiryBars * (H[1].t - H[0].t);
  let filled = false, partDone = false, runStop = stop, trail = null;
  let realized = 0, costs = 0;
  let hp = lastClosed(H, L[st.j].T) + 1;
  const k = o.pivot;
  const fee = (px, w) => (o.feePct / 100) * Math.abs(px) * w / risk;
  const slip = (px, w) => (o.slipPct / 100) * Math.abs(px) * w / risk;
  const finish = (j, px, status, w, slipIt) => {
    realized += (px - entry) / risk * w;
    costs += fee(px, w) + (slipIt ? slip(px, w) : 0);
    const hours = (L[j].T - L[res.fillIdx].t) / 3600e3;
    costs += (o.fundingPct8h / 100) * Math.abs(entry) / risk * (hours / 8) * (partDone ? 0.75 : 1);
    res.status = status; res.exitIdx = j; res.R = realized - costs;
    return res;
  };
  for (let j = st.j + 1; j < L.length; j++) {
    const c = L[j];
    if (!filled) {
      if (c.t > expiryT) { res.status = 'expirada'; res.exitIdx = j; return res; }
      if (c.l <= entry) {
        filled = true; res.fillIdx = j; costs += fee(entry, 1);
        if (c.l <= stop) return finish(j, Math.min(stop, c.o), 'perda', 1, true);
      } else if (c.h >= tp1) { res.status = 'perdida'; res.exitIdx = j; return res; }
      continue;
    }
    const w = partDone ? 1 - o.partial : 1;
    if (c.l <= runStop) return finish(j, Math.min(runStop, c.o), partDone ? 'ganho-parcial' : 'perda', w, true);
    if (!partDone && c.h >= tp1) {
      if (o.partial <= 0) return finish(j, Math.max(tp1, c.o), 'ganho', 1, false);
      realized += (tp1 - entry) / risk * o.partial;
      costs += fee(tp1, o.partial);
      partDone = true; runStop = entry;
    }
    // Candles do tempo maior que fecharam: trailing pelos fundos formados depois da entrada.
    while (hp < H.length && H[hp].T <= c.T) {
      const pp = hp - k;
      if (pp >= k && H[pp].t >= L[res.fillIdx].t && isPivotLow(H, pp, k)) trail = H[pp].l;
      if (partDone && trail !== null && H[hp].c < trail) return finish(j, c.c, 'trailing', 1 - o.partial, true);
      hp++;
    }
    if ((c.T - L[res.fillIdx].t) / (H[1].t - H[0].t) >= o.maxHoldBars) return finish(j, c.c, 'tempo', w, true);
  }
  if (filled) res.status = 'aberta';
  return res;
}

// ---------------------------------------------------------------------------
// Detecta e simula os setups KOR de um ativo. H = tempo de contexto, L = tempo de execução.
export function korSetups(H, L, opts = {}) {
  const o = { ...KOR_DEFAULTS, ...opts };
  const ratio = Math.max(1, Math.round((H[1].t - H[0].t) / (L[1].t - L[0].t)));
  const out = [];
  for (const side of ['long', 'short']) {
    const h = side === 'long' ? H : mirrorCandles(H);
    const l = side === 'long' ? L : mirrorCandles(L);
    const atrH = atr(h), atrL = atr(l);
    const volAvgL = sma(l.map((c) => c.v), 20);
    for (const cap of contextCaptures(h, o, atrH)) {
      const conf = confirmLtf(l, cap, o, atrL, volAvgL, ratio);
      if (!conf) continue;
      const risk = conf.entry - conf.stop;
      if (!(risk > 0) || risk / Math.abs(conf.entry) * 100 > o.maxRiskPct) continue;
      const hj = lastClosed(h, l[conf.j].T);
      let tp1 = null;
      for (const Hh of cap.highs) {
        if (hj - Hh.i > o.targetLookback || Hh.p < conf.entry + o.minRR * risk) continue;
        let taken = false;
        for (let t = Hh.i + 1; t <= hj; t++) if (h[t].h > Hh.p) { taken = true; break; }
        if (!taken && (tp1 === null || Hh.p < tp1)) tp1 = Hh.p;
      }
      const targetIsLiq = tp1 !== null;
      if (tp1 === null) tp1 = conf.entry + o.fallbackRR * risk;
      const rr = (tp1 - conf.entry) / risk;
      const { score, parts } = scoreOf(cap, conf, rr);
      const cls = classOf(score, cap.context, cap.kind);
      if (CLASS_MIN[cls] < CLASS_MIN[o.minClass]) continue;
      const st = { ...conf, tp1, rr, targetIsLiq };
      const result = simulateKor(l, h, st, o);
      const f = side === 'long' ? (x) => x : (x) => (x == null ? x : -x);
      out.push({
        side, kind: cap.kind, context: cap.context, score, parts, cls,
        confirmT: l[conf.j].T, captureT: cap.validT,
        entry: f(conf.entry), stop: f(conf.stop), tp1: f(tp1), rr, targetIsLiq,
        riskPct: risk / Math.abs(conf.entry) * 100,
        region: cap.region && Object.fromEntries(Object.entries(cap.region).map(([key, v]) => [key, typeof v === 'number' && !['from', 'to'].includes(key) ? f(v) : v])),
        forca: cap.forca,
        result: { ...result, fillT: result.fillIdx >= 0 ? l[result.fillIdx].t : null, exitT: result.exitIdx >= 0 ? l[result.exitIdx].T : null },
      });
    }
  }
  return out.sort((a, b) => a.confirmT - b.confirmT);
}
