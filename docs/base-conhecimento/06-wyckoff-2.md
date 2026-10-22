# Wyckoff 2.0 — Estruturas, Perfil de Volume e Fluxo de Ordens (Rubén Villahermosa, 2021)

Notas de estudo operacionais. Referências "p" = página do PDF (numeração do arquivo, 342 págs).
Obs.: a edição em PT é tradução automática (termos como "choque"/"crash"/"agitação" = **Shakeout/sacudida**, "riacho" = **Creek**, "fonte/primavera" = **Spring**, "Back Up" = BUEC).

---

## PARTE 1 — Conceitos avançados da metodologia

### 1.1 Rótulos (p17–19)
- Não buscar rotular os 4 eventos de parada da Fase A de forma robótica. O que importa: **o mercado parou objetivamente a tendência** e começou lateralização.
- Essência para acumulação: ver **um nível onde o preço foi rejeitado várias vezes (Creek/resistência)** e que **finalmente rompe e se posiciona acima**. Para subir precisa haver acumulação; para cair, distribuição.
- Objetivo da leitura: identificar **quem está ganhando o controle** (compradores x vendedores) pelas "pegadas".
- Código: não exigir PS/SC/AR/ST exatos; detectar "parada de tendência" (ex.: fim de sequência de topos/fundos + range com N toques) e o rompimento/aceitação do extremo.

### 1.2 Preço e volume (p20–22)
- Autor: **preço > volume** em relevância. Volume intradiário é enviesado pela sessão (abertura RTH x ETH no ES).
- Soluções: comparar volume só dentro de condições de sessão equivalentes; ou usar gráfico diário.
- Cripto 24/7 (nota minha): ainda há sazonalidade horária (abertura EUA/Ásia, funding). Para código: normalizar volume por hora-do-dia (volume relativo = vol / média do mesmo horário em N dias).
- Volume OTC/Dark pools reduz confiabilidade do volume (ver Parte 3).

### 1.3 Gráficos avançados (p23–27)
- **Tick chart**: nova vela a cada N transações (independe do tamanho). Volume por vela parecido; diferenças sutis informam.
- **Volume chart**: nova vela a cada N contratos negociados. Desvantagem: inutiliza análise de volume (todo candle tem o mesmo volume).
- **Range chart**: nova barra quando preço se move N ticks; barras de mesmo tamanho; mais barras em alta volatilidade.
- Vantagem comum: remove a variável tempo / ruído de sessões.

### 1.4 Falha de acumulação ou distribuição (p28–33)
- **Estrutura falida**: todos os traços sugerem desequilíbrio para um lado, mas "no momento da verdade" (o **teste após o rompimento**) o lado oposto empurra mais forte. Acumulação falhada = distribuição e vice-versa.
- Acumulação falhada — sequência objetiva: (1) traços de controle comprador; (2) Spring potencial; (3) rompimento de alta genuíno (preço+volume); (4) **no BUEC o preço não consegue continuar subindo** e surge desequilíbrio vendedor → vira distribuição.
- Distribuição falhada: traços vendedores → Upthrust potencial → rompimento de baixa genuíno → **no teste pós-rompimento (LPSY) compras agressivas** → vira acumulação.
- Causas: (a) não sabemos se os compradores do Spring são de curto prazo (realizam na próxima zona de liquidez — topo do range ou zona intermediária) ou de longo prazo; (b) pode surgir operador maior do lado oposto.
- **Regra-mestra**: operar a favor do **último desequilíbrio**; evento dominante = **o Shakeout (Spring/Upthrust)**. Viés sempre a favor do último shakeout: comprar depois de Spring, vender depois de Upthrust — se os demais sinais acompanharem.
- Simplificação válida: operar só Spring/Upthrust nos extremos. Mas o autor prefere somar contexto: se a estrutura mostrou características distributivas e o preço está em posição de rompimento de baixa e Spring potencial, favorecer rompimento de baixa (o desequilíbrio latente costuma prevalecer).

### 1.5 Falha estrutural (p34–38)
- Passo 1: identificar a **lógica estrutural** validada pelo preço (canal/range entre duas zonas de oferta e demanda). Mais toques = mais confiança.
- Expectativa padrão: continuidade — preço vai de extremo a extremo.
- **Falha estrutural**: preço **não consegue testar o lado oposto** e vira antes de chegar lá → reforça o cenário a favor dessa última virada.
- LPS e LPSY são falhas estruturais: preço é bloqueado antes de chegar ao extremo onde ocorreu o shakeout, e dali parte para o rompimento.
- **1.5.1 Fraqueza (p36)**: após validar estrutura várias vezes, preço **não alcança o topo** → compradores perdendo controle. Não é reversão imediata; pode ser só consolidação.
- **1.5.2 Força (p37–38)**: preço **não alcança o fundo** da estrutura (ex.: depois de testar o topo, a perna de queda vira no meio). Se além disso essa perna sacudir algum mínimo relevante anterior → Spring potencial com maior força (confluência).
- Código: em canal com ≥2 toques por lado, após toque no extremo X, se a perna seguinte reverter antes de atingir (extremo oposto − tolerância, ex. 25% da largura), marcar "falha estrutural" a favor da direção da reversão.

### 1.6 Encurtamento de impulso — SOT (Shortening of Thrust) (p39–41)
- Padrão de exaustão: cada novo extremo percorre **distância menor** que o anterior (medida do extremo anterior ao novo extremo).
- Válido com **mínimo de 3 impulsos** na direção da tendência; procurar a partir de 3–4 impulsos.
- Encurta + **volume alto** = divergência esforço/resultado (em queda: demanda aparecendo; em alta: oferta aparecendo).
- Encurta + **volume fraco** = esgotamento (lado agressor se retirando).
- **> 4 impulsos e o encurtamento persiste**: tendência pode ser forte demais para ir contra.
- **Confirmação**: forte impulso na direção oposta com **volume alto**; depois, esperar **pullback** para entrar a favor do novo impulso.
- Contexto manda: SOT de baixa depois de um Upthrust → não comprar (ou sair rápido com resposta fraca). SOT de alta depois de Spring → questionar venda. O viés é dado pelo shakeout.
- Também vale em barras individuais (cada barra progride menos); ideal se coincidir com área operacional de contra-tendência.

### 1.7 Outros tipos de estruturas (p42–62)
#### 1.7.1 Estruturas inclinadas (p44–62)
- Se desenvolvem igual às horizontais (mesmas fases/eventos); só muda a condição de mercado.
- Inclinação ascendente = força de fundo (compradores com controle); descendente = fraqueza.
- Identificação: começar com limites horizontais da Fase A. Se na **Fase B** o preço não respeita os extremos e sai, testar canal inclinado conectando mínimos e máximos das Fases A, B, C (desenhar um lado e clonar a paralela). O canal deve conter praticamente toda a ação; toques não precisam ser exatos (pode ser uma faixa). Não descartar os níveis horizontais (preço pode voltar a eles).
- Quatro tipos:
  1. **Acumulação inclinada para cima** (maior força): topos e fundos ascendentes após Fase A; compradores não deixam cair. Difícil: cada novo topo parece Upthrust. BUEC é a entrada mais conservadora mas "parece cara". Ex. BTC (p48–49): após queda abrupta, acumulação rápida + volume muito alto na queda + reação; volume decrescente na estrutura; ondas Weis de alta predominam; no topo se forma uma distribuição menor que poderia ser UTAD, mas o preço **nem chega ao fundo do canal** (falha estrutural de força) → shakeout interno atua como Teste de Fase C → segue para cima. Preço não perde o nó de alto volume / VPOC → controle comprador. Ex. 2 (p49–50): parada sem volume climático (esgotamento de vendas), volume decrescente nas Fases A–B (absorção), preço tem dificuldade de se colocar acima do nó de alto volume, depois rompe com SOSbar; Back Up no Creek em confluência com VWAP semanal.
  2. **Acumulação inclinada para baixo** (mais fraca): topos e fundos decrescentes; novos fundos percorrem distâncias cada vez menores (SOT); possível falha estrutural (encontra suporte no meio do canal). Confirmação: forte impulso de alta saindo do canal; então esperar correção para comprar. Ex. (p52): VWAP mensal — preço fica acima dele desde o ST (controle comprador); após Shakeout → LPS acima do VPOC → JAC → Back Up em confluência (VWAP semanal + VAH) → Fase E. Ex. (p53–54): após SC volume diminui; Shakeout → Minor SOS leva ao topo; mínimos das Fases A/B/C com distâncias minúsculas (SOT); shakeout interno em topo anterior + VWAP semanal; não testa o fundo (falha estrutural) = LPS. "Shakeout + SOS + falha estrutural = desequilíbrio comprador". Back Up em Creek + VWAP semanal + VAH.
  3. **Distribuição inclinada para baixo** (mais fraca): canal de baixa. Chave: Teste de Fase C em forma de shakeout (**UTAD**) — excesso no topo (sobrecompra) ou sacudida de topo anterior relevante; quanto mais exagerado, mais liquidez capturou, mais ímpeto depois. **Diferença p/ acumulação inclinada p/ baixo: aqui NÃO há SOT nem falha estrutural.** Preço move rápido. Ex. (p56–58): volume grande na Fase A, picos de volume incomuns na Fase B (característico de distribuição), ondas Weis de baixa predominam; preço se posiciona abaixo do nó de alto volume → reteste dessa área = LPSY → SOW. UTAD na faixa do **VPOC** convergindo com o topo da estrutura = local ideal para gatilho short. Fraqueza: nem conseguiu LPSY no fundo.
  4. **Distribuição inclinada para cima**: inicia com robustez (topos/fundos crescentes); SOT nos topos (novos máximos com pouca distância); falha estrutural de fraqueza (não alcança o topo do canal); UTAD como excesso ou sacudida de máximo relevante. Ex. (p60–61): **volume climático no meio do range = bandeira vermelha** (não deve aparecer em acumulação); SOT entre AR(Fase A), UT(Fase B), UTAD(Fase C); UTAD tenta sair da área de valor do perfil composto e é rejeitado; preço se posiciona abaixo do VPOC com grande onda Weis de baixa → viés short; LPSY na confluência estrutura quebrada + VPOC → Fase E. Picos de volume na Fase C bloqueiam a força; SOW leva o preço à origem do movimento (AR).

