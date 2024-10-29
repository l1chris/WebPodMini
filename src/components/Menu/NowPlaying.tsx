import { useImperativeHandle, forwardRef } from 'react';
import { useAudio } from '../../contexts/AudioContext';
import { useMenu } from '../../contexts/MenuContext';
import { useUpdateIndex } from '../../hooks/useUpdateIndex';

export type MenuHandle = {
  updateIndex: (scrollDirection: string) => void;
  handleSelect: (clickedButtonName: string) => void;
};

interface NowPlayingProps {
  song: string | undefined;
}

const NowPlaying = forwardRef<MenuHandle, NowPlayingProps>((props, ref) => {
  const { updateIndex } = useUpdateIndex(0);
  const { goBack } = useMenu();
  const { isPlaying, currentTime, duration, play, pause, seek } = useAudio();

  const handleSelect = (clickedButtonName: string) => {
    if (clickedButtonName === 'play-button') {
      if (isPlaying) {
        pause()
      } else {
        play()
      }

    } else if (clickedButtonName === 'menu-button') {
      goBack()
    }
  };

  useImperativeHandle(ref, () => ({
    handleSelect,
    updateIndex
  }));

  return (
    <div className='menu'>
      <div className='title'>
        Now Playing
      </div>
      
      <div className="menu-items">
        props.song
      </div>
    </div>
  );
});

export default NowPlaying;
