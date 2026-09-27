# Propuesta 043: Generación automática de casos y tableros visuales para Murdoku

**Estado:** En revisión
**Fecha:** 2026-09-27
**Responsable:**

## Problema y objetivo

Se quiere añadir a la colección un juego de deducción inspirado en el formato de Murdoku. Para disponer de partidas rejugables sin un catálogo cerrado de casos escritos a mano, cada partida se generará automáticamente. El generador deberá producir conjuntamente un caso lógico resoluble y su representación visual: cuadrícula, recintos, formas y límites, terreno, objetos y elementos temáticos.

El resultado será una experiencia propia para uso personal. El sitio sigue siendo estático y compatible con GitHub Pages. Las reglas detalladas se definirán en la especificación del juego después de aprobar esta propuesta.

## Alcance

- Incluye:
  - Definir y documentar las reglas originales del juego de deducción, sus pistas, restricciones espaciales, ocupación de celdas y condición de resolución.
  - Diseñar una generación determinista mediante semilla que produzca tanto la solución/caso como un tablero visual coherente con sus reglas.
  - Generar tableros con regiones conectadas y legibles, límites visuales, terreno, objetos y ocupantes previstos por el modelo; excluir de la colocación las celdas que el modelo declare no ocupables.
  - Derivar las pistas de una solución generada y verificar con un solucionador que el caso tiene exactamente una solución; descartar y volver a generar candidatos ambiguos o inválidos.
  - Definir una progresión inicial de tamaño/dificultad, empezando por un tablero pequeño validable y dejando prevista su ampliación a tableros grandes.
  - Especificar la interacción: elegir personaje, colocar/quitar, X, deshacer, notas, ayuda/pista, envío y respuesta de victoria/error.
  - Incorporar ayuda contextual al pasar el cursor sobre personas y casillas; definir alternativas accesibles para teclado y pantallas táctiles.
  - Evaluar y documentar preferencias básicas y avanzadas observadas en la referencia (p. ej., apariencia, animación, resaltados, etiquetas, texturas y tamaños), acordando cuáles entran en la primera versión.
  - Usar ilustraciones y pistas originales. La web de referencia sirve para estudiar la dinámica y el lenguaje visual general, no para copiar sus recursos gráficos, textos de casos ni código.
- No incluye:
  - Implementar código de juego antes de aprobar reglas y criterios de esta propuesta.
  - Reproducir exactamente Murdoku, sus niveles, personajes, ilustraciones, interfaz o textos protegibles.
  - Backend, cuentas, sincronización, estadísticas remotas, compras o comercialización.
  - Prometer un número matemáticamente infinito de tableros únicos: el objetivo es generar partidas bajo demanda sin depender de una lista cerrada; la diversidad efectiva dependerá del espacio de semillas, parámetros y contenido.

## Requisitos y decisiones

1. **Generación conjunta.** Una partida no se limita a distribuir personajes sobre un mapa fijo. El proceso debe construir la estructura espacial y visual del tablero, poblarla con elementos válidos y producir el caso lógico correspondiente.
2. **Coherencia entre capas.** La geometría de regiones, sus etiquetas/identidades, los obstáculos y objetos, las celdas ocupables y las pistas deben compartir un modelo de datos único; ninguna pista puede referirse a un elemento que no exista en el tablero.
3. **Solución garantizada.** El generador conserva una solución testigo, deriva pistas de ella y ejecuta un solucionador de restricciones para aceptar solo casos con exactamente una solución. Los detalles de rendimiento, límites de reintentos y política de fallo se resolverán en diseño técnico.
4. **Semilla reproducible.** La misma semilla y versión del generador deben recrear el mismo caso; debe poder compartirse o repetirse una partida mediante su identificador/semilla.
5. **Dificultad medible.** Se deberá proponer una forma verificable de clasificar dificultad (tamaño y métricas del proceso de resolución, entre otras), evitando etiquetar dificultad basándose solo en la cantidad de pistas.
6. **Interacción entendible.** Personas y casillas proporcionan tooltips contextuales con información útil. Los mismos datos estarán disponibles sin hover, mediante foco/teclado y controles apropiados para táctil.
7. **Preferencias.** Antes de decidir su implementación, se catalogarán las opciones básica y avanzada de la referencia y se propondrá subconjunto de primera versión, valores iniciales, persistencia local y comportamiento responsivo. No se exige paridad completa.
8. **Arte.** Se desarrollará una dirección visual propia y se especificarán los recursos originales necesarios. No se extraerán ni reutilizarán assets del sitio de referencia.
9. **Arquitectura del sitio.** Archivos estáticos con rutas relativas compatibles con raíz local y prefijo GitHub Pages; sin servidor requerido en primera versión.
10. **Especificación antes de código.** Tras aprobar esta propuesta, crear los documentos propios del juego (`README.md`, `PLAN.md`, `CONTEXTO.md`) y aprobar reglas detalladas antes de implementar la generación.

