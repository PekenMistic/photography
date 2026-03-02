import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"

interface SimpleHeroProps {
  title: string
  subtitle: string
  ctaText: string
  ctaLink: string
  backgroundImage: string
}

export default function SimpleHero({ title, subtitle, ctaText, ctaLink, backgroundImage }: SimpleHeroProps) {
  return (
    <section className="relative w-full py-12 md:py-24 lg:py-32 xl:py-48">
      <Image
        src={backgroundImage}
        alt="Hero background"
        fill
        className="object-cover"
        quality={100}
        priority
      />
      <div className="absolute inset-0 bg-black bg-opacity-60" />
      <div className="relative z-10 container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-white">
              {title}
            </h1>
            <p className="mx-auto max-w-[700px] text-gray-200 md:text-xl">
              {subtitle}
            </p>
          </div>
          <div>
            <Link href={ctaLink}>
              <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white">
                {ctaText}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
