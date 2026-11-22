# Design tokens and Figma handoff

`tokens/design-tokens.json` is the only place token values are edited.

## Structure

- `primitive` – raw scales: `color` (brand, neutral, green, amber, red, sky), `space`, `radius`, `font`, `shadow`, `motion`.
- `theme.light` / `theme.dark` – semantic colours (`canvas`, `surface`, `border`, `border-control`, `text`, `text-muted`, `action`, `focus-ring`, status foreground/background pairs…). Values are references such as `"{color.brand.600}"`.

Components only use **semantic** tokens for colour, so the dark theme is just a different set of references.

## Generated outputs

`npm run tokens:build` writes:

| File                    | Content                                                                                                                                 |
| ----------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| `src/styles/tokens.css` | `--ds-*` custom properties in `@layer tokens` (`:root` and `[data-theme='dark']`). References become `var(--ds-…)` so themes stay live. |
| `src/tokens/tokens.ts`  | Typed `tokens` object with resolved values.                                                                                             |
| `tailwind.preset.cjs`   | Tailwind v3 preset: static palettes, `ds-*` spacing/radius/shadow/font-size, and `ds.*` semantic colours as CSS variables.              |

Never edit these by hand. `npm run tokens:check` (also run by a test) fails if they are stale.

## Naming

`--ds-<group>-<path>`, for example `--ds-color-brand-600`, `--ds-space-4`, `--ds-font-size-sm`, `--ds-color-text-muted`.

## Accessibility rules enforced by tests

- Text/background pairs: at least 4.5:1 in both themes.
- Focus ring and form-control border against the surface: at least 3:1 (WCAG 1.4.11).

## Figma handoff checklist

1. Create a Figma file named **Dhanush Design System**.
2. Create variable collections `Color` (modes: Light, Dark), `Spacing`, `Radius`, `Typography`, `Shadow`, `Motion`.
3. Copy values from the token JSON (use the same names with `/` instead of `-`).
4. Build component frames for Button, Input, Badge, Card and Container with default, hover, focus-visible, disabled, error and loading states.
5. Annotate target sizes (minimum 24×24 CSS px for WCAG 2.2), contrast, keyboard behaviour and responsive behaviour.
6. Record the file URL below.

**Figma file URL:** _not created yet_ (this repository does not claim a native Figma file exists).
