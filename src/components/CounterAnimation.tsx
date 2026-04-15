import { useEffect, useRef, useState } from 'react'
import { useInView, animate } from 'motion/react'

interface CounterAnimationProps {
  value: number
  prefix?: string
  className?: string
  duration?: number
}

export default function CounterAnimation({
  value,
  prefix = '$',
  className = '',
  duration = 2,
}: CounterAnimationProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    if (!isInView) return

    const controls = animate(0, value, {
      duration,
      ease: 'easeOut',
      onUpdate: (v) => setDisplayValue(Math.round(v)),
    })

    return () => controls.stop()
  }, [isInView, value, duration])

  const formatted = displayValue.toLocaleString('es-AR')

  return (
    <span ref={ref} className={className}>
      {prefix}
      {formatted}
    </span>
  )
}
