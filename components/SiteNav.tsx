import Link from 'next/link'

interface NavItem {
  label: string
  href: string
}

interface SiteNavProps {
  items?: NavItem[]
}

const defaultItems: NavItem[] = [
  { label: 'PROFILE', href: '/profile' },
  { label: 'WORK', href: '/work' },
  { label: 'EDUCATOR', href: '/educator' },
  { label: 'CONNECT', href: '/connect' },
]

export default function SiteNav({ items }: SiteNavProps) {
  const navItems = items ?? defaultItems

  return (
    <nav className="absolute top-0 right-0 z-20 px-5 py-5 md:px-10 md:py-8">
      <ul className="flex items-center gap-4 md:gap-8 flex-wrap justify-end">
        {navItems.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="text-white/80 hover:text-white text-[9px] md:text-xs tracking-[0.18em] font-sans transition-colors"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
