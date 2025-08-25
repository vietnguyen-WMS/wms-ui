export type ModalSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'cover' | 'full';

export type ModalPlacement = 'center' | 'top' | 'bottom';

export type ModalScrollBehavior = 'inside' | 'outside';

export interface ModalProps extends React.HTMLAttributes<HTMLDivElement> {
  isOpen: boolean;
  onClose: () => void;
  size?: ModalSize;
  placement?: ModalPlacement;
  scrollBehavior?: ModalScrollBehavior;
}
