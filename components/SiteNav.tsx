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
    <nav className="absolute top-0 right-0 z-20 p-8">
      <ul className="flex items-center gap-8">
        {navItems.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="text-white/90 hover:text-white text-xs tracking-[0.2em] font-sans transition-colors"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
