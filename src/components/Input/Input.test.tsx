import { createRef } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Input } from './Input';

describe('Input', () => {
  it('associates the label with the input', () => {
    render(<Input label="Email" />);
    expect(screen.getByLabelText('Email')).toBeInstanceOf(HTMLInputElement);
  });

  it('uses a provided id for the label association', () => {
    render(<Input label="Email" id="email-field" />);
    expect(screen.getByLabelText('Email')).toHaveAttribute('id', 'email-field');
  });

  it('describes the input with its hint', () => {
    render(<Input label="Email" hint="We never share it" />);
    expect(screen.getByLabelText('Email')).toHaveAccessibleDescription('We never share it');
  });

  it('marks the input invalid and announces the error', () => {
    render(<Input label="Email" hint="Hint" error="Enter a valid email" />);
    const input = screen.getByLabelText('Email');
    expect(input).toBeInvalid();
    expect(input).toHaveAccessibleDescription('Hint Enter a valid email');
    expect(screen.getByRole('alert')).toHaveTextContent('Enter a valid email');
  });

  it('is not invalid and has no description when there is no error or hint', () => {
    render(<Input label="Email" />);
    const input = screen.getByLabelText('Email');
    expect(input).not.toHaveAttribute('aria-invalid');
    expect(input).not.toHaveAttribute('aria-describedby');
  });

  it('sets required natively and hides the visual asterisk from assistive tech', () => {
    render(<Input label="Email" required />);
    expect(screen.getByRole('textbox', { name: 'Email' })).toBeRequired();
    expect(screen.getByText('*')).toHaveAttribute('aria-hidden', 'true');
  });

  it('accepts typed input and forwards its ref', async () => {
    const ref = createRef<HTMLInputElement>();
    render(<Input label="Name" ref={ref} />);
    await userEvent.type(screen.getByLabelText('Name'), 'Dhanush');
    expect(ref.current?.value).toBe('Dhanush');
  });

  it('passes through native attributes', () => {
    render(<Input label="Name" placeholder="Your name" disabled />);
    const input = screen.getByLabelText('Name');
    expect(input).toBeDisabled();
    expect(input).toHaveAttribute('placeholder', 'Your name');
  });
});
