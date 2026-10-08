// Gera candles simulados (passeio aleatório com fases de tendência e lateralização).
export function synthetic(n = 3000, seed = 1, startPrice = 100, stepMs = 4 * 3600e3) {
  let s = seed >>> 0;
  const rnd = () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 2 ** 32; };
  const gauss = () => { let u = 0; for (let i = 0; i < 6; i++) u += rnd(); return u - 3; };
  const cs = [];
  let price = startPrice, drift = 0;
  const t0 = Date.UTC(2023, 0, 1);
  for (let i = 0; i < n; i++) {
    if (i % 150 === 0) drift = (rnd() - 0.5) * 0.004;
    const o = price;
    const c = o * (1 + drift + gauss() * 0.012);
    const h = Math.max(o, c) * (1 + Math.abs(gauss()) * 0.006);
    const l = Math.min(o, c) * (1 - Math.abs(gauss()) * 0.006);
    const t = t0 + i * stepMs;
    cs.push({ t, T: t + stepMs - 1, o, h, l, c, v: 1000 * (1 + Math.abs(gauss())) });
    price = c;
  }
  return cs;
}

// Candles a partir de uma lista de fechamentos (pavios pequenos e fixos).
export function fromCloses(closes, stepMs = 4 * 3600e3) {
  const t0 = Date.UTC(2024, 0, 1);
  return closes.map((c, i) => {
    const o = i ? closes[i - 1] : c;
    const t = t0 + i * stepMs;
    return { t, T: t + stepMs - 1, o, c, h: Math.max(o, c) + 0.1, l: Math.min(o, c) - 0.1, v: 100 };
  });
}
