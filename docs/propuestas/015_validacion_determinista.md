# Propuesta: validación determinista de la configuración

**Estado:** Implementada  
**Fecha:** 2026-09-23  
**Responsable:** Codex

## Problema y objetivo

El aviso de compatibilidad puede cambiar al recargar sin cambiar la configuración. La validación reutiliza una búsqueda aleatoria para decidir si hay una asignación posible. Separar la decisión de compatibilidad de la aleatoriedad de la partida.

## Alcance

- Incluye: comprobación determinista de que existe una selección compatible de botellas objetivo y validación de asignaciones uniformes o de capacidades distintas.
- No incluye: cambios en las reglas del juego ni en la aleatoriedad de las partidas válidas.

## Requisitos y decisiones

- Mantener las reglas de [Botellas y líquidos](../../juegos/botellas-y-liquidos/README.md).
- Con los mismos valores de configuración, la pantalla debe mostrar siempre el mismo resultado de validación.
- La búsqueda de objetivos debe descartar elecciones incompatibles antes de elegir una al azar para la partida.

## Criterios de aceptación

- [x] La validación no depende de llamadas aleatorias.
- [x] La configuración de las capturas (4 botellas por fila, 2 filas, 4 colores y capacidad 4 uniforme) siempre se valida como compatible.
- [x] La generación conserva la elección aleatoria entre alternativas compatibles.
- [x] La propuesta y CONTEXTO reflejan el cambio.

## Tareas

- [x] Separar la búsqueda determinista de compatibilidad de la generación aleatoria.
- [x] Filtrar selecciones aleatorias de objetivos que no permiten el reparto inicial.
- [x] Revisar el diff y la validación estática.

## Riesgos, dependencias y preguntas

La búsqueda de asignaciones variables recorre las distribuciones de cantidades por tamaño (como máximo cuatro tamaños configurables); puede hacer más trabajo al cambiar la configuración, pero no altera el estado de la partida.
