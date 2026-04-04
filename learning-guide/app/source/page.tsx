import { promises as fs } from 'fs'
import path from 'path'
import { notFound } from 'next/navigation'
import { PageShell, Section } from '@/components/ui'

const ALLOWED_PREFIXES = ['src/', 'analysis/', 'README.md']

function normalizePath(rawPath: string) {
  const cleaned = rawPath.replace(/^\.?\/*/, '')
  if (!ALLOWED_PREFIXES.some(prefix => cleaned === prefix || cleaned.startsWith(prefix))) {
    return null
  }
  return cleaned
}

export default async function SourcePage({
  searchParams,
}: {
  searchParams: Promise<{ path?: string; symbol?: string }>
}) {
  const { path: rawPath, symbol } = await searchParams

  if (!rawPath) {
    notFound()
  }

  const relativePath = normalizePath(rawPath)
  if (!relativePath) {
    notFound()
  }

  const repoRoot = path.resolve(process.cwd(), '..')
  const filePath = path.resolve(repoRoot, relativePath)
  const content = await fs.readFile(filePath, 'utf8')
  const lines = content.split('\n')
  const symbolLine = symbol
    ? lines.findIndex(line => line.includes(symbol)) + 1
    : 0

  return (
    <PageShell>
      <section className="hero">
        <p className="eyebrow">Source Viewer</p>
        <h1>{relativePath}</h1>
        <p>
          {symbol ? `当前定位符号：${symbol}${symbolLine ? `（约第 ${symbolLine} 行）` : ''}` : '当前打开的是源码文件视图。'}
        </p>
      </section>

      <Section title="源码内容" eyebrow="Code">
        <pre className="source-pre">
          {lines.map((line, index) => (
            <div className={`source-line ${symbolLine === index + 1 ? 'source-line-highlight' : ''}`.trim()} key={`${relativePath}-${index + 1}`}>
              <span className="source-line-number">{index + 1}</span>
              <code>{line}</code>
            </div>
          ))}
        </pre>
      </Section>
    </PageShell>
  )
}
