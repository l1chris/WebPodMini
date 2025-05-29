import { useImperativeHandle, forwardRef } from 'react'
import { useMenu } from '../../hooks/useMenu'
import { useMusic } from '../../hooks/useMusic'
import { useScrollIntoView } from '../../hooks/useScrollIntoView'
import { useUpdateIndex } from '../../hooks/useUpdateIndex'
import { SubMenuHandle } from '../../types/menuTypes'
import GenericMenu from './GenericMenu'

const ArtistsMenu = forwardRef<SubMenuHandle>((props, ref) => {
  const { navigateToMenu, goBack } = useMenu()
  const { songs } = useMusic()
  const artistNames = Array.from(new Set(songs.map((song) => song.artist)))
  const { selectedIndex, updateIndex: baseUpdateIndex } = useUpdateIndex(artistNames.length - 1)
  const { scrollSelectedIntoView } = useScrollIntoView<HTMLDivElement>()

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

  return <GenericMenu title="Artists" items={artistNames} selectedIndex={selectedIndex} />
})

export default ArtistsMenu
