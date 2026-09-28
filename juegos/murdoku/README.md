# Murdoku — especificación funcional

**Estado:** Borrador detallado para revisión; no implementar hasta que se aprueben las reglas marcadas como propuestas.
**Propuesta de alcance aprobada:** [043](propuestas/043_murdoku_generacion_visual.md).
**Plan de trabajo:** [PLAN.md](PLAN.md).
**Diseño técnico propuesto para el generador:** [GUIA_MOTOR_GENERACION.md](GUIA_MOTOR_GENERACION.md).

Este documento será la fuente de verdad de las reglas cuando el usuario apruebe este borrador. La implementación debe seguirlo literalmente. Si una regla es ambigua, debe detenerse y solicitar una decisión; no completar huecos inventando mecánicas.

## 1. Objetivo y vocabulario

El juego es un rompecabezas de deducción espacial. El jugador lee una pista por personaje y coloca a cada persona en una celda de un mapa temático. Al completar las ubicaciones, deduce quién cometió el crimen a partir de la relación entre la víctima y el asesino.

- **Tablero:** cuadrícula cuadrada de `N × N` celdas.
- **Celda:** unidad de posición identificada por fila y columna, ambas numeradas desde 1. La fila 1 es la más al norte (parte superior del tablero); la columna 1 es la más al oeste (parte izquierda).
- **Sala / recinto:** conjunto conexo de celdas del mapa que comparten un identificador y un nombre. Los límites de sala son geometría del mapa, no paredes transitables adicionales.
- **Elemento:** objeto dibujado sobre una celda o conjunto pequeño de celdas (silla, mesa, árbol, charco, etc.). Cada tipo declara si puede ocuparse y qué pista puede referirse a él.
- **Persona:** personaje que debe colocarse una sola vez. Una persona tiene nombre y retrato/representación originales, rol y una pista.
- **Víctima:** persona marcada como víctima; su carta no da una ubicación concreta. Participa en la regla final del asesinato.
- **Sospechoso:** cualquier persona distinta de la víctima. Uno de ellos es el asesino.
- **Semilla:** identificador reproducible de la generación, junto con la versión del generador.
- **Ocupable:** propiedad de una celda que determina si puede contener a una persona. Una mesa, árbol u obstáculo grande normalmente ocupa espacio e impide colocar; una silla, alfombra, camino u otro punto de interés puede ser ocupable si así lo define el tipo.

## 2. Reglas propuestas para una partida

Las reglas siguientes son la propuesta base independiente; conservan la deducción de colocación en cuadrícula, pero no adoptan nombres, escenarios, pistas ni recursos concretos de Murdoku.

### 2.1 Colocación

1. Cada persona del caso aparece exactamente una vez en el tablero.
2. Una persona solo puede ocupar una celda marcada ocupable y no ocupada por un objeto no transitable.
3. Como máximo hay una persona en cada fila y como máximo una en cada columna.
4. Si hay `P` personas y un tablero `N × N`, debe cumplirse `1 ≤ P ≤ N`. Si `P = N`, la regla de como máximo una por fila/columna implica que cada fila y columna contiene exactamente una persona. Si `P < N`, se permiten filas y columnas vacías.
5. Las marcas X y las notas son anotaciones del jugador y no cambian las reglas ni la solución.

**Decisión por aprobar:** permitir `P < N` es lo que hace independientes los controles de tamaño y número de personas. Las opciones deben impedir `P > N`, salvo que en una revisión se decida una regla diferente.

### 2.2 Salas, celdas y relación espacial

- Cada celda pertenece a una sola sala.
- Cada sala generada consta de celdas conectadas por lados (conectividad ortogonal); no se aceptan salas separadas que compartan solo el mismo nombre.
- Dos celdas son ortogonalmente vecinas si comparten un lado. La vecindad no cruza una esquina.
- **Junto a / al lado de** significa ocupar celdas ortogonalmente vecinas dentro de la misma sala. El elemento/persona referido debe estar en una celda distinta.
- **No junto a** es la negación exacta de esa relación.
- **En la misma sala** se refiere a igual `roomId`; no implica proximidad.
- **Una fila al norte/sur** significa que el índice de fila difiere exactamente en 1, sin exigir la misma columna. **Más al norte/sur** es comparación estricta de índice de fila y puede haber cualquier diferencia positiva. Este par de términos no debe intercambiarse.
- **Una columna al este/oeste** significa diferencia exactamente de 1 en columna; **más al este/oeste** es comparación estricta de columnas.
- Las coordenadas y direcciones de pistas se expresan siempre según la orientación visual anterior, incluso si el tablero se adapta o refleja para una presentación móvil.

### 2.3 Elementos y ocupación

