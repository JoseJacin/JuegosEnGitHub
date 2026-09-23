# Propuesta: generador de partidas resolubles

**Estado:** Implementada
**Fecha:** 2026-09-23
**Responsable:** Codex

## Problema y objetivo

La pantalla de configuración no puede iniciar partidas. Incorporar el modelo de botella y un generador que respete la configuración y produzca una disposición resoluble con el estado inicial acordado.

## Alcance

- Incluye: modelo de botella (capacidad, capas y estado abierto/tapado), asignación compatible de capacidades, cantidades de colores, generación aleatoria resoluble con capas de varios colores en algunas botellas, representación inicial del tablero y habilitación de «Empezar».
- No incluye: interacción de trasvase, historial, victoria ni acabado visual final (T4–T6).

## Requisitos y decisiones

- Respetar las reglas de [`../../juegos/botellas-y-liquidos/README.md`](../../juegos/botellas-y-liquidos/README.md) y los límites de configuración definidos en T2.
- La solución se conoce por construcción: se parte de botellas objetivo completas y se distribuyen capas mediante movimientos inversos a trasvases válidos. Cada color tiene un volumen igual a la capacidad de una botella objetivo.
- Todas las botellas comienzan con entre 1 y capacidad−1 unidades. Las botellas vacías solo aparecen tras movimientos o al final. Algunas botellas pueden contener varios colores en capas; otras pueden resultar monocromáticas.
- El tablero inicial presenta filas de botellas en el orden configurado. La aleatoriedad incluye capacidades compatibles, reparto de cantidades y orden de colores.

## Criterios de aceptación

- [x] «Empezar» genera y muestra una partida según la configuración actual.
- [x] Toda botella tiene capacidad válida y estado abierto; ninguna empieza vacía ni llena.
- [x] Los volúmenes por color permiten completar botellas objetivo llenas y la partida es resoluble por construcción; las capas mezcladas se muestran en el tablero.
- [x] El generador trabaja con hasta 60 botellas y respeta número de colores y capacidades.
- [x] La propuesta, el plan y CONTEXTO reflejan el resultado del bloque.

## Tareas

- [x] Modelar botellas y asignar capacidades compatibles.
- [x] Generar volúmenes por color y distribución inicial resoluble.
- [x] Mostrar el tablero al iniciar y permitir volver a la configuración.
- [x] Revisar el cambio y actualizar documentación.

## Riesgos, dependencias y preguntas

La distribución de capacidades validada previamente puede tener que elegirse con búsqueda acotada para garantizar que los objetivos de color y el estado inicial parcial sean simultáneamente posibles. La primera versión se corrigió para mezclar capas en las botellas donantes, como indica la referencia visual y la especificación del juego.
