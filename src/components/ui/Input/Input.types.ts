import type { ChangeEvent, FocusEvent } from "react";

export interface ValidationRule {
  type: "required" | "min" | "max" | "regex" | "email";
  value?: number | RegExp;
  message?: string;
}

export interface InputProps {
  type?: "text" | "password" | "email" | "number";
  size?: "sm" | "md" | "lg";
  placeholder?: string;
  value: string | number;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
  isDisabled?: boolean;
  hasIconShowPassword?: boolean;
  validationRules?: ValidationRule[];
  className?: string;
  wrapperClassName?: string;
  id?: string;
  name?: string;
}
