# Trend Following — Michael W. Covel (ed. brasileira, Fundamento, 2014)

> Fonte: "Trend Following - Análise gráfica.pdf" (200 págs PDF escaneadas; cada página do PDF = 2 páginas do livro).
> Referência: "p. X" = página impressa do livro; "PDF n" = página do arquivo.
> Observação geral: apesar do nome do arquivo, o livro NÃO é um manual de padrões gráficos. É sobre filosofia, gestão de risco, psicologia e histórico de desempenho de fundos trend following (Dunn, Henry, Seykota, Turtles etc.). As regras operacionais concretas são poucas e concentradas em: cortar perdas / deixar lucros correrem, rompimentos de N dias, stops de saída, dimensionamento de posição por volatilidade/risco fixo, diversificação, sistemas mecânicos.

## Estrutura (sumário, PDF 7-9)
- Parte I: 1. Trend Following (p. 26); 2. Grandes nomes (Harding, Dunn, Henry, Seykota, Campbell, Parker, Abraham, Dennis, Donchian, Livermore/Watts) (p. 57)
- Parte II: 3. Dados de desempenho (retornos absolutos, volatilidade vs risco, drawdowns, correlação, soma zero) (p. 142); 4. Grandes eventos/crashes (2008, 2000-02, LTCM, Ásia, Barings, Metallgesellschaft) (p. 172); 5. Beisebol (p. 239)
- Parte III: 6. Comportamento humano (p. 251); 7. Processo decisório (p. 272); 8. Ciência das operações (p. 283); 9. Cálices sagrados (p. 296)
- Parte IV: 10. Sistemas de negociação (p. 314 — "cinco questões para um sistema"); 11. O jogo (p. 351)
- Apêndices: A. TF para ações; B. Guia de desempenho; C. Operações de curto prazo; D. Traços de personalidade; E. Modelos de TF; F. Exemplo de sistema da Mechanica (dólar canadense); G. Questões críticas sobre sistemas.

---

## Apresentação (Larry Hite) e Prefácio (p. XIII–XXII, PDF 9-14)
- Princípio central citado: **"abandone as perdas e permita que os ganhos corram"** (p. XV). Poucas operações grandes geram todo o lucro; perdas são pequenas.
- Hite: operar de forma que se ganhe muito quando certo e tenha prejuízo **administrável** quando errado; sempre perguntar "o que de pior pode me acontecer?" (p. XVI). Operação deve ser simples o bastante para ser compreendida.
- Diversificação entre muitos mercados não correlacionados: individualmente arriscados, juntos se compensam → bom retorno com baixa volatilidade (p. XIV).
- Definição (Van Tharp, p. XVIII): trend = é preciso uma tendência após a compra para revender mais caro; following = os adeptos esperam a tendência mudar *antes* de acompanhá-la (não antecipam).
- TF tenta capturar "a maior parte" de uma tendência, de alta ou de baixa, em qualquer classe de ativo.
- 2008: fundos TF tiveram +5% a +40% em out/2008 enquanto o mercado colapsava (p. XXII).

## Cap. 1 — Trend Following (p. 26–, PDF 16-)
### Mercado / perder vs ganhar / investidor vs operador (p. 26–30)
- Preço é a informação final; especular usando preço de mercado é a abordagem digna de atenção (p. 27).
- Investidor: compra supondo valorização contínua, sem plano para quando cai; segura esperando recuperar. Operador: tem plano/estratégia definida com objetivo único de lucro, indiferente ao ativo; opera comprado e vendido em igual proporção (p. 29-30).
- Operador reconhece rápido quando erra e sai rápido; prejuízo = oportunidade de aprender (p. 28).
- Paciência: esperar meses pela operação certa (leão aguardando a presa — Tom Basso, p. 30).

### Análise fundamentalista vs técnica (p. 31–35)
- Fundamentalista tenta prever; falhou em 2008. Plano "compre e segure" não diz quando sair nem quanto comprar (p. 34).
- Técnica tem 2 formas: (a) **preditiva** (indicadores que tentam prever direção) — rejeitada; (b) **reativa** — a do TF: reagir aos movimentos de preço que já ocorreram, sem prever direção nem duração (p. 35).
- Consequências operacionais (p. 35):
  1. TF **nunca** entra no fundo exato nem sai no topo exato.
  2. Não precisa operar todo dia; espera o mercado apresentar as condições corretas em vez de forçar.
  3. Análise de preço não deve ter metas de desempenho (não "preciso de X% ao mês").

### Discricionário vs mecânico (p. 36–38, PDF 21-22)
- Sistema mecânico = conjunto objetivo e automatizado de regras de entrada e saída, seguido rigidamente (muitas vezes em programa de computador). Operador que viola as regras "termina quebrado" (p. 37).
- Discricionariedade só nas decisões iniciais: escolha do sistema, composição da carteira (quais mercados), percentual de risco por trade. Depois disso tudo é sistematizado (p. 37).
- Campbell & Co.: "não permitimos decisões discricionárias — regra férrea" (p. 38).
- Notícias/comentários de mídia já estão refletidos em abertura, máxima, mínima, fechamento, open interest e volume (Christian Baha, p. 37) → usar só dados de preço/volume.

### A olho nu / Mudança (p. 38–44, PDF 22-25)
- Fig. 1.1: índice CTA (Dunn+Campbell+JWH) US$1k (1985) → US$47.891 (2003) vs S&P US$6.326.
- Mercados se comportam igual há 300 anos; muda o instrumento (ex.: marco → euro), não o comportamento (p. 40).
- Filosofia válida = estratégia definida, quantificada, escrita e mensurável numericamente para rastrear tendências (p. 41).
- Patrick Welton testou **120 modelos de TF** (reversíveis e não reversíveis; base preço, volatilidade, faixas de flutuação) com períodos médios de retenção de **2 semanas a 1 ano**: desempenho idêntico em final dos 80, início dos 90 e final dos 90 → robustez; fonte de retorno = movimentos sustentados de preço (p. 42-43).
- Tendências nascem de mudanças nos prêmios de risco; incerteza → tendências de meses/anos (Man Group, p. 41-42).
- Mercados alternam choques, instabilidade e reversões de tendência; "não é difícil criar um sistema simples de acompanhamento de tendência com período realista de retenção" (Mulvaney, p. 45, nota).

### Modus operandi: preço (p. 44–47, PDF 24-25)
- Preço é o único dado objetivo, não manipulável; balanços podem ser maquiados (p. 46).
- Operar muitos mercados diferentes (soja, Cisco, dólar...) — todos têm em comum o preço. Pode-se operar sem saber o que o ativo é (p. 45).
- Eckhardt: "trabalhamos exclusivamente com preços, passados e atuais" (p. 47).
- Seykota mantinha short em prata caindo meio centavo/dia enquanto todos eram bullish: "a tendência é de queda, vou me manter vendido até que ela mude" (nota p. 47).

### Siga a tendência (p. 45–52, PDF 24-27)
- Não tentar adivinhar até onde a tendência vai (p. 45). "Os preços fazem as notícias" (p. 46).
- **Comprar em alta**: Seykota comprava açúcar em limite de alta diária por dias seguidos e topou comprar mais contratos ao preço limite (p. 48). TF compra força, não "pechincha".
- Início de tendência é impossível de identificar: surge de mercado estagnado sem tendência. Ideia: **fazer pequenas apostas e determinar se a tendência vai amadurecer** para merecer investimento maior (p. 49) → pirâmide / aumentar posição conforme confirma.
- Analogia com opção comprada (Rulle, p. 49 nota): stop loss cria risco controlado (prêmio); manter a tendência = grande potencial de alta. Se tendências não se materializam, prejuízos limitados se acumulam.
- Duas suposições (Rulle, p. 50): (1) tendências ocorrem regularmente; (2) sistemas podem extrair lucro delas. Regra base: **cortar prejuízos e deixar lucros fluírem**.
- **Contra metas de lucro (alvo fixo)**: ex. sair de uma ação após +30% é "problemático"; vai contra a matemática de deixar lucros correrem. Conta 50k→80k→55k→90k→200k: quem realizou em 80k não chega aos 200k (p. 51-52). → TF não usa take profit fixo; sai por sinal/stop móvel.

### Perdas (p. 52, PDF 27)
- Perdas são parte do jogo; sem perdas não há risco nem ganho.
- "Seguidores de tendência raramente sofrem grandes perdas porque eliminam ou revertem suas posições assim que o mercado muda para a direção oposta." Pequenos prejuízos inevitáveis; uma ocasional grande virada paga uma série deles (p. 52).
- Seykota (ondas na praia): sincronizar com o ritmo do mercado, ir com as ondas (p. 53).

### Pontos essenciais Cap. 1 (p. 55–56)
- "Todos os sistemas lucrativos operam com tendências; a diferença de preço necessária a criar lucro implica uma tendência" (Seykota).
- Ninguém sabe até onde ou quando o mercado vai se mover; preços — não operadores — preveem.
- TF compra na alta e vende a descoberto na baixa.
- Perdas antecipadas e tratadas de forma objetiva.
- Preços se movem para cima, baixo ou lateralmente.

