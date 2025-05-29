import { useImperativeHandle, forwardRef } from 'react'
import { useAudio } from '../../hooks/useAudio'
import { useMenu } from '../../hooks/useMenu'
import { useUpdateIndex } from '../../hooks/useUpdateIndex'
import { SubMenuHandle } from '../../types/menuTypes'
import { useMusic } from '../../hooks/useMusic'
import GenericMenu from './GenericMenu'

enum MainMenuOption {
  Music = 'music',
  Extras = 'extras',
  ShuffleSongs = 'nowPlaying',
}

const MainMenu = forwardRef<SubMenuHandle>((props, ref) => {
  const { selectedIndex, updateIndex } = useUpdateIndex(Object.keys(MainMenuOption).length - 1)
  const { restartSong } = useAudio()
  const { navigateToMenu, goBack, setSongPath } = useMenu()
  const { songs } = useMusic()

  const handleSelect = (clickedButtonName: string) => {
    if (clickedButtonName === 'center-button') {
      switch (selectedIndex) {
        case 0: {
          navigateToMenu(MainMenuOption.Music)
          break
        }
        case 1: {
          navigateToMenu(MainMenuOption.Extras)
          break
        }
        case 2: {
          const randomIndex = Math.floor(Math.random() * songs.length)
          const selectedSong = songs[randomIndex].url
          setSongPath(selectedSong)
          restartSong()
          navigateToMenu(MainMenuOption.ShuffleSongs)
          break
        }
        default:
          break
      }
    } else if (clickedButtonName === 'menu-button') {
      goBack()
    }
  }

  useImperativeHandle(ref, () => ({
    updateIndex,
    handleSelect,
  }))

  return (
    <GenericMenu
      title="webPod Mini"
      items={['Music', 'Extras', 'Shuffle Songs']}
      selectedIndex={selectedIndex}
    />
  )
})

export default MainMenu
