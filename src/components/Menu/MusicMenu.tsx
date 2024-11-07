import { useImperativeHandle, forwardRef } from 'react'
import { useMenu } from '../../hooks/useMenu'
import { useUpdateIndex } from '../../hooks/useUpdateIndex'

enum MusicOption {
  Artists = 'artists',
  Albums = 'albums',
  Songs = 'songs',
}

export type MenuHandle = {
  updateIndex: (scrollDirection: string) => void
  handleSelect: (menu: MusicOption) => void
}

const MusicMenu = forwardRef<MenuHandle>((props, ref) => {
  const { selectedIndex, updateIndex } = useUpdateIndex(Object.keys(MusicOption).length - 1)
  const { navigateToMenu, goBack } = useMenu()

  const handleSelect = (clickedButtonName: string) => {
    if (clickedButtonName === 'center-button') {
      // TODO: Go to currently selected menu
      // const selectedMenu = Object.values(MusicOption)[selectedIndex] as MusicOption;
      navigateToMenu('songs')
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
