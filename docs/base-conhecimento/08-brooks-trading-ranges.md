# Al Brooks — Trading Price Action: Trading Ranges (tradução PT "Consolidações")

Fonte: `/home/user/korbuilscanner/Livros/Trading_Price_Action_Trading_Ranges_Trad.pdf` (289 págs., tradução PT "@Andrey's Translations").
Referências de página = página do PDF (pN). Gráficos do autor: Emini S&P 5 min, EMA 20. "Consolidação" na tradução = trading range (TR).

> Convenções para código: "barra de alta" = close > open; "corpo" = |close-open|; "tique" = tick do ativo; EMA = EMA20 do timeframe.

**Índice**: 0 Glossário · 1 Checklists de força (p27–30) · 2–6 Rompimentos, falhas, testes (p31–69) · 7 Gaps (p70–78) · 8–12 Ímãs/S-R e measured moves (p79–99) · 13–21 Pullbacks, contagem H1/H2, cunhas, linhas duelantes, OCO (p100–169) · **24–27 Trading ranges, TR estreito, barbwire, triângulos (p170–212)** · 28–36 Scalp vs swing, matemática, entradas stop/limit, stops, alvos, escalonamento (p213–289) · **A Probabilidades · B Regras para código · C Ponte com Excelência Trading · D Dúvidas** (fim do arquivo).

---

## 0. Glossário operacional (p6–p11)

- **Probabilidade nomeada**: "provavelmente" = >= 60%; "arriscado" = trade com >= 50% de chance de falha. "Razoável" = equação do trader favorável.
- **Barra de sinal**: barra imediatamente anterior à barra de entrada (última barra do setup). **Barra de entrada**: barra onde a ordem é executada.
- **Barra de pullback** (em alta): mínima < mínima da barra anterior (pelo menos 1 tique).
- **Barra de pausa** (em alta): máxima <= máxima anterior, ou barra pequena com máxima só 1 tique acima de barra de tendência forte anterior.
- **Barra de reversão de alta**: corpo de alta, sombra inferior, fecha acima da abertura e perto da máxima (espelho p/ baixa).
- **Borda (ledge)**: pequeno TR com fundo formado por >= 2 barras com mínimas idênticas (borda de alta) ou topos idênticos (borda de baixa). -> equivalente a "equal lows/highs" (liquidez).
- **Arame farpado (barbwire)**: >= 3 barras amplamente sobrepostas e >= 1 doji; barras grandes com sombras. Não operar dentro.
- **Canal estreito**: linha de tendência e linha de canal próximas; pullbacks pequenos, duram 1–3 barras.
- **Clímax**: movimento longe e rápido demais que reverte para TR ou tendência oposta; a maioria das reversões de clímax vira TR, não tendência oposta.
- **Falha fracassada (failed failure)**: rompimento -> barra de reversão contra -> mercado passa a mínima dela (rompimento "falhou") -> em poucas barras o preço passa a máxima de uma barra anterior: a falha falhou, rompimento continua (vira pullback de rompimento / pequena bandeira). Segundo sinal = mais confiável.
- **Falha de 5 tiques** (Emini): trade que anda 5 tiques além da barra de sinal e reverte (alvo de 4 tiques precisa de 6 tiques de movimento) -> setup para entrar na direção oposta. *Para cripto: equivalente "alvo de scalp quase atingido e reverte".*
- **Fundo duplo**: mínima atual ~ igual à de barra anterior (1 a 20+ barras atrás). **Fundo duplo pullback**: fundo duplo + pullback profundo que forma fundo mais alto (setup de compra).
- **Gap de média móvel (MA gap bar)**: barra que não toca a EMA (mínima acima de EMA plana/descendente ou máxima abaixo de EMA plana/ascendente). Primeiro pullback numa tendência forte que gera uma gap bar contra a tendência costuma ser seguido de teste do extremo da tendência.
- **ii / iii**: 2 (3) inside bars consecutivas; setup de rompimento (bandeira ou reversão). **ioi**: inside-outside-inside; compra acima/venda abaixo da inside. **oo**: duas outside seguidas.
- **Inside bar**: H <= H[1] e L >= L[1]. **Outside bar**: H >= H[1] e L < L[1] (ou L <= L[1] e H > H[1]).
- **Micro padrão**: padrão de 1–5 barras (fractal).
- **Modo de rompimento**: dentro de TR com topos/fundos, espera-se continuação na direção do rompimento.
- **Pullback de rompimento**: pullback de 1 a ~5 barras logo após um rompimento; setup de continuação.
- **Pressionar (adicionar) compras**: em spike de alta, comprar novos topos esperando nova perna ~ measured move.
- **Escada / escada encolhida**: >= 3 swings de tendência num canal largo; se cada novo extremo é menor que o anterior -> momentum diminuindo (pode virar 3 empurrões).

## Introdução (p12–p19) — ideias úteis
- Instituições = mercado; o preço só vai a um nível se instituições querem negociar lá. Stops não são "caçados" pessoalmente — o mercado testa níveis onde há interesse de ambos os lados.
- Reversões bem-sucedidas mais comuns: **primeiro rompem a linha de tendência com momentum forte e depois testam o extremo** (p17). Divergência sem esse rompimento prévio = estratégia perdedora.
- Use alvo (recompensa) >= stop (risco) (p14).
- Subida com muitas barras sobrepostas, muitos corpos de baixa, sombras superiores = teste fraco -> transição para TR (p17).

- Na maior parte do dia o mercado tem **probabilidade direcional 50/50** para um movimento equidistante (bracket OCO X acima/X abaixo) — essa é a "marca registrada" de um TR: **na dúvida, assuma TR** (p19). Em tendência forte a probabilidade direcional sobe para **60–70%**, mas gravita de volta a 50% em áreas de S/R (geralmente measured moves), onde se forma TR.
- "Em tendência, a maioria das tentativas de reversão falha; em TR, a maioria das tentativas de rompimento falha" — probabilidade de >= 70% de que o que acabou de acontecer continue (p24).
- Pullback que retrai **>= 75%** da perna anterior: chance de voltar ao extremo cai muito -> tratar como nova tendência oposta (p22).
- Picos de volume (volume climático) perto do fim de quedas às vezes precedem fundos, mas o autor acha pouco confiável (p18).
- Movimento grande em mercado de baixa (no TF maior) é provavelmente só bandeira de baixa até haver sequência de fundos mais altos/topos mais altos (p22).

## 1. Checklists de força (p27–p30) — base para "score" de rompimento/reversão

### 1.1 Sinais de tendência forte (p27–28) — lista do autor
1. Gap de abertura grande. 2. Topos e fundos em tendência. 3. Maioria das barras na direção da tendência. 4. Pouca sobreposição de corpos consecutivos (em spike de alta, mínimas no fechamento anterior ou 1 tique abaixo). 5. Barras com sombras pequenas/ausentes (urgência). 6. Gaps entre corpos (open > close anterior). 7. Gap de rompimento = barra de tendência forte no início. 8. Measuring gap: pullback do rompimento não volta à máxima da barra de rompimento/ponto de rompimento. 9–10. **Micro gap de medida**: barra forte de alta em que L[barra seguinte] >= H[barra anterior] -> sinal de força. 11. Sem clímax grandes. 12. Sem barras enormes (as maiores barras costumam ser contra-tendência e prender traders). 13. Sem ultrapassagens significativas da LT; as pequenas geram só correções laterais. 14. Correções laterais após quebra da LT. 15. Cunhas e outros setups contra-tendência falham. 16. **Sequência de 20 gap bars** (>= 20 barras sem tocar a EMA). 17. Poucos trades contra-tendência. 18. Pullbacks pequenos, raros, laterais (ex.: range médio 12 pts -> pullback < 3–4 pts; >= 5 barras sem pullback). 19. Urgência (esperar setup a favor que nunca vem). 20. Pullbacks com sinais fortes (H1/H2 com boas barras de reversão). 21. Nas mais fortes, sinais fracos nos pullbacks (força a perseguir). 22. Pullbacks de 2 pernas repetidos = entradas a favor. 23. **Nunca 2 fechamentos consecutivos do lado oposto da EMA**. 24. Rompe muitos níveis (EMA, topos, LTs) por muitos tiques. 25. Spikes contra-tendência sem continuidade viram bandeiras.

### 1.2 Rompimento forte (alta; espelhar para baixa) (p28–29)
- Barra de rompimento com **corpo grande e sombras pequenas/nulas**; quanto maior, mais provável.
- **Volume da barra 10–20x a média recente** -> mais chance de continuação e measured move.
- Spike vai longe, dura várias barras e rompe vários níveis (EMA, topos, LTs) por muitos tiques.
- Durante a formação, a barra fica perto da máxima; pullbacks intrabarra < 1/4 do tamanho.
- **2–3 barras seguintes também com corpos de alta >= tamanho médio dos corpos recentes**; barra de continuidade (a seguinte) grande = melhor.
- Spike de 5–10 barras sem pullback de mais de ~1 barra.
- Mínimas no fechamento anterior ou 1 tique abaixo; aberturas acima do fechamento anterior; fechamentos na máxima ou 1 tique abaixo.
- **Micro gap**: L[i+1] >= H[i-1] em volta da barra de rompimento i.
- Contexto: continuação após pullback, ou fundo mais alto / fundo mais baixo testado após forte quebra da LTB.
- TR com pressão compradora crescente (barras de alta maiores e mais numerosas que as de baixa).
- Primeiro pullback só após >= 3 barras de rompimento, dura 1–2 barras, e não vem após barra de reversão de baixa forte.
- **Primeiro pullback não atinge o preço de rompimento** (ponto de rompimento/entrada).
- Barra de rompimento cujo **fechamento supera os fechamentos/máximas de 5 a 20+ barras**; superar por fechamento > superar por máxima.

### 1.3 Barra de sinal de reversão (p29)
- Mínimo: corpo a favor (close > open) **ou** fechamento acima do ponto médio.
- Melhor barra de reversão de alta: abre abaixo do fechamento anterior e fecha acima da abertura **e** do fechamento anterior; **sombra inferior ~1/3 a 1/2 do tamanho da barra**; sombra superior pequena/nula; pouca sobreposição com barras anteriores; a barra seguinte (entrada) não é doji inside, e sim barra de tendência forte; fechamento acima de fechamentos e máximas de mais de uma barra.

### 1.4 Reversão forte (alta; espelhar) (p29–30)
- Barra de reversão forte (corpo grande, sombras pequenas) + 2–3 barras seguintes de alta com corpo >= médio.
- Spike de 5–10 barras sem pullback > 1 barra, revertendo muitas barras/topos/bandeiras de baixa anteriores.
- Contexto: fundo mais alto ou fundo mais baixo testando o fundo após **quebra forte da LTB** (rompimento prévio).
- Primeiro pullback após >= 3 barras, 1–2 barras, não atinge ponto de rompimento.
- **Segundo sinal** (2ª tentativa de reversão em poucas barras).
- Reversão começou com overshoot/quebra da **linha de canal** da tendência antiga (clímax).
- Reverte de topo/fundo significativo (ex.: rompe abaixo de fundo forte e reverte = sweep de liquidez).
- Já houve quebras anteriores da LTB (não é o 1º sinal de força).
- Pullback que testa a mínima tem pouco momentum (muitas barras sobrepostas, muitas de alta) e falha na EMA ou LTB antiga.

## 2. Parte I — Rompimentos: transição para nova tendência (p31–p38)

### 2.1 Princípios
- "O mercado está sempre tentando romper e depois tenta fazer cada rompimento falhar." Toda decisão = **o rompimento vai ter sucesso ou falhar?** Sucesso -> operar a favor; falha -> operar contra (p31).
- **Toda barra de tendência é um rompimento** (e um spike, um clímax e um gap). Fundo em V = rompimento + falso rompimento.
- Definição: **rompimento = movimento além de um ponto anterior significativo** (LT, topo/fundo de swing, máxima/mínima da barra anterior). Esse nível = **ponto de rompimento**. Retorno a ele = **teste de rompimento**. Espaço entre o ponto de rompimento e o teste = **gap de rompimento** (breakout gap) (p31).
- Rompimento significativo quase sempre = **barra de tendência relativamente grande sem sombras significativas**.
- **Em TR o mercado está sempre em "modo de rompimento"**: negociação bilateral até um lado desistir -> spike unilateral (p31).
- Máxima da barra anterior = topo de swing no TF menor; topo de swing no TF atual = máxima de barra no TF maior (fractal).

### 2.2 Rompimento de mini-TR dentro de TR maior (p32) — regra de contexto CRÍTICA
- Se o rompimento ainda está **abaixo das máximas das barras da metade esquerda da tela** (ou abaixo das máximas de **20–30 barras atrás**), o mercado provavelmente ainda está no TR maior: pode ser só **teste de vácuo de compra do topo do TR**.
- Nesse caso: **não comprar fechamentos de barras fortes perto do topo do TR**; comprar só pullbacks; exigir reversão de tendência forte antes de comprar perto do topo do spike. Alta 1 em spike é ótimo **só em tendência**, não no topo de TR (p32).
- Se **não há barras à esquerda no nível do preço atual** (preço em "ar limpo"), comprar o fechamento com stop abaixo do fundo do spike é boa estratégia: rompimento forte tem **>= 60% de chance de atingir measured move ~ altura do spike** (p33). **Negociar como TR até estar claramente em tendência.**

### 2.3 Como entrar num rompimento forte (p32–33, p39–41)
- Formas: comprar no fechamento da barra que convenceu (ou da seguinte, se também de alta); limit no fechamento da barra; limit em pullback de 1–4 tiques; limit na máxima da barra pré-rompimento (teste do rompimento) com stop na mínima da barra de rompimento; buy stop 1 tique acima da barra de pausa; Alta 1 (primeiro pullback de rompimento); limit na EMA.
- **Stop**: 1 tique abaixo da barra mais baixa do spike (pior caso). Tamanho = risco normal / (stop/stop normal): se o stop é 3x o normal, operar 1/3 do tamanho (p40).
- **Matemática**: com spike forte, **P(measured move = altura do spike) >= 60%, às vezes 80%** (p39). Enquanto o spike cresce, o alvo (MM) sobe e o risco original fica igual.
- Exemplo T-Note (p40): compra no fechamento da barra 15, stop 1 tique abaixo do spike (7 tiques), spike de 6 tiques -> 60% de subir >= 6 tiques. Spike chega a 17 tiques -> alvo = +17 acima do topo do spike.
- **Trailing**: subir stop para abaixo de barra de tendência forte fechada; ou para o **micro gap de medida** (abaixo da mínima da barra cuja mínima ficou acima da máxima de 2 barras antes) (p40).
- Spike termina quando surge barra inside de baixa / barra não forte em vez de nova barra de tendência -> início da fase de canal.
- **Comprar o pullback geralmente > comprar o rompimento de topo de swing com buy stop** (maior recompensa, menor risco, maior probabilidade) (p40). Exceção: rompimento muito forte.
- Quando a tendência fica bilateral (pullbacks anteriores mais profundos e com > 5 barras), passar a comprar só pullbacks; scalp de venda vira possível (p41).
- "Quando todo mundo quer um pullback, ele não vem por muito tempo" (p40).
- Sinal de compra é melhor quando a **barra de sinal tem corpo de alta** (p41); entrar acima de barra de alta > acima de barra de baixa.

### 2.4 Fade de tentativas de reversão contra tendência (p33)
- Em tendência de alta, barra grande de baixa = tentativa de reversão que geralmente falha -> comprar no fechamento dela, ou acima da barra seguinte se ela for de alta. **Alvo 1: máxima da barra de baixa; alvo 2: measured move = tamanho da barra de baixa acima da sua máxima.** Stop ~ tamanho da barra de baixa (ou stop normal).
- Se surgem **2ª e 3ª barras fortes de baixa consecutivas** -> always-in virou; compradores saem.

### 2.5 O que acontece num novo topo (p33–36)
3 resultados possíveis acima de um topo anterior: **(1) mais compra** (mercado sobe o suficiente para um scalp antes do pullback -> compra nova dominou); **(2) tomada de lucro** (lateraliza, sinais de fraqueza -> compradores querem recomprar mais abaixo); **(3) venda** (reversão forte -> vendedores dominam; esperar **>= 2 pernas e >= 10 barras** de correção).
- Sinais de bilateralidade num teste do topo: vários pequenos pullbacks na perna, barras sobrepostas, corpos de baixa, sombras superiores grandes, barras de alta fracas (p33–34).
- **Correção "10 barras e 2 pernas"**: após clímax / tendência exagerada, compradores só voltam após correção de ~10 barras e 2 pernas (às vezes abaixo da EMA) (p37).
- **Clímax de compra consecutivos** (2º ou 3º sem correção) perto de alvo de MM ou linha de canal -> vácuo -> barra(s) enormes -> fortes vendem no fechamento, acima da máxima, no fechamento da barra seguinte (especialmente se de baixa) e abaixo da mínima. Esperar correção de 2 pernas ~10 barras abaixo da EMA (p35, p37).
- Quando os pullbacks numa tendência ficam **relativamente grandes**, comportam-se como TR, e novas máximas = tentativas de rompimento de TR que provavelmente falham (p35).
- Rompimento a novo fundo durante pullback em tendência de alta: (a) rompimento forte = venda nova domina; (b) movimento incerto = lucro dos vendidos + compra fraca -> TR; (c) reversão forte = compradores fortes abaixo do fundo -> é só pullback (= **sweep de liquidez** no método SMC) (p35–36).
- **Em TR, setups de modo de rompimento podem se inverter**: no meio do TR há mais compradores abaixo das barras e mais vendedores acima. Nos extremos do TR, 3 resultados: (1) reversão, (2) falso rompimento seguido de reversão, (3) rompimento bem-sucedido — **só 1 de 3 gera tendência** (p36).
- Rompimento contra a tendência (ex.: 1–2 barras grandes de alta num canal de baixa) geralmente vira **parte de uma bandeira** da tendência (p36).
- Tendência fraca + barra grande de rompimento + 3–4 barras menores sobrepostas = spike & canal -> mercado costuma testar o início do canal (área do gap da barra de spike), e o teste costuma ser seguido de retomada (p36).
- **Measured move de padrão**: após rompimento de topo duplo (ou qualquer padrão), alvo ~ altura do padrão projetada do ponto de rompimento. **Meio do gap** (entre ponto de rompimento e primeiro pullback) frequentemente = meio do movimento (measuring gap) (p36).

### 2.6 Força relativa rompimento vs. barra de reversão (p37)
- Se a barra/spike de rompimento é **mais forte que a barra de reversão** e não há contexto de clímax, a tentativa de reversão falha em poucas barras e vira pullback de continuação. Barra de entrada doji = fraca.
- Barra de rompimento que **fecha na mínima** (barra de reversão de baixa) = rompimento fraco -> maior chance de falha; essa barra é ao mesmo tempo sinal do falso rompimento (p37).

### 2.7 Volume (p38)
- Reversão/rompimento com continuidade prolongada costuma ter **5–10x o volume médio da barra**; 3x é insuficiente para confirmar reversão forte. Volume ajuda, mas o gráfico já diz o necessário.
- Reversão de 2 barras com sombra grande na 2ª e pullback = reversão não forte.
- Exemplo de gestão: stop de 2 pts com alvo de 2 pts (P >= 60%); ou stop abaixo da barra de sinal com alvo = risco.

### 2.8 Ordem "pior caso" em spike (p41)
- Ao primeiro pullback numa tendência que acabou de virar always-in forte: colocar **buy stop 1 tique acima da máxima do spike** (para não ficar de fora caso o pullback não se desenvolva). Se comprar a Alta 1, cancelar. Stop inicial abaixo do menor pullback mais recente.
- Rompimento de baixa bem-sucedido costuma ser seguido de **outra barra de baixa ou pelo menos doji**; se a barra seguinte tem corpo de alta (mesmo pequeno), especialmente na EMA em tendência de alta -> maior chance de falha (p41).
- **Lucro dos vendidos/comprados é a causa do primeiro pullback** numa tendência forte; após **3 clímax consecutivos** (ex. 3 quedas fortes) -> correção de ~10 barras até a EMA / mínima/ máxima de barras anteriores (p42).
- Swing de alta rompendo: o mercado costuma voltar para testar o **gap de rompimento**; spike + canal estreito de 4 barras -> teste do fundo do canal (p42).

## 3. Cap. 1 — Sinais de força num rompimento (p43–p45)

**Critério mínimo de sucesso de um rompimento**: quem entrou no rompimento consegue pelo menos o lucro de um scalp (p43).

### 3.1 Rompimento forte (adicional à lista 1.2)
- Ao romper topo significativo, o movimento acima dele vai longe o suficiente para quem comprou com stop 1 tique acima fazer um scalp.
- Vários dias recentes de tendência forte na mesma direção.
- Primeiro pullback não atinge o **stop de breakeven** (preço de entrada).

### 3.2 Rompimento FRACO / provável falha (p44–45) — lista do autor (alta; espelhar para baixa)
1. Barra de rompimento com **corpo pequeno/médio e sombra superior grande**.
2. Barra seguinte com corpo de baixa: barra de reversão de baixa ou inside de baixa, fechando perto/abaixo da mínima, **corpo ~ tamanho médio** dos corpos pré-rompimento (não um corpo de 1 tique).
3. Contexto improvável: rali testando topo de dia de TR com barras de baixa, sobreposição, sombras e pullbacks no caminho.
4. Mercado está em TR há vários dias.
5. Barra após a barra de rompimento é forte reversão de baixa ou inside de baixa.
6. **Sem micro gap**: L[barra após tendência] < H[barra antes da barra de tendência]. Primeiro pullback ocorre 2 barras após.
7. Pullback dura várias barras.
8. Retomada falha e forma **topo mais baixo com barra de sinal de baixa**.
9. Spike rompe resistência (topo, LTB, LTA/linha de canal) por **só 1 tique ou pouco** e reverte.
10. Rompe um nível mas recua antes de romper outros níveis logo acima.
11. Quem comprou com stop acima do topo anterior **não consegue lucro de scalp** antes do pullback.
12. Durante formação, a barra de rompimento retrai **> 2/3** da sua altura; ou retrai **>= 1/3 duas ou mais vezes**.
13. **Pullback cai abaixo do ponto de rompimento**; nenhum gap entre a mínima de qualquer barra e a máxima de 2 barras antes; pullback cai abaixo da mínima da 1ª barra do spike.
14. Pullback atinge o stop de breakeven.
15. Sensação de confusão.

### 3.3 Dinâmica rompimento -> TR (p45–47)
- **Rompimento = período de certeza; probabilidade de continuação ~60–70%.** É uma busca por novo nível de valor = busca por TR (incerteza, 50%). O **canal após o spike costuma definir aproximadamente o topo e o fundo do TR seguinte** (p45).
- Ao subir no canal, a probabilidade de movimento equidistante passa a favorecer **reversão no fim do canal**; o alvo é o **meio da faixa** (onde a probabilidade é neutra).
- **Magnetismo do meio (p45–46)**: em TR (barras sobrepostas, sombras grandes = equilíbrio), uma barra de alta que chega ao topo/acima do TR faz os vendedores (que vendiam no meio) ficarem mais agressivos e os compradores realizarem no topo -> **atração magnética para o meio do range**; mesmo após rompimento com MM igual à altura do TR, o ímã ainda puxa o preço de volta (base da confiabilidade das **reversões de bandeira final**).
- Programas fazem fade de barras de tendência em TR: vendem no fechamento da barra de alta, acima da máxima, no fechamento das 1–2 barras seguintes e abaixo das mínimas.
- **"Entrar em todo rompimento na direção do rompimento é estratégia perdedora"** (p45). Rompimento de bandeira de baixa após pullback de 2 pernas até a EMA numa tendência forte = trade sensato.
- Spike & canal: canal vira 1ª perna do TR; mercado tende a recuar ao **início do canal** (2ª perna) e então tentar subir -> **bandeira de alta em fundo duplo**; às vezes vira TR estreito/triângulo; menos frequentemente reversão (p46).
- **Até os rompimentos mais fortes falham ~30% das vezes** (p46).
- Barra excepcionalmente grande após tendência longa: ou rompimento para tendência mais íngreme, ou **clímax**. Se o pullback seguinte (poucas barras) não retrai muito da barra -> comprar Alta 1. Quanto mais profundo o pullback (além do ponto de rompimento), maior chance de falha/clímax. Pullback profundo até pouco abaixo do topo de swing -> compradores esperam ~10 barras / Alta 2 (p47).
- **Alvo do rompimento de um pullback (pequeno TR) = MM ~ altura do TR** (p47).
- Falhas mais fáceis de detectar: reversão rápida sem tentativa de continuação, especialmente com **overshoot de linha de canal + barra de sinal forte** (p47).
- Regra geral (p47): **"Dê fade no rompimento se ele falhar; entre na direção do rompimento se a tentativa de reversão falhar (vira pullback de rompimento). Entre no rompimento em si só se for muito forte."** Geralmente melhor comprar pullback ou esperar falso rompimento.
- Teste "se eu estivesse flat, entraria agora com esse stop e tamanho?" — se não, sair do swing (p47).
- Vendedores vendem com limit no topo anterior; se o preço continua, aumentam e saem no teste do rompimento: **"a maioria dos pullbacks volta ao topo de swing anterior"** (p47).
- **Bandeira que rompe na direção inesperada** (bandeira de baixa rompendo para cima) costuma criar measuring gap e levar a MM; vendidos presos não voltam até 2 pernas para cima (p47–48).
- Última hora em dia de tendência: barras grandes por liquidação forçada (risk managers) — mergulhos geralmente sem continuidade (p48).

### 3.4 Exemplo Fig. 2.1 (EURUSD diário, p48–50)
- Spike de 4 barras de baixa (corpos grandes, sombras pequenas, pouca sobreposição) -> canal -> **MM da abertura da 1ª barra ao fechamento da última barra do spike**; mínima ficou logo abaixo da projeção e o canal acabou. Depois, o mercado costuma testar o **primeiro sinal de compra razoável após o spike** e depois o **início do canal**.
- Pullback que reverte sem tocar a resistência (ponto de rompimento/EMA) = vendedores urgentes. **Gap entre ponto de rompimento e pullback = measuring gap ~ ponto médio do movimento.**
- Após spike muito forte, **always-in permanece; procurar só vendas pelo resto do dia**; scalps contra só se capaz de reverter imediatamente.
- **Canais costumam ter 3 empurrões antes da correção** (p49). Após 2º–3º clímax em pouco tempo -> correção de >= 2 pernas.
- Bandeira de baixa horizontal após tendência longa frequentemente vira **bandeira final** -> >= 2 pernas laterais/para cima (p50).

