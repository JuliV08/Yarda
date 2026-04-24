import { useState } from 'react'
import { m } from 'motion/react'
import GradientText from './GradientText'
import Folder from './Folder'
import {
  LayoutGrid,
  ClipboardList,
  Scale,
  FileWarning,
  Lightbulb,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import CircleModal, { modalItemVariants } from './CircleModal'

const scrollToContact = () => {
  // setTimeout para esperar que el body scroll lock del modal se desbloquee
  // (el cleanup del useEffect restaura window.scrollY antes de poder scrollear)
  setTimeout(() => {
    document.querySelector('#contacto')?.scrollIntoView({ behavior: 'smooth' })
  }, 100)
}

interface CircleData {
  id: number
  title: string
  icon: LucideIcon
  emphasis?: 'legal' | 'warning'
}

const circles: CircleData[] = [
  { id: 1, title: 'Tipos de Cartel', icon: LayoutGrid },
  { id: 2, title: 'Desarrollo del Trámite', icon: ClipboardList },
  { id: 3, title: 'Marco Legal', icon: Scale, emphasis: 'legal' },
  { id: 4, title: '¿Te labraron un acta?', icon: FileWarning, emphasis: 'warning' },
  { id: 5, title: 'Lo que debés saber', icon: Lightbulb },
]

const LEY_2936_URL = 'https://www.argentina.gob.ar/normativa/provincial/ley-2936-123456789-0abc-defg-639-2000xvorpyel/actualizacion'

function renderStepDesc(desc: string) {
  const parts = desc.split('__LEY_2936__')
  if (parts.length === 1) return desc
  return (
    <>
      {parts[0]}
      <a
        href={LEY_2936_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="font-medium text-accent-blue underline decoration-accent-blue/40 underline-offset-2 hover:text-accent-cyan hover:decoration-accent-cyan"
      >
        Ley 2936 de Publicidad Exterior
      </a>
      {parts[1]}
    </>
  )
}

const tramiteSteps = [
  { title: 'Factibilidad', desc: 'Verificamos que la dirección-zonificación sean compatibles con el tipo de publicidad.' },
  { title: 'Relevamiento Técnico', desc: 'Visita al local para evaluar, medir y detectar ajustes necesarios. En caso de publicidad nueva, se supervisa la colocación.' },
  { title: 'Documentación', desc: 'Presentación ante organismo correspondiente — datos del solicitante, seguro de responsabilidad civil, habilitación del local o constancia de solicitud de inicio de trámite, planos, cálculos estructurales, encomienda profesional ante el consejo profesional (valor incluido en presupuesto), formularios, DDJJ, fotos.' },
  { title: 'Carga Digital', desc: 'Solicitud de habilitación/permiso ante el organismo oficial, cumplimentando la __LEY_2936__, abono de tasas correspondientes según ley vigente, generación de un número de expediente válido como inicio de trámite para presentar ante organismos de control.' },
  { title: 'Obtención del Permiso', desc: 'Disposición aprobatoria por organismo competente.' },
  { title: 'Alta AGIP', desc: 'Alta del tributo publicitario ante AGIP. Es un importe accesible.' },
]

const signTypes = [
  { name: 'Letrero saliente', desc: 'Perpendicular a la línea oficial o de retiro obligatorio.', image: '/images/tipos-cartel/saliente.webp' },
  { name: 'Letrero frontal', desc: 'Paralelo a la línea oficial, ochava, retiro obligatorio o frente del edificio.', image: '/images/tipos-cartel/frontal.webp' },
  { name: 'Letrero luminoso', desc: 'Anuncio que emite luz propia.', image: '/images/tipos-cartel/iluminado.webp' },
  { name: 'Letrero iluminado', desc: 'Anuncio que recibe luz artificial mediante fuentes luminosas externas.', image: '/images/tipos-cartel/luminoso.webp' },
  { name: 'Marquesina', desc: 'Cubierta fija y no transitable, que puede llevar anuncios en sus caras.', image: '/images/tipos-cartel/marquesina.webp' },
  { name: 'Toldo con o sin publicidad', desc: 'Cubierta no transitable, fija, móvil y/o rebatible.', image: '/images/tipos-cartel/toldo.webp' },
]

export default function CirclesSection() {
  const [activeCircle, setActiveCircle] = useState<number | null>(null)

  const folderItems = circles.map((c) => ({
    id: c.id,
    title: c.title,
    icon: c.icon,
    emphasis: c.emphasis,
    onClick: () => setActiveCircle(c.id),
  }))

  return (
    <section className="relative py-20 md:py-28" id="servicios">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <m.div
          className="mb-8 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
        >
          <GradientText className="text-3xl font-bold md:text-4xl lg:text-5xl" animationSpeed={8}>
            INFORMACIÓN ÚTIL
          </GradientText>
        </m.div>

        {/* Folder — Desktop */}
        <m.div
          className="hidden md:flex justify-center items-end"
          style={{ height: '420px' }}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.7, ease: 'easeOut' as const }}
        >
          <Folder items={folderItems} color="#42CAD7" size={2.5} />
        </m.div>

        {/* Folder — Mobile */}
        <m.div
          className="flex md:hidden flex-col items-center justify-end overflow-visible px-2 pb-6"
          style={{ height: '240px' }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-20px' }}
          transition={{ duration: 0.6, ease: 'easeOut' as const }}
        >
          <Folder items={folderItems} color="#42CAD7" size={1.15} />
        </m.div>
      </div>

      {/* ── Modals ── */}
      <CircleModal
        isOpen={activeCircle === 1}
        onClose={() => setActiveCircle(null)}
        title="Tipos de Cartel"
      >
        {signTypes.map((st, i) => (
          <m.div
            key={i}
            variants={modalItemVariants}
            className="border-b border-slate-light/60 py-4 last:border-0"
          >
            <div className="flex gap-4">
              {/* TODO: reemplazar placeholders con imágenes finales de las clientas */}
              {st.image ? (
                <img
                  src={st.image}
                  alt={st.name}
                  className="h-28 w-36 flex-shrink-0 rounded-lg border border-slate-light object-cover shadow-sm sm:h-32 sm:w-44 md:h-40 md:w-56"
                />
              ) : (
                <div
                  className="flex h-28 w-36 flex-shrink-0 items-center justify-center rounded-lg border border-dashed border-slate-light bg-slate-light/30 text-[11px] font-medium uppercase tracking-wider text-slate-medium/60 sm:h-32 sm:w-44 md:h-40 md:w-56"
                  aria-hidden="true"
                >
                  Foto próximamente
                </div>
              )}
              <div>
                <h4 className="font-semibold text-slate-dark">{st.name}</h4>
                <p className="mt-1 text-sm text-slate-medium">{st.desc}</p>
              </div>
            </div>
          </m.div>
        ))}
        <m.div variants={modalItemVariants} className="mt-4 rounded-lg bg-slate-light/50 p-4">
          <p className="text-sm text-slate-medium">
            <strong className="text-slate-dark">Vigencia del permiso:</strong>{' '}
            Letrero (todos los tipos) y toldo → vigente mientras dure la actividad
            comercial. Marquesina → se renueva cada 5 años.
          </p>
        </m.div>
      </CircleModal>

      <CircleModal
        isOpen={activeCircle === 2}
        onClose={() => setActiveCircle(null)}
        title="Desarrollo del Trámite"
      >
        <div className="relative pl-8">
          <m.div
            className="absolute left-[11px] top-2 w-0.5 bg-gradient-to-b from-accent-cyan via-accent-green to-accent-blue"
            initial={{ height: 0 }}
            animate={{ height: '100%' }}
            transition={{ duration: 1.2, delay: 0.3, ease: 'easeOut' }}
          />
          {tramiteSteps.map((step, i) => (
            <m.div
              key={i}
              variants={modalItemVariants}
              className="relative pb-6 last:pb-0"
            >
              <div className="absolute -left-8 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-accent-cyan to-accent-blue text-xs font-bold text-white">
                {i + 1}
              </div>
              <h4 className="font-semibold text-slate-dark">{step.title}</h4>
              <p className="mt-1 text-sm leading-relaxed text-slate-medium">
                {renderStepDesc(step.desc)}
              </p>
            </m.div>
          ))}
        </div>
      </CircleModal>

      <CircleModal
        isOpen={activeCircle === 3}
        onClose={() => setActiveCircle(null)}
        title="Marco Legal"
      >
        <div className="space-y-3">
          {[
            { label: 'Ley 2936 de Publicidad Exterior', href: 'https://www.argentina.gob.ar/normativa/provincial/ley-2936-123456789-0abc-defg-639-2000xvorpyel/actualizacion' },
            { label: 'Ley 451 de Faltas de CABA (actualizada) — Publicidad prohibida: pág. 53', href: 'https://boletinoficialpdf.buenosaires.gob.ar/util/imagen.php?idn=8540&idf=2' },
            { label: 'AGC — Solicitud de Permiso de Anuncio Publicitario', href: 'https://buenosaires.gob.ar/gcaba_historico/tramites/solicitud-de-permiso-de-anuncio-publicitario-exterior' },
            { label: 'Espacio Público GCBA', href: 'https://buenosaires.gob.ar/espaciopublicoehigieneurbana' },
          ].map((link, i) => (
            <m.a
              key={i}
              variants={modalItemVariants}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-target flex items-center gap-3 rounded-lg border border-slate-light p-4 text-sm font-medium text-slate-dark hover:border-accent-cyan hover:bg-accent-cyan/5"
              style={{ transition: 'border-color 0.2s, background-color 0.2s' }}
            >
              <Scale className="h-4 w-4 flex-shrink-0 text-accent-blue" />
              {link.label}
            </m.a>
          ))}
        </div>
        <m.div variants={modalItemVariants} className="mt-4 rounded-lg bg-slate-light/50 p-4">
          <p className="text-sm text-slate-medium">
            <strong className="text-slate-dark">Valor de la Unidad Fija (UF) actual:</strong>{' '}
            $949,99 (equivalente a medio litro de nafta de mayor octanaje).
          </p>
          <p className="mt-1.5 text-xs text-slate-medium/70 italic">
            * El valor de la UF está sujeto a cambios según la variación del precio de la nafta.
          </p>
        </m.div>
        <m.div variants={modalItemVariants} className="mt-3 rounded-lg border border-accent-cyan/30 bg-accent-cyan/5 p-4">
          <p className="text-sm font-medium text-slate-dark">
            No se puede colocar cualquier cartel de cualquier medida en cualquier
            zona. Existe un código de edificación y reglamentación sobre
            publicidad exterior que debe respetarse.
          </p>
        </m.div>
      </CircleModal>

      <CircleModal
        isOpen={activeCircle === 4}
        onClose={() => setActiveCircle(null)}
        title="¿Te labraron un acta?"
      >
        <m.p variants={modalItemVariants} className="text-sm leading-relaxed text-slate-medium md:text-base">
          Si los inspectores del GCBA te labraron un acta, se te otorgan 15
          días HÁBILES para regularizar tu letrero, marquesina o toldo. En
          caso de NO hacerlo, al volver los inspectores se encuentran facultados
          para labrar un Acta de Comprobación (multa). En algunos casos pueden
          solicitar el retiro del cartel o clausura del local, según lo indicado
          en las leyes vigentes.
        </m.p>
        <m.p variants={modalItemVariants} className="mt-4 text-sm leading-relaxed text-slate-medium md:text-base">
          Al obtener el permiso podés subsanar la falta vía TAD en los plazos
          indicados.
        </m.p>
        <m.button
          variants={modalItemVariants}
          onClick={() => { setActiveCircle(null); scrollToContact() }}
          className="mt-6 inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-warning to-red-400 px-6 py-3 text-sm font-semibold text-white"
        >
          Resolvelo ahora →
        </m.button>
      </CircleModal>

      <CircleModal
        isOpen={activeCircle === 5}
        onClose={() => setActiveCircle(null)}
        title="Lo que debés saber"
      >
        {[
          {
            subtitle: 'Tu póliza podría no cubrirte',
            text: 'Muchos comercios tienen su cartel asegurado, pero desconocen que en la letra chica de la póliza, algunas compañías exigen que la cartelería esté debidamente habilitada. En caso de un accidente o daño a terceros, si el cartel no cuenta con el permiso correspondiente, la aseguradora puede rechazar la cobertura. Habilitar tu cartel no es solo cumplir con una inspección — es proteger tu comercio y tu responsabilidad.',
          },
          {
            subtitle: '¿Conocés el valor de las multas?',
            text: 'La Ley 451 de Faltas de CABA establece multas de 13.500 a 68.500 Unidades Fijas (UF). Cada UF tiene un valor de $949,99 (sujeto a actualización tarifaria). Eso significa multas que van desde $12.824.000 hasta más de $65.074.000.',
          },
          {
            subtitle: 'El plano técnico es obligatorio',
            text: 'Para habilitar un cartel, marquesina o toldo en CABA siempre es obligatorio presentar un plano técnico firmado por un profesional matriculado ante el organismo correspondiente (CPIC o CPAU). Ese plano no es un trámite administrativo: es el documento que certifica que la estructura está correctamente calculada, ubicada y colocada de manera segura, cumpliendo con la normativa vigente. Un cartel correctamente habilitado no existe sin plano técnico. Es la base de todo el trámite y la garantía de que tu instalación es segura y legal.',
          },
        ].map((item, i) => (
          <m.div
            key={i}
            variants={modalItemVariants}
            className="border-b border-slate-light/60 py-4 last:border-0"
          >
            <h4 className="mb-2 font-semibold text-slate-dark">{item.subtitle}</h4>
            <p className="text-sm leading-relaxed text-slate-medium">{item.text}</p>
          </m.div>
        ))}
      </CircleModal>
    </section>
  )
}

