import { DEFAULTS, HTF } from './engine.js';
import { METHODS, METHOD_IDS, analyzeAll, consensus } from './methods.js';
import { dowState } from './dow.js';
import { ondaState } from './onda34.js';
import { backtestSymbol, summarize, metrics } from './backtest.js';
import { topSymbols, klines, klinesRange, pool, setOnThrottle, livePrices, INTERVAL_MS } from './binance.js';
import { renderSymbolChart, renderEquity, setLivePrice } from './charts.js';
import {
  fmtPrice, fmtNum, fmtPct, fmtR, fmtDate, sideLabel, STATUS, rangeZone,
  describeSetup, describeStatus, describeWait,
} from './texts.js';

const $ = (s) => document.querySelector(s);
const $$ = (s) => [...document.querySelectorAll(s)];
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

const TFS = ['15m', '30m', '1h', '2h', '4h', '6h', '12h', '1d'];
const TF_LABEL = { '15m': '15 min', '30m': '30 min', '1h': '1 hora', '2h': '2 horas', '4h': '4 horas', '6h': '6 horas', '12h': '12 horas', '1d': 'Diário' };
const HTF_LABEL = { '1h': '1h', '2h': '2h', '4h': '4h', '8h': '8h', '1d': 'diário', '3d': '3 dias', '1w': 'semanal' };

// ---------------------------------------------------------------------------
// Configurações (guardadas só neste navegador).
const CFG_KEY = 'korbuilscanner.cfg.v1';
const CFG_DEFAULTS = { ...DEFAULTS, riskPct: 1, extra: 'MEUSDT' };
let cfg = loadCfg();

function loadCfg() {
  try {
    const saved = JSON.parse(localStorage.getItem(CFG_KEY) || '{}');
    return { ...CFG_DEFAULTS, ...saved };
  } catch { return { ...CFG_DEFAULTS }; }
}
function saveCfg() {
  try { localStorage.setItem(CFG_KEY, JSON.stringify(cfg)); } catch { /* navegador sem armazenamento: vale só nesta visita */ }
}
const parseSymbols = (text) => [...new Set((text || '').split(/[\s,;]+/)
  .map((s) => s.trim().toUpperCase())
  .map((s) => (s && !s.endsWith('USDT') ? `${s}USDT` : s))
  .filter((s) => /^[A-Z0-9]{2,20}USDT$/.test(s)))];
const extraSymbols = () => parseSymbols(cfg.extra);

// ---------------------------------------------------------------------------
// Abas
function showTab(name) {
  for (const b of $$('.tabs button')) b.setAttribute('aria-selected', String(b.dataset.tab === name));
  for (const s of $$('.tab')) s.hidden = s.id !== `tab-${name}`;
}

function progress(sectionSel, frac) {
  const p = $(`${sectionSel} .progress`);
  p.hidden = frac == null;
  if (frac != null) p.querySelector('.bar').style.width = `${Math.round(frac * 100)}%`;
}
function setStatus(sel, msg, error = false) {
  const el = $(sel);
  el.textContent = msg;
  el.classList.toggle('error', error);
}

async function symbolList(n) {
  const top = await topSymbols(n);
  const have = new Set(top.map((t) => t.symbol));
  for (const s of extraSymbols()) if (!have.has(s)) top.push({ symbol: s, quoteVolume: 0, change: NaN, extra: true });
  return top;
}

// ---------------------------------------------------------------------------
// SCANNER
let scan = null;       // { tf, htf, rows }
let scanFilter = 'todos';

let scanning = false;
let openSym = null; // ativo aberto no detalhe
let scanMethod = 'smc';   // método que define o sinal na tabela
let detailMethod = 'smc'; // método mostrado no detalhe

// Visão de um ativo por um método: setups do método + contexto comum.
const aOf = (r, m) => ({ ...r.all.methods[m], context: r.all.context, structure: r.all.structure });
// Contexto específico do método (para o texto de "aguardar").
const methodCtx = (r, m) => (m === 'dow' ? dowState(r.cs, cfg.pivot) : m === 'onda34' ? ondaState(r.cs) : null);

