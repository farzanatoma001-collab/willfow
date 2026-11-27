import Image from 'next/image'
import Link from 'next/link'
import { urlFor } from '@/sanity/lib/image'

interface PianoStudioProps {
  logoImage?: { asset: { _ref: string }; alt?: string }
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
    ? urlFor(logoImage).width(400).url()
    : null

  /* Split title into lines: "THE" / "WILL FOWLER" / "PIANO STUDIO" */
  const words = title.split(' ')
  const line1 = words[0] ?? 'THE'
  const line2 = words.slice(1, 3).join(' ')
  const line3 = words.slice(3).join(' ')

  return (
    <section className="relative bg-[#2A2D1E] w-full h-full flex items-center min-h-[55vh] lg:min-h-[70vh] overflow-hidden">
      {/* Piano background image */}
      <Image
        src="/images/piano-bg.jpg"
        alt=""
        fill
        className="object-cover opacity-80"
        style={{ objectPosition: 'right bottom' }}
        priority={false}
        sizes="50vw"
      />
      {/* Dark overlay so text stays readable */}
      <div className="absolute inset-0 bg-[#2A2D1E]/55" />

      <div className="relative z-10 w-full flex flex-col md:flex-row md:items-center gap-8 md:gap-10 px-8 py-12 md:px-10 md:py-20 lg:px-12">

        {/* WF signature logo */}
        <div className="flex-shrink-0 w-32 md:w-32 lg:w-36 mx-auto md:mx-0">
          {logoSrc ? (
            <Image
              src={logoSrc}
              alt={logoImage?.alt ?? 'Will Fowler'}
              width={144}
              height={180}
              className="object-contain w-full"
              style={{ mixBlendMode: 'screen' }}
            />
          ) : (
            <div className="font-serif text-white/20 text-5xl" style={{ fontWeight: 300 }}>WF</div>
          )}
        </div>

        {/* Vertical divider — hidden on mobile */}
        <div className="hidden md:block w-px self-stretch bg-white/20 flex-shrink-0" />

        {/* Text block */}
        <div className="flex flex-col items-center md:items-start">
          {/* Title — split into 3 lines */}
          <p className="text-white/50 font-serif text-xs tracking-[0.25em] mb-0.5 text-center md:text-left">{line1}</p>
          <h2
            className="font-serif text-white leading-tight text-center md:text-left"
            style={{ fontSize: 'clamp(1.1rem, 2.2vw, 1.75rem)', fontWeight: 400, letterSpacing: '0.08em' }}
          >
            {line2}
            <br />
            {line3}
          </h2>

          {/* Horizontal rule */}
          <div className="w-10 h-px bg-white/25 my-5" />

          {/* Tagline */}
          <p className="text-white/45 text-[10px] tracking-[0.22em] font-sans lowercase mb-5 text-center md:text-left">
            {tagline}
          </p>

          {/* Description */}
          <p className="text-white/60 text-sm font-sans leading-relaxed max-w-[260px] mb-7 text-center md:text-left">
            {description}
          </p>

          {/* CTA */}
          <Link
            href={ctaHref}
            className="inline-flex items-center gap-2 text-[10px] tracking-[0.22em] font-sans text-white/60 border-b border-white/30 pb-0.5 hover:text-white hover:border-white transition-colors w-fit"
          >
            {ctaLabel} →
          </Link>
        </div>
      </div>
    </section>
  )
}
