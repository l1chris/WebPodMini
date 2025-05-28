import { useImperativeHandle, forwardRef, useRef } from 'react'
import { useMenu } from '../../hooks/useMenu'
import { useMusic } from '../../hooks/useMusic'
import { useScrollIntoView } from '../../hooks/useScrollIntoView'
import { useUpdateIndex } from '../../hooks/useUpdateIndex'
import { SubMenuHandle } from '../../types/menuTypes'

const SongsMenu = forwardRef<SubMenuHandle>((props, ref) => {
  const { songs } = useMusic()
  const { selectedIndex, updateIndex: baseUpdateIndex } = useUpdateIndex(songs.length - 1)
  const { navigateToMenu, goBack, setSongPath } = useMenu()
  const { setRef, scrollSelectedIntoView } = useScrollIntoView<HTMLDivElement>()

  const scrollableRef = useRef<HTMLDivElement>(null)

  const handleSelect = (clickedButtonName: string) => {
    if (clickedButtonName === 'center-button') {
      const selectedSong = songs[selectedIndex].url
      setSongPath(selectedSong)

      navigateToMenu('nowPlaying')
    } else if (clickedButtonName === 'menu-button') {
      goBack()
    }
  }

  const updateIndex = (scrollDirection: string) => {
    baseUpdateIndex(scrollDirection)
    scrollSelectedIntoView(selectedIndex)
  }

  useImperativeHandle(ref, () => ({
    updateIndex,
    handleSelect,
  }))

  return (
    <div className="menu">
      <div className="title">Music</div>

      <div className="menu-items scrollable" ref={scrollableRef}>
        {songs.map((song, index) => (
          <div
            key={song.id}
            ref={setRef(index)}
            className={`menu-item ${selectedIndex === index ? 'selected' : ''}`}
          >
            {song.title}
            <span className="chevron right"></span>
          </div>
        ))}
      </div>
    </div>
  )
})

export default SongsMenu
