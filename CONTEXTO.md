# Contexto para continuar

## Resumen

Colección de juegos web estáticos publicada en GitHub Pages. El primer juego, Botellas y líquidos, y el catálogo están disponibles en [https://josejacin.github.io/JuegosEnGitHub/](https://josejacin.github.io/JuegosEnGitHub/). No hay backend ni estadísticas remotas.

## Fuentes del proyecto

- `AGENTS.md`: flujo SDD y Git.
- `COMANDOS.md`: comandos de trabajo y publicación.
- `PLAN.md`: alcance, fases y estado de tareas.
- `README.md`: presentación y URL pública.
- `juegos/botellas-y-liquidos/README.md`: reglas del juego.
- `docs/README.md` y `docs/propuestas/`: propuestas SDD.

## Estado actual

- T1–T8 están completadas. GitHub Pages publica desde `main` en la raíz; ejecución `pages-build-deployment` completada correctamente.
- La entrada raíz redirige al catálogo. El menú y la página del juego cargan bajo `/JuegosEnGitHub/`.
- Verificación manual pública: configuración uniforme de 8 botellas, 4 colores y capacidad 4; trasvase válido; deshacer; reinicio; victoria; deshacer la jugada ganadora; repetir con una disposición nueva.
- También se generó un tablero de 60 botellas con capacidades distintas de 3, 4, 5 y 6 unidades, cuatro tamaños y seis colores. Se verificó que todas empiezan parcialmente llenas y se hizo un trasvase que llenó una botella de capacidad 3.
- Los estilos y la lógica del juego están integrados en el HTML; no hay recursos gráficos externos requeridos por las páginas publicadas.
- Las reglas vigentes siguen en `juegos/botellas-y-liquidos/README.md`. Las decisiones de generación permiten colores repetidos entre botellas objetivo y botellas vacías durante la partida.

## Bloque 025 — publicación y revisión manual

- Propuesta: 025 (archivada en el historial de Git).
- GitHub Pages se configuró para publicar la rama `main` desde la raíz del repositorio.
- URL: [https://josejacin.github.io/JuegosEnGitHub/](https://josejacin.github.io/JuegosEnGitHub/).
- La ejecución inicial de `pages-build-deployment` terminó correctamente. La página raíz abrió el menú; la ruta directa del juego cargó la configuración.
- Flujos revisados: partida uniforme hasta victoria, cancelar/restaurar mediante deshacer, reinicio, repetición y partida nueva. Configuración mixta verificada con el tablero máximo de 60 botellas.
- Verificación de rutas y recursos: menú y juego cargaron con el prefijo de Pages; HTML, CSS y JavaScript del juego están integrados, sin recursos externos.
- No se modificó lógica ni reglas durante la tarea.
- Próximo paso: elegir el siguiente juego o mejora del catálogo y crear una propuesta SDD correspondiente.

## Bloque 026 — interfaz de partida y catálogo

- Propuesta 026 aprobada e implementada (archivada en el historial de Git).
- Las botellas completadas se colocan al principio según orden de finalización; la identidad estable conserva selección, historial, deshacer y reinicio.
- Se añadió corcho visual, se retiraron números visibles, las cuatro acciones de partida usan iconos con nombres accesibles y el resumen queda en configuración.
- Catálogo y juego tienen encabezados consistentes; el CSS reduce espacios en móvil y mantiene desplazamiento horizontal para tableros anchos.
- Se revisaron cambios y sintaxis, pero no se pudo hacer comprobación interactiva en navegador porque no había superficie de navegador disponible.
- Próximo paso: elegir el siguiente juego o mejora del catálogo y crear una propuesta SDD correspondiente.

## Bloque 027 — compactar la partida y simplificar el catálogo

- Propuesta 027 aprobada e implementada (archivada en el historial de Git).
- La selección de origen ya no muestra el mensaje explicativo; el resultado del trasvase muestra cantidad y muestra cuadrada del color, con anuncio accesible descriptivo.
- Se quitó el título «Tu partida», el texto positivo de validación y la nota de generación. El mensaje de generación solo se muestra en errores tras agotar sus intentos.
- Las acciones quedan alineadas a la derecha; los campos de configuración usan dos columnas. El catálogo usa «Acceder» y ya no enlaza «Volver a la entrada».
- La introducción corregida está bajo «Configuración de partida».
- El cambio se integró en `main` y está publicado en `origin/main` (`3127904`); `feature/027_interfaz_compacta` también está publicada.
- Diff revisado; `git diff --check` pasó. No se ejecutaron pruebas ni comprobación en navegador.
- Próximo paso: elegir el siguiente cambio o juego.

## Bloque 028 — tablero compacto para pantallas pequeñas

- Propuesta 028 aprobada e implementada (archivada en el historial de Git).
- La cuadrícula ocupa el ancho disponible sin imponer un ancho mínimo por botella; el corcho respeta el ancho de su celda.
- Se reduce la separación entre filas; el indicador de llenado y el check se centran dentro del vidrio.
- Los errores de destino lleno y color distinto muestran «Botella llena» y «Color no coincidente» con iconos breves en el estado de movimiento.
- Se redujo el espacio entre botones sin cambiar sus áreas táctiles.
- Integrado y publicado en `main` (`540be5f`); `feature/028_tablero_movil_compacto` también está publicada.
- No se ejecutaron pruebas ni comprobación en navegador.
- Próximo paso: elegir el siguiente cambio o juego.

## Bloque 029 — modo aplicación (PWA) y pantallas sin scroll vertical

- Propuesta 029 aprobada e implementada (archivada en el historial de Git).
- Se creó `manifest.json` y los iconos en `imagenes/` (SVG y PNGs de 192x192 y 512x512) para permitir instalación como app en iPhone y Android en modo `standalone`.
- Se añadieron metadatos `apple-mobile-web-app-*` y `viewport-fit=cover` en `index.html`, `menu/index.html` y el juego.
- Se compactó la vista de configuración (`#settings`) para que quepa en pantalla móvil sin scroll vertical.
- Se ajustó el tablero de juego (`#game`) a `100dvh` y se redujo ligeramente la altura base de las botellas haciéndola adaptativa mediante `--bottle-rows`, garantizando que hasta 6 filas de botellas quepan íntegramente en pantalla sin scroll vertical.
- Próximo paso: verificar flujos en móvil y elegir el siguiente juego o mejora del catálogo.

## Bloque 030 — respetar zonas seguras (Safe Area) en iOS y Dynamic Island

- Propuesta aprobada e implementada: `docs/propuestas/030_respetar_safe_area_ios.md`.
- Se aplicó `padding: max(..., env(safe-area-inset-*))` en el contenedor `main` de `juegos/botellas-y-liquidos/index.html` y `menu/index.html`.
- La cabecera superior y el botón «← Menú» se despejan por completo de la Dynamic Island, notch y barra de estado de iOS.
- Se descontaron las zonas seguras en el cálculo adaptativo de altura de las botellas en móvil para mantener la partida de 6 filas dentro de la pantalla sin scroll vertical.
- Próximo paso: verificar en iPhone y elegir la siguiente funcionalidad o juego.

## Bloque 031 — ajustes visuales y limpieza de propuestas

- Propuesta aprobada e implementada: `docs/propuestas/031_ajustes_visuales_y_limpieza_propuestas.md`.
- Los mensajes de botella cerrada (origen y destino) ahora usan `setMoveError('Botella cerrada', '✕')`, igual que «Botella llena» y «Color no coincidente».
- Se eliminó el `box-shadow` verde perimetral de `.bottle.selected`; la selección se distingue únicamente con el fondo sutil y el contorno blanco sobre el vidrio.
- Las propuestas `008`–`029` se eliminaron del árbol de trabajo; permanecen en el historial de Git. Solo quedan `030` y `031` en `docs/propuestas/`.
- `docs/README.md`, `PLAN.md` y `CONTEXTO.md` se actualizaron para eliminar los enlaces rotos.
- Próximo paso: verificar en navegador y publicar en `main`.

## Estado de Git al cerrar

Los cambios de 031 están en la rama `feature/031_ajustes_visuales_y_limpieza_propuestas`, pendientes de revisar, fusionar en `main` y publicar en `origin/main`. `.history/` es un archivo local ajeno al cambio y debe quedar fuera del commit.