- Cada instancia de objeto tiene identificador, tipo, celdas cubiertas, etiqueta visible y atributo `occupiable`.
- Un elemento con huella de varias celdas cubre visualmente esas celdas. Cada celda cubierta debe indicar su disponibilidad de colocación sin ocultar la cuadrícula.
- Una persona colocada sobre un elemento ocupable está en la misma celda que el elemento; no ocupa una celda vecina.
- Una celda es ocupable si no existe una regla más restrictiva que lo prohíba y su superficie/elemento tiene `occupiable = true`.
- Las pistas “en el objeto” solo se generan para instancias/tipos ocupables. “Junto al objeto” puede referirse a elementos ocupables o no ocupables.
- Dos elementos no pueden cubrir de forma incoherente la misma celda. Una superposición solo se permite si una regla de composición explícita la declara compatible (p. ej. decorado pequeño sobre un tipo de terreno); por defecto el generador la rechaza.
- Los personajes no pueden colocarse en obstáculos, agua u otras superficies declaradas no ocupables.

### 2.4 Crimen y condición de victoria

1. El caso contiene una víctima y al menos un sospechoso. La víctima cuenta dentro del total configurable de personas.
2. El asesino es exactamente un sospechoso.
3. Al final, la víctima y el asesino están en la misma sala y son las únicas dos personas de esa sala.
4. Se define `asesino` como el único sospechoso que cumple la regla 3. El generador debe garantizar que existe exactamente uno.
5. La partida se resuelve al colocar a todas las personas en sus celdas exactas y el sistema puede comprobar que la identidad del asesino derivada coincide con la solución. No basta con adivinar el nombre del culpable.
6. Antes de enviar, el juego informa cuántas personas faltan. Enviar una solución completa pero incorrecta comunica que aún hay errores sin revelar automáticamente la solución. Las pistas de ayuda son acciones separadas y explícitas.

**Decisión por aprobar:** la definición formal de «a solas» es “exactamente dos ocupantes en la sala: la víctima y un sospechoso”. Esta formulación evita interpretar «solos» como simplemente únicos personajes del mismo género o como ocupantes de celdas vecinas.

## 3. Tipos de pista permitidos

Todas las pistas se almacenan como datos con una clave de plantilla y argumentos tipados. El texto es una representación localizada de esos datos; el generador no produce frases libres difíciles de validar.

### 3.1 Vocabulario de pistas inicial

1. **Sala exacta:** persona `IN` sala identificada.
2. **Una de varias salas:** persona `IN_ANY_OF` conjunto explícito de salas.
3. **Fila/columna exacta o relativa:** fila/columna concreta; exactamente una fila/columna al norte/sur/este/oeste; más al norte/sur/este/oeste.
4. **Objeto exacto:** persona ocupa una instancia/tipo ocupable concreto.
5. **Junto a objeto:** relación ortogonal dentro de la misma sala con una instancia/tipo objeto.
6. **Junto a personaje:** relación ortogonal dentro de la misma sala entre dos personas.
7. **No junto a objeto/personaje:** negación tipada de las dos relaciones anteriores.
8. **Solo/a en sala:** nadie más ocupa esa sala.
9. **Con una persona determinada:** comparte sala con una persona indicada; puede añadir “a solas” (exactamente esas dos personas en la sala).
10. **Único que cumple:** única persona con atributo verificable entre un dominio definido (por ejemplo, único ocupante de tipo asiento). En la primera entrega debe ser un tipo simple y limitado, no una cuantificación ambigua.
11. **Relación combinada:** conjunción de hasta dos átomos de pista simples para la primera entrega. Las conjunciones más largas quedan reservadas para dificultad superior si el solucionador las explica.
12. **Conteos/globales:** paridad o cantidad de personas en un conjunto nombrado (sala/zona/sector), solo cuando el modelo y la gramática lo puedan validar con claridad. Es opcional para MVP y no se habilita antes del soporte del solucionador.

### 3.2 Reglas de calidad para pistas

- La pista debe ser verdadera en la solución testigo y evaluable como predicado por el solucionador.
- Los nombres citados deben existir y no colisionar; las salas/objetos citados deben ser visibles y tener un tooltip.
- Una pista nunca debe depender de una característica invisible o no documentada.
- Los términos exactos (junto a, una fila al norte, más al norte, en sala, solo/a) tienen definiciones consistentes con la sección 2.
- La primera implementación solo usa plantillas revisadas manualmente y con traducción española completa. No se combinan fragmentos gramaticales por concatenación ingenua.
- Cada sospechoso recibe al menos un átomo de pista; la víctima usa una pista estándar de víctima. Puede haber una regla global sencilla. No se admite que la carta de una persona quede vacía.
- Para una versión inicial, evitar pistas que dependan de género gramatical de un personaje, pronombres ambiguos o identificar dos elementos con el mismo nombre.

