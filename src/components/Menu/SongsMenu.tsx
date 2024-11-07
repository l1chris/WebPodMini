import { useImperativeHandle, forwardRef } from 'react'
import { useMenu } from '../../contexts/MenuContext'
import { useUpdateIndex } from '../../hooks/useUpdateIndex'
import { SongOption } from '../../constants/songOptions'

export type MenuHandle = {
  updateIndex: (scrollDirection: string) => void
  handleSelect: (clickedButtonName: string) => void
}

const SongsMenu = forwardRef<MenuHandle>((props, ref) => {
  const { selectedIndex, updateIndex } = useUpdateIndex(
    Object.keys(SongOption).length - 1,
  )
  const { navigateToMenu, goBack, setSongPath } = useMenu()

  const handleSelect = (clickedButtonName: string) => {
    if (clickedButtonName === 'center-button') {
      const selectedSong = Object.values(SongOption)[
        selectedIndex
      ] as SongOption
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

  const getSongNameFromFilePath = (path: string) => {
    return path.match(/\/([^/]+)\.mp3$/)?.[1] ?? 'Unknown Title'
  }

  return (
    <div className="menu">
      <div className="title">Music</div>

      <div className="menu-items">
        {Object.keys(SongOption).map((songKey, index) => (
          <div
            key={index}
            className={`menu-item ${selectedIndex === index ? 'selected' : ''}`}
          >
            {getSongNameFromFilePath(
              SongOption[songKey as keyof typeof SongOption],
            )}
            <span className="chevron right"></span>
          </div>
        ))}
      </div>
    </div>
  )
})

export default SongsMenu
