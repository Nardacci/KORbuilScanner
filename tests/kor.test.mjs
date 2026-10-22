import { test } from 'node:test';
import assert from 'node:assert/strict';
import { aggregate, volumeProfile, korSetups, mirrorCandles } from '../assets/js/kor.js';

const M15 = 15 * 60e3, H4 = 4 * 3600e3;

// Candles de 15m a partir de pontos (índice, preço), com um zigue-zague pequeno para formar topos/fundos.
function path(points, volAt = () => 100) {
  const cs = [];
  const t0 = Date.UTC(2024, 0, 1);
  let prev = points[0][1];
  for (let p = 1; p < points.length; p++) {
    const [i0, a] = points[p - 1], [i1, b] = points[p];
    for (let i = i0; i < i1; i++) {
      const base = a + (b - a) * ((i - i0 + 1) / (i1 - i0));
      const zz = ((i % 6) < 3 ? 1 : -1) * base * 0.002;
      const c = base + zz;
      const o = prev;
      cs.push({ t: t0 + i * M15, T: t0 + (i + 1) * M15 - 1, o, c, h: Math.max(o, c) * 1.001, l: Math.min(o, c) * 0.999, v: volAt(i) });
      prev = c;
    }
  }
  return cs;
}

// Queda, lateral entre 100 e 110, Spring até 94 (com um topo mais baixo em 98), confirmação,
// volta até a região da POC da perna e alta até 130.
function springScenario() {
  const pts = [[0, 200], [960, 100]];
  let i = 960;
  for (let s = 0; s < 5; s++) { pts.push([i + 64, 110], [i + 128, 100]); i += 128; }
  pts.push([i + 12, 95], [i + 18, 98], [i + 24, 94], [i + 40, 104], [i + 48, 101], [i + 56, 97], [i + 260, 130]);
  const spring = i;
  return { L: path(pts, (k) => (k >= spring + 24 && k < spring + 40 ? 400 : 100)), spring };
}

test('aggregate junta 16 candles de 15m em um de 4h', () => {
  const L = path([[0, 100], [64, 120]]);
  const H = aggregate(L, H4);
  assert.equal(H.length, 4);
  assert.equal(H[0].o, L[0].o);
  assert.equal(H[0].c, L[15].c);
  assert.equal(H[0].v, 1600);
});

test('volumeProfile acha a POC onde o volume se concentra', () => {
  const cs = [
    { h: 101, l: 100, v: 10 }, { h: 106, l: 105, v: 100 }, { h: 110, l: 109, v: 10 },
  ];
  const vp = volumeProfile(cs, 0, 2, 10);
  assert.ok(vp.poc > 104 && vp.poc < 107, `poc ${vp.poc}`);
  assert.ok(vp.val <= vp.poc && vp.vah >= vp.poc);
});

test('Spring numa lateral gera compra com entrada, stop abaixo da captura e alvo na liquidez', () => {
  const { L } = springScenario();
  const H = aggregate(L, H4);
  const st = korSetups(H, L, { minClass: 'C', maxRiskPct: 100 });
  const sp = st.filter((s) => s.kind === 'spring' && s.side === 'long');
  assert.ok(sp.length >= 1, 'deveria achar o Spring');
  const s = sp[0];
  assert.ok(s.stop < 94, `stop ${s.stop}`);
  assert.ok(s.entry > s.stop && s.tp1 > s.entry);
  assert.ok(s.rr >= 2);
  assert.ok(s.region.bottom <= 100.5 && s.region.top >= 109);
  assert.ok(['ganho-parcial', 'trailing', 'ganho', 'aberta'].includes(s.result.status), s.result.status);
});

test('venda é o espelho exato da compra', () => {
  const { L } = springScenario();
  const Lm = mirrorCandles(L).map((c) => ({ ...c, o: c.o + 400, h: c.h + 400, l: c.l + 400, c: c.c + 400 }));
  const H = aggregate(L, H4), Hm = aggregate(Lm, H4);
  const a = korSetups(H, L, { minClass: 'C', fundingPct8h: 0, feePct: 0, slipPct: 0, maxRiskPct: 100 }).filter((s) => s.side === 'long');
  const b = korSetups(Hm, Lm, { minClass: 'C', fundingPct8h: 0, feePct: 0, slipPct: 0, maxRiskPct: 100 }).filter((s) => s.side === 'short');
  assert.equal(a.length, b.length);
  for (let i = 0; i < a.length; i++) {
    assert.equal(a[i].kind, b[i].kind);
    assert.ok(Math.abs(a[i].entry - (400 - b[i].entry)) < 1e-6);
    assert.ok(Math.abs(a[i].result.R - b[i].result.R) < 1e-9);
  }
});

test('sem olhar o futuro: cortar os dados não muda os setups anteriores', () => {
  const { L } = springScenario();
  const H = aggregate(L, H4);
  const full = korSetups(H, L, { minClass: 'C', maxRiskPct: 100 });
  const cut = L.length - 120;
  const Lc = L.slice(0, cut), Hc = aggregate(Lc, H4).filter((c) => c.T <= Lc[Lc.length - 1].T);
  const part = korSetups(Hc, Lc, { minClass: 'C', maxRiskPct: 100 });
  for (const s of part) {
    const f = full.find((x) => x.confirmT === s.confirmT && x.side === s.side && x.kind === s.kind);
    assert.ok(f, 'setup do passado sumiu com dados novos');
    assert.equal(f.entry, s.entry);
    assert.equal(f.stop, s.stop);
  }
});
