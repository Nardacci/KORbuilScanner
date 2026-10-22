# Análise Técnica Clássica — Flávio Lemos & Celso Cardoso (Saraiva, 2010)

Fonte: `/home/user/korbuilscanner/Livros/Analise_Tecnica_Flavio_Lemos.pdf` (387 págs).
Referências "p." = número da página do PDF (contagem do pdftotext). Livro voltado a ações/Bovespa; adaptações para cripto (perpétuos Binance, 24/7) marcadas com **[cripto]**.

---

## 1. Premissas (cap. 1, p. 31-46)
- Três pilares (p. 40): (i) o preço desconta tudo; (ii) preços se movem em tendência — tendência vigente tem maior probabilidade de continuar do que de reverter; (iii) a história se repete (padrões psicológicos).
- Dados de "ação do mercado": preço, volume, contratos em aberto (OI). **[cripto]** OI de perpétuos disponível na API Binance (`/futures/data/openInterestHist`).
- AT como regra SE/ENTÃO/SENÃO (p. 39) — compatível com scanner.

## 2. Teoria de Dow (cap. 2, p. 47-57)
**Tendências (1º princípio, p. 48):**
| Tipo | Duração | Característica |
|---|---|---|
| Primária | > 1 ano | movimento > 20%; topos/fundos ascendentes (alta) ou descendentes (baixa) |
| Secundária | 3 semanas a 3 meses | corrige **1/3 a 2/3** do movimento primário |
| Terciária | < 3 semanas | "manipulável" por grandes players |
**[cripto]** Mapear por timeframe: primária ≈ semanal/diário, secundária ≈ 4h/1h, terciária ≈ 15m/5m (fractal, não por duração em calendário).

**Volume (2º princípio, p. 49):** volume expande na direção da tendência e contrai na correção. Alerta de reversão: volume diminui a favor e aumenta contra a tendência (p. 89). Preço dá o sinal; volume confirma.

**Fases (3º/4º, p. 50-52):** Alta = Acumulação → Subida sensível → Excesso (volume alto, euforia). Baixa = Distribuição (volume alto mas caindo nas altas; preço estaciona) → Pânico (queda quase vertical, volume muito alto) → Baixa lenta (volume despenca). Correspondência direta com Wyckoff (Acumulação/Markup/Distribuição/Markdown).

**Linha (7º, p. 54-55):** lateralização com amplitude ≈ **≤ 5%**, de semanas a meses; saída tende a seguir a tendência primária.

**Fechamento (8º, p. 55):** sinais por preço de fechamento.

**Reversão (9º, p. 55-56):** tendência vale até sinal de reversão. Hamilton: **fechamento** acima do topo anterior (ou abaixo do fundo anterior). Nelson (ação e reação): após topo, queda moderada, volta próxima à máxima anterior **sem superá-la** (falha), depois cai abaixo do fundo da reação → reversão. É o equivalente clássico de *lower high + break of structure / CHoCH*.

**Críticas (p. 57):** perde ~1/3 inicial e 1/3 final do movimento.

Regras objetivas:
- Uptrend: pivô de alta (topo) mais alto que o anterior E fundo mais alto que o anterior.
- Reversão de alta para baixa: (a) topo falha abaixo do topo anterior, (b) fechamento abaixo do último fundo.

## 3. Gráficos (cap. 3, p. 58-91)
- **Ponto e figura (p. 61-71):** box por faixa de preço (0-5: 0,25; 5-20: 0,50; 20-100: 1; 100-200: 2; 200-500: 4; 500-1000: 5) ou **box = ATR(20)** (p. 64). Reversão de 3 boxes. Usa máxima/mínima. Compra: coluna de X supera topo da coluna de X anterior; venda: coluna de O perde fundo da coluna de O anterior. LTs a 45°.
  - Alvo vertical: nº de X da coluna que gerou o sinal × 3 (× box) + menor X da coluna; inverso para venda (p. 68).
  - Alvo horizontal: nº de colunas (largura) da congestão × 3 × box + preço do menor X (p. 69).
- **Renko (p. 80):** tijolo quando preço ultrapassa o tijolo anterior por valor fixo; sinal na troca de cor; muitos falsos sinais em lateralização.
- **Kagi (p. 81):** linha grossa ao romper máxima anterior, fina ao perder mínima anterior; sinal na troca.
- **Three line break (p. 82):** usa fechamento; nova linha de alta se fechar acima da máxima da linha anterior; para reverter após 3 linhas na mesma direção, precisa superar o extremo das últimas 3 linhas. Comprar linha de alta após 3 de baixa; vender o inverso; evitar alternância constante. Usar 3LB p/ tendência + candles p/ gatilho.
- **Escala (p. 83-86):** log para ativos com grandes oscilações / longo prazo; aritmética p/ futuros (P&L em pontos). **[cripto]** Usar log em HTF; LTs mudam com a escala — scanner deve calcular LTs em log(preço).
- **Candles: corpo longo** = pressão forte; após queda longa, vela longa branca pode marcar suporte; **clímax de compra** = vela de reversão (ex. enforcado) com **volume ≥ 2× a média** após grande alta; **clímax de venda** = martelo/perfurante com **volume ≥ 2× média** após queda extensa (p. 76-77).
- **Somar velas (Morris, p. 78):** combinar N velas em uma: abertura da primeira, fechamento da última, máxima e mínima do período → classificar o candle resultante (útil p/ reduzir padrões multivela a um único candle; também equivale a ler o candle do TF maior).
- **Candlevolume/Equivolume (p. 78-79):** largura ∝ volume.
- **Timeframes (p. 87-89):** top-down mensal→semanal→diário→60→15→5→1. Diário é o carro-chefe; intraday refina entrada. Swing (≤ 5 dias): diário + 60m; day trade: 60–15m; scalp: 5–1m. Tabela de liquidez: < 200 negócios/dia → só diário; 200-500 → 60'; 500-1000 → 30'; 1000-5000 → 15'; 5000-20000 → 5'; > 20000 → 1'. **[cripto]** Filtro de liquidez: exigir nº de trades por candle mínimo (campo `count` do kline Binance) antes de operar TFs baixos; se candles "estrela/traço" (H=L), subir TF.
- **OI (p. 90-91):** day trade não altera OI; dados de OI no Brasil com 1 dia de defasagem.

## 4. Tendência, suportes/resistências, LTs, gaps (cap. 4, p. 92-113)
**Tendência (p. 92):** alta = topos e fundos mais altos; baixa = topos e fundos mais baixos; lateral = topos/fundos no mesmo nível (banda superior/inferior). Táticas diferentes para tendência vs. congestão — scanner deve classificar regime antes de escolher setup.

**S/R (p. 94-98):** suporte = linha horizontal ligando fundos; resistência = ligando topos. Tipos: horizontais, LTs, médias móveis (200, 50, 10). Âncoras: preço recente, marcos históricos, **números redondos**.
- **Força de um nível (p. 96):** ↑ duração, ↑ volume negociado no nível, ↑ nº de toques, ↑ recência. → score = f(idade, volume no nível [volume profile], toques, barras desde último toque).
- **Bipolaridade (p. 96-98):** suporte rompido vira resistência e vice-versa (= flip / retest do SMC). Velas de reversão no nível alertam virada.
- **Gaps** não têm S/R relevante dentro deles ("pessoas não lembram de preços onde não negociaram", p. 113) — análogo ao *imbalance/FVG* como zona de pouca liquidez (mas o SMC trata FVG como zona de reação; ver Dúvidas).