## Cap. 2 — Grandes nomes (p. 57–141)
### David Harding / Winton (p. 59–63, PDF 29-31)
- Ex-AHL (Man Group). Tudo via sistemas de TF testados por simulação; pensa em probabilidade/estatística, não opinião (p. 61-63). Tabela 2.1: Winton +21% em 2008; retornos anuais ~10-50%.
- Tendências = equivalente de mercado a padrões de comportamento (imitação, rebanho) sistemáticos (p. 62).

### Bill Dunn / Dunn Capital (p. 63–76+, PDF 31-38)
- Sem meta de retorno anual; aceita drawdowns de 20% a cada 3-4 anos, às vezes 50% (p. 63).
- **Orçamento de risco**: parâmetros de risco definidos pelos sinais de compra/venda; tamanho da posição calculado para que, se a operação for desfavorável, **não perca mais que x%** (p. 65). Gestão de risco garante sair se a operação vai contra.
- **Tamanho ajustado à volatilidade**: quanto mais volátil o mercado, menor a posição; menos volátil, maior (p. 64).
- Sistema WMA: **reversível** — sempre no mercado, comprado ou vendido (stop and reverse) (p. 67). Ex. iene dez/1994–jun/1996 (fig. 2.3): estava vendido antes da grande alta de mar/1995 → reverteu para comprado; depois retração gerou sinal vendido; modelo incorpora volatilidade de curto prazo; volatilidade alta na queda impediu que nova alta gerasse sinal falso de compra por quase 1 ano (p. 67-68).
- Libra esterlina (fig. 2.4): mercado de altos e baixos rápidos sem direção → série de pequenas perdas (whipsaw). Compensado pelos ganhos do iene. Pequenos prejuízos administrados porque a libra era pequena parte da carteira (p. 69-70).
- Sistema original: dados diários; grandes tendências definidas por **porcentagem de movimento de preço ante uma alta ou baixa recente**; operava 3 a 5 vezes/ano por mercado; reversão automática se a tendência fosse na direção oposta; **risco por operação de 2% a 6% do capital** (p. 70-71). Posições de até 18 meses.
- Execução só quando alarme do computador indica sinal (p. 72).
- Princípios (p. 75): reduz prejuízos; nunca muda estratégia básica; longo prazo (retornos positivos para períodos de retenção >45 meses); reinveste (juros compostos); recupera (−27,1% 1976, −32% 1981, depois +500% e +300%); opera comprado e vendido com igual frequência.
- Reduzir risco para reduzir volatilidade = reduzir retorno absoluto (p. 74).

- Clientes: abandonam perto de viradas; Dunn −42% em 12 meses (1981), maior cliente sacou 70%; mês seguinte +18% e +430% em 36 meses (p. 78).
- Pontos essenciais (p. 80): opera comprado/vendido com igual frequência; retorno médio em ciclos de 60 meses ≈ 231%; risco aceito: **1% de chance de perder ≥20% em um mês** (VaR-like).

### John W. Henry / JWH (p. 80–96, PDF 40-48)
- Não opera ativo/day trade; sistema indica a hora → retornos rápidos e explosivos (p. 81).
- Preceito: mercado reage a notícias, mas mudanças grandes demoram (consenso se forma ao longo do tempo) → tendências (nota p. 83).
- Frases operacionais (p. 84): "melhores dias são os que não operamos"; "quanto menos operamos, mais ganhamos"; algumas das melhores operações exigem inatividade.
- **Filosofia em 4 pontos** (p. 85-86):
  1. **Identificação de tendências de longo prazo**: ignora volatilidade de curto prazo para capturar grandes tendências (meses a anos).
  2. **Processo altamente disciplinado**: evitar ao máximo decisões discricionárias.
  3. **Administração de riscos**: fórmulas severas, ponderação de exposição por mercado, cláusulas de controle de prejuízo, orientações de comprometimento de capital para preservar capital em períodos voláteis ou **sem tendência clara**.
  4. **Diversificação mundial**: >70 mercados.
- Exemplo café: fundamentos baixistas, sistema sinalizou compra pesada; arriscou **2% do capital** na operação; café 1,32→2,75 US$/lb, +70% no trimestre. "As melhores operações são as que menos gosto" (p. 87).
- Volatilidade: desejo de evitar volatilidade inibe acompanhar tendência longa; stops apertados demais tiram da posição no meio de grande movimento. Sistemas longos não evitam volatilidade — aguardam ela se resolver (p. 87-88).
- **Características do sistema JWH** (ex-funcionário, p. 89) — importante para código:
  - Prazo longo: maioria das operações lucrativas dura **> 6 semanas**, algumas meses.
  - Sistema **neutro** (fora) até gerar sinal; mercados podem ficar neutros por meses até preço atingir nível que justifique posição.
  - **Risco inicial predefinido** por operação; se fica deficitária rápido, controle de risco força liquidação ao atingir nível predefinido de prejuízo — pode durar só 1 dia.
- Pesquisa do séc. 19: tendências eram tão frequentes quanto hoje; aleatórias/imprevisíveis → diversificar e não alterar o sistema (p. 89-90).
- Não é caixa-preta: filosofia determinada (p. 92). Sistema não mudou em 18 anos (p. 93).
- Exemplos: short no rand sul-africano mar/abr 1998 (fig. 2.6) — "exigem tempo; paciência; **não estipular objetivo de lucro**" (p. 94). Iene 1994-96 (fig. 2.7): +11% num trimestre.
- Fed: juros sobem em sequência (eleva, eleva, eleva...) e caem em sequência → tendências de fluxos de capital/juros (p. 95).

### Ed Seykota (p. 96–109, PDF 48-55)
- Q&A: não pergunte "como saber se a tendência é de alta?" — pergunte "o que me dirá que a tendência é de alta?" (critério objetivo) (p. 97).
- **Pirâmide** (nota p. 98): "acrescente camadas cada vez menores ao subir e fique esperto ao chegar ao topo" → adicionar posição em tamanhos decrescentes.
- Primeira regra aprendida aos 13 anos: **comprar quando preço salta acima de dado valor; vender quando cai abaixo dele** (rompimento de nível) (p. 100).
- Testou em computador a tese de Donchian (sistema mecânico de TF supera média) e confirmou (p. 100).
- **Amos Hostetter — "pouco importa o queijo, quero sair da ratoeira"** (p. 101): entra com **1/3 da posição máxima**; se acumular **perda de 25%** (do risco/posição), sai; se a favor, **adiciona mais 1/3**, e completa o terço final quando o preço atinge o que previa como limite máximo. → regra de entrada escalonada em 3 terços.
- Nota J.L. Kelly (p. 101): critério de Kelly — crescimento exponencial do capital apostando fração consistente com a vantagem.
- Lições Seykota.com (p. 103-105):
  - "Se você quer evitar perdas por instabilidade, não opere."
  - "Não arrisque mais do que pode perder, mas arrisque o suficiente para ganhar bastante. Se esse valor não existir, não opere." (risco por trade dimensionado)
  - TF = observação e resposta ao momento presente.
  - "Quando capas de revistas se tornam emocionais, abandone a posição" → euforia pública = fim de grande movimento (sinal de exaustão/sentimento).
  - Para quem tem sistema, é mais importante determinar o **tamanho da transação** do que o ponto exato de entrada/saída (Druz, nota p. 103).
- TF opera por tentativa e erro: erros = pequenos prejuízos enquanto tenta descobrir as grandes tendências (p. 107).
- Retornos ~60%/ano 1990-2000.

### Keith Campbell / Campbell & Co (p. 109–114, PDF 55-57)
- "Tudo que fazemos poderia ser calculado com lápis e papel" — simplicidade (p. 111).
- Gestão de carteira, risco, execução, alavancagem são tão importantes quanto o sinal (nota p. 111).
- Drawdowns comparados (fig. 2.9): S&P −43% (72-74), Magellan −63%, Campbell −36%.
- Risco real de futuros vem da **alavancagem**, não da volatilidade; gerir alavancagem é crucial (p. 113).
- Correlação baixa com S&P (fig. 2.10); consistência (fig. 2.11): 56% dos meses positivos, 84% dos anos, **100% das janelas móveis de 48 e 60 meses** → TF exige horizonte longo de avaliação. Só dados técnicos de mercado (p. 113-114).

### Jerry Parker / Chesapeake (p. 114–, PDF 57-)
- Primeiro aluno aceito por Richard Dennis (Turtles). Usou estratégia Turtle "atenuada" (menos alavancagem) para clientes; +61,8% em 1993; hoje 12-14%/ano (p. 115).

- Parker (p. 117): "Não sei e nem quero saber [para onde vai]. O sistema gira em torno de o mercado saber para onde está indo." Entrar **um pouco mais tarde** (após confirmação) não causa problema — não precisa antecipar o corte de juros. Sem preferência por comprado ou vendido.
- Contra comprar-e-manter; "o mercado nunca erra" (p. 117). Chave = capacidade de alavancar (muitos são conservadores demais) (p. 117, 121).

### Salem Abraham (p. 118–121, PDF 61-63)
- Premissa: commodities passam periodicamente por mudanças de preço (tendências); em mercados livres continuarão. Abraham Trading +74,65% em 2003.