#### 1.7.2 Esquemas incomuns (p63–67)
- Estruturas não horizontais nem inclinadas (V, mínimos iguais com máximos crescentes etc.) → **não operar**; vantagem está em esperar estruturas clássicas (inclusive as inclinadas).
- Se não dá para identificar Fase A com precisão, o que importa é a **mudança de caráter**: preço passou de tendência para lateralização → uma causa será construída.
- Proporção teórica (Fase B mais longa que A e C) nem sempre ocorre; não descartar estrutura por isso.

---

## PARTE 2 — Dúvidas frequentes

### 2.1 Uso eficiente das linhas (p69–72)
- Linha/canal nunca é motivo isolado de entrada. Serve para: (a) ler quem tem o controle (canal de alta = compradores; canal de baixa = vendedores; lateral com toques nos dois extremos = equilíbrio); (b) dar local para enviesar a direção.
- Canal de alta: favorecer compras; só vender após **rompimento da dinâmica ascendente** (linha de tendência). Melhor local de operação: **extremos** do canal.
- Procedimento (p71): **1) identificar a dinâmica do preço; 2) esperar o preço num extremo; 3) procurar o desenvolvimento de uma estrutura de acumulação/distribuição ali** (em TF menor, p72).

### 2.2 Mudança de rótulo e planejamento de cenários (p73–77)
- Peso maior à informação mais recente: o presente é o mais importante; o segundo, o que o precede imediatamente.
- Todo movimento precisa ser **confirmado ou rejeitado pelo seguinte**. Ex.: Spring potencial que **não consegue gerar nem um Minor SOS** → reinterpretar como teste de fraqueza (não shakeout).
- Só se projeta cenário para o **próximo movimento**. Roteiro: Spring potencial → esperar rompimento de alta (preço e volume crescentes) → propor volta ao nível quebrado (BUEC) → no BUEC avaliar entrada para a tendência fora do range.

### 2.3 Como distinguir acumulação de distribuição (p78–92)
Não é possível ter certeza em tempo real; usa-se "potencial". Seis pegadas, em ordem de avaliação:
1. **Tipo de teste na Fase A (ST)** (p78–79, figura conferida): range = do **SC** (fundo) ao **AR** (topo); dividir em terços. Onde o **ST** termina: **terço inferior ou abaixo do SC** = fraqueza subjacente; **terço superior (ST alto, perto do AR) ou acima do AR** = força de fundo. Na distribuição, espelhado (ST no terço superior/acima do BC = força compradora residual; no terço inferior = fraqueza).
2. **Tipo de teste e reação na Fase B** (p79–82): teste no **topo** (UA — Upthrust Action em acumulação) = força; teste no **fundo** (ST as SOW em distribuição) = fraqueza. Leitura dupla de um rompimento do topo: (a) varreu stops dos vendidos e o preço depois **encontra suporte** (não cai ao fundo) → força; (b) grandes venderam ali → confirmado se o preço **visita o fundo**. **Teste num extremo + falha estrutural no extremo oposto** = característico de estruturas que saem sem shakeout nos extremos: acumulação com UA + não chega ao fundo → rompimento a partir de **LPS intermediário** sem Spring; distribuição com ST as SOW + não chega ao topo → **LPSY como teste de Fase C**.
3. **O shakeout na Fase C** (p82–84) — pegada **mais importante / evento dominante**. Sacudida até zona de liquidez + **reentrada no range** = forte rejeição; caminho de menor resistência é o oposto. **Objetivo mínimo de um shakeout: o extremo oposto da estrutura**; se é o teste de Fase C, levará ao rompimento. O shakeout prevalece sobre ações anteriores do range. Sem shakeout: UA no topo + falha estrutural no fundo ⇒ LPS como teste de Fase C ⇒ favorecer BUEC e continuação.
4. **Ação de preço e volume na Fase D** (p84–87) — **segunda mais importante**. Lei de esforço/resultado: queremos velas de **amplo range + alto volume** a favor do movimento pós-shakeout (**SOS bar / SOW bar**). Validação do shakeout: depois de UTAD, a queda deve quebrar o fundo; se não quebrar, **no mínimo atingir o fundo** (mSOW); caso contrário há força oculta e o UTAD é questionável. Em TF menor, o movimento de intenção aparece como sequência limpa de topos/fundos decrescentes. No rompimento: **alto volume** (absorção das ordens passivas). Pavio no extremo do candle de rompimento é aceitável (zona de liquidez) — o que importa é **não deixar o preço voltar ao range**. Rompimento com baixo volume → tratar inicialmente como possível shakeout (esperar reação). **Rompimento genuíno típico: vela de amplo range, fechando na máxima/mínima (na borda), com alto volume.**
5. **Volume total no desenvolvimento do range** (p87–88): acumulação → **volume decrescente** ao longo da estrutura (absorção; oferta flutuante eliminada antes do teste de Fase C). Distribuição → **volumes altos/incomuns**, desenvolve-se **mais rápido** e com maior volatilidade.
6. **Weis Wave** (p88–92): soma o volume de cada onda de preço (início/fim de onda definidos por reversão de N ticks/%). Harmonia: ondas impulsivas grandes e crescentes; ondas corretivas pequenas e decrescentes. Rompimento de resistência com grande onda = rompimento efetivo; com onda pequena = divergência (profissional não apoia). Em BUEC potencial precisamos ver **ondas de baixa pequenas** (desinteresse vendedor). Se após rompimento entra grande volume e o preço reentra com grande onda de baixa → passa a ser Upthrust potencial.

### 2.4 Como analisar um gráfico do zero (p94–107)
- Gráfico limpo; apagar rótulos de estruturas concluídas (manter só os níveis).
- Top-down: começar do **semanal** (raramente precisa mensal). Procurar eventos de parada + lateralização. Interesse operacional: mercado **em Fase B** (construindo causa). Se nada claro ou em tendência → esperar mudança de caráter (Fase A).
- Situação ideal para descer de TF: TF maior em **posição de rompimento/shakeout potencial**.
- Contexto = **estruturas + áreas operacionais**.
- **2.4.1 Estruturas (p96–97)** — roteiro: Fase B → esperar o preço nos extremos para ações de rompimento/shakeout; shakeout a confirmar → esperar que alcance o extremo oposto com ímpeto; rompimento genuíno possível → esperar teste da estrutura rompida. Sequência geral: 1) parada da tendência anterior; 2) construção da causa; 3) teste (avaliação da competição); 4) tendência dentro do range; 5) tendência fora do range.
- **2.4.2 Áreas operacionais (p98–99)**: usar Volume Profile para localizar zonas de negociação acima/abaixo como alvos.
- **2.4.3 Descer de TF: estrutura maior → menor (p100–103)**: contexto em mensal/semanal/diário, intermediário em 8h/4h/2h. Casos: (a) TF maior em **Spring potencial (Fase C)** → buscar acumulação menor no TF menor (a acumulação menor "é" o Spring do maior); (b) TF maior em **BUEC potencial (Fase D)** → buscar reacumulação menor no teste da estrutura rompida; (c) TF maior em **Fase E** → buscar reacumulações menores rápidas a favor. Cuidado: Spring potencial também é rompimento de baixa potencial — se a estrutura menor mostrar vendas fortes/distribuição, mudar para cenário baixista; idem BUEC x Upthrust. Ter cenários long e short preparados. **Estrutura maior prevalece sobre a menor.** Quanto menor o TF, mais ruído.
- **2.4.4 Subir de TF: estrutura menor → maior (p104–107)**: para a primeira identificação de estrutura, priorizar TFs menores e subir se o preço pedir. Uma acumulação rápida em TF menor durante uma queda pode ser o **AR** do TF maior; uma distribuição menor na Fase E de alta pode ser o **BC**, e seu efeito o **AR** (de distribuição) no TF maior. Ex. p106–107: acumulação menor que no BUEC potencial **falha em continuar** → enxergar como parte de uma acumulação maior: AR maior = do mínimo do SC ao máximo do UA menor; o "JAC" menor vira **UA** (teste de força) da maior. Força: preço não visita o fundo de nenhuma das duas. BUEC maior acima do **nó de alto volume = VPOC** da estrutura toda.

### 2.5 Contexto não claro (p108–111)
- Opção 1: **subir o TF**; ficar no TF onde a ação é mais clara e não descer além dele (ex.: claro em H1, confuso em M15 → ficar em H1).
- Opção 2: **trocar de ativo**. Não forçar.
- 2.5.1: não se prender a um único ativo em TF muito baixo; acompanhar 3–4 ativos. Muitos ranges são **aleatórios** (sem pegadas claras) — não operar.
- Código: score de "clareza" da estrutura; se baixo → descartar o ativo/TF.

---

## PARTE 3 — Ecossistema atual (p112–134, resumo)
- 3.1 Participantes (p113–116): ≥90% do volume é institucional (Al Brooks). Tipos por intenção: **hedgers** (reduzem risco, não direcionais, longo prazo; inclui market makers mantendo neutralidade), **especuladores** (fundos, prop firms, HFT — os únicos direcionais; buscam **zonas de liquidez** para casar ordens grandes; nem todos lucram), **arbitragem** (corrigem ineficiências, ex. spot x futuro), bancos centrais. Nem toda transação tem intenção direcional.
- 3.2 Mercados eletrônicos / algorítmico / HFT (p117–123): HFT atua na parte "aleatória"/ruído de curtíssimo prazo (arbitragem, momentum/eventos, market making); análise estrutural de TF maior reduz esse ruído. Robôs de varejo ≠ HFT.
- 3.3 OTC (p124–126): mercados descentralizados mostram dados de preço/volume parciais; analisar o ativo no mercado **centralizado** (ex. futuro 6E para EURUSD) e executar onde for viável. Preferir corretoras sem dealing desk. (Cripto: volume de uma exchange é parcial; considerar volume agregado de várias exchanges ou a de maior liquidez — Binance perp costuma liderar.)
- 3.4 Dark pools (p127–129): blocos fora do book, volume reportado com atraso → volume visível é incompleto.
- 3.5 Aleatório x determinístico (p130–134): Hipótese dos Mercados Adaptativos (Andrew Lo) — mercado tem parte aleatória e parte determinística variando com as condições. Wyckoff explora o determinístico: **lei de causa e efeito** (tendência precisa de causa prévia — acumulação/distribuição).

---

## PARTE 4 — A importância do volume

