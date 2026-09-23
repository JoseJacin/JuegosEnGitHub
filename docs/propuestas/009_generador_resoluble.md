# Propuesta: generador de partidas resolubles

**Estado:** Implementada
**Fecha:** 2026-09-23
**Responsable:** Codex

## Problema y objetivo

La pantalla de configuración no puede iniciar partidas. Incorporar el modelo de botella y un generador que respete la configuración y produzca una disposición resoluble con el estado inicial acordado.

## Alcance

- Incluye: modelo de botella (capacidad, capas y estado abierto/tapado), asignación compatible de capacidades, cantidades de colores, generación aleatoria resoluble, representación inicial del tablero y habilitación de «Empezar».
- No incluye: interacción de trasvase, historial, victoria ni acabado visual final (T4–T6).

## Requisitos y decisiones

- Respetar las reglas de [`../../juegos/botellas-y-liquidos/README.md`](../../juegos/botellas-y-liquidos/README.md) y los límites de configuración definidos en T2.
- La solución se conoce por construcción: cada botella se genera con un color único, y para cada color se designa una botella objetivo cuya capacidad coincide con el volumen total de ese color. Los donantes pueden vaciarse en ella mediante movimientos válidos.
- Cada botella comienza con entre 1 y capacidad−1 unidades. La configuración de capacidades variables solo se acepta si puede asignarse de forma que cada color tenga objetivo y se cumpla ese estado inicial.
- El tablero inicial presenta filas de botellas en el orden configurado. La aleatoriedad incluye capacidades compatibles, reparto de cantidades y orden de colores.

## Criterios de aceptación

- [x] «Empezar» genera y muestra una partida según la configuración actual.
- [x] Toda botella tiene capacidad válida, contenido y estado abierto; ninguna empieza vacía ni llena.
- [x] Los volúmenes por color permiten completar botellas objetivo llenas y la partida es resoluble por construcción.
- [x] El generador trabaja con hasta 60 botellas y respeta número de colores y capacidades.
- [x] La propuesta, el plan y CONTEXTO reflejan el resultado del bloque.

## Tareas

- [x] Modelar botellas y asignar capacidades compatibles.
- [x] Generar volúmenes por color y distribución inicial resoluble.
- [x] Mostrar el tablero al iniciar y permitir volver a la configuración.
- [x] Revisar el cambio y actualizar documentación.

## Riesgos, dependencias y preguntas

La distribución de capacidades validada previamente puede tener que elegirse con búsqueda acotada para garantizar que los objetivos de color y el estado inicial parcial sean simultáneamente posibles.
