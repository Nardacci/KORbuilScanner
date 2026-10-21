# Trading Volatility (Trading Volatility, Correlation, Term Structure and Skew) — Colin Bennett (2014)

Fonte: `/home/user/korbuilscanner/Livros/Trading-Volatility.pdf` (317 págs PDF). Referências: "p. X" = página impressa do livro; **página do PDF = X + 12** (ex.: A.2 começa na p. 232 = PDF 244).

## 0. Do que o livro trata (veredito)
Livro de **derivativos de ações** (sell-side, Santander/Barclays): opções, swaps de volatilidade/variância/gamma, índices de volatilidade (VIX/vStoxx) e seus futuros/ETNs, exóticos leves (barreiras, worst-of, quanto), correlação/dispersão, skew e estrutura a termo, Black-Scholes, gregas. **≈ 90% do conteúdo é sobre volatilidade implícita e precificação/negociação de opções** — não se aplica diretamente a um scanner de futuros perpétuos. As partes aproveitáveis são: **medição de volatilidade realizada (Apêndice A.2)**, propriedades estatísticas da volatilidade (aditividade da variância, regra √T, reversão à média, autocorrelação, volatilidade intradiária), **regimes de volatilidade** (relação vol × preço, picos e reversão, estrutura a termo invertida em estresse), **eventos/saltos** (separar volatilidade "difusa" de saltos de eventos) e algumas ideias de gestão de risco (Sortino, frequência de rebalanceamento vs. tendência/range). Nada no livro fala de ATR, stops ou position sizing de forma direta — essas aplicações abaixo são **adaptações minhas** marcadas como **[adapt]**.

---

## 1. Medição de volatilidade realizada (Apêndice A.2, p. 232-244) — PARTE MAIS ÚTIL
**Definição (p. 232):** vol = desvio-padrão anualizado dos **log-retornos** `x_i = ln(C_i / C_{i−1})`. Desvio médio absoluto = √(2/π) ≈ 0,8 × σ → **σ ≈ 1,25 × movimento % típico (absoluto)**.
- Anualização: `σ_anual = σ_x × √F`, F = nº de períodos por ano (252 diário em ações; 52 semanal; 12 mensal). **[cripto]** mercado 24/7: F = 365 (diário), 365×6 = 2190 (4h), 8760 (1h), 35040 (15m).
- **Regra de bolso (p. 41-42):** vol anual ≈ 16 × movimento % diário (√252 ≈ 16); semanal × 7 (√52); mensal × 3,5 (√12). **[cripto]** √365 ≈ 19,1 → vol anual ≈ 19 × move diário; inversamente, **move diário esperado (1σ) ≈ vol_anual / 19**.

**Drift zero (p. 233-234):** usar média zero no cálculo (`σ² = (F/N) Σ x_i²`). Com drift amostral, uma série que sobe 10%/dia por 10 dias teria vol zero (absurdo). Com drift zero, **a variância é aditiva no tempo** (ponderada pelo tempo de cada período): `σ²_total = (N1/N)·σ²_1 + (N2/N)·σ²_2`.

**Janela (p. 235):**
- Comparar vol de 1 mês com 21 dias, 3 meses com 63 dias (ações).
- **Volatilidade reverte à média em ~8 meses** após uma crise; janelas > ~8 meses incluem eventos cujo efeito já passou.
- Se houve um salto pontual que não deve se repetir, **excluir o salto** da janela.
- A melhor estimativa após um evento raro pode ser a vol de episódios históricos semelhantes, não a vol recente.

**Frequência (p. 235-236):** diária preferível à semanal (5× mais dados). Se retornos são independentes, vol diária ≈ vol semanal (anualizadas).
- **Autocorrelação:** mercado em tendência (autocorrelação positiva) → vol semanal > vol diária; mercado de range/reversão (autocorrelação negativa) → vol semanal < diária. Exemplo: 100% de autocorrelação, 1%/dia → diária 16%, semanal 35% (> 2×).
- Autor: HFT deveria eliminar autocorrelação positiva persistente; mas **em pânico pode surgir autocorrelação temporária** (stops disparando, seguidores de momentum).
- → **Indicador de regime [adapt]:** `VR = σ_anual(retornos de k barras) / σ_anual(retornos de 1 barra)` (variance ratio). VR > 1 = tendência; VR < 1 = reversão à média/range.

