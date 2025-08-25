import React from 'react';
import clsx from 'clsx';

const ModalFooter: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  className,
  ...rest
}) => {
  return (
    <div className={clsx('px-4 py-2 border-t', className)} {...rest}>
      {children}
    </div>
  );
};

export default ModalFooter;
