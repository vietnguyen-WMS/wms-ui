import { render, screen, cleanup, act, within } from '@testing-library/react';
import { afterEach, describe, it, expect, vi } from 'vitest';

describe('ToastContainer', () => {
  afterEach(() => {
    cleanup();
    vi.resetModules();
    vi.clearAllMocks();
  });

  it('renders all toasts', async () => {
    const { ToastContainer } = await import('.');
    const { useToastStore } = await import('@/stores');
    const { showToast } = useToastStore.getState();

    act(() => {
      for (let i = 0; i < 12; i++) {
        showToast({ message: `Toast ${i}` });
      }
    });

    render(<ToastContainer />);

    expect(screen.getAllByLabelText('close-toast').length).toBe(12);
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

  it('uses a scrollable container without visible scrollbar', async () => {
    const { ToastContainer } = await import('.');
    const { useToastStore } = await import('@/stores');
    const { showToast } = useToastStore.getState();
    act(() => {
      showToast({ message: 'Overflow' });
    });

    render(<ToastContainer />);

    const group = screen.getByTestId('toast-group-top-right');
    expect(group.classList.contains('overflow-y-auto')).toBe(true);
    expect(group.classList.contains('no-scrollbar')).toBe(true);
  });
});
