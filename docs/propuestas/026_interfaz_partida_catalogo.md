# Propuesta: centrar la interfaz en la partida y compactar el catálogo

**Estado:** Implementada
**Fecha:** 2026-09-23
**Responsable:** Usuario y agente Codex

## Problema y objetivo

La vista de partida muestra datos de configuración que ya están en la pantalla anterior, numera visualmente cada botella y usa controles textuales voluminosos. Se busca destacar el progreso del juego, reconocer de un vistazo las botellas completadas y adaptar mejor la interfaz del juego y el catálogo a pantallas pequeñas.

## Alcance

- Incluye: ordenar visualmente las botellas completadas al inicio del tablero; añadir un tapón de corcho dibujado para las botellas cerradas; quitar los números visibles sobre las botellas; sustituir por iconos las acciones de la barra de partida; compactar controles, márgenes y botellas en pantallas pequeñas; incorporar un encabezado coherente al catálogo y al juego; dejar en la pantalla de configuración el resumen de los valores de la partida y despejarlo de la vista de juego.
- No incluye: cambios a generación, reglas de trasvase, historial, condición de victoria ni navegación/rutas de Pages; cambios en otros juegos; dependencias externas para iconos.

## Requisitos y decisiones

1. Al completar una botella, debe pasar a la primera posición del tablero: arriba a la izquierda. Las siguientes completadas se colocan a su derecha en el orden en que se completaron; si se rebasa el número de columnas, continúan en la fila siguiente. Las botellas aún abiertas conservan su orden relativo detrás de las completadas.
2. La organización es visual y no cambia contenidos, capacidades ni movimientos. Deshacer una jugada ganadora debe restaurar también el orden anterior; reiniciar devuelve el orden inicial. Los controles seguirán actuando sobre la botella correcta después de reordenar.
3. Una botella cerrada tendrá una pieza visual de corcho sobre el cuello. Se conserva la marca verde de completada y el anuncio accesible de que está cerrada.
4. Se elimina el número visible encima de cada botella. Se conserva una identificación no visual suficiente para tecnología de asistencia y mensajes de estado.
5. Los botones de la barra de partida para deshacer, reiniciar, copiar diagnóstico y cambiar configuración mostrarán iconos sin texto visible, con nombre accesible, `title` y foco visible. Las opciones del diálogo de victoria conservan texto para dejar claras las decisiones de fin de partida.
6. En móvil se reducen el relleno de paneles, espacios, alturas visuales de botellas y tamaño de controles; los controles mantienen áreas de toque legibles. El tablero grande conserva desplazamiento horizontal.
7. Catálogo y juego tendrán un encabezado superior visualmente coherente. El catálogo muestra su título y el juego muestra «Botellas y líquidos»; el encabezado del juego incluye acceso al catálogo. No será fijo para preservar espacio vertical en móviles.
8. El resumen de botellas, colores, filas y capacidades queda en la configuración. Durante la partida se elimina ese resumen; la vista de juego mantiene únicamente el título, las acciones, el estado del movimiento y el tablero.

## Criterios de aceptación

- [x] Cada botella completada se mueve al principio del orden visual, manteniendo orden de finalización; las restantes conservan su orden relativo.
- [x] Deshacer y reiniciar restauran el orden visual correcto junto con el estado del tablero.
- [x] Las botellas completadas muestran un tapón de corcho y conservan la marca verde; no muestran números visuales.
- [x] Los cuatro controles de partida se reconocen como iconos y son identificables y operables con teclado y lector de pantalla.
- [x] La vista de partida no muestra el resumen de configuración y la pantalla de configuración conserva todos los valores.
- [x] Catálogo y juego muestran encabezados coherentes con sus títulos y el juego permite volver al catálogo desde el encabezado.
- [x] A 360 px de ancho, la configuración, acciones y tablero se pueden utilizar sin que los controles ocupen desproporcionadamente el espacio; tableros anchos siguen desplazables. (Revisión de CSS; sin navegador gráfico disponible en esta sesión.)
- [x] El diseño se mantiene legible en escritorio y no cambia las reglas o resultados del juego. (Revisión de código y sintaxis.)

## Tareas

- [x] Ajustar el modelo/presentación para colocar botellas completadas al principio sin perder identidad en eventos e historial.
- [x] Dibujar el tapón y quitar la etiqueta numérica visual, conservando anuncios accesibles.
- [x] Cambiar las cuatro acciones de partida a iconos accesibles y compactar el diseño para móvil.
- [x] Añadir encabezados coherentes a catálogo y juego; trasladar el resumen a la configuración y despejar la partida.
- [x] Revisar los estilos de escritorio y móvil y la navegación por teclado; actualizar PLAN, índice de propuestas y CONTEXTO. (La comprobación interactiva en navegador queda pendiente: no había navegador disponible.)

## Riesgos, dependencias y preguntas

El render actual usa el índice de cada botella para enlazar eventos, descripciones y mensajes. El reordenamiento debe mantener una identidad estable para que esos controles y el historial sigan apuntando a la botella correcta. No se prevén cambios a reglas ni preguntas pendientes.