## 4. Configuración de partida

El usuario configura cuadrícula y número de personas por separado. El nivel de dificultad se puede elegir como objetivo o dejar en «cualquiera».

### 4.1 Rango inicial propuesto

- Tamaño `N`: entero entre 5 y 16 inclusive, entendido siempre como `N × N` celdas (no como el total de celdas).
- Personas `P`: entero entre 4 y `N` inclusive; incluye víctima.
- Número de sospechosos: `P - 1`; debe quedar al menos uno.
- Preset inicial: `N = 6`, `P = 6` (cinco sospechosos y una víctima).
- El control `P` no puede superar `N`; al subir/bajar `N`, conservar el valor de `P` si sigue válido y limitarlo a `N` cuando deje de serlo.
- La interfaz presenta combinaciones recomendadas y explica incompatibilidades antes de generar. No se debe asumir que cualquier combinación tendrá una partida de cada nivel.

### 4.2 Presets de tamaño sugeridos, no límites de dificultad

Observación del catálogo online (el estado y su contenido pueden cambiar): muy fácil se vio en 5×5/6×6; fácil en 6×6–9×9; medio en 8×8–10×10; difícil en 9×9–10×10; experto en 12×12–16×16. Los rangos se solapan, por lo que son solo sugerencias iniciales para presets, nunca la fórmula que asigna el nivel.

Tabla inicial para presentar en controles (valores sugeridos, sujetos a revisión tras calibración):

| Nivel solicitado | Tamaño sugerido | Personas sugeridas |
|---|---:|---:|
| Muy fácil | 5–6 | 5–6 |
| Fácil | 6–9 | 6–9 |
| Medio | 8–10 | 8–10 |
| Difícil | 9–12 | 9–12 |
| Experto | 12–16 | 12–16 |

Si el usuario altera los números sugeridos, se conserva su configuración y el nivel real se determina tras generar/resolver. No se etiqueta una partida como experta solo por ser grande.

### 4.3 Variación y repetición

- «Nueva partida» obtiene una semilla nueva y regenera desde cero mapa, forma de salas, decoración/objetos, personajes, solución, pistas y asesino.
- Semillas distintas pueden coincidir en alguna característica; no se promete unicidad visual absoluta entre todas las semillas.
- Guardar la última semilla/configuración en el estado de sesión. «Reiniciar» restaura la misma partida exacta; no llama al generador.
- «Compartir» codifica o enlaza `generatorVersion`, semilla y configuración. Si la URL resulta demasiado larga, usar un identificador compacto solo si es reversible localmente; no depender de un servidor.
- La aleatoriedad debe provenir de un PRNG con semilla, nunca de `Math.random()` sin inicialización reproducible dentro del generador.
- Registrar `generatorVersion`; si cambia, la misma semilla puede tener un resultado nuevo solo si la versión también cambia.

## 5. Modelo de datos lógico

La implementación separa datos de dominio, estado de la partida, preferencias y presentación. No hacer de la imagen dibujada la fuente de verdad.

```text
PuzzleDefinition
  schemaVersion: integer
  generatorVersion: string
  seed: string
  config: { gridSize: N, personCount: P, requestedDifficulty: tier | "any" }
  board: Board
  people: Person[P]
  clues: Clue[]
  solution: Solution                 // secreto de juego; ver nota de cliente
  rating: DifficultyRating

Board
  size: N
  cells: Cell[N*N]                   // index = (row - 1) * N + (column - 1)
  rooms: Room[]
  objects: ObjectInstance[]

Cell
  id, row, column, roomId
  terrainId
  occupiable: boolean
  objectIds: string[]

Room
  id, displayNameKey, themeId
  cellIds: string[]

ObjectInstance
  id, typeId, cellIds: string[]
  occupiable: boolean
  tooltipKey, displayAssetKey

Person
  id, displayNameKey, portraitAssetKey
  role: "victim" | "suspect"
  clueIds: string[]

Clue
  id, subjectPersonId
  templateKey
  args: typed values                  // IDs and integers, never pre-rendered free text
  atomIds: string[]

Solution
  personToCell: Record<PersonId, CellId>
  killerPersonId: PersonId

DifficultyRating
  tier: "veryEasy" | "easy" | "medium" | "hard" | "expert"
  metrics: { gridSize, people, clueAtoms, ruleFamilies, maxReasoningDepth,
             forcedSteps, candidateEliminations, branchingRequired, solverNodes }
```

**Nota de seguridad:** al ser una web estática, la solución calculada en el navegador no es secreto frente a alguien que inspeccione el código o memoria. Esto no afecta la experiencia normal y no se construirá seguridad de servidor para una colección personal. La interfaz nunca debe mostrar la solución antes de que el jugador la pida o complete el caso.

### 5.1 Invariantes de validación