**Vol intradiária não é constante (p. 236-237):** maior na abertura e no fechamento, menor no meio do dia (ações). Estimativas com frequência maior que diária são ruidosas → usar estimadores OHLC. **[cripto]** sazonalidade intradiária por sessão (abertura de Ásia/Londres/NY, funding a cada 8h, divulgações macro dos EUA às 8:30/10:00 ET) — medir perfil de vol por hora do dia e normalizar.

**EWMA (p. 237-238):** `σ²_i = λ·σ²_{i−1} + (1 − λ)·x²_i`, λ ≈ 0,9 (0 = só a última barra; 1 = constante). Vantagem: um pico de vol decai gradualmente em vez de "sumir" de uma vez quando sai da janela (efeito precipício da janela simples). Desvantagem: lida mal com eventos regulares (earnings).

**Estimadores avançados (p. 238-244)** — eficiência máx. relativa ao close-to-close:
| Estimador | Preços | Trata drift? | Trata saltos de abertura? | Eficiência máx |
|---|---|---|---|---|
| Close-to-close | C | não | não | 1 |
| Parkinson | H, L | não | não | 5,2 |
| Garman-Klass | OHLC | não | não | 7,4 |
| Rogers-Satchell | OHLC | **sim** | não | 8 |
| GK–Yang-Zhang | OHLC | não | sim | 8 |
| Yang-Zhang | OHLC | **sim** | **sim** | 14 |

Fórmulas (F = períodos/ano, N = nº de barras):
- Close-to-close (drift zero): `σ_cc = √(F/(N−1) · Σ ln(c_i/c_{i−1})²)`.
- Parkinson: `σ_P = √(F/N · 1/(4 ln2) · Σ ln(h_i/l_i)²)`.
- Garman-Klass: `σ_GK = √(F/N · Σ [½·ln(h_i/l_i)² − (2 ln2 − 1)·ln(c_i/o_i)²])`.
- Rogers-Satchell: `σ_RS = √(F/N · Σ [ln(h_i/c_i)·ln(h_i/o_i) + ln(l_i/c_i)·ln(l_i/o_i)])`.
- GK-YZ: `σ = √(F/N · Σ [ln(o_i/c_{i−1})² + ½·ln(h_i/l_i)² − (2 ln2 − 1)·ln(c_i/o_i)²])`.
- Yang-Zhang: `σ²_YZ = σ²_overnight + k·σ²_open-close + (1 − k)·σ²_RS`, `k = 0,34 / (1,34 + (N+1)/(N−1))`; `σ²_overnight = F/(N−1)·Σ(ln(o_i/c_{i−1}) − média)²`; `σ²_oc = F/(N−1)·Σ(ln(c_i/o_i) − média)²`.
- Qualidade: **amostras pequenas → Yang-Zhang é o melhor; amostras grandes → close-to-close**. Com dados reais o ganho é bem menor que o teórico. Close-to-close: variância do erro ≈ 1/(2N) → **mínimo 5 amostras (erro > 10% abaixo disso), ideal ≥ 20**; pouco ganho acima de 20.
- Viés: C-C tende a superestimar (não modela saltos noturnos ~1/6 da vol de ações); Parkinson/GK/RS subestimam (assumem negociação contínua); vol-of-vol alta aumenta a subestimação dos estimadores OHLC.
- **[cripto]** Perpétuos 24/7 quase não têm "overnight" (open_i ≈ close_{i−1}) → Parkinson/Garman-Klass/Rogers-Satchell ficam próximos do ideal; Yang-Zhang converge para RS. Recomendação [adapt]: **Rogers-Satchell ou Garman-Klass por barra** para vol de curto prazo (poucas barras), close-to-close (≥ 20 barras) para regime.
- Relação com ATR [adapt]: Parkinson usa ln(H/L), ou seja, é a versão estatística do "range médio". Para range normal, E[ln(H/L)] ≈ 1,6 × σ_barra (√(8/π)·σ) → **ATR%(n) ≈ 1,6 × σ_barra** (aprox.; ATR inclui gaps via true range). Útil para converter entre ATR e vol anualizada.

## 2. Propriedades da volatilidade úteis para trading direcional
**Variância é a medida "correta" (sec. 2.2, p. 49-51):** desvios precisam ser elevados ao quadrado para não se cancelarem; P&L de opção delta-hedgeada ∝ retorno² (dobrar a vol quadruplica o P&L). Vol = raiz da variância. Para agregar/compor vol entre períodos e janelas, **trabalhar em variância** (aditiva) e só no fim tirar a raiz.
- Exemplo (p. 46-47): um ativo que anda 1%/dia e outro que anda 2% a cada 4 dias têm a **mesma vol (16%)** → vol sozinha não distingue "movimento contínuo" de "saltos esparsos"; combinar com métricas de forma (curtose, % de barras com |ret| > k·σ).

