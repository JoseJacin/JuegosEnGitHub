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

- La entrada raíz (`index.html`), el catálogo (`menu/index.html`) y la pantalla de configuración de Botellas y líquidos ya están implementados en `feature/008_t1_t2_entrada_configuracion`.
- Repositorio local inicializado en la rama `main`, conectado al remoto público `https://github.com/JoseJacin/JuegosEnGitHub.git`.
- `main` y las ramas de trabajo están publicadas en GitHub. La guía de agentes/SDD está integrada en `main` y publicada desde `feature/007_guia_agentes_sdd`.
- Las reglas del juego de botellas están aprobadas; el plan jerárquico está en `PLAN.md`.
- T1 y T2 están implementadas en la rama actual. La configuración valida opciones y capacidad suficiente, y mantiene desactivado el inicio hasta que T3 añada el generador.
- La propuesta aprobada de este bloque está en `docs/propuestas/008_entrada_y_configuracion.md`.
- GitHub CLI (`gh`) tiene un token inválido; los pushes de esta tarea se completaron mediante la autenticación configurada para Git.
- La configuración de GitHub Pages sigue pendiente.

## Próximos pasos sugeridos

1. Continuar con T3: generar partidas resolubles respetando la asignación de capacidades que valida la pantalla.
2. Seguir las dependencias y criterios de finalización de las tareas restantes del plan.
3. Activar GitHub Pages y validar las rutas publicadas al completar T7.

## Estado de Git al cerrar este bloque

- Rama actual: `feature/008_t1_t2_entrada_configuracion`, sincronizada con la fusión en `main`; `main` también está limpio y sincronizado con `origin/main`.
- Commits: implementación `09b7c40`; fusión en `main` `bfbb8b5`. Ambas ramas están publicadas en `origin`.
- Decisión: T2 valida que existe una asignación de capacidades con volumen suficiente para respetar el estado inicial y completar colores. T3 debe escoger una asignación compatible y generar una disposición resoluble antes de habilitar «Empezar».

Al retomar, revisar primero `PLAN.md` y el estado real del repositorio; mantener este archivo actualizado al cerrar tareas.
