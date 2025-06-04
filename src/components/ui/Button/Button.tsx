import React from "react";

type ButtonSizeType = "sm" | "md" | "lg";

interface ButtonProps {
  size?: ButtonSizeType;
  children?: React.ReactNode;
}

const sizeClasses: Record<ButtonSizeType, string> = {
  sm: "px-2 py-1 text-sm",
  md: "px-4 py-2 text-base",
  lg: "px-6 py-3 text-lg",
};

const Button: React.FC<ButtonProps> = ({ size = "md", children }) => {
  return (
    <>
      <button
        className={`border-2 border-orange-500 rounded cursor-pointer ${sizeClasses[size]}`}
      >
        {children}
      </button>
    </>
  );
};

export default Button;
