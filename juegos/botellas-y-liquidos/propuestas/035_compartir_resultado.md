# Propuesta 035 — Compartir resultado

**Estado:** Aprobada  
**Fecha:** 2026-09-23  
**Responsable:** Usuario y agente Antigravity

## Objetivo

Permitir copiar al portapapeles un resumen del resultado al ganar, con emojis de los colores completados y el número de movimientos.

## Alcance

- Incluye:
  - Botón «Copiar resultado» en el diálogo de victoria.
  - Texto copiado: emojis de colores de las botellas completadas + movimientos + URL del juego.
    Ejemplo con dos botellas de coral y una de amarillo y azul: `🔴🔴🟡🔵 en 18 movimientos — https://josejacin.github.io/JuegosEnGitHub/juegos/botellas-y-liquidos/`
  - Copia con `navigator.clipboard.writeText`; si no disponible, muestra el texto en un `<textarea>` seleccionado.
  - El botón muestra «¡Copiado!» durante 2 s tras copiar.
- No incluye:
  - URL con semilla (descartada por complejidad; puede revisarse en propuesta futura).
  - Compartir a redes sociales ni integración con Web Share API.

## Requisitos y decisiones

1. Depende de la propuesta 032 (`moveCount` debe estar disponible). **Ya implementada:** `moveCount` existe en `../game.js` y se actualiza en cada trasvase y deshacer; esta propuesta puede implementarse directamente.
2. El mapeo color CSS → emoji se define con un array `COLOR_EMOJIS` paralelo a `COLORS`/`COLOR_NAMES` (mismo índice). Valores exactos y definitivos, no orientativos:

   ```js
   // Alineado por índice con COLORS y COLOR_NAMES de game.js.
   const COLOR_EMOJIS = ['🔴', '🔵', '🟡', '🟣', '🟢', '🩷'];
   // índice 0 coral, 1 azul, 2 amarillo, 3 violeta, 4 verde, 5 rosa
   ```

   No usar otros emojis ni buscar una correspondencia "más fiel" al tono exacto de cada color CSS: Unicode no define un círculo rosa estándar, por eso se usa el corazón rosa (`🩷`) solo para el índice 5. Declarar esta constante junto a `COLORS`/`COLOR_NAMES` en `../game.js`.
3. La URL incluida en el texto es la URL canónica fija del juego (no contiene semilla): `https://josejacin.github.io/JuegosEnGitHub/juegos/botellas-y-liquidos/` (confirmada en `../README.md` y `../CONTEXTO.md`). No usar `location.href` ni construir la URL dinámicamente.

## Criterios de aceptación

- [ ] El botón «Copiar resultado» aparece en el diálogo de victoria.
- [ ] Al pulsarlo, se copia el texto al portapapeles.
- [ ] El botón muestra «¡Copiado!» durante 2 s y luego vuelve a su texto original.
- [ ] Si el portapapeles no está disponible, se muestra el texto en un `<textarea>` para copiar manualmente.
- [ ] Los emojis corresponden a los colores de las botellas completadas en la partida.

## Tareas

- [ ] T17.1 Definir `COLOR_EMOJIS` paralelo a `COLORS`/`COLOR_NAMES`.
- [ ] T17.2 Implementar `buildShareText(bottles, moveCount)`.
- [ ] T17.3 Añadir botón «Copiar resultado» en `#victoryDialog`.
- [ ] T17.4 Implementar la lógica de copia con fallback a `<textarea>`.
- [ ] T17.5 Animar el botón con texto «¡Copiado!» durante 2 s.
- [ ] T17.6 Crear rama `feature/botellas-y-liquidos_035_compartir_resultado`, commits atómicos, merge en `main` y push.

## Guía de implementación

### Dependencia y datos

- Esta tarea depende de 032: no sustituir `moveCount` por el tamaño del historial ni recalcularlo desde el tablero.
- `finishIfWon()` es el punto donde la partida queda ganada y el diálogo se prepara. Al pulsar copiar, la partida está finalizada; construir el texto a partir de una copia/lectura del estado actual sin mutarlo.
- `currentBottles` tiene IDs estables y `layers` conserva las capas; al ganar, toda botella no vacía está llena, cerrada y contiene una capa de un solo color conforme a `isVictory()`.
- En el código actual `COLORS` y `COLOR_NAMES` contienen seis entradas paralelas, y el juego configura de 2 a 6 colores. Crear `COLOR_EMOJIS` con la misma longitud e índices, usando emojis de círculo que distingan los seis colores base. Mantener los tres arrays alineados por índice; no inferir color por comparar nombres o valores de CSS.

