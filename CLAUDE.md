# PROMPT DE EJECUCIÓN — YARDA HABILITA

Proyecto: Sitio web para Yarda — empresa de habilitación de carteles, marquesinas y toldos en CABA.
Motor de ejecución: Claude Opus.
Redactado por: Director de Proyectos, Villex.

---

## CONTEXTO DEL SISTEMA

Sos un desarrollador frontend senior especializado en React y diseño web premium. Vas a construir desde cero el sitio web de Yarda, una empresa que gestiona habilitaciones de carteles, marquesinas y toldos ante los organismos del Gobierno de la Ciudad de Buenos Aires (GCBA).

IDIOMA: Todo el contenido del sitio está en español argentino. Usá "vos/tu" según el contexto del copy. Los skills técnicos que tenés en el repositorio (.claude/skills/) están en inglés. Son referencias técnicas de implementación — usalos como guías de código, no los traduzcas ni los mezcles con el contenido visible del sitio.

CONTEXTO DE NEGOCIO: El archivo "IDEAS WEB competencia .md" en la raíz del repositorio contiene un análisis completo de la competencia y las ideas de las clientas para el sitio. LEELO COMPLETO ANTES DE ESCRIBIR UNA SOLA LÍNEA DE CÓDIGO. Contiene definiciones textuales de todos los servicios, pasos del trámite, tipos de cartel, marco legal, y comentarios de las clientas sobre qué les gustó de la competencia y qué no.

La competencia tiene sitios MUY anticuados y básicos. El objetivo de Yarda es diferenciarse con un sitio que se vea CARO, MODERNO, PROFESIONAL y TÉCNICAMENTE IMPECABLE, sin perder la seriedad del rubro. El sitio debe sentirse como el de un estudio de arquitectura premium, no como el de una consultora genérica. Debe ser una experiencia visual que el usuario recuerde.

---

## STACK TÉCNICO (EXACTO — NO CAMBIAR)

- Framework: Vite + React 19 + TypeScript
- Estilos: Tailwind CSS v4 + shadcn/ui (seguir el skill tailwind-v4-shadcn)
- Animaciones: Motion (ex Framer Motion) — seguir el skill motion
- Routing: React Router DOM
- Deploy target: GitHub Pages + Cloudflare (static site — vite build genera /dist)
- Package manager: npm
- Approach: MOBILE FIRST — diseñar primero para 375px, escalar a tablet (768px) y desktop (1280px+)

SKILLS DISPONIBLES — Tenés 2 skills en .claude/skills/. LEELOS ANTES DE EMPEZAR:
1) .claude/skills/motion/SKILL.md — Guía completa de Motion.
2) .claude/skills/tailwind-v4-shadcn/SKILL.md — Arquitectura de Tailwind v4 con shadcn/ui.

REGLAS CRÍTICAS DE TAILWIND V4:
- NO uses tailwind.config.ts — v4 no lo usa.
- Usá @tailwindcss/vite como plugin de Vite, NO PostCSS.
- Los colores se definen con CSS variables en :root y se mapean con @theme inline.
- Instalá tw-animate-css, NO tailwindcss-animate (está deprecado).
- NO uses @apply (deprecado en v4).
- NO pongas :root/.dark dentro de @layer base.

REGLAS CRÍTICAS DE MOTION:
- Importá desde "motion/react", NO desde "framer-motion".
- AnimatePresence SIEMPRE debe quedar montado — el condicional va ADENTRO.
- Todos los children de AnimatePresence deben tener key único.
- QUITÁ las clases transition-* de Tailwind en elementos que usen Motion (conflicto).
- Usá LazyMotion + m para optimizar bundle size (4.6 KB vs 34 KB).
- Agregá MotionConfig reducedMotion="user" a nivel de la app para accesibilidad.

