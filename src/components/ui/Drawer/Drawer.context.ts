import { createContext, useContext } from 'react';

interface DrawerContextValue {
  onClose: () => void;
}

const DrawerContext = createContext<DrawerContextValue | undefined>(undefined);

export const DrawerProvider = DrawerContext.Provider;

export const useDrawerContext = () => {
  const context = useContext(DrawerContext);

  if (!context) {
    throw new Error('Drawer components must be used within a Drawer.');
  }

  return context;
};
