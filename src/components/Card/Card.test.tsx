import { render, screen } from '@testing-library/react';
import { Card } from './Card';

describe('Card', () => {
  it('renders children', () => {
    render(<Card>Body</Card>);
    expect(screen.getByText('Body')).toBeInTheDocument();
  });

  it('is a labelled region named by its title', () => {
    render(<Card title="Billing">Body</Card>);
    expect(screen.getByRole('region', { name: 'Billing' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 3, name: 'Billing' })).toBeInTheDocument();
  });

  it('lets the heading level be chosen', () => {
    render(
      <Card title="Billing" headingLevel={2}>
        Body
      </Card>,
    );
    expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument();
  });

  it('has no heading and no accessible name without a title', () => {
    render(<Card>Body</Card>);
    expect(screen.queryByRole('heading')).not.toBeInTheDocument();
    expect(screen.queryByRole('region')).not.toBeInTheDocument();
  });

  it('renders a footer and the raised modifier', () => {
    const { container } = render(
      <Card raised footer={<button type="button">Action</button>}>
        Body
      </Card>,
    );
    expect(screen.getByRole('button', { name: 'Action' })).toBeInTheDocument();
    expect(container.firstElementChild).toHaveClass('ds-card', 'ds-card--raised');
  });
});