### 4.1 Teoria do leilão (Auction Market Theory) (p137–147)
- Mercado busca facilitar negociação → move-se em busca de **equilíbrio/valor justo**. Equilíbrio = lateralização (rotação); desequilíbrio = tendência. Mercado passa a maior parte do tempo em equilíbrio (onde ocorrem acumulação/distribuição).
- Ciclo: equilíbrio → nova informação muda percepção de valor → desequilíbrio (tendência) → busca nova zona de consenso → novo equilíbrio.
- **4.1.1 Variáveis (p139–140)**: **Preço** (ferramenta de descoberta; explora níveis), **Tempo** (pouco tempo em áreas vantajosas para um lado = desequilíbrio; muito tempo = equilíbrio), **Volume** (atividade; mais volume = mais valor atribuído). **Preço + Tempo + Volume = Valor.**
- **4.1.2 Percepção de valor (p141–144)**: em range, preço justo no **meio**; extremos = níveis injustos → comprar nas mínimas e vender nas máximas enquanto rejeitar os extremos. Quando sai do range, avaliar **aceitação x rejeição** do novo nível: preço lidera; **tempo** confirma primeiro e **volume** por último. **Aceitação** = preço se mantém (tempo) + negociação (volume) → movimento lateral no novo nível. **Rejeição** = retorno rápido à zona de valor anterior (virada acentuada).
- **4.1.3 Quatro etapas de Steidlmayer (p145–147)**: 1) tendência; 2) parada (define limites); 3) lateral; 4) transição (sai do range: reversão ou continuação). Até a etapa 3 forma perfil P ou b. Equivale às fases Wyckoff: parar tendência (A) → construir causa (B) → avaliar oposição (C) → iniciar tendência (D) → confirmar direcionalidade (E).

### 4.2 Lei da oferta e demanda (p148–158)
- Erros: "mais compradores que vendedores" (sempre há o mesmo número — cada trade tem dois lados); confundir demanda com "comprar". **Oferta e demanda = ordens limite passivas no ASK/BID (liquidez).**
- 4.2.2: Best BID = melhor preço para vender; Best ASK = melhor preço para comprar; spread pequeno = mais líquido. **Operar ativos líquidos** (evita manipulação por um único grande).
- 4.2.3: **Agressivos** = tomadores de liquidez (ordens a mercado) — motor do preço. **Passivos** = provedores (ordens limite) — podem **frear/parar** movimento, não movê-lo.
- 4.2.4 Como o preço se move (p154–156): **Iniciativa** — para subir, compras a mercado precisam consumir todo o ASK do nível e continuar. Ordens que sobem preço: compras a mercado e stops de vendidos (buy stop). Para cair: vendas a mercado e stops de comprados. **Exaustão** — ausência de oferta facilita alta com pouca compra (e vice-versa).
- 4.2.5 Viradas (p157–158): processo em 3 etapas — **1) Esgotamento → 2) Absorção (passiva pelos grandes) → 3) Iniciativa (agressão do novo lado)**. É, em essência, acumulação/distribuição em qualquer escala.

### 4.3 Tipos de ordens (p159–163)
- Market (agressiva), Limit (passiva, preço garantido, execução não), Stop (vira market ao ser atingida), Stop-Limit (vira limite). Buy stop acima do preço (entrada compra/stop de short); buy limit abaixo (entrada compra/TP de short); simétrico para vendas.
- Avançadas: OCO, OSO, MIT, LIT, GTC, GTD, IOC, FOK, AON, ATO, ATC.

### 4.4 Ferramentas de análise de volume (p164–173)
- **Ordens pendentes**: Livro (DOM). Problemas: só nível II (≈10 níveis); não mostra ordens a mercado, stops nem ordens ocultas; ordens podem ser canceladas → **spoofing** (ordem grande falsa para empurrar o preço ao lado oposto) e **iceberg** (ordem grande fatiada; um único agente; exemplo clássico de **absorção**: muitas compras agressivas batendo no ASK e o preço não sobe).
- **Ordens executadas**: Time & Sales (fita; não manipulável; útil para "big trades"); **Footprint** (volume executado por nível de preço dentro da vela; procura desequilíbrios, absorção, iniciativa, leilões inacabados, clusters) — subjetivo, não usar isolado.
- **Delta** = volume no ASK − volume no BID por período; existe delta acumulado (CVD). Delta com pavio = reversão intrabar da agressão. Não é "compras − vendas" com intenção.

### 4.5 O problema do fluxo de ordens (p174–185)
- Bases: toda compra corresponde a uma venda; toda ordem agressiva cruza com uma passiva; **BID/ASK só refletem a agressividade**.
- Buy market × sell limit → aparece no ASK; sell market × buy limit → aparece no BID.
- Fechar um short: manual a mercado (ASK), stop loss = buy stop (ASK), take profit = buy limit (BID). Fechar long: manual (BID), stop (BID), TP sell limit (ASK). ⇒ **a mesma ação aparece em colunas diferentes; não dá para saber a intenção** por trás das execuções. Nem todo volume no ASK é compra com intenção de pressão.
- 4.5.1 **Divergência de preço** (p180–181): desequilíbrio no ASK no topo seguido de virada para baixo tem várias leituras (compradores presos, stops de shorts, TP de longs, absorção por sell limits) — provavelmente um pouco de tudo. Fluxo de ordens deve ser **subordinado ao contexto** (Wyckoff); desequilíbrios aparecem em qualquer lugar do gráfico e sozinhos não dão vantagem.
- 4.5.2 **Divergência de delta** (p182–183): delta negativo em vela de alta ou delta positivo em vela de baixa. Ex.: vela de baixa com delta +235 = muitas compras agressivas bloqueadas por sell limits (absorção) + pouca demanda no BID → preço cai. **Divergência de delta = absorção implícita; no lugar certo (zona operacional/contexto) antecipa viradas**; em zona sem interesse, ignorar.
- 4.5.3 **Operador de preço e volume** (p184): chega à mesma conclusão sem fluxo de ordens: anomalia esforço/resultado = **volume alto + range estreito** e virada subsequente confirma.
- 4.5.4 Conclusão (p185): hedge/arbitragem também aparecem no BID/ASK sem intenção direcional; **fluxo de ordens isolado não dá o contexto** (onde e em que direção operar).

---

## PARTE 5 — Perfil de Volume (VP)

### 5.0–5.1 Fundamentos (p186–187)
- VP = variante do Market Profile (Steidlmayer, CBOT 1985). **Objetivo** (não interpreta intenção). Não é indicador: é volume por nível de preço.
- Mercado tem memória → zonas se comportam como no passado. **Memória é de curto prazo: zonas mais recentes > antigas.** Ao iniciar desequilíbrio, a primeira zona a considerar é a **zona de equilíbrio anterior mais imediata**. Quanto mais tempo fora de uma área, menos importante ela fica.

### 5.2 Composição do perfil (p188–199)
- Histograma horizontal; base estatística: distribuição normal (1 desvio = 68,2%; 2 = 95,4%).
- **Área de Valor (VA)** = entre **VAH** e **VAL**; contém **68,2% (≈70%) do volume** do perfil; área de **aceitação**. Fora dela (31,8%) = área de **rejeição**. VAH/VAL atuam como suporte/resistência. VA larga = muitos participantes/atividade; VA estreita = baixa atividade.
- **Extremos (High/Low do perfil)**: sempre referências-chave.
  - **Leilão terminado (finished)**: volume decrescente em direção ao extremo (é um LVN) → rejeição clara.
  - **Leilão inacabado (unfinished)**: **nó de alto volume no extremo** do perfil → sugere **revisita** futura (para concluir e virar, ou para continuar). Uso: se esperando rompimento para cima de uma zona de equilíbrio, queremos **leilão terminado no fundo**; se fundo com leilão inacabado → **colocar o cenário em quarentena** (provável visita ao fundo antes de subir). Na dúvida, tratar como terminado; inacabado deve ser muito visual (corte anormal da distribuição, frequentemente coincidindo com VAH/VAL). No Market Profile é objetivo: ≥2 TPOs no extremo = poor high/low (inacabado); 1 TPO (single print) = terminado.
- **VPOC**: nível de maior volume; preço mais justo; base do cálculo da VA; onde os grandes acumularam mais posição. **Evitar operar nas proximidades do VPOC** (flutuações em torno dele). **Controle**: preço **acima do VPOC → compradores** (favorecer longs); **abaixo → vendedores** (favorecer shorts). VPOC é sempre HVN, mas nem todo HVN é VPOC.
- **VWAP** = Σ(preço×volume)/Σvolume do período. Mesmo volume acima e abaixo → equilíbrio (50/50 ao tocar). Referência de execução institucional. Usar ±1/±2 desvios para "caro/barato" (só mais uma pegada). Em mercado desequilibrado o VWAP deixa de representar eficiência. Sessão (intraday), semanal/mensal (médio/longo prazo).
- **HVN (nó de alto volume)**: picos; equilíbrio/interesse; **ímãs** que atraem e retêm o preço → **bons alvos**. Pode haver vários por perfil.
- **LVN (nó de baixo volume)**: vales; rejeição/desequilíbrio → **suporte/resistência para buscar entradas**. Rejeição tem 2 formas: (a) **V-turn** — percepção de valor não mudou; ordens passivas bloqueiam + agressão confirma; volta à zona de valor anterior; pavios proeminentes; (b) **movimento rápido** — percepção mudou; preço **atravessa o LVN rapidamente** (stops + momentum); velas largas com volume alto.

### 5.3 Tipos de perfil (p200–205)
- **Range fixo (Fixed Range)**: lançado manualmente sobre qualquer trecho; não se atualiza. Usos: (a) **tendência** — perfil do movimento todo para achar zonas de reversão/continuação (ex.: preço testa o **VPOC do movimento de baixa** e retoma a queda); (b) **range/estrutura** — VPOC (controle) e VA (VAH/VAL), muito úteis para o **teste após o rompimento**. Se várias sessões têm VAs sobrepostas, lançar um perfil englobando todas (níveis mais relevantes).
- **Perfil de sessão**: do dia; day trade. Ex.: após alta e lateralização, buscar entrada a favor no VPOC; ou, se acima da VA da sessão anterior, o primeiro nível para teste é o **VAH da sessão anterior**.
- **Composto** (Donald L. Jones, "overlapping demand curve"): **fixo** (intervalo de datas: semana/mês/ano) ou **variável** (tudo visível no gráfico — muda ao rolar). Uso: contexto macro; HVN/LVN acima e abaixo; **HVNs de longo prazo como alvos de TP**; **LVN macro próximo de uma estrutura = local provável do Spring/shakeout**.

