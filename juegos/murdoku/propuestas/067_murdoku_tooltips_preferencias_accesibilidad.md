# Propuesta 067 — Murdoku: tooltips, preferencias y accesibilidad (bloque 9 del plan)

**Estado:** Borrador
**Fecha:** 2026-09-29
**Responsable:**

## Problema y objetivo

Sobre la interfaz base (propuesta 066), esta propuesta añade la capa de ayuda contextual: tooltips de persona/celda, resaltado semántico de términos destacados en las pistas, el contorno azul de estancia y el blanco/rojo de ocupabilidad al recorrer el tablero, y el panel de preferencias básicas/avanzadas con persistencia local.

## Alcance

- Incluye: tooltips accesibles por ratón/teclado/táctil, tokens semánticos interactivos de las pistas, feedback de hover/foco de celda y estancia, preferencias básicas y avanzadas con `localStorage` versionado, y accesibilidad general (foco visible, anuncios de estado, no depender solo del color), según `PLAN.md` bloque 9.
- No incluye:
  - Cambiar la lógica de colocación/deshacer de la propuesta 066: aquí solo se añade información y preferencias, no nuevas reglas de juego.
  - Los sliders visuales pospuestos (tamaño de etiquetas, opacidad de textura/sombras, grosor de límites) que README §9.2 deja explícitamente diferidos.

## Requisitos y decisiones

1. **Bloqueo previo.** Depende de 8.7 (tablero renderizado) y de que la propuesta 058 haya aprobado el subconjunto de preferencias de la primera versión (README §§8–9).
2. **Resolución de tokens.** Seguir `GUIA_MOTOR_GENERACION.md` §9.4: `OBJECT_TYPE` resuelve todas las instancias visibles de ese tipo, `OBJECT_INSTANCE` solo su huella, `ROOM`/`ROW`/`COLUMN` sus celdas, y `PERSON` únicamente la colocación actual del jugador en `PlayerState` — nunca la solución ni un dominio candidato.
3. **Feedback de celda/estancia.** Implementar el contorno azul y el blanco/rojo de ocupabilidad según `GUIA_MOTOR_GENERACION.md` §7.4: el contorno solo dibuja los segmentos exteriores de la estancia, la clasificación de ocupabilidad es estática y no cambia porque ya haya una persona colocada.
4. **Composición de capas.** Contorno de estancia, ocupabilidad y resaltado semántico de pistas deben poder coexistir sin ocultarse (README §8.3, `GUIA_MOTOR_GENERACION.md` §7.4 último punto); ninguna de las tres puede depender solo del color.
5. **Preferencias resilientes.** Guardar preferencias en `localStorage` con clave versionada; un valor corrupto o inválido vuelve a los valores por defecto sin romper la partida en curso (README §9.3).

## Criterios de aceptación

- [ ] Los tooltips de persona y celda se abren con ratón, foco de teclado y una alternativa táctil, y nunca revelan la solución antes de tiempo.
- [ ] Cada término destacado de una pista resalta exactamente las celdas de su slot semántico (tipo/instancia de objeto, sala, fila, columna o colocación actual de una persona), con hover temporal y fijación por clic/toque/Enter/Escape.
- [ ] Al recorrer una celda se dibuja el contorno azul de su estancia y se indica blanco/rojo de ocupabilidad, reproducible con teclado y táctil.
- [ ] Contorno, ocupabilidad y resaltado semántico se pueden distinguir simultáneamente sin que una capa oculte a otra ni dependan solo del color.
- [ ] Una preferencia corrupta o ausente en `localStorage` recupera los valores por defecto sin impedir jugar.

## Tareas

