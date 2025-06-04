import React, { useState } from "react";

type ButtonSizeType = "sm" | "md" | "lg";

interface ButtonProps {
  size?: ButtonSizeType;
  onClick?: () => void;
  disabled?: boolean;
  children?: React.ReactNode;
}

const sizeClasses: Record<ButtonSizeType, string> = {
  sm: "px-2 py-1 text-sm",
  md: "px-4 py-2 text-base",
  lg: "px-6 py-3 text-lg",
};

const disabledClasses = "opacity-50 cursor-not-allowed";

const Button: React.FC<ButtonProps> = ({
  size = "md",
  onClick,
  disabled,
  children,
}) => {
  return (
    <>
      <button
        onClick={onClick}
        disabled={disabled}
        className={`border-2 border-orange-500 rounded cursor-pointer hover:bg-orange-500 hover:text-white transition-colors duration-200 
          ${sizeClasses[size]} ${disabled ? disabledClasses : ""} `}
      >
        {children}
      </button>
    </>
  );
};

export default Button;
