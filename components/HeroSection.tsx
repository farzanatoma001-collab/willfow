import Image from 'next/image'
import SiteNav from './SiteNav'
import { urlFor } from '@/sanity/lib/image'

interface HeroProps {
  name?: string
  subtitleItems?: string[]
  heroImage?: { asset: { url: string; _id: string }; alt?: string }
  quoteText?: string
  quoteAuthor?: string
  navItems?: { label: string; href: string }[]
}

export default function HeroSection({
  name = 'WILL FOWLER',
  subtitleItems = ['ACTOR-MUSICIAN', 'MUSICAL DIRECTOR', 'CREATIVE', 'EDUCATOR'],
  heroImage,
  quoteText = '"A tour de force on the keys."',
  quoteAuthor = 'JEFF GOLDBLUM',
  navItems,
}: HeroProps) {
  const imgSrc = heroImage
    ? urlFor(heroImage).width(1400).height(900).fit('crop').url()
    : null

  return (
    <section className="relative w-full h-screen min-h-[600px] bg-[#2A2D1E] overflow-hidden">
      {/* Background hero image */}
      {imgSrc ? (
        <Image
          src={imgSrc}
          alt={heroImage?.alt ?? name}
          fill
          priority
          className="object-cover object-center opacity-70"
          sizes="100vw"
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-[#2A2D1E] to-[#1a1c12]" />
      )}

      {/* Overlay gradient — left fades to olive, right keeps image */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#2A2D1E]/90 via-[#2A2D1E]/30 to-transparent" />

      {/* Navigation */}
      <SiteNav items={navItems} />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-between p-10 md:p-14">
        {/* Name + subtitle */}
        <div className="mt-auto mb-auto pt-24">
          <h1
            className="font-serif text-white leading-none tracking-tight"
            style={{ fontSize: 'clamp(4rem, 10vw, 9rem)', fontWeight: 300 }}
          >
            {name.split(' ').map((word, i) => (
              <span key={i} className="block">
                {word}
              </span>
            ))}
          </h1>
          <p className="mt-5 text-white/70 text-xs tracking-[0.25em] font-sans">
            {subtitleItems.join(' · ')}
          </p>

          {/* Scroll */}
          <div className="mt-10 flex flex-col gap-2">
            <span className="text-white/50 text-[10px] tracking-[0.2em] font-sans">SCROLL</span>
            <div className="w-px h-5 bg-white/40 ml-1" />
            <span className="text-white/50 font-sans text-xs">↓</span>
          </div>
        </div>

        {/* Quote — right side */}
        <div className="absolute right-10 md:right-14 top-1/2 -translate-y-1/2 max-w-xs text-right">
          <blockquote
            className="font-serif italic text-white leading-snug"
            style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.8rem)', fontWeight: 300 }}
          >
            {quoteText}
          </blockquote>
          <div className="w-12 h-px bg-white/40 ml-auto mt-4 mb-3" />
          <p className="text-white/70 text-xs tracking-[0.2em] font-sans">— {quoteAuthor}</p>
        </div>
      </div>
    </section>
  )
}
