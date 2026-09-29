#!/usr/bin/env bash
# Prueba automática: levanta un servidor temporal, comprueba que las páginas
# principales responden y valida la sintaxis de los .js. Pensado para que un
# agente compruebe sus propios cambios sin depender de un navegador.
# Uso: scripts/smoke-test.sh [puerto-base]   (por defecto 8099; si está ocupado prueba los 4 siguientes)
set -uo pipefail
cd "$(dirname "$0")/.."

BASE_PORT="${1:-8099}"
PORT=""
SERVER_PID=""
LOG_FILE="$(mktemp)"

cleanup() {
  if [[ -n "$SERVER_PID" ]]; then
    kill "$SERVER_PID" 2>/dev/null || true
    wait "$SERVER_PID" 2>/dev/null || true
  fi
  rm -f "$LOG_FILE"
}
trap cleanup EXIT

if ! command -v python3 >/dev/null 2>&1; then
  echo "python3 no está disponible; no se puede levantar el servidor de pruebas." >&2
  exit 1
fi
if ! command -v curl >/dev/null 2>&1; then
  echo "curl no está disponible; no se pueden comprobar las páginas." >&2
  exit 1
fi

for offset in 0 1 2 3 4; do
  candidate=$((BASE_PORT + offset))
  python3 -m http.server "$candidate" >"$LOG_FILE" 2>&1 &
  SERVER_PID=$!
  for _ in $(seq 1 20); do
    if curl -fsS "http://localhost:${candidate}/" >/dev/null 2>&1; then
      PORT="$candidate"
      break
    fi
    sleep 0.2
  done
  if [[ -n "$PORT" ]]; then
    break
  fi
  kill "$SERVER_PID" 2>/dev/null || true
  wait "$SERVER_PID" 2>/dev/null || true
  SERVER_PID=""
done

if [[ -z "$PORT" ]]; then
  echo "No se pudo iniciar el servidor de pruebas en los puertos ${BASE_PORT}-$((BASE_PORT + 4))." >&2
  cat "$LOG_FILE" >&2
  exit 1
fi

echo "Servidor de pruebas activo en http://localhost:${PORT}/"
fail=0

echo "== Comprobando páginas (HTTP 200 esperado) =="
paths=("/" "/menu/")
while IFS= read -r -d '' index; do
  rel="${index#./}"
  paths+=("/${rel}")
done < <(find juegos -mindepth 2 -maxdepth 2 -name 'index.html' -print0)

for path in "${paths[@]}"; do
  code=$(curl -s -o /dev/null -w '%{http_code}' "http://localhost:${PORT}${path}")
  if [[ "$code" == "200" ]]; then
    echo "✓ ${path} (${code})"
  else
    echo "✗ ${path} (${code})"
    fail=1
  fi
done

echo "== Comprobando sintaxis de los .js del sitio =="
if ! ./scripts/check-js.sh juegos; then
  fail=1
fi

if [[ "$fail" -eq 0 ]]; then
  echo "== Resultado: todas las comprobaciones pasaron =="
else
  echo "== Resultado: hay comprobaciones que fallaron; revisa los mensajes anteriores ==" >&2
fi

exit $fail
