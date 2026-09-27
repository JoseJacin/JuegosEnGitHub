---
name: juegosengithub
description: Apply the JuegosEnGitHub repository workflow when answering project status questions, investigating tasks, or changing project files.
---

# Flujo del proyecto JuegosEnGitHub

## Fuentes y comprobación

- Lee `AGENTS.md` y `COMANDOS.md` antes de trabajar. Para saber el estado o el siguiente paso, consulta además `PLAN.md`, `CONTEXTO.md` y `docs/README.md`.
- Sigue las referencias locales pertinentes: propuestas aprobadas, reglas del juego y README relacionados. Usa las reglas en `juegos/<id>/README.md` como autoridad sobre la mecánica.
- Inspecciona Git y los archivos actuales. No tomes una afirmación del usuario, una conversación anterior o `CONTEXTO.md` como prueba de que existe una tarea, carpeta, archivo o función.
- Compara el plan con las propuestas aprobadas. Si discrepan, señala la diferencia; identifica el siguiente paso por estado y dependencias documentadas.
- Busca código en las extensiones reales del repositorio. JavaScript y CSS pueden estar integrados en `.html`.
- Respalda conclusiones con rutas y encabezados concretos. No inventes datos; separa hechos observados de inferencias.

## Límites y cambios

- Respeta el alcance pedido. Si el usuario pide investigar o revisar en modo de solo lectura, no modifiques archivos.
- Para una funcionalidad nueva, aplica el flujo SDD de `AGENTS.md`: propuesta, alcance aprobado, criterios de aceptación, implementación y registro actualizado.
- No cambies reglas documentadas por iniciativa propia. Si aparece una contradicción que afecte al comportamiento, descríbela y espera resolución.
- Sigue la estructura y los comandos de `COMANDOS.md`; no incluyas cambios ajenos al alcance.

## Respuesta sobre el siguiente paso

- Indica primero la siguiente tarea pendiente y su propuesta relacionada.
- Resume por qué le toca ahora, citando el plan y cualquier dependencia.
- Señala cualquier estado de Git o documento obsoleto que pueda inducir a error.
- Mantén la respuesta breve y en español, salvo que el usuario pida otro idioma.
