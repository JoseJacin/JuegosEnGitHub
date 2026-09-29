# Propuesta 056 — Scripts de apoyo para agentes con modelos más modestos

**Estado:** En revisión
**Fecha:** 2026-09-29
**Responsable:** Usuario y agente

## Problema y objetivo

Las propuestas de cada juego (por ejemplo, las de `botellas-y-liquidos`) las implementan a veces modelos con menos capacidad de razonamiento y de uso de herramientas (p. ej. Qwen3.5-9B ejecutado localmente en LM Studio a través de Continue). Estos modelos se benefician de comandos cortos, deterministas y con salida clara, en vez de encadenar varias órdenes de `git` de memoria o inventar cómo comprobar que un cambio funciona. El objetivo es dar un conjunto mínimo de scripts, sin dependencias nuevas, que cubran: levantar el sitio localmente, validar la sintaxis de los `.js`, comprobar automáticamente (sin navegador) que las páginas cargan, ejecutar el flujo de ramas/fusión ya documentado en `COMANDOS.md` sin tener que teclear cada comando por separado, crear una propuesta nueva con el idPropuesta correcto sin tener que calcularlo a mano, y comprobar la coherencia documental al cerrar una propuesta (enlaces rotos, checklist sin marcar, archivo de propuesta que debería haberse retirado). Este último punto responde a un fallo observado: los agentes con menos capacidad a veces dejan el `PLAN.md`/`CONTEXTO.md`/índice de propuestas desactualizados o no retiran el archivo `.md` de la propuesta ya implementada, porque esa convención solo se podía inferir del historial de propuestas anteriores y no estaba escrita como regla explícita.

## Alcance

- Incluye:
  - `scripts/serve.sh [puerto]`: levanta `python3 -m http.server` desde la raíz del repo.
  - `scripts/check-js.sh [ruta]`: valida con `node --check` la sintaxis de los `.js` de la ruta indicada (todo el repo por defecto), sin ejecutarlos.
  - `scripts/smoke-test.sh [puerto-base]`: levanta un servidor temporal, comprueba con `curl` que `/`, `/menu/` y el `index.html` de cada `juegos/<id>/` responden 200, ejecuta `check-js.sh juegos` y detiene el servidor al terminar; pensado para que un agente sin navegador disponible verifique sus propios cambios.
  - `scripts/new-branch.sh <juego-o-sitio> <idPropuesta> <descripcion>`: encadena `git switch main`, `git pull --ff-only` y `git switch -c` con el nombre de rama exigido por `COMANDOS.md`.
  - `scripts/merge-to-main.sh --confirmado <rama>`: encadena la secuencia de fusión y publicación ya documentada en `COMANDOS.md`. El flag `--confirmado` es solo una salvaguarda contra ejecuciones accidentales; no sustituye el OK explícito de fusión que exige `AGENTS.md`.
  - `scripts/check-docs.mjs`: recorre todo el repositorio, detecta enlaces relativos de Markdown que apuntan a rutas inexistentes (probó dos problemas reales del repositorio, ya corregidos como parte de esta propuesta), señala propuestas marcadas `**Estado:** Implementada` con elementos de checklist sin marcar (incoherencia entre el estado declarado y el trabajo real) y señala propuestas marcadas `**Estado:** Implementada` que sigan presentes en el árbol de trabajo.
  - `scripts/proposal-status.mjs <ruta-al-md>`: para una propuesta concreta, muestra su `Estado` declarado, cuántos elementos de checklist quedan sin marcar y qué otros documentos Markdown mencionan su identificador de 3 dígitos.
  - `scripts/new-proposal.sh <juego-o-sitio> <descripcion_con_guiones> ["Título"]`: calcula el siguiente idPropuesta libre revisando archivos de propuestas en todo el historial de Git, nombres de rama y mensajes de commit (no solo el árbol de trabajo actual, porque las propuestas completadas se retiran de él), y crea el archivo desde `docs/plantillas/propuesta.md` ya rellenado con número, título y fecha.
  - `juegos/<id>/smoke-checks.txt` (opcional, convención documentada en `juegos/README.md`): lista de cadenas literales que deben aparecer en el HTML servido de ese juego. `smoke-test.sh` las comprueba automáticamente si el archivo existe; es la única verificación «visual» viable para un modelo de solo texto, ya que no requiere ejecutar JavaScript ni interpretar imágenes. Creado para `botellas-y-liquidos` con seis marcadores (`id="board-head"`, `id="moveCount"`, `id="bottles"`, `id="victoryDialog"`, `id="hint"`, `src="./game.js"`).
  - Aclaración explícita en `AGENTS.md` (fase 5 del flujo SDD) y en `.agents/skills/juegosengithub/SKILL.md` (fase 5) de que, al cerrar una propuesta implementada y fusionada, hay que retirar su archivo `.md` del árbol de trabajo (salvo excepción documentada en el índice) y ejecutar los dos scripts anteriores antes de pedir el OK de documentación.
  - Sección «Cierre de una propuesta» en `COMANDOS.md` y sección «Cierre de esta propuesta» añadida a `docs/plantillas/propuesta.md` y a las propuestas activas de `botellas-y-liquidos` (035, 036, 037), para que el recordatorio esté en el propio documento que el agente ya tiene abierto.
  - Documentación de los scripts en `COMANDOS.md`, una regla en `.continue/rules/02_scripts_y_verificacion.md` (harness Continue/LM Studio) y una mención en `.agents/skills/juegosengithub/SKILL.md` (harness basado en skills), para que cualquier agente que siga alguno de los dos flujos de lectura documental los encuentre.
