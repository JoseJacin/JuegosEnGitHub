# Propuesta: historial, reinicio y victoria

**Estado:** Implementada
**Fecha:** 2026-09-23
**Responsable:** Codex

## Problema y objetivo

La partida ya permite trasvasar líquidos, pero todavía no ofrece recuperación de movimientos, reinicio ni cierre del ciclo de juego. Este cambio completa ese ciclo conforme a las reglas aprobadas en [`../../juegos/botellas-y-liquidos/README.md`](../../juegos/botellas-y-liquidos/README.md).

## Alcance

- Incluye: guardar el estado antes de cada movimiento válido; deshacer movimientos; restaurar la disposición inicial de la partida actual; detectar la victoria; ofrecer deshacer el movimiento ganador, repetir con la misma configuración o cambiarla.
- No incluye: cambios en las reglas de trasvase o generación, rediseño visual general ni publicación en GitHub Pages.

## Requisitos y decisiones

- El historial guarda copias independientes de capacidades, capas y estado abierto/cerrado antes de cada trasvase válido. Los intentos inválidos no crean entradas.
- Reiniciar recupera exactamente la disposición inicial de la partida actual y vacía el historial.
- Las botellas vacías no impiden la victoria. Cada botella con líquido debe estar llena, tener una capa de un solo color y estar cerrada.
- Al ganar se muestra un diálogo con opciones para deshacer el último movimiento, generar otra disposición usando la configuración actual o volver a la configuración.
- Cambiar la configuración mantiene los valores elegidos y comenzar crea una partida nueva.

## Criterios de aceptación

- [x] Se puede deshacer cada movimiento válido y los movimientos inválidos no alteran el historial.
- [x] Reiniciar restaura la disposición inicial actual y deja el botón de deshacer sin movimientos disponibles.
- [x] La victoria exige botellas llenas, de un color y cerradas; las botellas vacías se ignoran.
- [x] El diálogo permite deshacer la jugada ganadora, repetir con la configuración actual o cambiarla.
- [x] Repetir genera una disposición nueva con los valores de configuración vigentes.

## Tareas

- [x] Añadir copias de estado e historial para los movimientos válidos.
- [x] Añadir deshacer y reinicio de la disposición actual.
- [x] Detectar la victoria y presentar las acciones de fin de partida.
- [x] Actualizar el plan y el contexto del proyecto.
- [x] Revisar cambios y sintaxis estáticamente.

## Riesgos, dependencias y preguntas

Depende del modelo y trasvase de T3 y T4. La revisión fue estática; la comprobación manual de los flujos en navegador queda para T7.
