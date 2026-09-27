# Contexto para continuar

## Estado actual

- Colección estática publicada en GitHub Pages: [josejacin.github.io/JuegosEnGitHub](https://josejacin.github.io/JuegosEnGitHub/).
- El catálogo y Botellas y líquidos están implementados y publicados. Las reglas vigentes del juego están en [`juegos/botellas-y-liquidos/README.md`](juegos/botellas-y-liquidos/README.md).
- T1–T13 y T20–T22 están completadas. La propuesta 038 separó HTML, CSS y JavaScript; la propuesta 041 consolidó lógica duplicada y referencias DOM, y mejoró el formato sin cambiar las reglas. Las propuestas 032–037 siguen aprobadas y pendientes en `juegos/botellas-y-liquidos/propuestas/`; la siguiente es T14, contador de movimientos (propuesta 032).
- T15 (récord local) y T17 (compartir resultado) dependen de T14. T16, T18 y T19 son independientes; revisar el plan para el orden acordado.

## Reorganización de propuestas (completada)

- Las propuestas 030–038 se han movido a `juegos/botellas-y-liquidos/propuestas/`, que ahora tiene su propio índice. Las propuestas transversales permanecen en `docs/propuestas/`; la plantilla compartida sigue en `docs/plantillas/`.
- La propuesta 039 documenta la convención. Los enlaces de índice, plan y especificación están actualizados.
- Rama de trabajo `feature/039_propuestas_por_juego` integrada en `main` y publicada en `origin`. Commit de implementación: `5c9f7d7`; merge en `main`: `39758ed`.

## Fuentes de verdad

- [`AGENTS.md`](AGENTS.md): reglas de trabajo y comprobación de premisas.
- [`COMANDOS.md`](COMANDOS.md): comandos locales, Git y publicación.
- [`PLAN.md`](PLAN.md): estado y orden de tareas.
- [`docs/README.md`](docs/README.md): índice y estado de propuestas.
- [`juegos/botellas-y-liquidos/README.md`](juegos/botellas-y-liquidos/README.md): reglas del juego.

## Notas del entorno de agentes

- La sesión revisada de Bionic usa Qwen2.5 7B Instruct 4bit. En una investigación anterior aceptó una tarea de pruebas unitarias que no figuraba en el `PLAN.md` actual y dio por existente una carpeta `tests/` sin verificarla. Para una tarea nueva, abrir una sesión separada y pedir que contraste el plan con `docs/README.md`, las propuestas aprobadas y los archivos reales.
- `.continue/rules/01_documentacion_proyecto.md` contiene las reglas de Continue para el modo Agent, Chat y Edit. No se aplica al autocompletado.
- `.agents/skills/juegosengithub/SKILL.md` contiene las instrucciones para asistentes compatibles con habilidades. El usuario confirmó que ya la importó en Bionic.
- Una nota local del 25-09-2026 registra Continue configurado con LM Studio en `localhost:1234` y `qwen2.5-coder-14b-instruct`, con contexto de 8192. En esa fecha el servidor local no respondía; comprobar su estado antes de usar Continue.
- Twinny está instalado en VS Code y usa LM Studio/Qwen2.5-Coder 7B Instruct MLX para FIM y autocompletado. Su plantilla `system.hbs` es global; las instrucciones del repositorio deben adjuntarse mediante el prompt del chat.

## Estado de Git al cerrar este bloque

- La rama `feature/041_refactor_botellas_codigo` se integró en `main` y ambas ramas se publicaron en `origin`.
- Commit de implementación: `8b8429f`; merge en `main`: `78b0c1e`.
- Siguiente tarea de producto: implementar la propuesta 032 en `feature/032_contador_movimientos`.
