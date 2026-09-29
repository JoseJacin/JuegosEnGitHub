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
    Ejemplo: `🟢🟡🔵🔴 en 18 movimientos — josejacin.github.io/JuegosEnGitHub/juegos/botellas-y-liquidos/`
  - Copia con `navigator.clipboard.writeText`; si no disponible, muestra el texto en un `<textarea>` seleccionado.
  - El botón muestra «¡Copiado!» durante 2 s tras copiar.
- No incluye:
  - URL con semilla (descartada por complejidad; puede revisarse en propuesta futura).
  - Compartir a redes sociales ni integración con Web Share API.

## Requisitos y decisiones

1. Depende de la propuesta 032 (`moveCount` debe estar disponible).
2. El mapeo color CSS → emoji se define con un objeto `COLOR_EMOJIS` paralelo a `COLOR_NAMES`.
3. La URL incluida en el texto es la URL canónica fija del juego (no contiene semilla).

## Criterios de aceptación

- [ ] El botón «Copiar resultado» aparece en el diálogo de victoria.
- [ ] Al pulsarlo, se copia el texto al portapapeles.
- [ ] El botón muestra «¡Copiado!» durante 2 s y luego vuelve a su texto original.
- [ ] Si el portapapeles no está disponible, se muestra el texto en un `<textarea>` para copiar manualmente.
- [ ] Los emojis corresponden a los colores de las botellas completadas en la partida.

## Tareas

- [ ] T17.1 Definir `COLOR_EMOJIS` paralelo a `COLORS`/`COLOR_NAMES`.
- [ ] T17.2 Implementar `buildShareText(completedBottles, moveCount)`.
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

Implementar `buildShareText(completedBottles, moveCount)` como función pura:

1. Recibir las botellas con líquido completadas en la partida ganada (no incluir botellas vacías). En el handler, derivarlas desde `currentBottles` usando `layers.length > 0`, cerrada y suma de unidades igual a capacidad, o pasar las botellas ya seleccionadas por la condición de victoria.
2. Extraer el índice desde `COLORS.indexOf(bottle.layers[0].color)` y obtener `COLOR_EMOJIS[index]`.
3. Ordenar los emojis por índice de color ascendente, manteniendo el orden original entre botellas del mismo color. Incluir un emoji por botella completa: si un color completa dos botellas, repetir su emoji dos veces. Esto conserva la representación de cada objetivo aun cuando se repitan colores.
4. Si un color no está en `COLORS` o falta su emoji (estado inesperado), no lanzar; usar un símbolo neutro `⚪` y registrar el problema solo si el patrón de diagnóstico existente lo permite. No omitir silenciosamente una botella.
5. Usar singular `movimiento` para 1 y plural `movimientos` para 0 o más de uno.
6. Devolver una sola línea con el formato: `<emojis> en <N> movimiento(s) — https://josejacin.github.io/JuegosEnGitHub/juegos/botellas-y-liquidos/`. Usar la URL HTTPS canónica completa; no `location.href`, que puede incluir parámetros/ruta local, ni una semilla.

Ejemplo conceptual: `🟢🟢🟡🔵 en 18 movimientos — https://josejacin.github.io/JuegosEnGitHub/juegos/botellas-y-liquidos/`.

El objeto aprobado `COLOR_EMOJIS` paralelo a `COLOR_NAMES` puede ser array si ambos conservan el mismo índice; no hay que crear un mapeo por texto. Documentar el orden exacto de colores y emojis junto a la constante.

### Diálogo y fallback manual

- Añadir un botón `type="button"` con id claro (por ejemplo `copyResult`) dentro de `#victoryDialog`, junto a las acciones existentes. Debe tener texto visible «Copiar resultado», no solo icono.
- Añadir un contenedor ocultable con etiqueta para el fallback y un `<textarea readonly>` (por ejemplo `#shareFallback`). Al inicio debe estar oculto; asignar el resultado mediante `.value`, nunca `innerHTML`.
- Pulsar el botón construye el texto una vez y prueba `navigator.clipboard.writeText(text)`. Acceder a `navigator.clipboard` puede no estar disponible o lanzar; envolver acceso y llamada en `try/catch` y usar `await` para detectar rechazo. El listener debe ser `async`.
- Si la copia asíncrona se resuelve, mostrar «¡Copiado!» durante 2000 ms y ocultar/limpiar cualquier fallback previo.
- Si la API no existe o rechaza la copia, mostrar el textarea con el texto, seleccionarlo con `focus()` y `select()`, y presentar una instrucción visible como «Copia el texto seleccionado». No mostrar «¡Copiado!» en este caso. No depender de `document.execCommand('copy')` como segundo fallback automático: la decisión aprobada es facilitar copia manual.
- Añadir `aria-live="polite"` a un estado de copia dedicado o reutilizar un texto de estado en el diálogo para comunicar éxito/fallback. Evitar múltiples regiones live simultáneas. Asegurar que el foco no se pierda al revelar el fallback.
- Mantener `copyTimeout` para el estado del botón. Antes de programar otro timeout, cancelar el anterior; al cerrar/cambiar de victoria limpiar el timeout y restaurar «Copiar resultado». No dejar un timeout que altere la UI de una partida posterior.
- `undoVictory` cierra el diálogo con `undoMove()`. Al volver a ganar, ocultar fallback viejo y restablecer el botón antes de abrir/preparar el diálogo.

### Comprobaciones concretas

- Ganar con un color por botella produce emojis en orden de índice; colores repetidos generan emojis repetidos; vacías no generan emoji.
- Verificar plural para 1 y 2 movimientos y URL exacta sin query ni hash.
- Con clipboard disponible y promesa resuelta, comprobar contenido idéntico al resultado visible, etiqueta temporal de 2 s y restauración.
- Simular API inexistente, getter que lanza y promesa rechazada: el textarea aparece seleccionado, con instrucción accesible y botón sin falso mensaje de éxito.
- Cerrar el diálogo o ganar de nuevo antes de 2 s no permite que el timeout viejo cambie el botón de la sesión nueva.
- Pulsar el botón varias veces seguidas no genera errores ni altera la partida, contador, historial o récord.
- Probar el diálogo en viewport móvil y teclado: acciones alcanzables, fallback desplazable y texto seleccionable.
