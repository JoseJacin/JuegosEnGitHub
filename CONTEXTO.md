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
- T1, T2 y T3 están integradas en `main`. Cada botella empieza parcialmente llena y con al menos dos colores distintos; la capacidad 2 no es válida para iniciar. Los trasvases pueden dejar vacías una o varias, que se ignoran al ganar si las demás están completas, ordenadas y cerradas. El juego aún no implementa trasvases interactivos (T4).
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
- Próximo paso: continuar con T4 según `PLAN.md`.

## Bloque 016 — reintentos de generación

- Rama: `feature/016_reintentos_generacion`.
- Estado: implementación y documentación preparadas; sintaxis y diff verificados, pendiente commit, fusión y publicación.
- Decisión: intentar la búsqueda hasta 15 veces al iniciar; si todas fallan, conservar el mensaje de error existente.
- Verificación: `node --check` del bloque JavaScript y `git diff --check`; revisión del límite de 15 intentos y del mensaje final.

## Bloque 017 — representación de capas contiguas

- Rama: `feature/017_capas_liquido_contiguas`.
- Estado: corregido el orden de dibujo en el HTML; pendiente revisión visual y cierre Git.
- Decisión: el espacio libre se dibuja arriba y las capas de líquido se mantienen contiguas, respetando el orden de abajo hacia arriba del modelo.
- Verificación: revisión del código y diff; pendiente comprobación visual en navegador.
- Próximo paso: revisar visualmente las botellas y luego integrar el cambio.

Al retomar, revisar primero `PLAN.md` y el estado real del repositorio; mantener este archivo actualizado al cerrar tareas.
