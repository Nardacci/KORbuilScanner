// Aba "Laboratório KOR": baixa o histórico de 15m da Binance (fica guardado no navegador)
// e roda a prova da Estratégia KOR, com o veredito pelos critérios fixados.

import { klinesRange, setOnThrottle } from './binance.js?v=2026.10.22-1251';
import { runSymbol, buildReport, LAB_SYMBOLS, LAB_START, VARIANTS, variantSummary } from './korlab.js?v=2026.10.22-1251';

const $ = (s) => document.querySelector(s);
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const pct = (x) => `${(x * 100).toFixed(1)}%`;
const fR = (x) => `${x >= 0 ? '+' : ''}${x.toFixed(3)}R`;
const fDate = (t) => new Date(t).toLocaleDateString('pt-BR', { month: 'short', year: 'numeric', timeZone: 'UTC' });
const yieldUI = () => new Promise((r) => setTimeout(r, 0));

// ---------------------------------------------------------------------------
// Cache no IndexedDB: tempos em Float64 e preços/volume em Float32 (≈ 5 MB por ativo).
let dbp = null;
function db() {
  if (!dbp) {
    dbp = new Promise((res, rej) => {
      const r = indexedDB.open('kor-lab', 1);
      r.onupgradeneeded = () => r.result.createObjectStore('candles', { keyPath: 'symbol' });
      r.onsuccess = () => res(r.result);
      r.onerror = () => rej(r.error);
    });
  }
  return dbp;
}
async function idb(mode, fn) {
  const d = await db();
  return new Promise((res, rej) => {
    const tx = d.transaction('candles', mode);
    const req = fn(tx.objectStore('candles'));
    tx.oncomplete = () => res(req?.result);
    tx.onerror = () => rej(tx.error);
  });
}
const pack = (symbol, cs) => {
  const t = new Float64Array(cs.length), x = new Float32Array(cs.length * 5);
  cs.forEach((c, i) => { t[i] = c.t; x.set([c.o, c.h, c.l, c.c, c.v], i * 5); });
  return { symbol, t, x, n: cs.length };
};
const unpack = (rec) => {
  const out = new Array(rec.n);
  for (let i = 0; i < rec.n; i++) {
    const k = i * 5;
    out[i] = { t: rec.t[i], T: rec.t[i] + 900e3 - 1, o: rec.x[k], h: rec.x[k + 1], l: rec.x[k + 2], c: rec.x[k + 3], v: rec.x[k + 4] };
  }
  return out;
};
const getRec = (symbol) => idb('readonly', (s) => s.get(symbol));
const putRec = (rec) => idb('readwrite', (s) => s.put(rec));

async function dataSummary() {
  const recs = await Promise.all(LAB_SYMBOLS.map(getRec));
  const ok = recs.filter(Boolean);
  if (!ok.length) return { count: 0, text: 'Nenhum dado baixado ainda.' };
  const from = Math.min(...ok.map((r) => r.t[0])), to = Math.max(...ok.map((r) => r.t[r.n - 1]));
  return { count: ok.length, text: `Dados guardados: ${ok.length}/${LAB_SYMBOLS.length} ativos, de ${fDate(from)} até ${fDate(to)}.` };
}

// ---------------------------------------------------------------------------
function status(msg, error = false) {
  const el = $('#lab-status');
  el.textContent = msg;
  el.classList.toggle('error', error);
}
function bar(frac) {
  const p = $('#tab-lab .progress');
  p.hidden = frac == null;
  if (frac != null) p.querySelector('.bar').style.width = `${Math.round(frac * 100)}%`;
}
let busy = false;
function lock(on) {
  busy = on;
  for (const b of ['#lab-download', '#lab-run', '#lab-compare']) $(b).disabled = on;
}

async function download() {
  if (busy) return;
  lock(true);
  setOnThrottle((ms) => status(`Aguardando o limite de requisições da Binance (${Math.ceil(ms / 1000)}s)…`));
  try {
    for (let k = 0; k < LAB_SYMBOLS.length; k++) {
      const sym = LAB_SYMBOLS[k];
      const old = await getRec(sym);
      const prev = old ? unpack(old) : [];
      const from = prev.length ? prev[prev.length - 1].t + 900e3 : LAB_START;
      status(`Baixando ${sym} (${k + 1}/${LAB_SYMBOLS.length})…`);
      bar(k / LAB_SYMBOLS.length);
      const fresh = from < Date.now() - 900e3 ? await klinesRange(sym, '15m', from) : [];
      const all = prev.concat(fresh.filter((c) => !prev.length || c.t > prev[prev.length - 1].t));
      if (all.length) await putRec(pack(sym, all));
    }
    const s = await dataSummary();
    $('#lab-data').textContent = s.text;
    status('Dados prontos. Agora rode a prova.');
  } catch (e) {
    status(e.message, true);
  } finally {
    bar(null);
    lock(false);
  }
}

