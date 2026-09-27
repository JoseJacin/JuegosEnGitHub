# Propuesta 033 — Récord local en `localStorage`

**Estado:** Aprobada  
**Fecha:** 2026-09-23  
**Responsable:** Usuario y agente Antigravity

## Objetivo

Guardar el número mínimo de movimientos conseguido para cada configuración y mostrarlo en el diálogo de victoria.

## Alcance

- Incluye:
  - Clave de almacenamiento: `botellas-record-<total>-<colors>-<maxCapacity>-<sizes>`.
  - Lectura y escritura en `localStorage` al finalizar la partida.
  - Mensaje diferenciado en el diálogo de victoria: «¡Nuevo récord!» si mejora, o comparativa si no.
- No incluye:
  - Sincronización entre dispositivos ni backend.
  - Historial de múltiples intentos.

## Requisitos y decisiones

1. Depende de la propuesta 032 (requiere `moveCount` disponible).
2. Si `localStorage` no está disponible (modo privado u otro error), el juego funciona sin récord, sin lanzar excepción visible.
3. El récord se muestra en el diálogo de victoria existente (`#victoryDialog`), no en pantalla durante la partida.

## Criterios de aceptación

- [ ] Al ganar por primera vez con una configuración, se guarda el récord.
- [ ] Al ganar con menos movimientos, se actualiza y se muestra "¡Nuevo récord!".
- [ ] Al ganar igualando o superando el récord, se muestra el récord anterior y el actual.
- [ ] Si `localStorage` no está disponible, el juego funciona igual sin mostrar el récord.

## Tareas

- [ ] T15.1 Implementar `getRecord(key)` y `setRecord(key, value)` con try/catch.
- [ ] T15.2 Construir la clave a partir de los parámetros de configuración actuales.
- [ ] T15.3 Integrar comparación y actualización en `finishIfWon`.
- [ ] T15.4 Actualizar el HTML del diálogo de victoria para mostrar récord y mensaje condicional.
- [ ] T15.5 Crear rama `feature/033_record_local`, commits atómicos, merge en `main` y push.
