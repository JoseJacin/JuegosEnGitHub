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

## Guía de implementación

### Hallazgo previo obligatorio

En el código actual, `renderGame()` llama a `bottleGrid.replaceChildren()` y crea de nuevo cada botella y cada `.liquid`. Añadir solo `transition: height` no puede animar el cambio porque el navegador nunca ve el mismo nodo con dos alturas. No añadir un reflow forzado como arreglo: los elementos antiguos ya se han retirado.

La animación debe ser de presentación. El modelo (`currentBottles`), las validaciones, historial, contador futuro y `finishIfWon()` se actualizan sin esperar a CSS ni a una promesa de animación.

### Estrategia de actualización incremental

Refactorizar el renderizado de forma acotada para conservar los nodos de botella existentes por `data-bottle-id` y actualizar su DOM:

1. Crear una función `renderGame({ animate = false } = {})` o equivalente. Los renders iniciales, inicio/reinicio y restauración de deshacer usan `animate: false`; solo el render posterior a un trasvase legal usa `animate: true`.
2. Antes de modificar cada botella visible, medir las alturas/posiciones de sus líquidos actuales y calcular las nuevas dimensiones desde el modelo. No medir para renders sin animación.
3. Reutilizar el contenedor `.bottle`, `.glass` y sus spans `.liquid` por ID de botella. El orden visual de botellas completadas sigue la regla actual; mover nodos existentes en el DOM con `append()`/`appendChild()` no debe recrear sus líquidos.
4. Para una capa conservada en el mismo puesto desde el fondo, actualizar color, `height`, `bottom`, `data-units` y atributos descriptivos desde el estado nuevo. El vertido suele aumentar/disminuir la altura de la capa superior, mientras que las capas por encima pueden cambiar su posición.
5. Si se añade una capa al destino vacío, crear su span con altura inicial `0%` en su posición final, insertarlo y, en el siguiente `requestAnimationFrame`, establecer la altura y posición finales. Si se elimina una capa del origen, animarla a `height: 0%` y retirarla tras `transitionend`; incluir un timeout de respaldo de duración + margen por si `transitionend` no ocurre. Filtrar el evento por `event.target` y `propertyName` para no procesar transiciones de hijos/propiedades ajenas.
6. Evitar que una capa nueva/eliminada quede desincronizada si llega otro movimiento antes de terminar la animación. Opción recomendada: cancelar transiciones pendientes del render previo, normalizar el DOM al estado actual y empezar desde el DOM/modelo más reciente. No bloquear ni deshabilitar botellas durante ~250 ms.
7. El caso en que la botella se completa y cambia de posición debe conservar el mismo nodo por ID, actualizar `closed/done`, corcho, `aria-label`, metadatos y selección, y después reordenar el nodo. No reconstruir todo el grid.

Las capas se pueden reconciliar de abajo hacia arriba por índice mientras mantengan su puesto. No emparejar por color únicamente: el mismo color puede aparecer en varias capas separadas y una capa puede desaparecer por completo. Las reglas del juego no prohíben que el render tenga que manejar ambos casos.

### CSS y accesibilidad de movimiento

- Añadir la transición solo dentro de `@media (prefers-reduced-motion: no-preference)`, junto al bloque existente. Aplicar `height` y `bottom` a `.liquid` con duración aproximada de `250ms` y curva `ease`; se puede incluir `opacity` para entrada/salida si ayuda a evitar un salto.
- Dentro de `@media (prefers-reduced-motion: reduce)`, asegurar que `.liquid` no tenga transición ni animación (por ejemplo `transition: none; animation: none`). No añadir estilos que anulen las reglas actuales de botones/botellas fuera del ámbito de esta propuesta.
- La forma y color final deben coincidir con el estado final del modelo. No usar una animación para simular unidades que no se hayan movido.
- No añadir audio, partículas, rotación de botellas o física.
- Respetar `will-change` solo si una medición demuestra necesidad; evitar dejarlo permanente en decenas de botellas de tableros grandes.

### Comprobaciones concretas

- Un vertido parcial cambia suavemente la altura de la capa superior de origen y destino; un vertido completo retira la capa del origen sin dejar un hueco permanente.
- Verter a destino vacío anima la aparición de la capa. Verter sobre mismo color actualiza la altura de su capa existente.
- Completar una botella conserva su identidad, corcho, posición ordenada, estado accesible y capacidad; no aparecen nodos duplicados.
- Una jugada realizada durante una animación deja el tablero exactamente igual al modelo actual, sin saltos hacia estados intermedios.
- Deshacer, reiniciar y generar otra partida presentan estado final inmediatamente, sin animar restauraciones.
- Con `prefers-reduced-motion: reduce`, no hay transición de líquido; las reglas y respuesta de juego son idénticas.
- Revisar al menos tablero grande y viewport móvil mediante inspección visual interactiva, buscando parpadeo, jank y scroll accidental. Si no hay navegador disponible, dejar esa comprobación anotada como pendiente y no declarar que se verificó.
