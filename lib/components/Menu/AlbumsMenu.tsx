import { useImperativeHandle, forwardRef, useRef } from 'react'
import { useMenu } from '../../hooks/useMenu'
import { useMusic } from '../../hooks/useMusic'
import { useScrollIntoView } from '../../hooks/useScrollIntoView'
import { useUpdateIndex } from '../../hooks/useUpdateIndex'
import { SubMenuHandle } from '../../types/menuTypes'

const AlbumsMenu = forwardRef<SubMenuHandle>((props, ref) => {
  const { navigateToMenu, goBack } = useMenu()
  const { songs } = useMusic()
  const albumNames = Array.from(new Set(songs.map((song) => song.album)))
  const { selectedIndex, updateIndex: baseUpdateIndex } = useUpdateIndex(albumNames.length - 1)
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
      <div className="title">Albums</div>

      <div className="menu-scrollable" ref={scrollableRef}>
        {albumNames.map((album, index) => (
          <div
            key={album}
            ref={setRef(index)}
            className={`menu-item ${selectedIndex === index ? 'selected' : ''}`}
          >
            {album}
            <span className="chevron right"></span>
          </div>
        ))}
      </div>
    </div>
  )
})

export default AlbumsMenu