**Linhas de tendência (p. 98-103):**
- LTA: liga ≥ 2 fundos ascendentes proeminentes; LTB: ≥ 2 topos descendentes. **3º toque seguido de movimento a favor valida**. Mais toques = LT mais forte e rompimento mais significativo.
- Critérios: pontos não muito próximos (dois movimentos distintos); LT não muito íngreme (insustentável); pode ser retraçada.
- Compra no toque da LTA = boa relação retorno/risco; venda na LTB.
- **Canal (p. 100):** paralela à LT pela máxima proeminente entre os 2 pontos da LT; válido com toque de retorno; 3º toque confirma. Serve p/ alvo/realização. **Rompimento da linha de canal NÃO é sinal de reversão**; só a LT principal.
- **Corte da LT (p. 101-102):** primeiro sinal de mudança. Usar **fechamento**, não intraday. Filtros:
  - **Regra dos 3%:** preço ultrapassa a LT em ≥ 3% além do ponto de corte.
  - **Regra dos 2 dias:** 2+ fechamentos consecutivos além da LT.
  - Volume aumentando quando o preço ameaça cortar a LT contra a tendência = reversão provável; volume contraindo na aproximação da LT = tendência saudável.
  - **[cripto]** 3% é grande para 15m; usar filtro em ATR (ex. 0,5–1 ATR) ou 2 fechamentos do TF.
- LTs internas (p. 102-103): ligam o maior nº de topos/fundos internos; subjetivas. LT cortada também inverte papel.

**Retrações (p. 104-105):** secundária corrige 1/3–2/3 (38–62%); 50% é a mais conhecida.

**Dia de reversão (p. 105):** só em tendência definida. Topo: nova máxima do movimento (geralmente perto da abertura) e **fechamento abaixo do fechamento anterior**. Fundo: nova mínima e **fechamento acima do fechamento anterior**. Maior amplitude e volume = sinal mais forte (curto prazo).
- Código: `bear_rev = trend_up and high == max(high, N) and close < close[1]` (+ range > média e vol > média para força).

**Gaps (p. 105-113):** **[cripto]** perpétuos 24/7 quase não têm gap entre candles; equivalente prático = vela de deslocamento / FVG (3 velas) ou gap do CME. Classes:
- **Quebra (breakaway):** rompe padrão de topo/fundo, com aumento de volume (idealmente volume não sobe antes do gap, sobe depois); normalmente **não é fechado**; ponto de rompimento vira S/R. Não aposte no preenchimento.
- **Fuga/medida (runaway):** ~metade do movimento; volume moderado. **Alvo = gap + (distância do ponto de breakout até o gap)**.
- **Exaustão:** fim de tendência, volume excepcionalmente alto; mercado lateraliza alguns dias; **fechamento abaixo do gap confirma reversão**; preenchido rapidamente. Entrada na confirmação da perda da área do gap. (Larry Williams "OOPS"; em candle = dark cloud cover com abertura acima da máxima anterior.)
- **Ilha de reversão:** congestão cercada por gap de exaustão e gap oposto.

## 5. Padrões gráficos (cap. 5, p. 115-…)
**Regras gerais (p. 115-116):** confirmação deve vir em **1 a 3 períodos** após o padrão; ideal: vela de confirmação tipo **marubozu com volume alto**. Transições de tendência costumam ser sinalizadas por padrões. Estatísticas citadas de Bulkowski (*Encyclopedia of Chart Patterns*, 2005) — mercado de ações americano, diário; padrões de rompimento para baixo tendem a performar melhor (pânico > ganância). Ranking 1 = melhor (de 21).

### 5.1 OCO — Ombro-cabeça-ombro de topo (p. 122-126)
Bulkowski: ranking 1; **falha 4%; queda média 22%; pullback 50%; atingiu objetivo 55%**.
- Pré-requisito: tendência de alta anterior.
- OE: pico da tendência; correção com mínima geralmente acima da LTA. Cabeça: máxima > OE; a mínima pós-cabeça geralmente rompe a LTA (alerta). OD: topo < cabeça, ~altura do OE (simetria preferível, não obrigatória).
- LP (neckline): liga mínima pós-OE e mínima pós-cabeça; inclinação para cima é menos baixista que para baixo.
- Volume: idealmente vol(OE) > vol(cabeça); aumento no declínio da cabeça; aumento no declínio do OD.
- Completo só com **rompimento da LP**, idealmente com expansão de volume. Pullback na LP = 2ª chance de venda.
- **Alvo = LP − (topo da cabeça − LP)** (medido na vertical da cabeça). Cruzar com suportes, Fibo, MMs longas.

### 5.2 OCOI — invertido (p. 126-130)
Bulkowski: ranking 8; **falha 3%; alta média 38%; pullback 45%; objetivo 74%**.
- Mesma geometria invertida; **volume imprescindível no rompimento** (no topo é só bem-vindo). Volume baixo na queda do OD; OBV deve permanecer forte; expansão de volume na subida do OD e no rompimento.
- **Alvo = LP + (LP − fundo da cabeça)**.

### 5.3 Topo/fundo triplo (p. 130-131)
Bulkowski: ranking 7; falha 10%/4%; queda/alta média 19%/37%; pullback 61%/64%; objetivo 40%/64% (topo/fundo). Como OCO com picos de mesma altura; cada pico com volume menor; completa ao romper o suporte com volume.

### 5.4 Topo duplo "M" (p. 131-133)
Bulkowski: ranking 2; **falha 11%; queda média 18%; pullback 59%; objetivo 73%**.
- Tendência de alta significativa prévia; 1º topo = máxima da tendência; fundo intermediário com volume fraco; 2º topo com volume baixo, **tolerância ±3%** da altura do 1º.
- **Picos separados por ≥ 1 mês** (diário); próximos demais = só resistência.
- Declínio do 2º topo com expansão de volume e aceleração (gaps).
- Confirmação: **rompimento do fundo entre os topos** com volume; pode usar filtro de tempo/preço. Pullback no suporte rompido = 2ª chance.
- **Alvo = suporte − (topo − suporte)**.

### 5.5 Fundo duplo "W" (p. 134-136)
Bulkowski: ranking 6; **falha 4%; alta média 40%; pullback 55%; objetivo 67%**.
- Espelho do M; tolerância ±3%; fundos separados ≥ 1 mês no diário; volume mais importante que no M (pressão compradora acelerando na subida do 2º fundo).
- Confirmação: rompimento do topo entre os fundos com volume. **Alvo = resistência + (resistência − fundo)**.

### 5.6 Cunha descendente (reversão altista; também continuação) (p. 136-139)
Bulkowski: ranking 11; **falha 6%; alta média 33%; pullback 53%; objetivo 79%**.
- Reversão: após baixa estendida (≥ 3 meses); padrão de 3-6 meses (diário).
- Resistência superior: ≥ 2 (ideal 3) máximas cada vez mais baixas. Suporte inferior: ≥ 2 mínimas cada vez mais baixas. Linhas **convergem**; suporte com inclinação **menos negativa** que a resistência (penetrações cada vez mais rasas = vendedores perdendo força).
- Confirmação: rompimento contundente da resistência; prudente esperar rompimento **acima da máxima de reação anterior**. **Volume essencial no rompimento** da cunha descendente (na ascendente, o volume é pouco importante).
- Cunha ascendente = espelho baixista (p. 138; detalhes não descritos). Bulkowski: cunha ascendente ▼ ranking 10.

### 5.7 Triângulos (continuação; também reversão) (p. 139-144)
Simétrico — Bulkowski: ranking 15; **falha 9%; mov. médio 31%; pullback 37%; objetivo 66%**.
- Mínimo **4 pivôs** (2 topos descendentes + 2 fundos ascendentes); ideal 6 (3 de cada lado).
- Altura do triângulo **10–15% do movimento anterior → provável continuação**; **≥ 1/3 do movimento anterior → provável reversão**.
- Volume decrescente durante a formação.
- Duração: semanas a meses (≈ 3 meses); **< 3 semanas = flâmula**.
- **Rompimento ideal entre 1/2 e 3/4** da distância entre a base (início) e o vértice; antes da metade = prematuro; perto do vértice = insignificante.
- Rompimento válido por **fechamento**, com filtro % ou de tempo; volume crescente (especialmente p/ cima). Não antecipar direção. Edwards & Magee: **75% dos simétricos são continuação**.
- Pullback ao vértice/linha rompida = 2ª entrada.
- **Alvo:** (1) altura da parte mais larga aplicada no ponto de rompimento; (2) paralela à linha oposta a partir do início do padrão.
Ascendente (p. 141-143) — ranking 9; **falha 13%; alta média 35%; pullback 57%; objetivo 75%**. Topo horizontal + fundos ascendentes; viés altista. Alvo = altura na parte mais larga projetada do rompimento.
Descendente (p. 143-144) — ranking 10; **falha 7%; queda média 47%; pullback 37%; objetivo 84%**. Suporte horizontal + topos descendentes; viés baixista. Mesmo alvo.

