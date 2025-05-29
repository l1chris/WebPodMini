import React, { useRef, useState } from 'react'
import '../styles/iPod.scss'
import { MenuProvider } from '../providers/MenuProvider.tsx'
import { MusicProvider } from '../providers/MusicProvider.tsx'
import Menu from './Menu.tsx'
import { MainMenuHandle } from '../types/menuTypes'

import IPodSVG from './IPodSVG.jsx'

const IPod: React.FC = () => {
  const [rectDimensions, setRectDimensions] = useState({
    width: 0,
    height: 0,
    x: 0,
    y: 0,
  })

  const menuRef = useRef<MainMenuHandle>(null)

  const handleBtnClick = (event: string) => {
    if (menuRef.current) {
      menuRef.current.updateMenu(event)
    }
  }

  const handleScroll = (event: string) => {
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
          position: 'absolute',
          top: 30,
          left: 35.5,
          width: rectDimensions.width - 5,
          height: rectDimensions.height,
          pointerEvents: 'none',
        }}
      >
        <MusicProvider>
          <MenuProvider>
            <Menu ref={menuRef} />
          </MenuProvider>
        </MusicProvider>
      </div>
    </div>
  )
}

export default IPod
