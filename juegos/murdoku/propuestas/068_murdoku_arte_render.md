# Propuesta 068 — Murdoku: arte original y adaptación del tablero (bloque 10 del plan)

**Estado:** Borrador
**Fecha:** 2026-09-29
**Responsable:**

## Problema y objetivo

El tablero necesita una dirección visual propia (terreno, límites de sala, objetos, personas) y adaptarse a escritorio y móvil, sin usar ni imitar assets de Murdoku. Esta propuesta define y produce esos recursos y su integración con el modelo lógico ya construido.

## Alcance

- Incluye: dirección visual original, assets de terreno/límite de sala/objetos/obstáculos/retratos, dibujo de huellas y límites desde el modelo, escalado a escritorio/móvil con zoom/desplazamiento, y revisión de un caso por nivel, según `PLAN.md` bloque 10.
- No incluye:
  - Cambiar la lógica de ocupabilidad o de generación (propuestas 061–064): el arte se deriva del modelo, nunca lo determina.
  - Producir el catálogo final de nombres/temas de contenido si la propuesta 058 no lo aprobó todavía (puede avanzar con marcadores provisionales documentados como tales).

## Requisitos y decisiones

1. **Bloqueo previo.** Depende del catálogo de contenido aprobado (propuesta 058); puede avanzar visualmente en paralelo usando el modelo estable de la propuesta 059 (tipos de `Cell`/`Room`/`ObjectInstance`).
2. **Originalidad.** No descargar, empaquetar ni reproducir assets de Murdoku (retratos, animales, objetos, suelo, sombras, iconografía o logotipo), según README §10 y la propuesta 043.
3. **El dibujo no decide reglas.** El renderizador nunca determina ocupabilidad ni región: siempre lee `Cell.occupiable`/`Cell.roomId` del modelo (`GUIA_MOTOR_GENERACION.md` §2, fila `PuzzleRenderer`).
4. **Accesibilidad visual.** Marcadores de persona, X, notas, objetos y ocupabilidad deben distinguirse en monocromo y con daltonismo, con patrones/etiquetas además de color (README §10).
5. **Fixture de referencia.** El tablero descrito en `GUIA_MOTOR_GENERACION.md` §21.1 (3 salas rectangulares, 3 objetos) sirve como caso de prueba visual mínimo antes de dibujar mapas generados de verdad.

## Criterios de aceptación

- [ ] El tablero se dibuja íntegramente desde el modelo lógico validado, sin assets ni referencias de Murdoku.
- [ ] Huellas de objetos y límites de sala se derivan de `Cell`/`Room`/`ObjectInstance`, no de una plantilla fija independiente del caso.
- [ ] Los marcadores de persona, X, notas y ocupabilidad se distinguen en monocromo y con simulación de daltonismo.
- [ ] El tablero escala automáticamente en escritorio y móvil, con zoom/desplazamiento legible en tableros grandes, sin solapar texto ni marcadores.
- [ ] Un caso de cada nivel de dificultad se revisa con la misma representación visual sin defectos de recorte o solape.

## Tareas

- [ ] **10.1** Aprobar una dirección visual original para el juego.
- [ ] **10.2** Crear un asset de terreno base.
- [ ] **10.3** Crear un asset de límite de sala.
- [ ] **10.4** Crear los primeros assets originales de objetos ocupables.
- [ ] **10.5** Crear los primeros assets originales de obstáculos.
- [ ] **10.6** Crear retratos/avatares originales o estilo de marcador alternativo.
- [ ] **10.7** Añadir etiquetas/IDs accesibles a cada asset.
- [ ] **10.8** Dibujar huellas de objetos desde celdas del modelo.
- [ ] **10.9** Dibujar límites de sala desde `roomId`.
- [ ] **10.10** Dibujar correctamente X, notas y personas sobre cada celda.
- [ ] **10.11** Ajustar escala automática del tablero a escritorio.
- [ ] **10.12** Ajustar tablero y paneles a móvil.
- [ ] **10.13** Permitir desplazamiento/zoom legible en tableros grandes.
- [ ] **10.14** Comprobar que el texto y los marcadores no se solapan.
- [ ] **10.15** Revisar un caso de cada nivel con la misma representación.
- [ ] Actualizar `PLAN.md` (marcar bloque 10) y `CONTEXTO.md` con el resultado y las comprobaciones ejecutadas.
- [ ] Crear rama `feature/068_murdoku_arte_render`, commits atómicos, y seguir el flujo de aprobación/merge del repositorio.

## Riesgos, dependencias y preguntas

- Si el catálogo de contenido original (temas, nombres, personajes) no está cerrado en la propuesta 058, esta propuesta puede avanzar con marcadores provisionales, pero debe documentarlos como no definitivos para no confundirlos con arte final.
- Tableros grandes (14×14–16×16) pueden requerir más trabajo de escalado/zoom que los pequeños; validar con al menos un tamaño grande antes de cerrar 10.11–10.13.
- Ningún asset puede depender de examinar directamente el sitio de referencia mientras se dibuja: usarlo solo como referencia de dinámica general, según los límites ya fijados en la propuesta 043.
