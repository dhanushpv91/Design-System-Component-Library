import { useId } from 'react';
import type { HTMLAttributes, ReactNode } from 'react';
import { cx } from '../../utils/cx';

export interface CardProps extends Omit<HTMLAttributes<HTMLElement>, 'title'> {
  /** Optional heading. When present the card is labelled by it. */
  title?: ReactNode;
  /** Heading level for `title`. Pick the level that fits the page outline. */
  headingLevel?: 2 | 3 | 4 | 5 | 6;
  /** Optional footer content such as actions. */
  footer?: ReactNode;
  /** Adds a drop shadow. */
  raised?: boolean;
}

/** A surface that groups related content. Renders a `<section>`, labelled by its title. */
export function Card({
  title,
  headingLevel = 3,
  footer,
  raised = false,
  className,
  children,
  ...rest
}: CardProps) {
  const titleId = useId();
  const Heading = `h${headingLevel}` as const;

  return (
    <section
      className={cx('ds-card', raised && 'ds-card--raised', className)}
      aria-labelledby={title ? titleId : undefined}
      {...rest}
    >
      {title && (
        <Heading className="ds-card__title" id={titleId}>
          {title}
        </Heading>
      )}
      {children}
      {footer && <div className="ds-card__footer">{footer}</div>}
    </section>
  );
}
