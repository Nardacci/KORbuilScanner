# 12 — Mapa operacional (esquema anotado, XAUUSD 4h)

Fonte: imagem de estudo enviada em 08/11/2026 (`imagens/mapa-operacional-xauusd-4h.png`).
É o resumo do modelo operacional da Excelência Trading numa única sequência de preço.

## Os 5 contextos e racionais
1. **Captura de liquidez**
2. **Estruturas de Wyckoff** (acumulação / distribuição)
3. **Rompimento de região** (troca de polaridade)
4. **Inversão de fluxo** — SMS: topo abaixo do topo anterior (ou fundo acima do anterior)
5. **Macro e micro** — o POI do tempo maior é validado no tempo menor

## A sequência do esquema (da esquerda para a direita)
1. Queda → **acumulação de Wyckoff** (lateral com fundos iguais).
2. **Captura de liquidez** abaixo da acumulação → saída forte para cima.
3. **Distribuição de Wyckoff** (lateral no topo) com captura acima.
4. **POI**: "ativo consolidou, capturou liquidez, distribuição de Wyckoff, gatilho de entrada POI"
   → primeira venda no bloco deixado pela saída da distribuição.
5. **Inversão de fluxo (SMS)**: topo abaixo do topo anterior → **nova entrada POI A+** no bloco
   seguinte, já com o fluxo invertido.
6. Queda até uma região → **região de oferta rompida após captura de liquidez; corrigiu e subiu
   validando novo POI de demanda = cenário A+** (troca de polaridade).
7. **Macro e micro**: o preço testa a zona de interesse, valida o interesse e forma um **novo POI
   a favor** (o micro confirma o macro) → entrada.
8. **POI.D**: "quando cria um POI maior em cima de outro" — bloco dentro de bloco (o POI do
   tempo menor nasce dentro do POI do tempo maior) → prioridade máxima.
9. **Rompimento de regiões / troca de polaridade = A+**.
10. "**Ativo captura liquidez formando POI; após rejeitar e sentir liquidez, preço retorna à região
    formando um novo POI a favor da liquidez; entrada A+**."

## O que define um cenário A+ (extraído do esquema)
Um A+ sempre tem **três ingredientes juntos**:
- uma **captura de liquidez** antes (varredura de fundos/topos ou Spring/UTAD de uma estrutura);
- uma **mudança de fluxo confirmada** depois dela (SMS/CHoCH, ou região rompida que troca de
  polaridade);
- um **novo POI formado a favor** do novo fluxo, que é onde se entra (de preferência POI.D:
  o POI do tempo menor dentro do POI do tempo maior).

Entrar só no bloco, sem captura antes ou sem a troca de fluxo, não é A+.

## Tradução para os setups do laboratório
| Setup no código | O que o esquema exige | O que falta no código |
|---|---|---|
| **Spring/UTAD** (lateral) | captura na estrutura de Wyckoff + saída + entrada no POI da saída | entrada hoje é no teste pós-captura; o esquema entra no **POI deixado pela saída** |
| **Reteste do OB** (CHoCH) | captura antes + SMS + bloco a favor | exigir a captura antes do CHoCH (`obRequireSweep`) e, no micro, um POI a favor (POI.D) |
| **Lateral rompida** | região rompida **após captura**, correção e **novo POI a favor** | hoje entra no reteste da lateral sem captura nem POI novo → por isso perdeu (−0,70R) |

Regra para a próxima rodada de testes: cada setup só gera sinal quando os três ingredientes
do A+ estão presentes; o resto é descartado, não pontuado.
