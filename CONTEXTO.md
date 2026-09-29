# Contexto del sitio

## Estado actual

- El sitio está publicado en [GitHub Pages](https://josejacin.github.io/JuegosEnGitHub/); el catálogo y Botellas y líquidos están disponibles.
- El plan raíz registra solo decisiones y trabajo transversal. Cada juego mantiene su propio [plan](juegos/botellas-y-liquidos/PLAN.md) y [contexto](juegos/botellas-y-liquidos/CONTEXTO.md).
- La organización documental por juego está implementada (T23); la propuesta transversal 042 completada se retiró del árbol de trabajo y se conserva en el historial de Git.
- Cada juego mantiene su estado, prioridades, propuestas y próximos pasos en los documentos de su carpeta. El plan raíz registra únicamente el sitio y el trabajo compartido.

## Fuentes de verdad

- [`AGENTS.md`](AGENTS.md): instrucciones y flujo de trabajo.
- [`COMANDOS.md`](COMANDOS.md): comandos del proyecto y Git.
- [`PLAN.md`](PLAN.md): decisiones y secuencia del sitio.
- [`docs/README.md`](docs/README.md): índice de propuestas.
- Cada `juegos/<id>/README.md`, `PLAN.md` y `CONTEXTO.md`: reglas, tareas y continuidad de ese juego.

## Notas de entorno local

- `.continue/rules/01_documentacion_proyecto.md` contiene instrucciones de Continue; `.agents/skills/juegosengithub/SKILL.md` adapta el flujo para asistentes compatibles con skills.
- Notas previas registraron Continue con LM Studio y Twinny con modelos locales. Esos datos describen la configuración del entorno en septiembre de 2026; comprobar disponibilidad antes de depender de ellos.
- En el entorno Codex actual el árbol de trabajo es escribible, pero `.git` puede estar protegido por el sandbox. Por ello, las operaciones que mutan metadatos Git deben ejecutarse mediante escalación/autorización; el flujo y el mensaje de error conocido están documentados en `AGENTS.md` y `COMANDOS.md`. No modificar permisos del repositorio para sortear el sandbox.

## Estado de Git al cerrar este bloque

- La propuesta 043 se integró en `main` mediante merge `18db52d`.
- La rama `feature/044_especificacion_funcional_murdoku` se integró en `main` mediante merge `0137a07` (especificación y plan en borrador).
- La rama `feature/045_guia_motor_generacion_murdoku` se integró en `main` mediante merge `a1c078d` (guía técnica detallada del generador).
- La rama `feature/046_archivar_propuestas_finalizadas` se integró en `main` mediante merge `4e9b8aa`; seis propuestas completadas se retiraron del árbol y se conservaron en el historial de Git.
- Rama actual: `main`; reglas y guía técnica de Murdoku siguen en revisión, sin código.
- Las instrucciones para trabajar con `.git` protegido por sandbox se integraron en `main` mediante merge `b3cf8e6`; la rama `feature/051_documentar_permisos_git` está publicada.
- Próximo paso: continuar el trabajo transversal del sitio desde `PLAN.md`; los próximos pasos de cada juego constan en su plan y contexto.
