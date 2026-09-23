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

- La entrada raíz (`index.html`), el catálogo (`menu/index.html`), la pantalla de configuración y el generador de partidas de Botellas y líquidos están implementados en `feature/009_t3_generador_resoluble`.
- Repositorio local inicializado en la rama `main`, conectado al remoto público `https://github.com/JoseJacin/JuegosEnGitHub.git`.
- `main` y las ramas de trabajo están publicadas en GitHub. La guía de agentes/SDD está integrada en `main` y publicada desde `feature/007_guia_agentes_sdd`.
- Las reglas del juego de botellas están aprobadas; el plan jerárquico está en `PLAN.md`.
- T1, T2 y T3 están implementadas en la rama actual. «Empezar» genera capacidades compatibles, volúmenes por color con una botella objetivo por color y un tablero aleatorio donde todas las botellas empiezan parcialmente llenas. La distribución generada es monocromática por botella para dejar una solución directa conocida; el juego aún no implementa trasvases (T4).
- Las propuestas de los bloques están en `docs/propuestas/008_entrada_y_configuracion.md` y `docs/propuestas/009_generador_resoluble.md`.
- GitHub CLI (`gh`) tiene un token inválido; los pushes de esta tarea se completaron mediante la autenticación configurada para Git.
- La configuración de GitHub Pages sigue pendiente.

## Próximos pasos sugeridos

1. Continuar con T4: selección de botellas y trasvases según las reglas aprobadas.
2. Seguir las dependencias y criterios de finalización de las tareas restantes del plan.
3. Activar GitHub Pages y validar las rutas publicadas al completar T7.

## Estado de Git al cerrar este bloque

- Rama actual: `main`, sincronizada con `origin/main`. La rama `feature/009_t3_generador_resoluble` también está publicada.
- Commits: implementación `d9611e8`; fusión en `main` `873a57b`.
- Verificación del bloque: `git diff --check` sin errores y revisión del diff. No se ejecutaron pruebas automatizadas ni comprobación manual en navegador.
- Decisión: el generador asigna a cada color una botella objetivo cuya capacidad iguala el volumen total de ese color. Todas las botellas comienzan parcialmente llenas y contienen un solo color; los donantes pueden vaciarse en la botella objetivo para resolver.

Al retomar, revisar primero `PLAN.md` y el estado real del repositorio; mantener este archivo actualizado al cerrar tareas.
