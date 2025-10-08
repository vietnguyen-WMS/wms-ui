import React, { useEffect } from 'react';
import clsx from 'clsx';
import type { ModalProps, ModalSize, ModalPlacement } from './Modal.types';
import ModalHeader from './ModalHeader';
import ModalTitle from './ModalTitle';
import ModalBody from './ModalBody';
import ModalFooter from './ModalFooter';
import Portal from '../Portal';
import { useAnimatedUnmount } from '@/hooks';

const sizeClasses: Record<ModalSize, string> = {
  xs: 'max-w-xs',
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  cover: 'w-full h-full',
  full: 'w-full h-full',
};

const placementClasses: Record<ModalPlacement, string> = {
  top: 'items-start',
  center: 'items-center',
  bottom: 'items-end',
};

const Modal: React.FC<ModalProps> & {
  Header: typeof ModalHeader;
  Title: typeof ModalTitle;
  Body: typeof ModalBody;
  Footer: typeof ModalFooter;
} = ({
  isOpen,
  onClose,
  size = 'md',
  placement = 'center',
  scrollBehavior = 'outside',
  disableClickBackdrop = false,
  children,
  className,
  ...rest
}) => {
  const { isMounted, isVisible, handleAnimationEnd } =
    useAnimatedUnmount(isOpen);

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  if (!isMounted) return null;

  const containerClasses = clsx(
    'absolute inset-0 flex justify-center',
    size === 'cover' || size === 'full'
      ? 'items-center'
      : placementClasses[placement],
    size === 'cover' ? 'p-10' : size === 'full' ? 'p-0' : 'px-4 py-6',
    {
      'overflow-y-auto': scrollBehavior === 'outside',
      'pointer-events-none': !isVisible,
    }
  );

  const contentClasses = clsx(
    'bg-white rounded shadow-lg pointer-events-auto relative w-full flex flex-col',
    sizeClasses[size],
    {
      'max-h-full overflow-y-auto': scrollBehavior === 'inside',
    },
    isVisible ? 'modal-open' : 'modal-close',
    className
  );

  const overlayClasses = clsx(
    'fixed inset-0 bg-black/50',
    isVisible ? 'modal-overlay-open' : 'modal-overlay-close'
  );

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!disableClickBackdrop && e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <Portal containerId="modal-root">
      <div className="fixed inset-0 z-50" {...rest}>
        <div className={overlayClasses} data-testid="modal-overlay" />
        <div
          className={containerClasses}
          data-testid="modal-container"
          onMouseDown={handleBackdropClick}
        >
          <div
            className={contentClasses}
            role="dialog"
            aria-modal="true"
            data-testid="modal-content"
            onAnimationEnd={handleAnimationEnd}
          >
            <button
              type="button"
              aria-label="Close"
              onClick={onClose}
              className="absolute top-2 right-2 w-9 h-9 flex items-center justify-center text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md cursor-pointer"
              data-testid="modal-close"
            >
              <i className="fa-solid fa-xmark" />
            </button>
            {children}
          </div>
        </div>
      </div>
    </Portal>
  );
};

Modal.Header = ModalHeader;
Modal.Title = ModalTitle;
Modal.Body = ModalBody;
Modal.Footer = ModalFooter;

export default Modal;
