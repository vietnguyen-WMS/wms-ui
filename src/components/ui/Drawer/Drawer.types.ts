export type DrawerSize = 'xs' | 'sm' | 'md' | 'lg' | 'full';
export type DrawerPlacement = 'start' | 'end' | 'top' | 'bottom';

export interface DrawerProps extends React.HTMLAttributes<HTMLDivElement> {
  isOpen: boolean;
  onClose: () => void;
  size?: DrawerSize;
  placement?: DrawerPlacement;
  disableClickBackdrop?: boolean;
  children: React.ReactNode;
  className?: string;
  title?: string;
}
