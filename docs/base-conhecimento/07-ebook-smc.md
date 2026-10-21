# E-book Básico SMC — Smart Money Concepts (@marraik, Marcos Leitão)

Notas de estudo operacionais. "p" = página do PDF (36 págs). Livro curto, didático, baseado em figuras; poucas regras numéricas.
Sumário (p2): 1) Estruturas do mercado; 2) BoS vs CHoCH; 3) Imbalance/FVG; 4) Zonas de liquidez & Inducement; 5) Supply & Demand; 6) Order Blocks; 7) Passo a passo.

---

## 1. Estruturas do mercado (p3–7)
- Mercado tem 3 direções: alta, baixa, lateral. Mapear a estrutura revela a direção pretendida.
- **Alta**: topos e fundos ascendentes — **HH** (higher high) e **HL** (higher low).
- **Regra de confirmação (p3–4)**: **um HL só é confirmado quando o preço quebra o HH anterior.** (Figura p4: linha vermelha do HH sendo rompida → "HL confirmado, pois quebrou o HH".)
- **Baixa**: **LH** e **LL**. **Um LH só é confirmado quando o preço quebra o LL anterior** (p5).
- **Range (p5–6)**: topos e fundos no mesmo nível → **EqH (Equal Highs)** e **EqL (Equal Lows)** = 2 ou mais topos/fundos iguais. São **liquidez** (muitas ordens acima/abaixo); cuidado ao operar range.
- **Estrutura bearish no gráfico (p6)**: "quando um LH quebra um LL, o preço retrai para formar a mesma estrutura. **Só consideramos um LL (1) quando o próximo LH (2) não quebra o último LH (3).**" → um fundo só vira LL válido se o pullback seguinte fizer topo abaixo do LH anterior.
- **Estrutura bullish (p7)**: mesmo raciocínio. "Se houver uma quebra de fundo e o mercado continuar subindo, esse fundo que quebrou será nosso HL referência" (i.e., se o pullback rompe um fundo menor mas a alta continua com novo HH, o ponto mais baixo desse pullback passa a ser o HL de referência — estrutura de swing, não de cada pernada interna).
- Critérios objetivos (para código):
  - Swings detectados por pivôs (fractal N barras ou zig-zag por ATR).
  - Tendência de alta ativa enquanto último fundo protegido (HL confirmado) não for rompido; HL é o fundo mais baixo entre o HH anterior e o rompimento desse HH.
  - Tendência de baixa: simétrico (LH = topo mais alto entre o LL anterior e o rompimento desse LL).
  - Range: ≥2 topos e ≥2 fundos dentro de tolerância (EqH/EqL).

## 2. BoS vs CHoCH (p8–14)
- **BoS (Break of Structure)** (p8): rompimento de uma estrutura (topo em alta / fundo em baixa) **a favor da tendência** — a tendência continua. Figuras: BoS bullish = rompe topo anterior (ponto amarelo = estrutura; perna vermelha = movimento que rompe).
- p9: "**O movimento que ocorre o BoS bullish precisa partir do fundo mais baixo**" — entre o 2º e 3º BoS há uma pequena estrutura interna, mas conta-se o BoS a partir do pullback que fez o fundo mais baixo (rompeu o fundo anterior). Ou seja, marcar BoS só nos swings relevantes do TF, não em micro-estruturas.
- p10: BoS de baixa = rompe fundo anterior e o preço segue caindo.
- p11: dentro de cada BoS há BoS menores em TF menor; **marca-se BoS (deste TF) quando rompe os LH/LL identificados conforme cap. 1** (pontos de estrutura). Fractal por TF.
- **CHoCH (Change of Character)** (p12): rompimento de estrutura que **muda a tendência anterior**. Esquema de alta (p12): em tendência de baixa com BoS, o preço faz **exaustão** (ponto verde = último fundo/origem do impulso); o impulso a partir dele **rompe o último topo (LH) relevante** (ponto azul) → CHoCH; o topo que rompeu (vermelho) confirma; **frequentemente o preço volta para testar a nova demanda** (ponto amarelo, zona verde = região do impulso que originou a quebra) e segue em alta.
  - Legenda das figuras: azul = último topo e fundo; vermelho = topo/fundo que quebrou a estrutura anterior; amarelo = volta para testar demand/supply; verde = última região/impulso que originou a quebra e confirmação do CHoCH.
