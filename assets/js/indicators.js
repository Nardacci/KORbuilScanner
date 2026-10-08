// Indicadores básicos. Todos recebem candles no formato
// { t, T, o, h, l, c, v } (t = abertura, T = fechamento, em ms)
// e devolvem um array do mesmo tamanho (NaN onde ainda não há dados).

export function atr(cs, n = 14) {
  const out = new Array(cs.length).fill(NaN);
  let sum = 0;
  for (let i = 0; i < cs.length; i++) {
    const c = cs[i];
    const tr = i === 0
      ? c.h - c.l
      : Math.max(c.h - c.l, Math.abs(c.h - cs[i - 1].c), Math.abs(c.l - cs[i - 1].c));
    if (i < n) {
      sum += tr;
      if (i === n - 1) out[i] = sum / n;
    } else {
      out[i] = (out[i - 1] * (n - 1) + tr) / n;
    }
  }
  // Antes de ter n candles, usa a amplitude média disponível (evita NaN no começo).
  let acc = 0;
  for (let i = 0; i < Math.min(n - 1, cs.length); i++) {
    acc += cs[i].h - cs[i].l;
    out[i] = acc / (i + 1);
  }
  return out;
}

export function ema(values, n) {
  const out = new Array(values.length).fill(NaN);
  const k = 2 / (n + 1);
  let sum = 0;
  for (let i = 0; i < values.length; i++) {
    if (i < n) {
      sum += values[i];
      if (i === n - 1) out[i] = sum / n;
    } else {
      out[i] = values[i] * k + out[i - 1] * (1 - k);
    }
  }
  return out;
}

export function sma(values, n) {
  const out = new Array(values.length).fill(NaN);
  let sum = 0;
  for (let i = 0; i < values.length; i++) {
    sum += values[i];
    if (i >= n) sum -= values[i - n];
    if (i >= n - 1) out[i] = sum / n;
  }
  return out;
}

export function rsi(closes, n = 14) {
  const out = new Array(closes.length).fill(NaN);
  let gain = 0, loss = 0;
  for (let i = 1; i < closes.length; i++) {
    const d = closes[i] - closes[i - 1];
    const g = Math.max(d, 0), l = Math.max(-d, 0);
    if (i <= n) {
      gain += g; loss += l;
      if (i === n) { gain /= n; loss /= n; out[i] = loss === 0 ? 100 : 100 - 100 / (1 + gain / loss); }
    } else {
      gain = (gain * (n - 1) + g) / n;
      loss = (loss * (n - 1) + l) / n;
      out[i] = loss === 0 ? 100 : 100 - 100 / (1 + gain / loss);
    }
  }
  return out;
}

// Topo (fundo) confirmado: maior máxima (menor mínima) entre k candles de cada lado.
// Empate à esquerda é aceito, à direita não, para não marcar dois pivôs no mesmo nível.
export function isPivotHigh(cs, p, k) {
  if (p - k < 0 || p + k >= cs.length) return false;
  for (let j = p - k; j <= p + k; j++) {
    if (j === p) continue;
    if (j < p ? cs[j].h > cs[p].h : cs[j].h >= cs[p].h) return false;
  }
  return true;
}

export function isPivotLow(cs, p, k) {
  if (p - k < 0 || p + k >= cs.length) return false;
  for (let j = p - k; j <= p + k; j++) {
    if (j === p) continue;
    if (j < p ? cs[j].l < cs[p].l : cs[j].l <= cs[p].l) return false;
  }
  return true;
}