### 3.5 Mais exemplos (Fig. 2.2–2.3, p50–51)
- Bandeira de baixa em cunha que falha e rompe para cima -> measuring gap (entre ponto de rompimento e teste) -> MM quase perfeito.
- Baixa 1 após 3 corpos de alta fortes e clímax de venda -> provável falha (compradores agressivos compram com limit na/abaixo da mínima da barra de sinal).
- **Barra cujo fechamento fica abaixo das mínimas/fechamentos das últimas 12–13 barras** = reversão forte: todos que compraram nessas barras estão no prejuízo e vendem em qualquer repique (p50).
- **Barra de rompimento pequena** também pode iniciar movimento longo; sinais de força na barra seguinte: corpo a favor + mínima que **não volta abaixo do ponto de rompimento** (p51).

## 4. Cap. 2 — Rompimento: entrada e continuidade (p52–56)
- Normalmente **1–3 rompimentos fortes com várias barras de continuidade por dia** no Emini 5 min (p54).
- Rompimento forte: limit no fechamento da barra anterior não é executado (mínima da barra seguinte não volta ao fechamento) -> compradores presos de fora -> urgência (p52, p53).
- Barra após rompimento de 1–2 barras que é **pequena, doji, inside, sombras grandes, ou barra de tendência oposta** -> rompimento pode falhar (volta ao TR, reversão, ou falha fracassada = pullback de 1–2 barras) (p52).
- "Setup fácil e claro geralmente dá só um scalp pequeno; movimentos longos são incertos e difíceis de pegar" (p52).
- Dia de tendência desde a abertura com spike de várias barras: **P(MM >= altura do spike) > 70%** (p53).
- **Measured move de spike** (padrão comum): **da abertura (ou mínima) da 1ª barra do spike ao fechamento (ou máxima) da última barra do spike, projetado a partir do fechamento/máxima do spike** (p53–54). Observar primeiro o alvo mais próximo; após excedido, considerar o próximo.
- Faixa de abertura costuma levar a rompimento com MM (altura da faixa de abertura) (p54).
- **Cunha fracassada costuma levar a MM** (altura da cunha) (p54).
- Por que barra forte de baixa é revertida rápido: compradores institucionais esperam o teste abaixo da mínima anterior (zona de compra) -> vácuo -> barra de baixa grande -> compram pesado (= **sweep de liquidez de fundo**) -> probabilidade direcional >= 60% a favor dos compradores (p54).
- **Venda acima da barra de sinal de compra ruim**: em canal com 3º empurrão, compra que provavelmente falha -> vender acima dela (onde novatos compram): arrisca 6 tiques para ganhar 8 com 60% (p55).
- OCO/H&S: a maioria dos padrões de "reversão" (OCO de topo) em tendência de alta são bandeiras de alta -> rompimento da neckline tende a falhar; comprar acima de **barra de alta forte** é mais confiável que acima de doji (p55).
- **Armadilha de padrão de vela** (p55–56): em canal de baixa estreito sem quebra de LT prévia, velas grandes com sombra inferior longa e corpo pequeno (martelo/doji lápide) **não são compras** — comprar acima delas é pagar caro; os stops desses compradores ficam abaixo da mínima delas -> **vender 1 tique abaixo da mínima** (combustível dos stops).
- **Arame farpado (barbwire)**: >= 3 barras sobrepostas com >= 1 doji. Nunca comprar na resistência/vender no suporte dentro; fade de barras pequenas nos extremos; rompimento por barra de tendência tende a falhar e voltar ao range; frequentemente forma **bandeira final** (p55–56).
- Setup de compra de fundo: **quebra de LT (pullback lateral de 2 pernas) -> falso rompimento para nova mínima de 1–2 barras -> buy stop 1 tique acima da máxima da barra anterior, movendo a ordem barra a barra** até executar. Se cair muito, esperar nova quebra de LT (p56).
- **Barra outside forte que inicia nova tendência reinicia a contagem de barras** (Alta/Baixa 1,2) (p56).
- Alvos de rali após fundo: **máximas das barras de sinal de compra que falharam** na queda (p56).

## 5. Cap. 3 — Rompimentos de extremos em tendência (p57–59)
- Em tendência forte, todo rompimento de extremo anterior é entrada válida, mas raramente a melhor; traders de PA entram antes (Alta 1/Alta 2).
- Em tendência muito forte, **as 2 primeiras entradas costumam ser Alta 1**; agressivos compram com limit abaixo da mínima da barra anterior. Colocar buy stop pior caso 1 tique acima do topo do spike.
- **Teste de força num novo topo** (p57): se o rompimento anda o suficiente para um scalp -> encontrou mais compradores (tendência forte). Se reverte em 1–2 barras -> mais vendedores (característica de TR; mercado pode estar virando TR).
- **Entrando com stop num novo extremo: scalpear a maior parte**, a menos que a tendência seja especialmente forte (p57).
- Vendedores em TR/tendência fraca: vendem com limit no topo anterior, adicionam mais alto, saem tudo no teste do topo anterior (1ª entrada no 0 a 0, 2ª com lucro) — por isso o pullback costuma terminar exatamente nesse preço (p57–59).
- "Compra cega de rompimentos é burrice": não comprar rompimento que é **3º empurrão** (após barra forte que reinicia contagem) nem **teste de topo mais alto após quebra da LT** (p58).
- Reversões de bandeira final podem vir de fundo mais alto (não precisa novo extremo) (p59).
- Dia de tendência forte desde a abertura -> alta chance de continuação no dia seguinte (fechar acima da abertura / novo topo nominal) (p59).
- Barra de pausa logo abaixo de resistência: comprar 1 tique acima dela (p59).
- Sinais de força: **nenhum fechamento abaixo da EMA** e >= 20 barras acima da EMA (p59). Scalp contra-tendência só se for capaz de voltar a comprar imediatamente.

## 6. Cap. 4 — Falhas de rompimento, pullbacks de rompimento e testes (p60–62)
- Sequência universal: **rompimento -> falso rompimento -> (reversão) ou (pullback de rompimento -> retomada)**. Todo pullback inicialmente converte o rompimento em falha; se a reversão dura só 1–2 barras e o rompimento retoma, virou **pullback de rompimento** (todos os falsos rompimentos que não revertem = setups a favor do rompimento) (p60).
- Se a tendência retoma, a barra de rompimento vira **measuring gap**; se reverte, vira **gap de exaustão** e a barra contrária vira gap de rompimento (p60).
- Teste pode ocorrer na barra seguinte ou **20+ barras depois** (p60, p61).
- Decisão: rompimento e reversão igualmente fortes -> olhar a **barra após a barra de sinal de reversão**: forte barra de baixa -> reversão provável; forte barra de reversão de alta -> falso rompimento falha, comprar 1 tique acima dela (p60).
- "Decisão mais importante após cada barra: haverá mais compradores ou vendedores acima e abaixo da barra anterior?" (p60–61).

### 6.1 Onde o pullback após rompimento de alta costuma ir (alvos de pullback / níveis de teste) (p61)
1. **Ponto de rompimento** (preço onde começou).
2. Topo do spike num spike & canal (quando rompe o canal para baixo testa o topo do spike e depois o **início do canal**).
3. Topo do spike num rompimento de bandeira final (testa o swing anterior à bandeira).
4. Topo de swing mais recente numa escada (pullbacks caem um pouco abaixo do topo anterior); topo do TR inferior num dia de TR em tendência (se não reverter, pode ir ao fundo dele).
5. Após 3º empurrão de cunha: teste do topo do 2º empurrão; depois do fundo da cunha (fundo do 1º pullback).
6. **Máxima da barra de sinal** (barra imediatamente antes da barra de rompimento).
7. **Mínima da barra de entrada** (se rompida, geralmente por barra de tendência forte e move o suficiente para scalp).
8. Fundo de swing no início da perna (pode formar bandeira de alta em fundo duplo).
9. Qualquer suporte: EMA, fundo anterior, LT, linha de canal.

### 6.2 Teste do rompimento (p61–62)
- Rompimentos mais fortes **não voltam ao ponto de rompimento**; mas alguns pullbacks vão muito além e a tendência continua (escada).
- **Pullback que volta a poucos tiques do preço de entrada = teste de rompimento**; a barra de teste é barra de sinal: **buy stop 1 tique acima** — "configuração de pullback de rompimento particularmente confiável" (p61).
- Se os vendedores vencerem no teste: compradores falharam 2x na área -> **>= 2 pernas para baixo** (p61).
- Falhas consecutivas = segundas entradas -> excelente chance. Pullback de rompimento = "xícara e alça" — uma das configurações pró-tendência mais confiáveis (p62).
- **Pullback de rompimento sem rompimento real**: preço chega muito perto do extremo, não excede, e recua 1–4 barras -> negociar como se tivesse rompido (p62).
- Dia com tendência/primeira perna forte -> rompimento a favor no fim do dia mais provável; dia sem tendência com rompimentos de 1–2 barras para os dois lados -> falha mais provável de virar reversão (p62).
- **Stop de breakeven "elástico"**: aceitar alguns tiques além da entrada conforme o ativo (alguns ativos furam o breakeven por X antes de seguir) (p62). *Para cripto: calibrar estatisticamente a "profundidade típica de teste" por ativo.*
- Grandes reversões de tendência = trades de pullback: quebra da LTB -> pullback (fundo mais baixo ou mais alto) = setup de compra; o pullback **pode exceder o extremo antigo** e a reversão continua válida (p62).
- A última bandeira de baixa (10–20+ barras) antes de clímax de venda pode funcionar como 1ª perna da nova alta; o canal dela projetado à direita contém a nova tendência (p62).

### 6.3 Exemplos Cap. 5 (p62–69)
- Bandeira de baixa em cunha: muitas vezes rompe para fundo mais baixo após o 1º empurrão, faz mais 2 empurrões, e então rompe para baixo (p62).
- **Rompimento de 1 barra de TR estreito tem a mesma chance de falhar e voltar ao range quanto de continuar** (p62). Rompimentos acentuados na abertura que duram poucas barras frequentemente falham e geram dia de tendência oposta.
- "Todos os clímax terminam com um TR" (que pode ser de 1 barra) (p63). **Correção lateral (em vez de para baixo) após clímax = compradores fortes** -> rompimento para cima do topo de 3 empurrões.
- **TR estreito tem atração magnética**: rompimentos tendem a ser puxados de volta (p64).
- TR das 2 primeiras horas ~ **metade do range diário médio** -> rompimento costuma ser seguido de TR do mesmo tamanho (**dia de TR em tendência**) (p64).
- Teste de rompimento a 2 centavos da barra de sinal em ação de $580 = "teste perfeito" -> compra confiável; **pullback do rompimento de uma bandeira = um dos setups mais confiáveis** (p64).
- Ativos que testam o rompimento no tique exato estopam stops 1 tique além da barra de sinal; **reentrar 1 tique além da barra de teste** é bom, ou arriscar alguns centavos a mais (p65).
- **2ª tentativa dos compradores na mesma área (fundo mais alto) bem-sucedida -> >= 2 pernas para cima**; **2 tentativas falhas de romper uma área (topo duplo) -> >= 2 pernas para baixo** (p65).
- Iniciantes olham só as barras recentes e ignoram o spike muito mais forte à esquerda (p66).
- Pullback após rompimento de topo de cunha pode ser **topo mais alto** (não precisa ser mais baixo) (p66).
- **Dia/padrão de "TR em tendência"**: ao reverter, testa a máxima do TR inferior; se não reverter de volta, vai ao fundo do TR inferior (p66).
- Pressão vendedora é **cumulativa**: 3º spike de baixa forte dentro do rali = vendedores ficando mais fortes (p67).
- Baixa 2 na EMA + barra de sinal de baixa = combinação confiável (p67).
- **Rompimento abaixo de fundo duplo que tenta reverter e falha = cunha falhada** (fundo duplo = 2 empurrões, rompimento = 3º) -> frequentemente MM para baixo (p67).
- **Bandeira final**: bandeira em tendência com falso rompimento seguido de reversão. Bandeira de alta final pode reverter após topo mais alto **ou** topo mais baixo; de baixa, após fundo mais baixo **ou** fundo mais alto (p67). Bandeira final pode ser a 1ª perna da nova tendência; a inclinação da bandeira final costuma prever a inclinação da nova tendência (p68–69).

## 7. Cap. 6 — Gaps (p70–75+)
- Gap tradicional: L[hoje] > H[ontem]. Classificação: **gap de rompimento** (início), **gap de medida** (meio), **gap de exaustão** (fim); só se classifica depois (p70).
- **Measuring gap**: MM = (meio do gap − início da tendência) projetado a partir do meio do gap (p70).
- **Gap de exaustão**: após dezenas de barras numa resistência, novo gap que é fechado (preço volta abaixo da máxima da barra antes do gap) -> clímax; compradores esperam **10 barras e 2 pernas** (p70).
- Barra de alta final grande (ou 2) perto de resistência = clímax potencial; se barra forte de baixa vem em poucas barras -> exaustão confirmada + gap de rompimento de baixa (= reversão de 2 barras). Barras entre as duas = **topo de ilha**; teste da ilha que falha -> mais queda (p70–71).
- Após a reversão: Alta 1 fraca (doji pequena ou barra de baixa) -> mais vendem acima da máxima do que compram; **vendedores colocam sell stops logo abaixo da barra de sinal de Alta 2** (stops dos compradores) -> rompimento de baixa; se forte, >= 2 pernas e **MM = altura do TR** (topo até a barra da Alta 2); barra de rompimento vira measuring gap. Se compradores fazem Alta 3 (cunha), o gap fecha e vira exaustão (p71).
- "Todos os gaps serão fechados" -> mais preciso: **"todos os preços anteriores são testados"**; gaps são ímãs; **quanto mais perto do ímã, mais forte a atração** (base dos vácuos de compra/venda) (p71).
- Open[i] > Close[i-1] em 2–3 barras de alta consecutivas = compradores fortes (p71).
- **Toda barra de tendência = gap** no intraday. Gap de rompimento = entre H da barra antes da barra de tendência e L da barra depois. Mercado pode furar 1–2 tiques abaixo da H da barra anterior e o rompimento segue válido; **mais que alguns tiques -> perde confiança** (p71–72).
- **Gap da EMA**: primeira barra com mínima acima da EMA num rali após tendência de baixa forte = **1ª gap bar da EMA**: sell stop 1 tique abaixo da mínima, movendo para a barra seguinte até executar; espera teste da mínima da tendência. Em TR, gap bars configuram scalps até a EMA (p72).
- **Gap de rompimento cedo no dia**: não usar para alvo se o range resultante for muito menor que o range médio diário (tendência provavelmente vai mais longe). **Usar MM do gap quando a distância início da perna -> gap ~ 1/3 a 1/2 do range médio diário** (p72).
- **Gap negativo**: pullback cai um pouco abaixo do ponto de rompimento -> sinal de falta de força; MM pelo meio ainda útil mas menos confiável. Escadas têm gaps negativos (p72).
- **Micro gap de medida** (3 barras): L[3] >= H[1] numa sequência de 3 barras de alta -> H[1] = ponto de rompimento, L[3] = teste; frequentemente testados mas não fechados = compradores fortes (p73). Nas primeiras barras de tendência, **não usar micro gaps como alvo** (mercado vai muito além).
- **Barra excepcionalmente grande após tendência longa** (especialmente acima da linha de canal) = geralmente clímax de compra -> correção lateral/baixa de **~10+ barras** (raramente início de tendência mais íngreme) (p73).
- Confluência: MM de vários pontos de rompimento + linha de canal / LTB de TF maior / MM pela altura do TR -> zona de realização e vendas (p73).
- **Spike & canal de baixa: correção costuma voltar ao topo do canal (início do canal)** e tentar formar topo duplo (p73).
- **Bandeira final**: bandeira lateral que rompe 1–2 barras e tem barra de reversão forte -> correção de >= 2 pernas testando o fundo da bandeira; frequentemente MM (p73).
- Gap de abertura que falha = tipo de gap de exaustão (reversão de abertura) (p73).
- Classificar gaps não importa; **gap de rompimento = sinal de força, não ferramenta de alvo** no início de tendência (p74).

- Exemplos Fig. 6.3–6.5 (p75–78): **faixa de abertura ~ metade do range diário médio -> esperar duplicação da faixa** (rompimento = provável measuring gap). Enquanto o pullback não cai mais de ~1 tique abaixo do ponto de rompimento, o measuring gap é válido; abaixo da mínima da bandeira -> virou TR.
- **Barras com os maiores corpos do dia após tendência prolongada tendem a reverter** (exaustão) (p78).
- 1ª gap bar acima da EMA (após >2h abaixo) + quebra da LTB -> frequentemente teste de fundo mais baixo/mais alto e subida em 2 pernas (p77).
- Gap entre barra e EMA após clímax de venda -> costuma ser fechado por movimento de 2 pernas (Baixa 2) (p77).
- "Como nunca se sabe qual MM vai funcionar, desenhe todos e procure reversão em qualquer um" — reversão em MM + overshoot de linha de canal = setup melhor (p77).
- Teste de rompimento que não fecha o gap (não volta aos pontos de rompimento) = força do lado do rompimento (p77).
- Micro gap / teste exato: trader agressivo pode comprar com limit 1 tique acima da máxima da barra anterior arriscando ~3 tiques: **~40% de acerto, mas recompensa muitas vezes > risco** (p78).
- **Gap open vs. close anterior** em >= 2 barras consecutivas a favor com corpos = força (p78).
- **MM de spike geralmente começa na abertura da 1ª barra de tendência do spike**; se excedido, usar a mínima do spike (p78).

## 8. Parte II — Ímãs: suporte e resistência (p79–84)
- Ímã abaixo = suporte; acima = resistência. **Quando houver um ímã próximo, operar só na direção dele até ser atingido**; depois decidir: reverte, lateraliza ou ignora. Ímã dá o destino, não o caminho (p79).
- Em tendência, a maioria dos S/R falha; mas **todas as reversões ocorrem em S/R** -> reversão em S/R tem recompensa >> risco; mesmo com **~40% de acerto, a equação é positiva** (p79).
- Em TR, inércia = maioria das tentativas de rompimento falha; repetidas reversões no fundo (suporte) e topo (resistência) (p79).
- **Ímãs são, antes de tudo, áreas para realizar lucro**: setup para realizar < setup necessário para inverter (p79).
- **Overshoot**: o mercado geralmente ultrapassa o ímã um pouco; se o movimento até ele não for tendência forte, reverte por pelo menos 1–2 barras. **Se ultrapassa mais e reverte uma 2ª vez -> setup confiável contra, especialmente com barra de reversão forte** (p79).
- **Lista de ímãs (p79–80)**: linhas de tendência; linhas de canal; médias móveis de qualquer TF; alvos de MM; topos/fundos de swing; **mínimas de barras de entrada de compra e máximas de barras de entrada de venda**; **máximas de barras de sinal de compra e mínimas de barras de sinal de venda**; máxima/mínima/abertura/fechamento de ontem; OHLC de barras (especialmente barras de tendência grandes); pivots diários; Fibonacci; bandas.
- **Definição operacional de S/R**: preço com desequilíbrio direcional — **>= ~60% de chance de repique suficiente para um scalp**; 52–53% não conta (p80).
- Mercado tem memória: no retorno a um preço, tende a repetir o que fez. Ex.: rompeu o fundo do TR e volta ao fundo do TR -> vende de novo (compradores presos saem no breakeven + vendidos revendem) = **flip de S/R** (p80).
- **Efeito vácuo**: perto do ímã, o lado contrário se afasta esperando o toque -> barra de tendência rápida até o ímã (não é força real); ao chegar, o lado contrário aparece agressivo. **Todo spike contra-tendência deve ser visto como pullback de vácuo** (p80).
- **Teste repetido de suporte (4–5 vezes) aumenta a chance de rompê-lo**; a certa altura o rompimento fica mais provável que a falha. Mercado lateral sobre EMA plana sem repique de scalp -> compradores desistem; se após cair abaixo da EMA não aparecem compradores em **10–20 barras**, segue caindo ou TR abaixo da EMA; **suporte rompido vira resistência e vice-versa** (p81). Idem para LT testada >= 4 vezes sem aceleração.
- Reversões em fundos: ausência de compradores perto de grande suporte -> vácuo de venda -> **clímax de venda abaixo do suporte** e reversão forte com volume muito alto (p81–82) (= sweep/spring).
- **Maioria dos grandes topos vem de TRs (topo duplo, OCO) seguidos de spike de baixa; maioria dos grandes fundos vem de clímax de venda** (mas ambos podem ocorrer) (p82–83).
- Em tendência forte o mercado passa por cima da maioria dos ímãs; iniciantes vendem cada resistência e perdem. **MMs frequentemente funcionam no tique** (computadores) (p82).
- **Todo canal ascendente deve ser tratado como bandeira de baixa** (eventual quebra da LT) e todo canal descendente como bandeira de alta (p84).

## 9. Cap. 8 — Measured moves baseados na 1ª perna (spike) (p85–90)
- MM = swing igual em tamanho a swing anterior na mesma direção. Justificativa matemática: comprar no topo de um spike com stop abaixo do spike só é estratégia lucrativa (com P ~60%) se o alvo (recompensa) >= risco = altura do spike -> **MM tem que ser atingido ~60% das vezes** (p85).
- **MM baseado em spike costuma levar a TR; MM baseado em TR costuma levar a spike** (p85).
- **Perna 1 = Perna 2** (AB=CD / ABC): após movimento forte + pullback, 2ª perna ~ tamanho da 1ª: alvo = C + (B − A). O meio da "área espessa" (pullback/TR, = HVN no Market Profile) leva ao mesmo alvo (p85–86). *Não fazer fade com limit só por MM/Fibo* (p86).
- Para estimar o fim da 2ª perna de um **pullback de 2 pernas**: medir a 1ª perna do pullback e subtrair do topo do pullback (perna1=perna2 da correção) (p86).
- **Spike & canal: altura do canal ~ altura do spike** (spike forte). Medir da **abertura da 1ª barra do spike ao fechamento da última barra do spike**, somar ao fechamento da última; alternativas: mínima da 1ª até máxima da última. Usar o **alvo menor primeiro** (p86). Spike termina na barra anterior à primeira barra de pausa (doji, sombra grande contrária, corpo contrário) (p86, p89).
- **Probabilidades (p86)**: TR = 50/50; spike forte = 60%, às vezes 70%; **no fundo do TR a probabilidade favorece alta, no topo favorece baixa**. **~80% das tentativas de reversão de tendência falham** -> esperar virarem pullbacks e entrar a favor. **~80% das tentativas de sair de um TR falham** -> faz mais sentido matemático **fade dos topos e fundos do TR** do que comprar barras de alta grandes no topo / vender barras de baixa grandes no fundo.
- Exemplo numérico (p86–87): spike de 3 barras (14, 10, 8 tiques; aberturas >= fechamento anterior, sombras <= 2 tiques) + doji = fim do spike. Spike = 8 pts (abertura 1ª barra -> fechamento 3ª). Comprou com spike de 3 pts arriscando 3 -> ao fim, P(+8 acima do topo antes de −8) > 60%.
- **Ciclo de probabilidade**: quando o canal chega a ~**metade da distância ao alvo do MM, probabilidade cai para 50–55%**; no alvo do MM o mercado está no topo do TR incipiente -> probabilidade favorece queda -> realizar; compradores só voltam agressivos no **fundo do canal (fundo duplo provável)** (p87).
- Entrar em spike com **~1/4 do tamanho normal** para manter risco em dólar (p87).
- MM = tentativa do mercado de restaurar 50/50; o alvo é um overshoot (p87).
- Variante (Fig. 7.2): perna 1 pode terminar não no extremo absoluto (correção "flat" pode ir abaixo do início); considerar múltiplas definições de perna 1 (p88).
- Rompimento acima de topo duplo que falha = **topo em cunha** (3 empurrões: 2 topos + falso rompimento) (p88).
- **Dia com range médio e abertura no meio da faixa -> mercado tende a fechar perto da abertura (doji diário)**; TR estreito tende a romper para testar a abertura (p88).
- **MM pelo meio do TR**: ajustar a linha do meio do TR em formação; ao romper, projetar a distância (linha A -> meio) a partir do meio. Viés de rompimento a favor da tendência anterior + barras de tendência no TR (pressão compradora) (p89).
- Spike de notícia -> MM a partir do fim do spike, mesmo tamanho (abertura 1ª -> fechamento última) (p89). Spike pode levar a MM para cima ou para baixo (se falha na EMA em dia de baixa) (p90).

## 10. Cap. 9 — MM baseados em gaps e TRs (p91–95)
- Gap intradiário = entre **ponto de rompimento** e **mínima da 1ª pausa/pullback**; se a barra seguinte também é grande, esperar a 1ª barra pequena/doji/contrária — sua mínima é o topo do gap. **Sem ponto claro: usar o meio da barra de rompimento** como meio do movimento (p91).
- **Área fina (thin area / LVN)** entre duas distribuições = preços unilaterais; meio da área fina e meio do TR ("área gorda") são pontos médios de acordo -> guia do meio da perna (p91). **(Ligação direta com Volume Profile: HVN = TR/valor, LVN = gap/área fina.)**
- Pullback dentro do gap reduz o gap; pullback abaixo do ponto de rompimento = gap negativo (menos confiável). **Com gap negativo, mais comumente o MM = (ponto de rompimento − fundo do TR inicial) somado ao ponto de rompimento** (= altura do TR) (p92–93).
- Regra: **operar só a favor até a área do MM; lá procurar contra-tendência apenas se já houve movimento contra forte o suficiente para quebrar a LT** (p91). "Estar num MM não é razão suficiente para entrar contra; precisa de força contra prévia" (p94).
- **Duas pernas geralmente completam um movimento**, seguido de movimento contra de >= 2 pernas que costuma testar até o **ponto de rompimento** (p91).
- Alvo no Emini "testado" só se chegar a **1 tique** dele (p92).
- Começar o MM pelo **início da perna atual** (alvo mais próximo) e só depois considerar pontos mais antigos (p94). Com bandeira de rompimento, segurar parte do trade até o MM (p94).

## 11. Cap. 10 — Reversões terminam em barras de sinal de reversões fracassadas anteriores (p96–97)
- **Preços de entrada / máximas das barras de sinal de compra que falharam numa tendência de baixa = ímãs/alvos** quando a reversão finalmente funciona; o mercado frequentemente sobe até a **mais alta delas** antes de um pullback significativo; costuma formar **topo duplo** com uma dessas barras (p96).
- Lógica probabilística: início de canal de baixa P(queda) >= 60%; ~50% na metade; abaixo disso favorece compradores (fundo do TR futuro) (p96).
- Mensal SPY (p97): mínimas das barras de sinal de venda fracassadas numa alta = alvos da correção.

