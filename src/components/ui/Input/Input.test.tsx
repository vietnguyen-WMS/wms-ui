import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Input from './Input';
import type { ValidationRule } from './Input.types';

describe('Input', () => {
  it('should render input component', () => {
    render(
      <Input placeholder="Enter text" value={'John'} onChange={() => {}} />
    );
    const input = screen.getByPlaceholderText('Enter text') as HTMLInputElement;
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('placeholder', 'Enter text');
    expect(input.value).toBe('John');
  });

  it('calls onChange when typing', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    render(<Input placeholder="Type here" value="" onChange={handleChange} />);

    const input = screen.getByPlaceholderText('Type here') as HTMLInputElement;
    await user.type(input, 'Hello');

    expect(handleChange).toHaveBeenCalledTimes(5); // 5 characters typed in 'Hello'
    expect(input.value).toBe('Hello');
  });

  it('can toggle password visibility', async () => {
    const user = userEvent.setup();

    render(
      <Input
        type="password"
        placeholder="Enter password"
        value=""
        onChange={() => {}}
        hasIconShowPassword
      />
    );

    const input = screen.getByPlaceholderText(
      'Enter password'
    ) as HTMLInputElement;
    const toggleButton = screen.getByRole('button');
    const toggleIcon = toggleButton.querySelector('i');

    expect(input.type).toBe('password');
    expect(toggleIcon?.className).toBe('fa-solid fa-eye');
    expect(toggleIcon).toHaveClass('fa-eye');

    await user.click(toggleButton);
    expect(input.type).toBe('text');

    await user.click(toggleButton);
    expect(input.type).toBe('password');
  });

  it('calls onBlur and shows validation error', async () => {
    const user = userEvent.setup();
    const handleBlur = vi.fn();
    const validationRules: ValidationRule[] = [
      {
        type: 'required',
        message: 'This field is required',
      },
    ];

    render(
      <Input
        placeholder="Required input"
        value=""
        onChange={() => {}}
        onBlur={handleBlur}
        validationRules={validationRules}
      />
    );

    const input = screen.getByPlaceholderText(
      'Required input'
    ) as HTMLInputElement;

    await user.click(input);
    await user.tab();
    expect(handleBlur).toHaveBeenCalled();
    expect(screen.getByText('This field is required')).toBeInTheDocument();
  });

  it('is disabled when isDisabled prop is true', () => {
    render(
      <Input
        placeholder="Disabled input"
        value=""
        onChange={() => {}}
        isDisabled={true}
      />
    );

    const input = screen.getByPlaceholderText(
      'Disabled input'
    ) as HTMLInputElement;
    expect(input).toBeDisabled();
  });
});
