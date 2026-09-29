#!/usr/bin/env node
// Revisa la coherencia documental del repositorio:
//   1) enlaces relativos de Markdown que apuntan a archivos/carpetas inexistentes.
//   2) propuestas marcadas como "Implementada" que siguen en el árbol de trabajo
//      (por convención del repositorio, una vez fusionadas en main deben retirarse;
//      su contenido queda disponible en el historial de Git).
//   3) propuestas marcadas como "Implementada" que aún tienen elementos de checklist
//      sin marcar (`- [ ]`): indica que el Estado se actualizó antes de completar el
//      trabajo, o que se olvidó marcar alguna tarea/criterio ya cumplido.
// No modifica nada: solo informa. Uso: node scripts/check-docs.mjs

import { readdirSync, readFileSync, statSync, existsSync } from 'node:fs';
import { join, dirname, resolve, relative, extname, posix } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const IGNORED_DIRS = new Set(['.git', '.history', 'node_modules']);

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

function checkBrokenLinks(files) {
  const problems = [];
  const linkRe = /\]\(([^)]+)\)/g;
  for (const file of files) {
    const content = readFileSync(file, 'utf8');
    const lines = content.split('\n');
    lines.forEach((line, index) => {
      let match;
      linkRe.lastIndex = 0;
      while ((match = linkRe.exec(line))) {
        let target = match[1].trim();
        if (!target || target.startsWith('http://') || target.startsWith('https://') || target.startsWith('mailto:')) continue;
        if (target.startsWith('#')) continue; // ancla dentro del mismo documento
        target = target.split('#')[0]; // ignora el fragmento al resolver la ruta
        if (!target) continue;
        let decoded;
        try {
          decoded = decodeURIComponent(target);
        } catch {
          decoded = target; // secuencia %XX inválida: usar el texto tal cual
        }
        const resolved = decoded.startsWith('/') ? join(ROOT, decoded) : resolve(dirname(file), decoded);
        if (!existsSync(resolved)) {
          problems.push({ file: relative(ROOT, file), line: index + 1, target: match[1].trim() });
        }
      }
    });
  }
  return problems;
}

function checkProposalsState(files) {
  const orphan = [];
  const inconsistent = [];
  for (const file of files) {
    const rel = relative(ROOT, file).split('/').join(posix.sep);
    if (!rel.includes('/propuestas/')) continue;
    if (rel.endsWith('/propuestas/README.md') || rel.includes('/propuestas/archivadas/')) continue;
    const content = readFileSync(file, 'utf8');
    const estadoMatch = content.match(/^\*\*Estado:\*\*\s*(.+)$/m);
    if (!estadoMatch || !/implementada/i.test(estadoMatch[1])) continue;
    orphan.push({ file: rel, estado: estadoMatch[1].trim() });
    const pending = [...content.matchAll(/^- \[ \] (.+)$/gm)];
    if (pending.length > 0) {
      inconsistent.push({ file: rel, estado: estadoMatch[1].trim(), pending: pending.map((m) => m[1]) });
    }
  }
  return { orphan, inconsistent };
}

const files = listMarkdownFiles(ROOT);
const brokenLinks = checkBrokenLinks(files);
const { orphan: orphanProposals, inconsistent: inconsistentProposals } = checkProposalsState(files);

let fail = 0;

console.log('== Enlaces relativos rotos en Markdown ==');
if (brokenLinks.length === 0) {
  console.log('Ninguno.');
} else {
  fail = 1;
  for (const problem of brokenLinks) {
    console.log(`✗ ${problem.file}:${problem.line} -> "${problem.target}" no existe`);
  }
}

console.log('\n== Propuestas "Implementada" con checklist sin marcar (incoherencia) ==');
if (inconsistentProposals.length === 0) {
  console.log('Ninguna.');
} else {
  fail = 1;
  for (const problem of inconsistentProposals) {
    console.log(`✗ ${problem.file} (Estado: ${problem.estado}) tiene ${problem.pending.length} elemento(s) sin marcar:`);
    for (const item of problem.pending) console.log(`    [ ] ${item}`);
  }
}

console.log('\n== Propuestas marcadas como "Implementada" que siguen en el árbol de trabajo ==');
if (orphanProposals.length === 0) {
  console.log('Ninguna.');
} else {
  console.log('Si ya están fusionadas en main, retíralas del árbol de trabajo (su contenido queda en el historial de Git)');
  console.log('y comprueba que el PLAN, el CONTEXTO y el índice de propuestas de ese ámbito reflejen el resultado.');
  for (const problem of orphanProposals) {
    console.log(`• ${problem.file} (Estado: ${problem.estado})`);
  }
}

process.exit(fail);
