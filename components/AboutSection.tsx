import Image from 'next/image'
import Link from 'next/link'
import { urlFor } from '@/sanity/lib/image'

interface WorkItem {
  _id: string
  title: string
  role?: string
  image?: { asset: { _ref: string }; alt?: string }
  logoImage?: { asset: { _ref: string }; alt?: string }
  linkHref?: string
}

interface AboutProps {
  portraitImage?: { asset: { _ref: string }; alt?: string }
  taglineLines?: string[]
  bio?: string
  aboutLinkLabel?: string
  aboutLinkHref?: string
  selectedWorkTitle?: string
  workItems?: WorkItem[]
}

export default function AboutSection({
  portraitImage,
  taglineLines = ['PERFORMER.', 'MUSICIAN.', 'CREATIVE.'],
  bio = 'Will Fowler is a British musician, actor-musician and musical director working across theatre, live performance and education.',
  aboutLinkLabel = 'ABOUT',
  aboutLinkHref = '/profile',
  selectedWorkTitle = 'SELECTED WORK',
  workItems = [],
}: AboutProps) {
  const portraitSrc = portraitImage
    ? urlFor(portraitImage).width(600).url()
    : null

  return (
    <section className="bg-[#EDE8DC] min-h-screen flex flex-col lg:flex-row">

      {/* ── LEFT: portrait + about text ──────────────────────── */}
      <div className="lg:w-1/2 flex flex-col sm:flex-row lg:border-r border-[#d4cfc5]">

        {/* Portrait image */}
        <div className="sm:w-48 lg:w-56 flex-shrink-0 relative">
          {/* On mobile: fixed aspect ratio. On desktop: stretches full column height */}
          <div className="aspect-[3/4] sm:aspect-auto sm:h-full relative">
            {portraitSrc ? (
              <Image
                src={portraitSrc}
                alt={portraitImage?.alt ?? 'Will Fowler'}
                fill
                className="object-cover object-top"
                sizes="(max-width: 640px) 100vw, 192px"
              />
            ) : (
              <div className="absolute inset-0 bg-[#c8c3b8]" />
            )}
          </div>
        </div>

        {/* About text */}
        <div className="flex flex-col justify-center px-7 py-10 lg:px-10 lg:py-16 flex-1">
          <div className="mb-5">
            {taglineLines.map((line, i) => (
              <p
                key={i}
                className="font-serif text-[#1a1a1a] leading-tight"
                style={{ fontSize: 'clamp(1.4rem, 2.5vw, 2rem)', fontWeight: 600 }}
              >
                {line}
              </p>
            ))}
          </div>
          <p className="text-sm text-[#555] leading-relaxed font-sans mb-6 max-w-xs">{bio}</p>
          <Link
            href={aboutLinkHref}
            className="inline-flex items-center gap-2 text-[11px] tracking-[0.22em] font-sans text-[#1a1a1a] border-b border-[#1a1a1a] pb-0.5 hover:opacity-50 transition-opacity w-fit"
          >
            {aboutLinkLabel} →
          </Link>
        </div>
      </div>

      {/* ── RIGHT: selected work grid ─────────────────────────── */}
      <div className="lg:w-1/2 flex flex-col px-6 py-10 lg:px-8 lg:py-14">
        {/* Section label */}
        <div className="flex items-center gap-4 mb-5">
          <span className="text-[11px] tracking-[0.28em] font-sans text-[#1a1a1a] font-semibold">
            {selectedWorkTitle}
          </span>
          <div className="h-px bg-[#1a1a1a] w-10" />
        </div>

        {/* Grid — fixed height so fill images work */}
        <div className="grid grid-cols-2 gap-2" style={{ height: 'clamp(340px, 55vh, 520px)' }}>

          {/* Large card — left column, full height */}
          {workItems[0] && (
            <WorkCard item={workItems[0]} className="h-full" />
          )}

          {/* Two smaller cards — right column */}
          <div className="flex flex-col gap-2 h-full">
            {workItems[1] && (
              <WorkCard item={workItems[1]} className="flex-1" />
            )}
            {workItems[2] && (
              <WorkCard item={workItems[2]} className="flex-1" />
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

function WorkCard({ item, className = '' }: { item: WorkItem; className?: string }) {
  const imgSrc = item.image
    ? urlFor(item.image).width(600).height(500).fit('crop').url()
    : null
  const logoSrc = item.logoImage
    ? urlFor(item.logoImage).width(220).url()
    : null

  const content = (
    <div className={`relative overflow-hidden group bg-[#c8c3b8] ${className}`}>
      {/* Background photo */}
      {imgSrc && (
        <Image
          src={imgSrc}
          alt={item.image?.alt ?? item.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 1024px) 50vw, 25vw"
        />
      )}

      {/* Subtle dark overlay */}
      <div className="absolute inset-0 bg-black/25 group-hover:bg-black/35 transition-colors" />

      {/* Logo overlay — centred */}
      {logoSrc && (
        <div className="absolute inset-0 flex items-center justify-center p-4">
          <div className="relative w-28 h-16">
            <Image
              src={logoSrc}
              alt={item.logoImage?.alt ?? item.title}
              fill
              className="object-contain drop-shadow-xl"
              sizes="112px"
            />
          </div>
        </div>
      )}

      {/* Role badge — bottom */}
      {item.role && (
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/75 to-transparent pt-8 pb-2 px-3">
          <p className="text-white text-[9px] md:text-[10px] tracking-[0.2em] font-sans uppercase">
            {item.role}
          </p>
        </div>
      )}
    </div>
  )

  return item.linkHref ? (
    <Link href={item.linkHref} target="_blank" rel="noopener noreferrer" className={`block ${className}`}>
      {content}
    </Link>
  ) : (
    <div className={className}>{content}</div>
  )
}
