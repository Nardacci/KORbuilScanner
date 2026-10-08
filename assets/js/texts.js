// Formatação e textos em português gerados a partir das regras (sem IA).

export function fmtPrice(p) {
  if (p == null || !Number.isFinite(p)) return '—';
  const a = Math.abs(p);
  const d = a >= 1000 ? 2 : a >= 10 ? 3 : a >= 1 ? 4 : a >= 0.1 ? 5 : a >= 0.01 ? 6 : 8;
  return p.toLocaleString('pt-BR', { minimumFractionDigits: d, maximumFractionDigits: d });
}

export const fmtNum = (x, d = 2) => (Number.isFinite(x) ? x.toLocaleString('pt-BR', { minimumFractionDigits: d, maximumFractionDigits: d }) : '—');
export const fmtPct = (x, d = 1) => (Number.isFinite(x) ? `${x > 0 ? '+' : ''}${fmtNum(x, d)}%` : '—');
export const fmtR = (x) => (Number.isFinite(x) ? `${x > 0 ? '+' : ''}${fmtNum(x, 2)}R` : '—');

export function fmtDate(ms, withTime = true) {
  const d = new Date(ms);
  const p = (n) => String(n).padStart(2, '0');
  const s = `${p(d.getDate())}/${p(d.getMonth() + 1)}/${String(d.getFullYear()).slice(2)}`;
  return withTime ? `${s} ${p(d.getHours())}:${p(d.getMinutes())}` : s;
}

export const sideLabel = (side) => (side === 'long' ? 'COMPRA' : 'VENDA');
export const trendLabel = (t) => ({ alta: 'alta', baixa: 'baixa', lateral: 'lateral' }[t] || t);

export const STATUS = {
  pendente: 'Ordem pendente',
  aberta: 'Em operação',
  ganho: 'Alvo',
  perda: 'Stop',
  tempo: 'Saída por tempo',
  expirada: 'Expirou sem executar',
  perdida: 'Foi ao alvo sem executar',
};

export function rangeZone(pos) {
  if (pos >= 0.8) return 'no topo da faixa';
  if (pos <= 0.2) return 'no fundo da faixa';
  if (pos >= 0.4 && pos <= 0.6) return 'no meio da faixa';
  return pos > 0.5 ? 'na metade de cima da faixa' : 'na metade de baixo da faixa';
}

// Texto do setup ativo (ou de um setup histórico).
export function describeSetup(s, cs, tf, htfName) {
  const long = s.side === 'long';
  const L = [];
  const liq = long ? 'abaixo do fundo' : 'acima do topo';
  const volTxt = s.volRatio >= 1.8 ? `, com volume ${fmtNum(s.volRatio, 1)}× a média` : '';
  L.push(`<b>1. Varredura de liquidez:</b> em ${fmtDate(cs[s.sweepIdx].t)} o preço passou ${liq} de ${fmtPrice(s.sweepLevel)} ` +
    `(até ${fmtPrice(s.sweepLow)}) e fechou de volta${volTxt}.` +
    (s.spring ? ` Esse ${long ? 'fundo' : 'topo'} era ${long ? 'o fundo' : 'o topo'} de uma faixa lateral: no Wyckoff, isso é um <b>${long ? 'spring' : 'upthrust'}</b>.` : ''));
  L.push(`<b>2. CHoCH:</b> em ${fmtDate(cs[s.i].t)} fechou ${long ? 'acima do último topo' : 'abaixo do último fundo'} (${fmtPrice(s.chochLevel)}), ` +
    `mudando o caráter do movimento para ${long ? 'alta' : 'baixa'}.`);
  L.push(`<b>3. Order block:</b> o último candle ${long ? 'de baixa' : 'de alta'} antes do impulso fica entre ` +
    `${fmtPrice(Math.min(s.obProx, s.obDist))} e ${fmtPrice(Math.max(s.obProx, s.obDist))}.`);
  const riskPct = (Math.abs(s.entry - s.stop) / s.entry) * 100;
  const rewPct = (Math.abs(s.target - s.entry) / s.entry) * 100;
  L.push(`<b>4. Plano:</b> ${long ? 'compra' : 'venda'} limitada em <b>${fmtPrice(s.entry)}</b>, stop em <b>${fmtPrice(s.stop)}</b> ` +
    `(${fmtNum(riskPct, 1)}% de risco), alvo em <b>${fmtPrice(s.target)}</b> (${fmtNum(rewPct, 1)}%, a próxima liquidez ` +
    `${long ? 'acima' : 'abaixo'}). Relação risco/retorno: <b>${fmtNum(s.rr, 1)}</b>.`);
  const htfTxt = s.aligned ? `a favor da tendência do ${htfName} (${trendLabel(s.htf)})`
    : s.htf === 'lateral' ? `com o ${htfName} lateral` : `contra o ${htfName} (${trendLabel(s.htf)}): mais arriscado`;
  L.push(`<b>Contexto:</b> operação ${htfTxt}.`);
  return L;
}

export function describeStatus(s, cs, o) {
  const r = s.result;
  const last = cs[cs.length - 1].c;
  if (r.status === 'pendente') {
    const left = o.expiry - (cs.length - 1 - s.i);
    const dist = ((last - s.entry) / s.entry) * 100;
    return `Ordem ainda não executada. O preço (${fmtPrice(last)}) está a ${fmtNum(Math.abs(dist), 1)}% da entrada. ` +
      `Vale por mais ${left} candle(s). Cancela se o preço for ao alvo antes de executar.`;
  }
  if (r.status === 'aberta') {
    return `Operação em andamento desde ${fmtDate(cs[r.fillIdx].t)}. Resultado parcial: ${fmtR(r.R)}. ` +
      `Mantenha o stop em ${fmtPrice(s.stop)}.`;
  }
  return `${STATUS[r.status]}${r.R != null ? ` (${fmtR(r.R)})` : ''}.`;
}

// Texto quando não há setup ativo.
export function describeWait(ctx, tf, htfName) {
  const L = [];
  L.push(`Tendência no ${tf}: <b>${trendLabel(ctx.tfTrend)}</b>. No ${htfName}: <b>${trendLabel(ctx.htfTrend)}</b>.`);
  const lateral = ctx.rangeAtr <= 14;
  L.push(`Nos últimos 100 candles o preço oscilou entre ${fmtPrice(ctx.rangeLo)} e ${fmtPrice(ctx.rangeHi)} ` +
    `e agora está ${rangeZone(ctx.rangePos)}${lateral ? ' (faixa estreita, comportamento lateral)' : ''}.`);
  if (ctx.lastEvent) {
    const e = ctx.lastEvent;
    L.push(`Último evento de estrutura: <b>${e.type} de ${e.dir > 0 ? 'alta' : 'baixa'}</b> em ${fmtPrice(e.level)}.`);
  }
  L.push(`RSI(14): ${fmtNum(ctx.rsi, 0)}${ctx.rsi >= 70 ? ' (sobrecomprado)' : ctx.rsi <= 30 ? ' (sobrevendido)' : ''}.`);
  L.push('Sem varredura de liquidez seguida de CHoCH com risco/retorno suficiente. Pelo método: <b>aguardar</b>.');
  return L;
}
