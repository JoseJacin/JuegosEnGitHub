# Plan del proyecto

## Objetivo

Publicar una colección de juegos web estáticos con GitHub Pages. La entrada principal será un menú con enlaces a cada juego. En la primera etapa no habrá cuentas, estadísticas remotas ni servidor.

## Estado del proyecto

- Repositorio público: `JoseJacin/JuegosEnGitHub`.
- Rama principal: `main`; el remoto `origin` está configurado.
- GitHub Pages todavía no está activado.
- La presentación y las reglas de Botellas y líquidos están acordadas en [`juegos/botellas-y-liquidos/README.md`](juegos/botellas-y-liquidos/README.md).
- Aún no hay páginas ni código de juego implementados.

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
- [x] T2.3 Permitir configurar botellas por fila (2–10), filas (1–6), colores (2–6) y capacidad máxima (2–6 unidades).
- [x] T2.4 Añadir la opción de capacidades distintas y la selección de 2–4 tamaños, limitada por los tamaños disponibles hasta el máximo elegido.
- [x] T2.5 Mostrar la configuración antes de empezar y permitir editarla.
- [x] T2.6 Validar límites y combinaciones sin capacidad suficiente y explicar ajustes necesarios. El botón de inicio queda desactivado hasta que T3 incorpore el generador; este deberá seleccionar una asignación de capacidades compatible y generar una disposición resoluble.

**Hecho cuando:** todas las opciones acordadas se ven antes de empezar, se pueden cambiar y la configuración resultante respeta sus límites.

### T3 — Modelar botellas y generar partidas aleatorias resolubles

- [x] T3.1 Representar cada botella con capacidad, contenido por capas y estado abierto/tapado.
- [x] T3.2 Crear capacidades iguales o asignar capacidades distintas según la configuración.
- [x] T3.3 Calcular automáticamente las cantidades de cada color para que puedan terminar en botellas llenas del mismo color.
- [x] T3.4 Generar una disposición aleatoria cuya solución se conozca o pueda garantizarse.
- [x] T3.5 Garantizar que al inicio ninguna botella esté vacía ni llena: cada una debe tener al menos una unidad y un espacio libre.
- [x] T3.6 Admitir tableros de hasta 60 botellas respetando colores, capacidades y cantidades.

**Hecho cuando:** cada configuración admitida genera una partida aleatoria resoluble, con el estado inicial descrito en las reglas: todas las botellas parcialmente llenas. El generador designa una botella objetivo por color y asigna a ese color un volumen igual a la capacidad de su objetivo; la disposición puede incluir varias capas de colores distintos en una botella. Las botellas vacías se permiten durante la partida y al ganar.

### T4 — Implementar selección y trasvase

- [ ] T4.1 Seleccionar origen y destino con clic en ordenador y toque en móvil.
- [ ] T4.2 Permitir cancelar la selección tocando/clicando otra vez el origen.
- [ ] T4.3 Validar que el origen tenga líquido y esté abierto, y que origen y destino sean botellas distintas.
- [ ] T4.4 Permitir verter en una botella abierta vacía o sobre el mismo color superior, siempre que haya capacidad.
- [ ] T4.5 Verter la capa continua superior hasta donde permita el espacio libre del destino.
- [ ] T4.6 Tapar automáticamente las botellas llenas con un único color e impedir nuevos trasvases hacia ellas.
- [ ] T4.7 Dar una respuesta visual clara al intentar un movimiento no válido.

**Hecho cuando:** todos los movimientos siguen las reglas y funcionan igual mediante ratón y pantalla táctil.

### T5 — Añadir historial, reinicio y final de partida

- [ ] T5.1 Guardar los estados necesarios para deshacer cada movimiento válido.
- [ ] T5.2 Permitir deshacer y volver al estado inicial de la disposición actual.
- [ ] T5.3 Detectar la victoria cuando todas las botellas con líquido estén llenas al 100 %, con un único color y cerradas; las botellas vacías no impedirán ganar.
- [ ] T5.4 Mostrar el mensaje de victoria con opciones de repetir con la misma configuración o cambiarla.
- [ ] T5.5 Al repetir, generar una nueva disposición aleatoria con los valores de configuración actuales.

**Hecho cuando:** deshacer, reiniciar, victoria y repetición respetan la partida actual y las reglas acordadas.

### T6 — Aplicar el estilo visual y adaptar la interfaz

- [ ] T6.1 Usar la imagen como referencia: fondo oscuro, botellas en filas, líquidos por capas y marcas verdes en las completadas.
- [ ] T6.2 Mostrar de forma legible capacidad, colores, selección y estado tapado de cada botella.
- [ ] T6.3 Adaptar el tablero y la configuración a ordenador y móvil, incluidos tableros grandes.
- [ ] T6.4 Asegurar que controles e información sigan siendo utilizables con teclado y lector de pantalla cuando corresponda.

**Hecho cuando:** el juego se entiende visualmente y se puede usar en tamaños de pantalla habituales sin perder controles o información.

### T7 — Publicar y verificar en GitHub Pages

- [ ] T7.1 Configurar GitHub Pages para publicar desde `main` en la carpeta acordada.
- [ ] T7.2 Revisar manualmente menú, configuración, movimientos, deshacer, reinicio, victoria y repetición.
- [ ] T7.3 Revisar al menos una configuración uniforme y otra de capacidades distintas, incluyendo un tablero grande.
- [ ] T7.4 Comprobar carga directa de las páginas y recursos desde la URL de Pages.
- [ ] T7.5 Actualizar README y CONTEXTO con la URL y el estado publicado.

**Hecho cuando:** el menú y el juego están accesibles desde la URL pública de GitHub Pages y los flujos principales funcionan.

## Dependencias y orden sugerido

1. T1 y T2 preparan navegación y opciones de partida.
2. T3 depende de T2 y debe quedar resuelta antes de considerar listo el juego.
3. T4 depende del modelo de botellas de T3.
4. T5 depende de los movimientos de T4.
5. T6 puede avanzar junto con T1–T5, ajustándose al comportamiento real.
6. T7 depende de que T1–T6 estén completos.

## Decisiones vigentes

- Publicación estática con GitHub Pages.
- Sin estadísticas persistentes ni backend en la primera versión.
- Un directorio por parte funcional y por juego.
- Reglas aprobadas en `juegos/botellas-y-liquidos/README.md`; ese documento es la fuente de verdad para la mecánica.
- La referencia gráfica existente está en `imagenes/Juego de botellas y líquidos.png`.
