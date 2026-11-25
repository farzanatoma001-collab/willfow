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

          {/*
          flex-1 makes the grid fill remaining column height.
          grid-rows-2 splits that height into 2 equal rows.
          row-span-2 on left card makes it fill both rows automatically.
        */}
        <div className="flex-1 grid grid-cols-2 grid-rows-2 gap-2">
          {workItems[0] && (
            <div className="row-span-2 overflow-hidden">
              <WorkCard item={workItems[0]} className="h-full" mode="cover" objectPosition="left top" />
            </div>
          )}
          {workItems[1] && (
            <div className="overflow-hidden">
              <WorkCard item={workItems[1]} className="h-full" mode="cover" objectPosition="center" />
            </div>
          )}
          {workItems[2] && (
            <div className="overflow-hidden">
              <WorkCard item={workItems[2]} className="h-full" mode="cover" objectPosition="center" />
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

function WorkCard({
  item,
  className = '',
  mode = 'cover',
  objectPosition = 'center',
}: {
  item: WorkItem
  className?: string
  mode?: 'cover' | 'contain'
  objectPosition?: string
}) {
  const imgSrc = item.image
    ? urlFor(item.image).width(1000).url()
    : null

  const content = (
    <div className={`relative overflow-hidden group bg-[#c8c3b8] ${className}`}>
      {imgSrc && (
        <Image
          src={imgSrc}
          alt={item.image?.alt ?? item.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          style={{ objectPosition }}
          sizes="(max-width: 1024px) 50vw, 25vw"
        />
      )}

      <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors" />
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
