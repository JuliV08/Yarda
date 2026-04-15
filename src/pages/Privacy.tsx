import { Link } from 'react-router-dom'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import WhatsAppButton from '@/components/WhatsAppButton'

export default function Privacy() {
  return (
    <>
      <Navbar />
      <main className="pt-28 pb-20">
        <div className="mx-auto max-w-3xl px-4 md:px-8">
          <h1 className="mb-8 text-3xl font-bold text-slate-dark md:text-4xl">
            Política de Privacidad
          </h1>

          <div className="space-y-6 text-sm leading-relaxed text-slate-medium md:text-base">
            <section>
              <h2 className="mb-2 text-lg font-semibold text-slate-dark">
                Responsable del tratamiento
              </h2>
              {/* TODO: completar razón social */}
              <p>
                Yarda Habilita (razón social por confirmar), con domicilio en la
                Ciudad Autónoma de Buenos Aires, Argentina.
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-lg font-semibold text-slate-dark">
                Datos recopilados
              </h2>
              <p>
                Recopilamos los datos personales que el usuario proporciona
                voluntariamente a través del formulario de contacto, WhatsApp o
                correo electrónico: nombre, teléfono y dirección de email.
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-lg font-semibold text-slate-dark">
                Finalidad
              </h2>
              <p>
                Los datos recopilados se utilizan exclusivamente para la gestión
                de consultas y la elaboración de presupuestos relacionados con la
                habilitación de carteles, marquesinas y toldos en CABA.
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-lg font-semibold text-slate-dark">
                Base legal
              </h2>
              <p>
                El tratamiento de datos personales se realiza en conformidad con
                la Ley 25.326 de Protección de Datos Personales de la República
                Argentina y su decreto reglamentario 1558/2001.
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-lg font-semibold text-slate-dark">
                Derechos del usuario
              </h2>
              <p>
                El titular de los datos personales tiene derecho a solicitar el
                acceso, rectificación, supresión y oposición al tratamiento de
                sus datos, conforme lo establecido en la normativa vigente.
                Dichas solicitudes podrán ser realizadas enviando un correo
                electrónico a la dirección indicada en la sección de contacto.
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-lg font-semibold text-slate-dark">
                Uso de cookies
              </h2>
              <p>
                Este sitio puede utilizar cookies técnicas y de analítica
                (Google Analytics) para mejorar la experiencia de navegación.
                Las cookies técnicas son necesarias para el funcionamiento del
                sitio, mientras que las de analítica permiten obtener
                información estadística anónima sobre el uso del mismo. El
                usuario puede configurar su navegador para rechazar cookies en
                cualquier momento.
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-lg font-semibold text-slate-dark">
                Contacto para consultas de privacidad
              </h2>
              {/* TODO: confirmar email de privacidad */}
              <p>
                Para cualquier consulta relacionada con esta política, podés
                escribirnos a{' '}
                <a
                  href="mailto:info@yarda.com.ar"
                  className="text-accent-blue hover:underline"
                >
                  info@yarda.com.ar
                </a>
                .
              </p>
            </section>

            <p className="pt-4 text-xs text-slate-medium/60">
              Última actualización: Abril 2026.
            </p>
          </div>

          <Link
            to="/"
            className="mt-10 inline-flex items-center gap-2 text-sm font-medium text-accent-blue hover:underline"
          >
            ← Volver al inicio
          </Link>
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
