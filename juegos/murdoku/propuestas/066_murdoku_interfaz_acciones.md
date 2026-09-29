# Propuesta 066 — Murdoku: interfaz y acciones de juego (bloque 8 del plan)

**Estado:** Borrador
**Fecha:** 2026-09-29
**Responsable:**

## Problema y objetivo

Con el motor de generación disponible (propuestas 059–065), esta propuesta construye la pantalla de preparación y la vista de caso: selectores de configuración, progreso de generación, tablero, cartas de pista, colocación/movimiento/borrado de personas, X, notas, deshacer, pista incremental, envío y resultado.

## Alcance

- Incluye: pantalla inicial con selectores, progreso/cancelación de generación, tablero desde el modelo validado, colocación/movimiento/borrado de personas, X manual, notas avanzadas, deshacer, reinicio, pista incremental, validación de envío y pantalla de victoria, según `PLAN.md` bloque 8.
- No incluye:
  - Tooltips, resaltado semántico de pistas y preferencias (propuesta 067): esta propuesta muestra el tablero y las cartas, pero no implementa la capa de ayuda contextual.
  - El arte final de celdas/objetos/personas (propuesta 068): puede usar marcadores provisionales mientras tanto.

## Requisitos y decisiones

1. **Bloqueo previo.** Depende de que la especificación esté aprobada (propuesta 058) y se integra por etapas con 061–065 a medida que cada una esté disponible; no bloquear todo el bloque 8 a que 065 esté terminada si 8.1–8.7 ya pueden avanzar con un motor parcial de prueba.
2. **Contrato de generación.** Usar el contrato `GenerationRequest`/`GenerationOutcome` de `GUIA_MOTOR_GENERACION.md` §3.1–§3.2 para conectar la UI con el motor; mostrar `safeMessageKey` al jugador, nunca el diagnóstico interno completo.
3. **Cancelación.** Seguir `GUIA_MOTOR_GENERACION.md` §12.3: la UI debe descartar resultados tardíos de una solicitud ya cancelada.
4. **Envío parcial.** Antes de enviar, informar cuántas personas faltan (README §8.2 punto 1); un envío completo pero incorrecto indica que hay errores sin resaltar automáticamente las celdas erróneas.
5. **Auto-X.** Si se implementa (tarea 8.13 junto con preferencias de la propuesta 067), mantener las marcas automáticas distinguibles de las manuales para poder deshacer solo las automáticas al quitar una colocación.

## Criterios de aceptación

- [ ] El jugador puede configurar nivel, `N` y `P` de forma independiente y ver el preset sugerido sin que este sobrescriba una configuración personalizada.
- [ ] La generación muestra progreso, puede cancelarse y no deja la pantalla en un estado inconsistente al cancelar.
- [ ] Colocar, mover, quitar, marcar X, anotar y deshacer funcionan sobre el modelo validado, un cambio por vez.
- [ ] Reiniciar restaura la misma semilla/configuración sin volver a invocar al generador.
- [ ] Enviar con personas faltantes se impide; enviar completo pero incorrecto informa sin revelar automáticamente la solución.
- [ ] Al resolver, se muestra el culpable, la ubicación final y la opción de iniciar una partida nueva con la misma configuración.

## Tareas

- [ ] **8.1** Crear pantalla inicial con selector de nivel.
- [ ] **8.2** Crear selector de tamaño `N`.
- [ ] **8.3** Crear selector independiente de personas `P`.
- [ ] **8.4** Mostrar preset sugerido sin cambiar configuración personalizada.
- [ ] **8.5** Mostrar progreso mientras se genera el caso.
- [ ] **8.6** Permitir cancelar una generación en curso.
- [ ] **8.7** Mostrar tablero desde el modelo validado.
- [ ] **8.8** Mostrar una carta para cada persona y pista.
- [ ] **8.9** Seleccionar persona por ratón.
- [ ] **8.10** Colocar persona al elegir una celda válida.
- [ ] **8.11** Mover persona ya colocada a otra celda.
- [ ] **8.12** Quitar persona con acción explícita.
- [ ] **8.13** Marcar y quitar X manual.
- [ ] **8.14** Marcar y quitar notas avanzadas.
- [ ] **8.15** Deshacer una acción por vez.
- [ ] **8.16** Reiniciar la misma semilla y configuración.
- [ ] **8.17** Solicitar y mostrar una pista incremental.
- [ ] **8.18** Impedir envío si falta alguna persona.
- [ ] **8.19** Indicar envío incorrecto sin señalar toda la solución.
- [ ] **8.20** Mostrar victoria, ubicación final y culpable al resolver.
- [ ] **8.21** Iniciar una partida con nueva semilla y misma configuración.
- [ ] **8.22** Copiar un enlace reproducible del caso.
- [ ] Actualizar `PLAN.md` (marcar bloque 8) y `CONTEXTO.md` con el resultado y las comprobaciones ejecutadas.
- [ ] Crear rama `feature/066_murdoku_interfaz_acciones`, commits atómicos, y seguir el flujo de aprobación/merge del repositorio.

## Riesgos, dependencias y preguntas

- Integrar por etapas con un motor todavía incompleto (bloques 061–065 en progreso) puede requerir datos de prueba fijos (el fixture de `GUIA_MOTOR_GENERACION.md` §21 sirve para esto) mientras el generador real no esté listo.
- Si el motor tarda perceptiblemente en tableros grandes, esta propuesta depende de que la 069 (perfilado) confirme si hace falta mover la generación a un Web Worker antes de dar la interfaz por terminada.
- La pista incremental (8.17) depende de que la propuesta 065 exponga pasos pedagógicos reales; mientras tanto puede mostrar un mensaje "aún no disponible" en vez de simular una pista.
