import { render, screen, cleanup, act, within } from '@testing-library/react';
import { afterEach, describe, it, expect } from 'vitest';
import { ToastContainer } from '.';
import { useToastStore, MAX_VISIBLE_TOASTS } from '@/stores';

describe('ToastContainer', () => {
  afterEach(() => {
    cleanup();
    useToastStore.setState({ toasts: [] });
  });

  it('limits visible toasts', () => {
    const { showToast } = useToastStore.getState();
    act(() => {
      for (let i = 0; i < MAX_VISIBLE_TOASTS + 2; i++) {
        showToast({ message: `Toast ${i}` });
      }
    });

    render(<ToastContainer />);

    expect(screen.getAllByLabelText('close-toast').length).toBe(
      MAX_VISIBLE_TOASTS
    );
  });

  it('stacks toasts vertically', () => {
    const { showToast } = useToastStore.getState();
    act(() => {
      showToast({ message: 'First' });
      showToast({ message: 'Second' });
    });

    render(<ToastContainer />);

    const group = screen.getByTestId('toast-group-top-right');
    const messages = within(group).getAllByText(/First|Second/);
    expect(messages[0].textContent).toBe('First');
    expect(messages[1].textContent).toBe('Second');
  });
});