Antes de mostrar un caso, validar al menos:

1. `N` y `P` dentro de rango y `P ≤ N`.
2. Exactamente `N*N` celdas, coordenadas únicas y `roomId` válido en cada una.
3. Cada sala no vacía, sin duplicados, conectada ortogonalmente y con `cellIds` coherentes con las celdas.
4. Instancias de objeto con huella válida, no superpuesta salvo compatibilidad explícita y consistente con las `objectIds` de celda.
5. Hay suficientes celdas ocupables; la solución asigna cada persona exactamente a una celda ocupable distinta y respeta filas/columnas.
6. Todas las referencias de personas, salas, objetos, pistas y assets resuelven a elementos existentes.
7. La solución satisface cada predicado de pista y la regla del crimen.
8. El número de soluciones completas es exactamente uno (detener conteo al encontrar la segunda).
9. El rating se puede reproducir con la versión registrada del clasificador.

## 6. Generación determinista de partida

La generación es una tubería con etapas pequeñas, observables y depurables. No crear tablero dibujado por separado y después intentar adjuntarle pistas.

### 6.1 Orden de generación

1. Validar y normalizar configuración (`N`, `P`, nivel solicitado, versión).
2. Crear PRNG de semilla y flujos con separación estable (`map`, `objects`, `people`, `solution`, `clues`). Así un cambio en el retrato no cambia la geometría sin necesidad.
3. Crear `N*N` celdas con coordenadas fijas.
4. Elegir cantidad de salas compatible con `N`, crecer salas conectadas mediante expansión desde semillas (o algoritmo equivalente) y verificar tamaño mínimo/máximo, balance razonable y conectividad. Cada celda se asigna exactamente una vez.
5. Elegir nombres/temas/terreno desde un catálogo de contenido original. Variar cantidad y forma de salas; no reusar siempre una plantilla fija con colores distintos.
6. Colocar objetos con restricciones: huella válida, no tapar una sala completa, no dejar filas/columnas imposibles para `P`, conservar suficientes celdas ocupables y obtener diversidad visual. Todo objeto se agrega al modelo antes de dibujarse.
7. Crear `P` personas originales, una víctima y `P-1` sospechosos, con retratos/nombres de un catálogo finito. El espacio de partidas también cambia mapa, objetos, roles asignados, solución y pistas; no se afirma que todos los nombres sean únicos para siempre.
8. Construir una solución testigo: asignar cada persona a una celda ocupable distinta, sin compartir fila/columna; elegir víctima y asesino de modo que la sala de ambos tenga exactamente esos dos ocupantes.
9. Derivar de esa solución un conjunto de átomos de pista verdaderos dentro del vocabulario aprobado. No permitir una pista que el render de texto no pueda expresar fielmente.
10. Componer pistas en cartas; ejecutar solucionador, contar soluciones hasta 2 y rechazar mapas/casos con 0 o 2+ soluciones.
11. Ejecutar clasificador humano-explicable. Aceptar si coincide con dificultad solicitada; con `any`, aceptar cualquier clase.
12. Ejecutar validación integral, serializar `PuzzleDefinition`, construir tooltips y dibujar.

### 6.2 Unicidad y terminación

- El solucionador trata a cada persona como variable cuyo dominio inicial son las celdas ocupables.
- Propaga restricciones de fila/columna, sala, celda, objeto y cada tipo de pista.
- Cuando la propagación no avance, usa búsqueda determinista con la variable de menor dominio restante (MRV) y desempate estable por ID/fila/columna.
- Cuenta como máximo dos soluciones: `0` significa inválido; `1` único; `2` significa al menos dos y el candidato se rechaza.
- El solucionador de búsqueda comprueba corrección/uniqueness; un solucionador explicable separado determina nivel. No se debe confundir “lo encuentra rápido el ordenador” con “es fácil para una persona”.
- Límites iniciales de intentos/tiempo por definir tras perfilado; siempre detenerse y mostrar mensaje recuperable tras el límite. No bloquear la página ni mostrar caso sin validar.
- Fallback aceptable: proponer configuración recomendada cercana y pedir iniciar otra generación. No bajar silenciosamente el número de personas, tamaño o dificultad solicitada.

### 6.3 División de semillas y formato compartible

- Usar una función hash definida y un PRNG reproducible documentado. No depender del orden accidental de propiedades de objetos, locale ni APIs de dibujo.
- Definir las conversiones de enteros y orden de elección para que diferentes navegadores produzcan el mismo modelo lógico.
- El enlace representa `{v, seed, n, p, tier}` donde `v` es versión de generador. Al abrir, validar y reconstruir; un `v` no soportado da un error claro y no genera otra partida en su lugar.
- Guardar estado de partida del jugador por separado del PuzzleDefinition (colocaciones provisionales, X, notas y preferencias).

