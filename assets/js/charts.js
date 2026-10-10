// Gráficos com a biblioteca Lightweight Charts (TradingView), carregada em
// vendor/ como script global `LightweightCharts`.

import { fmtPrice } from './texts.js';
import { waves, grab } from './onda34.js';

const LW = () => window.LightweightCharts;
const css = (name) => getComputedStyle(document.documentElement).getPropertyValue(name).trim();
// A biblioteca mostra horários em UTC; deslocamos para o fuso do navegador.
const tz = new Date().getTimezoneOffset() * 60e3;
const sec = (ms) => Math.floor((ms - tz) / 1000);

function decimals(p) {
  const a = Math.abs(p);
  return a >= 1000 ? 2 : a >= 10 ? 3 : a >= 1 ? 4 : a >= 0.1 ? 5 : a >= 0.01 ? 6 : 8;
}

function baseChart(el, height) {
  el.innerHTML = '';
  return LW().createChart(el, {
    height,
    autoSize: true,
    layout: {
      background: { type: 'solid', color: css('--surface') },
      textColor: css('--text-2'),
      fontFamily: 'Inter, system-ui, sans-serif',
      attributionLogo: true,
    },
    grid: { vertLines: { color: css('--grid') }, horzLines: { color: css('--grid') } },
    rightPriceScale: { borderColor: css('--border') },
    timeScale: { borderColor: css('--border'), timeVisible: true, secondsVisible: false },
    crosshair: { mode: 0 },
  });
}

let symbolChart = null;
let symbolSeries = null;
let liveLine = null;
let equityChart = null;

// Gráfico do ativo com o setup marcado. `setup` pode ser null (só contexto).
// `method` define as camadas extras: Onda 34 desenha a onda e pinta os candles GRaB.
export function renderSymbolChart(el, cs, setup, struct, method = setup?.method || 'smc') {
  if (symbolChart) { symbolChart.remove(); symbolChart = null; }
  const chart = baseChart(el, el.clientHeight || 460);
  symbolChart = chart;
  const d = decimals(cs[cs.length - 1].c);
  const up = css('--up'), down = css('--down');
  const candles = chart.addCandlestickSeries({
    upColor: up, downColor: down, wickUpColor: up, wickDownColor: down, borderVisible: false,
    priceFormat: { type: 'price', precision: d, minMove: 10 ** -d },
  });
  const onda = method === 'onda34';
  const w = onda ? waves(cs) : null;
  const colors = onda ? grab(cs, w) : null;
  const GRAB = { g: up, r: down, b: css('--accent') };
  candles.setData(cs.map((c, i) => {
    const bar = { time: sec(c.t), open: c.o, high: c.h, low: c.l, close: c.c };
    if (onda && colors[i]) { bar.color = GRAB[colors[i]]; bar.wickColor = GRAB[colors[i]]; }
    return bar;
  }));
  if (onda) {
    for (const [key, title] of [['hi', 'Onda máx.'], ['mid', 'Onda'], ['lo', 'Onda mín.']]) {
      const ls = chart.addLineSeries({ color: css('--warn'), lineWidth: key === 'mid' ? 2 : 1, lastValueVisible: false, priceLineVisible: false, crosshairMarkerVisible: false, title: key === 'mid' ? 'EMA 34' : '' });
      ls.setData(cs.map((c, i) => ({ time: sec(c.t), value: w[key][i] })).filter((x) => Number.isFinite(x.value)));
    }
  }
  symbolSeries = candles;
  liveLine = null;
  const vol = chart.addHistogramSeries({ priceFormat: { type: 'volume' }, priceScaleId: '', lastValueVisible: false, priceLineVisible: false });
  vol.priceScale().applyOptions({ scaleMargins: { top: 0.82, bottom: 0 } });
  vol.setData(cs.map((c) => ({ time: sec(c.t), value: c.v, color: c.c >= c.o ? css('--up-soft') : css('--down-soft') })));

  const markers = [];
  const LS = LW().LineStyle;
  const line = (price, color, title, style = LS.Solid, width = 1) =>
    candles.createPriceLine({ price, color, title, lineStyle: style, lineWidth: width, axisLabelVisible: true });

  // Eventos de estrutura recentes (BOS/CHoCH), discretos (só no SMC).
  if (struct && method === 'smc') {
    for (const e of struct.events.slice(-8)) {
      if (setup && e.i === setup.i) continue;
      markers.push({ time: sec(cs[e.i].t), position: e.dir > 0 ? 'aboveBar' : 'belowBar', color: css('--text-3'), shape: 'circle', text: e.type, size: 0.5 });
    }
  }

  if (setup) {
    const long = setup.side === 'long';
    const below = long ? 'belowBar' : 'aboveBar', above = long ? 'aboveBar' : 'belowBar';
    if (setup.method === 'dow') {
      markers.push({ time: sec(cs[setup.swingL1.i].t), position: below, color: css('--text-2'), shape: 'circle', text: long ? 'Fundo' : 'Topo', size: 0.7 });
      markers.push({ time: sec(cs[setup.swingH.i].t), position: above, color: css('--text-2'), shape: 'circle', text: long ? 'Topo' : 'Fundo', size: 0.7 });
      markers.push({ time: sec(cs[setup.swingL2.i].t), position: below, color: css('--warn'), shape: long ? 'arrowUp' : 'arrowDown', text: long ? 'Fundo mais alto' : 'Topo mais baixo' });
      markers.push({ time: sec(cs[setup.i].t), position: above, color: css('--accent'), shape: 'circle', text: long ? 'Rompeu o topo' : 'Perdeu o fundo' });
    } else if (setup.method === 'onda34') {
      markers.push({ time: sec(cs[setup.pullbackIdx].t), position: below, color: css('--warn'), shape: long ? 'arrowUp' : 'arrowDown', text: 'Recuo na onda' });
      if (setup.pullbackIdx !== setup.i) markers.push({ time: sec(cs[setup.i].t), position: above, color: css('--accent'), shape: 'circle', text: 'Retomada' });
    } else {
      markers.push({ time: sec(cs[setup.sweepLowIdx].t), position: below, color: css('--warn'), shape: long ? 'arrowUp' : 'arrowDown', text: setup.spring ? (long ? 'Spring' : 'Upthrust') : 'Varredura' });
      markers.push({ time: sec(cs[setup.obIdx].t), position: below, color: css('--accent'), shape: 'square', text: 'OB', size: 0.7 });
      markers.push({ time: sec(cs[setup.i].t), position: above, color: css('--accent'), shape: 'circle', text: 'CHoCH' });
    }
    const r = setup.result;
    if (r.fillIdx >= 0 && !setup.market) markers.push({ time: sec(cs[r.fillIdx].t), position: long ? 'belowBar' : 'aboveBar', color: css('--text-1'), shape: long ? 'arrowUp' : 'arrowDown', text: 'Entrada' });
    if (r.exitIdx >= 0) markers.push({ time: sec(cs[r.exitIdx].t), position: 'inBar', color: r.R > 0 ? up : down, shape: 'circle', text: r.status === 'ganho' ? 'Alvo' : r.status === 'perda' ? 'Stop' : r.status === 'bos' ? 'Saída BOS' : 'Saída' });

    line(setup.entry, css('--accent'), `Entrada ${fmtPrice(setup.entry)}`, LS.Solid, 2);
    line(setup.stop, down, 'Stop', LS.Solid, 2);
    line(setup.target, up, 'Alvo', LS.Solid, 2);
    if (setup.method === 'dow') {
      line(setup.swingH.p, css('--text-3'), long ? 'Topo rompido' : 'Fundo perdido', LS.Dotted);
    }
    if (setup.method === 'smc' || !setup.method) {
      line(setup.obDist, css('--accent'), 'OB', LS.Dashed);
      line(setup.sweepLevel, css('--warn'), 'Liquidez varrida', LS.Dotted);
      line(setup.chochLevel, css('--text-3'), 'CHoCH', LS.Dotted);
    }
    if (setup.range && setup.spring) {
      line(setup.range.hi, css('--text-3'), 'Topo da faixa', LS.LargeDashed);
      line(setup.range.lo, css('--text-3'), 'Fundo da faixa', LS.LargeDashed);
    }
    const startIdx = setup.sweepIdx ?? setup.swingL1?.i ?? setup.pullbackIdx ?? setup.i;
    const from = Math.max(0, Math.min(startIdx - 80, cs.length - 160));
    const to = Math.max(setup.result.endIdx + 20, setup.i + 40);
    chart.timeScale().setVisibleLogicalRange({ from, to: Math.min(to, cs.length + 10) });
  } else {
    chart.timeScale().setVisibleLogicalRange({ from: cs.length - 180, to: cs.length + 8 });
  }
  markers.sort((a, b) => a.time - b.time);
  candles.setMarkers(markers);
  return chart;
}

