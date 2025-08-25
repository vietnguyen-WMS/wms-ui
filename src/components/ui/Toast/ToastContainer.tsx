import { useToastStore } from '@/stores';
import { MAX_VISIBLE_TOASTS, LIMITED_TOAST_NUMBER } from '@/constants';
import Toast from './Toast';
import type { ToastPlacement } from './Toast.types';

const baseClasses =
  'flex flex-col space-y-2 overflow-y-auto no-scrollbar max-h-[calc(100vh-2rem)]';

const placementClasses: Record<ToastPlacement, string> = {
  'top-right': `fixed top-4 right-4 items-end ${baseClasses}`,
  'top-left': `fixed top-4 left-4 items-start ${baseClasses}`,
  'bottom-right': `fixed bottom-4 right-4 items-end ${baseClasses}`,
  'bottom-left': `fixed bottom-4 left-4 items-start ${baseClasses}`,
};

const ToastContainer = () => {
  const { toasts, removeToast } = useToastStore();
  const visibleToasts = LIMITED_TOAST_NUMBER
    ? toasts.slice(0, MAX_VISIBLE_TOASTS)
    : toasts;
  const grouped = visibleToasts.reduce<Record<ToastPlacement, typeof toasts>>((acc, toast) => {
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
