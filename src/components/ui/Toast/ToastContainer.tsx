import { useToastStore } from '@/stores';
import { MAX_VISIBLE_TOASTS } from '@/constants';
import Toast from './Toast';
import type { ToastPlacement } from './Toast.types';

const placementClasses: Record<ToastPlacement, string> = {
  'top-right': 'fixed top-4 right-4 flex flex-col items-end space-y-2',
  'top-left': 'fixed top-4 left-4 flex flex-col items-start space-y-2',
  'bottom-right': 'fixed bottom-4 right-4 flex flex-col items-end space-y-2',
  'bottom-left': 'fixed bottom-4 left-4 flex flex-col items-start space-y-2',
};

const ToastContainer = () => {
  const { toasts, removeToast } = useToastStore();
  const grouped = toasts.slice(0, MAX_VISIBLE_TOASTS).reduce<Record<ToastPlacement, typeof toasts>>((acc, toast) => {
    (acc[toast.placement] ||= []).push(toast);
    return acc;
  }, {} as Record<ToastPlacement, typeof toasts>);

  return (
    <>
      {Object.entries(grouped).map(([placement, list]) => (
        <div
          key={placement}
          className={placementClasses[placement as ToastPlacement]}
          data-testid={`toast-group-${placement}`}
        >
          {list.map((toast) => (
            <Toast
              key={toast.id}
              message={toast.message}
              type={toast.type}
              duration={toast.duration}
              onClose={() => removeToast(toast.id)}
            />
          ))}
        </div>
      ))}
    </>
  );
};

export default ToastContainer;
