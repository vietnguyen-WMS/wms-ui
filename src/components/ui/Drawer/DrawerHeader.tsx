import React from 'react';
import clsx from 'clsx';

export type DrawerHeaderProps = React.HTMLAttributes<HTMLDivElement>;

const DrawerHeader: React.FC<DrawerHeaderProps> = ({
  children,
  className,
  ...rest
}) => {
  return (
    <div
      className={clsx(
        'flex items-center justify-between gap-4 px-5 py-4 border-b border-gray-100',
        className
      )}
      {...rest}
    >
      {children}
    </div>
  );
};

export default DrawerHeader;
