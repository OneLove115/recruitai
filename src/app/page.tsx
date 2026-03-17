import Navbar from "@/components/home/Navbar"
import Hero from "@/components/home/Hero"
import TrustedBy from "@/components/home/TrustedBy"
import ProblemAgitation from "@/components/home/ProblemAgitation"
import Features from "@/components/home/Features"
import HowItWorks from "@/components/home/HowItWorks"
import AIScoringDemo from "@/components/home/AIScoringDemo"
import Testimonials from "@/components/home/Testimonials"
import Pricing from "@/components/home/Pricing"
import FAQ from "@/components/home/FAQ"
import FinalCTA from "@/components/home/FinalCTA"
import Footer from "@/components/home/Footer"

export default function HomePage() {
  return (
    <main>
      <Navbar />
      <Hero />
      <TrustedBy />
      <ProblemAgitation />
      <Features />
      <HowItWorks />
      <AIScoringDemo />
      <Testimonials />
      <Pricing />
      <FAQ />
      <FinalCTA />
      <Footer />
    </main>
  )
}