## 12. Cap. 11 — Outros ímãs (p98–99) — lista completa
- **Operar a favor até o ímã ser testado (preferivelmente ultrapassado)**; não operar contra no ímã sem força contra prévia (quebra de LT) ou sem ser pullback de tendência do TF maior.
- LT; linha de canal; qualquer MM incl. perna1=perna2; **spike & canal: início do canal é testado em pouco tempo**; OHLC de ontem; topos/fundos de swing de barras/dias anteriores (formam bandeiras em fundo/topo duplo); pontos de rompimento; gaps de qualquer tipo, incl. gaps da EMA; **extremo da tendência após cada tipo de pullback**; TRs de dias anteriores (incl. TR estreito, barbwire): **extremos e meio são testados**; **meio do range num dia de TR** (especialmente com TR intradiário ali — área gorda); **bandeiras finais: após o rompimento o mercado volta à bandeira e geralmente sai pelo outro lado**; barra de entrada e stops de proteção da barra de sinal; preço de entrada (teste de rompimento); **extremo oposto de barra de tendência enorme** (mínima de barra de alta enorme); alvos comuns de scalp/swing (Emini: 5–6 tiques p/ scalp de 4; 3, 4, 10 pts swing); **movimento igual ao tamanho do stop necessário** (stop de 12 tiques -> espere 12 a favor); máximas/mínimas diárias, semanais, mensais; Fibonacci; **números redondos** (ação de 50 a 88 tende a testar 100, geralmente 105–110 antes de voltar) (p98).
- **Barra de tendência enorme com sombras pequenas**: mercado frequentemente vai até os stops além dela (extremo oposto) e então reverte na direção da barra (p99) (= mitigação de "order block"/barra de origem).

## 13. Parte III — Pullbacks: tendências virando TR (p100+)
- **Todo pullback é um pequeno TR no gráfico atual e todo TR é pullback no TF maior.** No gráfico atual: **a maioria das tentativas de romper um TR falha, mas a maioria das tentativas de sair de um pullback tem sucesso** (p100).
- Pullback é causado por realização de lucro dos compradores em resistência (e scalp de vendedores).
- Sinais de que o pullback começa (p100): alvo atingido (resistência ou N tiques acima de barra de sinal importante: 6, 10, 18 no Emini); corpo de alta menor que o anterior; sombra superior; barra seguinte pequena de baixa. Em spike forte -> Alta 1 e novo topo. Com maturidade -> pullbacks mais profundos/longos: Alta 2, triângulo, bandeira de cunha (Alta 3).
- Compradores saem com sinal de venda **mais fraco** do que o necessário para entrar vendido (p101).
- Tendência madura: compradores param de mover stops para baixo do último fundo (esperam correção de 2 pernas que fura o fundo); fundo mais baixo no TF atual pode ainda ser fundo mais alto no TF maior -> **Alta 2 grande** (p101).
- **Formação do TR (p101)**: compradores só compram pullbacks mais profundos; mercado vende em torno do topo anterior (acima, no, ou abaixo) e repica em torno do fundo antigo; falsos rompimentos para ambos os lados falham -> **incerteza = TR**. **80% das tentativas dos dois lados falham**. TR em tendência de alta = bandeira de alta no TF maior -> **probabilidade favorece rompimento a favor da tendência**. Após rompimento forte -> **MM ~ altura do TR** -> realização / TR / pullback.
- Bandeiras de baixa em **topo duplo** são comuns porque vendedores esperam o preço chegar ao topo recente para vender (p101).
- **Perna final de um pullback costuma ser um microcanal contra a tendência**; rompimento do microcanal (>= 4 barras) geralmente anda só 1–2 barras antes de um pullback; em tendência forte, entrar no rompimento do microcanal é razoável (p102).
- **Regra de decisão rompimento vs. reversão (p102)**: (a) rompimento muito mais forte + tendência forte -> reversão falha -> pullback de rompimento = 2ª chance; (b) rompimento fraco (barra pequena, sombras grandes) + barra de reversão forte + contexto de reversão (ex.: bandeira de alta logo abaixo do topo do TR) -> entrar na reversão; (c) iguais e sem tendência -> avaliar a **barra seguinte** (entrada): se vira barra de reversão de alta -> comprar acima; se barra forte de baixa fechando na mínima e abaixo da barra de rompimento -> vender.
- **Definição de pullback**: estrita = barra que passa a mínima da barra anterior por >= 1 tique (em alta). Ampla (mais útil) = qualquer pausa (inside, barra contrária, doji) (p102).
- Após spike & canal, o sell-off costuma **testar o início do canal** (onde vendedores começaram) — vendedores saem no breakeven ali; se o repique termina abaixo do topo -> topo mais baixo e 2ª perna para baixo (p102).
- Cunha de baixa no fim da tendência: correção tenta ir ao **topo da cunha** (início, onde os primeiros compradores entraram); mínima original da cunha vira suporte para comprar no pullback com stop logo abaixo (p102).
- **Mercado tende a testar a primeira área de negociação bilateral** de uma tendência (início do canal) -> alvo para trades contra-tendência quando surgirem sinais de reversão (p102).
- Pullbacks costumam ter **>= 2 pernas** (1 e 3 pernas, canais e triângulos também comuns). **Primeiro pullback de 2 pernas numa tendência forte**: vendedores dominam o rompimento acima da 1ª perna (fade) (p102).
- **Qualquer movimento de 2 pernas deve ser tratado como pullback** (mesmo a favor da tendência — ex.: teste de 2 pernas do extremo após quebra da LT pode fazer topo mais baixo ou mais alto e ainda ser parte da reversão) (p102–103).
- **Definição de 2 pernas (ABC)**: perna contra (A), perna menor a favor (B), 2ª perna contra (C). Barra de baixa numa sequência de barras de alta pode ser a perna A mesmo sem fazer mínima abaixo; barra seguinte com fechamento de alta mas máxima abaixo = B; próxima barra de baixa ou com mínima abaixo = C. **Quanto mais inferido, menos confiável** (p103).
- **Após clímax / padrão de reversão significativo, não comprar pullbacks da tendência antiga** (por ~10+ barras ou o resto do dia); após topo em cunha ou topo mais baixo pós-quebra de LTA -> procurar vendas (p103). Tempo/pontos do novo movimento ~ proporcionais à clareza da reversão.
- **Todos os pullbacks começam com algum padrão de reversão** — não forte o suficiente para virar always-in; procurar o fim do pullback e entrar a favor (p103). Rebatedor com 30% de acerto é superstar.
- **Barras de pausa** (1–2 barras): comprar acima de pausa só nos **estágios iniciais de tendência forte (Alta 1 após 3 barras de alta fechando perto da máxima)**; barra de pausa após rompimento de **barra única** tem a mesma probabilidade de ser entrada contrária. Cada pullback geralmente fica mais profundo, não mais raso (após Alta 2, desconfiar de Alta 1 rasa) (p103).
- **Pullback grande o bastante para ser contra-tendência forte -> esperar 2º sinal** (ex.: canal de baixa longo numa alta forte: comprar o pullback do rompimento do canal, não a 1ª reversão) (p103–104).
- **Todo pullback termina num suporte (geralmente cluster de suportes)**; efeito vácuo: barra grande de baixa até o suporte e depois compra agressiva; a venda subsequente não se desenvolve (p104).
- Baixa 2 na EMA acionada seguida de barra de alta: geralmente falha -> venda de pullback de rompimento (agressivos vendem no fechamento da barra de alta e acima da máxima; conservadores com sell stop abaixo da mínima) (p104).
- Teste do extremo após pullback **não precisa fazer novo extremo** (topo duplo ou topo mais baixo valem) (p104).
- **Confirmação de reversão = continuidade**: após 1–2 barras grandes de baixa abaixo da EMA numa alta, observar a **próxima barra**: barra de tendência de baixa grande -> reversão confirmada; fechamento de alta -> tentativa falhou, oportunidade de compra (p104).
- **80% das tentativas de reversão falham e viram bandeiras** (p104).
- Em pullback numa tendência, assumir **P ~60%** para movimento equidistante; alvo >= risco; alvo no teste do extremo pode ser 4x o risco (ex.: GS stop 0,50, alvo 2,00) (p104–105).
- Após reversão, o 1º pullback da nova tendência pode fazer **fundo mais alto, fundo duplo ou até fundo mais baixo** e a reversão continua válida (o spike que quebrou a LTB é o verdadeiro início) (p105).
- Canal estreito de recuperação (~8 barras até a EMA) numa baixa: 1º rompimento de baixa provavelmente falha; esperar pullback que costuma fazer **topo mais alto (ABC)** e vender abaixo da barra anterior (Baixa 2 na EMA) (p105).
- **Topo mais alto fraco (cunha) após quebra forte da LTA** = muitas vezes início da tendência de baixa (pullback do spike de baixa) (p105).
- Pullback >= 75% -> tratar como nova tendência (p105).
- Tendência forte: muitas vezes **melhor entrar a mercado do que esperar pullback** (ex.: AAPL 7 barras de alta: ~70% de subir 2–3 antes de recuar 1) (p105–106).
- **Baixa 2 na EMA com barra de sinal de baixa numa tendência de baixa (>= 20 barras sem tocar a EMA) -> P >= 60%**; sell stop 1 tique abaixo da barra de sinal; risco = barra de sinal + 2 tiques; alvo = teste do fundo (p106).
- **Regra de reversão: sair na 2ª tentativa do mercado de retomar a tendência** (p107).
- **Primeiro pullback de 2 pernas numa tendência forte geralmente falha** -> limit de compra na mínima da 1ª perna / na EMA; Alta 2 com barra de sinal de alta na EMA = setup muito forte (p107).
- **Canal íngreme/estreito: não operar a 1ª quebra da LT contra ele; esperar o pullback do rompimento** (teste do extremo = topo mais baixo, topo duplo ou topo mais alto) e entrar no 2º sinal (ex.: 4 barras de alta consecutivas, 7 barras sem fechamento de alta, 7 barras com máximas e mínimas mais altas = "forte demais para operar a 1ª quebra") (p108–109).
- Barra outside que fecha com corpo de baixa abaixo da mínima anterior no teste do topo = venda de alta probabilidade (p108–109).
- Em tendências fracas/TR, rompimentos levam a pullbacks que viram novas bandeiras repetidamente (p109).
- Compradores gostam de ver **barras de baixa fortes em suporte** (provável fim do pullback). Experientes compram no fechamento delas; a maioria deve esperar barra de reversão e comprar acima, ou comprar o pullback do rompimento da bandeira (p109).

## 14. Cap. 12 — Sequência do primeiro pullback (p110–113)
Cada "primeiro" pullback de um tipo maior costuma ser seguido de teste do extremo (movimentos fortes têm >= 2 pernas). **Sequência de sinais de fraqueza numa tendência de alta (ordem geral; espelhar p/ baixa)** (p110–111):
1. Corpos de alta menores. 2. Sombras superiores surgem e crescem; mais sobreposição. 3. Barra doji / barra de corpo de baixa. 4. H[i] <= H[i-1]. 5. L[i] ~ L[i-1] ou L[i] < L[i-1]. 6. **Pullback de 1 perna (Alta 1)**; **pullback de 2 pernas (Alta 2) de ~5–10 barras**. 7. **Pullback de 3 pernas (cunha/triângulo) de ~5–15 barras**; quebra de LT menor. 8. **Barra toca a EMA (setup de gap de 20 barras)**. 9. Nova alta com barras de baixa e 1–2 pullbacks; **fechamento abaixo da EMA**. 10. **Barra com máxima abaixo da EMA (MA gap bar)**; quebra de LTA (principal). 11. Após a gap bar, 2ª perna para baixo antes de voltar acima da EMA. 12. Nova alta com >= 2 pullbacks de 2–3 barras e corpos de baixa mais proeminentes. 13. **Pullback de 2 pernas com > 10 barras cada, 2ª perna abaixo de fundo mais alto proeminente (fundo mais baixo)**. 14. **TR com barras de alta e de baixa igualmente proeminentes**. 15. Rompimento acima do TR que volta -> TR maior.
- Pullbacks ficam maiores com o tempo; contra-tendência começa a lucrar vendendo novos extremos; a favor começa a perder comprando rompimentos (p111).
- **Primeiro pullback de 1–2 barras num spike forte (4 barras, pouca sobreposição, sombras pequenas) quase sempre é seguido de novo extremo**: buy stop acima da barra de pullback (Alta 1) ou limit abaixo da mínima anterior (agressivo) (p111). 2º pullback 3–5 barras, quebra LT menor -> Alta 2.
- **Após 1–2 Alta 1 e uma Alta 2, desconfiar de nova Alta 1 sem pullback maior** (possível bandeira final/armadilha) (p111).
- Tendência forte pode ficar **2h+ longe da EMA**; ao tocá-la, costuma dar setup a favor -> novo extremo ou teste. **Se não sai da EMA em 10–20 barras**, precisa de desconto maior (p111).
- **1ª MA gap bar** costuma ser seguida de teste do extremo e provável novo extremo. Eventualmente, quebra da **LT principal** (geralmente o pullback da 1ª MA gap bar) -> teste do extremo (topo mais baixo ou mais alto) -> **>= movimento contra de 2 pernas ou reversão** (p111–112).
- Pullbacks maiores de 5 min frequentemente terminam em EMAs/pontos de TF maiores (15, 30, 60 min, diário) — 1º pullback à EMA de 15 min -> teste do extremo -> pullback à EMA de 30/60 min (p112).
- Após vários trades vencedores e barras laterais = TR: comprar só perto da mínima da faixa; cuidado ao comprar rompimento da máxima (p112).
- **Penetrações progressivamente maiores da EMA** em testes sucessivos (barras 4 < 5 < 8) = tendência enfraquecendo; cuidado ao entrar a favor (p113).
- Fundo duplo com 2º fundo furando 1 tique o 1º (stop run) e compradores defendendo = acumulação (p113).

## 15. Cap. 13 — Bandeira de baixa em topo duplo / bandeira de alta em fundo duplo (p114–122)
- **Tendência de alta geralmente termina com topo duplo; tendência de baixa com fundo duplo.** Pullback que termina em fundo duplo numa alta = **bandeira de alta em fundo duplo = Alta 2 particularmente confiável** (p114).
- Causa: compradores defendem os trailing stops abaixo do último fundo mais alto (e vendedores defendem topos mais baixos) -> **"equal lows" = defesa de stops/liquidez**.
- Mesmo pullback pode conter ambos (fundo duplo e topo duplo) -> modo de rompimento; **momentum anterior define a continuação provável** (forte alta antes -> comprar a reversão do fundo duplo no fundo da faixa) (p114). Alvo mínimo = **MM da altura da pequena faixa** (p116).
- **Defesa do fundo mais alto**: no pullback de 2 pernas, o repique da 2ª perna costuma parar no fundo mais alto da 1ª perna (agora resistência) — vendedores se defendem ali -> bandeira de baixa em topo duplo + canal de baixa (p114).
- **Mercado falha 2 vezes no mesmo nível -> tende a fazer o oposto** (p115). Fundo duplo acima do fundo da baixa = Baixa 2 fracassada = compra confiável.
- **Spike & canal**: correção testa o fundo do canal -> fundo duplo com o início do canal (pode ser dezenas de barras antes) = bandeira de alta em fundo duplo (p115). Após isso, repique mínimo ~**1/4 da altura do sell-off** (p117, p118).
- **Primeiro fundo mais alto numa nova alta geralmente é bandeira de alta em fundo duplo; primeiro topo mais baixo numa nova baixa = bandeira de baixa em topo duplo** (p115).
- **Fundo duplo que falha** (rompe para baixo): sell stop 1 tique abaixo -> MM = altura do fundo duplo. **Mas se o rompimento falha em 1–2 barras e passa a máxima da barra anterior -> 3 empurrões (cunha)**: os 2 fundos + o falso rompimento. "A característica crítica da cunha são os 3 empurrões, não a forma" (p115).
- **Gestão (p116)**: entrada em bandeira = buy stop 1 tique acima da máxima da barra anterior; **stop inicial 1 tique abaixo da barra de sinal**; após o fechamento da barra de entrada, **mover o stop para 1 tique abaixo da barra de entrada se ela for barra de tendência**; se for pequena, não apertar até surgir barra de tendência a favor.
- **Em tendência, a maioria dos padrões de reversão falha e a maioria dos padrões de continuação funciona**; continuar comprando perto do fundo de qualquer TR numa tendência de alta (p117).
- OCO (cabeça e ombros): vendedores agressivos vendem abaixo do ombro direito; se o preço passa acima do ombro direito -> OCO fracassado -> MM (mínima -> ombro) (p118).
- **Rompimentos de 1 tique abaixo do fundo do TR** (prendem compradores fora e vendedores dentro) + 2º rompimento de 1 tique -> **cunha fracassada de fundo** (3 empurrões) -> MM para baixo (altura da cunha ou do TR) (p119). **Com compradores e vendedores presos, o próximo rompimento costuma dar swing decente** (p119).
- **Fundo duplo + subida forte do 2º fundo (cada OHLC acima das barras anteriores) + pausa lateral após o rompimento (em vez de pullback) = configuração muito forte e comum** (p119).
- Exemplo Fig. 12.6 (p120–121): após spike forte, MMs a partir do fundo duplo (altura do fundo duplo projetada) e duplicação do spike; **2º falso rompimento do topo do canal = venda mais confiável**; alvo mínimo = abaixo do fundo do canal + MM da altura do canal. Canais costumam corrigir após **3º empurrão**, mas se o canal é muito íngreme, só vender após quebra forte + pullback. Sem fechamentos abaixo da EMA após o spike -> não usar stop apertado; **comprar o 1º fechamento abaixo da EMA e a 1ª MA gap bar**.
- **Canal de 5 min que é spike no TF maior: o pullback costuma testar só o fundo do canal do TF maior, não o do 5 min** (p121).
- **Barra grande de reversão dentro de TR não funciona como barra de reversão** ("nada para reverter") -> esperar pullback e 2ª entrada (p121).
- **Barbwire**: frequentemente tem Baixa 2 fracassada (scalp de compra abaixo da barra de sinal da Baixa 2); **a 1ª barra de tendência que sai do barbwire geralmente falha** (p122).
- Alta 2 não é setup em tendência de baixa; só em tendência de alta e em TR (p122).
- **3 clímax de venda consecutivos -> correção de >= 2 pernas e >= 10 barras** (p122).

## 16. Cap. 14 — Gaps de 20 barras (p123–125)
- **Definição**: >= 20 barras consecutivas sem tocar a EMA = tendência forte mas exagerada; volta à EMA em breve -> **setup de 20 gap bars**. Se não houve reversão clara antes, **o 1º toque da EMA é scalp de alta probabilidade para teste do extremo**. Melhor esperar entrada de PA (reversão a favor + stop entry) do que limit na EMA (p123).
- Após testes da EMA, haverá teste que atravessa a EMA e forma **MA gap bar**: **fade da 1ª gap bar** (em alta: buy stop 1 tique acima da máxima da barra cuja máxima está abaixo da EMA). Se falhar, comprar a **2ª entrada**; **não tentar a 3ª** (mercado provavelmente em canal contra). Segurar parte (swing) (p123).
- **Exceção**: se a 1ª MA gap bar vem **após reversão forte de tendência ou clímax/parabólico**, tende a falhar (tendência antiga acabou) (p123, p125).
- Vendedores ansiosos colocam limit 2–3 tiques antes da EMA (teste que não toca) = urgência (p124).
- Faixa de abertura < 1/3 do range médio com topo e fundo de swing definidos -> modo de rompimento; rompimento costuma virar dia de tendência (p124).
- Após clímax parabólico, compra de correção de **1 perna** até a EMA é arriscada; esperar 2ª perna (p125). Após 20–30 barras laterais, a 1ª MA gap bar não é mais compra confiável (p125).

## 17. Cap. 15 — Primeiras MA gap bars (p126–128)
- Após setup de 20 gap bars + teste do extremo, o próximo teste da EMA é mais profundo -> **MA gap bar** (barra inteira do outro lado da EMA).
- Em alta ou lateral, boa chance de fechar o gap até a EMA; **2ª tentativa** (barra passa a máxima anterior de novo) = **chances excelentes de máxima negociável** (p126).
- **1ª MA gap bar numa tendência forte -> teste do extremo**; esse pullback geralmente **quebra a LT**; após o teste do extremo -> correção de 2 pernas ou reversão maior. Se o teste do topo reverte para baixo -> correção prolongada >= 2 pernas, geralmente reversão (p126).
- Sem tendência forte, fade de MA gap bar = **scalp até a EMA**, só se houver espaço suficiente até a EMA para um lucro aceitável (p126–127).
- Duas tentativas de queda falhando (2ª MA gap bar de venda) -> tendência de alta (p127).

## 18. Cap. 16 — Horários-chave (p129–132) (Emini/PST — adaptar a cripto)
- Rompimentos/reversões em torno de relatórios (7:00, 7:30 PST), 11:00–11:30 e meio-dia.
- **Em dias de tendência forte: movimento contra-tendência de pânico ("stop run tardio")**, normalmente 11:00–11:30 PST, que rompe a LT principal e assusta — é oportunidade de entrada a favor; costuma levar a novo extremo e setup oposto no dia seguinte (p129–130).
- Dias de TR: perto de um extremo por horas -> movimento brusco que pega o outro extremo e falha (~11:30) — prende os dois lados; **a maioria dos dias de TR fecha perto do meio** (p129, p131).
- **Quando há compradores e vendedores presos, o próximo sinal costuma dar pelo menos um scalp** (p131).
- Canal muito íngreme: o 1º rompimento do canal costuma ser seguido de pullback de rompimento = compra de alta probabilidade (p131).
- Esperar a barra outside fechar para ver se os vendedores "são donos" (fechamento perto da mínima) antes de vender (p132).
- *Cripto 24/7: equivalentes = aberturas de sessão (Ásia/Londres/NY), divulgação de dados macro US (8:30/10:00 ET), fechamento diário UTC, funding.*

## 19. Cap. 17 — Contando pernas de tendência e TR (p133–135)
- **Tendências geralmente têm 2 pernas**; após reversão com 1ª perna forte, o teste do extremo antigo tende a falhar (fundo mais alto); vendedores só vendem de novo se a 2ª perna falhar perto do topo da 1ª (topo duplo de bandeira) (p133).
- **Todo movimento tende a ter 2 tentativas de reversão; cada perna tende a se subdividir em 2.** Se as 2 pernas estão num canal estreito (ex.: cunha), podem ser só subdivisões da 1ª perna; se o nº de barras parece pequeno vs. o padrão corrigido (topo de cunha de 2h e correção de 3+3 barras) -> é só a 1ª perna (p133).
- **Spike & canal = 2 pernas por definição** (p134).
- **Teste de rompimento perfeito (mínima = máxima da barra de sinal original, estopando breakevens por 1 tique) -> alta chance de MM** (p134).
- Bandeira de baixa em topo duplo (2º topo 1 centavo abaixo) -> queda ~ **2x a altura do TR** (p134). Baixa 2 na EMA em tendência de baixa = entrada confiável.
- Topo em cunha (3 empurrões) -> geralmente correção lateral de 2 pernas; se as 2 pernas da correção estão num canal e são pequenas vs. a cunha, são só a 1ª perna (p135).

