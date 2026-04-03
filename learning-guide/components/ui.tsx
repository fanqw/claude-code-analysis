import Link from 'next/link'
import type { PropsWithChildren, ReactNode } from 'react'

type CardProps = PropsWithChildren<{
  title?: string
  eyebrow?: string
  actions?: ReactNode
  className?: string
}>

export function PageShell({ children }: PropsWithChildren) {
  return <div className="page-shell">{children}</div>
}

export function Section({
  title,
  eyebrow,
  actions,
  className = '',
  children,
}: CardProps) {
  return (
    <section className={`card ${className}`.trim()}>
      {(title || eyebrow || actions) && (
        <div className="card-head">
          <div>
            {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
            {title ? <h2>{title}</h2> : null}
          </div>
          {actions ? <div>{actions}</div> : null}
        </div>
      )}
      <div className="card-body">{children}</div>
    </section>
  )
}

export function StatusBadge({ status }: { status: 'ready' | 'seeded' | 'planned' }) {
  return <span className={`status status-${status}`}>{status}</span>
}

export function ModuleGrid({
  items,
  basePath,
}: {
  items: {
    slug: string
    title: string
    summary: string
    status: 'ready' | 'seeded' | 'planned'
    difficulty?: string
    estimatedMinutes?: number
  }[]
  basePath: string
}) {
  return (
    <div className="grid">
      {items.map(item => (
        <Link className="module-card" href={`${basePath}/${item.slug}`} key={item.slug}>
          <div className="module-meta">
            <StatusBadge status={item.status} />
            {item.difficulty ? <span>{item.difficulty}</span> : null}
            {item.estimatedMinutes ? <span>{item.estimatedMinutes} 分钟</span> : null}
          </div>
          <h3>{item.title}</h3>
          <p>{item.summary}</p>
        </Link>
      ))}
    </div>
  )
}

export function SimpleList({
  items,
}: {
  items: string[]
}) {
  return (
    <ul className="simple-list">
      {items.map(item => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  )
}