async function runScan(auto = false) {
  const tf = $('#sc-tf').value;
  const htf = HTF[tf];
  const n = Number($('#sc-n').value);
  const keep = auto && !$('#detail').hidden ? openSym : null;
  scanning = true;
  $('#sc-run').disabled = true;
  if (!keep) { $('#detail').hidden = true; openSym = null; }
  progress('#tab-scanner', 0);
  setOnThrottle((ms) => setStatus('#sc-status',`Aguardando o limite de requisições da Binance (${Math.ceil(ms / 1000)}s)…`));
  try {
    setStatus('#sc-status', 'Buscando as moedas de maior volume…');
    const list = await symbolList(n);
    let done = 0;
    const res = await pool(list, 6, async (item) => {
      const [cs, hcs] = await Promise.all([klines(item.symbol, tf, 999), klines(item.symbol, htf, 300)]);
      if (cs.length < 120) throw new Error('histórico curto');
      const all = analyzeAll(cs, hcs, cfg);
      done++;
      progress('#tab-scanner', done / list.length);
      setStatus('#sc-status', `Analisando… ${done}/${list.length}`);
      const row = { ...item, cs, all };
      Object.defineProperty(row, 'a', { get() { return aOf(this, scanMethod); } });
      return row;
    });
    const rows = [], failed = [];
    res.forEach((r, k) => (r.ok ? rows.push(r.value) : failed.push(`${list[k].symbol} (${r.error.message})`)));
    if (!rows.length) throw new Error(failed[0] || 'nenhum ativo analisado');
    rows.forEach((r, k) => { r.rank = k; });
    const lastClose = Math.max(...rows.map((r) => r.cs[r.cs.length - 1].T));
    scan = { tf, htf, rows, at: Date.now(), nextClose: lastClose + INTERVAL_MS[tf] };
    renderScan();
    if (keep && rows.some((r) => r.symbol === keep)) showDetail(keep, undefined, false);
    liveTick();
    const nAct = rows.filter((r) => r.a.active).length;
    setStatus('#sc-status', `${rows.length} ativos analisados às ${fmtDate(Date.now()).slice(9)} · ${nAct} com setup ativo` +
      (failed.length ? ` · falharam: ${failed.join(', ')}` : ''));
  } catch (e) {
    setStatus('#sc-status', e.message, true);
  } finally {
    scanning = false;
    $('#sc-run').disabled = false;
    progress('#tab-scanner', null);
  }
}

// Preço ao vivo a cada 10 s e nova análise quando o candle do tempo gráfico fecha.
let liveBusy = false;
async function liveTick() {
  if (!scan || scanning || liveBusy || document.hidden) return;
  // Reanálise: 10 s depois do fechamento, no máximo uma vez por minuto (a Binance pode demorar a publicar o candle).
  if ($('#sc-auto').checked && Date.now() > scan.nextClose + 10e3 && Date.now() - scan.at > 60e3 && scan.tf === $('#sc-tf').value) {
    runScan(true);
    return;
  }
  liveBusy = true;
  try {
    const px = await livePrices();
    for (const r of scan.rows) if (px.has(r.symbol)) r.live = px.get(r.symbol);
    renderScan();
    if (openSym && !$('#detail').hidden) {
      const r = scan.rows.find((x) => x.symbol === openSym);
      if (r && Number.isFinite(r.live)) {
        $('#dt-price').textContent = fmtPrice(r.live);
        setLivePrice(r.live);
      }
    }
    const el = $('#sc-live');
    el.hidden = false;
    el.textContent = `Preço ao vivo · ${new Date().toLocaleTimeString('pt-BR')} · próximo candle fecha às ${new Date(scan.nextClose + 1).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}`;
  } catch { /* falha momentânea: tenta de novo no próximo ciclo */ } finally {
    liveBusy = false;
  }
}

function rowOrder(a, b) {
  const sa = a.a.active, sb = b.a.active;
  if (sa && !sb) return -1;
  if (sb && !sa) return 1;
  if (sa && sb) return sb.score - sa.score;
  return a.rank - b.rank;
}

function trendCell(r) {
  const arrow = (t) => (t === 'alta' ? '▲' : t === 'baixa' ? '▼' : '–');
  const c = r.a.context;
  return `<span class="trend-${c.tfTrend}">${scan.tf} ${arrow(c.tfTrend)}</span> · <span class="trend-${c.htfTrend}">${HTF_LABEL[scan.htf]} ${arrow(c.htfTrend)}</span>`;
}

function situation(r) {
  const s = r.a.active, c = r.a.context;
  if (!s) return rangeZone(c.rangePos).replace(/^na |^no /, '').replace(/^./, (x) => x.toUpperCase());
  const price = Number.isFinite(r.live) ? r.live : c.price;
  if (s.result.status === 'aberta') {
    const R = (s.side === 'long' ? price - s.entry : s.entry - price) / Math.abs(s.entry - s.stop);
    return `Em operação · ${fmtR(R)}`;
  }
  if (touched(r)) return 'Preço chegou na entrada';
  const dist = Math.abs((price - s.entry) / s.entry) * 100;
  return `Ordem pendente · a ${fmtNum(dist, 1)}%`;
}

function touched(r) {
  const s = r.a.active;
  if (!s || s.result.status !== 'pendente' || !Number.isFinite(r.live)) return false;
  return s.side === 'long' ? r.live <= s.entry : r.live >= s.entry;
}

// Uma letra por método: verde = compra, vermelho = venda, cinza = aguardar.
function consCell(r) {
  const c = consensus(r.all);
  const dots = METHOD_IDS.map((m) => {
    const a = r.all.methods[m].active;
    const cls = a ? a.side : 'wait';
    return `<span class="cons ${cls}" title="${esc(METHODS[m].name)}: ${a ? sideLabel(a.side) : 'aguardar'}">${METHODS[m].short[0]}</span>`;
  }).join('');
  const n = Math.max(c.long.length, c.short.length);
  const side = c.long.length >= c.short.length ? 'compra' : 'venda';
  return `<span class="cons-wrap">${dots}</span>${n >= 2 ? ` <small class="cons-n">${n}/${METHOD_IDS.length} ${side}</small>` : ''}`;
}

