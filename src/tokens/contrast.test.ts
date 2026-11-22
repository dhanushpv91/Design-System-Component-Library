import { tokens } from './tokens';

/** WCAG relative luminance of a #rrggbb colour. */
function luminance(hex: string): number {
  const channels = [1, 3, 5].map((i) => {
    const c = parseInt(hex.slice(i, i + 2), 16) / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * channels[0]! + 0.7152 * channels[1]! + 0.0722 * channels[2]!;
}

function ratio(a: string, b: string): number {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi! + 0.05) / (lo! + 0.05);
}

// [foreground, background] semantic token pairs that carry text.
const textPairs = [
  ['text', 'surface'],
  ['text', 'canvas'],
  ['text-muted', 'surface'],
  ['text-muted', 'canvas'],
  ['text-on-action', 'action'],
  ['text-on-action', 'action-hover'],
  ['text-on-action', 'danger-action'],
  ['text-on-action', 'danger-action-hover'],
  ['danger-text', 'surface'],
  ['neutral-fg', 'neutral-bg'],
  ['info-fg', 'info-bg'],
  ['success-fg', 'success-bg'],
  ['warning-fg', 'warning-bg'],
  ['danger-fg', 'danger-bg'],
] as const;

describe.each(['light', 'dark'] as const)('WCAG AA text contrast (%s theme)', (themeName) => {
  const theme = tokens.theme[themeName] as Record<string, string>;

  it.each(textPairs)('%s on %s is at least 4.5:1', (fg, bg) => {
    expect(ratio(theme[`color.${fg}`]!, theme[`color.${bg}`]!)).toBeGreaterThanOrEqual(4.5);
  });

  it('focus ring has at least 3:1 against the surface (WCAG 1.4.11)', () => {
    expect(ratio(theme['color.focus-ring']!, theme['color.surface']!)).toBeGreaterThanOrEqual(3);
  });

  it('form control border has at least 3:1 against the surface (WCAG 1.4.11)', () => {
    expect(ratio(theme['color.border-control']!, theme['color.surface']!)).toBeGreaterThanOrEqual(
      3,
    );
  });
});
