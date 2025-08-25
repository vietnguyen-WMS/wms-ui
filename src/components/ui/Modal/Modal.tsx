import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import type { ModalProps, ModalSize, ModalPlacement } from './Modal.types';
import ModalHeader from './ModalHeader';
import ModalTitle from './ModalTitle';
import ModalBody from './ModalBody';
import ModalFooter from './ModalFooter';

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
  placement = 'top',
  scrollBehavior = 'outside',
  children,
  className,
  ...rest
}) => {
  const [isMounted, setIsMounted] = useState(isOpen);

  useEffect(() => {
    if (isOpen) {
      setIsMounted(true);
    } else {
      const timer = setTimeout(() => setIsMounted(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [onClose]);

  if (!isMounted) return null;

  const containerClasses = clsx(
    'absolute inset-0 flex justify-center',
    placementClasses[placement],
    size === 'cover' ? 'p-8' : 'px-4 py-6',
    {
      'overflow-y-auto': scrollBehavior === 'outside',
      'pointer-events-none': !isOpen,
    }
  );

  const contentClasses = clsx(
    'bg-white rounded shadow-lg transition-all duration-300 pointer-events-auto',
    sizeClasses[size],
    {
      'max-h-full overflow-y-auto': scrollBehavior === 'inside',
    },
    isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4',
    className
  );

  const overlayClasses = clsx(
    'fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300',
    isOpen ? 'opacity-100' : 'opacity-0'
  );

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50" {...rest}>
      <div
        className={overlayClasses}
        onMouseDown={handleOverlayClick}
        data-testid="modal-overlay"
      />
      <div className={containerClasses} data-testid="modal-container">
        <div className={contentClasses} data-testid="modal-content">
          {children}
        </div>
      </div>
    </div>
  );
};

Modal.Header = ModalHeader;
Modal.Title = ModalTitle;
Modal.Body = ModalBody;
Modal.Footer = ModalFooter;

export default Modal;
