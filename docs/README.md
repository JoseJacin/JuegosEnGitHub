# Documentación de producto y SDD

Este directorio reúne las propuestas de cambio. Los documentos existentes en la raíz y en cada juego siguen siendo las fuentes de verdad del proyecto.

## Documentos principales

- [`../AGENTS.md`](../AGENTS.md): instrucciones para agentes y flujo de especificación.
- [`../COMANDOS.md`](../COMANDOS.md): comandos locales, Git y publicación.
- [`../PLAN.md`](../PLAN.md): fases, tareas, dependencias y estado general.
- [`../CONTEXTO.md`](../CONTEXTO.md): estado breve para retomar el trabajo.
- [`../juegos/botellas-y-liquidos/README.md`](../juegos/botellas-y-liquidos/README.md): especificación aprobada del primer juego.

## Propuestas

Cada funcionalidad nueva o cambio relevante debe comenzar como propuesta basada en [`plantillas/propuesta.md`](plantillas/propuesta.md). Las propuestas específicas de un juego se guardan en `juegos/<id>/propuestas/`; las que afectan al sitio o a varios juegos permanecen en `docs/propuestas/`. Una vez aprobada, la propuesta guía su implementación. Si pasa a ser una especificación mantenida, enlázala desde aquí y señala cuál es la fuente de verdad.

### Propuestas transversales

- [`propuestas/039_propuestas_por_juego.md`](propuestas/039_propuestas_por_juego.md): organizar las propuestas por juego o como cambios transversales.

### Botellas y líquidos

El índice y las propuestas de este juego están en [`../juegos/botellas-y-liquidos/propuestas/`](../juegos/botellas-y-liquidos/propuestas/README.md).

Implementadas recientemente: [038 — separar HTML, estilos y lógica](../juegos/botellas-y-liquidos/propuestas/038_refactor_botellas_archivos.md), [030 — zonas seguras en iOS](../juegos/botellas-y-liquidos/propuestas/030_respetar_safe_area_ios.md) y [031 — ajustes visuales y limpieza](../juegos/botellas-y-liquidos/propuestas/031_ajustes_visuales_y_limpieza_propuestas.md).

Aprobadas pendientes: [032 — contador de movimientos](../juegos/botellas-y-liquidos/propuestas/032_contador_movimientos.md), [033 — récord local](../juegos/botellas-y-liquidos/propuestas/033_record_local.md), [034 — pista](../juegos/botellas-y-liquidos/propuestas/034_pista_hint.md), [035 — compartir resultado](../juegos/botellas-y-liquidos/propuestas/035_compartir_resultado.md), [036 — animación de vertido](../juegos/botellas-y-liquidos/propuestas/036_animacion_vertido.md) y [037 — modo daltónico](../juegos/botellas-y-liquidos/propuestas/037_modo_daltonico.md).
