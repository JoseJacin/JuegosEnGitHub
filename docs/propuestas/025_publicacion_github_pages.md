# Propuesta: publicar y verificar el sitio en GitHub Pages

**Estado:** Aprobada
**Fecha:** 2026-09-23
**Responsable:** Usuario y agente Codex

## Problema y objetivo

El sitio y el juego están implementados, pero GitHub Pages aún no está activado y los flujos del juego no se han revisado manualmente de extremo a extremo. Publicar el contenido estático desde `main` y comprobar que el sitio funciona en su URL pública.

## Alcance

- Incluye: activar GitHub Pages para `main` desde la raíz, revisar menú y los flujos de configuración/partida definidos en `PLAN.md`, comprobar configuraciones uniformes y mixtas (incluido tablero grande), validar carga directa de páginas y recursos y registrar la URL/estado en `README.md`, `PLAN.md` y `CONTEXTO.md`.
- No incluye: modificar reglas o lógica del juego, añadir backend, cambiar la estructura de publicación o rediseñar la interfaz. Los defectos hallados se documentarán antes de ampliar el alcance.

## Requisitos y decisiones

- La fuente de publicación es `main` en la raíz del repositorio, según `COMANDOS.md` y `PLAN.md`.
- La ruta publicada debe conservar el prefijo `/JuegosEnGitHub/` y servir tanto la entrada como páginas de menú y juego mediante sus rutas directas.
- Verificar los flujos acordados en `PLAN.md` T7.2–T7.4 y la especificación del juego en `juegos/botellas-y-liquidos/README.md`.
- No cambiar comportamiento funcional durante la publicación sin una propuesta separada.

## Criterios de aceptación

- [ ] GitHub Pages publica desde `main` y la raíz del repositorio.
- [ ] La página pública abre el catálogo y carga directamente la configuración/juego y sus recursos.
- [ ] Se revisan manualmente los flujos de menú, configuración, movimientos, deshacer, reinicio, victoria y repetición.
- [ ] Se revisan una partida uniforme, otra con capacidades distintas y un tablero grande.
- [ ] `README.md`, `PLAN.md` y `CONTEXTO.md` indican la URL y el estado real de publicación y verificación.

## Tareas

- [ ] Comprobar disponibilidad/configuración actual de GitHub Pages y habilitar la fuente acordada.
- [ ] Publicar la rama integrada y esperar a que Pages sirva el sitio.
- [ ] Revisar rutas y flujos desde navegador público.
- [ ] Actualizar documentación, revisar diff y registrar el estado Git.

## Riesgos, dependencias y preguntas

La publicación depende de permisos de administración del repositorio y de la disponibilidad de GitHub Pages. Si los permisos o el entorno impiden activar Pages, registrar el error y dejar el cambio local preparado. Ninguno adicional.
