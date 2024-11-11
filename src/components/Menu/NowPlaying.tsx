import { useImperativeHandle, useEffect, useState, forwardRef, useRef } from 'react'
import { useAudio } from '../../hooks/useAudio.js'
import { useMenu } from '../../hooks/useMenu'
import '../../styles/components/NowPlaying.scss'
import ProgressBar from './NowPlaying/ProgressBar'
import VolumeBar from './NowPlaying/VolumeBar'
import MuteIcon from '../Icon/MuteIcon.jsx'
import SpeakerIcon from '../Icon/SpeakerIcon.jsx'

export type MenuHandle = {
  updateIndex: (scrollDirection: string) => void
  handleSelect: (clickedButtonName: string) => void
}

interface NowPlayingProps {
  song: string | undefined
}

const NowPlaying = forwardRef<MenuHandle, NowPlayingProps>((props, ref) => {
  const { goBack } = useMenu()
  const {
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
  } = useAudio()

  const [isSongLoaded, setIsSongLoaded] = useState(false)
  const [songName, setSongName] = useState('')
  const [isChangingVolume, setIsChangingVolume] = useState(false)

  const volumeTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (props.song) {
      setAudioSource(props.song)
      setIsSongLoaded(true)

      const name = props.song.match(/\/([^/]+)\.mp3$/)?.[1] ?? 'Unknown Title'
      setSongName(name)
    }
  }, [props.song, setAudioSource])

  const updateIndex = (scrollDirection: string) => {
    setIsChangingVolume(true)
    changeVolume(scrollDirection)

    // Clear previous timeout if it exists
    if (volumeTimeoutRef.current) {
      clearTimeout(volumeTimeoutRef.current)
    }

    // Set new timeout to hide the volume bar after 2 seconds
    volumeTimeoutRef.current = setTimeout(() => {
      setIsChangingVolume(false)
    }, 2000)
  }

  const handleSelect = (clickedButtonName: string) => {
    if (clickedButtonName === 'play-button') {
      if (isPlaying) {
        pause()
      } else {
        if (isSongLoaded) {
          play()
          setIsSongLoaded(false)
        }
      }
    } else if (clickedButtonName === 'menu-button') {
      goBack()
    } else if (clickedButtonName === 'right-button') {
      if (props.song) {
        playNextSong(props.song)
      }
    } else if (clickedButtonName === 'left-button') {
      restartSong()
    }
  }

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = Math.floor(seconds % 60)
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`
  }

  useImperativeHandle(ref, () => ({
    handleSelect,
    updateIndex,
  }))

  return (
    <div className="menu">
      <div className="title">
        <span className={`icon ${isPlaying ? 'play' : 'pause'}`}></span>
        Now Playing
      </div>

      <div className="song-info">
        <div className="song-info-title">{songName}</div>

        {!isChangingVolume ? (
          <div className="song-progress">
            <ProgressBar currentTime={currentTime} duration={duration} />
            <div className="song-info-time">
              <div>{formatTime(currentTime)}</div>
              <div>{formatTime(duration)}</div>
            </div>
          </div>
        ) : (
          <div className="volume">
            <MuteIcon className="icon" />
            <VolumeBar volume={volume} />
            <SpeakerIcon className="icon" />
          </div>
        )}
      </div>
    </div>
  )
})

export default NowPlaying
