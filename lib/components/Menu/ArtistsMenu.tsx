import { useImperativeHandle, forwardRef } from 'react'
import { useMenu } from '../../hooks/useMenu'
import { useUpdateIndex } from '../../hooks/useUpdateIndex'
import { SubMenuHandle } from '../../types/menuTypes'

enum ArtistOption {
  ChauSara = 'chau-sara',
}

const ArtistsMenu = forwardRef<SubMenuHandle>((props, ref) => {
  const { selectedIndex, updateIndex } = useUpdateIndex(Object.keys(ArtistOption).length - 1)
  const { navigateToMenu, goBack } = useMenu()

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

  return (
    <div className="menu">
      <div className="title">Artists</div>

      <div className="menu-items">
        <div className={`menu-item ${selectedIndex === 0 ? 'selected' : ''}`}>
          Chau Sara
          <span className="chevron right"></span>
        </div>
      </div>
    </div>
  )
})

export default ArtistsMenu
