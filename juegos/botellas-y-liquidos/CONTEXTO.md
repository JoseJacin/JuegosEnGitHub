# Contexto de Botellas y líquidos

Este documento registra solo la continuidad de este juego. La continuidad general del sitio está en [`../../CONTEXTO.md`](../../CONTEXTO.md); las tareas completas están en [`PLAN.md`](PLAN.md).

## Estado actual

- Colección estática publicada en GitHub Pages: [josejacin.github.io/JuegosEnGitHub](https://josejacin.github.io/JuegosEnGitHub/).
- El juego está implementado y publicado. Sus reglas vigentes están en [`README.md`](README.md).
- T1–T13 y T20–T22 están completadas. Las propuestas 030, 031, 038 y 041 se implementaron; sus archivos se retiraron del árbol de trabajo y permanecen en el historial de Git. La propuesta transversal 039 también está completada y archivada. La propuesta 032 (contador de movimientos) está integrada en `main` (commit `8fe895a`). Las propuestas 033–037 siguen aprobadas y pendientes en `propuestas/`. T15 (récord local) es la siguiente tarea del backlog de este juego.
- T15 (récord local) y T17 (compartir resultado) dependen de T14. T16, T18 y T19 son independientes; revisar el plan para el orden acordado.
- En la rama `feature/052_detalle_propuestas_botellas` se amplió la guía de implementación de las propuestas pendientes 032–037 para que un modelo local pueda seguir puntos de integración, estado, casos límite y comprobaciones. La propuesta 037 se ajustó a seis patrones porque las reglas y el código vigentes admiten como máximo seis colores; no se amplió el alcance del juego. Esta revisión documental no implementa las propuestas ni cambia su estado aprobado/pendiente.

## Reorganización de propuestas (completada)

- Las propuestas 030–038 se han movido a `propuestas/`, que ahora tiene su propio índice. Las propuestas transversales permanecen en `../../docs/propuestas/`; la plantilla compartida sigue en `../../docs/plantillas/`.
- La propuesta 039 estableció la convención de propuestas por juego; la 042 estableció planes y contextos independientes. Ambas están completadas, retiradas del árbol de trabajo y conservadas en el historial de Git.
- Rama de trabajo `feature/039_propuestas_por_juego` integrada en `main` y publicada en `origin`. Commit de implementación: `5c9f7d7`; merge en `main`: `39758ed`.

## Fuentes de verdad

- [`README.md`](README.md): reglas del juego.
- [`PLAN.md`](PLAN.md): tareas y dependencias de Botellas y líquidos.
- [`propuestas/README.md`](propuestas/README.md): índice de propuestas del juego.
- [`../../AGENTS.md`](../../AGENTS.md) y [`../../COMANDOS.md`](../../COMANDOS.md): flujo común del repositorio.
- [`../../docs/README.md`](../../docs/README.md): índice general de documentación y propuestas.

## Registro histórico del trabajo previo

- La rama `feature/046_archivar_propuestas_finalizadas` se integró en `main` mediante merge `4e9b8aa`. Las propuestas implementadas 030, 031, 038 y 041 se retiraron del árbol; sus archivos siguen en el historial de Git.
- La rama `feature/041_refactor_botellas_codigo` se integró en `main` y ambas ramas se publicaron en `origin`. Commit de implementación: `8b8429f`; merge en `main`: `78b0c1e`.

## Prioridad actual

- Siguiente iniciativa general: preparar la propuesta de Murdoku.
- La propuesta 032 (contador de movimientos) está integrada en `main` (commit `8fe895a`).
- Las propuestas pendientes de este juego: 033, 034, 035 (con dependencias), 036 y 037 (independientes).
- La rama `feature/042_planes_contexto_por_juego` se integró en `main` (commit `a93aae0`, merge `d18fbad`) y ambas ramas están publicadas en `origin`.
