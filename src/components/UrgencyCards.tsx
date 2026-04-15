import { m } from 'motion/react'
import { ShieldAlert, BadgeDollarSign, FileWarning } from 'lucide-react'
import CounterAnimation from './CounterAnimation'
import GradientText from './GradientText'

const scrollToContact = () =>
  document.querySelector('#contacto')?.scrollIntoView({ behavior: 'smooth' })

const sectionVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.25 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
}

export default function UrgencyCards() {
  return (
    <section className="relative py-20 md:py-28" id="saber">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <m.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
        >
          <GradientText className="text-3xl font-bold md:text-4xl lg:text-5xl" animationSpeed={8}>
            ¿Sabías que...?
          </GradientText>
        </m.div>

        <m.div
          className="grid gap-6 md:grid-cols-2 lg:gap-8"
          variants={sectionVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
        >
          {/* Card A — Póliza */}
          <m.div
            variants={cardVariants}
            className="cursor-target relative overflow-hidden rounded-2xl border border-white/30 bg-white/80 p-6 shadow-lg backdrop-blur-lg md:p-8"
          >
            {/* Gradient border accent */}
            <div className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-accent-cyan via-accent-green to-accent-blue" />

            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-accent-cyan/10">
              <ShieldAlert className="h-7 w-7 text-accent-cyan" />
            </div>

            <h3 className="mb-3 text-xl font-bold text-slate-dark">
              Tu póliza podría no cubrirte
            </h3>

            <p className="text-sm leading-relaxed text-slate-medium md:text-base">
              Muchos comercios tienen su cartel asegurado, pero desconocen que en
              la letra chica de la póliza, algunas compañías exigen que la
              cartelería esté debidamente habilitada. En caso de un accidente o
              daño a terceros, si el cartel no cuenta con el permiso
              correspondiente, la aseguradora puede rechazar la cobertura.
              Habilitar tu cartel no es solo cumplir con una inspección — es
              proteger tu comercio y tu responsabilidad.
            </p>
          </m.div>

          {/* Card B — Multas */}
          <m.div
            variants={cardVariants}
            className="cursor-target relative overflow-hidden rounded-2xl border border-white/30 bg-white/80 p-6 shadow-lg backdrop-blur-lg md:p-8"
          >
            <div className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-accent-cyan via-accent-green to-accent-blue" />

            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-accent-blue/10">
              <BadgeDollarSign className="h-7 w-7 text-accent-blue" />
            </div>

            <h3 className="mb-3 text-xl font-bold text-slate-dark">
              ¿Conocés el valor de las multas?
            </h3>

            <p className="text-sm leading-relaxed text-slate-medium md:text-base">
              La Ley 451 de Faltas de CABA establece multas de 13.500 a 68.500
              Unidades Fijas (UF). Cada UF tiene un valor actual de $949,99.
              Eso significa multas que van desde{' '}
              <CounterAnimation
                value={12824000}
                className="font-bold text-slate-dark"
              />{' '}
              hasta más de{' '}
              <CounterAnimation
                value={65074000}
                className="font-bold text-slate-dark"
              />
              .
            </p>

            <a
              href="https://boletinoficialpdf.buenosaires.gob.ar/util/imagen.php?idn=8540&idf=2"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-accent-blue hover:underline"
            >
              Ver Ley 451 — Publicidad prohibida (pág. 53) →
            </a>
          </m.div>

          {/* Card C — ¿Te labraron un acta? */}
          <m.div
            variants={cardVariants}
            className="cursor-target relative overflow-hidden rounded-2xl border border-warning/30 bg-white/80 p-6 shadow-lg backdrop-blur-lg md:col-span-2 md:mx-auto md:max-w-2xl md:p-8"
          >
            <div className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-warning via-red-400 to-warning" />

            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-warning/10">
              <FileWarning className="h-7 w-7 text-warning" />
            </div>

            <h3 className="mb-3 text-xl font-bold text-slate-dark">
              ¿Te labraron un acta?
            </h3>

            <p className="text-sm leading-relaxed text-slate-medium md:text-base">
              Los inspectores del GCBA te otorgan 15 días para regularizar tu
              letrero, marquesina o toldo. Si no lo hacés, pueden labrar un Acta
              de Comprobación (multa), solicitar el retiro del cartel o incluso
              clausurar el local.
            </p>

            <m.button
              onClick={scrollToContact}
              className="cursor-target mt-5 inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-warning to-red-400 px-6 py-3 text-sm font-semibold text-white"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            >
              Resolvelo ahora →
            </m.button>
          </m.div>
        </m.div>
      </div>
    </section>
  )
}