- No incluye:
  - Ningún gestor de paquetes, dependencia nueva ni build step (`npm`, `pip`, etc.). Todo se apoya en `python3`, `node` y `curl`, que ya se usan o mencionan en el repositorio.
  - Verificación visual con navegador headless (Puppeteer/Playwright) ni capturas de pantalla: se descartó porque exigiría instalar un Chromium propio (nueva dependencia pesada) y, sobre todo, porque el modelo objetivo es de solo texto y no podría interpretar una captura. `smoke-checks.txt` cubre la parte verificable por un modelo de texto (estructura del HTML servido); la revisión visual real sigue siendo tarea humana con `./scripts/serve.sh` y el navegador.
  - Validación de HTML/CSS (no hay una herramienta sin dependencias que aporte suficiente valor frente a falsos positivos); la comprobación de páginas se limita a que respondan HTTP 200 y, opcionalmente, a los marcadores de `smoke-checks.txt`.
  - Cambios en el algoritmo, las reglas o el contenido de ningún juego.
  - Automatizar el commit o el merge sin intervención humana: los scripts de Git son atajos de las mismas órdenes ya documentadas, con las mismas aprobaciones.

## Requisitos y decisiones

1. Los scripts deben degradar con gracia si falta `node` o `python3`: mensaje explicativo y salida con código de error, nunca un fallo críptico. Ver comprobación manual en `COMANDOS.md` como alternativa.
2. `smoke-test.sh` no debe dejar procesos de servidor huérfanos: usa `trap ... EXIT` para detener el servidor temporal tanto si las comprobaciones pasan como si fallan.
3. `smoke-test.sh` debe tolerar que el puerto por defecto esté ocupado (por ejemplo, por un servidor de desarrollo ya abierto en `8123`): prueba varios puertos consecutivos antes de fallar.
4. `merge-to-main.sh` exige un flag explícito (`--confirmado`) además del nombre de la rama, para que no pueda dispararse por accidente al completar una orden a medias; esto no reemplaza el requisito de obtener el OK del usuario antes de invocarlo.
5. Los scripts son atajos: si alguno falla o no está disponible, el flujo de trabajo sigue siendo válido usando los comandos manuales ya documentados en `COMANDOS.md`.
6. `check-docs.mjs` y `proposal-status.mjs` no modifican archivos: son de solo lectura/diagnóstico. La decisión de qué actualizar y cuándo retirar un archivo la sigue tomando el agente (con el OK del usuario en las fases de commit correspondientes).
7. La detección de «propuesta implementada que sigue en el árbol de trabajo» es una heurística basada en el texto del campo `Estado`; puede haber excepciones documentadas (como la propuesta 032 de `botellas-y-liquidos`, conservada a propósito como referencia histórica). El script señala candidatas a revisar, no verdades absolutas.

## Criterios de aceptación

- [x] `./scripts/check-js.sh juegos/botellas-y-liquidos` valida `game.js` sin errores.
- [x] `./scripts/smoke-test.sh` levanta un servidor temporal, comprueba `/`, `/menu/` y `juegos/botellas-y-liquidos/index.html` con código 200, corre `check-js.sh` y termina sin dejar el puerto ocupado.
- [x] `COMANDOS.md` documenta los ocho scripts (cinco `.sh` de servidor/validación/git, `check-docs.mjs`, `proposal-status.mjs` y `new-proposal.sh`) con su propósito y su equivalencia manual.
- [x] `.continue/rules/02_scripts_y_verificacion.md` indica cuándo usar cada script y deja explícito que `merge-to-main.sh` requiere el OK de fusión del usuario.
- [x] `.agents/skills/juegosengithub/SKILL.md` menciona los scripts como atajos opcionales sobre `COMANDOS.md`.
- [x] `node scripts/check-docs.mjs` no reporta enlaces rotos tras corregir los dos encontrados en `juegos/botellas-y-liquidos/PLAN.md` y el falso positivo de rutas codificadas.
- [x] `node scripts/check-docs.mjs` detecta correctamente un caso de prueba con `Estado: Implementada` y un elemento de checklist sin marcar (verificado con un archivo temporal, eliminado tras la prueba).
- [x] `node scripts/proposal-status.mjs <ruta>` muestra el estado, el recuento de checklist pendiente y las referencias cruzadas de una propuesta real (probado con 035).
- [x] `./scripts/new-proposal.sh botellas-y-liquidos <descripcion>` calcula el idPropuesta 057 (siguiente tras el 056 usado por esta misma propuesta) y genera el archivo desde la plantilla (probado y el archivo de prueba eliminado).
- [x] `AGENTS.md` y `.agents/skills/juegosengithub/SKILL.md` dejan explícito, en la fase de revisión de documentación, que hay que retirar el archivo de una propuesta implementada y fusionada (salvo excepción documentada).
- [x] `./scripts/smoke-test.sh` detecta que faltan los seis marcadores de `smoke-checks.txt` cuando se añade uno inexistente (probado y revertido) y los da todos por buenos con el HTML real.

