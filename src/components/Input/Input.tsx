import { forwardRef, useId } from 'react';
import type { InputHTMLAttributes } from 'react';
import { cx } from '../../utils/cx';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  /** Visible label. Provide `aria-label` instead if the design has no visible label. */
  label?: string;
  /** Helper text, announced with the field. */
  hint?: string;
  /** Validation message. Marks the field invalid and is announced to assistive tech. */
  error?: string;
}

/** A labelled text input that wires up its hint and error text via `aria-describedby`. */
export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, hint, error, id, required, className, ...rest },
  ref,
) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const hintId = `${inputId}-hint`;
  const errorId = `${inputId}-error`;
  const describedBy = [hint && hintId, error && errorId].filter(Boolean).join(' ');

  return (
    <div className="ds-field">
      {label && (
        <label className="ds-field__label" htmlFor={inputId}>
          {label}
          {required && (
            <span className="ds-field__required" aria-hidden="true">
              *
            </span>
          )}
        </label>
      )}
      <input
        ref={ref}
        id={inputId}
        className={cx('ds-input', className)}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy || undefined}
        {...rest}
      />
      {hint && (
        <span className="ds-field__hint" id={hintId}>
          {hint}
        </span>
      )}
      {error && (
        <span className="ds-field__error" id={errorId} role="alert">
          {error}
        </span>
      )}
    </div>
  );
});
