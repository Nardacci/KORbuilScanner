# Estratégia KOR — v2 (definição, aguardando aprovação; ainda não implementada)

Base: método Excelência Trading (arquivos 01–05), com complementos de Wyckoff 2.0 (06),
Brooks (08) e Covel (10). Uma única estratégia, que funciona igual em qualquer tempo gráfico.

## A ideia
Toda oportunidade KOR é a mesma história contada em dois tempos gráficos:

> **Uma região onde o dinheiro grande agiu → liquidez se acumula perto dela → o preço captura
> essa liquidez e volta para a região → o interesse aparece no tempo menor → entramos no teste.**

Lateralização de Wyckoff e Order Block não são dois setups diferentes: os dois são uma
**região de causa**. O que muda é só o tamanho. Por isso a KOR tem um único modelo.

## Os dois tempos gráficos (fractal)
O usuário escolhe o tempo de **contexto**; o de **execução** é cerca de 1/16 dele.

| Contexto | Execução | Perfil |
|---|---|---|
| 1D | 1h | swing |
| **4h** | **15m** | **padrão** |
| 1h | 5m | curto |

## As 6 etapas (compra; venda é o espelho)

### 1. Contexto — quem está no controle? (TF de contexto)
- Estrutura por pivôs válidos (o retrocesso precisa perder a mínima do candle que fez a máxima).
- Estado: alta (BOS de alta), baixa (BOS de baixa) ou equilíbrio (lateral).
- Premium/discount da perna atual: compra só na metade de baixo.

### 2. Região — onde o dinheiro grande agiu? (TF de contexto)
Uma destas, todas com Volume Profile (POC, VAH, VAL):
- **Estrutura lateral** (Wyckoff): Fase A detectada (SC/AR/ST), com nota de **força de fundo**
  (começou por CHoCH de compra, AR amplo, ST nos 50% ou acima, UA, mais tempo na metade de
  cima, zona de valor em cima, volume decrescente).
- **Order Block válido**: último candle contrário antes de uma perna com intenção que fez BOS/CHoCH,
  deixou FVG, em desconto.
- **Região lateral abandonada**: toda lateral de onde o preço saiu com força vira região de interesse.

### 3. Liquidez — o combustível
Perto da região precisa haver liquidez **criada**: fundos iguais, fundos da lateral, linha de
tendência, CHoCH falso. Sem liquidez criada, não há setup.

### 4. Captura — a armadilha
O preço varre essa liquidez **e** toca a região.
- Em lateral: Spring (candle **fecha** fora e volta para dentro em até [K] candles).
- Em OB: varredura dos fundos iguais e toque no bloco.
- Só pavio na lateral não é Spring.

### 5. Confirmação — o interesse aparece (TF de execução)
CHoCH no tempo menor: quebra do último topo válido da perna de baixa **com intenção**
(fechamento acima do pavio, candles de corpo grande, FVG, volume crescente).

### 6. Entrada no teste
- **Entrada**: limite no retorno, na **POC da perna de confirmação** ou no OB/FVG dessa perna
  em desconto (abaixo de 50%). Confluência com Fibo 61,8 melhora.
- **Stop**: abaixo da mínima da captura.
- **Alvo 1**: POC/zona de valor da estrutura maior ou liquidez oposta. Mínimo 2R.
- **Alvo 2**: extremo oposto / measured move (altura da lateral).
- **Gestão**: no alvo 1, realiza parcial e move o stop para o zero a zero; o resto segue com
  trailing por estrutura do tempo de execução. Risco fixo de [0,5–1%] por trade.
- **Invalidação**: fechamento abaixo da mínima da captura antes da entrada, ou a confirmação
  não vem em [N] candles.

## Nota KOR (prioridade, não obrigatória)
As 6 etapas são **obrigatórias**. As confluências dão a nota:
- a favor do contexto (+2) · força de fundo/topo alta (+2) · POC dentro do OB (+1)
- volume alto na captura (+1) · Fibo 61,8 na zona (+1) · divergência de IFR na captura (+1)
- rompimento de confirmação tipo 1 (fechamento acima do pavio) (+1) · FVG na perna de confirmação (+1)

Classes: **A+** (≥ 8), **A** (6–7), **B** (4–5). Contra o contexto: no máximo B.

## Estados no scanner (antecipação)
1. **Região mapeada** — mostra a região e onde está a liquidez.
2. **Liquidez formada** — aguardando a captura.
3. **Capturada** — aguardando a confirmação no tempo menor.
4. **Confirmada** — ordem limite projetada (entrada, stop, alvo).
5. **Em operação** — gestão (parcial, zero a zero, trailing).

## Proibido
Operar no meio da lateral; lateral estreita; sem liquidez capturada; captura só de pavio
em lateral; risco/retorno abaixo de 2.

## A calibrar no backtest
[K] candles da volta da captura, [N] candles para a confirmação, limiar de volume e de intenção,
tolerância de toque na POC/OB, duração mínima da lateral, tamanho do pivô.
