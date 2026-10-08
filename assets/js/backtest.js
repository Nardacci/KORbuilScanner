// Backtest: roda o motor no histórico, uma posição por ativo de cada vez,
// e calcula as métricas separando o período de ajuste do período "cego".

import { DEFAULTS, detectSetups, makeHtfTrend } from './engine.js';

const CLOSED = new Set(['ganho', 'perda', 'tempo']);

// Operações de um ativo. `startT` descarta setups antes do início pedido
// (os candles anteriores servem só de aquecimento).
export function backtestSymbol(symbol, cs, htf, opts = {}, startT = 0) {
  const o = { ...DEFAULTS, ...opts };
  const setups = detectSetups(cs, o, makeHtfTrend(htf));
  const trades = [];
  let busyUntil = -1;
  let skipped = 0, expired = 0, missed = 0;
  for (const s of setups) {
    if (cs[s.i].T < startT) continue;
    if (s.i <= busyUntil) { skipped++; continue; }
    const r = s.result;
    busyUntil = r.endIdx;
    if (r.status === 'expirada') { expired++; continue; }
    if (r.status === 'perdida') { missed++; continue; }
    if (!CLOSED.has(r.status)) continue; // ainda aberta ou pendente no fim dos dados
    trades.push({
      symbol, side: s.side,
      setupT: cs[s.i].T, entryT: cs[r.fillIdx].t, exitT: cs[r.exitIdx].T,
      entry: s.entry, stop: s.stop, target: s.target, exit: r.exitPrice,
      rr: s.rr, R: r.R, status: r.status,
      spring: s.spring, aligned: s.aligned, score: s.score,
      setup: s,
    });
  }
  return { symbol, trades, setups: setups.length, skipped, expired, missed };
}

export function metrics(trades, riskPct = 1) {
  const n = trades.length;
  const ordered = [...trades].sort((a, b) => a.exitT - b.exitT);
  let wins = 0, grossW = 0, grossL = 0, sumR = 0;
  let eq = 1, peak = 1, maxDD = 0, streak = 0, maxStreak = 0, cumR = 0, peakR = 0, maxDDR = 0;
  const curve = [];
  for (const t of ordered) {
    sumR += t.R;
    if (t.R > 0) { wins++; grossW += t.R; streak = 0; } else { grossL += -t.R; streak++; maxStreak = Math.max(maxStreak, streak); }
    eq *= 1 + (riskPct / 100) * t.R;
    peak = Math.max(peak, eq);
    maxDD = Math.max(maxDD, 1 - eq / peak);
    cumR += t.R;
    peakR = Math.max(peakR, cumR);
    maxDDR = Math.max(maxDDR, peakR - cumR);
    curve.push({ t: t.exitT, eq, cumR });
  }
  return {
    trades: n,
    wins,
    winRate: n ? wins / n : 0,
    avgR: n ? sumR / n : 0,
    totalR: sumR,
    profitFactor: grossL > 0 ? grossW / grossL : (grossW > 0 ? Infinity : 0),
    maxDD,            // pior queda do patrimônio, em fração (0,12 = 12%)
    maxDDR,           // pior queda medida em R
    maxLosingStreak: maxStreak,
    returnPct: (eq - 1) * 100,
    curve,
  };
}

// Junta os ativos e separa ajuste x cego pela data de corte.
export function summarize(results, cutT, riskPct = 1) {
  const all = results.flatMap((r) => r.trades);
  const inS = all.filter((t) => t.setupT < cutT);
  const outS = all.filter((t) => t.setupT >= cutT);
  return {
    all: metrics(all, riskPct),
    inSample: metrics(inS, riskPct),
    outSample: metrics(outS, riskPct),
    bySymbol: results.map((r) => ({ symbol: r.symbol, ...metrics(r.trades, riskPct), expired: r.expired, missed: r.missed })),
    trades: all.sort((a, b) => a.exitT - b.exitT),
  };
}