## 20. Cap. 18 — Contagem de barras: Alta/Baixa 1, 2, 3, 4 e ABC (p136–143) — REGRAS CENTRAIS
### 20.1 Definições (codificáveis)
- Num movimento lateral/descendente dentro de **tendência de alta ou TR**: **Alta 1 (H1)** = primeira barra com H[i] > H[i-1] (>= 1 tique) -> termina a 1ª perna. Se não vira topo de swing e o mercado continua lateral/baixo, a próxima barra com H[i] > H[i-1] = **Alta 2 (H2)** (fim da 2ª perna); depois H3, H4 (p136).
- **Requisito**: entre H1 e H2 deve haver pelo menos uma **pequena quebra de LT** (a favor da tendência) mostrando que traders de tendência estão ativos; sem isso, H1/H2 podem ser parte de um canal (1ª perna complexa) -> não comprar ainda (p136).
- Espelho: **Baixa 1 (L1)** = primeira barra com L[i] < L[i-1] numa correção lateral/ascendente em tendência de baixa ou TR; L2, L3, L4.
- Em swing de alta forte, a entrada H2 pode ser **acima** da H1 (p136). H2 = correção ABC (A = 1ª perna, B = movimento que gera a H1, C = perna final; rompimento de C = barra de entrada H2).
- **Barra outside forte que inicia nova tendência reinicia a contagem** (p56). Após um spike forte, reiniciar a contagem e esperar >= 2 pernas (p141).
- Variantes: barra de baixa (ou 2 fechamentos de baixa) já pode ser a perna A sem nova mínima; barra seguinte com fechamento de alta mas máxima abaixo -> fim da perna A se a próxima for barra de baixa; então a próxima barra que passa a máxima anterior = **variante de H2** (tecnicamente H1) — tratar como H2 (p138).
### 20.2 Contexto (onde vale)
- **H2 em tendência de alta**: geralmente na EMA ou acima; compra de continuação, pode ser perto da máxima do dia (p136). **H2 em tendência > H2 em TR** (p141).
- **H2 em TR**: comprar só se estiver **abaixo da EMA e perto do fundo do TR** (reversão). **H2 acima da EMA perto do topo do TR provavelmente falha -> vender com limit na/acima da máxima da barra de sinal da H2** (vácuo de compra acima da barra) (p136). Espelho: L2 em TR só vender **acima da EMA perto do topo**; L2 perto do fundo do TR -> comprar na/abaixo da barra de sinal da L2 (falha esperada -> fundo duplo) (p137).
- **Não vender L1/L2 em tendência de alta clara; não comprar H1/H2 em tendência de baixa clara** (são setups só de tendência própria e TR). Em tendência de baixa, **vender acima da máxima da barra anterior** (H1 em baixa tem ~40% de sucesso => ~60% para quem vende): ex. Emini: 60% de cair 2 pts antes de subir 5 tiques (p137).
- **Mudança de perspectiva**: L2 acima do topo anterior que não cai e o mercado continua subindo -> passar a procurar só H1/H2; adiar vendas até quebra de LTA + teste falho do topo (p137).
- **TR estreito: não operar contagem de barras** (H1/H2/L1/L2 aparecem em 10 barras; entrar em stop no topo/fundo do TR estreito = fazer o oposto das instituições). Exceção: TR estreito como **pequena bandeira em tendência muito forte** (ex.: spike de 4 barras sem clímax, 10 barras laterais -> vender com stop abaixo de barra de baixa). TR estreito no terço médio de dia de TR: nunca operar contagem (p137–138).
### 20.3 Evolução e falhas
- **H1 que falha -> H2; H2 falha (barra abaixo da barra de sinal em 1–2 barras) -> H3 (cunha/triângulo) ou H4** (p138, p140).
- **Pista pelo momentum após a H2 fracassada**: se o momentum não muda (mesma queda) -> **H3 = bandeira de alta em cunha, compra provável** (rompimento abaixo da H2 vira gap de exaustão); se há **1–2 barras de rompimento grandes** -> esperar **>= 2 pernas mais** -> esperar H4 (barra de rompimento vira measuring gap -> MM para baixo) (p140–141).
- Rompimento forte abaixo da barra de sinal da H2 ou da cunha (H3) -> geralmente >= mais 2 empurrões para baixo. Se todo o pullback está num canal relativamente estreito com forte momentum -> comprar H3 é arriscado; esperar quebra do canal de baixa + pullback (p138).
- **H4 complexo** = H2 no TF maior (cada perna subdividida). **Se a H4 falha (preço abaixo da barra de sinal da H4) -> provavelmente tendência de baixa**; reavaliar; procurar vender repiques (p138, p141).
- Espelho para L2/L3/L4: após L2 falha, momentum fraco -> vender L3 (bandeira de baixa em cunha); 2–3 barras grandes de alta -> esperar L4; se momentum após L3 muito forte (canal íngreme), não vender L4 (1º rompimento do canal) — esperar pullback (topo mais alto/mais baixo) = 2ª entrada (p138, p141).
- **Barra de sinal H4/L4 pequena (doji)**: entrada frequentemente vira outside e estopa; usar stop **maior que 1 tique além da barra (~3 tiques; máx. ~8 tiques no Emini com range de 10 pts)** ou **money stop ~2 pts** (p139, p141).
- H3/L3 = negociar como cunha (ou triângulo, se horizontal). Em tendência de baixa, um fundo de cunha é chamado de fundo de cunha, não H3 (p138–139).
- **Quase toda reversão para baixo vem de alguma forma de topo duplo** (vender acima da barra de sinal de H1/H2/H3 que se espera falhar = topo duplo = L2 abaixo da barra que fez o topo duplo); idem fundos (L1/L2 fracassados -> fundo duplo = H2) (p138).
### 20.4 H1/L1 — 3 critérios (p139–140)
- Comprar H1 só se: **(1) tendência de alta forte e clara, (2) fase de spike forte, (3) sem clímax de compra significativo**. As H1 mais confiáveis = falso rompimento de **micro LT** na fase de spike. Não comprar H1 após clímax ou reversão, nem **H1 no topo de TR** (spike dentro do TR pode ser teste de vácuo do topo -> armadilha).
- **H1 no topo de TR (especialmente com barra de sinal doji) = fade**: **vender com limit na/acima da máxima da barra de sinal da H1**, stop de 6 tiques, alvo de 6 tiques, P >= 60% (Emini) (p140). Espelho: comprar com limit na mínima da barra de sinal da L1 no fundo do TR.
- Se mercado anda lateral 5 barras com dojis -> perdeu urgência; esperar H2 (p139).
- Para não perder tendência forte: **buy stop acima do topo de swing anterior** (ou sell stop abaixo do fundo de swing) como ordem de pior caso (p139).
- Pullbacks são criados por instituições realizando parte; após H1, o rompimento geralmente rende só scalp, exceto nas tendências mais fortes (p139).
- **H1/L1 na direção do pullback** (ex.: micro LT de baixa de 4 barras na EMA numa alta): não vender o falso rompimento; esperar a falha e comprar o pullback do rompimento. Exceção: perna de baixa com >= 4 barras de baixa consecutivas e setup abaixo da EMA -> scalp de venda possível (p140).
- **Operando contra a tendência: scalpear a maior parte**, a menos que a reversão seja forte (p140).
- **H2 falhou** = preço volta abaixo do fundo do padrão antes de atingir o lucro de scalp (p140).
- **H2/L2 = uma das configurações a favor da tendência mais confiáveis**; lógica: vendedores aceitam 1 falha (H1), não 2 (H2); H2 se forma geralmente na/perto da EMA (p141).
- **Topo de 3 empurrões** com 1ª perna desproporcionalmente forte ~ L2 (as 2 pernas fracas = 1 perna) — numeração irrelevante, negociar como cunha (p141–142).
- **Se comprou cedo contra a tendência (ex.: em baixa forte), sair (e até reverter) quando disparar L2 ou L3 com barra de sinal forte** — "uma das configurações de venda mais confiáveis" (p142).
- Ex. Fig. 17.1 (p142–143): não comprar H2 quando a 2ª perna é a 4ª barra de baixa consecutiva após barra forte de baixa e muito menor que a 1ª (pode haver mais); H1 após **clímax de compra / bandeira final** não é compra (correção de ~10 barras e 2 pernas); **H2 acima da EMA em TR é arriscado**. Boa H1: 6 barras de alta consecutivas sem sobreposição de corpos. Boa L1: tendência de baixa forte + spike de baixa forte + sem clímax.
### 20.5 Exemplos de contagem (Fig. 17.1–17.12, p143–155)
- Quando a 2ª barra do dia passa a 1ª e o mercado cai, essa barra vira H1 de uma futura H2 (p143). H2 mais forte se a barra de sinal é **barra de reversão de alta com mínima abaixo da EMA**.
- **Compradores e vendedores presos (L2 fracassada que vira 3º empurrão = bandeira de baixa em cunha) aumentam a chance do sinal seguinte** (p143).
- **Em TR, H1/L1 após spike não são bons trades** (barra de sinal doji = bilateral); traders agressivos fazem fade com limit (p144). Em tendência clara (dia de tendência desde a abertura, 3 barras grandes de baixa, sombras pequenas): L1 = ótimo trade; H1 após spike de 6 barras de alta para a EMA após clímax = boa (p144–145).
- **H2 sem quebra de LT significativa entre H1 e H2 (pernas de 1–2 barras numa queda íngreme) -> não comprar**; "sempre quer uma demonstração de força antes do setup de compra"; senão assumir que ainda é a 1ª perna (p145).
- **H3 após overshoot de linha de canal + reversão = reversão de cunha** (3 pernas + falso rompimento da linha de canal) (p145).
- **Correção adequada de um clímax (cunha)**: 2 pernas claras e **>= ~metade do nº de barras da cunha**; deve testar o início do canal (p145).
- Canais geralmente têm >= 3 pernas antes de rompimento e reversão (p145).
- **L2 abaixo da EMA funciona porque é onde os compradores prematuros saem** (2ª falha) (p146).
- H2 que é nova mínima do dia em dia calmo + barra de reversão de alta = alta probabilidade de scalp. Se a queda tiver ~6 barras de baixa sem H1, esperar pullback de rompimento (2ª entrada) (p146).
- **Falha de 5 tiques** (movimento de só 5 tiques após a entrada, deixando vendedores presos sem scalp) -> setup para o lado oposto (p146).
- Após L2 fracassada com forte momentum para cima -> H1 seguinte é confiável (p147).
- **>= 3 barras com muita sobreposição e >= 1 doji -> esperar** (equilíbrio, rompimento provavelmente falha) (p147). "Se você precisa estudar mais para decidir, o sinal não é claro — não opere" (p147).
- **H4 sozinha não basta**: precisa de força prévia (movimento que quebrou ao menos uma LT menor) (p147).
- Venda contra tendência de alta só após vendedores mostrarem força (quebra da LTA ou ~10 barras laterais contendo compradores) (p147).
- **Em tendência de baixa com bom momentum, vender H1, H2, H3, H4 com limit na/alguns tiques acima da máxima da barra anterior** (p148).
- **L2 fracassada geralmente termina em L4** (p148). Barra de sinal L4/H4 doji: **stop 2–3 tiques além da barra de sinal** (o mercado costuma furar 1 tique) (p148–149).
- Após L4 fracassada numa tendência de alta -> rali forte até ~**MM da altura do padrão L4** (p149). O início do canal (1ª tentativa de reversão) é ímã para pullbacks futuros; o movimento de 2 pernas após quebra da LTA costuma ir **abaixo das mínimas de todas as barras de reversão anteriores** (p149).
- **"L2 em tendência de alta não é venda"** sem quebra forte de LT prévia; vender na **2ª tentativa** de empurrar para baixo, não na 1ª. Em tendência muito forte, comprar com limit abaixo da mínima da barra anterior (esperando L1/L2 falhar) (p149–150).
- Segundo teste da EMA geralmente **mais perto ou mais profundo** que o 1º; L2 longe da EMA = teste ruim (falta o combustível dos vendedores que esperam o toque) (p150).
- Após clímax de venda com corpos crescentes na linha de canal e no início do canal -> mercado sobe **>= 25% da altura do TR em formação** (p151).
- **Sinal de venda logo abaixo da EMA com barra de sinal grande sobreposta a >= 2 barras = pequeno TR -> vender no suporte é perdedor** (p152).
- **Grande gap de abertura para baixo -> maior chance de dia de tendência de baixa** (p152).
- **3ª barra de um spike não é barra de sinal confiável para reversão** (esperar rompimento + pullback) (p152). **Na dúvida (contagem ambígua), ficar de fora e esperar 2º sinal** (p152).
- **Escada encolhida** (novo fundo só 2 tiques abaixo, anterior 6 tiques) = tendência perdendo força (p153).
- Barra outside: direção do corpo indica qual lado rompeu por último (p154).
- Em TR estreito, contagem incerta; não operar com base nela (p155).
- Faixa do dia < 1/3 do range médio com spike para cima e para baixo -> modo de rompimento (stops acima da máxima e abaixo da mínima) (p155).
- **TR estreito no fim de onda de tendência tende a reverter (atração magnética -> bandeira final)** (p155).
- **1ª MA gap bar em tendência de baixa nas últimas 1–2 h** (spike de alta que rompe topo de swing) = armadilha de compradores -> boa venda, especialmente sem quebra forte prévia da LTB e sem conseguir ficar acima da EMA (p155).
- Spike & canal = movimento de 2 pernas; canais de alta costumam ter mais 2 empurrões após o spike (3 no total) -> topo em cunha (p156).

## 21. Cap. 19 — Cunhas e outros pullbacks de 3 pernas (p157–163)
- Pullback contido entre LT e linha de canal convergentes: horizontal = **triângulo** (rompe para qualquer lado); inclinado contra a tendência = **cunha** (geralmente rompe a favor da tendência). Requisito: **3 empurrões contra-tendência** (forma pode ser irregular). Na cunha, a 2ª perna geralmente excede o swing anterior (p157).
- **Pullback de cunha (a favor da tendência): pode entrar no 1º sinal.** **Reversão de cunha (contra-tendência): esperar 2ª entrada** — avaliar o rompimento: forte -> vender o pullback do rompimento (topo mais alto ou mais baixo); fraco -> esperar falha e comprar (p157).
- **Bandeiras em cunha: geralmente 10–20 barras**, não precisam ser perfeitas. **Reversão de cunha precisa de ~>= 20 barras e linha de canal clara** para reverter tendência (p157).
- Cunhas em TR: características de ambas; entrar no 1º sinal se a cunha é forte e há bilateralidade clara; na dúvida, 2º sinal (p157).
- **Cunha inclinada para cima = tratar como bandeira de baixa** (rompe para baixo) mesmo sem tendência anterior; inclinada para baixo = bandeira de alta. **L3 = topo de cunha; H3 = fundo de cunha** (p157).
- Pullback de 3 pernas de baixo momentum no meio do dia em tendência forte (às vezes spike & canal, linhas paralelas) = setup confiável a favor; **a 3ª perna prende traders contra-tendência** (acham que é nova tendência) (p157–158).
- **Não comprar em gap acima da barra de sinal**: entrar só se a barra de entrada abrir abaixo da barra de sinal e passar pelo stop; senão esperar pullback de rompimento (p158).
- Cunha íngreme (canal estreito): melhor esperar a 2ª perna/2º sinal; 7ª barra consecutiva na direção = esperar mais (p159).
- **Não comprar a H2 se as 2 pernas tiverem momentum forte (1º spike forte -> permitir correção em cunha)**: esperar pullback do rompimento acima da barra de sinal da H2 (fundo mais alto ou mais baixo) (p161).
- **Spike & canal: alvo mínimo = início do canal** (p161).
- Linhas de cunha imprecisas são a regra; usar extremos ou corpos (p162). Recuperação após o 1º empurrão do triângulo frequentemente excede o swing anterior (p162).
- **Bandeira em cunha fracassada** (sem barra de sinal confiável, vira TR estreito, rompe contra) -> ~MM contra (p163).

## 22. Cap. 20 — Linhas duelantes (p164–166)
- Pullback contido por linha de canal que termina numa linha de S/R de TF maior (ex.: bandeira de alta em cunha cuja linha de canal descendente cruza a LTA ascendente) = **linhas duelantes** -> trade confiável a favor da tendência primária. **Forma mais confiável: pullback em canal com 3 empurrões/cunha e barra de sinal que fura a linha e reverte.** S/R pode ser horizontal (fundo anterior -> fundo duplo) ou a EMA (p164).
- **Todo pullback termina em algum S/R** (todos são "linhas duelantes", visíveis ou não) (p164–165).
- Desenhar linhas usando todos os pontos de swing, inclusive da tendência anterior; escolher a linha que contém a ação e observar a reação após a penetração (p165). Descida íngreme até a interseção -> esperar 2ª entrada (fundo mais baixo, buy stop 1 tique acima) (p165).

## 23. Cap. 21 — Padrões "de reversão": topos/fundos duplos e OCO (p167–169)
- Como todas as tentativas de reversão falham exceto a última, é **mais preciso tratar topos/fundos duplos e OCO como padrões de continuação** (TRs) que raramente revertem; operar contra-tendência só com outras evidências (p167).
- **OCO de topo em mercado de alta = triângulo ou bandeira de alta em cunha (3 empurrões para baixo: após ombro esq., cabeça, ombro dir.)**: rompimento da neckline geralmente falha -> rompimento para cima acima do ombro direito. Ombro direito = pullback de topo mais baixo após a cabeça quebrar a LTA. OCO numa baixa (TR em forma de OCO) com rompimento da neckline = continuação. Fundo OCO em baixa = bandeira de baixa; em alta = bandeira de alta (p167).
- **Entrada padrão de topo duplo (sell stop abaixo do fundo entre os topos) raramente funciona porque 80% dos rompimentos falham**; a maioria vende perto do 2º topo ou no topo mais baixo/L2 posterior (p168).
- Mercado encontra suporte na área do fundo anterior (vendidos saem no breakeven) (p168).
- Traders que compraram no topo e sofreram drawdown saem no breakeven quando o preço volta -> oferta no teste do topo anterior (p167–168).
- **Rompimento sem continuidade não basta para reverter**; experientes compram os rompimentos de baixa da neckline (p169).

## 24. Cap. 22 — TRADING RANGES (p170–187) — NÚCLEO DO LIVRO
### 24.1 Definição
- **TR = qualquer área de negociação bilateral** (de 1 barra doji até maior que a tela). Horizontal = equilíbrio; levemente inclinado = um lado mais agressivo; **inclinado demais = canal de tendência, não TR** (p170).
- Pullback = TR em que se acredita (>= ~60%) que a tendência será retomada em breve; TR "tradicional" = incerteza; **"TR é um pullback que durou tanto que perdeu poder preditivo de curto prazo; 80% das tentativas de rompimento para cima ou para baixo falham"** (p171).
- **Canal = TR inclinado** (bilateral, mas o lado da tendência mais agressivo) e **1ª perna de um TR que ainda não é evidente**. Canal = série de mini-TRs + mini-rompimentos. Com a maturidade: swings aumentam; rompe abaixo do canal e testa o fundo do canal -> TR (ou bandeira em fundo duplo) (p170).
- Canal ainda vale enquanto topos e fundos seguem em tendência; fundo mais baixo que encontra compradores -> nova LT mais plana = mais bilateral (p171).

### 24.2 Critérios objetivos de TR (lista do autor, p170–171) — base para detector
1. **Incerteza** sobre a direção do rompimento (marca registrada). Tendência = certeza e urgência.
2. Quase todos os trades com no máximo ~55% de certeza; setups de alta e baixa simultâneos; **várias mudanças de direção na tela**.
3. Ação horizontal: **barras nas bordas esquerda e direita da tela no terço médio vertical** da tela.
4. **Maioria das barras no meio**; reversões acentuadas perto do topo e fundo.
5. Corridas repetidas com barras de tendência fortes que **revertem na barra seguinte** (ex.: 2 barras de baixa abaixo de fundo de swing forte e reversão para cima).
6. Muitas barras de alta e baixa, mas **poucas sequências de 3–4 barras de tendência consecutivas**; muitas sombras proeminentes.
7. **Muitas barras sobrepõem >= 50% da barra anterior**.
8. Muitas áreas com **>= 3 barras sobrepostas em >= 50%**; muitos dojis.
9. **EMA relativamente plana**.
10. Ação anterior também era TR; apenas um clímax impressionante.
11. **Efeito vácuo**: spikes fortes no topo e no fundo que não rompem e voltam.
12. Pernas que se subdividem em 2 e revertem em movimento de 2 pernas; **L1/L2 no fundo e H1/H2 no topo geralmente falham**.
13. **Barras de sinal geralmente fracas**, mesmo nas 2as entradas.

### 24.3 Comportamento dentro do TR
- **"Compre baixo, venda alto e faça scalp"** (p172). Em TR, scalping de ambos os lados domina; compradores mais fortes perto do fundo, vendedores perto do topo.
- **Cada rali no TR = bandeira de baixa; cada queda = bandeira de alta.** No topo do TR: vender acima de barras (inclusive barras de alta) e acima de resistências (fade do rompimento), e vender abaixo de barras/suportes (como rompimento de bandeira de baixa). No fundo: espelho (p172).
- **Valor nos extremos e no meio**: meio do TR também é área de valor; pequena queda -> vendedores vendem menos, compradores mais -> volta ao meio (p172). **Atração magnética do meio**: mercado passa a maior parte do tempo no meio; mesmo rompimento que corre várias barras costuma ser puxado de volta (base das **bandeiras finais**). Comum: rompimento numa direção por várias barras -> reversão -> rompimento na direção oposta -> volta ao range (p174).
- **Efeito magnético de TR pode durar vários dias**: TR relativamente estreito de >= 10 barras -> mercado tende a voltar a ele 2–3 dias depois (p174).
- Canal íngreme rompendo para cima (aceleração): geralmente falha em 1–2 tentativas, **dentro de ~5 barras**; se volta ao canal, frequentemente fura o lado oposto -> correção maior/reversão (p172).
- TR estreito com swings de 2–4 barras pode ter muito volume (programas de compra e venda); dúzias de tentativas de rompimento falham antes de uma funcionar -> **melhor apostar contra as tentativas** (p172–173).
- **Mecânica do teste do extremo (p173)**: swings para o topo/fundo têm forte momentum (1–4 barras de tendência grandes, sombras pequenas); compradores e vendedores esperam o teste do fundo (vácuo) -> 1–2 barras grandes de baixa até suporte (frequentemente pequeno MM) -> compra agressiva. Institucionais compram no fechamento da última barra grande de baixa, ou esperam barra de pausa / fechamento de alta, ou acima da máxima da barra anterior.
- **Quanto mais perto do topo/fundo, mais se espera que o extremo antigo seja excedido por 1–2 tiques** (= varrida de liquidez dos equal highs/lows) (p173).
- **Nunca ser pego pelo momentum forte em direção ao topo/fundo do TR.** Só experientes fazem fade no fechamento da barra de rompimento; **a maioria deve esperar e entrar com stop quando o mercado reverte de volta para o range, com barra de sinal não muito grande** (para entrar perto do extremo, não no meio) (p173).
- **Probabilidades do rompimento (p173)**: **chance de qualquer tentativa individual de rompimento ter sucesso ~20%; chance de o TR acabar rompendo a favor da tendência anterior (TR numa tendência de alta) ~60%**. Comprar o rompimento exige stop bem abaixo do TR (aguentar falsos rompimentos) — poucos fazem. Melhor: entrar dentro do TR quando a tendência volta, ou após rompimento claramente forte, ou no pullback do rompimento.
- **Incerteza vs. urgência** como "radar": incerteza -> TR; urgência e esperando pullback -> tendência (p174).
- **Probabilidade direcional dentro do TR (p174)**: meio ~50%; **perto do topo >= 60% de cair X antes de subir X**; perto do fundo o inverso. Com **tendência de alta forte antes do TR sem topo claro**: meio 53–55% a favor; **fundo do TR 70–80%** a favor da alta (chance de subir 2–3X antes de cair X pode ser >= 70%); topo do TR só ~60% de cair. Ex.: TR de 50 tiques, compra acima de barra de reversão de 8 tiques num pullback de 2 pernas ao fundo, stop 10 tiques -> ~70% de subir 20–30 tiques antes. => **Estar mais inclinado a comprar o fundo de TR em mercado de alta do que vender o topo** (p174).
- Rompimento geralmente "se desdobra" ao longo de **>= 10 barras** antes de ter sucesso (às vezes ~1h antes da notícia); impaciência de um lado (compradores vendendo e não comprando o fundo) leva ao rompimento (p174–175).
- **Ação lateral muito estreita de ~5–20 barras: muito cuidado; operar rompimentos é caro** (sombras nos topos perto do topo e nos fundos perto do fundo) (p175).
- **TR são padrões de continuação** (rompem na direção da tendência anterior) e **tendem a romper para o lado oposto da EMA**: TR abaixo da EMA geralmente rompe para baixo; acima, para cima, especialmente se adjacente à EMA. Longe da EMA -> pode estar preparando teste da EMA (p175).
- **Quanto mais longo o TR, maior a chance de virar padrão de reversão** (acumulação num TR de baixa / distribuição num TR de alta) (p175). **(Conexão direta com Wyckoff.)**
- TR confuso no 5 min pode ser limpo no 15/60 min (p175).
- Dia de TR: 2–3 grandes swings; a 1ª reversão geralmente só depois da 1ª hora; tendência que começa tarde -> provável dia de TR com 2ª reversão e teste do meio (p175).
- **Terço médio do dia + preço no meio do range do dia = não operar** (TR estreito provável); esperar teste da máxima/mínima do dia. "Essa única mudança pode separar perdedor de vencedor." Setup "bom demais" no meio do dia com slippage que não anda em segundos -> sair no breakeven (p175).
- **Reversão de clímax** (spike de baixa + spike de alta ou vice-versa) -> TR bilateral (1 barra a dezenas) -> **rompimento leva a MM ~ altura do spike** (p175).
- Padrão de aparência baixista no 5 min pode ser só H2/fundo duplo no 60 min (ABC terminando na EMA de 60 min) — sempre considerar a tendência que precedeu o TR (p175).
- Fundos (especialmente climáticos) podem vir de pequenos TRs com barras grandes e sombras grandes; topos tendem a ser menos climáticos (p175–176).
- **Todos os padrões de reversão são TRs (OCO, topo/fundo duplo) e, portanto, padrões de continuação que ocasionalmente revertem** -> com OCO de topo numa alta, procurar compra quando ele tenta romper para baixo (p176).
- **Mercado frequentemente tenta reverter o TR final na última hora**: dia de TR em tendência de baixa -> procurar compra na mínima do dia nas últimas 1–2 h (p176).
- Experientes escalonam vendas num canal de alta fraco perto do MM baseado na altura do TR inferior (dia de TR em tendência), vendem acima de topos de swing e perto/acima de barras grandes de alta (clímax) (p176).

