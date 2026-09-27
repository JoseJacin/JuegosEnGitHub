# Contexto para continuar

## Estado actual

- Colección estática publicada en GitHub Pages: [josejacin.github.io/JuegosEnGitHub](https://josejacin.github.io/JuegosEnGitHub/).
- El catálogo y Botellas y líquidos están implementados y publicados. Las reglas vigentes del juego están en [`juegos/botellas-y-liquidos/README.md`](juegos/botellas-y-liquidos/README.md).
- T1–T13 están completadas. Las propuestas 032–037 están aprobadas y ya aparecen en [`PLAN.md`](PLAN.md); la siguiente es T14, contador de movimientos (propuesta 032).
- T15 (récord local) y T17 (compartir resultado) dependen de T14. T16, T18 y T19 son independientes; revisar el plan para el orden acordado.

## Fuentes de verdad

- [`AGENTS.md`](AGENTS.md): reglas de trabajo y comprobación de premisas.
- [`COMANDOS.md`](COMANDOS.md): comandos locales, Git y publicación.
- [`PLAN.md`](PLAN.md): estado y orden de tareas.
- [`docs/README.md`](docs/README.md): índice y estado de propuestas.
- [`juegos/botellas-y-liquidos/README.md`](juegos/botellas-y-liquidos/README.md): reglas del juego.

## Notas del entorno de agentes

- La sesión revisada de Bionic usa Qwen2.5 7B Instruct 4bit. En una investigación anterior aceptó una tarea de pruebas unitarias que no figuraba en el `PLAN.md` actual y dio por existente una carpeta `tests/` sin verificarla. Para una tarea nueva, abrir una sesión separada y pedir que contraste el plan con `docs/README.md`, las propuestas aprobadas y los archivos reales.
- `.continue/rules/01_documentacion_proyecto.md` contiene las reglas de Continue para el modo Agent, Chat y Edit. No se aplica al autocompletado.
- `.agents/skills/juegosengithub/SKILL.md` contiene las instrucciones para asistentes compatibles con habilidades. Bionic requiere importarla desde Ajustes > Habilidades > Instalar una habilidad; su activación no quedó verificada en esta sesión.
- Una nota local del 25-09-2026 registra Continue configurado con LM Studio en `localhost:1234` y `qwen2.5-coder-14b-instruct`, con contexto de 8192. En esa fecha el servidor local no respondía; comprobar su estado antes de usar Continue.
- Twinny está instalado en VS Code y usa LM Studio/Qwen2.5-Coder 7B Instruct MLX para FIM y autocompletado. Su plantilla `system.hbs` es global; las instrucciones del repositorio deben adjuntarse mediante el prompt del chat.

## Estado de Git al cerrar este bloque

- El bloque 038 de alineación documental está fusionado y publicado en `main` (`e257d7f`).
- Rama de trabajo: `feature/039_configurar_agentes_locales`.
- Este bloque prepara la habilidad de proyecto para Bionic, las reglas de Continue y la plantilla global de Twinny; no modifica código funcional del sitio.
- Twinny quedó configurado globalmente. Continue lee la regla del repositorio. En Bionic falta importar manualmente la carpeta `.agents/skills/juegosengithub` en Ajustes > Habilidades.
- Próximo paso de producto: implementar la propuesta 032 en `feature/032_contador_movimientos`.
