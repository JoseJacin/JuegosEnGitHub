# Comandos del proyecto

El sitio es estático y actualmente no requiere instalar dependencias.

## Scripts de apoyo (`scripts/`)

El repositorio incluye scripts en `scripts/` para las tareas repetitivas de este documento. Son atajos opcionales: no sustituyen los criterios de aprobación de `AGENTS.md` (por ejemplo, `merge-to-main.sh` no debe ejecutarse sin el OK explícito de fusión), solo evitan errores de escritura al teclear los comandos. Requieren `python3`, `node` y `curl` disponibles en el `PATH`; si alguno falta, el script lo indica y se puede seguir usando los comandos manuales de las secciones siguientes.

| Script | Para qué sirve |
| --- | --- |
| `scripts/serve.sh [puerto]` | Levanta el servidor estático local (por defecto puerto 8000) para probar el sitio en el navegador. |
| `scripts/check-js.sh [ruta]` | Valida con `node --check` que los `.js` de la ruta indicada (por defecto todo el repo) no tienen errores de sintaxis, sin ejecutarlos. |
| `scripts/smoke-test.sh [puerto-base]` | Levanta un servidor temporal, comprueba que `/`, `/menu/` y cada `juegos/<id>/index.html` responden 200, valida la sintaxis de los `.js` de `juegos/` y detiene el servidor al terminar. Útil como autocomprobación antes de pedir el OK de código. |
| `scripts/new-branch.sh <juego-o-sitio> <idPropuesta> <descripcion>` | Actualiza `main` y crea la rama `feature/<juego-o-sitio>_<idPropuesta>_<descripcion>` (mismo formato que la sección «Flujo de rama»). |
| `scripts/merge-to-main.sh --confirmado <rama>` | Ejecuta la secuencia de fusión y publicación de la sección «Merge y publicación». El flag `--confirmado` solo evita ejecuciones accidentales; **sigue exigiendo el OK explícito del usuario antes de invocarlo**. |
| `node scripts/check-docs.mjs` | Revisa todo el repositorio: enlaces relativos de Markdown rotos, propuestas `**Estado:** Implementada` con elementos de checklist sin marcar (incoherencia) y propuestas `**Estado:** Implementada` que sigan en el árbol de trabajo (candidatas a retirar, ver «Cierre de una propuesta»). No modifica nada. |
| `node scripts/proposal-status.mjs <ruta-al-md>` | Para una propuesta concreta: muestra su `Estado` declarado, cuántos elementos de checklist quedan sin marcar y qué otros documentos Markdown mencionan su identificador (para no olvidar actualizarlos al cerrarla). No modifica nada. |
| `scripts/new-proposal.sh <juego-o-sitio> <descripcion_con_guiones> ["Título"]` | Calcula el siguiente idPropuesta libre (revisando archivos actuales, todo el historial de Git, ramas y commits) y crea el archivo desde `docs/plantillas/propuesta.md` ya rellenado con número, título y fecha. |

## Cierre de una propuesta

Cuando una propuesta queda implementada y fusionada en `main`, el repositorio sigue esta convención (ver ejemplos en `juegos/botellas-y-liquidos/CONTEXTO.md` y su `propuestas/README.md`):

1. Ejecuta `node scripts/proposal-status.mjs <ruta-al-md-de-la-propuesta>` y confirma que no quedan elementos de checklist sin marcar; revisa cada documento que aparezca en la lista de referencias.
2. Actualiza el `PLAN.md` del ámbito (marca las tareas, escribe la nota «Hecho cuando…» con rama/commit de fusión) y el `CONTEXTO.md` correspondiente.
3. Actualiza el índice `propuestas/README.md` de ese ámbito: quita la propuesta de la lista de activas y menciona que se implementó.
4. Retira el archivo `.md` de la propuesta del árbol de trabajo con `git rm <archivo>` (su contenido queda disponible en el historial de Git). No lo dejes «por si acaso»: si hace falta conservarlo como referencia, documenta esa excepción explícitamente en el índice, como se hizo con la propuesta 032 de Botellas y líquidos.
5. Ejecuta `node scripts/check-docs.mjs` antes de pedir el OK de documentación: no debe quedar ningún enlace roto hacia el archivo retirado ni la propuesta debe seguir apareciendo como «Implementada» en el árbol de trabajo.

## Creación de una propuesta nueva

```sh
./scripts/new-proposal.sh <juego-o-sitio> <descripcion_con_guiones> ["Título legible"]
```

Crea `juegos/<juego>/propuestas/<idPropuesta>_<descripcion>.md` (o `docs/propuestas/...` si el ámbito es `sitio`) a partir de `docs/plantillas/propuesta.md`, con el número, el título y la fecha ya rellenados. El idPropuesta se calcula como el máximo encontrado en archivos, ramas y commits de todo el historial de Git, más uno; revisa el mensaje de salida y complétala (Responsable, Objetivo, Alcance, Requisitos, Criterios, Tareas) antes de pedir su aprobación. Enlázala manualmente desde el índice `propuestas/README.md` del ámbito correspondiente: el script no modifica ese índice.

## Permisos Git en entornos restringidos