### 5.8 Bandeiras e flâmulas (continuação) (p. 144-147)
Bulkowski: **falha 4%; mov. médio 23%; pullback 43%; objetivo 64%**.
- Pré-requisito: **movimento agudo (mastro) com volume alto**, possivelmente com gaps, que **rompe uma LT ou S/R**.
- Mastro = da primeira S/R rompida até a máxima/mínima da bandeira.
- Bandeira: pequeno retângulo/canal paralelo **inclinado contra a tendência**. Flâmula: pequeno triângulo simétrico convergente.
- Duração 1–12 semanas (ideal 1–4; > 12 = retângulo). **[cripto]** traduzir para nº de barras do TF (ex.: 5–30 barras).
- Rompimento a favor do mastro com expansão de volume.
- **Alvo = comprimento do mastro projetado do ponto de rompimento**. Marca o meio do movimento.

### 5.9 Retângulo (p. 147-151)
Bulkowski: ranking 6; **falha 9%; mov. médio 39%; pullback 64%; objetivo 80%**.
- ≥ 2 máximas e ≥ 2 mínimas aproximadamente iguais (alternadas, preferível); linhas paralelas horizontais.
- Tendência anterior "jovem" (poucos meses) favorece continuação.
- Volume sem padrão; se volume cai, esperar expansão no rompimento; se volume maior nas pernas de alta (ou baixa), sugere direção.
- Duração ideal > 3 meses; < 3 semanas = bandeira. Padrões maiores → rompimentos mais significativos (3 meses ≈ atinge alvo; 6 meses ≈ excede).
- Rompimento por **fechamento**, com filtro %/tempo/volume. Pullback = 2ª chance. **Alvo = altura do retângulo projetada do rompimento**.
- Operar bordas (comprar no suporte, vender na resistência) dentro do range é aceito.

### 5.10 Movimento medido (measured move) (p. 151-154)
Bulkowski: 1ª perna média +46% em 87 dias; correção média 47% em 32 dias; última perna +32% em 60 dias; **atingiu alvo de preço 45%; de tempo 38%**.
- 3 partes: avanço de reversão (ordenado, topos/fundos crescentes, pode formar canal) → consolidação/correção (retrai **32–62%** do avanço; maior avanço → maior correção: avanço 100% ≈ corr. 62%; avanço 50% ≈ corr. 32%) → continuação.
- **Alvo** (usar o menor/ mais conservador): pontos: `low_corr + (high1 − low1)`; percentual: `low_corr × (1 + (high1/low1 − 1))`.
- Entrada: rompimento do padrão de continuação na consolidação; ou retrações 33/50/62% + padrão de reversão curto; ou (tardia) rompimento da máxima da 1ª perna.
- Volume: ↑ no início, ↓ no fim da correção, ↑ na continuação. Equivale ao AB=CD.

### 5.11 Canal de preços (p. 154-156)
- LT principal (≥ 2 pontos) + paralela (ideal 2 reações; aceita 1).
- **Quebra da linha de canal = aceleração da tendência; quebra da LT principal = reversão**.
- Escala semilog ajusta melhor. Comprar no fundo do canal de alta; vender no topo do canal de baixa.

### 5.12 Fundo arredondado / pires (p. 156-158)
Bulkowski: ranking 5; **falha 5%; alta média 43%; pullback 40%; objetivo 57%**. Longo prazo (semanal). Fundo em "U" (não V agudo), semanas para formar; subida da direita com duração ≈ à da queda; subida muito íngreme invalida. Confirmação: rompe a máxima de reação que iniciou o declínio. Volume em "U": alto no começo, baixo no fundo, crescente na subida/rompimento.

### 5.13 Formação de alargamento / megafone (p. 158-159)
Bulkowski: ranking 19; **falha 11%; mov. médio 29%; pullback 47%; objetivo 68%**. Alta volatilidade, sem direção; LTs divergentes (topos mais altos e fundos mais baixos). Raro; geralmente importante topo; **resolução = violação da 2ª mínima após o 3º pico**. Usado para swing.

### 5.14 Diamante (p. 159-160)
Bulkowski: ranking 7; **falha 10%; mov. médio 27%; pullback 59%; objetivo 69%**. Raro, em topos. Alargamento seguido de triângulo simétrico. **Alvo = altura (topo-fundo) da formação** projetada do rompimento.

### 5.15 Xícara com alça (O'Neil) (p. 160-162)
Bulkowski: **falha 5%; alta 34%; pullback 58%; objetivo 50%**.
- Continuação; tendência prévia de alguns meses (não madura).
- Xícara em "U", profundidade ideal **≤ 1/3** do avanço prévio (aceitável 1/3–1/2; extremo 2/3). 2–6 meses no semanal.
- Alça: retração **≤ 1/3 da subida da xícara** (quanto menor, mais altista), 1–4 semanas; parece bandeira/flâmula descendente.
- Entrada no rompimento da resistência da alça (máximas da xícara) com **aumento substancial de volume**.
- **Alvo = distância do pico direito ao fundo da xícara** projetada do rompimento.

### 5.16 Reversão de solavanco e fuga (Bump-and-Run, Bulkowski) (p. 163-166)
Bulkowski: ranking 3; **falha 5%; queda média 19%; pullback 62%; objetivo 78%**.
- Fase introdução (≥ 1 mês): LT de **30–45°**, avanço ordenado, volume mediano/baixo.
- Solavanco: avanço agudo com ângulo ≈ 50% maior (**45–60°**), volume se expande.
- **Validação:** altura (máxima do solavanco − LT de introdução) **≥ 2×** (máxima da fase de introdução − LT de introdução), medidas verticais em escala aritmética.
- Fase de fuga: rompimento da LT da fase de introdução → queda; pullback na LT rompida (S→R).
- Código: ângulo é dependente de escala → usar inclinação normalizada (ex.: slope em ATR/barra ou % por barra) e a regra objetiva das alturas 2×.

