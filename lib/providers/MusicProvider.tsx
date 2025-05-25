import { useEffect, useState } from 'react'
import { MusicContext, SongMetadata } from '../contexts/MusicContext'

const sampleSongs: SongMetadata[] = [
  {
    id: '1',
    title: 'Altara',
    artist: 'ChauSara',
    album: 'DownHills',
    url: '/music/Altara.mp3',
  },
  {
    id: '2',
    title: 'Arsanis',
    artist: 'ChauSara',
    album: 'DownHills',
    url: '/music/Arsanis.mp3',
  },
  {
    id: '3',
    title: 'Felucia',
    artist: 'ChauSara',
    album: 'DownHills',
    url: '/music/Felucia.mp3',
  },
  {
    id: '4',
    title: 'Nelyth',
    artist: 'ChauSara',
    album: 'DownHills',
    url: '/music/Nelyth.mp3',
  },
  {
    id: '5',
    title: 'Treya',
    artist: 'ChauSara',
    album: 'DownHills',
    url: '/music/Treya.mp3',
  },
]

export const MusicProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [songs, setSongs] = useState<SongMetadata[]>([])
  const [currentSong, setCurrentSong] = useState<SongMetadata | null>(null)

  useEffect(() => {
    // TODO: In the real app, fetch data here
    setSongs(sampleSongs)
    setCurrentSong(sampleSongs[0])
  }, [])

  return (
    <MusicContext.Provider value={{ songs, currentSong, setCurrentSong }}>
      {children}
    </MusicContext.Provider>
  )
}