### 5.4 Volume vertical x horizontal (p206–207)
- Vertical = **quando** os grandes atuaram (volume por tempo). Horizontal (VP) = **onde** (volume por preço). Complementares.

### 5.5 Volume Profile x Market Profile (p208–210)
- MP usa tempo (TPO de 30 min, letras A, B...). Initial Balance (1ª hora; alguns usam 30 min): **IB estreito → maior chance de dia de tendência; IB largo → dia de range**. Aceitação objetiva no MP: 1 TPO = rejeição; ≥2 TPOs = aceitação. POC do VP pode diferir do POC do MP (muito volume em pouco tempo). Autor prefere VP (preço+volume), mas tempo continua essencial (consumo de tempo = aceitação).

### 5.6 Formas de perfil (p211–217)
- Classificar tipos de dia a posteriori não tem valor operacional (idem rotular Wyckoff). Foco: identificar **criação de zona de valor (range)** e avaliar **aceitação/rejeição nos extremos**.
- Perfis **P** e **b** = primeiras 3 etapas de Steidlmayer = Fases A e B. Durante a tendência, operar só a favor (VPOC em desenvolvimento e níveis operacionais).
- **5.6.1 P (p213–215)**: tendência de alta (parte fina embaixo) seguida de rotação (bojo em cima). Representa futuros esquemas de **distribuição ou reacumulação**. Só tem valor operacional o "P teórico" (desequilíbrio primeiro, depois criação de valor) — a próxima oportunidade é o desequilíbrio que sairá do bojo. "P espelho" (rotação primeiro, depois queda) = tarde demais. Tendência longa de alta = série de P (reacumulações). P teórico após tendência de baixa prolongada → alerta de fim (pelo menos temporário).
- **5.6.2 b (p216–217)**: queda + rotação embaixo. Futura **acumulação ou redistribuição**. b após alta prolongada → pode sinalizar fim da alta.

### 5.7 Usos do VP (p218–241)
- **5.7.1 Identificação da estrutura (p219–222)**: quando limites são "sujos", usar **VAH/VAL** do perfil da estrutura como limites do range. Limites de estruturas são sempre **LVN**. Às vezes Creek/Ice coincidem com VAH/VAL. Ex. (p220): após o shakeout final o preço **cruza rapidamente toda a VA, inclusive VPOC e VWAP** → favorecer distribuição; primeiro short = teste pós-rompimento (**LPSY**) no **VAL** (primeiro nível encontrado). Ex. (p221): após rompimento de alta, teste exatamente no **VAH** = local perfeito para gatilho long. **Extensão do perfil: do início da rotação até um pouco antes do desequilíbrio** (pode incluir a quebra; o importante é que o teste busque um nível da estrutura anterior).
- **5.7.2 Viés de mercado (p223–229)**:
  - Por áreas: **operar na direção do último HVN gerado**; considerar contra só quando o preço romper a zona que suportava o último movimento. Acima do HVN → compradores; short só após cruzar o HVN para baixo (então short no reteste do HVN). Perfil desenhado cobrindo **só o movimento** (do início ao fim do impulso). Em tendência, **ir atualizando** o perfil e usar o **último HVN** (não necessariamente o VPOC).
  - Por níveis operacionais: quanto **mais níveis a favor** melhor (long com todos os níveis abaixo do preço; short com todos acima). **VWAP e VPOC próximos = equilíbrio** (operar só reversão nos extremos). **Controle comprador: preço acima de VWAP e VPOC; vendedor: abaixo de ambos** (atuam como resistência/suporte). Intraday: níveis da sessão atual e anterior; estrutura: autor usa **VWAP semanal + VPOC da estrutura**.
  - Conflito (p228): Spring potencial que se coloca acima do VWAP semanal mas ainda abaixo do VPOC → **contexto prevalece**: shakeout vindo de baixo sugere início de desequilíbrio de alta; dar mais peso a desenvolvimento acima do VPOC. Se após o Spring o preço **não conseguir ficar acima do VWAP** → fraqueza; até avaliar short (o "Spring" seria rompimento de baixa genuíno). Ex. (p229): Spring potencial tenta reentrar mas **não se coloca acima do fundo da estrutura, do VAL e do VWAP semanal** → tratar como distribuição.
  - Pode-se usar VWAPs de vários TFs (semanal+mensal) para contexto de longo prazo.
- **5.7.3 Saúde da tendência (p230–233)**: alta saudável = **VAs/VPOCs das sessões cada vez mais altos** (aceitação) → comprar pullbacks a áreas operacionais. Baixa saudável = VAs cada vez mais baixas. Alerta: **sobreposição de VAs** ou VAs movendo-se contra a tendência → consolidação/mudança de caráter → analisar como estrutura Wyckoff. **Sequência b→P** em baixa = mudança de percepção de valor (possível acumulação); **P→b** em alta = possível distribuição. O que importa é a **rotação das VAs** (geração de valor acima/abaixo da anterior), não o padrão perfeito. Ex. p232–233: P, depois 2 dias de VAs sobrepostas, depois b dispara desequilíbrio para baixo; short quando preço abaixo da VA do b. Chave do padrão: o desequilíbrio é **rejeitado e reentra na VA** (não importa o horário); menos interessante: desequilíbrio no fim da sessão fechando fora da VA.
- **5.7.4 Migração do VPOC (p234–...)**: migração = nova aceitação; leitura (continuação ou reversão) depende da ação seguinte. Regra: se após a migração **não há continuação rápida**, questionar a saúde do movimento.
  - **Protocolo de reversão (p235–238)**: 1) migração do VPOC; 2) **não continuidade** na direção anterior; 3) **consumo de tempo** (lateraliza por tempo relativamente grande vs. continuações anteriores — quanto mais tempo, mais provável reversão); 4) **mudança de caráter** = impulso na direção oposta; 5) **entrada**: 1º nível = extremo da VA rompida (rompeu para cima → esperar no **VAH**; para baixo → **VAL**) [obs.: o texto PT diz "se quebrar esperaremos no VAL e se quebrar no VAH", ambíguo — interpretação lógica: retestar o extremo da VA pelo qual saiu]; 2º nível = **VPOC**. Ex. p236: queda na abertura, VPOC migra (1), gira sobre ele (2,3), desequilíbrio para cima (4), teste na antiga zona do VPOC (5) → long. Com perfil de sessão em andamento os níveis mudam; manter a zona (é LVN/estrutura anterior) — preferir **perfil de range fixo**. Viradas em V sem preparação = inoperáveis. Migração seguida de reversão total = valor **rejeitado** (faltou o tempo confirmar).
  - **Protocolo de continuação (p238–)**: 1) migração do VPOC; preço retoma a dinâmica com velocidade e pouco consumo de tempo...
    2) **gatilho**: esperar o setup e entrar. Ex. p239: na 3ª migração o preço reverte (ação distributiva); migrações seguintes, seguidas rapidamente por impulsos de baixa, fazem sentido como continuação. Vale para sessão, multi-sessão ou estruturas longas.
- **5.7.5 Calibração da gestão de posição (p241)**:
  - **Entrada**: esperar o gatilho em níveis operacionais (VWAP, VPOC, VAH, VAL).
  - **Stop loss**: atrás de **LVN** (zonas de rejeição prévia); quanto mais níveis a favor protegendo, melhor.
  - **Take profit**: em **HVN** (magnetismo).

### 5.8 Princípios operacionais com Áreas de Valor (p242–254) — valem para perfil de vela, sessão, movimento ou estrutura
1. **Princípio do range (p243–244)**: preço **dentro** da VA → continuará gerando valor em torno do centro; operar **reversão nos extremos** (VAH vende, VAL compra). Perfil de referência: intraday = sessão anterior; longo prazo = semanal/composto. **Alvo mínimo: VPOC; alvo ambicioso: extremo oposto da VA.** Melhor gatilho em **confluência** de níveis (ex. VAL + VWAP semanal + VPOC em desenvolvimento antigo).
2. **Princípio de reversão (p245–247)** (adaptação da **regra dos 80%** do Market Profile): preço fora da VA **tenta entrar e consegue** (reentra) → provável visita ao **extremo oposto da VA**. Ex.: abertura acima da VA anterior; no teste do VAH falha em continuar e reentra → teste interno do VAH + VWAP semanal → queda atravessando toda a VA.
3. **Princípio de continuação (p248–250)**: preço tenta entrar na VA e **é rejeitado no extremo (ou antes)** → provável desequilíbrio a favor da direção do rompimento = **trade de teste pós-rompimento** (preço saiu e gerou aceitação). Vale vindo de fora ou de dentro. Ex.: abertura acima do VAH, lateraliza, testa o VAH e vira para cima → compra (pode ser lido como reacumulação com o teste atuando como Spring).
4. **Princípio de reversão falhada (p251–253)**: preço reentra na VA mas é **fortemente rejeitado no VPOC** → reversão cancelada até nova ação. Se recuperar o extremo da VA → ativa **continuação**; se romper o VPOC efetivamente → reversão segue com alvo no extremo oposto. **Gestão: toda operação deve ser gerida ao atingir o primeiro nível operacional relevante** (ex.: compra no VAL gerida no VPOC da sessão anterior). Ex. p253: abre abaixo da VA; volta para dentro no VAL (reversão long) → vendedores no VPOC empurram para fora de novo → reversão falhada + continuação de baixa; teste bem-sucedido do VAL → queda com alvos VWAP semanal e "VPOC vazio" (naked VPOC) abaixo.
- 5.8.5 Tabela resumo (p254, imagem) — ver resumo acima.

---

