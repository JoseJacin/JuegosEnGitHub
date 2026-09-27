# Plan de Murdoku

Este plan contiene tareas, dependencias y estados específicos de Murdoku. Las reglas funcionales propuestas están en [`README.md`](README.md); su borrador aún necesita aprobación. La propuesta de alcance aprobada es [043](propuestas/043_murdoku_generacion_visual.md). El plan general del sitio está en [`../../PLAN.md`](../../PLAN.md).

## Objetivo

Crear un juego web estático de deducción en el que cada partida genera mediante semilla un caso único y un mapa visual nuevo. Se configuran tamaño de cuadrícula y número de personas. La producción del caso debe verificarse mediante solucionador de unicidad y clasificarse según la deducción requerida además del tamaño.

## Estado

- Propuesta 043 aprobada e integrada en `main`.
- Especificación funcional detallada en borrador, pendiente de revisar las decisiones abiertas de `README.md` §13.
- No se ha iniciado implementación.
- No se han elegido ni incorporado recursos gráficos.

## Forma de trabajo

- No implementar hasta que `README.md` sea aprobado y las preguntas bloqueantes estén resueltas.
- Cada tarea de implementación requiere rama `feature/<id>_<descripcion>`, alcance claro, criterios cubiertos y actualización de este plan y [`CONTEXTO.md`](CONTEXTO.md).
- El generador entrega datos de modelo y estado reproducibles; la capa visual no es fuente de reglas.
- Empezar por tamaños pequeños para perfilar y ampliar progresivamente; no anunciar como disponible una configuración que no haya validado unicidad y rendimiento.
- Cambiar la especificación solo mediante acuerdo documentado. Si aparece una contradicción, parar y actualizar primero la especificación.

## Tareas

### M0 — Aprobar especificación funcional

- [x] M0.1 Registrar alcance aprobado y crear documentos propios del juego.
- [ ] M0.2 Revisar `README.md` y resolver todas las decisiones abiertas de §13, especialmente independencia entre `N` y `P`, crimen, preset/rangos, pistas y preferencias.
- [ ] M0.3 Actualizar especificación a estado aprobado y cerrar un glosario/formato de pistas.

**Hecho cuando:** reglas observables, valores configurables, dificultad, catálogo de pistas y ajustes están aprobados, sin decisiones funcionales bloqueantes para el modelo.

### M1 — Modelo, semillas y validador de tablero

- [ ] M1.1 Implementar tipos de datos versionados para tablero, celdas, salas, objetos, personajes, pistas, solución, valoración y estado de jugador conforme a `README.md` §5.
- [ ] M1.2 Implementar PRNG/hash determinista y flujos separados por etapa; reproducir el mismo modelo lógico ante igual versión/semilla/configuración.
- [ ] M1.3 Implementar validación de configuración, topología, sala conexa, referencias, huellas de objetos, ocupabilidad y coordenadas.
- [ ] M1.4 Añadir representación de diagnóstico reproducible para errores de generación.

**Dependencias:** M0.
**Hecho cuando:** el modelo inválido se rechaza con error tipado; la semilla reconstituye el mismo resultado y los datos no dependen del DOM/SVG.

### M2 — Solucionador de restricciones y unicidad

- [ ] M2.1 Crear dominios candidatos de celda por persona e invariantes fila/columna/celda ocupable.
- [ ] M2.2 Implementar predicados de pistas tipados y restricciones de sala, objeto, relación y crimen solo tras aprobar el catálogo.
- [ ] M2.3 Propagar restricciones y completar búsqueda determinista con MRV y desempate estable.
- [ ] M2.4 Contar soluciones hasta dos y clasificar cero/única/múltiple sin bloquear la interfaz.
- [ ] M2.5 Separar búsqueda exacta del solucionador pedagógico que devuelve pasos explicables.

**Dependencias:** M1; aprobación de reglas M0.
**Hecho cuando:** cada regla aprobada tiene predicados verificables; candidatos sin solución o con varias no se aceptan y cada paso pedagógico identifica la regla/pista que lo justifica.

### M3 — Generador de mapa, solución y caso

- [ ] M3.1 Implementar partición de cuadrícula en salas conectadas de formas variables, con tamaño y número acotados.
- [ ] M3.2 Implementar contenido/terreno/objetos originales con huellas, ocupabilidad y restricciones de presentación.
- [ ] M3.3 Generar personajes, solución testigo y relación víctima/asesino compatible con filas, columnas y salas.
- [ ] M3.4 Derivar átomos de pista desde solución usando exclusivamente predicados y plantillas aprobadas.
- [ ] M3.5 Seleccionar/componer pistas hasta obtener exactamente una solución; rechazar candidatos fallidos y limitar reintentos.
- [ ] M3.6 Garantizar distinta semilla en partida nueva y restauración idéntica al reiniciar/compartir.

