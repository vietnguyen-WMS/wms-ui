import { createContext, useContext } from 'react';

interface DropdownContextProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
  menuRef: React.RefObject<HTMLDivElement | null>;
}

const DropdownContext = createContext<DropdownContextProps | null>(null);

function useDropdownContext() {
  const ctx = useContext(DropdownContext);
  if (!ctx)
    throw new Error('Dropdown.* components must be used within Dropdown');
  return ctx;
}

export { DropdownContext, useDropdownContext };
