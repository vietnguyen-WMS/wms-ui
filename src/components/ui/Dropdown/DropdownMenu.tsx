import React, { useId, useEffect, useState } from "react";
import { useDropdownContext } from "./DropdownContext";
import { createPortal } from "react-dom";

interface DropdownMenuProps {
  children: React.ReactNode;
  spaceMenuToTrigger?: number;
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({ children }) => {
  const { isOpen, setIsOpen, triggerRef, menuRef } = useDropdownContext();
  const id = useId();
  const [position, setPosition] = useState<{ top: number; left: number }>({
    top: 0,
    left: 0,
  });
  const spaceMenuToTrigger = 8;

  useEffect(() => {
    if (isOpen && menuRef.current) {
      menuRef.current.focus();
    }
  }, [isOpen, menuRef]);

  useEffect(() => {
    if (!isOpen) return;
    if (!triggerRef.current || !menuRef.current) return;

    const updatePosition = () => {
      if (triggerRef?.current) {
        const triggerRect = triggerRef.current.getBoundingClientRect();
        const menuWitdth = menuRef.current?.offsetWidth || 0;
        const menuHeight = menuRef.current?.offsetHeight || 0;
        const spaceMenuToTop = triggerRect.top;
        const spaceMenuToBottom = window.innerHeight - triggerRect.bottom;
        const spaceMenuToLeft = triggerRect.left;
        const spaceMenuToRight = window.innerWidth - triggerRect.right;

        const shouldMenuOpenAbove =
          spaceMenuToBottom < menuHeight - spaceMenuToTrigger &&
          spaceMenuToTop > menuHeight + spaceMenuToTrigger;

        const shouldMenuOpenFromRightTrigger =
          spaceMenuToRight < menuWitdth && spaceMenuToLeft > menuWitdth;

        let topPosition = shouldMenuOpenAbove
          ? triggerRect.top - menuHeight + window.scrollY - spaceMenuToTrigger
          : triggerRect.bottom + window.scrollY + spaceMenuToTrigger;

        let leftPosition = shouldMenuOpenFromRightTrigger
          ? triggerRect.right - menuWitdth + window.scrollX
          : triggerRect.left + window.scrollX;

        setPosition({
          top: topPosition,
          left: leftPosition,
        });
      }
    };

    updatePosition();

    window.addEventListener("scroll", updatePosition, true);
    window.addEventListener("resize", updatePosition);

    return () => {
      window.removeEventListener("scroll", updatePosition, true);
      window.removeEventListener("resize", updatePosition);
    };
  }, [isOpen, triggerRef]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      e.stopPropagation();
      setIsOpen(false);
    }
  };

  if (!isOpen) return null;

  return createPortal(
    <div
      id={`dropdown-menu-${id}`}
      role="menu"
      tabIndex={-1}
      ref={menuRef}
      onKeyDown={handleKeyDown}
      className="rounded-md shadow-lg bg-stone-900 ring-1 ring-stone-500/50 z-50"
      style={{
        position: "fixed",
        top: position.top,
        left: position.left,
      }}
    >
      <div className="py-1">{children}</div>
    </div>,
    document.body
  );
};

export default DropdownMenu;
