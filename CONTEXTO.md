# Contexto para continuar

## Resumen

Proyecto personal para publicar una colección de juegos web estáticos con GitHub Pages. La entrada será un menú con enlaces a los juegos. No se necesitan estadísticas ni almacenamiento remoto en la primera etapa.

## Estructura existente

- `README.md`: presentación y mapa del proyecto.
- `AGENTS.md`: instrucciones para agentes, flujo SDD y Git.
- `COMANDOS.md`: comandos para inspección, servidor local, revisión, Git y publicación.
- `docs/README.md` y `docs/plantillas/propuesta.md`: índice y plantilla ligera de propuestas SDD.
- `PLAN.md`: objetivo, fases, decisiones y próximos pasos.
- `menu/README.md`: propósito del directorio de menú.
- `juegos/README.md`: convención de carpetas de juegos.
- `juegos/botellas-y-liquidos/README.md`: presentación y reglas aprobadas para el primer juego.
- `imagenes/Juego de botellas y líquidos.png`: referencia visual del juego de botellas y líquidos.

## Estado actual

- La entrada raíz (`index.html`), el catálogo (`menu/index.html`), la pantalla de configuración y el generador de partidas de Botellas y líquidos están implementados en `main`.
- Repositorio local inicializado en la rama `main`, conectado al remoto público `https://github.com/JoseJacin/JuegosEnGitHub.git`.
- `main` y las ramas de trabajo están publicadas en GitHub. La guía de agentes/SDD está integrada en `main` y publicada desde `feature/007_guia_agentes_sdd`.
- Las reglas del juego de botellas están aprobadas; el plan jerárquico está en `PLAN.md`.
- T1, T2, T3 y T4 están integradas en `main`. Cada botella empieza parcialmente llena y con al menos dos colores distintos; la capacidad 2 no es válida para iniciar. T4 permite selección, cancelación y trasvase de capas, y tapa automáticamente las botellas completadas. Las botellas vacías se ignoran al ganar si las demás están completas, ordenadas y cerradas.
- Las propuestas están en `docs/propuestas/008_entrada_y_configuracion.md`, `docs/propuestas/009_generador_resoluble.md`, `docs/propuestas/011_botella_vacia_reserva.md` (descartada), `docs/propuestas/012_vacias_intermedias_y_victoria.md` y `docs/propuestas/014_dos_colores_por_botella.md`.
- GitHub CLI (`gh`) tiene un token inválido; los pushes de esta tarea se completaron mediante la autenticación configurada para Git.
- La configuración de GitHub Pages sigue pendiente.
- Se corrigió la validación de Botellas y líquidos para que no use una búsqueda aleatoria al decidir si la configuración es compatible; propuesta 015 en rama `feature/015_validacion_determinista`.
- La búsqueda del plan al pulsar «Empezar» reintenta hasta 15 veces antes de mostrar un error; el cambio está en la propuesta 016.

## Próximos pasos sugeridos

1. Continuar con T4: selección de botellas y trasvases según las reglas aprobadas.
2. Seguir las dependencias y criterios de finalización de las tareas restantes del plan.
3. Activar GitHub Pages y validar las rutas publicadas al completar T7.

## Estado de Git al cerrar este bloque

- Rama actual: `main`, sincronizada con `origin/main`; `feature/014_dos_colores_por_botella` también está publicada.
- Commits del ajuste de objetivos: implementación `5df160b`; fusión en `main` `83d5d9f`.
- Decisiones: ninguna botella empieza vacía ni llena; cualquier número de botellas vacías se ignora al ganar. El volumen objetivo se reparte en tantas botellas completas como sea necesario y los colores pueden repetirse.
- La especificación vigente está en `juegos/botellas-y-liquidos/README.md`; la propuesta 014 registra el cambio que exige dos colores distintos en cada botella inicial.
- Verificación: `git diff --check` sin errores y revisión del diff. No se ejecutaron pruebas automatizadas ni comprobación manual en navegador.

## Bloque 015 — validación determinista

- Rama de trabajo: `feature/015_validacion_determinista`, publicada en `origin`.
- Estado: completado e integrado en `main` mediante `374f9a6` y `25ceb69`; `main` publicado.
- Decisión: la compatibilidad se calcula por existencia mediante búsqueda determinista; el generador aún elige al azar entre objetivos compatibles.
- Verificación: `node --check` del bloque JavaScript, `git diff --check` y comprobación de que los valores de las capturas se aceptan siempre; los casos de capacidad 2 y sin botella extra se rechazan. Sin verificación manual en navegador.
- Próximo paso: continuar con T5 según `PLAN.md`.

