import type { HTMLAttributes } from 'react';
import { cx } from '../../utils/cx';

export type BadgeVariant = 'neutral' | 'info' | 'success' | 'warning' | 'danger';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  /** Semantic colour. Meaning must also be in the text, never colour alone. */
  variant?: BadgeVariant;
}

/** A small inline status label. */
export function Badge({ variant = 'neutral', className, children, ...rest }: BadgeProps) {
  return (
    <span className={cx('ds-badge', `ds-badge--${variant}`, className)} {...rest}>
      {children}
    </span>
  );
}
