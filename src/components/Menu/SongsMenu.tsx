import { useImperativeHandle, forwardRef } from 'react';
import { useMenu } from '../../contexts/MenuContext';
import { useUpdateIndex } from '../../hooks/useUpdateIndex';

enum SongOption {
  Song1 = 'song1',
  Song2 = 'song2'
}

export type MenuHandle = {
  updateIndex: (scrollDirection: string) => void;
  handleSelect: (clickedButtonName: string) => void;
};

const SongsMenu = forwardRef<MenuHandle>((props, ref) => {
  const { selectedIndex, updateIndex } = useUpdateIndex(Object.keys(SongOption).length - 1);
  const { navigateToMenu, goBack } = useMenu();

  const handleSelect = (clickedButtonName: string) => {
    if (clickedButtonName === 'center-button') {
      // TODO: Go to currently selected menu
      // const selectedSong = Object.values(SongOption)[selectedIndex] as SongOption;
      
      navigateToMenu('nowPlaying');
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
        Music
      </div>
      
      <div className="menu-items">
        <div className={`menu-item ${selectedIndex === 0 ? 'selected' : ''}`}>
          Song 1
          <span className="chevron right"></span>
        </div>
        <div className={`menu-item ${selectedIndex === 1 ? 'selected' : ''}`}>
          Song 2
          <span className="chevron right"></span>
        </div>
      </div>
    </div>
  );
});

export default SongsMenu;
