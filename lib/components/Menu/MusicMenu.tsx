import { useImperativeHandle, forwardRef } from 'react'
import { useMenu } from '../../hooks/useMenu'
import { useUpdateIndex } from '../../hooks/useUpdateIndex'
import { SubMenuHandle } from '../../types/menuTypes'

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
    <div className="menu">
      <div className="title">Music</div>

      <div className="menu-items">
        <div className={`menu-item ${selectedIndex === 0 ? 'selected' : ''}`}>
          Artists
          <span className="chevron right"></span>
        </div>
        <div className={`menu-item ${selectedIndex === 1 ? 'selected' : ''}`}>
          Albums
          <span className="chevron right"></span>
        </div>
        <div className={`menu-item ${selectedIndex === 2 ? 'selected' : ''}`}>
          Songs
          <span className="chevron right"></span>
        </div>
      </div>
    </div>
  )
})

export default MusicMenu