## 6. Ondas de Elliott (cap. 6, p. 167-…)
- Ciclo 5 ondas a favor (1,3,5 impulso; 2,4 corretivas) + ABC. Prioridade: padrão > proporção > tempo.
- **Assinaturas (p. 170-173):** Onda 1 pouco óbvia, notícias negativas. Onda 2: **nunca além do início da 1**; volume < onda 1; geralmente retrai **≤ 61,8%** da 1; 3 ondas. Onda 3: mais longa/forte, correções pequenas; frequentemente **1,618 × onda 1**. Onda 4: lateral, retrai ~**38,2%** da 3, volume bem abaixo da 3, difícil de contar; boa para comprar retração. Onda 5: volume < 3, **divergências** em indicadores (nova máxima de preço sem nova máxima do indicador). Onda A: volume e OI sobem. Onda B: volume < A (parece OD de OCO). Onda C: 5 ondas, **≥ tamanho de A**, frequentemente até 1,618 × A.
- Graus (p. 174-176): de grande superciclo a subdiminuto (minutos).
- **Fibonacci (p. 176-180):** retrações 0/38,2/50/61,8/100% sobre swing A→B (externa); traçado interno + extensão **161,8%**.
- **Regras invioláveis (p. 181-182):** (1) onda 2 nunca retrai 100% da 1; (2) onda 3 nunca é a mais curta entre 1, 3 e 5; (3) onda 4 não entra no território da onda 1 (exceto diagonais).
- Alternância (2 simples → 4 complexa, e vice-versa); equidade (se 3 é a maior, 5 ≈ 1). Extensão: ações → onda 3; commodities → onda 5 (**[cripto]** extensões de onda 5 são comuns em altcoins — hipótese, não do livro). Truncamento: 5 não supera 3 (após 3 estendida).
- Correções nunca têm 5 ondas: um movimento de 5 ondas contra a tendência maior é só parte da correção (p. 184). Tipos: zigue-zague 5-3-5 (B bem abaixo do início de A); flat 3-3-5 (B termina ~início de A; C termina ~fim de A); triângulo 3-3-3-3-3 a-b-c-d-e (volatilidade e volume declinantes; e pode furar as linhas); duplo/triplo três (W-X-Y-Z). "Se não consegue contar, é correção."
- **Canais (p. 188-192):** alvo onda 3/C: linha origem-1 → fim-2 + paralela pelo topo de 1 (alvo mínimo da 3; se não passa, provavelmente é C; perda da linha base = stop/2 complexa). Alvo onda 4: linha 1→3 + paralela pelo fim de 2 (4 pode furar levemente). Alvo onda 5: linha 2→4 + paralela pelo fim de 3 (5 geralmente não alcança, exceto extensão). Zigue-zague duplo se ajusta perfeitamente ao canal; impulso tem 3 rompendo o canal.
- **Razões Fibonacci (p. 192-195):**
  | Onda | Alvo típico |
  |---|---|
  | 1 | para na base da correção anterior (onda B), ~38,2/61,8% da correção anterior |
  | 2 | ≥ 38,2%, normalmente ≥ 61,8% da 1; para na subonda 4 ou 2 da 1; **76% é suspeito** |
  | 3 | ≥ 100% da 1; tende a 161,8% ou 261,8% da 1 |
  | 4 | ≥ 23,6% da 3, frequentemente 38,2%; mercados fortes ~14%; entra na subonda 4 da 3 |
  | 5 | = 1, ou 61,8% da 1; ou 61,8% de (início 1→fim 3); estendida: 161,8% da 3 ou de (1→3) |
  | A | após triângulo na 5 → volta à onda 2 do triângulo; em triângulo, 38,2% da 5; em zigue-zague, 61,8% da 5 |
  | B | zigue-zague 38,2–61,8% de A; flat ≈ 100% de A; flat expandido 138,2% de A |
  | C | ≥ 61,8% de A; geralmente 100% ou 161,8% de A; flat expandido 161,8%; triângulo 61,8% de A. C < 61,8% A = falha → aceleração contrária |
  | D/E | triângulo: D ≈ 61,8% de B; E ≈ 61,8% de C (E < C) |
  | X | ≥ 38,2% da ABC anterior, comum 61,8% |
- Crítica (p. 195): subjetiva; contagem exige revisão constante. **Para scanner, usar Elliott só como filtro (regras invioláveis + razões Fibo), nunca como gatilho.**

## 7. Indicadores e osciladores (cap. 7, p. 198-…)
**Geral (p. 199):** dois usos: confirmar preço/padrões e gerar sinais. Indicadores que lideram (osciladores) funcionam melhor **sem tendência**; atrasados (médias) funcionam melhor **em tendência**. Sinais: (1) cruzamentos; (2) divergências.

### 7.1 Médias móveis (p. 199-228)
- MMS = Σ C / n. MMP (WMA) = pesos lineares n..1. **MME**: `EMA = (C − EMA[1]) × k + EMA[1]`, `k = 2/(n+1)` (livro adota esse; Wilder usa `k = 1/n` → `(C + (n−1)·EMA[1]) / n`). MM triangular = SMA(SMA(C, m), m), m = n/2 (par) ou (n+1)/2 (ímpar). **VIDYA** (Chande, p. 212-213): `MMV = 0,078·VR·C + (1 − 0,078·VR)·MMV[1]`, `VR = VHF(n)/VHF(n)[12]`, `VHF = ROC(C,n)/(HH(n) − LL(n))` (0,078 ≈ EMA 24). MM série temporal = último ponto da regressão linear de n barras. MM ajustada por volume = Σ(V·C)/ΣV (VWMA).
- **Sinal com 1 MM (p. 218):** fechamento cruza a MM; mais seguro se a MM também virar na direção.
- **Períodos (Tabela 7.3, p. 219):** curtíssimo 5–20; curto 10–30; médio 15–60; médio-longo 45–120; longo 120–250 barras.
- **MM curtas funcionam melhor em lateralidade/baixa volatilidade; longas, em tendência** (p. 220). Não existe MM ideal.
- **Filtros de MM (p. 220-224):** (1) corpo inteiro da vela além da MM; (2) penetração mínima (% ou valor) do fechamento; (3) junto com rompimento de figura; (4) filtro de tempo de **1 a 3 barras** mantendo o sinal; (5) envelopes: comprar quando fechamento está na/abaixo da banda inferior voltando para dentro, vender o inverso; (6) **canal de MMs de máximas e mínimas**: comprar com fechamento acima da MM das máximas, **stop abaixo da MM das mínimas** (e inverso para venda).
- **2 MMs (p. 225-226):** longa = tendência, curta = timing; exemplo 5×20 MMS. Estudos citados favorecem 2 MMS vs. MMP/MME.
- **3 MMs (p. 226-228):** 4-9-18 (R. C. Allen; variante 5-10-20). Alta: 4 > 9 > 18. Compra: (1) alerta quando MM4 cruza para cima MM9 e MM18; (2) confirmação quando MM9 cruza MM18 para cima. Venda espelhada; o alerta (MM4 abaixo das outras) é usado para liquidar compras.
- **Oscilador de MMs (p. 228-230):** OMM = MM(n) − MM(m), n < m; cruzar zero = sinal.

### 7.2 MACD (Appel) (p. 231-…)
- `MACD = EMA12 − EMA26`; `sinal = EMA9(MACD)`. Cruzamento do zero = sinal lento; **cruzamento MACD × sinal antecipa**. Appel: bom desempenho no **semanal**. Sinais principais via **divergência** preço × MACD.
- **Divergência (p. 233-235):** baixa = topos de preço ascendentes + topos do MACD descendentes; alta = fundos de preço descendentes + fundos do MACD ascendentes. Comparar topos com topos / fundos com fundos alinhados no tempo.

### 7.3 Envelopes (p. 235-237)
- Bandas = MM ± x%. Curto prazo: **1,5–3% de uma MM21**; longo prazo: **10% de MM 40–60**.
- Compra: preço toca/perfura banda inferior **e volta em direção ao centro** (se romper com força, esperar fechamento de volta acima da banda inferior). Venda espelhada.
- Envelope high-low: MM das máximas (+x%) e MM das mínimas (−x%).

### 7.4 Bandas de Bollinger (p. 237-242)
- MMS20 ± 2σ (fechamento). Ajuste: 10 períodos → 1,9σ; 20 → 2,0σ; 50 → 2,1σ. MME não trouxe ganho significativo.
- `%b = (C − inf)/(sup − inf)` (0 = banda inf; 0,5 = meio; 1 = sup; pode exceder).
- `BandWidth = (sup − inf)/MM`. BW em fundo = estreitamento (calmaria); bandas **abrindo simultaneamente para direções opostas = início de movimento forte**, direção definida por outro indicador. BW fez topo no início de tendência (exemplo).
- **[cripto]** Squeeze = BW no menor percentil de N barras; disparo = BW subindo + fechamento fora da banda.

### 7.5 CCI (Lambert) (p. 243-246)
- `PT = (H+L+C)/3`; `CCI = (PT − SMA(PT,n)) / (0,015 × σ(PT,n))` (o livro escreve desvio-padrão; o original de Lambert usa desvio médio absoluto — ver Dúvidas). Período = 1/3 do ciclo (ex. ciclo 60 → CCI 20). ~80% dos valores entre −100 e +100.
- Três usos: (1) Lambert: compra ao cruzar **+100 para cima**, venda ao cruzar **−100 para baixo** (momentum); (2) agressivo: cruzamento do zero; (3) contrário: venda ao voltar abaixo de +100, compra ao voltar acima de −100. Nem sempre o 3º é o mais lucrativo.

### 7.6 Regressão linear (p. 246-247)
- Preço acima da reta = venda; abaixo = compra (reversão à reta) — falha em mudança de tendência.

### 7.7 Volatilidade histórica (p. 248-249)
- `VH(n) = √252 × desvio-padrão dos retornos de n períodos`; usa **n = 21**. **[cripto]** anualizar com √365 (diário) ou √(365×24) (1h).
- Observação do autor: VH **cai em altas e sobe em quedas** ("sobe de escada, desce de elevador"); movimentos rápidos ↑ vol; lateral ↓ vol.