ASSETS:
- El logo de Yarda está en images/logo.png — usalo en navbar y generá un favicon a partir de él.
- Para imágenes placeholder usá URLs reales de Unsplash con temática de: fachadas comerciales urbanas, carteles, arquitectura Buenos Aires, planos técnicos. Dejá los src listos para reemplazar.

---

## SISTEMA DE DISEÑO

FILOSOFÍA VISUAL — ESTO ES LO MÁS IMPORTANTE DEL PROYECTO:
El diseño gira en torno a la estética de un PLANO TÉCNICO / BLUEPRINT. Mirá el logo: tiene líneas wireframe en perspectiva que forman una marquesina. Esa estética debe PERMEAR todo el sitio:
- Líneas finas (1px) que cruzan secciones como líneas de plano técnico.
- Márgenes cuidadísimos, mucho AIRE / whitespace. Nada cargado.
- Orden y precisión — todo alineado, nada suelto.
- El sitio debe sentirse como un plano arquitectónico moderno e interactivo.

PALETA DE COLORES (extraída directamente del logo):

Bases (Slate Blue):
- slate-primary: hsl(225, 25%, 48%) — el fondo del círculo del logo
- slate-dark: hsl(225, 30%, 15%) — backgrounds oscuros
- slate-medium: hsl(225, 20%, 35%) — textos secundarios
- slate-light: hsl(225, 15%, 90%) — fondos claros

Acentos (gradiente del texto "YARDA" en el logo):
- accent-cyan: hsl(175, 65%, 55%)
- accent-green: hsl(150, 60%, 50%)
- accent-blue: hsl(220, 70%, 55%)
- gradient-brand: linear-gradient(135deg, accent-cyan, accent-green, accent-blue)

Neutrales:
- white: hsl(0, 0%, 100%)
- off-white: hsl(220, 15%, 97%) — fondo general
- sand: hsl(35, 25%, 92%) — acentos cálidos sutiles

Funcionales:
- warning: hsl(0, 70%, 55%) — para el círculo "Te labraron un acta"
- success: hsl(150, 50%, 45%)

TIPOGRAFÍA:
- Títulos: "Space Grotesk" de Google Fonts — geométrica, arquitectónica.
- Body: "Inter" — limpia, profesional, legible.
- Importar ambas en index.html con preconnect a Google Fonts.

ELEMENTOS RECURRENTES:
- Líneas blueprint: líneas finas decorativas, pueden ser SVG animados con line drawing (strokeDasharray + strokeDashoffset animados con Motion). Color slate-medium con opacidad 15-25%.
- Gradiente brand: SOLO como acento (CTAs, hover de círculos, underlines activos, detalles). NUNCA como fondo completo.
- Glassmorphism: para modals — backdrop-blur-xl con borde semi-transparente blanco al 10%.

---

## DIRECCIÓN CREATIVA DE ANIMACIONES (CRÍTICA)

Este sitio debe ser una EXPERIENCIA VISUAL que demuestre que Yarda no es una consultora más. Las animaciones deben ser sofisticadas pero con propósito. Cada una debe guiar la atención, revelar contenido o crear una sensación de premium. NUNCA animaciones gratuitas o que molesten.

ANIMACIONES OBLIGATORIAS — implementar con Motion:

1) HERO — STAGGER REVEAL CINEMATOGRÁFICO:
Las palabras "EVALUAMOS.", "MEDIMOS.", "REGULARIZAMOS" aparecen una por una con una animación de reveal tipo clip-path o translateY + opacity, con un delay de ~0.3s entre cada una. Después, el subtexto y los CTAs aparecen con fade-in. Usá variants de Motion con staggerChildren.

2) LÍNEAS BLUEPRINT ANIMADAS (SVG LINE DRAWING):
Creá un componente BlueprintLines.tsx que renderice líneas SVG en perspectiva (similar a las del logo). Estas líneas se dibujan progresivamente al cargar la página usando strokeDasharray + strokeDashoffset animados con Motion. Usá useScroll + useTransform para que las líneas sigan respondiendo sutilmente al scroll (parallax). Posicionarlas como background de secciones clave (hero, circles section).

