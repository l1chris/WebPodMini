import { useImperativeHandle, forwardRef } from 'react';
import { SongOption, NumberOfSongs } from '../../constants/songOptions';
import { useAudio } from '../../contexts/AudioContext';
import { useMenu } from '../../contexts/MenuContext';
import { useUpdateIndex } from '../../hooks/useUpdateIndex';

enum MainMenuOption {
  Music = 'music',
  Extras = 'extras',
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
      switch (selectedIndex) {
        case 0: {
          navigateToMenu(MainMenuOption.Music);
          break;
        }
        case 1: {
          navigateToMenu(MainMenuOption.Extras);
          break;
        }
        case 2: {
          const randomIndex = Math.floor(Math.random() * NumberOfSongs);
          const selectedSong = Object.values(SongOption)[randomIndex] as SongOption;
          setSongPath(selectedSong);
          restartSong();
          navigateToMenu(MainMenuOption.ShuffleSongs);
          break;
        }
        default:
          break;
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
          Shuffle Songs
          <span className="chevron right"></span>
        </div>
      </div>
    </div>
  );
});

export default MainMenu;