- p13: CHoCH bearish: em alta com BoS, topo final (verde) → queda rompe o último HL (azul) → CHoCH; fundo que rompeu (vermelho); **pullback testa a supply** (zona laranja = região do topo que originou a queda) → BoS de baixa subsequentes.
- p14 (exemplo real bearish): CHoCH marcado tanto no topo menor (micro) quanto no fundo; zona de supply = vela(s) do topo (verde) até o início da queda; retorno (amarelo) à supply com pavio → queda forte.
- **Uso operacional (p14)**: marcar zona importante no **TF maior (ex. H4)**, descer para **15m/5m**, esperar **CHoCH nessa região** e o **reteste na demanda (CHoCH de alta) ou supply (CHoCH de baixa)** criada pelo impulso; entrar considerando horário e outras confluências.
- Critérios (código):
  - BoS = fechamento (ou rompimento — o e-book não define se é pavio ou corpo) além do último swing estrutural **na direção da tendência vigente**.
  - CHoCH = rompimento do swing protegido **contra** a tendência vigente (em baixa: rompe o último LH; em alta: rompe o último HL); a tendência muda de rótulo.
  - Zona pós-CHoCH = região do extremo que originou o impulso (último candle oposto/base antes do impulso até o extremo) → POI para reteste.
  - Invalidação: preço volta e rompe o extremo de origem (ponto verde) → CHoCH falhou.

## 3. Imbalance / FVG / Ineficiência (p15–19)
- **Definição (p15–16)**: gap/vácuo de preço criado por movimento brusco (um lado no comando). "Um imbalance é caracterizado quando **a mínima de um candle não toca a máxima do 3º candle**" (versão de alta: high do candle 1 < low do candle 3; de baixa: low do candle 1 > high do candle 3). **O candle do meio é o imbalance.** FVG (fair value gap) = mesmo conceito.
- p18 (figura): "Eficiência/equilíbrio = pavios se tocam"; "Ineficiência/imbalance/FVG = pavios não se tocam".
- **Comportamento**: "não é regra, mas geralmente e na maioria das vezes o preço volta a preencher essa região" (mercado busca captar ordens/balancear). Figuras p15–17: imbalance de alta deixado na base do rally, preenchido depois por vela de baixa ("imbalance preenchido – preço equilibrado"); imbalance de baixa (p16) preenchido muitas velas depois na alta; gap verdadeiro entre fechamento/abertura (p17) também preenchido.
- **Dica (p19)**: **imbalance formado logo após uma região de order block (demanda/supply) = região forte** (só instituições movem o preço tão bruscamente). Figura: zona de demanda (verde) com imbalance (rosa) logo acima; preço retorna, toca a demanda/imbalance (ponto roxo) e sai em alta — duas vezes em sequência (padrão de continuação).
- Entradas: "através de um imbalance e um toque na região formada fazemos algumas entradas." Quanto mais confluências, melhor.
- Critérios (código):
  - FVG bullish em i (candle do meio): `high[i-1] < low[i+1]`; zona = [high[i-1], low[i+1]]. Bearish: `low[i-1] > high[i+1]`; zona = [high[i+1], low[i-1]].
  - Estado: aberto → parcialmente preenchido → preenchido (preço atravessa toda a zona). O e-book não define limite mínimo de tamanho.