3) PARALLAX MULTICAPA EN EL HERO:
No usar un parallax simple. Crear al menos 3 capas:
- Capa 1 (fondo): la imagen de fondo con parallax lento (y: [0, -100])
- Capa 2 (medio): las líneas blueprint SVG con parallax medio (y: [0, -50])
- Capa 3 (frente): el contenido de texto sin parallax (fijo)
Implementar con useScroll + useTransform de Motion.

4) SCROLL-TRIGGERED REVEALS (whileInView):
Todas las secciones al entrar en viewport hacen fade-in + slide-up sutil (y: 40 -> 0, opacity: 0 -> 1) con viewport={{ once: true, margin: "-80px" }}. Las cards y elementos que estén en grupo deben usar staggerChildren para revelarse en secuencia, no todas a la vez.

5) COUNTER ANIMATION PARA MONTOS DE MULTAS:
En la Card B ("¿Conocés el valor de las multas?"), los números de multas ($120.000 hasta $5.000.000) deben animarse con un counter que sube desde 0 hasta el valor final cuando la card entra en viewport. Implementar con useMotionValue + useTransform + animate de Motion, o con un useEffect que anime el valor.

6) CIRCLES — HOVER + OPEN ANIMATION:
Los 5 círculos deben tener:
- Hover: scale(1.08) + sombra con el gradiente brand que aparece como glow sutil detrás. Spring physics (type: "spring", stiffness: 300, damping: 20).
- Click/Open: El modal se abre con una animación de expansión desde la posición del círculo clickeado (si es posible con layoutId de Motion). Si no, usar scale(0.8) + opacity(0) -> scale(1) + opacity(1) con spring. El backdrop aparece con fade.
- Close: Animación inversa con exit de AnimatePresence.

7) MODALS GLASSMORPHISM ANIMADOS:
Cada modal debe tener:
- Backdrop: fondo oscuro al 60% con backdrop-blur que se anima al entrar.
- Contenido: el contenido interno del modal aparece con stagger (título, luego items uno por uno).
- SVG decorativos: alguna línea blueprint sutil dentro del modal como decoración.

8) NAVBAR SCROLL EFFECT:
El navbar es transparent sobre el hero. Al scrollear:
- Transición suave a fondo con backdrop-blur + borde inferior sutil.
- El logo se reduce ligeramente de tamaño.
- El padding vertical se reduce.
Implementar con un hook custom useScrollPosition o con useScroll de Motion.

9) WHATSAPP BUTTON — PULSO VIVO:
El botón flotante debe tener una animación de pulso que se repite infinitamente (scale: [1, 1.15, 1] con transición repeat: Infinity, duration: 2). Al hover, frena el pulso y hace un scale(1.1) estático.

10) CTA BUTTONS — GRADIENT SHIFT:
Los botones con gradiente tienen un efecto donde el gradiente se mueve sutilmente al pasar el cursor (background-position animado). Combinado con un scale(1.03) en hover.

11) TEXT HIGHLIGHT ANIMATION:
Ciertos textos clave (como el tagline "Vos seguís trabajando, nosotros resolvemos") pueden tener un efecto de highlight donde un gradiente o color de fondo pasa por detrás del texto cuando entra en viewport. Similar a un marker/resaltador.

12) FOOTER REVEAL:
El footer aparece con un efecto de "cortina" — un elemento con el gradiente brand cruza horizontalmente antes de revelar el contenido final.

REGLA DE ORO: Todas estas animaciones deben respetar prefers-reduced-motion del usuario vía MotionConfig. Si el usuario tiene animaciones reducidas, todo debe ser instantáneo.

---

## ARQUITECTURA DE CONTENIDO

