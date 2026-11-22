import { render, screen } from '@testing-library/react';
import { Container } from './Container';

describe('Container', () => {
  it('defaults to a div with the lg size', () => {
    render(<Container data-testid="c">Content</Container>);
    const el = screen.getByTestId('c');
    expect(el.tagName).toBe('DIV');
    expect(el).toHaveClass('ds-container', 'ds-container--lg');
  });

  it.each(['sm', 'md', 'xl', 'full'] as const)('supports the %s size', (size) => {
    render(
      <Container size={size} data-testid="c">
        Content
      </Container>,
    );
    expect(screen.getByTestId('c')).toHaveClass(`ds-container--${size}`);
  });

  it('can render a different element for landmarks', () => {
    render(<Container as="main">Content</Container>);
    expect(screen.getByRole('main')).toBeInTheDocument();
  });
});