### 7.8 Parabólico SAR (Wilder) (p. 249-251)
- Alta: `SAR = SAR[1] + AF × (EP − SAR[1])` (livro usa H[n−1]; o padrão é o extremo do movimento, EP). AF começa em 0,02, +0,02 a cada nova máxima (alta)/mínima (baixa), máx. 0,20.
- Uso: saída/stop móvel (zerar compra quando preço cruza SAR para baixo). Compra: fechamento acima do SAR; venda: abaixo. Muitos falsos sinais em lateral → usar filtros (ex. ADX).

### 7.9 DMI/ADX (Wilder) (p. 251-255)
- +DM = H − H[1]; −DM = L[1] − L (regra completa padrão: só conta o maior dos dois e se > 0). TR = max(H−L, |H−C[1]|, |L−C[1]|). ±DI14 = suavização Wilder (13/14·anterior + 1/14·atual) de ±DM / TR14. DX = |+DI − −DI|/(+DI + −DI) × 100 (o livro tem erro tipográfico). ADX = média 14 do DX. ADXR = (ADX + ADX[14])/2.
- **ADX < 20 = sem tendência; cruzando 20 = entrada de tendência; > 25 = tendência definida — mas só se ADX estiver subindo**; ADX > 25 caindo = perdeu tendência. Direção: +DI > −DI = alta.

### 7.10 Aroon (Chande) (p. 255-257)
- AroonUp = 100 × (n − barras desde a máxima de n)/n; AroonDown análogo. Oscilador = Up − Down.
- Ambos próximos e caindo = consolidação; Up < 50 = alta perdeu momento; > 70 = tendência forte; oscilador > 0 = alta.

### 7.11 Momentum / ROC / Coppock / TRIX (p. 258-265)
- MOM = C − C[n] (compra > 0); MOM% = C/C[n] × 100 (compra > 100); ROC = (C − C[n])/C[n] × 100. Exemplo com n = 10. Divergências válidas.
- Coppock (mensal) = WMA10(ROC14 + ROC11); diário 294/231/210. Compra: curva vira para cima após extremo negativo.
- TRIX = variação % de EMA tripla; sinais por cruzamento de zero ou da sua média; funciona melhor em lateral, confirmar com estocástico.

### 7.12 Estocástico (Lane) (p. 265-269)
- `%K = (C − LL(n))/(HH(n) − LL(n)) × 100`. Slow K = EMA(%K, m); %D = EMA(SlowK, m), m < n.
- **Sobrevenda 0–30; sobrecompra 70–100.** Melhor sinal: **saída** da zona (sair da sobrevenda = compra; sair da sobrecompra = venda); ou cruzamento SlowK × %D **dentro** das zonas. Muito volátil → muitos falsos sinais. Divergências válidas.

### 7.13 IFR / RSI (Wilder) (p. 269-272)
- `IFR = 100 − 100/(1+RS)`, RS = média dos ganhos/média das perdas; equivalente `IFR = 100·A/(A+B)`.
- Wilder: 14; **autor recomenda 8** ("bom índice de acerto" em testes; também 9 e 25; Trader Brasil usa 14 na fórmula).
- **Sobrecompra > 80; sobrevenda < 20** (zonas do autor). Sinais: compra ao voltar **acima de 30**; venda ao voltar **abaixo de 70**. Em tendência, o IFR fica "preso" numa zona. **Melhor uso = divergências.** IFR em 20 coincidindo com fundo de preço = suporte; 80 = resistência.

### 7.14 %R de Williams (p. 272)
- `%R = (HH(n) − C)/(HH(n) − LL(n)) × 100` (escala 0 a −100), n = 14. 0 a −20 = sobrecompra; −80 a −100 = sobrevenda. Em tendência de alta: comprar leituras sobrevendidas (pullback); em baixa: vender leituras sobrecompradas.

### 7.15 Indicadores de volume (p. 273-282)
- Premissa: **volume precede o preço**. Aumento de volume pode marcar fim de tendência / troca de controle.
- **OBV (Granville):** soma volume se C > C[1], subtrai se C < C[1]. Importa inclinação, S/R e divergência do OBV, não o valor.
- **Linha A/D (Chaikin):** livro: `((C − O) − (H − C))/(H − L) × V` (fórmula padrão de Chaikin usa CLV = ((C−L) − (H−C))/(H−L)). Divergência: A/D caindo com preço subindo = baixista. Não reflete gaps.
- **Chaikin Money Flow (CMF 21):** Σ A/D(21)/ΣV(21). > 0 pressão compradora; < 0 vendedora; duração prolongada positiva = acumulação sustentável.
- **Média móvel de volume:** volume acima da média + outros indicadores = reversão ou confirmação.
- **VWMA** = Σ(C·V)/ΣV.
- **Volume por preço (p. 279):** histograma horizontal de volume por faixa de preço (= Volume Profile). Sem regras adicionais.
- **IVCP / VPCI (Dormeier):** `VPCI = VPC × VPR × VM`; VPC = VWMA_longa − SMA_longa (+ confirma, − contesta); VPR = VWMA_curta/SMA_curta; VM = vol médio curto / vol médio longo. Sinais: inclinação, cruzamento com sua média ponderada por volume, acima/abaixo de zero. Melhor para confirmar compras. (Parâmetros não informados no texto; usuais: curto 5, longo 20.)
- **Parametrização (p. 282-283):** parâmetros originais não são sagrados; retestar periodicamente (walk-forward).

## 8. Força relativa entre ativos (cap. 8, p. 284-286)
- Gráfico relativo = ativo A / ativo B; todas as ferramentas (LT, padrões, MMs, indicadores) se aplicam. Sinal de compra no ratio = comprar A e vender B. Uso: seleção de ativos, long-short, trocar o "pangaré pelo alazão".
- **[cripto]** ALT/BTC e ALT/ETH ratios; ranking de força relativa para escolher qual perpétuo operar; filtro: só comprar ALTUSDT se ALT/BTC também em alta.

## 9. Ciclos de tempo (cap. 9, p. 287-304)
- Mercado tem **modo tendência** e **modo ciclo**, operados de forma diferente/oposta (p. 288-289) → reforça a necessidade de um classificador de regime.
- 4 fases do ciclo (p. 291-293): acumulação → alta (termina em clímax de compra parabólico, volume ↑) → distribuição (lateral semanas/meses; topos duplos/triplos/OCO) → descida (capitulação após quedas de ~50%+). Idêntico a Wyckoff.
- Princípios (p. 294): adição, sincronicidade (fundos coincidem), proporcionalidade (ciclos maiores → amplitudes maiores), **harmonicidade (ciclos vizinhos em razão 2: 10/20/40)**, variação, nominalidade.
- **Medir ciclos de fundo a fundo** (maior variação ocorre nos topos). **Translação:** em alta, topo do ciclo à direita do centro (mais tempo subindo); em baixa, à esquerda (p. 295-297). Translação à esquerda num ciclo = sinal de fraqueza.
- Classificação (Bressert): longo ≥ 2 anos; sazonal 1 ano; primário 9–26 semanas; operações 4 semanas (alfa 2 + beta 2).
- Sazonalidade em ações (nov-jan fortes, setembro fraco, virada de mês positiva, segunda-feira negativa, ciclo presidencial) — **não transferível diretamente a cripto**; pode-se testar efeitos de dia da semana/hora e de sessão (Ásia/Londres/NY).

## 10. Gann (cap. 10, p. 305-313)
- Ângulos a partir de pivô: 1×8, 1×4, 1×3, 1×2 (suportes, mais íngremes), **1×1 (45°)**, 2×1, 3×1, 4×1, 8×1 (resistências). Dependente de escala (definir unidade preço/tempo, ex. 1 ATR por barra).
- 1×1 = "linha da morte": preço acima = alta; rompimento do 1×1 = reversão significativa. Ventilador: 3 linhas sucessivas; quebra da 3ª = reversão provável. Regra de todos os ângulos: rompeu um ângulo, vai para o seguinte.
- Retrações de Gann: oitavos (12,5/25/37,5/50/62,5/75/87,5/100) e terços (33,3/66,7); mais importantes 37,5 / 50 / 62,5. **Se a correção ultrapassa 50%, tende a ir a 100%** (p. 310).
- Enquadramento preço×tempo: esperar mudança de direção quando unidades de tempo = unidades de preço; melhor em semanal/mensal.

