import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
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
  const portalRef = useRef<HTMLDivElement | null>(null);

  if (!portalRef.current && typeof document !== 'undefined') {
    portalRef.current = document.createElement('div');
  }

  useEffect(() => {
    const root =
      document.getElementById('modal-root') ||
      (() => {
        const el = document.createElement('div');
        el.setAttribute('id', 'modal-root');
        document.body.appendChild(el);
        return el;
      })();
    const el = portalRef.current!;
    root.appendChild(el);
    return () => {
      root.removeChild(el);
    };
  }, []);

  useEffect(() => {
    if (isOpen) {
      setIsMounted(true);
    } else {
      const timer = setTimeout(() => setIsMounted(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

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
    size === 'cover' ? 'items-center' : placementClasses[placement],
    size === 'cover' ? 'pt-0 pb-10 px-10' : 'px-4 py-6',
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
    'fixed inset-0 bg-black/50 transition-opacity duration-300',
    isOpen ? 'opacity-100' : 'opacity-0'
  );

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isMounted || !portalRef.current) return null;

  const modal = (
    <div className="fixed inset-0 z-50" {...rest}>
      <div
        className={overlayClasses}
        onMouseDown={handleOverlayClick}
        data-testid="modal-overlay"
      />
      <div className={containerClasses} data-testid="modal-container">
        <div
          className={contentClasses}
          role="dialog"
          aria-modal="true"
          data-testid="modal-content"
        >
          {children}
        </div>
      </div>
    </div>
  );

  return createPortal(modal, portalRef.current);
};

Modal.Header = ModalHeader;
Modal.Title = ModalTitle;
Modal.Body = ModalBody;
Modal.Footer = ModalFooter;

export default Modal;
