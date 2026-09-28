# Contexto de Murdoku

## Estado actual

- Propuesta de alcance [043](propuestas/043_murdoku_generacion_visual.md) aprobada e integrada en `main`.
- Especificación detallada [`README.md`](README.md) en borrador para revisión; aún contiene decisiones abiertas en §13.
- Plan por tareas [`PLAN.md`](PLAN.md) desglosado en 13 bloques y subtareas cortas numeradas, con dependencias y criterios de cierre; no hay implementación ni assets.
- Guía técnica del generador [`GUIA_MOTOR_GENERACION.md`](GUIA_MOTOR_GENERACION.md) en revisión; detalla contratos, algoritmo, semillas, mapa, objetos, testigo, pistas, unicidad, dificultad, fallos y criterios para implementación por LLM local.
- Se incorporó el análisis de las capturas de referencia en `README.md` §§3.3 y 7.4, `GUIA_MOTOR_GENERACION.md` §§9.5 y 11.3 y `PLAN.md` tareas 0.15, 1.15–1.16, 5.25, 7.18–7.24 y bloque 12. Incluye ámbitos PERSON/GLOBAL/SCENARIO, taxonomía de operadores, perfiles cualitativos de dificultad y límites de la evidencia.
- El usuario confirma que todas las familias observadas deben formar parte del repertorio objetivo; cada partida usa un subconjunto elegido de forma aleatoria, no todas las familias a la vez. El sorteo es determinista con la semilla y versiones, condicionado a la compatibilidad del escenario, y debe respetar unicidad, dificultad y mínimo.
- Propuesta inicial de mínimo total: `ceil(3 × P / 2)` átomos lógicos visibles, incluyendo la pista de víctima y contando hojas del AST; además, al menos un átomo dirigido a cada sospechoso. El usuario pidió que el mínimo sea escalable y delegó proponerlo; falta que revise/apruebe o ajuste la fórmula y su calibración. No es una cifra extraída del referente.
- La muestra aportada abarca tableros 5×5–16×16 y enseña pistas de posición, región, vecindad, relaciones, negación, composición, conteo y reglas de escenario. Las capturas no muestran etiquetas de nivel vinculables a cada caso ni baremos numéricos; no permiten deducir umbrales oficiales. La dificultad propia queda sujeta a solver pedagógico y calibración.
- No se han iniciado pruebas o perfilado de código.

## Decisiones recogidas

- Cada partida nueva genera caso y tablero visual nuevos a partir de semilla; reiniciar conserva el mismo caso.
- Tamaño de cuadrícula `N` y cantidad de personas `P` son controles separados; límites y regla de personas por fila/columna están pendientes de aprobación explícita.
- El nivel depende del proceso de deducción y no del tamaño por sí solo. Catálogo consultado el 2026-09-27 mostró 9×9 tanto fácil como medio; dificultad se define con solver explicable y se calibra, sin atribuir baremos publicados.
- El inventario de capturas es evidencia descriptiva, no una lista MVP: alternativas, cardinalidad avanzada y reglas de escenario requieren decisión explícita antes del código. Una pista declara además su ámbito (`PERSON`, `GLOBAL` o `SCENARIO`), independiente del tipo lógico.
- El repertorio final incluirá todas las familias de `README.md` §3.3, activadas por fases. En una partida solo se sortean operadores ya implementados y compatibles con su tema/modelo. La repetición exacta requiere `(seed, generatorVersion, rulesVersion, config)`; compartir esa tupla reconstruye también el subconjunto de pistas.
- Tooltips de personas y casillas, preferencias básicas/avanzadas, notas, X, deshacer, pista y enviar están documentados en el borrador.
- Las palabras destacadas en las pistas tienen destinos semánticos: hover/foco muestra un resaltado temporal y selección lo fija; solo representa entidades visibles y nunca consulta la solución oculta. Detallado en `README.md` §8.3, `GUIA_MOTOR_GENERACION.md` §9.4 y tareas 9.25–9.31.
- Al recorrer/focalizar una celda, el borde de su estancia se resalta en azul y la celda indica ocupabilidad con blanco/rojo; teclado y táctil reciben el mismo feedback. Detallado en `README.md` §8.2–8.3, `GUIA_MOTOR_GENERACION.md` §7.4 y tareas 9.32–9.37.
- Arte, mapas, textos, personajes y pistas de nuestra versión serán originales.

## Siguiente paso

Revisar `README.md` §§3.3, 4.3–4.4 y 13, `PLAN.md` tareas 0.15–0.16 y bloque 12, y `GUIA_MOTOR_GENERACION.md` §§5, 9.2–9.3 y 18. Aprobar o ajustar el suelo propuesto y su unidad; resolver las decisiones funcionales (semántica de alternativa/conteo) y técnicas restantes. No implementar el motor hasta aprobar reglas y arquitectura y reflejar la aprobación en este contexto y el plan.

## Git

- La especificación, el plan y el contexto se integraron desde `feature/044_especificacion_funcional_murdoku` en `main` con merge `0137a07`.
- Propuesta 043 integrada previamente mediante merge `18db52d`.
- La rama 044 está publicada y cerrada por integración. Este bloque añade solo documentación; no incluye código de juego.
- La rama `feature/045_guia_motor_generacion_murdoku` se integró en `main` mediante merge `a1c078d`.
- La rama `feature/047_resaltado_semiotico_pistas` se integró en `main` mediante merge `8cb0ba4`.
- La rama `feature/048_resaltado_habitacion_y_ocupabilidad` se integró en `main` mediante merge `9dbd102`.
- Rama actual: `feature/050_repertorio_total_reglas`.
- La guía técnica todavía no está aprobada y no se ha implementado el motor.
