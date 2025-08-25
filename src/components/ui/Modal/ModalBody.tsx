import React from 'react';
import clsx from 'clsx';

const ModalBody: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  className,
  ...rest
}) => {
  return (
    <div className={clsx('flex-1 px-4 py-2 overflow-y-auto', className)} {...rest}>
      {children}
    </div>
  );
};

export default ModalBody;
