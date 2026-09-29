# Comandos del proyecto

El sitio es estático y actualmente no requiere instalar dependencias.

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

Abre `http://localhost:8000/` en el navegador. Detén el servidor con `Ctrl+C`.

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

## Aprobaciones para commit y merge

1. Implementa y verifica el código. Revisa los criterios de aceptación, `git status` y el diff; informa al usuario y espera su OK para confirmar el código. Sin OK, no hagas `git add` ni `git commit`.
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

Si `main` avanzó durante el trabajo, actualiza la rama de funcionalidad antes de fusionar y resuelve cualquier conflicto revisando los documentos fuente. No fuerces un push salvo que exista autorización explícita y una necesidad documentada.

## Publicación

La publicación se sirve desde la raíz de `main` mediante GitHub Pages cuando se active en el repositorio. La configuración de Pages y la comprobación pública se harán en la tarea correspondiente del `PLAN.md`.
