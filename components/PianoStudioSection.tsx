import Image from 'next/image'
import Link from 'next/link'
import { urlFor } from '@/sanity/lib/image'

interface PianoStudioProps {
  logoImage?: { asset: { url: string; _id: string }; alt?: string }
  title?: string
  tagline?: string
  description?: string
  ctaLabel?: string
  ctaHref?: string
}

export default function PianoStudioSection({
  logoImage,
  title = 'THE WILL FOWLER PIANO STUDIO',
  tagline = 'piano / keys tuition',
  description = 'Private and online tuition for all levels, from beginners to ABRSM Grade 5 and beyond, with a focus on technique, musicianship and exam success.',
  ctaLabel = 'LEARN MORE',
  ctaHref = '/educator',
}: PianoStudioProps) {
  const logoSrc = logoImage
    ? urlFor(logoImage).width(300).height(300).fit('crop').url()
    : null

  return (
    <section className="bg-[#1a1c12] py-12 px-6 md:py-16 md:px-14">
      <div className="max-w-2xl mx-auto md:mx-0 flex flex-col sm:flex-row gap-6 md:gap-10 items-center sm:items-start">

        {/* Logo */}
        <div className="flex-shrink-0 w-24 md:w-32">
          {logoSrc ? (
            <Image
              src={logoSrc}
              alt={logoImage?.alt ?? 'Will Fowler Piano Studio logo'}
              width={128}
              height={128}
              className="object-contain w-full"
            />
          ) : (
            <div className="w-24 h-24 opacity-60 flex items-center justify-center">
              <svg viewBox="0 0 80 100" fill="none" className="w-16">
                <path d="M15 85 C25 50, 45 15, 55 42 C65 70, 48 88, 38 76" stroke="white" strokeWidth="1.5" fill="none"/>
                <line x1="20" y1="92" x2="65" y2="92" stroke="white" strokeWidth="0.8" opacity="0.5"/>
              </svg>
            </div>
          )}
        </div>

        {/* Divider — visible on sm+ */}
        <div className="hidden sm:block w-px h-24 bg-white/20 self-center" />

        {/* Text */}
        <div className="text-center sm:text-left">
          <p className="text-white/40 text-[9px] tracking-[0.2em] font-sans mb-1">THE</p>
          <h2
            className="font-serif text-white leading-tight mb-3"
            style={{ fontSize: 'clamp(1.3rem, 3.5vw, 2.2rem)', fontWeight: 400 }}
          >
            {title.replace(/^THE\s+/i, '')}
          </h2>
          <div className="w-12 h-px bg-white/30 mb-3 mx-auto sm:mx-0" />
          <p className="text-white/50 text-[10px] tracking-[0.2em] font-sans mb-4 lowercase">
            {tagline}
          </p>
          <p className="text-white/70 text-xs md:text-sm font-sans leading-relaxed max-w-sm mb-6 mx-auto sm:mx-0">
            {description}
          </p>
          <Link
            href={ctaHref}
            className="inline-flex items-center gap-2 text-[10px] md:text-xs tracking-[0.2em] font-sans text-white/70 border-b border-white/40 pb-0.5 hover:text-white hover:border-white transition-colors"
          >
            {ctaLabel} →
          </Link>
        </div>
      </div>
    </section>
  )
}
