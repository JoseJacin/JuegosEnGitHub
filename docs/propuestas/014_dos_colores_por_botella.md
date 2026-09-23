# Propuesta: al menos dos colores en cada botella inicial

**Estado:** Implementada
**Fecha:** 2026-09-23
**Responsable:** Codex

## Problema y objetivo

Algunas botellas se generan casi llenas y de un solo color, lo que reduce la dificultad. Garantizar que cada botella contenga al menos dos colores distintos al empezar.

## Alcance

- Incluye: distribución de capas con al menos dos colores por botella, validación de las capacidades y combinaciones compatibles, y actualización de la especificación.
- No incluye: cambios a las reglas de trasvase, victoria o repetición de colores entre botellas objetivo.

## Requisitos y decisiones

- Se mantienen todas las reglas de [Botellas y líquidos](../../juegos/botellas-y-liquidos/README.md).
- Cada botella inicial tiene al menos dos unidades de dos colores distintos y al menos una unidad de capacidad libre.
- La capacidad 2 no puede generar una botella parcial con dos colores; esas configuraciones se rechazan. Los tamaños variables empiezan en 3.
- Solo se habilita el inicio si existe una asignación compatible con el volumen requerido.

## Criterios de aceptación

- [x] El generador distribuye al menos dos colores distintos en cada botella inicial.
- [x] La validación informa que la capacidad mínima es 3 y bloquea combinaciones incompatibles.
- [x] La especificación, el plan y CONTEXTO reflejan la regla.

## Tareas

- [x] Ajustar selección de volúmenes y validación de capacidades.
- [x] Distribuir unidades de color entre todas las botellas y verificar la mezcla.
- [x] Actualizar documentación y revisar los cambios.

## Riesgos, dependencias y preguntas

Algunas configuraciones pueden no tener una distribución que cumpla la regla; se rechazan con una explicación en la pantalla de configuración.
