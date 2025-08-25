import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import Toast from './Toast';

describe('Toast', () => {
  it('renders and closes when close button is clicked', async () => {
    const user = userEvent.setup();
    render(<Toast message="Hello" duration={10000} />);
    expect(screen.getByText('Hello')).toBeInTheDocument();
    const container = screen.getByText('Hello').parentElement?.parentElement as HTMLElement;
    await user.click(screen.getByRole('button'));
    fireEvent.transitionEnd(container);
    await waitFor(() =>
      expect(screen.queryByText('Hello')).not.toBeInTheDocument()
    );
  });

  it('closes automatically after the duration', () => {
    render(<Toast message="Auto" duration={3000} />);
    expect(screen.getByText('Auto')).toBeInTheDocument();
    const container = screen.getByText('Auto').parentElement?.parentElement as HTMLElement;
    fireEvent.animationEnd(container);
    fireEvent.transitionEnd(container);
    expect(screen.queryByText('Auto')).not.toBeInTheDocument();
  });

});
