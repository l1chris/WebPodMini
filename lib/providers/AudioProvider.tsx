import React, { useEffect, useRef, useState } from 'react'
import { AudioContext } from '../contexts/AudioContext'
import { useMenu } from '../hooks/useMenu'
import { useMusic } from '../hooks/useMusic'
import { SongMetadata } from '../contexts/MusicContext'

export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { setSongPath } = useMenu()
  const { songs } = useMusic()

  const audioRef = useRef<HTMLAudioElement>(new Audio())

  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [audioSrc, setAudioSrc] = useState<string | null>(null)
  const [volume, setVolume] = useState(0.2) // Initial volume (1 is max)

  const changeVolume = (scrollDirection: string) => {
    let newVolume = volume

    if (scrollDirection === 'counterclockwise') {
      if (newVolume > 0) {
        newVolume = Math.max(0, Math.round((newVolume - 0.1) * 10) / 10)
      }
    } else if (scrollDirection === 'clockwise') {
      if (newVolume < 1) {
        newVolume = Math.max(0, Math.round((newVolume + 0.1) * 10) / 10)
      }
    }
    setVolume(newVolume)
    audioRef.current.volume = newVolume
  }

  const play = () => {
    audioRef.current.play()
    setIsPlaying(true)
  }

  const pause = () => {
    audioRef.current.pause()
    setIsPlaying(false)
  }

  const setAudioSource = (src: string) => {
    setAudioSrc(src)
  }

  const restartSong = () => {
    audioRef.current.currentTime = 0
  }

  const playNextSong = (currentSongUrl: SongMetadata['url']) => {
    const currentIndex = songs.findIndex((song) => song.url === currentSongUrl)
    const nextIndex = (currentIndex + 1) % songs.length
    const nextSong = songs[nextIndex].url

    setSongPath(nextSong)
  }

  // Update currentTime and duration
  useEffect(() => {
    const audio = audioRef.current
    audio.volume = volume

    const handleTimeUpdate = () => setCurrentTime(audio.currentTime)
    const handleLoadedMetadata = () => setDuration(audio.duration)

    audio.addEventListener('timeupdate', handleTimeUpdate)
    audio.addEventListener('loadedmetadata', handleLoadedMetadata)

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate)
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata)
    }
  }, [volume])

  // Update audio source when audioSrc changes
  useEffect(() => {
    if (audioSrc) {
      audioRef.current.src = audioSrc
      audioRef.current.load()
      play()
    }
  }, [audioSrc])

  return (
    <AudioContext.Provider
      value={{
        isPlaying,
        currentTime,
        duration,
        volume,
        play,
        pause,
        setAudioSource,
        changeVolume,
        restartSong,
        playNextSong,
      }}
    >
      {children}
    </AudioContext.Provider>
  )
}
