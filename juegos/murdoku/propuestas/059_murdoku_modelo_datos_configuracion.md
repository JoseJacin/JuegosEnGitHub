# Propuesta 059 — Murdoku: modelo de datos y validación de configuración (bloque 1 del plan)

**Estado:** Borrador
**Fecha:** 2026-09-29
**Responsable:**

## Problema y objetivo

Antes de generar un caso hace falta un modelo de datos tipado y estable: configuración de partida, celda, sala, objeto, persona, átomo de pista, solución y estado de jugador. Sin estos tipos, ninguna otra pieza del motor (semillas, mapa, objetos, solucionador, pistas, interfaz) tiene un contrato común al que atenerse. Esta propuesta crea únicamente los tipos y su validación de entrada; no genera todavía ningún contenido.

## Alcance

- Incluye: los tipos y validaciones descritos en `PLAN.md` bloque 1 (`PuzzleConfig`, `Cell`, `Room`, `ObjectInstance`, `Person`, `ClueAtom`, `Solution`, `PlayerState`, versiones de esquema/generador/clasificador, y la validación de `N`, `P` y dificultad solicitada).
- No incluye:
  - Implementar el PRNG ni las semillas (propuesta 060).
  - Generar celdas, salas, objetos, personas o pistas reales (propuestas 061–064): aquí solo se definen los tipos que esos módulos usarán.
  - Añadir miembros de `ClueAtom` para familias no aprobadas todavía en la tarea 0.7/0.8 (propuesta 058).

## Requisitos y decisiones

1. **Bloqueo previo.** No empezar hasta que la propuesta 058 (bloque 0) esté aprobada y fusionada: los rangos de `N`/`P`, la política de fila/columna y las familias de pista de la primera versión deben estar decididos antes de fijar estos tipos.
2. **Fuente de contratos.** El modelo de datos exacto está en `README.md` §5 ("Modelo de datos lógico") y en `GUIA_MOTOR_GENERACION.md` §3.3 (`PuzzleDefinition`/`PlayerState`) y §9.1 (`ClueDefinition`/`ClueAtom`/`RenderedClue`). No inventar campos nuevos ni renombrar los ya definidos allí.
3. **Coordenadas y IDs.** Usar coordenadas 1-based (`row=1` norte, `column=1` oeste) e IDs derivados de versión/semilla/etapa/ordinal según `GUIA_MOTOR_GENERACION.md` §3.3 punto 5; no usar UUID aleatorio.
4. **`ClueAtom` por fases.** Seguir exactamente la división de `PLAN.md` 1.7.1–1.7.6: cada subtarea añade un grupo pequeño de miembros a la unión discriminada; no añadir en una sola subtarea miembros de más de un grupo.
5. **Fixture de referencia.** Contrastar los tipos resultantes contra el caso ilustrativo de `GUIA_MOTOR_GENERACION.md` §21 antes de cerrar esta propuesta: los datos de ese fixture deben poder representarse sin adaptar el tipo.

## Criterios de aceptación

- [ ] Cada dato de dominio (`PuzzleConfig`, `Cell`, `Room`, `ObjectInstance`, `Person`, `ClueAtom`, `Solution`, `PlayerState`) tiene un tipo claro y documentado en el código.
- [ ] Las decisiones de rango/regla aprobadas en la propuesta 058 no quedan escondidas en el render: están representadas como datos de configuración o de tipo.
- [ ] Una configuración con `N`/`P`/dificultad inválidos se rechaza antes de llegar al generador, con un error legible por cada valor inválido.
- [ ] `Clue.scope` (`PERSON`/`GLOBAL`/`SCENARIO`) existe como campo independiente de la familia del predicado (`kind`), y su validación exige sujeto en `PERSON` y contrato de argumentos correcto en `GLOBAL`/`SCENARIO`.
- [ ] El fixture de `GUIA_MOTOR_GENERACION.md` §21 se puede representar con estos tipos sin modificarlos.

## Tareas

