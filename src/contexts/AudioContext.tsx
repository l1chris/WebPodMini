import React, { createContext, useContext, useEffect, useRef, useState } from 'react';

type AudioContextType = {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  play: () => void;
  pause: () => void;
  seek: (time: number) => void;
  setAudioSource: (src: string) => void;
  volume: number;
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

  const changeVolume = (scrollDirection: string) => {
    let currentVolume = audioRef.current.volume
    
    if (scrollDirection === 'counterclockwise') {
      if (currentVolume > 0) {
        currentVolume = Math.max(0, Math.round((currentVolume - 0.1) * 10) / 10);
        setVolume(currentVolume);
      } else {
        setVolume(0);
      }
    } else if (scrollDirection === 'clockwise') {
      if (currentVolume < 1) {
        currentVolume = Math.min(1, Math.round((currentVolume + 0.1) * 10) / 10);
      setVolume(currentVolume);
      } else {
        setVolume(1);
      }
    }
    audioRef.current.volume = volume
  };

  const play = () => {
    audioRef.current.play();
    setIsPlaying(true);
  };

  const pause = () => {
    audioRef.current.pause();
    setIsPlaying(false);
  };

  const seek = (time: number) => {
    audioRef.current.currentTime = time;
    setCurrentTime(time);
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
    <AudioContext.Provider value={{ isPlaying, currentTime, duration, play, pause, seek, setAudioSource, volume, changeVolume }}>
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
