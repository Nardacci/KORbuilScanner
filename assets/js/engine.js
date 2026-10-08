// Motor de análise SMC + Wyckoff.
//
// O mesmo código serve para o scanner (candles recentes) e para o backtest
// (histórico longo). Tudo é calculado em uma passada, candle a candle, usando
// só o que já era conhecido naquele momento: um topo/fundo só existe depois
// de `pivot` candles à direita, e um setup só nasce no fechamento do candle
// do CHoCH. Assim o backtest não "vê o futuro".
//
// Setup de COMPRA (a venda é o espelho, calculada invertendo os preços):
//   1. Varredura de liquidez: o preço perde um fundo confirmado e, em até
//      `reclaimBars` candles, fecha de volta acima dele.
//   2. CHoCH: depois da varredura, fecha acima do último topo anterior a ela,
//      sem antes fazer mínima abaixo da varredura.
//   3. Order block: último candle de baixa antes do impulso (no fundo da varredura).
//   4. Entrada limitada no topo do corpo do order block, stop abaixo da
//      varredura, alvo na próxima liquidez acima (topo ainda não rompido)
//      que dê pelo menos `minRR`.
// Marcas extras: "spring" quando o fundo varrido é o fundo de uma faixa
// lateral (Wyckoff), volume alto na varredura e alinhamento com o tempo maior.

import { atr, ema, sma, rsi, isPivotHigh, isPivotLow } from './indicators.js';

export const DEFAULTS = {
  pivot: 3,            // candles de cada lado para confirmar topo/fundo
  reclaimBars: 3,      // candles para voltar depois de varrer o fundo
  chochWindow: 30,     // candles máximos entre a varredura e o CHoCH
  sweepLookback: 120,  // idade máxima (em candles) do fundo/topo varrido
  targetLookback: 300, // até onde procurar liquidez para o alvo
  minRR: 2,            // risco/retorno mínimo
  expiry: 30,          // candles para a ordem limite ser executada
  maxBarsInTrade: 120, // fecha a operação no preço de mercado depois disso
  htfFilter: 'nao-contra', // 'off' | 'nao-contra' | 'a-favor'
  feePct: 0.05,        // taxa por lado, em %
  rangeLookback: 60,   // candles usados para medir a faixa lateral
  rangeMaxAtr: 14,     // largura máxima da faixa, em ATRs, para chamar de lateral
  volClimax: 1.8,      // volume na varredura acima de X vezes a média
};

// Tempo gráfico maior usado como contexto para cada tempo gráfico.
export const HTF = {
  '15m': '1h', '30m': '2h', '1h': '4h', '2h': '8h', '4h': '1d',
  '6h': '1d', '8h': '3d', '12h': '3d', '1d': '1w',
};

const mirror = (cs) => cs.map((c) => ({ ...c, o: -c.o, h: -c.l, l: -c.h, c: -c.c }));

// ---------------------------------------------------------------------------
// Estrutura de mercado (BOS / CHoCH) para contexto e marcações no gráfico.
export function structure(cs, k) {
  const events = [];
  const swings = [];
  let trend = 0, lastH = null, lastL = null;
  for (let i = 0; i < cs.length; i++) {
    const p = i - k;
    if (p >= k) {
      if (isPivotHigh(cs, p, k)) { lastH = { i: p, p: cs[p].h, broken: false }; swings.push({ i: p, p: cs[p].h, kind: 'H' }); }
      if (isPivotLow(cs, p, k)) { lastL = { i: p, p: cs[p].l, broken: false }; swings.push({ i: p, p: cs[p].l, kind: 'L' }); }
    }
    const c = cs[i];
    if (lastH && !lastH.broken && c.c > lastH.p) {
      events.push({ i, dir: 1, type: trend === 1 ? 'BOS' : 'CHoCH', level: lastH.p, from: lastH.i });
      trend = 1; lastH.broken = true;
    }
    if (lastL && !lastL.broken && c.c < lastL.p) {
      events.push({ i, dir: -1, type: trend === -1 ? 'BOS' : 'CHoCH', level: lastL.p, from: lastL.i });
      trend = -1; lastL.broken = true;
    }
  }
  return { events, swings, trend };
}

