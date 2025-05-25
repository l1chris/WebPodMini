import { useImperativeHandle, forwardRef } from 'react'
import { useMenu } from '../../hooks/useMenu'
import { useMusic } from '../../hooks/useMusic'
import { useUpdateIndex } from '../../hooks/useUpdateIndex'
import { SubMenuHandle } from '../../types/menuTypes'

const SongsMenu = forwardRef<SubMenuHandle>((props, ref) => {
  const { songs } = useMusic()
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

  return (
    <div className="menu">
      <div className="title">Music</div>

      <div className="menu-items">
        {songs.map((song, index) => (
          <div key={song.id} className={`menu-item ${selectedIndex === index ? 'selected' : ''}`}>
            {song.title}
            <span className="chevron right"></span>
          </div>
        ))}
      </div>
    </div>
  )
})

export default SongsMenu