// Linha do preço atual (o candle em formação não entra no gráfico nem na análise).
export function setLivePrice(price) {
  if (!symbolSeries || !Number.isFinite(price)) return;
  if (liveLine) { liveLine.applyOptions({ price }); return; }
  liveLine = symbolSeries.createPriceLine({
    price, color: css('--text-1'), lineWidth: 1, lineStyle: LW().LineStyle.SparseDotted, axisLabelVisible: true, title: 'Agora',
  });
}

// Curva de resultado acumulado (em R), separando ajuste e período cego.
export function renderEquity(el, trades, cutT) {
  if (equityChart) { equityChart.remove(); equityChart = null; }
  const chart = baseChart(el, el.clientHeight || 280);
  equityChart = chart;
  const a = chart.addLineSeries({ color: css('--accent'), lineWidth: 2, title: 'Ajuste', priceFormat: { type: 'price', precision: 1, minMove: 0.1 } });
  const b = chart.addLineSeries({ color: css('--warn'), lineWidth: 2, title: 'Cego', priceFormat: { type: 'price', precision: 1, minMove: 0.1 } });
  const ptsA = [], ptsB = [];
  let cum = 0, lastTime = 0, lastA = null;
  for (const t of trades) {
    cum += t.R;
    let time = sec(t.exitT);
    if (time <= lastTime) time = lastTime + 1;
    lastTime = time;
    const p = { time, value: cum };
    if (t.setupT < cutT) { ptsA.push(p); lastA = p; } else ptsB.push(p);
  }
  if (lastA && ptsB.length) ptsB.unshift({ time: lastA.time, value: lastA.value });
  a.setData(ptsA);
  b.setData(ptsB.filter((p, k) => k === 0 || p.time > ptsB[k - 1].time));
  chart.timeScale().fitContent();
  return chart;
}
