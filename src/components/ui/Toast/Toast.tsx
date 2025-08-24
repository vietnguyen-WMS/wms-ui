import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import type { ToastProps, ToastType } from './Toast.types';

const typeClasses: Record<ToastType, string> = {
  success: 'bg-green-500 text-white',
  error: 'bg-red-500 text-white',
  warning: 'bg-yellow-500 text-black',
  info: 'bg-blue-500 text-white',
};

const icons: Record<ToastType, string> = {
  success: 'fa-solid fa-circle-check',
  error: 'fa-solid fa-circle-xmark',
  warning: 'fa-solid fa-triangle-exclamation',
  info: 'fa-solid fa-circle-info',
};

const Toast: React.FC<ToastProps> = ({
  message,
  type = 'info',
  duration = 5000,
  onClose,
}) => {
  const [isOpen, setIsOpen] = useState(true);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      handleClose();
    }, duration);

    setIsVisible(true);
    return () => clearTimeout(timer);
  }, [duration]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      setIsOpen(false);
      onClose?.();
    }, 300);
  };

  if (!isOpen) return null;

  return (
    <div
      className={clsx(
        'transition-all transform duration-300',
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'
      )}
    >
      <div
        className={clsx(
          'flex items-center space-x-2 p-4 rounded shadow',
          typeClasses[type]
        )}
      >
        <i className={clsx(icons[type])}></i>
        <span className="mr-4">{message}</span>
        <button
          onClick={handleClose}
          aria-label="close-toast"
          className="cursor-pointer"
        >
          <i className="fa-solid fa-xmark" />
        </button>
      </div>
    </div>
  );
};

export default Toast;
