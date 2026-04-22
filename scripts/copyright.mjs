/**
 * @copyright 2026 Eduardo Turcios. All rights reserved.
 * Unauthorized use, reproduction, or distribution of this file is strictly prohibited.
 */

import { readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { basename, join } from 'node:path';

const COPYRIGHT_TS = `/**
 * @copyright 2026 Eduardo Turcios. All rights reserved.
 * Unauthorized use, reproduction, or distribution of this file is strictly prohibited.
 */\n`;

function walk(dir, excludeDirs = []) {
  const files = [];
  for (const entry of readdirSync(dir)) {
    if (excludeDirs.includes(entry)) continue;
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      files.push(...walk(full, excludeDirs));
    } else {
      files.push(full);
    }
  }
  return files;
}

const apps = walk('apps')
  .filter((f) => /\.(ts|tsx)$/.test(f))
  .filter((f) => !basename(f).includes('config'));

const packages = walk('packages')
  .filter((f) => /\.(ts|tsx)$/.test(f))
  .filter((f) => !basename(f).includes('config'));

let added = 0;
let skipped = 0;

writeTS(apps);
writeTS(packages);

function writeTS(tsFiles) {
  for (const file of tsFiles) {
    const content = readFileSync(file, 'utf-8');
    if (content.includes('@copyright')) {
      skipped++;
      console.log(`Skipped (already has copyright): ${file}`);
    } else {
      writeFileSync(file, COPYRIGHT_TS + content);
      added++;
      console.log(`Added copyright: ${file}`);
    }
  }
}
