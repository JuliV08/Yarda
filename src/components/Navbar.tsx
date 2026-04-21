import { useState, useRef, useEffect } from 'react'
import { m, AnimatePresence } from 'motion/react'
import { useScrollPosition } from '@/hooks/useScrollPosition'

const navLinks = [
  { label: 'Sobre Nosotros', href: '#sobre-nosotros' },
  { label: 'Información útil', href: '#servicios' },
  { label: 'Lo que debés saber', href: '#saber' },
  { label: 'Contacto', href: '#contacto' },
]

const scrollToContact = () =>
  document.querySelector('#contacto')?.scrollIntoView({ behavior: 'smooth' })

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const isScrolled = useScrollPosition(50)
  const hasRevealedRef = useRef(false)
  const [showCurtain, setShowCurtain] = useState(false)
  const [curtainDone, setCurtainDone] = useState(false)

  /* Trigger gradient curtain on first scroll */
  useEffect(() => {
    if (isScrolled && !hasRevealedRef.current) {
      hasRevealedRef.current = true
      setShowCurtain(true)
    }
  }, [isScrolled])

  const handleNavClick = (href: string) => {
    setMobileOpen(false)
    const el = document.querySelector(href)
    el?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <m.nav
      className={`fixed top-0 left-0 right-0 z-50 ${
        isScrolled
          ? `bg-white/80 backdrop-blur-xl shadow-sm ${curtainDone ? 'border-b border-border' : ''}`
          : 'bg-transparent'
      }`}
      style={{ transition: 'background-color 0.3s, border-color 0.3s, box-shadow 0.3s, padding 0.3s' }}
    >
      {/* Gradient curtain reveal — fires once on first scroll */}
      {showCurtain && (
        <m.div
          className="absolute -inset-x-0 -bottom-px top-0 z-[1] bg-gradient-to-r from-accent-cyan via-accent-green to-accent-blue"
          initial={{ x: '-100%' }}
          animate={{ x: '100%' }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          onAnimationComplete={() => {
            setShowCurtain(false)
            setCurtainDone(true)
          }}
        />
      )}

      <div className={`relative z-[2] mx-auto max-w-7xl flex items-center justify-between sm:justify-center sm:gap-2 md:gap-3 lg:gap-5 px-4 sm:px-5 md:px-6 lg:px-8 ${
        isScrolled ? 'py-2' : 'py-3'
      }`}>
        {/* Logo */}
        <a href="/" className="flex-shrink-0">
          <img
            src="/images/logo.png"
            alt="Yarda Habilita"
            className={`w-auto object-contain ${isScrolled ? 'h-24 sm:h-12 md:h-16 lg:h-28' : 'h-28 sm:h-14 md:h-20 lg:h-32'}`}
            style={{ transition: 'height 0.3s' }}
          />
        </a>

        {/* Tablet + desktop links — inline from sm (≥640px) so small tablets (≤767px) also see pills */}
        <div className="hidden sm:flex items-center gap-1 md:gap-1.5 lg:gap-2">
          {navLinks.map((link) => (
            <m.button
              key={link.href}
              onClick={() => handleNavClick(link.href)}
              className="cursor-target group relative rounded-full px-2.5 py-1 text-[11px] font-semibold md:px-3 md:py-1.5 md:text-xs lg:px-5 lg:py-2 lg:text-sm"
              whileHover={{ scale: 1.05, y: -1 }}
              whileTap={{ scale: 0.96 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            >
              {/* Gradient border ring — thick, fully saturated, always visible */}
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-full"
                style={{
                  padding: '2px',
                  background:
                    'linear-gradient(135deg, #42CAD7, #33CC66, #4080E8)',
                  WebkitMask:
                    'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                  WebkitMaskComposite: 'xor',
                  maskComposite: 'exclude',
                }}
              />
              {/* Contextual fill — bright glass with brand tint */}
              <span
                className={`absolute inset-[2px] rounded-full backdrop-blur-sm ${
                  isScrolled
                    ? 'bg-gradient-to-br from-white via-white to-accent-cyan/10'
                    : 'bg-gradient-to-br from-white/[0.12] via-white/[0.08] to-accent-cyan/[0.12]'
                }`}
                style={{ transition: 'background-color 0.3s' }}
              />
              {/* Soft outer glow — subtle brand presence */}
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-full opacity-0 group-hover:opacity-100"
                style={{
                  boxShadow:
                    '0 6px 20px -6px rgba(66,202,215,0.55), 0 0 0 3px rgba(66,202,215,0.12)',
                  transition: 'opacity 0.35s',
                }}
              />
              <span
                className={`relative ${isScrolled ? 'text-slate-dark' : 'text-white'}`}
                style={{ transition: 'color 0.3s' }}
              >
                {link.label}
              </span>
            </m.button>
          ))}

          {/* CTA button — same gradient, extra shadow + ring to keep visual hierarchy */}
          <m.button
            onClick={() => { setMobileOpen(false); scrollToContact() }}
            className="cursor-target group relative ml-0.5 overflow-hidden rounded-full px-3 py-1.5 text-[11px] font-semibold text-white shadow-[0_6px_18px_-6px_rgba(66,202,215,0.55)] ring-1 ring-white/20 md:ml-1 md:px-4 md:py-2 md:text-xs lg:px-6 lg:py-2.5 lg:text-sm"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          >
            <span className="absolute inset-0 bg-gradient-to-br from-accent-cyan via-accent-green to-accent-blue" />
            <span
              className="absolute inset-0 bg-gradient-to-tl from-accent-cyan via-accent-blue to-accent-green opacity-0 group-hover:opacity-100"
              style={{ transition: 'opacity 0.4s' }}
            />
            <span className="absolute inset-0 shadow-[inset_0_1px_1px_rgba(255,255,255,0.3)]" />
            <span className="relative">Consultá gratis</span>
          </m.button>

          {/* Social icons — after CTA (hidden on tablet to save space) */}
          <a
            href="https://www.instagram.com/yarda.habilita"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className={`cursor-target ml-2 hidden h-9 w-9 items-center justify-center rounded-full lg:flex ${
              isScrolled
                ? 'text-slate-medium hover:text-accent-cyan'
                : 'text-white/70 hover:text-white'
            }`}
            style={{ transition: 'color 0.2s' }}
          >
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
          </a>
          <a
            href="https://wa.me/5491165705959"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
            className={`cursor-target hidden h-9 w-9 items-center justify-center rounded-full lg:flex ${
              isScrolled
                ? 'text-slate-medium hover:text-[#25D366]'
                : 'text-white/70 hover:text-[#25D366]'
            }`}
            style={{ transition: 'color 0.2s' }}
          >
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="relative h-5 w-6 sm:hidden"
          aria-label={mobileOpen ? 'Cerrar menú' : 'Abrir menú'}
        >
          <m.span
            className={`absolute left-0 block h-0.5 w-6 rounded-full ${isScrolled ? 'bg-slate-dark' : 'bg-white'}`}
            animate={mobileOpen ? { top: '9px', rotate: 45 } : { top: '0px', rotate: 0 }}
            transition={{ duration: 0.3 }}
            style={{ top: '0px' }}
          />
          <m.span
            className={`absolute left-0 top-[9px] block h-0.5 w-6 rounded-full ${isScrolled ? 'bg-slate-dark' : 'bg-white'}`}
            animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 0.2 }}
          />
          <m.span
            className={`absolute left-0 block h-0.5 w-6 rounded-full ${isScrolled ? 'bg-slate-dark' : 'bg-white'}`}
            animate={mobileOpen ? { top: '9px', rotate: -45 } : { top: '18px', rotate: 0 }}
            transition={{ duration: 0.3 }}
            style={{ top: '18px' }}
          />
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <m.div
            key="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-b border-border bg-white/95 backdrop-blur-xl sm:hidden"
          >
            <div className="flex flex-col gap-2.5 px-4 py-4">
              {navLinks.map((link, i) => (
                <m.button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className="relative rounded-full px-5 py-3 text-center text-sm font-semibold"
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.3 }}
                >
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-0 rounded-full"
                    style={{
                      padding: '2px',
                      background:
                        'linear-gradient(135deg, #42CAD7, #33CC66, #4080E8)',
                      WebkitMask:
                        'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                      WebkitMaskComposite: 'xor',
                      maskComposite: 'exclude',
                    }}
                  />
                  <span className="absolute inset-[2px] rounded-full bg-gradient-to-br from-white via-white to-accent-cyan/10" />
                  <span className="relative text-slate-dark">{link.label}</span>
                </m.button>
              ))}
              <m.button
                onClick={() => { setMobileOpen(false); scrollToContact() }}
                className="relative mt-1 overflow-hidden rounded-full px-4 py-3 text-center text-sm font-semibold text-white shadow-[0_6px_18px_-6px_rgba(66,202,215,0.55)] ring-1 ring-white/20"
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navLinks.length * 0.06, duration: 0.3 }}
              >
                <span className="absolute inset-0 bg-gradient-to-br from-accent-cyan via-accent-green to-accent-blue" />
                <span className="absolute inset-0 shadow-[inset_0_1px_1px_rgba(255,255,255,0.3)]" />
                <span className="relative">Consultá gratis</span>
              </m.button>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </m.nav>
  )
}
