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
4. **Revisión del código:** verifica los criterios de aceptación y revisa el diff de código. Explica qué cambió y qué comprobaste; espera el OK del usuario antes del commit de código. Si no hay cambios de código, omite esta fase.
5. **Revisión de documentación:** tras el commit de código, actualiza la propuesta, el plan y el contexto pertinentes. Si la propuesta queda implementada y fusionada en `main`, retira su archivo `.md` del árbol de trabajo (su contenido sigue disponible en el historial de Git) salvo que el índice de propuestas del ámbito documente explícitamente una excepción. Ejecuta `node scripts/check-docs.mjs` (enlaces rotos y propuestas implementadas sin retirar) y, para la propuesta concreta que cierras, `node scripts/proposal-status.mjs <ruta-al-md>` (checklist pendiente y referencias a actualizar). Presenta y revisa el diff documental; espera un OK distinto antes del commit de documentación. Si el cambio es solo documental, esta es la primera revisión y aprobación de commit.
6. **Merge:** una vez hechos los commits necesarios, solicita un OK explícito para fusionar en `main`. El OK de código o documentación no autoriza el merge. Tras aprobarlo, completa la publicación según `COMANDOS.md`.

Para consultas, auditorías o cambios puramente documentales pedidos directamente, respeta el alcance de la petición y no inicies una implementación de producto que no se haya aprobado.

## Límites de trabajo

- Si el usuario pide solo investigar o revisar, no modifiques archivos.
- No cambies reglas documentadas por iniciativa propia.
- Sigue la estructura, la convención de ramas y los comandos de `COMANDOS.md`; no incluyas cambios ajenos al alcance.
- `COMANDOS.md` documenta scripts en `scripts/` (`serve.sh`, `check-js.sh`, `smoke-test.sh`, `new-branch.sh`, `merge-to-main.sh`, `new-proposal.sh`, `check-docs.mjs`, `proposal-status.mjs`) que agilizan levantar el servidor local, validar sintaxis JS, comprobar marcadores estructurales del HTML servido (`juegos/<id>/smoke-checks.txt`, opcional), crear propuestas con el idPropuesta correcto, y comprobar la coherencia documental (enlaces rotos, propuestas implementadas sin retirar o con checklist incoherente). Son atajos opcionales sobre los mismos comandos: no cambian las aprobaciones exigidas, en particular `merge-to-main.sh` sigue requiriendo el OK explícito de fusión antes de ejecutarse.

## Consultas de estado

- Solo si el usuario pregunta qué queda o cuál es el siguiente paso, consulta el plan y contexto del ámbito solicitado, su índice de propuestas y el estado actual de Git.
- Explica el orden por estado y dependencias documentadas. Señala documentación obsoleta o discrepancias en ese ámbito; no infieras pendientes del historial.
- Responde en español y con el detalle adecuado a la pregunta.
