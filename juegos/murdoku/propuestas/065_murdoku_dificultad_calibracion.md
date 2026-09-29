# Propuesta 065 — Murdoku: cálculo y calibración de dificultad (bloque 7 del plan)

**Estado:** Borrador
**Fecha:** 2026-09-29
**Responsable:**

## Problema y objetivo

Un caso con solución única no basta: hay que medir cuánto trabajo de deducción exige y asignarle un nivel (muy fácil a experto) de forma explicable, sin depender solo del tamaño del tablero. Esta propuesta implementa `HumanStepSolver` (técnicas D0–D4), su clasificación y el proceso de calibración con corpus.

## Alcance

- Incluye: formato de paso pedagógico, detección de las técnicas D0_DIRECT–D4_CHAIN, clasificación provisional, corpus de calibración y separación entre carga de tablero y coste lógico, según `PLAN.md` bloque 7.
- No incluye:
  - Cambiar el solucionador exacto (propuesta 063): `HumanStepSolver` es un camino de código distinto que nunca cuenta una rama de búsqueda como deducción humana.
  - Fijar umbrales numéricos definitivos de minutos u operaciones humanas: los perfiles cualitativos de README §7.4 se calibran con corpus, no se inventan aquí.

## Requisitos y decisiones

1. **Bloqueo previo.** Depende de la propuesta 063 (predicados y contratos del solucionador) y 064 (casos completos con testigo y pistas para calibrar).
2. **Algoritmo obligatorio.** Implementar `runPedagogicalStep`/`rate` exactamente como en `GUIA_MOTOR_GENERACION.md` §11.1.1, probando las técnicas en el orden fijo D0→D1→D2→D3→D4 y devolviendo `NONE`/`UNRATABLE` en vez de adivinar.
3. **Sub-detectores por tipo.** Descomponer `tryRelation` en las subtareas 7.4.1–7.4.3 (adyacencia, orden direccional, mismo recinto/soledad) y `tryCardinality` en 7.5.1–7.5.4 (unicidad, conteos, paridad, reglas de escenario), tal como fija `PLAN.md`; no escribir un único bloque que reconozca todos los casos a la vez.
4. **`UNRATABLE`, no "experto" por descarte.** Un caso que solo se resuelve por `SEARCH` (backtracking de `ConstraintSolver`) sin que `HumanStepSolver` complete la asignación se marca `UNRATABLE`, según `GUIA_MOTOR_GENERACION.md` §11.3; nunca se promueve automáticamente a "experto".
5. **Fixture de referencia.** El caso de `GUIA_MOTOR_GENERACION.md` §21.4 debe clasificar como "muy fácil" usando solo `D0_DIRECT` y `D1_EXCLUSION`, sin activar `D2`–`D4`; usarlo como primera prueba de `rate()` antes de calibrar con un corpus más grande.

## Criterios de aceptación

- [ ] Cada paso pedagógico registra técnica, pistas/reglas citadas, dominio antes/después y explicación verificable.
- [ ] El fixture de `GUIA_MOTOR_GENERACION.md` §21 se resuelve completo usando solo `D0_DIRECT`/`D1_EXCLUSION` y clasifica como "muy fácil".
- [ ] Un caso que solo se resuelve por búsqueda ciega (sin secuencia pedagógica completa) se marca `UNRATABLE`, no "experto".
- [ ] El nivel calculado se puede reproducir con la misma versión de clasificador (`classifierVersion`).
- [ ] Ninguna familia de pista ni el tamaño del tablero por sí solos determinan el nivel asignado (verificable comparando dos casos del mismo tamaño con niveles distintos).

## Tareas