### Richard Dennis e as Tartarugas (p. 122–130, PDF 63-67)
- Seleção por questionário V/F (p. 124-127). As **respostas "corretas" não são dadas no livro** — mas a maioria é inferível pela filosofia TF (marcar "verdadeiro"/"falso" é interpretação minha, ver Dúvidas). Itens operacionalmente relevantes:
  - (2) Ao iniciar operação, saber exatamente a que preço liquidar se ocorrer lucro → [provável FALSO no TF].
  - (3) Mesmo nº de contratos em todos os mercados → [FALSO: dimensionar por volatilidade].
  - (4) Com US$100 mil, arriscar US$25 mil por operação → [FALSO: risco muito alto].
  - (5) Ao iniciar, saber exatamente quando liquidar em caso de prejuízo → [VERDADEIRO: stop predefinido].
  - (8) **Uma brecha (gap) na alta é bom ponto de entrada se a tendência de subida começou** → [provável VERDADEIRO].
  - (9) Se antecipa paradas automáticas (stops em nível), espere elas se encerrarem e compre um pouquinho acima do preço de parada.
  - (10) Dos 3 tipos de ordem (mercado, stop, manter/limite), ordens a mercado causam menor perda de terreno.
  - (11) Quanto mais notícias otimistas e mais gente operando, menos provável a tendência continuar após alta substancial.
  - (17) **Idealmente, lucro médio deve ser 3 a 4 vezes maior que prejuízo médio** → [VERDADEIRO; payoff ≥3].
  - (18) Deve-se permitir que lucro vire prejuízo → [provável VERDADEIRO no TF; trailing largo].
  - (19) Porcentagem alta das operações deve dar lucro → [FALSO: TF tem baixa taxa de acerto].
  - (21) **Quando o mercado está acima do que estava há 4 ou 13 semanas, isso tem relevância especial** → [VERDADEIRO: rompimento de 20 dias / 13 semanas = base das regras Donchian/Turtle].
  - (25) Comprado, parada por limite de alta é bom momento de realizar → [FALSO].
  - (32) Depois de grande lucro, é mais provável que a próxima operação TF dê prejuízo → [VERDADEIRO estatisticamente].
  - (36) Se está ganhando, o risco total sobe dramaticamente.
  - (41) Dinheiro grosso é ganho por quem compra na baixa ao final de grande tendência de queda → [FALSO].
  - (42) Preço médio na baixa (averaging down) é bom → [FALSO].
  - (43) Depois de tendência longa, mercado requer mais consolidação antes de outra tendência começar.
  - (46) Assumir/sair integralmente de uma posição em uma só transação.
  - (47) Diversificar em commodities é melhor que ficar em 1-2 mercados → [VERDADEIRO].
  - (48) Se um dia de lucro/prejuízo faz diferença significativa no patrimônio, está operando demais → [VERDADEIRO].
  - (53) Tendências de alta acabam quando todos começam a acreditar na baixa.
  - (55) Operação de longo prazo deve durar 3-4 semanas ou menos → [FALSO].
  - (57) Volume e contratos em aberto são tão importantes quanto preço.
  - (58) **Pontos fortes e fracos das transações diárias são bom indicador para liquidar posições de longo prazo com altos lucros.**
  - (60) Quanto mais pessoas compradas, menos provável continuar a tendência de alta no começo.
  - (62) Comprar nas quedas e vender nas altas é boa estratégia → [FALSO].
  - (63) Importante sair no lucro a maior parte do tempo → [FALSO].
- Lição Dennis (p. 129): **"Se você tem uma posição, criou-a por uma razão, e precisa mantê-la até que a razão não exista mais. Não realize lucros só por realizar."** → saída somente por sinal de saída (condição de entrada deixou de valer), não por alvo.
- Análise fundamentalista não propicia lucros; lucro vem de comprar e vender (p. 130).

### Richard Donchian — pai do TF (p. 131–137, PDF 66-69)
- Fazia médias móveis à mão; testou com Seykota **regras de 1, 5 e 20 semanas** (nota p. 131) — "método semanal" (regra de N semanas = rompimento de máxima/mínima de N semanas).
- "Fundamentos do cobre são de alta, mas estou vendido porque a tendência é de queda" (p. 133).
- **Normas gerais de Donchian (1934)** (p. 133-134):
  1. Cuidado ao reagir de imediato à opinião pública; mesmo correta, demora a mover preço.
  2. **Em período parado/inativo, prepare-se para seguir o movimento na direção em que o volume se adensar** (rompimento de lateralidade com volume).
  3. Limite prejuízos e expanda lucros, desconsiderando todas as demais regras.
  4. Comprometer pouco capital quando a posição do mercado não está clara; movimentos claros são frequentes o bastante.
  5. **Assuma posições na direção dos movimentos dos 3 dias precedentes de forma cautelosa; espere por um dia de reversão** (entrada em pullback de 1 dia a favor da tendência de 3 dias).
  6. Uso judicioso de stops: proteger lucros, limitar prejuízos e, em formações como triângulos, para tomar posições (stop de entrada). Mais valiosos se colocados de acordo com a formação gráfica.
  7. Em mercado com probabilidade de alta ≥ baixa, posições mais pesadas devem ser tomadas nas altas (compras), por motivo percentual: queda 50→25 = lucro 50% no short; alta 25→50 = 100% no long.
  8. Ao abrir posição, ordens limitadas são permitidas; ao fechar, use ordem a mercado.
  9. Compre commodities fortes com background forte; venda as fracas (força relativa).
  10. Movimentos liderados por setores líderes (ferrovias na época) são mais interessantes.
  11. Estudar capitalização/atividade de emissão (liquidez/"cavalo lento vs rápido").
- **Normas técnicas de Donchian** (p. 134-135):
  1. Um movimento seguido de oscilação lateral precede outro movimento de dimensão quase igual na mesma direção (measured move / bandeira). Ao completar o 2º, espere oscilação lateral reversa.
  2. Resistência provável a movimento ou reversão: (a) em níveis onde, no passado, o preço oscilou por tempo considerável numa banda estreita (zonas de congestão = suporte/resistência); (b) quando pico ou piso anterior estão próximos.
  3. Procure compra/venda **perto das linhas de tendência**, especialmente com volume baixo ou médio; garanta que a linha não tenha sido tocada/aproximada com frequência excessiva.
  4. Atenção a **arrasto** ou repetidos choques com linhas de tendência importantes; prepare-se para vê-las quebradas.
  5. Quebra de linhas de tendência pequenas e opostas à grande tendência sinaliza tomada de posições importantes (fim de correção → retomar tendência maior). Posições podem ser tomadas ou revertidas em paradas nesses pontos.
  6. Triângulos de qualquer formação podem indicar acumulação ou distribuição, mas tendem a se quebrar pelo **lado plano**.
  7. Atenção ao **clímax de volume**, especialmente no final de movimento longo (exaustão).
  8. Não conte com fechamento de gaps a menos que saiba distinguir **gaps de separação (breakaway), normais e de exaustão**.
  9. Durante movimento, forme ou aumente posições na direção do movimento **na manhã seguinte a qualquer reversão, mesmo pequena, especialmente se o volume cair na reversão** (pullback com volume baixo = entrada/pirâmide).
- Barbara Dixon (p. 136): bom sistema = te mantém vivo com capital intacto quando não há tendência e te coloca no mercado quando a tendência se estabelece. **Não abandone o sistema após sequência de prejuízos** — é aí que surgem lucros. Regras simples definem 3 estados: subindo, descendo, de lado (p. 136-137).

### Jesse Livermore e Dickson Watts (p. 137–141, PDF 68-70)
- Livermore: "Não aja com base em dicas"; o dinheiro está nos grandes movimentos, não nas flutuações — avaliar o mercado como um todo e sua tendência (p. 138); paciência para esperar a confirmação (p. 139).
- Watts: qualidades do especulador: autoconfiança, julgamento, coragem, prudência (+ prontidão), flexibilidade (p. 140).
- Pontos: aceitar o que o mercado oferece; viver com volatilidade.

## Cap. 3 — Dados de desempenho (p. 142–171, PDF 70-)
- 5 critérios para avaliar: retornos absolutos, volatilidade, perdas consecutivas acumuladas (drawdown), correlação, soma zero (p. 142).
- **Retorno absoluto**: sem benchmark; buscar ganho em qualquer condição (p. 143-144).
- Fig. 3.1: retornos anualizados 1993-2003 de 23 CTAs: 11% a 31%/ano.
- **Volatilidade ≠ risco** (p. 144-150): desvio padrão mede volatilidade, não risco. Sharpe penaliza volatilidade positiva. Usar **desvio semipadrão** (só retornos abaixo da média; base do Sortino) — TF tem DP 12,51 vs semi-DP 5,79 mensais → volatilidade concentrada no lado positivo (Meaden, p. 148).
  - TF tem mais volatilidade positiva e menos negativa porque sai rápido das perdedoras via **ordens automáticas de saída** (p. 149).
  - Questão não é reduzir volatilidade e sim administrá-la pelo **tamanho de posição** e gestão de risco (p. 149).
  - Henry: risco real = "perder 0,2% em dada operação" (p. 150). (Nota: provavelmente risco médio de perda do capital por trade.)
  - "Limite da vomitabilidade" (Russell): conheça seu limite de drawdown tolerável (p. 151).