El sandbox puede permitir editar archivos del proyecto y, a la vez, montar `.git` como solo lectura. Las operaciones de consulta (`status`, `diff`, `log`, `branch`) no necesitan escribir metadatos; `fetch`, `pull`, cambios de rama y operaciones de publicación sí. Ejecuta estas últimas mediante el mecanismo de escalación/autorización del entorno desde el primer intento; no pruebes primero sin autorización. Si aparece `Unable to create .../.git/index.lock: Operation not permitted`, la causa es el límite del sandbox: no es un lock abandonado ni se arregla cambiando permisos del repositorio. No repitas la orden normal ni borres locks manualmente; solicita/usa la autorización disponible y repite la operación.

## Inspección

```sh
git status --short --branch
git branch --all --verbose
git log --oneline --decorate -10
rg --files
```

## Vista local

Desde la raíz del repositorio, inicia un servidor HTTP estático:

```sh
python3 -m http.server 8000
```

O usa el atajo equivalente `./scripts/serve.sh 8000`. Abre `http://localhost:8000/` en el navegador. Detén el servidor con `Ctrl+C`.

## Comprobación automática (sin navegador)

Para verificar un cambio sin depender de abrir el navegador (por ejemplo, en un entorno sin interfaz gráfica), ejecuta:

```sh
./scripts/smoke-test.sh
```

Esto levanta un servidor temporal en un puerto libre (8099 u otro cercano si está ocupado), comprueba que la portada, el menú y el `index.html` de cada juego responden con código 200, valida con `node --check` que los `.js` de `juegos/` no tienen errores de sintaxis, y detiene el servidor al terminar. El script devuelve un código de salida distinto de cero si algo falla, con el detalle impreso por pantalla.

Si solo hace falta comprobar la sintaxis de un archivo o carpeta concreta (más rápido que el smoke test completo):

```sh
./scripts/check-js.sh juegos/<id>
```

Estas comprobaciones no sustituyen la verificación manual de los criterios de aceptación de la propuesta ni la revisión visual cuando el cambio afecta al aspecto o a la interacción (animaciones, estilos, accesibilidad); son un primer filtro rápido para detectar errores de sintaxis o rutas rotas antes de pedir el OK de código.

## Revisar rutas y cambios

```sh
git diff --check
git diff --stat
git diff
```

Prueba las rutas desde la raíz del sitio y bajo el prefijo `/JuegosEnGitHub/`, que es el subdirectorio usado por GitHub Pages para este repositorio. No uses rutas absolutas desde `/` para recursos internos.

## Flujo de rama

Ejecuta las órdenes mutantes de este flujo con escalación/autorización desde el primer intento cuando el entorno restrinja `.git` (véase la sección anterior). Toda modificación del repositorio, también documental, requiere una rama de funcionalidad con este formato:

```text
feature/<juego-o-sitio>_<idPropuesta>_<descripcion>
```

Usa el identificador del juego para cambios limitados a ese juego y `sitio` para cambios globales, transversales o de documentación general. Por ejemplo: `feature/botellas-y-liquidos_033_record_local` y `feature/sitio_052_ambitos_documentales`.

```sh
git switch main
git pull --ff-only origin main
git switch -c feature/<juego-o-sitio>_<idPropuesta>_<descripcion>
```

Atajo equivalente: `./scripts/new-branch.sh <juego-o-sitio> <idPropuesta> <descripcion>` (usa guiones bajos en `<descripcion>`, ya que el script arma el nombre completo de la rama).

## Aprobaciones para commit y merge

1. Implementa y verifica el código. Ejecuta `./scripts/smoke-test.sh` (o `./scripts/check-js.sh <ruta>` para una comprobación más rápida) y revisa los criterios de aceptación, `git status` y el diff; informa al usuario y espera su OK para confirmar el código. Sin OK, no hagas `git add` ni `git commit`.
2. Tras el OK, crea un commit que contenga solo código. Si el cambio no incluye código, omite este paso.
3. Después, actualiza y revisa la documentación pertinente. Presenta el diff documental y espera otro OK antes de hacer `git add` o `git commit` de esos archivos. Para cambios solo documentales, esta es la primera aprobación y el único commit.
4. Cuando todos los commits estén listos, solicita una confirmación explícita aparte para fusionar. La aprobación de un commit no autoriza el merge.
5. Solo después del OK de merge, actualiza `main`, fusiona la rama y publica en `origin`.

## Commit

Después del OK explícito correspondiente, crea un commit atómico solo con los archivos aprobados para esa etapa:

```sh
git add <archivos-del-cambio>
git commit -m "tipo: descripción breve"
```

## Merge y publicación

Ejecuta este paso únicamente después del OK explícito del usuario para fusionar:

```sh
git switch main
git merge --no-ff feature/<juego-o-sitio>_<idPropuesta>_<descripcion>
git push origin main
git push -u origin feature/<juego-o-sitio>_<idPropuesta>_<descripcion>
```

Atajo equivalente, solo tras el OK explícito de fusión: `./scripts/merge-to-main.sh --confirmado feature/<juego-o-sitio>_<idPropuesta>_<descripcion>`.

Si `main` avanzó durante el trabajo, actualiza la rama de funcionalidad antes de fusionar y resuelve cualquier conflicto revisando los documentos fuente. No fuerces un push salvo que exista autorización explícita y una necesidad documentada.

## Publicación

La publicación se sirve desde la raíz de `main` mediante GitHub Pages cuando se active en el repositorio. La configuración de Pages y la comprobación pública se harán en la tarea correspondiente del `PLAN.md`.
