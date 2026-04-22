import { m } from 'motion/react'
import { FileWarning } from 'lucide-react'
import GradientText from './GradientText'

const scrollToContact = () =>
  document.querySelector('#contacto')?.scrollIntoView({ behavior: 'smooth' })

export default function ServiceReach() {
  return (
    <section className="relative py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <m.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="mb-7 md:mb-8">
            <GradientText className="text-3xl font-bold md:text-4xl" animationSpeed={8}>
              ALCANCE DEL SERVICIO
            </GradientText>
          </div>
          <p className="mb-10 text-base text-slate-medium md:text-lg">
            Trabajamos exclusivamente en la Ciudad Autónoma de Buenos Aires.
          </p>
        </m.div>

        <div className="grid gap-6 md:grid-cols-5 lg:gap-8">
          {/* Mapa CABA — imagen estática en alta resolución */}
          <m.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative overflow-hidden rounded-2xl border border-slate-light shadow-lg md:col-span-3"
          >
            <img
              src="/images/caba.webp"
              alt="Mapa de la Ciudad Autónoma de Buenos Aires — alcance del servicio de Yarda"
              width={1023}
              height={1023}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover"
            />
          </m.div>

          {/* "Te labraron un acta?" — 2 cols */}
          <m.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="relative flex flex-col justify-center overflow-hidden rounded-2xl border border-warning/30 bg-white/80 p-6 shadow-lg backdrop-blur-lg md:col-span-2 md:p-8"
          >
            <div className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-warning via-red-400 to-warning" />

            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-warning/10">
              <FileWarning className="h-7 w-7 text-warning" />
            </div>

            <h3 className="mb-3 text-xl font-bold text-slate-dark">
              ¿Te labraron un acta?
            </h3>

            <p className="text-sm leading-relaxed text-slate-medium md:text-base">
              Tenés 15 días HÁBILES para regularizar tu cartelería. Si no lo
              hacés, pueden multarte, retirar el cartel o clausurar el local.
              Al obtener el permiso podés subsanar la falta vía TAD.
            </p>

            <m.button
              onClick={scrollToContact}
              className="cursor-target mt-5 inline-flex items-center gap-2 self-start rounded-lg bg-gradient-to-r from-warning to-red-400 px-6 py-3 text-sm font-semibold text-white"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            >
              Resolvelo ahora →
            </m.button>
          </m.div>
        </div>
      </div>
    </section>
  )
}
