# Propuesta 037 — Modo daltónico / alto contraste

**Estado:** Aprobada  
**Fecha:** 2026-09-23  
**Responsable:** Usuario y agente Antigravity

## Objetivo

Añadir un modo alternativo donde cada color de líquido lleva un patrón CSS superpuesto (líneas, puntos, diagonal…) para que el juego sea jugable sin necesidad de distinguir colores.

## Alcance

- Incluye:
  - Interruptor accesible en la cabecera del tablero (o en la zona de configuración).
  - Clase `.colorblind` en `<body>` cuando el modo está activo.
  - Seis patrones CSS diferentes (uno por cada color disponible en las reglas vigentes) implementados con `repeating-linear-gradient` u otros gradientes CSS. Sin imágenes externas.
  - El color de fondo base sigue presente; el patrón se superpone como segunda capa de `background`.
  - Preferencia guardada en `localStorage` con clave `botellas-colorblind`.
  - Al cargar, se aplica la preferencia guardada.
- No incluye:
  - Cambios en los colores base.
  - Etiquetas de texto dentro de las capas de líquido.

## Requisitos y decisiones

1. No depende de ninguna otra propuesta para su aprobación. Aviso de coordinación: esta propuesta y la 036 (animación de vertido) modifican el mismo bloque de creación de `.liquid` dentro de `renderGame()` en `../game.js` (el lugar donde se fija `dataset.color` y el color inline). Si 036 se implementa antes, revisar que su refactor incremental siga fijando `dataset.color`/`dataset.units` por capa antes de añadir aquí `dataset.colorIndex`; si 037 se implementa antes, dejar constancia en el commit de que 036 deberá adaptar su propio código a la línea `backgroundColor` (ver más abajo) y al nuevo `dataset.colorIndex` al reescribir esa función.
2. Los patrones se asignan mediante el índice del color en el array `COLORS`. **Comprobado en el código actual: el atributo `data-color-index` NO existe todavía en `.liquid`** (solo se fijan `dataset.color` y `dataset.units` dentro de `renderGame()`); esta propuesta debe añadirlo, tal como detalla la sección «Ajuste del alcance a las reglas actuales» más abajo.
3. El interruptor usa el mismo estilo que los demás controles (`icon-button`); ver ubicación y marcado exactos en «Control accesible y persistencia».

## Criterios de aceptación

- [ ] El interruptor de modo daltónico es visible y accesible.
- [ ] En modo activo, cada color de líquido muestra un patrón visualmente distinto.
- [ ] Al recargar la página, se recupera la preferencia guardada.
- [ ] El modo no afecta a la lógica del juego.
- [ ] Los patrones son distinguibles entre sí en escala de grises.

## Tareas

- [ ] T19.1 Definir seis patrones CSS con `repeating-linear-gradient` (diagonal, horizontal, vertical, cuadrícula, puntos…).
- [ ] T19.2 Verificar que `renderGame` establece `data-color-index` en cada `.liquid`; añadirlo si no existe.
- [ ] T19.3 Añadir reglas CSS `.colorblind .liquid[data-color-index="N"]` con el patrón y opacidad de overlay.
- [ ] T19.4 Añadir interruptor `#colorPatternToggle` en `.game-actions`, justo después de `#hint` (ver marcado exacto en la guía de implementación).
- [ ] T19.5 Guardar y recuperar preferencia en `localStorage` con clave `botellas-colorblind`.
- [ ] T19.6 Crear rama `feature/botellas-y-liquidos_037_modo_daltonico`, commits atómicos, merge en `main` y push.

## Guía de implementación

### Ajuste del alcance a las reglas actuales

El código fuente de verdad permite de 2 a 6 colores (`CONFIG.limits.colors`) y `COLORS`/`COLOR_NAMES` tienen seis entradas. Por tanto, esta implementación necesita **seis patrones**, uno por color disponible. La referencia a diez patrones en el alcance y tarea T19.1 no coincide con el máximo real y se sustituye aquí por seis; no ampliar el selector ni la paleta, porque eso cambiaría reglas fuera de esta propuesta.

En `renderGame()` los spans `.liquid` ya reciben `data-color` y `data-units`, pero **no** `data-color-index`. Añadirlo a partir del índice estable en `COLORS`, no del orden actual de las capas. El render actual asigna el color con `liquid.style.background = layer.color`; cambiar esa asignación a `liquid.style.backgroundColor = layer.color`, porque la forma abreviada `background` inline puede borrar o impedir que se aplique el `background-image` del patrón CSS.

