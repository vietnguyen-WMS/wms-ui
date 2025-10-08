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

    let portalRoot = document.getElementById(containerId);
    if (!portalRoot) {
      portalRoot = document.createElement('div');
      portalRoot.setAttribute('id', containerId);
      document.body.appendChild(portalRoot);
    }

    const element = portalRef.current;
    portalRoot.appendChild(element);
    setMounted(true);

    return () => {
      portalRoot?.removeChild(element);
      if (portalRoot && portalRoot.childNodes.length === 0) {
        portalRoot.parentNode?.removeChild(portalRoot);
      }
      setMounted(false);
    };
  }, [containerId]);

  if (!mounted || !portalRef.current) return null;

  return createPortal(children, portalRef.current);
};

export default Portal;
