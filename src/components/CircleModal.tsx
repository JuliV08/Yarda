import { m, AnimatePresence } from 'motion/react'
import type { ReactNode } from 'react'
import { X } from 'lucide-react'

interface CircleModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  children: ReactNode
}

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
}

const modalVariants = {
  hidden: { opacity: 0, scale: 0.85, y: 30 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: 'spring' as const, stiffness: 300, damping: 25 },
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    y: 20,
    transition: { duration: 0.2 },
  },
}

const contentVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.2 },
  },
}

export const modalItemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: 'easeOut' as const },
  },
}

export default function CircleModal({ isOpen, onClose, title, children }: CircleModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <m.div
          key="modal-backdrop"
          className="fixed inset-0 z-[60] flex items-center justify-center p-4"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          {/* Backdrop */}
          <m.div
            className="absolute inset-0 bg-slate-dark/60 backdrop-blur-sm"
            onClick={onClose}
            initial={{ backdropFilter: 'blur(0px)' }}
            animate={{ backdropFilter: 'blur(6px)' }}
            exit={{ backdropFilter: 'blur(0px)' }}
          />

          {/* Modal Container */}
          <m.div
            className="relative flex w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-white/20 bg-white/95 shadow-2xl backdrop-blur-2xl"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Decorative blueprint line */}
            <svg
              className="pointer-events-none absolute right-4 top-4 z-0 h-24 w-24 text-slate-medium/10"
              viewBox="0 0 100 100"
              fill="none"
            >
              <path d="M 0 100 L 50 10 L 100 100" stroke="currentColor" strokeWidth={0.5} />
              <path d="M 0 60 L 100 60" stroke="currentColor" strokeWidth={0.5} />
            </svg>

            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute right-4 top-4 z-20 rounded-full p-2 text-slate-medium hover:bg-slate-light hover:text-slate-dark"
              aria-label="Cerrar"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Scrollable Area */}
            <div className="relative z-10 max-h-[85vh] w-full overflow-y-auto p-6 md:p-8">
              {/* Title */}
              <m.h3
                className="mb-6 pr-10 text-2xl font-bold text-slate-dark"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                {title}
              </m.h3>

              {/* Content with stagger */}
              <m.div variants={contentVariants} initial="hidden" animate="visible">
                {children}
              </m.div>
            </div>
          </m.div>
        </m.div>
      )}
    </AnimatePresence>
  )
}
