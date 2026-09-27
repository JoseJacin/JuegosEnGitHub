# Propuesta: separar propuestas por juego

**Estado:** Implementada
**Fecha:** 2026-09-27
**Responsable:**

## Problema y objetivo

Las propuestas de distintos juegos se mezclan en un único directorio. Organizar las propuestas dentro de cada juego permite que sus tareas y su secuencia sean independientes. Las propuestas transversales del sitio permanecen en `docs/propuestas/`.

## Alcance

- Incluye: establecer la convención de propuestas por juego; mover las propuestas 030–038 a Botellas y líquidos; actualizar índices, plan, especificación y contexto.
- No incluye: cambiar el contenido funcional aprobado, sus estados, dependencias o criterios; alterar el orden de implementación.

## Requisitos y decisiones

- Las propuestas específicas de un juego viven en `juegos/<id>/propuestas/`.
- Las propuestas que afectan al sitio o a varios juegos viven en `docs/propuestas/`.
- La plantilla compartida permanece en `docs/plantillas/propuesta.md`.
- El índice general conserva enlaces a propuestas por juego y transversales.

## Criterios de aceptación

- [x] Las propuestas 030–038 están en la carpeta de Botellas y líquidos y conservan su contenido.
- [x] Los índices y referencias documentales apuntan a las nuevas rutas.
- [x] La convención está documentada para nuevas propuestas.
- [x] El plan conserva estados y dependencias existentes.

## Tareas

- [x] Crear la carpeta de propuestas de Botellas y líquidos y mover las propuestas existentes.
- [x] Actualizar la documentación del índice, las convenciones, el plan y la continuidad.
- [x] Crear rama, revisar, confirmar, fusionar en `main` y publicar según el flujo Git.

## Riesgos, dependencias y preguntas

Ninguno.
