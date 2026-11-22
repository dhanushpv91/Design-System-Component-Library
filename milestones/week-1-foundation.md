# Week 1 — Foundation

**Planned effort:** 15–20 hours · **Status:** complete

## Delivered

- React + TypeScript + Vite project with library-mode build (ESM, CJS, CSS, types).
- Token source of truth, plus a generator for CSS variables, typed tokens and the Tailwind preset.
- Cascade layers and per-component hand-written CSS; light and dark themes.
- Button, Input, Badge, Card and Container with 74 passing tests in total.
- ESLint (strict, type-aware, jsx-a11y), Prettier, Vitest; repository documentation.

## Verification

`npm install && npm run verify` runs: token freshness check, typecheck, lint, format check, tests and the production build. All passed when this snapshot was prepared (Node 22).

## Carried to later weeks

Remaining components and the web component (Week 2), Storybook and Playwright/axe (Week 3), CI and npm release (Week 4). The Figma file is a manual task.
