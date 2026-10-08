// Dados públicos de futuros perpétuos USDT-M da Binance (não precisa de chave).
// As chamadas saem do navegador de quem usa a página.

const BASE = 'https://fapi.binance.com';
const EXCLUDE = new Set(['USDCUSDT', 'FDUSDUSDT', 'TUSDUSDT', 'BUSDUSDT', 'USDPUSDT']);

export const INTERVAL_MS = {
  '15m': 9e5, '30m': 18e5, '1h': 36e5, '2h': 72e5, '4h': 144e5, '6h': 216e5,
  '8h': 288e5, '12h': 432e5, '1d': 864e5, '3d': 2592e5, '1w': 6048e5,
};

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// A Binance limita o "peso" das requisições por minuto (2400 nos futuros).
// Usamos no máximo 1200 por minuto para sobrar margem.
const BUDGET = 1200;
let used = [];
let onThrottle = null; // avisa a tela quando estiver esperando o limite
async function spend(weight) {
  for (;;) {
    const now = Date.now();
    used = used.filter((u) => now - u.t < 60e3);
    const total = used.reduce((a, u) => a + u.w, 0);
    if (total + weight <= BUDGET) { used.push({ t: now, w: weight }); return; }
    const wait = 60e3 - (now - used[0].t) + 50;
    if (onThrottle) onThrottle(wait);
    await sleep(wait);
  }
}
export const setOnThrottle = (fn) => { onThrottle = fn; };

const klineWeight = (limit) => (limit < 100 ? 1 : limit < 500 ? 2 : limit <= 1000 ? 5 : 10);

async function get(path, params = {}, weight = 1, tries = 3) {
  await spend(weight);
  const url = `${BASE}${path}?${new URLSearchParams(params)}`;
  for (let k = 0; ; k++) {
    let res;
    try {
      res = await fetch(url);
    } catch (e) {
      if (k + 1 >= tries) throw new Error('Não foi possível falar com a Binance. Verifique a internet (ou se a rede bloqueia a Binance).');
      await sleep(1000 * 2 ** k);
      continue;
    }
    if (res.ok) return res.json();
    if ((res.status === 429 || res.status === 418) && k + 1 < tries) {
      const wait = Number(res.headers.get('Retry-After')) || 30;
      await sleep(wait * 1000);
      continue;
    }
    if (res.status === 451 || res.status === 403) {
      throw new Error('A Binance recusou o acesso a partir desta rede/região (HTTP ' + res.status + ').');
    }
    throw new Error(`Binance respondeu HTTP ${res.status} em ${path}`);
  }
}

const toCandle = (k) => ({ t: k[0], o: +k[1], h: +k[2], l: +k[3], c: +k[4], v: +k[7], T: k[6] });

// Os N contratos perpétuos em USDT com maior volume financeiro em 24h.
export async function topSymbols(n = 40) {
  const [info, tickers] = await Promise.all([get('/fapi/v1/exchangeInfo', {}, 1), get('/fapi/v1/ticker/24hr', {}, 40)]);
  const ok = new Set(info.symbols
    .filter((s) => s.contractType === 'PERPETUAL' && s.quoteAsset === 'USDT' && s.status === 'TRADING')
    .map((s) => s.symbol));
  return tickers
    .filter((t) => ok.has(t.symbol) && !EXCLUDE.has(t.symbol))
    .sort((a, b) => +b.quoteVolume - +a.quoteVolume)
    .slice(0, n)
    .map((t) => ({ symbol: t.symbol, quoteVolume: +t.quoteVolume, change: +t.priceChangePercent }));
}

// Últimos candles FECHADOS (o candle em formação fica de fora).
export async function klines(symbol, interval, limit = 1000) {
  const lim = Math.min(limit + 1, 1500);
  const rows = await get('/fapi/v1/klines', { symbol, interval, limit: lim }, klineWeight(lim));
  const now = Date.now();
  return rows.map(toCandle).filter((c) => c.T < now).slice(-limit);
}

// Histórico longo, paginado de 1500 em 1500 candles.
export async function klinesRange(symbol, interval, startTime, endTime = Date.now()) {
  const out = [];
  let from = startTime;
  const step = INTERVAL_MS[interval];
  while (from < endTime) {
    const rows = await get('/fapi/v1/klines', { symbol, interval, startTime: from, limit: 1500 }, 10);
    if (!rows.length) break;
    for (const r of rows) out.push(toCandle(r));
    const lastOpen = rows[rows.length - 1][0];
    if (rows.length < 1500) break;
    from = lastOpen + step;
  }
  const now = Date.now();
  return out.filter((c) => c.T < now && c.t <= endTime);
}

// Executa tarefas com no máximo `limit` ao mesmo tempo.
export async function pool(items, limit, fn) {
  const results = new Array(items.length);
  let next = 0;
  const worker = async () => {
    while (next < items.length) {
      const k = next++;
      try { results[k] = { ok: true, value: await fn(items[k], k) }; } catch (e) { results[k] = { ok: false, error: e }; }
    }
  };
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, worker));
  return results;
}