- **Drawdown** (p. 152-155): queda % do pico ao vale; dura até novo pico (inclui tempo de recuperação).
  - Dunn (fig. 3.2): 9 drawdowns >25% de 1974-2003; média −35,7%, duração média 7 meses, recuperação média 7,1 meses; pior −52% (1976), −57% em 2007.
  - **Tabela de recuperação (fig. 3.3)**: queda X% exige ganho X/(1−X): 5%→5,3%; 10%→11,1%; 15%→17,6%; 20%→25%; 25%→33,3%; 30%→42,9%; 40%→66,7%; 50%→100%; 60%→150%; 70%→233%; 80%→400%; 90%→900%; 100%→quebra.

- JWH Financial & Metals 1989-99 (fig. 3.4): drawdowns ≥10%: 28 ocorrências (média −19,7%); ≥20%: 10 (−29,2%); ≥30%: 3 (−37,5%). Recuperação: 12 meses depois de drawdown ≥20%, **todos** lucrativos, lucro médio +73,5%; tempo médio pico→piso ~4 meses (p. 156-157).
- Investidores saem na hora errada (cliente saiu no −20% e perdeu +121%) (p. 157). "Operações de curva de capital": aportar no drawdown (comprar o sistema "na baixa") (p. 158).
- **Correlação** (p. 159-163): seguidores de tendência têm correlação 0,33-0,81 entre si (fig. 3.5); tartarugas 0,53-0,87 (fig. 3.6). >0,66 = correlação significativa. Todos operam os mesmos mercados do mesmo jeito → ganham/perdem nos mesmos meses. "Quanto maior a operação, maiores os retornos e os drawdowns — espada de dois gumes" (Parker, p. 163).
- **Soma zero** (p. 163-171): futuros = soma zero (cada comprado tem vendido). Ganhadores têm vantagens persistentes que os fazem ganhar com frequência um pouco maior ou ganhar muito mais quando ganham (Harris, p. 164). "Conheça suas vantagens; se não tiver vantagem, não opere" (p. 164-165). Saiba quem está fornecendo seu lucro (Druz, p. 170).

## Cap. 4 — Grandes eventos, crashes e pânicos (p. 172–238, PDF 86-)
- Eventos inesperados aceleram tendências que já existem (consenso contestado → reforça crise) — TF raramente é apanhado do lado errado; estilo que sai quando perdas atingem limite restringe exposição; TF ≈ opção de longo prazo (Rulle, p. 174).
- "Muitas vezes parece que tendências criam eventos... a essa altura os seguidores de tendência já têm posições estabelecidas" (Russell, nota p. 173).

### Evento 1: crash 2008 (p. 175–189)
- TF não sabia do crash; não ganhou só com short em ações; ganhou em muitos mercados (petróleo, títulos, câmbio, ações, commodities) (p. 176).
- "Não seremos os primeiros a entrar ou sair, mas em geral aproveitamos **80% de uma tendência**" (Wigdor/Superfund, p. 176).
- Superfund (p. 178-183): sistema reduz ou elimina posições em mercados cujas tendências começam a estagnar / com volatilidade histórica extrema (p. 178). Ex.: short dólar + long ouro/energia no 1º sem; ouro tropeçou ~US$200 dos picos >US$1000 → **reduziu posição comprada porque os retornos começaram a perder força** (fig. 4.2, p. 179). Jul-ago: identificou fim de tendências → reduziu risco; sistema começou a identificar tendências emergentes em títulos (fig. 4.3), carnes, metais. Outubro: evitou −18,3% ouro e −32% petróleo (fig. 4.4) por ter reduzido longs; short Nikkei (fig. 4.5), short libra (fig. 4.6).
- Livermore (nota p. 183): "quando determino pelos registros que uma tendência de alta está em curso, torno-me comprador assim que a ação **atinge novo pico em seu movimento, depois de passar por uma reação normal**" (= comprar rompimento de nova máxima após pullback; equivalente a BOS após retração). Vale igual para vendido.
- Vandergrift — exemplos com datas e preços (p. 183-187):
  - Euribor dez/2008 (fig. 4.7): comprado 07/10/2008 a 95,60; ainda comprado a 96,515 (+91,5 pts).
  - EuroSwiss (fig. 4.8): comprado 14/08/2008 a 97,29 → 99,09 (+180 pts), antes do crash.
  - Porco magro (fig. 4.9): vendido 26/08 a 68,75; coberto 13/11 a 55,80 (−18,8%).
  - Madeira (fig. 4.10): vendido 21/08 a 265; coberto 14/11 a 205,11 (−22,6%).
  - Café robusta (fig. 4.11): vendido 08/09 a 2184; coberto 04/11 a 1719 (−21,33%).
  - Dólar index (fig. 4.12): Entrada 1 compra 02/10 a 80,72, saída 20/10 a 84,27 (+4,4%); Entrada 2 compra 13/11 a 87,01, saída 24/11 a 85,42 (−1,9%) → mostra perda pequena após ganho.
  - "Posição a descoberto criada com base em dados de preço, não em fundamentos."
- Seguidor de tendência só age de acordo com o que acontece; não se apega a um mercado específico (p. 187).
- Fig. 4.13: Abraham vs S&P set-out/2008: média diária S&P −0,87% vs ATC +0,33%, correlação −0,39.

### Evento 2: bolha 2000-2002 (p. 189–)
- Fig. 4.14 (2002): Dunn +54%, Henry +45%, Druz +33%, Mulvaney +19%; S&P −23%, Nasdaq −31,5%. Figs. 4.15-4.22: tendências exploradas (short S&P, short dólar, long iene, long euro, long T-bonds, short FTSE, long Bund, short DAX).
- Estilos convergentes (mundo conhecido, estável, reversão à média, vende volatilidade, arbitragem) vs **divergentes** (mundo incerto, instável, afastamento da média, compra volatilidade, trend following) (nota p. 194).
- 2000: drawdown severo dos TF; imprensa declarou "TF morto"; nov-dez/2000 Dunn +28%/+29%, Henry +13%/+23% (p. 194-195). "As coisas parecem piores logo antes de a maré virar."

- Enron/gás natural 2000-01 (p. 196-203, figs. 4.23-4.25): Enron US$90→0,50; quem segurou não tinha estratégia de saída quando a tendência virasse. Gás natural teve tendências ferozes de alta e de baixa; TF ganhou (Dunn WMA out-dez/2000: +9%, +28%, +29%).
- 11/set/2001 (p. 203-204): Seykota — "**Uma surpresa é um acontecimento que pega alguém desprevenido. Se você já está na tendência, a surpresa é para os outros.**" TF já estava vendido em ações e comprado em títulos e vendido em dólar antes do ataque, porque o mercado já se encaminhava nessa direção; posições não foram causadas pelo evento.

### Evento 3: LTCM 1998 (p. 205–219, PDF 103-110)
- LTCM: convergência/reversão à média, alavancagem ~100 bi (exposição 1 tri), supunha distribuição normal; perdeu 44% em ago/1998.
- Parker (p. 208): TF pede ~**10% de capital de risco**; cliente sabe que pode perder 10% num mês e ganhar 10% no seguinte.
- Caudas gordas: eventos de 5 desvios-padrão ocorrem a cada 3-4 anos, não a cada 7 mil anos (p. 209).
- Ganhadores (fig. 4.27): Dunn WMA ago/98 +27,5%, set +16,8%; JWH +17,5%/+15,3%; Man +14,5%. Figs. 4.28-4.35: T-notes, T-bonds, Bund (alta), S&P (queda), franco suíço, eurodólar, iene (alta forte), dólar index (queda).
- Por que LTCM quebrou (Dunn, p. 218): (1) compra abaixo do "valor mediano", venda acima — **reversão à média sem saída**; (2) quando preço vai contra, a lógica manda aumentar posição (averaging down); (3) só se salva com regra estrita de entrada/saída ou capital ilimitado; (4) mercados ilíquidos; (5) capital acabou antes da reversão. → **Lição para scanner: nunca operar contra-tendência sem stop; nunca aumentar posição perdedora.**
- Diferenças TF vs LTCM (Parker, p. 217): transparência (mercados regulados/líquidos), compreensibilidade, sem astros.
- "Boa parte do mundo real é controlada pelos extremos das distribuições" (p. 219).

### Evento 4: Ásia 1997 / Niederhoffer (p. 219–224)
- Niederhoffer vendia opções de venda descobertas (ganhar pouco quase todo mês); perdeu tudo em 27/10/1997 (−50% ago, −99,99% out). Classificação "4 estrelas em risco" (desvio padrão) era enganosa (p. 222). Crítica dele ao TF: "a tendência é sua amiga" não é hipótese testável (p. 223).
- Nota Soros (p. 222): abordagem tinha defeito — se surgisse uma maré, ele sairia ferido por **não ter mecanismo de escape** (stop).

### Evento 5: Barings 1995 (p. 224–228)
- Leeson comprado em Nikkei, aumentando posição enquanto caía (após Kobe, 17/jan/1995). Nikkei 19.000→~14.500 (fig. 4.37). TF vendidos lucraram (JWH Financial & Metals +15,7% fev, +15,3% mar; figs. 4.38-4.39).
- Maioria dos operadores decide pela percepção de direção e busca validação mesmo perdendo; TF planeja imprevistos (p. 225).

