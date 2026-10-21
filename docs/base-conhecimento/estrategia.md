# Estratégia do scanner — RASCUNHO v0 (em definição)

Baseada em: 01-volume-profile, 02-analise-avancada-liquidez. Ainda não implementada.

## Ideia em uma frase
Achar uma **lateralização** que mostra força de um lado, esperar o preço **sair**,
**criar liquidez** e voltar para **mitigar** a região (OB / zona de valor), e entrar no
**reteste com confirmação**, a favor da força.

## Etapas (compra; venda é o espelho)
1. **Consolidação** — detectar uma lateral (amplitude limitada em ATR, N candles).
   Calcular o Market Profile dela: POC, VAH, VAL.
2. **Força de fundo** (pontuação 0–5):
   - a lateral começou com CHoCH de compra (+1)
   - primeiro ST parou perto dos 50% e houve um UA (furo momentâneo do topo) (+1)
   - preço passou mais tempo na metade de cima (+1)
   - furou a resistência várias vezes com facilidade (+1)
   - POC/zona de valor na metade de cima (+1)
3. **Expansão** — rompimento da lateral para cima (BOS), deixando OB/FVG/região de interesse.
4. **Retrocesso com criação de liquidez** — no recuo formam-se fundos iguais / LTA / CHoCH
   falso (liquidez abaixo). **Requisito**: essa liquidez precisa existir e ser varrida.
5. **Mitigação** — o preço varre a liquidez e toca a região de interesse
   (OB da expansão, VAH/POC da lateral). Confluências: POC dentro do OB, volume alto
   na mitigação, divergência de IFR.
6. **Gatilho** — micro‑estrutura de confirmação na região (MSS no tempo menor).
   Entrada no fechamento do gatilho; stop abaixo da mínima da mitigação;
   alvo na liquidez oposta (topo da expansão) ou ≥ 2R.
7. **Antecipação** — enquanto as etapas 1–5 se formam, o scanner mostra
   "em formação" com o caminho projetado e o que falta acontecer.

## Perguntas em aberto
- Substituir os métodos atuais ou adicionar este como método principal ("Estratégia KOR")?
- Tempo gráfico de contexto e de gatilho (ex.: lateral no 4h, gatilho no 15m/1h)?
- A criação+captura de liquidez é obrigatória ou só aumenta a nota?
- Usar o IFR só como confluência?
