import React from 'react';
import clsx from 'clsx';
import { useDrawerContext } from './Drawer.context';

export type DrawerCloseTriggerProps = Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  'children'
>;

const DrawerCloseTrigger: React.FC<DrawerCloseTriggerProps> = ({
  className,
  onClick,
  ...rest
}) => {
  const { onClose } = useDrawerContext();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onClick?.(event);

    if (!event.defaultPrevented) {
      onClose();
    }
  };

  return (
    <button
      type="button"
      aria-label="Close"
      data-testid="drawer-close"
      className={clsx(
        'ml-3 w-9 h-9 flex items-center justify-center text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md cursor-pointer',
        className
      )}
      onClick={handleClick}
      {...rest}
    >
      <i className="fa-solid fa-xmark" aria-hidden />
    </button>
  );
};

export default DrawerCloseTrigger;
