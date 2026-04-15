import { clsx } from 'clsx'
import { useEffect, useRef, useState } from 'react'
import './background-gradient-animation.css'

/* Colores de marca Yarda en RGB */
const DEFAULTS = {
  firstColor: '66, 202, 215',     // accent-cyan
  secondColor: '51, 204, 102',    // accent-green
  thirdColor: '64, 128, 232',     // accent-blue
  fourthColor: '66, 202, 215',    // accent-cyan
  fifthColor: '51, 204, 102',     // accent-green
  pointerColor: '64, 128, 232',   // accent-blue
}

export function BackgroundGradientAnimation({
  gradientBackgroundStart = '#1b1d32',
  gradientBackgroundEnd = '#1b1d32',
  firstColor = DEFAULTS.firstColor,
  secondColor = DEFAULTS.secondColor,
  thirdColor = DEFAULTS.thirdColor,
  fourthColor = DEFAULTS.fourthColor,
  fifthColor = DEFAULTS.fifthColor,
  pointerColor = DEFAULTS.pointerColor,
  size = '50%',
  blendingValue = 'hard-light',
  children,
  className,
  interactive = true,
  containerClassName,
}: {
  gradientBackgroundStart?: string
  gradientBackgroundEnd?: string
  firstColor?: string
  secondColor?: string
  thirdColor?: string
  fourthColor?: string
  fifthColor?: string
  pointerColor?: string
  size?: string
  blendingValue?: string
  children?: React.ReactNode
  className?: string
  interactive?: boolean
  containerClassName?: string
}) {
  const interactiveRef = useRef<HTMLDivElement>(null)
  const curXRef = useRef(0)
  const curYRef = useRef(0)
  const tgXRef = useRef(0)
  const tgYRef = useRef(0)
  const animationFrameRef = useRef<number | null>(null)
  const [isSafari, setIsSafari] = useState(false)

  useEffect(() => {
    document.body.style.setProperty('--gradient-background-start', gradientBackgroundStart)
    document.body.style.setProperty('--gradient-background-end', gradientBackgroundEnd)
    document.body.style.setProperty('--first-color', firstColor)
    document.body.style.setProperty('--second-color', secondColor)
    document.body.style.setProperty('--third-color', thirdColor)
    document.body.style.setProperty('--fourth-color', fourthColor)
    document.body.style.setProperty('--fifth-color', fifthColor)
    document.body.style.setProperty('--pointer-color', pointerColor)
    document.body.style.setProperty('--size', size)
    document.body.style.setProperty('--blending-value', blendingValue)
  }, [
    gradientBackgroundStart, gradientBackgroundEnd,
    firstColor, secondColor, thirdColor, fourthColor, fifthColor,
    pointerColor, size, blendingValue,
  ])

  useEffect(() => {
    setIsSafari(/^((?!chrome|android).)*safari/i.test(navigator.userAgent))
  }, [])

  useEffect(() => {
    if (!interactive) return

    function animateMovement() {
      if (!interactiveRef.current) {
        animationFrameRef.current = requestAnimationFrame(animateMovement)
        return
      }
      curXRef.current += (tgXRef.current - curXRef.current) / 20
      curYRef.current += (tgYRef.current - curYRef.current) / 20
      interactiveRef.current.style.transform =
        `translate(${Math.round(curXRef.current)}px, ${Math.round(curYRef.current)}px)`
      animationFrameRef.current = requestAnimationFrame(animateMovement)
    }

    animationFrameRef.current = requestAnimationFrame(animateMovement)
    return () => {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [interactive])

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!interactiveRef.current) return
    const rect = interactiveRef.current.getBoundingClientRect()
    tgXRef.current = event.clientX - rect.left
    tgYRef.current = event.clientY - rect.top
  }

  return (
    <div
      className={clsx(
        'relative bg-[linear-gradient(40deg,var(--gradient-background-start),var(--gradient-background-end))]',
        containerClassName,
      )}
    >
      <svg className="hidden">
        <defs>
          <filter id="blurMe">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8"
              result="goo"
            />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>

      {/* Blueprint grid — between blobs and content */}
      <div
        className="pointer-events-none absolute inset-0 z-[5]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(108,122,163,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(108,122,163,0.1) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      {/* Content layer — sits above the gradient blobs and grid */}
      <div className={clsx('relative z-10', className)}>{children}</div>

      {/* Gradient blobs layer — behind content */}
      <div
        className={clsx(
          'gradients-container absolute inset-0 h-full w-full overflow-hidden blur-lg',
          isSafari ? 'blur-2xl' : '[filter:url(#blurMe)_blur(40px)]',
        )}
      >
        <div
          className={clsx(
            'absolute [background:radial-gradient(circle_at_center,_rgba(var(--first-color),_0.35)_0,_rgba(var(--first-color),_0)_50%)_no-repeat]',
            '[mix-blend-mode:var(--blending-value)] w-[var(--size)] h-[var(--size)] top-[calc(50%-var(--size)/2)] left-[calc(50%-var(--size)/2)]',
            '[transform-origin:center_center]',
            'animate-first',
          )}
        />
        <div
          className={clsx(
            'absolute [background:radial-gradient(circle_at_center,_rgba(var(--second-color),_0.3)_0,_rgba(var(--second-color),_0)_50%)_no-repeat]',
            '[mix-blend-mode:var(--blending-value)] w-[var(--size)] h-[var(--size)] top-[calc(50%-var(--size)/2)] left-[calc(50%-var(--size)/2)]',
            '[transform-origin:calc(50%-400px)]',
            'animate-second',
          )}
        />
        <div
          className={clsx(
            'absolute [background:radial-gradient(circle_at_center,_rgba(var(--third-color),_0.3)_0,_rgba(var(--third-color),_0)_50%)_no-repeat]',
            '[mix-blend-mode:var(--blending-value)] w-[var(--size)] h-[var(--size)] top-[calc(50%-var(--size)/2)] left-[calc(50%-var(--size)/2)]',
            '[transform-origin:calc(50%+400px)]',
            'animate-third',
          )}
        />
        <div
          className={clsx(
            'absolute [background:radial-gradient(circle_at_center,_rgba(var(--fourth-color),_0.25)_0,_rgba(var(--fourth-color),_0)_50%)_no-repeat]',
            '[mix-blend-mode:var(--blending-value)] w-[var(--size)] h-[var(--size)] top-[calc(50%-var(--size)/2)] left-[calc(50%-var(--size)/2)]',
            '[transform-origin:calc(50%-200px)]',
            'animate-fourth',
          )}
        />
        <div
          className={clsx(
            'absolute [background:radial-gradient(circle_at_center,_rgba(var(--fifth-color),_0.3)_0,_rgba(var(--fifth-color),_0)_50%)_no-repeat]',
            '[mix-blend-mode:var(--blending-value)] w-[var(--size)] h-[var(--size)] top-[calc(50%-var(--size)/2)] left-[calc(50%-var(--size)/2)]',
            '[transform-origin:calc(50%-800px)_calc(50%+800px)]',
            'animate-fifth',
          )}
        />
        {interactive && (
          <div
            ref={interactiveRef}
            onMouseMove={handleMouseMove}
            className={clsx(
              'absolute [background:radial-gradient(circle_at_center,_rgba(var(--pointer-color),_0.3)_0,_rgba(var(--pointer-color),_0)_50%)_no-repeat]',
              '[mix-blend-mode:var(--blending-value)] w-full h-full -top-1/2 -left-1/2',
            )}
          />
        )}
      </div>
    </div>
  )
}