function renderScan() {
  const rows = [...scan.rows].sort(rowOrder);
  const counts = { todos: rows.length, long: 0, short: 0, aguardar: 0 };
  for (const r of rows) counts[r.a.active ? r.a.active.side : 'aguardar']++;
  for (const c of $$('#sc-results .chip')) {
    const f = c.dataset.f;
    c.innerHTML = `${{ todos: 'Todos', long: 'Compra', short: 'Venda', aguardar: 'Aguardar' }[f]}<span class="n">${counts[f]}</span>`;
    c.setAttribute('aria-pressed', String(f === scanFilter));
  }
  const vis = rows.filter((r) => scanFilter === 'todos' || (r.a.active ? r.a.active.side : 'aguardar') === scanFilter);
  $('#sc-body').innerHTML = vis.map((r) => {
    const s = r.a.active, c = r.a.context;
    const badge = s ? `<span class="badge ${s.side}">${sideLabel(s.side)}</span>${s.spring ? `<span class="tag">${s.side === 'long' ? 'Spring' : 'Upthrust'}</span>` : ''}`
      : '<span class="badge wait">AGUARDAR</span>';
    return `<tr data-sym="${esc(r.symbol)}" class="${r.symbol === openSym && !$('#detail').hidden ? 'sel' : ''}">
      <td class="sym">${esc(r.symbol.replace(/USDT$/, ''))}<small>${Number.isFinite(r.change) ? fmtPct(r.change) : 'extra'}</small></td>
      <td>${badge}</td>
      <td>${consCell(r)}</td>
      <td class="${touched(r) ? 'touch' : ''}">${esc(situation(r))}</td>
      <td class="num">${fmtPrice(Number.isFinite(r.live) ? r.live : c.price)}</td>
      <td class="num">${s ? fmtPrice(s.entry) : '—'}</td>
      <td class="num">${s ? fmtPrice(s.stop) : '—'}</td>
      <td class="num">${s ? fmtPrice(s.target) : '—'}</td>
      <td class="num">${s ? fmtNum(s.rr, 1) : '—'}</td>
      <td>${trendCell(r)}</td>
      <td class="num">${fmtNum(c.rsi, 0)}</td>
      <td class="num">${s ? s.score : '—'}</td>
    </tr>`;
  }).join('') || '<tr><td colspan="12" class="muted">Nenhum ativo neste filtro.</td></tr>';
  $('#sc-empty').hidden = true;
  $('#sc-results').hidden = false;
}

