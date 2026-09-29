# Propuesta 069 — Murdoku: integración, verificación y publicación (bloque 11 del plan)

**Estado:** Borrador
**Fecha:** 2026-09-29
**Responsable:**

## Problema y objetivo

Con el motor, la interfaz y el arte ya construidos (propuestas 059–068), falta integrar Murdoku en el catálogo del sitio, perfilar el rendimiento por tamaño, verificar reproducibilidad/accesibilidad y cerrar la entrega siguiendo el flujo Git del repositorio.

## Alcance

- Incluye: alta en el catálogo del sitio, verificación de rutas relativas (raíz local y prefijo GitHub Pages), perfilado por tamaño, corrección de bloqueos del hilo principal, verificación de reproducibilidad/persistencia/controles, y cierre documental, según `PLAN.md` bloque 11.
- No incluye:
  - Añadir funcionalidad nueva de juego: esta propuesta solo integra y verifica lo ya construido en 059–068.
  - Resolver defectos que requieran reabrir el diseño de una propuesta anterior sin documentarlo explícitamente como tal.

## Requisitos y decisiones

1. **Bloqueo previo.** Depende de que las propuestas 059–068 estén fusionadas dentro del alcance MVP aprobado en la propuesta 058.
2. **Perfilado por etapa.** Medir candidatos rechazados y duración por etapa (`map`, `witness`, `objects`, `clues`) según `GUIA_MOTOR_GENERACION.md` §12.1–§12.2, antes de decidir si hace falta mover la generación a un Web Worker (§12.3).
3. **Rutas relativas.** Verificar el juego tanto en raíz local como bajo el prefijo `/JuegosEnGitHub/`, sin servidor adicional, según README §6.1 y las convenciones del sitio (`../../PLAN.md`).
4. **Cierre documental.** Al terminar, ejecutar `node scripts/check-docs.mjs` y revisar `git diff --check` antes de pedir aprobación de cierre, tal como exige el flujo SDD del repositorio (`AGENTS.md`).

## Criterios de aceptación

- [ ] Murdoku aparece en el catálogo del sitio y funciona con rutas relativas tanto en local como bajo GitHub Pages.
- [ ] Cada tamaño de tablero habilitado tiene una medición de tiempo/candidatos rechazados por etapa.
- [ ] No hay bloqueo perceptible del hilo principal durante la generación en los tamaños habilitados (o se documenta y resuelve si aparece).
- [ ] La reproducción por semilla/configuración/versión y la recuperación ante preferencias inválidas se verifican explícitamente.
- [ ] Los controles de ratón, teclado y táctil se verifican en la integración final, no solo en las propuestas individuales.
- [ ] `node scripts/check-docs.mjs` y `git diff --check` se ejecutan sin hallazgos antes del cierre.

## Tareas

- [ ] **11.1** Añadir la entrada de Murdoku al catálogo del sitio.
- [ ] **11.2** Verificar rutas relativas desde raíz local.
- [ ] **11.3** Verificar rutas bajo `/JuegosEnGitHub/`.
- [ ] **11.4** Perfilar una configuración pequeña.
- [ ] **11.5** Perfilar cada tamaño habilitado.
- [ ] **11.6** Medir candidatos rechazados y duración por etapa.
- [ ] **11.7** Corregir un bloqueo del hilo principal si aparece.
- [ ] **11.8** Verificar reproducción por semilla/configuración/versión.
- [ ] **11.9** Verificar persistencia inválida de preferencias.
- [ ] **11.10** Verificar controles ratón/teclado/táctil.
- [ ] **11.11** Resolver defectos y documentar los que quedan.
- [ ] **11.12** Actualizar especificación, plan y contexto con resultados reales.
- [ ] **11.13** Revisar `git diff --check`, estado y contenido de los archivos.
- [ ] **11.14** Cerrar entrega mediante el flujo Git del repositorio.
- [ ] Crear rama `feature/069_murdoku_integracion_publicacion`, commits atómicos, y seguir el flujo de aprobación/merge del repositorio.

## Riesgos, dependencias y preguntas

- Si el perfilado (11.4–11.6) revela que un tamaño grande bloquea el hilo principal, esta propuesta puede requerir reabrir la decisión de Web Worker de la propuesta 066 antes de cerrar; documentarlo como dependencia añadida, no como alcance nuevo silencioso.
- Defectos encontrados que impliquen cambiar una regla ya aprobada en README/GUIA deben tratarse como un conflicto documentado en `CONTEXTO.md`, no corregirse aquí por iniciativa propia.
- El cierre de esta propuesta es también el cierre de la primera versión jugable de Murdoku; coordinarlo con el usuario antes de fusionar en `main` (confirmación explícita de merge, según el flujo Git del repositorio).
