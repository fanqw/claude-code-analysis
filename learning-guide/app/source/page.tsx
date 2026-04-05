import Link from 'next/link'
import { notFound } from 'next/navigation'
import { CodeViewer } from '@/components/code-viewer'
import { MarkdownEvidence } from '@/components/markdown-evidence'
import { PageShell, Section, TutorialHeader } from '@/components/ui'
import { guideSnapshotLabel } from '@/lib/content'
import {
  getRelatedCodeFlowsForPath,
  getSourceDocument,
  normalizeRepoPath,
} from '@/lib/evidence'
import { createAnalysisHref, createSourceHref } from '@/lib/sourceLinks'

export default async function SourcePage({
  searchParams,
}: {
  searchParams: Promise<{ path?: string; symbol?: string }>
}) {
  const { path: rawPath, symbol } = await searchParams

  if (!rawPath) {
    notFound()
  }

  const relativePath = normalizeRepoPath(rawPath)
  if (!relativePath) {
    notFound()
  }

  const document = await getSourceDocument(relativePath, symbol)
  const relatedFlows = getRelatedCodeFlowsForPath(relativePath)
  const relatedFiles = relatedFlows.flatMap(flow => flow.nodes).reduce<
    { path: string; label: string; symbol?: string }[]
  >((acc, node) => {
    if (!acc.some(item => item.path === node.filePath && item.symbol === node.symbol)) {
      acc.push({ path: node.filePath, label: node.label, symbol: node.symbol })
    }
    return acc
  }, [])

  const currentIndex = relatedFiles.findIndex(item => item.path === relativePath)
  const previousFile = currentIndex > 0 ? relatedFiles[currentIndex - 1] : undefined
  const nextFile = currentIndex >= 0 ? relatedFiles[currentIndex + 1] : undefined
  const fileName = relativePath.split('/').pop() ?? relativePath

  return (
    <PageShell>
      <TutorialHeader
        breadcrumbs={[
          { label: '开始学习', href: '/' },
          { label: '证据核验' },
          { label: '源码详情' },
        ]}
        stage="证据核验"
        pathLabel="真实源码"
        updatedLabel={guideSnapshotLabel}
        nextLabel="核验后回到章节或学习地图"
      />
      <section className="hero hero-compact source-hero">
        <p className="eyebrow">源码核验</p>
        <h1>{fileName}</h1>
        <p>
          {symbol
            ? `当前定位符号：${symbol}`
            : '当前展示的内容直接来自本地仓库中的真实文件，用于核验教程中的关键结论。'}
        </p>
        <div className="source-filebar">
          <div className="source-header-row">
            <div className="source-breadcrumb" aria-label="文件路径">
              {relativePath.split('/').map((part, index, parts) => (
                <span className="source-breadcrumb-part" key={`${part}-${index}`}>
                  {part}
                  {index < parts.length - 1 ? (
                    <span className="source-breadcrumb-sep">/</span>
                  ) : null}
                </span>
              ))}
            </div>
            <div className="source-meta-bar">
              {document.highlightLines?.length ? (
                <span className="meta-chip">高亮 L{document.highlightLines[0]}</span>
              ) : null}
              <span className="meta-chip">{document.language.toUpperCase()}</span>
              <span className="meta-chip">{document.rawContent.split('\n').length} lines</span>
            </div>
          </div>
        </div>
        <div className="source-header-actions">
          <Link href="/map">回到学习地图</Link>
          <Link href="/sources">返回源码核验</Link>
          <Link href="/analysis">切到 analysis 核验</Link>
        </div>
      </section>

      <div className="source-layout">
        <Section title="主链文件" eyebrow="File Rail" className="source-sidebar">
          <div className="source-list">
            {(relatedFiles.length ? relatedFiles : [{ path: relativePath, label: relativePath, symbol }]).map(item => (
              <Link
                className={`source-list-item ${item.path === relativePath ? 'source-list-item-active' : ''}`.trim()}
                href={createSourceHref(item.path, item.symbol)}
                key={`${item.path}-${item.symbol ?? ''}`}
              >
                <strong>{item.label}</strong>
                <span>{item.path}</span>
              </Link>
            ))}
          </div>
        </Section>

        <Section title="真实文件内容" eyebrow="Raw Source" className="source-main">
          <div className="source-main-frame">
            {document.language === 'md' ? (
              <MarkdownEvidence content={document.rawContent} />
            ) : (
              <CodeViewer
                content={document.rawContent}
                highlightLines={document.highlightLines}
                language={document.language}
                subtitle={symbol ? `定位符号：${symbol}` : `文件：${relativePath}`}
                title={relativePath}
              />
            )}
          </div>
        </Section>

        <Section title="对照学习" eyebrow="Compare" className="source-aside">
          <div className="source-list">
            <strong>先看这里</strong>
            {document.highlightLines?.length ? (
              <span className="source-list-item">
                先读高亮的 L{document.highlightLines[0]}，这里最接近当前符号或主链入口。
              </span>
            ) : (
              <span className="source-list-item">
                先从顶部函数声明或导出的入口开始，再顺着左侧主链文件继续。
              </span>
            )}
          </div>

          <details className="details-panel">
            <summary>主链定位</summary>
            <div className="details-body">
              <div className="source-list">
                {relatedFlows.length ? (
                  relatedFlows.map(flow => (
                    <span className="source-list-item" key={flow.id}>
                      {flow.title}
                    </span>
                  ))
                ) : (
                  <span className="source-list-item">当前文件未挂到预设主链，按原文件阅读。</span>
                )}
              </div>
            </div>
          </details>

          <details className="details-panel">
            <summary>展开关联原文</summary>
            <div className="details-body">
              <div className="source-list">
                {document.linkedAnalysisDocs.length ? (
                  document.linkedAnalysisDocs.map(doc => (
                    <Link href={createAnalysisHref(doc)} key={doc}>
                      {doc}
                    </Link>
                  ))
                ) : (
                  <span className="source-list-item">当前暂未挂接 analysis 视角。</span>
                )}
              </div>
            </div>
          </details>

          <details className="details-panel">
            <summary>继续核验</summary>
            <div className="details-body">
              <div className="source-list">
                {previousFile ? (
                  <Link href={createSourceHref(previousFile.path, previousFile.symbol)}>
                    上一文件：{previousFile.label}
                  </Link>
                ) : null}
                {nextFile ? (
                  <Link href={createSourceHref(nextFile.path, nextFile.symbol)}>
                    下一文件：{nextFile.label}
                  </Link>
                ) : null}
              </div>
            </div>
          </details>
        </Section>
      </div>
    </PageShell>
  )
}
