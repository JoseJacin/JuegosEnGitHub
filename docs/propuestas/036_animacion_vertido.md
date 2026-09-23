# Propuesta 036 — Animación de vertido

**Estado:** Aprobada  
**Fecha:** 2026-09-23  
**Responsable:** Usuario y agente Antigravity

## Objetivo

Suavizar visualmente el trasvase con una transición CSS de altura en las capas de líquido, respetando `prefers-reduced-motion`.

## Alcance

- Incluye:
  - Transición CSS en `.liquid` para la propiedad `height` con duración ~250 ms.
  - Condicionada a `@media (prefers-reduced-motion: no-preference)` (ya existe un bloque similar en el CSS).
  - Ajuste del renderizado en `renderGame` para que las capas actualicen `height` en lugar de recrearse desde cero (o forzar un reflow para que la transición arranque).
- No incluye:
  - Animación de partículas, sonido ni efectos de física.
  - Cambios en la lógica de trasvase.

## Requisitos y decisiones

1. Independiente de las demás propuestas.
2. Si `renderGame` destruye y recrea los elementos `.liquid`, la transición no dispara; habrá que evaluar si se actualiza `height` in-place o se fuerza un `requestAnimationFrame`.
3. La transición no debe bloquear la interacción; el jugador puede pulsar otra botella durante la animación.

## Criterios de aceptación

- [ ] Al hacer un trasvase, las capas de líquido cambian de tamaño con una transición suave (~250 ms).
- [ ] Con `prefers-reduced-motion: reduce`, no hay ninguna transición (comportamiento actual).
- [ ] La animación no retrasa ni bloquea la lógica del juego.
- [ ] La partida funciona igual que antes visualmente si la animación se desactiva.

## Tareas

- [ ] T18.1 Analizar `renderGame` para determinar si es viable animar sin refactorizar.
- [ ] T18.2 Añadir/ajustar la regla CSS de transición en `.liquid` dentro del bloque `prefers-reduced-motion: no-preference`.
- [ ] T18.3 Si es necesario, refactorizar `renderGame` para actualizar `.liquid` in-place en lugar de recrear el DOM.
- [ ] T18.4 Verificar en móvil que la animación no causa jank.
- [ ] T18.5 Crear rama `feature/036_animacion_vertido`, commits atómicos, merge en `main` y push.
