import { useImperativeHandle, forwardRef, useRef } from 'react'
import { useMenu } from '../../hooks/useMenu'
import { useMusic } from '../../hooks/useMusic'
import { useScrollIntoView } from '../../hooks/useScrollIntoView'
import { useUpdateIndex } from '../../hooks/useUpdateIndex'
import { SubMenuHandle } from '../../types/menuTypes'

const ArtistsMenu = forwardRef<SubMenuHandle>((props, ref) => {
  const { navigateToMenu, goBack } = useMenu()
  const { songs } = useMusic()
  const artistNames = Array.from(new Set(songs.map((song) => song.artist)))
  const { selectedIndex, updateIndex: baseUpdateIndex } = useUpdateIndex(artistNames.length - 1)
  const { setRef, scrollSelectedIntoView } = useScrollIntoView<HTMLDivElement>()

  const scrollableRef = useRef<HTMLDivElement>(null)

  const handleSelect = (clickedButtonName: string) => {
    if (clickedButtonName === 'center-button') {
      navigateToMenu('songs')
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
      <div className="title">Artists</div>

      <div className="menu-items scrollable" ref={scrollableRef}>
        {artistNames.map((artist, index) => (
          <div
            key={artist}
            ref={setRef(index)}
            className={`menu-item ${selectedIndex === index ? 'selected' : ''}`}
          >
            {artist}
            <span className="chevron right"></span>
          </div>
        ))}
      </div>
    </div>
  )
})

export default ArtistsMenu