### Construcción del texto

Implementar `buildShareText(bottles, moveCount)` como función pura, situada junto a `buildRecordKey()` en `../game.js`:

1. Recibe el array completo `currentBottles` (no hace falta filtrar antes de llamarla) y el `moveCount` actual.
2. En estado de victoria, toda botella con líquido está llena, cerrada y tiene una sola capa (`isVictory()` ya lo garantiza), así que basta con `bottles.filter((bottle) => bottle.layers.length > 0)` para obtener las botellas completadas; las vacías (`layers.length === 0`) no generan emoji.
3. `Array.prototype.sort` es estable en JavaScript (garantizado desde ES2019): ordenar por índice de color ascendente conserva el orden original entre botellas del mismo color sin lógica adicional. Un color que complete dos botellas debe repetir su emoji dos veces.
4. Si `COLORS.indexOf(...)` devuelve `-1` o `COLOR_EMOJIS[index]` es `undefined` (estado inesperado: no debería ocurrir con las reglas actuales), usar `'⚪'` como símbolo neutro en vez de lanzar o de omitir la botella.
5. Usar singular `movimiento` solo cuando `moveCount === 1`; en cualquier otro caso (incluido 0), `movimientos`.
6. Devolver una sola línea con el formato exacto `<emojis> en <N> movimiento(s) — https://josejacin.github.io/JuegosEnGitHub/juegos/botellas-y-liquidos/`.

Implementación de referencia (código definitivo, no solo orientativo):

```js
function buildShareText(bottles, moveCount) {
  const emojis = bottles
    .filter((bottle) => bottle.layers.length > 0)
    .map((bottle) => COLORS.indexOf(bottle.layers[0].color))
    .sort((a, b) => a - b)
    .map((index) => COLOR_EMOJIS[index] ?? '⚪')
    .join('');
  const word = moveCount === 1 ? 'movimiento' : 'movimientos';
  return `${emojis} en ${moveCount} ${word} — https://josejacin.github.io/JuegosEnGitHub/juegos/botellas-y-liquidos/`;
}
```

Ejemplo con la partida ganada: `buildShareText(currentBottles, moveCount)` en el momento de pulsar «Copiar resultado» (no antes, para reflejar el `moveCount` final tras un posible deshacer previo a ganar).

### Diálogo y fallback manual

El `#victoryDialog` actual en `../index.html` tiene esta estructura exacta (revisar antes de editar, puede haber cambiado):

```html
<dialog id="victoryDialog" class="victory-dialog" aria-labelledby="victoryTitle" aria-describedby="victoryMessage">
  <h2 id="victoryTitle">¡Partida completada!</h2>
  <p id="victoryMessage">Todas las botellas con líquido están ordenadas.</p>
  <div id="recordMessage" class="record-message" hidden></div>
  <button id="undoVictory" type="button">Deshacer última jugada</button>
  <button id="repeatGame" type="button" autofocus>Jugar de nuevo</button>
  <button id="changeAfterWin" type="button">Cambiar configuración</button>
</dialog>
```

Insertar el botón nuevo y el fallback **entre `#recordMessage` y `#undoVictory`**, así:

```html
<div id="recordMessage" class="record-message" hidden></div>
<button id="copyResult" type="button">Copiar resultado</button>
<div id="shareFallback" class="share-fallback" hidden aria-live="polite">
  <label for="shareText">Copia el texto seleccionado</label>
  <textarea id="shareText" readonly></textarea>
</div>
<button id="undoVictory" type="button">Deshacer última jugada</button>
```

No hace falta CSS nuevo para el tamaño del botón: la regla móvil existente `.victory-dialog button { width: 100%; }` ya se aplica a cualquier `<button>` dentro del diálogo, incluido `#copyResult`. Sí conviene un estilo mínimo para `#shareFallback textarea` (ancho 100%, algunas filas) porque no existe ninguna regla previa para `textarea` en `../styles.css`; añadirlo junto a `.diagnostic-report`.

