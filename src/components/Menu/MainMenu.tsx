import { useImperativeHandle, forwardRef } from 'react';
import { SongOption } from '../../constants/songOptions';
import { useAudio } from '../../contexts/AudioContext';
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
  handleSelect: (clickedButtonName: string) => void;
};

const MainMenu = forwardRef<MenuHandle>((props, ref) => {
  const { selectedIndex, updateIndex } = useUpdateIndex(Object.keys(MainMenuOption).length - 1);
  const { restartSong } = useAudio();
  const { navigateToMenu, goBack, setSongPath } = useMenu();

  const handleSelect = (clickedButtonName: string) => {
    if (clickedButtonName === 'center-button') {

      if (selectedIndex === 0) {
        navigateToMenu(MainMenuOption.Music);
      }

      if (selectedIndex === 1) {
        navigateToMenu(MainMenuOption.Extras);
      }

      if (selectedIndex === 2) {
        navigateToMenu(MainMenuOption.Music);
      }

      // If Shuffle Songs was selected, first set a random song
      if (selectedIndex === 3) {
        const randomIndex = Math.floor(Math.random() * 2); // random number between 0 and 1
        const selectedSong = Object.values(SongOption)[randomIndex] as SongOption;
        setSongPath(selectedSong)
        restartSong();
        navigateToMenu(MainMenuOption.ShuffleSongs);
      }
      
      
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
          <span className="chevron right"></span>
        </div>
        <div className={`menu-item ${selectedIndex === 1 ? 'selected' : ''}`}>
          Extras
          <span className="chevron right"></span>
        </div>
        <div className={`menu-item ${selectedIndex === 2 ? 'selected' : ''}`}>
          Settings
          <span className="chevron right"></span>
        </div>
        <div className={`menu-item ${selectedIndex === 3 ? 'selected' : ''}`}>
          Shuffle Songs
          <span className="chevron right"></span>
        </div>
      </div>
    </div>
  );
});

export default MainMenu;
