import { useState, useImperativeHandle, forwardRef } from 'react';
import { useMenu } from './MenuContext';

enum MainMenuOption {
  Songs = 'songs',
  Albums = 'albums',
  NowPlaying = 'nowPlaying'
}

export type MenuHandle = {
  updateIndex: (scrollDirection: string) => void;
  handleSelect: (menu: MainMenuOption) => void;
};

const MainMenu = forwardRef<MenuHandle>((props, ref) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { navigateToMenu, goBack } = useMenu();

  const handleSelect = (clickedButtonName: string) => {
    if (clickedButtonName === 'center-button') {
      // TODO: Go to currently selected menu
      navigateToMenu(MainMenuOption.Songs);
    } else if (clickedButtonName === 'menu-button') {
      goBack()
    }
  };

  const updateIndex = (scrollDirection: string) => {
    console.log(scrollDirection)
    
    setSelectedIndex((prev) => {
      if (scrollDirection === 'counterclockwise') {
        return prev > 0 ? prev - 1 : 0; 
      } else if (scrollDirection === 'clockwise') {
        return prev < Object.keys(MainMenuOption).length - 1 ? prev + 1 : Object.keys(MainMenuOption).length - 1;
      }
      return prev;
    });

    console.log(selectedIndex)
  };

  useImperativeHandle(ref, () => ({
    updateIndex,
    handleSelect
  }));

  return (
    <div className='menu'>
      <div className='title'>
        Main Menu
      </div>
      
      <div className="menu-items">
        <div className={`menu-item ${selectedIndex === 0 ? 'selected' : ''}`}>
          Songs
        </div>
        <div className={`menu-item ${selectedIndex === 1 ? 'selected' : ''}`}>
          Albums
        </div>
        <div className={`menu-item ${selectedIndex === 2 ? 'selected' : ''}`}>
          Now Playing
        </div>
      </div>
    </div>
  );
});

export default MainMenu;