RUTAS DEL SITIO (React Router DOM):
- / — Página principal (single-page con scroll)
- /privacy — Política de Privacidad
- /sitemap.xml — Sitemap XML (generado como archivo estático en /public)
- /robots.txt — Robots.txt (archivo estático en /public)

---

### PÁGINA PRINCIPAL (/)

El sitio es una sola página con scroll y secciones ancleadas.

SECCIÓN 1 — NAVBAR (sticky):
- Logo (images/logo.png) a la izquierda.
- Links de navegación: Sobre Nosotros | Servicios | Lo que debés saber | Contacto → son scroll anchors que hacen smooth scroll a las secciones correspondientes.
- Botón CTA: "Consultá gratis" con gradiente brand → abre WhatsApp.
- En mobile: hamburger menu animado con Motion (el ícono se transforma de 3 líneas a X con layout animation).
- WhatsApp link placeholder: https://wa.me/XXXXXXXXXXX — dejar comentario TODO.

SECCIÓN 2 — HERO:
- Headline: "EVALUAMOS. MEDIMOS. REGULARIZAMOS TU PUBLICIDAD EXTERIOR."
  Con el stagger reveal cinematográfico descrito arriba.
- Subtexto: "Somos un equipo especializado en la habilitación de carteles, marquesinas y toldos en CABA. Vos seguís trabajando, nosotros resolvemos."
  La frase "Vos seguís trabajando, nosotros resolvemos" con el text highlight animation.
- CTA principal: botón "Hablá con un especialista" → WhatsApp.
- CTA secundario: botón outline "Conocé el proceso" → scroll a sección de círculos.
- Background: imagen placeholder de fachada comercial urbana (Unsplash). Overlay slate-dark con opacidad. Las líneas blueprint animadas como capa intermedia.
- Parallax multicapa como se describe arriba.
- Altura: 100vh en desktop, auto en mobile con min-height suficiente.

SECCIÓN 3 — "¿SABÍAS QUE...?" (URGENCIA):
ESTA SECCIÓN ES CRÍTICA PARA CONVERSIÓN — las clientas hicieron énfasis especial.
Dos cards prominentes lado a lado en desktop, stacked en mobile:

Card A — "Tu póliza podría no cubrirte" (ícono de Lucide: ShieldAlert)
Texto: "Muchos comercios tienen su cartel asegurado, pero desconocen que en la letra chica de la póliza, algunas compañías exigen que la cartelería esté debidamente habilitada. En caso de un accidente o daño a terceros, si el cartel no cuenta con el permiso correspondiente, la aseguradora puede rechazar la cobertura. Habilitar tu cartel no es solo cumplir con una inspección — es proteger tu comercio y tu responsabilidad."

Card B — "¿Conocés el valor de las multas?" (ícono de Lucide: BadgeDollarSign)
Texto: "La Ley 451 de Faltas de CABA establece multas de 150 a 5.000 Unidades Fijas (UF). Cada UF tiene un valor aproximado de $800 a $1.076 (2026). Eso significa multas que van desde $120.000 hasta más de $5.000.000."
Los montos en pesos deben tener la COUNTER ANIMATION descrita arriba.
Link discreto al final: "Ver Ley 451 →" (href placeholder, target blank).

Diseño de las cards: Borde con gradiente brand (border-image o pseudo-element), fondo glassmorphism sutil, ícono grande con color accent-cyan. Scroll-triggered reveal con stagger entre Card A y Card B.

SECCIÓN 4 — "TODO LO QUE NECESITÁS SABER" (LOS 5 CÍRCULOS):
5 elementos interactivos en layout responsivo. En desktop: 3 arriba + 2 centrados abajo. En mobile: scroll horizontal con snap o grid 2x3.
Al hacer click en cada uno, se abre un MODAL con AnimatePresence + glassmorphism.

