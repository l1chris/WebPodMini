import { createContext } from 'react'

export type MenuContextType = {
  menuPath: string[]
  navigateToMenu: (menu: string) => void
  goBack: () => void
  songPath: string
  setSongPath: (path: string) => void
}

export const MenuContext = createContext<MenuContextType | undefined>(undefined)
