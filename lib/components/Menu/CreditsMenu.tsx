import { useImperativeHandle, forwardRef, useRef } from 'react'
import { useMenu } from '../../hooks/useMenu'
import { SubMenuHandle } from '../../types/menuTypes'

const CreditsMenu = forwardRef<SubMenuHandle>((props, ref) => {
  const { goBack } = useMenu()

  const scrollableRef = useRef<HTMLDivElement>(null)

  const updateIndex = (scrollDirection: string) => {
    if (scrollableRef.current) {
      scrollableRef.current.scrollBy({
        top: scrollDirection === 'clockwise' ? 50 : -50,
        behavior: 'smooth',
      })
    }
  }

  const handleSelect = (clickedButtonName: string) => {
    if (clickedButtonName === 'menu-button') {
      goBack()
    }
  }

  useImperativeHandle(ref, () => ({
    updateIndex,
    handleSelect,
  }))

  return (
    <div className="menu">
      <div className="title">Credits</div>

      <div className="menu-items scrollable" ref={scrollableRef}>
        <br />
        <span>Image Credit:</span>
        <br />
        <br />
        <span>Original SVG file by House, CC BY-SA 3.0 via Wikimedia Commons.</span>
        <br />
        <br />
        <span>Music Credit:</span>
        <br />
        <br />
        <span>Music by Chau Sara</span>
      </div>
    </div>
  )
})

export default CreditsMenu
