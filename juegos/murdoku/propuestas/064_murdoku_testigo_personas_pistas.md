# Propuesta 064 — Murdoku: testigo, personas y selección de pistas (bloque 6 del plan)

**Estado:** Borrador
**Fecha:** 2026-09-29
**Responsable:**

## Problema y objetivo

Con tablero, objetos y solucionador ya disponibles, falta crear las personas, encontrar una solución testigo, derivar átomos de pista verdaderos y seleccionar un subconjunto que deje el caso con solución única y por encima del suelo mínimo de pistas. Esta propuesta implementa `WitnessBuilder` y `ClueFactory`/`ClueSelector`.

## Alcance

- Incluye: creación de personas (víctima y sospechosos), búsqueda de testigo respetando fila/columna/sala del crimen, generación de átomos verdaderos por familia, renderizado de plantilla española, selección de un subconjunto único mediante `buildUniqueSet`, y validación integral final, según `PLAN.md` bloque 6.
- No incluye:
  - Calcular ni calibrar la dificultad del caso resultante (propuesta 065): aquí solo se garantiza unicidad, no nivel.
  - Ampliar el repertorio de pistas más allá de las familias aprobadas para la primera versión (propuesta 070).

## Requisitos y decisiones

1. **Bloqueo previo.** Depende de la propuesta 060 (flujos `people`/`witness`/`clues`), 062 (tablero con objetos y ocupabilidad) y 063 (`ConstraintSolver.countUpToTwo`).
2. **Orden de generación.** Seguir `README.md` §6.1 y el algoritmo `findWitness` de `GUIA_MOTOR_GENERACION.md` §14: reservar primero el par víctima/asesino si esa regla queda aprobada, colocar las demás personas, y solo entonces derivar pistas.
3. **Selección única.** Implementar `buildUniqueSet` exactamente como en `GUIA_MOTOR_GENERACION.md` §9.3 (cobertura de sospechosos → suelo de átomos de README §4.4 → verificación con `countUpToTwo` → ajuste por dificultad). No buscar el conjunto mínimo matemático de pistas; basta el primero que cumpla cobertura, suelo, verdad, unicidad y dificultad.
4. **Conjunciones limitadas.** Respetar el límite de "hasta dos átomos por conjunción" de `README.md` §3.1 punto 11 para la primera entrega; no generar cartas con `AND` de tres o más átomos todavía.
5. **Fixture de referencia.** El caso completo de `GUIA_MOTOR_GENERACION.md` §21 (incluida su carta de asesino con `AND` de solo dos átomos) es el resultado esperado de un `WitnessBuilder`/`ClueFactory` correctos para esa configuración concreta; usarlo como prueba de aceptación antes de conectar `BoardBuilder`/`SeededRandom` reales.

## Criterios de aceptación

- [ ] Cada persona aparece exactamente una vez en la solución testigo, en una celda ocupable distinta, respetando la política de fila/columna aprobada.
- [ ] Víctima y asesino cumplen la regla de la sala del crimen aprobada en la propuesta 058.
- [ ] Cada átomo de pista generado es verdadero sobre el testigo y usa solo IDs existentes en el caso.
- [ ] El conjunto final de pistas cubre a todos los sospechosos, alcanza el suelo de átomos de README §4.4 y el solucionador confirma solución única.
- [ ] Un conjunto de pistas que resulte ambiguo o contradictorio se rechaza y se reintenta dentro del presupuesto, sin mostrar un caso inválido.
- [ ] El fixture de `GUIA_MOTOR_GENERACION.md` §21 se reproduce exactamente (mismas cartas, mismo testigo) cuando se ejecuta como prueba fija, sin generador aleatorio.

## Tareas

- [ ] **6.1** Crear el modelo de nombre original y etiqueta visible de persona.
- [ ] **6.2** Crear exactamente una persona con rol víctima.
- [ ] **6.3** Crear `P-1` personas con rol sospechoso.
- [ ] **6.4** Asignar IDs estables a las personas del caso.
- [ ] **6.5** Elegir celdas ocupables distintas para una solución testigo.
- [ ] **6.6** Comprobar que la solución testigo respeta filas y columnas.
- [ ] **6.7** Elegir víctima y culpable compatibles con la regla aprobada.
- [ ] **6.8** Comprobar ocupación exclusiva de la sala del crimen.
- [ ] **6.9** Generar un átomo de sala verdadera para una persona.
- [ ] **6.10.1** Generar un átomo verdadero de fila o columna exacta, usando 5.8.
- [ ] **6.10.2** Generar un átomo verdadero de desplazamiento u orden direccional, usando 5.9.1–5.9.4.
- [ ] **6.11** Generar un átomo verdadero de ocupación de objeto.
- [ ] **6.12.1** Generar un átomo verdadero de adyacencia a un objeto.
- [ ] **6.12.2** Generar un átomo verdadero de adyacencia a otra persona.
- [ ] **6.13.1** Generar un átomo verdadero de no-adyacencia a un objeto.
- [ ] **6.13.2** Generar un átomo verdadero de no-adyacencia a otra persona.
- [ ] **6.14** Generar un átomo verdadero de soledad/relación en sala.
- [ ] **6.15.1** Renderizar la plantilla española de pertenencia a sala (6.9).
- [ ] **6.15.2** Renderizar la plantilla española de fila/columna exacta y de desplazamiento/orden direccional (6.10.1–6.10.2).
- [ ] **6.15.3** Renderizar la plantilla española de ocupación de objeto (6.11).
- [ ] **6.15.4** Renderizar la plantilla española de adyacencia a objeto/persona y sus negaciones (6.12.1–6.13.2).
- [ ] **6.15.5** Renderizar la plantilla española de soledad/relación en sala (6.14).
- [ ] **6.16** Verificar que los IDs de cada pista existen en el caso.
- [ ] **6.17** Elegir una pista para cada sospechoso según reglas aprobadas.
- [ ] **6.18** Añadir la pista estándar de víctima.
- [ ] **6.19** Ejecutar solucionador en el conjunto inicial de pistas.
- [ ] **6.20** Eliminar un átomo candidato si el caso conserva solución única.
- [ ] **6.21** Conservar el átomo si quitarlo vuelve ambiguo el caso.
- [ ] **6.22** Rechazar caso sin solución única al alcanzar el límite de intentos.
- [ ] **6.23** Guardar la solución aparte de las pistas visibles.
- [ ] **6.24** Ejecutar validación integral antes de devolver el caso al juego.
- [ ] Actualizar `PLAN.md` (marcar bloque 6) y `CONTEXTO.md` con el resultado y las comprobaciones ejecutadas.
- [ ] Crear rama `feature/064_murdoku_testigo_personas_pistas`, commits atómicos, y seguir el flujo de aprobación/merge del repositorio.

## Riesgos, dependencias y preguntas

- Reservar el par víctima/asesino antes de colocar al resto puede dejar sin candidatas a algún sospechoso en tableros pequeños; medir la tasa de reintentos con la configuración mínima aprobada.
- El suelo de átomos `ceil(3 × P / 2)` de README §4.4 sigue pendiente de aprobación formal en la propuesta 058; si cambia, revisar `buildUniqueSet` antes de dar esta propuesta por cerrada.
- Si la propuesta 070 activa más adelante familias de pista nuevas, `ClueFactory`/`ClueSelector` deben poder incorporarlas sin reescribirse; dejar constancia en `CONTEXTO.md` de los puntos de extensión usados.
