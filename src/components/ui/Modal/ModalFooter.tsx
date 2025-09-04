import React from 'react';
import clsx from 'clsx';

const ModalFooter: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  className,
  ...rest
}) => {
  return (
    <div
      className={clsx('mt-auto px-4 py-2 flex justify-end', className)}
      {...rest}
    >
      {children}
    </div>
  );
};

export default ModalFooter;
