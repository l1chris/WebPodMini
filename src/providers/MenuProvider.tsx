import React, { useState, ReactNode } from 'react'
import { MenuContext } from '../contexts/MenuContext'

type MenuProviderProps = {
  children: ReactNode
}

export const MenuProvider: React.FC<MenuProviderProps> = ({ children }) => {
  const [menuPath, setMenuPath] = useState<string[]>(['home'])
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
