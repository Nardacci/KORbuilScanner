import test from 'node:test';
import assert from 'node:assert/strict';
import { synthetic, fromCloses } from './synthetic.mjs';
import { atr, rsi, ema } from '../assets/js/indicators.js';
import { detectSetups, simulate, analyze, DEFAULTS, makeHtfTrend } from '../assets/js/engine.js';
import { backtestSymbol, summarize } from '../assets/js/backtest.js';

const key = (s) => [s.i, s.side, s.entry, s.stop, s.target].join('|');

test('indicadores ficam em faixas válidas', () => {
  const cs = synthetic(500, 7);
  const r = rsi(cs.map((c) => c.c));
  assert.ok(r.slice(15).every((x) => x >= 0 && x <= 100));
  assert.ok(atr(cs).every((x) => x > 0));
  assert.ok(Number.isNaN(ema([1, 2, 3], 5)[2]));
});

test('setups têm preços coerentes e R:R mínimo', () => {
  let total = 0;
  for (const seed of [1, 2, 3, 4, 5]) {
    const cs = synthetic(3000, seed);
    const setups = detectSetups(cs, { htfFilter: 'off' });
    total += setups.length;
    for (const s of setups) {
      if (s.side === 'long') assert.ok(s.stop < s.entry && s.entry < s.target, key(s));
      else assert.ok(s.target < s.entry && s.entry < s.stop, key(s));
      assert.ok(s.rr >= DEFAULTS.minRR - 1e-9);
      assert.ok(s.sweepIdx <= s.i && s.obIdx <= s.i);
    }
  }
  assert.ok(total > 20, `poucos setups encontrados: ${total}`);
});

test('sem olhar o futuro: cortar os dados não muda os setups anteriores', () => {
  const cs = synthetic(2500, 11);
  const full = detectSetups(cs, { htfFilter: 'off' });
  for (const m of [700, 1300, 2100]) {
    const cut = detectSetups(cs.slice(0, m), { htfFilter: 'off' });
    assert.deepEqual(cut.map(key), full.filter((s) => s.i < m).map(key), `corte em ${m}`);
  }
});

test('filtro do tempo maior também não olha o futuro', () => {
  const cs = synthetic(2400, 5);
  const day = 6;
  const htf = [];
  for (let i = 0; i + day <= cs.length; i += day) {
    const g = cs.slice(i, i + day);
    htf.push({ t: g[0].t, T: g[day - 1].T, o: g[0].o, c: g[day - 1].c, h: Math.max(...g.map((x) => x.h)), l: Math.min(...g.map((x) => x.l)), v: 1 });
  }
  const at = makeHtfTrend(htf);
  const m = 1500;
  const atCut = makeHtfTrend(htf.filter((c) => c.T <= cs[m - 1].T));
  for (let i = 0; i < m; i++) assert.equal(at(cs[i].T), atCut(cs[i].T));
});

test('simulação: execução e alvo', () => {
  // fechamentos 10 → 9,5 (executa a compra em 9,5) → 9 → 9,6 → 12 (alvo 11)
  const cs = fromCloses([10, 10, 10, 9.5, 9, 9.6, 12, 8]);
  const r = simulate(cs, { i: 0, entry: 9.5, stop: 8.5, target: 11 }, { ...DEFAULTS, feePct: 0 });
  assert.equal(r.status, 'ganho');
  assert.equal(r.fillIdx, 3);
  assert.equal(r.exitIdx, 6);
  assert.equal(r.R, 1.5);
});

test('simulação: stop e alvo no mesmo candle conta como stop', () => {
  const cs = [
    { t: 0, T: 1, o: 10, h: 10, l: 10, c: 10, v: 1 },
    { t: 2, T: 3, o: 10, h: 10, l: 9.4, c: 9.6, v: 1 },   // executa em 9,5
    { t: 4, T: 5, o: 9.6, h: 12, l: 8.5, c: 10, v: 1 },   // toca stop e alvo
  ];
  const r = simulate(cs, { i: 0, entry: 9.5, stop: 9, target: 11 }, { ...DEFAULTS, feePct: 0 });
  assert.equal(r.status, 'perda');
  assert.equal(r.R, -1);
});

