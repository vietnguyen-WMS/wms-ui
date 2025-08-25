import { render, screen, cleanup, act, within } from '@testing-library/react';
import { afterEach, describe, it, expect, vi } from 'vitest';

describe('ToastContainer', () => {
  afterEach(() => {
    cleanup();
    vi.resetModules();
    vi.clearAllMocks();
  });

  it('limits visible toasts when enabled', async () => {
    const { ToastContainer } = await import('.');
    const { useToastStore } = await import('@/stores');
    const { MAX_VISIBLE_TOASTS } = await import('@/constants');
    const { showToast } = useToastStore.getState();
    act(() => {
      for (let i = 0; i < MAX_VISIBLE_TOASTS + 2; i++) {
        showToast({ message: `Toast ${i}` });
      }
    });

    render(<ToastContainer />);

    expect(screen.getAllByLabelText('close-toast').length).toBe(
      MAX_VISIBLE_TOASTS,
    );
  });

  it('renders all toasts when limit disabled', async () => {
    vi.doMock('@/constants', async () => {
      const actual = await vi.importActual<typeof import('@/constants')>(
        '@/constants',
      );
      return {
        ...actual,
        LIMITED_TOAST_NUMBER: false,
      };
    });
    const { ToastContainer } = await import('.');
    const { useToastStore } = await import('@/stores');
    const { MAX_VISIBLE_TOASTS } = await import('@/constants');
    const { showToast } = useToastStore.getState();
    act(() => {
      for (let i = 0; i < MAX_VISIBLE_TOASTS + 2; i++) {
        showToast({ message: `Toast ${i}` });
      }
    });

    render(<ToastContainer />);

    expect(screen.getAllByLabelText('close-toast').length).toBe(
      MAX_VISIBLE_TOASTS + 2,
    );
  });

  it('stacks toasts vertically', async () => {
    const { ToastContainer } = await import('.');
    const { useToastStore } = await import('@/stores');
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
