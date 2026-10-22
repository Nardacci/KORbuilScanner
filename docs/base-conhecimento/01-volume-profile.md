# 01 — Volume Profile

## Conceitos
- **Volume Profile (VP)**: volume negociado em cada nível de preço (histograma horizontal).
  É uma ferramenta de confirmação, não um setup sozinho.
- **POC** (*point of control*): o preço com mais volume. Está sempre dentro da zona de valor.
- **Zona de valor**: faixa que concentra ~70% do volume. Limites:
  - **VAH** (*value area high*): topo da zona de valor.
  - **VAL** (*value area low*): fundo da zona de valor.
  - VAH/VAL costumam coincidir com POCs de tempos gráficos maiores; poucos operadores olham.
- **Nós de alto volume**: outros níveis com volume parecido com o POC também contam,
  principalmente se coincidirem com um order block forte.
- O preço tende a ficar sendo negociado dentro da zona de valor (a região mais líquida).

## Como marcar
1. **No impulso** (do primeiro ao último candle do movimento): usar o **POC / nós de alto volume**.
   VAH/VAL importam pouco aqui.
2. **Na lateralização** (Market Profile — do início ao fim da estrutura, de preferência
   antes das capturas de liquidez): usar a **zona de valor (VAH/VAL)**.

## Regras de uso
- **OB validado por volume**: um order block onde o volume se concentrou é mais forte.
- **POC dentro do OB = ótima entrada** (confluência).
- **Wyckoff + Market Profile**: VAH ≈ parte de cima da estrutura, VAL ≈ parte de baixo.
  Capturas de liquidez acontecem além desses limites (como Spring/UTAD).
  - Exemplo do material: captura acima da VAH → queda → micro‑estrutura apoiada na linha
    da VAL → continuação para baixo.
- **Força de topo** (viés de venda): preço negociado mais na parte de baixo da estrutura e
  zona de valor na metade inferior.
- **Força de fundo** (viés de compra): preço negociado mais na parte de cima da estrutura e
  zona de valor na metade superior.

## Tradução para o código
- VP calculado a partir dos candles: distribuir o volume de cada candle entre os níveis
  de preço que ele percorreu (máx–mín), em N faixas (ex.: 40–60). POC = faixa de maior volume;
  zona de valor = expandir a partir do POC até somar 70%.
- Posição da zona de valor na estrutura: `(POC − fundo) / (topo − fundo)` > 0,5 → força de fundo;
  < 0,5 → força de topo.
