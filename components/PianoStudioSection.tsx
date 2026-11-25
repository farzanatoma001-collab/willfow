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
    ? urlFor(logoImage).width(200).height(200).fit('crop').url()
    : null

  return (
    <section className="bg-[#1a1c12] py-16 px-6 md:px-14">
      <div className="max-w-7xl mx-auto flex gap-10 items-center">

        {/* Logo / signature */}
        <div className="flex-shrink-0 w-28 md:w-36 flex flex-col items-center">
          {logoSrc ? (
            <Image
              src={logoSrc}
              alt={logoImage?.alt ?? 'Will Fowler Piano Studio logo'}
              width={144}
              height={144}
              className="object-contain"
            />
          ) : (
            /* Placeholder signature mark */
            <div className="w-28 h-28 flex items-end justify-center">
              <svg viewBox="0 0 100 120" fill="none" className="w-24 opacity-80">
                <path
                  d="M20 100 C30 60, 50 20, 60 50 C70 80, 55 100, 45 90"
                  stroke="white"
                  strokeWidth="2"
                  fill="none"
                />
                <line x1="30" y1="110" x2="80" y2="110" stroke="white" strokeWidth="1" opacity="0.5" />
                <line x1="30" y1="115" x2="60" y2="115" stroke="white" strokeWidth="1" opacity="0.3" />
                <line x1="30" y1="120" x2="45" y2="120" stroke="white" strokeWidth="1" opacity="0.2" />
              </svg>
            </div>
          )}
        </div>

        {/* Divider */}
        <div className="hidden md:block w-px h-28 bg-white/20" />

        {/* Text */}
        <div>
          <p className="text-white/40 text-[10px] tracking-[0.2em] font-sans mb-2">THE</p>
          <h2
            className="font-serif text-white leading-tight mb-3"
            style={{ fontSize: 'clamp(1.5rem, 3vw, 2.4rem)', fontWeight: 400 }}
          >
            {title.replace(/^THE\s+/i, '')}
          </h2>
          <div className="w-16 h-px bg-white/30 mb-4" />
          <p className="text-white/50 text-xs tracking-[0.2em] font-sans mb-5 lowercase">
            {tagline}
          </p>
          <p className="text-white/70 text-sm font-sans leading-relaxed max-w-md mb-6">
            {description}
          </p>
          <Link
            href={ctaHref}
            className="inline-flex items-center gap-2 text-xs tracking-[0.2em] font-sans text-white/80 border-b border-white/40 pb-0.5 hover:text-white hover:border-white transition-colors"
          >
            {ctaLabel} →
          </Link>
        </div>
      </div>
    </section>
  )
}