Círculo 1 — "Tipos de Cartel" (ícono: LayoutGrid)
Contenido del modal:
- Letrero saliente: perpendicular a la línea oficial o de retiro obligatorio.
- Letrero frontal: paralelo a la línea oficial, ochava, retiro obligatorio o frente del edificio.
- Letrero luminoso: anuncio que emite luz propia.
- Letrero iluminado: anuncio que recibe luz artificial mediante fuentes luminosas externas.
- Marquesina: cubierta fija y no transitable, que puede llevar anuncios en sus caras.
- Toldo con o sin publicidad: cubierta no transitable, fija, móvil y/o rebatible.
- Vigencia del permiso: Letrero (todos los tipos) y toldo → vigente mientras dure la actividad comercial. Marquesina → se renueva cada 5 años.
Presentar cada tipo con un ícono/ilustración simple y una divider line estilo blueprint entre ellos.

Círculo 2 — "Desarrollo del Trámite" (ícono: ClipboardList)
Contenido del modal — mostrar como STEPS VERTICALES con línea conectora animada (SVG line drawing al abrir):
1. Factibilidad: Verificamos que la dirección-zonificación sean compatibles con el tipo de publicidad.
2. Relevamiento Técnico: Visita al local para evaluar, medir y detectar ajustes necesarios. En caso de publicidad nueva, se supervisa la colocación.
3. Documentación: Presentación ante organismo correspondiente — datos del solicitante, seguro de responsabilidad civil, habilitación del local o constancia de solicitud de inicio de trámite, planos, cálculos estructurales, encomienda profesional ante el consejo profesional (valor incluido en presupuesto), formularios, DDJJ, fotos.
4. Carga Digital: Solicitud de habilitación/permiso ante el organismo oficial, cumplimentando la Ley 2936 de Publicidad Exterior, abono de tasas correspondientes según ley vigente, generación de un número de expediente válido como inicio de trámite para presentar ante organismos de control.
5. Obtención del Permiso: Disposición aprobatoria por organismo competente.
6. Alta AGIP: Alta del tributo publicitario ante AGIP. Es un importe accesible.

Círculo 3 — "Marco Legal" (ícono: Scale)
ESTE CÍRCULO DEBE TENER ÉNFASIS VISUAL ESPECIAL — borde más grueso con gradiente brand pulsante, o un glow sutil animado, o tamaño ligeramente mayor que los otros 4.
Contenido del modal:
- Link a Ley 2936 de Publicidad Exterior (href placeholder)
- Link a Ley 451 de Faltas de CABA (href placeholder)
- Valor de la Unidad Fija (UF) actual: entre $800 y $1.076 (2026)
- Link a la web de AGC - Agencia Gubernamental de Control (href placeholder)
- Link a Espacio Público GCBA (href placeholder)
- Nota destacada: "No se puede colocar cualquier cartel de cualquier medida en cualquier zona. Existe un código de edificación y reglamentación sobre publicidad exterior que debe respetarse."

Círculo 4 — "¿Te labraron un acta?" (ícono: FileWarning)
Diseño de ESTE círculo con toque de URGENCIA — usar el color warning como acento del borde/ícono.
Contenido del modal:
"Es un tipo de acta que emiten los inspectores del GCBA en la que se te otorgan 15 días para regularizar tu letrero, marquesina o toldo. En caso de NO hacerlo, al volver los inspectores se encuentran facultados para labrar un Acta de Comprobación (multa). En algunos casos pueden solicitar el retiro del cartel o clausura del local, según lo indicado en las leyes vigentes."
"Al obtener el permiso podés subsanar la falta vía TAD en los plazos indicados."
CTA dentro del modal: "Resolvelo ahora →" → WhatsApp.