function showDetail(sym, setup = undefined, scroll = true) {
  const r = scan.rows.find((x) => x.symbol === sym);
  if (!r) return;
  openSym = sym;
  for (const tr of $$('#sc-body tr')) tr.classList.toggle('sel', tr.dataset.sym === sym);
  const a = aOf(r, detailMethod), c = a.context;
  const s = setup === undefined ? (a.active || a.recent[a.recent.length - 1] || null) : setup;
  const htfName = HTF_LABEL[scan.htf];
  $('#detail').hidden = false;
  $('#dt-methods').innerHTML = METHOD_IDS.map((m) => {
    const act = r.all.methods[m].active;
    return `<button class="mtab" data-m="${m}" aria-pressed="${m === detailMethod}">${esc(METHODS[m].name)}
      <span class="badge ${act ? act.side : 'wait'}">${act ? sideLabel(act.side) : 'AGUARDAR'}</span></button>`;
  }).join('');
  $('#dt-methods').onclick = (ev) => {
    const b = ev.target.closest('button[data-m]');
    if (b && b.dataset.m !== detailMethod) { detailMethod = b.dataset.m; showDetail(sym, undefined, false); }
  };
  $('#dt-title').innerHTML = `${esc(sym)} <span class="badge ${a.active ? a.active.side : 'wait'}">${a.active ? sideLabel(a.active.side) : 'AGUARDAR'}</span>`;
  $('#dt-sub').innerHTML = `${TF_LABEL[scan.tf]} · preço agora <b id="dt-price">${fmtPrice(Number.isFinite(r.live) ? r.live : c.price)}</b> · ` +
    `análise com candles fechados até ${fmtDate(r.cs[r.cs.length - 1].T + 1)} · horários de abertura do candle, como no TradingView`;
  $('#dt-tv').href = `https://www.tradingview.com/chart/?symbol=BINANCE:${encodeURIComponent(sym)}.P`;

  renderSymbolChart($('#dt-chart'), r.cs, s, a.structure, detailMethod);
  if (Number.isFinite(r.live)) setLivePrice(r.live);
  $('#dt-chart-note').hidden = true;
  $('#dt-chart-back').onclick = () => {
    renderSymbolChart($('#dt-chart'), r.cs, s, a.structure, detailMethod);
    if (Number.isFinite(r.live)) setLivePrice(r.live);
    $('#dt-chart-note').hidden = true;
  };

  const isActive = s && (s.result.status === 'pendente' || s.result.status === 'aberta');
  if (s) {
    const riskPct = Math.abs(s.entry - s.stop) / s.entry * 100;
    $('#dt-plan').innerHTML = `
      <span class="badge ${s.side}">${sideLabel(s.side)}</span> ${isActive ? '' : '<span class="muted">(setup já encerrado)</span>'}
      <dl>
        <dt>Situação</dt><dd>${esc(STATUS[s.result.status])}</dd>
        <dt>Entrada</dt><dd>${fmtPrice(s.entry)}</dd>
        <dt>Stop</dt><dd>${fmtPrice(s.stop)}</dd>
        <dt>Alvo</dt><dd>${fmtPrice(s.target)}</dd>
        <dt>R:R</dt><dd>${fmtNum(s.rr, 2)}</dd>
        <dt>Risco até o stop</dt><dd>${fmtNum(riskPct, 2)}%</dd>
        <dt>Alavancagem máx. sugerida</dt><dd>${Math.min(10, Math.max(1, Math.floor(50 / riskPct)))}×</dd>
        <dt>Nota</dt><dd>${s.score}</dd>
      </dl>
      <p class="note">${describeStatus(s, r.cs, cfg)}</p>
      <p class="note muted">A alavancagem sugerida (no máximo 10×) mantém a liquidação pelo menos 2× mais longe que o stop. O tamanho da posição sai do risco por operação, não da alavancagem.</p>`;
    $('#dt-text').innerHTML = describeSetup(s, r.cs, scan.tf, htfName).map((p) => `<p>${p}</p>`).join('') +
      (isActive ? '' : `<p class="muted">Não há setup ativo agora. Este é o último setup encontrado.</p>` +
        describeWait(c, scan.tf, htfName, detailMethod, methodCtx(r, detailMethod)).map((p) => `<p>${p}</p>`).join(''));
  } else {
    $('#dt-plan').innerHTML = `<span class="badge wait">AGUARDAR</span>
      <dl>
        <dt>Topo (100 candles)</dt><dd>${fmtPrice(c.rangeHi)}</dd>
        <dt>Fundo (100 candles)</dt><dd>${fmtPrice(c.rangeLo)}</dd>
        <dt>Posição na faixa</dt><dd>${fmtNum(c.rangePos * 100, 0)}%</dd>
        <dt>RSI</dt><dd>${fmtNum(c.rsi, 0)}</dd>
      </dl>`;
    $('#dt-text').innerHTML = describeWait(c, scan.tf, htfName, detailMethod, methodCtx(r, detailMethod)).map((p) => `<p>${p}</p>`).join('');
  }

  const hist = [...a.recent].reverse();
  $('#dt-hist').innerHTML = hist.map((h, k) => `<tr data-k="${k}" class="${h === s ? 'sel' : ''}">
      <td>${fmtDate(r.cs[h.i].t)}</td>
      <td><span class="badge ${h.side}">${sideLabel(h.side)}</span></td>
      <td class="num">${fmtPrice(h.entry)}</td><td class="num">${fmtPrice(h.stop)}</td><td class="num">${fmtPrice(h.target)}</td>
      <td class="num">${fmtNum(h.rr, 1)}</td>
      <td class="${h.result.R > 0 ? 'pos' : h.result.R < 0 ? 'neg' : ''}">${esc(STATUS[h.result.status])}${h.result.R != null ? ` (${fmtR(h.result.R)})` : ''}</td>
    </tr>`).join('') || '<tr><td colspan="7" class="muted">Nenhum setup nos últimos 100 candles.</td></tr>';
  $('#dt-hist').onclick = (ev) => {
    const tr = ev.target.closest('tr[data-k]');
    if (tr) showDetail(sym, hist[Number(tr.dataset.k)]);
  };
  if (setup === undefined) {
    if (scroll) $('#detail').scrollIntoView({ behavior: 'smooth', block: 'start' });
    runAssetBacktest(sym);
  }
}

