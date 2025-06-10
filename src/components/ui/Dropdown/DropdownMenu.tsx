import React, { useId, useEffect } from "react";
import { useDropdownContext } from "./DropdownContext";

interface DropdownMenuProps {
  children: React.ReactNode;
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({ children }) => {
  const { isOpen, setIsOpen, menuRef } = useDropdownContext();
  const id = useId();

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      e.stopPropagation();
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen && menuRef.current) {
      menuRef.current.focus();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      id={`dropdown-menu-${id}`}
      role="menu"
      tabIndex={-1}
      ref={menuRef}
      onKeyDown={handleKeyDown}
      className="absolute mt-2 w-48 rounded-md shadow-lg bg-stone-900 ring-1 ring-black ring-opacity-5 z-50"
      style={{ top: "100%" }}
    >
      <div className="py-1">{children}</div>
    </div>
  );
};

export default DropdownMenu;
