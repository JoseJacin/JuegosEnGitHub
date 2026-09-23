# Propuesta: botella vacía de reserva al inicio

**Estado:** Aprobada e implementada
**Fecha:** 2026-09-23
**Responsable:** Codex

## Problema y objetivo

Una botella vacía al inicio ofrece espacio para maniobrar y permite admitir configuraciones donde no hay unidades suficientes para poner líquido en todas las botellas.

## Alcance

- Incluye: dejar una botella vacía de reserva en cada partida, mantener las demás botellas con líquido parcialmente llenas, ajustar la validación de configuración y explicarla en pantalla.
- No incluye: cambiar las reglas de trasvase, la victoria o los controles de partida.

## Requisitos y decisiones

- Actualizar la regla de estado inicial en [`../../juegos/botellas-y-liquidos/README.md`](../../juegos/botellas-y-liquidos/README.md).
- La configuración solo se puede iniciar si hay una asignación de capacidades con una botella vacía, y cada una de las restantes tiene al menos una unidad y un espacio libre.
- Con capacidades iguales, el volumen objetivo de color debe estar entre `n−1` y `(n−1)×(capacidad−1)`, donde `n` es el total de botellas.
- Con capacidades distintas, dejar vacía la botella de menor capacidad no objetivo y verificar el volumen contra el mínimo de botellas ocupadas y la capacidad parcial restante.
- La partida conserva una solución conocida por construcción.

## Criterios de aceptación

- [x] Cada partida inicia con exactamente una botella vacía, identificada visualmente.
- [x] Ninguna otra botella empieza vacía ni llena.
- [x] La validación habilita solo asignaciones compatibles con el nuevo estado inicial y explica los límites cuando no lo son.
- [x] Las partidas generadas siguen siendo resolubles.
- [x] Se actualizan las reglas, el plan y CONTEXTO.

## Tareas

- [x] Actualizar las reglas aprobadas del juego.
- [x] Ajustar validador y generador de T3.
- [x] Actualizar propuesta, plan y CONTEXTO.

## Riesgos, dependencias y preguntas

Reservar un espacio vacío reduce la capacidad disponible para los líquidos iniciales. Algunas combinaciones antes aceptadas dejarán de ser compatibles; el validador debe explicarlo.