- [ ] **7.1** Definir el formato de un paso pedagógico (regla, pista, dominio antes/después).
- [ ] **7.2** Detectar una colocación directa de una sola celda (`D0_DIRECT`).
- [ ] **7.3** Detectar eliminación de fila/columna (`D1_EXCLUSION`).
- [ ] **7.4.1** Detectar `D2_RELATION` para adyacencia a objeto o a persona (usa 5.11–5.13.2).
- [ ] **7.4.2** Detectar `D2_RELATION` para orden/desplazamiento direccional (usa 5.9.1–5.9.4).
- [ ] **7.4.3** Detectar `D2_RELATION` para mismo recinto y soledad (`SAME_ROOM_AS`, `ALONE_IN_ROOM`, `ALONE_WITH`).
- [ ] **7.5.1** Detectar `D3_CARDINALITY` para unicidad (`UNIQUE_MATCH`), solo si 0.7/0.8 la aprueban para esta fase.
- [ ] **7.5.2** Detectar `D3_CARDINALITY` para conteos exactos/mínimos/ninguno (`COUNT_EXACTLY`/`COUNT_AT_LEAST`/`NONE`), solo si están aprobados.
- [ ] **7.5.3** Detectar `D3_CARDINALITY` para paridad (`COUNT_PARITY`), solo si está aprobada.
- [ ] **7.5.4** Detectar `D3_CARDINALITY` para reglas de escenario (`ScenarioRule`) aprobadas y con entidades presentes en el tablero.
- [ ] **7.6** Encadenar pasos justificados con profundidad acotada (`D4_CHAIN`).
- [ ] **7.7** Rechazar paso pedagógico sin una razón verificable.
- [ ] **7.8** Ejecutar el solver pedagógico en orden determinista.
- [ ] **7.9** Registrar familias de reglas usadas.
- [ ] **7.10** Registrar el número de pasos y profundidad máxima.
- [ ] **7.11** Registrar personas, tamaño, átomos y métricas de diagnóstico.
- [ ] **7.12** Asignar una categoría inicial con tamaño como factor secundario.
- [ ] **7.13** Marcar caso fuera de rango si solo se resuelve mediante búsqueda no explicada.
- [ ] **7.14** Crear corpus de semillas de prueba con configuraciones pequeñas.
- [ ] **7.15** Calibrar umbrales tras revisión de casos y partidas humanas.
- [ ] **7.16** Versionar el clasificador para reproducir la misma etiqueta.
- [ ] **7.17** Rechazar o informar configuración cuando no se logra el nivel solicitado.
- [ ] **7.18** Registrar por separado carga del tablero (`N`, `P`, densidad) y coste lógico de deducción.
- [ ] **7.19** Registrar familias de operador realmente necesarias, sin inferirlas solo de las pistas que aparecen.
- [ ] **7.20** Contar relaciones demostradas entre cartas y profundidad de cadenas explicables.
- [ ] **7.21** Marcar `UNRATABLE` cuando el solver exacto resuelve por búsqueda y el solver pedagógico no tiene una secuencia completa.
- [ ] **7.22** Construir un corpus fijo de semillas por configuración y registrar resultados por `classifierVersion`.
- [ ] **7.23** Revisar casos frontera por humanos y cambiar pesos/umbrales solo con versión de clasificador nueva.
- [ ] **7.24** Comprobar que ninguna familia de pista ni tamaño por sí solos asignan nivel.
- [ ] Actualizar `PLAN.md` (marcar bloque 7) y `CONTEXTO.md` con el resultado y las comprobaciones ejecutadas.
- [ ] Crear rama `feature/065_murdoku_dificultad_calibracion`, commits atómicos, y seguir el flujo de aprobación/merge del repositorio.

## Riesgos, dependencias y preguntas

- Calibrar niveles "difícil"/"experto" requiere un corpus más grande que el fixture ilustrativo de §21 (que es intencionalmente "muy fácil"); reservar tiempo para generar y resolver manualmente varios casos de cada tamaño antes de fijar umbrales.
- Si la propuesta 070 activa familias de pista nuevas más adelante, los sub-detectores 7.4.x/7.5.x deben ampliarse sin tocar los ya validados; documentar el punto de extensión al cerrar esta propuesta.
- El límite de profundidad de `D4_CHAIN` no está fijado numéricamente todavía; si la propuesta 058 no lo aprobó, dejar esta tarea (7.6) bloqueada en ese punto concreto.