// ---------------------------------------------------------------------------
// Tendência do tempo gráfico maior, consultada pelo horário de fechamento.
// Usa só candles do tempo maior já fechados naquele momento.
export function makeHtfTrend(htf) {
  if (!htf || htf.length === 0) return () => 'lateral';
  const closes = htf.map((c) => c.c);
  const e = ema(closes, 50);
  const trendAt = (j) => {
    if (j < 53 || Number.isNaN(e[j])) return 'lateral';
    const rising = e[j] > e[j - 3], falling = e[j] < e[j - 3];
    if (closes[j] > e[j] && rising) return 'alta';
    if (closes[j] < e[j] && falling) return 'baixa';
    return 'lateral';
  };
  return (T) => {
    let lo = 0, hi = htf.length - 1, ans = -1;
    while (lo <= hi) {
      const mid = (lo + hi) >> 1;
      if (htf[mid].T <= T) { ans = mid; lo = mid + 1; } else hi = mid - 1;
    }
    return ans < 0 ? 'lateral' : trendAt(ans);
  };
}

// ---------------------------------------------------------------------------
// Detecção do lado comprado (o lado vendido usa os candles espelhados).
function detectLong(cs, o, ind) {
  const k = o.pivot;
  const highs = [], lows = [];
  const setups = [];
  let pending = [];  // fundos varridos esperando o preço fechar de volta acima
  let sweep = null;  // varredura confirmada esperando o CHoCH

  for (let i = 0; i < cs.length; i++) {
    const p = i - k;
    if (p >= k) {
      if (isPivotHigh(cs, p, k)) highs.push({ i: p, p: cs[p].h });
      if (isPivotLow(cs, p, k)) lows.push({ i: p, p: cs[p].l, swept: false });
    }
    const c = cs[i];

    // 1) Novas varreduras: um candle pode varrer vários fundos; fica o mais baixo.
    let deepest = null;
    for (const L of lows) {
      if (L.swept || i - L.i > o.sweepLookback) continue;
      if (c.l < L.p) {
        L.swept = true;
        if (!deepest || L.p < deepest.p) deepest = L;
      }
    }
    if (deepest) pending.push({ start: i, level: deepest.p, pivotIdx: deepest.i, low: c.l, lowIdx: i });

    // 2) Varreduras pendentes: precisam fechar de volta acima do nível.
    const still = [];
    for (const ps of pending) {
      if (c.l < ps.low) { ps.low = c.l; ps.lowIdx = i; }
      if (c.c > ps.level) {
        // Nível do CHoCH: último topo confirmado antes da varredura.
        let H = null;
        for (let h = highs.length - 1; h >= 0; h--) {
          if (highs[h].i < ps.start && highs[h].p > ps.level) { H = highs[h]; break; }
        }
        if (H) sweep = { ...ps, reclaimIdx: i, chochLevel: H.p, chochFrom: H.i };
      } else if (i - ps.start < o.reclaimBars) {
        still.push(ps);
      }
    }
    pending = still;

    // 3) Varredura ativa: espera o CHoCH.
    if (sweep) {
      if (i > sweep.reclaimIdx && c.l < sweep.low) {
        sweep = null; // fez mínima abaixo da varredura: a ideia falhou
      } else if (c.c > sweep.chochLevel) {
        const st = buildLong(cs, o, ind, sweep, i, highs);
        if (st) setups.push(st);
        sweep = null;
      } else if (i - sweep.start > o.chochWindow) {
        sweep = null;
      }
    }
  }
  return setups;
}