### 24.4 O dilema do TR e gestão (p176–178)
- **Dilema**: como a maioria dos rompimentos falha, alvos são limitados (scalp), mas scalp exige probabilidade alta, que não existe por muito tempo em TR. Soluções: **entrar com limit contra o movimento** (vender acima de H1/H2 fracas, de topos, de barras de alta no topo; comprar abaixo de L1/L2, fundos, barras de baixa no fundo), ou **posição inicial menor e escalonar** se for contra (p176).
- TR grande: vender pequenas barras de reversão de baixa no topo e comprar pequenas de alta no fundo, **especialmente 2as entradas (L2 no topo, H2 no fundo)**. Em tendência compra-se H2 perto do topo da perna; em TR só no fundo do TR (p176).
- TR = canal horizontal: swings pequenos -> scalp; grandes -> scalp ou segurar parte. TR de vários dias: operar o dia como dia de tendência dentro dele (p176).
- **Quanto mais estreito o TR, menos trades; TR estreito = quase nenhum trade** (p176).
- **Regra 5–10 barras**: **se o mercado caiu ~5–10 barras, só procurar comprar (especialmente perto do fundo); se subiu 5–10 barras, só vender (especialmente perto do topo)** (p176).
- **Meio do TR só se os swings forem grandes o bastante**: TR de 10 tiques -> não comprar 6 tiques acima do fundo (precisa de 6 de movimento para 4 de lucro); TR de 6 pts -> pode comprar fundo mais alto no meio (p176).
- Mercado passa pouco tempo nos extremos e chega lá com tendência forte (p176–177).
- **Armadilha**: no fundo do TR, após 2 barras fortes de baixa, lateral algumas barras logo abaixo da EMA, nova barra de reversão de baixa forte mas sobreposta e entrada a ~1 tique do fundo da bandeira -> **não vender; preferir limit de compra na mínima dessa barra** (experientes) (p177).
- **Melhores entradas em TR: 2as entradas no topo/fundo, com barra de sinal de reversão a favor, não muito grande, pouca sobreposição.** A aparência da barra de sinal importa **menos** em reversões de TR que em reversões de tendência (vendas no topo frequentemente têm barras de sinal com corpo de alta e vice-versa) (p177).
- **Matemática do scalp (p177)**: perder dinheiro mesmo com 60% de acerto se risco = 2x recompensa. Emini (range diário 10–15 pts, stop médio ~2 pts): vender sinal forte no topo de TR de **>= 6 pts** (2º sinal) -> **>= 60% de ganhar 2 pts arriscando 2** (minimamente lucrativo). Se pode cair 4: realizar 1/4–1/2 em 2 pts, mover stop para breakeven ou ~5 tiques, segurar resto para 4 pts (40% de acerto com 5 tiques de risco ainda positivo). Reentrar com limit no preço original arriscando ~5 tiques.
- **TR de só 3–4 pts (Emini) = TR relativamente estreito: entrar com stops é estratégia perdedora**; só experientes, com limit (p177). *Para cripto: normalizar por ATR — TR com altura < ~1,5–2x stop médio = estreito.*
- **Perna que testa o extremo do TR em canal estreito (ex.: 10 barras num micro canal) -> não vender abaixo da barra anterior; esperar pullback do rompimento do micro canal** (fundo mais alto, topo duplo ou topo mais alto) e vender abaixo da barra de sinal com stop acima dela; melhor com barra de reversão de baixa não muito grande (p177).
- **Pressão acumulada aumenta confiabilidade**: nas últimas ~10 barras, 2–3 barras com sombras superiores grandes ou várias barras com corpos de baixa fortes (para venda no topo); para compra no fundo: sombras inferiores grandes / corpos de alta. **Linhas duelantes perto da entrada** aumentam as chances (p177).
- Fade no fechamento de barra de tendência grande que testa o extremo (experientes): ex. TR tranquilo há 3h, 2 pernas para baixo abaixo de fundo anterior, fechamento na mínima -> comprar no fechamento; melhor se pernas de alta mais fortes que as de baixa e se a barra testa LT/linha de canal/MM/suporte (p177).
- **Escalonamento**: rali de 8 barras formando L3 abaixo do topo do TR -> vender L3 com stop largo (~4 pts num dia de 10 pts); se L3 falha, L4 provável -> adicionar (N tiques acima, acima de barra/topo anterior ou no sinal L4); sair de ambas perto do fundo ou no preço da 1ª entrada (1ª no 0 a 0, 2ª com lucro) (p177–178).
- Em TR, aceitar pullbacks; mas se o TR pode estar virando tendência, sair se for contra e esperar 2º sinal (p178).
- **Fade de L1 no fundo do TR**: L1 fraca no fundo (momentum de baixa fraco) -> limit de compra 1–2 tiques abaixo da mínima da barra anterior (esperando 8 tiques de alta antes de 6 de queda); se acha que forma canal de alta, comprar também na/abaixo da barra de sinal da L2. Espelho no topo com H1/H2 (p178).
- **Fade do rompimento da perna anterior**: pernas no TR se subdividem em 2 -> após o pullback da 1ª perna, **não vender o rompimento do fundo da 1ª perna**; preferir limit de compra alguns tiques abaixo dele (p178). Comprar rompimento acima de topo só funciona em tendência de alta forte; vender abaixo de fundo, só em tendência de baixa forte.
- **Nunca segurar esperando rompimento**: sair dos longos em alvo de scalp ou no teste do topo; dos curtos no teste do fundo. **Nunca martingale** (TR estreito costuma dar >= 4 perdas seguidas) (p178).
- **Mercado = TRs separados por tendências breves**; cada TR feito de tendências e TRs menores; 80% das tentativas de rompimento falham e o rompimento final geralmente segue a tendência anterior (p178).
- **Perna final da maioria dos TRs em mercado de alta = canal de baixa** (última tentativa dos vendedores) = bandeira de alta -> comprar a reversão do fundo ou o pullback do rompimento logo depois; em tendência de baixa, perna final = canal de alta (bandeira de baixa) (p171, p179, p183).
- Em TR em mercado de alta, ralis tendem a ser mais fortes que as quedas, especialmente perto do fim; cada pullback é uma bandeira; uma delas será a final (p171).
- **Múltiplas reversões nas primeiras horas -> dia de TR** (p179). Pressão vendedora no topo do dia (dojis com sombras superiores, H1 seguida de inside de baixa) -> P(-2 pts antes de +2) ~60%; vender após ali com risco 2–3 pts para teste do **meio do dia** (5–8 pts) = ótimo trade (p179).
- **Meio do dia num dia de TR = ímã testado repetidamente** (até após novo recorde); **dias de TR geralmente fecham perto do meio** -> vender testes dos extremos, adicionar 1–2 pts acima; sair no preço da 1ª entrada (p179).
- **Em dia de TR, fazer o oposto do dia de tendência**: vender acima de barras de sinal H1/H2 perto do topo; comprar abaixo de L1/L2 perto do fundo; vender acima da máxima de barras anteriores e adicionar; comprar abaixo de mínimas e adicionar; fade de barras grandes de tendência perto dos extremos (p179–180).
- Rompimentos falham especialmente **em dias de TR, no meio do dia e no meio da faixa** (p180).
- **Barra de sinal em TR pode ter corpo contrário** (venda no topo com barra de corpo de alta pequena, sombra superior, fechamento no meio = aceitável). **Quanto mais forte a tendência, mais importante a qualidade da barra de sinal para reversão** (p180, p181).
- Swing trades em TR: vender abaixo da barra de sinal da reversão da máxima anterior; após quebra da LTA, vender o fundo mais alto antes do rompimento do fundo do TR; idem compra numa bandeira de alta em cunha (topo mais baixo... fundo mais alto) após quebra da LTB (p180–181).
- Dia de TR evoluindo para **dia de TR em tendência**: compradores agressivos compram barra grande de baixa **na área do MM** para baixo do TR inferior em formação, escalonando 1–4 pts abaixo; consideram **falha de 5 tiques** (p181).
- **Terço médio do dia com preço no terço médio do range**: barbwire, falsos rompimentos -> devolver lucro; **em dias de TR os melhores trades são fades das máximas e mínimas do dia** (p181).
- **Spike de alta seguido de spike de baixa (ou vice-versa) -> TR** (reversão climática = reversão de 2 barras no TF maior) (p182). Spike & canal sempre seguido de teste do início do canal (p182).
- **TR como barra de reversão**: sombras inferiores e reversões de 2 barras repetidas num TR no extremo = barras de reversão no TF maior; **3 tentativas de romper abaixo da mínima de ontem que encontram compradores** -> L2 fracassada = compra para tendência forte (p183).
- **TR estreito horizontal (ou canal estreito) tem puxão magnético que impede rompimentos de irem longe** -> após o rompimento, procurar reversão de volta (p184).
- **TR com múltiplas reversões grandes num extremo do dia -> procurar entrada de reversão, não continuação**; não comprar no topo do dia/vender no fundo com bilateralidade forte (p184).
- **>= 3 barras quase totalmente sobrepostas logo acima da EMA com sinal de compra perto do topo desse mini-TR = armadilha** -> se for operar, vender acima da máxima da barra anterior (p184–185).
- **Clímax de venda consecutivos (vendedores emocionais vendendo 2x) -> fundo quase sempre próximo** (p184).
- Comprar acima da **maior máxima das 2 barras** de uma reversão de 2 barras, não só acima da barra de alta (p185).
- Barras grandes doji no topo do TR = armadilha de compra; vender abaixo de barras pequenas perto do topo. **"Em TR não há nada para os padrões de reversão reverterem"** (p185).
- **Dia inteiro pode ser uma bandeira final** (rompe antes de notícia, volta, tenta de novo e falha -> o contrário) (p185).
- TR pode ser reversão: 3 clímax de venda (barras grandes de baixa) + barras com sombras inferiores grandes + fundo duplo/triplo/OCO = compradores tomando controle; canal de baixa = bandeira de alta; **canais costumam reverter após o 3º empurrão** (p185–186).
- Rompimento abaixo de fundo de TR antigo que tenta reverter = comum em TR (p186).
- Assim que decidir que há tendência (always-in virou), comprar pelo menos pequena posição a mercado com stop abaixo do fundo do spike; **P(MM) >= 60%**; MM = altura do spike (fundo -> topo) somada ao topo, ou abertura da 1ª barra -> fechamento da 2ª barra do spike (p186).
- **Rompimento para cima de canal em cunha geralmente volta em ~5 barras; se continua (~10 barras), MM para cima pela altura da cunha é comum** (p187).
- Bandeira em cunha fraca (muitas barras de tendência contrária grandes) -> rompe e vai além do MM (p187).

## 25. Cap. 23 — Exemplo de como operar um TR (p188–192)
- Máxima: **"Compre baixo, venda alto"**; pensar em scalps, não swings; não esperar rompimento. **80% dos ralis ao topo e 80% dos sell-offs ao fundo falham em virar tendência** (p188).
- **Recompensa >= risco** para não precisar de >= 70% de acerto; aceitar pullbacks.
- **Regra 5–10 barras** (repetida): subindo 5–10 barras no TR -> só vendas e realizar longos; descendo -> só compras.
- **Raramente entrar com stops no meio da faixa**; com limit às vezes é razoável.
- **Melhores setups (iniciantes, entrada com stop = mercado indo a favor)** (p188): (1) **H2 perto do fundo** (2ª tentativa de reverter do fundo, ex. fundo duplo); (2) **L2 perto do topo** (topo duplo); (3) compra no fundo, especialmente **2ª entrada após quebra de LTB**; (4) venda no topo, especialmente **2ª entrada após quebra de LTA**; (5) **bandeira de alta em cunha no fundo**; (6) **bandeira de baixa em cunha perto do topo**; (7) barra de reversão de alta / padrão de reversão como bandeira final no fundo...
  (cont.) (8) vender barra/padrão de reversão de baixa (bandeira final) após rompimento acima de topo de swing no topo do TR; (9) **comprar pullback de rompimento após rompimento de alta perto do fundo** (comprar acima da máxima da barra anterior); (10) vender pullback de rompimento após rompimento de baixa perto do topo (p188).
- **Setups com limit/mercado (experientes)** (p189): comprar spike de baixa a mercado ou limit na/abaixo da mínima do fundo anterior no fundo do TR (stop largo); vender spike de alta na/acima do topo anterior; **comprar no fechamento ou abaixo da mínima de barra grande de baixa perto do fundo (clímax de venda exaustivo)**; vender no fechamento/acima da máxima de barra grande de alta perto do topo; **comprar na/abaixo de barra de sinal fraca de L1/L2 no fundo**; vender na/acima de barra de sinal fraca de H1/H2 no topo; comprar fechamento de baixa no início de swing forte de alta (e vice-versa).
- Trader experiente faz ~15 scalps de 1 pt num dia de TR com fades (70–80% de acerto) — **iniciantes só devem operar TR com P >= 60% e alvo >= risco (~2 pts no Emini)** -> só perto dos extremos (p189).
- Em vez de reverter posição, sair no alvo e procurar o setup oposto (p190).
- **Pistas cumulativas de dia de TR** (p190): 1ª barra doji; sombras inferiores nas 3 primeiras barras; sobreposição ~50%; reversão imediatamente após entrada; **4–5 reversões na 1ª hora -> chance alta de dia de TR**; barra forte de alta que para na EMA, seguida de doji e barra de baixa, sem fechamentos acima da EMA = compradores sem controle.
- **Spike + canal de 3 empurrões = 1ª perna de TR**: assumir TR por >= 10–20 barras; comprar sell-off de 2 pernas que teste o fundo do canal (p190).
- **Ordens cientes de stops alheios** (p190): comprar 1 tique acima da barra de entrada dos vendidos (onde estão os stops deles) para scalp até a EMA; comprar mais 10 centavos abaixo onde os compradores fracos estão estopados.
- **Spike forte que para na EMA sem continuidade imediata = provável vácuo/exaustão** -> vender (p190–191).
- **Rompimento de TR estreito no meio de um TR maior = hesitação (ii)** (p191). Ordens limit de compra abaixo de barra inside não preenchidas = urgência dos compradores -> comprar o rompimento (p191).
- **Entrada da reversão de 2 barras: abaixo da menor mínima das duas barras** (p191).
- **TR estreito anterior (barras 10–16) exerceu atração magnética: o sell-off hesitou ao voltar a ele** -> se fosse tendência forte, teria atravessado com barras fortes; hesitação = vácuo de venda -> compra no fundo (H2 + barra de reversão forte + fundo duplo com o TR estreito = pullback de rompimento) (p192).
- Ordens de limit de compra que não são preenchidas na mínima de barra de baixa -> compra muito agressiva -> buy stop acima dela (p192).
- **Linhas duelantes no topo** -> compradores realizam acima das duas linhas (p192). **H1 doji no topo de dia de TR = venda na máxima da barra** (p192). Dia inteiro com 3 empurrões (topos) = grande triângulo (p192).

## 26. Cap. 24 — TRs estreitos (tight trading ranges, TTR) (p193–208) — "o pior ambiente"
- **Definição**: canal lateral de >= 2 barras com muita sobreposição, reversões múltiplas, muitos dojis, sombras proeminentes, corpos de alta e de baixa; pode passar de uma dúzia de barras. **Critério numérico (Emini): range diário 10–15 pts -> TR com altura <= 3 pts provavelmente é TTR; 4–5 pts às vezes também, se as barras forem grandes.** *(Normalizar: altura do TR <= ~20–25% do range diário médio / <= ~1,5–2 ATR da barra.)* (p193)
- **A maioria das entradas com stop dá prejuízo — evitar** (p193). Volume dentro das barras continua alto (ambos os lados se posicionando; HFT scalpando 1–4 tiques) (p193).
- Mecânica do rompimento: um lado atinge tamanho máximo de posição e não consegue mais defender o extremo -> o outro rompe -> liquidação em cascata dos presos -> swing prolongado (p193). **(= absorção/esgotamento no Wyckoff.)**
- **Melhor: não entrar no rompimento; esperar continuidade forte e entrar a mercado, ou esperar o pullback do rompimento e entrar a favor, ou esperar o falso rompimento e entrar contra** (p193).
- **Probabilidades do TTR** (p194): sem reversão climática prévia, após perna de tendência, chance de rompimento a favor da tendência **51–55% (no máximo ~55% se a tendência for forte; ~53% se menos forte)**. **Após reversão climática (mesmo pequena): 50/50**. Perto do topo/fundo a chance de reverter é >= 60%, mas **não há espaço para lucro** -> irrelevante.
- **"Um TTR supera tudo"** (qualquer outra razão para operar) (p194). Entrar e sair com stops dentro do TTR = estratégia perdedora; seguir as instituições (vendem com limit acima das barras, compram com limit abaixo).
- **TTR de 20+ barras = sem valor preditivo** (p194).
- **Na maioria dos casos há falha em 1–2 barras após o rompimento** -> basear a entrada na falha; geralmente a tentativa de reversão falha e vira pullback de rompimento: **esperar a barra de pullback fechar e comprar com stop 1 tique acima da máxima dela**; se o pullback virar reversão e furar o lado oposto do TTR -> sell stop 1 tique abaixo do TTR ou esperar pullback para vender (p194).
- Rompimento de TTR prolongado em dia de TR geralmente fraco -> resto do dia sem tendência. **Forte tendência na 1ª hora + TTR de horas -> dia de retomada de tendência: rompimento a favor com 2ª perna ~ mesmo tamanho da 1ª** (p194).
- Se entrou e virou TTR: **sair no breakeven (ou 1 tique de perda)** — a probabilidade caiu de 60% para ~50% com mesmo risco/recompensa (p195).
- Ímã forte + movimentos pequenos -> chance de ganhar 2–3x o risco muito pequena -> **qualquer estratégia de rompimento (comprar acima/vender abaixo de barra) perde com o tempo** (p195).
- Exceções (experientes): TTR alto o suficiente -> vender pequena barra de reversão de baixa no topo / comprar acima de pequena barra de baixa no fundo; limit abaixo da mínima da barra anterior/acima da máxima com escalonamento. TTR após rali forte e bem acima da EMA: compradores compram abaixo das mínimas e seguram parte para swing (p195).
- **"Não opere em TTR" = a regra mais importante**; "o mercado continua fazendo o que acabou de fazer" (>= 70%): após 6 perdas, a 7ª é mais provável que um ganho (p195).
- **Sequências de 6+ reversões fracassadas consecutivas acontecem quase todo dia — sempre em TTR** (p196). Martingale = paradoxo (32 contratos após 6 perdas).
- Se após entrar surgem pequenos dojis estreitos (especialmente no terço médio do dia) -> **assumir TTR, sair no 0 a 0 ou pequena perda** (p196).
- Dentro de TTR numa tendência de baixa, se comprou e surge L2 -> sair (e talvez reverter). Paciência: bons setups voltam (p196–197).

### 26.1 Arame farpado (barbwire) (p196–197)
- **Definição operacional**: >= 3 barras amplamente sobrepostas e >= 1 com corpo minúsculo (doji). Guia de sobreposição: **mais da metade da altura da 2ª barra dentro do range das barras antes e depois**. Barras relativamente grandes = emoção/incerteza. Típico no meio do dia, meio do range do dia, perto da EMA.
- Probabilidade favorece rompimento a favor da tendência, mas causa perdas repetidas a quem opera rompimentos; frequentemente tem **L2 fracassada e H2 fracassada** antes do rompimento real.
- **Barbwire adjacente à EMA geralmente rompe na direção (lado) da EMA em que está**: logo acima da EMA -> rompimento de alta provável; logo abaixo -> de baixa. Se atravessa a EMA, usar outros fatores (p196).
- TTR em tendência frequentemente vira **bandeira final**; o rompimento costuma voltar ao TTR -> >= pullback de 2 pernas ou reversão (p196).
- Barbwire num pullback à EMA: se fica do lado da tendência da EMA -> fim do pullback, rompimento a favor da tendência; se o pullback atravessa a EMA e o barbwire fica do outro lado -> provável 2ª perna do pullback (ou tendência virou) -> rompimento na direção do movimento que levou ao padrão (p196).
- Barbwire no fim de spike de várias barras na 1ª hora numa área de S/R pode virar reversão e a máxima/mínima do dia (p196).
- **Regra fundamental: nunca entrar no rompimento do barbwire**; esperar uma **barra de tendência sair do padrão**; como o rompimento provavelmente falha, **fade**: após barra de tendência de alta que rompe por mais que alguns tiques fechar -> **sell stop 1 tique abaixo da barra de rompimento**; se essa venda falhar, quando a barra de entrada fechar -> **buy stop 1 tique acima da máxima da barra de entrada de venda** (entrada de pullback; "é incomum a 2ª entrada falhar"). **Não fazer fade se o rompimento tiver >= 2 barras de tendência consecutivas** (p197).
- Fade de pequenas barras perto do topo/fundo do barbwire (ex.: barra de reversão de baixa pequena perto da máxima -> sell stop 1 tique abaixo); não usar barras de 1 min (p197).
- Experientes: limit de compra abaixo da mínima da barra anterior **só se essa mínima estiver perto do fundo da faixa**; venda acima da máxima anterior só perto do topo; funciona melhor com picos proeminentes e barras >= tamanho médio (p197).
- Barbwire no fim de pullback à EMA em tendência forte: comprar a **H2** mesmo dentro do barbwire, especialmente com barra de sinal de reversão de alta (p197).
- **REGRA DE OURO: TR perto da EMA -> nunca comprar se as barras estão abaixo da EMA e nunca vender se estão acima** (p197).
- Micro canal contra-tendência num dia de tendência que rompe e falha em 1–2 barras: não é compra; esperar pullback (topo mais baixo/mais alto) e vender abaixo — onde os compradores presos saem (p197).

### 26.2 Exemplos de TTR (p198–208)
- **3 mudanças de direção em 5 barras + dojis = TTR em vigor** (p198).
- Após 2 rompimentos fracassados num TTR (que evolui para triângulo), **o 3º rompimento tem chance muito maior**; H2 pullback do topo como entrada agressiva (p198). Entrada de maior probabilidade: **1º pullback após o rompimento que fura a mínima da barra de reversão por 1 tique** (prende os dois lados) (p198).
- **TTR pode ser bandeira de alta e de baixa ao mesmo tempo** -> modo de rompimento. Compradores agressivos compram dentro do TTR arriscando pouco (abaixo do fundo duplo) para ganhar muito em aposta 50/50 (p199). **Fibonacci ~ sem sentido** (todo pullback está perto de algum nível) (p199).
- **TTR numa tendência de alta rompe primeiro para baixo em 45–49% dos casos**; evolui para TR maior que rompe a favor (p200). Segurar com stop largo exigiria risco enorme -> melhor sair e recomprar no falso rompimento de baixa/fundo duplo.
- **Falhas opostas (falha da falha) = 2as entradas, especialmente confiáveis** (p200).
- **Triângulos em expansão são intensamente bilaterais -> atração magnética; a maioria dos rompimentos falha** (p200).
- **8–10 reversões consecutivas no barbwire sem atingir scalp** acontecem; operar reversão mecânica em cada barra = desastre (p201–202).
- **TR horizontal após tendência de >= 20 barras geralmente vira bandeira final**; rompimento falha e volta ao TR; às vezes reversão (p203).
- ioi dentro de barbwire com sombras proeminentes = não confiável; esperar barra de tendência clara; **fade do rompimento fraco; se a fade falhar, 2ª entrada (raramente falha)** (p204). **>= 3 barras grandes e barra de sinal forçando comprar no topo/vender no fundo do TTR = provavelmente perder** (p204). Barra de tendência de alta na EMA como 2ª entrada no mesmo preço da 1ª = chances maiores (p204).
- **Barbwire no meio do range do dia, ao lado da EMA: melhor entrar no falso rompimento** (p205). Sempre pensar "o que acontece se o movimento inicial falhar?".
- **TTR no fim do dia após rompimento = continuação**; comprar na/abaixo da mínima da barra anterior; corpos de alta majoritários + acima da EMA = pressão compradora; **quando ambos os lados estão presos, o próximo movimento dura várias barras** (p205–206).
- TTR como bandeira de baixa: L2 com barra de reversão de baixa pequena no topo do TTR na EMA = risco pequeno, recompensa grande (p206).
- **Barbwire após sell-off frequentemente vira a bandeira final da tendência de baixa; mercado volta à área do barbwire** (valor) (p207). 3 clímax de venda consecutivos -> correção >= 10 barras e 2 pernas (p207).
- Barbwire que transita para barras com bons corpos e sombras pequenas = L2 normal em tendência de baixa -> spike + canal; **L2 em tendência de baixa eficaz porque compradores saem** (p208).

## 27. Cap. 25 — Triângulos (p209–212)
- **Triângulo = TR com >= 3 empurrões para cima ou para baixo** (pelo menos 3 pernas numa direção e 2 na outra). Tipos: expansão (linhas divergentes; **oo = pequeno triângulo em expansão**), contração (**ii = pequeno triângulo no TF menor**), ascendente (resistência horizontal + LTA), descendente (suporte horizontal + LTB). Cunha = triângulo inclinado.
- **Triângulo = modo de rompimento, rompimento iminente** (diferente de canais/TRs que podem durar indefinidamente) (p209).
- Rompimento geralmente na direção da tendência anterior. **Todo canal de baixa (cunha descendente) funciona como bandeira de alta** (mesmo ocupando a tela inteira) (p209).
- **Qualquer TR com 3 empurrões = triângulo funcional.** Representam forte pressão contra-tendência; tendem a ocorrer **tarde nas tendências e frequentemente viram bandeiras finais**. Com > 3 empurrões, passa a ser chamado de TR (p209).
- **3 empurrões em canal estreito não funcionam como cunha** (canal continua) — 3 empurrões sozinhos não são razão para operar contra; na dúvida, não entrar no rompimento (p209–210).
- Cunha descendente íngreme: não comprar a 1ª reversão; esperar rompimento e avaliar: forte -> comprar o pullback do rompimento; sem pullback por várias barras -> spike forte, always-in (p210).
- Triângulos horizontais = equilíbrio -> **rompimentos não vão longe, frequentemente bandeira final**; se falha, volta e pode romper o lado oposto (2 pernas ou reversão). Asc./desc./simétrico = mesmas implicações; viés leve a favor da tendência anterior, **não suficiente para operar só por isso**; esperar rompimento ou fazer fade dos extremos se alto o bastante. **Rompimento -> MM ~ altura do triângulo; se vai além, provável tendência** (p210).
- **Triângulo em expansão**: rompimento frequentemente falha -> rompe o outro lado -> triângulo maior; reversão vira continuação e vice-versa; vender perto do topo / comprar perto do fundo (p210–211). Cunha ascendente que rompe para cima e lateraliza (não cai) = força compradora (p211).

## 28. Parte V — Ordens e gestão. Cap. 26 — Scalping, swing e investimento (p213–219)
- **Não transformar trade perdedor em "investimento"**: sair no stop planejado (p213).
- **Scalp** (day trader): segura 1–15 min, sai com limit no alvo; **recompensa ~ risco**; não aceita pullback (sai no 0 a 0). **Swing intradiário**: atravessa pullbacks, busca os 2–4 maiores swings do dia; **recompensa >= 2x risco** (p213).
- **Matemática scalp vs swing** (p213–214): quem toma o lado oposto de um scalp com 60% tem <= 40% -> precisa de recompensa > risco (= swing trader). Swings geralmente <= 40% de probabilidade (ou ~60% com stop largo + escalonamento).
- **Emini (range diário 8–15 pts): stop ~2 pts; alvo 1–3 pts. Com alvo de 1 pt e stop de 2, precisa > 67% de acerto só para empatar** (p214). **Regra: só operar com recompensa >= risco e confiança (>= 60%)**; se 2 pts não é alvo realista, não opere.
- **Melhores setups do dia merecem >= 2 pts e até 4** (always-in claro, >= 2 pernas, >= 10 barras) — não scalpear 1 pt arriscando 2. Técnica: **OCO stop 2 / alvo 2–4 e sair de perto** (p214).
- **Se scalpa, acredita que não há tendência clara ou que o trade é contra-tendência** (senão seguraria). **Mercado que recua 3–4 tiques logo após o sinal = grandes não esperam que vá longe -> TR -> scalp** (p214).
- Scalp com recompensa ~ risco precisa de **>= 70%** (p214). Reduzir % necessário: stop de breakeven após parcial; **mover stop da barra de sinal para 1 tique além da barra de entrada após ela fechar, e para breakeven após movimento de 5 tiques** (p214).
- **"Setup de probabilidade muito alta tende a render só scalp"** (desequilíbrio óbvio é corrigido em 1–2 barras) (p214–215).
- Swing traders: mesmos setups, focam nos poucos trades/dia com provável movimento de 2 pernas; realizam 4+ pts em parte e movem para 0 a 0; podem adicionar a preço melhor com stop mental; **adicionar onde estarão os stops dos scalpers** se o padrão ainda vale; reversão: permitir fundo mais baixo e adicionar na 2ª entrada (p215).
- Pirâmide: adicionar mesmo tamanho a cada novo sinal; stop de tudo = stop da última adição (p215).
- Emini range 10–15: **>= 1 swing de 4 pts em 90% dos dias; ~5 swings de 4 pts em 10% dos dias; maioria dos dias 1–3 swings de 4 pts a partir de entrada com stop** (p215). Scalpers fortes seguram 1/4–1/2 quando o setup pode virar swing de 4–10 pts.
- **Setups de swing: 40–50% de atingir o alvo**; maioria dos swing traders entra em **reversões** (fundo duplo, topo duplo, reversão de abertura nas primeiras horas); trades que falham viram scalps (p215).
- **Teste "se estivesse flat"** para decidir manter swing (p215–216).
- **Maiores swings vêm de rompimentos de TR e reversões** (incerteza alta, P <= 50%) -> exigem recompensa >> risco (p216).
- **Swings em tendência: deixar parte rodar até sinal oposto; em TR: sair do restante perto do extremo do TR** (p216).
- Realizar parcial: 2–4 pts conforme TR; **compra de reversão no fundo do TR: P >= 60% para movimento equidistante (stop 2, alvo 2)**; realizar em MMs, acima de topos, em LTs/linhas de canal e reversões de falso rompimento (p216).
- **Critérios de saída são mais fracos que os de entrada**: sair (parcial/total) com sinal de reversão fraco; reverter só com sinal forte (p216).
- Scalper de 1 pt (4 tiques) no Emini **precisa de movimento de 6 tiques além da barra de sinal** (entrada 1 tique além + 4 + limit preenchido só 1 tique além) (p216).
- **Iniciantes: preferir swings com alvo >= 2x risco (4 pts com stop 2), P 50–60%** em vez de scalps (p217). Traders mais bem-sucedidos: 5–10 swings/dia com P >= 60% e alvo >= risco (micro topos/fundos duplos) (p217).
- **Gestão**: em movimento significativo esperado ou pullback em tendência forte, **sair de 25–75% com lucro de 1–2x o risco inicial, mover stop para ~breakeven, deixar o resto correr** (p217). Às vezes arriscar 4–6 tiques além do breakeven; se estopar e retomar, reentrar 1 tique além da barra anterior (p217–218).
- **Sinal de força: limit de alvo preenchido no tique máximo da perna** (compradores agressivos) -> procurar recomprar no pullback. **Alvo atingido mas não preenchido (ex.: 9 tiques além da barra de sinal) = possível falha** -> mover para breakeven; se contexto favorece reversão, vender 1 tique abaixo da barra. **Falsos rompimentos de 5 ou 9 tiques são comuns no fim de tendência prolongada (1º sinal de reversão)** (p218).
- Scalping de 1 pt em gráfico de 1 min = "garimpar grãos" — preferir lucro maior com stop <= alvo (p218).
- Ação de US$300: stop mais largo, menos ações, alvo maior (US$2), depois 0 a 0 (p218).
- Exemplo Fig. 24.2 (p219–220): **reversão de 2 barras: gatilho abaixo da mínima das duas barras**; H2 acima da EMA em swing de alta = confiável; em dia de TR, venda num topo com >= 50% de chance de testar o **meio do dia** (~5 pts) arriscando 2 = boa equação; **maior corpo do dia perto do suporte (mínima de ontem) = clímax/vácuo de venda** -> barra forte de reversão de alta logo acima da mínima de ontem = sinal de fundo duplo; setups com 40–50% e alvo 5 / risco 2 são válidos; H2 dentro de canal de baixa -> esperar 2ª entrada (H4 de reversão de 2 barras); entrada menor com stop largo + adicionar na 2ª entrada.

