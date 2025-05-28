import { useRef } from 'react'

export function useScrollIntoView<T extends HTMLElement>() {
  const itemRefs = useRef<(T | null)[]>([])

  const setRef = (index: number) => (el: T | null) => {
    itemRefs.current[index] = el
  }

  const scrollSelectedIntoView = (selectedIndex: number) => {
    setTimeout(() => {
      const item = itemRefs.current[selectedIndex]
      item?.scrollIntoView({
        behavior: 'instant',
        block: 'nearest',
      })
    }, 0)
  }

  return { itemRefs, setRef, scrollSelectedIntoView }
}
