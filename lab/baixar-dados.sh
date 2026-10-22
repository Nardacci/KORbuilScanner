#!/usr/bin/env bash
# Baixa candles de 15m dos futuros perpétuos USDT-M da Binance (data.binance.vision)
# e junta tudo em lab/dados/<ATIVO>-15m.csv (abertura,abertura,máxima,mínima,fechamento,volume).
# Uso: bash lab/baixar-dados.sh [AAAA-MM inicial] [AAAA-MM final]
set -euo pipefail
cd "$(dirname "$0")"
INI=${1:-2022-01}
FIM=${2:-$(date -u -d "$(date -u +%Y-%m-01) -1 month" +%Y-%m)}
SIMBOLOS=${SIMBOLOS:-"BTCUSDT ETHUSDT BNBUSDT SOLUSDT XRPUSDT ADAUSDT DOGEUSDT AVAXUSDT LINKUSDT DOTUSDT LTCUSDT BCHUSDT ATOMUSDT NEARUSDT FILUSDT ETCUSDT TRXUSDT UNIUSDT AAVEUSDT XLMUSDT"}
mkdir -p dados tmp
for S in $SIMBOLOS; do
  OUT="dados/$S-15m.csv"
  : > "$OUT"
  m="$INI"
  while [[ "$m" < "$FIM" || "$m" == "$FIM" ]]; do
    F="$S-15m-$m"
    URL="https://data.binance.vision/data/futures/um/monthly/klines/$S/15m/$F.zip"
    if curl -sfL -o "tmp/$F.zip" "$URL"; then
      unzip -p "tmp/$F.zip" | grep -v '^open_time' | cut -d, -f1-6 >> "$OUT"
      rm -f "tmp/$F.zip"
    else
      echo "  sem arquivo: $F" >&2
    fi
    m=$(date -u -d "$m-01 +1 month" +%Y-%m)
  done
  echo "$S: $(wc -l < "$OUT") candles"
done
rmdir tmp 2>/dev/null || true
