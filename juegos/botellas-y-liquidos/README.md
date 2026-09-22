# Botellas y líquidos

## Presentación

Un juego de lógica y organización visual. Varias botellas contienen capas de líquidos de distintos colores. Hay que trasladar los líquidos entre botellas hasta reunir cada color en su propia botella. Al completar una botella con un solo color, se tapa y queda ordenada.

La referencia visual es [`../../imagenes/Juego de botellas y líquidos.png`](../../imagenes/Juego%20de%20botellas%20y%20l%C3%ADquidos.png): muestra un fondo oscuro, botellas alineadas en filas, líquidos en capas y marcas verdes en las botellas completas.

## Objetivo

Organizar todos los líquidos para que cada color quede reunido en una botella. Una botella que alcanza su capacidad con un único color se considera completada: se tapa, queda cerrada y ya no participa en más trasvases.

## Reglas conocidas

1. La partida contiene varias botellas, algunas con capas de líquidos de diferentes colores.
2. Se puede configurar el número de botellas y el número de colores/tipos de líquido de la partida.
3. Solo se puede verter desde una botella abierta que contenga líquido.
4. El líquido que se vierte es el de la parte superior de la botella de origen.
5. El destino debe estar abierto y tener capacidad disponible. Si ya contiene líquido, su capa superior debe ser del mismo color que el líquido que se vierte.
6. Cuando una botella alcanza su capacidad con un único color, se tapa y se considera ordenada. Una botella tapada no puede recibir más líquido.
7. La partida se completa cuando todos los líquidos están ordenados en sus botellas correspondientes.

## Aspectos pendientes de acordar

- Capacidad de cada botella y relación entre el número de colores, la cantidad total de líquido y el número de botellas.
- Si una botella abierta y vacía puede recibir cualquier color. La regla descrita solo especifica destinos cuyo líquido superior coincide.
- Si un movimiento vierte una unidad de líquido o toda la capa continua del mismo color.
- Si se permite verter de una botella a sí misma y qué ocurre cuando no quedan movimientos válidos.
- Valores disponibles para configurar, niveles predefinidos o generación aleatoria y cómo garantizar que una partida tenga solución.
- Controles (ratón, táctiles y/o teclado), opciones de deshacer/reiniciar y presentación de victoria.
- Si una botella completa se tapa automáticamente o mediante una acción del jugador. La descripción actual asume el cierre automático.

Estos puntos no se fijan todavía: se decidirán tras revisar esta presentación y las reglas.

## Estado

Definición inicial redactada; pendiente de revisión. No hay interfaz ni lógica de juego implementadas.
