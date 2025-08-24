import { create } from 'zustand';
import type { ToastType, ToastPlacement } from '@/components/ui/Toast/Toast.types';

interface ToastOptions {
  id: number;
  message: string;
  type: ToastType;
  duration: number;
  placement: ToastPlacement;
}

interface ToastStore {
  toasts: ToastOptions[];
  showToast: (opts: {
    message: string;
    type?: ToastType;
    duration?: number;
    placement?: ToastPlacement;
  }) => void;
  removeToast: (id: number) => void;
}

export const useToastStore = create<ToastStore>((set) => ({
  toasts: [],
  showToast: ({
    message,
    type = 'info',
    duration = 5000,
    placement = 'top-right',
  }) => {
    const id = Date.now();
    set((state) => ({
      toasts: [...state.toasts, { id, message, type, duration, placement }],
    }));
  },
  removeToast: (id) =>
    set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) })),
}));
