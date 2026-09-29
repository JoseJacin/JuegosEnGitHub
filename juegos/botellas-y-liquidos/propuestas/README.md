# Propuestas de Botellas y líquidos

Las propuestas de este directorio describen cambios específicos del juego. Se crean a partir de la plantilla común [`../../../docs/plantillas/propuesta.md`](../../../docs/plantillas/propuesta.md). Para cambios transversales al sitio o compartidos entre juegos, consulta el [índice común](../../../docs/propuestas/README.md).

Las propuestas completadas 030, 031, 032, 038 y 041 se retiraron del árbol de trabajo para mantener aquí solo el backlog activo. Sus documentos siguen disponibles en el historial de Git; sus resultados están resumidos en [`PLAN.md`](../PLAN.md) y [`CONTEXTO.md`](../CONTEXTO.md).

## Aprobadas pendientes

- [033 — Récord local](033_record_local.md)
- [034 — Pista de movimiento](034_pista_hint.md)
- [035 — Compartir resultado](035_compartir_resultado.md)
- [036 — Animación de vertido](036_animacion_vertido.md)
- [037 — Modo daltónico / alto contraste](037_modo_daltonico.md)

## Implementadas (codificadas en `main`)

- [032 — Contador de movimientos](https://github.com/JoseJacin/JuegosEnGitHub/blob/8fe895a/juegos/botellas-y-liquidos/propuestas/032_contador_movimientos.md): variable `moveCount` que se incrementa con cada trasvase y decrecienta al deshacer; renderizado en la cabecera del tablero. Integrada el 2026-09-23 en commit `8fe895a`.