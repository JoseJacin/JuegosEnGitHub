#!/usr/bin/env bash
# Crea la rama de funcionalidad exigida por COMANDOS.md, partiendo de main actualizado.
# Uso: scripts/new-branch.sh <juego-o-sitio> <idPropuesta> <descripcion_con_guiones_bajos>
# Ejemplo: scripts/new-branch.sh botellas-y-liquidos 035 compartir_resultado
set -euo pipefail
cd "$(dirname "$0")/.."

if [[ $# -lt 3 ]]; then
  echo "Uso: $0 <juego-o-sitio> <idPropuesta> <descripcion_con_guiones_bajos>" >&2
  echo "Ejemplo: $0 botellas-y-liquidos 035 compartir_resultado" >&2
  exit 1
fi

ambito="$1"
id_propuesta="$2"
descripcion="$3"
rama="feature/${ambito}_${id_propuesta}_${descripcion}"

git switch main
git pull --ff-only origin main
git switch -c "$rama"
echo "Rama creada y activa: ${rama}"
