import React from 'react';
import clsx from 'clsx';

const DrawerBody: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  className,
  ...rest
}) => {
  return (
    <div
      className={clsx('flex-1 px-5 py-4 overflow-y-auto', className)}
      {...rest}
    >
      {children}
    </div>
  );
};

export default DrawerBody;
