# Propuesta 063 — Murdoku: solucionador exacto (bloque 5 del plan)

**Estado:** Borrador
**Fecha:** 2026-09-29
**Responsable:**

## Problema y objetivo

El motor necesita un solucionador de restricciones (`ConstraintSolver`) que, dado un tablero, un conjunto de personas y un conjunto de pistas, cuente hasta dos soluciones completas de forma reproducible. Sin él no se puede garantizar que un caso generado tenga solución única. Esta propuesta implementa el solucionador exacto (dominios, propagación, búsqueda) de forma aislada, sin generar todavía testigo ni pistas reales.

## Alcance

- Incluye: dominios por persona, propagación de restricciones estructurales y de cada predicado de pista aprobado, búsqueda MRV con desempate estable, conteo hasta dos soluciones y métricas de búsqueda, según `PLAN.md` bloque 5.
- No incluye:
  - Elegir qué pistas usar en una partida ni construir el testigo (propuesta 064): esta propuesta solo consume una lista de pistas ya dada y responde cuántas soluciones cumplen todas las restricciones.
  - El solver pedagógico (`HumanStepSolver`) y la clasificación de dificultad (propuesta 065): son un camino de código distinto según `GUIA_MOTOR_GENERACION.md` §11.

## Requisitos y decisiones

1. **Bloqueo previo.** Depende de la propuesta 059 (tipos, incluidos los miembros de `ClueAtom` de 1.7.1–1.7.6) y de la propuesta 062 (tablero con ocupabilidad calculada); requiere que las reglas de la propuesta 058 (política de fila/columna, definición de asesinato) estén aprobadas.
2. **Modelo CSP.** Seguir `GUIA_MOTOR_GENERACION.md` §10.1: variable = persona, dominio = celdas ocupables candidatas, restricciones = fila/columna/celda/pista/sala/objetos/crimen. Empezar con listas compactas de índices/booleanos; no imponer `BigInt` sin perfilado previo.
3. **Búsqueda determinista.** Implementar exactamente `search(state)` de `GUIA_MOTOR_GENERACION.md` §10.3 (propagar, comprobar contradicción, elegir variable de menor dominio con desempate por ID estable, probar valores en orden estable, detener al llegar a dos soluciones).
4. **Propagación por predicado.** Al implementar cada predicado de las tareas 5.6–5.14, seguir la tarea 5.25: en esa misma subtarea distinguir evaluación completa de propagación parcial seudo-conservadora (devolver "desconocido" en vez de eliminar cuando no sea seguro). No abrir una tarea aparte que toque todos los predicados a la vez.
5. **`D2_RELATION`/`D3_CARDINALITY` compartidos.** Los predicados que se implementen aquí (5.9.1–5.9.4, 5.11–5.13.2, etc.) son los mismos que usará el solver pedagógico de la propuesta 065 (`tryRelation`/`tryCardinality`, `GUIA_MOTOR_GENERACION.md` §11.1.1); mantener sus nombres y contratos estables para no romper esa propuesta.
6. **Fixture de referencia.** El caso completo de `GUIA_MOTOR_GENERACION.md` §21 (tablero, testigo y 8 átomos de pista) debe devolver `count: 1` con la solución igual al testigo documentado; usarlo como prueba de aceptación de esta propuesta antes de conectar generación real.

## Criterios de aceptación

- [ ] Con las pistas del fixture de `GUIA_MOTOR_GENERACION.md` §21.3, `countUpToTwo` devuelve `count: 1` y la solución coincide con la tabla de §21.2.
- [ ] Quitar un átomo del fixture hasta dejarlo ambiguo hace que `countUpToTwo` devuelva `count: 2` sin seguir buscando más soluciones.
- [ ] Un conjunto de pistas contradictorio con el tablero devuelve `count: 0`, nunca una solución parcial.
- [ ] Alcanzar el límite de nodos/tiempo configurado devuelve `aborted: true` y nunca se etiqueta como `UNIQUE` ni como `sin solución`.
- [ ] Cada predicado implementado tiene, en su misma subtarea, una evaluación completa y una propagación parcial que nunca elimina una candidata insegura.

