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
    <section className="relative bg-[#111] overflow-hidden min-h-[55vh] lg:min-h-[70vh] h-full flex items-end w-full">
      {bgSrc && (
        <Image
          src={bgSrc}
          alt={backgroundImage?.alt ?? 'Will Fowler performance'}
          fill
          className="object-cover opacity-70"
          style={{ objectPosition: 'center center' }}
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
      )}
      {/* Gradient overlay — bottom-heavy so text at bottom stays readable */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />

      <div className="relative z-10 px-8 pb-12 pt-8 md:px-10 md:pb-16 lg:px-12 w-full">
        <h2
          className="font-serif text-white leading-tight mb-4"
          style={{ fontSize: 'clamp(1.8rem, 4vw, 3.5rem)', fontWeight: 400 }}
        >
          {heading.includes('WORK') ? (
            <>{heading.split('WORK')[0]}WORK<br />TOGETHER.</>
          ) : heading}
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
