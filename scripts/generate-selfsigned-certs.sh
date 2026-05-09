#!/usr/bin/env bash
# Создаёт ./certs/fullchain.pem и ./certs/privkey.pem для nginx (доступ по https://IP).
# Использование: ./scripts/generate-selfsigned-certs.sh ВАШ_ПУБЛИЧНЫЙ_IP
# Без аргумента — в SAN только localhost (удобно для локального Docker).

set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
CERT_DIR="$ROOT/certs"
mkdir -p "$CERT_DIR"

IP="${1:-}"
CN="${IP:-localhost}"

TMP="$(mktemp)"
cleanup() { rm -f "$TMP"; }
trap cleanup EXIT

if [[ -n "$IP" ]]; then
  cat >"$TMP" <<EOF
[req]
distinguished_name = req_distinguished_name
x509_extensions = v3_req
prompt = no

[req_distinguished_name]
CN = $CN

[v3_req]
subjectAltName = @alt_names

[alt_names]
DNS.1 = localhost
IP.1 = $IP
EOF
else
  cat >"$TMP" <<EOF
[req]
distinguished_name = req_distinguished_name
x509_extensions = v3_req
prompt = no

[req_distinguished_name]
CN = localhost

[v3_req]
subjectAltName = DNS:localhost
EOF
fi

openssl req -x509 -nodes -newkey rsa:2048 -days 825 \
  -keyout "$CERT_DIR/privkey.pem" \
  -out "$CERT_DIR/fullchain.pem" \
  -config "$TMP" \
  -extensions v3_req

chmod 600 "$CERT_DIR/privkey.pem"
chmod 644 "$CERT_DIR/fullchain.pem"
echo "OK: $CERT_DIR/fullchain.pem + privkey.pem (CN=$CN)"