test('simulação: alvo antes da entrada e ordem expirada', () => {
  const up = [
    { t: 0, T: 1, o: 10, h: 10, l: 10, c: 10, v: 1 },
    { t: 2, T: 3, o: 10, h: 11.5, l: 9.8, c: 11, v: 1 },
  ];
  assert.equal(simulate(up, { i: 0, entry: 9.5, stop: 9, target: 11 }, DEFAULTS).status, 'perdida');
  const flat = Array.from({ length: 40 }, (_, k) => ({ t: k, T: k + 0.5, o: 10, h: 10.1, l: 9.9, c: 10, v: 1 }));
  assert.equal(simulate(flat, { i: 0, entry: 9.5, stop: 9, target: 11 }, DEFAULTS).status, 'expirada');
});

test('backtest e análise rodam de ponta a ponta', () => {
  const cs = synthetic(3000, 3);
  const bt = backtestSymbol('TESTUSDT', cs, [], { htfFilter: 'off' });
  const sum = summarize([bt], cs[2000].T, 1);
  assert.equal(sum.all.trades, sum.inSample.trades + sum.outSample.trades);
  for (const t of bt.trades) {
    assert.ok(Number.isFinite(t.R));
    assert.ok(t.entryT <= t.exitT);
  }
  // sem sobreposição: cada operação começa depois da anterior terminar
  for (let k = 1; k < bt.trades.length; k++) assert.ok(bt.trades[k].setupT > bt.trades[k - 1].exitT - 1);
  const a = analyze(cs.slice(0, 1000), [], { htfFilter: 'off' });
  assert.ok(a.context.rangePos >= 0 && a.context.rangePos <= 1);
});

const ALL_ON = { htfFilter: 'off', obEntry: 'auto', cancelAfterR: 2, exitOnBOS: true, minScore: 40 };

test('opções novas também não olham o futuro', () => {
  const cs = synthetic(2500, 21);
  const full = detectSetups(cs, ALL_ON);
  const st = (s) => key(s) + '|' + s.result.status;
  for (const m of [900, 1700]) {
    const cut = detectSetups(cs.slice(0, m), ALL_ON);
    // setups e resultados já encerrados antes do corte devem ser idênticos
    const done = (s) => s.result.endIdx < m - 1;
    assert.deepEqual(cut.filter(done).map(st), full.filter((s) => s.i < m && done(s)).map(st), `corte em ${m}`);
  }
});

test('entrada no meio do OB fica dentro do bloco e nota mínima filtra', () => {
  const cs = synthetic(3000, 4);
  for (const s of detectSetups(cs, { htfFilter: 'off', obEntry: 'meio' })) {
    const lo = Math.min(s.obProx, s.obDist), hi = Math.max(s.obProx, s.obDist);
    assert.ok(s.entry >= lo - 1e-9 && s.entry <= hi + 1e-9);
    assert.equal(s.entryMode, 'meio');
  }
  assert.ok(detectSetups(cs, { htfFilter: 'off', minScore: 45 }).every((s) => s.score >= 45));
});

test('cancelamento e saída no BOS aparecem e são contabilizados', () => {
  let cancel = 0, bos = 0;
  for (const seed of [1, 2, 3, 4, 5, 6]) {
    const cs = synthetic(3000, seed);
    for (const s of detectSetups(cs, { htfFilter: 'off', cancelAfterR: 1, exitOnBOS: true })) {
      if (s.result.status === 'cancelada') cancel++;
      if (s.result.status === 'bos') {
        bos++;
        assert.ok(s.result.R > -1.2, 'saída no BOS não pode perder mais que o stop');
      }
    }
  }
  assert.ok(cancel > 0 && bos > 0, `cancel=${cancel} bos=${bos}`);
  const cs = synthetic(3000, 2);
  const b = backtestSymbol('X', cs, [], { htfFilter: 'off', cancelAfterR: 1 });
  assert.ok(b.cancelled > 0);
});
