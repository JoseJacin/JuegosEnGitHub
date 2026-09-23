# Propuesta: estilo visual, adaptación y accesibilidad

**Estado:** Implementada
**Fecha:** 2026-09-23
**Responsable:** Codex

## Problema y objetivo

La configuración y la partida necesitan una presentación coherente con la referencia acordada y que siga siendo legible en pantallas pequeñas y tableros grandes. Este cambio completa T6 según [`../../PLAN.md`](../../PLAN.md) y respeta las reglas de [`../../juegos/botellas-y-liquidos/README.md`](../../juegos/botellas-y-liquidos/README.md).

## Alcance

- Incluye: presentación oscura, lectura de botellas, capas, capacidad y estados; adaptación de tablero y controles a móvil y escritorio; revisión de teclado, foco y anuncios accesibles.
- No incluye: cambios en reglas, generación, movimientos, victoria ni publicación en GitHub Pages.

## Requisitos y decisiones

- Mantener el fondo oscuro, las botellas en filas, los líquidos por capas y las marcas verdes para botellas completadas.
- Hacer visibles la posición, el nivel/capacidad, los colores de las capas, la selección y el estado completado/cerrado.
- Conservar dimensiones legibles de botellas en tableros estrechos, permitiendo desplazamiento horizontal cuando el ancho no alcance.
- Mantener controles operables con teclado, foco visible y anuncios de estado útiles para lector de pantalla.
- No modificar la lógica funcional ni el contenido de las partidas.

## Criterios de aceptación

- [x] La interfaz refleja el estilo definido en la especificación.
- [x] Botellas, capas, selección, capacidad y estado completado/cerrado se distinguen con claridad.
- [x] Configuración, tablero y controles se pueden usar en móvil y escritorio, también con tableros grandes.
- [x] Las acciones principales se pueden realizar con teclado y el foco y los mensajes de estado son perceptibles.
- [x] Las reglas y la lógica del juego permanecen sin cambios.

## Tareas

- [x] Revisar y ajustar los estilos de configuración, tablero, botellas y acciones.
- [x] Adaptar el tablero para conservar botellas legibles y desplazarlo si hace falta.
- [x] Mejorar descripciones accesibles de botellas, capas y controles.
- [x] Actualizar PLAN, índice de propuestas y CONTEXTO.

## Riesgos, dependencias y preguntas

Depende de la interfaz implementada en T2–T5. Los tableros anchos conservan un acceso desplazable y enfocable por teclado. Revisión estática; no se hizo comprobación manual en navegador.