```js
const colorIndex = COLORS.indexOf(layer.color);
if (colorIndex >= 0) liquid.dataset.colorIndex = String(colorIndex);
```

Los colores base actuales e índices son: 0 coral, 1 azul, 2 amarillo, 3 violeta, 4 verde y 5 rosa. Mantenerlos alineados con los arrays del mismo módulo.

### Patrones y legibilidad

- Definir seis patrones CSS con distinta orientación/estructura: diagonal ascendente, líneas horizontales, líneas verticales, cuadrícula, puntos y diagonal cruzada. No usar fondos/imágenes externos.
- Aplicar cada patrón con `background-image` sobre el color base. No sustituir `background-color`: la identidad cromática debe continuar visible y el patrón ser la segunda señal.
- Usar selectores explícitos `.colorblind .liquid[data-color-index="0"]` hasta índice `5`. Cada índice debe tener un patrón distinto y repetible; el patrón no puede depender de que dos botellas estén en posiciones diferentes.
- Definir escalas/espaciado de patrón suficientemente grandes para las capas pequeñas y los tamaños móviles. Evitar líneas tan densas que parezcan un color uniforme o vibren al redimensionar.
- Cuando el modo esté apagado, `background-image: none` para estos líquidos (o reglas equivalentes), dejando intacto el estilo actual.
- El patrón no puede interceptar clic/touch ni cambiar dimensiones. Mantener `pointer-events: none` en decoración si el pseudo-elemento se usa.
- Validar visualmente cada índice también en escala de grises. La aceptación no se satisface con seis valores CSS distintos si los patrones resultan indistinguibles a simple vista.

Ejemplo orientativo de CSS; ajustar separación y alpha al vidrio actual:

```css
.colorblind .liquid[data-color-index="0"] { background-image: repeating-linear-gradient(45deg, #0008 0 2px, transparent 2px 7px); }
.colorblind .liquid[data-color-index="1"] { background-image: repeating-linear-gradient(0deg, #0008 0 2px, transparent 2px 7px); }
.colorblind .liquid[data-color-index="2"] { background-image: repeating-linear-gradient(90deg, #0008 0 2px, transparent 2px 7px); }
.colorblind .liquid[data-color-index="3"] { background-image: repeating-linear-gradient(0deg, transparent 0 5px, #0008 5px 7px), repeating-linear-gradient(90deg, transparent 0 5px, #0008 5px 7px); }
/* Índices 4 y 5: puntos y diagonal cruzada, respectivamente. */
```

El ejemplo no define textura final obligatoria. Completar los índices 4 y 5; comprobar que el patrón queda visible sobre los seis colores y con opacidad razonable.

### Control accesible y persistencia

- Poner el interruptor en `.game-actions` (dentro de `#board-head`, en `../index.html`), como último botón del grupo, justo después de `#hint`. Usar exactamente esta marca, siguiendo el patrón de los botones vecinos (mismo `class="icon-button"`, mismo formato de `<svg>`):

  ```html
  <button id="colorPatternToggle" class="icon-button" type="button" aria-pressed="false" aria-label="Activar patrones de color" title="Patrones de color">
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <rect x="4" y="4" width="16" height="16" rx="2"/>
      <path d="M4 9h16M4 14h16M9 4v16M14 4v16"/>
    </svg>
  </button>
  ```

  El icono (cuadrícula) es coherente con la idea de «patrones»; puede sustituirse por otro SVG con el mismo `viewBox="0 0 24 24"` y estilo de trazo (`fill="none"`, `stroke=currentColor`, ya heredado de la regla `.icon-button svg` en `../styles.css`) si se prefiere un ojo tachado u otro símbolo, siempre que sea puramente decorativo (`aria-hidden="true"`) y el estado se comunique por `aria-pressed` y `aria-label`.