## 4. Zonas de liquidez & Inducement (p20–...)
- **Liquidez = combustível do mercado** (p20); "tudo é liquidez". Padrões gráficos clássicos (LTA, LTB, triângulos, OCO, bandeira, flâmula) = liquidez criada para atrair o varejo. "Ou você enxerga onde está a liquidez ou você será a liquidez."
- Formações de liquidez (figuras p20): **fundo duplo (W)** → liquidez abaixo dos fundos ($); **topo duplo (M)** → liquidez acima dos topos; **range** → liquidez acima dos topos e abaixo dos fundos; **linha de tendência (LTB)** → liquidez acima de cada toque na linha.
- p21: "Todo topo ou fundo duplo é liquidez, toda linha de tendência é liquidez, todo range é liquidez." **"Onde existe stop loss, existe liquidez."** Todo **EqH/EqL** é ponto de liquidez (instituições induzem ordens ali e varrem).
- **Exemplo p21 (figura)**: topo de resistência tocado 2× ("resistência para o varejo; 2º toque nessa zona, o varejo vende") → preço faz um **pavio acima do topo (Sweep / captura de liquidez)** e cai (indução para o varejo vender de novo) → depois o mercado sobe e **capta todos os stop losses** dos vendidos.
- **Exemplo p22 (LTB)**: varejo vende achando que cai; stop acima da LTB → **pavio** varre; nova LTB menor (nova indução) → **candle gigante de alta** tira todos e o preço dispara.
- **Exemplo p23**: topos iguais à esquerda ($) varridos por um pico, depois o preço volta e varre também os fundos iguais ($) — "o mesmo processo se repete todo instante, todo gráfico, todo tempo".
- **Sequência institucional (p24)**: **Inducement → Liquidity zone → Liquidity grab → Order flow** (cria armadilha, forma a zona de liquidez, captura, segue o fluxo). "A liquidez é um **ÍMÃ**: onde existe liquidez, o preço irá tocar e reverter ou seguir o fluxo."
- Figura p24: estrutura de alta com várias camadas de liquidez ($) — topo interno, EqH, EqL, fundo de pullback; o preço varre todas para baixo até tocar a **zona de demanda** (verde, base de origem do rally) e então dispara para cima.
- **Regra (p24)**: **"O ideal é esperar sempre A TOMADA DE LIQUIDEZ, porque quando o mercado capta a liquidez, ele reverte o preço."**
- Critérios (código):
  - Pools de liquidez: EqH/EqL (≥2 swings com diferença ≤ tolerância, ex. 0,1% ou 0,1×ATR), topo/fundo duplo, máximos/mínimos de swing recentes, toques em linha de tendência (≥3 toques), extremos de range, máx/mín do dia/semana.
  - **Sweep (liquidity grab)**: máxima (mínima) da vela ultrapassa o pool e o **fechamento volta** para dentro (pavio) — ou rompimento seguido de reversão em ≤ N velas.
  - **Inducement**: pequena estrutura/linha que atrai entradas antes da zona real (ex.: nova LTB menor antes do POI); o e-book não dá definição objetiva — aproximação: pool de liquidez interno situado entre o preço e o POI.

## 5. Supply & Demand (p25–29)
- Oferta = venda, demanda = compra; zonas surgem de **desequilíbrio** (texto das maçãs: equilíbrio = faixa restrita; desequilíbrio = grande mudança de preço) (p25).
- Componentes: **Rally** (compradores > vendedores), **Base** (equilíbrio), **Drop** (vendedores > compradores).
- 4 formações (p26–29), **zona = a BASE**:
  - **RBR (Rally-Base-Rally)** → continuação de alta → **demanda** na base (p26; ex.: base de ~10 velas, zona verde do fundo da base até o topo dos corpos; preço volta muito depois e reage).
  - **DBD (Drop-Base-Drop)** → continuação de baixa → **supply** na base (p27; zona laranja cobre a base; retestada muito depois).
  - **RBD (Rally-Base-Drop)** → reversão → **supply** na base (p28; zona do topo da base; retestada e rejeitada).
  - **DBR (Drop-Base-Rally)** → reversão → **demanda** na base (p29).
- Critérios (código): impulso (rally/drop) = ≥1–3 velas de corpo grande (ex.: corpo ≥ 1,5×ATR ou soma das pernas ≥ X×ATR); base = 1–N velas de corpo pequeno (ex.: corpo ≤ 0,5×ATR) com range contido; zona = [mín da base, máx da base] (ou corpos — o e-book desenha incluindo pavios da base). Zona "fresca" até o primeiro reteste (o e-book não fala de quantos toques invalidam).

## 6. Order Blocks (p30–31)
- Definição (p30): regiões onde as instituições deixaram **ordens pendentes** para voltar a captar no futuro; antes disso criam padrões, liquidez, imbalances, S&D. **"Order Block é um conceito diversificado de supply e demand."**
- Identificação: grande bloco de ordens seguido de **movimento rápido** que deixa **imbalance e quebras de estrutura**. **O candle antes do movimento impulsivo é o Order Block.**
- **OB bearish** = **último candle de alta antes do movimento de baixa** (p30; figura: vela de alta no topo, zona azul cobrindo essa vela; o preço volta à zona bem depois "para captar suas ordens pendentes").
- **OB bullish** = **último candle de baixa antes do movimento de alta** (p31; zona azul = range da vela de baixa; preço retorna e toca).
- Critérios (código): OB válido se após a vela-OB houver (a) deslocamento impulsivo, (b) FVG/imbalance e (c) BoS/CHoCH. Zona = high–low da vela-OB (o e-book desenha a vela inteira, com pavios). Mitigação = primeiro retorno do preço à zona.

