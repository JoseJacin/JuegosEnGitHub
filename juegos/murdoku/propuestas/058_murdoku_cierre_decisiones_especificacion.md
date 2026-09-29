# Propuesta 058 — Murdoku: cerrar las decisiones que bloquean la implementación (bloque 0 del plan)

**Estado:** Borrador
**Fecha:** 2026-09-29
**Responsable:**

## Problema y objetivo

`README.md` y `GUIA_MOTOR_GENERACION.md` de Murdoku ya están redactados con gran detalle (reglas, modelo de datos, pseudocódigo de generación, solucionador, dificultad y un caso de referencia completo en `GUIA_MOTOR_GENERACION.md` §21), pero ambos documentos dejan explícitamente abiertas varias decisiones (`README.md` §13, `GUIA_MOTOR_GENERACION.md` §18). Ninguna otra propuesta de implementación de Murdoku (059–070) puede fusionarse en `main` hasta que el usuario cierre esas decisiones. Esta propuesta no añade código ni pseudocódigo nuevo: su único objetivo es presentar cada decisión pendiente como pregunta concreta, registrar la respuesta del usuario y actualizar el estado de los documentos.

## Alcance

- Incluye:
  - Revisar y decidir, uno por uno, cada punto de `README.md` §13 y `GUIA_MOTOR_GENERACION.md` §18.
  - Actualizar `README.md` para reflejar cada decisión (quitar la marca "Decisión por aprobar" donde corresponda, fijar los rangos/umbrales acordados).
  - Cambiar el estado de encabezado de `README.md` y `GUIA_MOTOR_GENERACION.md` de "borrador"/"pendiente de revisión" a "aprobado".
  - Actualizar `CONTEXTO.md` con la fecha, el resumen de decisiones y la rama/commit de esta propuesta.
- No incluye:
  - Escribir código de generación, solucionador, interfaz o assets: corresponde a las propuestas 059–070.
  - Inventar una decisión no solicitada explícitamente al usuario: cada punto debe presentarse como pregunta y esperar respuesta, no resolverse por criterio propio del agente.
  - Modificar la propuesta 043 (ya aprobada e integrada).

## Requisitos y decisiones

Cada punto siguiente debe presentarse al usuario como pregunta concreta y su respuesta debe quedar transcrita en `README.md`/`GUIA_MOTOR_GENERACION.md` en la sección correspondiente, no solo en esta propuesta:

1. `README.md` §13, puntos 1–11 (colocación por fila/columna, definición de asesinato, rangos `N`/`P`, niveles y modo "cualquiera", familias de pista de la primera versión, conteo/paridad, ajustes de la primera versión, catálogo visual original, presupuesto de generación, orden de activación del repertorio de pistas, suelo de átomos de §4.4).
2. `GUIA_MOTOR_GENERACION.md` §18: confirmar o sustituir el PRNG/formato de semilla ya recomendado en §5.2, los presupuestos de intentos de §12.1, los criterios de ranking de dificultad de §7 y el algoritmo de partición de salas de §6.1/§6.2.
3. `PLAN.md` tareas 0.1–0.16, en el mismo orden en que aparecen allí.

## Criterios de aceptación

- [ ] Cada punto de `README.md` §13 tiene una decisión registrada por escrito (ninguno queda como "pendiente").
- [ ] Cada punto de `GUIA_MOTOR_GENERACION.md` §18 tiene una decisión registrada o confirma explícitamente el valor ya recomendado en la guía.
- [ ] `README.md` cambia su estado de encabezado a aprobado.
- [ ] `GUIA_MOTOR_GENERACION.md` cambia su estado de encabezado a aprobado.
- [ ] `CONTEXTO.md` refleja la fecha de aprobación y resume las decisiones tomadas.
- [ ] `PLAN.md` marca la tarea 0 y sus subtareas 0.1–0.16 como completadas.

## Tareas

- [ ] **0.1** Acordar si `P < N` permite filas y columnas vacías.
- [ ] **0.2** Acordar si cada fila/columna es "como máximo una persona" o "exactamente una persona".
- [ ] **0.3** Acordar que el recuento de personas incluye a la víctima.
- [ ] **0.4** Aprobar la definición de asesino y ocupación exclusiva de la sala con la víctima.
- [ ] **0.5** Aprobar rangos de tamaño `N` y de personas `P`.
- [ ] **0.6** Aprobar los cinco niveles y decidir si existe modo "cualquiera".
- [ ] **0.7** Aprobar qué familias de pistas entran en primera versión.
- [ ] **0.8** Decidir si las pistas de conteo/paridad quedan para una fase futura.
- [ ] **0.9** Aprobar el conjunto de ajustes incluidos en la primera versión.
- [ ] **0.10** Acordar presupuesto inicial de generación y comportamiento al agotar reintentos.
- [ ] **0.11** Incorporar las decisiones acordadas al `README.md`.
- [ ] **0.12** Cambiar el estado de la especificación a aprobada y actualizar contexto.
- [ ] **0.13** Revisar la arquitectura y algoritmos propuestos en `GUIA_MOTOR_GENERACION.md`.
- [ ] **0.14** Resolver sus decisiones técnicas pendientes (PRNG, intentos, presupuestos, ranking y partición) y marcar la guía como aprobada.
- [ ] **0.15** Revisar la matriz de familias observadas en `README.md` §3.3; conservarlas todas en el repertorio objetivo, decidir el orden de activación (MVP/fases posteriores) y definir la semántica de `O`, negación, conteos y reglas de escenario antes de sortearlas.
- [ ] **0.16** Revisar y aprobar o ajustar el suelo inicial `ceil(3 × P / 2)` átomos visibles propuesto en `README.md` §4.4; confirmar si se exige además una cantidad mínima de familias distintas y calibrar el umbral con casos resueltos.
- [ ] Crear rama `feature/058_murdoku_cierre_decisiones_especificacion`, hacer un commit documental único y seguir el flujo de aprobación/merge del repositorio.

## Riesgos, dependencias y preguntas

- Ninguna de las propuestas 059–070 puede fusionarse en `main` antes de que esta se apruebe; pueden redactarse/revisarse en paralelo, pero no implementarse.
- Si el usuario cambia un rango o regla ya usado como ejemplo en `GUIA_MOTOR_GENERACION.md` §21 (caso de referencia ilustrativo), ese fixture deberá revisarse al implementar la propuesta 063 o 064 correspondiente.
- Si alguna decisión requiere más contexto del que el usuario tiene disponible ahora, dejarla explícitamente pendiente en `README.md` (no aprobar "por defecto") y anotar el bloqueo en `CONTEXTO.md`.
