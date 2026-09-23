# Propuesta 037 — Modo daltónico / alto contraste

**Estado:** Aprobada  
**Fecha:** 2026-09-23  
**Responsable:** Usuario y agente Antigravity

## Objetivo

Añadir un modo alternativo donde cada color de líquido lleva un patrón CSS superpuesto (líneas, puntos, diagonal…) para que el juego sea jugable sin necesidad de distinguir colores.

## Alcance

- Incluye:
  - Interruptor accesible en la cabecera del tablero (o en la zona de configuración).
  - Clase `.colorblind` en `<body>` cuando el modo está activo.
  - Hasta 10 patrones CSS diferentes (uno por color máximo del juego) implementados con `repeating-linear-gradient` u otros gradientes CSS. Sin imágenes externas.
  - El color de fondo base sigue presente; el patrón se superpone como segunda capa de `background`.
  - Preferencia guardada en `localStorage` con clave `botellas-colorblind`.
  - Al cargar, se aplica la preferencia guardada.
- No incluye:
  - Cambios en los colores base.
  - Etiquetas de texto dentro de las capas de líquido.

## Requisitos y decisiones

1. Independiente de las demás propuestas.
2. Los patrones se asignan mediante el índice del color en el array `COLORS` (`data-color-index` ya existe en `.liquid`). Comprobar si ya se establece ese atributo; si no, añadirlo en `renderGame`.
3. El interruptor usa el mismo estilo que los demás controles (`icon-button` o `check`).

## Criterios de aceptación

- [ ] El interruptor de modo daltónico es visible y accesible.
- [ ] En modo activo, cada color de líquido muestra un patrón visualmente distinto.
- [ ] Al recargar la página, se recupera la preferencia guardada.
- [ ] El modo no afecta a la lógica del juego.
- [ ] Los patrones son distinguibles entre sí en escala de grises.

## Tareas

- [ ] T19.1 Definir los 10 patrones CSS con `repeating-linear-gradient` (diagonal, horizontal, vertical, cuadrícula, puntos…).
- [ ] T19.2 Verificar que `renderGame` establece `data-color-index` en cada `.liquid`; añadirlo si no existe.
- [ ] T19.3 Añadir reglas CSS `.colorblind .liquid[data-color-index="N"]` con el patrón y opacidad de overlay.
- [ ] T19.4 Añadir interruptor en la UI (icono de ojo o similar).
- [ ] T19.5 Guardar y recuperar preferencia en `localStorage` con clave `botellas-colorblind`.
- [ ] T19.6 Crear rama `feature/037_modo_daltonico`, commits atómicos, merge en `main` y push.