### Evento 6: Metallgesellschaft 1993 (p. 228–232)
- MG comprada em petróleo cru (NYMEX) maio-dez/1993, perda ~US$1,3-2,1 bi. TF vendidos.
- Nota Mulvaney (p. 228-229): "**Não existe realização de lucros, em si. Só saímos de um mercado quando atingimos um limite de prejuízo, porque realizar lucros interferiria com o potencial de alta ilimitada... Nossas normas de limite de perdas são um modelo atuarial que analisa a probabilidade e consequências de atingir marcas de saída relacionadas aos preços correntes do mercado.**" → saída = trailing stop (limite de perda a partir do preço corrente), não alvo.
- TF reinvestiam lucros em posições vendidas adicionais enquanto o mercado caía (pirâmide) e estavam dispostos a deixar lucros virarem prejuízo; "**permitiram que o mercado lhes dissesse quando a tendência viraria**" (jan/1994) (p. 231). Saíram em jan/1994 devolvendo parte (fig. 4.41: jan/94 −1,45% a −10,8%).
- Figs. 4.41-4.42: retornos 1993 dos TF +24% a +75%.

### Considerações finais (p. 232–238)
- Crash 1987: S&P −28%; JWH +58% a +70%; 1987 TF +32% a +251% (figs. 4.43-4.44).
- Guerra do Golfo 1990: JWH F&M +38,1% vs S&P +4,4%. Parker: fundamentos desconhecidos (invasão) → análise técnica pressupõe que "dinheiro inteligente" procura o mercado e sinaliza posição (p. 233-234).
- Sem metas de lucro; "retorno móvel"; avaliação trimestral é inadequada — TF pode marcar 28 pontos num período e zero nos demais (p. 234-235).

- Pontos essenciais Cap. 4 (p. 237-238): "As tendências se tornam mais aparentes quando você se afasta do gráfico" (Seykota) → usar timeframe maior para definir tendência. VaR computa volatilidade, não risco.

## Cap. 5 — Beisebol: pensando além da rebatida (p. 239–250)
- "Home runs": TF busca poucos ganhos grandes; Babe Ruth errava ~2/3 das rebatidas mas tinha 0,690 bases/rebatida (fig. 5.1). Taxa de acerto baixa é aceitável se o payoff é alto (p. 241-242).
- Driehaus: "home runs são a maneira de ganhar mais dinheiro, mas é preciso disciplina para evitar eliminação: conter perdas e permitir que ganhos corram" (p. 241).
- DiMaria (nota p. 241): "Operações são um jogo de espera... os lucros vêm agrupados. O segredo é não perder demais entre os home runs."
- Sequências ("mão quente") são em geral aleatórias (Tversky/Gould, p. 249) → não aumentar risco após sequência de ganhos nem reduzir por "sentir" fase ruim; decidir por estatística.

## Parte III — Cap. 6 — Comportamento humano (p. 251–271)
- Teoria do prospecto (Kahneman): lei dos pequenos números (generalizar de poucas amostras); aversão à perda → vende vencedoras cedo e segura perdedoras (p. 252-253). TF faz o oposto: "**aceite as perdas pequenas e vá embora**" (p. 254). Custo incorrido (sunk cost) leva a aumentar posição perdedora — proibido.
- Comportamentos que garantem perdas (p. 255-256): falta de disciplina; impaciência; falta de objetividade; cobiça (tentar acertar topo/fundo); recusa da verdade (preço é a única verdade); impulsividade por notícias; incapacidade de ficar no presente; falsos paralelos (padrão de 1995 ≠ mesmo resultado hoje).
- Seykota (p. 263-264): quando todos acreditam que um mercado já esgotou a alta, muitas vezes ele entra comprado. Olha o gráfico do outro lado da sala: "se parece que vai subir, compra" (visão de longe = tendência dominante).
- **Dicas de Amos Hostetter** (Commodities Corp., p. 269-270) — checklist operacional:
  - Não sacrifique posições por causa de flutuação.
  - Não espere o mercado se esgotar; procure sinais prévios.
  - Não espere análises detalhadas; basta ver que há algo errado (sair).
  - **Nunca tente vender no topo; venda depois de uma reação, se a alta não prosseguir** (saída após pullback que falha em fazer nova máxima).
  - Não imagine que um mercado que chegou a 150 esteja barato em 130.
  - **Não contrarie a tendência do mercado.**
  - Não busque vantagens (barganhas). Busque alertas.
  - **Não tente jogar pela média com uma mão perdedora** (sem preço médio).
  - Não mantenha posições com perdas nem venda as que mostram lucro. **Saia com o menor prejuízo possível e espere pelos maiores lucros.**
  - Perigos: medo do lucro (precipitação), esperança, falta de confiança, fidelidade a mercado em alta/baixa, não respeitar fatos, acreditar no que agrada.
- Seykota (p. 271): "Às vezes as pessoas apostam e perdem para cobrir sentimentos que preferem evitar".

## Cap. 7 — Processo decisório (p. 272–282)
- Fundamentalista não diz quando nem quanto; quando o fundamento fica claro, o movimento pode ter acabado (Seykota, p. 273).
- TF controla o que pode: nível de risco, medir volatilidade, custos de transação (p. 273).
- Navalha de Occam: entre teorias concorrentes, a mais simples é preferível (p. 274).
- **Heurística rápida e frugal** (Gigerenzer/Todd, p. 274-275): decisão com **razão única** — parar a busca na primeira razão que permite a escolha. Para TF: decisão de compra/venda baseada **apenas no preço**. Grandes operadores reagem rápido / revertem posição sem hesitar.

- JWH (p. 277): "Seguimos tendências; usamos informações sobre preços e volatilidade para tomar decisões... extrair sinais apropriados o mais rápido possível para agir rápido e limitar o risco. Somos frugais nos sinais: heurística de reconhecimento de preço em si... não são diferentes do que algumas pessoas definem como **sistemas de breakout**." → núcleo do TF = rompimento de preço + volatilidade.
- Execução: "se a regra diz compre quando o preço chega a 20, compre" — não debater o sinal (p. 280).
- **Processo vs resultado** (fig. 7.1, p. 281): bom processo+bom resultado = sucesso merecido; bom processo+mau resultado = azar; mau processo+bom resultado = pura sorte; mau+mau = justiça poética. Hite: 4 tipos de aposta (boas, más, ganhadoras, perdedoras); ganhar com má aposta é o pior resultado. → Avaliar o sistema pelo processo (aderência às regras) e por amostra grande.
- Pontos (p. 282): "uma das melhores regras de bom senso é **opere com a tendência**" (Seykota).

## Cap. 8 — Ciência das operações (p. 283–295)
- "Se você não tem como medir, não tem como administrar" (Seykota).
- Pensamento crítico; mundo não linear (teoria do caos) — TF lucra porque espera o inesperado (p. 286-287).
- **Tamanho da amostra** (p. 288): probabilidade de desvio aleatório cai quando a amostra cresce. Dois operadores com 40% de acerto e ganho médio 3× a perda: o com 10 trades tem muito mais chance de ter sequência de só 10% de acerto que o com 1.000 → **validar sistemas só com amostras grandes de trades**.
- Desvio padrão como risco é enganoso quando a distribuição não é normal (p. 289-290).
- **Assimetria (skew) positiva**: TF produz distribuição não normal com cauda direita longa; "eliminar posições perdedoras e reter as ganhadoras" gera skew positivo (JWH, p. 292). Curtose/caudas gordas: retornos extremos mais frequentes que na normal (p. 291-292).
- **Ganhos compostos** (fig. 8.1, p. 293-294): US$20k a 30%/40%/50% a.a. por 7 anos → 159k/314k/617k. "O objetivo é investir para não perder; perdas arruínam o índice de ganhos compostos" (Rogers).
- Pontos (p. 294-295): definir riscos em termos numéricos é crítico; TF ganha nas regiões limítrofes (caudas) da curva de sino.

## Cap. 9 — Cálices sagrados (p. 296–313)
- Comprar e manter não responde: comprar quanto? quando sair? (p. 297). Nasdaq 1972-80 sem recuperação; Nikkei ~40k (1989) → <10k (fig. 9.1); ações de tecnologia 1968 caíram 82-93% (fig. 9.2).
- "**Perda média é perda**" (Paul Tudor Jones, p. 301-302). Livermore: não fazer preço médio comprando mais na queda (50→47→44...) (p. 303). **Se a tendência é de queda, a oportunidade é de venda, não de compra** (p. 302). "Quanto mais tempo um mercado cair, mais provável que continue caindo."
- Tiger/Robertson: posição tão grande que não se pode sair se errado → limite de tamanho relativo à liquidez (p. 304).
- Onda de Elliott: "não é teoria alguma, apenas a observação banal de que uma tabela de preços envolve picos e pisos" (nota p. 299); Charlie Wright: tentar prever (Elliott, ciclos, Fibonacci) fez errar; só passou a ganhar ao parar de prever (p. 312-313).
- Teoria de Henry (nota p. 311): ativos em movimento tendem a se manter em movimento sem mudar de direção (momentum).