**Dependencias:** M1 y M2.
**Hecho cuando:** muchas semillas/configuraciones válidas producen tableros coherentes y legibles; cada caso aprobado se puede reproducir y tiene solución conocida y única.

### M4 — Clasificación de dificultad

- [ ] M4.1 Implementar solucionador pedagógico con técnicas `D0_DIRECT`–`D4_CHAIN` acordadas en README.
- [ ] M4.2 Registrar métricas estables: personas, `N`, pistas/átomos, familias de reglas, pasos, profundidad y búsquedas de verificación por separado.
- [ ] M4.3 Crear corpus reproducible de semillas de cada tamaño para calibrar categorías sin usar solo dimensión o número de pistas.
- [ ] M4.4 Revisar niveles con sesiones de juego y ajustar umbrales; documentar versión del clasificador.
- [ ] M4.5 Aplicar nivel solicitado como filtro; comportamiento al agotar intentos respeta configuración y no etiqueta falsamente.

**Dependencias:** M2 y M3.
**Hecho cuando:** misma semilla y versión dan misma categoría; niveles se diferencian por razonamiento observado y tamaño actúa solo como señal adicional.

### M5 — Flujo de partida, controles y pistas

- [ ] M5.1 Crear preparación de caso con selector de dificultad, tamaño `N` y personas `P` independientes, mostrando incompatibilidades/presets.
- [ ] M5.2 Implementar panel de personajes, selección, colocación, movimiento, borrado, X, marcas de nota, deshacer y reinicio.
- [ ] M5.3 Implementar validación de envío, feedback no revelador, victoria, culpable y nueva partida.
- [ ] M5.4 Implementar tooltips de persona/celda; hover, foco de teclado y alternativa táctil.
- [ ] M5.5 Implementar pista incremental que expone razonamiento sin colocar directamente la persona.
- [ ] M5.6 Implementar compartir/repetir mediante seed, config y versión de generador.

**Dependencias:** M0 y formatos aprobados; integración con M3 y M4.
**Hecho cuando:** todas las acciones previstas funcionan por ratón, teclado y toque y no alteran la definición del puzzle.

### M6 — Arte propio, render y ajustes

- [ ] M6.1 Definir e incorporar catálogo gráfico original de temas, salas, terreno, objetos y personas.
- [ ] M6.2 Renderizar modelo visual como cuadrícula legible, límites de sala, objetos con huella, ocupabilidad, personajes y marcas.
- [ ] M6.3 Implementar preferencias aceptadas en `README.md` §9 con valores por defecto, persistencia local versionada y fallback ante datos inválidos.
- [ ] M6.4 Adaptar diseños de escritorio/móvil, scroll del panel, escala del tablero y áreas de toque.
- [ ] M6.5 Verificar accesibilidad de teclado, lector de pantalla, contraste, tooltips y movimiento reducido.

**Dependencias:** M0; render puede avanzar tras M1 y catálogo de arte aprobado.
**Hecho cuando:** tablero y controles son claros, responsivos, accesibles y no confunden decoración con celdas/reglas.

### M7 — Integrar, perfilar y publicar

- [ ] M7.1 Integrar archivos relativos y navegación del catálogo compatibles con GitHub Pages.
- [ ] M7.2 Perfilar semillas/rangos desde pequeño hasta máximo propuesto; revisar bloqueos y tasa de rechazo.
- [ ] M7.3 Verificar criterios funcionales por config, dificultad, accesibilidad, persistencia y versión de enlaces compartidos.
- [ ] M7.4 Corregir defectos, actualizar especificación/contexto, revisar diff y cerrar entrega.

**Dependencias:** M1–M6.
**Hecho cuando:** configuración anunciada genera de forma reproducible, sin bloqueo, únicamente casos válidos y únicos; se puede jugar en local y bajo prefijo GitHub Pages.

## Decisiones y límites

- `N=5..16` y `P=4..N` son valores propuestos, aún no aprobados.
- Niveles de tamaño son presets iniciales sujetos a calibración, no reglas universales.
- Cualquier tipo de pista no descrito/aprobado en README se considera fuera de alcance.
- La solución se genera y valida en cliente para evitar backend; no se promete secreto frente a inspección del navegador.
- Los pendientes aprobados de Botellas y líquidos conservan su prioridad/dependencias según plan general; este plan no los altera.
