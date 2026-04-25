/**
 * MIT License
 *
 * Copyright (c) 2025-present Eduardo Turcios.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import { readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { basename, join } from 'node:path';

const OLD_COPYRIGHT_RE =
  /^\/\*\*\n \* @copyright[\s\S]*?\*\/\n/;

const MIT_HEADER = `/**
 * MIT License
 *
 * Copyright (c) 2025-present Eduardo Turcios.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
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

let updated = 0;
let added = 0;
let skipped = 0;

processFiles(apps);
processFiles(packages);

console.log(`\nDone: ${updated} replaced, ${added} added, ${skipped} skipped.`);

function processFiles(files) {
  for (const file of files) {
    const content = readFileSync(file, 'utf-8');

    if (OLD_COPYRIGHT_RE.test(content)) {
      writeFileSync(file, content.replace(OLD_COPYRIGHT_RE, MIT_HEADER));
      updated++;
      console.log(`Replaced: ${file}`);
    } else if (content.includes('MIT License')) {
      skipped++;
      console.log(`Skipped (already MIT): ${file}`);
    } else {
      writeFileSync(file, MIT_HEADER + content);
      added++;
      console.log(`Added MIT header: ${file}`);
    }
  }
}
