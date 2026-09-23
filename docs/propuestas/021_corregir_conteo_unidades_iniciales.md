# Propuesta: corregir el conteo de unidades iniciales

**Estado:** Implementada
**Fecha:** 2026-09-23
**Responsable:** Codex

## Problema y objetivo

El diagnóstico mostró capas con color `undefined` aunque las medidas entre capas eran contiguas. El generador sumaba unidades iniciales de más al calcular las unidades que debía repartir sobre las dos unidades base de cada botella objetivo. Al agotarse la lista de colores, las capas sobrantes quedaban sin color y mostraban el fondo oscuro.

## Alcance

- Incluye: corregir el conteo y evitar asignar capas si faltan colores o las cantidades no coinciden.
- No incluye: cambios visuales, de reglas o en el diagnóstico.

## Criterios de aceptación

- [x] La cantidad de unidades iniciales coincide con la lista de unidades coloreadas.
- [x] El generador no acepta una distribución con color ausente.

## Tareas

- [x] Corregir el conteo de unidades adicionales sobre la base de dos unidades por botella objetivo.
- [x] Añadir una comprobación de coherencia antes de asignar colores.
- [x] Revisar el diff sin abrir el navegador.

## Riesgos, dependencias y preguntas

Ninguno.