function buildLong(cs, o, ind, S, j, highs) {
  // Order block: último candle de baixa até o fundo da varredura.
  const m = S.lowIdx;
  let ob = -1;
  for (let t = m; t >= Math.max(0, S.start - 5); t--) {
    if (cs[t].c < cs[t].o) { ob = t; break; }
  }
  if (ob < 0) ob = m;
  const obC = cs[ob];
  const entry = Math.max(obC.o, obC.c);
  const a = ind.atr[j];
  const stop = S.low - 0.1 * a;
  const risk = entry - stop;
  if (!(risk > 0) || entry >= cs[j].c) return null;

  // Alvo: topo confirmado e ainda não rompido, o mais próximo que dê minRR.
  const need = entry + o.minRR * risk;
  let target = null, targetIdx = -1;
  for (const H of highs) {
    if (H.i >= j || j - H.i > o.targetLookback || H.p < need) continue;
    let taken = false;
    for (let t = H.i + 1; t <= j; t++) if (cs[t].h > H.p) { taken = true; break; }
    if (taken) continue;
    if (target === null || H.p < target) { target = H.p; targetIdx = H.i; }
  }
  if (target === null) return null;

  // Wyckoff: o fundo varrido é o fundo de uma faixa lateral? (spring)
  const r0 = Math.max(0, S.start - o.rangeLookback);
  let rH = -Infinity, rL = Infinity;
  for (let t = r0; t < S.start; t++) { rH = Math.max(rH, cs[t].h); rL = Math.min(rL, cs[t].l); }
  const aS = ind.atr[S.start];
  const inRange = S.start - r0 >= 20 && (rH - rL) / aS <= o.rangeMaxAtr;
  const spring = inRange && S.level - rL <= 0.5 * aS;

  let vMax = 0;
  for (let t = S.start; t <= S.reclaimIdx; t++) vMax = Math.max(vMax, cs[t].v);
  const volRatio = ind.volAvg[S.start] > 0 ? vMax / ind.volAvg[S.start] : 0;

  return {
    i: j,
    entry, stop, target,
    rr: (target - entry) / risk,
    sweepIdx: S.start, sweepLevel: S.level, sweepPivotIdx: S.pivotIdx, sweepLow: S.low, sweepLowIdx: S.lowIdx,
    reclaimIdx: S.reclaimIdx,
    chochLevel: S.chochLevel, chochFrom: S.chochFrom,
    obIdx: ob, obProx: entry, obDist: obC.l,
    targetIdx,
    spring, range: inRange ? { from: r0, to: S.start - 1, hi: rH, lo: rL } : null,
    volRatio,
    rsi: ind.rsi[S.lowIdx],
  };
}

// ---------------------------------------------------------------------------
// Simulação de um setup daqui para frente (mesmo espaço de preços do setup).
// Regras conservadoras: se stop e alvo caem no mesmo candle, conta como stop;
// no candle em que a ordem executa, só o stop é verificado.
export function simulate(cs, st, o) {
  const { entry, stop, target } = st;
  const risk = entry - stop;
  const res = { status: 'pendente', fillIdx: -1, exitIdx: -1, exitPrice: null, R: null, endIdx: cs.length - 1 };
  const feeR = (exit) => ((o.feePct / 100) * (Math.abs(entry) + Math.abs(exit))) / risk;
  const close = (k, price, status) => {
    res.status = status; res.exitIdx = k; res.exitPrice = price; res.endIdx = k;
    res.R = (price - entry) / risk - feeR(price);
  };
  for (let k = st.i + 1; k < cs.length; k++) {
    const c = cs[k];
    if (res.fillIdx < 0) {
      if (k - st.i > o.expiry) { res.status = 'expirada'; res.endIdx = k; return res; }
      if (c.l <= entry) {
        res.fillIdx = k; res.status = 'aberta';
        if (c.l <= stop) { close(k, Math.min(stop, c.o), 'perda'); return res; }
      } else if (c.h >= target) {
        res.status = 'perdida'; res.endIdx = k; return res; // alvo sem entrada
      }
    } else {
      if (c.l <= stop) { close(k, Math.min(stop, c.o), 'perda'); return res; }
      if (c.h >= target) { close(k, Math.max(target, c.o), 'ganho'); return res; }
      if (k - res.fillIdx >= o.maxBarsInTrade) { close(k, c.c, 'tempo'); return res; }
    }
  }
  if (res.status === 'aberta') {
    const last = cs[cs.length - 1].c;
    res.R = (last - entry) / risk; // resultado parcial, ainda sem taxa de saída
  }
  return res;
}

