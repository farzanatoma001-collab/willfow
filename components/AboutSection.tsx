import Image from 'next/image'
import Link from 'next/link'
import { urlFor } from '@/sanity/lib/image'

interface WorkItem {
  _id: string
  title: string
  role?: string
  image?: { asset: { url: string; _id: string }; alt?: string }
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
    ? urlFor(portraitImage).width(400).height(480).fit('crop').url()
    : null

  return (
    <section className="bg-[#EDE8DC] py-12 px-6 md:py-16 md:px-14">
      <div className="max-w-7xl mx-auto flex flex-col md:grid md:grid-cols-2 gap-10 md:gap-12 items-start">

        {/* Left — portrait + about text */}
        <div className="flex gap-5 md:gap-8 items-start">
          {/* Portrait */}
          <div className="flex-shrink-0 w-32 sm:w-44 md:w-56">
            {portraitSrc ? (
              <Image
                src={portraitSrc}
                alt={portraitImage?.alt ?? 'Will Fowler'}
                width={224}
                height={280}
                className="object-cover w-full"
              />
            ) : (
              <div className="w-full aspect-[4/5] bg-[#c8c3b8]" />
            )}
          </div>

          {/* Text */}
          <div className="flex flex-col justify-center min-w-0">
            <div className="mb-3 md:mb-4">
              {taglineLines.map((line, i) => (
                <p
                  key={i}
                  className="font-serif text-[#1a1a1a] leading-tight"
                  style={{ fontSize: 'clamp(1.1rem, 3vw, 2rem)', fontWeight: 600 }}
                >
                  {line}
                </p>
              ))}
            </div>
            <p className="text-xs md:text-sm text-[#444] leading-relaxed font-sans mb-5">{bio}</p>
            <Link
              href={aboutLinkHref}
              className="inline-flex items-center gap-2 text-[10px] md:text-xs tracking-[0.2em] font-sans text-[#1a1a1a] border-b border-[#1a1a1a] pb-0.5 hover:opacity-60 transition-opacity w-fit"
            >
              {aboutLinkLabel} →
            </Link>
          </div>
        </div>

        {/* Right — selected work grid */}
        <div>
          <div className="flex items-center gap-4 mb-4 md:mb-5">
            <span className="text-[10px] md:text-xs tracking-[0.25em] font-sans text-[#1a1a1a] font-semibold">
              {selectedWorkTitle}
            </span>
            <div className="h-px bg-[#1a1a1a] flex-1 max-w-[60px]" />
          </div>

          {workItems.length > 0 ? (
            <div className="grid grid-cols-2 gap-1.5 md:gap-2">
              {/* Large item — first */}
              {workItems[0] && <WorkCard item={workItems[0]} large />}
              {/* Smaller items stacked — right column */}
              <div className="flex flex-col gap-1.5 md:gap-2">
                {workItems.slice(1, 3).map((item) => (
                  <WorkCard key={item._id} item={item} />
                ))}
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-2">
              <div className="aspect-[4/5] bg-[#c8c3b8]" />
              <div className="flex flex-col gap-2">
                <div className="aspect-[4/3] bg-[#c8c3b8]" />
                <div className="aspect-[4/3] bg-[#c8c3b8]" />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

function WorkCard({ item, large }: { item: WorkItem; large?: boolean }) {
  const imgSrc = item.image
    ? urlFor(item.image).width(large ? 500 : 300).height(large ? 400 : 220).fit('crop').url()
    : null

  const content = (
    <div className="relative overflow-hidden group w-full h-full">
      {imgSrc ? (
        <div className={`relative w-full ${large ? 'aspect-[3/4]' : 'aspect-[4/3]'}`}>
          <Image
            src={imgSrc}
            alt={item.image?.alt ?? item.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 50vw, 25vw"
          />
          {item.role && (
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2 md:p-3">
              <p className="text-white text-[8px] md:text-[10px] tracking-widest font-sans uppercase leading-tight">
                {item.role}
              </p>
            </div>
          )}
        </div>
      ) : (
        <div className={`w-full bg-[#c8c3b8] flex flex-col items-center justify-center p-3 ${large ? 'aspect-[3/4]' : 'aspect-[4/3]'}`}>
          <p className="font-serif text-xs text-center text-[#555]">{item.title}</p>
          {item.role && (
            <p className="text-[9px] tracking-widest font-sans text-[#777] mt-1 uppercase text-center">
              {item.role}
            </p>
          )}
        </div>
      )}
    </div>
  )

  return item.linkHref ? (
    <Link href={item.linkHref} target="_blank" rel="noopener noreferrer" className="block">
      {content}
    </Link>
  ) : (
    content
  )
}
