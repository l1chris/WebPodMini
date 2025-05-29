import { useImperativeHandle, forwardRef } from 'react'
import { useMenu } from '../../hooks/useMenu'
import { useMusic } from '../../hooks/useMusic'
import { useUpdateIndex } from '../../hooks/useUpdateIndex'
import { SubMenuHandle } from '../../types/menuTypes'
import MenuView from './MenuView'

const AlbumsMenu = forwardRef<SubMenuHandle>((props, ref) => {
  const { navigateToMenu, goBack } = useMenu()
  const { songs } = useMusic()
  const albumNames = Array.from(new Set(songs.map((song) => song.album)))
  const { selectedIndex, updateIndex } = useUpdateIndex(albumNames.length - 1)

  const handleSelect = (clickedButtonName: string) => {
    if (clickedButtonName === 'center-button') {
      navigateToMenu('songs')
    } else if (clickedButtonName === 'menu-button') {
      goBack()
    }
  }

  useImperativeHandle(ref, () => ({
    updateIndex,
    handleSelect,
  }))

  return <MenuView title="Albums" items={albumNames} selectedIndex={selectedIndex} />
})

export default AlbumsMenu