## 11. Fibonacci no tempo (cap. 11, p. 315-318)
- Projetar intervalos fundo-fundo, topo-topo, fundo-topo, topo-fundo por 0,382 / 0,5 / 0,618 / 0,786 / 1,0 / 1,618 / 2,618. Contar barras de pregão (**[cripto]** barras contínuas). Usar só como confluência.

## 12. Estratégias (cap. 12, p. 320-326)
- Recomenda **backtest** obrigatório: lucro/perda máximos, retorno, nº de ordens, duração, retorno/risco, % de acerto.
- **Método do diamante (p. 321-322):** sistema de MMs com 6 fases; compra ideal nos fundos (pullback à MM50) **após cruzamento da MM50 acima da MM200**; venda ideal nos topos (pullback à MM50) após MM50 cruzar abaixo da MM200. Poucos sinais; longo prazo.
- **Pontos de pivô clássicos (p. 323):** P = (H+L+C)/3 do período anterior; R1 = 2P − L; S1 = 2P − H; R2 = P + (R1 − S1); S2 = P − (R1 − S1). Diário (ou 60m); perde precisão em TFs curtos. **[cripto]** usar dia UTC 00:00 da Binance; pivôs semanais também.
- **Pivô de alta (p. 324-326):** ponto 1 fundo, 2 topo, 3 fundo mais alto (> 1); **gatilho = rompimento do ponto 2**. Z = P2 − P1. Alvos a partir de P2: **P2 + 0,618Z; P2 + 1,0Z; P2 + 1,618Z** (o livro rotula de "38%/50%/62%", nomenclatura confusa). Pivô de baixa espelhado. Pode haver várias tentativas desde que o ponto 3 não seja perdido; se o ponto 1 for rompido antes do 2, a tendência anterior continua.
  - É exatamente "HL + BOS" (SMC) com alvos por extensão.

## 13. Planejamento e controle de risco (cap. 13, p. 328-335)
- Plano escrito antes da entrada: **preço de entrada, preço de saída (alvo), stop de preço, stop de tempo e lote** (p. 329).
- **Retorno:risco mínimo sugerido 3:1** (p. 329).
- **Stop de tempo** obrigatório: não converter scalp em day trade em swing (p. 329-330). Não mudar plano com mercado aberto.
- **No alvo: zerar no mínimo metade e subir o stop para a zona de lucro (breakeven+)**; depois replanejar (p. 330).
- Cuidado com ordem a mercado em ativo ilíquido (slippage altera R:R) (p. 331).
- Custos: comissões fixas pesam mais em contas pequenas (p. 331). **[cripto]** incluir taxa maker/taker + funding no cálculo de R:R.
- **Risco máximo 1% do capital de risco por operação** (p. 331).
- **Lote máximo:** `qtd = perda_max / (entrada − stop)`; verificar margem disponível (p. 331-332). **[cripto]** `qtd = (equity × 1%) / |entrada − stop|`; alavancagem só define margem, não risco.
- **Kelly (p. 332):** `f = G − (1 − G)/V`, V = ganho médio/perda média. Ex.: G = 70%, V = 3 → f = 0,7 − 0,3/3 = 60% (o livro diz 50% — erro aritmético; ver Dúvidas). Na prática usar fração de Kelly (¼–½) e teto de 1–2%.
- **Esperança matemática:** `E = P(ganho)·ganho_médio − P(perda)·perda_média`; método deve ter E > 0 (p. 333).
- Registrar todas as operações (inclusive estado psicológico) (p. 332).
- Lema: "perder pouco faz parte do processo de ganhar muito"; não liquidar vencedora para manter perdedora (p. 335).

## 14. Psicologia (cap. 14, p. 336-…)
- **Não fazer preço médio em posição perdedora** (p. 339). Uma operação por vez; operar pequeno; ativos líquidos.

## 15. Juntando tudo e regras gerais (cap. 15-16, p. 342-350)
- **Confluência (p. 342):** rompimento de figura + volume acima da média + MMs confirmando + Bollinger abrindo (+ Elliott/ciclo). Exemplo OCO: entrada 14,90, stop 15,50 (acima do OD/LP), alvo projeção 12,50 → R:R = 4. Exemplo fundo duplo: entrada 9,86, stop 9,50, alvo 11,00 → R:R 3,16; alternativa: comprar o pullback na resistência rompida (agora suporte).
- **"Bendita confirmação" (p. 345):** **só agir após o fechamento da vela/barra** do rompimento/cruzamento (idealmente confirmação na vela seguinte); rompimentos intrabar são frequentemente falsos. → Scanner deve avaliar somente candles fechados.
- **Regras (p. 346-348):** em alta, comprado ou fora; comprar força/vender fraqueza (comprar o mais forte do grupo); pode adicionar em correções menores a favor da tendência; se perdeu a entrada, esperar correção; perdas pequenas e rápidas; **nunca adicionar a posição perdedora — cada nova compra deve ser mais alta que a anterior** (piramidar só a favor); deixar lucros correrem; operar quando as análises convergem; após grande perda, pausar; **topos se formam com violência, fundos em silêncio**; últimos 10% do tempo de uma alta respondem por ≥ 50% do movimento.
- Razões de perda (p. 348-349): sem plano, excesso de informação, pouco capital, tentar acertar topo/fundo, segurar perdas, alavancagem elevada, não respeitar stop de preço/tempo etc.
- Curiosidade (p. 350): mais negócios fecham em preços terminados em ,00 e ,50 → **números redondos** como S/R/ímãs de liquidez.

## 16. Dicionário de candles (Anexo I, p. 356-373)
Definições (sempre exigir contexto de tendência prévia):
| Padrão | Tipo | Critério objetivo |
|---|---|---|
| Doji | indecisão/reversão | abertura = fechamento (na prática corpo ≤ ~5–10% do range) |
| Dragonfly doji | reversão (fundo) | máxima = abertura = fechamento (sombra inferior longa) |
| Gravestone doji | reversão (topo) | doji perto da mínima (sombra superior longa) |
| Long-legged doji | indecisão | sombras superior e inferior longas, doji no meio |
| Martelo / enforcado | reversão | **corpo ≈ 1/3, sombra ≈ 2/3** do range (p. 362); martelo após queda, enforcado após alta |
| Shooting star | reversão baixista | em alta; abre acima da máxima anterior, sobe e fecha perto da abertura (martelo invertido) |
| Marubozu | força/continuação | sem sombras; volume crescente confirma |
| Spinning top / short day | indecisão | corpo pequeno, sombras maiores |
| Long day | força | corpo grande |
| Engolfo | reversão | corpo da 2ª envolve completamente o corpo da 1ª (1ª com corpo pequeno), cores opostas, no fim de tendência |
| Harami / harami cross | reversão | corpo pequeno/doji dentro do corpo anterior, cor diferente |
| Dark cloud cover | reversão baixista | em alta; abre acima do fechamento/máxima anterior e **fecha abaixo da metade do corpo anterior** |
| Piercing line | reversão altista | após queda, vela preta grande; 2ª abre abaixo da mínima anterior e **fecha acima da metade do corpo anterior** |
| Morning star / doji star | reversão altista (3 velas) | preta grande; 2ª abre abaixo com range pequeno/doji; 3ª fecha acima da metade do corpo da 1ª |
| Evening star / doji star | reversão baixista (3 velas) | espelho |
| Abandoned baby | reversão rara | gap + doji + gap oposto; sombras do doji não tocam velas vizinhas |
| Three white soldiers | reversão altista | 3 brancas, cada uma fecha acima da máxima anterior e abre dentro do corpo anterior |
| Three black crows | reversão baixista | 3 pretas, cada uma fecha abaixo da mínima anterior e abre dentro do corpo anterior |
| Rising / falling three methods | continuação | vela grande + 3 pequenas dentro do range da 1ª + 5ª fecha em nova máxima (mínima) |
| Tasuki gap (up/down) | continuação | 2 velas na direção com gap; 3ª contrária abre no corpo da 2ª e fecha dentro do gap sem fechá-lo |
| Upside gap two crows | reversão baixista | branca longa; gap com pequena preta; 3ª preta maior engolfa a 2ª mas fecha acima da 1ª |
| Stick sandwich | reversão altista | duas pretas com **fechamentos iguais** cercando uma branca |
| Tweezers (pinças) | reversão | 2+ velas com mesma máxima (topo) / mesma mínima (fundo) após tendência |
| Stars | — | vela que abre com gap em relação à anterior |
- **[cripto]** padrões com gap (stars, abandoned baby, tasuki, shooting star "abre acima da máxima") quase não ocorrem em perpétuos 24/7 → relaxar a condição de gap para "corpo além do corpo anterior" ou descartar.
- **Anexo II — contrato perpétuo (p. 374-375):** aqui significa **série contínua de futuros com vencimento emendados** (back-adjusted), não o perpétuo cripto com funding. Lição útil: em série ajustada, níveis históricos não são exatos → conferir S/R no spot. **[cripto]** usar o gráfico do próprio perpétuo (é o que se negocia) e, para níveis HTF, comparar com spot/índice; atenção a diferenças de preço de marcação (mark price) para stops.
- Anexo III (p. 377): análise técnica em opções deve ser feita no ativo-objeto, não na opção.

