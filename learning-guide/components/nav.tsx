import Link from 'next/link'
import { learningStages } from '@/content/stages'

const navItems = [
  { href: '/', label: '开始学习' },
  { href: '/map', label: '教程地图' },
  ...learningStages.map((stage, index) => ({
    href: `/learn/${stage.modules[0]}`,
    label: `阶段 ${index + 1}`,
    title: stage.title,
  })),
]

export function SiteHeader() {
  return (
    <header className="site-header">
      <Link className="brand" href="/">
        <span className="brand-mark">CC</span>
        <div>
          <strong>Claude Code Learning Guide</strong>
          <p>先走教程主线，再回到真实源码核验关键结论</p>
        </div>
      </Link>
      <nav className="site-nav">
        {navItems.map(item => (
          <Link
            className={`site-nav-link${'title' in item ? ' site-nav-link-stage' : ''}`}
            href={item.href}
            key={item.href}
            title={'title' in item ? item.title : undefined}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  )
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer-copy">
        <strong>先学主线，再做核验</strong>
        <p>把章节先读通，再回到 analysis 原文和真实源码验证关键判断。</p>
      </div>
      <div className="site-footer-links">
        <Link className="site-footer-link" href="/map">学习地图</Link>
        <Link className="site-footer-link" href="/glossary">术语表</Link>
        <Link className="site-footer-link" href="/analysis">analysis 原文核验</Link>
        <Link className="site-footer-link" href="/sources">源码核验</Link>
      </div>
    </footer>
  )
}
