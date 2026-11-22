# Architecture

## Package shape

`src/index.ts` is the public entry. It imports `src/styles/index.css` (so the CSS lands in `dist/style.css`) and re-exports the components and tokens. `vite build` outputs ESM (`dist/index.js`) and CommonJS (`dist/index.cjs`); `tsc -p tsconfig.build.json` then emits declarations into `dist/types`. React and React DOM are externalised peer dependencies.

## Styling pipeline

1. `tokens/design-tokens.json` – source of truth.
2. `scripts/build-tokens.mjs` – generates `tokens.css`, `tokens.ts`, `tailwind.preset.cjs`.
3. `src/styles/layers.css` – declares the layer order once: `reset, tokens, base, components, utilities`.
4. `src/styles/base.css` – box-sizing reset, typography, focus ring, reduced-motion.
5. `src/components/*/Name.css` – hand-written component styles in `@layer components`, using semantic tokens only.

Because every library rule is inside a layer, any **unlayered** CSS in a consuming app overrides it without specificity fights. The playground and the library build use plain PostCSS (autoprefixer); Tailwind is only needed by consumers who want the preset.

## Component conventions

- One directory per component: `Name.tsx`, `Name.css`, `Name.test.tsx`, `index.ts`.
- Render native elements; props extend the native attributes; `className` is merged, never replaced.
- Form controls generate IDs with `useId` and connect label, hint and error through `htmlFor` / `aria-describedby` / `aria-invalid`.
- Interactive elements forward refs.
- Class names follow `ds-<component>[__element][--modifier]`.

## Testing strategy

Vitest + React Testing Library test behaviour through accessible roles and names. Token tests verify generated files are current, the Tailwind preset resolves inside Tailwind, and every text colour pair meets WCAG AA contrast.