// Backtest do setup só neste ativo, mostrado dentro do detalhe.
let assetRun = 0;
async function runAssetBacktest(sym) {
  const months = Number($('#dt-bt-months').value);
  const tf = scan.tf;
  const run = ++assetRun;
  const box = $('#dt-bt');
  const method = detailMethod;
  $('#dt-bt-title').textContent = `${METHODS[method].name} no histórico de ${sym.replace(/USDT$/, '')} (${tf})`;
  box.className = 'muted';
  box.textContent = 'Baixando o histórico e rodando o backtest deste ativo…';
  try {
    const data = await getHistory(sym, tf, months);
    if (run !== assetRun) return; // o usuário já abriu outro ativo
    const res = backtestSymbol(sym, data.cs, data.hcs, cfg, data.start, method);
    const all = metrics(res.trades, cfg.riskPct);
    const longs = metrics(res.trades.filter((t) => t.side === 'long'), cfg.riskPct);
    const shorts = metrics(res.trades.filter((t) => t.side === 'short'), cfg.riskPct);
    const mini = (title, m) => `<div class="card"><h4>${title}</h4><dl>
      <dt>Operações</dt><dd>${m.trades}</dd>
      <dt>Lucrativas</dt><dd>${m.wins} (${fmtNum(m.winRate * 100, 0)}%)</dd>
      <dt>R médio</dt><dd class="${m.avgR > 0 ? 'pos' : m.avgR < 0 ? 'neg' : ''}">${fmtR(m.avgR)}</dd>
      <dt>Total</dt><dd class="${m.totalR > 0 ? 'pos' : m.totalR < 0 ? 'neg' : ''}">${fmtR(m.totalR)}</dd>
      <dt>Maior sequência de perdas</dt><dd>${m.maxLosingStreak}</dd>
    </dl></div>`;
    const ignored = res.expired + res.missed + res.cancelled;
    const few = all.trades < 20;
    const trades = [...res.trades].reverse();
    box.className = '';
    box.innerHTML = `<div class="cards">${mini('Todas', all)}${mini('Só compras', longs)}${mini('Só vendas', shorts)}</div>
      <p class="note">${months} meses · ${res.setups} setups encontrados, ${all.trades} viraram operação` +
      (ignored ? ` (${res.expired} expiraram, ${res.missed} foram ao alvo sem executar${res.cancelled ? `, ${res.cancelled} canceladas` : ''})` : '') + '.' +
      (few ? ' <b>Amostra pequena:</b> com menos de 20 operações, o resultado de um ativo sozinho pode ser sorte ou azar. Compare com o backtest geral.' : '') + `</p>
      <div class="table-wrap tall" style="margin-top:10px"><table class="grid small">
        <thead><tr><th>Candle da entrada</th><th>Lado</th><th class="num">Entrada</th><th class="num">Saída</th><th class="num">R:R</th><th>Resultado</th></tr></thead>
        <tbody>${trades.map((t, k) => `<tr data-k="${k}">
          <td>${fmtDate(t.entryT)}</td>
          <td><span class="badge ${t.side}">${sideLabel(t.side)}</span>${t.spring ? `<span class="tag">${t.side === 'long' ? 'Spring' : 'Upthrust'}</span>` : ''}</td>
          <td class="num">${fmtPrice(t.entry)}</td><td class="num">${fmtPrice(t.exit)}</td><td class="num">${fmtNum(t.rr, 1)}</td>
          <td class="${t.R > 0 ? 'pos' : 'neg'}">${esc(STATUS[t.status])} (${fmtR(t.R)})</td></tr>`).join('') ||
          '<tr><td colspan="6" class="muted">Nenhuma operação no período.</td></tr>'}</tbody>
      </table></div>
      <p class="note muted">Clique numa operação para vê-la no gráfico acima.</p>`;
    box.querySelector('tbody').onclick = (ev) => {
      const tr = ev.target.closest('tr[data-k]');
      if (!tr) return;
      const t = trades[Number(tr.dataset.k)];
      renderSymbolChart($('#dt-chart'), data.cs, t.setup, null);
      const note = $('#dt-chart-note');
      note.querySelector('span').textContent = `Mostrando a operação histórica de ${fmtDate(t.entryT)}: ${sideLabel(t.side)}, ${STATUS[t.status]} (${fmtR(t.R)}).`;
      note.hidden = false;
      note.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };
  } catch (e) {
    if (run === assetRun) { box.className = 'status error'; box.textContent = e.message; }
  }
}

// ---------------------------------------------------------------------------
// BACKTEST
const dataCache = new Map();
let bt = null;

// Histórico longo (com aquecimento antes do início), guardado enquanto a página estiver aberta.
async function getHistory(symbol, tf, months) {
  const key = `${symbol}|${tf}|${months}`;
  if (dataCache.has(key)) return dataCache.get(key);
  const htf = HTF[tf];
  const now = Date.now();
  const start = now - months * 30.44 * 864e5;
  const cs = await klinesRange(symbol, tf, start - INTERVAL_MS[tf] * 300, now);
  const hcs = await klinesRange(symbol, htf, start - INTERVAL_MS[htf] * 80, now);
  if (cs.length < 300) throw new Error('histórico curto');
  const data = { cs, hcs, start, end: now };
  dataCache.set(key, data);
  return data;
}