let lastReport = null;
async function run() {
  if (busy) return;
  const periodo = $('#lab-periodo').value;
  if (periodo === 'cego' && !confirm('O período cego deve rodar UMA vez, depois de fixar os parâmetros no período de ajuste. Rodar agora?')) return;
  let opts = {};
  const raw = $('#lab-params').value.trim();
  if (raw) {
    try { opts = JSON.parse(raw); } catch { status('Parâmetros inválidos: use o formato {"chave": valor}.', true); return; }
  }
  const cfg = { ctx: $('#lab-ctx').value, exe: $('#lab-exe').value, periodo, opts };
  lock(true);
  try {
    const results = [];
    for (let k = 0; k < LAB_SYMBOLS.length; k++) {
      const rec = await getRec(LAB_SYMBOLS[k]);
      if (!rec) continue;
      status(`Analisando ${LAB_SYMBOLS[k]} (${k + 1}/${LAB_SYMBOLS.length})…`);
      bar(k / LAB_SYMBOLS.length);
      await yieldUI();
      results.push(runSymbol(LAB_SYMBOLS[k], unpack(rec), cfg));
    }
    if (!results.length) { status('Baixe os dados primeiro.', true); return; }
    status('Montando o relatório…');
    await yieldUI();
    lastReport = buildReport(results, cfg);
    render(lastReport);
    status(`Pronto: ${lastReport.geral.trades} operações analisadas.`);
  } catch (e) {
    console.error(e);
    status(`Erro: ${e.message}`, true);
  } finally {
    bar(null);
    lock(false);
  }
}

// Compara as variações no período de ajuste (o período cego não é usado aqui).
let lastCompare = null;
async function compare() {
  if (busy) return;
  const cfg = { ctx: $('#lab-ctx').value, exe: $('#lab-exe').value, periodo: 'ajuste', draws: 5 };
  lock(true);
  try {
    const per = VARIANTS.map(() => []);
    for (let k = 0; k < LAB_SYMBOLS.length; k++) {
      const rec = await getRec(LAB_SYMBOLS[k]);
      if (!rec) continue;
      const cs = unpack(rec);
      for (let v = 0; v < VARIANTS.length; v++) {
        status(`Comparando: ${LAB_SYMBOLS[k]} (${k + 1}/${LAB_SYMBOLS.length}), variação ${v + 1}/${VARIANTS.length}…`);
        bar((k * VARIANTS.length + v) / (LAB_SYMBOLS.length * VARIANTS.length));
        await yieldUI();
        per[v].push(runSymbol(LAB_SYMBOLS[k], cs, { ...cfg, opts: VARIANTS[v].opts }));
      }
    }
    if (!per[0].length) { status('Baixe os dados primeiro.', true); return; }
    lastCompare = { gerado: new Date().toISOString(), ctx: cfg.ctx, exe: cfg.exe, periodo: 'ajuste', variacoes: VARIANTS.map((v, i) => variantSummary(v, per[i])) };
    $('#lab-var').innerHTML = lastCompare.variacoes.map((v) => `<tr><td>${esc(v.nome)}</td><td class="num">${v.trades}</td>
      <td class="num">${pct(v.winRate)}</td><td class="num ${v.avgR >= 0 ? 'pos' : 'neg'}">${fR(v.avgR)}</td>
      <td class="num">${v.profitFactor.toFixed(2)}</td><td class="num">${fR(v.aleatorioR)}</td>
      <td class="num">${v.ic95Diferenca.map((x) => x.toFixed(2)).join(' a ')}</td><td class="num">${v.ativosPositivos}</td>
      <td class="num">${[2022, 2023, 2024].map((y) => v.anos[y].toFixed(2)).join(' / ')}</td></tr>`).join('');
    $('#lab-var-wrap').hidden = false;
    $('#lab-empty').hidden = true;
    status('Comparação pronta. Baixe o arquivo e envie no chat.');
  } catch (e) {
    console.error(e);
    status(`Erro: ${e.message}`, true);
  } finally {
    bar(null);
    lock(false);
  }
}

// ---------------------------------------------------------------------------
const PERIODO = { ajuste: 'período de ajuste (2022–2024)', cego: 'período cego (2025 em diante)', tudo: 'histórico inteiro' };

