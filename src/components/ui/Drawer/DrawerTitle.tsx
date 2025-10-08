import React from 'react';
import clsx from 'clsx';

export type DrawerTitleProps = React.HTMLAttributes<HTMLHeadingElement>;

const DrawerTitle: React.FC<DrawerTitleProps> = ({
  children,
  className,
  ...rest
}) => {
  return (
    <h2
      className={clsx(
        'text-2xl font-semibold text-gray-900 flex-1 min-w-0 text-left',
        className
      )}
      {...rest}
    >
      {children}
    </h2>
  );
};

export default DrawerTitle;
