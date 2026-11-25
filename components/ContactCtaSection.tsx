import Image from 'next/image'
import Link from 'next/link'
import { urlFor } from '@/sanity/lib/image'

interface ContactCtaProps {
  heading?: string
  subtext?: string
  ctaLabel?: string
  ctaHref?: string
  backgroundImage?: { asset: { _ref: string }; alt?: string }
}

export default function ContactCtaSection({
  heading = "LET'S WORK TOGETHER.",
  subtext = 'Bookings, collaborations and teaching enquiries.',
  ctaLabel = 'CONNECT',
  ctaHref = '/connect',
  backgroundImage,
}: ContactCtaProps) {
  const bgSrc = backgroundImage
    ? urlFor(backgroundImage).width(1400).url()
    : null

  return (
    <section className="relative bg-[#111] overflow-hidden min-h-[55vh] lg:min-h-[70vh] h-full flex items-center w-full">
      {bgSrc && (
        <Image
          src={bgSrc}
          alt={backgroundImage?.alt ?? 'Will Fowler performance'}
          fill
          className="object-cover opacity-55"
          style={{ objectPosition: 'center center' }}
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
      )}
      {/* Gradient overlay — left-heavy so text is readable */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/35 to-black/20" />

      <div className="relative z-10 px-8 py-14 md:px-10 md:py-20 lg:px-12 w-full">
        <h2
          className="font-serif text-white leading-tight mb-4"
          style={{ fontSize: 'clamp(1.8rem, 4vw, 3.5rem)', fontWeight: 400 }}
        >
          {heading}
        </h2>
        <p className="text-white/60 text-sm font-sans mb-8 max-w-xs">{subtext}</p>
        <Link
          href={ctaHref}
          className="inline-flex items-center gap-2 text-[10px] tracking-[0.22em] font-sans text-white/70 border-b border-white/40 pb-0.5 hover:text-white hover:border-white transition-colors"
        >
          {ctaLabel} →
        </Link>
      </div>
    </section>
  )
}
