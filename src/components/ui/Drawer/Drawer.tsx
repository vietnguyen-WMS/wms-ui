import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import clsx from 'clsx';
import type { DrawerProps, DrawerSize, DrawerPlacement } from './Drawer.types';
import { useAnimatedUnmount } from '@/hooks';

const widthClasses: Record<DrawerSize, string> = {
  xs: 'w-64',
  sm: 'w-80',
  md: 'w-96',
  lg: 'w-[32rem]',
  full: 'w-full',
};

const heightClasses: Record<DrawerSize, string> = {
  xs: 'h-64',
  sm: 'h-80',
  md: 'h-96',
  lg: 'h-[32rem]',
  full: 'h-full',
};

const Drawer: React.FC<DrawerProps> = ({
  isOpen,
  onClose,
  size = 'md',
  placement = 'end',
  disableClickBackdrop = false,
  children,
  className,
  title,
  ...rest
}) => {
  const { isMounted, isVisible, handleAnimationEnd } =
    useAnimatedUnmount(isOpen);
  const portalRef = useRef<HTMLDivElement | null>(null);

  if (!portalRef.current && typeof document !== 'undefined') {
    portalRef.current = document.createElement('div');
  }

  useEffect(() => {
    const root =
      document.getElementById('drawer-root') ||
      (() => {
        const el = document.createElement('div');
        el.setAttribute('id', 'drawer-root');
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
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  if (!isMounted) return null;

  const containerClasses = clsx('absolute inset-0 flex', {
    'justify-start': placement === 'start',
    'justify-end': placement === 'end',
    'items-start': placement === 'top',
    'items-end': placement === 'bottom',
    'pointer-events-none': !isVisible,
  });

  const sizeClass =
    placement === 'start' || placement === 'end'
      ? `h-full ${widthClasses[size]}`
      : `w-full ${heightClasses[size]}`;

  const animationClasses: Record<DrawerPlacement, string> = {
    start: isVisible ? 'drawer-open-start' : 'drawer-close-start',
    end: isVisible ? 'drawer-open-end' : 'drawer-close-end',
    top: isVisible ? 'drawer-open-top' : 'drawer-close-top',
    bottom: isVisible ? 'drawer-open-bottom' : 'drawer-close-bottom',
  };

  const contentClasses = clsx(
    'bg-white shadow-lg pointer-events-auto relative flex flex-col',
    sizeClass,
    animationClasses[placement],
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

  const drawer = (
    <div className="fixed inset-0 z-50" {...rest}>
      <div className={overlayClasses} data-testid="drawer-overlay" />
      <div
        className={containerClasses}
        data-testid="drawer-container"
        onMouseDown={handleBackdropClick}
      >
        <div
          className={contentClasses}
          role="dialog"
          aria-modal="true"
          data-testid="drawer-content"
          onAnimationEnd={handleAnimationEnd}
        >
          <div className="drawer-close">
            <button
              type="button"
              aria-label="Close"
              onClick={onClose}
              className="absolute top-2 right-2 w-9 h-9 flex items-center justify-center text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md cursor-pointer"
              data-testid="modal-close"
            >
              <i className="fa-solid fa-xmark" />
            </button>
          </div>
          <div className="drawer-header pl-5 pr-12 py-4">
            <h2 className="text-2xl">{title}</h2>
          </div>
          <div className="h-full">{children}</div>
        </div>
      </div>
    </div>
  );

  return portalRef.current ? createPortal(drawer, portalRef.current) : null;
};

export default Drawer;
