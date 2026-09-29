# Documentación de producto y SDD

Este directorio reúne las propuestas de cambio transversales y los índices. Las fuentes de verdad generales viven en la raíz; las de cada juego, dentro de su carpeta.

## Documentos principales

- [`../AGENTS.md`](../AGENTS.md): instrucciones para agentes y flujo de especificación.
- [`../COMANDOS.md`](../COMANDOS.md): comandos locales, Git y publicación.
- [`../PLAN.md`](../PLAN.md): decisiones y prioridades generales del sitio.
- [`../CONTEXTO.md`](../CONTEXTO.md): continuidad general del sitio.
- [`../juegos/README.md`](../juegos/README.md): convención de estructura de juegos.
- [Botellas y líquidos](../juegos/botellas-y-liquidos/README.md): reglas aprobadas; [plan](../juegos/botellas-y-liquidos/PLAN.md) y [contexto](../juegos/botellas-y-liquidos/CONTEXTO.md) propios.
- [Murdoku](../juegos/murdoku/README.md): especificación del juego; [guía técnica](../juegos/murdoku/GUIA_MOTOR_GENERACION.md), [plan](../juegos/murdoku/PLAN.md) y [contexto](../juegos/murdoku/CONTEXTO.md) propios.

## Propuestas

Cada funcionalidad nueva o cambio relevante debe comenzar como propuesta basada en [`plantillas/propuesta.md`](plantillas/propuesta.md). Las propuestas específicas de un juego se guardan en `juegos/<id>/propuestas/`; las que afectan al sitio o a varios juegos permanecen en `docs/propuestas/` y se registran en su [índice](propuestas/README.md). Una vez aprobada, la propuesta guía su implementación. Si pasa a ser una especificación mantenida, enlázala desde aquí y señala cuál es la fuente de verdad.

### Propuestas transversales

Las propuestas transversales 039 (organización por juego) y 042 (planes y contextos por juego) están implementadas y se retiraron del árbol de trabajo. Su contenido sigue disponible en el historial de Git; sus resultados vigentes se describen en `AGENTS.md`, `PLAN.md` y los índices de cada juego.

## Propuestas transversales completadas y archivadas

- 039 — organización por juego (estructura de carpetas y documentos).
- 042 — planes y contextos por juego (cada juego define su propio backlog).

Ambas están integradas en `main`; sus archivos se conservaron durante la implementación y su contenido está disponible en el historial de Git. Las propuestas específicas y su estado se documentan exclusivamente en el índice del juego correspondiente.
