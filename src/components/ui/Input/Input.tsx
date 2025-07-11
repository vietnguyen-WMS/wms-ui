import React, {
  useState,
  useEffect,
  type ChangeEvent,
  type FocusEvent,
} from "react";
import type { InputProps } from "./Input.types";
import { Validate } from "./Input.utils";
import clsx from "clsx";

const Input: React.FC<InputProps> = ({
  type = "text",
  size = "md",
  placeholder = "",
  value,
  onChange,
  onBlur,
  isDisabled = false,
  hasIconShowPassword = false,
  validationRules = [],
  className = "",
  wrapperClassName = "",
  id,
  name,
  ...rest
}) => {
  const [inputValue, setInputValue] = useState<string | number>(value);
  const [error, setError] = useState<string>("");
  const [isTouched, setIsTouched] = useState<boolean>(false);
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (type === "number") {
      setInputValue(newValue === "" ? "" : parseFloat(newValue));
    } else {
      setInputValue(newValue);
    }

    if (onChange) {
      onChange(e);
    }
    if (isTouched) {
      setError("");
    }
  };

  const handleFocus = () => {
    if (!isTouched) {
      setIsTouched(true);
    }
  };

  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    if (isTouched) {
      const validationError = Validate(inputValue, validationRules, type);
      setError(validationError);
    }
    if (onBlur) {
      onBlur(e);
    }
  };

  const handleTogglePasswordVisibility = () => {
    setIsShowPassword(!isShowPassword);
  };

  const inputRenderType = type === "password" && isShowPassword ? "text" : type;

  const baseClasses = `
    w-full border rounded-md focus:outline-none transition duration-150 ease-in-out
    font-inter
    ${
      isDisabled
        ? "bg-gray-100 text-gray-400 cursor-not-allowed border-gray-200"
        : "bg-white text-gray-800 border-gray-300"
    }
    ${
      error
        ? "border-red-500 focus:ring-red-300"
        : "focus:border-blue-400 focus:ring-1 focus:ring-blue-200"
    }
  `;

  const sizeClasses = {
    sm: "px-2 py-1 text-sm",
    md: "px-3 py-2 text-base",
    lg: "px-4 py-3 text-lg",
  };

  return (
    <div className={`input-block ${wrapperClassName}`}>
      <div className="relative">
        <input
          id={id}
          name={name}
          type={inputRenderType}
          value={inputValue}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={placeholder}
          disabled={isDisabled}
          className={clsx(
            baseClasses,
            sizeClasses[size],
            className,
            type === "password" ? "pr-10" : ""
          )}
          {...rest}
        />
        {type === "password" && hasIconShowPassword && (
          <button
            type="button"
            onClick={handleTogglePasswordVisibility}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700 cursor-pointer"
            disabled={isDisabled}
          >
            <i
              className={
                isShowPassword ? "fa-solid fa-eye-slash" : "fa-solid fa-eye"
              }
            ></i>
          </button>
        )}
      </div>
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default Input;
