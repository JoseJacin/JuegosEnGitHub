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
- T1, T2 y T3 están integradas en `main`. El cambio pendiente en `feature/014_dos_colores_por_botella` garantiza al menos dos colores distintos en cada botella inicial y descarta configuraciones con capacidad 2. Todas las botellas empiezan parcialmente llenas; los trasvases pueden dejar vacías una o varias, que se ignoran al ganar si las demás están completas, ordenadas y cerradas. El juego aún no implementa trasvases interactivos (T4).
- Las propuestas están en `docs/propuestas/008_entrada_y_configuracion.md`, `docs/propuestas/009_generador_resoluble.md`, `docs/propuestas/011_botella_vacia_reserva.md` (descartada), `docs/propuestas/012_vacias_intermedias_y_victoria.md` y `docs/propuestas/014_dos_colores_por_botella.md`.
- GitHub CLI (`gh`) tiene un token inválido; los pushes de esta tarea se completaron mediante la autenticación configurada para Git.
- La configuración de GitHub Pages sigue pendiente.

## Próximos pasos sugeridos

1. Continuar con T4: selección de botellas y trasvases según las reglas aprobadas.
2. Seguir las dependencias y criterios de finalización de las tareas restantes del plan.
3. Activar GitHub Pages y validar las rutas publicadas al completar T7.

## Estado de Git al cerrar este bloque

- Rama actual: `main`, sincronizada con `origin/main`; `feature/014_dos_colores_por_botella` también está publicada.
- Commits del ajuste de objetivos: implementación `5df160b`; fusión en `main` `83d5d9f`.
- Decisiones: ninguna botella empieza vacía ni llena; cualquier número de botellas vacías se ignora al ganar. El volumen objetivo se reparte en tantas botellas completas como sea necesario y los colores pueden repetirse.
- La disposición puede mezclar varias capas en cada botella, siguiendo la referencia visual; ninguna empieza monocromática.
- Decisión nueva: al iniciar, cada botella debe tener al menos dos colores distintos; capacidad 2 no lo permite y se bloquea.
- Verificación: `git diff --check` sin errores y revisión del diff. No se ejecutaron pruebas automatizadas ni comprobación manual en navegador.

Al retomar, revisar primero `PLAN.md` y el estado real del repositorio; mantener este archivo actualizado al cerrar tareas.
