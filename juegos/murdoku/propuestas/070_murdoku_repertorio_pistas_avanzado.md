# Propuesta 070 — Murdoku: ampliar el repertorio de pistas después del MVP (bloque 12 del plan)

**Estado:** Borrador
**Fecha:** 2026-09-29
**Responsable:**

## Problema y objetivo

`README.md` §3.3 documenta un repertorio objetivo de familias de pista más amplio que el de la primera versión (alternativas, cardinalidad avanzada, reglas de escenario). Esta propuesta activa esas familias por fases, después de que la primera versión (propuestas 059–069) esté publicada, sin tocar nunca más de una familia por subtarea.

## Alcance

- Incluye: catálogo completo de predicados observados, matrices de verdad, implementación de cada operador por fases (con sus ocho pasos: semántica, tipo, generación, evaluación/propagación, plantilla, explicación, validación, calibración), y el sorteo por escenario compatible, según `PLAN.md` bloque 12.
- No incluye:
  - Activar una familia sin que su semántica esté aprobada en README y su implementación complete los ocho pasos de `GUIA_MOTOR_GENERACION.md` §9.5.
  - Cambiar el MVP ya publicado (propuestas 059–069): esta propuesta solo añade capacidades nuevas al repertorio, de forma aditiva y por fases.

## Requisitos y decisiones

1. **Bloqueo previo.** Depende de las tareas 0.15/0.16 (propuesta 058, orden de activación y suelo de átomos) y de que las propuestas 059, 063, 064 y 065 estén fusionadas, ya que cada familia nueva reutiliza sus tipos, solucionador, generador de pistas y clasificador.
2. **Protocolo por familia.** Seguir exactamente el protocolo de ocho pasos de `GUIA_MOTOR_GENERACION.md` §9.5 (semántica → datos → candidatos → evaluación/propagación → plantilla → explicación → validación → clasificación/versión) para cada operador; una familia no se considera implementada hasta completar los ocho.
3. **Una familia por subtarea.** Abrir subtareas separadas para AST, evaluación, propagación, generación, plantilla y explicación de cada operador, según `GUIA_MOTOR_GENERACION.md` §9.5 "Protocolo pequeño al añadir un operador"; no tocar los seis lugares en un único cambio grande.
4. **Compatibilidad de escenario.** Una regla de escenario (`ScenarioRule`) solo entra al sorteo si el tablero contiene las entidades/roles que necesita; nunca se fuerza su aparición en un escenario incompatible.
5. **Versionado.** Cualquier cambio de interpretación de una pista o regla incrementa `rulesVersion`; cualquier cambio de algoritmo de selección incrementa `generatorVersion`, según `GUIA_MOTOR_GENERACION.md` §5.1.

## Criterios de aceptación

- [ ] Cada familia activada tiene semántica aprobada, tipo en el AST, generador de candidatos, evaluador completo y propagación parcial conservadora, plantilla española, explicación pedagógica y validación, antes de entrar al sorteo de una partida.
- [ ] El sorteo de pistas de una partida solo incluye familias ya implementadas y compatibles con el escenario elegido.
- [ ] Activar una familia nueva no cambia el comportamiento de un caso ya compartido con una semilla y versiones anteriores.
- [ ] Cada familia nueva se calibra con un corpus propio antes de habilitarse en tamaños grandes.
- [ ] `README.md`, `GUIA_MOTOR_GENERACION.md` y `CONTEXTO.md` reflejan el estado validado de cada familia activada.

## Tareas

