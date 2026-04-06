type ExcalidrawFlowNode = {
  title: string
  note?: string
}

export function ExcalidrawFlow({
  eyebrow,
  title,
  summary,
  nodes,
}: {
  eyebrow?: string
  title: string
  summary?: string
  nodes: ExcalidrawFlowNode[]
}) {
  if (!nodes.length) {
    return null
  }

  return (
    <div className="excalidraw-flow">
      <div className="excalidraw-flow-head">
        {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
        <h3>{title}</h3>
        {summary ? <p>{summary}</p> : null}
      </div>

      <div className="excalidraw-canvas" role="presentation">
        {nodes.map((node, index) => (
          <div className="excalidraw-step" key={`${title}-${index}`}>
            <article className={`excalidraw-card excalidraw-card-${index % 4}`}>
              <strong>{node.title}</strong>
              {node.note ? <span>{node.note}</span> : null}
            </article>
            {index < nodes.length - 1 ? (
              <div className="excalidraw-arrow" aria-hidden="true">
                <svg fill="none" viewBox="0 0 120 40" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M4 22C34 14 60 28 94 20"
                    stroke="rgba(239, 180, 109, 0.92)"
                    strokeLinecap="round"
                    strokeWidth="2.4"
                  />
                  <path
                    d="M84 12C96 18 102 21 114 20"
                    stroke="rgba(239, 180, 109, 0.92)"
                    strokeLinecap="round"
                    strokeWidth="2.4"
                  />
                  <path
                    d="M84 28C96 22 102 19 114 20"
                    stroke="rgba(239, 180, 109, 0.92)"
                    strokeLinecap="round"
                    strokeWidth="2.4"
                  />
                </svg>
              </div>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  )
}