---

## Regras que podem virar código
(Parâmetros entre colchetes são defaults do livro; marcados **[adapt]** quando precisam ser recalibrados para cripto.)

**Estrutura / tendência**
1. **Pivôs:** pivô de alta em `i` se `high[i]` é a maior máxima em janela `[i−k, i+k]` [k = 2–5]; idem fundos. Só usar candles fechados.
2. **Tendência Dow:** UP se últimos 2 topos e 2 fundos confirmados são ascendentes (HH e HL); DOWN se ambos descendentes; senão LATERAL.
3. **Reversão Dow (Hamilton/Nelson):** em UP, `topo_n < topo_{n−1}` (falha) E `close < último fundo` → sinal de reversão para DOWN. Espelho para alta.
4. **Lateral "linha" de Dow:** amplitude `(maxH − minL)/minL ≤ 5%` [adapt: ≤ k × ATR] por ≥ N barras → range; saída tende na direção da tendência maior.
5. **Correção secundária válida:** retração entre 33% e 67% (38,2–61,8%) do impulso anterior.

**S/R e LTs**
6. **Score de nível:** `score = w1·n_toques + w2·idade + w3·volume_no_nível (volume profile) + w4·recência`; níveis em números redondos (`,00`/`,50` relativos ao tick/escala) ganham bônus.
7. **Flip (bipolaridade):** após fechamento acima de resistência, marcar o nível como suporte; setup de pullback = toque no nível + candle de reversão.
8. **LT válida:** ≥ 2 pivôs separados por ≥ M barras, 3º toque seguido de movimento a favor; inclinação ≤ limite (ex. |slope| ≤ x·ATR/barra).
9. **Rompimento de LT/S/R confirmado:** (a) fechamento além da linha em ≥ 3% [adapt: ≥ 0,5–1 ATR] OU (b) 2 fechamentos consecutivos além da linha; bônus se `vol > SMA(vol,20)`.
10. **Saúde da tendência:** volume das pernas a favor > volume das pernas contra; alerta quando volume cresce na aproximação da LT contra a tendência.
11. **Canal:** rompimento da linha de canal a favor = aceleração (não reversão); só a quebra da LT principal é reversão.

**Barras / gaps / candles**
12. **Dia de reversão de topo:** tendência UP, `high == max(high, N)` e `close < close[1]`; força se `range > 1,5×ATR` e `vol > 1,5×SMA(vol)`. Espelho para fundo.
13. **Clímax:** após movimento de ≥ X ATR, candle de reversão (martelo/enforcado/perfurante) com `vol ≥ 2 × SMA(vol,20)`.
14. **Martelo:** `body ≤ range/3` e sombra inferior ≥ 2/3 do range e sombra superior pequena; contexto: após queda. Enforcado: mesma forma após alta.
15. **Engolfo:** cores opostas; `body2` cobre totalmente `body1`; contexto de tendência prévia.
16. **Perfurante / nuvem negra:** fechamento além do ponto médio do corpo anterior, contra a tendência prévia.
17. **Somar velas:** agregar N velas → (O da 1ª, H máx, L mín, C da última) e classificar o candle agregado.
18. **Gap de exaustão [adapt FVG/deslocamento]:** gap a favor no fim de tendência com volume excepcional; fechamento de volta abaixo do gap = reversão. Gap de fuga: alvo = gap + (gap − ponto de breakout).

**Padrões (todos: confirmação por fechamento; vela de confirmação em até 1–3 barras; volume acima da média)**
19. **OCO:** 3 topos, cabeça > ombros, ombros com diferença ≤ tolerância; tendência de alta prévia; gatilho = fechamento abaixo da LP; alvo = LP − (cabeça − LP); stop acima do OD. OCOI espelho com volume **obrigatório** no rompimento.
20. **Topo/fundo duplo:** 2 extremos com diferença ≤ 3% [adapt: ≤ 0,5 ATR], separados por ≥ 1 mês no diário [adapt: ≥ N barras], tendência prévia; gatilho = fechamento além do vale/pico intermediário; alvo = altura projetada.
21. **Triângulo simétrico:** ≥ 4 pivôs (2 topos descendentes + 2 fundos ascendentes); volume decrescente; rompimento válido apenas entre 50% e 75% da distância base→vértice; altura ≤ 15% do movimento prévio → continuação; ≥ 33% → possível reversão; alvo = altura máxima projetada.
22. **Triângulo ascendente/descendente:** topo (fundo) horizontal ± tolerância + fundos (topos) progressivos; alvo = altura.
23. **Bandeira/flâmula:** mastro com retorno ≥ X ATR em ≤ N barras e volume alto que rompe S/R; consolidação contra-tendência com retração ≤ 50% do mastro e duração 5–30 barras [adapt]; gatilho = fechamento além da consolidação com volume; alvo = comprimento do mastro.
24. **Retângulo:** ≥ 2 topos e ≥ 2 fundos ~iguais; alvo = altura; preferir direção onde o volume é maior nas pernas.
25. **Cunha:** duas linhas convergentes inclinadas na mesma direção; descendente = altista (rompimento + volume obrigatório; confirmar acima da última máxima de reação).
26. **Measured move:** perna 1, correção 32–62%, alvo = mín(`low_corr + perna1`, `low_corr × (1 + perna1%)`).
27. **Bump-and-run:** altura do solavanco acima da LT de introdução ≥ 2× a altura da fase de introdução; gatilho = fechamento abaixo da LT de introdução.
28. **Xícara com alça:** profundidade ≤ 1/3 (até 1/2) do avanço prévio; alça retrai ≤ 1/3 da subida da xícara; gatilho = rompimento da borda com volume substancial; alvo = profundidade da xícara.
29. **Pivô de alta (Lemos):** fundo P1 < topo P2, fundo P3 > P1; gatilho = rompimento de P2; alvos P2 + {0,618; 1,0; 1,618}×(P2 − P1); invalidação = perda de P3 (stop) / perda de P1 antes de P2 = tendência anterior continua.

