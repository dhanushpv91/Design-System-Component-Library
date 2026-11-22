// @ts-check
// Usage: node scripts/build-tokens.mjs [--check]
// Generates src/styles/tokens.css, src/tokens/tokens.ts and tailwind.preset.cjs.
// With --check it writes nothing and exits 1 if any generated file is out of date.
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { buildCss, buildTailwindPreset, buildTs } from './token-lib.mjs';

const root = resolve(import.meta.dirname, '..');
/** @typedef {import('./token-lib.mjs').TokenTree} TokenTree */
const tokens = /** @type {{ primitive: TokenTree, theme: Record<string, TokenTree> }} */ (
  JSON.parse(readFileSync(resolve(root, 'tokens/design-tokens.json'), 'utf8'))
);

const outputs = {
  'src/styles/tokens.css': buildCss(tokens),
  'src/tokens/tokens.ts': buildTs(tokens),
  'tailwind.preset.cjs': buildTailwindPreset(tokens),
};

const check = process.argv.includes('--check');
let stale = 0;
for (const [file, content] of Object.entries(outputs)) {
  const path = resolve(root, file);
  if (check) {
    if (!existsSync(path) || readFileSync(path, 'utf8') !== content) {
      console.error(`Out of date: ${file} (run "npm run tokens:build")`);
      stale += 1;
    }
  } else {
    writeFileSync(path, content);
    console.warn(`Wrote ${file}`);
  }
}
process.exit(stale > 0 ? 1 : 0);
