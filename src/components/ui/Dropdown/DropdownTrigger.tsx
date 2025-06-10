import { useId } from "react";
import { useDropdownContext } from "./DropdownContext";

interface DropdownTriggerProps {
  children: React.ReactNode;
}

const DropdownTrigger: React.FC<DropdownTriggerProps> = ({ children }) => {
  const { isOpen, setIsOpen, triggerRef } = useDropdownContext();
  const id = useId();

  const toggle = () => setIsOpen(!isOpen);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggle();
    }
  };

  return (
    <div
      role="button"
      aria-haspopup="menu"
      aria-expanded={isOpen}
      aria-controls={`dropdown-menu-${id}`}
      ref={triggerRef as React.RefObject<HTMLDivElement>}
      tabIndex={0}
      onClick={toggle}
      onKeyDown={handleKeyDown}
    >
      {children}
    </div>
  );
};

export default DropdownTrigger;