- [ ] **1.1** Definir los tipos de `PuzzleConfig` (`N`, `P`, dificultad solicitada).
- [ ] **1.2** Definir tipos/IDs de celda, sala, objeto, persona, pista y semilla.
- [ ] **1.3** Definir el tipo de datos `Cell` con fila, columna, sala, terreno y ocupabilidad.
- [ ] **1.4** Definir el tipo `Room` con nombre, tema y lista de celdas.
- [ ] **1.5** Definir `ObjectInstance` con tipo, huella de celdas y ocupabilidad.
- [ ] **1.6** Definir `Person` con ID, etiqueta, rol y retrato.
- [ ] **1.7** Definir el tipo discriminado `ClueAtom` como unión con el envoltorio común (`kind`, `subjectPersonId?`, argumentos tipados) y sin miembros todavía; los miembros concretos se añaden en 1.7.1–1.7.6.
- [ ] **1.7.1** Añadir los miembros de pertenencia a sala: `ROOM_IS`, `ROOM_IN_SET`.
- [ ] **1.7.2** Añadir los miembros de fila/columna exacta: `ROW_IS`, `COLUMN_IS`.
- [ ] **1.7.3** Añadir los miembros de desplazamiento y orden direccional: `ROW_OFFSET`, `COLUMN_OFFSET`, `DIRECTIONAL_ORDER`.
- [ ] **1.7.4** Añadir los miembros de objeto y adyacencia: `OBJECT_IS`, `ADJACENT_TO_OBJECT`, `ADJACENT_TO_PERSON`.
- [ ] **1.7.5** Añadir los miembros de relación social: `ALONE_IN_ROOM`, `ALONE_WITH`, `SAME_ROOM_AS`.
- [ ] **1.7.6** Añadir los miembros lógicos compuestos aprobados para esta fase por la tarea 0.7 (como mínimo `AND`, `NOT`); no añadir `OR_INCLUSIVE`, `XOR`, `UNIQUE_MATCH` ni `COUNT_*` hasta que 0.7/0.8 los incluyan explícitamente en esta fase.
- [ ] **1.8** Definir `Solution` como asignación de persona a celda y culpable.
- [ ] **1.9** Definir `PlayerState` separado de la definición inmutable del caso.
- [ ] **1.10** Definir las versiones de esquema, generador y clasificador.
- [ ] **1.11** Validar que `N` esté dentro del rango aprobado.
- [ ] **1.12** Validar que `P` esté dentro del rango aprobado y cumpla la relación con `N`.
- [ ] **1.13** Validar que la dificultad solicitada sea una opción conocida.
- [ ] **1.14** Mostrar un error de configuración legible para cada valor inválido.
- [ ] **1.15** Añadir `scope` (`PERSON`, `GLOBAL`, `SCENARIO`) al tipo `Clue` sin confundirlo con la familia del predicado.
- [ ] **1.16** Validar que `PERSON` tenga sujeto existente y que `GLOBAL`/`SCENARIO` usen el contrato de argumentos correspondiente.
- [ ] Actualizar `PLAN.md` (marcar bloque 1) y `CONTEXTO.md` con el resultado y las comprobaciones ejecutadas.
- [ ] Crear rama `feature/059_murdoku_modelo_datos_configuracion`, commits atómicos, y seguir el flujo de aprobación/merge del repositorio.

## Riesgos, dependencias y preguntas

- Si al implementar 1.7.x aparece un predicado del inventario de `README.md` §3.3 que no encaje en ninguno de los seis grupos, detener esa subtarea y proponer un grupo nuevo en `PLAN.md` antes de continuar.
- Cambiar estos tipos más adelante (por ejemplo al activar una familia del bloque 12) obliga a incrementar `schemaVersion`; dejar constancia de esa regla en el propio código de versión.
- Ninguna decisión de rango o regla debe fijarse aquí "a ojo": si la propuesta 058 dejó algo sin cerrar, esta propuesta queda bloqueada en ese punto concreto, no se avanza adivinando.
