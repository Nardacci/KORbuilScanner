# KORbuild Scanner

Página web que analisa os futuros perpétuos USDT da Binance com um setup **SMC + Wyckoff**
e mostra as oportunidades de compra e venda, com gráfico marcado e backtest.

Tudo roda no navegador: a página busca os dados públicos da Binance direto do computador de quem usa
(sem servidor, sem chave de API, sem custo).

> Ferramenta de estudo. Não é recomendação de investimento.

## Telas

| Aba | O que faz |
| --- | --- |
| **Scanner** | Botão *Analisar agora*: baixa os candles das 10, 20 ou 40 moedas de maior volume (mais as extras das configurações), roda o motor e lista os ativos com **COMPRA**, **VENDA** ou **AGUARDAR**, com entrada, stop, alvo e R:R. Clicar num ativo abre o gráfico com as marcações e a explicação. Tempo gráfico escolhível (padrão **4 horas**). O **preço atualiza ao vivo** a cada 10 s, e a análise roda de novo sozinha quando o candle do tempo gráfico fecha (os sinais usam só candles fechados). |
| **Backtest** | Roda as mesmas regras no histórico (6 meses a 3 anos), separa o **período de ajuste** do **período cego** e mostra acerto, R médio, fator de lucro, pior queda, curva acumulada, resultado por ativo e cada operação no gráfico. |
| **Detalhe do ativo** | Além do gráfico e do plano, roda o **backtest do setup só naquele ativo** (1 a 3 anos): quantas operações, quantas lucrativas, compras x vendas, e cada operação clicável no gráfico. |
| **Configurações** | Parâmetros do setup (força dos topos/fundos, R:R mínimo, validade da ordem, filtro do tempo maior, taxas, risco por operação) e ativos extras. Ficam salvos no navegador. |
| **Como funciona** | As regras explicadas em português. |

## O setup (compra; a venda é o espelho)

1. **Varredura de liquidez**: o preço perde um fundo confirmado e fecha de volta acima dele em até 3 candles.
2. **CHoCH**: fecha acima do último topo anterior à varredura, sem fazer mínima abaixo dela.
3. **Order block**: último candle de baixa até o fundo da varredura. Entrada limitada no topo do corpo dele.
4. **Stop** abaixo da varredura; **alvo** na próxima liquidez acima (topo ainda não rompido) que dê o R:R mínimo.

Marcas extras que aumentam a nota: **Spring/Upthrust** (o nível varrido é o extremo de uma faixa lateral,
como no Wyckoff), volume alto na varredura e operação a favor do tempo gráfico maior
(4h → diário, 1h → 4h, diário → semanal...).

Refinamentos opcionais (Configurações), comparáveis no backtest com o botão *Comparar as melhorias*:
entrada no meio do order block quando ele é grande, cancelar a ordem se o preço andar X R a favor sem executar,
sair no BOS contra a posição e nota mínima do setup.

O motor processa candle a candle e só usa o que já era conhecido no fechamento de cada candle,
então o backtest não olha o futuro (há teste automático para isso).

## Estrutura

```
index.html               página
assets/css/app.css       estilo
assets/js/engine.js      motor: estrutura, varreduras, CHoCH, order block, simulação
assets/js/backtest.js    backtest e métricas
assets/js/indicators.js  ATR, EMA, RSI, topos e fundos
assets/js/binance.js     dados da Binance (com limite de requisições)
assets/js/charts.js      gráficos (TradingView Lightweight Charts)
assets/js/texts.js       textos e formatação em português
assets/js/app.js         telas
vendor/                  Lightweight Charts 4.2.3 (Apache 2.0)
tests/                   testes do motor (Node 18+)
```

## Rodar localmente

```bash
python3 -m http.server 8000   # e abra http://localhost:8000
npm test                       # testes do motor
```

## Publicar no GitHub Pages

Em **Settings → Pages**, escolha *Deploy from a branch*, a branch com o código e a pasta `/ (root)`.
O endereço fica `https://nardacci.github.io/KORbuilScanner/`.

## Créditos

Gráficos: [TradingView Lightweight Charts™](https://www.tradingview.com/), Copyright (c) 2023 TradingView, Inc.