## PARTE 6 — Fluxo de ordens (Order Flow) (p255–276)
- Só olhar dentro das velas **quando o preço chega às zonas operacionais** onde esperamos o desequilíbrio (sempre subordinado ao contexto). Autor usa footprint tipo **Volume Ladder** (BID x ASK por nível + histograma).
- **6.1 Leitura** (p256): footprint se lê **na diagonal**: compara o BID de um nível com o ASK do **nível imediatamente acima**.
- **6.2 Desequilíbrios** (p258–259): volume desproporcional numa coluna vs. a diagonal oposta; parametrizar **200%/300%/400%** (2x/3x/4x), opcionalmente com **mínimo de contratos**. É relativo à vela (mesmo número pode não ser desequilíbrio em outro momento).
- **6.3 Padrão de rotação (virada) = Absorção + Iniciativa** (p260–263):
  - **Absorção**: bloqueio por ordens limite; alto volume e o preço **não avança** nessa direção. Critérios: **volume relativamente alto**; **fechamento contra o desequilíbrio** (absorção de compra: desequilíbrios no ASK **acima do fechamento**; absorção de venda: desequilíbrios no BID **abaixo do fechamento**); confirmação = preço não continua. Pavio não é obrigatório. Pode exigir várias velas/lateralização.
  - **Iniciativa**: agressão a mercado na direção da entrada (compra: desequilíbrios no **ASK**; venda: no **BID**), **volume alto**, fechamento **a favor** do desequilíbrio (iniciativa compradora: desequilíbrios na **parte de baixo** da vela, fechando em cima; vendedora: desequilíbrios no topo, fechando embaixo). **Equivale à SOS/SOW bar: volume relativamente alto + range amplo + fechamento no extremo.**
  - Pode ocorrer em 1–2 velas (V-turn) ou com lateralização entre absorção e iniciativa. Reforço: **leilão terminado** no extremo (ver no footprint ou no VP).
  - **6.3.1 Rotação de baixa (p264–265)**: procurar à esquerda grandes negócios no **ASK no topo das velas** na zona operacional (absorção de compra por sell limits) → depois grandes negócios no **BID no topo** + deslocamento para baixo fechando na mínima (**SOWbar**). Ex.: 2 velas; delta gira de **+197 para −171**.
  - **6.3.2 Rotação de alta (p266–268)**: absorção de venda = forte atividade no **BID na parte de baixo** da vela (se no topo, não faz sentido) → iniciativa de compra: ataque ao ASK com desequilíbrios **abaixo do fechamento**. Ex.: vela com delta −536 seguida de vela de alta (sinal de absorção) mas sem desequilíbrios/delta fraco (ainda não pronto); depois vela de baixa delta −312 (mais absorção) e vela de alta com desequilíbrios no ASK, volume alto e **delta +607** → rotação.
- **6.4 Padrão de continuação = Controle + Teste do controle** (p269–273):
  - **Controle** = iniciativa depois que o movimento já começou. Preferir **≥2 desequilíbrios** (aceita 1 se a vela cumprir o resto). **Controle de alta**: desequilíbrios no ASK, vela com **bom volume**, fechando no **terço superior** do range (texto diz "quanto menor o alcance mais forte" — provavelmente erro; para o de baixa diz "quanto maior o intervalo melhor"). **Controle de baixa**: desequilíbrios no BID, vela de baixa de alto volume fechando no **terço inferior**. Nova oportunidade de entrada se ainda há distância até o alvo.
  - **Teste do controle**: preço revisita a zona do controle (níveis dos desequilíbrios/VPOC da vela, projetados à direita); esperar **novo padrão de rotação** ali, sobretudo **nova iniciativa** (absorção pode ser discreta); teste com **volume baixo** (desinteresse). Formas: pavio rápido, pequena violação e retorno, ou quase sem ação. Ex.: vela de controle de alta (range amplo, bom volume, delta +) → nível = VPOC da vela → preço volta com volume decrescente, rotação de 2 velas com novo desequilíbrio no ASK → segue alta. Em TF 15m, refinar em 5m ou esperar fechamento da vela de teste.
  - O desequilíbrio da iniciativa do padrão de rotação é a primeira zona de controle a projetar.
- **6.5 Fractalidade (p274–276)**: absorção+iniciativa (footprint, 1–3 velas) = **P/b** (sessões; o bojo é a absorção, a saída da VA é a iniciativa) = **estrutura Wyckoff** (dias/semanas: range = absorção, tendência = iniciativa). Continuação: o controle de um impulso inteiro é o **VPOC do perfil do impulso** → zona para fim de correção/novo impulso; no longo prazo, os **HVN** (acumulações/distribuições em outros TFs). Ex.: perfil do último impulso de baixa → VPOC = zona de controle vendedor → vender no teste; gerado por uma redistribuição secundária.

---

## PARTE 7 — Wyckoff 2.0 (p277–316)
- Integração: **Wyckoff** (lógica: leis de oferta/demanda, causa/efeito, esforço/resultado; contexto/roteiro; ferramentas de controle), **Teoria do Leilão** (equilíbrio/desequilíbrio, aceitação/rejeição; mercado revisita áreas antigas de alta atividade → alvos), **Volume Profile** (zonas/níveis objetivos; identificar estrutura; viés; saúde da tendência; gestão), **Order Flow** (só nas zonas-chave para validar gatilho: absorção+iniciativa; ou continuação via teste de controle).
- **Esquema operacional (p281–282)**:
  1. **Análise de contexto** p/ enviesar direção: (a) Range — (i) nos extremos, (ii) dentro; (b) Tendência — (i) interagindo com a zona de valor, (ii) longe da zona de valor.
  2. **Zonas e níveis operacionais** conforme estratégia: (a) zonas das estruturas Wyckoff; (b) áreas HVN/LVN; (c) níveis VAH, VAL, VPOC, VWAP.
  3. **Cenário** pela posição atual do preço: (a) protocolo de validação contínua; (b) cenário alternativo.
  4. **Gestão**: entrada, stop, alvo.

### 7.1 Análise de contexto (p283–293)
- Exemplo ideal de acumulação (p283–284) com 4 oportunidades: **(1)** nos extremos do range (princípio do range do VP); **(2)** após o Spring o preço recupera a VA → Wyckoff: buscar teste no topo; VP: reversão (ir ao extremo oposto da VA) — entrada no teste do Spring ou em LPS; **(3)** teste pós-rompimento: Wyckoff = entrada no **Creek** (BUEC); VP = continuação no extremo da VA (acima do **VAH**); **(4)** no meio da tendência, fora da VA: esperar retração para entrar.
- **7.1.1 Range (p285)**: se o range tem várias sessões, lançar um perfil do range inteiro. (1) Extremos: comprar embaixo, vender em cima. (2) Dentro: se o range é amplo e há espaço, operar buscando os extremos — especialmente após uma falha (shakeout) anterior que dê direção.
- **7.1.2 Tendência (p287)**: só operar a favor, esperando correções. (3) Interagindo com a zona de valor: avaliar rompimento efetivo x shakeout; se efetivo → teste confirmatório na estrutura rompida ou nível mais imediato. (4) Longe da zona de valor: aceitação nos novos níveis → operar nessa direção.
- **7.1.3 Operar no range (p288–289)**:
  - **Nos extremos**: Wyckoff = entrada no **shakeout de Fase C** (Upthrust no topo, Spring no fundo) → visita ao extremo oposto. VP = reversão nos limites da VA (vende VAH, compra VAL) → alvo extremo oposto.
  - **Dentro**: Wyckoff = após o teste de Fase C, entrar na **tendência dentro do range (Fase D)**; filtro = **recorrido suficiente para bom R/R**. Estar a favor do maior número de níveis; romper um nível sugere controle. **Último HVN gerado define o viés** (no TF menor): acima → só cenários de alta (o HVN abaixo é "acumulação protegendo"); abaixo → só baixa. Gestão obrigatória ao chegar aos extremos do range (ninguém tem controle total até o desequilíbrio final). VP: vindo de shakeout → reversão (regra dos 80%: após reentrar na VA, visita o extremo oposto).
- **7.1.4 Operar na tendência (p290–293)**:
  - **Interagindo com a zona de valor**: descartar rompimento falho (shakeout com reentrada). Rompimento efetivo → Wyckoff: entrada no **teste pós-rompimento na Fase D** (BUEC/LPS ou LPSY); VP: **continuação** no teste da VA. Pegadas para validar o rompimento: **(1) o shakeout** (quanto mais profundo, mais forte; preferir que atinja os extremos do range, não só shakeout local); **(2) preço e volume após o shakeout e no rompimento** (velas de bom deslocamento e alto volume; pavio e volume alto no rompimento são normais — absorção); **(3) reação pós-rompimento sem reentrar no range**: aceitação = lateralização fora do range; reforço = **migração do VPOC para a nova área** ou novo VPOC; pegada final = **não reentrada na VA** (preço+tempo+volume = nova percepção de valor). **Consumo de tempo pós-rompimento não pode ser excessivo**: o suficiente para gerar/migrar VPOC e então partir com velocidade. Acima do range mantido → todo o volume abaixo vira acumulação potencial → buscar long; abaixo mantido → distribuição → buscar short.
  - **Longe da zona de valor (Fase E)**: esperar onda corretiva antes de entrar. Wyckoff manda procurar novas SOS/SOW bars, estruturas menores e novos shakeouts (Ordinary Shakeout/Upthrust) mas **não diz onde** → usar níveis de volume (ex.: **estrutura menor sobre o VWAP semanal**). **Continuar a favor da última acumulação/distribuição até surgir estrutura na direção oposta ou o preço perder a última zona de valor.** Referência de controle = **último HVN** abaixo (tendência de alta) / acima (de baixa); contra-tendência só quando esse HVN romper.

