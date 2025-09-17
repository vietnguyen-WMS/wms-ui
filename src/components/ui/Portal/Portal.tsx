import { useEffect, useRef, useState, type ReactNode } from 'react';
import { createPortal } from 'react-dom';

export interface PortalProps {
  children: ReactNode;
  containerId: string;
}

const Portal = ({ children, containerId }: PortalProps) => {
  const portalRef = useRef<HTMLDivElement | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (typeof document === 'undefined') return;

    if (!portalRef.current) {
      portalRef.current = document.createElement('div');
    }

    let root = document.getElementById(containerId);
    if (!root) {
      root = document.createElement('div');
      root.setAttribute('id', containerId);
      document.body.appendChild(root);
    }

    const element = portalRef.current;
    root.appendChild(element);
    setMounted(true);

    return () => {
      root?.removeChild(element);
      if (root && root.childNodes.length === 0) {
        root.parentNode?.removeChild(root);
      }
      setMounted(false);
    };
  }, [containerId]);

  if (!mounted || !portalRef.current) return null;

  return createPortal(children, portalRef.current);
};

export default Portal;
