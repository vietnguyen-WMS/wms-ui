export type ToastType = 'success' | 'error' | 'warning' | 'info';

export type ToastPlacement =
  | 'top-right'
  | 'top-left'
  | 'bottom-right'
  | 'bottom-left';

export interface ToastProps {
  message: string;
  type?: ToastType;
  duration?: number;
  placement?: ToastPlacement;
}
