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

## Guía de implementación

### Inspección del código vigente

- La lógica vive en `../game.js`; los estilos, en `../styles.css`; la interfaz, en `../index.html`.
- `moveHistory` guarda una copia completa del tablero antes de cada movimiento legal. No sustituirlo ni guardar el contador dentro de cada botella.
- `handleBottleChoice(bottleId)` solo llega al bloque de movimiento tras validar origen, destino, capacidad y color. El incremento debe ocurrir exactamente una vez dentro de ese bloque, después de ejecutar el vertido.
- `undoMove()` sale inmediatamente si no hay historial y restaura el snapshot con `moveHistory.pop()`.
- `startGame()` crea una disposición nueva y limpia `moveHistory`; `restartGame()` restaura `initialBottles` y también limpia el historial.
- `renderGame()` reconstruye el tablero. El valor del contador debe actualizarse en un elemento separado para que no desaparezca al volver a renderizar botellas.

### Estado y reglas exactas

1. Declarar `let moveCount = 0` junto al resto del estado de partida (`currentBottles`, `moveHistory`, `gameWon`).
2. Contar un movimiento únicamente después de que el código haya pasado todas las validaciones y haya modificado `source.layers` o `chosen.layers`. Seleccionar/cancelar selección, intentar una jugada inválida y pedir una pista no cuentan.
3. Cada entrada de `moveHistory` representa exactamente un movimiento legal. Al deshacer una entrada, reducir el contador en uno; nunca permitir que baje de cero. En el flujo normal, `moveCount === moveHistory.length` durante toda la partida.
4. Al iniciar otra disposición o reiniciar la actual, vaciar el historial y asignar cero antes de actualizar la interfaz.
5. Deshacer desde el diálogo de victoria también cuenta como deshacer normal: `undoVictory` ya llama a `undoMove()`, así que no dupliques lógica en el listener del diálogo.

### Interfaz

- El HTML actual tiene `<div class="board-head">` sin id. Añadirle `id="board-head"` para satisfacer el punto aprobado, y dentro añadir un nodo visible, por ejemplo `<p class="move-counter" aria-live="polite">Movimientos: <span id="moveCount">0</span></p>`. No reutilizar `#moveStatus`, porque sus mensajes temporales de jugada y errores deben conservarse.
- Registrar el elemento en el objeto `ui` con una propiedad con nombre distinto al estado numérico, por ejemplo `moveCount: document.querySelector('#moveCount')`; el estado global puede llamarse `moveCount`.
- Crear una función pequeña `updateMoveCounter()` que escriba `String(moveCount)` en `ui.moveCount.textContent`. Invocarla tras incrementar, tras deshacer y tras cada reinicio/inicio. No reconstruir el nodo con `innerHTML`.
- Mantener texto visible y comprensible para lector de pantalla; el número no debe comunicarse solo mediante icono o color. No anunciar cada render completo del tablero como una actualización accesible.
- En móvil, permitir que la cabecera haga wrap según sus reglas existentes. El contador no debe comprimir ni ocultar botones; usar tamaño tipográfico compacto y `min-width: 0` si hace falta. Mantener el tamaño táctil de los botones existentes.

### Secuencia sugerida

```text
estado inicial: moveCount = 0
movimiento legal:
    guardar snapshot en moveHistory
    ejecutar vertido y cierre/reordenamiento existentes
    moveCount += 1
    renderGame()
    updateMoveCounter()
deshacer con historial disponible:
    restaurar moveHistory.pop()
    moveCount = max(0, moveCount - 1)
    renderGame()
    updateMoveCounter()
iniciar o reiniciar:
    moveHistory = []
    moveCount = 0
    actualizar/renderizar interfaz
```

La secuencia es orientativa: conserva el orden actual de cierre, reordenamiento, `clearSelection()`, `renderGame()` y comprobación de victoria. No llames a `finishIfWon()` desde `updateMoveCounter()`.

### Comprobaciones concretas

- Una selección válida seguida de cancelar deja el número en cero.
- Un intento a botella llena, cerrada o de color incompatible no cambia ni contador ni historial.
- Un vertido legal que mueve parte de una capa incrementa una vez, no una vez por unidad.
- Tras tres movimientos legales, tres deshacer devuelven el contador a cero y el tablero al estado inicial; un cuarto deshacer no cambia nada.
- Reiniciar tras varios movimientos y empezar una nueva partida muestran cero.
- Ganar actualiza el contador antes de mostrar el diálogo; «Deshacer última jugada» lo reduce en uno.
- Revisar el layout a ancho móvil estrecho y con una partida de varias filas.