Círculo 5 — "Lo que debés saber" (ícono: Lightbulb)
Contenido del modal:
- Item A (la póliza — mismo texto de Card A).
- Item B (las multas — mismo texto de Card B).
- Item C — El plano técnico es obligatorio: "Para habilitar un cartel, marquesina o toldo en CABA siempre es obligatorio presentar un plano técnico firmado por un profesional matriculado ante el organismo correspondiente (CPIC o CPAU). Ese plano no es un trámite administrativo: es el documento que certifica que la estructura está correctamente calculada, ubicada y colocada de manera segura, cumpliendo con la normativa vigente. Un cartel correctamente habilitado no existe sin plano técnico. Es la base de todo el trámite y la garantía de que tu instalación es segura y legal."

SECCIÓN 5 — SOBRE NOSOTROS:
- Título: "Quiénes somos"
- Texto: "Somos un equipo especializado en la regularización y habilitación de carteles, marquesinas y toldos en CABA. Trabajamos con rapidez, precisión técnica y conocimiento normativo para que tu comercio quede en regla sin demoras, respondiendo ante requerimientos e intimaciones."
- Nuestro Equipo: Profesionales matriculados — Arquitectos / M.M.O. | Soporte comercial y servicio al cliente.
- 2-3 cards con avatar placeholder de Unsplash (personas profesionales). Nombre y cargo con placeholder TODO.
- "Asesoramiento online sin costo."
- "Atención personalizada: analizamos cada caso para brindarte tranquilidad y seguridad."

SECCIÓN 6 — ALCANCE DEL SERVICIO:
- Texto: "Trabajamos exclusivamente en la Ciudad Autónoma de Buenos Aires."
- Un iframe de Google Maps con estilos personalizados (bordes redondeados, sombra sutil que combine con el diseño general). URL placeholder: https://www.google.com/maps/embed?pb=PLACEHOLDER — dejar comentario TODO.

SECCIÓN 7 — CONTACTO:
- WhatsApp: CTA principal con botón grande con gradiente brand. Link placeholder.
- Email: info@yarda.com.ar — dejar como placeholder con comentario en código: {/* TODO: confirmar email corporativo */}
- Instagram: ícono + link placeholder.
- LinkedIn: ícono + link placeholder.
- Horario de atención: Lunes a Viernes, 10 a 17 h.
- Destacar: "CONSULTA GRATUITA" — que sea visualmente prominente.

SECCIÓN 8 — FOOTER:
- Logo pequeño.
- "© 2026 Yarda Habilita. Todos los derechos reservados."
- Link a /privacy (Política de Privacidad)
- Links de redes sociales repetidos.
- Footer reveal animation descrita arriba.

ELEMENTO GLOBAL — BOTÓN FLOTANTE WHATSAPP:
Botón fixed bottom-right con ícono de WhatsApp (SVG inline o de Lucide). Animación de pulso infinito con Motion. Visible en TODAS las páginas. Z-index alto. Link placeholder.

---

### RUTA /privacy — Política de Privacidad

Página separada con:
- Mismo Navbar que la principal (pero los scroll anchors redirigen a / con el anchor).
- Título: "Política de Privacidad"
- Contenido legal completo para Argentina:
  - Responsable del tratamiento: Yarda Habilita (placeholder para razón social).
  - Datos recopilados: nombre, teléfono, email vía formulario de contacto o WhatsApp.
  - Finalidad: gestión de consultas y presupuestos de habilitaciones.
  - Base legal: Ley 25.326 de Protección de Datos Personales de Argentina.
  - Derechos del usuario: acceso, rectificación, supresión, oposición.
  - Uso de cookies: cookies técnicas y de analítica (Google Analytics si se implementa).
  - Contacto para consultas de privacidad: email placeholder.
  - Última actualización: Abril 2026.
- Footer.
- Botón flotante de WhatsApp.

---

### ARCHIVOS SEO ESTÁTICOS (en carpeta /public)

ROBOTS.TXT (public/robots.txt):
```
User-agent: *
Allow: /
Disallow: /private/

Sitemap: https://yarda.com.ar/sitemap.xml
```
Nota: el dominio es placeholder — dejar comentario.

