import React, { useState } from 'react';
import clsx from 'clsx';

export interface AccordionProps {
  title: string;
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

const sizeClasses: Record<NonNullable<AccordionProps['size']>, string> = {
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
};

const Accordion: React.FC<AccordionProps> = ({
  title,
  size = 'md',
  children,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="border rounded">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={clsx(
          'w-full flex justify-between items-center p-4',
          sizeClasses[size]
        )}
        aria-expanded={open}
      >
        <span>{title}</span>
        <i
          data-testid="accordion-icon"
          className={clsx('fa-solid fa-chevron-up transition-transform', {
            'rotate-180': open,
          })}
        />
      </button>
      <div
        className={clsx(
          'overflow-hidden transition-all duration-200',
          open ? 'max-h-screen' : 'max-h-0'
        )}
      >
        <div className="p-4 border-t">{children}</div>
      </div>
    </div>
  );
};

export default Accordion;