**Regra √T (sec. 7.2, p. 193-197):**
- Escala de vol/movimento no tempo: `σ(T) = σ_anual × √T`; movimento esperado em n barras = `σ_barra × √n` (sob independência).
- Movimento de vol implícita por prazo ≈ `Δσ_1ano / T^p`, p ≈ 0,5 (empírico 0,44): **o curto prazo reage muito mais que o longo prazo**.
- **Realized vol reverte à média em ~8 meses após um pico; reversão é mais lenta quando o pico veio de queda do que de alta** (p. 193).

**Vol × preço (sec. 3.1-3.2, 7.1, p. 74-79, 184-191):**
- Correlação negativa vol × retorno em ações (R² 50-70%): **vol sobe quando o mercado cai** (alavancagem aumenta, saltos grandes tendem a ser para baixo, demanda de proteção). Em mercados calmos/de alta, vol cai.
- Consequência: **skew negativo** (proteção de baixa mais cara) e estrutura a termo **normalmente positiva** (curto < longo) em mercado calmo; **invertida (curto > longo) em quedas/estresse**; inversões são mais íngremes que as inclinações normais (p. 185).
- Vol implícita fica, em média, **acima** da realizada (prêmio de risco / demanda de hedge) e tem faixa min–max mais estreita que a realizada (cone de volatilidade, p. 186).
- Vol tem piso próximo das mínimas históricas de vol realizada e teto próximo das máximas → **vol é range-bound e reverte à média no longo prazo** (p. 216).
- Correlações entre ativos **tendem a 100% em crises** (p. 189-192, sec. 6.3): diversificação desaparece em pânico; `ρ_implícita ≈ σ²_índice / média(σ_componentes)²`.

**Regimes de volatilidade (sec. 7.5, p. 210-214)** — definidos para superfícies de vol implícita, mas o mapa de sentimento é útil:
| Regime | Sentimento | Horizonte | Correlação spot×vol |
|---|---|---|---|
| Sticky delta | calmo / **tendência estável** (alta ou baixa) | longo | positiva (vol ATM ~constante) |
| Sticky strike | normal | médio | ~zero |
| Sticky local vol | normal/nervoso | médio-curto | negativa |
| **Jumpy vol** | **pânico / crash** e também o repique após o crash (vol colapsa) | **dias a poucas semanas** | muito negativa |
- Mercados passam a maior parte do tempo entre sticky strike e sticky local vol; "jumpy" é raro e curto.
- VIX/vol futures (sec. 4.3, p. 119-121): picos acima de ~40 são precificados como **temporários** (futuro de 6 meses quase não acompanha); movimentos de vol na faixa 30–40 têm maior chance de serem **mudança de regime** persistente. → [adapt] distinguir **pico** (spike transitório) de **mudança de nível** da vol.
- Efeito "vicious circle" (sec. 3.4, p. 83-88): fluxos de hedge de dealers fazem a vol implícita **overshoot** na crise e **undershoot** na recuperação. **[cripto]** análogo: cascatas de liquidação/short squeeze em perpétuos (alavancagem forçada) amplificam movimentos; após o evento a vol colapsa.

**Frequência de rebalanceamento × regime (sec. 2.1 e 3.5, p. 41, 93-95):**
- **Em mercado em tendência, re-hedgear/realizar com menos frequência (deixar correr); em mercado lateral/choppy, re-hedgear com mais frequência** (capturar as voltas). Hedge a cada 5% captura ida-e-volta de 5%; hedge a cada 10% não captura, mas lucra mais numa perna de 10% em tendência. → paralelo direto com **trailing stop largo em tendência vs. alvos curtos em range** [adapt].
- Erro de hedge discreto ∝ 1/√(frequência): 4× mais frequente → metade do ruído (`σ_P&L ≈ σ·vega·√(π/(4N))`).
- Antes de eventos conhecidos, hedgear imediatamente antes do anúncio.
- **Use vol esperada (não a implícita atual) para calcular gregas/risco** (p. 96-98): exemplo Dec08 — straddle comprado 20 pts "barato" perdeu dinheiro porque o delta foi calculado com a vol errada. [adapt] dimensionar stops/posição com **previsão** de vol (ex.: EWMA/regime), não com a vol de uma janela defasada.

