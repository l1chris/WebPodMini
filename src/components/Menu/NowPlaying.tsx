import { useImperativeHandle, useEffect, useState, forwardRef } from 'react';
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
  const { isPlaying, currentTime, duration, play, pause, seek, setAudioSource } = useAudio();

  const [isSongLoaded, setIsSongLoaded] = useState(false);

  useEffect(() => {
    if (props.song) {
      setAudioSource(props.song);
      setIsSongLoaded(true);
    }
  }, [props.song, setAudioSource]);

  const handleSelect = (clickedButtonName: string) => {
    if (clickedButtonName === 'play-button') {
      if (isPlaying) {
        pause()
      } else {
        if (isSongLoaded) {
          play();            
          setIsSongLoaded(false);
        }
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
        <div>Current Time: {currentTime.toFixed(2)} / {duration.toFixed(2)}</div>
      </div>
    </div>
  );
});

export default NowPlaying;