- Registrar el nodo en el objeto `ui` de `../game.js`: `colorPatternToggle: document.querySelector('#colorPatternToggle')`.
- Reflejar el estado con `aria-pressed="true|false"`; no comunicarlo solo con el icono o el color. Sobre el tamaño táctil: **no fijar un tamaño propio**; el botón hereda las reglas ya existentes `.game-actions .icon-button` (44×44 px en escritorio) y su ajuste en el breakpoint móvil (36×36 px, ver bloque de medios cerca de la línea 599 de `../styles.css`), igual que `#undo`, `#restart`, `#copyDiagnostics`, `#editSettings` y `#hint`. Mantener el mismo comportamiento de foco visible que ya provee `.bottle:focus-visible`/estilos globales de botón; no es necesario añadir CSS nuevo para este botón salvo los selectores `.colorblind .liquid[data-color-index="N"]`.
- La clase global será `colorblind` en `document.body`, tal como establece la propuesta. El nombre de la clase es interno; el texto para usuarios puede ser «Patrones de color».
- Usar clave exacta `botellas-colorblind`; serializar `'true'` o `'false'`. Implementar lectura/escritura con `try/catch`, incluyendo acceso a `window.localStorage`. Si storage falla, el interruptor sigue funcionando durante la página actual sin lanzar excepción.
- Al inicializar el script, leer la clave: solo el valor literal `'true'` activa el modo; ausente, corrupto o error equivale a desactivado. Aplicar/quitar clase en `<body>` y actualizar `aria-pressed`/etiqueta si el botón existe. Llamar a esta inicialización junto a la línea `update();` al final de `../game.js` (sección «Eventos y arranque»), para que la preferencia se aplique antes de que el jugador vea el formulario o el tablero.
- Al activar/desactivar, cambiar clase inmediatamente y luego intentar persistir. Si la escritura falla, conservar el estado visual hasta recargar. No mostrar un falso mensaje de guardado.
- Añadir listener una sola vez junto a los demás (`ui.colorPatternToggle.addEventListener('click', ...)`, en la sección «Eventos y arranque»); no reconstruir el botón en cada `renderGame()`.
- Persistir solo la preferencia. Nunca guardar color/capas/tablero ni modificar `gameConfig`, el contenido de botellas o el algoritmo de validación.

Pseudocódigo (usar los nombres reales `ui.colorPatternToggle` y la clave `botellas-colorblind` al implementarlo en `../game.js`, no un `button` genérico):

```text
readPatternPreference():
    try:
        return localStorage.getItem("botellas-colorblind") == "true"
    catch:
        return false

applyPatternPreference(enabled):
    document.body.classList.toggle("colorblind", enabled)
    ui.colorPatternToggle.setAttribute("aria-pressed", String(enabled))
    ui.colorPatternToggle.setAttribute("aria-label", enabled ? "Desactivar patrones de color" : "Activar patrones de color")

on ui.colorPatternToggle click:
    enabled = !document.body.classList.contains("colorblind")
    applyPatternPreference(enabled)
    try localStorage.setItem("botellas-colorblind", String(enabled))
    catch: keep current page state; continue silently

al cargar el script:
    applyPatternPreference(readPatternPreference())
```

### Comprobaciones concretas

- Activar cambia inmediatamente patrón, clase del body y `aria-pressed`; desactivar los restaura sin alterar el color base.
- Recargar con valor `true` recupera modo activo; `false`, clave ausente, valor corrupto o storage bloqueado no impiden usar el juego.
- Comprobar por DOM que cada `.liquid` de los seis colores tiene el índice correcto incluso después de vertidos, deshacer, reiniciar y reordenar botellas completadas.
- Inspeccionar los seis patrones en escala de grises, en capas de poca altura, tablero grande y móvil. Cada patrón debe distinguirse de los otros cinco.
- Probar control con ratón, teclado y toque; comprobar nombre y estado con lector de pantalla o inspección del árbol accesible.
- Ganar/deshacer/rehacer jugadas no modifica la preferencia ni la lógica de movimiento.

## Cierre de esta propuesta

Cuando quede implementada y fusionada en `main`: marca todas las tareas y criterios de aceptación, actualiza `../PLAN.md` y `../CONTEXTO.md` con la rama/commit de fusión, actualiza `./README.md` (quítala de «Aprobadas pendientes»), y retira este archivo con `git rm` (su contenido queda disponible en el historial de Git). Antes de pedir el OK de documentación, ejecuta desde la raíz del repositorio `node scripts/proposal-status.mjs juegos/botellas-y-liquidos/propuestas/037_modo_daltonico.md` y `node scripts/check-docs.mjs`.
