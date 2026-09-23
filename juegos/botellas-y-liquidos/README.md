# Botellas y líquidos

## Presentación

Un juego de lógica y organización visual. Varias botellas contienen capas de líquidos de distintos colores. Hay que trasladar los líquidos entre botellas hasta reunir cada color en su propia botella. Al completar una botella con un solo color, se tapa y queda ordenada.

La referencia visual es [`../../imagenes/Juego de botellas y líquidos.png`](../../imagenes/Juego%20de%20botellas%20y%20l%C3%ADquidos.png). El juego tendrá un estilo parecido: fondo oscuro, botellas alineadas en filas, líquidos en capas y marcas verdes en las botellas completadas.

## Objetivo

Organizar todos los líquidos por color. La partida se gana únicamente cuando cada botella que contenga líquido está llena al 100 % con un solo color; esas botellas se tapan automáticamente. Las botellas vacías no impiden ganar.

## Reglas conocidas

1. La partida contiene varias botellas, algunas con capas de líquidos de diferentes colores.
2. Antes de empezar, el usuario puede ver y modificar la configuración: de 2 a 10 botellas por fila, de 1 a 6 filas, de 2 a 6 colores distintos y capacidad máxima de 2 a 6 unidades por botella. El total de botellas se obtiene multiplicando filas por botellas por fila.
3. Una casilla permite activar capacidades distintas. Desactivada, todas las botellas tienen la capacidad seleccionada; activada, las capacidades se asignan al azar entre 2 unidades y el máximo seleccionado. El jugador elige cuántos tamaños distintos habrá, entre 2 y 4, limitado por las capacidades disponibles.
4. Solo se puede verter desde una botella abierta que contenga líquido.
5. Se vierte toda la capa continua de color que está en la parte superior de la botella de origen, hasta donde permita la capacidad libre del destino.
6. El destino debe estar abierto y tener capacidad disponible. Si está vacío, puede recibir líquido de cualquier color; si ya contiene líquido, su capa superior debe ser del mismo color que el líquido que se vierte.
7. El origen y el destino deben ser botellas distintas. Si el jugador vuelve a seleccionar la botella de origen, esta se deselecciona.
8. Cuando una botella está llena con un único color, se tapa automáticamente y se considera completada. Una botella tapada no puede recibir más líquido.
9. La partida se gana únicamente cuando todas las botellas con líquido están llenas al 100 %, contienen un solo color y están cerradas. Puede haber botellas vacías durante la partida o al ganar; no impiden la victoria.
10. El jugador puede deshacer movimientos y reiniciar la partida.
11. Al comenzar, ninguna botella está vacía ni llena: cada una contiene al menos una unidad y tiene al menos una unidad de capacidad libre. Las botellas vacías pueden aparecer como resultado de los trasvases.
12. Toda partida generada debe tener solución. La disposición es aleatoria.
13. Para mover líquido, se selecciona primero la botella de origen y después la de destino: con clic en ordenador o toque en móvil. Volver a seleccionar el origen lo deselecciona.
14. El juego calcula automáticamente la cantidad de líquido de cada color para que pueda quedar distribuida en botellas llenas. El usuario configura el número de colores, no la cantidad de unidades por color.
15. Al ganar, se muestra un mensaje con dos opciones: repetir con la misma configuración (generando una nueva disposición aleatoria) o cambiar la configuración.

## Configuración del código

Todas las variables de configuración del juego deberán estar agrupadas en una sección diferenciada del código, en vez de repartirse entre la lógica y la interfaz.

## Presentación visual

El menú de configuración y la partida seguirán un estilo parecido a la imagen de referencia: fondo oscuro, filas de botellas con líquidos de colores y marcas verdes para las botellas completadas. Al ganar, aparecerá un mensaje de victoria con las opciones de repetir o cambiar la configuración.

## Estado

Definición y decisiones de diseño consolidadas. La pantalla de configuración está implementada; la generación de partidas y la lógica de juego siguen pendientes según `PLAN.md`.
