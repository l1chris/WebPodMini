import { useImperativeHandle, forwardRef, useRef } from 'react'
import '../styles/Menu.css'
import CreditsMenu from './Menu/CreditsMenu'
import ExtrasMenu from './Menu/ExtrasMenu'
import MainMenu from './Menu/MainMenu'
import MusicMenu from './Menu/MusicMenu'
import SongsMenu from './Menu/SongsMenu'
import NowPlaying from './Menu/NowPlaying'
import { useMenu } from '../hooks/useMenu'
import { AudioProvider } from '../providers/AudioProvider'

enum MenuOption {
  Home = 'home',
  Songs = 'songs',
  Albums = 'albums',
  NowPlaying = 'nowPlaying',
  Music = 'music',
  Extras = 'extras',
  Credits = 'credits',
}

interface MenuProps {
  scrollDirection: string | undefined
}

export type MenuHandle = {
  updateIndex: (scrollDirection: string) => void
  updateMenu: (clickedButtonName: string) => void
}

const Menu = forwardRef<MenuHandle, MenuProps>((props, ref) => {
  const { menuPath, songPath } = useMenu()
  const menuRef = useRef()
  const currentMenu = menuPath[menuPath.length - 1] as MenuOption

  const updateIndex = (scrollDirection: string) => {
    if (menuRef.current) {
      menuRef.current.updateIndex(scrollDirection)
    }
  }

  const updateMenu = (clickedButtonName: string) => {
    console.log(clickedButtonName)
    if (menuRef.current) {
      menuRef.current.handleSelect(clickedButtonName)
    }
  }

  useImperativeHandle(ref, () => ({
    updateIndex,
    updateMenu,
  }))

  const renderMenuScreen = () => {
    switch (currentMenu) {
      case MenuOption.Home:
        return <MainMenu ref={menuRef} />
      case MenuOption.Music:
        return <MusicMenu ref={menuRef} />
      case MenuOption.Songs:
        return <SongsMenu ref={menuRef} />
      case MenuOption.NowPlaying:
        return <NowPlaying ref={menuRef} song={songPath} />
      case MenuOption.Extras:
        return <ExtrasMenu ref={menuRef} />
      case MenuOption.Credits:
        return <CreditsMenu ref={menuRef} />
      default:
        return <MainMenu ref={menuRef} />
    }
  }

  return (
    <AudioProvider>
      <div>{renderMenuScreen()}</div>
    </AudioProvider>
  )
})

export default Menu
