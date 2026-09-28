# Propuesta 033 — Récord local en `localStorage`

**Estado:** Aprobada  
**Fecha:** 2026-09-23  
**Responsable:** Usuario y agente Antigravity

## Objetivo

Guardar el número mínimo de movimientos conseguido para cada configuración y mostrarlo en el diálogo de victoria.

## Alcance

- Incluye:
  - Clave de almacenamiento estable basada en total de botellas, colores, capacidad máxima y modo/tamaños configurados; el formato concreto queda fijado en «Identidad de la configuración».
  - Lectura y escritura en `localStorage` al finalizar la partida.
  - Mensaje diferenciado en el diálogo de victoria: «¡Nuevo récord!» si mejora, o comparativa si no.
- No incluye:
  - Sincronización entre dispositivos ni backend.
  - Historial de múltiples intentos.

## Requisitos y decisiones

1. Depende de la propuesta 032 (requiere `moveCount` disponible).
2. Si `localStorage` no está disponible (modo privado u otro error), el juego funciona sin récord, sin lanzar excepción visible.
3. El récord se muestra en el diálogo de victoria existente (`#victoryDialog`), no en pantalla durante la partida.

## Criterios de aceptación

- [ ] Al ganar por primera vez con una configuración, se guarda el récord.
- [ ] Al ganar con menos movimientos, se actualiza y se muestra "¡Nuevo récord!".
- [ ] Al ganar igualando o superando el récord, se muestra el récord anterior y el actual.
- [ ] Si `localStorage` no está disponible, el juego funciona igual sin mostrar el récord.

## Tareas

- [ ] T15.1 Implementar `getRecord(key)` y `setRecord(key, value)` con try/catch.
- [ ] T15.2 Construir la clave a partir de los parámetros de configuración actuales.
- [ ] T15.3 Integrar comparación y actualización en `finishIfWon`.
- [ ] T15.4 Actualizar el HTML del diálogo de victoria para mostrar récord y mensaje condicional.
- [ ] T15.5 Crear rama `feature/033_record_local`, commits atómicos, merge en `main` y push.

## Guía de implementación

### Dependencia y puntos de integración

- No empezar hasta que T14/032 esté integrada: el valor definitivo es el contador de la partida (`moveCount`), que incluye los trasvases aún no deshechos.
- En `game.js`, `finishIfWon()` es el único punto central que abre `#victoryDialog`; úsalo para calcular y mostrar el récord una sola vez por victoria.
- `gameConfig` se establece en `startGame()`. Inspecciona su forma real antes de formar la clave: actualmente guarda `columns`, `rows` y `colors`; los valores de capacidad y capacidades distintas se leen de `fields`/`CONFIG` y deben capturarse como parte de la configuración efectiva al comenzar. No uses valores de formulario que el usuario haya cambiado después de iniciar la partida.
- El récord es local a este navegador/perfil. No añadir sincronización, migración de cuentas ni un historial de partidas.

### Identidad de la configuración

La clave usa el prefijo `botellas-record-` y distingue total de botellas, cantidad de colores, capacidad máxima y modo/cantidad de tamaños configurados. Para evitar colisiones, serializa de forma estable los valores que realmente cambian la configuración:

```text
botellas-record-v1-<total>-<colors>-<maxCapacity>-<capacityMode>-<sizeCount>
```

- `<total>` = filas × columnas (la identidad del tablero no depende de cómo se distribuyan las mismas botellas entre filas y columnas, conforme a la clave aprobada basada en total).
- `<capacityMode>` = `uniform` si todas tienen la capacidad máxima; `mixed` si se activó capacidades distintas.
- `<sizeCount>` = número seleccionado de tamaños solo en modo mixto; en modo uniforme usar `0`.
- Normalizar a enteros decimales y unir con guiones; no incluir espacios, traducciones ni valores aleatorios asignados a botellas concretas.
- La clave descrita inicialmente como `...-<sizes>` es ambigua: en esta propuesta, `<sizes>` significa cantidad de tamaños seleccionada, no la lista aleatoria de capacidades de una partida. Registrar en código el formato anterior como la interpretación estable para que partidas de una misma configuración compartan récord.

### Formato y almacenamiento

- Guardar un entero no negativo (número de movimientos), no un objeto con dependencias de la UI.
- `getRecord(key)` debe devolver `null` si no existe, si el valor no es una cadena numérica entera finita/no negativa o si se produce una excepción. No convertir `null`, cadena vacía o valores corruptos en cero: cero significaría un récord real.
- `setRecord(key, value)` devuelve `true` si `localStorage.setItem` termina, `false` ante excepción. Encapsular tanto el acceso a `window.localStorage` como las operaciones dentro de `try/catch`, porque obtener la propiedad también puede fallar.
- Usar `String(value)` al guardar y `Number.parseInt(raw, 10)` al leer; validar que `String(parsed) === raw` y que `Number.isSafeInteger(parsed) && parsed >= 0`.
- Si almacenamiento no está disponible, continuar la victoria normalmente y ocultar o dejar vacío el bloque de récord; no afirmar que se guardó.

### Comparación y estados de UI

En `finishIfWon()`, después de comprobar `isVictory()` y antes de abrir el diálogo:

1. Calcular la clave desde la configuración capturada para la partida.
2. Leer el récord anterior.
3. Si no existe, intentar guardar el contador. Si guardar tiene éxito, mostrar que es el primer récord registrado (no llamarlo «nuevo récord» comparativo); si falla, no presentar persistencia como exitosa.
4. Si existe y `moveCount < previous`, intentar guardar el nuevo valor. Mostrar «¡Nuevo récord!» solo si la escritura tuvo éxito; si falla, informar el récord previo sin afirmar que se actualizó.
5. Si `moveCount >= previous`, conservar el anterior y mostrar ambos valores. Para igualdad, puede indicarse «Igualaste el récord»; para mayor número, «Récord: X movimientos; esta partida: Y».
6. Poblar el diálogo mediante `textContent`. No interpolar números en `innerHTML`.

Usa un contenedor dedicado dentro de `#victoryDialog`, por ejemplo `#recordMessage`, con estado inicialmente oculto/vacío. Cada victoria debe sobrescribir su texto y visibilidad para evitar mensajes residuales. `undoMove()` cierra el diálogo; si el jugador gana otra vez, se vuelve a comparar usando el contador actualizado.

### Comprobaciones concretas

- Primera victoria con storage disponible almacena el número correcto bajo la misma configuración.
- Una victoria posterior con menos movimientos reemplaza el valor; una con más no lo reemplaza; una igualdad lo conserva.
- Diferentes totales, números de colores, capacidad máxima, modo uniforme/mixto o cantidad de tamaños mixtos producen claves distintas.
- El tamaño aleatorio asignado a botellas no produce una clave diferente si la configuración elegida fue la misma.
- Probar clave ausente, dato corrupto, `getItem`/`setItem` que lanzan excepción y property getter de `localStorage` que lanza: el diálogo y el juego siguen funcionando.
- Deshacer después de victoria y volver a ganar usa el conteo corregido.
- El botón de repetir inicia otra partida con la configuración actual y el récord permanece guardado.
