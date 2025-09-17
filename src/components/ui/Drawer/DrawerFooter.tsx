import React from 'react';
import clsx from 'clsx';

const DrawerFooter: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  className,
  ...rest
}) => {
  return (
    <div
      className={clsx('px-5 py-4 border-t border-gray-100 flex justify-end gap-2', className)}
      {...rest}
    >
      {children}
    </div>
  );
};

export default DrawerFooter;
