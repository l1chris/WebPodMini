import { useImperativeHandle, forwardRef } from 'react'
import { useMenu } from '../../hooks/useMenu'
import { useUpdateIndex } from '../../hooks/useUpdateIndex'
import { SubMenuHandle } from '../../types/menuTypes'

const ExtrasMenu = forwardRef<SubMenuHandle>((props, ref) => {
  const { selectedIndex, updateIndex } = useUpdateIndex(0)
  const { navigateToMenu, goBack } = useMenu()

  const handleSelect = (clickedButtonName: string) => {
    if (clickedButtonName === 'center-button') {
      navigateToMenu('credits')
    } else if (clickedButtonName === 'menu-button') {
      goBack()
    }
  }

  useImperativeHandle(ref, () => ({
    updateIndex,
    handleSelect,
  }))

  return (
    <div className="menu">
      <div className="title">Extras</div>

      <div className="menu-items">
        <div className={`menu-item ${selectedIndex === 0 ? 'selected' : ''}`}>
          Credits
          <span className="chevron right"></span>
        </div>
      </div>
    </div>
  )
})

export default ExtrasMenu
