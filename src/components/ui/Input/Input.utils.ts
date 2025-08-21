import type { InputProps, ValidationRule } from './Input.types';

export const Validate = (
  currentValue: string | number,
  validationRules: ValidationRule[],
  inputType: InputProps['type']
): string => {
  const valueAsString =
    typeof currentValue === 'number' ? String(currentValue) : currentValue;

  for (const rule of validationRules) {
    switch (rule.type) {
      case 'required':
        if (valueAsString === null || valueAsString.trim() === '') {
          return rule.message || 'This field is required.';
        }
        break;
      case 'min':
        if (typeof rule.value === 'number') {
          if (inputType === 'number') {
            const numValue = parseFloat(valueAsString);
            if (!isNaN(numValue) && numValue < rule.value) {
              return rule.message || `Must be at least ${rule.value}.`;
            }
          } else if (valueAsString.length < rule.value) {
            return rule.message || `Must be at least ${rule.value} characters.`;
          }
        }
        break;
      case 'max':
        if (typeof rule.value === 'number') {
          if (inputType === 'number') {
            const numValue = parseFloat(valueAsString);
            if (!isNaN(numValue) && numValue > rule.value) {
              return rule.message || `Must be at most ${rule.value}.`;
            }
          } else if (valueAsString.length > rule.value) {
            return rule.message || `Must be at most ${rule.value} characters.`;
          }
        }
        break;
      case 'regex':
        if (rule.value instanceof RegExp && !rule.value.test(valueAsString)) {
          return rule.message || 'Invalid format.';
        }
        break;
      case 'email':
        if (
          valueAsString &&
          !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valueAsString)
        ) {
          return rule.message || 'Please enter a valid email address.';
        }
        break;
      default:
        break;
    }
  }

  // Specific type validation for number when no explicit rules are given, or value is not a valid number
  if (inputType === 'number' && valueAsString !== '') {
    const numValue = parseFloat(valueAsString);
    if (isNaN(numValue)) {
      return 'Please enter a valid number.';
    }
  }

  return '';
};
