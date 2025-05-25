import { useImperativeHandle, forwardRef } from 'react'
import { useMenu } from '../../hooks/useMenu'
import { useMusic } from '../../hooks/useMusic'
import { useUpdateIndex } from '../../hooks/useUpdateIndex'
import { SubMenuHandle } from '../../types/menuTypes'

const ArtistsMenu = forwardRef<SubMenuHandle>((props, ref) => {
  const { navigateToMenu, goBack } = useMenu()
  const { songs } = useMusic()
  const artistNames = Array.from(new Set(songs.map((song) => song.artist)))
  const { selectedIndex, updateIndex } = useUpdateIndex(artistNames.length - 1)

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
        {artistNames.map((artist, index) => (
          <div key={artist} className={`menu-item ${selectedIndex === index ? 'selected' : ''}`}>
            {artist}
            <span className="chevron right"></span>
          </div>
        ))}
      </div>
    </div>
  )
})

export default ArtistsMenu
