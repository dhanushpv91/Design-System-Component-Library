import type { HTMLAttributes } from 'react';
import { cx } from '../../utils/cx';

export type ContainerSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';

export interface ContainerProps extends HTMLAttributes<HTMLElement> {
  /** Maximum content width. Defaults to `lg` (1024px). */
  size?: ContainerSize;
  /** Element to render, e.g. `main` or `section`. Defaults to `div`. */
  as?: 'div' | 'main' | 'section' | 'article' | 'header' | 'footer' | 'nav';
}

/** Centres content and constrains its width with consistent side padding. */
export function Container({
  size = 'lg',
  as: Tag = 'div',
  className,
  children,
  ...rest
}: ContainerProps) {
  return (
    <Tag className={cx('ds-container', `ds-container--${size}`, className)} {...rest}>
      {children}
    </Tag>
  );
}
