import { createContext, useContext } from 'react';

export interface SidebarContextValue {
  isCollapsed: boolean;
  isHoverPeek: boolean;
  toggleSidebar: () => void;
  collapseSidebar: () => void;
  expandSidebar: () => void;
  setHoverPeek: (visible: boolean) => void;
}

export const SidebarContext = createContext<SidebarContextValue | undefined>(undefined);

export const useSidebar = (): SidebarContextValue => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error('useSidebar must be used within a SidebarProvider');
  }
  return context;
};
