# Propuestas de Murdoku

Las propuestas de este directorio describen el alcance de Murdoku. Se crean a partir de la plantilla común [`../../../docs/plantillas/propuesta.md`](../../../docs/plantillas/propuesta.md). Las reglas definitivas, cuando se aprueben, vivirán en `../README.md`.

## Aprobadas

- [043 — Generación automática de casos y tableros visuales](043_murdoku_generacion_visual.md)

## Borrador — pendientes de aprobación

Estas propuestas convierten en entregas revisables los bloques ya definidos en [`../PLAN.md`](../PLAN.md). Ninguna puede fusionarse en `main` antes que la 058; el resto sigue además el orden de dependencias del plan.

- [058 — Cerrar las decisiones que bloquean la implementación](058_murdoku_cierre_decisiones_especificacion.md) — bloquea a todas las demás.
- [059 — Modelo de datos y validación de configuración](059_murdoku_modelo_datos_configuracion.md) — depende de 058.
- [060 — Semillas y reproducibilidad](060_murdoku_semillas_reproducibilidad.md) — depende de 058, 059.
- [061 — Cuadrícula y recintos variables](061_murdoku_cuadricula_recintos.md) — depende de 059, 060.
- [062 — Objetos y disponibilidad de celdas](062_murdoku_objetos_ocupabilidad.md) — depende de 061.
- [063 — Solucionador exacto](063_murdoku_solucionador_exacto.md) — depende de 059, 062.
- [064 — Testigo, personas y selección de pistas](064_murdoku_testigo_personas_pistas.md) — depende de 060, 062, 063.
- [065 — Cálculo y calibración de dificultad](065_murdoku_dificultad_calibracion.md) — depende de 063, 064.
- [066 — Interfaz y acciones de juego](066_murdoku_interfaz_acciones.md) — depende de 058; integración por etapas con 061–065.
- [067 — Tooltips, preferencias y accesibilidad](067_murdoku_tooltips_preferencias_accesibilidad.md) — depende de 066.
- [068 — Arte original y adaptación del tablero](068_murdoku_arte_render.md) — depende de 058; puede avanzar en paralelo con 059.
- [069 — Integración, verificación y publicación](069_murdoku_integracion_publicacion.md) — depende de 059–068 en el alcance MVP.
- [070 — Ampliar el repertorio de pistas después del MVP](070_murdoku_repertorio_pistas_avanzado.md) — depende de 058 (0.15/0.16), 059, 063, 064, 065; posterior a la publicación del MVP.
