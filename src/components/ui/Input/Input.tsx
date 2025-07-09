import React, {
  useState,
  useEffect,
  type ChangeEvent,
  type FocusEvent,
} from "react";

interface ValidationRule {
  type: "required" | "min" | "max" | "regex" | "email";
  value?: number | RegExp;
  message?: string;
}

interface InputProps {
  type?: "text" | "password" | "email" | "number";
  size?: "sm" | "md" | "lg";
  placeholder?: string;
  value: string | number;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  validationRules?: ValidationRule[];
  className?: string;
  wrapperClassName?: string;
  id?: string;
  name?: string;
}

const Input: React.FC<InputProps> = ({
  type = "text",
  size = "md",
  placeholder = "",
  value,
  onChange,
  onBlur,
  disabled = false,
  validationRules = [],
  className = "",
  wrapperClassName = "",
  id,
  name,
}) => {
  const [inputValue, setInputValue] = useState<string | number>(value);
  const [error, setError] = useState<string>("");
  const [isTouched, setIsTouched] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const validate = (currentValue: string | number): string => {
    const valueAsString =
      typeof currentValue === "number" ? String(currentValue) : currentValue;

    for (const rule of validationRules) {
      switch (rule.type) {
        case "required":
          if (valueAsString === null || valueAsString.trim() === "") {
            return rule.message || "This field is required.";
          }
          break;
        case "min":
          if (typeof rule.value === "number") {
            if (type === "number") {
              const numValue = parseFloat(valueAsString);
              if (!isNaN(numValue) && numValue < rule.value) {
                return rule.message || `Must be at least ${rule.value}.`;
              }
            } else if (valueAsString.length < rule.value) {
              return (
                rule.message || `Must be at least ${rule.value} characters.`
              );
            }
          }
          break;
        case "max":
          if (typeof rule.value === "number") {
            if (type === "number") {
              const numValue = parseFloat(valueAsString);
              if (!isNaN(numValue) && numValue > rule.value) {
                return rule.message || `Must be at most ${rule.value}.`;
              }
            } else if (valueAsString.length > rule.value) {
              return (
                rule.message || `Must be at most ${rule.value} characters.`
              );
            }
          }
          break;
        case "regex":
          if (rule.value instanceof RegExp && !rule.value.test(valueAsString)) {
            return rule.message || "Invalid format.";
          }
          break;
        case "email":
          if (
            valueAsString &&
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valueAsString)
          ) {
            return rule.message || "Please enter a valid email address.";
          }
          break;
        default:
          break;
      }
    }

    if (type === "number" && valueAsString !== "") {
      const numValue = parseFloat(valueAsString);
      if (isNaN(numValue)) {
        return "Please enter a valid number.";
      }
    }

    return "";
  };

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
      const validationError = validate(inputValue);
      setError(validationError);
    }
    if (onBlur) {
      onBlur(e);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const inputRenderType = type === "password" && showPassword ? "text" : type;

  const baseClasses = `
    w-full border rounded-md focus:outline-none transition duration-150 ease-in-out
    font-inter
    ${
      disabled
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
    <div className={`input ${wrapperClassName}`}>
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
          disabled={disabled}
          className={`${baseClasses} ${sizeClasses[size]} ${className} ${
            type === "password" ? "pr-10" : ""
          }`}
        />
        {type === "password" && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700"
            disabled={disabled}
          >
            <i
              className={
                showPassword ? "fa-solid fa-eye-slash" : "fa-solid fa-eye"
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
