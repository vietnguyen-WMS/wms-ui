import type { HTMLAttributes, ReactNode } from 'react';

export type DrawerSize = 'xs' | 'sm' | 'md' | 'lg' | 'full';
export type DrawerPlacement = 'start' | 'end' | 'top' | 'bottom';

export interface DrawerProps extends HTMLAttributes<HTMLDivElement> {
  isOpen: boolean;
  onClose: () => void;
  size?: DrawerSize;
  placement?: DrawerPlacement;
  disableClickBackdrop?: boolean;
  children: ReactNode;
  className?: string;
}
