# Contexto de Murdoku

## Estado actual

- Propuesta de alcance [043](propuestas/043_murdoku_generacion_visual.md) aprobada e integrada en `main`.
- Especificación detallada [`README.md`](README.md) en borrador para revisión; aún contiene decisiones abiertas en §13.
- Plan por tareas [`PLAN.md`](PLAN.md); no hay implementación ni assets.
- No se han iniciado pruebas o perfilado de código.

## Decisiones recogidas

- Cada partida nueva genera caso y tablero visual nuevos a partir de semilla; reiniciar conserva el mismo caso.
- Tamaño de cuadrícula `N` y cantidad de personas `P` son controles separados; límites y regla de personas por fila/columna están pendientes de aprobación explícita.
- El nivel depende del proceso de deducción y no del tamaño por sí solo. Catálogo consultado el 2026-09-27 mostró 9×9 tanto fácil como medio; dificultad se define con solver explicable y se calibra, sin atribuir baremos publicados.
- Tooltips de personas y casillas, preferencias básicas/avanzadas, notas, X, deshacer, pista y enviar están documentados en el borrador.
- Arte, mapas, textos, personajes y pistas de nuestra versión serán originales.

## Siguiente paso

Revisar `README.md` §13 y resolver decisiones abiertas. No implementar hasta aprobar el documento y reflejar la aprobación en este contexto y el plan.

## Git

- Rama actual: `feature/044_especificacion_funcional_murdoku`, creada desde `main` actualizado tras integrar propuesta 043.
- Último merge en main: propuesta aprobada 043, commit de merge `18db52d`.
- Este bloque añade solo documentación de especificación, plan y continuidad; no incluye código de juego.