// ---------------------------------------------------------------------------
// Ponto de entrada: detecta e simula compras e vendas e devolve preços reais.
export function detectSetups(cs, opts = {}, htfTrendAt = null) {
  const o = { ...DEFAULTS, ...opts };
  const out = [];
  for (const side of ['long', 'short']) {
    const s = side === 'long' ? cs : mirror(cs);
    const ind = {
      atr: atr(s),
      volAvg: sma(s.map((c) => c.v), 20),
      rsi: rsi(s.map((c) => c.c)),
    };
    for (const st of detectLong(s, o, ind)) {
      const htf = htfTrendAt ? htfTrendAt(cs[st.i].T) : 'lateral';
      const aligned = side === 'long' ? htf === 'alta' : htf === 'baixa';
      const against = side === 'long' ? htf === 'baixa' : htf === 'alta';
      if (o.htfFilter === 'nao-contra' && against) continue;
      if (o.htfFilter === 'a-favor' && !aligned) continue;
      st.result = simulate(s, st, o);
      out.push(toReal(st, side, htf, aligned));
    }
  }
  return out.sort((a, b) => a.i - b.i || (a.side < b.side ? -1 : 1));
}

function toReal(st, side, htf, aligned) {
  const f = side === 'long' ? (x) => x : (x) => (x == null ? x : -x);
  const r = {
    ...st,
    side, htf, aligned,
    entry: f(st.entry), stop: f(st.stop), target: f(st.target),
    sweepLevel: f(st.sweepLevel), sweepLow: f(st.sweepLow), chochLevel: f(st.chochLevel),
    obProx: f(st.obProx), obDist: f(st.obDist),
    rsi: side === 'long' ? st.rsi : 100 - st.rsi,
    result: { ...st.result, exitPrice: f(st.result.exitPrice) },
  };
  if (st.range) {
    r.range = side === 'long' ? { ...st.range } : { ...st.range, hi: -st.range.lo, lo: -st.range.hi };
  }
  r.score = scoreOf(r);
  return r;
}

export function scoreOf(s) {
  let sc = Math.min(s.rr, 5) * 10;
  if (s.spring) sc += 15;
  if (s.volRatio >= DEFAULTS.volClimax) sc += 10;
  if (s.aligned) sc += 15;
  if (s.htf === 'lateral') sc += 5;
  return Math.round(sc);
}

// ---------------------------------------------------------------------------
// Análise de um ativo para o scanner.
export function analyze(cs, htf, opts = {}) {
  const o = { ...DEFAULTS, ...opts };
  const n = cs.length;
  const htfAt = makeHtfTrend(htf);
  const setups = detectSetups(cs, o, htfAt);
  const live = setups.filter((s) => s.result.status === 'pendente' || s.result.status === 'aberta');
  const active = live.length ? live.reduce((a, b) => (b.score > a.score || (b.score === a.score && b.i > a.i) ? b : a)) : null;

  const closes = cs.map((c) => c.c);
  const e50 = ema(closes, 50);
  const r = rsi(closes);
  const last = cs[n - 1];
  const tfTrend = Number.isNaN(e50[n - 1]) ? 'lateral'
    : last.c > e50[n - 1] && e50[n - 1] > e50[n - 4] ? 'alta'
      : last.c < e50[n - 1] && e50[n - 1] < e50[n - 4] ? 'baixa' : 'lateral';

  const look = Math.min(100, n);
  let hi = -Infinity, lo = Infinity;
  for (let t = n - look; t < n; t++) { hi = Math.max(hi, cs[t].h); lo = Math.min(lo, cs[t].l); }
  const a = atr(cs)[n - 1];
  const struct = structure(cs, o.pivot);
  const lastEvent = struct.events.length ? struct.events[struct.events.length - 1] : null;

  return {
    active,
    setups,
    recent: setups.filter((s) => n - 1 - s.i <= 100),
    context: {
      price: last.c,
      tfTrend,
      htfTrend: htfAt(last.T),
      rsi: r[n - 1],
      rangeHi: hi, rangeLo: lo,
      rangePos: hi > lo ? (last.c - lo) / (hi - lo) : 0.5,
      rangeAtr: a > 0 ? (hi - lo) / a : 0,
      lastEvent,
    },
    structure: struct,
  };
}