SITEMAP.XML (public/sitemap.xml):
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://yarda.com.ar/</loc>
    <lastmod>2026-04-03</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://yarda.com.ar/privacy</loc>
    <lastmod>2026-04-03</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.3</priority>
  </url>
</urlset>
```
Nota: el dominio es placeholder — dejar comentario.

SEO EN INDEX.HTML:
- Title: "Yarda Habilita — Habilitación de Carteles, Marquesinas y Toldos en CABA"
- Meta description: "Gestionamos la habilitación de tu cartelería ante los organismos del GCBA. Regularizá tu publicidad exterior con profesionales. Consulta gratuita."
- Meta viewport (mobile-first).
- Open Graph tags: og:title, og:description, og:image (usar logo), og:url, og:type=website.
- Canonical URL.
- Favicon generado desde el logo.
- Preconnect a Google Fonts.
- Lang="es-AR" en el tag html.

---

## ESTRUCTURA DE DIRECTORIOS

```
yarda/
  .claude/
    skills/
      motion/
        SKILL.md
      tailwind-v4-shadcn/
        SKILL.md
  images/
    logo.png                         <- Logo provisto por el cliente
  public/
    favicon.ico                      <- Generado a partir del logo
    robots.txt                       <- SEO
    sitemap.xml                      <- SEO
  src/
    assets/                          <- Imágenes importadas por Vite
    components/
      ui/                            <- Componentes shadcn/ui
      Navbar.tsx
      Hero.tsx
      UrgencyCards.tsx                <- Cards A y B
      CirclesSection.tsx              <- Los 5 círculos
      CircleModal.tsx                 <- Modal reutilizable
      AboutUs.tsx
      ServiceReach.tsx                <- Mapa iframe
      Contact.tsx
      Footer.tsx
      WhatsAppButton.tsx              <- Botón flotante
      BlueprintLines.tsx              <- Líneas SVG animadas
      CounterAnimation.tsx            <- Componente de counter para montos
    pages/
      Home.tsx
      Privacy.tsx
    hooks/
      useScrollPosition.ts            <- Hook para scroll effects del navbar
    lib/
      utils.ts                        <- cn() de shadcn
    App.tsx                           <- Router setup con MotionConfig
    main.tsx                          <- Entry point
    index.css                         <- Tailwind v4 config (4-step pattern)
  IDEAS WEB competencia .md           <- Documento de requerimientos (LEER PRIMERO)
  index.html
  package.json
  tsconfig.json
  tsconfig.app.json
  tsconfig.node.json
  vite.config.ts
