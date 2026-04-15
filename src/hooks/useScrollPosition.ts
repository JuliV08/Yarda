import { useState } from 'react'
import { useScroll, useMotionValueEvent } from 'motion/react'

export function useScrollPosition(threshold = 50) {
  const { scrollY } = useScroll()
  const [isScrolled, setIsScrolled] = useState(false)

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setIsScrolled(latest > threshold)
  })

  return isScrolled
}