## Parte IV — Cap. 10 — Sistemas de operação (p. 314–)
- Sistemas quantificados: Dunn — "risco programado de **1% de probabilidade de perda mensal de 20% ou mais**" (p. 314).
- "Administrar dinheiro é um termostato — sistema de controle de risco que mantém suas operações em temperatura agradável" (Burke, p. 315).

- Risco calculado vs risco cego (p. 317). Taxa de acerto sozinha não diz nada: 80% de acerto com perdas grandes pode perder dinheiro (p. 318).
- **Esperança matemática** (p. 319): E = Σ(prob × resultado). Moeda 50/50 paga 1:1 → E=0; paga 1,5:1 → E = 0,5×1,5 + 0,5×(−1) = **+0,25** por unidade arriscada. Sistema precisa ter E > 0.
- Seykota: "**Risco é a possibilidade de perda**" (p. 320).
- Boa administração de risco (p. 320-321): (1) sistema e gestão de risco claros a ponto de virar **código de computador**; (2) diversificação e seleção de instrumentos inclusas no teste; (3) **backtest e teste de estresse** para medir sensibilidade de parâmetros; (4) acordo sobre volatilidade e retorno esperados; (5) relação investidor-gestor; (6) respeitar o sistema acima de tudo.

### ★ Cinco questões para um sistema de negociação (p. 321) — esqueleto do scanner
1. **Em que mercado** comprar ou vender em cada momento?
2. **Quanto** comprar ou vender (tamanho)?
3. **Quando** entrar ou sair?
4. Quando **abandonar uma posição perdedora**?
5. Quando **abandonar uma posição ganhadora**?
- Autoavaliação antes de operar: natureza, quanto quer ganhar, esforço, experiência, recursos, pontos fortes/fracos (p. 322).

#### Q1 — Em que mercado (p. 322–326)
- AHL: >100 mercados em 36 bolsas; carteira fig. 10.1: câmbio 24,3%, títulos 19,8%, energia 19,2%, ações 15,1%, juros 8,5%, metais 8,2%, agrícolas 4,9%. Mesmo método (análise de preço) em todos os mercados (p. 322-323).
- AHL: tendências = **correlação serial** (movimentos passados dão forma aos futuros), por comportamento de manada e diferença de informação (p. 323).
- Vandergrift (p. 324): com 18 mercados ficava ativo em só 7-8 por vez; perdas vinham de 1-2 setores **altamente correlacionados** batendo stop juntos (T-note 10a e 5a). Expandiu para >40 mercados, ativo em ≥15 → melhora dramática sem mudar entrada/saída. → **Limitar exposição por cluster de correlação.**
- Mulvaney out/2008: +40% com lucro distribuído por câmbio, juros, ações, metais, energia, safras, gado (p. 324-325).
- Nota Mark Douglas (p. 325): distribuição aleatória de ganhos/perdas — sabe-se que das próximas 20 operações 12 ganham e 8 perdem, mas não a sequência.

#### Q2 — Quanto (gestão de risco / position sizing) (p. 326–330)
- Burke: decisão do tamanho = risco da operação; risco demais → ruína; de menos → retorno não cobre custos (p. 326).
- **Risco inicial típico: 2% do capital** (US$100k → US$2k) (p. 327). "Existem operadores que não arriscam mais de **1%**, mas me surpreenderia se alguém arriscasse mais de **5%** numa só transação. Arriscar pouco não dá ao mercado oportunidade de permitir uma operação lucrativa."
- Exemplo Padley (nota p. 322): US$100k arriscando 5% = US$5k; se o gráfico mostra risco de US$1k por contrato → 5 contratos; com 10% → 10 contratos. → **Fórmula: contratos = (capital × %risco) / (distância do stop × valor do ponto)**.
- **"Calor da carteira" (portfolio heat)** de Seykota (p. 327-328): soma do risco aberto. Carteira arriscando **2% em 5 instrumentos = calor 10%**, igual a 5% em 2. Limitar o heat total; acima de certo ponto, mais calor dá menos ganho. Seykota: "capital central" = capital ajustado por risco; "calor" = % de tolerância (p. 328).
- **Reajuste ao capital atual** (p. 328-330): calcular tamanho sobre o capital corrente (se 100k caiu para 75k, opera como 75k; se subiu, aumenta). Dunn ajusta posições ao volume de capital. Mulvaney: TF gira em torno de **reequilibrar dinamicamente as posições**; gestão de risco é parte da lógica interna, não separada.
- "Os três melhores indicadores de mercado: 1. Preço. 2. Preço. 3. Preço." (nota p. 329)

#### Q3 — Quando entrar/sair (p. 330–333)
- Entra **depois** que a tendência começou; única forma de saber que surgiu é quando começa a se mover. **Exemplo Apple**: lateral entre US$100 e US$120 por 6 meses; dispara para US$130 → **rompimento de faixa estável = gatilho** (p. 330). "Nossos sistemas enviam sinal apenas quando uma tendência clara se desenvolve; por definição jamais entramos no comecinho nem saímos no topo" (p. 330).
- Tendência de 50 a 100: entrar a 52, 60 ou 70 — todas lucram; não ficar de fora por ter perdido o 52 (p. 331).
- **Dennis — não esperar pullback** (p. 331): "Sempre que o mercado sobe montante razoável — digamos em função de um **dia forte** — depois que você formou sua posição, vale a pena **ampliá-la**. Não vale a pena esperar uma queda momentânea... feijão a 8 sobe para 9: melhor comprar a 9 que esperar 8,80; a estatística mostra que se ganha mais comprando a 9." (Nota: contrasta com Donchian norma 5/9 que recomenda entrar após reversão de 1 dia — ver Dúvidas.)
- Seykota: "A entrada é grande preocupação até você entrar; depois se torna preocupação menor" — depois de entrar, o preço de entrada pouco importa; foco é proteção contra risco (p. 331-332).
- Duração: posições de **2 a 4 meses** comuns, algumas >1 ano; historicamente **apenas 30% a 40% das operações dão lucro** (p. 332).
- Jim Little (Campbell): 60% perdedoras perdendo 1% do capital, 40% ganhadoras ganhando 2% → retorno ~20%/ano diversificado (p. 332). (Conta: 0,4×2 − 0,6×1 = +0,2% por trade.)
- **Indicadores**: "O indicador técnico dos seguidores de tendência é a movimentação de preços." MACD, Bollinger, ADX, Williams %R são ferramentas pequenas; respondem por ~**10%** do sucesso de um sistema (p. 332-333). TF acumula pequenas perdas "testando o bolo com palito" até achar a tendência que cresce → **~60% de operações perdedoras é normal** (p. 333).

#### Q4 — Quando sair da perdedora (p. 333–335)
- Pensar em como e quando sair **antes** de entrar; preservar capital (p. 333). Sair "o mais rápido possível".
- Baruch: com 30-40% de acerto se faz fortuna se cortar cedo os prejuízos (p. 334).
- Ex.: ações Google com **limite de perda de 2%**: chegou ao limite, sai. Ponto. (p. 334)
- Whipsaw/ricochetes (libra de Dunn, fig. 2.4): sucessão de sinais de entrada e saída; aceitar como parte do jogo; "a única maneira de evitar ricochetes é não operar" (Seykota) (p. 334).
- Mentor da Commodities Corp. arriscava **1%** da carteira por operação no início (p. 335).

#### Q5 — Quando sair da ganhadora (p. 335–337)
- Candles de reversão, suporte/resistência para "realizar lucros" — "nada disso funciona; não há como detectar reversões até que ocorram" (p. 335).
- Sem metas de lucro: entrou a 100 com alvo 125 → perde o movimento até 225 (p. 336). Metas limitam os grandes ganhos que pagam os ricochetes.
- Deixar a tendência atingir o pico e **começar a cair** antes de realizar (p. 336).
- **Fig. 10.2 — "o meio"**: início da tendência → **Entrada (X) acima de uma linha horizontal tracejada** (rompimento de nível) depois que a tendência já subiu um pouco; Pico da tendência; **Saída (X) quando o preço cai abaixo de outra linha horizontal tracejada** abaixo do pico. TF captura a parte do meio — não compra no fundo nem vende no topo (p. 337).
- Mecanizar = incorporar todas as decisões discricionárias às regras com antecedência (risco tolerável, universo de mercados, o que fazer se o mercado subir 100% num dia ou cair 10%) (p. 337).
- Hite: "a primeira pergunta não é quanto podemos lucrar, mas quanto podemos perder. Jogamos na defesa." (p. 338)
- Exemplo de sistema completo no Apêndice F (Mechanica).

