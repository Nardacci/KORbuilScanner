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
  cancelada: 'Cancelada (andou demais sem executar)',
  bos: 'Saída no BOS contra',
  onda: 'Saída: fechou do outro lado da onda',
};

export function rangeZone(pos) {
  if (pos >= 0.8) return 'no topo da faixa';
  if (pos <= 0.2) return 'no fundo da faixa';
  if (pos >= 0.4 && pos <= 0.6) return 'no meio da faixa';
  return pos > 0.5 ? 'na metade de cima da faixa' : 'na metade de baixo da faixa';
}

function planText(s) {
  const long = s.side === 'long';
  const riskPct = (Math.abs(s.entry - s.stop) / s.entry) * 100;
  const rewPct = (Math.abs(s.target - s.entry) / s.entry) * 100;
  const how = s.market ? `${long ? 'compra' : 'venda'} a mercado no fechamento do candle do sinal, em` : `${long ? 'compra' : 'venda'} limitada em`;
  return `<b>Plano:</b> ${how} <b>${fmtPrice(s.entry)}</b>, stop em <b>${fmtPrice(s.stop)}</b> (${fmtNum(riskPct, 1)}% de risco), ` +
    `alvo em <b>${fmtPrice(s.target)}</b> (${fmtNum(rewPct, 1)}%${s.targetIdx >= 0 ? `, a próxima liquidez ${long ? 'acima' : 'abaixo'}` : ', 3× o risco'}). ` +
    `Relação risco/retorno: <b>${fmtNum(s.rr, 1)}</b>.`;
}

function contextText(s, htfName) {
  const htfTxt = s.aligned ? `a favor da tendência do ${htfName} (${trendLabel(s.htf)})`
    : s.htf === 'lateral' ? `com o ${htfName} lateral` : `contra o ${htfName} (${trendLabel(s.htf)}): mais arriscado`;
  return `<b>Contexto:</b> operação ${htfTxt}.`;
}

function describeDow(s, cs, htfName) {
  const long = s.side === 'long';
  const vol = s.volRatio >= 1.2 ? ` com volume ${fmtNum(s.volRatio, 1)}× a média (Dow: o volume confirma a tendência)` : ' mas <b>sem volume acima da média</b> (confirmação fraca pelo critério de Dow)';
  return [
    `<b>1. ${long ? 'Fundo' : 'Topo'}:</b> ${long ? 'fundo' : 'topo'} em ${fmtPrice(s.swingL1.p)} (${fmtDate(cs[s.swingL1.i].t)}).`,
    `<b>2. ${long ? 'Topo' : 'Fundo'} entre eles:</b> ${fmtPrice(s.swingH.p)} (${fmtDate(cs[s.swingH.i].t)}).`,
    `<b>3. ${long ? 'Fundo mais alto' : 'Topo mais baixo'}:</b> ${fmtPrice(s.swingL2.p)} (${fmtDate(cs[s.swingL2.i].t)}), ` +
      `${long ? 'acima' : 'abaixo'} do primeiro.`,
    `<b>4. Confirmação:</b> em ${fmtDate(cs[s.i].t)} o preço fechou ${long ? 'acima do topo' : 'abaixo do fundo'} de ${fmtPrice(s.swingH.p)}${vol}. ` +
      `Agora há ${long ? 'topos e fundos ascendentes: tendência de alta' : 'topos e fundos descendentes: tendência de baixa'} pela Teoria de Dow.`,
    planText(s) + ` O stop fica ${long ? 'abaixo do fundo mais alto' : 'acima do topo mais baixo'}: se ele for perdido, a sequência de Dow se desfaz.`,
    contextText(s, htfName),
  ];
}

function describeOnda(s, cs, htfName) {
  const long = s.side === 'long';
  return [
    `<b>1. Tendência:</b> a onda de 34 (médias das ${long ? 'mínimas, fechamentos e máximas' : 'máximas, fechamentos e mínimas'}) está ${long ? 'subindo' : 'caindo'} ` +
      `e a maioria dos últimos 20 candles fechou ${long ? 'acima' : 'abaixo'} do meio dela.`,
    `<b>2. Recuo:</b> o preço voltou até a onda (em ${fmtDate(cs[s.pullbackIdx].t)}) sem fechar do outro lado dela.`,
    `<b>3. Retomada:</b> em ${fmtDate(cs[s.i].t)} veio o primeiro candle <b>${long ? 'verde' : 'vermelho'}</b> (fechou ${long ? 'acima' : 'abaixo'} da onda, entre ` +
      `${fmtPrice(Math.min(s.waveHi, s.waveLo))} e ${fmtPrice(Math.max(s.waveHi, s.waveLo))}). Candles azuis (dentro da onda) seriam sinal para ficar de fora.`,
    planText(s) + ` O stop fica ${long ? 'abaixo do recuo e da onda' : 'acima do recuo e da onda'}.`,
    contextText(s, htfName),
  ];
}

// Texto do setup ativo (ou de um setup histórico).
export function describeSetup(s, cs, tf, htfName) {
  if (s.method === 'dow') return describeDow(s, cs, htfName);
  if (s.method === 'onda34') return describeOnda(s, cs, htfName);
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
    `${fmtPrice(Math.min(s.obProx, s.obDist))} e ${fmtPrice(Math.max(s.obProx, s.obDist))}` +
    (s.entryMode === 'meio' ? '. Como o bloco é grande, a entrada fica no <b>meio</b> dele.' : '.'));
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
export function describeWait(ctx, tf, htfName, method = 'smc', mctx = null) {
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
  if (method === 'dow' && mctx) {
    const d = mctx;
    const txt = d.trend === 'alta' ? 'topos e fundos ascendentes: <b>tendência de alta</b>'
      : d.trend === 'baixa' ? 'topos e fundos descendentes: <b>tendência de baixa</b>'
        : `sinais misturados (${d.hh ? 'topo mais alto' : 'topo mais baixo'} e ${d.hl ? 'fundo mais alto' : 'fundo mais baixo'}): <b>tendência indefinida</b>`;
    L.push(`<b>Dow:</b> ${txt}.`);
    L.push('Sem rompimento recente que confirme uma nova sequência de topos e fundos. Pelo método: <b>aguardar</b>.');
  } else if (method === 'onda34' && mctx) {
    const cor = { g: 'verde (acima da onda)', r: 'vermelho (abaixo da onda)', b: 'azul (dentro da onda)' }[mctx.color] || '—';
    L.push(`<b>Onda 34:</b> último candle ${cor}; onda ${mctx.slope}. Nos últimos 10 candles: ${mctx.counts.g} verdes, ${mctx.counts.r} vermelhos, ${mctx.counts.b} azuis.`);
    L.push(mctx.counts.b >= 5 ? 'Muitos candles azuis: mercado sem direção. Pelo método: <b>ficar de fora</b>.'
      : 'Sem recuo até a onda seguido de retomada a favor da tendência. Pelo método: <b>aguardar</b>.');
  } else {
    L.push('Sem varredura de liquidez seguida de CHoCH com risco/retorno suficiente. Pelo método: <b>aguardar</b>.');
  }
  return L;
}
