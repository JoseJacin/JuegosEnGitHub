    // CONFIGURACIÓN INICIAL: valores predeterminados y límites acordados del juego.
    const CONFIG = Object.freeze({
      defaults: { columns: 4, rows: 2, colors: 4, maxCapacity: 4, differentCapacities: false, sizeCount: 2 },
      limits: { columns: [2, 10], rows: [1, 6], colors: [2, 6], maxCapacity: [2, 6], sizeCount: [2, 4] },
      generationAttempts: 15
    });

    const form = document.querySelector('#settings');
    const fields = {
      columns: document.querySelector('#columns'), rows: document.querySelector('#rows'),
      colors: document.querySelector('#colors'), maxCapacity: document.querySelector('#maxCapacity'),
      differentCapacities: document.querySelector('#differentCapacities'), sizeCount: document.querySelector('#sizeCount')
    };
    const summaryText = document.querySelector('#summaryText');
    const validation = document.querySelector('#validation');
    const sizeCountSelect = fields.sizeCount;
    let pendingGamePlan = null;
    let currentBottles = [];
    let selectedBottle = null;
    let initialBottles = [];
    let moveHistory = [];
    let gameConfig = null;
    let gameWon = false;

    function copyBottles(bottles) {
      return bottles.map((bottle) => ({ ...bottle, layers: bottle.layers.map((layer) => ({ ...layer })) }));
    }

    function updateUndoButton() {
      document.querySelector('#undo').disabled = moveHistory.length === 0;
    }

    function isVictory() {
      return currentBottles.every((bottle) => {
        if (!bottle.layers.length) return true;
        const units = bottle.layers.reduce((sum, layer) => sum + layer.units, 0);
        return units === bottle.capacity && bottle.layers.length === 1 && !bottle.open;
      });
    }

    function finishIfWon() {
      if (!isVictory()) return;
      gameWon = true;
      clearSelection();
      updateUndoButton();
      document.querySelector('#moveStatus').textContent = '¡Victoria! Todas las botellas con líquido están completas.';
      document.querySelector('#victoryDialog').showModal();
    }

    function selectGoalBottles(capacities, colorCount) {
      const total = capacities.length;
      const totalUnits = capacities.reduce((sum, capacity) => sum + capacity, 0);
      const maxInitialUnits = capacities.reduce((sum, capacity) => sum + capacity - 1, 0);
      const maxGoalUnits = Math.min(totalUnits, maxInitialUnits);
      const reachable = Array.from({ length: total }, () => new Map());
      reachable[0].set(0, null);

      capacities.forEach((capacity, index) => {
        for (let count = Math.min(index + 1, total - 1); count >= 1; count -= 1) {
          for (const [units, previous] of reachable[count - 1]) {
            const nextUnits = units + capacity;
            if (nextUnits <= maxGoalUnits && !reachable[count].has(nextUnits)) {
              reachable[count].set(nextUnits, { index, previous });
            }
          }
        }
      });

      const options = [];
      for (let count = colorCount; count < total; count += 1) {
        for (let units = total * 2; units <= maxInitialUnits; units += 1) {
          const extraCount = total - count;
          const extraUnits = totalUnits - units;
          const lowerRetained = Math.max(count * 2, units - (extraUnits - extraCount));
          const upperRetained = Math.min(units - extraCount * 2, units - extraCount);
          if (reachable[count].has(units) && lowerRetained <= upperRetained) {
            options.push({ count, units, path: reachable[count].get(units) });
          }
        }
      }
      if (!options.length) return null;
      const selected = options[Math.floor(Math.random() * options.length)];
      const indexes = [];
      for (let node = selected.path; node; node = node.previous) indexes.push(node.index);
      return { indexes, units: selected.units };
    }

    function goalSelectionCanFit(capacities, colorCount) {
      const total = capacities.length;
      if (capacities.some((capacity) => capacity < 3)) return false;
      const maxInitialUnits = capacities.reduce((sum, capacity) => sum + capacity - 1, 0);
      const reachable = Array.from({ length: total }, () => new Set());
      reachable[0].add(0);
      capacities.forEach((capacity, index) => {
        for (let count = Math.min(index + 1, total - 1); count >= 1; count -= 1) {
          for (const units of reachable[count - 1]) reachable[count].add(units + capacity);
        }
      });

      for (let count = colorCount; count < total; count += 1) {
        const extraCount = total - count;
        for (const goalUnits of reachable[count]) {
          if (goalUnits < total * 2 || goalUnits > maxInitialUnits) continue;
          const extraUnits = capacities.reduce((sum, capacity) => sum + capacity, 0) - goalUnits;
          const lowerRetained = Math.max(count * 2, goalUnits - (extraUnits - extraCount));
          const upperRetained = Math.min(goalUnits - extraCount * 2, goalUnits - extraCount);
          if (lowerRetained <= upperRetained) return true;
        }
      }
      return false;
    }

    function hasCapacityPlan(total, maxCapacity, variable, sizeCount, colors) {
      if (!variable) return goalSelectionCanFit(Array(total).fill(maxCapacity), colors);
      const sizes = [];
      function chooseSizes(next) {
        if (sizes.length === sizeCount) {
          function assignCounts(index, remaining, counts) {
            if (index === sizes.length - 1) {
              if (remaining < 1) return false;
              const capacities = [...counts, remaining].flatMap((count, i) => Array(count).fill(sizes[i]));
              return goalSelectionCanFit(capacities, colors);
            }
            const slotsAfter = sizes.length - index - 1;
            for (let count = 1; count <= remaining - slotsAfter; count += 1) {
              if (assignCounts(index + 1, remaining - count, [...counts, count])) return true;
            }
            return false;
          }
          return sizes.length <= total && assignCounts(0, total, []);
        }
        for (let size = next; size <= maxCapacity; size += 1) {
          sizes.push(size);
          if (chooseSizes(size + 1)) return true;
          sizes.pop();
        }
        return false;
      }
      return chooseSizes(3);
    }

    function fillRange(select, min, max, selected) {
      const previous = Number(select.value);
      select.replaceChildren(...Array.from({ length: max - min + 1 }, (_, i) => {
        const value = min + i;
        const option = new Option(String(value), String(value));
        option.selected = value === (previous >= min && previous <= max ? previous : selected);
        return option;
      }));
    }

    for (const key of ['columns', 'rows', 'colors', 'maxCapacity']) {
      const [min, max] = CONFIG.limits[key];
      fillRange(fields[key], min, max, CONFIG.defaults[key]);
    }
    fields.differentCapacities.checked = CONFIG.defaults.differentCapacities;

    function update() {
      const maxCapacity = Number(fields.maxCapacity.value);
      const columns = Number(fields.columns.value);
      const rows = Number(fields.rows.value);
      const colors = Number(fields.colors.value);
      const total = columns * rows;
      const enabled = fields.differentCapacities.checked;
      const availableSizes = Math.max(0, maxCapacity - 2);
      const maxSizes = Math.min(CONFIG.limits.sizeCount[1], availableSizes, total);
      document.querySelector('#sizesControl').hidden = !enabled;
      document.querySelector('#sizesHint').textContent = `Tamaños disponibles: ${Array.from({ length: availableSizes }, (_, i) => i + 3).join(', ')} unidades.`;
      fillRange(sizeCountSelect, CONFIG.limits.sizeCount[0], Math.max(CONFIG.limits.sizeCount[0], maxSizes), CONFIG.defaults.sizeCount);
      sizeCountSelect.disabled = !enabled || maxSizes < CONFIG.limits.sizeCount[0];

      const sizeCount = Number(sizeCountSelect.value);
      const messages = [];
      if (maxCapacity < 3) messages.push('La capacidad debe ser de al menos 3 unidades para que cada botella pueda empezar con dos colores y espacio libre.');
      if (colors >= total) messages.push(`Esta combinación no deja botellas libres al completar los colores. Añade al menos ${colors + 1 - total} botella${colors + 1 - total === 1 ? '' : 's'} o reduce el número de colores.`);
      if (enabled && availableSizes < CONFIG.limits.sizeCount[0]) messages.push('Para usar capacidades distintas, aumenta la capacidad máxima a 3 o más: hacen falta al menos dos tamaños disponibles.');
      if (enabled && sizeCount > maxSizes) messages.push('Reduce el número de tamaños distintos o aumenta la capacidad máxima.');
      pendingGamePlan = null;
      const capacityPlanExists = messages.length === 0 && total > 0 && colors < total
        && hasCapacityPlan(total, maxCapacity, enabled, sizeCount, colors);
      if (total > 0 && colors < total && messages.length === 0 && !capacityPlanExists) {
        if (enabled) {
          messages.push(`Con capacidades distintas no hay una asignación compatible. Cada botella necesita al menos 2 unidades de dos colores y quedar parcialmente llena; el volumen objetivo debe ser al menos ${total * 2} unidades y no superar la suma de capacidad menos una unidad por botella.`);
        } else {
          const minGoals = Math.ceil(total * 2 / maxCapacity);
          const maxGoals = Math.min(total - 1, Math.floor(total * (maxCapacity - 1) / maxCapacity));
          messages.push(`No hay un número posible de botellas objetivo. Para que cada botella empiece con al menos dos colores hacen falta al menos ${Math.max(colors, minGoals)} botellas objetivo, pero como máximo ${maxGoals} pueden empezar parcialmente llenas.`);
        }
      }

      summaryText.textContent = `${total} botellas (${rows} ${rows === 1 ? 'fila' : 'filas'} de ${columns}), ${colors} colores y ${enabled ? `capacidades entre 3 y ${maxCapacity} unidades, con ${sizeCount} tamaños distintos` : `capacidad de ${maxCapacity} unidades en todas las botellas`}.`;
      validation.classList.toggle('error', messages.length > 0);
      validation.textContent = messages.join(' ');
      validation.hidden = messages.length === 0;
      document.querySelector('#start').disabled = messages.length > 0;
    }

    form.addEventListener('change', update);
    const COLORS = ['#e87575', '#66b8e8', '#efc15e', '#aa83e0', '#62c88b', '#ed83bd'];
    const COLOR_NAMES = ['coral', 'azul', 'amarillo', 'violeta', 'verde', 'rosa'];
    const bottleGrid = document.querySelector('#bottles');

    function shuffled(values) {
      const result = [...values];
      for (let i = result.length - 1; i > 0; i -= 1) {
        const j = Math.floor(Math.random() * (i + 1));
        [result[i], result[j]] = [result[j], result[i]];
      }
      return result;
    }

    function makeColorPlan(capacities, colorCount) {
      const goalSelection = selectGoalBottles(capacities, colorCount);
      if (!goalSelection) return null;
      const goals = goalSelection.indexes.map((index) => ({ capacity: capacities[index], index }));
      const goalIndexes = new Set(goals.map((goal) => goal.index));
      const extras = capacities.map((_, index) => index).filter((index) => !goalIndexes.has(index));
      const totalUnits = goalSelection.units;
      const goalCount = goals.length;
      const extraCapacity = extras.reduce((sum, index) => sum + capacities[index] - 1, 0);
      const lowerRetained = Math.max(goalCount * 2, totalUnits - extraCapacity);
      const upperRetained = Math.min(totalUnits - extras.length * 2, totalUnits - extras.length);
      if (lowerRetained > upperRetained) return null;

      const retainedTotal = lowerRetained + Math.floor(Math.random() * (upperRetained - lowerRetained + 1));
      const retained = goals.map((goal) => ({ ...goal, units: 2, room: goal.capacity - 3 }));
      let retainedLeft = retainedTotal - retained.length * 2;
      for (const goal of shuffled(retained)) {
        const add = Math.min(goal.room, retainedLeft);
        goal.units += add;
        retainedLeft -= add;
      }

      const extraFill = extras.map((index) => ({ index, units: 2, room: capacities[index] - 3 }));
      let extraLeft = totalUnits - retainedTotal - extras.length * 2;
      for (const bottle of shuffled(extraFill)) {
        const add = Math.min(bottle.room, extraLeft);
        bottle.units += add;
        extraLeft -= add;
      }
      if (retainedLeft || extraLeft) return null;
      return { goals, retained, extras, extraFill, goalIndexes, totalUnits };
    }

    function findCapacityPlan(total, maxCapacity, variable, sizeCount, colors) {
      if (!variable) {
        const capacities = Array(total).fill(maxCapacity);
        const plan = makeColorPlan(capacities, colors);
        return plan ? { capacities, plan } : null;
      }
      const sizeSets = [];
      function chooseSizes(next, chosen) {
        if (chosen.length === sizeCount) { sizeSets.push(chosen); return; }
        for (let size = Math.max(next, 3); size <= maxCapacity; size += 1) chooseSizes(size + 1, [...chosen, size]);
      }
      chooseSizes(2, []);
      for (const sizes of shuffled(sizeSets)) {
        if (sizes.length > total) continue;
        function assignCounts(index, remaining, counts) {
          if (index === sizes.length - 1) {
            if (remaining < 1) return null;
            const capacities = shuffled([...counts, remaining].flatMap((count, i) => Array(count).fill(sizes[i])));
            if (!goalSelectionCanFit(capacities, colors)) return null;
            const plan = makeColorPlan(capacities, colors);
            return plan ? { capacities, plan } : null;
          }
          const slotsAfter = sizes.length - index - 1;
          const countsToTry = shuffled(Array.from({ length: remaining - slotsAfter }, (_, i) => i + 1));
          for (const count of countsToTry) {
            const found = assignCounts(index + 1, remaining - count, [...counts, count]);
            if (found) return found;
          }
          return null;
        }
        const found = assignCounts(0, total, []);
        if (found) return found;
      }
      return null;
    }

    function makeGame() {
      const columns = Number(fields.columns.value);
      const rows = Number(fields.rows.value);
      const total = columns * rows;
      const colors = Number(fields.colors.value);
      const maxCapacity = Number(fields.maxCapacity.value);
      let capacityPlan = pendingGamePlan;
      for (let attempt = 0; !capacityPlan && attempt < CONFIG.generationAttempts; attempt += 1) {
        capacityPlan = findCapacityPlan(total, maxCapacity, fields.differentCapacities.checked, Number(fields.sizeCount.value), colors);
      }
      if (!capacityPlan) {
        validation.classList.add('error');
        validation.textContent = 'No se encontró una asignación resoluble para esta combinación. Cambia la configuración e inténtalo de nuevo.';
        validation.hidden = false;
        return;
      }
      const { capacities, plan } = capacityPlan;
      const palette = shuffled(COLORS.slice(0, colors));
      const bottles = Array.from({ length: total }, (_, index) => ({ id: index, capacity: capacities[index], layers: [], open: true, goalColor: null }));
      const goalColors = shuffled([...palette, ...Array.from({ length: plan.goals.length - colors }, () => palette[Math.floor(Math.random() * palette.length)])]);
      const remainingByColor = new Map();
      plan.goals.forEach((goal, colorIndex) => {
        const color = goalColors[colorIndex];
        remainingByColor.set(color, (remainingByColor.get(color) || 0) + goal.capacity);
      });

      const initialUnits = new Map(plan.retained.map((item) => [item.index, item.units]));
      plan.extraFill.forEach((item) => initialUnits.set(item.index, item.units));
      const slots = shuffled([...initialUnits].flatMap(([index, units]) => Array(units).fill(index)));
      let assigned = null;
      for (let attempt = 0; attempt < 500; attempt += 1) {
        const colorUnits = shuffled([...remainingByColor].flatMap(([color, units]) => Array(units).fill(color)));
        if (colorUnits.length !== slots.length || colorUnits.some((color) => !color)) continue;
        const candidate = new Map(bottles.map((_, index) => [index, new Map()]));
        slots.forEach((index, slot) => {
          const counts = candidate.get(index);
          const color = colorUnits[slot];
          counts.set(color, (counts.get(color) || 0) + 1);
        });
        if ([...candidate.values()].every((counts) => counts.size >= 2)) { assigned = candidate; break; }
      }
      if (!assigned) {
        validation.classList.add('error');
        validation.textContent = 'No se pudo generar una distribución con dos colores por botella para esta combinación. Prueba con más capacidad o más colores.';
        validation.hidden = false;
        return;
      }
      for (let index = 0; index < total; index += 1) {
        bottles[index].layers = shuffled([...assigned.get(index)]).map(([color, units]) => ({ color, units }));
      }
      gameConfig = { columns, rows, colors };
      currentBottles = shuffled(bottles);
      initialBottles = copyBottles(currentBottles);
      moveHistory = [];
      gameWon = false;
      document.querySelector('#victoryDialog').close();
      renderGame();
    }

    function renderGame() {
      selectedBottle = null;
      bottleGrid.replaceChildren();
      bottleGrid.style.setProperty('--bottle-columns', gameConfig.columns);
      bottleGrid.style.setProperty('--bottle-rows', gameConfig.rows);
      currentBottles.forEach((bottle, index) => {
        const item = document.createElement('div');
        item.className = `bottle${bottle.open ? '' : ' closed done'}`;
        item.setAttribute('role', 'button');
        item.tabIndex = 0;
        item.dataset.bottleId = String(bottle.id);
        item.setAttribute('aria-pressed', 'false');
        item.setAttribute('aria-keyshortcuts', 'Enter Space');
        const position = index + 1;
        const glass = document.createElement('div');
        glass.className = 'glass';
        glass.dataset.capacity = String(bottle.capacity);
        const contents = bottle.layers.map((layer) => `${layer.units} unidad${layer.units === 1 ? '' : 'es'} ${COLOR_NAMES[COLORS.indexOf(layer.color)] || 'de color personalizado'}`).join(', ');
        const description = bottle.layers.length ? `Posición ${position}, botella ${bottle.id + 1}: capas desde abajo: ${contents}; capacidad ${bottle.capacity} unidades${bottle.open ? ', abierta' : ', completada y cerrada'}` : `Posición ${position}, botella ${bottle.id + 1}: vacía, capacidad ${bottle.capacity} unidades`;
        item.setAttribute('aria-label', description);
        let bottomUnits = 0;
        const liquids = bottle.layers.map((layer) => {
          const liquid = document.createElement('span');
          liquid.className = 'liquid';
          liquid.style.bottom = `${bottomUnits / bottle.capacity * 100}%`;
          liquid.style.height = `${layer.units / bottle.capacity * 100}%`;
          liquid.style.background = layer.color;
          liquid.dataset.color = layer.color;
          liquid.dataset.units = String(layer.units);
          bottomUnits += layer.units;
          return liquid;
        });
        glass.append(...liquids);
        if (!bottle.open) {
          const cork = document.createElement('span');
          cork.className = 'cork';
          cork.setAttribute('aria-hidden', 'true');
          item.append(cork);
        }
        const meta = document.createElement('span');
        meta.className = 'bottle-meta';
        const contentsLabel = document.createElement('span');
        contentsLabel.textContent = bottle.layers.length ? `${bottle.layers.reduce((sum, layer) => sum + layer.units, 0)}/${bottle.capacity}` : `0/${bottle.capacity}`;
        meta.append(contentsLabel);
        if (!bottle.open) {
          const check = document.createElement('span');
          check.className = 'bottle-closed-check';
          check.textContent = '✓';
          check.setAttribute('aria-hidden', 'true');
          meta.append(check);
        }
        glass.append(meta);
        item.append(glass);
        bottleGrid.append(item);
      });
      updateUndoButton();
      form.hidden = true;
      document.querySelector('#game').hidden = false;
      setMoveStatus('Selecciona una botella con líquido para empezar a verter.', false);
    }

    function setMoveStatus(message, isError, poured = null) {
      const status = document.querySelector('#moveStatus');
      status.replaceChildren();
      if (poured) {
        const quantity = document.createElement('span');
        quantity.textContent = String(poured.units);
        const square = document.createElement('span');
        square.className = 'poured-color';
        square.style.backgroundColor = poured.color;
        square.setAttribute('aria-hidden', 'true');
        const spoken = document.createElement('span');
        spoken.className = 'sr-only';
        const colorName = COLOR_NAMES[COLORS.indexOf(poured.color)] || 'color';
        spoken.textContent = `${poured.units} ${poured.units === 1 ? 'unidad vertida' : 'unidades vertidas'}, color ${colorName}.`;
        status.append(quantity, square, spoken);
      } else {
        status.textContent = message;
      }
      status.classList.toggle('error', isError);
    }

    function setMoveError(message, symbol) {
      const status = document.querySelector('#moveStatus');
      const icon = document.createElement('span');
      icon.className = 'move-error-icon';
      icon.textContent = symbol;
      icon.setAttribute('aria-hidden', 'true');
      const label = document.createElement('span');
      label.textContent = message;
      status.replaceChildren(icon, label);
      status.classList.add('error');
    }

    function clearSelection() {
      selectedBottle = null;
      bottleGrid.querySelectorAll('.bottle.selected').forEach((item) => {
        item.classList.remove('selected');
        item.setAttribute('aria-pressed', 'false');
      });
    }

    function handleBottleChoice(bottleId) {
      if (gameWon) return;
      const chosen = currentBottles.find((bottle) => bottle.id === bottleId);
      if (!chosen) return;
      if (selectedBottle === null) {
        if (!chosen.open || !chosen.layers.length) {
          setMoveError(!chosen.open ? 'Botella cerrada' : 'Botella vacía', '✕');
          return;
        }
        selectedBottle = bottleId;
        const item = bottleGrid.querySelector(`[data-bottle-id="${bottleId}"]`);
        item.classList.add('selected');
        item.setAttribute('aria-pressed', 'true');
        setMoveStatus('', false);
        return;
      }

      if (selectedBottle === bottleId) {
        clearSelection();
        setMoveStatus('Selección cancelada.', false);
        return;
      }

      const source = currentBottles.find((bottle) => bottle.id === selectedBottle);
      const sourceTop = source.layers[source.layers.length - 1];
      const occupied = chosen.layers.reduce((sum, layer) => sum + layer.units, 0);
      const free = chosen.capacity - occupied;
      if (!source.open || !sourceTop) {
        clearSelection();
        setMoveStatus('El origen ya no contiene líquido abierto.', true);
        return;
      }
      if (free <= 0) {
        clearSelection();
        setMoveError('Botella llena', '!');
        return;
      }
      if (!chosen.open) {
        clearSelection();
        setMoveError('Botella cerrada', '✕');
        return;
      }
      const destinationTop = chosen.layers[chosen.layers.length - 1];
      if (destinationTop && destinationTop.color !== sourceTop.color) {
        clearSelection();
        setMoveError('Color no coincidente', '≠');
        return;
      }

      moveHistory.push(copyBottles(currentBottles));
      updateUndoButton();
      const moved = Math.min(sourceTop.units, free);
      const movedColor = sourceTop.color;
      sourceTop.units -= moved;
      if (sourceTop.units === 0) source.layers.pop();
      if (destinationTop) destinationTop.units += moved;
      else chosen.layers.push({ color: movedColor, units: moved });
      const destinationUnits = chosen.layers.reduce((sum, layer) => sum + layer.units, 0);
      if (destinationUnits === chosen.capacity && chosen.layers.length === 1) chosen.open = false;
      if (!chosen.open) {
        currentBottles = [...currentBottles.filter((bottle) => !bottle.open), ...currentBottles.filter((bottle) => bottle.open)];
      }
      clearSelection();
      renderGame();
      setMoveStatus('', false, { units: moved, color: movedColor });
      finishIfWon();
    }

    function undoMove() {
      if (!moveHistory.length) return;
      gameWon = false;
      document.querySelector('#victoryDialog').close();
      currentBottles = moveHistory.pop();
      renderGame();
      setMoveStatus('Se ha deshecho el último movimiento.', false);
      updateUndoButton();
    }

    function restartGame() {
      if (!initialBottles.length) return;
      currentBottles = copyBottles(initialBottles);
      moveHistory = [];
      gameWon = false;
      document.querySelector('#victoryDialog').close();
      renderGame();
      setMoveStatus('Partida reiniciada a su disposición inicial.', false);
    }

    function showSettings() {
      document.querySelector('#victoryDialog').close();
      document.querySelector('#game').hidden = true;
      form.hidden = false;
    }

    function diagnosticReportText() {
      const round = (value) => Number(value.toFixed(2));
      const lines = [
        `Botellas y líquidos · diagnóstico`,
        `Viewport=${window.innerWidth}x${window.innerHeight} DPR=${window.devicePixelRatio} botellas=${bottleGrid.children.length}`
      ];
      [...bottleGrid.children].forEach((item, index) => {
        const glass = item.querySelector('.glass');
        const glassRect = glass.getBoundingClientRect();
        const style = getComputedStyle(glass);
        const innerTop = glassRect.top + parseFloat(style.borderTopWidth);
        const innerBottom = glassRect.bottom - parseFloat(style.borderBottomWidth);
        const innerHeight = innerBottom - innerTop;
        let expectedBottomUnits = 0;
        const capacity = Number(glass.dataset.capacity);
        const layers = [...glass.querySelectorAll('.liquid')].map((element) => {
          const rect = element.getBoundingClientRect();
          const layer = {
            color: element.dataset.color,
            units: Number(element.dataset.units),
            rect,
            top: rect.top - innerTop,
            bottom: innerBottom - rect.bottom,
            height: rect.height,
            expectedBottom: innerHeight * expectedBottomUnits / capacity,
            expectedHeight: innerHeight * Number(element.dataset.units) / capacity
          };
          expectedBottomUnits += layer.units;
          return layer;
        });
        const filled = layers.reduce((sum, layer) => sum + layer.units, 0);
        const topFree = layers.length ? layers[layers.length - 1].top : innerHeight;
        const bottomFree = layers.length ? layers[0].bottom : innerHeight;
        const gaps = layers.slice(0, -1).map((layer, layerIndex) => round(layer.rect.top - layers[layerIndex + 1].rect.bottom));
        const stack = layers.map((layer) => `${layer.color}:${layer.units}u b${round(layer.bottom)}/${round(layer.expectedBottom)} h${round(layer.height)}/${round(layer.expectedHeight)}px`).join(',') || 'vacía';
        lines.push(`B${index + 1} cap=${glass.dataset.capacity} fill=${filled}/${glass.dataset.capacity} inner=${round(innerHeight)}px topFree=${round(topFree)}px bottomFree=${round(bottomFree)}px gaps=[${gaps.join(',')}] stack(bottom→top)=[${stack}]`);
      });
      return lines.join('\n');
    }

    async function copyDiagnostics() {
      const report = diagnosticReportText();
      const status = document.querySelector('#diagnosticsStatus');
      const reportElement = document.querySelector('#diagnosticReport');
      reportElement.textContent = report;
      reportElement.hidden = true;
      status.hidden = false;
      try {
        if (!navigator.clipboard?.writeText) throw new Error('Clipboard API unavailable');
        await navigator.clipboard.writeText(report);
        status.textContent = 'Diagnóstico copiado. Pégalo aquí en el chat.';
      } catch {
        reportElement.hidden = false;
        status.textContent = 'No se pudo copiar automáticamente. El diagnóstico queda visible para seleccionarlo y copiarlo.';
        reportElement.focus();
        const selection = window.getSelection();
        const range = document.createRange();
        range.selectNodeContents(reportElement);
        selection.removeAllRanges();
        selection.addRange(range);
      }
    }

    document.querySelector('#start').addEventListener('click', makeGame);
    document.querySelector('#undo').addEventListener('click', undoMove);
    document.querySelector('#undoVictory').addEventListener('click', undoMove);
    document.querySelector('#restart').addEventListener('click', restartGame);
    document.querySelector('#repeatGame').addEventListener('click', makeGame);
    document.querySelector('#changeAfterWin').addEventListener('click', showSettings);
    bottleGrid.addEventListener('click', (event) => {
      const item = event.target.closest('.bottle[data-bottle-id]');
      if (item) handleBottleChoice(Number(item.dataset.bottleId));
    });
    bottleGrid.addEventListener('keydown', (event) => {
      if (event.key !== 'Enter' && event.key !== ' ') return;
      const item = event.target.closest('.bottle[data-bottle-id]');
      if (!item) return;
      event.preventDefault();
      handleBottleChoice(Number(item.dataset.bottleId));
    });
    document.querySelector('#copyDiagnostics').addEventListener('click', copyDiagnostics);
    document.querySelector('#editSettings').addEventListener('click', () => {
      showSettings();
    });
    update();
