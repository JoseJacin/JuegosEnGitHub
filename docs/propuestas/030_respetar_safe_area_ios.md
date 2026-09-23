# Propuesta: respetar zonas seguras (Safe Area) en iOS y Dynamic Island

**Estado:** Implementada
**Fecha:** 2026-09-23
**Responsable:** Usuario y agente Antigravity

## Problema y objetivo

Al instalar y abrir la aplicación en un iPhone moderno con Dynamic Island o notch (modo *standalone* con `viewport-fit=cover`), la cabecera superior donde se encuentran el título y el botón «← Menú» queda oculta o solapada bajo la Dynamic Island y la barra de estado de iOS, impidiendo pulsar el botón para volver al menú. El objetivo es respetar las zonas seguras del dispositivo (`env(safe-area-inset-top)`, `env(safe-area-inset-bottom)`) para que toda la interfaz sea plenamente visible e interactuable.

## Alcance

- Incluye:
  - Aplicar `env(safe-area-inset-top)`, `env(safe-area-inset-bottom)`, `env(safe-area-inset-left)` y `env(safe-area-inset-right)` en el contenedor principal `main` en `juegos/botellas-y-liquidos/index.html` y en `menu/index.html`.
  - Ajustar el cálculo de altura disponible para que el tablero de partida (incluyendo hasta 6 filas de botellas) y la configuración sigan encajando al 100 % de la pantalla sin scroll vertical tras añadir el espacio de la zona segura.
  - Asegurar que el botón «← Menú» y la cabecera queden totalmente fuera del área física de la Dynamic Island y la barra de estado.
- No incluye:
  - Cambios en las reglas del juego, generador, historial ni lógica de trasvases.

## Requisitos y decisiones

1. **Margen seguro superior:**
   - En móviles, el contenedor principal utiliza `padding-top: max(.4rem, env(safe-area-inset-top))` (o similar), asegurando que la cabecera comience justo por debajo de la Dynamic Island / notch y la barra de estado de iOS.
2. **Margen seguro inferior y lateral:**
   - Se añade espacio para la barra de inicio de gestos de iOS (`env(safe-area-inset-bottom)`) y los laterales (`env(safe-area-inset-left)`, `env(safe-area-inset-right)`).
3. **Cálculo adaptativo del tablero:**
   - La altura adaptativa de las botellas toma en cuenta `env(safe-area-inset-top)` y `env(safe-area-inset-bottom)` para que la configuración máxima (10 columnas x 6 filas) siga cabiendo en pantalla completa sin provocar desbordamiento vertical.
4. **Catálogo / Menú:**
   - El menú principal también respeta las zonas seguras para que su cabecera no se solape con la Dynamic Island.

## Criterios de aceptación

- [x] En iPhone con Dynamic Island / notch, la cabecera del juego y el botón «← Menú» se muestran despejados por debajo de la Dynamic Island y se pueden pulsar normalmente.
- [x] En la configuración máxima (10x6 botellas) en iPhone, el tablero y los controles siguen cabiendo en pantalla sin scroll vertical.
- [x] La cabecera del catálogo (`menu/index.html`) respeta igualmente la zona segura superior.

## Tareas

- [x] Añadir variables y reglas `env(safe-area-inset-*)` en el CSS de `juegos/botellas-y-liquidos/index.html`.
- [x] Ajustar la altura de las botellas y los márgenes verticales en `juegos/botellas-y-liquidos/index.html` para descontar las zonas seguras.
- [x] Añadir soporte de zona segura en `menu/index.html`.
- [x] Probar y verificar que no hay scroll ni solapamiento.
- [x] Actualizar `PLAN.md`, `CONTEXTO.md` y `docs/README.md`.
- [x] Publicar los cambios en `main` y en su rama de funcionalidad.

## Riesgos, dependencias y preguntas

- Ninguno. `env(safe-area-inset-*)` es un estándar CSS ampliamente soportado en Safari iOS y navegadores móviles; en dispositivos sin notch simplemente evalúa a 0 px manteniendo los márgenes mínimos predeterminados.
