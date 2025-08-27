import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import Checkbox from './Checkbox';

describe('Checkbox', () => {
  it('renders with label', () => {
    render(<Checkbox label="Accept" />);
    expect(screen.getByLabelText('Accept')).toBeInTheDocument();
  });

  it('toggles when clicked', async () => {
    const user = userEvent.setup();
    render(<Checkbox label="Agree" />);
    const checkbox = screen.getByLabelText('Agree') as HTMLInputElement;
    expect(checkbox.checked).toBe(false);
    await user.click(checkbox);
    expect(checkbox.checked).toBe(true);
  });

  it('is disabled when disabled prop is true', async () => {
    const user = userEvent.setup();
    render(<Checkbox label="Disabled" disabled />);
    const checkbox = screen.getByLabelText('Disabled') as HTMLInputElement;
    expect(checkbox).toBeDisabled();
    await user.click(checkbox);
    expect(checkbox.checked).toBe(false);
  });

  it('applies size and variant classes', () => {
    render(<Checkbox label="Size" size="lg" variant="solid" />);
    const checkbox = screen.getByLabelText('Size');
    expect(checkbox.className).toContain('h-6 w-6');
    expect(checkbox.className).toContain('bg-blue-600');
  });
});
