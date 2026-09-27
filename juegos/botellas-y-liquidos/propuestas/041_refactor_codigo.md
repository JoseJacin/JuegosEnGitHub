# Propuesta 041 — Refactor interno de Botellas y líquidos

**Estado:** Implementada
**Fecha:** 2026-09-27
**Responsable:** Usuario y agente Codex

## Problema y objetivo

La separación de HTML, CSS y JavaScript ya está hecha, pero parte de la lógica de planificación está duplicada, las consultas a la interfaz aparecen repartidas por el código y el CSS resulta difícil de revisar en su formato actual. El objetivo es reducir esa duplicación y hacer más sencillo mantener los tres archivos sin alterar las reglas ni el funcionamiento observable.

## Alcance

- Incluye:
  - Compartir el cálculo de combinaciones de botellas objetivo entre la validación de configuración y la generación de partidas.
  - Agrupar las referencias a los elementos de la interfaz y reutilizarlas en las funciones.
  - Mejorar el formato y la organización del HTML y CSS para facilitar su lectura.
  - Actualizar el índice de propuestas, `PLAN.md` y `CONTEXTO.md`.
- No incluye:
  - Nuevas funciones de juego de las propuestas 032–037.
  - Cambios de reglas, mensajes, diseño intencional o algoritmo aleatorio.
  - Dependencias, compilación, frameworks o componentes compartidos con otras páginas.

## Requisitos y decisiones

1. Se mantienen las reglas descritas en [`../README.md`](../README.md).
2. La validación y la generación reutilizan un único cálculo de subconjuntos factibles, conservando los límites y opciones aleatorias existentes.
3. Los nodos usados por el juego se consultan una vez y se guardan en un objeto de interfaz.
4. HTML, CSS y JavaScript siguen siendo archivos estáticos separados con rutas relativas.

## Criterios de aceptación

- [x] La comprobación de combinaciones factibles no está duplicada.
- [x] Las consultas a los controles y nodos persistentes están agrupadas y reutilizadas.
- [x] La partida conserva sus reglas, opciones y respuestas visuales.
- [x] El HTML, CSS y JavaScript mantienen referencias locales relativas.
- [x] `git diff --check` pasa y la revisión no muestra cambios de comportamiento intencionales.
- [x] El plan, el índice y el contexto reflejan el estado final.

## Tareas

- [x] Registrar la propuesta e incluirla en el índice y el plan.
- [x] Consolidar el cálculo duplicado y las referencias DOM.
- [x] Ordenar el formato de HTML y CSS sin cambiar la presentación.
- [x] Revisar los cambios y actualizar el estado de la propuesta y `CONTEXTO.md`.

## Riesgos, dependencias y preguntas

La lógica del generador garantiza restricciones de inicio; se conservarán sus límites y orden de elección para reducir el riesgo de cambiar las partidas generadas.
