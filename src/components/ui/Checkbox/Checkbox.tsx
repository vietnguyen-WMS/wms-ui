import React from 'react';
import clsx from 'clsx';
import type {
  CheckboxProps,
  CheckboxSizeType,
  CheckboxVariantType,
} from './Checkbox.types';

const sizeClasses: Record<CheckboxSizeType, string> = {
  xs: 'h-3 w-3',
  sm: 'h-4 w-4',
  md: 'h-5 w-5',
  lg: 'h-6 w-6',
};

const variantClasses: Record<CheckboxVariantType, string> = {
  outline: 'bg-white border-gray-300 text-blue-600 focus:ring-blue-500',
  solid: 'bg-blue-600 border-blue-600 text-white focus:ring-blue-500',
  subtle: 'bg-blue-100 border-blue-200 text-blue-600 focus:ring-blue-500',
};

const Checkbox: React.FC<CheckboxProps> = ({
  size = 'md',
  variant = 'outline',
  label,
  disabled = false,
  className,
  ...rest
}) => {
  const baseClasses = `rounded transition-colors duration-150 ${
    disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
  }`;

  return (
    <label className="inline-flex items-center">
      <input
        type="checkbox"
        disabled={disabled}
        className={clsx(
          'form-checkbox',
          baseClasses,
          sizeClasses[size],
          variantClasses[variant],
          className
        )}
        {...rest}
      />
      {label && <span className="ml-2 select-none">{label}</span>}
    </label>
  );
};

export default Checkbox;