## 7. Passo a passo para análise (p32–35)
0. Estado pessoal (ambiente, sono, alimentação, psicológico) antes de operar (p32).
1. **TF maior (ex. diário)**: tendência macro (topos/fundos ascendentes ou descendentes)? Preço em **impulso ou retração**? Define se vai comprar ou vender no TF menor. Figura p32: baixa com LH/LL; preço pode quebrar o topo anterior (1) e mudar a tendência (CHoCH) ou fazer BoS quebrando o fundo (2).
2. **TF 4H**: marcar regiões importantes — zona de demanda/supply? **OB + imbalance**? região com **criação de liquidez**? Se sim, o preço talvez faça a armadilha, capture a liquidez e vá à região → **paciência: esperar o contato, o toque na região, a tomada de liquidez.** Figura p33: LTB com liquidez ($) acima → vela de alta varre a LTB e engolfo de baixa forte desce → zona (laranja) = **tomada de liquidez + Order Block + BoS + Imbalance** = "zona importante".
3. **Chegou na região → TF 1H/15m**: o preço está tocando a região do 4H? Ver se faz **CHoCH** ao tocar; o CHoCH deixará nova supply/demanda; **esperar o toque nessa nova zona** e ver se há liquidez acima/abaixo para o mercado capturar (p34).
   - Exemplo p34: 1H — preço sobe até a zona de supply (OB do 4H). 5m — toque na zona de 1H; forma topo duplo/range sob a zona, varre o topo (toca a zona) e então rompe o fundo do range interno (CHoCH de baixa) e a mínima da perna de alta → aguardar confirmação → **entrar vendido**.
4. **Alvos (p35)**: no 1H, o preço tocou o OB que capturou liquidez e seguiu em baixa. **Alvo 1 = imbalance com BoS** (região de imbalance deixada na perna de alta anterior); **Alvo 2 = fundo da semana** (liquidez).
- Recomendações: backtest diário; estudo contínuo (p35). p36: créditos.
- **Stop**: o e-book **não especifica** posição de stop nem gestão (implícito: acima/abaixo da zona/OB ou do extremo do sweep).

---

## Regras que podem virar código
1. **Swings**: pivô de alta/baixa com N=[3–5] velas de cada lado (ou zig-zag por [1×ATR]). Usar só swings "estruturais" do TF.
2. **Tendência de alta**: sequência HH/HL; **HL confirmado somente quando o preço fecha acima do HH anterior** (p3–4). Fundo protegido = HL confirmado mais recente.
3. **Tendência de baixa**: LH confirmado somente quando o preço fecha abaixo do LL anterior; LL válido só se o LH seguinte não romper o LH anterior (p5–6).
4. **BoS** = fechamento além do último swing estrutural na direção da tendência (alta: acima do HH; baixa: abaixo do LL). Medir a partir do swing mais extremo do pullback (p8–11).
5. **CHoCH** = fechamento além do swing protegido contra a tendência (em baixa: acima do último LH; em alta: abaixo do último HL). Muda o rótulo da tendência (p12–14).
6. **Zona pós-CHoCH**: do extremo que originou o impulso (último fundo/topo antes da quebra) até o corpo da última vela oposta/base → POI de reteste; invalida se o preço fechar além do extremo de origem.
7. **FVG**: bullish `high[i-1] < low[i+1]`; bearish `low[i-1] > high[i+1]`; registrar zona, estado (aberto/parcial/preenchido). Filtrar tamanho mínimo [≥0,2×ATR] (não definido no e-book).
8. **FVG adjacente a OB/zona de demanda** (FVG começando na vela imediatamente após o OB/base) → +peso (p19).
9. **EqH/EqL**: ≥2 swings com |diferença| ≤ [0,1%] (ou [0,1×ATR]) → pool de liquidez (p5, p21).
10. **Pools adicionais**: topo/fundo duplo, toques de linha de tendência (≥3), máx/mín do dia/semana anterior, extremos de range (p20–24, p35).
11. **Sweep**: vela com máxima > pool de liquidez superior e fechamento < pool (ou mínima < pool inferior e fechamento > pool) → evento "liquidity grab" (p21–24).
12. **Sequência de setup**: pool de liquidez → sweep → (no TF menor) CHoCH na direção oposta ao sweep → reteste da zona deixada (OB/FVG/demanda/supply) → entrada (p24, p33–34).
13. **S&D (RBR/DBD/RBD/DBR)**: perna impulsiva ([≥1,5×ATR] de deslocamento em ≤[3] velas) + base de 1–[6] velas de corpo ≤[0,5×ATR] + perna impulsiva; classificar pelos sentidos das pernas; zona = range da base (p26–29).
14. **Order Block**: bullish = última vela de baixa antes de um impulso de alta que gera FVG **e** BoS/CHoCH; bearish = última vela de alta antes do impulso de baixa; zona = high–low da vela (p30–31).
15. **Zona importante (score)**: +1 tomada de liquidez prévia, +1 OB, +1 BoS/CHoCH causado pelo impulso, +1 FVG — o e-book chama de "grande confluência" a soma dos 4 (p33).
16. **Multi-TF**: viés no 1D (estrutura HH/HL ou LH/LL; impulso vs retração), POI no 4H, gatilho (CHoCH + reteste) em 1H/15m/5m (p14, p32–34).
17. **Alvos**: (1) FVG/imbalance oposto deixado por BoS anterior; (2) liquidez externa — fundo/topo da semana, EqL/EqH (p35).
18. **Esperar o toque**: nenhuma entrada antes do preço tocar a zona e capturar liquidez (p24, p33).

