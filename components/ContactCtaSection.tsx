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
    ? urlFor(backgroundImage).width(900).height(600).fit('crop').url()
    : null

  return (
    <section className="relative bg-[#1a1c12] overflow-hidden" style={{ minHeight: '340px' }}>
      {bgSrc && (
        <Image
          src={bgSrc}
          alt={backgroundImage?.alt ?? 'Will Fowler performance'}
          fill
          className="object-cover object-center opacity-50"
          sizes="50vw"
        />
      )}
      <div className="relative z-10 h-full flex flex-col justify-center p-10 md:p-14" style={{ minHeight: '340px' }}>
        <h2
          className="font-serif text-white leading-tight mb-4"
          style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 300 }}
        >
          {heading}
        </h2>
        <p className="text-white/60 text-sm font-sans mb-8 max-w-xs">{subtext}</p>
        <Link
          href={ctaHref}
          className="inline-flex items-center gap-2 text-xs tracking-[0.2em] font-sans text-white/80 border-b border-white/40 pb-0.5 hover:text-white hover:border-white transition-colors w-fit"
        >
          {ctaLabel} →
        </Link>
      </div>
    </section>
  )
}
