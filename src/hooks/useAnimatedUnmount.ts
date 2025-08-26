import { useEffect, useState } from 'react';

export default function useAnimatedUnmount(open: boolean) {
  const [isMounted, setIsMounted] = useState(open);
  const [isVisible, setIsVisible] = useState(open);

  useEffect(() => {
    if (open) {
      setIsMounted(true);
      requestAnimationFrame(() => setIsVisible(true));
    } else {
      setIsVisible(false);
    }
  }, [open]);

  const handleAnimationEnd = () => {
    if (!isVisible) {
      setIsMounted(false);
    }
  };

  return { isMounted, isVisible, handleAnimationEnd };
}
