# Propuesta 060 — Murdoku: semillas y reproducibilidad (bloque 2 del plan)

**Estado:** Borrador
**Fecha:** 2026-09-29
**Responsable:**

## Problema y objetivo

Todo el motor depende de que "misma semilla + misma configuración + misma versión" produzca siempre el mismo caso. Esta propuesta implementa el PRNG determinista, sus flujos independientes por módulo (mapa, objetos, personas/solución, pistas) y la normalización de enlaces compartibles, sin generar todavía ningún contenido de partida.

## Alcance

- Incluye: el PRNG, sus operaciones sin sesgo, los flujos independientes por módulo y el manejo de enlaces compartidos descritos en `PLAN.md` bloque 2.
- No incluye:
  - Usar esos flujos para generar mapa, objetos, personas o pistas reales (propuestas 061–064): aquí solo se construye el generador de números y su derivación de flujos.
  - Cambiar el algoritmo PRNG recomendado (`xoshiro128**` + SHA-256) salvo que la propuesta 058 lo haya sustituido explícitamente.

## Requisitos y decisiones

1. **Bloqueo previo.** Depende de la propuesta 059 (tareas 1.1 y 1.10: tipos de configuración y de versión) y de que la propuesta 058 haya cerrado el punto de PRNG/formato de semilla de `GUIA_MOTOR_GENERACION.md` §18.
2. **Algoritmo obligatorio.** Implementar exactamente el diseño de `GUIA_MOTOR_GENERACION.md` §5.2 (`xoshiro128**` de 32 bits, semilla de 128 bits vía `crypto.getRandomValues`, derivación de subflujos con SHA-256 y prefijos de longitud) y §5.3 (`nextUint32`, `intBelow`, `pick`, `shuffle` sin sesgo). No sustituir `intBelow` por `floor(randomFloat * bound)`.
3. **Nombres de flujo fijos.** Usar los nombres de flujo `map`, `people`, `witness`, `objects`, `case`, `clues` tal como los fija `GUIA_MOTOR_GENERACION.md` §5.2 punto 4; no crear flujos adicionales sin actualizar esa sección primero.
4. **Fallo de `crypto`.** Si `crypto.getRandomValues`/`crypto.subtle.digest` no están disponibles, devolver `RANDOM_SOURCE_UNAVAILABLE` (contrato de `GUIA_MOTOR_GENERACION.md` §3.2); no usar `Math.random()` como alternativa silenciosa.
5. **Enlaces compartidos.** El formato de enlace es `{v, r, seed, n, p, tier}` según `README.md` §6.3 y `GUIA_MOTOR_GENERACION.md` §3.1; una versión no soportada debe dar un error claro, no generar una partida distinta en su lugar.

## Criterios de aceptación

- [ ] Semilla + configuración + versión producen las mismas elecciones en llamadas repetidas (verificable con un vector de prueba fijo).
- [ ] Cada módulo (`map`, `people`, `witness`, `objects`, `case`, `clues`) consume un flujo derivado independiente; cambiar el consumo de un flujo no desplaza la secuencia de otro.
- [ ] `intBelow`, `pick` y `shuffle` no muestran sesgo perceptible frente a `nextUint32()` puro (probar con una distribución de muestras).
- [ ] Un enlace compartido incompleto, malformado o con versión no soportada muestra un mensaje legible y no genera una partida alternativa.
- [ ] Si `crypto` no está disponible, el motor devuelve `RANDOM_SOURCE_UNAVAILABLE` en vez de lanzar una excepción no controlada o recurrir a `Math.random()`.

## Tareas

- [ ] **2.1** Implementar una función hash estable para convertir el texto de semilla en estado inicial.
- [ ] **2.2** Implementar una operación del PRNG con resultado entero documentado.
- [ ] **2.3** Implementar selección reproducible de un elemento de una lista.
- [ ] **2.4** Implementar mezcla/permutación reproducible de una lista.
- [ ] **2.5** Crear un flujo aleatorio independiente para el mapa.
- [ ] **2.6** Crear un flujo aleatorio independiente para los objetos.
- [ ] **2.7** Crear un flujo aleatorio independiente para personas y solución.
- [ ] **2.8** Crear un flujo aleatorio independiente para pistas.
- [ ] **2.9** Normalizar el formato serializado de semilla y versión.
- [ ] **2.10** Leer parámetros compartidos `v`, `seed`, `n`, `p` y nivel.
- [ ] **2.11** Rechazar enlaces incompletos o malformados con mensaje legible.
- [ ] **2.12** Mostrar error cuando la versión del generador del enlace no se admite.
- [ ] Actualizar `PLAN.md` (marcar bloque 2) y `CONTEXTO.md` con el resultado y las comprobaciones ejecutadas.
- [ ] Crear rama `feature/060_murdoku_semillas_reproducibilidad`, commits atómicos, y seguir el flujo de aprobación/merge del repositorio.

## Riesgos, dependencias y preguntas

- Un error de implementación en `xoshiro128**` (rotación, `Math.imul`, `>>> 0`) puede pasar inadvertido si no se comparan los vectores de salida contra una referencia conocida; incluir ese vector de prueba como parte de esta propuesta, no como una tarea futura.
- Los despliegues previstos son GitHub Pages (HTTPS) y servidor local (HTTP en `localhost`); confirmar que `crypto.subtle` está disponible en ambos antes de cerrar esta propuesta.
- Si la propuesta 058 cambia el algoritmo PRNG recomendado, esta propuesta debe reabrirse antes de continuar con 061–064.
