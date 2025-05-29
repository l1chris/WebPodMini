import { useImperativeHandle, forwardRef } from 'react'
import { useMenu } from '../../hooks/useMenu'
import { useMusic } from '../../hooks/useMusic'
import { useScrollIntoView } from '../../hooks/useScrollIntoView'
import { useUpdateIndex } from '../../hooks/useUpdateIndex'
import { SubMenuHandle } from '../../types/menuTypes'
import GenericMenu from './GenericMenu'

const SongsMenu = forwardRef<SubMenuHandle>((props, ref) => {
  const { songs } = useMusic()
  const songNames = Array.from(new Set(songs.map((song) => song.title)))
  const { selectedIndex, updateIndex: baseUpdateIndex } = useUpdateIndex(songs.length - 1)
  const { navigateToMenu, goBack, setSongPath } = useMenu()
  const { scrollSelectedIntoView } = useScrollIntoView<HTMLDivElement>()

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

  return <GenericMenu title="Music" items={songNames} selectedIndex={selectedIndex} />
})

export default SongsMenu