```

---

## TAREAS DE DESARROLLO (SECUENCIALES — NO SALTEAR PASOS)

FASE 1 — SCAFFOLD:
1. Inicializá el proyecto con Vite + React + TypeScript.
2. Instalá dependencias: tailwindcss, @tailwindcss/vite, tw-animate-css, motion, react-router-dom, lucide-react.
3. Inicializá shadcn/ui: npx shadcn@latest init.
4. Configurá vite.config.ts con el plugin de Tailwind y los alias.
5. Configurá index.css con los 4 pasos del skill de Tailwind v4 (variables -> @theme inline -> @layer base) usando la paleta de colores de Yarda.
6. Configurá React Router en App.tsx con las rutas (/, /privacy). Envolvé todo con MotionConfig reducedMotion="user".

FASE 2 — DESIGN SYSTEM:
7. Importá Space Grotesk e Inter desde Google Fonts en index.html con preconnect.
8. Asegurate de que @theme inline mapee TODAS las CSS variables de color.
9. Creá BlueprintLines.tsx — componente SVG con líneas en perspectiva que se animan con strokeDasharray/strokeDashoffset. Debe aceptar props para posición, opacidad y si se anima con scroll.
10. Creá CounterAnimation.tsx — componente que recibe un número y lo anima de 0 al valor final con formato de moneda argentina (punto como separador de miles, signo $).
11. Instalá componentes shadcn/ui necesarios: Dialog, Button, Card.

FASE 3 — COMPONENTES CORE:
12. Navbar.tsx — Sticky, transparent sobre hero, compacta al scroll. Logo, scroll anchors, CTA WhatsApp. Hamburger animado en mobile.
13. Hero.tsx — Stagger reveal de headline, parallax multicapa (3 capas), CTAs, líneas blueprint animadas.
14. UrgencyCards.tsx — Cards A y B con scroll-triggered reveal, counter animation en Card B.
15. CirclesSection.tsx + CircleModal.tsx — Los 5 círculos con hover glow, modals glassmorphism con AnimatePresence. Steps verticales animados en el Círculo 2. Énfasis visual en Círculo 3. Warning accent en Círculo 4.
16. AboutUs.tsx — Equipo, servicios, asesoramiento. Cards de equipo con placeholder.
17. ServiceReach.tsx — Texto + iframe de Maps estilizado.
18. Contact.tsx — Datos de contacto, horario, CTA WhatsApp grande, consulta gratuita.
19. Footer.tsx — Copyright, link privacy, redes, footer reveal animation.
20. WhatsAppButton.tsx — Botón flotante con pulso infinito.

FASE 4 — PÁGINAS:
21. Home.tsx — Ensamblar componentes en orden: Navbar, Hero, UrgencyCards, CirclesSection, AboutUs, ServiceReach, Contact, Footer. Implementar scroll smooth con CSS scroll-behavior: smooth.
22. Privacy.tsx — Contenido legal completo, misma Navbar y Footer.

FASE 5 — SEO Y ARCHIVOS ESTÁTICOS:
23. Crear public/robots.txt con el contenido especificado.
24. Crear public/sitemap.xml con el contenido especificado.
25. Completar meta tags SEO en index.html (title, description, OG, canonical, lang).
26. Verificar que el build maneja correctamente el routing de SPA (crear public/404.html que redirija a index.html para GitHub Pages).

FASE 6 — TESTING Y POLISH:
27. Verificar responsive en mobile (375px), tablet (768px), desktop (1280px+). MOBILE FIRST — si algo se rompe en mobile, es un bug crítico.
28. Verificar que TODAS las animaciones de Motion funcionan: stagger hero, parallax, scroll reveals, counters, circle hover, modals open/close, navbar compact, WhatsApp pulse, footer reveal.
29. Verificar accesibilidad: focus states, aria-labels en CTAs, prefers-reduced-motion respetado.
30. Verificar que NO haya errores en consola.
31. Ejecutar npm run build y verificar que compila sin errores.
32. Verificar que las rutas /privacy, /robots.txt, /sitemap.xml funcionan correctamente.

---

## REGLAS FINALES

NO uses imágenes rotas o placeholders genéricos grises. Usá URLs reales de Unsplash.
NO hagas un diseño genérico. Debe verse CARO, PREMIUM, ARQUITECTÓNICO.
NO sobrecargues con animaciones sin propósito. Cada animación guía la atención o revela contenido.
NO uses transition-* de Tailwind junto con animaciones de Motion. Conflicto.
NO uses framer-motion como import. Usá motion/react.
NO uses tailwind.config.ts. No existe en v4.
NO uses @apply. Deprecado en v4.

SÍ usá el gradiente brand con moderación. Acento, no protagonista.
SÍ dejá placeholders con comentarios TODO para: WhatsApp, email, links legales, iframe Maps, redes sociales, razón social.
SÍ leé los 2 skills completos ANTES de codear.
SÍ priorizá MOBILE FIRST. Los comerciantes acceden desde el celular.
SÍ asegurate de que CADA componente compile sin errores de TypeScript.
SÍ hacé que el sitio sea una experiencia visual que el usuario recuerde. La competencia tiene sitios anticuados — este tiene que hacer que digan "esto es otro nivel".
