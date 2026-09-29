# Propuesta: <nombre del cambio>

**Estado:** Borrador | En revisión | Aprobada | Implementada
**Fecha:** AAAA-MM-DD
**Responsable:**

## Problema y objetivo

¿Qué necesidad resuelve este cambio y qué resultado se espera?

## Alcance

- Incluye:
- No incluye:

## Requisitos y decisiones

Enumera comportamientos observables y decisiones que deban aprobarse. Enlaza las especificaciones existentes y no copies sus reglas.

## Criterios de aceptación

- [ ] <resultado verificable>

## Tareas

- [ ] <paso concreto>

## Riesgos, dependencias y preguntas

Anota dependencias o decisiones pendientes. Si no hay, escribe «Ninguno».

## Cierre de esta propuesta

Cuando quede implementada y fusionada en `main`: marca todas las tareas y criterios de aceptación, actualiza el `PLAN.md` y el `CONTEXTO.md` del ámbito con la rama/commit de fusión, actualiza el índice `propuestas/README.md` de ese ámbito, y retira este archivo `.md` del árbol de trabajo con `git rm` (su contenido queda disponible en el historial de Git). Antes de pedir el OK de documentación, ejecuta `node scripts/proposal-status.mjs <esta-ruta>` y `node scripts/check-docs.mjs` para comprobar que no queda ninguna referencia rota ni tarea sin marcar (ver «Cierre de una propuesta» en `COMANDOS.md`).
