# Contexto del sitio

## Estado actual

- El sitio está publicado en [GitHub Pages](https://josejacin.github.io/JuegosEnGitHub/); el catálogo y Botellas y líquidos están disponibles.
- El plan raíz registra solo decisiones y trabajo transversal. Cada juego mantiene su propio [plan](juegos/botellas-y-liquidos/PLAN.md) y [contexto](juegos/botellas-y-liquidos/CONTEXTO.md).
- La organización documental por juego está implementada según la [propuesta 042](docs/propuestas/042_planes_y_contextos_por_juego.md).
- Siguiente iniciativa acordada: preparar y revisar una propuesta de Murdoku. No hay todavía especificación aprobada ni carpeta del juego.

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

- Trabajo documental de la propuesta 042 en `feature/042_planes_contexto_por_juego`.
- Pendiente cerrar el bloque con revisión, commit, integración y publicación según `COMANDOS.md`.
