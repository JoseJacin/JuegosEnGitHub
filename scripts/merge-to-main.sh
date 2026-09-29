#!/usr/bin/env bash
# Fusiona una rama de funcionalidad en main y publica ambas ramas en origin.
#
# IMPORTANTE: este script hace push a main. Ejecútalo únicamente después de que
# el usuario haya dado el OK explícito para fusionar, tal como exige AGENTS.md.
# El flag --confirmado no sustituye ese OK: solo evita ejecutar el script por error.
#
# Uso: scripts/merge-to-main.sh --confirmado <rama>
set -euo pipefail
cd "$(dirname "$0")/.."

if [[ "${1:-}" != "--confirmado" || -z "${2:-}" ]]; then
  echo "Este script fusiona <rama> en main y hace push a origin." >&2
  echo "Solo debe ejecutarse tras el OK explícito del usuario para fusionar." >&2
  echo "Uso: $0 --confirmado <rama>" >&2
  exit 1
fi

rama="$2"

git switch main
git pull --ff-only origin main
git merge --no-ff "$rama" -m "Merge branch '${rama}' into main"
git push origin main
git push -u origin "$rama"
echo "Fusionada '${rama}' en main y publicadas ambas ramas en origin."
