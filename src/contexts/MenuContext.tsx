import React, { createContext, useState, useContext, ReactNode } from 'react';

type MenuContextType = {
  menuPath: string[];
  navigateToMenu: (menu: string) => void;
  goBack: () => void;
  songPath: string;
  updateSongPath: (path: string) => void;
};

const MenuContext = createContext<MenuContextType | undefined>(undefined);

type MenuProviderProps = {
  children: ReactNode;
};

export const MenuProvider: React.FC<MenuProviderProps> = ({ children }) => {
  const [menuPath, setMenuPath] = useState<string[]>(['home']);
  const [menuHistory, setMenuHistory] = useState<string[][]>([]);
  const [songPath, setSongPath] = useState<string>('');

  const navigateToMenu = (menu: string) => {
    setMenuHistory((prev) => [...prev, menuPath]);
    setMenuPath([...menuPath, menu]);
  };

  const goBack = () => {
    setMenuHistory((prev) => {
      const newHistory = [...prev];
      const previousMenu = newHistory.pop();
      if (previousMenu) {
        setMenuPath(previousMenu);
      }
      return newHistory;
    });
  };

  const updateSongPath = (path: string) => {
    setSongPath(path);
    console.log(songPath);
  }

  return (
    <MenuContext.Provider value={{ menuPath, navigateToMenu, goBack, songPath, updateSongPath }}>
      {children}
    </MenuContext.Provider>
  );
};

export const useMenu = (): MenuContextType => {
  const context = useContext(MenuContext);
  if (!context) {
    throw new Error("useMenu must be used within a MenuProvider");
  }
  return context;
};
