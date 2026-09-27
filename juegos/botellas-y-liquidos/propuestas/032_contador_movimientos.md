# Propuesta 032 — Contador de movimientos

**Estado:** Aprobada  
**Fecha:** 2026-09-23  
**Responsable:** Usuario y agente Antigravity

## Objetivo

Mostrar al jugador cuántos trasvases lleva en la partida actual, reflejando también los deshacer.

## Alcance

- Incluye:
  - Variable `moveCount` que se incrementa con cada trasvase exitoso y se decrementa al deshacer.
  - Renderizado del contador en la cabecera del tablero, junto a los botones de acción.
  - Reset a 0 al reiniciar o iniciar nueva partida.
- No incluye:
  - Récord persistente (propuesta 033).
  - Cambios en la lógica de generación ni en las reglas del juego.

## Requisitos y decisiones

1. El contador se muestra en la barra `#board-head`, alineado con las acciones.
2. Solo cuenta trasvases completados (no intentos fallidos ni selecciones).
3. Al deshacer, el contador retrocede exactamente 1 unidad por cada deshacer.
4. El contador es texto plano legible; no requiere icono propio.

## Criterios de aceptación

- [ ] El contador sube en 1 con cada trasvase ejecutado.
- [ ] Al deshacer, el contador baja en 1.
- [ ] Al reiniciar o empezar nueva partida, el contador vuelve a 0.
- [ ] Es legible en móvil sin romper la cabecera compacta.

## Tareas

- [ ] T14.1 Añadir variable `moveCount` e incremento en `handleBottleChoice` tras el trasvase.
- [ ] T14.2 Decrementar `moveCount` en `undoMove`.
- [ ] T14.3 Resetear `moveCount` en `startGame` y `restartGame`.
- [ ] T14.4 Renderizar el contador en `#board-head` (elemento `<span id="moveCount">`).
- [ ] T14.5 Ajustar CSS para que el contador sea compacto en móvil.
- [ ] T14.6 Crear rama `feature/032_contador_movimientos`, commits atómicos, merge en `main` y push.
