# Contexto del sitio

## Estado actual

- El sitio está publicado en [GitHub Pages](https://josejacin.github.io/JuegosEnGitHub/); el catálogo y Botellas y líquidos están disponibles.
- El plan raíz registra solo decisiones y trabajo transversal. Cada juego mantiene su propio [plan](juegos/botellas-y-liquidos/PLAN.md) y [contexto](juegos/botellas-y-liquidos/CONTEXTO.md).
- La organización documental por juego está implementada (T23); la propuesta 042 completada se retiró del árbol de trabajo y se conserva en el historial de Git.
- La propuesta [043 de Murdoku](juegos/murdoku/propuestas/043_murdoku_generacion_visual.md) está aprobada. El borrador de [reglas](juegos/murdoku/README.md), [plan](juegos/murdoku/PLAN.md), [contexto](juegos/murdoku/CONTEXTO.md) y [guía técnica del generador](juegos/murdoku/GUIA_MOTOR_GENERACION.md) está preparado para revisión; no hay código implementado.

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

- La propuesta 043 se integró en `main` mediante merge `18db52d`.
- La rama `feature/044_especificacion_funcional_murdoku` se integró en `main` mediante merge `0137a07` (especificación y plan en borrador).
- La rama `feature/045_guia_motor_generacion_murdoku` se integró en `main` mediante merge `a1c078d` (guía técnica detallada del generador).
- Rama actual: `main`; reglas y guía técnica siguen en revisión, sin código de Murdoku.
- Próximo paso: revisar/aprobar reglas y guía técnica antes de iniciar implementación.
