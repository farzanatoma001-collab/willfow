import Image from 'next/image'
import SiteNav from './SiteNav'
import { urlFor } from '@/sanity/lib/image'

interface HeroProps {
  name?: string
  subtitleItems?: string[]
  heroImage?: { asset: { _ref: string }; alt?: string }
  heroImageDesktop?: { asset: { _ref: string }; alt?: string }
  quoteText?: string
  quoteAuthor?: string
  navItems?: { label: string; href: string }[]
}

export default function HeroSection({
  name = 'WILL FOWLER',
  subtitleItems = ['ACTOR-MUSICIAN', 'MUSICAL DIRECTOR', 'CREATIVE', 'EDUCATOR'],
  heroImage,
  heroImageDesktop,
  quoteText = '"A tour de force on the keys."',
  quoteAuthor = 'JEFF GOLDBLUM',
  navItems,
}: HeroProps) {
  const mobileImgSrc = heroImage?.asset
    ? urlFor(heroImage).width(800).url()
    : null
  const desktopImgSrc = heroImageDesktop?.asset
    ? urlFor(heroImageDesktop).width(1800).url()
    : mobileImgSrc

  return (
    <section className="relative w-full min-h-screen bg-[#2A2D1E] overflow-hidden">
      {/* Mobile background image (hidden on md+) */}
      {mobileImgSrc && (
        <Image
          src={mobileImgSrc}
          alt={heroImage?.alt ?? name}
          fill
          priority
          className="md:hidden object-cover opacity-70"
          style={{ objectPosition: '62% 10%' }}
          sizes="100vw"
        />
      )}
      {/* Desktop background image (hidden on mobile) */}
      {desktopImgSrc && (
        <Image
          src={desktopImgSrc}
          alt={heroImageDesktop?.alt ?? name}
          fill
          priority
          className="hidden md:block object-cover opacity-70"
          style={{ objectPosition: '50% 20%' }}
          sizes="100vw"
        />
      )}
      {!mobileImgSrc && !desktopImgSrc && (
        <div className="absolute inset-0 bg-gradient-to-br from-[#2A2D1E] to-[#1a1c12]" />
      )}

      {/* Left-side fade overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#2A2D1E]/90 via-[#2A2D1E]/45 to-transparent" />
      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#2A2D1E]/70 to-transparent" />

      {/* Navigation */}
      <SiteNav items={navItems} />

      {/* Content wrapper */}
      <div className="relative z-10 min-h-screen flex flex-col px-6 md:px-14">

        {/* Nav clearance — keeps name fully below the nav bar */}
        <div className="h-28 md:h-32 flex-shrink-0" />

        {/* Name + subtitle + quote + scroll — centred in remaining height */}
        <div className="flex-1 flex flex-col justify-center pb-16 md:pb-20">
          <h1
            className="font-serif text-white leading-none tracking-tight"
            style={{ fontSize: 'clamp(3.5rem, 11vw, 8.5rem)', fontWeight: 300 }}
          >
            {name.split(' ').map((word, i) => (
              <span key={i} className="block">{word}</span>
            ))}
          </h1>
          <p className="mt-5 text-white/65 text-[10px] md:text-xs tracking-[0.22em] font-sans">
            {subtitleItems.join(' · ')}
          </p>

          {/* Mobile quote — sits below subtitle, always visible in viewport */}
          <div className="md:hidden mt-10 max-w-[260px]">
            <blockquote
              className="font-serif italic text-white leading-snug"
              style={{ fontSize: 'clamp(1.2rem, 5vw, 1.6rem)', fontWeight: 300 }}
            >
              {quoteText}
            </blockquote>
            <div className="w-8 h-px bg-white/40 mt-3 mb-2" />
            <p className="text-white/55 text-[10px] tracking-[0.18em] font-sans">— {quoteAuthor}</p>
          </div>

          {/* Scroll indicator */}
          <div className="hidden sm:flex flex-col gap-1 mt-10">
            <span className="text-white/35 text-[9px] tracking-[0.2em] font-sans">SCROLL</span>
            <div className="w-px h-5 bg-white/25 ml-0.5" />
            <span className="text-white/35 font-sans text-xs">↓</span>
          </div>
        </div>
      </div>

      {/* Desktop quote — absolute right, vertically centred */}
      <div className="hidden md:block absolute right-10 lg:right-16 top-1/2 -translate-y-1/2 max-w-xs text-right">
        <blockquote
          className="font-serif italic text-white leading-snug"
          style={{ fontSize: 'clamp(1.3rem, 3.2vw, 2.4rem)', fontWeight: 300 }}
        >
          {quoteText}
        </blockquote>
        <div className="w-10 h-px bg-white/40 mt-3 mb-2 ml-auto" />
        <p className="text-white/55 text-[10px] tracking-[0.18em] font-sans">— {quoteAuthor}</p>
      </div>
    </section>
  )
}
