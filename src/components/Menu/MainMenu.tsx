import { useImperativeHandle, forwardRef } from 'react';
import { useMenu } from '../../contexts/MenuContext';
import { useUpdateIndex } from '../../hooks/useUpdateIndex';

enum MainMenuOption {
  Music = 'music',
  Extras = 'extras',
  Settings = 'settings',
  ShuffleSongs = 'nowPlaying'
}

export type MenuHandle = {
  updateIndex: (scrollDirection: string) => void;
  handleSelect: (menu: MainMenuOption) => void;
};

const MainMenu = forwardRef<MenuHandle>((props, ref) => {
  const { selectedIndex, updateIndex } = useUpdateIndex(Object.keys(MainMenuOption).length - 1);
  const { navigateToMenu, goBack } = useMenu();

  const handleSelect = (clickedButtonName: string) => {
    if (clickedButtonName === 'center-button') {
      // TODO: Go to currently selected menu
      // const selectedMenu = Object.values(MainMenuOption)[selectedIndex] as MainMenuOption;
      navigateToMenu(MainMenuOption.Music);
    } else if (clickedButtonName === 'menu-button') {
      goBack()
    }
  };

  useImperativeHandle(ref, () => ({
    updateIndex,
    handleSelect
  }));

  return (
    <div className='menu'>
      <div className='title'>
        webPod Mini
      </div>
      
      <div className="menu-items">
        <div className={`menu-item ${selectedIndex === 0 ? 'selected' : ''}`}>
          Music
        </div>
        <div className={`menu-item ${selectedIndex === 1 ? 'selected' : ''}`}>
          Extras
        </div>
        <div className={`menu-item ${selectedIndex === 2 ? 'selected' : ''}`}>
          Settings
        </div>
        <div className={`menu-item ${selectedIndex === 3 ? 'selected' : ''}`}>
          Shuffle Songs
        </div>
      </div>
    </div>
  );
});

export default MainMenu;
