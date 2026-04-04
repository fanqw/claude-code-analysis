import Link from 'next/link'
import type { AnalysisLens } from '@/content/types'

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
            <span className="pill">{lens.dimension}</span>
          </div>
          <h3>{lens.title}</h3>
          <p>{lens.summary}</p>
          <div className="flow-step">
            <strong>你应该追问的问题</strong>
            <p>{lens.guidingQuestion}</p>
          </div>
          <ul className="simple-list">
            {lens.takeaways.map(item => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <div className="route-links">
            {lens.sourceRefs.map(ref => (
              <Link href={`/source?path=${encodeURIComponent(ref.path.replace(/^\.\.\//, ''))}`} key={`${lens.id}-${ref.path}`}>
                {ref.label}
              </Link>
            ))}
          </div>
        </article>
      ))}
    </div>
  )
}
