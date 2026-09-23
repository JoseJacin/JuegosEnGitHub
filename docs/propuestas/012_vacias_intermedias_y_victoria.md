# Aclaración: botellas vacías durante la partida y al ganar

**Estado:** Aprobada e implementada
**Fecha:** 2026-09-23
**Responsable:** Codex

## Problema y objetivo

La propuesta 011 interpretó erróneamente que una botella vacía debía estar presente desde el inicio. Aclarar el momento en que pueden aparecer botellas vacías y cómo se evalúan al ganar.

## Alcance

- Incluye: retirar la botella vacía inicial, permitir que los trasvases dejen una o varias botellas vacías y explicitar que las vacías no impiden la victoria.
- No incluye: alterar el estado inicial acordado de T3 ni los criterios ya definidos para completar las botellas con líquido.

## Requisitos y decisiones

- Al inicio, todas las botellas contienen líquido y tienen al menos una unidad de capacidad libre.
- Durante la partida, cualquier número de botellas puede quedar vacío como resultado de los trasvases.
- La victoria exige que todas las botellas con líquido estén llenas, contengan un solo color y estén cerradas. Las botellas vacías se ignoran.
- Mantener el generador de partidas resolubles y la mezcla aleatoria de colores.

## Criterios de aceptación

- [x] El generador no deja botellas vacías al inicio.
- [x] La validación vuelve a comprobar que cada botella inicia parcialmente llena.
- [x] La especificación diferencia el estado inicial del estado durante la partida y la condición de victoria.
- [x] Las botellas vacías no bloquean la victoria.

## Tareas

- [x] Restaurar T3 y su validación para el estado inicial sin botellas vacías.
- [x] Actualizar la especificación, el plan y el contexto.

## Riesgos, dependencias y preguntas

La lógica de victoria de T5 debe seguir ignorando las botellas vacías, tal como ya indica la especificación.