## 29. Cap. 27 — Matemática do trading (p221–245)
### 29.1 Princípios
- Vantagem = função de **risco, recompensa e probabilidade**; quando uma é excepcionalmente boa, outra(s) é ruim (alta probabilidade -> recompensa pequena e risco relativamente alto; recompensa >> risco -> probabilidade baixa) (p221).
- HFT: vantagem ~5% (< 55%) aplicada milhões de vezes. Day traders: leitura excepcional -> 70%+ (p221).

### 29.2 Tabela de probabilidades por setup (p222–223) — **lista do autor**
**>= 70% (recompensa >= 1/2 risco só para empatar)**: scalp — mas como poucos acertam 70% consistentemente, operar scalp só com recompensa >= risco.
**>= 60% (recompensa >= risco)**:
- **H2 na EMA em tendência de alta / L2 na EMA em tendência de baixa.**
- **Pullback de bandeira em cunha** a favor da tendência.
- **Pullback do rompimento de uma bandeira** a favor da tendência.
- **H1 em spike forte de tendência de alta (não após clímax) / L1 em spike forte de baixa.**
- **Venda no topo de TR / compra no fundo de TR, especialmente 2ª entrada.**
- **Reversões de tendência**: após **quebra forte da LT**, reversão após **teste do extremo** com boa barra de sinal (fundo mais alto/mais baixo; topo mais alto/mais baixo); **reversão forte de bandeira final**; comprar o **3º ou 4º empurrão de uma escada de baixa** para teste do fundo do empurrão anterior (espelho em escada de alta).
- Limit/mercado (experientes): comprar spike forte a mercado/fechamento/limit na mínima da barra anterior; **comprar rompimento de baixa fraco em torno de um MM** (ex.: TR de 4 pts, limit 4 pts abaixo, risco 4, alvo teste do ponto de rompimento); comprar na/abaixo de barra de sinal **L1/L2 fraca** numa possível nova alta ou no fundo do TR; comprar na/abaixo da barra anterior em bandeira de alta tranquila na EMA; **comprar abaixo de barra de alta que rompe bandeira de alta** (antecipando o pullback de rompimento) — espelhos.
**~50% (recompensa >= 1,5x risco)**: entrada inicial ao escalonar num TR; operar dentro de TTR esperando rompimento várias vezes o risco; **vender topo mais alto num TR quando a tendência pode estar revertendo / comprar fundo mais alto** (meio do TR, recompensa ~2x).
**<= 40% (recompensa >= 2x risco)**: comprar o fundo de tendência de baixa / vender o topo de alta com risco minúsculo (ex.: limit 1 tique abaixo de resistência nítida, stop 1–2 tiques acima).
**40–60% (recompensa >= 2x risco)**: comprar teste de rompimento em tendência de alta com limit enquanto cai; comprar abaixo de barra de sinal L1/L2 (mesmo não fraca) com limit numa nova alta ou fundo do TR; **fade em ímãs** (vender MM em tendência de alta); **comprar clímax de venda no fechamento de barra de baixa extraordinariamente grande em suporte numa baixa exagerada** (espelho).

### 29.3 Equação do trader (p223–225)
- **P(sucesso) × recompensa > P(falha) × risco.** Risco e recompensa você define (stop e alvo); a probabilidade nunca é conhecida: **na dúvida 50%; setup que "parece bom" ~60%; recompensa muitas vezes > risco ~40%** (p223–224).
- Procedimento (p224): 1) definir o stop necessário; 2) dimensionar posição pelo risco em dinheiro; 3) estimar a probabilidade: **50% -> alvo >= 2x risco; 60% -> alvo >= 1x risco**; se o alvo não é razoável, não operar.
- Teste rápido (Emini, risco 2 pts): **60% de fazer 2? 70% de fazer 1? 40% de fazer 4?** Se nenhum para compra nem venda -> mercado não está claro = TR -> experientes vendem acima/compram abaixo de barras com limit (p224–225).
- **Não existe trade com alta probabilidade + recompensa grande + risco pequeno** (o lado oposto institucional teria uma estratégia horrível). Quando algo tende a isso, o mercado se move rápido (spike), aumentando o risco necessário antes de o setup ficar "forte" (p225).
- O lado oposto de um scalp é um swing trader (alvo maior, stop largo, escalonamento) (p226).
- **Primeiro pullback num spike forte = realização de lucro + vácuo de compradores com limit abaixo da mínima anterior; não há como vendedores lucrarem vendendo abaixo da barra anterior aí** (p226).
- **Transição tendência -> TR -> reversão (fluxo)**: com bilateralidade crescente, vendedores passam de scalp a swing; compradores param de segurar e scalpam; quando sinais de compra ficam fracos e os scalpers param de comprar e a venda é feita mais por swing sellers, a tendência reverte (p227).
- **Sistemas de baixa probabilidade (~40%) precisam de TODOS os sinais** (cherry picking = pegar as cerejas ruins); sistemas com P >= 60% e recompensa >= risco permitem selecionar (p227–228).
- **Probabilidade alta = setup óbvio = desequilíbrio dura 1–2 barras = scalp; probabilidade baixa = recompensa maior** (p228–229). Entrar mais cedo = mais lucro, menor probabilidade; entrar após 2 barras de tendência e always-in claro = mais certo, menos lucro (p228).
- **Não misturar planos**: não usar a probabilidade de "2 pts com risco 2" se vai sair com 1 pt (p228).
- Exemplos numéricos (p229): L2 logo abaixo da EMA descendente em mercado de baixa: **70% de 2 pts com stop 2** -> +0,8 pt/trade; stop 2 / alvo 4 a 50% -> +1 pt/trade; 70% com 4/2 -> +2,1 pts/trade. **Comprar topo de TR logo abaixo da EMA em mercado de baixa forte ~30%** -> evitar. Compra no topo de pullback de 2 pernas à EMA em tendência forte ~70%.
- **Se após entrar o mercado vira TTR (P cai para ~50%), sair perto do 0 a 0**; "a esperança não faz parte do trading" (p229).
- **Scalp de 1 pt arriscando 2 pts com entrada em stop = precisa de ~70% para empatar (com custos) e 80% para lucrar -> estratégia não lucrativa** para quase todos (p229–230).
- **As 3 variáveis mudam a cada tique** — reavaliar: se o trade se torna marginal, sair com o máximo possível; se negativo, sair já (mesmo com perda). **Sair sistematicamente com alvo menor que o planejado = equação negativa** (p230).
- Regra-guia: pullback em tendência com risco 2: alvo 1 -> precisa 80%; alvo 2 -> 60%; alvo 4 -> 40% (p230). Após barra de entrada forte, apertar stop (~4 tiques) e reavaliar alvos.
- **Quando um setup com stop tem equação ruim, o lado oposto com limit pode ser bom**: ex. L1 com barra de sinal doji no fundo do TR -> comprar na mínima da barra de sinal, alvo 6 / risco 6, ~70% (p231).
- Erro clássico (p231): vender contra tendência forte (no 1 min, stop curto) achando recompensa 40 tiques com 30% — mas na prática sai com 4 e adiciona contra -> equação real negativa. **Em tendência, ~70% de probabilidade está do lado da tendência, mesmo perto do topo.** Comprar no meio do barbwire planejando 4 pts mas saindo com 1–2 = perdedor (p231–232).
- **Cuidado com backtests**: resultados 8/10 podem ser só distribuição aleatória (curva de sino); sistemas superotimizados que parecem 80% são 50/50 (p232). **(Crucial para o scanner: validar out-of-sample e com amostras grandes.)**
- **Swing (risco 2, alvo >= 4) com P 40–50% dá a maioria dos traders a melhor chance; ~5 setups/dia; fazer >= 3 trades/dia para pegar um grande vencedor**. Quem quer mais trades: alvo 2 com P >= 60% (p232–233).
- **Sinal de reversão fraco = boa razão para realizar lucro, má razão para entrar contra** (p233).
- **Atalhos práticos (p233)**: rompimento forte de spike de US$2 -> risco até o fundo do spike, alvo = MM (+US$2); ou esperar pullback de 50c (risco 1,50, recompensa 2,50). **Rompimento do topo de TR de US$3 -> stop no fundo do TR (ou abaixo da barra de rompimento), alvo = MM = +altura do TR acima do topo.** **Rompimento abaixo de TR de US$3 com suporte/MM US$3 abaixo -> comprar ~US$3 abaixo para repique que testa o rompimento** — exceto se a queda for spike forte (provável canal): esperar 2ª entrada ou vender pullback.
- Rompimento fraco abaixo do TR (2–3 barras de alta, barras sobrepostas com sombras, 2–3 pernas) -> limit de compra ~1 altura do TR abaixo, risco ~ altura do TR, **>= 60% de testar o ponto de rompimento**; com 2ª entrada e barra de sinal pequena, risco minúsculo para recompensa ~ altura do TR (p233).

### 29.4 Probabilidade direcional (p233–237)
- **Probabilidade direcional de movimento equidistante** ~50% na maior parte do dia (para qualquer X razoável vs. o range das últimas 5–10 barras) (p233).
- **Pullback em tendência forte: P(+X antes de −X) ~60%, mas P(+2X antes de −X) só um pouco menor (~57%) -> por isso entrar em pullbacks é tão bom** (p233–234).
- Reversão forte de LT longa (50–200 barras) após bandeira final de baixa: 60/40 de +4 antes de −2 -> +1,6 pt/trade (p234).
- **Pergunta-chave antes de todo trade: "É provável (>= 60%) que eu ganhe pelo menos o que posso perder?"** Se sim, trade razoável (p234).
- **Comprar perto do topo de TR**: P(+10 antes de −10) ~30%, mas se o rompimento bem-sucedido for a um ímã 6x mais longe, ainda é positivo (+11 tiques/trade) (p234).
- **Desequilíbrios (>50%) existem quando o mercado está em tendência ou no topo/fundo de TR** — temporários (p234). Ex.: L2 na EMA em tendência forte de baixa: barra de sinal 6 tiques, risco 8; durante o rompimento P(−8 antes de +8) ~70% -> +3,2 tiques/trade (p234).
- **Procedimento para iniciantes**: risco = barra de sinal + 2 tiques; **alvo >= risco**; se o setup "parece bom", assumir P >= 60% -> equação positiva (p234–235).
- **TR bem definido de US$1 (IBM)**: comprar acima de pequena barra de reversão no fundo -> P(+50c antes de −50c) >= 60%, brevemente 70%; perto do meio cai para 50%; perto do topo cai para ~40%. O mercado demora a achar o 50%, mas é rápido em reconhecer que foi longe demais. **TR pequeno (20c): mesmo 70% não paga (slippage, custos)** (p235).
- **TTR em modo de rompimento**: comprar a 2 tiques do fundo arriscando ~5 tiques para alvo 15–20 tiques no rompimento, P ~50% -> +7,5 tiques/trade teórico; mas difícil psicologicamente; mercado passa pouco tempo nos extremos (Market Profile) e testa o topo com barras de alta fortes + reversão com barra de sinal grande (entrada perto do meio) (p235).
- **Ao testar o extremo do TR**: P(reversão) >= 60%; barra de rompimento pequena que para numa linha de canal/resistência -> P(falha) ~65%; próxima barra de reversão forte -> ~70%. **Barra de rompimento forte -> P(reversão) 50%; forte continuidade nas barras seguintes -> 30% (= 70% a favor do spike)** (p235). Spike de 3 barras de US$2 saindo de bandeira: 70% de +2 antes de −2; spike de US$4: >= 60% de +4 (p235).
- **"Na maioria dos gráficos, a maioria dos trades tem 40–60%; em ~90% do tempo P ~50%; nos outros ~10% (spikes, extremos de TR) há vantagem"** (p236).
- **Ciclo spike -> canal -> TR**: no spike >= 60%; no canal a probabilidade se desgasta; **no alvo do MM (topo do canal = topo do TR incipiente) ~60% a favor da queda até o fundo do canal**; meio ~50%; **fundo do canal/pullback de baixa inclinação ~60% a favor da alta**; suporte fraco ~56% (p236–237).
- **Com P ~50%, recompensa tem que ser > risco**; stop > alvo com 50% = esperança zero (demonstração) (p237).
- **Por que MMs funcionam com precisão**: são o **mínimo** necessário para que instituições tenham equação positiva (risco = altura do spike, P ~60%); por isso muitos realizam ali; a maioria dos alvos "falha" porque em mercado forte seguram além (p237).
- **80% das tentativas de reversão falham -> pullbacks têm ~80% de chance de trade lucrativo a favor da tendência** (com stop mais largo/escalonamento um setup de 60% pode virar 80%; 60% de +2/−2 pode ser 90% de +4/−8) (p237).
- **MM de spike pelos corpos é mais confiável** (abertura da 1ª -> fechamento da última); se excedido, usar máxima da 1ª -> mínima da última (p238). O alvo cresce com o spike enquanto o risco fica fixo (stop 1 tique além da 1ª barra) (p238).
- Exemplo Fig. 25.2 (p239): **dia de TR: TR da 1ª metade ~metade do range diário; rompimento após 1–2 h -> ~MM para baixo e depois TR inferior** -> comprar limit ~altura do TR abaixo do ponto de rompimento (P ~60%, até 70% com repetidas barras de reversão de alta = pressão compradora cumulativa); o TR inferior tende a testar o ponto de rompimento (fechar o gap); testes devem chegar a <= 2 tiques.
- **Scalpers perdem tendências de 10+ barras** com setups de baixa probabilidade; swing traders lucram nesses dias (poucos por mês) (p239–241). Scalper que tomou pullback de 7 tiques num risco de 8 deve elevar o alvo para >= 8 (p239–240).
- **Barras de baixa com sombras inferiores proeminentes = canal de baixa fraco (compradores nas mínimas)** — não vender no fundo de canal fraco (p241).

## 30. Cap. 28 — Duas razões para um trade (p242–247)
- **Precisa de 2 razões para entrar; quaisquer 2 servem** (p242).
- **Em tendência acentuada, nunca operar contra (mesmo H2/L2 ou H4/L4) sem antes quebra significativa de LT ou overshoot + reversão da linha de canal**; melhor se a quebra teve momentum forte (não só desvio lateral). **Contagem de barras não é padrão de reversão de tendência**: H2 é entrada em tendência de alta ou no fundo de TR, não em tendência de baixa (p242).
- **Casos em que basta 1 razão**: (a) em tendência forte, todo pullback que não segue clímax ou reversão de bandeira final (mesmo H1/L1 no spike); (b) overshoot de linha de canal + boa barra de reversão; (c) **2ª entrada** (a 1ª já é a 1ª razão) (p242).
- **Lista de razões (escolher >= 2)** (p242–243): boa barra de sinal (reversão, reversão de 2 barras, ii); pullback à EMA em tendência (especialmente 2 pernas: H2/L2); pullback de rompimento; pullback em mercado claramente always-in; teste de S/R (LT, linha de canal, teste de rompimento, MM); linhas duelantes; H2 em alta ou fundo de TR (**todo fundo duplo = H2**); L2 em baixa ou topo de TR (**todo topo duplo = L2**); **a maioria dos fundos vem de micro fundos duplos, fundos duplos ou reversões de bandeira final de baixa; topos idem**; H3 (bandeira em cunha) em alta / L3 em baixa; H4/L4 bandeiras; barra de sinal H1/H2 fraca no topo de TR (para vender) / L1/L2 fraca no fundo (para comprar); **falha de qualquer coisa** (rompimento de topo/fundo, de bandeira, reversão de overshoot de LT/linha de canal, falha em atingir alvo — reversão após 5 ou 9 tiques).
- Antecipar trades: rompimento abaixo de grande fundo de swing + 2 pernas para baixo ou overshoot de linha de canal -> procurar reversão; após barra outside ou barbwire, procurar pequena barra no extremo para fade; em tendência forte, preparar 1º pullback à EMA, pullback de 2 pernas à EMA e 1ª MA gap bar (p242).
- Barra de reversão com fechamento só um pouco acima do meio = sinal fraco; esperar 2ª entrada (p243). **Canal de baixa estreito após spike forte -> esperar quebra de LT antes de comprar** (p244). **Vender abaixo de barra de baixa forte é sempre mais confiável** (p244).
- **Em TTR, nunca entrar até: barra de tendência grande sair do padrão por >= 3 tiques e você esperar ela falhar; ou barra pequena perto do topo/fundo para fade.** Reversão de 2 barras sobreposta com barra de sinal grande forçando vender o TR = armadilha (p244–245).
- **Falsos rompimentos de 1 tique que ocorrem no 1º–2º minuto da barra de 5 min são comuns; rompimentos no último minuto da barra são mais confiáveis** (p245).
- Ação em tendência forte: limit nos 2 primeiros testes da EMA (p245).
- **Cunha em canal íngreme = reversão menos confiável; esperar topo mais baixo** e vender abaixo de barra de baixa forte, mesmo várias barras depois. Após cunha + bandeira final, correção lateral de 2 pernas; **a máxima da cunha geralmente não é excedida até a correção completar** -> limit 1–2 tiques acima do padrão com stop acima da cunha (p246).
- Contra-tendência experiente em tendência de baixa: meia posição com limit no fundo anterior, 2ª ordem 2 pts abaixo; alvo 1 pt; ou sair no preço da 1ª entrada (p247).

## 31. Cap. 29 — Entrando com stops (p248)
- **Entrada com stop = abordagem mais confiável** (mercado já indo a seu favor); iniciantes devem se restringir a ela até serem lucrativos.
- **Padrão**: venda: sell stop 1 tique abaixo da mínima da barra anterior (vira barra de sinal ao executar); **stop de proteção 1 tique acima da máxima da barra de sinal**; após o fechamento da barra de entrada, **se tiver corpo forte a favor, apertar o stop para 1 tique acima da barra de entrada**; senão manter acima da barra de sinal até o mercado andar forte (p248).
- **Para scalp de 4 tiques é preciso movimento de 6 tiques além da barra de sinal; para 8 tiques, 10 tiques** (p248).

## 32. Cap. 30 — Entrando com limit (p249–261)
- **Contexto dita stop vs. limit**: spike forte -> stops acima das barras / a mercado; fase de canal inicial -> ainda stops (H1/H2); **canal com ~10+ barras -> limit abaixo da barra anterior**; **canal com ~20 barras perto de resistência -> parar de comprar e vender com limit acima da máxima da barra anterior** (realizar + escalonar vendas). Perna de baixa fraca: não vender com stop perto do fundo; vender L1/L2 perto da EMA ou com limit acima da barra anterior (p249).
- Limit = apostar que o movimento vai reverter (certo mas cedo); operar menor e adicionar (p249).
- **Lista de situações para limit (p249–252)** — resumo: limit no fechamento da barra de tendência forte anterior num spike; comprar pullback de 2 tiques dentro da barra no spike; **limit logo acima da máxima da barra antes da barra de rompimento (ponto de rompimento / micro gap)**; limit na/abaixo da mínima da barra anterior em spike forte; **limit 1 tique acima do fundo de um ii em tendência de alta forte, risco 2 para 4+ (~60%)**; barra de alta não muito grande que vira always-in -> limit 1 tique acima da máxima da barra anterior (antecipando measuring gap); faixa de abertura com 2 barras de alta fortes -> limit na mínima da barra anterior; comprar spike de baixa no fundo do TR / vender spike de alta no topo; **spike de baixa em mercado de alta (vendedores precisam de barra de baixa seguinte para confirmar) -> comprar o fechamento da última barra de baixa, abaixo dela e no fechamento da barra seguinte se não tiver corpo de baixa** (pullback mais provável que spike & canal); **barra de baixa grande = provável clímax de venda (fim de baixa ou pullback em alta) -> comprar fechamento, abaixo da mínima e fechamento da seguinte**; pullback após spike de 1 barra -> limit 1–2 tiques acima do fundo do spike; **2ª perna provável após spike -> limit 1–2 tiques acima da barra de sinal original, mesmo dezenas de barras depois**; limit abaixo da mínima da barra anterior em canal de alta (estágios iniciais); **comprar abaixo da mínima anterior e abaixo do fundo mais baixo em canal de baixa em estágio final com pressão compradora crescente**; limit abaixo da barra anterior em micro canal de alta (1º rompimento do micro canal falha); spike & canal: comprar o teste de baixo momentum do fundo do canal; comprar fechamento de baixa após >= 2 barras de alta no início de swing forte; comprar na/abaixo da mínima de swing anterior no fundo do TR; **limit 1–2 tiques acima do fundo de uma borda de alta (2+ barras com mínimas idênticas)**; limit na/abaixo de barra de sinal L1/L2 fraca no fundo do TR ou em nova alta pós-reversão forte; **em alta forte, fade de scalps de venda: limit ~4 tiques abaixo da barra de sinal de baixa, risco ~3** (vendedores não atingem os 6 tiques); **em alta muito forte sem passar a EMA por mais de 2 tiques: comprar o fechamento da 1ª pequena barra de baixa que fecha 1–2 tiques abaixo da EMA**; limit na/abaixo da barra anterior em bandeira de alta "quieta" na EMA; comprar fechamento de baixa em bandeira quieta na EMA; comprar pullback à EMA (20 gap bars) em tendência forte; comprar pullback à EMA íngreme e escalonar abaixo; comprar abaixo de barra de alta que rompe bandeira (antecipando pullback de rompimento); **comprar/adicionar no teste de rompimento (tentativa de estopar breakevens)**; limit em torno do fundo anterior num pullback de possível bandeira em fundo duplo; **escada: limit para o pullback ao degrau anterior** (ex.: escada de baixa, range diário 12 -> limit 4 pts abaixo do fundo para teste); **dia de TR em tendência: limit 1 tique antes do MM (altura do TR inferior) para teste do outro lado**; dia de TR em spike perto do topo: vender fechamento de baixa na metade superior da barra anterior, especialmente 2ª tentativa; dia de TR em tendência de alta: vender perto/acima da máxima de barra de alta grande perto do MM (clímax) com pressão vendedora nas últimas 5–10 barras; **dia de TR de alta (range ~10): vender limit 4–6 pts acima da máxima do TR inferior para teste do rompimento**; canal de baixa forte formando reversão de 2 barras para cima: vender quando a 2ª barra sobe até a máxima da 1ª; comprar teste de LTA com limit (melhor acima de barra de reversão); comprar cunha descendente no teste da linha de canal; **comprar abaixo de um fundo (pullback em alta) esperando falha -> H2 ou bandeira em cunha**; **comprar pullback de 60–70% do topo atual, risco até fundo mais baixo, alvo novo topo (recompensa ~2x, P ~60%)**. (Todos com espelho para venda.)
- **Mercado forte: compradores compram tudo (fechamentos de barras de baixa, abaixo de mínimas, suportes) e também acima das barras** — oposto do comportamento em mercado de baixa (p252).
- **Ordem a mercado = limit sem se importar com 1–2 tiques** (p252).
- **Movimento além da máxima/mínima da barra anterior é um teste; a maioria falha**; mercado é puxado de volta (ex.: para o corpo da barra anterior). **Comprar todo rompimento acima de barras e vender todo abaixo = perdedor**, assim como fazer fade cego de todos (p252–253).
- Vácuo: vendedores fortes em tendência de baixa esperam rali "acima de algo" (LTB, topo, máxima da barra anterior) -> rompimento de 1–2 tiques acima da barra anterior encontra vendedores (p252). Em alta, compradores esperam com limit na mínima da barra anterior (p252).
- **Na maior parte do tempo stop vs. limit ~50/50, mas frequentemente 60%+ a favor de um deles; ~10 setups de stop razoáveis por dia vs. 20+ setups de limit** (p253).
- **Adicionar com limit 1 tique acima da mínima da barra de entrada** (2ª entrada após quebra da LTB + barra de reversão forte) quando o mercado testa essa mínima — dinheiro inteligente defende (se estopar, vira 2ª entrada fracassada -> 2 pernas para baixo) (p253).
- **Spike forte sozinho não justifica comprar pullback com limit**: considerar se foi clímax exaustivo (pode haver 10 barras e 2 pernas de queda) (p253).
- **Fibonacci/bandas com limit = contra a tendência atual; melhor esperar barra fechar com corpo a favor no nível e entrar com stop 1 tique acima** (mantém o nível a favor, evita perdedores) (p253).
- **Em tendência de alta forte, L1/L2 não existem (são armadilhas)**: comprar na/abaixo da mínima da barra de pausa/barra de baixa fraca (mini vácuo); **topos em tendências fortes viram bandeiras em ~80% dos casos** (p253).
- Após reversão (ex.: fundo de cunha em dia de TR): **L1 e L2 subsequentes devem falhar** -> limit de compra na mínima ou 1–3 tiques abaixo da barra de sinal de venda, risco ~4 tiques (Emini) (p253–254). Se após o fundo de cunha há barra de reversão grande + 2ª barra de alta forte -> 2 pernas prováveis; L1 com barra pequena/doji = venda fraca (p254).
- **"A maioria dos topos é alguma forma de topo duplo envolvendo falha de H1/H2/triângulo, que vira bandeira final; a maioria dos fundos vem de L1/L2 fracassada ou rompimento de triângulo"** -> limit de venda na/acima da barra de sinal da bandeira esperada falhar (p254).
- Exemplo GOOG: reversão de 1 barra que corre US$3 -> limit ~50% (US$1,50) abaixo do topo da 1ª perna, risco abaixo da mínima da cunha (p254).
- **Fade de canais com limit**: TR com S/R bem definidos testados várias vezes = canal mais seguro para fade; stop além da linha o suficiente para permitir o falso rompimento. **Não fazer fade de canal nas últimas 2 h** (p254). **Em canal de alta, fazer o oposto de L1–L4: limit de compra na/abaixo da barra de sinal de venda** (p254).
- **Escalonar contra-tendência: sair (ou reverter a favor) no 2º movimento contra você** — escalonando vendas numa alta, sair/reverter na H2 (especialmente perto da EMA) (p255).
- Scalp QQQ de 10 tiques precisa de 12 (p255). **Setup fraco frequentemente dá 2ª entrada, que é forte** (p255).
- **Teste de rompimento da barra de sinal de reversão**: após reversão forte de bandeira final e rali de horas, o mercado frequentemente testa a **1–2 tiques da máxima da barra de sinal** -> limit ali, risco 4–6 tiques, ~50% de 4+ pts (p255).
- Em ações com tendência forte, limit na EMA reduz risco sem mudar % (p255).
- Exemplos Fig. 28.1 (p255–256): doji logo abaixo da EMA após rali forte = venda ruim -> comprar abaixo dela para teste da EMA; **após 2º clímax de compra, 2 pernas laterais/baixa** -> vender limit na máxima da barra seguinte; faixa de abertura = metade do range médio -> **MM exato abaixo (abertura da barra 1 -> máxima da barra 5)**; dia com abertura no meio -> pode voltar à abertura (doji diário). **TTR na mínima de um dia de TR em tendência**: comprar 1 tique acima do fundo duplo (risco ~3 tiques) para teste do fundo do TR superior (~70% se romper; 50/50 de romper) -> excelente risco/recompensa; P sobe para 70% após fundos mais altos e pullback de rompimento; spike de 5 barras -> 60% de MM (abertura da 1ª -> fechamento da 3ª).
- Barra de reversão de baixa num spike forte de alta: comprar na mínima dela (H1 esperada acima) (p256).
- Fig. 28.2 (dias tranquilos de fim de ano): **sell-off com pressão compradora (sombras inferiores crescentes) não é spike forte -> L1 deve falhar**; fundo de triângulo em expansão + quebra de LTA de 2 semanas = linhas duelantes; após virar always-in, **limit 1 tique acima da máxima da barra antes da barra de rompimento** (risco 2 tiques, 30–40% mas alvo = MM do measuring gap ~6–12 tiques); micro canal de alta -> limit na mínima da barra anterior repetidamente; spike de 2 barras de baixa seguido de doji = não confirmou -> comprar ao redor do fechamento; venda limit 1 tique abaixo da máxima do spike de baixa com stop 2 tiques acima; **spike de baixa impressionante sem continuidade imediata = armadilha**; **pullback de 60–70% (Fibonacci 62%) com stop abaixo do fundo da alta e alvo novo topo = recompensa 2x, ~60%** (p257–258).
- Fig. 28.3 (SPY 60 min): **fundo duplo de bandeira "imperfeito" (2º fundo acima do 1º) = compradores com medo de perder a tendência** (p258–259). Compras repetidas no mesmo preço (rompimento anterior) = defesa; **topo de cunha + resistência de topo anterior (topo duplo grande) = linhas duelantes de venda** (p259).
- **Fade de testes de LT/linha de canal com limit é menos lucrativo do que entrar com stop após o mercado se afastar da linha** (troca de pouco lucro por muito mais certeza) (p260). Barra de rompimento fraca acima de micro LT de baixa: vender acima dela; se não alcança, sell stop abaixo dela (vendedores presos) (p260).
- **Comprar repetidamente em linhas de canal numa tendência de baixa forte esperando fundo de cunha = estratégia perdedora**; "se você está redesenhando linhas de canal enquanto o mercado cai, está perdendo uma tendência forte" (p260). Após grande clímax de venda, scalp de compra até a EMA aceitável; L3 (bandeira de baixa em cunha) perto da EMA com barra de reversão de baixa = venda especialmente confiável (p261).

