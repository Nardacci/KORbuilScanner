# Estratégia KOR — RASCUNHO v1 (em definição, ainda não implementada)

Base: método **Excelência Trading** (arquivos 01–05). Complementos: Wyckoff 2.0 (06),
Brooks (08) para critérios objetivos de lateralização, Covel (10) para gestão.

## Princípios (do material)
1. **Causa e efeito**: lateralização (causa) gera tendência (efeito). Não operar dentro do
   equilíbrio; esperar o desequilíbrio ficar evidente (03, p. 8).
2. **Todo movimento genuíno começa com uma captura de liquidez** (03, p. 63). Entrar só
   "depois que a rede foi recolhida" (02).
3. **Criação de liquidez antes da mitigação do OB é requisito** para oportunidade de alto
   potencial (02).
4. **Gatilho = entrada de interesse**: quebra de topo/fundo válido com intenção (corpo, volume,
   FVG), e depois um retorno com características de teste ("sem oferta") (03, p. 113).
5. **Confluência**: POC + OB/FVG + Fibo 61,8 na mesma região (03, p. 116).

## Dois tempos gráficos
- **Contexto (ex.: 4h)**: estrutura, lateralizações, OB/POI, premium/discount.
- **Execução (ex.: 15m/1h)**: micro estrutura, CHoCH/MSS de gatilho, stop.

## Setup A — Estrutura de Wyckoff (reversão a partir do range)
1. **Fase A**: após tendência, detectar SC (clímax) → AR → ST. Suporte = mínima do SC,
   resistência = máxima do AR. Calcular o **Market Profile** da estrutura (POC, VAH, VAL).
2. **Score de força de fundo** (compra; topo é o espelho), 0–8:
   - estrutura começou com CHoCH de compra (02)
   - AR amplo, maior que as correções da tendência anterior (03, p. 45)
   - ST acima de 50% ou ST que parou nos 50% (03, p. 53; 02)
   - UA (fura o topo e volta) na fase B, e não mSOW (03, p. 64)
   - mais tempo na metade de cima da estrutura (03, p. 65)
   - furou a resistência várias vezes com facilidade (02)
   - zona de valor / POC na metade de cima (01)
   - volume e volatilidade decrescentes ao longo da estrutura (03, p. 15)
3. **Fase C — captura (Spring)**: pelo menos 1 candle **fecha** abaixo do suporte (só pavio não
   vale) e o preço volta a fechar dentro em até [K] candles (03, p. 66, 80). Tipo: Terminal
   Shakeout / normal / sem oferta. Bônus se a captura mitigar um OB/FVOB à esquerda.
4. **Gatilho**: quebra do último topo válido da perna de baixa com intenção.
5. **Entrada** (por prioridade de risco × retorno — 03, p. 105–123):
   - **1ª zona (fase C)**: teste pós-captura na **POC do VP ancorado** na perna de interesse
     (fundo da captura → topo), ou **FVOB abaixo de 50%** dessa perna, ou confluência com Fibo 61,8.
   - **2ª zona (fase D)**: LPS na **POC da estrutura**; BUEC (reteste do topo rompido) só com
     micro estrutura.
   - **3ª zona (fase E)**: LPS / Ordinary Shakeout com micro estrutura.
6. **Stop**: abaixo da mínima da captura (03, p. 119).
7. **Invalidação**: depois da captura não vem quebra de topo e o preço segue fazendo fundos com
   volume e amplitude altos (interesse latente em vendas) (03, p. 100).

## Setup B — Continuidade com OB (liquidez criada antes da mitigação)
1. **Tendência no contexto** pelo estado de estrutura: BOS/CHoCH com pivôs válidos (o retrocesso
   precisa perder a mínima do candle que fez a máxima — 04, p. 131). Rompimento por
   fechamento acima do pavio = melhor qualidade.
2. **OB válido**: último candle contrário antes da perna que fez BOS/CHoCH com intenção. Qualidade
   (checklist 04, p. 53): varreu liquidez ao nascer, deixou FVG, a favor do fluxo HTF,
   POC dentro do bloco, em desconto (abaixo de 50% da perna para compra).
3. **Criação de liquidez** no retrocesso: fundos/topos iguais, LT, CHoCH falso (02).
4. **Mitigação**: o preço varre essa liquidez e toca o OB.
5. **Gatilho**: CHoCH/MSS no tempo menor dentro do bloco → entrada no OB/FVG dessa perna.
6. **Stop**: além da borda distal do OB / da mínima da varredura. **Alvo**: liquidez oposta /
   último extremo estrutural (exemplos com R:R ≥ 3).

## Alvos e gestão (comum)
- Alvo 1: zona de valor / POC da estrutura maior ou liquidez oposta.
- Alvo 2: extremo oposto ou **measured move** (altura do range projetada — 08).
- Depois do alvo 1: stop no zero a zero e o restante com trailing por estrutura ou ATR (10).
- Risco fixo [0,5–1%] por trade; somar o risco aberto das moedas (alts andam juntas com o BTC) (10).

## Bloqueios
- Preço no meio da lateralização (equilíbrio); lateral estreita (Brooks: TTR).
- Setup contra a tendência do contexto: só com nota baixa / risco reduzido.
- Captura só de pavio (não é Spring/UTAD).

## Antecipação no scanner ("EM FORMAÇÃO")
Mostrar em que etapa cada ativo está (Fase A/B com score de força, captura feita, aguardando
gatilho, aguardando teste na POC/OB) com o caminho projetado, a entrada, o stop e o alvo estimados.

## A calibrar no backtest
Profundidade e tempo máximo da captura, limiar de volume "alto/baixo", intenção (corpo/ATR),
tolerância de toque na POC/OB, duração mínima da lateral, tamanho dos pivôs.

## Decisões pendentes com o usuário
1. "Estratégia KOR" substitui os métodos atuais ou entra como principal, mantendo os outros para comparar?
2. Par de tempos gráficos (4h + 1h? 4h + 15m?).
3. Captura de liquidez obrigatória (o material diz que é requisito) — confirmar.
4. Elliott (v3) só como apoio (alvos Fibonacci), não como detector, na v1.
