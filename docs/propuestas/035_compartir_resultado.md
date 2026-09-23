# Propuesta 035 — Compartir resultado

**Estado:** Aprobada  
**Fecha:** 2026-09-23  
**Responsable:** Usuario y agente Antigravity

## Objetivo

Permitir copiar al portapapeles un resumen del resultado al ganar, con emojis de los colores completados y el número de movimientos.

## Alcance

- Incluye:
  - Botón «Copiar resultado» en el diálogo de victoria.
  - Texto copiado: emojis de colores de las botellas completadas + movimientos + URL del juego.
    Ejemplo: `🟢🟡🔵🔴 en 18 movimientos — josejacin.github.io/JuegosEnGitHub/juegos/botellas-y-liquidos/`
  - Copia con `navigator.clipboard.writeText`; si no disponible, muestra el texto en un `<textarea>` seleccionado.
  - El botón muestra «¡Copiado!» durante 2 s tras copiar.
- No incluye:
  - URL con semilla (descartada por complejidad; puede revisarse en propuesta futura).
  - Compartir a redes sociales ni integración con Web Share API.

## Requisitos y decisiones

1. Depende de la propuesta 032 (`moveCount` debe estar disponible).
2. El mapeo color CSS → emoji se define con un objeto `COLOR_EMOJIS` paralelo a `COLOR_NAMES`.
3. La URL incluida en el texto es la URL canónica fija del juego (no contiene semilla).

## Criterios de aceptación

- [ ] El botón «Copiar resultado» aparece en el diálogo de victoria.
- [ ] Al pulsarlo, se copia el texto al portapapeles.
- [ ] El botón muestra «¡Copiado!» durante 2 s y luego vuelve a su texto original.
- [ ] Si el portapapeles no está disponible, se muestra el texto en un `<textarea>` para copiar manualmente.
- [ ] Los emojis corresponden a los colores de las botellas completadas en la partida.

## Tareas

- [ ] T17.1 Definir `COLOR_EMOJIS` paralelo a `COLORS`/`COLOR_NAMES`.
- [ ] T17.2 Implementar `buildShareText(completedBottles, moveCount)`.
- [ ] T17.3 Añadir botón «Copiar resultado» en `#victoryDialog`.
- [ ] T17.4 Implementar la lógica de copia con fallback a `<textarea>`.
- [ ] T17.5 Animar el botón con texto «¡Copiado!» durante 2 s.
- [ ] T17.6 Crear rama `feature/035_compartir_resultado`, commits atómicos, merge en `main` y push.
