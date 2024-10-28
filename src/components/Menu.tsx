import { useImperativeHandle, forwardRef, useRef } from 'react';
import './Menu.css'
import MainMenu from './MainMenu';
import SongsMenu from './SongsMenu';
import { useMenu } from './MenuContext';

enum MenuOption {
  Home = 'home',
  Songs = 'songs',
  Albums = 'albums',
  NowPlaying = 'nowPlaying'
}

interface MenuProps {
  scrollDirection: string | undefined;
}

export type MenuHandle = {
  updateIndex: (scrollDirection: string) => void;
  updateMenu: (clickedButtonName: string) => void;
};

const Menu = forwardRef<MenuHandle, MenuProps>((props, ref) => {
  const { menuPath } = useMenu();
  const menuRef = useRef();
  const currentMenu = menuPath[menuPath.length - 1] as MenuOption;

  const updateIndex = (scrollDirection: string) => {
    if (menuRef.current) {
      menuRef.current.updateIndex(scrollDirection);
    }
  };

  const updateMenu = (clickedButtonName: string) => {
    console.log(clickedButtonName)
    if (menuRef.current) {
      menuRef.current.handleSelect(clickedButtonName);
    }
  };

  useImperativeHandle(ref, () => ({
    updateIndex,
    updateMenu
  }));

  const renderMenuScreen = () => {
    switch (currentMenu) {
      case MenuOption.Home:
        return <MainMenu ref={menuRef} />;
      case MenuOption.Songs:
        return <SongsMenu ref={menuRef} />;  
      default:
        return <MainMenu ref={menuRef} />;
    }
  };

  return (
    <div>
      {renderMenuScreen()}
    </div>
  );
});

export default Menu;