### Perguntas frequentes (p. 338–349)
- Capital inicial: não há quantia "certa"; disciplina importa (p. 338-339).
- TF funciona em ações (Chesapeake; Apêndice A) (p. 339-341).
- **Ajuste de curvas / robustez** (p. 341-346): regras como "luva de lã, não de couro". **Teste de robustez**: se o sistema funciona a 20 mas não a 19 ou 21 → não robusto; se funciona com 40 e 60 quando o ótimo é 50 → robusto (p. 342). Sistema deve funcionar em todos os mercados com os mesmos parâmetros (Tropin: criado em T-bonds, deve funcionar em ouro e algodão e em dados fora da amostra) (p. 345-346). Comparar periodicamente backtest com resultado real; manter diário (p. 344).
- Donchian: com limites de perda claros, basta 1-2 min por mercado no final do dia para ver sinais; ordens na manhã seguinte (p. 344) → **scanner em candle fechado (diário)**.
- Colega com 15% ganhadoras, 50% perdedoras, 35% empate teve +300% em 2005 (p. 345). Sistema com 90% de acerto: 90×US$100 − 10×US$1.000 = −US$1.000 (p. 345).
- **Day trading** (p. 347): quanto mais se opera, menor o lucro por transação e o custo por transação fica igual — não é estratégia vencedora para a maioria.
- Melamed/prata 1979 (p. 347-349): saiu com meta de lucro (prata a US$15 "cara") e perdeu a alta até US$50; sem critérios de entrada nem estratégia de saída. Lição: decidir estratégia em baixa pressão; executar o plano.
- Nota Tropin (p. 350): posições ~6 meses; programas abandonam posição malsucedida depois de 1 mês (time stop).
- Pontos essenciais Cap. 10 (p. 350): TF acerta a tendência mas erra picos e pisos; "se não pode arcar com perdas, não pode operar"; prejuízos devem ser quantificados antes de entrar; após o sinal de entrada, é um jogo de espera; **"quanto mais volátil o mercado, menor o risco (posição); quanto menos volátil, maior"** (interpretação: tamanho inversamente proporcional à volatilidade).

## Cap. 11 — O jogo (p. 351–)
- Hite: "Não opero para ficar animado, opero para ganhar." Mudanças necessárias: operar comprado e vendido; adotar gestão de risco ("a questão do quanto nem é proposta" pela maioria); tirar emoção e ego (p. 352-353).
- Alavancagem: o essencial é não exagerar (p. 354).

- Menos alavancagem = menor retorno (Dennis/Turtles ao gerir clientes) (p. 357). Resultado anual pode ser −10%, −15%, +115%: quem desiste no 2º ano não vê o 3º (p. 359).
- Hite: "vida é uma série de apostas" — conjunto de desfechos prováveis e o desfecho específico (p. 359).

## Posfácio (p. 361–376) e Comentários de Faulkner (p. 377–381)
- Hite (Man Group) — **Alavancagem Assimétrica**: mesmo com conhecimento perfeito do preço de 31/dez, a alavancagem sustentável máxima **nunca superaria 3:1**, porque não se sabe o caminho até lá (p. 363). → limite prático de alavancagem efetiva da carteira.
- Abraham (p. 367): % de dias ganhadores 54%; meses 56%; trimestres 64%; semestres 77%; anos 92%; biênios 100% → avaliar em janelas longas.
- Nota Seykota (p. 373-374): "Todas as tendências são históricas; nenhuma está no presente... A única maneira de medir tendência corrente seria tomar dois pontos no agora e computar sua diferença" → tendência = diferença entre preço atual e preço passado (definição operacional por janela).
- Sharpe penaliza grandes retornos positivos; inadequado para TF (Harding, p. 373).
- Faulkner (p. 379): "Não importa o que você pensa, mas o que o mercado faz"; operar é probabilístico; **pirâmide: aumentar a posição por valores menores a cada adição** cria mais ganho do que aumentar por valor igual.

## Apêndice A — Trend Following para ações (Wilcox & Crittenden, Blackstar) (p. 384–395+)
> O PDF termina na p. 395 (meio do Apêndice A). Apêndices B–G (incl. F — sistema Mechanica dólar canadense; E — modelo Mulvaney; G — questões críticas) **não estão no arquivo**.
- Perguntas: quais ações? quando/como comprar? quando/como vender? (p. 385)
- Dados: >24 mil ações NYSE/Nasdaq/Amex, jan/1983–dez/2004; **inclui deslistadas** (sem viés de sobrevivência); preços ajustados a dividendos/splits; **filtro de preço mínimo e filtro de liquidez diária mínima** aplicados dia a dia (p. 385). Universo variou de ~200 (1983) a ~2.500-3.000 ações (p. 386).
- **ENTRADA (p. 386)**: "fechamento histórico mais alto" — **se o fechamento de hoje ≥ maior fechamento de toda a história da ação → comprar na abertura de amanhã**. Escolhido para evitar ambiguidade: ação em pico histórico está em tendência de alta sob qualquer definição. Gráficos semanais (EMC, TASR, HOC, XTO, POOL, SLG, YHOO, MAA, MSFT, HANS): pontos verdes = fechamento semanal recorde; linha horizontal = pico histórico anterior que disparou a entrada.
- **SAÍDA (p. 388-389)**: **trailing stop por ATR** ("faixa média real de flutuação").
  - True Range = maior de: (máx − mín do dia), (máx do dia − fechamento anterior), (fechamento anterior − mín do dia). ATR = média do TR.
  - Stop = **10 × ATR** abaixo (stop móvel que só sobe — gráficos NTES/SJI mostram degraus ascendentes). Ação volátil de internet: stop pode ficar a ~55% do preço; utility de baixo volume: ~15%.
  - **Execução: sair na abertura do dia seguinte ao nível de saída ter sido atingido.**
  - (Período do ATR não especificado — ver Dúvidas.)
  - Exemplos de saídas (p. 390): WCOM, SUNW, JDSU, ENE (Enron), NT, LXK, DRL, TQNT — o trailing tirou antes do colapso.
- **Resultados (p. 391-392)**: >18 mil operações em 22 anos; custo 0,5% por compra e venda. 17% das operações ganharam ≥50%; só 3% perderam ≥50%. **Taxa de acerto 49,3%**; **ganho médio/perda média = 2,56**; **expectativa ≈ +15,2% por operação**; **duração média 305 dias corridos**.
  - Robustez: testado multiplicador ATR de **8 a 12 em passos de 0,5** — sem diferença material. ATR maior (mais frouxo) → acerto ligeiramente maior e payoff um pouco menor; ATR menor → o inverso (p. 392).
- **Normalização por R (p. 392-394)**: risco inicial % = (entrada − stop)/entrada. Resultado em múltiplos de R. −100% = perdeu exatamente o risco planejado; < −100% = gap/queda abrupta; > +100% = ganhou mais que o risco.
  - Ex.: XYZ comprada a 15,50, stop ATR10 em 11,32 → risco inicial 27%; vendida a 30,75 dois anos depois (+98%) → **+3,63R**.
  - Ex.: ABC comprada a 32,35, stop 26,53 (risco 18%); 3 meses depois gap abaixo do stop, vendida a 21,15 (−35%) → **−1,94R** (quase o dobro do previsto).
  - <400 operações (~2%) perderam mais que o risco planejado. Normalizar por R impede que ações voláteis dominem os resultados.
  - Fig. aberrantes negativos por ano: 1%–6% (pico 1987); positivos variam de ~2% a ~72% (2003) → concentração no tempo.
- Posições vendidas não testadas em ações (empréstimo, recompra forçada) (p. 395).

---

# Regras que podem virar código

> Adaptação para Binance perpétuos: "dia" = candle do timeframe escolhido (o livro usa diário/semanal). Parâmetros do livro entre colchetes; demais valores marcados como [sugestão] são minha adaptação.

**Universo / filtro**
1. Operar apenas símbolos com liquidez mínima: volume médio (ex. 20 candles) em USDT ≥ limiar configurável e preço ≥ mínimo [p. 385]. Recalcular a cada candle.
2. Operar muitos mercados não correlacionados; limitar exposição por cluster: se correlação de retornos (ex. 60 candles) entre dois ativos com posição aberta > 0,66, contam como mesmo cluster; risco somado do cluster ≤ limite [p. 159-163, 324].

**Definição de tendência / sinais de entrada (escolher um, todos testáveis)**
3. Breakout de máxima histórica (Apêndice A): `close[t] >= max(close[0..t-1])` → long na abertura do próximo candle [p. 386]. Para cripto, máxima histórica do símbolo (ou da janela disponível).
4. Breakout de N períodos (Donchian/Turtle): `close[t] > max(high[t-N..t-1])` → long; `close[t] < min(low[t-N..t-1])` → short. N típicos do livro: 20 dias / 4 semanas, 13 semanas, regras de 1/5/20 semanas [p. 124-127 item 21; p. 131].
5. Breakout de faixa lateral: se `(max(high,N) - min(low,N)) / min(low,N) <= X%` durante N candles (faixa estável) e o fechamento rompe a faixa → entrada na direção do rompimento [exemplo Apple 100–120 → 130, p. 330]; reforço: volume do candle de rompimento > média (Donchian norma geral 2, p. 133).
6. Entrada Livermore: em tendência de alta (preço > máxima de N períodos recente/ HH-HL), comprar quando o preço faz **nova máxima após uma reação (pullback)** normal [p. 183]. (≈ BOS após retração.)
7. Entrada alternativa Donchian: tendência dos últimos 3 candles na mesma direção + 1 candle de reversão contra (de preferência com volume menor) → entrar na abertura seguinte a favor dos 3 [normas 5 e técnica 9, p. 134-135].
8. Sistema reversível opcional (Dunn): sinal oposto fecha e inverte a posição (stop-and-reverse) [p. 67, 70].
9. Estado neutro: sem sinal → sem posição (scanner não força trade) [p. 89].

