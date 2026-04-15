import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import UrgencyCards from '@/components/UrgencyCards'
import { BackgroundGradientAnimation } from '@/components/ui/background-gradient-animation'
import CirclesSection from '@/components/CirclesSection'
import BlueprintAuroraBg from '@/components/ui/BlueprintAuroraBg'
import AboutUs from '@/components/AboutUs'
import ServiceReach from '@/components/ServiceReach'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import WhatsAppButton from '@/components/WhatsAppButton'

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <BackgroundGradientAnimation
          gradientBackgroundStart="hsl(220, 15%, 97%)"
          gradientBackgroundEnd="hsl(220, 15%, 97%)"
          blendingValue="normal"
          size="60%"
          containerClassName="!overflow-visible"
          className="relative z-10"
          interactive={true}
        >
          <UrgencyCards />
          <CirclesSection />
        </BackgroundGradientAnimation>
        <BlueprintAuroraBg>
          <AboutUs />
          <ServiceReach />
          <Contact />
        </BlueprintAuroraBg>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