async function runBacktest() {
  const tf = $('#bt-tf').value;
  const months = Number($('#bt-months').value);
  const nSel = $('#bt-n').value;
  const blind = Number($('#bt-blind').value);
  const method = $('#bt-method').value;
  $('#bt-run').disabled = true;
  $('#bt-methods-wrap').hidden = true;
  $('#bt-compare-wrap').hidden = true;
  $('#bt-detail').hidden = true;
  progress('#tab-backtest', 0);
  setOnThrottle((ms) => setStatus('#bt-status', `Aguardando o limite de requisições da Binance (${Math.ceil(ms / 1000)}s)…`));
  try {
    let list;
    if (nSel === 'custom') {
      list = parseSymbols($('#bt-custom').value).map((symbol) => ({ symbol }));
      if (!list.length) throw new Error('Escreva pelo menos um ativo, ex.: FILUSDT');
    } else {
      setStatus('#bt-status', 'Buscando as moedas de maior volume…');
      list = await symbolList(Number(nSel));
    }
    let done = 0;
    const res = await pool(list, 3, async (item) => {
      const data = await getHistory(item.symbol, tf, months);
      const r = backtestSymbol(item.symbol, data.cs, data.hcs, cfg, data.start, method);
      r.cs = data.cs;
      r.hcs = data.hcs;
      r.start = data.start;
      r.end = data.end;
      done++;
      progress('#tab-backtest', done / list.length);
      setStatus('#bt-status', `Baixando e testando… ${done}/${list.length}`);
      return r;
    });
    const ok = [], failed = [];
    res.forEach((r, k) => (r.ok ? ok.push(r.value) : failed.push(`${list[k].symbol} (${r.error.message})`)));
    if (!ok.length) throw new Error(failed[0] || 'nenhum ativo testado');
    const start = Math.min(...ok.map((r) => r.start));
    const end = Math.max(...ok.map((r) => r.end));
    const cutT = start + (end - start) * (1 - blind);
    bt = { tf, months, method, cutT, start, results: ok, summary: summarize(ok, cutT, cfg.riskPct) };
    renderBacktest();
    setStatus('#bt-status', `${ok.length} ativos testados · ${bt.summary.all.trades} operações` + (failed.length ? ` · falharam: ${failed.join(', ')}` : ''));
  } catch (e) {
    setStatus('#bt-status', e.message, true);
  } finally {
    $('#bt-run').disabled = false;
    progress('#tab-backtest', null);
  }
}

function card(title, m) {
  const pf = m.profitFactor === Infinity ? '∞' : fmtNum(m.profitFactor, 2);
  return `<div class="card"><h4>${title}</h4><dl>
    <dt>Operações</dt><dd>${m.trades}</dd>
    <dt>Acerto</dt><dd>${fmtNum(m.winRate * 100, 0)}%</dd>
    <dt>R médio por operação</dt><dd class="${m.avgR > 0 ? 'pos' : m.avgR < 0 ? 'neg' : ''}">${fmtR(m.avgR)}</dd>
    <dt>Total</dt><dd class="${m.totalR > 0 ? 'pos' : m.totalR < 0 ? 'neg' : ''}">${fmtR(m.totalR)}</dd>
    <dt>Fator de lucro</dt><dd>${pf}</dd>
    <dt>Retorno (risco ${fmtNum(cfg.riskPct, 1)}%/op.)</dt><dd class="${m.returnPct > 0 ? 'pos' : m.returnPct < 0 ? 'neg' : ''}">${fmtPct(m.returnPct)}</dd>
    <dt>Pior queda</dt><dd>${fmtNum(m.maxDD * 100, 1)}% (${fmtNum(m.maxDDR, 1)}R)</dd>
    <dt>Maior sequência de perdas</dt><dd>${m.maxLosingStreak}</dd>
  </dl></div>`;
}

function renderBacktest() {
  const s = bt.summary;
  const crit = [
    [s.all.trades >= 100, `Pelo menos 100 operações (${s.all.trades})`],
    [s.all.avgR > 0.2, `R médio acima de +0,2R (${fmtR(s.all.avgR)})`],
    [s.all.profitFactor > 1.3, `Fator de lucro acima de 1,3 (${s.all.profitFactor === Infinity ? '∞' : fmtNum(s.all.profitFactor, 2)})`],
    [s.outSample.trades > 0 && s.outSample.avgR > 0, `Período cego positivo (${fmtR(s.outSample.avgR)} por operação)`],
    [s.inSample.avgR <= 0 || s.outSample.avgR >= 0.5 * s.inSample.avgR, 'Período cego não muito pior que o de ajuste'],
  ];
  const allOk = crit.every((c) => c[0]);
  $('#bt-verdict').innerHTML = `<b>${allOk ? 'Setup maduro para o teste em modo papel.' : 'Ainda não está maduro.'}</b>
    <span class="muted"> ${esc(METHODS[bt.method].name)} · ${TF_LABEL[bt.tf]} · ${bt.months} meses · cego a partir de ${fmtDate(bt.cutT, false)}</span>
    <ul>${crit.map(([ok, t]) => `<li class="${ok ? 'ok' : 'no'}">${t}</li>`).join('')}</ul>`;
  $('#bt-cards').innerHTML = card('Período de ajuste', s.inSample) + card('Período cego', s.outSample) + card('Total', s.all);
  $('#bt-empty').hidden = true;
  $('#bt-results').hidden = false; // o gráfico precisa da área visível para medir a largura
  renderEquity($('#bt-equity'), s.trades, bt.cutT);

  const bySym = [...s.bySymbol].sort((a, b) => b.totalR - a.totalR);
  $('#bt-sym').innerHTML = bySym.map((m) => `<tr data-sym="${esc(m.symbol)}">
      <td class="sym">${esc(m.symbol)}</td><td class="num">${m.trades}</td><td class="num">${fmtNum(m.winRate * 100, 0)}%</td>
      <td class="num ${m.avgR > 0 ? 'pos' : m.avgR < 0 ? 'neg' : ''}">${fmtR(m.avgR)}</td>
      <td class="num ${m.totalR > 0 ? 'pos' : m.totalR < 0 ? 'neg' : ''}">${fmtR(m.totalR)}</td>
      <td class="num">${m.profitFactor === Infinity ? '∞' : fmtNum(m.profitFactor, 2)}</td>
      <td class="num">${fmtNum(m.maxDDR, 1)}R</td></tr>`).join('');

  const MAX = 400;
  const trades = [...s.trades].reverse().slice(0, MAX);
  $('#bt-trades-note').textContent = s.trades.length > MAX ? `(as ${MAX} mais recentes de ${s.trades.length})` : `(${s.trades.length})`;
  $('#bt-trades').innerHTML = trades.map((t, k) => `<tr data-k="${k}">
      <td>${fmtDate(t.exitCandleT)}</td><td class="sym">${esc(t.symbol.replace(/USDT$/, ''))}</td>
      <td><span class="badge ${t.side}">${sideLabel(t.side)}</span>${t.spring ? `<span class="tag">${t.side === 'long' ? 'Spring' : 'Upthrust'}</span>` : ''}</td>
      <td class="num">${fmtPrice(t.entry)}</td><td class="num">${fmtPrice(t.exit)}</td><td class="num">${fmtNum(t.rr, 1)}</td>
      <td class="num ${t.R > 0 ? 'pos' : 'neg'}">${fmtR(t.R)}</td>
      <td class="muted">${t.setupT < bt.cutT ? 'ajuste' : 'cego'}</td></tr>`).join('') ||
    '<tr><td colspan="8" class="muted">Nenhuma operação no período.</td></tr>';
  $('#bt-trades').onclick = (ev) => {
    const tr = ev.target.closest('tr[data-k]');
    if (tr) showTrade(trades[Number(tr.dataset.k)]);
  };
}

