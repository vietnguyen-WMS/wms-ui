import React from 'react';
import clsx from 'clsx';
import { useDrawerContext } from './Drawer.context';

export interface DrawerHeaderProps
  extends React.HTMLAttributes<HTMLDivElement> {
  title?: React.ReactNode;
  showCloseButton?: boolean;
}

const DrawerHeader: React.FC<DrawerHeaderProps> = ({
  children,
  className,
  title,
  showCloseButton = true,
  ...rest
}) => {
  const { onClose } = useDrawerContext();

  const content =
    children ??
    (title ? (
      <h2 className="text-2xl font-semibold text-gray-900">{title}</h2>
    ) : null);

  return (
    <div
      className={clsx(
        'flex items-center justify-between gap-4 px-5 py-4 border-b border-gray-100',
        className
      )}
      {...rest}
    >
      <div className="flex-1 min-w-0 text-left">{content}</div>
      {showCloseButton && (
        <button
          type="button"
          aria-label="Close"
          onClick={onClose}
          className="ml-3 w-9 h-9 flex items-center justify-center text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md cursor-pointer"
          data-testid="drawer-close"
        >
          <i className="fa-solid fa-xmark" />
        </button>
      )}
    </div>
  );
};

export default DrawerHeader;
