import { createContext } from 'react'

export type AudioContextType = {
  isPlaying: boolean
  currentTime: number
  duration: number
  volume: number
  play: () => void
  pause: () => void
  setAudioSource: (src: string) => void
  changeVolume: (scrollDirection: string) => void
  restartSong: () => void
  playNextSong: (currentSongPath: string) => void
}

export const AudioContext = createContext<AudioContextType | undefined>(
  undefined,
)