## 7. Evaluación de dificultad

### 7.1 Evidencia de referencia y límites

El [selector online](https://murdoku.com/play/) consultado el 2026-09-27 muestra tamaños solapados por categoría: Muy fácil 5×5/6×6; Fácil 6×6–9×9; Medio 8×8–10×10; Difícil 9×9–10×10; Experto 12×12–16×16 (el catálogo es evolutivo). El [catálogo imprimible](https://murdoku.com/print) también clasifica *The Backyard Garden* 9×9 como fácil, [*The Art School* 9×9 como medio](https://murdoku.com/pdf/the-art-school-color.pdf) y [Golf 16×16 como experto](https://murdoku.com/pdf/the-golf-course-color.pdf). Por tanto, no hay base para asignar el nivel solo desde `N` o `P`.

En una [nota pública sobre la dificultad](https://www.reddit.com/r/murdoku/comments/1tq9r01/a_note_from_the_author_on_murdokus_difficulty/), el creador explicó que los expertos buscan una resolución larga y que la calibración es difícil; quiere que las deducciones sean justas y explicables, evitando cadenas demasiado profundas que se sientan injustas. La escala de este juego se calibrará con criterios propios; no se conocen umbrales oficiales.

### 7.2 Solucionador pedagógico

Crear técnicas de deducción explícitas y ordenadas (nombres internos estables):

- `D0_DIRECT`: aplicar una pista unary directa (sala/fila/objeto/posición exacta) para fijar o quitar candidatas.
- `D1_EXCLUSION`: propagar una colocación fija a celdas de misma fila, columna y sala según las restricciones.
- `D2_RELATION`: propagar relaciones entre dos personas/objetos (adyacencia, orden relativo, mismo recinto, no-adjacencia).
- `D3_CARDINALITY`: razonar sobre unicidad, ocupación exacta/ninguna, salas con cantidad indicada y restricciones globales aprobadas.
- `D4_CHAIN`: enlazar deducciones justificadas entre varias personas con profundidad acotada.
- `SEARCH`: ramificación/búsqueda para el verificador exacto. Una rama asumida no cuenta como deducción humana demostrada.

Cada paso guarda explicación con referencia a pista/regla, dominio previo, dominio posterior y entidad afectada. Puede haber múltiples secuencias válidas; el calificador elige la secuencia determinista de menor coste.

### 7.3 Rubrica inicial (provisional)

| Nivel | Resolución pedagógica esperada | Apoyo de tamaño sugerido |
|---|---|---|
| Muy fácil | Se resuelve casi todo con `D0_DIRECT` y `D1_EXCLUSION`; pocas dependencias entre personas. | normalmente 5–6 por lado/personas |
| Fácil | Predominan `D0`/`D1`; alguna relación simple `D2`; sin cadena larga. | normalmente 6–9 |
| Medio | Varias combinaciones `D2`, alternancia de restricciones y encadenamiento corto. | normalmente 8–10 |
| Difícil | Interdependencias frecuentes; requiere cardinalidad o cadenas `D3`/`D4` de varios pasos, pero cada paso justificable. | normalmente 9–12 |
| Experto | Caso grande y alta interacción entre pistas/regiones; cadenas más profundas y varias restricciones combinadas; no depende de una adivinanza ciega. | normalmente 12–16 |

Los rangos entre paréntesis son presets orientativos, no umbrales. La definición cuantitativa se calibrará en una tarea del plan sobre un corpus de semillas, revisión manual y sesiones de juego. Registrar profundidad máxima, número de pasos, técnicas requeridas, dominio máximo/medio, número de candidatos eliminados y nodos de búsqueda solo como diagnóstico. **No** clasificar por nodos DFS únicamente.

El juego presenta al jugador nivel objetivo, no una falsa precisión de dificultad absoluta. En modo personalizado se presenta tamaño/personas y, al terminar la generación, el nivel calculado.

## 8. Interfaz y acciones de juego

### 8.1 Pantalla de preparación

- Selector de nivel: cualquiera, muy fácil, fácil, medio, difícil y experto.
- Selector de `N` (cuadrícula `N×N`) y de `P` (personas, incluye víctima), ambos editables independientemente.
- Mostrar presets recomendados al cambiar nivel; no forzar que se mantengan al modificar control personalizado.
- Botón de nueva partida desactivado durante generación. Mostrar progreso por etapa sin exponer detalles internos al jugador; cancelar debe dejar una pantalla estable.
- Mostrar semilla/ID en detalles, con acción para copiar/compartir.

### 8.2 Vista de caso

- Panel de pistas/personajes y tablero visual en el espacio principal; herramientas separadas del mapa.
- Una selección de carta identifica a la persona activa y su pista. La carta de víctima está claramente identificada.
- Seleccionar personaje y luego celda coloca al personaje. Ratón y toque siguen el mismo flujo; arrastre opcional, nunca único medio.
- Al pasar el puntero sobre una celda se dibuja en azul el contorno de toda su estancia (`roomId`). La celda bajo el puntero se resalta en blanco si el terreno/objeto permite colocar personas y en rojo si no lo permite. Este estado es una ayuda de lectura, no un error ni una colocación.
- El mismo feedback aparece al enfocar una celda con teclado y al seleccionarla en el flujo táctil. La ocupabilidad es una propiedad estática del tablero; que una persona ya esté colocada en la celda no cambia su clasificación.
- Seleccionar un personaje ya colocado y seleccionar otra celda lo mueve; `Deshacer` restaura el estado anterior.
- Tocar/clicar la persona colocada o elegir borrador y celda quita la colocación según modo; no perder la nota X salvo que el jugador la reemplace de manera clara.
- X seleccionada + celda vacía alterna la marca X; X no sustituye una colocación sin aviso. `Auto-X` opcional marca como descartadas las demás celdas de la fila/columna cuando se coloca persona y retira esas X al deshacer/quitar esa colocación si fueron autogeneradas. Mantener marcas manuales separadas internamente.
- Notas avanzadas se guardan por celda y no validan como colocaciones. Símbolos iniciales configurables: triángulo, círculo, cuadrado, estrella.
- Acción deshacer registra cada colocación, movimiento, borrado, X y nota; reiniciar partida conserva PuzzleDefinition y vacía estado jugador tras confirmación.
- Pista contextual entrega una deducción y su explicación corta de forma progresiva; no coloca la persona directamente por defecto. El número/consumo de pistas no forma parte de puntuación MVP.
- Enviar requiere que todas las personas estén colocadas exactamente una vez. El juego valida la cuadrícula y deduce el asesino; ante error indica que hay ubicaciones incorrectas sin resaltar todas las celdas erróneas automáticamente.
- Al resolver, mostrar culpable y resumen, permitir revisar tablero final y empezar caso nuevo con la misma configuración.

### 8.3 Tooltips y texto accesible

**Persona:** nombre, rol (si se muestra sin spoiler), pista íntegra y estado (sin colocar/colocada); en móvil mostrar en panel o pulsación sostenida sin depender del hover.

**Celda:** fila/columna, nombre de sala, terreno/superficie, elemento que ocupa la celda, ocupable sí/no, personaje colocado y notas. El tooltip nunca revela solución ni deduce el culpable antes del envío.

Los tooltips aparecen con hover de ratón y foco de teclado; deben retrasar/posicionar la aparición para no tapar controles o pistas. En táctil se accede con toque secundario/pulsación o panel de información.

Las palabras o expresiones destacadas en negrita dentro de una pista son interactivas. Al pasar el ratón sobre ellas o darles foco de teclado, el tablero resalta las casillas correspondientes a su significado; al seleccionarlas con clic, toque o teclado, el resaltado queda fijado hasta deseleccionar el término, seleccionar otro o pulsar Escape. Por ejemplo, al activar «silla» en «Era la única persona sentada en una silla», se resaltan todas las celdas que contienen sillas. El vínculo se define por datos semánticos de la pista, nunca buscando palabras en la frase traducida. Objetos por tipo resaltan todas sus instancias; una instancia concreta, su huella; una sala, sus celdas; una fila o columna, sus celdas; una persona, solo su colocación actual del jugador, si existe. Una persona sin colocar no resalta su solución. El resaltado no altera colocaciones, X ni notas, no revela dominios candidatos ni la solución; debe distinguirse también sin depender solo del color.

El contorno azul de la estancia, el estado blanco/rojo de ocupabilidad y el resaltado semántico de términos de pista son capas visuales distintas; al coincidir, se deben poder distinguir sin que una oculte a las otras. El blanco y el rojo no pueden ser la única forma de comunicar ocupabilidad: conservar el texto/tooltip «ocupable» o «no ocupable» y un patrón/contorno distinguible.

## 9. Preferencias catalogadas y alcance propuesto

Se inspeccionaron las pestañas Básico y Avanzado, incluido su desplazamiento completo. Esta lista registra las opciones observadas para que no se pierdan; es una propuesta de comportamiento de producto, no una obligación de clonar exactamente la referencia.

### 9.1 Básicas

| Preferencia observada | Comportamiento propuesto |
|---|---|
| Idioma | Español en MVP; estructura preparada para añadir idioma si se decide. |
| Tema oscuro/claro | Incluir; oscuro como valor inicial. |
| Efectos de sonido y volumen | Incluir activar/desactivar y nivel; no reproducir sonido sin gesto del usuario. |
| Respuesta háptica | Incluir solo donde el navegador/dispositivo lo admita; ignorar sin error si no. |
| Animaciones | Incluir interruptor y respetar `prefers-reduced-motion`. |
| Mostrar cronómetro | Incluir, opcional y sin límite de tiempo. |
| Tablero/retrato o lista de personajes | Incluir selector si la distribución resulta legible en móvil y escritorio. |
| Expandir pista al pasar sobre retrato | Incluir en escritorio; en teclado/táctil usar foco/selección. |
| Auto-X al colocar persona | Incluir; separar X automática/manual para deshacer correctamente. |
| Impedir X en celdas no ocupables | Incluir como ayuda; permitir desactivar. |
| Símbolos masculino/femenino | No incluir por defecto; personajes y pistas no deben exigir estereotipos ni comunicar género como dato lógico. Se puede revisar con el contenido final. |
| Persona colocada como letra o retrato | Incluir texto/inicial o retrato; no depender solo del retrato para identificar. |
| Animación al abrir caso | Diferir selección de tipos; MVP puede tener animación simple o ninguna, controlada por el ajuste general. |
| Ocultar solución en vistas previas | Incluir si se muestran miniaturas/lista de casos resueltos; por defecto ocultar spoilers. |
| Direcciones simplificadas | Incluir etiquetas accesibles (arriba/abajo/izquierda/derecha) junto a los nombres cardinales en pistas y ayuda; define traducción visual y semántica. |

### 9.2 Avanzadas

| Preferencia observada | Comportamiento propuesto |
|---|---|
| Marcas de triángulo/círculo/cuadrado/estrella | Incluir en MVP de anotaciones. |
| Mantener pulsado personaje para tachar lista | Incluir atajo opcional solo táctil; ofrecer botón accesible equivalente. |
| Resaltar términos en tooltips | Incluir categorías para pista, objetos, salas, personas y referencias de fila/columna. |
| Resaltar personaje seleccionado | Incluir con opción y contraste suficiente. |
| Etiquetas de fila y columna permanentes | Incluir; siempre visibles en pantallas pequeñas si ayudan a leer pistas. |
| Sombrear celdas no ocupables | Incluir, opcional. |
| Escala automática del tablero | Incluir y activar por defecto; no ocultar scroll necesario ni texto. |
| Resaltar sala al pasar sobre ella | Incluir hover/foco; activar temporalmente y no sustituir el nombre textual. |
| Tamaño de etiquetas de sala | Diferir slider en MVP; ofrecer tamaño automático y controles de zoom/accesibilidad si hace falta. |
| Opacidad de textura del suelo | Diferir slider; por defecto mantener contraste de rejilla y personajes. |
| Tamaño de objetos | Diferir slider individual; autoescalar por celda/huella. |
| Grosor de paredes/límites | Diferir slider; valor inicial debe separar claramente salas. |
| Tamaño de marcas X | Diferir slider; tamaño accesible fijo al comienzo. |
| Opacidad de sombras | Diferir slider; evitar que las sombras confundan el estado de una celda. |

### 9.3 Persistencia y controles

- Preferencias globales guardadas en `localStorage` bajo una clave versionada y un objeto validado; valores inválidos o JSON corrupto vuelven a defaults sin romper la partida.
- No guardar datos personales; no transmitir preferencias.
- Acciones de partida (semilla/configuración actual, placements, notas, X, contador/tiempo) se separan del objeto de preferencias. Persistencia de partida local se decidirá en su tarea; no hacerla requisito para iniciar.
- Panel de ajustes desplazable con títulos de sección, indicador de posición y controles accesibles; comprobar navegación con teclado y móvil.
- Toda opción tiene etiqueta visible y descripción corta. Un cambio visual se refleja inmediatamente y puede restablecerse a defaults.

## 10. Dirección visual y recursos

- Crear arte original de estilo ilustrado y legible; tablero y pistas deben conservar prioridad sobre decoración.
- No descargar, empaquetar ni reproducir assets de Murdoku (retratos, animales, objetos, suelo, sombras, iconografía o logotipo). La observación del sitio solo orienta sobre que el tablero combina cuadrícula, salas temáticas, objetos y retratos.
- Renderizar cuadrícula y límites desde el modelo lógico. Un SVG/Canvas puede dibujar la presentación, pero el DOM/modelo debe conservar interacciones y nombres accesibles.
- Cada asset tiene clave semántica, dimensiones de celda/huella, estado claro/oscuro si aplica, y texto alternativo o etiqueta accesible.
- Marcadores de persona, X, notas, objetos y ocupabilidad deben distinguirse en monocromo y con daltonismo. Añadir patrones/etiquetas, no solo color.
- En móvil, preferir escala automática y zoom/pan explícito para tableros grandes; nunca reducir retratos/pistas hasta hacerlos ilegibles.
- La lista final de personajes, nombres, salas, objetos, temas y assets se definirá como contenido propio en una tarea anterior a la implementación.

## 11. Accesibilidad, tamaños y rendimiento

- Ratón, teclado y táctil pueden completar las mismas acciones; todos los objetivos interactivos tienen foco visible y nombre accesible.
- Soportar movimiento reducido, contraste suficiente, no depender exclusivamente de color, y anunciar cambios de estado (persona colocada, error, victoria) mediante texto compatible con lectores de pantalla.
- Tooltips disponibles por hover y foco; en dispositivos táctiles hay una alternativa persistente/accionable.
- El tiempo no pausa ni penaliza. El audio empieza solo por acción explícita; preferencia sonora desactivada en primera carga salvo política acordada.
- El solucionador/generador no puede bloquear el hilo visible durante su búsqueda. En implementación evaluar Web Worker; mostrar progreso/cancelación si generación tarda.
- Perfilar en los extremos admitidos; si `N=16, P=16` excede el presupuesto de respuesta, ajustar algoritmo o rangos antes de entregar, sin degradar unicidad.
- Rutas relativas funcionan en `/` y bajo `/JuegosEnGitHub/`; cero dependencias de servidor para generar y jugar.

## 12. Errores y diagnóstico

- Errores de configuración se señalan antes de generar y mantienen valores seleccionados.
- Un candidato inválido se descarta internamente; la persona no ve falsos positivos ni pistas inconsistentes.
- Al agotar intentos/plazo, explicar que esa combinación no se pudo generar ahora y ofrecer ajustar tamaño/personas/nivel o reintentar. Mantener semilla y diagnóstico copiables solo desde modo depuración.
- Crear una serialización de diagnóstico (sin solución salvo opción explícita de desarrollo) con seed, versión, N/P, etapa, conteo de soluciones y métricas, para reproducir defectos.
- Los fallos de almacenamiento de preferencias no impiden jugar.
- Un enlace compartido malformado o de versión no soportada muestra mensaje y opción de iniciar caso nuevo.

## 13. Decisiones abiertas que bloquean la implementación

Estas preguntas deben cerrarse revisando este documento; ningún LLM de implementación debe resolverlas silenciosamente.

1. Aprobar o cambiar colocación con **como máximo una persona por fila y columna**, permitiendo filas vacías cuando `P < N`.
2. Aprobar la regla formal del asesinato: víctima y asesino son exactamente los dos ocupantes de la misma sala.
3. Confirmar `N=5..16`, `P=4..N`, y si los presets sugeridos de tamaño/personas satisfacen la dificultad buscada.
4. Elegir cuántos presets de dificultad y si se admitirá «cualquiera»; decidir si iniciar con generador limitado a tamaños pequeños y desbloquear progresivamente.
5. Aprobar qué técnicas de pista se admiten en el primer grupo y si conteo/paridad quedan fuera de MVP o dentro de una fase posterior.
6. Decidir si todas las personas menos la víctima deben tener una pista única por carta, permitiendo que la pista contenga dos átomos.
7. Aprobar preferencias de primera versión, su persistencia y el alcance pospuesto de sliders visuales.
8. Cerrar el catálogo original inicial (tema, salas, tipos de objeto, nombres, personajes y retratos) y licencias/forma de creación de arte.
9. Determinar presupuesto de generación, reintentos y clasificación cuando la dificultad solicitada no se encuentre.

## 14. Instrucciones para agentes de implementación

1. Leer `../../AGENTS.md`, `../../COMANDOS.md`, este `README.md`, `PLAN.md`, `CONTEXTO.md` y la tarea enlazada desde el plan antes de cambiar código.
2. Este `README.md` es la autoridad funcional. No copiar detalles de Murdoku ni inventar texto, reglas o valores abiertos.
3. Hacer solo la tarea y criterios marcados; respetar dependencias y no mezclar fases.
4. Las subtareas del plan son deliberadamente pequeñas. Si una requiere varios comportamientos o no cabe en una sesión breve, proponer subtareas nuevas numeradas antes de implementar ese bloque.
5. Si el código existente contradice una regla, detener esa parte y describir el conflicto en `CONTEXTO.md`; no cambiar la regla por iniciativa propia.
6. Separar generador determinista, modelo de dominio, solucionador, calificador, estado de jugador, interfaz, preferencias y renderizado visual.
7. El dibujo nunca determina ocupabilidad o región; esos datos proceden del modelo.
8. Todo caso que se muestre pasó validación de modelo, validez de solución, unicidad y plantilla de texto.
9. Mantener actualización del plan y contexto al cerrar cada tarea, describir comprobaciones realmente ejecutadas y dejar branch/commit/pendientes claros.
10. Usar assets propios identificados por clave; no incorporar recursos de sitios de referencia.
