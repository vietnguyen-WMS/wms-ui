import React, { useEffect } from 'react';
import clsx from 'clsx';
import type { DrawerProps, DrawerSize, DrawerPlacement } from './Drawer.types';
import DrawerHeader from './DrawerHeader';
import DrawerBody from './DrawerBody';
import DrawerFooter from './DrawerFooter';
import { DrawerProvider } from './Drawer.context';
import Portal from '../Portal';
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

const Drawer: React.FC<DrawerProps> & {
  Header: typeof DrawerHeader;
  Body: typeof DrawerBody;
  Footer: typeof DrawerFooter;
} = ({
  isOpen,
  onClose,
  size = 'md',
  placement = 'end',
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

  return (
    <Portal containerId="drawer-root">
      <div className="fixed inset-0 z-50" {...rest}>
        <div className={overlayClasses} data-testid="drawer-overlay" />
        <div
          className={containerClasses}
          data-testid="drawer-container"
          onMouseDown={handleBackdropClick}
        >
          <DrawerProvider value={{ onClose }}>
            <div
              className={contentClasses}
              role="dialog"
              aria-modal="true"
              data-testid="drawer-content"
              onAnimationEnd={handleAnimationEnd}
            >
              {children}
            </div>
          </DrawerProvider>
        </div>
      </div>
    </Portal>
  );
};

Drawer.Header = DrawerHeader;
Drawer.Body = DrawerBody;
Drawer.Footer = DrawerFooter;

export default Drawer;
