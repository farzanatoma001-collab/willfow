import Image from 'next/image'
import Link from 'next/link'
import { urlFor } from '@/sanity/lib/image'

interface WorkItem {
  _id: string
  title: string
  role?: string
  image?: { asset: { url: string; _id: string }; alt?: string }
  logoImage?: { asset: { url: string; _id: string }; alt?: string }
  linkHref?: string
}

interface AboutProps {
  portraitImage?: { asset: { url: string; _id: string }; alt?: string }
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
    ? urlFor(portraitImage).width(500).url()
    : null

  return (
    <section className="bg-[#EDE8DC] min-h-screen flex flex-col md:flex-row">

      {/* ── LEFT HALF: portrait + about text ─────────────────── */}
      <div className="flex flex-col sm:flex-row md:w-1/2 md:border-r border-[#d4cfc5]">

        {/* Portrait — fills full height on desktop */}
        <div className="relative w-full sm:w-48 md:w-56 flex-shrink-0 min-h-[300px] md:min-h-0 md:self-stretch">
          {portraitSrc ? (
            <Image
              src={portraitSrc}
              alt={portraitImage?.alt ?? 'Will Fowler'}
              fill
              className="object-cover object-top"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 192px, 224px"
            />
          ) : (
            <div className="absolute inset-0 bg-[#c8c3b8]" />
          )}
        </div>

        {/* About text — centred in remaining space */}
        <div className="flex flex-col justify-center px-6 py-10 md:px-8 md:py-14 flex-1">
          <div className="mb-5">
            {taglineLines.map((line, i) => (
              <p
                key={i}
                className="font-serif text-[#1a1a1a] leading-tight"
                style={{ fontSize: 'clamp(1.4rem, 2.8vw, 2.2rem)', fontWeight: 600 }}
              >
                {line}
              </p>
            ))}
          </div>
          <p className="text-sm text-[#444] leading-relaxed font-sans mb-6 max-w-xs">{bio}</p>
          <Link
            href={aboutLinkHref}
            className="inline-flex items-center gap-2 text-[11px] tracking-[0.22em] font-sans text-[#1a1a1a] border-b border-[#1a1a1a] pb-0.5 hover:opacity-50 transition-opacity w-fit"
          >
            {aboutLinkLabel} →
          </Link>
        </div>
      </div>

      {/* ── RIGHT HALF: selected work grid ───────────────────── */}
      <div className="md:w-1/2 flex flex-col px-6 py-10 md:px-8 md:py-14">
        {/* Section label */}
        <div className="flex items-center gap-4 mb-5 flex-shrink-0">
          <span className="text-[11px] tracking-[0.28em] font-sans text-[#1a1a1a] font-semibold">
            {selectedWorkTitle}
          </span>
          <div className="h-px bg-[#1a1a1a] w-10" />
        </div>

        {/* Work grid — fills remaining height */}
        <div className="flex-1 grid grid-cols-2 gap-2 min-h-0">
          {/* Large card — first item, spans full left column height */}
          <div className="flex flex-col">
            {workItems[0] && (
              <WorkCard item={workItems[0]} className="flex-1" />
            )}
          </div>

          {/* Two smaller cards — right column */}
          <div className="flex flex-col gap-2">
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
    ? urlFor(item.image).width(600).url()
    : null
  const logoSrc = item.logoImage
    ? urlFor(item.logoImage).width(200).url()
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
          sizes="(max-width: 768px) 50vw, 25vw"
        />
      )}

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />

      {/* Logo overlay — centred */}
      {logoSrc && (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
          <div className="relative w-24 md:w-28 h-16 md:h-20">
            <Image
              src={logoSrc}
              alt={item.logoImage?.alt ?? item.title}
              fill
              className="object-contain drop-shadow-lg"
              sizes="112px"
            />
          </div>
        </div>
      )}

      {/* Role badge — bottom */}
      {item.role && (
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent pt-6 pb-2 px-3">
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
