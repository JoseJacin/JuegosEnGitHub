# Instrucciones para agentes

## Fuentes de verdad

- Lee `AGENTS.md` y `COMANDOS.md` antes de cambiar el proyecto.
- Usa los archivos del repositorio como fuente de verdad; no supongas decisiones que no estén documentadas.
- `PLAN.md` registra el alcance y orden generales del sitio. `juegos/<id>/PLAN.md` define las tareas y dependencias de cada juego; su `CONTEXTO.md` guarda su continuidad. Las propuestas específicas viven en `juegos/<id>/propuestas/`; las transversales, en `docs/propuestas/`. La especificación de cada juego en su carpeta define sus reglas. Si hay una contradicción, señálala y no cambies las reglas por iniciativa propia.
- Respeta la estructura existente y las convenciones descritas en los `README.md`.
- Mantén actualizado el `CONTEXTO.md` del ámbito afectado al cerrar un bloque: el de raíz para cambios del sitio y el de cada juego para sus cambios, incluyendo rama, estado, decisiones y próximos pasos. Actualiza ambos si el cambio afecta a los dos ámbitos.

## Consultas de estado y continuidad

- Para responder qué queda por hacer, inspecciona el `PLAN.md` de raíz, los planes de los juegos pertinentes y el estado actual de Git; no deduzcas pendientes del historial de conversaciones ni de un resumen antiguo.
- El plan general registra solo trabajo transversal del sitio. El estado y las propuestas de cada juego se consultan en el plan, contexto e índice de propuestas de ese juego; no dupliques propuestas específicas de juego en documentación global.
- Si una petición presupone una tarea, archivo, carpeta o función, compruébalo en el repositorio antes de aceptarlo. Si no existe o contradice las fuentes de verdad, señala la discrepancia.
- Busca código en las extensiones presentes en el repositorio. En particular, el JavaScript y CSS pueden estar integrados en archivos `.html`; no concluyas que no hay funciones solo por no encontrar `.js` o `.ts`.
- Distingue entre hechos documentados, estado observado y recomendaciones. Cita rutas concretas y no inventes rutas, tareas o estados.

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

- Antes de cambiar archivos, comprueba `git status`; parte de `main` actualizado y crea una rama `feature/<ambito>_<idPropuesta>_<descripcion>`. Usa el identificador del juego para cambios propios de un juego y `sitio` para cambios globales, transversales o de documentación del repositorio. Este requisito aplica también a cambios exclusivamente documentales.
- En entornos con sandbox, `.git` puede estar protegido aunque el árbol de trabajo sea escribible. Ejecuta desde el primer intento con escalación/autorización del entorno toda operación que escriba metadatos Git (`fetch`, `pull`, `switch`/`checkout` que cambien rama, `add`, `commit`, `merge`, `push`). No pruebes primero sin autorización. Las consultas (`status`, `diff`, `log`, `branch`) pueden ejecutarse sin escalación.
- Si una operación mutante falla por permiso al escribir `.git`, no repitas la misma orden sin escalación: conserva los cambios de archivos, informa de la causa y vuelve a ejecutarla por el mecanismo de autorización del entorno. No intentes corregir permisos de `.git` a mano.
- Haz commits pequeños y atómicos con mensajes que describan el cambio.
- Revisa `git status` y el diff antes de confirmar.
- Al completar la tarea, fusiona la rama de funcionalidad en `main` y publica las ramas necesarias en `origin`.
- No incluyas cambios ajenos al alcance. Si el entorno impide publicar, deja constancia del error y del estado local.

## Instrucciones personalizadas de Codex

Texto recomendado para las instrucciones personalizadas:

> Antes de trabajar, lee `AGENTS.md` y `COMANDOS.md` si existen. Respeta siempre la estructura del proyecto y utiliza sus archivos como fuente de verdad. Para contenido funcional extenso, propone primero un esquema y espera confirmación. Sigue el flujo de especificación, implementación y criterios de aceptación definido en `AGENTS.md`.