**Stop inicial / saída**
10. Stop inicial obrigatório definido ANTES da entrada; ordem enviada junto [p. 129, 333].
11. Trailing stop de volatilidade: `stop = max(stop_anterior, highest_close_since_entry - k*ATR)` para long (espelhado para short), com k ∈ [8..12], padrão 10 no diário para ações [p. 388-392]. [sugestão cripto: k menor, ex. 3–5 ATR, já que ATR10 é para ações long-only de baixo giro — validar por backtest].
12. Saída por canal oposto (Fig. 10.2): long sai quando `close < min(low, M)` com M < N (linha horizontal abaixo do pico) [p. 337].
13. Execução da saída na abertura do candle seguinte ao toque/fechamento além do stop [p. 389].
14. Sem take profit fixo; posição só fecha por stop/trailing/sinal oposto [p. 51, 129, 228, 336]. (Opcional configurável, mas default OFF.)
15. Time stop opcional: se após X candles [Tropin: ~1 mês no diário] a posição não andou a favor (ex. < +0,5R), fechar [nota p. 350].

**Dimensionamento (position sizing)**
16. Risco por trade = r% do patrimônio atual, r default 1% (faixa 0,5–2%; nunca > 5%) [p. 71, 87, 327, 335].
17. `qty = (equity * r) / |entry - stop|` (em perpétuos: qty em contratos; checar notional e alavancagem resultante) [p. 322 nota Padley].
18. Recalcular equity a cada trade (capital corrente, não inicial) [p. 328-329].
19. Portfolio heat: soma do risco aberto (Σ |preço atual − stop| × qty) ≤ H% do equity [Seykota: ex. 5×2% = 10%] [p. 327-328]. Novo sinal só se couber no heat.
20. Alavancagem efetiva total (notional/equity) ≤ 3 [Hite, p. 363] [sugestão como teto duro].
21. Tamanho inversamente proporcional à volatilidade (já implícito em 17 com stop em ATR) [p. 64, 350].

**Pirâmide**
22. Nunca adicionar a posição perdedora / nunca fazer preço médio [p. 218, 270, 301-303].
23. Adicionar somente quando a posição está a favor: ex. após +1R ou novo rompimento/nova máxima; cada adição menor que a anterior (ex. 1/2, 1/4) ["camadas cada vez menores", p. 98, 379]; alternativa Hostetter: 1/3 inicial, +1/3 se a favor, último 1/3 no alvo de extensão; sair se perda ≥ 25% do risco do 1º terço [p. 101]. Após cada adição, recalcular stop de toda a posição para que o risco total ≤ limite.
24. Dennis: após um "dia forte" a favor (ex. range/corpo > 1,5×ATR e fechamento perto da máxima), adicionar sem esperar pullback [p. 331].

**Filtros de contexto / alertas**
25. Clímax de volume no fim de movimento longo (volume > k×média, após tendência de N candles) → alerta de exaustão: apertar trailing, não abrir nova posição na direção [Donchian técnica 7, p. 135].
26. Gap classificação: não presumir fechamento de gap; gap de rompimento na direção de tendência recém-iniciada é ponto de entrada válido [p. 124-127 item 8; p. 135 técnica 8].
27. Triângulos/compressão: esperar rompimento, com viés para o lado "plano" (lado horizontal) [p. 135 técnica 6].
28. Measured move: após impulso + lateralização, projetar 2º impulso ≈ 1º (só como informação, não como alvo de saída) [p. 134 técnica 1].

**Validação / métricas do backtest**
29. Reportar: taxa de acerto, payoff (ganho médio/perda média; alvo ≥ 2,5–3) [p. 124-127 item 17; p. 392], expectativa por trade em R, distribuição de resultados em R, % de trades < −1R (slippage/gap), duração média, max drawdown, tempo de recuperação.
30. Expectativa: `E = p_win*avg_win - p_loss*avg_loss > 0` [p. 319].
31. Robustez: variar cada parâmetro ±20% (ex. k ATR 8–12, N 15–25); resultados não podem colapsar [p. 342, 392]. Testar os mesmos parâmetros em todos os símbolos e out-of-sample [p. 345-346].
32. Amostra grande: não tirar conclusões com < ~100 trades [p. 288].
33. Custos incluídos (fees + funding + slippage; livro usa 0,5% por lado em ações) [p. 391].
34. Avaliar em janelas longas (rolling 12 meses); esperar 30–50% de acerto como normal [p. 113, 332, 367].

# Como complementa o método Excelência Trading (SMC/ICT + Wyckoff + Volume Profile)

- **Camada de gestão de risco que falta ao SMC**: o livro é quase todo sobre *quanto* e *quando sair*. Usar como motor de position sizing (risco fixo 0,5–1% por setup, qty pelo stop estrutural), portfolio heat (limite de risco aberto somado em várias moedas correlacionadas — em cripto quase tudo correlaciona com BTC, então tratar alts como um cluster) e teto de alavancagem.
- **Gestão do trade vencedor**: SMC costuma usar alvos fixos (liquidez oposta, FVG, POC). O TF diz que os grandes lucros vêm de não ter alvo. Combinação prática: realizar parcial no alvo SMC (ex. liquidez/POC oposto) e deixar o restante com trailing por ATR ou por estrutura (último HL/LH no TF de execução) — "runner".
- **Filtro de tendência no HTF**: "tendências ficam mais aparentes ao se afastar do gráfico" → só tomar setups SMC (OB/FVG/BOS) na direção do rompimento de N períodos / máxima histórica no diário/semanal. Dá viés objetivo e codificável para o scanner.
- **Wyckoff**: as normas de Donchian casam com Wyckoff — "em período parado, siga o movimento na direção em que o volume se adensar" = saída de range com esforço/volume (SOS/SOW); "clímax de volume no fim de movimento longo" = BC/SC; "comprar após reação de volume baixo" = LPS/BU; "um movimento seguido de lateral precede outro de tamanho parecido" = causa e efeito/re-acumulação. Rompimento de faixa lateral (exemplo Apple) = fase D/E.
- **Volume Profile**: Donchian técnica 2 (resistência em zonas onde o preço ficou muito tempo em banda estreita) = HVN/value area. Útil para posicionar stop atrás de HVN e esperar aceleração em LVN.
- **Livermore "nova máxima após reação normal"** ≈ BOS após pullback para OB/FVG — mesma lógica de continuação.
- **Disciplina/mecanização**: o livro reforça transformar todo critério discricionário do curso em regra antes de operar e validar com backtest grande, robusto a parâmetros.
- Ponto de conflito: SMC trabalha muito com reversões (sweep de liquidez + CHoCH contra tendência). O TF é contra antecipar topos/fundos. Sugestão: no scanner, marcar setups contra a tendência do HTF como "baixa prioridade/contra-tendência" e com risco reduzido.

# Dúvidas / pontos ambíguos

1. O PDF tem só 200 páginas e termina na p. 395 do livro (meio do Apêndice A). Apêndices B–G (inclusive o **sistema completo da Mechanica — Apêndice F** e os **modelos de Mulvaney — Apêndice E**) não estão no arquivo; seriam a parte mais "codificável". Vale procurar outra edição/arquivo.
2. Apesar do nome do arquivo, o livro não ensina análise gráfica clássica em detalhe; as regras gráficas são poucas (normas de Donchian de 1934, exemplo Apple, Fig. 10.2, Apêndice A).
3. Período do ATR no Apêndice A não informado (só "ATR 10" = 10 unidades de ATR). Assumir 14 ou 20 e testar.
4. "Saída de ATR 10": não fica 100% explícito se o trailing é ancorado no fechamento máximo, na máxima, ou no fechamento atual; os gráficos mostram degraus ascendentes → interpretei como `max_close_desde_entrada − 10×ATR`, nunca descendo.
5. Respostas do questionário dos Turtles (p. 124-127) não são dadas no livro; as marcações V/F nas notas são inferências pela filosofia.
6. Conflito de entrada: Donchian (normas 5 e 9) recomenda entrar após 1 dia de reversão (pullback), enquanto Dennis (p. 331) diz que estatisticamente é melhor comprar na força sem esperar pullback. Testar ambos.
7. "Quanto mais volátil o mercado, menor o risco" (p. 350) é ambíguo; interpretei como "menor a posição" (consistente com Dunn, p. 64).
8. Riscos por trade citados variam: 0,2% (Henry, p. 150), 1% (Commodities Corp, p. 335), 2% (Henry café, p. 87; padrão p. 327), 2–6% (Dunn, p. 71), máx. 5% (p. 327). Para cripto alavancado, sugerir 0,5–1%.
9. Parâmetros de Dunn ("porcentagem de movimento ante alta/baixa recente", com volatilidade de curto prazo) não são dados — só a descrição qualitativa.
10. Os resultados (Apêndice A) são em ações long-only, diário, com custos de ações; não transferíveis diretamente para perpétuos (funding, 24/7, alavancagem, liquidações). Exige backtest próprio.
11. Hostetter "perda de 25%": não está claro se é 25% do preço, da posição ou do risco; tratei como parâmetro.
