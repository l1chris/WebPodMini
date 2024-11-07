import { useContext } from 'react'
import { MenuContext, MenuContextType } from '../contexts/MenuContext'

export const useMenu = (): MenuContextType => {
  const context = useContext(MenuContext)
  if (!context) {
    throw new Error('useMenu must be used within a MenuProvider')
  }
  return context
}
