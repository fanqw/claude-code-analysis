import Link from 'next/link'
import { notFound } from 'next/navigation'
import { MarkdownEvidence } from '@/components/markdown-evidence'
import { PageShell, Section } from '@/components/ui'
import { getAnalysisDocument, normalizeRepoPath } from '@/lib/evidence'
import { createSourceHref } from '@/lib/sourceLinks'

export default async function AnalysisDocumentPage({
  params,
}: {
  params: Promise<{ slug: string[] }>
}) {
  const { slug } = await params
  const relativePath = normalizeRepoPath(`analysis/${slug.join('/')}.md`)

  if (!relativePath) {
    notFound()
  }

  const doc = await getAnalysisDocument(relativePath)

  return (
    <PageShell>
      <section className="hero hero-compact analysis-doc-hero">
        <div className="analysis-hero-copy">
          <p className="eyebrow">analysis 核验</p>
          <h1>{doc.title}</h1>
          <p>{doc.path}</p>
          <div className="route-links">
            <Link href="/analysis">返回 analysis 核验中心</Link>
            {doc.linkedSourceFiles[0] ? <Link href={createSourceHref(doc.linkedSourceFiles[0])}>看关联源码核验</Link> : null}
          </div>
        </div>
        <div className="analysis-hero-panel">
          <div className="analysis-hero-list">
            <strong>先看标题结构</strong>
            {doc.headings.slice(0, 5).map(item => (
              <span className="source-list-item" key={item}>
                {item}
              </span>
            ))}
          </div>
          <div className="analysis-hero-list">
            <strong>再回章节核验</strong>
            {doc.linkedModules.slice(0, 4).map(module => (
              <Link href={`/learn/${module}`} key={module}>
                {module}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <div className="source-layout">
        <Section title="文档结构" eyebrow="Headings" className="source-sidebar">
          <div className="source-list">
            {doc.headings.map(item => (
              <span className="source-list-item" key={item}>
                {item}
              </span>
            ))}
          </div>
        </Section>

        <Section title="原文核验" eyebrow="Raw Evidence" className="source-main">
          <div className="source-main-frame source-main-frame-wide">
            <MarkdownEvidence content={doc.rawContent} />
          </div>
        </Section>

        <Section title="源码对照" eyebrow="Linked Source" className="source-aside">
          <div className="source-list">
            <strong>关联章节</strong>
            {doc.linkedModules.map(module => (
              <Link href={`/learn/${module}`} key={module}>
                {module}
              </Link>
            ))}
          </div>
          <div className="source-list">
            <strong>关联源码核验</strong>
            {doc.linkedSourceFiles.map(file => (
              <Link href={createSourceHref(file)} key={file}>
                {file}
              </Link>
            ))}
          </div>
        </Section>
      </div>
    </PageShell>
  )
}
