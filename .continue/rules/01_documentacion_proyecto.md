---
name: Documentación del proyecto
alwaysApply: true
description: Lectura de instrucciones, plan y referencias documentales del workspace
---

# Lectura del proyecto

- Sigue `AGENTS.md` como instrucciones del proyecto y `COMANDOS.md` para los comandos. No las sustituyas por reglas duplicadas aquí.
- Usa las herramientas de lectura y búsqueda de Continue para inspeccionar el workspace. No simules llamadas a herramientas en texto ni escribas JSON como si hubieras ejecutado una herramienta.
- Antes de trabajar, lee `AGENTS.md` y `COMANDOS.md`. Para preguntas de estado, lee también `PLAN.md`, `CONTEXTO.md` y `docs/README.md`; para cambios o estado de un juego, abre además `juegos/<id>/README.md`, `juegos/<id>/PLAN.md`, `juegos/<id>/CONTEXTO.md` y las propuestas enlazadas.
- Si un documento pertinente enlaza a otros archivos locales que contienen requisitos, tareas, reglas, decisiones o instrucciones necesarias para responder, abre esos archivos también y sigue sus referencias locales pertinentes hasta reunir el contexto necesario. Para enlaces relativos, resuelve la ruta desde el documento que contiene el enlace.
- Contrasta las tareas pendientes del plan con las propuestas aprobadas y el estado de Git. Comprueba cualquier premisa sobre archivos, carpetas, funciones o tareas antes de aceptarla. El código JavaScript y CSS puede estar dentro de archivos `.html`.
- Cita las rutas que respaldan conclusiones y diferencia hechos del repositorio de inferencias. Si las fuentes discrepan o falta un archivo, dilo explícitamente; no inventes información.
- No abras indiscriminadamente recursos que no sean pertinentes. No accedas fuera del workspace salvo que el usuario lo solicite.
- Si una referencia local no existe o no puede leerse con las herramientas disponibles, indica la ruta y el error concreto; no inventes su contenido.
- Respeta el alcance solicitado. Una investigación de solo lectura no autoriza cambios; para implementar, sigue el flujo SDD de `AGENTS.md`.
- En Agent, usa las herramientas de lectura y búsqueda disponibles. Si no están disponibles, indica esa limitación; nunca conviertas una llamada ficticia en respuesta final.
