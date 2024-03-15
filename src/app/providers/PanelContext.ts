import { createContext } from "react";

interface PanelContextType {
  currentPanel: {
    activePanel: string;
    setActivePanel: React.Dispatch<React.SetStateAction<string>>;
  }
}

export const PanelContext = createContext<PanelContextType>({
  currentPanel: {
    activePanel: '',
    setActivePanel: () => {}
  }
});
