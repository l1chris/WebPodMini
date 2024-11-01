import React, { createContext, useContext, useEffect, useRef, useState } from 'react';

type AudioContextType = {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  play: () => void;
  pause: () => void;
  setAudioSource: (src: string) => void;
  changeVolume: (scrollDirection: string) => void;
};

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const audioRef = useRef<HTMLAudioElement>(new Audio());
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [audioSrc, setAudioSrc] = useState<string | null>(null);
  const [volume, setVolume] = useState(1); // Initialize volume to 1 (max)
  const [volumeChangeTimeout, setVolumeChangeTimeout] = useState<NodeJS.Timeout | null>(null);

  const changeVolume = (scrollDirection: string) => {
    // Clear previous timeout if it exists
    if (volumeChangeTimeout) {
      clearTimeout(volumeChangeTimeout);
    }

    // Create a new timeout to change the volume
    const newVolumeChangeTimeout = setTimeout(() => {
      let newVolume = volume;

      if (scrollDirection === 'counterclockwise') {
        if (newVolume > 0) {
          newVolume = Math.max(0, Math.round((newVolume - 0.1) * 10) / 10);
        }
      } else if (scrollDirection === 'clockwise') {
        if (newVolume < 1) {
          newVolume = Math.max(0, Math.round((newVolume + 0.1) * 10) / 10);
        }
      }
      console.log('setVolume')
      setVolume(newVolume);
      audioRef.current.volume = newVolume;
    }, 100);

    // Set the new timeout ID
    setVolumeChangeTimeout(newVolumeChangeTimeout);
  };
  
  const play = () => {
    audioRef.current.play();
    setIsPlaying(true);
  };

  const pause = () => {
    audioRef.current.pause();
    setIsPlaying(false);
  };

  const setAudioSource = (src: string) => {
    setAudioSrc(src);
  };

  // Update currentTime and duration
  useEffect(() => {
    const audio = audioRef.current;

    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleLoadedMetadata = () => setDuration(audio.duration);

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
    };
  }, []);

  // Update audio source when audioSrc changes
  useEffect(() => {
    if (audioSrc) {
      audioRef.current.src = audioSrc;
      audioRef.current.load();
      play();
    }
  }, [audioSrc]);

  return (
    <AudioContext.Provider value={{ isPlaying, currentTime, duration, volume, play, pause, setAudioSource, changeVolume }}>
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (context === undefined) {
    throw new Error("useAudio must be used within an AudioProvider");
  }
  return context;
};
