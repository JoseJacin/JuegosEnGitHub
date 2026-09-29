#!/usr/bin/env node
// Ayuda a cerrar una propuesta: muestra su estado declarado, cuántos elementos
// de checklist quedan sin marcar y qué otros documentos Markdown mencionan su
// identificador (para no olvidar actualizar PLAN, CONTEXTO e índices).
// No modifica nada. Uso: node scripts/proposal-status.mjs <ruta-al-md-de-la-propuesta>

import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, dirname, resolve, relative, extname, basename } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const IGNORED_DIRS = new Set(['.git', '.history', 'node_modules']);

const targetArg = process.argv[2];
if (!targetArg) {
  console.error('Uso: node scripts/proposal-status.mjs <ruta-al-md-de-la-propuesta>');
  console.error('Ejemplo: node scripts/proposal-status.mjs juegos/botellas-y-liquidos/propuestas/035_compartir_resultado.md');
  process.exit(1);
}

const targetPath = resolve(targetArg);
let content;
try {
  content = readFileSync(targetPath, 'utf8');
} catch {
  console.error(`No se pudo leer '${targetArg}'.`);
  process.exit(1);
}

console.log(`Archivo: ${relative(ROOT, targetPath)}`);

const estadoMatch = content.match(/^\*\*Estado:\*\*\s*(.+)$/m);
console.log(`Estado declarado: ${estadoMatch ? estadoMatch[1].trim() : '(no se encontró la línea "**Estado:**")'}`);

const items = [...content.matchAll(/^- \[( |x|X)\] (.+)$/gm)];
const pending = items.filter((m) => m[1] === ' ');
console.log(`Elementos de checklist: ${items.length} totales, ${pending.length} sin marcar.`);
for (const item of pending) console.log(`  [ ] ${item[2]}`);

const idMatch = basename(targetPath).match(/^(\d{3})/);
if (!idMatch) {
  console.log('\nNo se pudo extraer un identificador numérico de 3 dígitos del nombre de archivo; omito la búsqueda de referencias.');
  process.exit(0);
}
const id = idMatch[1];

function listMarkdownFiles(dir, out = []) {
  for (const name of readdirSync(dir)) {
    if (IGNORED_DIRS.has(name)) continue;
    const full = join(dir, name);
    const stats = statSync(full);
    if (stats.isDirectory()) listMarkdownFiles(full, out);
    else if (extname(name) === '.md') out.push(full);
  }
  return out;
}

console.log(`\nOtros documentos Markdown que mencionan "${id}" (revisa si necesitan actualizarse al cerrar esta propuesta):`);
let found = 0;
for (const file of listMarkdownFiles(ROOT)) {
  if (resolve(file) === targetPath) continue;
  const fileContent = readFileSync(file, 'utf8');
  const lines = fileContent.split('\n');
  lines.forEach((line, index) => {
    if (line.includes(id)) {
      found += 1;
      console.log(`  ${relative(ROOT, file)}:${index + 1}: ${line.trim()}`);
    }
  });
}
if (found === 0) console.log('  Ninguno.');
