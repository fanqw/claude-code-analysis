import Link from 'next/link'

const navItems = [
  { href: '/', label: '首页' },
  { href: '/map', label: '学习地图' },
  { href: '/glossary', label: '术语' },
  { href: '/sources', label: '来源索引' },
  { href: '/review', label: '复习' },
]

export function SiteHeader() {
  return (
    <header className="site-header">
      <Link className="brand" href="/">
        <span className="brand-mark">CC</span>
        <div>
          <strong>Claude Code Learning Guide</strong>
          <p>全量覆盖学习站原型</p>
        </div>
      </Link>
      <nav className="site-nav">
        {navItems.map(item => (
          <Link href={item.href} key={item.href}>
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  )
}