**Pinning (sec. 2.1, p. 42-43):** grandes posições long-gamma hedgeadas em torno de um strike "prendem" o preço no strike perto do vencimento (mais em ativos ilíquidos e mercados calmos); após o vencimento o preço "solta" (snap-back) na direção da tendência. **[cripto]** hipótese testável: open interest concentrado em strikes de opções de BTC/ETH (Deribit, vencimentos às sextas 08:00 UTC, mensais/trimestrais) pode atuar como ímã/S-R antes do vencimento — não está no livro para cripto.

## 3. Eventos e saltos (sec. 6.4, p. 178-182; A.3, p. 245-247)
- **Vol total = vol difusa (normal) + vol do salto** em datas-chave (resultados, conferências, qualquer divulgação material). Como a variância é aditiva:
  - `σ²_jump = σ²_após·T − σ²_difusa·(T − 1)` (T em dias até o vencimento posterior ao evento; σ diária).
  - Movimento esperado no dia do evento: `E|ret| = e^{σ_j²/2}·(2N(σ_j) − 1)` ≈ `σ_j·√(2/π)` ≈ 0,8·σ_j.
- **Vol após o evento ≈ ¾ da vol antes** (incerteza resolvida) (p. 180).
- Forward vol entre T1 e T2: `σ²_12 = (σ²_2·T2 − σ²_1·T1)/(T2 − T1)`.
- Ajustar pelo termo do índice para isolar o componente idiossincrático (p. 182).
- **[cripto]** Eventos equivalentes: CPI/FOMC/payroll (EUA), vencimentos de opções/futuros CME, desbloqueios de tokens (unlocks), listagens/deslistagens, upgrades de rede, horários de funding (8h). [adapt] Estimar `σ_jump` histórico por tipo de evento = `√(ret²_evento − σ²_difusa)` e usar para: (a) bloquear entradas X min antes do evento, (b) ampliar stop/reduzir tamanho se o trade atravessar o evento, (c) excluir saltos de evento ao estimar vol "normal" (A.2 recomenda excluir saltos não recorrentes).

## 4. Gestão de risco / métricas
- **Sortino (A.11, p. 269):** `Sortino = (R − T)/DR`, `DR = √(média de min(0, x − T)²)` (semivariância abaixo do alvo). Melhor que Sharpe para retornos assimétricos (estratégias com alvo fixo e stop, venda de vol). Usar Sortino + Sharpe + max drawdown no backtest.
- **Curtose:** retornos de ações são leptocúrticos (caudas gordas); momentos maiores exigem mais dados para estimar (p. 201-202). [adapt] σ subestima o risco de cauda → stops em múltiplos de σ/ATR terão violações "impossíveis" mais vezes que o normal sugere; acrescentar limite de perda por evento/dia.
- Gap risk premium (p. 15): parte do prêmio de opções curtas é risco de salto entre fechamento e abertura. **[cripto]** sem gap overnight, mas há saltos intrabarra (wicks de liquidação) → stops a mercado sofrem slippage; considerar stop no **mark price** e buffer.
- Tipos de queda (DAX desde 1960, p. 28): **crash** média −31% em ~1 mês (0–3 meses); **correção** −14% em ~3 meses; **bear market** −44% em ~2,5 anos. Útil como taxonomia de drawdowns (calibrar para cripto).

## 5. O que NÃO se aplica a futuros perpétuos cripto (resumo)
- Cap. 1 (estratégias com opções: escolha de strike/vencimento, call overwriting, put underwriting, collars, put spreads, estruturas) — só relevante se o usuário operar opções (ex. Deribit).
- Cap. 2.3–2.4 (swaps de volatilidade/variância/gamma, opções sobre variância), cap. 4.1, 4.4–4.5 (forward-starting, ETNs de VIX, opções sobre futuros de vol) — produtos inexistentes ou ilíquidos em cripto.
- Cap. 3.3–3.4 (variable annuities, structured products) — dinâmica de fluxo de bancos/seguradoras de ações.
- Cap. 5 (exóticos: barreiras, worst-of/best-of, outperformance, look-back, quanto/composite).
- Cap. 6.1–6.3 (relative value, dispersão, correlação implícita) — só o conceito de correlação → 1 em crise e de pares cointegrados é aproveitável.
- Cap. 7.3–7.5 (trading de calendário/skew, modelos de superfície), A.1, A.4–A.10, A.12 (vol local, provas, Black-Scholes, gregas, empréstimo de ações, arbitragem de estrutura de capital).
- **Dividendos, borrow cost, overnight gaps e horário de pregão** — inexistentes em perpétuos 24/7; em seu lugar entram **funding rate**, **mark price vs. last price** e **liquidações em cascata** (não tratados no livro).
- Dado de vol implícita para cripto existe (DVOL da Deribit para BTC/ETH; IV de opções) — se o scanner quiser, pode usar DVOL como "VIX do cripto" para regime; isso é extensão, não conteúdo do livro.

