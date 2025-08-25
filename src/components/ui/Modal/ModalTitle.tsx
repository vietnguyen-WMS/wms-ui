import React from 'react';
import clsx from 'clsx';

const ModalTitle: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = ({
  children,
  className,
  ...rest
}) => {
  return (
    <h2 className={clsx('text-lg font-semibold', className)} {...rest}>
      {children}
    </h2>
  );
};

export default ModalTitle;
