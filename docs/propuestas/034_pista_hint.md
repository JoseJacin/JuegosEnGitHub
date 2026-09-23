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
- [ ] T16.6 Crear rama `feature/034_pista_hint`, commits atómicos, merge en `main` y push.