### 7.2 Zonas e níveis operacionais (p294–298)
- Lógica igual em todos os contextos: identificar zonas/níveis e **esperar o gatilho** que confirme o desequilíbrio.
- Intraday: perfil da **sessão anterior** como base + sessão atual como apoio. Longo prazo: perfil da **semana anterior**, composto (semanas/meses), **VWAP semanal/mensal**. Operador de estruturas: **perfis fixos ancorados nas estruturas**.
- **Perfis concluídos > perfis em andamento** (níveis estáveis = consenso final).
- Composto: período livre (semana/mês/ano anterior ou atual); deve cobrir preço suficiente acima e abaixo para mostrar HVN/LVN principais. Gatilhos **só** em: zonas das estruturas Wyckoff; HVN/LVN; VAH/VAL/VPOC/VWAP.
- **Onde esperar o gatilho por contexto (p295–298)**:
  1. **Extremos do range**: operação clássica Wyckoff no shakeout (topo/fundo). **Entrada agressiva = no próprio shakeout; conservadora = no teste do shakeout.** (a) VAH/VAL (às vezes coincidem com os extremos da estrutura).
  2. **Dentro do range** (sempre a favor de um HVN e com distância suficiente): (a) **LVN** (identificar com perfil do range inteiro); (b) **VWAP e VPOC** (sessão p/ intraday; perfil multi-sessão p/ estruturas) — níveis que definem controle: esperar **rompimento efetivo deles e entrar no 1º teste** (confluência VWAP+VPOC = mais força). Se o preço rompe e não testa, entrada agressiva após a vela de intenção que rompe.
  3. **Tendência interagindo com a zona de valor** (esperar recuo): (a) **nível da estrutura rompida** (Creek/Ice — é LVN) = entrada clássica de teste pós-rompimento; atentar para níveis próximos, principalmente o extremo da VA; (b) **extremos da VA** (princípio de continuação); (c) **VPOC do range** = último nível; se o preço chega lá já reentrou fundo na VA → **quarentena**; só reativar com princípio de reversão falhada (recuperar o extremo da VA).
  4. **Tendência fora da zona de valor** (já a favor de um HVN): esperar retração a algum nível; se o primeiro estiver muito perto, provavelmente buscará o seguinte (retração proporcional ao impulso): (a) níveis da **sessão anterior** (VAH/VAL, VWAP, VPOC); (b) **VWAP semanal** (muito útil para fim de correção); (c) **VPOC do impulso anterior** (perfil fixo do último impulso); (d) **LVN** (composto, impulso, sessões).
- Sempre a favor do maior número de níveis; **confluências são altamente recomendadas, destaque VPOC+VWAP**.

### 7.3 Configuração de cenário (p299–302)
- **Cenário de 1 movimento**: preço já está do lado certo; esperar uma ação que o traga à zona operacional (long: níveis abaixo; short: níveis acima). Ex.: range em Spring potencial → esperar o teste e o gatilho de compra.
- **Cenário de 2 movimentos**: quer comprar mas o preço está **abaixo** da zona → esperar (1) posicionamento acima da zona e (2) teste → gatilho. Short espelhado. Ex. p301: após Spring potencial, esperar rompimento (1) + teste (2) para comprar (o preço está de frente para a zona-chave). Pode sair um Upthrust em (1) e reentrar — mas o viés inicial é de alta se Spring e rompimento cumprem as características.
- **Protocolo de validação contínua** ("se X, então Y"): "se o preço rompe o Creek, espero teste para comprar; se há rompimento falho, espero teste na direção oposta para vender". Sempre ter **cenário alternativo** oposto. Ex.: viés de rompimento no topo, mas preço reentra no range rejeitando fortemente (Upthrust) → mudar para short.

### 7.4 Gestão da posição (p303–316)
- Wyckoff propõe o cenário; VP refina **onde**; Order Flow confirma/calibra o **gatilho**.
- **7.4.1 Entrada (p304–308)**: gatilho = ação que denota intenção do grande operador:
  - **SOS bar**: vela de alta de **range amplo**, **fechamento no terço superior**, **volume relativamente alto**.
  - **SOW bar**: vela de baixa de range amplo, fechamento no **terço inferior**, volume relativamente alto.
  - Com order flow: padrão de rotação (absorção+iniciativa) confirma se a SOS/SOW bar tem iniciativa; se perdeu o gatilho, reentrada no padrão de continuação (controle+teste).
  - **Ordem de entrada: STOP** (buy stop acima da máxima da vela-gatilho; sell stop abaixo da mínima) — filtro de continuidade: evita entrar quando a vela de intenção é seguida de reversão brusca (absorção interna). Alternativas válidas: mercado após fechamento, agressão no footprint antes do fechamento, ou limite (avaliar).
  - **Não usar ordens limite antecipadas** (ex.: buy limit esperando o teste do Spring): aposta em 2 movimentos (descer para o teste + subir); só se pode projetar **um movimento**. Na zona, reanalisar preço/volume e exigir compradores agressivos.
  - Ver o gatilho na zona não garante lucro.
