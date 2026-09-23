# Propuesta: diagnóstico copiable de las capas de botella

**Estado:** Aprobada e implementada
**Fecha:** 2026-09-23
**Responsable:** Codex

## Problema y objetivo

Las capturas no permiten distinguir con certeza un hueco real de un problema al pintar las capas. Añadir una forma breve de copiar las medidas del modelo y de los elementos renderizados para que el usuario pueda compartirlas sin abrir herramientas de desarrollo.

## Alcance

- Incluye: botón «Copiar diagnóstico» en el tablero; un resumen por botella con capacidad, volumen, capas, posición y altura calculadas/medidas, espacio superior e intervalos entre capas; alternativa visible si el portapapeles no está disponible.
- No incluye: envío de datos, almacenamiento, cambios en las reglas o en la generación de partidas.

## Requisitos y decisiones

- El resumen se calcula solo en el navegador y se copia mediante una acción explícita del usuario.
- El resultado ocupa una línea por botella y muestra los huecos medidos entre segmentos en píxeles.
- Los colores se identifican con su valor hexadecimal; las capas se enumeran desde el fondo hacia arriba.
- Si copiar al portapapeles falla, el texto queda visible y seleccionable.

## Criterios de aceptación

- [x] El botón genera y copia un resumen del tablero actual sin requerir herramientas de desarrollo.
- [x] El resumen permite comparar unidades con tamaño y posición real de cada capa e indica los huecos medidos.
- [x] El resumen permanece local; si no se puede copiar, aparece como texto seleccionable.

## Tareas

- [x] Añadir controles accesibles de diagnóstico al tablero.
- [x] Medir contenedor y capas renderizadas y construir un resumen compacto.
- [x] Implementar copia con alternativa seleccionable y actualizar la documentación.

## Riesgos, dependencias y preguntas

El navegador puede redondear las medidas a fracciones de píxel; el informe conserva dos decimales para hacer visibles esas diferencias.
