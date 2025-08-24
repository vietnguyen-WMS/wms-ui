import { useToastStore, MAX_VISIBLE_TOASTS } from '@/stores';
import Toast from './Toast';

const ToastContainer = () => {
  const { toasts, removeToast } = useToastStore();
  return (
    <>
      {toasts.slice(0, MAX_VISIBLE_TOASTS).map((toast) => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          duration={toast.duration}
          placement={toast.placement}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </>
  );
};

export default ToastContainer;
