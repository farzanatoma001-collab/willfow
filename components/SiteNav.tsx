import Image from 'next/image'
import Link from 'next/link'
import { urlFor } from '@/sanity/lib/image'

interface NavItem { label: string; href: string }

interface SiteNavProps {
  items?: NavItem[]
  logo?: { asset: { _ref: string }; alt?: string }
}

const defaultItems: NavItem[] = [
  { label: 'PROFILE', href: '/profile' },
  { label: 'WORK', href: '/work' },
  { label: 'EDUCATOR', href: '/educator' },
  { label: 'CONNECT', href: '/connect' },
]

export default function SiteNav({ items, logo }: SiteNavProps) {
  const navItems = items ?? defaultItems
  const logoSrc = logo?.asset ? urlFor(logo).width(120).url() : null

  return (
    <nav className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-6 py-5 md:px-10 md:py-7">
      {/* Logo — top left */}
      <Link href="/" className="flex-shrink-0">
        {logoSrc ? (
          <div className="relative w-12 h-12 md:w-16 md:h-16">
            <Image
              src={logoSrc}
              alt={logo?.alt ?? 'Will Fowler'}
              fill
              className="object-contain"
              style={{ filter: 'invert(1)' }}
              sizes="64px"
              priority
            />
          </div>
        ) : (
          <span className="font-serif text-white text-lg tracking-widest opacity-80">WF</span>
        )}
      </Link>

      {/* Nav links — top right */}
      <ul className="flex items-center gap-5 md:gap-8 flex-wrap justify-end">
        {navItems.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="text-white/80 hover:text-white text-[9px] md:text-[11px] tracking-[0.2em] font-sans transition-colors"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
