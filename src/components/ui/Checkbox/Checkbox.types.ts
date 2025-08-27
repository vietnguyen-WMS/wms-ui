export type CheckboxSizeType = 'xs' | 'sm' | 'md' | 'lg';

export type CheckboxVariantType = 'outline' | 'solid' | 'subtle';

export interface CheckboxProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  size?: CheckboxSizeType;
  variant?: CheckboxVariantType;
  label?: React.ReactNode;
}
