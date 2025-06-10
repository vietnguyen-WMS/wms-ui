import React, { useRef, useEffect, useCallback, useState } from "react";
import { DropdownContext } from "./DropdownContext";
import DropdownTrigger from "./DropdownTrigger";
import DropdownMenu from "./DropdownMenu";
import DropdownItem from "./DropdownItem";

const Dropdown = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const closeOnOutsideClick = useCallback(
    (e: MouseEvent) => {
      const target = e.target as Node;
      const clickedOutsideTrigger = !triggerRef.current?.contains(target);
      const clickedOutsideMenu = !menuRef.current?.contains(target);

      if (clickedOutsideTrigger && clickedOutsideMenu) {
        setIsOpen(false);
      }
    },
    [triggerRef, menuRef]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", closeOnOutsideClick);
    }
    return () => {
      document.removeEventListener("mousedown", closeOnOutsideClick);
    };
  }, [isOpen, closeOnOutsideClick]);

  return (
    <DropdownContext.Provider
      value={{ isOpen, setIsOpen, triggerRef, menuRef }}
    >
      <div className="relative inline-block">{children}</div>
    </DropdownContext.Provider>
  );
};

Dropdown.Trigger = DropdownTrigger;
Dropdown.Menu = DropdownMenu;
Dropdown.Item = DropdownItem;

export default Dropdown;