- **7.4.2 Stop loss (p309–311)**: além do **outro lado da vela significativa (SOS/SOW bar)** e/ou da **estrutura**; e do outro lado do **maior número de níveis/zonas** possível. 1ª zona = **LVN** (premissa: rejeição em V-turn; se for atravessado rápido, o stop será atingido). Níveis de equilíbrio (VWAP/VPOC/VA) atrás do stop dão chance de salvar a posição se os que viraram o mercado voltarem a defender. Ex. long: Spring + SOS bar → **buy stop acima da SOS bar**; stop **abaixo da vela-gatilho (#1)** ou **abaixo de toda a estrutura (#2)**, protegido por desequilíbrios da vela, VWAP e **VAL** do perfil da estrutura (=LVN). Ex. short: SOW bar → **sell stop abaixo da mínima**; stop **acima da máxima da vela (#1)**, **acima da máxima da virada (#2)** ou **além do VPOC do perfil (#3)** — verificar se o R/R continua aceitável. Níveis às vezes convergem (mais confiança), às vezes estão separados (escolher e avaliar risco).
- **7.4.3 Take profit (p312–314)**: (1) **barra climática** (útil sem referências à esquerda); (2) após desenvolvimento de uma **Fase A** que pare o movimento; (3) **zonas de liquidez** = máximos/mínimos relevantes anteriores; (4) **zonas de alta negociação prévia (HVN)** — mais recentes atraem mais. Preço exato do alvo = **VPOC daquela zona HVN**. Intraday: **DVPOC** (níveis que foram VPOC em algum momento da sessão) **não testados**; **naked VPOC** (VPOC final de sessões anteriores não testado; estatisticamente testado nos dias seguintes com alta probabilidade). Usar ambos.
- Gestão no 1º nível relevante (ver 5.8.4 e caso 8.4): ao atingir o primeiro alvo/nível, **no mínimo mover stop para o breakeven**; pode fechar tudo ou parcial.
- **7.4.4 Preço sai sem nós (p315–316)**: não perseguir; se a ideia segue válida, buscar entrada em novas zonas. Análise certa sem entrada = preservação de capital.

---

## PARTE 8 — Estudos de caso (p317–335)
- **8.1 6E, 2–6/jul/2020 (p318–320)** — range (extremos) + tendência fora da VA: SC, AR, ST; **UA na Fase B** (teste ao topo = intenção compradora); topo da estrutura é **LVN** no perfil do 1º dia, rejeita várias vezes e depois é cruzado rápido. **Spring + teste** inicia desequilíbrio. Footprint no Spring: rotação de **delta −240 → +183** (sem absorção clara; mas velas de baixa largas e volume alto sem continuidade = divergência esforço/resultado). Depois **padrão de continuação** (controle = área de maior negociação dentro da vela de alta; teste só até ela). Pegadas: volume decrescente no range, Weis compradoras maiores, **leilão terminado** no perfil do dia 3 em confluência com o Spring. Fora da VA: **migrações de VPOC** seguidas de continuação quase imediata (C1, C2) = entradas; C3 no **VWAP semanal**. Alvos: tp1 = HVN antigo com DVPOC; tp2 = zona de liquidez (máximo anterior).
- **8.2 6B, semana 29/jun–3/jul/2020 (p321–323)** — dentro do range + tendência interagindo com VA. Perfil = **semana anterior** (perfil concluído). Preço dentro da VA mas **acima do VPOC** → viés de alta. Estrutura menor com Spring potencial coincidindo com nível operacional → rompimento do perfil para cima com grande onda Weis; ação seguinte com desinteresse. Checklist: (1) o que (comprar); (2) onde = confluência **VAH semanal rompido + VWAP semanal + Creek** da acumulação menor; (3) cenário de 1 movimento; (4) gatilho = 2 velas com **delta +685 e +793** e desequilíbrios no ASK. Gestão: **buy stop no rompimento da vela de alta; stop abaixo da mínima da vela de baixa**; alvo = **naked VPOC** à esquerda ou máximo anterior.
- **8.3 ES, 17/jul/2020 (p324–326)** — princípio de reversão de alta. Abertura abaixo da VA do dia anterior → viés inicial short no teste do VAL; mas preço **reentra na VA precedido de shakeout nas mínimas**. Teste na convergência dos VWAPs (um pouco abaixo do VAL — menos confiável); oportunidade melhor quando volta à VA e testa dentro. Em 5m: lateralização + teste do Spring + rompimento com Weis forte; sem reentrada → BUEC → footprint: vela de alta com desequilíbrio, volume acima da média, delta muito positivo → compra. Alvo: **VAH** (confluência com VPOC antigo).
- **8.4 6C, 22/jul/2020 (p327–329)** — extremos do range. Dia abre dentro da VA anterior e lateraliza → reversão nos extremos. Teste preciso no **VAL** = Spring da pequena estrutura de 2 dias; footprint: desequilíbrio no ASK no Spring → compra. Preço cruza a VA inteira (**regra dos 80%**: tentou sair, falhou e reentrou → 80% de chance de atingir o extremo oposto). TP = **VAH**; ali, no mínimo **stop no breakeven** (vindo de Spring, ainda se espera mais um impulso).
- **8.5 6B, 3/ago/2020 (p330–332)** — tendência interagindo com VA, intraday (perfil da sessão anterior). Vindo de estrutura distributiva → viés short; zona = **VAL** do perfil; nova lateralização abaixo = aceitação abaixo (mais um ponto a favor). Confluência: teste da VA rompida + possível shakeout da nova estrutura. Footprint: última vela de alta com volume alto, muitas execuções no ASK e pavio superior (absorção de compra) → vela com grande delta negativo (iniciativa) → SOW bar de confirmação. **Priorizar a iniciativa** (indispensável) sobre ver absorção (nem sempre aparece). TP: antigo VPOC.
- **8.6 6E, 31/ago/2020 (p333–335)** — dentro do range; reversão falhada. Preço tenta sair pelo topo da VA anterior, é rejeitado e reentra → short de reversão. Perto da zona operacional surge reversão (footprint) → (a) se vendido, **fechar antes do stop** (gestão ativa mesmo com stop no breakeven); (b) se o contexto maior apoiar, comprar pela reversão falhada. Gatilho de compra abaixo do VWAP semanal (elemento contra) → operar com **menos alavancagem**. Requisito universal: **ativo com liquidez suficiente**.

---

## SÍNTESE — Fases A–E e eventos (como o livro os usa)
> O livro 2 pressupõe as definições do livro 1 ("A Metodologia Wyckoff em Profundidade"). Abaixo: definições operacionais padrão + os critérios/acréscimos deste livro (com páginas).

### Fases
| Fase | Função (p97, p146) | Acumulação | Distribuição | Critérios objetivos / uso |
|---|---|---|---|---|
| A | Parar a tendência anterior | PS, SC, AR, ST | PSY, BC, AR, ST | Não exigir os 4 eventos (p17, p66); basta mudança de caráter tendência→lateral. Limites do range = SC/AR (acum.) ou BC/AR (dist.). Posição do ST em terços (p79). |
| B | Construir a causa | UA, ST as SOW, testes internos | UT, ST as SOW, picos de volume | Mais longa em teoria (nem sempre, p67). Fase de interesse para começar a monitorar (p94). Teste no topo = força; no fundo = fraqueza (p80). Volume decrescente = acumulação; volume alto/incomum = distribuição (p87–88). Extremos devem ser LVN (p219). |
| C | Avaliar a competição (teste) | Spring / Shakeout / (ou LPS sem Spring) | UTAD / (ou LPSY sem UTAD) | **Evento dominante** (p82). Objetivo mínimo: extremo oposto (p83). Sem shakeout nos extremos: teste num extremo + falha estrutural no oposto ⇒ LPS/LPSY como teste (p82, p84). |
| D | Tendência dentro do range | SOS (mSOS), LPS, JAC | SOW (mSOW), LPSY | SOS/SOW bars: range amplo + volume alto + fechamento no extremo (p84–87, p304). Após UTAD, no mínimo atingir o fundo (mSOW) (p86). |
| E | Tendência fora do range | BUEC/Back Up, reacumulações | LPSY pós-quebra, redistribuições | Aceitação fora (lateralização curta, migração/novo VPOC, não reentrada) (p291). Entrar em correções nos níveis de volume (p292–298). |

### Eventos — definição + critérios para detecção
- **PS (Preliminary Support)** / **PSY (Preliminary Supply)**: primeira parada notável da tendência com aumento de volume; não para a tendência. Código: primeiro pico de volume relativo com rejeição (pavio) após tendência de N pernas.
- **SC (Selling Climax)** / **BC (Buying Climax)**: extremo da tendência com **volume e range climáticos** (ex.: vol > 2–3× média, range > 2× ATR). O livro admite parada **sem volume climático** (esgotamento) em estruturas fortes (p49). Volume muito alto no fim de queda + reação = compradores agressivos (p48).
- **AR (Automatic Rally / Reaction)**: reação após SC/BC; seu extremo define o outro limite do range. Uma acumulação rápida em TF menor pode ser o AR do TF maior (p104).
- **ST (Secondary Test)**: volta à zona do SC/BC com volume e range menores. Posição em terços diagnostica força/fraqueza (p79).
- **UA (Upthrust Action, Fase B acumulação)**: teste/ligeira quebra do topo do range na Fase B → força; confirmado se depois o preço **não visita o fundo** (p81–82, p318). **ST as SOW** (Fase B distribuição): teste/quebra do fundo → fraqueza; confirmado se depois não visita o topo.
- **Spring / Shakeout (Fase C)**: penetração do suporte (fundo do range ou mínimo relevante interno) seguida de **reentrada** no range. Mais profundo = mais liquidez capturada = mais força (p55–56, p291). Validação: deve gerar no mínimo um **Minor SOS**; senão, reinterpretar como fraqueza (p74). Objetivo mínimo: topo do range (p83). Com VP: ideal reentrar e posicionar-se acima de **VAL/fundo/VWAP semanal**; se não consegue → tratar como distribuição (p228–229). LVN macro próximo = local provável do Spring (p205). Leilão terminado no fundo reforça (p192, p319). **Test (do Spring)**: retorno à zona do Spring com volume/range menores — entrada conservadora (p295).
- **UTAD (Upthrust After Distribution, Fase C)** / **UT (Fase B)**: penetração acima do topo e reentrada. Melhor se excesso no topo ou sacudida de topo relevante, idealmente rejeitado da VA/VPOC (p55, p57–58, p60). Validação: queda subsequente deve **quebrar o fundo** ou ao menos atingi-lo (mSOW) (p86).
- **SOS (Sign of Strength) / SOW (Sign of Weakness)**: movimento de Fase D com velas de **range amplo, volume alto, fechamento no extremo** que leva ao extremo oposto e preferencialmente rompe (p84–87). Minor SOS/mSOW = chega ao extremo sem romper.
- **JAC (Jump Across the Creek)**: rompimento do Creek (resistência) com SOS. Rompimento genuíno: vela larga, fecha na máxima, volume alto; pavio tolerado se o preço **não volta ao range** (p86–87).
- **BUEC (Back Up to the Edge of the Creek) / Back Up**: reteste do Creek rompido = **entrada clássica conservadora** (p75, p284, p296). Confluências ideais: Creek + **VAH** + **VWAP semanal** (p50, p52, p54, p322). No BUEC querem-se **ondas Weis de baixa pequenas** (p92). Falha em continuar no BUEC = acumulação falhada (p30) ou parte de estrutura maior (p107).
- **LPS (Last Point of Support)**: fundo mais alto/pullback após SOS; é **falha estrutural** (não volta ao fundo) (p35). Pode substituir o Spring como teste de Fase C (p82, p84). Ideal acima do VPOC (p52).
- **LPSY (Last Point of Supply)**: topo mais baixo após SOW; teste pós-rompimento de baixa em confluência estrutura quebrada + **VAL/VPOC** (p57, p61, p220).
- **SOT (Shortening of Thrust)**: ver 1.6 (p39–41).
- **Creek / Ice**: resistência / suporte do range; por natureza **LVN**; às vezes = VAH/VAL (p219, p296).

### Perfil de volume nas estruturas — resumo
- Lançar **perfil de range fixo do início da rotação até pouco antes do desequilíbrio** (p221).
- **VPOC da estrutura** = linha de controle: Spring/LPS acima dele = comprador; preço que cruza rapidamente toda a VA (incl. VPOC e VWAP) após shakeout de topo = distribuição (p220).
- **VAH/VAL** = limites alternativos do range e níveis de teste pós-rompimento (BUEC no VAH; LPSY no VAL) (p219–221).
- **HVN**: acumulações/distribuições internas; BUEC acima do HVN/VPOC = força (p107); preço abaixo do HVN e reteste = LPSY (p57).
- **Leilão inacabado** no extremo oposto ao rompimento esperado → quarentena (p192).

---

## Regras que podem virar código
> Parâmetros entre colchetes são sugestões minhas para calibrar (o livro é discricionário e não fixa números, salvo onde indicado).

**Contexto / estrutura**
1. **Detecção de range**: após tendência (≥3 pernas), marcar range quando o preço fica ≥ [N=20] velas entre um mínimo (SC) e o máximo da reação (AR) com ≥2 toques em cada lado (tolerância [0,25×ATR]). Se na Fase B o preço sai repetidamente do retângulo mas respeita um canal paralelo ligando mínimos/máximos de A–B–C, trocar para canal inclinado (p45).
2. **Clareza**: se não há tendência nem range identificável no TF, subir de TF; se nenhum TF é claro, descartar o ativo (p108).
3. **Posição do ST em terços** (range SC→AR): ST termina no terço superior ou acima do AR → +1 força; no terço inferior ou abaixo do SC → +1 fraqueza (p79).
4. **Teste de Fase B**: preço supera o topo do range (UA) e depois o próximo swing de baixa **não alcança** o fundo (falha estrutural) → +2 força / candidato a LPS como teste de Fase C. Espelho para distribuição (p80–84).
5. **Volume ao longo do range**: regressão linear do volume relativo nas velas do range; inclinação negativa → +1 acumulação; picos de volume > [2,5×] média dentro do range (especialmente no meio) → +1 distribuição (p60, p87–88).
6. **Weis Wave**: somar volume por onda (reversão de [k×ATR]); ondas na direção do rompimento maiores que as anteriores → harmonia; rompimento com onda menor que a média das últimas [3] → divergência (rompimento suspeito) (p89–92).
7. **Shakeout (Spring/UTAD)**: mínima abaixo do fundo do range (ou de mínimo relevante interno) por ≥ [0,1×ATR] e **fechamento de volta dentro** do range em ≤ [3] velas. Profundidade maior = score maior. Viés passa a ser na direção oposta ao shakeout (evento dominante, sobrepõe pegadas anteriores) (p82–83).
8. **Validação do shakeout**: após o Spring, o preço deve atingir o topo do range (ou ao menos gerar Minor SOS) em ≤ [M] velas; se não → invalidar Spring e marcar fraqueza. Após UTAD, deve atingir o fundo (mSOW); se não → força oculta (p74, p85–86).
9. **SOS bar / SOW bar**: range ≥ [1,5×ATR(20)], volume ≥ [1,5×] média(20), fechamento no terço superior (SOS) / inferior (SOW) do candle (p84, p304).
10. **Rompimento genuíno**: candle de rompimento SOS/SOW bar fechando além do Creek/Ice; pavio permitido; **invalidado se fechar de volta dentro do range** nas próximas [3] velas (vira shakeout na direção oposta) (p86–87, p291).
11. **Aceitação pós-rompimento**: preço fica fora do range ≥ [K] velas sem fechar dentro + VPOC de perfil fixo pós-rompimento fora do range (migração) → tendência confirmada; se o tempo lateral fora exceder [2×K] sem impulso → alerta (p291).
12. **Falha estrutural**: em canal com ≥2 toques/lado, após tocar um extremo, a perna seguinte reverte antes de chegar a [75%] da largura → sinal a favor da reversão (p34–38).
13. **SOT**: ≥3 impulsos na direção da tendência com distância de avanço (extremo novo − extremo anterior) estritamente decrescente → exaustão; com volume do último impulso alto → divergência esforço/resultado; baixo → esgotamento. Confirmação = impulso oposto com volume alto; entrar no pullback. Ignorar SOT contra o último shakeout. >4 impulsos encurtando → não operar contra (p39–41).
14. **Acumulação/distribuição falhada**: rompimento genuíno + no reteste (BUEC/LPSY) o preço reentra no range com SOW/SOS bar → inverter viés (p30–31).

**Volume Profile**
15. **VA = 70% (68,2%) do volume em torno do VPOC** (expandir para o lado de maior volume a cada passo). Calcular VPOC, VAH, VAL para: sessão (00:00 UTC p/ cripto), semana anterior, estrutura (range fixo do início da rotação até o candle anterior ao rompimento), último impulso (p190, p221).
16. **HVN/LVN**: picos/vales do histograma suavizado (ex.: prominence ≥ [x%] do pico). Extremos de estrutura devem coincidir com LVN (checagem de qualidade) (p197, p219).
17. **Leilão inacabado**: volume no último [2–3] bins de um extremo ≥ [y%] do VPOC → extremo "inacabado" → reduzir score de rompimento na direção oposta (quarentena) (p191–193).
18. **Controle**: preço > VPOC e > VWAP (semanal) → long-only; < ambos → short-only; |VPOC−VWAP| < [0,3×ATR] → equilíbrio, só reversão nos extremos da VA (p195, p226).
19. **Viés pelo último HVN**: perfil do impulso atual atualizado a cada vela; operar a favor enquanto o preço não fechar além do último HVN; após rompê-lo, procurar reteste para entrar contra a tendência anterior (p223–225, p293).
20. **Saúde da tendência**: VPOC das sessões estritamente crescentes (alta) / decrescentes (baixa); sobreposição de VAs de ≥ [2] sessões ou VPOC contra a tendência → fim de tendência/estrutura em formação (p230).
21. **Princípio do range**: preço dentro da VA de referência → sinais só nos extremos (compra VAL, venda VAH); alvo1 = VPOC, alvo2 = extremo oposto (p243–244).
22. **Princípio de reversão (80%)**: preço abre/está fora da VA, reentra e **fecha dentro** por ≥ [2] velas → alvo = extremo oposto da VA; entrada no teste interno do extremo (p245–247, p328).
23. **Princípio de continuação**: preço fora da VA, testa o extremo (VAH vindo de cima/VAL vindo de baixo) e é rejeitado sem fechar dentro → entrar a favor; gatilho na rejeição (p248–250).
24. **Reversão falhada**: após reentrada, rejeição forte no VPOC → cancelar reversão; reentrar na direção original se o preço reconquistar o extremo da VA (p251–253).
25. **Migração do VPOC (reversão)**: migração + sem nova extensão por ≥ [T] velas (consumo de tempo maior que o das continuações anteriores) + impulso oposto (SOS/SOW bar) → entrada no reteste do extremo da VA rompida, depois no VPOC (p235). **(continuação)**: migração seguida de nova extensão rápida → entrar a favor (p238–239).

**Order Flow (se houver dados de trades/aggTrades da Binance)**
26. **Desequilíbrio diagonal**: ask_vol(nível i+1) ≥ [3×] bid_vol(nível i) (compra) ou bid_vol(i) ≥ [3×] ask_vol(i+1) (venda), com mínimo de contratos (p256–259).
27. **Absorção**: vela com volume ≥ [1,5×] média, desequilíbrios de compra **acima do fechamento** (absorção de compra) ou de venda **abaixo do fechamento**, e sem continuação na vela seguinte (p261).
28. **Iniciativa**: vela tipo SOS/SOW bar com desequilíbrios a favor e localizados na parte "de trás" da vela (compra: metade inferior; venda: metade superior); delta forte na direção. Para o scanner, **iniciativa é obrigatória; absorção é bônus** (p262–263, p332).
29. **Divergência de delta**: delta > 0 em vela de baixa ou < 0 em vela de alta **numa zona operacional** → possível absorção (p182–183).
30. **Rotação de delta**: delta da vela n e n+1 com sinais opostos e |Δ| grande (ex.: −240→+183; +197→−171) numa zona operacional → gatilho (p265, p319).
31. **Controle + teste**: vela de controle (≥2 desequilíbrios, volume alto, fechamento no terço extremo) → projetar seu nível (VPOC da vela) à direita; entrada quando o preço volta com volume baixo e surge nova iniciativa (p269–273).

**Execução / gestão**
32. **Sinais só em zonas**: gatilho válido apenas se o preço estiver a ≤ [0,25×ATR] de uma zona operacional (Creek/Ice, VAH/VAL, VPOC, VWAP semanal, LVN, VPOC do último impulso). Score maior com confluência (≥2 níveis em [0,25×ATR]), destaque VPOC+VWAP (p294–298).
33. **Entrada por ordem stop**: buy stop 1 tick acima da máxima da SOS bar (sell stop abaixo da mínima da SOW bar); cancelar se não acionar em [2] velas (p305).
34. **Nunca ordem limite antecipando o teste** (p306–308).
35. **Stop**: além da vela-gatilho (agressivo) ou além do extremo da estrutura/shakeout (conservador), preferencialmente além de um LVN/VAL/VAH e de VWAP; rejeitar trade se R/R até o alvo1 < [2] (p309–311).
36. **Alvos**: alvo1 = primeiro nível operacional relevante (VPOC/extremo oposto da VA/HVN — usar o VPOC do HVN); seguintes: naked VPOCs / DVPOCs não testados, máximos/mínimos anteriores (liquidez), alvo por Fase A no TF maior. Ao atingir alvo1 → stop no breakeven (parcial opcional) (p241, p312–314, p329).
37. **Filtro de recorrido**: em trades dentro do range (Fase D), exigir distância até o extremo oposto ≥ [2×] o risco (p288–289).
38. **TF**: contexto em 1W/1D, estrutura em 4H/2H(8H), gatilho em 1H/15m; estrutura maior prevalece (p94–103).
39. **Liquidez do ativo**: só operar ativos com volume/spread adequados (filtro de volume 24h mínimo) (p151, p335).

---

## Como complementa o método Excelência Trading
- **Mesma espinha dorsal**: "força de fundo/topo em lateralizações" do Excelência = pegadas de Wyckoff deste livro: ST em terços, UA/ST as SOW, falha estrutural (não chega ao extremo oposto), volume decrescente (acumulação) vs. picos de volume (distribuição), SOT. Isso dá **critérios quantificáveis** para o "score de força" da lateralização.
- **Liquidez (SMC) = shakeout (Wyckoff)**: o "sweep" de liquidez do SMC é o Spring/UTAD/UA. O livro adiciona: (a) o sweep é o **evento dominante** — viés vira para o lado oposto; (b) **validação obrigatória** (precisa gerar no mínimo Minor SOS / atingir o extremo oposto); (c) profundidade do sweep importa; (d) sweep perto de **LVN macro** e com **leilão terminado** é mais confiável.
- **Order block / mitigação ↔ controle + teste do controle / BUEC / LPS / LPSY**: a vela de iniciativa (SOS/SOW bar) que rompe estrutura é o "OB"; o retorno à zona com volume baixo e nova iniciativa é a "mitigação". O livro sugere usar o **VPOC da vela/impulso** (zona de maior volume) como ponto preciso da mitigação e exige volume baixo no reteste.
- **POC/VAH/VAL**: o livro formaliza 4 princípios operacionais (range, reversão 80%, continuação, reversão falhada) e o uso do **perfil da estrutura** (do início do range até antes do rompimento) — BUEC no VAH, LPSY no VAL, VPOC como linha de controle. Adiciona **VWAP semanal** como nível de confluência frequente (BUEC/LPS com VWAP semanal aparece em vários exemplos).
- **BOS/CHoCH**: "mudança de caráter" (tendência→lateral) = Fase A; rompimento do Creek com SOS bar = BOS de alta na estrutura. O livro exige **aceitação** (tempo + VPOC migrando + não reentrada) antes de confiar no BOS.
- **Gestão**: stop atrás de LVN e da vela-gatilho; alvo no VPOC de HVN / naked VPOC; breakeven no 1º nível — encaixa nas regras de TP em liquidez do Excelência e adiciona alvos por volume.
- **Contexto top-down**: semanal → 4H → 1H/15m, procurando estrutura menor dentro da zona operacional da maior (Spring maior = acumulação menor) — mesmo raciocínio de HTF POI + LTF confirmação do SMC.
- **Para cripto/Binance perp**: volume é por exchange (dados parciais, análogo ao problema OTC); usar Binance perp + idealmente volume spot agregado. Sessão = dia UTC para perfil de sessão; VWAP semanal ancorado na segunda 00:00 UTC. aggTrades permitem footprint/delta (CVD) para as regras 26–31.

## Dúvidas / pontos ambíguos
1. **Parâmetros**: o livro não define números para "volume relativamente alto", "range amplo", "tempo excessivo", "distância suficiente" — todos os limiares em colchetes acima são suposições a calibrar com backtest.
2. **Tradução automática**: termos trocados ("choque/crash/agitação/tremor" = shakeout; "fonte/primavera/mola" = Spring; "riacho/Arroyo" = Creek; "Hielo" = Ice). Algumas frases ficam contraditórias, ex.: protocolo de reversão do VPOC (p235) "se quebrar esperaremos no VAL e se quebrar no VAH" — interpretei como "rompendo para baixo, esperar o reteste do VAL; para cima, do VAH".
3. **Controle de alta (p269–270)**: "quanto menor o alcance da vela, mais forte" vs. no controle de baixa "quanto maior o intervalo, melhor" — provável erro; considerar range amplo para ambos (coerente com SOS/SOW bar).
4. **Footprint diagonal**: o livro diz comparar "BID de um nível com o ASK do nível superior"; a convenção usual de desequilíbrio de compra é ASK(i) vs BID(i−1). Definir convenção no código e testar.
5. **Perfil de "sessão" em cripto 24/7**: o livro discute sessões RTH/ETH (ES); em cripto não há sessão — decidir entre dia UTC, sessões regionais (Ásia/Londres/NY) ou perfis por estrutura/semana.
6. **Extensão do perfil da estrutura**: incluir ou não a vela de rompimento (livro aceita ambos, p221). Recomendo excluir para níveis estáveis e testar.
7. **Regra dos 80%**: o livro cita a estatística do Market Profile mas não a valida para VP; validar em cripto.
8. **Fase B "deve ser mais longa"**: o livro diz que nem sempre; não usar proporção de fases como filtro rígido.
9. **Quando o Spring for "local"** (mínimo interno e não o fundo do range), o livro diz que dá menos confiança mas é válido — definir peso no score.
10. **Weis Wave**: configuração (tamanho de reversão da onda) não especificada.
11. **Tabela 5.8.5 (p254)** é apenas figura dos 3 princípios (range, reversão, continuação) para casos de alta e baixa; não há números.