## Criterios de aceptación

- [ ] La especificación del juego describe reglas, vocabulario y límites sin depender de los textos o casos de la referencia.
- [ ] El diseño del generador representa en un modelo coherente la geometría visual, regiones, elementos/obstáculos, ocupabilidad, personajes, pistas y solución.
- [ ] La generación visual produce tableros legibles y reproducibles por semilla; la geometría generada es válida según reglas aprobadas.
- [ ] Cada caso aceptado tiene una solución conocida y el solucionador confirma que es la única.
- [ ] Casos inválidos, sin solución o ambiguos se rechazan de forma controlada sin bloquear la interfaz.
- [ ] Las clases de dificultad y su criterio están documentados y pueden comprobarse.
- [ ] Los tooltips de persona y casilla comunican su información; la información también se puede consultar con teclado y táctil.
- [ ] La propuesta de preferencias distingue opciones básicas y avanzadas y especifica las que se incluirán en primera versión.
- [ ] El tablero y la interacción se adaptan a escritorio y móvil y siguen funcionando bajo GitHub Pages sin backend.
- [ ] Los recursos visuales y el contenido de casos son originales.

## Tareas

- [ ] Revisar esta propuesta y confirmar el alcance de generación visual y lógica.
- [ ] Crear `README.md`, `PLAN.md` y `CONTEXTO.md` de Murdoku después de aprobar el alcance.
- [ ] Formalizar reglas, tipos de pistas, roles, regiones, objetos, adyacencia, ocupabilidad y condición de resolución; revisar contradicciones antes de aprobarlas.
- [ ] Diseñar representación y algoritmo de generación de geometría/recintos/tablero visual con semillas reproducibles.
- [ ] Diseñar el modelo de restricciones, generación de solución y pistas, solucionador de unicidad y clasificación de dificultad.
- [ ] Diseñar controles de partida, tooltips, ayuda, historial y preferencias con alternativas teclado/táctil.
- [ ] Definir dirección de arte propia y lista de assets originales.
- [ ] Descomponer la implementación en entregas pequeñas y criterios verificables en el plan del juego.
- [ ] Solo después de aprobar la especificación funcional, implementar, revisar y publicar siguiendo el flujo Git del repositorio.

## Riesgos, dependencias y preguntas

- La generación de mapas atractivos y conectados con solución única puede requerir muchas tentativas; el diseño debe medir coste y establecer límites y fallback legibles.
- Los casos de tamaño experto son costosos de resolver en el navegador; conviene empezar con tamaños reducidos y perfilar antes de escalar.
- Las reglas exactas de una versión propia (incluido qué significa recinto, adyacencia, roles y pistas válidas) quedan por definir en la especificación y no se presuponen a partir de un nivel observado.
- La semilla garantiza repetibilidad solo dentro de una versión de algoritmo identificada; debe guardarse también su versión.
- Referencias consultadas para estudiar reglas y dinámica: [caso oficial de zoológico](https://murdoku.com/pdf/the-zoo-bw.pdf) y [solución publicada](https://murdoku.com/pdf/the-zoo-solution.pdf). La propuesta no adopta literalmente su contenido.
