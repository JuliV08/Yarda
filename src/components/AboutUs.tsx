import { m } from 'motion/react'
import { Award, Headset, CheckCircle, HardHat, Briefcase } from 'lucide-react'
import GradientText from './GradientText'

const sectionVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
}

const values = [
  {
    icon: Award,
    title: 'Profesionales matriculados',
    desc: 'Arquitectos y Maestros Mayores de Obra con matrícula vigente ante los organismos competentes.',
  },
  {
    icon: Headset,
    title: 'Asesoramiento sin costo',
    desc: 'Consultá sin compromiso. Evaluamos tu caso y te orientamos sobre los pasos a seguir.',
  },
  {
    icon: CheckCircle,
    title: 'Atención personalizada',
    desc: 'Analizamos cada caso individualmente para brindarte tranquilidad y seguridad jurídica.',
  },
]

const roles = [
  { icon: HardHat, label: 'Arquitectos / M.M.O.' },
  { icon: Briefcase, label: 'Soporte comercial y atención al cliente' },
]

export default function AboutUs() {
  return (
    <section className="relative py-20 md:py-28" id="sobre-nosotros">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <m.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
        >
          {/* Title */}
          <m.div variants={itemVariants} className="mb-14 text-center">
            <GradientText className="text-3xl font-bold md:text-4xl lg:text-5xl" animationSpeed={8}>
              Quiénes somos
            </GradientText>
          </m.div>

          {/* Hero card — logo showcase + intro */}
          <m.div
            variants={itemVariants}
            className="relative mb-16 overflow-hidden rounded-2xl border border-white/40 bg-white/70 shadow-lg backdrop-blur-xl"
          >
            {/* Gradient accent top */}
            <div className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-accent-cyan via-accent-green to-accent-blue" />

            <div className="flex flex-col items-center gap-10 p-8 md:flex-row md:items-center md:gap-14 md:p-12 lg:p-16">
              {/* Logo — large, centered on mobile, left on desktop */}
              <m.div
                className="relative flex flex-shrink-0 items-center justify-center"
                whileHover={{ scale: 1.04 }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              >
                {/* Subtle glow behind logo */}
                <div className="absolute inset-0 scale-110 rounded-full bg-gradient-to-br from-accent-cyan/10 via-accent-green/5 to-accent-blue/10 blur-2xl" />
                <img
                  src="/images/logo.png"
                  alt="Yarda Habilita"
                  className="relative h-36 w-auto object-contain md:h-44 lg:h-52"
                />
              </m.div>

              <div className="flex-1 text-center md:text-left">
                <p className="text-lg leading-relaxed text-slate-dark md:text-xl">
                  Somos un equipo especializado en la regularización y habilitación de
                  carteles, marquesinas y toldos en CABA.
                </p>
                <p className="mt-3 text-base leading-relaxed text-slate-medium">
                  Trabajamos con rapidez, precisión técnica y conocimiento normativo para
                  que tu comercio quede en regla sin demoras, respondiendo ante
                  requerimientos e intimaciones.
                </p>

                {/* Role badges */}
                <div className="mt-6 flex flex-wrap justify-center gap-3 md:justify-start">
                  {roles.map((r, i) => {
                    const Icon = r.icon
                    return (
                      <span
                        key={i}
                        className="inline-flex items-center gap-2 rounded-full border border-white/50 bg-white/60 px-4 py-2 text-sm font-medium text-slate-dark shadow-sm backdrop-blur-sm"
                      >
                        <Icon className="h-4 w-4 text-accent-cyan" />
                        {r.label}
                      </span>
                    )
                  })}
                </div>
              </div>
            </div>
          </m.div>

          {/* Values — three columns */}
          <m.div
            variants={itemVariants}
            className="grid gap-6 sm:grid-cols-3"
          >
            {values.map((v, i) => {
              const Icon = v.icon
              return (
                <m.div
                  key={i}
                  className="cursor-target group relative overflow-hidden rounded-xl border border-white/40 bg-white/60 p-6 backdrop-blur-sm"
                  whileHover={{ y: -4 }}
                  transition={{ type: 'spring' as const, stiffness: 300, damping: 25 }}
                >
                  {/* Side accent */}
                  <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-accent-cyan via-accent-green to-accent-blue opacity-60" />

                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-accent-cyan/10 to-accent-blue/10">
                    <Icon className="h-6 w-6 text-accent-cyan" />
                  </div>
                  <h4 className="mb-2 text-base font-bold text-slate-dark">{v.title}</h4>
                  <p className="text-sm leading-relaxed text-slate-medium">{v.desc}</p>
                </m.div>
              )
            })}
          </m.div>
        </m.div>
      </div>
    </section>
  )
}
