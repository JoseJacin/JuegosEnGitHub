# Instrucciones para agentes

## Fuentes de verdad

- Lee `AGENTS.md` y `COMANDOS.md` antes de cambiar el proyecto.
- Usa los archivos del repositorio como fuente de verdad; no supongas decisiones que no estén documentadas.
- `PLAN.md` define el alcance y el orden de trabajo. La especificación de cada juego en su carpeta define sus reglas. Si hay una contradicción, señálala y no cambies las reglas por iniciativa propia.
- Respeta la estructura existente y las convenciones descritas en los `README.md`.
- Mantén `CONTEXTO.md` actualizado al cerrar un bloque de trabajo, incluyendo rama, estado, decisiones y próximos pasos.

## Flujo SDD

1. Inspecciona el estado de Git y lee los documentos relacionados con la tarea.
2. Antes de escribir capítulos o contenido funcional extenso, presenta un esquema y espera confirmación.
3. Para una funcionalidad, redacta primero una propuesta con objetivo, alcance, exclusiones, requisitos, criterios de aceptación y tareas. No empieces su implementación hasta que esté aprobada.
4. Implementa solo el alcance aprobado. Si la implementación descubre una decisión que altera una regla aprobada, documenta el conflicto y solicita resolución.
5. Actualiza la propuesta, el plan y `CONTEXTO.md` cuando corresponda; evita copiar la misma especificación en varios archivos.
6. No marques una tarea como terminada hasta que sus criterios de aceptación estén cubiertos. Informa qué se verificó y qué queda pendiente.

## Agentes y colaboración

- El agente principal conserva la responsabilidad sobre el alcance, la integración y la respuesta final.
- Delega solo subtareas concretas, independientes y con entregables claros; no delegues por defecto.
- Indica a cada agente qué archivos puede modificar y pídele que comunique sus cambios y hallazgos.
- Como los agentes comparten el workspace, evita asignarles ediciones simultáneas sobre los mismos archivos.
- Integra y revisa el trabajo de los agentes antes de confirmar cambios.

## Git

- Para cada cambio aprobado, parte de `main` actualizado y crea `feature/<id>_<descripcion>`.
- Haz commits pequeños y atómicos con mensajes que describan el cambio.
- Revisa `git status` y el diff antes de confirmar.
- Al completar la tarea, fusiona la rama de funcionalidad en `main` y publica las ramas necesarias en `origin`.
- No incluyas cambios ajenos al alcance. Si el entorno impide publicar, deja constancia del error y del estado local.

## Instrucciones personalizadas de Codex

Texto recomendado para las instrucciones personalizadas:

> Antes de trabajar, lee `AGENTS.md` y `COMANDOS.md` si existen. Respeta siempre la estructura del proyecto y utiliza sus archivos como fuente de verdad. Para contenido funcional extenso, propone primero un esquema y espera confirmación. Sigue el flujo de especificación, implementación y criterios de aceptación definido en `AGENTS.md`.
