export type CheckboxSizeType = 'xs' | 'sm' | 'md' | 'lg';

export type CheckboxVariantType = 'outline' | 'solid' | 'subtle';

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  size?: CheckboxSizeType;
  variant?: CheckboxVariantType;
  label?: React.ReactNode;
}
