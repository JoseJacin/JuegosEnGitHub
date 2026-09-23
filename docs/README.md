# Documentación de producto y SDD

Este directorio reúne las propuestas de cambio. Los documentos existentes en la raíz y en cada juego siguen siendo las fuentes de verdad del proyecto.

## Documentos principales

- [`../AGENTS.md`](../AGENTS.md): instrucciones para agentes y flujo de especificación.
- [`../COMANDOS.md`](../COMANDOS.md): comandos locales, Git y publicación.
- [`../PLAN.md`](../PLAN.md): fases, tareas, dependencias y estado general.
- [`../CONTEXTO.md`](../CONTEXTO.md): estado breve para retomar el trabajo.
- [`../juegos/botellas-y-liquidos/README.md`](../juegos/botellas-y-liquidos/README.md): especificación aprobada del primer juego.

## Propuestas

Cada funcionalidad nueva o cambio relevante debe comenzar como propuesta basada en [`plantillas/propuesta.md`](plantillas/propuesta.md). Una vez aprobada, su alcance y criterios guían la implementación. Si una propuesta pasa a ser una especificación mantenida, enlázala desde aquí y señala claramente cuál es la fuente de verdad.

- [`propuestas/008_entrada_y_configuracion.md`](propuestas/008_entrada_y_configuracion.md): entrada y configuración.
- [`propuestas/009_generador_resoluble.md`](propuestas/009_generador_resoluble.md): generador inicial resoluble.
- [`propuestas/011_botella_vacia_reserva.md`](propuestas/011_botella_vacia_reserva.md): propuesta descartada de botella vacía inicial.
- [`propuestas/012_vacias_intermedias_y_victoria.md`](propuestas/012_vacias_intermedias_y_victoria.md): aclaración del estado inicial y las botellas vacías durante la partida.
- [`propuestas/014_dos_colores_por_botella.md`](propuestas/014_dos_colores_por_botella.md): mezcla mínima de dos colores distintos por botella inicial.
- [`propuestas/015_validacion_determinista.md`](propuestas/015_validacion_determinista.md): validación estable de las configuraciones de partida.
- [`propuestas/016_reintentos_generacion.md`](propuestas/016_reintentos_generacion.md): reintentos al buscar una partida resoluble.
- [`propuestas/020_diagnostico_botellas.md`](propuestas/020_diagnostico_botellas.md): diagnóstico local copiable de capas y huecos visibles.
- [`propuestas/021_corregir_conteo_unidades_iniciales.md`](propuestas/021_corregir_conteo_unidades_iniciales.md): corregir unidades excedentes que producían capas sin color.
- [`propuestas/022_trasvases_interactivos.md`](propuestas/022_trasvases_interactivos.md): seleccionar botellas y trasvasar capas según las reglas aprobadas.
- [`propuestas/023_historial_reinicio_victoria.md`](propuestas/023_historial_reinicio_victoria.md): deshacer, reiniciar y completar una partida.
- [`propuestas/024_estilo_visual_accesibilidad.md`](propuestas/024_estilo_visual_accesibilidad.md): estilo visual, adaptación y accesibilidad.
