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
    ? urlFor(backgroundImage).width(900).height(700).fit('crop').url()
    : null

  return (
    <section className="relative bg-[#111] overflow-hidden min-h-[300px] md:min-h-[340px] flex items-center">
      {bgSrc && (
        <Image
          src={bgSrc}
          alt={backgroundImage?.alt ?? 'Will Fowler performance'}
          fill
          className="object-cover object-center opacity-40"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      )}
      <div className="relative z-10 p-8 md:p-14 w-full">
        <h2
          className="font-serif text-white leading-tight mb-3 md:mb-4"
          style={{ fontSize: 'clamp(1.6rem, 5vw, 3.2rem)', fontWeight: 300 }}
        >
          {heading}
        </h2>
        <p className="text-white/60 text-xs md:text-sm font-sans mb-6 md:mb-8 max-w-xs">{subtext}</p>
        <Link
          href={ctaHref}
          className="inline-flex items-center gap-2 text-[10px] md:text-xs tracking-[0.2em] font-sans text-white/80 border-b border-white/40 pb-0.5 hover:text-white hover:border-white transition-colors"
        >
          {ctaLabel} →
        </Link>
      </div>
    </section>
  )
}