function showTrade(t) {
  const r = bt.results.find((x) => x.symbol === t.symbol);
  $('#bt-detail').hidden = false;
  $('#btd-title').innerHTML = `${esc(t.symbol)} <span class="badge ${t.side}">${sideLabel(t.side)}</span> <span class="${t.R > 0 ? 'pos' : 'neg'}">${fmtR(t.R)}</span>`;
  $('#btd-sub').textContent = `${TF_LABEL[bt.tf]} · entrada ${fmtDate(t.entryT)} · saída ${fmtDate(t.exitCandleT)} · ${STATUS[t.status]} · horários de abertura do candle`;
  renderSymbolChart($('#btd-chart'), r.cs, t.setup, null);
  $('#btd-text').innerHTML = describeSetup(t.setup, r.cs, bt.tf, HTF_LABEL[HTF[bt.tf]]).map((p) => `<p>${p}</p>`).join('');
  $('#bt-detail').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Roda as variações com os mesmos dados já baixados.
function runCompare() {
  if (!bt) return;
  const variants = [
    ['Configuração atual', {}],
    ['Entrada no meio do OB grande', { obEntry: 'auto' }],
    ['Cancelar se andar 2R sem executar', { cancelAfterR: 2 }],
    ['Sair no BOS contra', { exitOnBOS: true }],
    ['Só nota ≥ 50', { minScore: 50 }],
    ['Todas as melhorias juntas', { obEntry: 'auto', cancelAfterR: 2, exitOnBOS: true, minScore: 50 }],
  ];
  const rows = variants.map(([name, extra]) => {
    const o = { ...cfg, ...extra };
    const results = bt.results.map((r) => backtestSymbol(r.symbol, r.cs, r.hcs, o, r.start, bt.method));
    return { name, s: summarize(results, bt.cutT, cfg.riskPct) };
  });
  const best = rows.reduce((a, b) => (b.s.all.totalR > a.s.all.totalR ? b : a));
  const cls = (x) => (x > 0 ? 'pos' : x < 0 ? 'neg' : '');
  $('#bt-compare-body').innerHTML = rows.map((r) => {
    const m = r.s.all, c = r.s.outSample;
    return `<tr class="${r === best ? 'best' : ''}"><td>${esc(r.name)}</td><td class="num">${m.trades}</td>
      <td class="num">${fmtNum(m.winRate * 100, 0)}%</td><td class="num ${cls(m.avgR)}">${fmtR(m.avgR)}</td>
      <td class="num ${cls(m.totalR)}">${fmtR(m.totalR)}</td><td class="num">${m.profitFactor === Infinity ? '∞' : fmtNum(m.profitFactor, 2)}</td>
      <td class="num ${cls(c.avgR)}">${c.trades ? fmtR(c.avgR) : '—'}</td><td class="num">${m.maxLosingStreak}</td></tr>`;
  }).join('');
  $('#bt-compare-wrap').hidden = false;
}

// Roda todos os métodos com os mesmos dados e a mesma configuração.
function runCompareMethods() {
  if (!bt) return;
  const cls = (x) => (x > 0 ? 'pos' : x < 0 ? 'neg' : '');
  const rows = METHOD_IDS.map((m) => {
    const results = bt.results.map((r) => backtestSymbol(r.symbol, r.cs, r.hcs, cfg, r.start, m));
    return { m, s: summarize(results, bt.cutT, cfg.riskPct) };
  });
  const best = rows.reduce((a, b) => (b.s.all.totalR > a.s.all.totalR ? b : a));
  $('#bt-methods-body').innerHTML = rows.map(({ m, s }) => {
    const a = s.all, c = s.outSample;
    return `<tr class="${best.m === m ? 'best' : ''}"><td>${esc(METHODS[m].name)}</td><td class="num">${a.trades}</td>
      <td class="num">${fmtNum(a.winRate * 100, 0)}%</td><td class="num ${cls(a.avgR)}">${fmtR(a.avgR)}</td>
      <td class="num ${cls(a.totalR)}">${fmtR(a.totalR)}</td><td class="num">${a.profitFactor === Infinity ? '∞' : fmtNum(a.profitFactor, 2)}</td>
      <td class="num ${cls(c.avgR)}">${c.trades ? fmtR(c.avgR) : '—'}</td><td class="num">${a.maxLosingStreak}</td></tr>`;
  }).join('');
  $('#bt-methods-wrap').hidden = false;
}

// ---------------------------------------------------------------------------
// CONFIGURAÇÕES
function fillCfgForm() {
  const f = $('#cfg');
  for (const el of f.elements) {
    if (!el.name || !(el.name in cfg)) continue;
    el.value = el.name === 'exitOnBOS' ? (cfg.exitOnBOS ? 'sim' : 'nao') : cfg[el.name];
  }
}
function readCfgForm() {
  const f = $('#cfg');
  for (const el of f.elements) {
    if (!el.name) continue;
    if (el.name === 'exitOnBOS') {
      cfg.exitOnBOS = el.value === 'sim';
    } else if (el.type === 'number') {
      const v = Number(el.value);
      if (Number.isFinite(v) && el.value !== '') cfg[el.name] = Math.min(Number(el.max), Math.max(Number(el.min), v));
    } else {
      cfg[el.name] = el.value;
    }
  }
  saveCfg();
  $('#cfg-saved').textContent = 'Salvo. Vale para a próxima análise ou backtest.';
}

// ---------------------------------------------------------------------------
function init() {
  if (!window.LightweightCharts) {
    document.body.insertAdjacentHTML('afterbegin', '<p class="status error" style="padding:12px 24px">Não foi possível carregar a biblioteca de gráficos.</p>');
  }
  const tfOptions = TFS.map((t) => `<option value="${t}"${t === '4h' ? ' selected' : ''}>${TF_LABEL[t]}</option>`).join('');
  $('#sc-tf').innerHTML = tfOptions;
  $('#bt-tf').innerHTML = tfOptions;

  for (const b of $$('.tabs button')) b.addEventListener('click', () => showTab(b.dataset.tab));
  $('#sc-run').addEventListener('click', runScan);
  $('#bt-run').addEventListener('click', runBacktest);
  $('#sc-body').addEventListener('click', (ev) => {
    const tr = ev.target.closest('tr[data-sym]');
    if (tr) showDetail(tr.dataset.sym);
  });
  for (const c of $$('#sc-results .chip')) c.addEventListener('click', () => { scanFilter = c.dataset.f; renderScan(); });
  $('#dt-close').addEventListener('click', () => { $('#detail').hidden = true; openSym = null; renderScan(); });
  setInterval(liveTick, 10e3);
  document.addEventListener('visibilitychange', () => { if (!document.hidden) liveTick(); });
  $('#btd-close').addEventListener('click', () => { $('#bt-detail').hidden = true; });
  $('#bt-compare').addEventListener('click', runCompare);
  $('#bt-compare-methods').addEventListener('click', runCompareMethods);
  const methodOpts = METHOD_IDS.map((m) => `<option value="${m}">${esc(METHODS[m].name)}</option>`).join('');
  $('#sc-method').innerHTML = methodOpts;
  $('#bt-method').innerHTML = methodOpts;
  $('#sc-method').addEventListener('change', () => {
    scanMethod = detailMethod = $('#sc-method').value;
    if (!scan) return;
    renderScan();
    if (openSym && !$('#detail').hidden) showDetail(openSym, undefined, false);
  });
  $('#bt-n').addEventListener('change', () => { $('#bt-custom-wrap').hidden = $('#bt-n').value !== 'custom'; });
  $('#dt-bt-months').addEventListener('change', () => {
    const sel = $('#sc-body tr.sel');
    if (sel) runAssetBacktest(sel.dataset.sym);
  });
  $('#bt-sym').addEventListener('click', (ev) => {
    const tr = ev.target.closest('tr[data-sym]');
    if (!tr || !bt) return;
    const t = [...bt.summary.trades].reverse().find((x) => x.symbol === tr.dataset.sym);
    if (t) showTrade(t);
  });

  fillCfgForm();
  $('#cfg').addEventListener('change', readCfgForm);
  $('#cfg').addEventListener('submit', (e) => e.preventDefault());
  $('#cfg-reset').addEventListener('click', () => {
    cfg = { ...CFG_DEFAULTS };
    saveCfg();
    fillCfgForm();
    $('#cfg-saved').textContent = 'Padrão restaurado.';
  });
}

init();
