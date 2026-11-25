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
    ? urlFor(heroImage).width(1400).url()
    : null

  return (
    <section className="relative w-full min-h-screen bg-[#2A2D1E] overflow-hidden">
      {/* Background hero image */}
      {imgSrc ? (
        <Image
          src={imgSrc}
          alt={heroImage?.alt ?? name}
          fill
          priority
          className="object-cover opacity-70"
          style={{ objectPosition: '60% 15%' }}
          sizes="100vw"
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-[#2A2D1E] to-[#1a1c12]" />
      )}

      {/* Left-side fade overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#2A2D1E]/95 via-[#2A2D1E]/50 to-transparent" />
      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#2A2D1E]/60 to-transparent" />

      {/* Navigation */}
      <SiteNav items={navItems} />

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col justify-between px-6 py-8 md:px-14 md:py-10">

        {/* Spacer for nav */}
        <div className="h-12 md:h-8" />

        {/* Name + subtitle */}
        <div className="mt-4 md:mt-0">
          <h1
            className="font-serif text-white leading-none tracking-tight"
            style={{ fontSize: 'clamp(3.2rem, 12vw, 9rem)', fontWeight: 300 }}
          >
            {name.split(' ').map((word, i) => (
              <span key={i} className="block">{word}</span>
            ))}
          </h1>
          <p className="mt-4 text-white/70 text-[10px] md:text-xs tracking-[0.2em] font-sans">
            {subtitleItems.join(' · ')}
          </p>

          {/* Scroll indicator — hidden on very small screens */}
          <div className="hidden sm:flex flex-col gap-1 mt-8">
            <span className="text-white/40 text-[9px] tracking-[0.2em] font-sans">SCROLL</span>
            <div className="w-px h-5 bg-white/30 ml-0.5" />
            <span className="text-white/40 font-sans text-xs">↓</span>
          </div>
        </div>

        {/* Quote — bottom right on mobile, mid-right on desktop */}
        <div className="mt-10 md:mt-0 md:absolute md:right-10 lg:right-14 md:top-1/2 md:-translate-y-1/2 max-w-[260px] md:max-w-xs text-left md:text-right self-end md:self-auto">
          <blockquote
            className="font-serif italic text-white leading-snug"
            style={{ fontSize: 'clamp(1.3rem, 4vw, 2.8rem)', fontWeight: 300 }}
          >
            {quoteText}
          </blockquote>
          <div className="w-10 h-px bg-white/40 mt-3 mb-2 md:ml-auto" />
          <p className="text-white/60 text-[10px] tracking-[0.18em] font-sans">— {quoteAuthor}</p>
        </div>

        <div className="h-6 md:h-4" />
      </div>
    </section>
  )
}
