# Propuesta: compactar la partida y simplificar la configuración

**Estado:** Implementada
**Fecha:** 2026-09-23
**Responsable:** Usuario y agente Codex

## Problema y objetivo

Reducir el espacio que ocupan los mensajes y opciones en Botellas y líquidos, y hacer más directa la entrada al juego desde el catálogo.

## Alcance

- Incluye: retirar mensajes redundantes de selección y configuración; mostrar cada trasvase como cantidad y muestra cuadrada de color; colocar ese estado a la izquierda de los controles, que quedan a la derecha; presentar dos opciones de configuración por fila; retirar el enlace de regreso a la entrada; y cambiar la llamada de la tarjeta del juego a «Acceder».
- No incluye: cambios en reglas, generación, historial, navegación interna o estilos visuales fuera de los ajustes descritos.

## Requisitos y decisiones

1. Al seleccionar un origen no se anuncia el texto de instrucciones largo. Se conserva la selección visual y accesible de la botella.
2. El encabezado «Tu partida» desaparece. El estado del trasvase ocupa su lugar y muestra la cantidad vertida y un cuadrado del color correspondiente. La tecnología de asistencia recibe además una descripción del número de unidades y el nombre del color.
3. Los controles de partida se alinean al extremo derecho, con el estado del último trasvase a su izquierda.
4. Los campos de configuración usan dos columnas por fila.
5. El texto positivo sobre la generación resoluble y la nota bajo el botón «Empezar» desaparecen. Los mensajes de validación siguen apareciendo para combinaciones inválidas y el error de generación solo aparece si se agotan los intentos o no se logra asignar una distribución.
6. El catálogo elimina «Volver a la entrada» y la tarjeta del juego muestra «Acceder».
7. La introducción de configuración queda bajo «Configuración de partida» con el texto «Prepara un reto a tu medida antes de empezar.»

## Criterios de aceptación

- [x] Seleccionar un origen no muestra el mensaje largo de selección.
- [x] El estado de un trasvase muestra la cantidad y el color en un cuadrado, a la izquierda de los controles alineados a la derecha.
- [x] No aparece «Tu partida» ni los dos textos positivos sobre la generación.
- [x] Las opciones de configuración se muestran en dos columnas.
- [x] Un fallo tras los intentos de generación muestra un mensaje; una configuración válida no muestra el texto positivo redundante.
- [x] El catálogo no muestra «Volver a la entrada» y su tarjeta usa «Acceder».
- [x] El texto introductorio corregido aparece debajo del título de configuración.

## Tareas

- [x] Ajustar HTML, CSS y anuncios de estado en la página del juego.
- [x] Ajustar los textos y enlaces del catálogo.
- [x] Actualizar plan, índice de propuestas y contexto.
- [x] Revisar el diff; no se ejecutaron pruebas.

## Riesgos, dependencias y preguntas

El indicador visual usa un cuadrado CSS y mantiene un anuncio textual accesible con el nombre del color. No hay cambios de reglas ni dependencias externas.
