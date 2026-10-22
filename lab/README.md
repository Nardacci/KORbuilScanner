# Laboratório KOR

Prova da Estratégia KOR com dados reais da Binance (futuros perpétuos USDT-M).

1. `bash lab/baixar-dados.sh 2022-01` — baixa candles de 15m de 20 ativos em `lab/dados/`
   (precisa de acesso a `data.binance.vision`).
2. `node lab/kor-backtest.mjs --periodo ajuste` — roda no período de ajuste (até 2024).
3. `node lab/kor-backtest.mjs --periodo cego` — roda **uma vez** no período cego (2025 em diante),
   com os parâmetros fixados no ajuste.

Opções: `--ctx 4h --exec 15m` (outros pares: `1d`/`1h`, `1h`/`5m` precisa de dados de 5m) e
`--opcao chave=valor` para qualquer parâmetro de `KOR_DEFAULTS` em `assets/js/kor.js`.

Critérios de aprovação (fixados antes de ver os resultados), no período cego:
pelo menos 150 operações, expectativa positiva depois dos custos, profit factor acima de 1,3,
maioria dos ativos positiva e resultado melhor que entradas aleatórias com o mesmo stop, alvo e
gestão (intervalo de 95% da diferença acima de zero).
