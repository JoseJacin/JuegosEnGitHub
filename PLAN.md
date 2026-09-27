# Plan del sitio

## Objetivo

Mantener una colección de juegos web estáticos publicada con GitHub Pages. Este plan registra decisiones, estado y trabajo compartido del sitio. Cada juego es responsable de su plan detallado y su continuidad.

## Estado

- Repositorio: `JoseJacin/JuegosEnGitHub`; rama principal `main` y publicación desde la raíz mediante GitHub Pages.
- El catálogo y Botellas y líquidos están implementados y publicados.
- La estructura de planificación por juego quedó establecida en la propuesta [042](docs/propuestas/042_planes_y_contextos_por_juego.md).
- El alcance de Murdoku está aprobado en [043](juegos/murdoku/propuestas/043_murdoku_generacion_visual.md). Su [especificación funcional](juegos/murdoku/README.md) y [plan de juego](juegos/murdoku/PLAN.md) están en borrador/revisión; no hay implementación.
- Botellas y líquidos conserva mejoras aprobadas pendientes (propuestas [032–037](juegos/botellas-y-liquidos/propuestas/README.md)); no se cancelan ni se mezclan con el trabajo del nuevo juego. Su estado y dependencias están en el [plan del juego](juegos/botellas-y-liquidos/PLAN.md).

## Estructura documental

- `AGENTS.md` y `COMANDOS.md`: instrucciones y flujo común del repositorio.
- `docs/README.md` y `docs/propuestas/`: índice SDD y propuestas transversales.
- `juegos/<id>/README.md`: especificación vigente del juego.
- `juegos/<id>/PLAN.md`: tareas, dependencias y estado del juego.
- `juegos/<id>/CONTEXTO.md`: continuidad específica del juego.
- `juegos/<id>/propuestas/`: índice y propuestas específicas.
- El `PLAN.md` y `CONTEXTO.md` de la raíz resumen únicamente el sitio y enlazan a los documentos de cada juego.

## Trabajo transversal

### T23 — Organización de planes y contextos por juego

- [x] T23.1 Crear plan y contexto propios para Botellas y líquidos.
- [x] T23.2 Mantener en raíz el resumen del sitio y enlaces, sin duplicar tareas del juego.
- [x] T23.3 Actualizar instrucciones, índices y enlaces documentales.
- [x] T23.4 Revisar referencias y registrar la secuencia: reorganización documental, propuesta del nuevo juego y luego trabajo según planes aprobados.

**Hecho cuando:** cada juego tiene fuentes de verdad y continuidad independientes; los documentos generales no duplican su estado; el backlog aprobado sigue visible y sus dependencias se conservan. Implementado en la [propuesta 042](docs/propuestas/042_planes_y_contextos_por_juego.md).

## Secuencia acordada

1. Completar y publicar esta reorganización documental (T23).
2. Revisar y aprobar el borrador funcional de Murdoku ([reglas](juegos/murdoku/README.md), [plan](juegos/murdoku/PLAN.md)) conforme al alcance aprobado [043](juegos/murdoku/propuestas/043_murdoku_generacion_visual.md); después, implementar según sus fases.
3. Continuar los juegos desde sus planes específicos y actualizar el plan general cuando el trabajo afecte al sitio o cambie prioridades.

La prioridad de Murdoku no elimina las propuestas aprobadas 032–037 de Botellas y líquidos. Se mantienen pendientes para priorización posterior; las dependencias T14 → T15/T17 siguen definidas en su plan.

## Decisiones compartidas vigentes

- Publicación estática con GitHub Pages, sin cuentas ni backend en la primera etapa.
- Un directorio y documentos de producto propios por juego.
- Las reglas aprobadas de cada juego viven en su `README.md`.
- Las propuestas específicas viven con el juego; las transversales permanecen en `docs/propuestas/`.
- No duplicar especificaciones entre plan, contexto y propuesta: el plan enlaza al alcance aprobado y el contexto resume estado y próximos pasos.
