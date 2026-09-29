# Propuesta 034 — Pista (hint)

**Estado:** Aprobada  
**Fecha:** 2026-09-23  
**Responsable:** Usuario y agente Antigravity

## Objetivo

Añadir un botón «Pista» que resalte visualmente la primera pareja origen→destino con trasvase posible.

## Alcance

- Incluye:
  - Función `findHint()` que busca la primera pareja válida:
    - Origen: botella abierta con al menos una capa.
    - Destino: botella abierta con espacio libre y cuya capa superior (si existe) coincide en color con la capa superior del origen, o bien está vacía.
  - Resaltado visual con clase `.hint` en las dos botellas durante ~1,5 s.
  - Aviso «Sin movimientos disponibles» en `#moveStatus` si no hay pareja.
  - Botón con icono de bombilla en la barra de acciones (mismo estilo `.icon-button`).
- No incluye:
  - Resolver la partida automáticamente.
  - Ejecutar el movimiento sugerido.

## Requisitos y decisiones

1. Independiente de 032 y 033; puede implementarse en cualquier orden.
2. Si hay una selección activa al pulsar «Pista», se cancela antes de mostrar la sugerencia.
3. La clase `.hint` usa un color de borde diferente a `.selected` (sugerido: amarillo/dorado `#f5c542`).
4. El resaltado se limpia automáticamente con `setTimeout` de 1500 ms.

## Criterios de aceptación

- [ ] El botón «Pista» aparece en la barra de acciones.
- [ ] Al pulsarlo, se resaltan visualmente origen y destino durante ~1,5 s.
- [ ] Si no hay movimiento posible, aparece «Sin movimientos disponibles» en `#moveStatus`.
- [ ] El resaltado no interfiere con la selección activa.
- [ ] El botón no está disponible cuando la partida está ganada.

## Tareas

- [ ] T16.1 Implementar `findHint()` con el algoritmo de búsqueda de pareja válida.
- [ ] T16.2 Añadir clase CSS `.hint` con estilo visual de borde amarillo.
- [ ] T16.3 Añadir botón con icono de bombilla (SVG) en la barra de acciones.
- [ ] T16.4 Limpiar el resaltado después de 1500 ms con `setTimeout`.
- [ ] T16.5 Deshabilitar el botón cuando `gameWon === true`.
- [ ] T16.6 Crear rama `feature/botellas-y-liquidos_034_pista_hint`, commits atómicos, merge en `main` y push.

## Guía de implementación

### Punto de integración y reglas

- La lógica y el render están en `../game.js`; las botellas visibles se crean en `renderGame()` y llevan `data-bottle-id` estable. Añadir un registro de UI `hint` y listener junto a los demás controles/listeners del final del archivo, siguiendo el patrón existente.
- Implementar una función pura `findHint()` que lea `currentBottles` y devuelva `{ sourceId, destinationId }` o `null`; no debe modificar botellas, historial, selección ni DOM.
- Un movimiento sugerido debe seguir las mismas condiciones que `handleBottleChoice`: origen distinto del destino, origen abierto y no vacío, destino abierto, espacio libre positivo y capa superior del destino vacía o del mismo color que la superior del origen.
- La cantidad transferible puede ser parcial; si `Math.min(sourceTop.units, free) > 0`, la pareja es legal. No exigir que la botella quede completa ni que el movimiento acerque a la victoria: es una pista de movimiento legal, no un solver.
- Buscar en el orden de `currentBottles`: primero origen y luego destino. La primera pareja que cumpla se devuelve. No ordenar ni barajar el tablero para calcular la pista. El orden actual puede reflejar botellas completadas al inicio de la lista; estas se descartan como origen/destino porque están cerradas.

Pseudocódigo:

```text
findHint():
    para cada source en currentBottles:
        si source está cerrada o vacía: continuar
        top = última capa de source
        para cada destination en currentBottles:
            si destination.id == source.id: continuar
            si destination está cerrada: continuar
            occupied = suma de unidades de sus capas
            free = destination.capacity - occupied
            si free <= 0: continuar
            destinationTop = última capa o ninguna
            si destinationTop existe y destinationTop.color != top.color: continuar
            devolver { sourceId: source.id, destinationId: destination.id }
    devolver null
```