function rows(obj, label = (k) => k) {
  return Object.entries(obj).map(([k, m]) => `<tr><td>${esc(label(k))}</td><td class="num">${m.trades}</td><td class="num">${pct(m.winRate)}</td>
    <td class="num ${m.avgR >= 0 ? 'pos' : 'neg'}">${fR(m.avgR)}</td><td class="num">${m.totalR.toFixed(1)}R</td>
    <td class="num">${m.profitFactor.toFixed(2)}</td><td class="num">${m.maxDDR.toFixed(1)}R</td></tr>`).join('');
}
const TIPO = { spring: 'Spring (lateral)', ob: 'Order block', lateral: 'Lateral rompida' };
const LADO = { long: 'Compra', short: 'Venda' };
const CTX = { alta: 'Contexto de alta', baixa: 'Contexto de baixa', equilibrio: 'Equilíbrio' };

function render(r) {
  const m = r.geral;
  const crit = Object.entries(r.criterios).map(([k, v]) => `<li class="${v ? 'ok' : 'no'}">${esc(k)}</li>`).join('');
  const head = r.periodo === 'cego'
    ? (r.aprovado ? 'APROVADA no período cego.' : 'REPROVADA no período cego.')
    : `Resultado no ${PERIODO[r.periodo]} (o veredito oficial é o do período cego).`;
  $('#lab-verdict').innerHTML = `<b>${head}</b><ul>${crit}</ul>`;
  $('#lab-cards').innerHTML = `
    <div class="card"><h4>Estratégia KOR</h4><dl>
      <dt>Operações</dt><dd>${m.trades}</dd><dt>Acerto</dt><dd>${pct(m.winRate)}</dd>
      <dt>Resultado médio</dt><dd>${fR(m.avgR)}</dd><dt>IC 95% da média</dt><dd>${r.ic95MediaR.map((x) => x.toFixed(2)).join(' a ')}</dd>
      <dt>Total</dt><dd>${m.totalR.toFixed(1)}R</dd><dt>Profit factor</dt><dd>${m.profitFactor.toFixed(2)}</dd></dl></div>
    <div class="card"><h4>Entradas aleatórias (mesmas regras de saída)</h4><dl>
      <dt>Operações</dt><dd>${r.aleatorio.trades}</dd><dt>Resultado médio</dt><dd>${fR(r.aleatorio.avgR)}</dd>
      <dt>Profit factor</dt><dd>${r.aleatorio.profitFactor.toFixed(2)}</dd>
      <dt>KOR − aleatório (IC 95%)</dt><dd>${r.ic95Diferenca.map((x) => x.toFixed(2)).join(' a ')}</dd></dl></div>
    <div class="card"><h4>Risco (1% por operação)</h4><dl>
      <dt>Pior queda real</dt><dd>${m.maxDDR.toFixed(1)}R</dd>
      <dt>Queda típica (Monte Carlo)</dt><dd>${pct(r.monteCarloDD1pct.mediana)}</dd>
      <dt>Queda nos 5% piores casos</dt><dd>${pct(r.monteCarloDD1pct.p95)}</dd>
      <dt>Ativos positivos</dt><dd>${r.ativosPositivos}</dd></dl></div>`;
  $('#lab-groups').innerHTML = rows(r.porClasse, (k) => `Classe ${k}`) + rows(r.porTipo, (k) => TIPO[k] || k)
    + rows(r.porLado, (k) => LADO[k] || k) + rows(r.porContexto, (k) => CTX[k] || k);
  $('#lab-sym').innerHTML = rows(r.porAtivo);
  $('#lab-month').innerHTML = Object.entries(r.porMes).map(([k, v]) => `<tr><td>${k}</td><td class="num ${v >= 0 ? 'pos' : 'neg'}">${v.toFixed(1)}R</td></tr>`).join('');
  $('#lab-results').hidden = false;
  $('#lab-empty').hidden = true;
}

function saveJson(obj, name) {
  if (!obj) return;
  const blob = new Blob([JSON.stringify(obj)], { type: 'application/json' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = name;
  a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 1000);
}

export async function initLab() {
  $('#lab-download').addEventListener('click', download);
  $('#lab-run').addEventListener('click', run);
  $('#lab-save').addEventListener('click', () => lastReport && saveJson(lastReport, `kor-${lastReport.ctx}-${lastReport.exe}-${lastReport.periodo}.json`));
  $('#lab-compare').addEventListener('click', compare);
  $('#lab-var-save').addEventListener('click', () => lastCompare && saveJson(lastCompare, `kor-${lastCompare.ctx}-${lastCompare.exe}-variacoes.json`));
  try {
    $('#lab-data').textContent = (await dataSummary()).text;
  } catch {
    $('#lab-data').textContent = 'Este navegador não permite guardar os dados (IndexedDB indisponível).';
  }
}
