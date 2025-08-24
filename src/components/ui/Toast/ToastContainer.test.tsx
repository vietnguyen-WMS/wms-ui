import { render, screen, cleanup, act } from '@testing-library/react';
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
});

