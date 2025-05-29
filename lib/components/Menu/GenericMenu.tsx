import React, { useRef, useEffect } from 'react'

type GenericMenuProps = {
  title: string
  items: string[]
  selectedIndex: number
}

const GenericMenu: React.FC<GenericMenuProps> = ({ title, items, selectedIndex }) => {
  const scrollableRef = useRef<HTMLDivElement>(null)
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const item = itemRefs.current[selectedIndex]
    item?.scrollIntoView({
      behavior: 'instant',
      block: 'nearest',
    })
  }, [selectedIndex])

  return (
    <div className="menu">
      <div className="title">{title}</div>
      <div className="menu-items scrollable" ref={scrollableRef}>
        {items.map((item, index) => (
          <div
            key={index}
            ref={(el) => (itemRefs.current[index] = el)}
            className={`menu-item ${selectedIndex === index ? 'selected' : ''}`}
          >
            {item}
            <span className="chevron right"></span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default GenericMenu