## Tareas

- [x] T1 Crear `scripts/serve.sh`, `scripts/check-js.sh`, `scripts/smoke-test.sh`, `scripts/new-branch.sh` y `scripts/merge-to-main.sh`, con permisos de ejecución.
- [x] T2 Probar `check-js.sh` y `smoke-test.sh` de extremo a extremo sobre el repositorio actual.
- [x] T3 Documentar los scripts en `COMANDOS.md` (tabla de resumen y referencias cruzadas en las secciones de vista local, comprobación automática, flujo de rama y merge).
- [x] T4 Añadir `.continue/rules/02_scripts_y_verificacion.md` y la mención correspondiente en `.agents/skills/juegosengithub/SKILL.md`.
- [x] T5 Crear esta propuesta y enlazarla desde `docs/propuestas/README.md`.
- [x] T7 Crear `scripts/check-docs.mjs` y `scripts/proposal-status.mjs`; probarlos sobre el repositorio real y corregir los problemas reales que encontraron (enlace roto en `juegos/botellas-y-liquidos/PLAN.md`, falso positivo de rutas codificadas).
- [x] T8 Añadir la aclaración de cierre de propuesta en `AGENTS.md`, `.agents/skills/juegosengithub/SKILL.md`, `docs/plantillas/propuesta.md`, `COMANDOS.md` (sección «Cierre de una propuesta») y `.continue/rules/02_scripts_y_verificacion.md`; retrofit de la misma sección en las propuestas 035, 036 y 037 de `botellas-y-liquidos`.
- [x] T9 Añadir a `check-docs.mjs` la detección de propuestas `Implementada` con checklist sin marcar; probarla con un caso temporal.
- [x] T10 Crear `scripts/new-proposal.sh` (cálculo del idPropuesta libre a partir de archivos, ramas y commits de todo el historial) y documentarlo en `COMANDOS.md` (sección «Creación de una propuesta nueva»), la regla de Continue y el SKILL.
- [x] T11 Añadir a `smoke-test.sh` la comprobación opcional de `juegos/<id>/smoke-checks.txt`; crear ese archivo para `botellas-y-liquidos` y documentar la convención en `juegos/README.md`, `COMANDOS.md`, la regla de Continue y el SKILL.
- [x] T12 Comprobar los commits de código y documentación de las tareas T1–T10 (hechos: `d7cf636` código, `561744a` documentación).
- [ ] T6 Comitear T11 (código: `smoke-test.sh`; documentación: `juegos/README.md`, `COMANDOS.md`, la regla de Continue, el SKILL y esta propuesta) y fusionar la rama en `main` solo tras el OK explícito de merge.

## Riesgos, dependencias y preguntas

- Ninguna dependencia de otras propuestas.
- Riesgo: si el agente que usa estos scripts ejecuta `merge-to-main.sh` sin haber obtenido el OK de fusión, se publicaría en `main` sin autorización. Mitigado documentalmente en `COMANDOS.md`, la regla de Continue y esta propuesta, pero no hay una barrera técnica que lo impida: sigue dependiendo de que el agente respete `AGENTS.md`.
- Riesgo: `check-docs.mjs` puede dar falsos positivos si algún enlace usa una sintaxis poco común (por ejemplo, rutas con caracteres especiales no cubiertos por `decodeURIComponent`, o enlaces generados dinámicamente). Es una ayuda de diagnóstico, no una prueba formal; ante una duda, revisar manualmente el enlace señalado.
- Pregunta abierta: si en el futuro se añade un framework de build o pruebas a algún juego, revisar si estos scripts deben ampliarse (por ejemplo, `check-js.sh` podría delegar en un linter del proyecto en vez de `node --check`).
