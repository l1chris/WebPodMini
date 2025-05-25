import { useContext } from 'react'
import { MusicContext, MusicContextType } from '../contexts/MusicContext'

export const useMusic = (): MusicContextType => {
  const context = useContext(MusicContext)
  if (!context) {
    throw new Error('useMusic must be used within a MusicProvider')
  }
  return context
}
