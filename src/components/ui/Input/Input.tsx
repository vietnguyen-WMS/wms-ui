import React, { useState } from "react";

type InputType = "text" | "password";
type InputSizeType = "sm" | "md" | "lg";

interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  type?: InputType;
  size?: InputSizeType;
  error?: string;
  showTogglePassword?: boolean;
}

const sizeClasses: Record<InputSizeType, string> = {
  sm: "px-2 py-1 text-sm",
  md: "px-4 py-2 text-base",
  lg: "px-6 py-3 text-lg",
};

const inputClasses =
  "border-2 border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-300 transition-colors duration-200";

const Input: React.FC<InputProps> = ({
  type = "text",
  size = "md",
  error,
  showTogglePassword = false,
  disabled,
  ...rest
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPasswordField = type === "password";
  const inputType =
    isPasswordField && showTogglePassword && showPassword
      ? showPassword
        ? "text"
        : "password"
      : type;

  const togglePassword = () => setShowPassword((prev) => !prev);

  return (
    <>
      <div className="block">
        <div className="relative">
          <input
            type={inputType}
            className={`${inputClasses} ${sizeClasses[size]} ${
              error
                ? "border-red-500 focus:ring-red-300"
                : "border-gray-300 focus:ring-blue-300"
            } ${disabled ? "bg-gray-100 cursor-not-allowed" : ""}`}
            autoComplete="off"
            {...rest}
          />
          {isPasswordField && showTogglePassword && (
            <button
              onClick={togglePassword}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 border-0 focus:outline-none"
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
          )}
        </div>
        {error && <p className="mt-1 ps-1 text-sm text-red-600">{error}</p>}
      </div>
    </>
  );
};

export default Input;
