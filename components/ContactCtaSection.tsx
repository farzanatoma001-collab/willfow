import Image from 'next/image'
import Link from 'next/link'
import { urlFor } from '@/sanity/lib/image'

interface ContactCtaProps {
  heading?: string
  subtext?: string
  ctaLabel?: string
  ctaHref?: string
  backgroundImage?: { asset: { url: string; _id: string }; alt?: string }
}

export default function ContactCtaSection({
  heading = "LET'S WORK TOGETHER.",
  subtext = 'Bookings, collaborations and teaching enquiries.',
  ctaLabel = 'CONNECT',
  ctaHref = '/connect',
  backgroundImage,
}: ContactCtaProps) {
  const bgSrc = backgroundImage
    ? urlFor(backgroundImage).width(1600).url()
    : null

  return (
    <section className="relative bg-[#111] overflow-hidden min-h-[380px] md:min-h-[440px] flex items-center">
      {bgSrc && (
        <Image
          src={bgSrc}
          alt={backgroundImage?.alt ?? 'Will Fowler performance'}
          fill
          className="object-cover object-center opacity-45"
          sizes="100vw"
        />
      )}
      {/* Left gradient so text is readable */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent" />

      <div className="relative z-10 px-8 py-14 md:px-16 md:py-20 w-full max-w-3xl">
        <h2
          className="font-serif text-white leading-tight mb-4"
          style={{ fontSize: 'clamp(2rem, 6vw, 4rem)', fontWeight: 400 }}
        >
          {heading}
        </h2>
        <p className="text-white/60 text-sm font-sans mb-8 max-w-sm">{subtext}</p>
        <Link
          href={ctaHref}
          className="inline-flex items-center gap-2 text-[11px] tracking-[0.22em] font-sans text-white/80 border-b border-white/50 pb-0.5 hover:text-white hover:border-white transition-colors"
        >
          {ctaLabel} →
        </Link>
      </div>
    </section>
  )
}