---

## Regras que podem virar código
(Todas são adaptações das ideias do livro para futuros; **[livro]** = fórmula/regra literal do livro.)
1. **[livro] Vol realizada close-to-close (drift zero):** `rv(n) = √(F/(n−1) · Σ ln(C_i/C_{i−1})²)`, n ≥ 20 (mín. 5). F por TF: 365 (1d), 2190 (4h), 8760 (1h), 35040 (15m).
2. **[livro] Estimadores OHLC:** implementar Parkinson, Garman-Klass, Rogers-Satchell e Yang-Zhang (fórmulas na seção 1); usar RS/GK para janelas curtas (5–20 barras); C-C para janelas ≥ 20.
3. **[livro] EWMA vol:** `σ²_t = λσ²_{t−1} + (1−λ)·r²_t`, λ = 0,9 (testar 0,94/0,97) → previsão da próxima barra sem "efeito precipício".
4. **Conversão ATR ↔ σ:** `σ_barra ≈ ATR%(n)/1,6` (range normal); `move_esperado(k barras) ≈ σ_barra·√k`. Útil para alvos/stops em unidades de σ.
5. **Regime de nível de vol:** `vol_pct = percentil(rv(20), janela 180–365 dias)`. Baixa vol: < p20; normal: p20–p80; alta: > p80. (Livro: vol é range-bound e reverte à média.)
6. **Spike vs. mudança de regime:** spike = `rv_curta(5) / rv_longa(60) > 2` com rv_longa estável → esperar reversão (evitar perseguir rompimento tardio, reduzir tamanho); mudança de regime = rv(20) e rv(60) subindo juntas por ≥ N barras.
7. **"Estrutura a termo" da vol realizada:** `term = rv(5)/rv(30)` (ou rv(20)/rv(100)). `term > 1` (invertida) = estresse/jumpy → reduzir alavancagem, alargar stops ou ficar fora; `term < 1` = calmo. (Livro: estrutura invertida em quedas/pânico.)
8. **Variance ratio (autocorrelação):** `VR(k) = var(ret_k)/(k·var(ret_1))` em janela móvel. VR > 1,1 → tendência (favorecer setups de continuação/BOS, trailing largo); VR < 0,9 → reversão/range (favorecer bordas de range, alvos curtos).
9. **Correlação vol × retorno:** correlação móvel entre `Δrv` e retorno; muito negativa = pânico (regime jumpy). Em cripto também testar o caso positivo (alta com vol subindo = squeeze/euforia).
10. **Position sizing por vol (vol targeting):** `notional = (equity × risco_alvo_anual) / σ_anual_previsto`; ou por trade `qtd = (equity × r%) / (k × σ_barra × preço)` com stop = k·σ_barra·√(barras esperadas). Reduzir tamanho em regime de vol alta (vol mais alta → mesmo risco em $ com menos contratos).
11. **Stop mínimo por ruído:** `stop_dist ≥ max(estrutura, m × σ_barra × √h)` (h = horizonte em barras, m ≈ 1–1,5) para não ficar dentro do ruído.
12. **Alvo de tempo:** se o preço não percorreu ≥ 1σ·√t na direção do trade após t barras, aplicar stop de tempo (ideia √T).
13. **Filtro de eventos:** calendário macro (CPI, FOMC, NFP), vencimentos (Deribit sexta 08:00 UTC; CME), unlocks; bloquear novas entradas de [−30 min, +15 min] do evento (parâmetros a testar); se posição aberta atravessa evento, exigir stop ≥ `σ_jump` estimado.
14. **[livro] σ_jump histórico por tipo de evento:** `σ_jump = √(max(0, r²_evento − σ²_difusa))` médio dos eventos passados; movimento esperado ≈ 0,8·σ_jump.
15. **Excluir saltos ao estimar vol normal:** remover barras com |r| > 5σ ou barras de evento do cálculo de `rv` usado para stops normais (A.2).
16. **Sazonalidade intradiária:** `σ_hora(h)` = média de |r| por hora UTC (últimos 30–90 dias); normalizar sinais de "vela grande/volume alto" pela sazonalidade (uma vela de 2× ATR na abertura de NY pode ser normal).
17. **Hedge/realização conforme regime:** em VR > 1 (tendência) usar trailing stop ≥ 2–3 ATR e saídas parciais espaçadas; em VR < 1 (range) usar alvos fixos 1–1,5 ATR e saídas mais frequentes.
18. **Métricas do backtest:** Sortino (T = 0), Sharpe, max drawdown, curtose dos retornos por trade.
19. **Correlação em crise:** se correlação média ALT↔BTC (janela 7–30 d) > 0,85 e BTC em regime de alta vol, tratar todas as posições como uma única exposição (limite de risco agregado).
20. **Pós-pico:** após pico de vol (rv_curta no percentil > 95), esperar decaimento (`rv(5)` caindo por ≥ X barras) antes de setups de continuação; o livro indica reversão da vol em ~8 meses em ações (em cripto medir meia-vida empírica).

