import { render, screen, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import Toast from './Toast';

describe('Toast', () => {
  it('renders and closes when close button is clicked', async () => {
    const user = userEvent.setup();
    render(<Toast message="Hello" duration={10000} />);
    expect(screen.getByText('Hello')).toBeInTheDocument();
    await user.click(screen.getByRole('button'));
    await waitFor(() =>
      expect(screen.queryByText('Hello')).not.toBeInTheDocument()
    );
  });

  it('closes automatically after the duration', () => {
    vi.useFakeTimers();
    render(<Toast message="Auto" duration={3000} />);
    expect(screen.getByText('Auto')).toBeInTheDocument();
    act(() => {
      vi.advanceTimersByTime(3000);
      vi.runOnlyPendingTimers();
    });
    expect(screen.queryByText('Auto')).not.toBeInTheDocument();
    vi.useRealTimers();
  });

  it('renders in the specified placement', () => {
    render(<Toast message="Placed" placement="bottom-left" duration={10000} />);
    const container = screen.getByText('Placed').parentElement?.parentElement;
    expect(container).toHaveClass('bottom-4');
    expect(container).toHaveClass('left-4');
  });
});
