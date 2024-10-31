import { useImperativeHandle, useEffect, useState, forwardRef } from 'react';
import { useAudio } from '../../contexts/AudioContext';
import { useMenu } from '../../contexts/MenuContext';
import ProgressBar from './NowPlaying/ProgressBar';

export type MenuHandle = {
  updateIndex: (scrollDirection: string) => void;
  handleSelect: (clickedButtonName: string) => void;
};

interface NowPlayingProps {
  song: string | undefined;
}

const NowPlaying = forwardRef<MenuHandle, NowPlayingProps>((props, ref) => {
  const { goBack } = useMenu();
  const { isPlaying, currentTime, duration, play, pause, setAudioSource, changeVolume } = useAudio();

  const [isSongLoaded, setIsSongLoaded] = useState(false);
  const [songName, setSongName] = useState('');

  useEffect(() => {
    if (props.song) {
      setAudioSource(props.song);
      setIsSongLoaded(true);

      const name = props.song.match(/\/([^/]+)\.mp3$/)?.[1] ?? 'Unknown Title';
      setSongName(name);
    }
  }, [props.song, setAudioSource]);

  const updateIndex = (scrollDirection: string) => {
    changeVolume(scrollDirection);
  };

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

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  }

  useImperativeHandle(ref, () => ({
    handleSelect,
    updateIndex
  }));

  return (
    <div className='menu'>
      <div className='title'>
        Now Playing
      </div>
      
      <div className="song-info">
        <div className='song-info-title'>{songName}</div>
        <ProgressBar currentTime={currentTime} duration={duration} />
        <div className='song-info-time'>
          <div>{formatTime(currentTime)}</div>
          <div>{formatTime(duration)}</div>
        </div>
      </div>
    </div>
  );
});

export default NowPlaying;
