import { useImperativeHandle, forwardRef } from 'react';
import { useMenu } from '../../contexts/MenuContext';
import { useUpdateIndex } from '../../hooks/useUpdateIndex';

enum MusicOption {
  Playlists = 'playlists',
  Artists = 'artists',
  Albums = 'albums',
  Songs = 'songs'
}

export type MenuHandle = {
  updateIndex: (scrollDirection: string) => void;
  handleSelect: (menu: MusicOption) => void;
};

const MusicMenu = forwardRef<MenuHandle>((props, ref) => {
  const { selectedIndex, updateIndex } = useUpdateIndex(Object.keys(MusicOption).length - 1);
  const { navigateToMenu, goBack } = useMenu();

  const handleSelect = (clickedButtonName: string) => {
    if (clickedButtonName === 'center-button') {
      // TODO: Go to currently selected menu
      // const selectedMenu = Object.values(MusicOption)[selectedIndex] as MusicOption;
      navigateToMenu('songs');
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
          Playlists
        </div>
        <div className={`menu-item ${selectedIndex === 1 ? 'selected' : ''}`}>
          Artists
        </div>
        <div className={`menu-item ${selectedIndex === 2 ? 'selected' : ''}`}>
          Albums
        </div>
        <div className={`menu-item ${selectedIndex === 3 ? 'selected' : ''}`}>
          Songs
        </div>
      </div>
    </div>
  );
});

export default MusicMenu;