## Bloque 016 — reintentos de generación

- Rama: `feature/016_reintentos_generacion`.
- Estado: implementación y documentación preparadas; sintaxis y diff verificados, pendiente commit, fusión y publicación.
- Decisión: intentar la búsqueda hasta 15 veces al iniciar; si todas fallan, conservar el mensaje de error existente.
- Verificación: `node --check` del bloque JavaScript y `git diff --check`; revisión del límite de 15 intentos y del mensaje final.

## Bloque 017 — primera corrección visual (insuficiente)

- Rama: `feature/017_capas_liquido_contiguas`.
- Estado: integrado, pero la captura posterior mostró que no resolvió la representación correcta de las unidades.
- Decisión: se reemplaza el reparto flex por una cuadrícula de unidades explícitas en el bloque 018.
- Verificación: revisión del código y diff; la captura del usuario confirmó que el primer ajuste era insuficiente.

## Bloque 018 — representar cada unidad con una celda

- Rama: `feature/018_unidades_visuales_botellas`.
- Estado: integrado; la revisión posterior del usuario todavía observó huecos. Se reemplaza el método por posicionamiento absoluto en el bloque 019.
- Decisión: la cuadrícula por celdas no resolvió todos los casos.
- Verificación: las capturas en navegador mostraron que algunas configuraciones aún presentaban franjas oscuras.
- Integración: fusionado y publicado en `main`; rama de trabajo también publicada en `origin`.

## Bloque 019 — posicionamiento por unidades

- Rama: `feature/019_capas_posicionadas`.
- Estado: implementación integrada y publicada; revisión visual pendiente.
- Decisión: cada capa se posiciona desde el fondo usando el porcentaje acumulado de unidades, con altura proporcional al número de unidades; no hay elementos vacíos entre capas.
- Verificación: revisión estática de que los porcentajes de altura y posición se calculan desde las unidades acumuladas; `git diff --check` sin errores. No se hizo otra revisión en navegador, según la indicación del usuario.
- Próximo paso: revisión visual por parte del usuario en su navegador.

## Bloque 020 — diagnóstico copiable

- Rama: `feature/020_diagnostico_botellas`.
- Estado: integrado y publicado en `main`; rama de trabajo publicada en `origin`.
- Decisión: el botón del tablero copia un resumen local por botella con capacidad, nivel, geometría esperada y real por capa, espacio superior/inferior y huecos medidos. Si el portapapeles falla, deja el texto visible y seleccionado.
- Verificación: revisión estática del informe y `git diff --check`; no se usó el navegador, según indicación del usuario.
- Próximo paso: el usuario puede pulsar «Copiar diagnóstico» y pegar el informe aquí para localizar cualquier espacio restante.

Al retomar, revisar primero `PLAN.md` y el estado real del repositorio; mantener este archivo actualizado al cerrar tareas.

## Bloque 021 — conteo de unidades iniciales

- Rama: `feature/021_unidades_iniciales_colores`.
- Hallazgo: el diagnóstico del usuario medía `gaps=[0]`, pero varias capas tenían color `undefined`. `retainedLeft` restaba una unidad por botella objetivo, aunque cada botella ya parte con dos unidades base. Esto añadía una unidad de más por objetivo y agotaba antes la lista de colores.
- Cambio: el cálculo ahora descuenta las dos unidades base; se omiten distribuciones si el número de unidades o los colores no concuerdan.
- Verificación: `git diff --check` limpio y revisión estática de los conteos. No se abrió el navegador, según preferencia del usuario.
- Estado Git: integrado en `main` mediante `f2bb504`; rama de trabajo publicada.

## Bloque 022 — selección y trasvases

- Rama: `feature/022_trasvases_interactivos`.
- Estado: completado e integrado en `main` mediante `ec81ffe`; rama de trabajo publicada.
- Decisión: la botella completada se representa cerrada y se excluye de selección como origen o destino. Los intentos inválidos cancelan la selección, preservan los líquidos y explican el motivo.
- Cambio: selección/cancelación con clic o toque, validación del movimiento, trasvase de la capa superior hasta el espacio disponible, cierre automático y mensajes accesibles. Se incluyen Enter y Espacio para activar botellas enfocadas.
- Verificación: `node --check` del JavaScript extraído y `git diff --check` sin errores; no se abrió el navegador.
- Próximo paso: abordar T5 (historial, reinicio y victoria) según `PLAN.md`.