- [ ] **12.1** Crear catálogo completo de predicados observados y registrar para cada uno sujeto, argumentos, evaluación, plantilla y fase prevista de activación.
- [ ] **12.2** Añadir matriz de verdad de pertenencia a zona, coordenada, adyacencia, ocupación, relación de personas, negación y cardinalidad.
- [ ] **12.3** Revisar todos los términos con negrita de ejemplo y mapearlos a slots semánticos (persona, tipo/instancia de objeto, zona, fila/columna).
- [ ] **12.4** Implementar operadores en el orden de fases aprobado; no excluir del repertorio objetivo ninguna familia observada sin resolución explícita.
- [ ] **12.5** Comparar `ADJACENT_TO_OBJECT` con `ON_OBJECT` mediante ejemplos verdaderos y falsos.
- [ ] **12.6** Comparar `ALONE_IN_ROOM` con `ALONE_WITH` y documentar la cantidad de personas excluidas.
- [ ] **12.7** Verificar que las afirmaciones `EXACTLY`, `AT_LEAST`, `NONE`, `UNIQUE` y `PARITY` produzcan resultados distintos donde corresponde.
- [ ] **12.8** Documentar las cuatro combinaciones de verdad de `OR_INCLUSIVE`; si se adopta XOR, documentar su tabla por separado.
- [ ] **12.9** Limitar profundidad y cantidad de hijos en operadores compuestos según presupuesto aprobado.
- [ ] **12.10** Documentar resultados esperados de evaluación completa para cada predicado con IDs válidos y referencias inexistentes.
- [ ] **12.11** Añadir propagación parcial conservadora para el operador habilitado.
- [ ] **12.12** Añadir generación reproducible de candidatos verdaderos al testigo.
- [ ] **12.13** Añadir plantilla española y tokens semánticos interactivos para cada operador habilitado.
- [ ] **12.14** Añadir un paso pedagógico que cite pistas/reglas y muestre por qué se reduce el dominio.
- [ ] **12.15** Comprobar unicidad tras cada cambio de set de pistas y descartar resultado si encuentra dos soluciones.
- [ ] **12.16** Medir coste de solver con corpus pequeño antes de habilitar el operador en tamaños mayores.
- [ ] **12.17** Versionar esquema/reglas/clasificador si cambia la interpretación de partidas compartidas.
- [ ] **12.18** Documentar ejemplos propios breves para todos los límites de cada operador.
- [ ] **12.19** Comparar la familia con el inventario observado sin copiar frase, personajes, escenario ni arte.
- [ ] **12.20** Actualizar `README.md`, esta guía y `CONTEXTO.md` con el estado validado de la familia.
- [ ] **12.21** Filtrar el catálogo completo por compatibilidad de escenario y sortear un subconjunto de candidatos con el flujo PRNG de pistas.
- [ ] **12.22** Asegurar que la selección aleatoria cubra los sospechosos y alcance el suelo de átomos aprobado (propuesta inicial en `README.md` §4.4) antes de comprobar unicidad.
- [ ] **12.23** Mantener la selección aleatoria al añadir/reducir pistas; toda decisión debe ser reproducible y respetar mínimo, cobertura y dificultad.
- [ ] **12.24** Comprobar que familias de escenario (por ejemplo, hoyos o recintos con roles) solo se sortean si el modelo del tablero define sus entidades y reglas.
- [ ] **12.25** Implementar pertenencia exacta, exclusión y alternativas de región (`ROOM_IS`, `ROOM_NOT`, `ROOM_IN_SET`).
- [ ] **12.26** Implementar coordenada exacta, primera/última fila o columna y bordes del tablero.
- [ ] **12.27** Implementar distancias cardinales exactas y orden relativo norte/sur/este/oeste con las semánticas diferenciadas de §2.2.
- [ ] **12.28** Completar relaciones entre personas: adyacencia, misma zona, orden direccional, compañía y soledad con universo explícito.
- [ ] **12.29** Completar relaciones con objetos: adyacencia, ocupación/superficie, asiento y sus negaciones tipadas.
- [ ] **12.30** Implementar cardinalidad de zona para `NONE`, `EXACTLY`, `AT_LEAST` y paridad, incluidos atributos de las personas contadas.
- [ ] **12.31** Implementar unicidad de coincidencia y comparación de conteos entre zonas o conjuntos declarados.
- [ ] **12.32** Implementar reglas de escenario para dominios, roles y permisos con esquema y versión explícitos.
- [ ] **12.33** Implementar composición `NOT`, `AND`, alternativa inclusiva y `XOR` separadamente; renderizar cada operador sin ambigüedad.
- [ ] Actualizar `PLAN.md` (marcar bloque 12 según fases completadas) y `CONTEXTO.md` con el resultado y las comprobaciones ejecutadas.
- [ ] Crear rama `feature/070_murdoku_repertorio_pistas_avanzado` (o una rama por fase/familia si el volumen lo justifica), commits atómicos, y seguir el flujo de aprobación/merge del repositorio.

## Riesgos, dependencias y preguntas

- Esta propuesta es deliberadamente el bloque más grande y de más largo plazo (33 subtareas, muchas con sub-protocolo de ocho pasos cada una); no se espera cerrarla de una vez. Puede dividirse en varias propuestas más pequeñas por familia (por ejemplo "070a — región y coordenada", "070b — cardinalidad", "070c — reglas de escenario") si al empezar resulta más manejable, siguiendo el mismo criterio de atomicidad de `PLAN.md`.
- Activar una familia de escenario (12.32) requiere que el catálogo de contenido de un escenario concreto (por ejemplo, hoyos de golf) esté aprobado como contenido original propio; no reutilizar el escenario del referente.
- Si la calibración de una familia nueva (12.16, 12.22) muestra que dispara demasiado el tiempo de generación en tableros grandes, limitar su disponibilidad por tamaño y documentarlo en README antes de habilitarla globalmente.
