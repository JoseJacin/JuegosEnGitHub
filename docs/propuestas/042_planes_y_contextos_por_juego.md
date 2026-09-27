# Propuesta 042: planes y contextos por juego

**Estado:** Aprobada e implementada
**Fecha:** 2026-09-27

## Problema y objetivo

El plan y el contexto de continuidad de la raíz contienen tareas y estado detallados de Botellas y líquidos. Al añadir otro juego, esa documentación común crecería y mezclaría ciclos de trabajo independientes. El objetivo es que cada juego mantenga su propio plan y contexto, y que la raíz documente solo el sitio y los asuntos compartidos.

## Alcance

- Incluye: crear `PLAN.md` y `CONTEXTO.md` para Botellas y líquidos; convertir los equivalentes de la raíz en resúmenes del sitio con enlaces; actualizar instrucciones, índices y referencias; conservar tareas, estados, dependencias y propuestas aprobadas; registrar que la documentación se reorganiza antes de iniciar el nuevo juego.
- No incluye: cambiar reglas, alcance o criterios de aceptación de Botellas y líquidos; implementar sus mejoras pendientes; definir o implementar las reglas de Murdoku.

## Requisitos y decisiones

- Cada juego mantiene su especificación, plan, contexto y propuestas en `juegos/<id>/`.
- El plan raíz enumera trabajo transversal y un resumen enlazado por juego; no duplica tareas específicas.
- El contexto raíz resume continuidad del sitio y enlaza los contextos de cada juego.
- La propuesta común sigue en `docs/propuestas/`; las propuestas de un juego permanecen junto a este.
- Se conservan los identificadores T1–T22 y las propuestas 032–037, incluidas sus dependencias y estados aprobados.
- La siguiente iniciativa acordada tras este cambio es preparar la propuesta de Murdoku. Las mejoras pendientes de Botellas y líquidos quedan registradas y no se dan por canceladas.

## Criterios de aceptación

- [x] El plan y el contexto detallados de Botellas y líquidos están en su carpeta.
- [x] Los documentos raíz describen solo el sitio y enlazan a los documentos por juego.
- [x] AGENTS, la skill del repositorio, las reglas de Continue, README e índices explican la ubicación de las fuentes de verdad.
- [x] Los estados y dependencias de las propuestas 032–037 se conservan sin marcar tareas como completadas.
- [x] La secuencia prioriza completar esta reorganización y luego preparar el nuevo juego, dejando explícito que el backlog de Botellas y líquidos sigue abierto.
- [x] Las referencias locales a planes y contextos apuntan a las rutas vigentes.

## Tareas

- [x] Crear el plan y el contexto de Botellas y líquidos a partir de la documentación vigente.
- [x] Reducir el plan y contexto raíz a información transversal y enlaces.
- [x] Actualizar instrucciones, índices y referencias documentales.
- [x] Revisar estado de Git, referencias y diff; integrar la rama según el flujo del proyecto.

## Riesgos, dependencias y preguntas

- Riesgo de duplicar fuentes de verdad: se mitiga dejando tareas específicas solo en el plan del juego y usando la raíz como índice.
- Las propuestas antiguas conservan sus referencias históricas a nombres genéricos `PLAN.md` y `CONTEXTO.md`; las referencias vigentes se actualizan y los documentos del juego aclaran su ámbito.
