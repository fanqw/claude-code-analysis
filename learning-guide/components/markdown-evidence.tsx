type Block =
  | { type: 'heading'; level: number; content: string }
  | { type: 'list'; items: string[] }
  | { type: 'code'; language: string; content: string }
  | { type: 'paragraph'; content: string }

function parseMarkdown(raw: string): Block[] {
  const lines = raw.split('\n')
  const blocks: Block[] = []
  let index = 0

  while (index < lines.length) {
    const line = lines[index]

    if (!line.trim()) {
      index += 1
      continue
    }

    if (line.startsWith('```')) {
      const language = line.replace(/^```/, '').trim()
      index += 1
      const code: string[] = []
      while (index < lines.length && !lines[index].startsWith('```')) {
        code.push(lines[index])
        index += 1
      }
      index += 1
      blocks.push({ type: 'code', language, content: code.join('\n') })
      continue
    }

    const heading = /^(#{1,6})\s+(.*)$/.exec(line)
    if (heading) {
      blocks.push({
        type: 'heading',
        level: heading[1].length,
        content: heading[2],
      })
      index += 1
      continue
    }

    if (/^\s*[-*]\s+/.test(line)) {
      const items: string[] = []
      while (index < lines.length && /^\s*[-*]\s+/.test(lines[index])) {
        items.push(lines[index].replace(/^\s*[-*]\s+/, '').trim())
        index += 1
      }
      blocks.push({ type: 'list', items })
      continue
    }

    const paragraph: string[] = []
    while (
      index < lines.length &&
      lines[index].trim() &&
      !/^(#{1,6})\s+/.test(lines[index]) &&
      !/^\s*[-*]\s+/.test(lines[index]) &&
      !lines[index].startsWith('```')
    ) {
      paragraph.push(lines[index])
      index += 1
    }
    blocks.push({ type: 'paragraph', content: paragraph.join(' ') })
  }

  return blocks
}

export function MarkdownEvidence({
  content,
}: {
  content: string
}) {
  const blocks = parseMarkdown(content)

  function renderHeading(level: number, value: string, key: string) {
    if (level <= 1) return <h2 key={key}>{value}</h2>
    if (level === 2) return <h3 key={key}>{value}</h3>
    if (level === 3) return <h4 key={key}>{value}</h4>
    if (level === 4) return <h5 key={key}>{value}</h5>
    return <h6 key={key}>{value}</h6>
  }

  return (
    <div className="markdown-evidence">
      {blocks.map((block, index) => {
        const key = `${block.type}-${index}`
        if (block.type === 'heading') {
          return renderHeading(block.level, block.content, key)
        }
        if (block.type === 'list') {
          return (
            <ul className="simple-list" key={key}>
              {block.items.map(item => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          )
        }
        if (block.type === 'code') {
          return (
            <pre className="evidence-code-block" key={key}>
              <code>{block.content}</code>
            </pre>
          )
        }
        return <p key={key}>{block.content}</p>
      })}
    </div>
  )
}
