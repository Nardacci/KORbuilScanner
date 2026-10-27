// Aba "Análises": cartões das análises de gráfico publicadas pela skill /analisar-grafico
// (arquivos em analises/). Só leitura: o site não gera análise, só mostra.

const $ = (s) => document.querySelector(s);
const esc = (s) => String(s ?? '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const VERED = { operar: ['OPERAR', 'long'], aguardar: ['AGUARDAR', 'wait'], 'nao-operar': ['NÃO OPERAR', 'short'] };
const DIR = { compra: ['COMPRA', 'long'], venda: ['VENDA', 'short'], nenhuma: ['—', 'wait'] };
const STATUS = { cumprida: ['✓', 'ok'], parcial: ['◐', 'half'], pendente: ['○', 'todo'], 'nao-se-aplica': ['–', 'na'] };
const fDate = (s) => { const d = new Date(s); return Number.isNaN(d) ? esc(s) : d.toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' }); };
const fNum = (x) => (x == null ? '—' : Number(x).toLocaleString('pt-BR', { maximumSignificantDigits: 6 }));

let itens = [];

async function carregar() {
  try {
    const r = await fetch(`analises/index.json?t=${Date.now()}`, { cache: 'no-store' });
    itens = r.ok ? await r.json() : [];
  } catch {
    itens = [];
  }
  const body = $('#an-body');
  $('#an-empty').hidden = itens.length > 0;
  $('#an-list').hidden = itens.length === 0;
  body.innerHTML = itens.map((a) => {
    const [vt, vc] = VERED[a.veredito] || [a.veredito, 'wait'];
    const [dt, dc] = DIR[a.direcao] || [a.direcao, 'wait'];
    return `<tr data-id="${esc(a.id)}"><td>${fDate(a.geradoEm)}</td><td class="sym">${esc(a.ativo)}<small>${esc(a.tf)}</small></td>
      <td><span class="badge ${vc}">${vt}</span></td><td><span class="badge ${dc}">${dt}</span></td>
      <td class="num">${esc(a.classe)} (${esc(a.nota)})</td><td class="num">${a.rr == null ? '—' : Number(a.rr).toFixed(1)}</td></tr>`;
  }).join('');
  const id = location.hash.startsWith('#analises/') ? decodeURIComponent(location.hash.slice(10)) : null;
  if (id && itens.some((a) => a.id === id)) abrir(id);
  else if (itens.length) abrir(itens[0].id);
}

async function abrir(id) {
  for (const tr of document.querySelectorAll('#an-body tr')) tr.classList.toggle('sel', tr.dataset.id === id);
  let a;
  try {
    const r = await fetch(`analises/${encodeURIComponent(id)}.json?t=${Date.now()}`, { cache: 'no-store' });
    if (!r.ok) throw new Error(r.status);
    a = await r.json();
  } catch {
    $('#an-card').hidden = true;
    return;
  }
  const [vt, vc] = VERED[a.veredito] || [a.veredito, 'wait'];
  const [dt, dc] = DIR[a.direcao] || [a.direcao, 'wait'];
  const p = a.plano || {};
  const crit = (a.checklist || []).filter((c) => c.critico).length;
  $('#an-title').innerHTML = `${esc(a.ativo)} <small>${esc(a.tf)}${a.tfExecucao ? ` · execução ${esc(a.tfExecucao)}` : ''}</small>`;
  $('#an-sub').textContent = `${fDate(a.geradoEm)} · classe ${a.classe} · nota ${a.nota}/10`;
  $('#an-img').src = `analises/${a.imagem}`;
  $('#an-img').alt = `Gráfico analisado: ${a.ativo} ${a.tf}`;
  $('#an-head').innerHTML = `
    <div><span class="badge ${vc}">${vt}</span> <span class="badge ${dc}">${dt}</span></div>
    <dl class="an-kpi">
      <div><dt>Entrada${p.projetado ? ' ≈' : ''}</dt><dd>${fNum(p.entrada)}</dd></div>
      <div><dt>Stop${p.projetado ? ' ≈' : ''}</dt><dd>${fNum(p.stop)}</dd></div>
      <div><dt>Alvo 1</dt><dd>${fNum(p.alvo1)}</dd></div>
      <div><dt>Alvo 2</dt><dd>${fNum(p.alvo2)}</dd></div>
      <div><dt>R:R</dt><dd>${p.rr == null ? '—' : Number(p.rr).toFixed(1)}</dd></div>
      <div><dt>Preço no print</dt><dd>${fNum(a.precoAtual)}</dd></div>
    </dl>
    ${p.projetado ? '<p class="muted small-note">Valores projetados: a entrada ainda depende do que o preço fizer.</p>' : ''}`;
  $('#an-etapas').innerHTML = (a.etapas || []).map((e) => {
    const [ic, cls] = STATUS[e.status] || ['?', 'todo'];
    return `<li class="${cls}"><span class="an-ic">${ic}</span><b>${e.n}. ${esc(e.nome)}</b><span class="muted"> — ${esc(e.evidencia)}</span></li>`;
  }).join('');
  $('#an-falta').hidden = !a.oQueFalta;
  $('#an-falta').textContent = a.oQueFalta ? `O que falta: ${a.oQueFalta}` : '';
  const nv = (a.leitura?.niveis || []).map((n) => `<li><span class="num">${fNum(n.preco)}</span> ${esc(n.tipo)}${n.nome ? ` · ${esc(n.nome)}` : ''}</li>`).join('');
  $('#an-leitura').innerHTML = `${a.leitura?.estrutura ? `<p>${esc(a.leitura.estrutura)}</p>` : ''}${nv ? `<ul class="an-niveis">${nv}</ul>` : ''}`;
  $('#an-tese').textContent = a.tese || '';
  $('#an-inval').textContent = a.invalidacao || '';
  $('#an-check').innerHTML = (a.checklist || []).map((c) => `<li>${c.critico ? '<span class="tag">CRÍTICO</span> ' : ''}${esc(c.item)}</li>`).join('');
  $('#an-check-note').textContent = crit ? `${crit} item(ns) crítico(s) precisam acontecer antes da entrada.` : '';
  const ni = a.notaItens || {};
  const NOMES = { contexto: 'A favor do contexto', forca: 'Força de fundo/topo', pocNaRegiao: 'POC na região', volumeCaptura: 'Volume na captura', fibo618: 'Fibo 61,8', divergenciaIfr: 'Divergência de IFR', rompimentoTipo1: 'Rompimento tipo 1', fvgConfirmacao: 'FVG na confirmação' };
  $('#an-nota').innerHTML = Object.entries(NOMES).map(([k, n]) => `<li class="${ni[k] ? 'ok' : 'na'}"><span class="an-ic">${ni[k] ? '+' + ni[k] : '0'}</span>${n}</li>`).join('');
  $('#an-aviso').textContent = a.aviso || 'Ferramenta de estudo, não recomendação de investimento.';
  $('#an-card').hidden = false;
  history.replaceState(null, '', `#analises/${encodeURIComponent(id)}`);
}

export function initAnalises() {
  $('#an-body').addEventListener('click', (e) => {
    const tr = e.target.closest('tr[data-id]');
    if (tr) abrir(tr.dataset.id);
  });
  $('#an-reload').addEventListener('click', carregar);
  carregar();
}
