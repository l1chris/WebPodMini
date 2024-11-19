import React, { useRef, useState } from 'react'
import '../styles/iPod.scss'
import { MenuProvider } from '../providers/MenuProvider.tsx'
import Menu from './Menu.tsx'

import IPodSVG from './IPodSVG.jsx'

const IPod: React.FC = () => {
  const [rectDimensions, setRectDimensions] = useState({
    width: 0,
    height: 0,
    x: 0,
    y: 0,
  })

  const menuRef = useRef()

  const handleBtnClick = (event) => {
    if (menuRef.current) {
      menuRef.current.updateMenu(event)
    }
  }

  const handleScroll = (event) => {
    if (menuRef.current) {
      menuRef.current.updateIndex(event)
    }
  }

  return (
    <div className="ipod-svg-container">
      <IPodSVG
        className="ipod-svg"
        onBtnClick={handleBtnClick}
        onDimensionsChange={setRectDimensions}
        onScroll={handleScroll}
      />

      <div
        style={{
          position: 'relative',
          top: rectDimensions.y * 0.93,
          left: rectDimensions.x * 0.93,
          width: rectDimensions.width * 0.93,
          height: rectDimensions.height * 0.9,
        }}
      >
        <MenuProvider>
          <Menu ref={menuRef} />
        </MenuProvider>
      </div>
    </div>
  )
}

export default IPod
