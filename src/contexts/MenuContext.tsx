import React, { createContext, useState, useContext, ReactNode } from 'react'

type MenuContextType = {
  menuPath: string[]
  navigateToMenu: (menu: string) => void
  goBack: () => void
  songPath: string
  setSongPath: (path: string) => void
}

const MenuContext = createContext<MenuContextType | undefined>(undefined)

type MenuProviderProps = {
  children: ReactNode
}

export const MenuProvider: React.FC<MenuProviderProps> = ({ children }) => {
  const [menuPath, setMenuPath] = useState<string[]>(['home'])
  const [menuHistory, setMenuHistory] = useState<string[][]>([])
  const [songPath, setSongPath] = useState<string>('')

  const navigateToMenu = (menu: string) => {
    setMenuHistory((prev) => [...prev, menuPath])
    setMenuPath([...menuPath, menu])
  }

  const goBack = () => {
    setMenuHistory((prev) => {
      const newHistory = [...prev]
      const previousMenu = newHistory.pop()
      if (previousMenu) {
        setMenuPath(previousMenu)
      }
      return newHistory
    })
  }

  return (
    <MenuContext.Provider
      value={{ menuPath, navigateToMenu, goBack, songPath, setSongPath }}
    >
      {children}
    </MenuContext.Provider>
  )
}

export const useMenu = (): MenuContextType => {
  const context = useContext(MenuContext)
  if (!context) {
    throw new Error('useMenu must be used within a MenuProvider')
  }
  return context
}