## Como complementa o método Excelência Trading
- É uma **base de nomenclatura e de detecção por price action** (swings, BoS/CHoCH, FVG, OB, S&D, liquidez) que o Excelência Trading também usa — útil para padronizar as definições no código (regras 1–14).
- **Pontos fortes para o scanner**: regra explícita de confirmação de HL/LH (só após romper o HH/LL), definição objetiva de FVG em 3 velas, OB = última vela oposta antes do impulso com FVG+BoS, sequência inducement→zona→grab→fluxo, e o fluxo multi-TF (D → 4H POI → 15m/5m CHoCH + reteste).
- **Lacunas que o Excelência/Wyckoff 2.0 preenchem**: o e-book **não usa volume** (nem POC/VAH/VAL), **não define stop/gestão**, não qualifica força/fraqueza de lateralizações e não diz quando um sweep "falha". Wyckoff 2.0 completa com: validação do sweep (Spring precisa gerar SOS/atingir o extremo oposto), SOS/SOW bar (vela de intenção com volume) como gatilho, ordens stop na entrada, stop atrás de LVN/estrutura, alvos em HVN/VPOC/naked VPOC, e o score de força do range (ST em terços, UA, falha estrutural, volume decrescente).
- **Mapeamento**: sweep de EqL/EqH no extremo do range = Spring/UTAD; CHoCH no TF menor após o sweep = SOS/SOW (início da Fase D); reteste do OB/FVG = LPS/LPSY/BUEC (mitigação); supply/demand na base = HVN/zona de acumulação menor.
- Sugestão de integração: exigir que a zona SMC (OB/FVG) coincida com um nível de volume (VAH/VAL/VPOC da estrutura, LVN, VWAP semanal) para aumentar o score.

## Dúvidas / pontos ambíguos
1. **Rompimento por pavio ou fechamento?** O e-book não define se BoS/CHoCH exigem fechamento do candle além do swing. Sugestão: fechamento (corpo), com pavio além = sweep.
2. **Tamanho de swing / TF**: não define quantas velas formam um swing "estrutural" nem como ignorar micro-estrutura (p9, p11 dizem só "os pontos que identificamos").
3. **"Fundo que quebrou vira HL de referência" (p7)**: frase ambígua — interpretei como: se um pullback rompe um fundo interno mas a alta continua, o novo fundo mais baixo do pullback é o HL protegido.
4. **Limites da zona OB/S&D**: vela inteira (com pavio) ou só corpo? As figuras usam a vela/base inteira. Também não define "frescor" (quantos toques invalidam) nem invalidação (fechamento além da zona).
5. **FVG "preenchido"**: não define se precisa preencher 50% (CE) ou 100%; nem tamanho mínimo.
6. **Inducement**: sem definição objetiva; só exemplos (LTB menor, segundo toque em resistência).
7. **Stop e R/R**: ausentes no e-book.
8. **CHoCH interno x externo**: figura p14 marca CHoCH em micro-estrutura e em estrutura maior sem distinguir; definir hierarquia (interno/swing) no código.
9. **Horário/sessão** é citado como confluência (p14) mas não detalhado (killzones não definidas).
10. O e-book é voltado a FOREX; em cripto perp considerar wicks de liquidação (sweeps mais profundos) e funding/OI como confluências extras (não citados).
