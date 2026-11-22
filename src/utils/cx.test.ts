import { cx } from './cx';

describe('cx', () => {
  it('joins truthy class names and skips falsy ones', () => {
    expect(cx('a', false, undefined, null, 'b')).toBe('a b');
  });

  it('returns an empty string when nothing is truthy', () => {
    expect(cx(false, undefined)).toBe('');
  });
});
