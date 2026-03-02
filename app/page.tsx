import LuxuryHero from "@/components/luxury/LuxuryHero"
import LuxuryServices from "@/components/luxury/LuxuryServices"
import ModernPortfolio from "@/components/modern/ModernPortfolio"
import LuxuryTestimonials from "@/components/luxury/LuxuryTestimonials"
import LuxuryFAQ from "@/components/luxury/LuxuryFAQ"
import LuxuryCTA from "@/components/luxury/LuxuryCTA"
import { generateMetadata } from "@/lib/seo-config"

export const metadata = generateMetadata({
  title: "Home - Professional Photography Services",
  description: "Welcome to Madiun Photography. Professional wedding, portrait, and event photography services. Capturing your precious moments with artistic vision and technical excellence.",
})

export default function Home() {
  // FAQs are now managed through the database via LuxuryFAQ component
  // Updated for Vercel deployment - December 2024

  return (
    <main className="flex flex-col w-full">
      {/* Luxury Hero Section */}
      <LuxuryHero />

      {/* Luxury Services Section */}
      <LuxuryServices />

      {/* Modern Portfolio Section */}
      <ModernPortfolio />

      {/* Luxury Testimonials Section */}
      <LuxuryTestimonials />

      {/* Luxury FAQ Section */}
      <LuxuryFAQ />

      {/* Luxury CTA Section */}
      <LuxuryCTA />
    </main>
  )
}
