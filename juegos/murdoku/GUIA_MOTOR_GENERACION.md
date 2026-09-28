# Guía técnica del motor de generación de Murdoku

**Estado:** propuesta técnica detallada; pendiente de revisión.
**Autoridad funcional:** [`README.md`](README.md).
**Tareas de implementación:** [`PLAN.md`](PLAN.md).
**Alcance aprobado:** [propuesta 043](propuestas/043_murdoku_generacion_visual.md).

## 1. Para qué sirve esta guía

Esta guía explica cómo construir el motor que produce cada partida, para que las tareas puedan ejecutarse en pasos pequeños y sin que un implementador tenga que deducir arquitectura a partir de la interfaz.

Separa tres tipos de decisión:

- **Regla funcional:** solo se obtiene de `README.md`. Las reglas marcadas «Decisión por aprobar» bloquean el código afectado.
- **Diseño técnico recomendado:** algoritmo o contrato sugerido aquí para que los módulos encajen. Puede cambiarse si el cambio se documenta y no altera las reglas aprobadas.
- **Decisión de implementación pendiente:** aparece explícitamente como pendiente y no se debe resolver de forma silenciosa.

La guía no introduce nuevas reglas de juego ni autoriza a empezar código antes de aprobar el borrador funcional. El generador es local, determinista por semilla, estático y compatible con GitHub Pages; no necesita backend.

## 2. Qué entra y qué queda fuera del motor

El **motor de generación** recibe configuración, semilla y versión; devuelve una definición de puzzle validada y sus métricas. No dibuja HTML/SVG, no lee preferencias visuales y no conoce el estado de las anotaciones del jugador.

Responsabilidades separadas:

| Módulo lógico | Responsabilidad | No debe hacer |
|---|---|---|
| `ConfigValidator` | Comprobar y normalizar configuración. | Corregir valores cambiándolos sin informar. |
| `SeededRandom` | Dar números y elecciones repetibles. | Leer `Math.random()` durante la generación reproducible. |
| `BoardBuilder` | Crear celdas, regiones, nombres y terreno. | Dibujar DOM, decidir pistas o saber quién es el asesino. |
| `ObjectPlacer` | Colocar objetos y calcular ocupabilidad. | Alterar una celda solución para volverla no ocupable. |
| `WitnessBuilder` | Hallar una distribución válida de personas que sirva como solución testigo. | Suponer que una solución testigo implica que el puzzle es único. |
| `ClueFactory` | Derivar predicados verdaderos y frases tipadas desde la solución. | Crear texto libre o afirmar pistas no comprobadas. |
| `ConstraintSolver` | Contar soluciones completas hasta dos. | Asignar nivel humano solo por su velocidad de búsqueda. |
| `HumanStepSolver` | Intentar una deducción explicable a la vez. | Contar una suposición de búsqueda como deducción lógica. |
| `PuzzleValidator` | Revisar invariantes del tablero, contenido y solución. | Modificar una definición inválida para hacerla pasar. |
| `PuzzleRenderer` | Convertir el modelo validado en presentación. | Ser la fuente de verdad de filas, salas u ocupabilidad. |

Los nombres de módulo son roles lógicos sugeridos. Los archivos y exports exactos se deciden al implementar la tarea correspondiente del plan; no crear una arquitectura por capas entera en una sola tarea.

## 3. Contrato público de generación

### 3.1 Entrada

El motor consume un objeto inmutable conceptualmente equivalente a:

```text
GenerationRequest
  config:
    gridSize: integer                 // N; dimensión N×N
    personCount: integer              // P; incluye a la víctima
    requestedDifficulty: tier | "any"
    rulesVersion: string
  seed: string
  generatorVersion: string
  limits:
    maxMapAttempts: integer
    maxWitnessAttempts: integer
    maxClueAttempts: integer
    deadlineMs: integer
```

`limits` son un detalle interno del generador y no cambian la configuración elegida. Sus valores iniciales todavía se deben decidir y perfilar. Los límites deben ser positivos y finitos.

### 3.2 Resultado

El motor devuelve una unión de resultados tipados:

```text
GenerationOutcome
  Success:
    puzzle: PuzzleDefinition
    stats: GenerationStats
  Failure:
    code: INVALID_CONFIG | UNSUPPORTED_VERSION | CANCELLED |
          MAP_SEARCH_EXHAUSTED | WITNESS_SEARCH_EXHAUSTED |
          CLUE_SEARCH_EXHAUSTED | DIFFICULTY_NOT_FOUND | DEADLINE_EXCEEDED |
          RANDOM_SOURCE_UNAVAILABLE
    stage: string
    safeMessageKey: string
    diagnostics: GenerationDiagnostics
```

La UI usa `safeMessageKey` para explicar qué pasó y ofrecer acciones. `diagnostics` no contiene solución ni texto interno de búsqueda en la interfaz ordinaria. Una partida fallida nunca se devuelve parcialmente como si fuese jugable.

### 3.3 `PuzzleDefinition` y estados separados

