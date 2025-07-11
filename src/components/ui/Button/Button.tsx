import React from 'react';

type ButtonSizeType = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: ButtonSizeType;
}

const sizeClasses: Record<ButtonSizeType, string> = {
  sm: 'px-2 py-1 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg',
};

const Button: React.FC<ButtonProps> = ({
  size = 'md',
  onClick,
  disabled,
  children,
  className,
  ...rest
}) => {
  const buttonClasses = `bg-orange-500 hover:not-disabled:bg-orange-400 rounded transition-colors duration-200 ${
    disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
  }`;

  return (
    <>
      <button
        onClick={onClick}
        disabled={disabled}
        className={`${buttonClasses} ${sizeClasses[size]} ${className || ''} `}
        {...rest}
      >
        {children}
      </button>
    </>
  );
};

export default Button;
