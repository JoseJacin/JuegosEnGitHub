# Plan del proyecto

## Objetivo

Crear un sitio estático con GitHub Pages que muestre un catálogo de juegos web. Cada juego tendrá su propia carpeta y podrá abrirse directamente desde el menú. La primera versión no incluirá estadísticas persistentes, cuentas ni servidor.

## Organización prevista

```text
/
├── index.html              # entrada raíz (opcional; redirige o enlaza al menú)
├── menu/                   # portada y catálogo
├── juegos/
│   └── <id-del-juego>/     # HTML, CSS, JS y recursos exclusivos
├── imagenes/               # recursos compartidos
├── README.md
├── PLAN.md
└── CONTEXTO.md
```

Cada parte funcional (menú y cada juego) tendrá su directorio. Un juego pequeño puede vivir en un único HTML con estilos y scripts internos; si crece, separar `style.css` y `game.js` dentro de su carpeta.

## Fases

1. **Preparar el repositorio**: elegir nombre y visibilidad, crear el remoto en GitHub, vincularlo con este directorio y hacer el primer commit.
2. **Definir navegación**: decidir si la raíz contiene el menú o si la raíz enlaza a `menu/`; asegurar rutas compatibles con Pages y carga directa de cada juego.
3. **Construir el catálogo**: diseñar una portada accesible y adaptable, con tarjetas/enlaces y estado (disponible o próximamente).
4. **Implementar juegos de forma independiente**: comenzar por el juego de botellas y líquidos sugerido por el recurso existente; definir reglas y controles antes de programar.
5. **Verificar**: abrir portada y juegos en escritorio/móvil, comprobar enlaces, recarga en rutas profundas y funcionamiento sin backend.
6. **Publicar**: configurar GitHub Pages para desplegar desde la rama/carpeta acordada; comprobar la URL pública.
7. **Mantener**: actualizar este plan y `CONTEXTO.md` al añadir juegos, cambiar decisiones o completar fases.

## Decisiones y límites actuales

- Publicación estática con GitHub Pages.
- Sin estadísticas persistentes en la primera versión. Se puede añadir progreso local con `localStorage` más adelante, pero solo en el navegador del usuario y sin sincronización.
- Un directorio por juego para limitar acoplamiento y facilitar mantenimiento.
- Aún no se ha elegido licencia, nombre definitivo del repositorio, diseño visual ni juego inicial.
- La imagen `imagenes/Juego de botellas y líquidos.png` es una referencia disponible; no determina por sí sola las reglas del juego.

## Pendientes inmediatos

- Crear el repositorio remoto GitHub y añadir `origin` (GitHub CLI `gh` no está instalado en el entorno actual).
- Confirmar nombre/visibilidad del remoto y estrategia de publicación.
- Acordar las reglas del primer juego y el esquema visual antes de implementarlo.
