export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface ToastProps {
  message: string;
  type?: ToastType;
  duration?: number;
  onClose?: () => void;
}

export type ToastPlacement =
  | 'top-right'
  | 'top-left'
  | 'bottom-right'
  | 'bottom-left';
