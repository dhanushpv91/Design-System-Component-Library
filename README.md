# Dhanush Design System

An accessible, token-driven React component library built with **React, TypeScript, Vite and a hand-written CSS architecture**, with a generated **Tailwind preset**.

**Author:** Dhanush · **License:** MIT · **Version:** 0.1.0 (pre-release)

## Quick start

Requires Node.js 20+.

```bash
npm install
npm run dev      # component playground at http://localhost:5173 (with a dark-mode toggle)
```

## Scripts

| Script                                  | What it does                                                 |
| --------------------------------------- | ------------------------------------------------------------ |
| `npm run dev`                           | Vite playground (`index.html` + `src/demo`)                  |
| `npm run tokens:build` / `tokens:check` | Regenerate / verify CSS vars, TS tokens and Tailwind preset  |
| `npm run typecheck`                     | `tsc --noEmit`                                               |
| `npm run lint`                          | ESLint (strict, type-aware, jsx-a11y)                        |
| `npm run format:check`                  | Prettier                                                     |
| `npm test`                              | Vitest                                                       |
| `npm run build`                         | Tokens → Vite library build → type declarations into `dist/` |
| `npm run verify`                        | Everything above, in order                                   |

## Usage

```tsx
import '@dhanush/design-system/styles.css';
import { Button, Card, Input } from '@dhanush/design-system';

export function Example() {
  return (
    <Card title="Create account" raised footer={<Button>Continue</Button>}>
      <Input label="Email" type="email" hint="We never share your email." required />
    </Card>
  );
}
```

Switch theme by setting `document.documentElement.dataset.theme = 'dark'`.

### Tailwind preset

```js
// tailwind.config.cjs (consumer app, Tailwind v3)
module.exports = {
  presets: [require('@dhanush/design-system/tailwind-preset')],
  content: ['./src/**/*.{ts,tsx}'],
};
```

```html
<div class="bg-ds-surface text-ds-text rounded-ds-lg p-ds-4 shadow-ds-md">…</div>
```

## Project structure

```
tokens/design-tokens.json      source of truth for all tokens
scripts/                       token generator (build-tokens.mjs, token-lib.mjs)
src/styles/                    layers.css, tokens.css (generated), base.css, index.css
src/components/<Name>/         Name.tsx, Name.css, Name.test.tsx, index.ts
src/tokens/                    typed tokens (generated) + token/contrast tests
src/demo/                      dev-only playground, not published
tailwind.preset.cjs            generated Tailwind preset
docs/                          architecture, tokens/Figma handoff, roadmap, brief
```

## Documentation

[Project brief](docs/PROJECT_BRIEF.md) · [Architecture](docs/ARCHITECTURE.md) · [Design tokens & Figma handoff](docs/DESIGN_TOKENS.md) · [Roadmap](docs/ROADMAP.md) · [Week 1 milestone](milestones/week-1-foundation.md) · [Contributing](CONTRIBUTING.md) · [Changelog](CHANGELOG.md)

## Author

Designed and built by **Dhanush** as an independent portfolio project.
