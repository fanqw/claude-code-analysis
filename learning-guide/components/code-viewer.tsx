function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
}

function highlightCode(line: string, language: string) {
  if (language === 'md') {
    if (/^#{1,6}\s/.test(line)) {
      return `<span class="token token-heading">${escapeHtml(line)}</span>`
    }
    if (/^\s*[-*]\s/.test(line)) {
      return `<span class="token token-bullet">${escapeHtml(line)}</span>`
    }
    return escapeHtml(line)
  }

  if (/^\s*(\/\/|\/\*|\*)/.test(line)) {
    return `<span class="token token-comment">${escapeHtml(line)}</span>`
  }

  const parts = line.split(
    /(`(?:[^`\\]|\\.)*`|'(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*"|\b(?:import|export|async|await|return|const|let|var|function|class|extends|if|else|for|while|switch|case|break|continue|type|interface|from|new|try|catch|throw|true|false|null|undefined)\b)/g,
  )

  return parts
    .filter(part => part.length > 0)
    .map(part => {
      if (/^(`(?:[^`\\]|\\.)*`|'(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*")$/.test(part)) {
        return `<span class="token token-string">${escapeHtml(part)}</span>`
      }
      if (/^(true|false|null|undefined)$/.test(part)) {
        return `<span class="token token-atom">${escapeHtml(part)}</span>`
      }
      if (/^(import|export|async|await|return|const|let|var|function|class|extends|if|else|for|while|switch|case|break|continue|type|interface|from|new|try|catch|throw)$/.test(part)) {
        return `<span class="token token-keyword">${escapeHtml(part)}</span>`
      }
      return escapeHtml(part)
    })
    .join('')
}

export function CodeViewer({
  content,
  language,
  highlightLines = [],
  title,
  subtitle,
}: {
  content: string
  language: string
  highlightLines?: number[]
  title?: string
  subtitle?: string
}) {
  const highlighted = new Set(highlightLines)
  const lines = content.split('\n')

  return (
    <div className="code-window code-window-github">
      <div className="code-header">
        <div className="code-header-copy">
          <div className="code-file-path">
            <span className="code-file-name">{title ?? 'Source preview'}</span>
            {subtitle ? <span className="code-file-subtitle">{subtitle}</span> : null}
          </div>
          <div className="code-header-breadcrumb">
            <span>local repo</span>
            <span>/</span>
            <span>{language}</span>
            <span>/</span>
            <span>{lines.length} lines</span>
          </div>
        </div>
        <div className="code-header-meta">
          <span className="meta-chip">{language}</span>
          <span className="meta-chip">{lines.length} lines</span>
        </div>
      </div>
      <div className="code-scroll">
        <div className="code-body">
          {lines.map((line, index) => (
            <div
              className={`code-line ${highlighted.has(index + 1) ? 'code-line-active' : ''}`.trim()}
              key={`line-${index + 1}`}
            >
              <span className="code-line-number">{index + 1}</span>
              <code
                dangerouslySetInnerHTML={{
                  __html: highlightCode(line, language),
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
