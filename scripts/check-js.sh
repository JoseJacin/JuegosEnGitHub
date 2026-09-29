#!/usr/bin/env bash
# Comprueba la sintaxis de los archivos .js con "node --check" (no ejecuta el código, solo valida que parsea).
# Uso: scripts/check-js.sh [ruta]   (por defecto revisa todo el repositorio)
set -uo pipefail
cd "$(dirname "$0")/.."

TARGET="${1:-.}"

if ! command -v node >/dev/null 2>&1; then
  echo "node no está disponible en este entorno; instala Node.js o ejecuta este script donde esté disponible." >&2
  exit 1
fi

if [[ ! -e "$TARGET" ]]; then
  echo "La ruta '$TARGET' no existe." >&2
  exit 1
fi

fail=0
count=0
while IFS= read -r -d '' file; do
  count=$((count + 1))
  if error_output=$(node --check "$file" 2>&1); then
    echo "✓ $file"
  else
    echo "✗ $file"
    echo "$error_output" | sed 's/^/    /'
    fail=1
  fi
done < <(find "$TARGET" -type f -name '*.js' -not -path '*/.git/*' -print0)

if [[ "$count" -eq 0 ]]; then
  echo "No se encontraron archivos .js en '$TARGET'."
fi

exit $fail
