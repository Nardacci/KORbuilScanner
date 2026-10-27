---
name: analisar-grafico
description: Analisa o print de um gráfico pela Estratégia KOR (Wyckoff + SMC + Volume Profile) e publica o cartão de análise na aba "Análises" do site. Use quando o usuário pedir para analisar uma imagem de gráfico, um print, ou chamar /analisar-grafico <arquivo>.
---

# Analisar gráfico pela Estratégia KOR

Entrada: um arquivo de imagem (PNG/JPG) com o print de um gráfico, normalmente em `analises/entrada/`.
Saída: um JSON em `analises/<id>.json`, a imagem copiada para `analises/<id>.png`, o índice
`analises/index.json` atualizado, e commit + push na `main` (o site lê esses arquivos).

## Passos

1. Leia `docs/base-conhecimento/estrategia.md` (as 6 etapas da KOR) e `docs/base-conhecimento/02-analise-avancada-liquidez.md`
   (liquidez, força de fundo/topo). Se já leu nesta sessão, não precisa reler.
2. Abra a imagem com a ferramenta Read e descreva o que vê ANTES de concluir: ativo e tempo gráfico
   (pelo título do gráfico), direção da tendência, últimos topos e fundos, lateralizações, varreduras
   (pavios além de topos/fundos), order blocks e FVGs visíveis, volume (se houver), e os preços dos
   níveis lidos no eixo. Preços lidos de imagem são aproximados: use até 3 algarismos significativos
   e diga "≈".
3. Percorra as 6 etapas da KOR, em ordem, dizendo para cada uma: `cumprida`, `parcial`, `pendente`
   ou `nao-se-aplica`, com uma frase de evidência tirada do gráfico.
   1. Contexto: quem controla (alta, baixa, equilíbrio) e se o preço está em desconto/premium.
   2. Região: lateral com força de fundo/topo, order block válido ou lateral abandonada.
   3. Liquidez criada perto da região (fundos/topos iguais, LT, CHoCH falso).
   4. Captura: varredura dessa liquidez com toque na região (Spring/UTAD só com fechamento fora).
   5. Confirmação: CHoCH no tempo menor com intenção (corpo, FVG, volume).
   6. Entrada no teste: POC/OB da perna de confirmação, stop além da captura, alvo na liquidez oposta.
4. Decida a direção e o veredito:
   - `operar`: etapas 1–5 cumpridas e R:R ≥ 2.
   - `aguardar`: etapas 1–3 cumpridas e 4 ou 5 pendentes. Diga exatamente o que o preço precisa fazer.
   - `nao-operar`: contexto contra a direção sem captura, R:R < 2, meio da lateral, lateral estreita,
     ou captura só de pavio. Diga o motivo.
   Nunca dê sinal contra a tendência do contexto sem captura de liquidez confirmada.
5. Calcule entrada, stop, alvo 1 (liquidez oposta) e alvo 2 (extremo oposto ou projeção da altura da
   lateral). O R:R é `(alvo1 − entrada) / (entrada − stop)`, calculado, nunca estimado. Se o veredito
   for `aguardar`, os valores são projetados (marque `projetado: true`).
6. Escreva a tese (3–5 frases), a invalidação (1–2 frases, com o preço) e o checklist pré-trade:
   itens objetivos, os obrigatórios marcados `critico: true`.
7. Dê a nota KOR (0–10) e a classe pela regra da estratégia: a favor do contexto +2, força de fundo/topo
   alta +2, POC dentro da região +1, volume alto na captura +1, Fibo 61,8 na zona +1, divergência de
   IFR +1, rompimento de confirmação com fechamento acima do pavio +1, FVG na perna de confirmação +1.
   A+ ≥ 8, A 6–7, B 4–5, C < 4. Contra o contexto: no máximo B. Só pontue o que está visível no print.
8. Grave os arquivos (formato abaixo) e rode `node scripts/analises.mjs publicar <id>`, que valida o
   JSON, atualiza o índice, carimba a versão e faz commit + push na `main`. Se o push falhar, avise.
9. Responda no chat com o cartão resumido: veredito, direção, entrada/stop/alvos, R:R, nota e o
   endereço `https://nardacci.github.io/KORbuilScanner/#analises`.

## Regras
- Português do Brasil, frases curtas, sem jargão sem explicação (a primeira vez que usar uma sigla,
  explique entre parênteses).
- Não invente níveis que não estão no print. Se o print não mostra volume, diga que a etapa de volume
  não pôde ser avaliada.
- Nunca mostre "confiança em %". A nota vem da tabela acima.
- Material de estudo, não recomendação. O JSON leva `aviso` com esse texto.
- `id` = `<ativo>-<tf>-<AAAA-MM-DD>-<HHMM>` em minúsculas (ex.: `meusdt-4h-2026-10-27-1430`).

## Formato de `analises/<id>.json`
```json
{
  "id": "meusdt-4h-2026-10-27-1430",
  "geradoEm": "2026-10-27T14:30:00-03:00",
  "imagem": "meusdt-4h-2026-10-27-1430.png",
  "ativo": "MEUSDT", "tf": "4h", "tfExecucao": "15m", "fonte": "print",
  "veredito": "aguardar",
  "direcao": "compra",
  "classe": "A", "nota": 6,
  "notaItens": { "contexto": 2, "forca": 2, "pocNaRegiao": 1, "volumeCaptura": 0, "fibo618": 0, "divergenciaIfr": 0, "rompimentoTipo1": 1, "fvgConfirmacao": 0 },
  "precoAtual": 0.0612,
  "plano": { "projetado": true, "entrada": 0.0598, "stop": 0.0571, "alvo1": 0.0689, "alvo2": 0.0760, "rr": 3.4 },
  "etapas": [
    { "n": 1, "nome": "Contexto", "status": "cumprida", "evidencia": "Topos e fundos descendentes desde ≈0,105; preço na metade de baixo da perna." },
    { "n": 2, "nome": "Região", "status": "cumprida", "evidencia": "Lateral entre ≈0,058 e ≈0,066 com mais tempo na metade de cima (força de fundo)." },
    { "n": 3, "nome": "Liquidez", "status": "cumprida", "evidencia": "Três fundos iguais em ≈0,0585." },
    { "n": 4, "nome": "Captura", "status": "pendente", "evidencia": "Ainda não houve fechamento abaixo de 0,0585 com volta." },
    { "n": 5, "nome": "Confirmação", "status": "pendente", "evidencia": "Depende da captura; observar CHoCH no 15m." },
    { "n": 6, "nome": "Entrada no teste", "status": "pendente", "evidencia": "POC da perna de confirmação, após o CHoCH." }
  ],
  "leitura": { "tendencia": "baixa", "estrutura": "...", "niveis": [ { "preco": 0.105, "tipo": "resistencia", "nome": "Topo da queda" } ] },
  "tese": "...",
  "invalidacao": "Fechamento de 4h abaixo de 0,0571 sem reação em até 3 candles.",
  "checklist": [
    { "item": "Candle de 4h fecha abaixo de 0,0585 e o seguinte fecha de volta dentro da lateral", "critico": true },
    { "item": "CHoCH no 15m com candle de corpo grande ou FVG", "critico": true },
    { "item": "Volume acima da média na captura", "critico": false }
  ],
  "oQueFalta": "O preço precisa varrer 0,0585, voltar para dentro e fazer CHoCH no 15m.",
  "aviso": "Ferramenta de estudo, não recomendação de investimento."
}
```
