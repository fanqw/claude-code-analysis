export function PseudoCodeBlock({
  title,
  steps,
}: {
  title: string
  steps: string[]
}) {
  if (!steps.length) {
    return null
  }

  return (
    <div className="pseudo-shell">
      <div className="pseudo-head">
        <span className="meta-chip">Pseudo Code</span>
        <strong>{title}</strong>
      </div>
      <pre className="pseudo-pre">
        {steps.map((step, index) => (
          <div className="pseudo-line" key={`${title}-${index + 1}`}>
            <span className="source-line-number">{index + 1}</span>
            <code>{step}</code>
          </div>
        ))}
      </pre>
    </div>
  )
}
