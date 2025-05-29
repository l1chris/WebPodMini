import { useImperativeHandle, forwardRef } from 'react'
import { useMenu } from '../../hooks/useMenu'
import { useUpdateIndex } from '../../hooks/useUpdateIndex'
import { SubMenuHandle } from '../../types/menuTypes'
import MenuView from './MenuView'

enum MusicOption {
  Artists = 'artists',
  Albums = 'albums',
  Songs = 'songs',
}

const MusicMenu = forwardRef<SubMenuHandle>((props, ref) => {
  const { selectedIndex, updateIndex } = useUpdateIndex(Object.keys(MusicOption).length - 1)
  const { navigateToMenu, goBack } = useMenu()

  const handleSelect = (clickedButtonName: string) => {
    if (clickedButtonName === 'center-button') {
      switch (selectedIndex) {
        case 0: {
          navigateToMenu(MusicOption.Artists)
          break
        }
        case 1: {
          navigateToMenu(MusicOption.Albums)
          break
        }
        case 2: {
          navigateToMenu(MusicOption.Songs)
          break
        }
        default:
          break
      }
    } else if (clickedButtonName === 'menu-button') {
      goBack()
    }
  }

  useImperativeHandle(ref, () => ({
    updateIndex,
    handleSelect,
  }))

  return (
    <MenuView title="Music" items={['Artists', 'Albums', 'Songs']} selectedIndex={selectedIndex} />
  )
})

export default MusicMenu