## Como complementa o método Excelência Trading
- O método (SMC/ICT + Wyckoff + Volume Profile) define **onde** e **em que direção** entrar; este livro fornece a camada de **quanto arriscar e quando não operar**: medição robusta de volatilidade (OHLC estimators), dimensionamento de stops/posição por σ, e filtros de regime (vol alta/baixa, estrutura a termo realizada invertida, picos transitórios).
- **Displacement / vela de deslocamento (ICT):** pode ser definido objetivamente como `|r_barra| > k·σ_barra` (σ por EWMA/RS) ajustado pela sazonalidade intradiária, em vez de "vela grande" subjetiva. FVGs gerados em barras de alta σ-score têm maior significância.
- **Killzones (Londres/NY):** o livro confirma que vol intradiária tem padrão sazonal; normalizar a vol por hora ajuda a distinguir deslocamento real de ruído da abertura.
- **Wyckoff:** acumulação/distribuição tendem a ocorrer com vol realizada em compressão (percentil baixo); o rompimento (SOS/SOW) costuma vir com expansão — usar `vol_pct` e `term` como confirmação de fase. Climax (SC/BC) = spike de vol (rv_curta/rv_longa > 2) com volume extremo.
- **Gestão do trade:** a lição "re-hedgear menos em tendência, mais em range" vira regra de gestão: em estrutura de tendência confirmada (BOS sucessivos, VR > 1) deixar correr até a liquidez externa; em range (Wyckoff fase B, VR < 1) alvos na liquidez interna/POC.
- **Eventos macro** (CPI/FOMC) são causadores típicos de sweeps de liquidez; o livro dá a matemática para estimar o tamanho esperado do salto e para separar vol de evento da vol normal.
- **Volume Profile:** sem relação direta; mas a vol realizada pode dimensionar a largura das zonas (value area em σ) e os buffers de stop além de HVN/LVN.

## Dúvidas / pontos ambíguos
1. Constantes de anualização e "~8 meses" de reversão à média são de ações (252 dias, índices europeus/EUA); em cripto 24/7 a meia-vida da vol precisa ser medida (provavelmente bem menor em TFs intraday).
2. A relação "vol sobe quando o preço cai" é forte em ações; em cripto há episódios de vol alta em alta (squeeze, euforia de altcoins). A correlação spot×vol deve ser medida por ativo e por regime, não assumida.
3. Estimadores OHLC (Parkinson/GK/RS) assumem negociação contínua; em perpétuos isso é quase verdade, mas wicks de liquidação (spikes de 1 barra) inflacionam H−L → considerar winsorização ou mediana.
4. Conversão ATR ≈ 1,6·σ é aproximação teórica (Parkinson); verificar empiricamente por ativo/TF.
5. Os limiares de regime (percentis, rv5/rv30 > 1, VR > 1,1) são propostas minhas, não do livro — precisam de backtest.
6. Não há no livro nenhuma regra sobre ATR, stops técnicos ou position sizing para trading direcional; toda a parte de "ATR/vol para stops e tamanho" é adaptação baseada nos conceitos (√T, variância aditiva, vol targeting implícito).
7. Usar ou não vol implícita de cripto (DVOL/Deribit) como filtro adicional — exigiria outra fonte de dados além da Binance.
8. Efeito pinning em cripto (OI de opções Deribit por strike) é hipótese a testar; o livro só mostra exemplos em ações ilíquidas.
