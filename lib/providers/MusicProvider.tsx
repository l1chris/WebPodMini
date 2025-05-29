import { useEffect, useState } from 'react'
import { MusicContext, SongMetadata } from '../contexts/MusicContext'

const sampleSongs: SongMetadata[] = [
  {
    id: '1',
    title: 'Title',
    artist: 'Artist',
    album: 'Album',
    url: '/music/filename.mp3',
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