Registrar los nuevos nodos en el objeto `ui` de `../game.js`, junto a las demás referencias del diálogo de victoria:

```js
copyResult: document.querySelector('#copyResult'),
shareFallback: document.querySelector('#shareFallback'),
shareText: document.querySelector('#shareText'),
```

Declarar `let copyTimeout = null;` junto a `let hintTimeout = null;` en el bloque de estado mutable. El `aria-live="polite"` en `#shareFallback` permite que un lector de pantalla anuncie la instrucción cuando aparece; el cambio de texto del propio botón (`«¡Copiado!»`) ya es percibido porque el foco/hover del usuario está sobre él tras el clic, así que no hace falta una segunda región `aria-live` para ese caso.

Implementación de referencia del manejador (código definitivo):

```js
function resetShareUI() {
  if (copyTimeout) {
    clearTimeout(copyTimeout);
    copyTimeout = null;
  }
  ui.copyResult.textContent = 'Copiar resultado';
  ui.shareFallback.hidden = true;
}

async function handleCopyResult() {
  const text = buildShareText(currentBottles, moveCount);
  if (copyTimeout) {
    clearTimeout(copyTimeout);
    copyTimeout = null;
  }
  try {
    if (!navigator.clipboard?.writeText) throw new Error('Clipboard API unavailable');
    await navigator.clipboard.writeText(text);
    ui.shareFallback.hidden = true;
    ui.copyResult.textContent = '¡Copiado!';
    copyTimeout = setTimeout(() => {
      ui.copyResult.textContent = 'Copiar resultado';
      copyTimeout = null;
    }, 2000);
  } catch {
    ui.copyResult.textContent = 'Copiar resultado';
    ui.shareText.value = text;
    ui.shareFallback.hidden = false;
    ui.shareText.focus();
    ui.shareText.select();
  }
}
```

No usar `document.execCommand('copy')` como segundo fallback automático: la decisión aprobada es facilitar copia manual mostrando el `<textarea>` seleccionado.

**Puntos de reinicio obligatorios** (evitan que quede «¡Copiado!» o el fallback visible en una victoria distinta):

- Llamar a `resetShareUI()` al inicio de `finishIfWon()`, antes de `ui.victoryDialog.showModal();`. Así cada vez que se abre el diálogo con una nueva victoria, el botón y el fallback empiezan limpios.
- No hace falta tocar `undoMove()` ni `restartGame()`: al cerrar el diálogo (`ui.victoryDialog.close()`) el contenido queda oculto, y `finishIfWon()` limpiará el estado la próxima vez que se muestre.

Registrar el listener junto a los demás, en la sección «Eventos y arranque» al final de `../game.js`:

```js
ui.copyResult.addEventListener('click', handleCopyResult);
```

### Comprobaciones concretas

- Ganar con un color por botella produce emojis en orden de índice; colores repetidos generan emojis repetidos; vacías no generan emoji.
- Verificar plural para 1 y 2 movimientos y URL exacta sin query ni hash.
- Con clipboard disponible y promesa resuelta, comprobar contenido idéntico al resultado visible, etiqueta temporal de 2 s y restauración.
- Simular API inexistente, getter que lanza y promesa rechazada: el textarea aparece seleccionado, con instrucción accesible y botón sin falso mensaje de éxito.
- Cerrar el diálogo o ganar de nuevo antes de 2 s no permite que el timeout viejo cambie el botón de la sesión nueva.
- Pulsar el botón varias veces seguidas no genera errores ni altera la partida, contador, historial o récord.
- Probar el diálogo en viewport móvil y teclado: acciones alcanzables, fallback desplazable y texto seleccionable.

## Cierre de esta propuesta

Cuando quede implementada y fusionada en `main`: marca todas las tareas y criterios de aceptación, actualiza `../PLAN.md` y `../CONTEXTO.md` con la rama/commit de fusión, actualiza `./README.md` (quítala de «Aprobadas pendientes»), y retira este archivo con `git rm` (su contenido queda disponible en el historial de Git). Antes de pedir el OK de documentación, ejecuta desde la raíz del repositorio `node scripts/proposal-status.mjs juegos/botellas-y-liquidos/propuestas/035_compartir_resultado.md` y `node scripts/check-docs.mjs`.
