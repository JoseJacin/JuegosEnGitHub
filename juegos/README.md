# Juegos

Cada juego tendrá su propia subcarpeta para mantener separado su HTML, CSS, JavaScript, recursos y documentación de producto. Evitar dependencias de servidor: GitHub Pages sirve archivos estáticos.

Convención: usar un identificador corto en minúsculas y guiones, por ejemplo `botellas-y-liquidos`. Cada juego mantiene:

- `README.md`: objetivo, reglas, controles y estado; fuente de verdad de la mecánica.
- `PLAN.md`: tareas, dependencias y estado específicos del juego.
- `CONTEXTO.md`: continuidad, decisiones recientes y próximos pasos del juego.
- `propuestas/README.md` y propuestas específicas aprobadas o en curso.
- `smoke-checks.txt` (opcional): lista de cadenas literales (una por línea, `#` para comentarios) que deben aparecer en el HTML servido de `index.html`. La usa `../scripts/smoke-test.sh` para detectar roturas estructurales (ids, atributos) sin necesitar navegador; si el archivo no existe, ese juego solo recibe la comprobación genérica de código 200.

Las decisiones y tareas transversales al sitio permanecen en los documentos de la raíz y `docs/`.
