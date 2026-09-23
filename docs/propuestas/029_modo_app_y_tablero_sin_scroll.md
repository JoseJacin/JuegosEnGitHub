# Propuesta: modo aplicación móvil y tablero de partida sin scroll vertical

**Estado:** Implementada
**Fecha:** 2026-09-23
**Responsable:** Usuario y agente Antigravity

## Problema y objetivo

El usuario desea que el sitio se pueda instalar o simule ser una aplicación móvil nativa en iPhone y Android. Para conseguir esa experiencia, ninguna pantalla (ni la configuración inicial ni la partida) debe comportarse como un documento web con scroll vertical, sino que debe encajar por completo dentro de la pantalla disponible (`100dvh`), reduciendo ligeramente la altura de las botellas en la partida y optimizando los espacios en la configuración para que todo sea visible sin scroll vertical.

## Alcance

- Incluye:
  - Metadatos de aplicación móvil para iOS (`apple-mobile-web-app-capable`, `apple-mobile-web-app-status-bar-style`, `apple-mobile-web-app-title`, icono táctil).
  - Manifiesto de aplicación web (`manifest.json`) enlazado en las páginas para Android y navegadores modernos (`display: "standalone"`, tema oscuro `#101821`, ruta de inicio relativa al repositorio).
  - Recurso de icono visual para la pantalla de inicio y el manifiesto.
  - Ajuste en `juegos/botellas-y-liquidos/index.html` para que tanto el formulario de configuración (`#settings`) como el tablero de partida (`#game`) encajen dentro del alto disponible (`100dvh` / `100vh`) sin scroll vertical en pantallas móviles estándar.
  - Reducción ligera de la altura base de las botellas y ajuste compacto/adaptativo para que 6 filas quepan verticalmente sin scroll.
- No incluye:
  - Cambios en las reglas del juego, generador, historial ni lógica de trasvases.
  - Backend, sincronización remota ni almacenamiento en servidor.
  - Service Workers complejos o notificaciones push.

## Requisitos y decisiones

1. **Simulación de aplicación en iOS y Android:**
   - La entrada, el menú y el juego declaran etiquetas `<meta>` y un `<link rel="manifest">` con `display: "standalone"`.
   - Al agregar el sitio a la pantalla de inicio en Safari (iOS) o Chrome (Android), se abre en ventana completa e independiente, ocultando las barras del navegador.
2. **Pantallas sin scroll vertical (filosofía de app nativa):**
   - Tanto la pantalla de configuración previa (`#settings`) como la de partida (`#game`) distribuyen su contenido en el 100 % del alto visible de la pantalla (`100dvh`), evitando barras de desplazamiento vertical en móvil.
   - En la configuración, se compactan márgenes, paddings y tamaños de fuente para que leyenda, selectores de 2 columnas, checkbox de tamaños y resumen quepan en pantalla completa.
   - En la partida, cabecera, barra de estado/acciones y la cuadrícula de botellas se ajustan para no provocar desbordamiento vertical.
3. **Altura de botellas más compacta:**
   - Se reduce ligeramente la altura de las botellas (ajuste compacto y adaptativo según filas), conservando la proporción visual, el corcho, la visibilidad de las capas líquidas y la etiqueta de llenado central.

## Criterios de aceptación

- [x] Al guardar en la pantalla de inicio en iOS o Android, la aplicación abre en modo *standalone* sin barras de dirección.
- [x] La pantalla de configuración inicial cabe completa en pantalla móvil sin scroll vertical.
- [x] En la configuración máxima (10 columnas x 6 filas = 60 botellas) en pantalla móvil, todas las botellas, controles y estado son visibles sin necesidad de scroll vertical.
- [x] Las botellas se muestran un poco menos altas sin perder legibilidad en capas ni números.
- [x] La selección, el trasvase, el deshacer, el reinicio y el diálogo de victoria funcionan sin alteraciones en sus reglas.

## Tareas

- [x] Crear el manifiesto de aplicación web (`manifest.json`) y el icono correspondiente.
- [x] Añadir metadatos de aplicación móvil (`apple-mobile-web-app-*`, manifest, icono) a `index.html`, `menu/index.html` y `juegos/botellas-y-liquidos/index.html`.
- [x] Compactar el diseño de `#settings` y `#game` en `juegos/botellas-y-liquidos/index.html` para encajar en `100dvh` sin scroll vertical.
- [x] Actualizar el índice en `docs/README.md`, `PLAN.md` y `CONTEXTO.md`.
- [x] Probar rutas bajo `/JuegosEnGitHub/`, verificar `git diff` y publicar los cambios en su rama `feature/029_modo_app_y_tablero_sin_scroll`.

## Riesgos, dependencias y preguntas

- Al reducir la altura de las botellas en tableros de 6 filas con capacidad máxima (6 unidades), cada capa de líquido será ligeramente más fina (aprox. 10-12 px), lo cual se verificará para asegurar que el contraste y el color sigan siendo nítidos.
