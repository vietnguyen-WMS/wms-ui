import { useDropdownContext } from "./DropdownContext";

interface DropdownItemProps {
  children: React.ReactNode;
  onClick?: () => void;
}

const DropdownItem: React.FC<DropdownItemProps> = ({ children, onClick }) => {
  const { setIsOpen } = useDropdownContext();

  const handleClick = () => {
    onClick?.();
    setIsOpen(false);
  };

  return (
    <div
      role="menuitem"
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") handleClick();
      }}
      className="cursor-pointer px-4 py-2 text-sm hover:bg-stone-600"
    >
      {children}
    </div>
  );
};

export default DropdownItem;
