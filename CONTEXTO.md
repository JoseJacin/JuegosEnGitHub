# Contexto del sitio

## Estado actual

- El sitio está publicado en [GitHub Pages](https://josejacin.github.io/JuegosEnGitHub/); el catálogo y Botellas y líquidos están disponibles.
- El plan raíz registra solo decisiones y trabajo transversal. Cada juego mantiene su plan y contexto en su carpeta, según la estructura descrita en [`juegos/README.md`](juegos/README.md).
- La organización documental por juego está implementada (T23); las propuestas transversales 042 y 033 completadas se retiraron del árbol de trabajo y se conservan en el historial de Git.
- Cada juego mantiene su estado, prioridades, propuestas y próximos pasos en los documentos de su carpeta. El plan raíz registra únicamente el sitio y el trabajo compartido.
- La skill `juegosengithub` guía las fases SDD y consulta el estado en el ámbito correspondiente, sin comparar el plan global con propuestas específicas de juegos.

## Fuentes de verdad

- [`AGENTS.md`](AGENTS.md): instrucciones y flujo de trabajo.
- [`COMANDOS.md`](COMANDOS.md): comandos del proyecto y Git.
- [`PLAN.md`](PLAN.md): decisiones y secuencia del sitio.
- [`docs/README.md`](docs/README.md): índice de propuestas.
- Cada `juegos/<id>/README.md`, `PLAN.md`, `CONTEXTO.md` e índice de propuestas: reglas, tareas y continuidad de ese juego.

## Notas de entorno local

- `.continue/rules/01_documentacion_proyecto.md` contiene instrucciones de Continue; `.agents/skills/juegosengithub/SKILL.md` adapta el flujo para asistentes compatibles con skills.
- Notas previas registraron Continue con LM Studio y Twinny con modelos locales. Esos datos describen la configuración del entorno en septiembre de 2026; comprobar disponibilidad antes de depender de ellos.
- En el entorno Codex actual el árbol de trabajo es escribible, pero `.git` puede estar protegido por el sandbox. Por ello, las operaciones que mutan metadatos Git deben ejecutarse mediante escalación/autorización; el flujo y el mensaje de error conocido están documentados en `AGENTS.md` y `COMANDOS.md`. No modificar permisos del repositorio para sortear el sandbox.

## Estado de Git al cerrar este bloque

- Las instrucciones para trabajar con `.git` protegido por sandbox se integraron en `main` mediante merge `b3cf8e6`; la rama `feature/051_documentar_permisos_git` está publicada.
- La modificación de propiedad documental y flujo Git se integró en `main`; las ramas `feature/sitio_032_documentacion_estado_y_ambitos` y `feature/sitio_033_implementacion_record_local` están publicadas en `origin`.

- La propuesta 033 (récord local) ha sido completada y archivada en `juegos/botellas-y-liquidos/propuestas/archivadas/033_record_local.md`.
- La guía SDD por fases se integró en `main`; la rama `feature/sitio_053_flujo_sdd_skill` está publicada en `origin`.
- Estado al cerrar: rama `main`, sincronizada con `origin/main`, sin cambios pendientes en el árbol de trabajo.
- Próximo paso: continuar el trabajo transversal desde `PLAN.md`; los próximos pasos de cada juego constan en su plan y contexto.
