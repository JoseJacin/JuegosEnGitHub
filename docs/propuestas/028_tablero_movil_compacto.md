# Propuesta: compactar el tablero para pantallas pequeñas

**Estado:** Implementada
**Fecha:** 2026-09-23
**Responsable:** Usuario y agente Codex

## Problema y objetivo

Evitar desplazamiento horizontal con las diez botellas por fila en pantallas pequeñas, reducir la altura del tablero y hacer más breves los mensajes de error de trasvase.

## Alcance

- Incluye: ajustar la cuadrícula para ocupar el ancho disponible; contener el corcho dentro del ancho de cada botella; reducir la separación entre filas; centrar el estado de llenado y la marca de completado dentro del vidrio; mostrar errores breves en el área de estado; y reducir el espacio entre controles.
- No incluye: cambios en reglas, generación, selección, historial ni navegación.

## Requisitos y decisiones

1. La cuadrícula puede comprimir las botellas según el número de columnas configurado y no impone un ancho mínimo que provoque scroll horizontal en móvil.
2. El corcho no supera el ancho de la botella.
3. El espacio vertical entre filas de botellas se reduce.
4. El texto de llenado se centra dentro del vidrio; la botella completada muestra debajo un check centrado.
5. El destino lleno se anuncia como «Botella llena» con un icono de aviso. Un color superior distinto se anuncia como «Color no coincidente» con un símbolo de desigualdad. Ambos aparecen en el estado a la izquierda de los controles y conservan texto accesible.
6. Se reduce la separación entre los botones de control sin cambiar su tamaño de toque.

## Criterios de aceptación

- [x] Diez botellas por fila caben a 360 px sin scroll horizontal.
- [x] El corcho queda dentro del ancho de su botella.
- [x] Las filas de botellas tienen menos separación vertical.
- [x] El estado de llenado y el check aparecen centrados dentro del vidrio, en líneas consecutivas.
- [x] Los errores de capacidad y color muestran «Botella llena» y «Color no coincidente» en el estado de movimiento.
- [x] Los botones de control tienen menos separación.

## Tareas

- [x] Ajustar CSS responsivo y presentación del estado dentro de cada botella.
- [x] Actualizar los mensajes compactos de error.
- [x] Actualizar plan, índice de propuestas y contexto.
- [x] Revisar el diff; no se ejecutaron pruebas ni se hizo comprobación en navegador.

## Riesgos, dependencias y preguntas

En filas de diez botellas, las botellas se muestran más estrechas en pantallas pequeñas. No se modifican las reglas del juego.
