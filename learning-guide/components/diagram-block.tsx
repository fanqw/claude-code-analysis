import type { DiagramBlock as DiagramBlockType } from '@/content/types'

export function DiagramBlock({
  diagram,
}: {
  diagram: DiagramBlockType
}) {
  return (
    <div className="diagram-shell">
      <p className="muted">{diagram.summary}</p>
      <div className="diagram-grid">
        {diagram.nodes.map(node => (
          <article className="diagram-node" key={node.id}>
            <h3>{node.label}</h3>
            <p>{node.summary}</p>
          </article>
        ))}
      </div>
      <div className="diagram-links">
        {diagram.connections.map(connection => (
          <div className="diagram-link" key={`${connection.from}-${connection.to}`}>
            <strong>{connection.from}</strong>
            <span>{connection.label}</span>
            <strong>{connection.to}</strong>
          </div>
        ))}
      </div>
    </div>
  )
}