Si se extrae una función compartida de validación desde `handleBottleChoice`, preservar los mismos mensajes y reglas actuales; ese refactor no debe cambiar el comportamiento de los movimientos.

### Control, selección y temporizador

- Añadir un botón `type="button"` en `.game-actions`, con `id="hint"`, `class="icon-button"`, etiqueta accesible `aria-label="Pista"` y `title="Pista"`. Usar SVG inline decorativo (`aria-hidden="true"`) con el mismo `viewBox`, trazo y tamaño que los iconos vecinos. No usar emoji como único nombre accesible.
- Al pulsar, cancelar primero cualquier selección mediante `clearSelection()`. Así desaparecen tanto la clase `.selected` como `aria-pressed="true"`.
- Mantener un identificador de temporizador, por ejemplo `let hintTimeout = null`. Antes de pintar una nueva pista, limpiar el temporizador anterior y retirar `.hint` de cualquier botella; esto evita que un timeout viejo borre un resaltado nuevo.
- Con pareja: añadir `.hint` a los elementos `[data-bottle-id="..."]` correspondientes. Con IDs numéricos interpolados, consultar los nodos ya creados; no construir markup HTML a partir de datos. El origen y destino deben tener estilos inequívocos y ambos compartir el color de realce acordado.
- Programar `setTimeout(..., 1500)` para quitar la clase y dejar `hintTimeout = null`. El timeout solo afecta a presentación: nunca ejecuta un movimiento ni altera el estado.
- Limpiar el resaltado y timeout al iniciar/reiniciar partida, cambiar a configuración, ganar o volver a pulsar Pista. Evita que el resaltado sobreviva al cambio de pantalla.
- Si no existe pareja, mostrar exactamente «Sin movimientos disponibles» en `#moveStatus` mediante el helper de estado existente. No cambiar `gameWon`; al terminar la partida el control queda deshabilitado.
- Mientras `gameWon === true`, el botón debe estar deshabilitado. Centraliza su estado, por ejemplo en `updateHintButton()`, y llama a la función al iniciar partida y al terminar victoria. El flujo actual no permite jugar tras victoria, pero la discapacidad debe estar reflejada en el atributo `disabled`.
- Si ya existe `#moveStatus` con `aria-live="polite"`, ese anuncio es suficiente; no crear una segunda región live.

### CSS y precedencia

- Añadir `.bottle.hint` con borde/glow dorado `#f5c542`, distinto del estilo `.selected` actual. Revisar reglas de `.bottle.selected`, `.done` y `:focus-visible`; la pista no debe ocultar el foco de teclado ni la marca verde de completado.
- El estilo tiene que rodear la botella completa o su vidrio de forma consistente en móvil y escritorio. No cambiar geometría/tamaño del tablero ni permitir que el borde desborde y genere scroll.
- Si coinciden estados, preservar el foco visible por encima del adorno de pista. Las completadas no serán candidatas por estar cerradas.

### Comprobaciones concretas

- Con tablero normal, la primera pareja en el orden descrito se resalta y no se mueve líquido; contador/historial no cambian.
- Seleccionar un origen y después pedir pista deja todas las botellas con `aria-pressed="false"` y muestra solo la pista nueva.
- Volver a pulsar rápidamente Pista no permite que el primer timeout quite el segundo resaltado antes de sus 1500 ms.
- Cuando no hay jugadas legales, no queda selección ni resaltado antiguo y aparece el mensaje previsto.
- Confirmar que una botella cerrada, vacía, llena, ella misma como destino o con color superior distinto nunca aparece en la pareja.
- El botón está deshabilitado en victoria; reiniciar partida lo vuelve a habilitar.
- Probar con ratón, teclado y pantalla táctil, comprobando que el indicador de foco permanece reconocible.
