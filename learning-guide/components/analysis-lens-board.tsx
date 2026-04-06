import Link from 'next/link'
import type { AnalysisLens } from '@/content/types'
import { createAnalysisHref, createSourceHref } from '@/lib/sourceLinks'

export function AnalysisLensBoard({
  lenses,
}: {
  lenses: AnalysisLens[]
}) {
  if (!lenses.length) {
    return null
  }

  return (
    <div className="analysis-board">
      {lenses.map(lens => (
        <article className="analysis-card" key={lens.id}>
          <div className="module-meta">
            <span className="meta-chip">{lens.dimension}</span>
          </div>
          <h3>{lens.title}</h3>
          <p>{lens.summary}</p>
          <div className="flow-step">
            <strong>核验问题</strong>
            <p>{lens.guidingQuestion}</p>
          </div>
          <div className="analysis-card-section">
            <strong>优先核验</strong>
            <div className="analysis-mini-nav">
              {lens.sourceRefs.map((ref, index) => {
                const normalized = ref.path.replace(/^\.\.\//, '')
                const href = normalized.startsWith('analysis/')
                  ? createAnalysisHref(normalized)
                  : createSourceHref(normalized)
                return (
                  <Link className={index === 0 ? 'analysis-mini-nav-primary' : ''} href={href} key={`${lens.id}-${ref.path}`}>
                    {index === 0 ? '主核验' : '补充核验'}: {ref.label}
                  </Link>
                )
              })}
            </div>
          </div>
          <details className="analysis-details">
            <summary>展开更多判断点</summary>
            <ul className="simple-list">
              {lens.takeaways.map(item => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <div className="analysis-card-links">
              {lens.sourceRefs.map(ref => (
                <Link
                  href={
                    ref.path.replace(/^\.\.\//, '').startsWith('analysis/')
                      ? createAnalysisHref(ref.path.replace(/^\.\.\//, ''))
                      : createSourceHref(ref.path.replace(/^\.\.\//, ''))
                  }
                  key={`${lens.id}-${ref.path}`}
                >
                  {ref.label}
                </Link>
              ))}
            </div>
          </details>
        </article>
      ))}
    </div>
  )
}
