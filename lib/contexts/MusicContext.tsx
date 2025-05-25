import { createContext } from 'react'

export type SongMetadata = {
  id: string
  title: string
  artist: string
  album: string
  url: string
}

export type MusicContextType = {
  songs: SongMetadata[]
  currentSong: SongMetadata | null
  setCurrentSong: (song: SongMetadata) => void
}

export const MusicContext = createContext<MusicContextType | undefined>(undefined)