La forma detallada está en [`README.md` §5](README.md#5-modelo-de-datos-lógico). Reglas para implementarla:

1. `PuzzleDefinition` describe el caso generado y no cambia durante la partida.
2. `PlayerState` contiene colocaciones tentativas, X, notas, historial, tiempo y preferencias de sesión; no se mezcla con la solución.
3. `Solution` se guarda separada de pistas visibles para reducir revelaciones accidentales. Una web estática no puede protegerla frente a inspección del cliente.
4. Las relaciones usan IDs estables. Las pistas nunca guardan referencias solo como índices visuales o fragmentos de texto.
5. Los identificadores se derivan de versión/semilla/etapa/ordinal, por ejemplo `room-03` o `person-07`; no usar UUID aleatorio.
6. Coordenadas canónicas son 1-based (`row=1` norte, `column=1` oeste). El array plano se indexa con `(row - 1) * N + (column - 1)`.
7. No duplicar valores que pueden divergir. Por ejemplo, si se almacena `Cell.roomId` y `Room.cellIds`, `PuzzleValidator` comprueba que ambos sentidos coinciden.

## 4. Flujo de extremo a extremo

### 4.1 Algoritmo principal

Este pseudocódigo fija el orden y el contrato. No fija todavía cifras de reintentos ni resuelve reglas abiertas:

```text
async function generate(request, cancellationToken, reportProgress): GenerationOutcome
  config = ConfigValidator.normalize(request.config, request.rulesVersion)
  if config is invalid: return INVALID_CONFIG
  if request.generatorVersion is unsupported: return UNSUPPORTED_VERSION

  try:
    random = await SeededRandom.create(request.seed, request.generatorVersion,
                                       request.rulesVersion, config)
  catch cryptoUnavailable:
    return RANDOM_SOURCE_UNAVAILABLE

  for mapAttempt from 0 to limits.maxMapAttempts - 1:
    if cancellationToken.cancelled: return CANCELLED
    if deadline exceeded: return DEADLINE_EXCEEDED
    reportProgress("map", mapAttempt)

    topologyRng = await random.stream("map", [mapAttempt])
    topology = BoardBuilder.createTopology(config, topologyRng)
    if not PuzzleValidator.validTopology(topology): continue

    people = PersonFactory.create(config.personCount,
                                  await random.stream("people", [mapAttempt]))
    witness = NONE
    for witnessAttempt from 0 to limits.maxWitnessAttempts - 1:
      if cancellationToken.cancelled: return CANCELLED
      if deadline exceeded: return DEADLINE_EXCEEDED
      witnessRng = await random.stream("witness", [mapAttempt, witnessAttempt])
      witness = WitnessBuilder.find(topology, people, config, witnessRng)
      if witness exists: break
    if witness does not exist: continue

    board = ObjectPlacer.decorate(topology, witness,
                                  await random.stream("objects", [mapAttempt]))
    if not PuzzleValidator.validBoard(board, config, witness): continue

    case = CaseBuilder.create(board, people, witness, config,
                              await random.stream("case", [mapAttempt]))
    if case is invalid: continue

    cluePool = ClueFactory.deriveTrueCandidates(case, witness)
    clueRng = await random.stream("clues", [mapAttempt])
    clues = ClueSelector.buildUniqueSet(case, cluePool, limits, clueRng)
    if clues are not unique: continue

    rating = HumanStepSolver.rate(case.with(clues), witness)
    if rating is unsupported: continue
    if requestedDifficulty != "any" and rating.tier != requestedDifficulty:
      continue

    puzzle = PuzzleDefinition(board, people, clues, witness, rating, versions, seed)
    validation = PuzzleValidator.validateComplete(puzzle)
    if validation failed: continue
    return Success(puzzle, accumulatedStats)

  if at least one otherwise-valid puzzle missed the requested tier:
    return DIFFICULTY_NOT_FOUND
  return failure for the last exhausted generation stage, with its stage-specific code
```

Cada llamada a `random.stream(...)` usa SHA-256 y puede fallar igual que `SeededRandom.create(...)`; la implementación debe convertir esos errores de Web Crypto en `RANDOM_SOURCE_UNAVAILABLE` en el límite de `generate`, no dejar rechazos de promesa sin manejar. Cada etapa registra qué causa de rechazo observó para que el resultado final distinga agotamiento de mapa/testigo/pistas y ausencia del nivel solicitado. Cancelación y plazo vencido retornan inmediatamente y tienen prioridad sobre el agotamiento normal.

El pseudocódigo es una referencia de responsabilidades; el orden fino entre elegir persona, solución y decorar puede adaptarse. Se mantiene la invariante: los objetos no pueden invalidar posiciones ya reservadas como testigo, salvo que se representen expresamente como ocupables.

### 4.2 Por qué usar una solución testigo

El motor necesita una distribución conocida para poder generar hechos verdaderos. Esa distribución es un **testigo**, no una prueba de unicidad. Dos comprobaciones distintas son obligatorias:

- `SolutionValidator`: confirma que el testigo cumple todas las reglas y pistas.
- `ConstraintSolver.countUpToTwo`: confirma que no existe otra distribución compatible.

No mostrar una partida que solo “parece resoluble” porque existe el testigo interno.

## 5. Semillas y reproducibilidad

### 5.1 Reglas de determinismo

- La generación recibe siempre una semilla explícita. «Nueva partida» crea una semilla antes de invocar al motor; «reiniciar» conserva la semilla y `generatorVersion` actuales.
- Cada elección aleatoria usa un flujo PRNG con semilla. `Math.random()` no participa dentro del motor.
- Fijar el orden de recorridos: celdas por fila y columna, personas por ID, pistas por clave/ID y empate de solver por reglas documentadas.
- No usar fecha actual, idioma del navegador, orden de claves de un objeto sin normalizar ni resultado del render para decidir el caso.
- La misma tupla `(seed, generatorVersion, rulesVersion, config)` produce la misma definición lógica en navegadores compatibles.
- Un cambio que altere resultados incrementa `generatorVersion`; un cambio de reglas incrementa `rulesVersion`.
- Los assets gráficos no deben influir en la geometría. Cambiar un retrato no altera salas ni pistas.

### 5.2 PRNG recomendado para la primera implementación

Para que dos LLM no inventen algoritmos distintos, se recomienda fijar en una subtarea una implementación de `xoshiro128**` de 32 bits. Su estado tiene cuatro palabras de 32 bits. Debe implementarse palabra por palabra desde su referencia algorítmica, con operaciones `uint32` explícitas (`>>> 0`, `Math.imul`, rotación), y acompañarse de vectores de salida conocidos antes de usarse en el generador.

La semilla debe conservar suficiente entropía para no reducir millones de semillas distintas a un hash de 32 bits:

1. Para «nueva partida», generar 128 bits con `crypto.getRandomValues(new Uint8Array(16))` y guardar los 16 bytes como 32 dígitos hexadecimales minúsculos.
2. Si se permite que el usuario escriba una semilla textual, codificarla con `TextEncoder` y normalizarla como `SHA-256(UTF8("MURDOKU-SEED-v1") || UTF8(text))`, truncada a sus primeros 16 bytes. El resultado de 32 dígitos hex es la semilla canónica compartible.
3. Crear un subestado por etapa con SHA-256 sobre una codificación binaria con prefijos de longitud: dominio fijo `MURDOKU-RNG-v1`, los 16 bytes de semilla, `generatorVersion`, `rulesVersion`, configuración canónica (`N`, `P`, nivel solicitado), nombre de flujo, y cada ordinal de intento como entero `uint32be`. Usar los primeros 16 bytes del digest como las cuatro palabras del estado xoshiro128**. Los prefijos de longitud y el orden fijo evitan colisiones por concatenación ambigua.
4. Definir nombres estables de flujo: `map`, `people`, `witness`, `objects`, `case`, `clues`. La creación de IDs, las etiquetas y el render son deterministas y no consumen aleatoriedad.
5. Codificar cada ordinal como lista de enteros (p. ej. `[mapAttempt, witnessAttempt]`) precedida por su longitud; el hash depende del camino de intentos completo.
6. Si las cuatro palabras son cero, sustituirlas por una constante no nula especificada y probada.

`crypto.getRandomValues` solo crea la semilla nueva; repetir una partida vuelve a usar la semilla almacenada. `crypto.subtle.digest("SHA-256", bytes)` se usa para normalizar semilla textual/derivar subflujos y es asíncrono; por eso `SeededRandom.create(...)` y el generador devuelven promesas. Los despliegues previstos son GitHub Pages por HTTPS y servidor local por HTTP en `localhost`. Si la API no está disponible, devolver `RANDOM_SOURCE_UNAVAILABLE` con mensaje recuperable; no cambiar silenciosamente a `Math.random()` ni a un hash de menos bits.

SHA-256 se usa como función de derivación reproducible, no para esconder la solución ni proteger secretos. La guía recomienda el par SHA-256 + xoshiro128** para fijar contratos; si se escoge otro, registrar formato/entropía de semilla, derivación, anchura, overflow, algoritmo PRNG y vectores esperados en el ticket 2.1 antes de implementar.

### 5.3 Operaciones aleatorias sin sesgo evitable

- `nextUint32()` devuelve un entero de `0` a `2^32 - 1` inclusive.
- `intBelow(bound)` exige entero `1 ≤ bound ≤ 2^32`; calcula `limit = 2^32 - (2^32 mod bound)`, vuelve a tomar `nextUint32()` mientras `x ≥ limit` y devuelve `x mod bound`. No usar simplemente `floor(randomFloat * bound)`.
- `pick(items)` falla si la lista está vacía; nunca devuelve `undefined` silenciosamente.
- `shuffle(items)` usa Fisher–Yates y `intBelow(i+1)` para cada índice decreciente.
- Derivar flujo hijo por etiqueta/ordinal, no compartir un único estado para todos los módulos. Así añadir variedad de retratos no desplaza la secuencia de crecimiento del mapa.
- Evitar colisiones de semillas consecutivas comparando la nueva semilla con la actual/configuración actual y volviendo a derivar si coinciden. No prometer que ninguna característica del tablero se repita jamás.

## 6. Construcción de mapa visual

### 6.1 Crear topología antes del arte

El resultado inicial es un modelo geométrico; se dibuja más tarde. Para una cuadrícula `N×N`:

1. Crear exactamente `N*N` celdas, en orden de fila principal, con coordenadas enteras.
2. Elegir número de salas `R` dentro de límites que la regla aprobada permita.
3. Asignar un tamaño objetivo a cada sala; la suma debe ser `N*N` y cada tamaño respetar mínimos/máximos.
4. Elegir `R` semillas distintas de celda.
5. Crecer cada sala desde su semilla añadiendo celdas libres vecinas. Toda celda asignada a una sala debe tocar otra celda de esa misma sala, salvo la semilla.
6. Continuar hasta que todas las celdas estén asignadas o no haya expansión válida.
7. Si el crecimiento deja una sala sin posibilidad de completar su tamaño o quedan celdas aisladas, descartar esa tentativa y comenzar otra desde el mismo flujo determinista.
8. Recorrer cada sala con BFS/DFS ortogonal y validar conectividad.
9. Derivar los bordes dibujados comparando `roomId` de celdas vecinas. El borde es una salida visual de la topología, nunca un conjunto de reglas separado.

Una implementación de crecimiento exacta puede usar colas de frontera. Mantener una colección de candidatos sin ordenar vuelve el resultado no reproducible; ordenar antes de barajar o usar una secuencia fija.

### 6.2 Reglas de mapa válido

`BoardValidator` debería verificar en funciones separadas:

- dimensiones positivas y `cells.length === N*N`;
- coordenadas únicas y en rango;
- toda celda tiene exactamente un `roomId` válido;
- cada sala existe, no está vacía y lista cada celda exactamente una vez;
- `Room.cellIds` y `Cell.roomId` se reflejan;
- conectividad ortogonal completa de cada sala;
- tamaño de salas dentro de límites;
- nombres de sala únicos dentro del mapa y referencias de etiquetas válidas;
- topología y bordes calculados en el render no contradicen `roomId`;
- hay posiciones candidatas suficientes bajo las restricciones ya aprobadas.

La compacidad de la forma y su legibilidad pueden ser filtros graduados: por ejemplo, rechazar una sala de una sola celda solo si lo prohíbe la especificación; usar una puntuación de forma para limitar mapas estrechos o fragmentados. No imponer un límite no aprobado como regla funcional.

### 6.3 Variedad sin prometer infinitud literal

La variación puede proceder de particiones, número/forma de salas, nombres/temas, terreno, objetos, personajes, asignación de solución y selección de pistas. Para comprobar que no se está cambiando solo el color, guardar métricas estructurales del candidato: vector de áreas de sala, firmas de adyacencia, celdas/huellas de objetos y posiciones de personas.

El generador no garantiza que dos semillas jamás compartan un elemento o una forma. Debe evitar reutilizar intencionalmente una plantilla estática para cada partida y puede evitar repetir el último `seed + config` en el mismo estado local.

## 7. Colocar objetos sin romper el puzzle

### 7.1 Separar tipo e instancia

Un `ObjectType` pertenece al catálogo de contenido; una `ObjectInstance` es la ocurrencia de ese tipo en una partida.

```text
ObjectType
  typeId
  displayNameKey
  allowedRoomThemeIds[]
  defaultOccupiable
  footprintVariants[]
  clueCapabilities[]
  assetKey

ObjectInstance
  instanceId
  typeId
  cellIds[]
  occupiable
```

`clueCapabilities` solo habilita plantillas soportadas por las reglas; no crea un tipo de pista nuevo.

### 7.2 Orden de decoración recomendado

Para preservar solución:

1. Crear topología y terreno base.
2. Encontrar el testigo en celdas base ocupables.
3. Registrar las celdas que usa el testigo como reservadas.
4. Colocar objetos no ocupables solo en huellas libres no reservadas.
5. Colocar objeto ocupable en una celda reservada solo si el predicado de superficie permite que el testigo siga allí.
6. Recalcular `occupiable` y comprobar que cada ubicación testigo continúa siendo legal.
7. Rechazar solapamientos ilegales y respetar huellas multi-celda.
8. Comprobar que decorar no ha eliminado opciones estructurales necesarias o dejado el mapa visualmente bloqueado.

Si los objetos son necesarios para construir una pista, reservar la celda para ese objeto antes de derivar pistas. Nunca derivar primero una frase y colocar después un objeto que la contradiga.

### 7.3 Celdas ocupables

La ocupabilidad se calcula en una sola función de dominio:

```text
isCellOccupiable(cell, objectInstances, terrainCatalog, rulesVersion)
```

No mantener una copia distinta en el HTML, en el generador de pistas y en la capa de dibujo. El validador debe comprobar que `Cell.occupiable` coincide con el resultado de la función. Un objeto visual que cubre varias celdas debe declarar si ocupa toda la huella o permite pararse en alguna celda concreta; esa regla de catálogo debe estar documentada por tipo.

### 7.4 Feedback al recorrer el tablero

- El hover de una celda obtiene su `roomId` y destaca en azul el contorno completo de esa estancia. En regiones de forma irregular, dibujar solo los segmentos exteriores de las celdas de la estancia: no añadir líneas azules sobre bordes internos compartidos por celdas de la misma estancia.
- La celda activa usa blanco cuando `isCellOccupiable(...)` es `true` y rojo cuando es `false`. Consultar el atributo estático del tablero; no tratar una persona ya colocada como terreno no ocupable.
- Aplicar el mismo feedback al foco de teclado y a la celda activa del flujo táctil. Al salir del hover/foco o cambiar la celda activa, restaurar el estado previo del tablero.
- Estos estilos son una previsualización y no cambian el estado del jugador. El color debe acompañarse de contorno/patrón accesible o del dato textual equivalente.
- Componer estas capas con el resaltado semántico de pistas sin ocultar el límite azul, el estado de ocupabilidad ni el destino de la pista.

## 8. Solución testigo y combinación de posiciones

### 8.1 Elección de posiciones

La construcción del testigo debe respetar todas las restricciones globales ya aprobadas, no elegir ubicaciones de forma completamente independiente.

En el borrador actual se propone `P ≤ N` y como máximo una persona por fila/columna; ambas decisiones siguen abiertas. Al implementar, convertir la regla aprobada en un predicado/configuración, por ejemplo:

```text
placementRules:
  onePersonPerCell: true
  rowPolicy: AT_MOST_ONE | EXACTLY_ONE
  columnPolicy: AT_MOST_ONE | EXACTLY_ONE
```

El algoritmo puede usar backtracking determinista y MRV para colocar personas. Para cada asignación:

1. Empezar con el conjunto de celdas ocupables.
2. Filtrar por sala, objeto, terreno y requisitos de pista ya elegidos.
3. Seleccionar persona/celda con el menor dominio no vacío (desempate por ID y coordenada estable).
4. Asignar, retirar su celda y propagar filas/columnas según la regla configurada.
5. Retroceder solo dentro de un presupuesto finito.
6. Aceptar únicamente si todas las personas están asignadas y se verifican todas las reglas.

### 8.2 Reservar el caso del crimen

Si se aprueba la regla propuesta de “víctima y asesino son los únicos dos ocupantes de la sala”, crear primero ese par:

1. Enumerar pares de celdas ocupables distintas en una misma sala.
2. Descartar pares que compartan fila o columna cuando esas reglas estén activas.
3. Elegir un par reproduciblemente y reservar sala y celdas para víctima y asesino.
4. Colocar las demás personas sin añadir ocupantes a esa sala.
5. Validar que ningún otro sospechoso cumple la condición de asesino.

Si se aprueba una definición distinta del crimen, reemplazar este paso con ese predicado. No duplicar la lógica del asesino en varias etapas.

### 8.3 Búsqueda de testigo frente a solución del puzzle

El testigo es conocido durante generación, pero se oculta de la vista de juego. Antes de aceptar el caso, una instancia independiente del solucionador debe encontrar exactamente una solución, y esa solución debe ser idéntica al testigo. Si el solver devuelve una solución diferente única, hay inconsistencia entre reglas, testigo y predicados: tratarla como defecto del motor y no mostrarla.

## 9. Crear y seleccionar pistas

### 9.1 Separar predicado, argumentos y frase

Una pista se representa como AST/dato tipado; la plantilla solo la presenta.

```text
ClueAtom
  kind: ROOM_IS | ROW_IS | COLUMN_IS | ROW_OFFSET | COLUMN_OFFSET |
        OBJECT_IS | ADJACENT_TO_OBJECT | ADJACENT_TO_PERSON |
        NOT_ADJACENT_TO_OBJECT | NOT_ADJACENT_TO_PERSON |
        ALONE_IN_ROOM | SAME_ROOM_AS | ONLY_PERSON_MATCHING | ...
  subjectPersonId
  args: IDs/enteros tipados

RenderedClue
  templateKey
  args: IDs/enteros/localized labels
  emphasisTokens[]: {
    tokenId,
    templateSlot,                 // semantic slot, not substring offsets
    target: PERSON | OBJECT_TYPE | OBJECT_INSTANCE | ROOM | ROW | COLUMN
    targetIdOrCoordinate
  }
```

El `kind` debe existir tanto en la unión de tipos como en `ConstraintSolver`, `HumanStepSolver`, validador de pistas, plantilla española y tooltips. Añadir una familia de pista es una tarea coordinada y pequeña; no se añade completando solo una de esas capas.

### 9.2 Derivar candidatos verdaderos

Para cada persona se construye una lista limitada de candidatos evaluando su solución:

- hechos unary: sala, fila/columna, objeto;
- hechos binary: dirección relativa, adyacencia, relación de sala;
- negaciones comprobables;
- cardinalidad solo para tipos habilitados por la especificación.

Un átomo candidato se admite si:

1. Todos los IDs existen.
2. El predicado se evalúa `true` sobre el testigo.
3. Tiene al menos una plantilla española revisada.
4. Sus términos no son ambiguos (por ejemplo, una sola «silla» si la frase no especifica qué instancia).
5. El solver conoce y puede validar ese tipo de predicado.

No generar sinónimos aleatorios, texto libre ni pistas que mencionen coordenadas dibujadas que cambien al traducir.

### 9.3 Selección y reducción por unicidad

Procedimiento recomendado:

1. Crear un conjunto de pistas candidato con al menos un átomo para cada sospechoso y la carta de víctima aprobada.
2. Ejecutar `countUpToTwo` con el conjunto completo.
3. Si devuelve 0, un predicado contradice al testigo: registrar defecto y rechazar el caso.
4. Si devuelve 2, sumar átomos verdaderos candidatos no usados, priorizando diversidad de familias y sujetos, y volver a contar.
5. Si se agota el conjunto permitido sin unicidad, rechazar ese testigo/mapa y generar candidato nuevo.
6. Una vez única, recorrer átomos en orden reproducible y probar quitar uno.
7. Quitar el átomo solo si la unicidad se conserva y cada personaje sigue teniendo el mínimo de pistas que exija la regla aprobada.
8. Detenerse dentro del presupuesto; el resultado restante sigue siendo único aunque no sea el conjunto mínimo matemático.
9. Ejecutar de nuevo solución única, evaluación de verdad y cobertura de personajes sobre el conjunto final.

No se exige encontrar el conjunto mínimo absoluto de pistas. Ese problema aumentaría el coste y puede hacer que los tableros grandes tarden demasiado; basta un conjunto válido/único y una reducción limitada y determinista.

### 9.4 Plantillas legibles

- Los IDs se resuelven a etiquetas visibles después de seleccionar la plantilla.
- Las reglas cardinales (norte/una fila al norte/dos filas al norte) deben tener frases distintas y prueba de dirección.
- Las expresiones destacadas en negrita son controles interactivos accesibles (botón o control equivalente) con `tokenId` y destino tipado en `emphasisTokens`; el `templateSlot` identifica el argumento semántico de la plantilla. No usar índices de caracteres ni buscar palabras en la frase renderizada: la negrita cambia de posición al localizar y la palabra puede ser ambigua.
- Un `OBJECT_TYPE` resuelve todas las celdas cubiertas por todas las instancias visibles de ese tipo (p. ej. todas las sillas); un `OBJECT_INSTANCE` resuelve solo la huella de esa instancia; `ROOM`, `ROW` y `COLUMN` resuelven sus celdas respectivas.
- Un `PERSON` resuelve únicamente la colocación actual en `PlayerState`. Si no está colocada, no hay celdas que resaltar. Nunca resolver personas desde `Solution`, `Witness` ni dominios candidatos.
- Al entrar el puntero o el foco de teclado en un token, mostrar un resaltado temporal y retirarlo al salir; al clic/toque/Enter/Espacio, fijarlo hasta activar el mismo token otra vez, activar otro token o pulsar Escape. Si el foco/hover temporal termina mientras hay un token fijado, restaurar el fijado.
- Este resaltado es una vista de referencia, no una acción del puzzle: no cambia colocaciones, X, notas, historial ni validación. Debe distinguirse sin depender solo del color y no revelar la solución.
- Validar que cada plantilla se puede renderizar en español y no contiene `undefined`, ID crudo o término de otro idioma.
- Si una plantilla no cabe en tarjeta pequeña, permitir expansión/tooltip; no omitir condiciones.

## 10. Solucionador exacto

### 10.1 Modelo de CSP

Un puzzle se modela como problema de satisfacción de restricciones:

- variable: una persona;
- dominio: celdas ocupables candidatas;
- restricciones: una por fila/columna/celda, predicados de pista, sala, objetos y crimen.

Los IDs y dominios deben tener orden determinista. Para tableros hasta 16×16 y hasta 16 personas, una lista compacta de índices/booleanos es suficiente para una primera versión. Añadir bitsets solo después de medir; `BigInt` no debe imponerse sin perfilado.

### 10.2 API

```text
countUpToTwo(puzzle, { cancellationToken, nodeLimit, deadlineMs }) ->
  { count: 0 | 1 | 2, solutions: upToTwoSolutions, nodes, aborted, reason }
```

- `count=2` significa “dos o más”; no seguir contando.
- Si se agota presupuesto, `aborted=true`; nunca llamarlo “sin solución” o “solución única”.
- `solutions` solo contiene hasta dos asignaciones para validación interna. No serializarla como feedback del usuario.
- Comprobar que las variables se asignaron todas antes de incrementar el contador.

### 10.3 Búsqueda determinista

```text
search(state):
  propagate(state)
  if contradiction: return
  if all people assigned:
    if every constraint is satisfied: record solution
    return
  person = unresolved person with smallest domain
  ties = stable person ID order
  for cell in person's candidate cells in stable seeded order:
    child = copy-on-write state plus person=cell
    enforce cell/row/column constraints
    search(child)
    if solutionCount == 2 or cancelled or over budget: return
```

Restaurar dominios al volver de una rama debe ser seguro. Preferir copia de estado por rama en una implementación inicial fácil de revisar; optimizar con trail/undo log solo si el perfil lo exige y con una subtarea aparte.

### 10.4 Propagación inicial

En cada ciclo, aplicar en orden fijo:

1. Filtros unary de ocupabilidad, sala, fila, columna y objeto.
2. Quitar celdas ocupadas por una persona de dominios de las demás.
3. Propagar filas/columnas conforme a la política aprobada.
4. Propagar relaciones entre pares eliminando valores sin soporte en el dominio relacionado.
5. Propagar cardinalidades globales que estén aprobadas.
6. Si un dominio queda vacío, declarar contradicción.
7. Repetir hasta que ninguna operación reduzca dominios.

Las reglas de propagación deben ser **sound**: solo eliminan candidatos imposibles. Que no detecten una contradicción pronto afecta al rendimiento, no a la corrección, porque la búsqueda completa sigue verificando.

## 11. Solver pedagógico y dificultad

El motor mantiene dos respuestas distintas:

- **Solver exacto:** ¿hay cero, una o más soluciones? Puede buscar alternativas con ramificación.
- **Solver pedagógico:** ¿qué deducción justificada puede hacer una persona y cuánto trabajo le exige?

No reutilizar `nodes`/milisegundos de DFS como nivel del jugador.

### 11.1 Formato de un paso explicable

```text
ReasoningStep
  techniqueId: D0_DIRECT | D1_EXCLUSION | D2_RELATION |
               D3_CARDINALITY | D4_CHAIN
  sourceClueIds[]
  ruleIds[]
  subjectIds[]
  removedCandidates[]
  forcedAssignment?: personId + cellId
  depth
  explanationKey
  explanationArgs
```

Un paso tiene que poder leerse y verificarse desde la regla y las pistas citadas. Un `D4_CHAIN` es una deducción demostrada por una cadena finita de implicaciones: por ejemplo, al considerar cada alternativa de una variable, todas fuerzan el mismo resultado, o una alternativa contradice una regla. No basta con elegir una alternativa y continuar como si fuera cierta. Si solo sabemos que la solución final es única pero no hay una cadena humana soportada, clasificar el candidato como no graduable y rechazarlo para niveles normales; no etiquetarlo como experto automáticamente.

### 11.2 Clasificación provisional

Aplicar técnicas en orden conocido, repetir hasta resolver o atascarse y registrar:

- tamaño `N` y personas `P` (señales de carga, no decisión única);
- número de átomos y familias de predicado;
- total de deducciones, eliminaciones y colocaciones forzadas;
- técnica de mayor rango necesaria;
- profundidad máxima de encadenamiento;
- cantidad de puntos donde el solver pedagógico se atasca;
- nodos exactos de búsqueda, guardados solo como diagnóstico.

La rubrica cualitativa actual está en [`README.md` §7](README.md#7-evaluación-de-dificultad). No inventar umbrales de minutos humanos. Calibrar puntuación con corpus reproducible, revisión manual y sesiones de juego; versionar el clasificador.

La opción «cualquiera» acepta toda dificultad soportada. Una categoría solicitada filtra candidatos hasta el límite acordado. Agotado el presupuesto, devuelve `DIFFICULTY_NOT_FOUND` y conserva configuración; no cambia silenciosamente de nivel/tamaño/personas.

## 12. Iteración completa, fallos y rendimiento

### 12.1 Presupuestos separados

Tener límites para etapas para poder saber por qué falló:

- intentos de topología;
- intentos de testigo por topología;
- candidatos/átomos de pistas;
- nodos de búsqueda exacta por candidato;
- plazo global de generación;
- cancelación del usuario.

Los valores concretos deben medirse antes de habilitar combinaciones grandes. No poner un bucle `while (true)` ni asumir que una seed siempre generará un puzzle al primer intento.

### 12.2 Mensajes y diagnóstico

Jugador ve estados simples: «comprobando configuración», «creando mapa», «buscando pistas válidas» y, si falla, una opción para reintentar o reducir parámetros. No mostrar métricas técnicas salvo panel de depuración.

Diagnóstico técnico reproducible recomendado:

```text
seed, generatorVersion, rulesVersion, N, P, requestedDifficulty,
lastStage, attemptsByStage, solverNodes, solutionsFoundCappedAt2,
elapsedByStage, failureCode
```

No incluir datos personales ni mandar diagnóstico a un servicio. Incluir `solution` solo en una exportación de desarrollo solicitada expresamente.

### 12.3 Worker y cancelación

El solver/generador no debe bloquear interacciones. Antes de maximizar tamaños, medir una semilla pequeña y después límites configurables. Si se mueve a Web Worker:

- el worker recibe solo `GenerationRequest` serializable;
- informa progreso mediante mensajes tipados;
- procesa cancelación entre iteraciones/nodos;
- devuelve un único `GenerationOutcome`;
- UI descarta resultados tardíos de una solicitud ya cancelada;
- rutas del worker siguen relativas y funcionan bajo el prefijo GitHub Pages.

Worker es una decisión de arquitectura que se valida con medición; no implementarlo antes de saber si el presupuesto lo requiere.

## 13. Validación de salida antes de mostrarla

`PuzzleValidator.validateComplete` debe ejecutar una secuencia independiente de la generación:

1. Configuración y versiones válidas.
2. Matriz completa y coordenadas únicas.
3. Regiones conectadas, IDs y límites coherentes.
4. Catálogo y huellas de objetos válidos, colisiones permitidas únicamente por regla.
5. Ocupabilidad consistente con terreno y objetos.
6. Personas y cartas completas; exactamente una víctima según regla aprobada.
7. IDs de argumentos de pistas existentes.
8. Cada pista evalúa verdadera sobre testigo.
9. Testigo ocupa posiciones válidas y cumple filas/columnas/sala del crimen.
10. Solucionador exacto no fue cancelado ni excedió recursos.
11. Solucionador exacto encontró exactamente una solución.
12. Solución encontrada coincide con el testigo.
13. Solver pedagógico devuelve rating soportado, si la dificultad es requisito.
14. Cada clave de plantilla, tooltip y recurso visual que necesita el caso existe.

La función devuelve todos los errores de validación posibles en orden estable para diagnóstico; no muta el caso para “arreglarlo”.

## 14. Pseudocódigo para el generador del testigo

Este ejemplo es deliberadamente de alto nivel. Las funciones de restricción concretas se agregan según tickets pequeños y reglas aprobadas:

```text
function findWitness(board, people, approvedRules, random):
  candidatesByPerson = {}
  for person in people ordered by stable ID:
    candidatesByPerson[person.id] = all occupiable cell IDs ordered by row/column

  crimeChoices = enumerateCrimePairs(board, approvedRules)
  crimeChoices = random.shuffle(crimeChoices)

  for pair in crimeChoices:
    state = emptyAssignment()
    assign the selected victim person to pair.victimCell
    assign the selected killer person to pair.killerCell
    reserve crime room if exclusive-room rule approved
    if not propagate(state, approvedRules): continue
    if searchRemainingPeople(state, candidatesByPerson, approvedRules, random):
      assignment = complete state
      if validateRules(assignment): return assignment

  return NONE
```

Condiciones importantes:

- No fijar filas/columnas exactas ni política de recintos en el código antes de la decisión de README.
- El par del crimen se preselecciona solo si esa mecánica queda aprobada.
- Si las personas tienen atributos/roles adicionales, modelarlos como datos tipados, no inferirlos del nombre, género o retrato.
- El límite de búsqueda devuelve “agotado”, no una solución parcial.

## 15. Ejemplo de contrato de pista

Ejemplo ilustrativo con IDs ficticios y una regla candidata, no texto final de juego:

```text
ClueAtom {
  kind: ADJACENT_TO_OBJECT,
  subjectPersonId: "person-02",
  args: { objectTypeId: "object-bench", roomId: "room-01" }
}
```

El evaluador busca celdas que:

1. estén dentro de `room-01`;
2. tengan al menos un vecino ortogonal de la instancia `object-bench`;
3. no sean la celda que ocupa el objeto, salvo que la regla aprobada diga lo contrario;
4. satisfagan cualquier otra condición tipada de ese `kind`.

El renderer produce frase y términos enfatizados desde `templateKey`/argumentos. La frase renderizada no es parseada por solver.

## 16. Ejemplo de errores que debe encontrar el validador

- Una pista dice “junto a un banco”, pero ese ID no existe.
- Dos celdas declaran la misma posición/persona.
- Una sala enumera celda C4, pero `Cell(C4).roomId` apunta a otra sala.
- Un objeto de huella 2×2 cae parcialmente fuera de la cuadrícula.
- Una persona testigo quedó sobre una celda que el objeto recién añadido hizo no ocupable.
- El testigo cumple las pistas, pero solver encuentra una segunda asignación.
- El solver llega al límite de nodos sin completar: eso es `ABORTED`, no `UNIQUE`.
- El nivel solicitado es experto, pero la única solución requiere una rama ciega no explicable.
- Una plantilla produce un término vacío, una referencia rota o una condición omitida.

## 17. Mapeo a tareas cortas del plan

La guía no crea una mega-tarea nueva. Implementar siguiendo [`PLAN.md`](PLAN.md):

| Parte de la guía | Subtareas principales |
|---|---|
| Tipos, config y validador | 1.1–1.14 |
| Semillas/PRNG y enlaces | 2.1–2.12 |
| Cuadrícula y salas | 3.1–3.15 |
| Objetos/ocupabilidad | 4.1–4.13 |
| CSP/solver exacto | 5.1–5.24 |
| Testigo, personas y pistas | 6.1–6.24 |
| Rating y dificultad | 7.1–7.17 |
| UI de generación/juego | 8.1–8.22 |
| Tooltips/preferencias/accesibilidad | 9.1–9.24 |
| Arte y render | 10.1–10.15 |
| Integración/perfilado/publicación | 11.1–11.14 |

Si una de estas subtareas aún es demasiado grande al iniciar, abrir subnúmeros (por ejemplo 5.11.1 y 5.11.2) y asignar uno por vez. Cada subtarea tiene un cambio pequeño, verificación concreta y commit breve.

## 18. Lista de decisiones que la guía no puede cerrar

Revisar [`README.md` §13](README.md#13-decisiones-abiertas-que-bloquean-la-implementación). En particular:

- filas/columnas vacías permitidas y semántica “como máximo”/“exactamente una”;
- definición exacta del crimen;
- rangos de `N`, `P` y presets;
- nivel «cualquiera» y calibración de niveles;
- tipos de pista MVP y paridad/conteos;
- una pista por sospechoso o más;
- ajustes de primera versión;
- presupuesto/reintentos/fallback;
- catálogo visual original.

Mientras siga abierta una decisión, la estructura técnica la recibe como configuración/regla versionada o deja su tarea bloqueada. No adivinar.

## 19. Instrucciones rápidas para un agente local

Antes de hacer cualquier cambio:

1. Leer `AGENTS.md`, `COMANDOS.md`, `README.md`, `GUIA_MOTOR_GENERACION.md`, `PLAN.md` y `CONTEXTO.md`.
2. Recibir un único ID de subtarea del plan.
3. Confirmar que las reglas necesarias están aprobadas.
4. Implementar solo esa subtarea, sin abrir alcance nuevo.
5. Registrar cualquier incertidumbre como bloqueo con archivo/sección y pregunta concreta.
6. Verificar el criterio de aceptación de esa subtarea; no declarar tareas dependientes como terminadas.
7. Actualizar plan/contexto, revisar diff, hacer un commit atómico y publicar la rama.

## 20. Estado técnico

Esta guía define contratos y recomienda algoritmos para orientar implementaciones futuras. No significa que los algoritmos, rangos, criterios de dificultad ni límites hayan sido implementados o perfilados. Los valores concretos de presupuesto y toda regla marcada abierta en `README.md` necesitan resolución antes de codificarse.
