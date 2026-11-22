import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { createRequire } from 'node:module';
import resolveConfig from 'tailwindcss/resolveConfig';
import { flatten, resolveValue } from '../../scripts/token-lib.mjs';
import type { TokenTree } from '../../scripts/token-lib.mjs';
import { tokens } from './tokens';

const root = resolve(import.meta.dirname, '../..');
const source = JSON.parse(readFileSync(resolve(root, 'tokens/design-tokens.json'), 'utf8')) as {
  primitive: TokenTree;
  theme: Record<'light' | 'dark', TokenTree>;
};

describe('generated token files', () => {
  it('are up to date with tokens/design-tokens.json', () => {
    expect(() =>
      execFileSync('node', ['scripts/build-tokens.mjs', '--check'], { cwd: root, stdio: 'pipe' }),
    ).not.toThrow();
  });

  it('expose resolved theme colours in TypeScript', () => {
    expect(tokens.theme.light['color.action']).toBe('#4f46e5');
    expect(tokens.theme.dark['color.surface']).toBe('#0f172a');
  });

  it('define the same semantic keys in light and dark themes', () => {
    const keys = (t: TokenTree) =>
      flatten(t)
        .map(([p]) => p.join('.'))
        .sort();
    expect(keys(source.theme.dark)).toEqual(keys(source.theme.light));
  });

  it('only reference tokens that exist', () => {
    for (const theme of [source.theme.light, source.theme.dark]) {
      for (const [, value] of flatten(theme)) {
        expect(() => resolveValue(value, source.primitive)).not.toThrow();
      }
    }
  });
});

describe('Tailwind preset', () => {
  const require = createRequire(import.meta.url);
  const preset = require('../../tailwind.preset.cjs') as object;
  // Tailwind's resolved config is loosely typed; a narrow local shape keeps assertions readable.
  interface ResolvedTheme {
    colors: Record<string, Record<string, string>>;
    spacing: Record<string, string>;
    borderRadius: Record<string, string>;
  }
  const theme = resolveConfig({ presets: [preset], content: [] }).theme as unknown as ResolvedTheme;

  it('loads into Tailwind and keeps the default theme', () => {
    expect(theme.colors).toHaveProperty('brand');
    expect(theme.colors).toHaveProperty('slate'); // Tailwind default still present
  });

  it('exposes static brand palette values from the tokens', () => {
    expect(theme.colors.brand?.['600']).toBe('#4f46e5');
  });

  it('maps semantic colours and spacing to CSS variables', () => {
    expect(theme.colors.ds?.surface).toBe('var(--ds-color-surface)');
    expect(theme.spacing['ds-4']).toBe('var(--ds-space-4)');
    expect(theme.borderRadius['ds-md']).toBe('var(--ds-radius-md)');
  });
});
