# Contexto de Murdoku

## Estado actual

- Propuesta de alcance [043](propuestas/043_murdoku_generacion_visual.md) aprobada e integrada en `main`.
- Especificación detallada [`README.md`](README.md) en borrador para revisión; aún contiene decisiones abiertas en §13.
- Plan por tareas [`PLAN.md`](PLAN.md) desglosado en 12 bloques y subtareas cortas numeradas (0.1, 0.2, …, 11.14), con dependencias y criterios de cierre; no hay implementación ni assets.
- Guía técnica del generador [`GUIA_MOTOR_GENERACION.md`](GUIA_MOTOR_GENERACION.md) en revisión; detalla contratos, algoritmo, semillas, mapa, objetos, testigo, pistas, unicidad, dificultad, fallos y criterios para implementación por LLM local.
- No se han iniciado pruebas o perfilado de código.

## Decisiones recogidas

- Cada partida nueva genera caso y tablero visual nuevos a partir de semilla; reiniciar conserva el mismo caso.
- Tamaño de cuadrícula `N` y cantidad de personas `P` son controles separados; límites y regla de personas por fila/columna están pendientes de aprobación explícita.
- El nivel depende del proceso de deducción y no del tamaño por sí solo. Catálogo consultado el 2026-09-27 mostró 9×9 tanto fácil como medio; dificultad se define con solver explicable y se calibra, sin atribuir baremos publicados.
- Tooltips de personas y casillas, preferencias básicas/avanzadas, notas, X, deshacer, pista y enviar están documentados en el borrador.
- Las palabras destacadas en las pistas tienen destinos semánticos: hover/foco muestra un resaltado temporal y selección lo fija; solo representa entidades visibles y nunca consulta la solución oculta. Detallado en `README.md` §8.3, `GUIA_MOTOR_GENERACION.md` §9.4 y tareas 9.25–9.31.
- Al recorrer/focalizar una celda, el borde de su estancia se resalta en azul y la celda indica ocupabilidad con blanco/rojo; teclado y táctil reciben el mismo feedback. Detallado en `README.md` §8.2–8.3, `GUIA_MOTOR_GENERACION.md` §7.4 y tareas 9.32–9.37.
- Arte, mapas, textos, personajes y pistas de nuestra versión serán originales.

## Siguiente paso

Revisar `README.md` §13 y `GUIA_MOTOR_GENERACION.md` §18; resolver decisiones funcionales y técnicas abiertas. No implementar el motor hasta aprobar reglas y arquitectura y reflejar la aprobación en este contexto y el plan.

## Git

- La especificación, el plan y el contexto se integraron desde `feature/044_especificacion_funcional_murdoku` en `main` con merge `0137a07`.
- Propuesta 043 integrada previamente mediante merge `18db52d`.
- La rama 044 está publicada y cerrada por integración. Este bloque añade solo documentación; no incluye código de juego.
- La rama `feature/045_guia_motor_generacion_murdoku` se integró en `main` mediante merge `a1c078d`.
- La rama `feature/047_resaltado_semiotico_pistas` se integró en `main` mediante merge `8cb0ba4`.
- La rama `feature/048_resaltado_habitacion_y_ocupabilidad` se integró en `main` mediante merge `9dbd102`.
- Rama actual: `main`.
- La guía técnica todavía no está aprobada y no se ha implementado el motor.