- [ ] **9.1** Mostrar tooltip de persona con nombre, pista y estado.
- [ ] **9.2** Mostrar tooltip de celda con coordenadas, sala, terreno, objeto y ocupabilidad.
- [ ] **9.3** Abrir tooltip al pasar el ratón sobre persona.
- [ ] **9.4** Abrir tooltip al pasar el ratón sobre celda.
- [ ] **9.5** Permitir abrir el tooltip de persona con foco de teclado.
- [ ] **9.6** Permitir abrir información de celda con foco de teclado.
- [ ] **9.7** Proveer alternativa táctil a ambos tooltips.
- [ ] **9.8** Renderizar expresiones destacadas de las pistas como tokens semánticos interactivos.
- [ ] **9.9** Añadir tema oscuro/claro.
- [ ] **9.10** Añadir sonido y volumen.
- [ ] **9.11** Añadir animaciones y respetar movimiento reducido.
- [ ] **9.12** Añadir temporizador opcional.
- [ ] **9.13** Añadir modo visual de persona por letra/retrato.
- [ ] **9.14** Añadir Auto-X con seguimiento de marcas automáticas.
- [ ] **9.15** Añadir preferencia para X en celdas no ocupables.
- [ ] **9.16** Añadir etiquetas persistentes de fila/columna.
- [ ] **9.17** Añadir resaltado de selección y de sala.
- [ ] **9.18** Añadir sombreado opcional de celdas no ocupables.
- [ ] **9.19** Añadir marcas de triángulo, círculo, cuadrado y estrella.
- [ ] **9.20** Guardar/cargar cada preferencia en `localStorage` con versión.
- [ ] **9.21** Recuperarse de preferencias corruptas usando valores por defecto.
- [ ] **9.22** Añadir nombres accesibles y anuncios de cambio de estado.
- [ ] **9.23** Comprobar que la información no depende solo del color.
- [ ] **9.24** Añadir controles de sonido, foco y toque con etiquetas legibles.
- [ ] **9.25** Asignar a cada expresión destacada un destino tipado desde el AST de la pista.
- [ ] **9.26** Resolver `OBJECT_TYPE` a todas las celdas de sus instancias y `OBJECT_INSTANCE` a su huella.
- [ ] **9.27** Resolver `ROOM`, `ROW` y `COLUMN` a sus celdas visibles correspondientes.
- [ ] **9.28** Resolver `PERSON` desde la colocación actual del jugador; no consultar solución ni candidatos.
- [ ] **9.29** Mostrar y retirar el resaltado temporal con hover de ratón y foco de teclado.
- [ ] **9.30** Fijar/retirar el resaltado mediante clic, toque, Enter/Espacio y Escape.
- [ ] **9.31** Comprobar visualmente las transiciones y verificar que no cambian estado de juego ni revelan la solución.
- [ ] **9.32** Dibujar el contorno azul de `roomId` al pasar el puntero por una celda.
- [ ] **9.33** Construir el contorno siguiendo los bordes exteriores de estancias irregulares.
- [ ] **9.34** Resaltar en blanco la celda activa ocupable y en rojo la no ocupable.
- [ ] **9.35** Reutilizar el feedback al enfocar con teclado o activar una celda táctil.
- [ ] **9.36** Mantener la clasificación de ocupabilidad aunque ya haya una persona colocada.
- [ ] **9.37** Componer contorno, ocupabilidad y pista resaltada; comprobar que no se tapan y que el estado no depende solo del color.
- [ ] Actualizar `PLAN.md` (marcar bloque 9) y `CONTEXTO.md` con el resultado y las comprobaciones ejecutadas.
- [ ] Crear rama `feature/067_murdoku_tooltips_preferencias_accesibilidad`, commits atómicos, y seguir el flujo de aprobación/merge del repositorio.

## Riesgos, dependencias y preguntas

- Esta propuesta es grande (37 subtareas); si al ejecutarla una subtarea concreta resulta demasiado amplia, dividirla en `9.X.Y` siguiendo el criterio de atomicidad de `PLAN.md` antes de implementarla, en vez de resolverla de un tirón.
- El resaltado semántico depende de que `PlayerState` (propuesta 059/066) exponga la colocación actual de forma consultable sin acceder a `Solution`; confirmar esa separación antes de empezar 9.25–9.31.
- Los sliders visuales pospuestos de README §9.2 no forman parte de esta propuesta; si el usuario los pide antes de tiempo, señalar que requieren una propuesta nueva.
