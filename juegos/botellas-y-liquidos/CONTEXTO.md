# Contexto de Botellas y líquidos

Este documento registra solo la continuidad de este juego. La continuidad general del sitio está en [`../../CONTEXTO.md`](../../CONTEXTO.md); las tareas completas están en [`PLAN.md`](PLAN.md).

## Estado actual

- Colección estática publicada en GitHub Pages: [josejacin.github.io/JuegosEnGitHub](https://josejacin.github.io/JuegosEnGitHub/).
- El juego está implementado y publicado. Sus reglas vigentes están en [`README.md`](README.md).
- T1–T13 y T20–T22 están completadas. La propuesta 038 separó HTML, CSS y JavaScript; la propuesta 041 consolidó lógica duplicada y referencias DOM, y mejoró el formato sin cambiar las reglas. Las propuestas 032–037 siguen aprobadas y pendientes en `propuestas/`. T14 (contador de movimientos, propuesta 032) es la siguiente del backlog de este juego, pero queda pospuesta mientras la prioridad general es preparar la propuesta de Murdoku. Consulta [`../../PLAN.md`](../../PLAN.md) para la secuencia del sitio.
- T15 (récord local) y T17 (compartir resultado) dependen de T14. T16, T18 y T19 son independientes; revisar el plan para el orden acordado.

## Reorganización de propuestas (completada)

- Las propuestas 030–038 se han movido a `propuestas/`, que ahora tiene su propio índice. Las propuestas transversales permanecen en `../../docs/propuestas/`; la plantilla compartida sigue en `../../docs/plantillas/`.
- La propuesta 039 documenta la convención de propuestas por juego. La propuesta 042 establece planes y contextos independientes por juego.
- Rama de trabajo `feature/039_propuestas_por_juego` integrada en `main` y publicada en `origin`. Commit de implementación: `5c9f7d7`; merge en `main`: `39758ed`.

## Fuentes de verdad

- [`README.md`](README.md): reglas del juego.
- [`PLAN.md`](PLAN.md): tareas y dependencias de Botellas y líquidos.
- [`propuestas/README.md`](propuestas/README.md): índice de propuestas del juego.
- [`../../AGENTS.md`](../../AGENTS.md) y [`../../COMANDOS.md`](../../COMANDOS.md): flujo común del repositorio.
- [`../../docs/README.md`](../../docs/README.md): índice general de documentación y propuestas.

## Registro histórico del trabajo previo

- La rama `feature/041_refactor_botellas_codigo` se integró en `main` y ambas ramas se publicaron en `origin`. Commit de implementación: `8b8429f`; merge en `main`: `78b0c1e`.

## Prioridad actual

- Siguiente iniciativa general: preparar la propuesta de Murdoku.
- Siguiente tarea de este juego cuando se retome su backlog: propuesta 032 en `feature/032_contador_movimientos`.
- Esta reorganización documental se está integrando desde `feature/042_planes_contexto_por_juego`.
