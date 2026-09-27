# Propuesta: aviso compacto de botella cerrada, selección sin borde verde y limpieza de propuestas

**Estado:** Implementada
**Fecha:** 2026-09-23
**Responsable:** Usuario y agente Antigravity

## Problema y objetivo

1. El mensaje de error al intentar interactuar con una botella cerrada («La botella está cerrada y no puede ser origen.» / «La botella de destino está cerrada.») es demasiado largo y no sigue el formato compacto con icono de los demás avisos («Botella llena» y «Color no coincidente»).
2. Al seleccionar una botella, aparece un recuadro verde exterior (`box-shadow`) que, junto con el recuadro blanco de la botella, resulta redundante. Se desea eliminar el contorno verde exterior.
3. El directorio `docs/propuestas/` acumula 18 propuestas antiguas. Se requiere limpiarlo dejando solo las dos propuestas más recientes, actualizando los índices y referencias en `docs/README.md`, `PLAN.md` y `CONTEXTO.md` para evitar enlaces rotos.

## Alcance

- Incluye:
  - Cambiar el aviso de botella cerrada por un formato compacto «Botella cerrada» con icono «✕» usando `setMoveError('Botella cerrada', '✕')`.
  - Quitar `box-shadow: inset 0 0 0 1px var(--accent);` de `.bottle.selected`, manteniendo el contorno blanco de `.glass`.
  - Eliminar los ficheros de propuestas `008` a `029` en `docs/propuestas/`, conservando las propuestas `030` y `031` que estaban vigentes al cerrar este cambio.
  - Actualizar `docs/README.md`, `PLAN.md` y `CONTEXTO.md` para reflejar la limpieza y mantener la coherencia sin enlaces rotos.
- No incluye:
  - Modificación de reglas de juego ni de generación de partida.

## Requisitos y decisiones

1. **Aviso compacto:**
   - Intentar seleccionar o verter en una botella cerrada muestra «Botella cerrada» con el icono «✕» en el estado de movimiento (`#moveStatus`).
2. **Estilo de selección:**
   - `.bottle.selected` mantiene su fondo sutil pero sin borde verde perimetral; la selección se destaca con el recuadro blanco sobre el vidrio de la botella.
3. **Limpieza documental:**
  - Se eliminan del árbol de trabajo los archivos de propuestas del 008 al 029 (quedando preservados en el historial de Git).
  - Se actualiza `docs/README.md` indicando que las propuestas históricas residen en el historial de Git y enlazando las propuestas 030 y 031 que estaban vigentes al cerrar este cambio.
   - En `PLAN.md` y `CONTEXTO.md` se ajustan las referencias para evitar enlaces rotos a archivos eliminados.

## Criterios de aceptación

- [x] Al hacer clic en una botella cerrada se muestra «Botella cerrada» con su icono «✕» en `#moveStatus`.
- [x] Al seleccionar una botella abierta no se dibuja la línea verde perimetral; solo se muestra el recuadro blanco sobre el vidrio.
- [x] En `docs/propuestas/` solo se conservaban las propuestas 030 y 031 al cerrar este cambio; los archivos 008–029 permanecen en el historial.
- [x] Ningún documento (`docs/README.md`, `PLAN.md`, `CONTEXTO.md`) contiene enlaces a las propuestas eliminadas.

## Tareas

- [x] Actualizar la lógica y presentación de error de botella cerrada en `juegos/botellas-y-liquidos/index.html`.
- [x] Eliminar `box-shadow` en `.bottle.selected` en `juegos/botellas-y-liquidos/index.html`.
- [x] Eliminar las propuestas `008` a `029` de `docs/propuestas/`.
- [x] Actualizar enlaces e índices en `docs/README.md`, `PLAN.md` y `CONTEXTO.md`.
- [x] Verificar diff y publicar en rama `feature/031_ajustes_visuales_y_limpieza_propuestas`.
