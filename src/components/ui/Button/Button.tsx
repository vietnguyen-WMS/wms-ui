import React from 'react';
import clsx from 'clsx';
import type {
  ButtonVariantType,
  ButtonSizeType,
  ButtonProps,
} from './Button.types';

const variantClasses: Record<ButtonVariantType, string> = {
  primary: 'bg-blue-500 hover:bg-blue-400 text-white',
  secondary: 'bg-gray-500 hover:bg-gray-400 text-white',
  danger: 'bg-red-500 hover:bg-red-400 text-white',
  success: 'bg-green-500 hover:bg-green-400 text-white',
  warning: 'bg-orange-500 hover:bg-orange-400 text-white',
  info: 'bg-teal-500 hover:bg-teal-400 text-white',
};

const sizeClasses: Record<ButtonSizeType, string> = {
  sm: 'px-2 py-1 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg',
};

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  onClick,
  disabled,
  children,
  className,
  ...rest
}) => {
  const baseClasses = `rounded transition-colors duration-200 ${
    disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
  }`;

  return (
    <>
      <button
        onClick={onClick}
        disabled={disabled}
        className={clsx(
          baseClasses,
          sizeClasses[size],
          variantClasses[variant],
          className
        )}
        {...rest}
      >
        {children}
      </button>
    </>
  );
};

export default Button;
