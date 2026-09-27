# Plan del proyecto

## Objetivo

Publicar una colección de juegos web estáticos con GitHub Pages. La entrada principal será un menú con enlaces a cada juego. En la primera etapa no habrá cuentas, backend ni estadísticas remotas; las mejoras locales aprobadas se definen en propuestas específicas.

## Estado del proyecto

- Repositorio público: `JoseJacin/JuegosEnGitHub`.
- Rama principal: `main`; el remoto `origin` está configurado.
- GitHub Pages está activo y publica `main` desde la raíz: [josejacin.github.io/JuegosEnGitHub](https://josejacin.github.io/JuegosEnGitHub/).
- La presentación y las reglas de Botellas y líquidos están acordadas en [`juegos/botellas-y-liquidos/README.md`](juegos/botellas-y-liquidos/README.md).
- El catálogo y Botellas y líquidos están implementados y publicados.
- T1–T13 están completadas. T20 (refactor de la estructura de archivos de Botellas y líquidos, propuesta 038) también está completada. La siguiente tarea pendiente es T14, propuesta 032; las propuestas 032–037 siguen aprobadas y pendientes de implementación.

## Estructura prevista

```text
/
├── index.html                  # entrada del sitio, enlaza/dirige al menú
├── menu/
│   └── index.html              # catálogo de juegos
├── juegos/
│   └── botellas-y-liquidos/     # juego, interfaz y lógica
├── imagenes/                   # recursos gráficos compartidos
├── README.md
├── PLAN.md
└── CONTEXTO.md
```

Cada parte funcional tendrá su propio directorio. Un juego pequeño podrá implementarse en un solo HTML con CSS y JavaScript integrados; si el código crece, se separarán los archivos dentro de su carpeta. El sitio debe funcionar como archivos estáticos bajo la ruta de proyecto de GitHub Pages.

## Forma de trabajo

- Cada tarea principal representa una funcionalidad que se pueda revisar por separado.
- Las subtareas se completan en orden; se actualiza este plan y `CONTEXTO.md` al cerrar cada bloque.
- Para cambios de código, crear una rama `feature/<id>_<descripcion>`, hacer commits atómicos, fusionar en `main` y publicar las ramas necesarias en GitHub.
- Mantener las reglas de juego según la especificación aprobada. Si aparece una decisión de diseño que cambie esas reglas, aclararla antes de implementarla.

## Tareas de implementación

### T1 — Preparar la entrada del sitio y el catálogo

- [x] T1.1 Crear la entrada raíz que lleve al menú y funcione en la URL de GitHub Pages.
- [x] T1.2 Crear `menu/index.html` dentro de su directorio.
- [x] T1.3 Mostrar en el menú el catálogo de juegos y una tarjeta para Botellas y líquidos.
- [x] T1.4 Marcar como «Próximamente» los juegos sin página y activar el enlace cuando el juego esté disponible.
- [x] T1.5 Comprobar que las rutas relativas conservan sus destinos bajo el prefijo `/JuegosEnGitHub/`.

**Hecho cuando:** la URL publicada abre el menú y sus enlaces llevan a los juegos con rutas correctas.

### T2 — Crear la pantalla de configuración de Botellas y líquidos

- [x] T2.1 Crear la página del juego en `juegos/botellas-y-liquidos/`.
- [x] T2.2 Agrupar las variables y valores iniciales de configuración en una sección u objeto claramente identificado en el código.
- [x] T2.3 Permitir configurar botellas por fila (2–10), filas (1–6), colores (2–6) y capacidad máxima (2–6 unidades). La validación de T3 excluye capacidad 2 porque no permite dos colores por botella con espacio libre.
- [x] T2.4 Añadir la opción de capacidades distintas y la selección de 2–4 tamaños, limitada por los tamaños disponibles desde 3 hasta el máximo elegido.
- [x] T2.5 Mostrar la configuración antes de empezar y permitir editarla.
- [x] T2.6 Validar límites y combinaciones sin capacidad suficiente y explicar ajustes necesarios. El botón de inicio queda desactivado hasta que T3 incorpore el generador; este deberá seleccionar una asignación de capacidades compatible y generar una disposición resoluble.

**Hecho cuando:** todas las opciones acordadas se ven antes de empezar, se pueden cambiar y la configuración resultante respeta sus límites.

### T3 — Modelar botellas y generar partidas aleatorias resolubles

- [x] T3.1 Representar cada botella con capacidad, contenido por capas y estado abierto/tapado.
- [x] T3.2 Crear capacidades iguales o asignar capacidades distintas según la configuración.
- [x] T3.3 Calcular automáticamente las cantidades de cada color y permitir que un color complete varias botellas.
- [x] T3.4 Generar una disposición aleatoria cuya solución se conozca o pueda garantizarse.
- [x] T3.5 Garantizar que al inicio ninguna botella esté vacía ni llena: cada una debe tener al menos dos colores distintos y un espacio libre.
- [x] T3.6 Admitir tableros de hasta 60 botellas respetando colores, capacidades y cantidades.

**Hecho cuando:** cada configuración admitida genera una partida aleatoria resoluble, con todas las botellas parcialmente llenas y con al menos dos colores al inicio. El generador elige suficientes botellas objetivo para contener todo el líquido; los colores pueden repetirse entre objetivos, y puede haber botellas vacías durante la partida y al ganar.

### T4 — Implementar selección y trasvase

- [x] T4.1 Seleccionar origen y destino con clic en ordenador y toque en móvil.
- [x] T4.2 Permitir cancelar la selección tocando/clicando otra vez el origen.
- [x] T4.3 Validar que el origen tenga líquido y esté abierto, y que origen y destino sean botellas distintas.
- [x] T4.4 Permitir verter en una botella abierta vacía o sobre el mismo color superior, siempre que haya capacidad.
- [x] T4.5 Verter la capa continua superior hasta donde permita el espacio libre del destino.
- [x] T4.6 Tapar automáticamente las botellas llenas con un único color e impedir nuevos trasvases hacia ellas.
- [x] T4.7 Dar una respuesta visual clara al intentar un movimiento no válido.

**Hecho cuando:** todos los movimientos siguen las reglas y funcionan igual mediante ratón y pantalla táctil.

### T5 — Añadir historial, reinicio y final de partida

- [x] T5.1 Guardar los estados necesarios para deshacer cada movimiento válido.
- [x] T5.2 Permitir deshacer y volver al estado inicial de la disposición actual.
- [x] T5.3 Detectar la victoria cuando todas las botellas con líquido estén llenas al 100 %, con un único color y cerradas; las botellas vacías no impedirán ganar.
- [x] T5.4 Mostrar el mensaje de victoria con opciones de repetir con la misma configuración o cambiarla.
- [x] T5.5 Al repetir, generar una nueva disposición aleatoria con los valores de configuración actuales.

**Hecho cuando:** deshacer, reiniciar, victoria y repetición respetan la partida actual y las reglas acordadas. Implementado en la propuesta 023 (archivada en el historial de Git).

### T6 — Aplicar el estilo visual y adaptar la interfaz

- [x] T6.1 Usar la imagen como referencia: fondo oscuro, botellas en filas, líquidos por capas y marcas verdes en las completadas.
- [x] T6.2 Mostrar de forma legible capacidad, colores, selección y estado tapado de cada botella.
- [x] T6.3 Adaptar el tablero y la configuración a ordenador y móvil, incluidos tableros grandes.
- [x] T6.4 Asegurar que controles e información sigan siendo utilizables con teclado y lector de pantalla cuando corresponda.

**Hecho cuando:** el juego se entiende visualmente y se puede usar en tamaños de pantalla habituales sin perder controles o información. Implementado en la propuesta 024 (archivada en el historial de Git).

### T7 — Publicar y verificar en GitHub Pages

- [x] T7.1 Configurar GitHub Pages para publicar desde `main` en la carpeta acordada.
- [x] T7.2 Revisar manualmente menú, configuración, movimientos, deshacer, reinicio, victoria y repetición.
- [x] T7.3 Revisar al menos una configuración uniforme y otra de capacidades distintas, incluyendo un tablero grande.
- [x] T7.4 Comprobar carga directa de las páginas y recursos desde la URL de Pages.
- [x] T7.5 Actualizar README y CONTEXTO con la URL y el estado publicado.

**Hecho cuando:** el menú y el juego están accesibles desde la URL pública de GitHub Pages y los flujos principales funcionan. Verificación manual y publicación registradas en la propuesta 025 (archivada en el historial de Git).

### T8 — Centrar la interfaz en la partida y compactar el catálogo

- [x] T8.1 Colocar botellas completadas al inicio en orden de finalización, conservando identidad, historial y reinicio.
- [x] T8.2 Añadir corcho visual, quitar números visibles y conservar estado accesible.
- [x] T8.3 Sustituir las acciones de partida por iconos accesibles y ajustar tamaños para móvil.
- [x] T8.4 Añadir encabezados coherentes y dejar el resumen de configuración fuera de la partida.
- [x] T8.5 Revisar los estilos adaptables, teclado y código; registrar el límite de revisión visual interactiva.

**Hecho cuando:** el tablero prioriza el juego, la configuración concentra el resumen y las vistas son compactas y accesibles. Cambios registrados en la propuesta 026 (archivada en el historial de Git). La comprobación interactiva en navegador no estuvo disponible en esta sesión.

### T9 — Compactar estado y configuración; simplificar acceso desde el catálogo

- [x] T9.1 Sustituir el mensaje de selección y el título de partida por un estado compacto de cantidad y color, conservando el anuncio accesible.
- [x] T9.2 Alinear las acciones a la derecha y mostrar dos opciones de configuración por fila.
- [x] T9.3 Quitar textos positivos redundantes y reservar los mensajes para errores de configuración o generación agotada.
- [x] T9.4 Simplificar el catálogo y corregir la introducción de configuración.
- [x] T9.5 Registrar la propuesta y revisar el diff.

**Hecho cuando:** la partida, configuración y catálogo reflejan los cambios aprobados sin alterar las reglas. Cambios registrados en la propuesta 027 (archivada en el historial de Git).

### T10 — Ajustar el tablero para pantallas pequeñas

- [x] T10.1 Hacer que las diez columnas quepan en el ancho disponible y reducir la separación entre filas.
- [x] T10.2 Mantener el corcho dentro del ancho y mover el estado y el check al centro del vidrio.
- [x] T10.3 Mostrar los errores de botella llena y color no coincidente en el estado de movimiento.
- [x] T10.4 Reducir la separación de los controles y documentar el cambio.

**Hecho cuando:** el tablero compacto y sus mensajes muestran los estados aprobados sin cambiar las reglas. Cambios registrados en la propuesta 028 (archivada en el historial de Git).

### T11 — Modo aplicación móvil (PWA) y pantallas sin scroll vertical

- [x] T11.1 Crear el manifiesto `manifest.json` con `display: standalone` y los recursos de icono (SVG y PNG 192x192 / 512x512).
- [x] T11.2 Incluir metadatos para iOS (`apple-mobile-web-app-*`) y enlace a manifest e iconos en `index.html`, `menu/index.html` y el juego.
- [x] T11.3 Compactar el formulario de configuración para que quepa en pantalla móvil sin scroll vertical.
- [x] T11.4 Adaptar el tablero de juego a `100dvh`, reduciendo ligeramente la altura de las botellas para que hasta 6 filas quepan sin scroll vertical.
- [x] T11.5 Actualizar la propuesta, el plan y el contexto de continuidad.

**Hecho cuando:** la web se puede instalar como aplicación móvil en iPhone y Android abriendo en modo standalone, y tanto la configuración como la partida de hasta 6 filas caben al 100 % de la pantalla sin scroll vertical. Cambios registrados en la propuesta 029 (archivada en el historial de Git).

### T12 — Respetar zonas seguras (Safe Area) en iOS y Dynamic Island

- [x] T12.1 Aplicar reglas de `env(safe-area-inset-*)` al contenedor `main` en `juegos/botellas-y-liquidos/index.html` y en `menu/index.html`.
- [x] T12.2 Despejar la cabecera y el botón «← Menú» para que queden por debajo del área física de la Dynamic Island y la barra de estado.
- [x] T12.3 Descontar los insets de zona segura en el cálculo de altura de las botellas para mantener la partida libre de scroll vertical.
- [x] T12.4 Actualizar la propuesta, el plan y el contexto de continuidad.

**Hecho cuando:** en iPhone con Dynamic Island / notch, la cabecera y el botón de volver son totalmente accesibles sin solapamiento, y el juego y catálogo respetan las zonas seguras sin scroll indeseado. Cambios registrados en la propuesta [030](docs/propuestas/030_respetar_safe_area_ios.md).

### T13 — Ajustes visuales y limpieza de propuestas

- [x] T13.1 Cambiar el aviso de botella cerrada por formato compacto con icono «✕» usando `setMoveError`.
- [x] T13.2 Eliminar el `box-shadow` verde perimetral de `.bottle.selected`, manteniendo solo el fondo sutil y el contorno blanco sobre el vidrio.
- [x] T13.3 Eliminar las propuestas `008`–`029` de `docs/propuestas/`, conservando las dos últimas (`030` y `031`).
- [x] T13.4 Actualizar `docs/README.md`, `PLAN.md` y `CONTEXTO.md` para evitar enlaces rotos.

**Hecho cuando:** los mensajes de botella cerrada son compactos con icono, la selección no muestra borde verde, y el directorio de propuestas solo contiene las dos últimas. Cambios registrados en la propuesta [031](docs/propuestas/031_ajustes_visuales_y_limpieza_propuestas.md).

### T20 — Separar estructura, estilos y lógica de Botellas y líquidos

- [x] T20.1 Extraer el CSS integrado a `juegos/botellas-y-liquidos/styles.css`.
- [x] T20.2 Extraer el JavaScript integrado a `juegos/botellas-y-liquidos/game.js`.
- [x] T20.3 Enlazar los archivos con rutas relativas desde `index.html`, manteniendo el sitio estático.
- [x] T20.4 Actualizar la especificación del juego, el índice de propuestas y este contexto.
- [x] T20.5 Revisar el diff y confirmar que no se añaden dependencias ni cambios de reglas.

**Hecho cuando:** HTML, CSS y JavaScript están en archivos separados, el juego conserva su comportamiento y los recursos siguen usando rutas compatibles con GitHub Pages. Alcance aprobado por adelantado e implementado en la [propuesta 038](docs/propuestas/038_refactor_botellas_archivos.md).

### T14 — Contador de movimientos

- [ ] T14.1 Incrementar el contador solo después de un trasvase válido.
- [ ] T14.2 Reducirlo al deshacer un movimiento.
- [ ] T14.3 Reiniciarlo al iniciar o reiniciar una partida.
- [ ] T14.4 Mostrarlo junto a las acciones del tablero y adaptar su tamaño a móvil.
- [ ] T14.5 Crear la rama `feature/032_contador_movimientos`, revisar y confirmar el cambio, fusionarlo en `main` y publicarlo.

**Hecho cuando:** el contador refleja los trasvases válidos, los deshacer y los reinicios sin romper la cabecera en móvil. Alcance aprobado en la [propuesta 032](docs/propuestas/032_contador_movimientos.md).

### T15 — Récord local

- [ ] T15.1 Guardar y consultar el mínimo de movimientos por configuración en `localStorage`, tolerando errores de acceso.
- [ ] T15.2 Comparar el resultado al ganar y actualizar el diálogo de victoria.
- [ ] T15.3 Crear la rama `feature/033_record_local`, revisar y confirmar el cambio, fusionarlo en `main` y publicarlo.

**Hecho cuando:** el récord se crea y mejora según los criterios aprobados, y el juego sigue funcionando si `localStorage` no está disponible. Depende de T14; alcance en la [propuesta 033](docs/propuestas/033_record_local.md).

### T16 — Pista de movimiento

- [ ] T16.1 Encontrar una pareja origen-destino válida y resaltarla temporalmente.
- [ ] T16.2 Cancelar selección activa antes de mostrar la pista y avisar si no hay movimientos.
- [ ] T16.3 Añadir botón accesible y deshabilitarlo tras ganar.
- [ ] T16.4 Crear la rama `feature/034_pista_hint`, revisar y confirmar el cambio, fusionarlo en `main` y publicarlo.

**Hecho cuando:** la pista resalta un movimiento legal sin ejecutarlo y no interfiere con selección ni victoria. Alcance en la [propuesta 034](docs/propuestas/034_pista_hint.md).

### T17 — Compartir resultado

- [ ] T17.1 Construir un resumen con colores completados, movimientos y URL del juego.
- [ ] T17.2 Copiarlo al portapapeles con alternativa manual cuando la API no esté disponible.
- [ ] T17.3 Crear la rama `feature/035_compartir_resultado`, revisar y confirmar el cambio, fusionarlo en `main` y publicarlo.

**Hecho cuando:** el diálogo de victoria permite copiar un resultado con emojis correctos y ofrece el fallback aprobado. Depende de T14; alcance en la [propuesta 035](docs/propuestas/035_compartir_resultado.md).

### T18 — Animación de vertido

- [ ] T18.1 Revisar el renderizado actual y determinar cómo animar las capas sin retrasar movimientos.
- [ ] T18.2 Aplicar la transición respetando `prefers-reduced-motion` y comprobarla en móvil.
- [ ] T18.3 Crear la rama `feature/036_animacion_vertido`, revisar y confirmar el cambio, fusionarlo en `main` y publicarlo.

**Hecho cuando:** el vertido tiene una transición suave, se desactiva con movimiento reducido y no bloquea la interacción. Alcance en la [propuesta 036](docs/propuestas/036_animacion_vertido.md).

### T19 — Modo daltónico / alto contraste

- [ ] T19.1 Definir patrones distinguibles en escala de grises para los colores del juego.
- [ ] T19.2 Añadir un control accesible y aplicar/restaurar su preferencia local.
- [ ] T19.3 Crear la rama `feature/037_modo_daltonico`, revisar y confirmar el cambio, fusionarlo en `main` y publicarlo.

**Hecho cuando:** los líquidos se distinguen por patrón sin depender del color, la preferencia persiste y las reglas de juego no cambian. Alcance en la [propuesta 037](docs/propuestas/037_modo_daltonico.md).

## Dependencias y orden sugerido

1. T1 y T2 preparan navegación y opciones de partida.
2. T3 depende de T2 y debe quedar resuelta antes de considerar listo el juego.
3. T4 depende del modelo de botellas de T3.
4. T5 depende de los movimientos de T4.
5. T6 puede avanzar junto con T1–T5, ajustándose al comportamiento real.
6. T7 depende de que T1–T6 estén completos.
7. T20 es un refactor transversal completado antes de continuar las mejoras pendientes.
8. T14 es la siguiente tarea pendiente. T15 y T17 dependen de T14; T16, T18 y T19 son independientes. Se mantiene el orden de propuestas como secuencia de trabajo inicial.

## Decisiones vigentes

- Publicación estática con GitHub Pages.
- Sin cuentas, backend ni estadísticas remotas en la primera versión. Las propuestas aprobadas pueden añadir almacenamiento local en el dispositivo.
- Un directorio por parte funcional y por juego.
- Reglas aprobadas en `juegos/botellas-y-liquidos/README.md`; ese documento es la fuente de verdad para la mecánica.
- La referencia gráfica existente está en `imagenes/Juego de botellas y líquidos.png`.
