import { useState } from 'react'
import { m } from 'motion/react'
import { FileWarning } from 'lucide-react'
import GradientText from './GradientText'

const scrollToContact = () =>
  document.querySelector('#contacto')?.scrollIntoView({ behavior: 'smooth' })

export default function ServiceReach() {
  const [mapActive, setMapActive] = useState(false)

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
          {/* Map — 3 cols */}
          <m.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative overflow-hidden rounded-2xl border border-slate-light shadow-lg md:col-span-3"
            onMouseLeave={() => setMapActive(false)}
          >
            {!mapActive && (
              <div
                className="absolute inset-0 z-10 flex items-end justify-center pb-6"
                onClick={() => setMapActive(true)}
              >
                <span className="cursor-target rounded-full bg-slate-dark/70 px-5 py-2 text-sm font-medium text-white backdrop-blur-sm">
                  Hacé click para explorar el mapa
                </span>
              </div>
            )}

            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d52551.19784444934!2d-58.45706054726564!3d-34.61566740959498!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcca3b4ef90cbd%3A0xa0b3812e88e88e87!2sBuenos%20Aires%2C%20CABA!5e0!3m2!1ses-419!2sar!4v1680000000000!5m2!1ses-419!2sar"
              width="100%"
              height="320"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Mapa CABA — Alcance del servicio de Yarda"
              className={`w-full ${!mapActive ? 'pointer-events-none' : ''}`}
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