## 33. Cap. 31 — Stops de proteção e trailing stops (p262–270)
- ~60% de certeza -> sempre ter plano para os outros 40%; **stop real no mercado, não mental** (p262).
- Tipos: **money stop** (N tiques/dólares) e **price action stop** (além de barra/nível). Ex.: stop 2 pts normal; 3 pts se barras grandes; barra de sinal enorme (6 pts) -> operar menos ou money stop ~3 pts. Usar um método padrão na maioria das vezes (p262).
- Scalps: sem tolerância a pullback. **Em canal: permitir pullbacks até o fundo de swing mais recente do canal** (stop abaixo dele); experientes adicionam com limit na mínima da barra anterior (p262).
- **Trailing stop em swing**: após novo topo de swing, mover para 1 tique abaixo do fundo de swing mais recente (ou breakeven se o pullback testou a entrada) (p262).
- **Dia de TR em tendência**: rompimento de 2 barras + pullback de 1 barra + máxima fraca -> a mínima dessa barra será o fundo do TR superior e **o mercado costuma voltar abaixo dela (testa o gap/topo do TR inferior)** -> não colocar trailing ali; **sair no fechamento de barra de alta perto do topo do TR em formação** (p262).
- Swing: tolerar queda abaixo da barra de sinal se a premissa (ex.: H2 que evolui para H3 cunha) segue válida; ou meia posição no 1º sinal duvidoso e posição maior no 2º sinal forte (p262–263).
- **Stop largo por tolerância de pullback**: Emini range < 15 pts -> pullbacks em tendência raramente > 7 pts; **tendência válida enquanto o pullback não exceder ~50–75% do range médio diário**; risco = (tolerância − distância já recuada), alvo = teste do topo (p263).
- **Em TR, realizar perto do topo da faixa em vez de depender de trailing stop** (pullbacks vão furar fundos anteriores) (p263).
- **Stop inicial = 1 tique além da barra de sinal até a barra de entrada fechar; se a barra de entrada é forte, mover para 1–2 tiques além da barra de entrada; se é doji, manter o stop original** (doji = TR de 1 barra; não sair abaixo de um TR) (p263, p266, p270). Experientes podem adicionar 1–2 tiques abaixo de barra de entrada doji pequena numa possível nova alta (p263).
- Barra de entrada vira reversão contra: em compra de pullback em tendência -> manter stop abaixo da barra de sinal; **em compra de reversão contra tendência de baixa forte -> sair se o preço passar abaixo da barra de entrada de baixa** (talvez reverter) (p263). "Comprar em tendência de baixa antes de evidência de controle comprador = estratégia perdedora; a maioria das reversões vira bandeira de baixa" (p263).
- **Barras muito grandes: money stop (~8 tiques no Emini 5 min) ou ~70% de pullback da barra de sinal (stop a ~30% da distância entre o extremo da barra de sinal e a entrada)**; money stop proporcional ao tamanho das barras (p263). Após 1º alvo/parcial, stop ~breakeven. **"Os melhores trades não voltam ao breakeven e raramente vão mais de 4 tiques contra a entrada"** (p263).
- Reversão muito confiável (barra grande + confluência): stop além da barra de sinal, reduzir tamanho para manter risco (p263).
- **Pullback quieto com barras pequenas (ex.: L4 doji num canal de alta lento até a EMA num dia de baixa): usar money stop habitual (8 tiques) mesmo além da barra de sinal** — rompimentos de canal estreito têm pullbacks (p264).
- **"Você entraria agora se estivesse flat?" — se não, sair; premissa inválida -> sair, mesmo com perda** (p264). Mercado volátil: 1/2 a 1/4 do tamanho (p264).
- **Regra "o mercado recompensa com o mesmo número de pontos que exigiu de risco"**: se o trade recuou 11 tiques antes de voltar (stop necessário = 12), **elevar o alvo para ~11–12 tiques** e o stop para 1 tique além desse pullback (p264, p268).
- Reverter no stop só em contexto adequado (ex.: L2 fracassada numa reversão para alta); **stop atingido dentro de TTR não é reversão** (p264).
- **Tamanho do stop do dia: observar o maior stop necessário na 1ª hora — costuma ser o stop ideal pelo resto do dia** (Emini range 10–15: 8 tiques funciona na maioria dos dias) (p264, p269). *Cripto: calibrar o stop pelo maior pullback necessário no início da sessão ou por ATR.*
- **Situações que exigem stop grande (posição menor)**: (1) entrar no fechamento de spike forte a favor (stop teórico abaixo do spike) — realisticamente escalonar e stop menor; (2) **comprar o fechamento do 3º clímax de venda consecutivo (maior barra de baixa do dia, fechando perto da mínima)**: alvo = máxima da barra de baixa grande (60%), **stop = tamanho da barra de baixa** (p264).
- Fade de canais fracos com 1/4 do tamanho, limit no topo anterior e adicionando nos próximos 2–3 topos; stop final ~8 pts; alvo = teste da 1ª entrada (p264).
- **Fade de rompimentos em escadas e dias de TR em tendência**: rompimento de ~5 pts (range 10–15) -> fade arriscando 5 para 5, esperando teste do rompimento; **>60%** (p264–265).
- **Fade de barra grande após tendência de ~30 barras** (clímax): se a barra seguinte ao pullback de 1–2 barras também é grande de alta, vender no fechamento; stop = máxima (risco = altura da barra); alvo 1 = fundo da barra; alvo 2 = MM para baixo (p265).
- Stop de 5 pts em pullbacks (amigo): alvo = teste do extremo (3–5 pts); estratégia a favor da tendência com P >= 60% (p265).
- **Após meio caminho do alvo de swing, mover stop para breakeven** (p265). Instituições não caçam stops de pequenos (p265).
- Exemplo Fig. 29.1 (p265–267): risco grande -> money stop ou ~60% da barra de sinal. **Reversões na 1ª hora são geralmente confiáveis, especialmente após fechamento forte no dia anterior.** **Não apertar o stop acima da barra mais recente até ~4 tiques a favor ou barra com corpo forte.** **"Ao entrar no 5 min, confie no stop de 5 min"** (não olhar o 1 min). H1 em ii no topo de canal após spike, perto de MM e topo duplo = não é compra (60/40 contra o rompimento do TR) -> fade com limit na máxima. **L2 fracassada com falha de 5 tiques -> reverter para compra 1 tique acima da barra de entrada; sempre que vendido e surge H2 na EMA com barra de sinal -> sair e reverter.** **L2 em tendência de alta = setup de compra (limit abaixo da L2).**
- Trailing em tendência forte: abaixo do fundo mais recente após cada novo topo; **MM do spike inicial = onde instituições realizam**; **3 pernas no canal (variante de cunha) + clímax de 2 barras grandes longe da EMA -> correção de 10 barras e 2 pernas**; nesse ponto mudar para estilo TR e sair no topo da faixa em vez de esperar o trailing (p267).
- Exemplo Fig. 29.3: pullback de 16 tiques após entrada -> mercado sobe exatamente 16 tiques (ordem limit 15 tiques) (p268). Swing com risco 14 tiques -> alvo 28 (2x) (p269).
- Fig. 29.4: o 1º trade do dia mostrou que precisava de 9 tiques -> usar 9 pelo resto do dia; stops atingidos por 1 tique são comuns (p269). **Não apertar stop após dojis pequenos perto da entrada** (TR de 1 barra; o mercado costuma furar 1–2 tiques) (p270). **Em dia de gap de alta com pullback perto da EMA, frequentemente há 2ª perna que testa mais de perto — costuma ser a mínima do dia** (p270).

## 34. Cap. 32 — Realização de lucro e alvos (p271–275)
- **Todos os pullbacks e reversões começam com realização de lucro**; experientes saem na força e reentram no pullback (p271).
- **Realização em força**: no fechamento e logo acima de barra de alta grande, no fechamento das 1–2 barras seguintes (especialmente pequenas ou de baixa), e abaixo da mínima da barra seguinte -> por isso **barras de tendência grandes (tentativas de rompimento) costumam ser seguidas de barras pequenas e pullbacks** (p271).
- Compradores e vendedores esperam a **barra de baixa relativamente grande que rompe para nova mínima** numa baixa enfraquecendo e compram perto do fechamento dela (p271).
- Alvos podem ser OCO (stop + limit). Sempre conferir posição/ordens na corretora (p271–272).
- **Iniciantes: P >= 60% e recompensa >= risco, idealmente 2x** (poucas vezes por dia). Exemplos: EURUSD range 100 pips, vários movimentos de 20 pips com stop de 10 não atingido -> pullback à EMA: 60% de 20 com risco 10. T-Note: range 32 tiques, barras de sinal de 4 -> risco 6, alvo 8 (p272).
- **Scalp = acredita que o lucro é limitado (sem tendência ou contra-tendência)**. Em tendência, **80% das tentativas de reversão falham** -> vender contra com stop numa barra de reversão pequena no topo de tendência forte é perdedor (compradores com limit na mínima; Emini precisa de 10 tiques para lucrar 8) (p272).
- **Escalonar saída em tendência forte**: sair de ~1/2 com **2x o stop inicial**, trailing no resto; mais 1/4 com **3x**; último 1/4 até sinal oposto forte ou fechamento do dia. Ou sair tudo com 2x (p272).
- **Equação favorável mas mais fraca -> apertar stop ou sair com lucro menor; neutra -> sair rápido; negativa -> sair a mercado já** (p272).
- **Alvo de lucro no mercado (limit) protege de si mesmo** (p272).
- **Pullbacks terminam numa confluência de suportes** (H2, cunha, 62%, teste de rompimento, EMA) (p273). **Topo do início do canal de baixa (máxima da barra 9) = resistência esperada (bandeira em topo duplo)**; "exatamente 10 tiques acima da barra de sinal" = necessário para 8 de lucro -> tudo é matemático (p273).
- EURUSD: risco = barra de sinal + 2 tiques; **alvo ~2x (20 pips)**; após spike forte de rompimento, mudar o plano para sair parcial (1/2 em 20, 1/4 em +10–20, resto até o fim do dia ou sinal oposto) (p274). Em TR, scalpear tudo (p274). **Dias de forte tendência de alta tendem a fazer nova máxima no fechamento** -> segurar 1/4–1/2 (p274–275).

## 35. Cap. 33 — Escalonamento (scaling in/out) (p276–284)
- Escalonar saída (parcial + breakeven) é comum; **escalonar entrada** é usado por indivíduos ao entrar **a favor da tendência num pullback** e ao fazer **fade dos extremos de TR**; **escalonar numa reversão potencial é muito arriscado** — melhor sair e procurar 2ª entrada (p276).
- **"Pressionar" (adicionar com lucro)**: em canal de alta adicionar a cada pullback; em spike forte, adicionar barra a barra (p276).
- Amigo: vende com limit no topo mais recente de canal fraco (spike & canal), adiciona nos próximos 1–2 topos (>= 2 pts acima), alvo = **início do canal** (p276).
- **"Nunca adicionar a posição perdedora" refere-se a trades contra-tendência**; instituições escalonam a favor da tendência (como DCA). Trader que adiciona contra numa queda forte acaba saindo no clímax de venda com perda enorme pouco antes do repique (p277).
- **Onde escalonar (p277)**: pequeno pullback de spike forte; quando um canal contra-tendência (pullback) se estende (ex.: comprar mais abaixo da EMA num pullback de tendência de alta); **intervalos fixos em pullbacks de tendência forte, baseados no tamanho dos pullbacks anteriores e no range médio diário**; dentro de TR; contra-tendência durante rompimento quando um pullback ao ponto de rompimento é provável (dia de canal amplo, dia de TR, escada).
- Variáveis: nº de entradas, tamanhos (manter o risco final dentro da tolerância), preços, risco (stop vs. preço médio), recompensa, probabilidade (p277–278).
- **Regra: ao operar contra a tendência, sair (e considerar reverter) no 2º movimento contra você** (ex.: comprando fundo numa baixa e surge L2 perto da EMA com barra de sinal de baixa). **Não escalonar contra tendência na última hora; não escalonar contra tendência forte — em tendência forte só adicionar a favor** (p278).
- **Guia de espaçamento**: 2ª entrada na distância onde estaria o stop normal (stop 30c -> comprar mais 30c abaixo e stop de tudo 30c abaixo dessa 2ª, ou seja 60c abaixo da 1ª) (p278).
- **Ter o plano de escalonamento definido desde o início** e saber o stop final e preço médio (p278).
- Abordagem menos arriscada: tratar cada novo sinal válido como trade separado com seu próprio stop/alvo (p278–279). Ex. Fig. 31.1: 3 entradas sucessivas (H2, pullback de rompimento, novo pullback) todas scalpeadas com 1 pt no spike (p279).
- Ex. Fig. 31.2 (SPY): bandeira em cunha na EMA: meia posição acima da barra inside, 2ª metade 10c abaixo, stop de tudo 11c abaixo da 2ª; risco 16c para 23c com >= 60%; **trader experiente nunca vende o fundo de um TR numa tendência de alta** (p280). Escalonar saída: 1/4 em 2x risco, depois trailing abaixo do fundo mais recente, 1/4 em 4x... (p281).
- **Instituições defendem a 2ª entrada no fundo de TR**: compram mais a cada pequeno mergulho acima do stop (mínima da barra de entrada); stops perdidos por 1 tique repetidamente (p281).
- **Dia de TR em tendência: comprar perto do fundo de cada faixa e vender perto do topo** (p281).
- **Canal de alta forte: nunca escalonar contra** (se acredita que vai subir, venderá mais caro esperando) (p282). Compradores de momentum adicionam na 1ª MA gap bar e saem das entradas altas no breakeven (p282). MM do topo duplo para baixo como alvo do pullback (p282).
- **Pullback à EMA íngreme: escalonar abaixo da EMA; o repique costuma parar exatamente no preço da 1ª entrada (todos saem no 0 a 0)** -> ali vira resistência (p283). Em possível reversão, começar a comprar abaixo da EMA (1–2 pts) e escalonar a cada ponto; risco total ~metade do range médio (p283).
- **Escalonar durante spikes** (p284–285): vender fechamentos de barras de baixa fortes do spike **até aparecer barra com sombra grande ou corpo contrário (barra de pausa) — então parar de vender fechamentos**; mesmo após a 1ª pausa, o mercado costuma descer de novo em poucas barras (scalp). 2 dojis no topo de gap de abertura + barra de baixa forte = compradores desistiram. **Spikes de 2 barras nos primeiros 30 min são comuns e frequentemente seguidos de pullback.** Método: contrato de scalp sai e volta no fechamento das barras do spike; adicionar contratos com stop de breakeven nos anteriores mantendo o risco total.
- **Escalonar contra em canais só se o dia não for de tendência forte** (p285): queda ~metade do range médio + rompimento -> provável dia de TR em tendência -> vender acima de topos do canal escalonando para teste do ponto de rompimento. **Canais normalmente corrigem >= 10 barras após 3 empurrões** -> no 3º empurrão realizar, não adicionar (p285–286).
- **Stops em números redondos (2, 3, 4, 5 pts) são atingidos no tique e o mercado reverte** -> quem escalona coloca a ordem de adicionar 1 tique antes do stop óbvio (p286). (= **liquidez de stops óbvios / sweep**.)
- **TR inicial ~metade do range médio + rompimento -> >= 60% de dia de TR em tendência e teste do ponto de rompimento** -> limit de compra 2, 3, 4 pts abaixo (p286).
- **Canais em tendência**: cada novo fundo é seguido de pullback acima da mínima antiga -> escalonar abaixo de cada mínima; estimar o próximo excesso pelo anterior (ex.: 5 tiques); escada encolhida (p286–287). Após L2, sair e talvez reverter (p287).

## 36. Cap. 34 — Presos dentro/fora (p288–289)
- Stop de entrada pode prender num trade ruim; stop de proteção pode prender fora de um bom; programas institucionais variados (hedge, parciais) (p288).
- Fig. 32.1 (p289) — **lista de armadilhas operáveis (fade com limit)**: venda acionada abaixo de barra de baixa no gap de alta após barra 1 forte -> comprar acima dela (vendedores presos); 3ª barra de baixa a partir de possível máxima -> fundo mais alto + 2ª perna até a EMA prováveis -> vender limit na máxima; **após canal de baixa íngreme, 1ª barra de alta na EMA = vender limit na máxima (scalp)**; após movimento muito forte, 1ª tentativa de repique = ruim -> vender limit na máxima esperando nova mínima; **L1 fora de spike forte = venda ruim -> limit de compra na mínima**; **L2 fraca após clímax consecutivos (correção de 10 barras esperada) -> comprar a mínima** (outside de alta prende vendedores); L1 após 5 barras de alta -> comprar a mínima; **H1 em spike fraco (corpos pequenos, sombras) -> vender limit na máxima**; L2 em canal forte lateral por 6 barras -> comprar a mínima; L2 fracassada que seria o 3º empurrão com barras pequenas laterais -> vender a máxima; **H2 doji grande no meio de TR (obriga comprar no topo) -> vender a máxima**.

---

# PARTE FINAL — SÍNTESE OPERACIONAL

## A. Probabilidades citadas pelo autor (tabela-resumo)
| Situação | Probabilidade citada | Página |
|---|---|---|
| Mercado na maior parte do dia / meio do TR (movimento equidistante) | ~50% | p19, p174, p233 |
| "Provavelmente" | >= 60% | p11 |
| Tendência forte (direcional) | 60–70% | p19, p174 |
| Rompimento forte: atingir MM = altura do spike | >= 60%, às vezes 70–80% | p33, p39, p53 |
| Continuação após rompimento (período de "certeza") | ~60–70% | p45 |
| Até os rompimentos mais fortes falham | ~30% | p46 |
| Tentativas de reversão de tendência que falham | ~80% | p86, p104, p237 |
| Tentativas de sair de um TR que falham | ~80% | p86, p171, p178, p188 |
| Uma tentativa individual de rompimento de TR ter sucesso | ~20% | p173 |
| TR numa tendência acabar rompendo a favor da tendência | ~60% | p173 |
| Perto do topo do TR, cair X antes de subir X | >= 60% | p174 |
| Fundo de TR após tendência de alta forte sem topo claro | 70–80% a favor da alta | p174 |
| Meio do TR com tendência forte anterior | 53–55% | p174 |
| TTR: rompimento a favor da tendência anterior | 51–55% (50% após reversão climática) | p194 |
| TTR numa alta: 1º rompimento para baixo | 45–49% | p200 |
| Compra perto do topo do TR (P de +X antes de −X) | ~30% | p234 |
| Teste do extremo do TR: reversão | >= 60%; ~65% se barra de rompimento pequena em resistência; ~70% com barra de reversão forte | p235 |
| Barra de rompimento forte: P(reversão) | ~50%; ~30% se houver forte continuidade | p235 |
| H2/L2 na EMA em tendência; bandeira em cunha; pullback de rompimento; H1/L1 em spike forte; topo/fundo de TR (2ª entrada); reversão após quebra de LT + teste do extremo | >= 60% | p222 |
| Swing (alvo >= 2x risco) | 40–50% | p215, p217, p232 |
| L2 abaixo da EMA descendente em mercado de baixa (2 pts/2 pts) | ~70% | p229 |
| Compra no topo de pullback de 2 pernas à EMA em tendência forte | ~70% | p229 |
| Comprar topo de TR logo abaixo da EMA em mercado de baixa forte | ~30% | p229 |
| H1 numa tendência de baixa | ~40% (60% para quem vende acima) | p137 |
| Topos em tendências fortes que viram bandeiras | ~80% | p253 |
| Pullback >= 75%: chance de voltar ao extremo cai muito | — | p22, p105 |
| >= 1 swing de 4 pts/dia (Emini, range 10–15) | 90% dos dias | p215 |

## B. Regras que podem virar código (numeradas, testáveis)

> Notação: barra i atual; H/L/O/C; `body=|C-O|`; `range=H-L`; `EMA=EMA20`; `ATR=ATR(14)`; `avgBody=média de body das últimas 20 barras`; `ADR=range médio diário (20d)`; "tique" -> em cripto usar `tick = max(tickSize, 0.02*ATR)` ou trabalhar em múltiplos de ATR. Parâmetros entre colchetes são sugestões a otimizar (Brooks dá ordens de grandeza, não constantes).

### B1. Classificação de barras
1. **Barra de tendência de alta**: `C>O` e `body >= 0.5*range` [0.5] e `body >= avgBody`. Espelho para baixa. **Doji**: `body <= 0.2*range` [0.2] (Emini 5 min: 1–2 tiques) (p6).
2. **Inside**: `H<=H[1] and L>=L[1]`. **Outside**: `H>=H[1] and L<=L[1]` com pelo menos um estrito (p9–10). **ii** = 2 inside seguidas; **ioi**; **oo** (p9).
3. **Barra de reversão de alta válida (mínimo)**: `C>O` ou `C>(H+L)/2`. **Forte**: `O<=C[1]`, `C>C[1]`, sombra inferior `>= 1/3 range` e `<= 1/2`, sombra superior pequena (`<=0.15 range`), `C` acima de fechamentos/máximas de >= 2 barras, sobreposição com barra anterior < 50% (p29).
4. **Barbwire**: >= 3 barras consecutivas em que a barra do meio tem > 50% da sua altura dentro do range das barras vizinhas, e >= 1 doji (p196). Flag `no_trade_breakout=True`.
5. **Micro gap de força (alta)**: barra i de tendência de alta com `L[i+1] >= H[i-1]` (p27, p72–73). Flag de força; **não usar como alvo** nas primeiras barras de tendência.
6. **Fechamento revertendo N barras**: contar quantas das últimas N [20] barras têm `C_k < C[i]` e `H_k < C[i]` (fechamento acima de máximas é mais forte que máxima acima de máximas) (p28, p50).

