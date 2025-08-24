import React, { cloneElement, isValidElement } from 'react';
import { useDropdownContext } from './DropdownContext';

interface DropdownTriggerCloseProps {
  children: React.ReactElement;
}

const DropdownTriggerClose: React.FC<DropdownTriggerCloseProps> = ({
  children,
}) => {
  const { setIsOpen } = useDropdownContext();

  if (!isValidElement(children)) {
    return null;
  }

  const element = children as React.ReactElement<{
    onClick?: (e: React.MouseEvent) => void;
  }>;
  const childOnClick = element.props.onClick;

  const handleClick = (e: React.MouseEvent) => {
    if (childOnClick) childOnClick(e);
    setIsOpen(false);
  };

  const childElementClone = cloneElement(element, {
    onClick: handleClick,
  });

  return childElementClone;
};

export default DropdownTriggerClose;
