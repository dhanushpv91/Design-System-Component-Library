import { render, screen } from '@testing-library/react';
import { Badge } from './Badge';

describe('Badge', () => {
  it('renders its text with the neutral variant by default', () => {
    render(<Badge>Draft</Badge>);
    expect(screen.getByText('Draft')).toHaveClass('ds-badge', 'ds-badge--neutral');
  });

  it.each(['info', 'success', 'warning', 'danger'] as const)(
    'supports the %s variant',
    (variant) => {
      render(<Badge variant={variant}>Label</Badge>);
      expect(screen.getByText('Label')).toHaveClass(`ds-badge--${variant}`);
    },
  );

  it('passes through native attributes', () => {
    render(<Badge data-testid="badge">New</Badge>);
    expect(screen.getByTestId('badge')).toBeInTheDocument();
  });
});
