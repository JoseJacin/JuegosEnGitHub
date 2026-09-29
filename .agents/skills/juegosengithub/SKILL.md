---
name: juegosengithub
description: Apply the JuegosEnGitHub repository workflow, including its SDD proposal, approval, implementation, verification, and closure phases.
---

# Flujo del proyecto JuegosEnGitHub

## Fuentes y comprobación

- Lee `AGENTS.md` y `COMANDOS.md` antes de cambiar archivos. Consulta los documentos de estado pertinentes al pedido: los de raíz para el sitio y los de `juegos/<id>/` para ese juego.
- Para un juego, usa `juegos/<id>/README.md` como autoridad sobre sus reglas y su `PLAN.md`, `CONTEXTO.md` e índice de propuestas como fuentes de tareas, continuidad y estado. Para trabajo transversal, usa los documentos generales y `docs/propuestas/`.
- Inspecciona Git y los archivos actuales. No tomes una afirmación del usuario, una conversación anterior o `CONTEXTO.md` como prueba de que existe una tarea, carpeta, archivo o función.
- El plan general registra solo el trabajo del sitio. No enumeres ni compares allí propuestas o estados de juegos. Si el plan de un juego y sus propuestas discrepan, señala la discrepancia dentro de ese ámbito y usa las dependencias documentadas.
- Busca código en las extensiones reales del repositorio. JavaScript y CSS pueden estar integrados en `.html`.
- Respalda conclusiones con rutas y encabezados concretos. No inventes datos; separa hechos observados de inferencias.

## Fases SDD

1. **Propuesta:** para una funcionalidad o cambio de producto, crea primero una propuesta con la plantilla común. Define problema, objetivo, incluye/excluye, requisitos, criterios verificables, tareas, dependencias y preguntas. No dupliques reglas ya especificadas.
2. **Revisión y aprobación:** comprueba que la propuesta concuerda con las reglas y el código actuales. Expón decisiones abiertas y contradicciones. No implementes el cambio de producto hasta que el usuario apruebe el alcance; no supongas que un borrador está aprobado.
3. **Implementación:** trabaja solo dentro del alcance aprobado, en la rama exigida por `COMANDOS.md`. Sigue el plan y las dependencias del ámbito. Si hace falta cambiar una regla o ampliar el alcance, detén ese punto y solicita resolución antes de continuar con ese cambio.
4. **Verificación:** revisa cada criterio de aceptación y comunica qué quedó cubierto, cómo se comprobó y qué falta. No marques como completado lo que no se haya verificado.
5. **Cierre:** actualiza el estado de la propuesta y las tareas del plan pertinente; registra decisiones, estado Git y próximos pasos en el `CONTEXTO.md` del ámbito. Actualiza el contexto raíz solo si cambió el estado compartido del sitio; actualiza ambos ámbitos si el cambio afecta a ambos. Sigue el flujo de revisión, commit, merge y publicación de `COMANDOS.md`.

Para consultas, auditorías o cambios puramente documentales pedidos directamente, respeta el alcance de la petición y no inicies una implementación de producto que no se haya aprobado.

## Límites de trabajo

- Si el usuario pide solo investigar o revisar, no modifiques archivos.
- No cambies reglas documentadas por iniciativa propia.
- Sigue la estructura, la convención de ramas y los comandos de `COMANDOS.md`; no incluyas cambios ajenos al alcance.

## Consultas de estado

- Solo si el usuario pregunta qué queda o cuál es el siguiente paso, consulta el plan y contexto del ámbito solicitado, su índice de propuestas y el estado actual de Git.
- Explica el orden por estado y dependencias documentadas. Señala documentación obsoleta o discrepancias en ese ámbito; no infieras pendientes del historial.
- Responde en español y con el detalle adecuado a la pregunta.
