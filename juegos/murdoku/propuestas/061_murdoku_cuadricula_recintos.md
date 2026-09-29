# Propuesta 061 — Murdoku: cuadrícula y recintos variables (bloque 3 del plan)

**Estado:** Borrador
**Fecha:** 2026-09-29
**Responsable:**

## Problema y objetivo

Cada partida necesita una cuadrícula `N×N` dividida en salas conectadas, de forma y tamaño variables mediante semilla, legibles y validadas antes de decorarse con objetos. Esta propuesta implementa `BoardBuilder`/`createTopology` (celdas, crecimiento de salas, validación de forma) sin objetos ni personas todavía.

## Alcance

- Incluye: matriz de celdas, vecinos ortogonales, elección y crecimiento de salas, validación de conectividad/tamaño/forma, nombres de sala y terreno, según `PLAN.md` bloque 3.
- No incluye:
  - Colocar objetos ni calcular ocupabilidad final (propuesta 062).
  - Colocar personas ni derivar pistas (propuestas 063–064).
  - Definir los nombres/temas de contenido final si el catálogo original todavía no está aprobado en la propuesta 058 (tarea 3.13 puede quedar con nombres provisionales documentados como tales).

## Requisitos y decisiones

1. **Bloqueo previo.** Depende de la propuesta 059 (tipos `Cell`/`Room`) y 060 (flujo `map` del PRNG).
2. **Algoritmo obligatorio.** Seguir el pseudocódigo `createTopology(config, mapRng)` de `GUIA_MOTOR_GENERACION.md` §6.1 (crecimiento por rondas, orden estable de salas, `mapRng.pick` con `intBelow`). No usar `Math.random()` ni un orden de recorrido no determinista.
3. **Métrica de forma.** Implementar `aspectRatioOf`/`compactnessOf`/`isRoomShapeAcceptable` exactamente como en `GUIA_MOTOR_GENERACION.md` §6.2; los límites `maxAspectRatio`/`minCompactness` deben venir de un valor aprobado en README, no inventarse aquí.
4. **Reintentos.** Si una tentativa de topología queda con celdas sin asignar o incumple la forma aceptable, descartar la tentativa completa (no remendar una sala) y reintentar con un límite de intentos, según README §6.1 puntos 4 y 7 y `GUIA_MOTOR_GENERACION.md` §6.1.
5. **Fixture de referencia.** El tablero de 3 salas rectangulares de `GUIA_MOTOR_GENERACION.md` §21.1 es solo ilustrativo (fijo, sin generador); no es la salida esperada de `createTopology`, pero sirve para probar `PuzzleValidator` sobre una topología ya construida.

## Criterios de aceptación

- [ ] La salida es una cuadrícula `N×N` completa (todas las celdas asignadas a una sala) para cada semilla probada dentro del rango aprobado de `N`.
- [ ] Cada sala es conexa por adyacencia ortogonal y no hay ninguna celda con `roomId` inválido.
- [ ] `Room.cellIds` y `Cell.roomId` son coherentes en ambos sentidos.
- [ ] Las salas fuera de los límites de tamaño o de la métrica de forma provocan el descarte de toda la tentativa, no un remiendo parcial.
- [ ] La misma semilla y configuración producen siempre la misma topología (mapa, salas, nombres y terreno).

## Tareas

- [ ] **3.1** Crear la matriz de `N × N` celdas vacías con coordenadas estables.
- [ ] **3.2** Implementar vecinos ortogonales de una celda.
- [ ] **3.3** Elegir un número de recintos permitido para `N` mediante el flujo `map`.
- [ ] **3.4** Elegir semillas iniciales de crecimiento de recintos.
- [ ] **3.5** Expandir un recinto añadiendo solo una celda vecina libre.
- [ ] **3.6** Asignar las celdas libres hasta cubrir la cuadrícula completa.
- [ ] **3.7** Comprobar que cada celda pertenece a un solo recinto.
- [ ] **3.8** Comprobar que cada recinto es conexo.
- [ ] **3.9** Rechazar recintos menores que el mínimo aprobado.
- [ ] **3.10** Rechazar recintos mayores que el máximo aprobado.
- [ ] **3.11.1** Implementar `aspectRatioOf(room)` y `compactnessOf(room)` como funciones puras, según `GUIA_MOTOR_GENERACION.md` §6.2.
- [ ] **3.11.2** Implementar `isRoomShapeAcceptable(room, limits)` comparando ambas métricas contra los límites que apruebe README.
- [ ] **3.11.3** Integrar `isRoomShapeAcceptable` en el bucle de reintentos: si alguna sala la incumple, descartar la tentativa completa de tablero, no solo esa sala.
- [ ] **3.12** Volver a generar una partición rechazada con un límite de intentos.
- [ ] **3.13** Elegir nombres originales de recinto sin duplicados dentro del tablero.
- [ ] **3.14** Asignar un tipo de terreno válido a cada celda.
- [ ] **3.15** Validar de nuevo la coherencia entre `Room.cellIds` y `Cell.roomId`.
- [ ] Actualizar `PLAN.md` (marcar bloque 3) y `CONTEXTO.md` con el resultado y las comprobaciones ejecutadas.
- [ ] Crear rama `feature/061_murdoku_cuadricula_recintos`, commits atómicos, y seguir el flujo de aprobación/merge del repositorio.

## Riesgos, dependencias y preguntas

- El crecimiento por rondas puede dejar celdas aisladas en tableros pequeños con muchas salas; medir la tasa de reintentos con `N` mínimo antes de asumir que el límite de intentos es suficiente.
- Los valores de `minRoomSize`/`maxRoomSize`/`maxAspectRatio`/`minCompactness` no están fijados todavía: si la propuesta 058 no los aprobó con números concretos, esta propuesta queda bloqueada en las tareas 3.9, 3.10 y 3.11.2 hasta obtenerlos.
- Los nombres de sala de esta propuesta pueden ser provisionales si el catálogo de arte original (bloque 10) aún no está aprobado; documentarlo explícitamente para no confundirlo con contenido final.
