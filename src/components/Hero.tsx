import { m, useScroll, useTransform } from 'motion/react'
import { useRef, lazy, Suspense } from 'react'
import BlueprintLines from './BlueprintLines'
import './ui/background-gradient-animation.css'

const Orb3D = lazy(() => import('./ui/Orb3D'))

const scrollToContact = () =>
  document.querySelector('#contacto')?.scrollIntoView({ behavior: 'smooth' })

const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.25, delayChildren: 0.4 },
  },
}

const wordVariants = {
  hidden: { opacity: 0, y: 50 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
}

const fadeInVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' as const },
  },
}

const dividerVariants = {
  hidden: { scaleX: 0, opacity: 0 },
  show: {
    scaleX: 1,
    opacity: 1,
    transition: {
      scaleX: { duration: 1.4, ease: [0.25, 0.46, 0.45, 0.94] as const },
      opacity: { duration: 0.3 },
    },
  },
}

const line1Words = ['EVALUAMOS.', 'MEDIMOS.', 'REGULARIZAMOS']

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollY } = useScroll()

  // Parallax layer for blueprint lines
  const linesY = useTransform(scrollY, [0, 600], [0, -50])

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-[85vh] items-center justify-center overflow-hidden pt-36 md:pt-44 lg:h-screen lg:pt-48"
    >
      {/* Layer 1: Slate-blue gradient background — tone +2 (final, approved by client) */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 80% 60% at 50% 35%, hsla(225, 42%, 34%, 0.55) 0%, transparent 70%),
            linear-gradient(180deg, hsl(225, 34%, 23%) 0%, hsl(225, 38%, 19%) 55%, hsl(225, 44%, 15%) 100%)
          `,
        }}
      />

      {/* Subtle vignette at edges */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at center, transparent 40%, hsla(225, 50%, 8%, 0.45) 100%)',
        }}
      />

      {/* Layer 1.5: Animated gradient blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-60">
        <div
          className="animate-first absolute h-[50%] w-[50%] rounded-full"
          style={{
            top: 'calc(50% - 25%)',
            left: 'calc(50% - 25%)',
            background: 'radial-gradient(circle at center, rgba(66,202,215,0.3) 0%, transparent 50%)',
            filter: 'blur(60px)',
            mixBlendMode: 'screen',
          }}
        />
        <div
          className="animate-second absolute h-[45%] w-[45%] rounded-full"
          style={{
            top: 'calc(50% - 22%)',
            left: 'calc(50% - 22%)',
            background: 'radial-gradient(circle at center, rgba(51,204,102,0.25) 0%, transparent 50%)',
            filter: 'blur(60px)',
            transformOrigin: 'calc(50% - 400px)',
            mixBlendMode: 'screen',
          }}
        />
        <div
          className="animate-third absolute h-[50%] w-[50%] rounded-full"
          style={{
            top: 'calc(50% - 25%)',
            left: 'calc(50% - 25%)',
            background: 'radial-gradient(circle at center, rgba(64,128,232,0.25) 0%, transparent 50%)',
            filter: 'blur(60px)',
            transformOrigin: 'calc(50% + 400px)',
            mixBlendMode: 'screen',
          }}
        />
      </div>

      {/* Layer 1.8: Blueprint corner brackets — registration marks */}
      <div className="pointer-events-none absolute inset-0 z-[4]">
        {[
          { pos: 'top-6 left-6 md:top-10 md:left-10', rotate: 0 },
          { pos: 'top-6 right-6 md:top-10 md:right-10', rotate: 90 },
          { pos: 'bottom-6 right-6 md:bottom-10 md:right-10', rotate: 180 },
          { pos: 'bottom-6 left-6 md:bottom-10 md:left-10', rotate: 270 },
        ].map((corner, i) => (
          <m.svg
            key={i}
            className={`absolute ${corner.pos} h-8 w-8 md:h-12 md:w-12`}
            viewBox="0 0 48 48"
            fill="none"
            style={{ transform: `rotate(${corner.rotate}deg)` }}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.55, 0.35, 0.55] }}
            transition={{
              opacity: {
                times: [0, 0.3, 0.65, 1],
                duration: 4,
                delay: 1.8 + i * 0.12,
                repeat: Infinity,
                repeatType: 'reverse',
                ease: 'easeInOut',
              },
            }}
          >
            <m.path
              d="M 2 16 L 2 2 L 16 2"
              stroke="rgba(66,202,215,0.85)"
              strokeWidth="1.5"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.9, delay: 1.8 + i * 0.12, ease: [0.25, 0.46, 0.45, 0.94] }}
            />
          </m.svg>
        ))}
      </div>

      {/* Layer 2: Blueprint lines — medium parallax */}
      <m.div className="absolute inset-0" style={{ y: linesY }}>
        <BlueprintLines opacity={0.1} animated />
      </m.div>

      {/* Layer 2.5: 3D Orb — centered, fades in after hero stagger */}
      <m.div
        className="pointer-events-none absolute inset-0 z-[5]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.8, delay: 1.2, ease: 'easeOut' }}
      >
        <div
          className="absolute left-1/2 top-1/2 h-[75vh] w-[75vh] -translate-x-1/2 -translate-y-1/2 md:h-[90vh] md:w-[90vh] lg:h-[110vh] lg:w-[110vh]"
          style={{
            maskImage: 'radial-gradient(circle, black 25%, transparent 52%)',
            WebkitMaskImage: 'radial-gradient(circle, black 25%, transparent 52%)',
          }}
        >
          <Suspense fallback={null}>
            <Orb3D />
          </Suspense>
        </div>
      </m.div>

      {/* Layer 3: Centered content */}
      <div className="relative z-10 mx-auto w-full max-w-5xl px-4 py-20 text-center md:px-8 lg:py-0">
        <m.div variants={containerVariants} initial="hidden" animate="show">
          {/* Badge pill */}
          <m.div variants={fadeInVariants} className="mb-7 flex justify-center md:mb-9">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/75 shadow-[0_0_30px_rgba(66,202,215,0.08)] backdrop-blur-sm md:text-xs">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-cyan opacity-70" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent-cyan" />
              </span>
              Habilitaciones en CABA
            </span>
          </m.div>

          {/* Headline — two centered lines */}
          <h1
            className="mb-6 text-3xl font-bold leading-[1.1] tracking-tight text-white md:text-5xl lg:text-6xl xl:text-7xl"
            style={{ textShadow: '0 2px 14px rgba(0,0,0,0.55), 0 0 4px rgba(0,0,0,0.3)' }}
          >
            {/* Line 1 */}
            <div className="mb-1 md:mb-2">
              {line1Words.map((word, i) => (
                <m.span
                  key={`l1-${i}`}
                  variants={wordVariants}
                  className={`inline-block ${i < line1Words.length - 1 ? 'mr-3 md:mr-4' : ''}`}
                >
                  {word}
                </m.span>
              ))}
            </div>
            {/* Line 2 */}
            <div>
              <m.span variants={wordVariants} className="inline-block">
                TU PUBLICIDAD EXTERIOR.
              </m.span>
            </div>
          </h1>

          {/* Divider line — prominent glowing bar, traces from center outwards */}
          <m.div
            variants={dividerVariants}
            className="relative mx-auto mb-7 w-[90%] max-w-3xl md:mb-9"
            style={{ transformOrigin: 'center' }}
          >
            {/* Glow layer — wide soft bloom behind the line */}
            <div
              className="absolute inset-x-0 -top-3 h-8 opacity-60"
              style={{
                background: 'radial-gradient(ellipse 60% 100% at 50% 50%, rgba(66,202,215,0.35) 0%, transparent 70%)',
              }}
            />
            {/* Core line — bright center fading to edges */}
            <div className="relative h-[3px] w-full rounded-full bg-gradient-to-r from-transparent via-white/80 to-transparent" />
            {/* Color tint under the core */}
            <div
              className="absolute inset-x-0 top-0 h-[3px] rounded-full opacity-50"
              style={{
                background: 'linear-gradient(90deg, transparent 10%, hsl(175,65%,55%) 35%, hsl(150,60%,50%) 50%, hsl(220,70%,55%) 65%, transparent 90%)',
              }}
            />
          </m.div>

          {/* Subtitle with text highlight */}
          <m.div variants={fadeInVariants} className="mx-auto mb-10 max-w-3xl">
            <p
              className="text-lg font-medium leading-relaxed text-white/90 md:text-xl lg:text-2xl"
              style={{ textShadow: '0 2px 12px rgba(0,0,0,0.6), 0 0 4px rgba(0,0,0,0.4)' }}
            >
              Somos un equipo especializado en la habilitación de carteles,
              marquesinas y toldos en CABA. Vos seguís trabajando, nosotros
              resolvemos.
            </p>
          </m.div>

          {/* CTAs — centered */}
          <m.div
            variants={fadeInVariants}
            className="flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <m.button
              onClick={scrollToContact}
              className="cursor-target group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-lg px-8 py-4 text-base font-semibold text-white shadow-[0_10px_40px_-10px_rgba(66,202,215,0.4)]"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            >
              <span className="absolute inset-0 bg-gradient-to-br from-accent-cyan via-accent-green to-accent-blue" />
              <span
                className="absolute inset-0 bg-gradient-to-tl from-accent-cyan via-accent-blue to-accent-green opacity-0 group-hover:opacity-100"
                style={{ transition: 'opacity 0.4s' }}
              />
              <span className="relative">Hablá con un especialista</span>
            </m.button>

            <m.button
              onClick={() =>
                document
                  .querySelector('#servicios')
                  ?.scrollIntoView({ behavior: 'smooth' })
              }
              className="cursor-target rounded-lg border border-white/25 bg-white/[0.04] px-8 py-4 text-base font-semibold text-white backdrop-blur-sm hover:border-white/40 hover:bg-white/10"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              style={{ transition: 'background-color 0.2s, border-color 0.2s' }}
            >
              Conocé el proceso
            </m.button>
          </m.div>
        </m.div>
      </div>
    </section>
  )
}
