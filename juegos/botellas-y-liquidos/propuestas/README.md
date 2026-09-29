# Propuestas de Botellas y líquidos

Las propuestas de este directorio describen cambios específicos del juego. Se crean a partir de la plantilla común [`../../../docs/plantillas/propuesta.md`](../../../docs/plantillas/propuesta.md). Para cambios transversales al sitio o compartidos entre juegos, consulta el [índice común](../../../docs/propuestas/README.md).

Las propuestas completadas 030, 031, 032, 033, 034, 038 y 041 se retiraron del árbol de trabajo. Sus documentos siguen disponibles en el historial de Git; sus resultados están resumidos en [`PLAN.md`](../PLAN.md) y [`CONTEXTO.md`](../CONTEXTO.md).

## Aprobadas pendientes

- [035 — Compartir resultado](035_compartir_resultado.md)
  - **Depende de:** T14 completada; puede mostrar el récord de T15 si esa tarea ya está implementada.
- [036 — Animación de vertido](036_animacion_vertido.md)
  - **Depende de:** Ninguna (independiente de otras propuestas). **Coordinación:** modifica el mismo bloque de `renderGame()` que crea/actualiza `.liquid` que toca la 037; si ambas están pendientes, revisar cuál se implementa primero y aplicar la nota cruzada del documento correspondiente antes de tocar esa función.
- [037 — Modo daltónico / alto contraste](037_modo_daltonico.md)
  - **Depende de:** Ninguna (independiente de otras propuestas). **Coordinación:** ver nota de la 036.

**Proceso de aprobación:** Una propuesta se considera aprobada cuando:
- Tiene un objetivo claro y alcanzable en el contexto actual del juego.
- Define exclusiones explícitas para evitar duplicados con tareas pendientes o futuras.
- Sus dependencias están resueltas o claramente documentadas para priorización en el futuro.
