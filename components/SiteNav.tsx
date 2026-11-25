import Link from 'next/link'

interface NavItem { label: string; href: string }

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
    <nav className="absolute top-0 left-0 right-0 z-20 flex items-center justify-end px-6 py-6 md:px-10 md:py-8">
      <ul className="flex items-center gap-6 md:gap-10">
        {navItems.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="text-white/75 hover:text-white text-[9px] md:text-[11px] tracking-[0.22em] font-sans transition-colors"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
