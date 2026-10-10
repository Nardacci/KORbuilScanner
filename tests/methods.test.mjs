import test from 'node:test';
import assert from 'node:assert/strict';
import { synthetic } from './synthetic.mjs';
import { detectWith, analyzeAll, consensus, METHOD_IDS } from '../assets/js/methods.js';
import { backtestSymbol, summarize } from '../assets/js/backtest.js';
import { grab, waves } from '../assets/js/onda34.js';
import { dowState } from '../assets/js/dow.js';

const key = (s) => [s.method, s.i, s.side, s.entry, s.stop, s.target].join('|');
const OFF = { htfFilter: 'off' };

for (const m of ['dow', 'onda34']) {
  test(`${m}: preços coerentes, entrada a mercado no fechamento do sinal`, () => {
    let n = 0;
    for (const seed of [1, 2, 3, 4]) {
      const cs = synthetic(3000, seed);
      for (const s of detectWith(m, cs, OFF)) {
        n++;
        if (s.side === 'long') assert.ok(s.stop < s.entry && s.entry < s.target, key(s));
        else assert.ok(s.target < s.entry && s.entry < s.stop, key(s));
        assert.ok(s.rr >= 2 - 1e-9);
        assert.equal(s.entry, cs[s.i].c, 'entra no fechamento do candle do sinal');
        assert.equal(s.result.fillIdx, s.i);
        assert.notEqual(s.result.status, 'pendente');
      }
    }
    assert.ok(n > 10, `poucos sinais: ${n}`);
  });

  test(`${m}: sem olhar o futuro`, () => {
    const cs = synthetic(2500, 13);
    const full = detectWith(m, cs, OFF);
    for (const cut of [800, 1600, 2300]) {
      const part = detectWith(m, cs.slice(0, cut), OFF);
      assert.deepEqual(part.map(key), full.filter((s) => s.i < cut).map(key), `corte em ${cut}`);
    }
  });

  test(`${m}: backtest roda e soma certo`, () => {
    const cs = synthetic(3000, 8);
    const bt = backtestSymbol('X', cs, [], OFF, 0, m);
    const sum = summarize([bt], cs[2000].T);
    assert.equal(sum.all.trades, sum.inSample.trades + sum.outSample.trades);
    assert.ok(bt.trades.every((t) => t.method === m && Number.isFinite(t.R)));
  });
}

test('Dow: sinal de compra tem fundo mais alto e rompe o topo entre os fundos', () => {
  const cs = synthetic(3000, 2);
  for (const s of detectWith('dow', cs, OFF).filter((x) => x.side === 'long')) {
    assert.ok(s.swingL2.p > s.swingL1.p);
    assert.ok(s.swingL1.i < s.swingH.i && s.swingH.i < s.swingL2.i);
    assert.ok(cs[s.i].c > s.swingH.p);
  }
  assert.ok(['alta', 'baixa', 'indefinida'].includes(dowState(cs, 3).trend));
});

test('Onda 34: candle do sinal fecha acima da onda (verde) e o anterior não', () => {
  const cs = synthetic(3000, 5);
  const colors = grab(cs, waves(cs));
  for (const s of detectWith('onda34', cs, OFF).filter((x) => x.side === 'long')) {
    assert.equal(colors[s.i], 'g');
    assert.notEqual(colors[s.i - 1], 'g');
  }
});

test('análise com todos os métodos e consenso', () => {
  const cs = synthetic(1000, 9);
  const all = analyzeAll(cs, [], OFF);
  assert.deepEqual(Object.keys(all.methods), METHOD_IDS);
  const c = consensus(all);
  assert.ok(c.long.length + c.short.length <= METHOD_IDS.length);
});

test('Onda 34 sai no fechamento do outro lado da onda; Dow sai quando a sequência de fundos se desfaz', () => {
  let onda = 0, bos = 0;
  for (const seed of [1, 2, 3]) {
    const cs = synthetic(3000, seed);
    const w = waves(cs);
    for (const s of detectWith('onda34', cs, OFF)) if (s.result.status === 'onda') {
      onda++;
      const k = s.result.exitIdx;
      if (s.side === 'long') assert.ok(cs[k].c < w.lo[k], 'compra sai com fechamento abaixo da onda');
      else assert.ok(cs[k].c > w.hi[k], 'venda sai com fechamento acima da onda');
      assert.ok(s.result.R > -1.2);
    }
    for (const s of detectWith('dow', cs, OFF)) if (s.result.status === 'bos') bos++;
  }
  assert.ok(onda > 0 && bos > 0, `onda=${onda} bos=${bos}`);
});
