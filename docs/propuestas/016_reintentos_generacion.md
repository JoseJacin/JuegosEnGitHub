# Propuesta: reintentar la búsqueda de una partida resoluble

**Estado:** Implementada  
**Fecha:** 2026-09-23  
**Responsable:** Codex

## Problema y objetivo

Al pulsar «Empezar», la búsqueda aleatoria de una asignación resoluble puede fallar aunque la configuración se haya validado como compatible. Reintentar la búsqueda para reducir fallos transitorios.

## Alcance

- Incluye: repetir hasta 15 veces la búsqueda de una asignación resoluble al iniciar la partida y conservar el mensaje actual si todos los intentos fallan.
- No incluye: cambios en reglas, opciones de configuración o criterio determinista de validación.

## Requisitos y decisiones

- El número de intentos se agrupa con el resto de la configuración del juego.
- La búsqueda termina en cuanto encuentra un plan.
- El error solo se muestra después de agotar los intentos.

## Criterios de aceptación

- [x] «Empezar» reintenta hasta 15 veces cuando la búsqueda no encuentra un plan.
- [x] La partida se genera inmediatamente al encontrar un plan.
- [x] Se mantiene el mensaje de error si los 15 intentos fallan.
- [x] La propuesta y CONTEXTO reflejan el cambio.

## Tareas

- [x] Añadir el límite de reintentos y aplicarlo al inicio.
- [x] Actualizar la documentación y revisar sintaxis y diff.

## Riesgos, dependencias y preguntas

Ninguno.
