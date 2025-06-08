import React from "react";

type ButtonSizeType = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: ButtonSizeType;
}

const sizeClasses: Record<ButtonSizeType, string> = {
  sm: "px-2 py-1 text-sm",
  md: "px-4 py-2 text-base",
  lg: "px-6 py-3 text-lg",
};
const buttonClasses =
  "border-2 border-orange-500 rounded cursor-pointer hover:bg-orange-500 hover:text-white transition-colors duration-200";
const disabledClasses = "opacity-50 cursor-not-allowed";

const Button: React.FC<ButtonProps> = ({
  size = "md",
  onClick,
  disabled,
  children,
  className,
  ...rest
}) => {
  return (
    <>
      <button
        onClick={onClick}
        disabled={disabled}
        className={`${buttonClasses} ${sizeClasses[size]} ${
          disabled ? disabledClasses : ""
        } ${className || ""} `}
        {...rest}
      >
        {children}
      </button>
    </>
  );
};

export default Button;