**Indicadores**
30. **Regime:** `ADX(14) > 25 e subindo` = tendência (usar MMs/rompimentos); `ADX < 20` = lateral (usar osciladores/bordas de range). ADX > 25 caindo = tendência perdendo força.
31. **3 MMs 4-9-18:** alerta quando MM4 cruza MM9 e MM18; confirmação quando MM9 cruza MM18.
32. **Golden/death (diamante):** após MM50 > MM200, comprar pullbacks à MM50; após MM50 < MM200, vender repiques à MM50.
33. **Filtros de cruzamento de MM:** corpo inteiro além da MM; penetração mínima; manter sinal 1–3 barras.
34. **Canal de MMs H/L:** compra quando fechamento > MM(máximas); stop abaixo da MM(mínimas).
35. **MACD(12,26,9):** cruzamento linha × sinal; divergência: preço faz HH e MACD faz LH (baixa) / preço LL e MACD HL (alta).
36. **IFR:** período 14 (Wilder) ou 8 (autor); sobrecompra > 80 [ou 70], sobrevenda < 20 [ou 30]; compra quando volta acima de 30; venda quando volta abaixo de 70; principal uso = divergência com pivôs de preço.
37. **Estocástico:** sobrevenda < 30, sobrecompra > 70; compra = SlowK cruza %D para cima dentro da sobrevenda (ou sai da zona).
38. **Bollinger(20,2):** `%b`, `BW`; squeeze = BW no percentil ≤ 10–20% de N barras; expansão com bandas abrindo em direções opostas = início de movimento (direção por outro critério).
39. **Envelope:** MM21 ± 1,5–3% (curto prazo); compra quando preço volta para dentro após tocar a banda inferior.
40. **CCI(20):** > +100 cruzando para cima = momentum de alta; < −100 para baixo = momentum de baixa.
41. **Volume:** `vol > SMA(vol,20)` como confirmação de rompimento; OBV/A-D/CMF(21) divergentes do preço = alerta; CMF > 0 sustentado = acumulação.
42. **Volatilidade histórica:** `HV(21) = std(ln(C/C[1]), 21) × √(períodos/ano)`; HV subindo em queda e caindo em alta é o "normal" em ações (testar em cripto).
43. **Força relativa:** ranking de ALT/BTC; só comprar se o ratio estiver em tendência de alta (HH/HL ou acima da MM).

**Risco / gestão**
44. **Plano obrigatório:** cada sinal deve conter entrada, stop técnico, alvo(s), stop de tempo (máx. barras) e tamanho.
45. **Filtro R:R:** descartar sinais com `(alvo − entrada)/(entrada − stop) < 3` [autor sugere 3:1; exemplos com 3,16 e 4].
46. **Tamanho:** `qtd = (equity × 1%) / |entrada − stop|` (+ taxas). Nunca aumentar posição perdedora; piramidar só com novas entradas acima da anterior (compra).
47. **Saída parcial:** no alvo 1, realizar ≥ 50% e mover stop para breakeven+.
48. **Stop de tempo:** fechar se o trade não progredir em N barras (definido pelo setup).
49. **Expectativa:** rastrear `E = p·G − (1−p)·L` por setup; desativar setups com E ≤ 0 (com amostra mínima). Kelly `f = p − (1−p)/R` só como teto teórico (usar fração).
50. **Somente candles fechados** para todos os gatilhos ("bendita confirmação").

## Como complementa o método Excelência Trading (SMC/ICT + Wyckoff + Volume Profile)
- **Dow ↔ estrutura SMC:** HH/HL, LH/LL e a regra de Hamilton/Nelson (falha em fazer novo topo + fechamento abaixo do último fundo) são a base objetiva de **CHoCH/BOS**. A exigência de **fechamento** (não pavio) para confirmar rompimento é diretamente aplicável à validação de BOS.
- **Fases de Dow e ciclos (acumulação/alta/distribuição/descida)** = fases de Wyckoff; o livro reforça critérios de volume: volume alto e decrescente nas altas durante distribuição, pânico com volume muito alto, baixa lenta com volume seco — úteis para rotular fases no scanner.
- **Bipolaridade de S/R + pullback ao nível rompido** = retest de OB/breaker/flip zone do SMC. O "score de nível" (toques, idade, volume, recência) pode ranquear zonas SMC e níveis de Volume Profile (HVN/POC).
- **Volume por preço (p. 279)** é o Volume Profile; o livro não traz regras, mas confirma o uso de volume no nível como medida de força de S/R.
- **Gaps:** a ideia de que gaps são áreas sem memória/negociação e de que gaps de exaustão são preenchidos rapidamente conversa com FVG/imbalance; gap de fuga ≈ FVG de continuação no meio do movimento (alvo por medida).
- **Pivô de alta (P1-P2-P3 + rompimento de P2)** = HL + BOS; alvos 0,618/1/1,618×Z servem como TPs objetivos para setups SMC (complementar às zonas de liquidez).
- **Números redondos (,00/,50)** = liquidez/âncoras — compatível com noção de pools de liquidez.
- **Padrões clássicos** (OCO, duplos, triângulos, bandeiras) fornecem **alvos por projeção** e **taxas históricas (Bulkowski)** como prior para o backtest; muitos padrões de reversão são "estrutura + varredura de liquidez" (ex.: topo duplo = equal highs → pool de liquidez acima; o SMC trataria o rompimento falso desse topo como sweep).
- **Filtros de regime (ADX, BandWidth, MMs)** ajudam a decidir quando aplicar setups de continuação (OB/FVG a favor) vs. reversão (sweep + CHoCH) e a evitar operar ranges com setups de tendência.
- **Divergências (MACD/IFR/OBV)** podem ser confluência para sweeps em extremos (ex.: sweep de máxima + divergência de IFR + CHoCH no LTF).
- **Gestão de risco:** 1% por trade, R:R ≥ 3, parcial de 50% no alvo 1 + breakeven, stop de tempo e "só candle fechado" são regras diretas para o executor/scanner.
- **Top-down (mensal→semanal→diário→intraday)** é o mesmo fluxo HTF→LTF do método; o livro sugere diário como carro-chefe e intraday só para refinar entrada.

## Dúvidas / pontos ambíguos
1. **Estatísticas de Bulkowski** (falha, movimento médio, % que atinge alvo) vêm de ações americanas no diário (edição 2005) e há inconsistências na tabela do livro (ex.: "topo duplo" aparece com rankings 5, 6 e 9; cunha descendente listada como ▼ e ▲). Não transferíveis para cripto intraday sem backtest próprio.
2. **Filtro de 3%** (rompimento de LT) e **tolerância de 3%** (topos/fundos duplos) são calibrados para ações no diário; em cripto 15m–4h precisam virar múltiplos de ATR. Qual multiplicador? → definir por backtest.
3. **Durações em semanas/meses** (bandeira 1–12 semanas, picos de duplo ≥ 1 mês, triângulo ~3 meses) não têm tradução direta para TFs intraday; usar nº de barras relativo ao TF ou à duração do movimento prévio.
4. **IFR**: o livro dá zonas 80/20 *e* sinais em 30/70, e período 8 (autor) vs 14 (Wilder/Trader Brasil) — escolher por backtest.
5. **CCI**: o livro usa desvio-padrão; a fórmula original de Lambert usa desvio médio absoluto (mean deviation). Implementar o padrão de mercado (MAD) ou o do livro?
6. **Linha A/D**: o livro usa `(C − O)` no numerador; a fórmula de Chaikin padrão é `((C − L) − (H − C))/(H − L)`. Provável erro do livro.
7. **ADX/DX**: fórmula do DX impressa com erro (subtração no lugar de divisão); usar a definição padrão de Wilder.
8. **Parabólico SAR**: o livro usa a máxima anterior em vez do Extreme Point (EP); usar definição padrão.
9. **Kelly**: exemplo do livro (G = 70%, V = 3) dá 60%, não 50% como impresso. De qualquer forma Kelly cheio é agressivo demais.
10. **Pivô de alta**: rótulos "objetivo de 38%/50%/62%" não batem com multiplicadores 0,618/1,0/1,618 — tratar como extensões de 61,8%, 100% e 161,8% da onda 1.
11. **Gaps** em perpétuos 24/7 praticamente não existem; decidir se o scanner mapeará gap ≈ FVG (3 velas) e se aplicará a mesma taxonomia (quebra/fuga/exaustão).
12. **Indicador "Didi index"** é citado (cap. 8, p. 285) mas não definido no livro.
13. **VPCI (IVCP)**: períodos curto/longo não especificados no texto.
14. Volatilidade histórica "cai na alta e sobe na queda" é observação de ações; em cripto há fases de alta com volatilidade crescente (squeezes de short) — verificar empiricamente.
