# Propuesta: selección y trasvase de líquidos

**Estado:** Implementada
**Fecha:** 2026-09-23
**Responsable:** Codex

## Problema y objetivo

La partida generada todavía no se puede jugar. El objetivo es permitir mover líquidos entre las botellas siguiendo las reglas aprobadas en [`../../juegos/botellas-y-liquidos/README.md`](../../juegos/botellas-y-liquidos/README.md).

## Alcance

- Incluye: seleccionar y cancelar un origen; validar origen y destino; trasvasar la capa continua superior según espacio y color; cerrar las botellas completadas; dar respuesta visual y accesible ante movimientos inválidos.
- No incluye: deshacer, reinicio, detección y diálogo de victoria (T5); rediseño visual general y adaptación completa para teclado/lector de pantalla (T6).

## Requisitos y decisiones

- Se mantiene la interacción de seleccionar origen y después destino, usando clic o toque.
- Solo una botella abierta y con líquido puede ser origen.
- El origen y destino deben ser distintos. Al volver a seleccionar el origen, se cancela la selección.
- El destino debe estar abierto, tener espacio y estar vacío o tener arriba el color que se vierte.
- Se mueve la capa continua superior hasta donde permita el espacio libre.
- Una botella llena con un único color se cierra automáticamente.
- Un movimiento inválido conserva el estado de la partida y comunica el motivo; la selección se cancela.

## Criterios de aceptación

- [x] Un clic o toque selecciona un origen válido y su estado queda visible.
- [x] Volver a seleccionar el origen cancela la selección.
- [x] Los trasvases válidos mueven la cantidad permitida y actualizan el tablero.
- [x] Los movimientos inválidos no cambian los líquidos y muestran un mensaje claro.
- [x] Una botella completada queda marcada y no puede seleccionarse como origen ni recibir líquido.

## Tareas

- [x] Añadir estado de partida y mensajes de movimiento.
- [x] Implementar selección, cancelación, validación y trasvase.
- [x] Actualizar el render del tablero para reflejar selección, contenido y cierre.
- [x] Revisar sintaxis y diff.

## Riesgos, dependencias y preguntas

Depende del modelo de botellas y capas de T3. La revisión se hizo de forma estática; queda pendiente la comprobación manual en navegador junto con la validación integral de T7.
