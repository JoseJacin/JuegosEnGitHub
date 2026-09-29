# Propuestas de Botellas y líquidos

Las propuestas de este directorio describen cambios específicos del juego. Se crean a partir de la plantilla común [`../../../docs/plantillas/propuesta.md`](../../../docs/plantillas/propuesta.md). Para cambios transversales al sitio o compartidos entre juegos, consulta el [índice común](../../../docs/propuestas/README.md).

Las propuestas completadas 030, 031, 033, 034, 038 y 041 se retiraron del árbol de trabajo. Sus documentos siguen disponibles en el historial de Git; sus resultados están resumidos en [`PLAN.md`](../PLAN.md) y [`CONTEXTO.md`](../CONTEXTO.md).

## Aprobadas e integradas en main

- [032 — Contador de movimientos](032_contador_movimientos.md)

**Estado:** 030, 031 y 032 están implementadas y fusionadas en `main`. Los documentos 030 y 031 están retirados del árbol de trabajo y disponibles en el historial de Git; 032 se conserva aquí como referencia histórica y no forma parte del backlog activo. 033 (récord local) y 034 (pista de movimiento) están implementadas; sus documentos se retiraron del árbol de trabajo. 033 ya está fusionada en `main`; 034 está implementada en `feature/botellas-y-liquidos_034_pista_hint`, pendiente de fusión.

## Aprobadas pendientes

- [035 — Compartir resultado](035_compartir_resultado.md)
  - **Depende de:** T14 completada; puede mostrar el récord de T15 si esa tarea ya está implementada.
- [036 — Animación de vertido](036_animacion_vertido.md)
  - **Depende de:** Ninguna (independiente de otras propuestas).
- [037 — Modo daltónico / alto contraste](037_modo_daltonico.md)
  - **Depende de:** Ninguna (independiente de otras propuestas).

**Proceso de aprobación:** Una propuesta se considera aprobada cuando:
- Tiene un objetivo claro y alcanzable en el contexto actual del juego.
- Define exclusiones explícitas para evitar duplicados con tareas pendientes o futuras.
- Sus dependencias están resueltas o claramente documentadas para priorización en el futuro.
