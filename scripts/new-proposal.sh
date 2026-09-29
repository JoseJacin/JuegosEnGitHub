#!/usr/bin/env bash
# Crea el archivo de una propuesta nueva a partir de la plantilla, calculando
# automáticamente el siguiente idPropuesta libre (revisa archivos actuales,
# todo el historial de Git, nombres de rama y mensajes de commit, porque las
# propuestas completadas se retiran del árbol de trabajo y solo algunas dejan
# rastro en los nombres de rama o en los commits de fusión).
#
# Uso: scripts/new-proposal.sh <juego-o-sitio> <descripcion_con_guiones> ["Título legible"]
# Ejemplo: scripts/new-proposal.sh botellas-y-liquidos sonido_ambiente "Sonido ambiente"
set -euo pipefail
cd "$(dirname "$0")/.."

if [[ $# -lt 2 ]]; then
  echo "Uso: $0 <juego-o-sitio> <descripcion_con_guiones> [\"Título legible\"]" >&2
  echo "Ejemplo: $0 botellas-y-liquidos sonido_ambiente \"Sonido ambiente\"" >&2
  exit 1
fi

ambito="$1"
descripcion="$2"
titulo="${3:-$descripcion}"

if [[ "$ambito" == "sitio" ]]; then
  destino_dir="docs/propuestas"
else
  destino_dir="juegos/${ambito}/propuestas"
fi

if [[ ! -d "$destino_dir" ]]; then
  echo "No existe '$destino_dir'. Comprueba el identificador de juego o usa 'sitio' para cambios transversales." >&2
  exit 1
fi

# Tres fuentes, porque una propuesta completada se retira del árbol de trabajo
# y a veces la única huella que queda es el nombre de rama o el commit de fusión.
ids_from_history=$(git log --all --diff-filter=A --name-only --pretty=format: 2>/dev/null | grep -oE '(^|/)[0-9]{3}_[^/]+\.md$' | grep -oE '[0-9]{3}' || true)
ids_from_branches=$(git branch --all 2>/dev/null | grep -oE '_[0-9]{3}_' | tr -d '_' || true)
ids_from_commits=$(git log --all --pretty=format:'%s' 2>/dev/null | grep -oE '_[0-9]{3}_' | tr -d '_' || true)

max_id=$(printf '%s\n' $ids_from_history $ids_from_branches $ids_from_commits | sort -n | tail -1)
max_id=${max_id:-000}
next_id=$(printf '%03d' $((10#$max_id + 1)))

archivo="${destino_dir}/${next_id}_${descripcion}.md"
if [[ -e "$archivo" ]]; then
  echo "'$archivo' ya existe; revisa manualmente el identificador (posible colisión)." >&2
  exit 1
fi

fecha=$(date +%Y-%m-%d)
sed \
  -e "s/^# Propuesta: <nombre del cambio>/# Propuesta ${next_id} — ${titulo}/" \
  -e "s/^\*\*Estado:\*\* Borrador | En revisión | Aprobada | Implementada/**Estado:** Borrador/" \
  -e "s/^\*\*Fecha:\*\* AAAA-MM-DD/**Fecha:** ${fecha}/" \
  docs/plantillas/propuesta.md > "$archivo"

echo "Creada: ${archivo} (idPropuesta ${next_id})"
echo "Pendiente: completar Responsable/Objetivo/Alcance/Requisitos/Criterios/Tareas,"
echo "y enlazarla desde ${destino_dir}/README.md antes de pedir su aprobación."
