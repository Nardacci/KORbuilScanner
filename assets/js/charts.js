// Gráficos com a biblioteca Lightweight Charts (TradingView), carregada em
// vendor/ como script global `LightweightCharts`.

import { fmtPrice } from './texts.js';

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
let equityChart = null;

// Gráfico do ativo com o setup marcado. `setup` pode ser null (só contexto).
export function renderSymbolChart(el, cs, setup, struct) {
  if (symbolChart) { symbolChart.remove(); symbolChart = null; }
  const chart = baseChart(el, el.clientHeight || 460);
  symbolChart = chart;
  const d = decimals(cs[cs.length - 1].c);
  const up = css('--up'), down = css('--down');
  const candles = chart.addCandlestickSeries({
    upColor: up, downColor: down, wickUpColor: up, wickDownColor: down, borderVisible: false,
    priceFormat: { type: 'price', precision: d, minMove: 10 ** -d },
  });
  candles.setData(cs.map((c) => ({ time: sec(c.t), open: c.o, high: c.h, low: c.l, close: c.c })));
  const vol = chart.addHistogramSeries({ priceFormat: { type: 'volume' }, priceScaleId: '', lastValueVisible: false, priceLineVisible: false });
  vol.priceScale().applyOptions({ scaleMargins: { top: 0.82, bottom: 0 } });
  vol.setData(cs.map((c) => ({ time: sec(c.t), value: c.v, color: c.c >= c.o ? css('--up-soft') : css('--down-soft') })));

  const markers = [];
  const LS = LW().LineStyle;
  const line = (price, color, title, style = LS.Solid, width = 1) =>
    candles.createPriceLine({ price, color, title, lineStyle: style, lineWidth: width, axisLabelVisible: true });

  // Eventos de estrutura recentes (BOS/CHoCH), discretos.
  if (struct) {
    for (const e of struct.events.slice(-8)) {
      if (setup && e.i === setup.i) continue;
      markers.push({ time: sec(cs[e.i].t), position: e.dir > 0 ? 'aboveBar' : 'belowBar', color: css('--text-3'), shape: 'circle', text: e.type, size: 0.5 });
    }
  }

  if (setup) {
    const long = setup.side === 'long';
    markers.push({ time: sec(cs[setup.sweepLowIdx].t), position: long ? 'belowBar' : 'aboveBar', color: css('--warn'), shape: long ? 'arrowUp' : 'arrowDown', text: setup.spring ? (long ? 'Spring' : 'Upthrust') : 'Varredura' });
    markers.push({ time: sec(cs[setup.obIdx].t), position: long ? 'belowBar' : 'aboveBar', color: css('--accent'), shape: 'square', text: 'OB', size: 0.7 });
    markers.push({ time: sec(cs[setup.i].t), position: long ? 'aboveBar' : 'belowBar', color: css('--accent'), shape: 'circle', text: 'CHoCH' });
    const r = setup.result;
    if (r.fillIdx >= 0) markers.push({ time: sec(cs[r.fillIdx].t), position: long ? 'belowBar' : 'aboveBar', color: css('--text-1'), shape: long ? 'arrowUp' : 'arrowDown', text: 'Entrada' });
    if (r.exitIdx >= 0) markers.push({ time: sec(cs[r.exitIdx].t), position: 'inBar', color: r.R > 0 ? up : down, shape: 'circle', text: r.status === 'ganho' ? 'Alvo' : r.status === 'perda' ? 'Stop' : 'Saída' });

    line(setup.entry, css('--accent'), `Entrada ${fmtPrice(setup.entry)}`, LS.Solid, 2);
    line(setup.stop, down, 'Stop', LS.Solid, 2);
    line(setup.target, up, 'Alvo', LS.Solid, 2);
    line(setup.obDist, css('--accent'), 'OB', LS.Dashed);
    line(setup.sweepLevel, css('--warn'), 'Liquidez varrida', LS.Dotted);
    line(setup.chochLevel, css('--text-3'), 'CHoCH', LS.Dotted);
    if (setup.range && setup.spring) {
      line(setup.range.hi, css('--text-3'), 'Topo da faixa', LS.LargeDashed);
      line(setup.range.lo, css('--text-3'), 'Fundo da faixa', LS.LargeDashed);
    }
    const from = Math.max(0, Math.min(setup.sweepIdx - 80, cs.length - 160));
    const to = Math.max(setup.result.endIdx + 20, setup.i + 40);
    chart.timeScale().setVisibleLogicalRange({ from, to: Math.min(to, cs.length + 10) });
  } else {
    chart.timeScale().setVisibleLogicalRange({ from: cs.length - 180, to: cs.length + 8 });
  }
  markers.sort((a, b) => a.time - b.time);
  candles.setMarkers(markers);
  return chart;
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
