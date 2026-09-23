# Propuesta: entrada del sitio y configuración de Botellas y líquidos

**Estado:** Aprobada
**Fecha:** 2026-09-23
**Responsable:** Codex

## Problema y objetivo

El proyecto todavía no tiene páginas funcionales. Crear la entrada, el catálogo y la pantalla para configurar Botellas y líquidos, preparando navegación estática y opciones de partida según el plan y la especificación del juego.

## Alcance

- Incluye: `index.html`, `menu/index.html`, la página de configuración en `juegos/botellas-y-liquidos/`, validación y resumen de configuración, rutas relativas compatibles con GitHub Pages bajo `/JuegosEnGitHub/`.
- No incluye: generación ni inicio de partidas (T3), movimientos (T4), historial o victoria (T5), diseño final (T6), publicación (T7).

## Requisitos y decisiones

- La entrada enlaza al catálogo; el catálogo distingue Botellas y líquidos de juegos próximos.
- La configuración respeta los límites y reglas de `PLAN.md` y `juegos/botellas-y-liquidos/README.md`.
- Las variables iniciales de configuración se agrupan en una sección diferenciada del código.
- La pantalla presenta y permite editar la configuración antes de que exista el inicio de partida, que depende de T3.

## Criterios de aceptación

- [x] La entrada y los enlaces relativos conservan sus destinos bajo el prefijo del repositorio.
- [x] El catálogo muestra Botellas y líquidos disponible y otros juegos como «Próximamente».
- [x] Se pueden configurar filas, botellas por fila, colores, capacidad máxima y capacidades distintas con límites válidos.
- [x] Se presenta un resumen editable y los valores incompatibles se explican.
- [x] `PLAN.md` y `CONTEXTO.md` reflejan el estado al cerrar el bloque.

## Tareas

- [x] Crear entrada y catálogo.
- [x] Crear pantalla de configuración con controles, validación y resumen.
- [x] Revisar diff y destinos de rutas relativas para la raíz y el prefijo del repositorio.
- [x] Actualizar plan y contexto.

## Riesgos, dependencias y preguntas

El pre validador busca una asignación de capacidades cuyo volumen permita un estado inicial parcial y botellas objetivo completas. T3 debe elegir una asignación compatible y generar una disposición resoluble; el botón de inicio permanece desactivado hasta entonces.
