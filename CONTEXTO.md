# Contexto del sitio

## Estado actual

- El sitio está publicado en [GitHub Pages](https://josejacin.github.io/JuegosEnGitHub/); el catálogo y Botellas y líquidos están disponibles.
- El plan raíz registra solo decisiones y trabajo transversal. Cada juego mantiene su propio [plan](juegos/botellas-y-liquidos/PLAN.md) y [contexto](juegos/botellas-y-liquidos/CONTEXTO.md).
- La organización documental por juego está implementada según la [propuesta 042](docs/propuestas/042_planes_y_contextos_por_juego.md).
- La propuesta [043 de Murdoku](juegos/murdoku/propuestas/043_murdoku_generacion_visual.md) está aprobada. Define generación automática del caso lógico y del tablero visual, tamaño/personajes configurables, variación por semilla, dificultad por razonamiento y herramientas de juego. Se está formalizando la especificación funcional; no hay código implementado.

## Fuentes de verdad

- [`AGENTS.md`](AGENTS.md): instrucciones y flujo de trabajo.
- [`COMANDOS.md`](COMANDOS.md): comandos del proyecto y Git.
- [`PLAN.md`](PLAN.md): decisiones y secuencia del sitio.
- [`docs/README.md`](docs/README.md): índice de propuestas.
- Cada `juegos/<id>/README.md`, `PLAN.md` y `CONTEXTO.md`: reglas, tareas y continuidad de ese juego.

## Notas de entorno local

- `.continue/rules/01_documentacion_proyecto.md` contiene instrucciones de Continue; `.agents/skills/juegosengithub/SKILL.md` adapta el flujo para asistentes compatibles con skills.
- Notas previas registraron Continue con LM Studio y Twinny con modelos locales. Esos datos describen la configuración del entorno en septiembre de 2026; comprobar disponibilidad antes de depender de ellos.

## Estado de Git al cerrar este bloque

- Rama actual: `feature/043_propuesta_murdoku`, creada desde `main` actualizado (`9f01968`).
- La propuesta 043, su índice y las referencias desde los documentos raíz están en revisión; aún no están integradas en `main`.
- Próximo paso: completar y revisar la especificación funcional detallada antes de implementar.
