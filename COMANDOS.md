# Comandos del proyecto

El sitio es estático y actualmente no requiere instalar dependencias.

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

```sh
git switch main
git pull --ff-only origin main
git switch -c feature/<id>_<descripcion>
```

Después de revisar el diff, crea commits atómicos:

```sh
git add <archivos-del-cambio>
git commit -m "tipo: descripción breve"
```

Al terminar y revisar la funcionalidad:

```sh
git switch main
git merge --no-ff feature/<id>_<descripcion>
git push origin main
git push -u origin feature/<id>_<descripcion>
```

Si `main` avanzó durante el trabajo, actualiza la rama de funcionalidad antes de fusionar y resuelve cualquier conflicto revisando los documentos fuente. No fuerces un push salvo que exista autorización explícita y una necesidad documentada.

## Publicación

La publicación se sirve desde la raíz de `main` mediante GitHub Pages cuando se active en el repositorio. La configuración de Pages y la comprobación pública se harán en la tarea correspondiente del `PLAN.md`.