### B2. Detector de spike / rompimento e score de força
7. **Spike** = sequência de >= 2 barras de tendência na mesma direção com sobreposição de corpos pequena (`L[i] >= C[i-1] - 0.25*body[i-1]`) e sombras pequenas; termina na barra anterior à 1ª barra de pausa (doji, inside, corpo contrário, sombra grande contrária) (p86, p89, p284).
8. **Score de rompimento** (somar +1 por item, p28, p43): corpo >= 1.5*avgBody [1.5] e sombras < 25% do range; volume >= 3x média [Brooks: 5–10x forte, 10–20x muito forte]; 2–3 barras seguintes também de tendência com corpo >= avgBody; spike de 5–10 barras sem pullback > 1 barra; micro gap; fechamento supera >= 5 (melhor 20) fechamentos/máximas anteriores; rompe vários níveis (EMA, topo de swing, LT) por > 0.3 ATR; preço em "ar limpo" (sem barras à esquerda no nível nas últimas 50 barras); 1º pullback só após >= 3 barras, dura 1–2 barras e **não atinge o ponto de rompimento**.
9. **Penalidades** (p44–45): corpo pequeno com sombra contrária grande; barra seguinte é reversão ou inside contrária com corpo ~médio; mercado em TR há vários dias; rompe nível por <= 1 tique/0.1 ATR e volta; quem comprou com stop 1 tique além do nível não consegue +scalp (ex.: +1 ATR*0.3) antes do pullback; pullback fecha abaixo do ponto de rompimento; pullback atinge o preço de entrada.
10. **Regra do contexto do TR maior (p32, p33)**: se o rompimento ocorre abaixo da máxima das últimas 20–30 barras (ou dentro de um TR detectado), **não comprar o fechamento da barra de rompimento**; só pullbacks / setups de falha.
11. **Rompimento confirmado** se a barra seguinte (follow-through) é barra de tendência na mesma direção ou pelo menos doji; se é barra com corpo contrário (mesmo pequeno), marcar "provável falha" (p41, p52, p104).

### B3. Detector de Trading Range (TR)
12. **TR detectado** numa janela de N barras [20–60] se a maioria dos critérios da p170–171 for verdadeira: (a) `abs(slope(EMA, N)) < k*ATR` [k≈0.05/barra]; (b) >= 50% das barras sobrepõem >= 50% da barra anterior; (c) existem >= 2 blocos de >= 3 barras sobrepostas; (d) poucas sequências (< 2) de >= 3 barras de tendência consecutivas na mesma direção; (e) >= 3 mudanças de direção de swing (pivôs alternados) na janela; (f) as barras das extremidades da janela estão no terço médio da faixa (máx–mín) da janela; (g) proporção de dojis >= 20%; (h) **spikes que ultrapassam topo/fundo da janela e revertem em 1–2 barras** (falsos rompimentos) >= 1.
13. **Limites do TR**: topo = cluster de máximas de swing (tolerância 0.2–0.3 ATR); fundo = cluster de mínimas; **meio = (topo+fundo)/2** (ímã). Validar com >= 2 toques em cada lado.
14. **Zonas internas**: terço superior / médio / inferior. **Proibido iniciar trade com stop no terço médio** salvo swings grandes (altura do TR >= 3x stop) (p176, p188).
15. **TR estreito (TTR)**: altura do TR <= ~25% do ADR (Emini: <= 3 pts com ADR 10–15) **ou** <= ~2x stop médio; ou >= 3 mudanças de direção em 5 barras + dojis (p193, p198). **Flag `no_trade`**, exceto: (i) fade de pequena barra no extremo, (ii) pullback de rompimento após saída por barra de tendência, (iii) TTR curto como bandeira de tendência muito forte (spike >= 4 barras sem clímax).
16. **TTR >= 20 barras = sem valor preditivo**; probabilidade de rompimento a favor da tendência anterior 51–55% (p194).
17. **Canal vs. TR**: se topos e fundos ainda em tendência e a inclinação da regressão > limiar -> canal (operar a favor com limits contra a barra anterior); quando surgir fundo mais baixo que encontra compradores ou rompimento do canal + teste do fundo do canal -> TR (p170–171).

### B4. Comportamento e setups dentro do TR
18. **Regra 5–10 barras**: se o preço subiu >= 5 barras (net) dentro do TR e está no terço superior -> só setups de venda; se caiu >= 5 barras e está no terço inferior -> só compra (p176, p188).
19. **Compra no fundo do TR (melhor setup)**: preço no terço inferior + **2ª entrada** (H2 / fundo duplo / falso rompimento do fundo) + barra de sinal de reversão não muito grande (<= 1.5 avgRange) e pouca sobreposição -> buy stop 1 tique acima da máxima da barra de sinal; stop 1 tique abaixo da barra de sinal (ou do extremo do falso rompimento); alvo 1 = meio do TR; alvo 2 = topo do TR (−1 tique). Exigir `alvo1 >= risco` (p176–177, p188). Espelho para venda no topo.
20. **Fade do falso rompimento do TR**: barra fecha fora do TR por <= X [0.5 ATR] e a barra seguinte fecha de volta dentro -> entrar com stop na direção do range (1 tique além da barra de reentrada); stop além do extremo do falso rompimento; alvo meio/oposto (p173, p188). Probabilidade base 60–70% (p235).
21. **Fade de H1/H2 fraca no topo do TR**: H1/H2 cuja barra de sinal é doji/pequena e está no terço superior acima da EMA -> **vender com limit na máxima da barra de sinal**; stop ~= alvo (Emini 6/6 tiques) (p140, p136). Espelho L1/L2 no fundo.
22. **Barra grande de tendência que chega ao extremo do TR** (corpo >= 2x avgBody, fechando perto do extremo) dentro de um TR detectado: sinal de **clímax/vácuo** -> esperar barra seguinte; se for pausa/corpo contrário, entrar contra com stop 1 tique além do extremo (p173, p189). Só experientes: no fechamento.
23. **Armadilha no fundo**: após 2 barras fortes de baixa até o fundo do TR + laterais abaixo da EMA + nova barra de reversão de baixa sobreposta (entrada a ~1 tique do fundo da bandeira) -> não vender; opcional limit de compra na mínima (p177).
24. **TR perto da EMA**: nunca comprar se as barras do TR estão abaixo da EMA; nunca vender se estão acima (p197). **TR/barbwire tende a romper para o lado da EMA em que está** (p175, p196).
25. **Ímã do meio**: após rompimento de TR que anda <= 1 MM, se a barra de rompimento/continuação perde força (pausa) -> probabilidade de retorno ao TR; alvo de reversão = meio do TR (p174). TRs de >= 10 barras continuam ímãs por 2–3 dias (p174) -> guardar níveis de TRs anteriores.
26. **Duração**: quanto mais longo o TR, maior a chance de reversão (acumulação/distribuição) em vez de continuação (p175) -> feature "idade do TR".
27. **Perna final do TR em mercado de alta = canal de baixa** -> comprar a reversão no fundo ou o pullback do rompimento desse canal (p171, p179).

### B5. Rompimento de TR, pullback de rompimento e falhas
28. **Teste de rompimento**: após rompimento, pullback que volta a <= 2 tiques [<= 0.1 ATR] do ponto de rompimento (ou da máxima da barra de sinal) e forma barra de sinal -> buy stop 1 tique acima (p61, p64, p255). Se o pullback cai > alguns tiques abaixo do ponto de rompimento -> "gap negativo", reduzir confiança (p72).
29. **Pullback de rompimento sem rompimento real**: preço chega a <= 0.1 ATR do extremo sem excedê-lo e recua 1–4 barras -> tratar como rompimento (p62, p64).
30. **Falha da falha (2ª entrada)**: rompimento -> barra contrária -> passa a mínima dela (falha) -> em <= 3 barras passa a máxima de barra anterior -> entrar a favor do rompimento original (p8, p60, p200). "Raramente a 2ª entrada falha" no barbwire (p197).
31. **Barbwire breakout fade**: barra de tendência sai do barbwire por > 2 tiques e fecha -> sell stop 1 tique abaixo dela (fade); se a fade falhar -> buy stop 1 tique acima da barra de entrada da fade. **Não fazer fade se houver >= 2 barras de tendência consecutivas no rompimento** (p197).
32. **TTR: aguardar falha em 1–2 barras após o rompimento; entrar no pullback do rompimento com stop 1 tique além da barra de pullback**; se o pullback atravessa o lado oposto do TTR, entrar nessa direção (p194).

### B6. Measured moves e alvos
33. **MM de spike**: `alvo = C_last + (C_last − O_first)` (corpos); se excedido, usar `H_last + (H_last − L_first)` (p53–54, p86, p238). Alvo cresce com o spike; risco fixo 1 tique além da 1ª barra.
34. **MM de TR**: rompimento de TR de altura h -> alvo = ponto de rompimento ± h (p47, p92–93, p210). Se o rompimento é de TR estreito e falha, alvo da falha = ± h do lado oposto.
35. **Measuring gap**: gap = entre ponto de rompimento e mínima do 1º pullback (ou meio da barra de rompimento se indefinido); `alvo = mid_gap + (mid_gap − início_da_perna)` (p70, p72, p91). Usar só quando `mid_gap − início` ≈ 1/3–1/2 do ADR (p72).
36. **Perna1 = Perna2 (AB=CD)**: `alvo = C + (B − A)`; também para a 2ª perna de pullbacks de 2 pernas (p85–86).
37. **Alvos de pullback**: ordem de prioridade (p61, p98): ponto de rompimento; máxima da barra de sinal; mínima da barra de entrada; topo do spike / início do canal; EMA; topo do 2º empurrão da cunha; fundo do canal (spike & canal sempre testa o início do canal — p73, p161, p182).
38. **Ímãs adicionais**: máximas das barras de sinal de compra que falharam numa queda (alvos do rali, p96); extremo oposto de barra de tendência enorme (p99); números redondos (p98); OHLC do dia anterior; meio do range do dia em dia de TR (p98, p179).
39. **Regra do risco necessário**: se após a entrada o preço recuou R tiques antes de voltar a favor, ajustar alvo para ~R (p264, p268).
40. **Alvo testado** = preço chega a <= 1 tique (Emini) do alvo (p92); para cripto <= 0.05 ATR.

### B7. Contagem de barras (H1/H2/L1/L2) e regras de contexto
41. **H1** = 1ª barra com `H > H[1]` após barra(s) de pullback (em tendência de alta/TR); **H2** = 2ª ocorrência após nova barra com `H<=H[1]`/mínima menor; exigir quebra de micro LT entre H1 e H2 (p136). Reiniciar contagem após barra outside forte ou spike forte (p56, p141).
42. **H2 válida** se: tendência de alta (EMA ascendente, preço acima, sem 2 fechamentos consecutivos abaixo da EMA) **ou** fundo do TR abaixo da EMA; barra de sinal com corpo de alta (mais confiável) e, idealmente, mínima na/abaixo da EMA (p136, p143, p222).
43. **H1 válida** só se: tendência de alta forte + fase de spike (>= 3–6 barras de tendência consecutivas) + **sem clímax** (barra excepcionalmente grande após tendência longa, ou 2º/3º clímax consecutivo) (p139).
44. **H2 inválida/fade**: acima da EMA e no terço superior do TR; ou após clímax/bandeira final; ou 2ª perna com >= 4 barras de baixa consecutivas e muito menor que a 1ª (p142–143).
45. **H2 falhou** (preço abaixo da barra de sinal antes de +scalp): se o movimento após a falha **não** tem 1–2 barras de rompimento grandes -> esperar **H3 (cunha)**; se tem -> esperar **H4** e não comprar H3 (p140–141). **H4 falhou -> provável tendência de baixa** (p138).
46. **Barra de sinal H4/L4 doji/pequena** -> stop 2–3 tiques além (ou money stop) (p139, p149).
47. **Nunca comprar H1/H2 em tendência de baixa clara nem vender L1/L2 em tendência de alta clara**; nessas, fazer o oposto com limit (comprar na/abaixo da barra de sinal de L1/L2 numa alta forte) (p137, p149, p253).
48. **Contagem desligada em TTR** (p137–138, p155).

### B8. Reversões (wedge, topo/fundo duplo, bandeira final, clímax)
49. **Cunha (3 empurrões)**: 3 pivôs na mesma direção (H ou L), com a 3ª perna terminando perto/além da linha de canal (linha paralela ou convergente). Pullback em cunha (contra a tendência maior, 10–20 barras): entrar no 1º sinal. **Reversão de cunha** (contra a tendência): exigir >= ~20 barras, linha de canal clara, overshoot + barra de reversão, e preferir 2ª entrada (p157). Se a cunha está num canal estreito (>= 6–7 barras sem pullback) -> não operar a 1ª reversão (p108, p209).
50. **Fundo duplo que falha e reverte em 1–2 barras = cunha (3 empurrões)** (p115, p121).
51. **Topo/fundo duplo como bandeira**: bandeira de alta em fundo duplo = H2 confiável (2º fundo a <= 0.2 ATR do 1º, numa tendência de alta). Entrada buy stop acima da barra de sinal; stop abaixo do fundo duplo; alvo mínimo = MM da altura do mini-TR; após spike & canal, repique mínimo ~25% do sell-off (p114–118).
52. **Entrada padrão de topo duplo (abaixo do fundo entre os topos) tem baixa taxa** (80% dos rompimentos falham) -> preferir vender perto do 2º topo/topo mais baixo com L2 (p168).
53. **Bandeira final**: TR/bandeira horizontal após tendência de >= 20 barras; rompimento a favor da tendência que anda pouco e reverte com barra forte -> esperar >= 2 pernas contra testando o outro lado da bandeira; reversão pode vir de topo mais alto ou mais baixo (p67, p73, p203).
54. **Clímax / exaustão**: barra com corpo >= 2.5x avgBody após tendência de >= 20–30 barras (ou acima da linha de canal), ou **3 clímax consecutivos** (3 spikes/barras grandes sem correção) -> esperar correção de **>= 10 barras e 2 pernas** (muitas vezes até a EMA); não comprar H1 após isso (p35, p37, p73, p122, p143).
55. **Spike num sentido seguido de spike no outro = reversão climática -> TR**; rompimento final -> MM ~ altura do spike (p175, p182).
56. **Reversão de tendência (maior)**: exigir (a) quebra forte da LT (com momentum, não só lateral) e (b) teste do extremo (topo mais baixo/mais alto ou fundo mais alto/mais baixo) com boa barra de sinal; P >= 60% (p17, p222, p242). Sem (a), não operar contra tendência acentuada (p242).
57. **Pullback >= 75% da perna** -> reclassificar como nova tendência (p22, p105).
58. **Sair (ou reverter) na 2ª tentativa do mercado de retomar a tendência** quando posicionado contra (L2/L3 com barra de sinal forte) (p107, p142, p255, p278).

### B9. Entradas, stops e gestão
59. **Entrada padrão**: stop order 1 tique além da barra de sinal; **stop inicial 1 tique além do extremo oposto da barra de sinal**; após fechar a barra de entrada: se barra de tendência a favor -> stop 1 tique além da barra de entrada; se doji -> manter (p116, p248, p263).
60. **Barra de sinal grande** (> ~2x avgRange): usar money stop (Emini 8 tiques; cripto ~1–1.5 ATR) ou stop a ~60–70% da barra de sinal; reduzir tamanho para risco fixo (p263, p266).
61. **Mínimo de movimento para scalp**: alvo de N tiques exige N+2 de movimento além da barra de sinal (p216, p248). Ajustar alvos para cripto pela taxa/slippage.
62. **Equação do trader**: aceitar se `P*R > (1−P)*S`; com P default 0.5 (incerto) exigir R >= 2S; com setup bom (P=0.6) R >= S; com P=0.4 R >= 2S (p223–224, p230).
63. **Dimensionamento**: `qty = risco_fixo / (|entrada − stop|)`; em spikes, posição 1/4–1/3 com stop no fundo do spike (p40, p87).
64. **Gestão swing**: realizar 1/2 em 2x risco, 1/4 em 3x, resto com trailing (abaixo do último fundo de swing após novo topo) até sinal oposto (p272). Breakeven após 1/2 do caminho ao alvo (p265) ou após +5 tiques (Emini) (p214).
65. **Em TR, sair do restante perto do extremo oposto do TR** (não depender de trailing) (p216, p263, p267).
66. **Se o mercado entra em TTR após a entrada -> sair no breakeven** (p195, p229).
67. **Teste "se estivesse flat"**: se não entraria agora com esse stop/tamanho, sair (p47, p215, p264, p272).
68. **Stop do dia**: medir o maior recuo necessário nos primeiros trades da sessão e usar como stop padrão do resto do dia (p264, p269).
69. **Ordem pior-caso em spike**: ao 1º pullback de tendência always-in forte, colocar buy stop 1 tique acima da máxima do spike (p41, p57, p139).
70. **Duas razões**: exigir >= 2 razões da lista (p242) para entrar, exceto 2ª entrada, pullback em tendência forte (sem clímax) ou overshoot + reversão.

### B10. EMA e gaps
71. **20 gap bars**: >= 20 barras consecutivas sem tocar a EMA -> 1º toque = setup a favor (scalp para teste do extremo), salvo se houve clímax/reversão (p123, p125).
72. **1ª MA gap bar** (barra inteira do lado oposto da EMA após tendência forte): fade com stop entry 1 tique além (comprar acima da máxima numa alta); permitir 2ª entrada; não 3ª (p123, p126). Espera teste do extremo; depois correção maior.
73. **Penetrações crescentes da EMA** em testes sucessivos = enfraquecimento (p113). **2 fechamentos consecutivos do lado oposto da EMA** = tendência não é mais "forte" (p28).

### B11. Filtros temporais/ambiente (adaptar à cripto)
74. **Não operar no meio do range do dia durante o terço médio do dia** em dias não-tendenciais (p175, p181). Cripto: sessão asiática / meio do range diário UTC.
75. **4–5 reversões na 1ª hora -> marcar dia de TR** (operar fades dos extremos e alvo = meio do dia) (p190). **TR da abertura ~1/2 do ADR -> esperar duplicação (dia de TR em tendência)** e teste do ponto de rompimento (p64, p76, p239, p286).
76. **Rompimentos no último minuto da barra (fechamento forte) são mais confiáveis que os do início da barra** (p245) -> em código: usar só barras fechadas.

## C. Como complementa o método Excelência Trading (lateralização, liquidez, força de fundo/topo)

| Conceito Excelência (SMC/ICT/Wyckoff/VP) | Equivalente Brooks | Regra prática que Brooks acrescenta |
|---|---|---|
| **Lateralização / range de acumulação-distribuição** | Trading range = área bilateral; "pullback que perdeu poder preditivo" (p171) | Critérios objetivos para detectar TR (lista de 13 itens, p170–171); 80% das tentativas de rompimento falham; **TR estreito = não operar**; ímã do meio; regra 5–10 barras; quanto mais longo o TR, maior a chance de reversão (acumulação/distribuição, p175). |
| **Liquidez (equal highs/lows, BSL/SSL, stop hunt / sweep)** | "Bordas" (barras com mínimas idênticas, p7, p250); defesa de stops abaixo do último fundo mais alto (bandeira de alta em fundo duplo, p114); falsos rompimentos de 1 tique (p119); vácuo perto do ímã (p80, p173); stops em números redondos atingidos no tique (p286) | O extremo do TR geralmente é excedido por 1–2 tiques antes de reverter (p173) -> **sweep = falso rompimento**; a entrada de Brooks é o **stop 1 tique além da barra de sinal que volta para dentro** — combina com "sweep + CHoCH". Melhor ainda a **2ª entrada** (2º sweep / fundo duplo). |
| **Mitigação / Order Block** | Teste de rompimento na máxima da barra de sinal / ponto de rompimento (p61, p255); "o preço de entrada de reversões fracassadas é ímã" (p96); extremo oposto de barra de tendência enorme é testado (p99); repique para exatamente o preço da 1ª entrada de escalonamento (p283) | Quantificação: testes que chegam a <= 1–2 tiques do ponto de rompimento são os mais confiáveis; pullback que fura muito o ponto de rompimento = "gap negativo" (fraqueza). O "OB" de Brooks é a **barra de sinal / barra de rompimento**; a mitigação é o **teste do rompimento**. |
| **FVG / imbalance** | Gaps intradiários = barras de tendência; micro gap de medida `L[i+1] >= H[i-1]` (p72–73); measuring gap e "área fina" do Market Profile (p91) | FVG no início de tendência = **sinal de força, não alvo**; FVG no meio da perna = measuring gap -> MM; FVG fechado logo após clímax = gap de exaustão. |
| **Volume Profile (HVN/LVN, POC, VAH/VAL)** | TR = "área gorda"/distribuição; rompimento = "área fina" (p91); mercado passa pouco tempo nos extremos (p235) | Meio do TR ≈ POC (ímã); LVN entre distribuições ≈ measuring gap (meio da perna). Fades nos extremos do TR ≈ fades em VAH/VAL; rompimento com spike forte sai da área de valor em busca de novo valor (p45). |
| **Wyckoff (spring/upthrust, SOS/SOW, LPS/LPSY, teste)** | Falso rompimento do fundo do TR + 2ª entrada (spring + teste); rompimento forte com follow-through (SOS); pullback de rompimento ao ponto de rompimento (LPS/BUEC); "perna final do TR é canal contra" (p171, p179); TR longo vira reversão (p175); mecânica de esgotamento do lado que atingiu posição máxima (p193) | Probabilidades e checklists de força para validar SOS (rompimento forte vs fraco, p43–45) e para não confundir spring com fundo de canal forte (esperar quebra de LT e 2ª entrada). |
| **Força de fundo / força de topo** | Pressão compradora/vendedora cumulativa (sombras inferiores repetidas, corpos de alta no fundo, p177, p183, p239); 3 clímax consecutivos (p122, p207); escada encolhida (p153); barra de reversão forte + 2–3 barras de continuidade (p29) | Checklist "reversão forte" (p29–30) dá critérios objetivos: barra de reversão forte, 2–3 barras seguintes com corpo >= médio, spike de 5–10 barras, revertendo muitos fechamentos, 1º pullback só após 3 barras e sem atingir o ponto de rompimento. Usar como **score de força de fundo/topo**. |
| **Estrutura (BOS/CHoCH)** | Quebra de LT com momentum (p17, p242); "o spike que quebra a LTB é o verdadeiro início" (p105); always-in | Brooks exige **quebra forte + teste do extremo** antes de operar reversão; um CHoCH fraco (desvio lateral) não basta. Contra tendência acentuada, mesmo H2/L2 não vale sem quebra de LT. |
| **Premium/discount** | Topo/fundo do TR, terços, regra 5–10 barras, probabilidade direcional 40/50/60% (p174, p235) | Fornece **probabilidades por zona do TR** (topo ~60% de queda; fundo de TR em mercado de alta 70–80% de alta; meio 50%). |

**Integração sugerida para o scanner**: (1) detectar TR/TTR (regras 12–17); (2) mapear liquidez = extremos do TR, bordas (equal H/L), topos/fundos de swing, pontos de rompimento e barras de sinal fracassadas (ímãs); (3) disparar setups só nos extremos: sweep (falso rompimento <= 0.5 ATR) + barra de reversão + preferencialmente 2ª entrada (H2/L2/fundo/topo duplo); (4) score de força do sweep/rompimento pelos checklists p28–30/p43–45; (5) alvo 1 = meio do TR (POC), alvo 2 = extremo oposto / MM; (6) para rompimento (SOS/SOW), exigir score alto + follow-through e entrar no **pullback/teste do ponto de rompimento** (mitigação), alvo = MM da altura do TR; (7) bloquear trades no meio do TR, em TTR, contra EMA (regra 24) e contra tendência sem quebra de LT.

## D. Dúvidas / pontos ambíguos
1. **Tradução**: a tradução PT tem erros (ex.: "falhas falha", "dar fade", "lbginha", troca de "alta"/"baixa" em alguns trechos; p28–29 lista de rompimento de baixa copia "corpo grande de alta"). Onde houve contradição, interpretei pelo contexto (espelho).
2. **"Tique" e parâmetros do Emini** (stop 2 pts, 8 tiques, alvo 4 tiques, +6 de movimento, ADR 10–15): precisam ser normalizados para cripto perpétuo (ATR/ADR, tickSize, taxas maker/taker, funding). Brooks não dá regra de conversão; sugerido usar múltiplos de ATR e % do ADR.
3. **Probabilidades** são estimativas subjetivas do autor ("provavelmente 60%"), não estatísticas medidas. Devem ser validadas em backtest com amostra grande e out-of-sample (o próprio autor alerta sobre ilusões de backtest, p232).
4. **Definição de "forte"** (barra forte, spike forte, tendência forte) é qualitativa; os limiares (corpo >= x avgBody, nº de barras) são minha proposta. Idem "clímax" (barra "excepcionalmente grande").
5. **H1/H2 variantes** (pernas inferidas, p138, p145) são difíceis de codificar; risco de contagens diferentes do autor. Sugerido usar pivôs de 1–2 barras e exigir quebra de micro LT.
6. **Cunha vs canal estreito**: quando 3 empurrões funcionam como cunha e quando o canal continua (p209) depende de "estreiteza" — limiar a definir (ex.: nº de barras sem pullback, inclinação vs ATR).
7. **Horários** (7:00, 11:30 PST) são específicos do Emini; em cripto 24/7 não há equivalente direto — testar sessões e eventos macro.
8. **Volume**: o autor cita 10–20x volume em rompimentos, mas diz que não é confiável o bastante; em cripto o volume é fragmentado por exchange (usar volume da Binance Futures e, se possível, CVD/OI).
9. **Contradições aparentes**: "comprar o pullback é melhor que comprar o rompimento" vs. "em tendência forte, entre a mercado em qualquer ponto" — resolvido pelo contexto (força do spike e se está dentro de TR maior), mas exige um classificador de regime confiável.
10. **Escalonamento contra a tendência** (amigos do autor) aparece como técnica de experientes; para scanner automático é de alto risco — não recomendado como regra base.
11. Alguns números de figuras/páginas no texto da tradução não batem (ex.: "Figura 29.4" repetida, "Capítulo 18" vs 19). Referências de página aqui seguem a paginação do PDF.
12. O livro remete a reversões, bandeiras finais e clímax detalhados no **Livro 3 (Reversals)** — as regras de reversão aqui são parciais.
