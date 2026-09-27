# Documentación de producto y SDD

Este directorio reúne las propuestas de cambio transversales y los índices. Las fuentes de verdad generales viven en la raíz; las de cada juego, dentro de su carpeta.

## Documentos principales

- [`../AGENTS.md`](../AGENTS.md): instrucciones para agentes y flujo de especificación.
- [`../COMANDOS.md`](../COMANDOS.md): comandos locales, Git y publicación.
- [`../PLAN.md`](../PLAN.md): decisiones y prioridades generales del sitio.
- [`../CONTEXTO.md`](../CONTEXTO.md): continuidad general del sitio.
- [`../juegos/README.md`](../juegos/README.md): convención de estructura de juegos.
- [Botellas y líquidos](../juegos/botellas-y-liquidos/README.md): reglas aprobadas; [plan](../juegos/botellas-y-liquidos/PLAN.md) y [contexto](../juegos/botellas-y-liquidos/CONTEXTO.md) propios.
- [Murdoku](../juegos/murdoku/README.md): reglas en borrador; [guía técnica propuesta del generador](../juegos/murdoku/GUIA_MOTOR_GENERACION.md), [plan](../juegos/murdoku/PLAN.md), [contexto](../juegos/murdoku/CONTEXTO.md) y [propuestas](../juegos/murdoku/propuestas/README.md) propios.

## Propuestas

Cada funcionalidad nueva o cambio relevante debe comenzar como propuesta basada en [`plantillas/propuesta.md`](plantillas/propuesta.md). Las propuestas específicas de un juego se guardan en `juegos/<id>/propuestas/`; las que afectan al sitio o a varios juegos permanecen en `docs/propuestas/` y se registran en su [índice](propuestas/README.md). Una vez aprobada, la propuesta guía su implementación. Si pasa a ser una especificación mantenida, enlázala desde aquí y señala cuál es la fuente de verdad.

### Propuestas transversales

Las propuestas transversales 039 (organización por juego) y 042 (planes y contextos por juego) están implementadas y se retiraron del árbol de trabajo. Su contenido sigue disponible en el historial de Git; sus resultados vigentes se describen en `AGENTS.md`, `PLAN.md` y los índices de cada juego.

### Botellas y líquidos

El índice y las propuestas de este juego están en [`../juegos/botellas-y-liquidos/propuestas/`](../juegos/botellas-y-liquidos/propuestas/README.md).

Las propuestas 030, 031, 038 y 041 están implementadas y se retiraron del árbol de trabajo. Sus archivos siguen disponibles en el historial de Git; los resultados vigentes están reflejados en el plan, el contexto y la especificación de Botellas y líquidos.

Aprobadas pendientes: [032 — contador de movimientos](../juegos/botellas-y-liquidos/propuestas/032_contador_movimientos.md), [033 — récord local](../juegos/botellas-y-liquidos/propuestas/033_record_local.md), [034 — pista](../juegos/botellas-y-liquidos/propuestas/034_pista_hint.md), [035 — compartir resultado](../juegos/botellas-y-liquidos/propuestas/035_compartir_resultado.md), [036 — animación de vertido](../juegos/botellas-y-liquidos/propuestas/036_animacion_vertido.md) y [037 — modo daltónico](../juegos/botellas-y-liquidos/propuestas/037_modo_daltonico.md).
