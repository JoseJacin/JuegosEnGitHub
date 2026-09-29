#!/usr/bin/env bash
# Levanta un servidor HTTP estático para probar el sitio en el navegador.
# Uso: scripts/serve.sh [puerto]   (por defecto 8000)
set -euo pipefail
cd "$(dirname "$0")/.."

PORT="${1:-8000}"

if ! command -v python3 >/dev/null 2>&1; then
  echo "python3 no está disponible en este entorno; instálalo o usa otro servidor estático." >&2
  exit 1
fi

echo "Sirviendo el sitio en http://localhost:${PORT}/ (raíz del repositorio)."
echo "Ejemplos de rutas: http://localhost:${PORT}/menu/  http://localhost:${PORT}/juegos/botellas-y-liquidos/"
echo "Pulsa Ctrl+C para detener el servidor."
exec python3 -m http.server "$PORT"
