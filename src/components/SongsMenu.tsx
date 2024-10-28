import { useState, useImperativeHandle, forwardRef } from 'react';
import { useMenu } from './MenuContext';

enum SongOption {
  Song = 'song',
  Song2 = 'song2'
}

export type MenuHandle = {
  updateIndex: (scrollDirection: string) => void;
  handleSelect: (menu: SongOption) => void;
};

const SongsMenu = forwardRef<MenuHandle>((props, ref) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { navigateToMenu, goBack } = useMenu();

  const handleSelect = (clickedButtonName: string) => {
    if (clickedButtonName === 'center-button') {
      // TODO: Go to NowPlaying Menu
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
        return prev < Object.keys(SongOption).length - 1 ? prev + 1 : Object.keys(SongOption).length - 1;
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
        Songs
      </div>
      
      <div className="menu-items">
        <div className={`menu-item ${selectedIndex === 0 ? 'selected' : ''}`}>
          Song
        </div>
        <div className={`menu-item ${selectedIndex === 1 ? 'selected' : ''}`}>
          Song 2
        </div>
      </div>
    </div>
  );
});

export default SongsMenu;
