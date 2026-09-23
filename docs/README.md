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

Las propuestas completadas o descartadas anteriores a la 030 se han archivado en el historial de Git (rama `main`, commits anteriores a `feature/031_ajustes_visuales_y_limpieza_propuestas`).

### Propuestas vigentes

- [`propuestas/030_respetar_safe_area_ios.md`](propuestas/030_respetar_safe_area_ios.md): respetar zonas seguras (Safe Area) en iOS y Dynamic Island.
- [`propuestas/031_ajustes_visuales_y_limpieza_propuestas.md`](propuestas/031_ajustes_visuales_y_limpieza_propuestas.md): aviso compacto de botella cerrada, selección sin borde verde y limpieza de propuestas.
- [`propuestas/032_contador_movimientos.md`](propuestas/032_contador_movimientos.md): contador de movimientos en el tablero.
- [`propuestas/033_record_local.md`](propuestas/033_record_local.md): récord local de mínimo de movimientos en `localStorage`.
- [`propuestas/034_pista_hint.md`](propuestas/034_pista_hint.md): botón de pista que resalta un trasvase posible.
- [`propuestas/035_compartir_resultado.md`](propuestas/035_compartir_resultado.md): copiar resultado al portapapeles con emojis al ganar.
- [`propuestas/036_animacion_vertido.md`](propuestas/036_animacion_vertido.md): animación de vertido con transición CSS.
- [`propuestas/037_modo_daltonico.md`](propuestas/037_modo_daltonico.md): modo daltónico con patrones CSS superpuestos en los líquidos.
