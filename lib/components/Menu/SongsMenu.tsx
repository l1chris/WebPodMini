import { useImperativeHandle, forwardRef } from 'react'
import { useMenu } from '../../hooks/useMenu'
import { useMusic } from '../../hooks/useMusic'
import { useUpdateIndex } from '../../hooks/useUpdateIndex'
import { SubMenuHandle } from '../../types/menuTypes'
import MenuView from './MenuView'

const SongsMenu = forwardRef<SubMenuHandle>((props, ref) => {
  const { songs } = useMusic()
  const songNames = Array.from(new Set(songs.map((song) => song.title)))
  const { selectedIndex, updateIndex } = useUpdateIndex(songs.length - 1)
  const { navigateToMenu, goBack, setSongPath } = useMenu()

  const handleSelect = (clickedButtonName: string) => {
    if (clickedButtonName === 'center-button') {
      const selectedSong = songs[selectedIndex].url
      setSongPath(selectedSong)

      navigateToMenu('nowPlaying')
    } else if (clickedButtonName === 'menu-button') {
      goBack()
    }
  }

  useImperativeHandle(ref, () => ({
    updateIndex,
    handleSelect,
  }))

  return <MenuView title="Music" items={songNames} selectedIndex={selectedIndex} />
})

export default SongsMenu
