# Propuesta 062 — Murdoku: objetos y disponibilidad de celdas (bloque 4 del plan)

**Estado:** Borrador
**Fecha:** 2026-09-29
**Responsable:**

## Problema y objetivo

Con la topología de salas ya construida (propuesta 061), esta propuesta coloca objetos (ocupables y no ocupables) sobre el tablero y calcula `Cell.occupiable` en una única función de dominio, sin todavía colocar personas ni derivar pistas.

## Alcance

- Incluye: catálogo tipado de objetos, colocación de huellas de una o varias celdas, cálculo de ocupabilidad, comprobación de suficientes posiciones por fila/columna, tooltips y etiquetas de objeto/terreno, según `PLAN.md` bloque 4.
- No incluye:
  - Elegir la solución testigo ni reservar celdas para personas (propuesta 064): aquí solo se garantiza que quedan suficientes celdas ocupables, no se decide cuáles usará la solución.
  - Definir el arte final de los objetos (propuesta 068): aquí solo se definen tipo, huella y ocupabilidad, no el asset visual definitivo.

## Requisitos y decisiones

1. **Bloqueo previo.** Depende de la propuesta 061 (topología de salas) y usa el flujo `objects` del PRNG (propuesta 060).
2. **Función única de ocupabilidad.** Implementar `isCellOccupiable(cell, objectInstances, terrainCatalog, rulesVersion)` como la única fuente de verdad, según `GUIA_MOTOR_GENERACION.md` §7.3; no duplicar esta lógica en el render ni en el generador de pistas.
3. **Orden de decoración.** Aunque en esta propuesta todavía no existe testigo, dejar la función de colocación preparada para el orden de `GUIA_MOTOR_GENERACION.md` §7.2 (topología → testigo → reservar celdas del testigo → decorar), de modo que la propuesta 064 pueda insertar el paso de reserva sin reescribir este módulo.
4. **Huellas multi-celda.** Un objeto de huella de varias celdas debe declarar por catálogo si ocupa toda la huella o si permite pararse en alguna celda concreta, según `GUIA_MOTOR_GENERACION.md` §7.1/§7.3.
5. **Fixture de referencia.** Los tres objetos de `GUIA_MOTOR_GENERACION.md` §21.1 (banco ocupable, estante y fuente no ocupables) sirven de caso de prueba mínimo para `isCellOccupiable`.

## Criterios de aceptación

- [ ] Cada objeto colocado tiene tipo, huella de celdas válida dentro del tablero y ocupabilidad declarada por catálogo.
- [ ] No hay dos objetos incompatibles superpuestos en la misma celda; una superposición solo se permite si el catálogo la declara compatible explícitamente.
- [ ] `Cell.occupiable` coincide siempre con el resultado de `isCellOccupiable(...)` para esa celda.
- [ ] Cada fila y cada columna conserva suficientes celdas ocupables para la configuración de personas solicitada.
- [ ] Un mapa con menos celdas ocupables que personas se rechaza antes de continuar.
- [ ] El fixture de objetos de `GUIA_MOTOR_GENERACION.md` §21.1 produce los resultados de ocupabilidad documentados allí.

## Tareas

- [ ] **4.1** Crear el catálogo tipado de objetos aprobados.
- [ ] **4.2** Marcar en el catálogo qué tipos de objeto permiten ocupación.
- [ ] **4.3** Colocar un objeto de una celda dentro de un recinto compatible.
- [ ] **4.4** Rechazar objeto de una celda fuera del tablero.
- [ ] **4.5** Colocar una huella de objeto de varias celdas solo en celdas válidas.
- [ ] **4.6** Rechazar superposición de objetos no compatibles.
- [ ] **4.7** Actualizar `Cell.objectIds` al colocar una instancia.
- [ ] **4.8** Calcular `Cell.occupiable` desde terreno y objetos.
- [ ] **4.9** Asegurar que cada fila admite suficientes posiciones para la solución configurada.
- [ ] **4.10** Asegurar que cada columna admite suficientes posiciones para la solución configurada.
- [ ] **4.11** Rechazar mapas con menos celdas ocupables que personas.
- [ ] **4.12** Crear tooltip descriptivo de un objeto.
- [ ] **4.13** Crear etiquetas visibles para tipos de objeto y terreno.
- [ ] Actualizar `PLAN.md` (marcar bloque 4) y `CONTEXTO.md` con el resultado y las comprobaciones ejecutadas.
- [ ] Crear rama `feature/062_murdoku_objetos_ocupabilidad`, commits atómicos, y seguir el flujo de aprobación/merge del repositorio.

## Riesgos, dependencias y preguntas

- Decorar antes de tener testigo (como hace esta propuesta) obliga a la propuesta 064 a revalidar ocupabilidad tras reservar las celdas de la solución; documentar esa dependencia en `CONTEXTO.md` al cerrar esta propuesta.
- Si el catálogo de objetos aprobado en la propuesta 058/068 cambia una huella o su ocupabilidad por defecto, esta propuesta debe revisarse antes de que 064 dependa de ella.
- Un mapa con demasiados objetos no ocupables puede dejar filas/columnas sin candidatas suficientes; medir esta tasa de rechazo con la configuración mínima (`N`, `P` aprobados) antes de cerrar la propuesta.
