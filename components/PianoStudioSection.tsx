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
    ? urlFor(logoImage).width(900).url()
    : null

  return (
    <section className="bg-[#1a1c12] w-full">
      <div className="max-w-7xl mx-auto px-6 py-14 md:px-14 md:py-20 flex flex-col md:flex-row items-center md:items-start gap-10 md:gap-16">

        {/* Banner logo — left column, prominent */}
        {logoSrc ? (
          <div className="flex-shrink-0 w-full md:w-80 lg:w-96">
            <Image
              src={logoSrc}
              alt={logoImage?.alt ?? 'The Will Fowler Studio'}
              width={384}
              height={128}
              className="object-contain w-full"
            />
          </div>
        ) : (
          <div className="flex-shrink-0 w-full md:w-80 h-24 bg-white/5 rounded" />
        )}

        {/* Vertical divider — desktop only */}
        <div className="hidden md:block w-px self-stretch bg-white/15" />

        {/* Text content */}
        <div className="flex flex-col justify-center text-center md:text-left">
          <div className="w-12 h-px bg-white/30 mb-5 mx-auto md:mx-0" />
          <p className="text-white/60 text-xs tracking-[0.2em] font-sans mb-5 lowercase">
            {tagline}
          </p>
          <p className="text-white/75 text-sm font-sans leading-relaxed max-w-sm mb-8 mx-auto md:mx-0">
            {description}
          </p>
          <Link
            href={ctaHref}
            className="inline-flex items-center gap-2 text-[11px] tracking-[0.22em] font-sans text-white/70 border-b border-white/40 pb-0.5 hover:text-white hover:border-white transition-colors w-fit mx-auto md:mx-0"
          >
            {ctaLabel} →
          </Link>
        </div>
      </div>
    </section>
  )
}
