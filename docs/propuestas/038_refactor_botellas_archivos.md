# Propuesta: separar estructura, estilos y lógica de Botellas y líquidos

**Estado:** Aprobada (autorización anticipada del usuario); implementada
**Fecha:** 2026-09-27
**Responsable:** Usuario y agente

## Problema y objetivo

`juegos/botellas-y-liquidos/index.html` reúne la estructura HTML, los estilos CSS y toda la lógica JavaScript. Separar esas responsabilidades facilitará localizar cambios, revisar el código y proporcionar a las herramientas de desarrollo el contexto pertinente sin cambiar el funcionamiento del juego.

## Alcance

- Incluye:
  - Extraer los estilos integrados a `juegos/botellas-y-liquidos/styles.css`.
  - Extraer la lógica integrada a `juegos/botellas-y-liquidos/game.js`.
  - Enlazar ambos recursos desde `index.html` usando rutas relativas compatibles con GitHub Pages.
  - Actualizar la documentación del juego, el plan, el índice de propuestas y el contexto de continuidad.
- No incluye:
  - Cambiar reglas, interfaz, accesibilidad o comportamiento del juego.
  - Añadir frameworks, compilación, dependencias, componentes reutilizables o módulos compartidos.
  - Refactorizar el catálogo u otros juegos.

## Requisitos y decisiones

1. `index.html` conserva el documento y la estructura de la interfaz.
2. `styles.css` contiene los estilos que antes estaban en el elemento `<style>`.
3. `game.js` contiene el código que antes estaba en el elemento `<script>`.
4. Los enlaces a recursos internos son relativos al directorio del juego y funcionan bajo el prefijo de GitHub Pages.
5. Se conserva el comportamiento especificado en `juegos/botellas-y-liquidos/README.md`.
6. No se añaden componentes reutilizables mientras solo exista esta página y no haya piezas duplicadas que lo justifiquen.

## Criterios de aceptación

- [x] `index.html` contiene la estructura HTML y referencia `styles.css` y `game.js`.
- [x] Los estilos y la lógica integrados se trasladan a sus archivos externos sin cambios funcionales intencionales.
- [x] Los recursos locales usan rutas relativas compatibles con GitHub Pages.
- [x] La documentación del juego, `PLAN.md`, `docs/README.md` y `CONTEXTO.md` reflejan la nueva estructura y el estado del cambio.
- [x] La revisión del diff no detecta errores de formato ni cambios funcionales ajenos al alcance.

## Tareas

- [x] Crear la rama `feature/038_refactor_botellas_archivos`.
- [x] Extraer CSS y JavaScript y enlazarlos desde el HTML.
- [x] Actualizar la documentación y registrar el cambio en el plan.
- [x] Revisar rutas, diff y estado de Git.

## Riesgos, dependencias y preguntas

Ninguno. No hay dependencias de compilación; el sitio continúa servido como archivos estáticos.
