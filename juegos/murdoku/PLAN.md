# Plan de Murdoku

Este plan convierte el alcance aprobado en entregas pequeñas para que cada una se pueda implementar, revisar y revertir por separado. Las reglas funcionales están en [`README.md`](README.md), todavía en borrador; la propuesta de alcance aprobada es [043](propuestas/043_murdoku_generacion_visual.md). El plan general del sitio está en [`../../PLAN.md`](../../PLAN.md).

## Objetivo

Generar y jugar casos originales de deducción en cuadrículas configurables. Cada partida nueva genera un mapa visual nuevo, personas, solución y pistas desde una semilla. Solo se muestra un caso si es válido y tiene solución única.

## Estado

- Propuesta 043 aprobada e integrada en `main`.
- Especificación funcional detallada en borrador; quedan decisiones bloqueantes en [`README.md` §13](README.md#13-decisiones-abiertas-que-bloquean-la-implementación).
- No se ha iniciado implementación ni se han creado assets.
- La rama actual documenta y prepara tareas; no autoriza a implementar reglas que sigan abiertas.

## Guía para ejecutar tareas

- **Una subtarea es un cambio pequeño:** una función, regla, plantilla, control o recurso por vez. Como referencia, debe caber en una sesión corta de un agente y producir un resultado revisable.
- Si una subtarea afecta a varios comportamientos, varios tipos de pista o muchas piezas a la vez, desglosarla antes en subtareas `X.Y.Z`. No agrupar trabajo solo porque comparta archivo.
- Ejecutar únicamente la subtarea asignada y las dependencias explícitas. No anticipar subtareas posteriores.
- Al empezar, leer [`../../AGENTS.md`](../../AGENTS.md), [`../../COMANDOS.md`](../../COMANDOS.md), [`README.md`](README.md), este plan y [`CONTEXTO.md`](CONTEXTO.md).
- `README.md` manda sobre las reglas. Una decisión marcada pendiente bloquea el código relacionado. Parar y anotar el conflicto; no adivinar.
- Cada subtarea debe dejar un resultado observable, cubrir su criterio de aceptación, revisar el diff y registrar en el contexto qué cambió y qué queda.
- No mezclar generación de mapa, lógica de resolución, presentación y preferencias en la misma entrega salvo que la tarea lo indique.
- Mantener archivos estáticos, rutas relativas y compatibilidad con GitHub Pages. No agregar backend ni dependencias sin propuesta aprobada.
- Código, textos, nombres y assets deben ser originales. No extraer material de Murdoku.

## Tareas

### 0. Aprobar las reglas y cerrar decisiones

**Estado:** en curso; no iniciar tareas 1–10 hasta cerrar los bloqueos aplicables.

- [ ] **0.1** Acordar si `P < N` permite filas y columnas vacías.
- [ ] **0.2** Acordar si cada fila/columna es “como máximo una persona” o “exactamente una persona”.
- [ ] **0.3** Acordar que el recuento de personas incluye a la víctima.
- [ ] **0.4** Aprobar la definición de asesino y ocupación exclusiva de la sala con la víctima.
- [ ] **0.5** Aprobar rangos de tamaño `N` y de personas `P`.
- [ ] **0.6** Aprobar los cinco niveles y decidir si existe modo “cualquiera”.
- [ ] **0.7** Aprobar qué familias de pistas entran en primera versión.
- [ ] **0.8** Decidir si las pistas de conteo/paridad quedan para una fase futura.
- [ ] **0.9** Aprobar el conjunto de ajustes incluidos en la primera versión.
- [ ] **0.10** Acordar presupuesto inicial de generación y comportamiento al agotar reintentos.
- [ ] **0.11** Incorporar las decisiones acordadas al [`README.md`](README.md).
- [ ] **0.12** Cambiar el estado de la especificación a aprobada y actualizar contexto.

**Hecho cuando:** las reglas que condicionan el modelo, las combinaciones de configuración, las pistas y la primera versión están decididas en `README.md`.

### 1. Crear el modelo de datos y validar configuración

**Dependencia:** tarea 0.

- [ ] **1.1** Definir los tipos de `PuzzleConfig` (`N`, `P`, dificultad solicitada).
- [ ] **1.2** Definir tipos/IDs de celda, sala, objeto, persona, pista y semilla.
- [ ] **1.3** Definir el tipo de datos `Cell` con fila, columna, sala, terreno y ocupabilidad.
- [ ] **1.4** Definir el tipo `Room` con nombre, tema y lista de celdas.
- [ ] **1.5** Definir `ObjectInstance` con tipo, huella de celdas y ocupabilidad.
- [ ] **1.6** Definir `Person` con ID, etiqueta, rol y retrato.
- [ ] **1.7** Definir un tipo discriminado para cada átomo de pista aprobado.
- [ ] **1.8** Definir `Solution` como asignación de persona a celda y culpable.
- [ ] **1.9** Definir `PlayerState` separado de la definición inmutable del caso.
- [ ] **1.10** Definir las versiones de esquema, generador y clasificador.
- [ ] **1.11** Validar que `N` esté dentro del rango aprobado.
- [ ] **1.12** Validar que `P` esté dentro del rango aprobado y cumpla la relación con `N`.
- [ ] **1.13** Validar que la dificultad solicitada sea una opción conocida.
- [ ] **1.14** Mostrar un error de configuración legible para cada valor inválido.

**Hecho cuando:** cada dato de dominio tiene un tipo claro, las decisiones no se esconden en el render y la configuración inválida no entra al generador.

### 2. Hacer reproducible la generación

**Dependencia:** 1.1 y 1.10.

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

**Hecho cuando:** semilla + configuración + versión producen las mismas elecciones en llamadas repetidas y los parámetros inválidos no crean casos distintos de forma silenciosa.

### 3. Generar una cuadrícula y recintos variables

**Dependencias:** 1 y 2.

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
- [ ] **3.11** Rechazar tableros con formas o proporciones fuera de los límites de legibilidad.
- [ ] **3.12** Volver a generar una partición rechazada con un límite de intentos.
- [ ] **3.13** Elegir nombres originales de recinto sin duplicados dentro del tablero.
- [ ] **3.14** Asignar un tipo de terreno válido a cada celda.
- [ ] **3.15** Validar de nuevo la coherencia entre `Room.cellIds` y `Cell.roomId`.

**Hecho cuando:** la salida es una cuadrícula completa con recintos conectados de formas variables, reproducibles y validados antes de decorarse.

### 4. Generar objetos y disponibilidad de celdas

**Dependencia:** 3.

- [ ] **4.1** Crear el catálogo tipado de objetos aprobados.
- [ ] **4.2** Marcar en el catálogo qué tipos de objeto permiten ocupación.
- [ ] **4.3** Colocar un objeto de una celda dentro de un recinto compatible.
- [ ] **4.4** Rechazar objeto de una celda fuera del tablero.
- [ ] **4.5** Colocar una huella de objeto de varias celdas solo en celdas válidas.
- [ ] **4.6** Rechazar superposición de objetos no compatibles.
- [ ] **4.7** Actualizar `Cell.objectIds` al colocar una instancia.
- [ ] **4.8** Calcular `Cell.occupiable` desde terreno y objetos.
- [ ] **4.9** Asegurar que cada fila admite suficientes posiciones para la solución configurada.
- [ ] **4.10** Asegurar que cada columna admite suficientes posiciones para la solución configurada.
- [ ] **4.11** Rechazar mapas con menos celdas ocupables que personas.
- [ ] **4.12** Crear tooltip descriptivo de un objeto.
- [ ] **4.13** Crear etiquetas visibles para tipos de objeto y terreno.

**Hecho cuando:** objetos y celdas coinciden en el modelo; el decorado no bloquea todas las soluciones ni tapa información esencial.

### 5. Implementar el solucionador exacto

**Dependencias:** 1 y 4; reglas de tarea 0 aprobadas.

- [ ] **5.1** Crear el dominio inicial de celdas ocupables para una persona.
- [ ] **5.2** Quitar del dominio las celdas fuera del tablero o no ocupables.
- [ ] **5.3** Propagar la restricción de no compartir celda.
- [ ] **5.4** Propagar la restricción de fila aprobada.
- [ ] **5.5** Propagar la restricción de columna aprobada.
- [ ] **5.6** Implementar el predicado de sala exacta.
- [ ] **5.7** Implementar el predicado de pertenencia a una de varias salas.
- [ ] **5.8** Implementar predicados de fila y columna.
- [ ] **5.9** Implementar relaciones norte/sur/este/oeste según el glosario.
- [ ] **5.10** Implementar ocupación exacta de objeto.
- [ ] **5.11** Implementar adyacencia a un objeto.
- [ ] **5.12** Implementar adyacencia a otra persona.
- [ ] **5.13** Implementar no-adyacencia.
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

**Hecho cuando:** cualquier definición puede contarse hasta dos soluciones de forma reproducible, sin aceptar una solución parcial ni esconder contradicciones.

### 6. Crear personas, solución y pistas

**Dependencias:** 2, 4 y 5.

- [ ] **6.1** Crear el modelo de nombre original y etiqueta visible de persona.
- [ ] **6.2** Crear exactamente una persona con rol víctima.
- [ ] **6.3** Crear `P-1` personas con rol sospechoso.
- [ ] **6.4** Asignar IDs estables a las personas del caso.
- [ ] **6.5** Elegir celdas ocupables distintas para una solución testigo.
- [ ] **6.6** Comprobar que la solución testigo respeta filas y columnas.
- [ ] **6.7** Elegir víctima y culpable compatibles con la regla aprobada.
- [ ] **6.8** Comprobar ocupación exclusiva de la sala del crimen.
- [ ] **6.9** Generar un átomo de sala verdadera para una persona.
- [ ] **6.10** Generar un átomo verdadero de fila/columna/dirección.
- [ ] **6.11** Generar un átomo verdadero de ocupación de objeto.
- [ ] **6.12** Generar un átomo verdadero de adyacencia a objeto/persona.
- [ ] **6.13** Generar un átomo verdadero de negación de adyacencia.
- [ ] **6.14** Generar un átomo verdadero de soledad/relación en sala.
- [ ] **6.15** Renderizar cada clave de pista con plantilla española revisada.
- [ ] **6.16** Verificar que los IDs de cada pista existen en el caso.
- [ ] **6.17** Elegir una pista para cada sospechoso según reglas aprobadas.
- [ ] **6.18** Añadir la pista estándar de víctima.
- [ ] **6.19** Ejecutar solucionador en el conjunto inicial de pistas.
- [ ] **6.20** Eliminar un átomo candidato si el caso conserva solución única.
- [ ] **6.21** Conservar el átomo si quitarlo vuelve ambiguo el caso.
- [ ] **6.22** Rechazar caso sin solución única al alcanzar el límite de intentos.
- [ ] **6.23** Guardar la solución aparte de las pistas visibles.
- [ ] **6.24** Ejecutar validación integral antes de devolver el caso al juego.

**Hecho cuando:** todas las pistas son ciertas, visibles y semánticamente válidas; el caso aceptado tiene solución testigo y el solucionador confirma que solo hay una.

### 7. Calcular y calibrar dificultad

**Dependencias:** 5 y 6.

- [ ] **7.1** Definir el formato de un paso pedagógico (regla, pista, dominio antes/después).
- [ ] **7.2** Detectar una colocación directa de una sola celda (`D0_DIRECT`).
- [ ] **7.3** Detectar eliminación de fila/columna (`D1_EXCLUSION`).
- [ ] **7.4** Detectar deducción de relación entre dos entidades (`D2_RELATION`).
- [ ] **7.5** Detectar deducción de cardinalidad aprobada (`D3_CARDINALITY`).
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

**Hecho cuando:** nivel y pasos se pueden reproducir, explicar y calibrar; el tamaño o los nodos de búsqueda por sí solos no asignan categoría.

### 8. Implementar la interfaz y acciones

**Dependencias:** especificación aprobada; integración por etapas con 3–7.

- [ ] **8.1** Crear pantalla inicial con selector de nivel.
- [ ] **8.2** Crear selector de tamaño `N`.
- [ ] **8.3** Crear selector independiente de personas `P`.
- [ ] **8.4** Mostrar preset sugerido sin cambiar configuración personalizada.
- [ ] **8.5** Mostrar progreso mientras se genera el caso.
- [ ] **8.6** Permitir cancelar una generación en curso.
- [ ] **8.7** Mostrar tablero desde el modelo validado.
- [ ] **8.8** Mostrar una carta para cada persona y pista.
- [ ] **8.9** Seleccionar persona por ratón.
- [ ] **8.10** Colocar persona al elegir una celda válida.
- [ ] **8.11** Mover persona ya colocada a otra celda.
- [ ] **8.12** Quitar persona con acción explícita.
- [ ] **8.13** Marcar y quitar X manual.
- [ ] **8.14** Marcar y quitar notas avanzadas.
- [ ] **8.15** Deshacer una acción por vez.
- [ ] **8.16** Reiniciar la misma semilla y configuración.
- [ ] **8.17** Solicitar y mostrar una pista incremental.
- [ ] **8.18** Impedir envío si falta alguna persona.
- [ ] **8.19** Indicar envío incorrecto sin señalar toda la solución.
- [ ] **8.20** Mostrar victoria, ubicación final y culpable al resolver.
- [ ] **8.21** Iniciar una partida con nueva semilla y misma configuración.
- [ ] **8.22** Copiar un enlace reproducible del caso.

**Hecho cuando:** el jugador puede configurar, resolver, deshacer, reiniciar y compartir el mismo caso desde los controles documentados.

### 9. Añadir tooltips, preferencias y accesibilidad

**Dependencias:** 8.7 y decisiones aprobadas de README §§8–9.

- [ ] **9.1** Mostrar tooltip de persona con nombre, pista y estado.
- [ ] **9.2** Mostrar tooltip de celda con coordenadas, sala, terreno, objeto y ocupabilidad.
- [ ] **9.3** Abrir tooltip al pasar el ratón sobre persona.
- [ ] **9.4** Abrir tooltip al pasar el ratón sobre celda.
- [ ] **9.5** Permitir abrir el tooltip de persona con foco de teclado.
- [ ] **9.6** Permitir abrir información de celda con foco de teclado.
- [ ] **9.7** Proveer alternativa táctil a ambos tooltips.
- [ ] **9.8** Resaltar términos de pista por tipo semántico.
- [ ] **9.9** Añadir tema oscuro/claro.
- [ ] **9.10** Añadir sonido y volumen.
- [ ] **9.11** Añadir animaciones y respetar movimiento reducido.
- [ ] **9.12** Añadir temporizador opcional.
- [ ] **9.13** Añadir modo visual de persona por letra/retrato.
- [ ] **9.14** Añadir Auto-X con seguimiento de marcas automáticas.
- [ ] **9.15** Añadir preferencia para X en celdas no ocupables.
- [ ] **9.16** Añadir etiquetas persistentes de fila/columna.
- [ ] **9.17** Añadir resaltado de selección y de sala.
- [ ] **9.18** Añadir sombreado opcional de celdas no ocupables.
- [ ] **9.19** Añadir marcas de triángulo, círculo, cuadrado y estrella.
- [ ] **9.20** Guardar/cargar cada preferencia en `localStorage` con versión.
- [ ] **9.21** Recuperarse de preferencias corruptas usando valores por defecto.
- [ ] **9.22** Añadir nombres accesibles y anuncios de cambio de estado.
- [ ] **9.23** Comprobar que la información no depende solo del color.
- [ ] **9.24** Añadir controles de sonido, foco y toque con etiquetas legibles.

**Hecho cuando:** información y acciones están disponibles por ratón, teclado y táctil; preferencias fallidas no impiden jugar.

### 10. Crear arte original y adaptar el tablero

**Dependencias:** catálogo de contenido aprobado; puede avanzar visualmente con modelo estable de tarea 1.

- [ ] **10.1** Aprobar una dirección visual original para el juego.
- [ ] **10.2** Crear un asset de terreno base.
- [ ] **10.3** Crear un asset de límite de sala.
- [ ] **10.4** Crear los primeros assets originales de objetos ocupables.
- [ ] **10.5** Crear los primeros assets originales de obstáculos.
- [ ] **10.6** Crear retratos/avatares originales o estilo de marcador alternativo.
- [ ] **10.7** Añadir etiquetas/IDs accesibles a cada asset.
- [ ] **10.8** Dibujar huellas de objetos desde celdas del modelo.
- [ ] **10.9** Dibujar límites de sala desde `roomId`.
- [ ] **10.10** Dibujar correctamente X, notas y personas sobre cada celda.
- [ ] **10.11** Ajustar escala automática del tablero a escritorio.
- [ ] **10.12** Ajustar tablero y paneles a móvil.
- [ ] **10.13** Permitir desplazamiento/zoom legible en tableros grandes.
- [ ] **10.14** Comprobar que el texto y los marcadores no se solapan.
- [ ] **10.15** Revisar un caso de cada nivel con la misma representación.

**Hecho cuando:** el tablero muestra el modelo sin usar assets de referencia y es legible en los tamaños incluidos.

### 11. Integrar, verificar y publicar

**Dependencias:** 1–10 en el alcance MVP aprobado.

- [ ] **11.1** Añadir la entrada de Murdoku al catálogo del sitio.
- [ ] **11.2** Verificar rutas relativas desde raíz local.
- [ ] **11.3** Verificar rutas bajo `/JuegosEnGitHub/`.
- [ ] **11.4** Perfilar una configuración pequeña.
- [ ] **11.5** Perfilar cada tamaño habilitado.
- [ ] **11.6** Medir candidatos rechazados y duración por etapa.
- [ ] **11.7** Corregir un bloqueo del hilo principal si aparece.
- [ ] **11.8** Verificar reproducción por semilla/configuración/versión.
- [ ] **11.9** Verificar persistencia inválida de preferencias.
- [ ] **11.10** Verificar controles ratón/teclado/táctil.
- [ ] **11.11** Resolver defectos y documentar los que quedan.
- [ ] **11.12** Actualizar especificación, plan y contexto con resultados reales.
- [ ] **11.13** Revisar `git diff --check`, estado y contenido de los archivos.
- [ ] **11.14** Cerrar entrega mediante el flujo Git del repositorio.

**Hecho cuando:** cada configuración que se ofrezca genera un caso jugable, válido, único, explicable y responsivo en la publicación estática.

## Dependencias generales

```text
0 (aprobación funcional)
└── 1 (modelo/configuración)
    ├── 2 (semillas)
    └── 3 (salas)
        └── 4 (objetos/ocupabilidad)
            ├── 5 (solucionador exacto)
            │   ├── 6 (solución/pistas/unicidad)
            │   │   └── 7 (dificultad)
            │   └── 8 (interfaz: integrar gradualmente)
            └── 10 (render)
8 ── 9 (tooltips/ajustes/accesibilidad)
1–10 ── 11 (integración y publicación)
```

Los bloques pueden dividirse todavía más durante implementación si una subtarea resulta mayor de lo previsto. Nunca marcar un bloque principal terminado mientras quede una subtarea necesaria sin aceptar.

## Decisiones vigentes y límites

- `N=5..16` y `P=4..N` siguen siendo valores propuestos, no reglas aprobadas.
- Presets de nivel son orientativos y no sustituyen el clasificador de razonamiento.
- Solo se implementan reglas y plantillas que aparezcan aprobadas en [`README.md`](README.md).
- La solución se genera/valida en cliente para evitar backend; no se promete secreto frente a inspección del navegador.
- Este trabajo no altera las propuestas pendientes de Botellas y líquidos ni sus dependencias.