## Tareas

- [ ] **5.1** Crear el dominio inicial de celdas ocupables para una persona.
- [ ] **5.2** Quitar del dominio las celdas fuera del tablero o no ocupables.
- [ ] **5.3** Propagar la restricción de no compartir celda.
- [ ] **5.4** Propagar la restricción de fila aprobada.
- [ ] **5.5** Propagar la restricción de columna aprobada.
- [ ] **5.6** Implementar el predicado de sala exacta.
- [ ] **5.7** Implementar el predicado de pertenencia a una de varias salas.
- [ ] **5.8** Implementar predicados de fila y columna.
- [ ] **5.9.1** Implementar el predicado "una fila al norte/sur" (diferencia de fila exactamente 1; README §2.2).
- [ ] **5.9.2** Implementar el predicado "una columna al este/oeste" (diferencia de columna exactamente 1).
- [ ] **5.9.3** Implementar el predicado "más al norte/sur" (comparación estricta de fila, cualquier diferencia positiva).
- [ ] **5.9.4** Implementar el predicado "más al este/oeste" (comparación estricta de columna, cualquier diferencia positiva).
- [ ] **5.10** Implementar ocupación exacta de objeto.
- [ ] **5.11** Implementar adyacencia a un objeto.
- [ ] **5.12** Implementar adyacencia a otra persona.
- [ ] **5.13.1** Implementar no-adyacencia a un objeto.
- [ ] **5.13.2** Implementar no-adyacencia a otra persona.
- [ ] **5.14** Implementar condición de persona sola en sala.
- [ ] **5.15** Implementar condición de víctima y asesino en sala.
- [ ] **5.16** Implementar conjunción de átomos de pista.
- [ ] **5.17** Propagar restricciones hasta que no queden dominios modificados.
- [ ] **5.18** Detectar contradicción cuando un dominio queda vacío.
- [ ] **5.19** Elegir variable sin resolver de menor dominio (MRV).
- [ ] **5.20** Desempatar variable por orden de ID estable.
- [ ] **5.21** Probar valores de dominio con orden estable.
- [ ] **5.22** Detener búsqueda al encontrar dos soluciones.
- [ ] **5.23** Devolver los estados cero, una o varias soluciones.
- [ ] **5.24** Devolver métricas de búsqueda separadas del resultado lógico.
- [ ] **5.25** Al implementar cada predicado de 5.6–5.14, distinguir en esa misma subtarea su evaluación completa de su propagación parcial; devolver estado desconocido cuando no sea seguro eliminar candidatas. No abrir una tarea aparte que toque todos los predicados a la vez.
- [ ] Actualizar `PLAN.md` (marcar bloque 5) y `CONTEXTO.md` con el resultado y las comprobaciones ejecutadas.
- [ ] Crear rama `feature/063_murdoku_solucionador_exacto`, commits atómicos, y seguir el flujo de aprobación/merge del repositorio.

## Riesgos, dependencias y preguntas

- El rendimiento de la búsqueda en tableros grandes (16×16, 16 personas) no está perfilado; empezar con el fixture pequeño de §21 y con la configuración mínima aprobada antes de medir tamaños grandes (ver también propuesta 069, perfilado).
- Si la propuesta 058 aprueba una política de fila/columna distinta a "como máximo una" (por ejemplo "exactamente una"), las tareas 5.4/5.5 deben reflejar esa política exacta, no la asumida en los documentos actuales.
- Los predicados de 5.9.x–5.13.x son compartidos textualmente con la propuesta 065 (detección `D2_RELATION`); si esta propuesta cambia su firma, avisar explícitamente en `CONTEXTO.md` para que 065 no quede desincronizada.
