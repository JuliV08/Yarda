import { m, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'

const paths = [
  // Horizontal guidelines
  'M 0 180 L 1440 180',
  'M 0 420 L 1440 420',
  'M 0 660 L 1440 660',
  // Perspective lines converging to vanishing point (720, 80)
  'M 0 900 L 720 80',
  'M 360 900 L 720 80',
  'M 1080 900 L 720 80',
  'M 1440 900 L 720 80',
  // Vertical center axis
  'M 720 0 L 720 900',
  // Diagonals for depth
  'M 0 0 L 480 900',
  'M 1440 0 L 960 900',
]

interface BlueprintLinesProps {
  className?: string
  opacity?: number
  animated?: boolean
  parallax?: boolean
}

export default function BlueprintLines({
  className = '',
  opacity = 0.15,
  animated = true,
  parallax = false,
}: BlueprintLinesProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, -50])

  return (
    <m.div
      ref={ref}
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
      style={parallax ? { y } : undefined}
    >
      <svg
        viewBox="0 0 1440 900"
        fill="none"
        className="h-full w-full"
        preserveAspectRatio="xMidYMid slice"
      >
        {paths.map((d, i) => (
          <m.path
            key={i}
            d={d}
            stroke="currentColor"
            strokeWidth={1}
            className="text-slate-medium"
            style={{ opacity }}
            initial={animated ? { pathLength: 0 } : undefined}
            animate={{ pathLength: 1 }}
            transition={{
              duration: 2.2,
              delay: i * 0.18,
              ease: 'easeInOut',
            }}
          />
        ))}
      </svg>
    </m.div>
  )
}
