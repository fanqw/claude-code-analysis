import Link from 'next/link'
import { PageShell, Section } from '@/components/ui'
import { codeFlows } from '@/lib/content'
import { getArchitectureNodes } from '@/lib/evidence'
import { createAnalysisHref, createSourceHref } from '@/lib/sourceLinks'

export default function ArchitecturePage() {
  const nodes = getArchitectureNodes()

  return (
    <PageShell>
      <section className="hero hero-deep">
        <p className="eyebrow">Architecture Evidence</p>
        <h1>源码架构总览</h1>
        <p>这页把目录层、职责层和主链层放在一起看，而且每个节点都能落回真实 `src/` 或真实 `analysis/` 文件。</p>
      </section>

      <Section title="按目录看" eyebrow="Directory View">
        <div className="grid">
          {nodes.map(node => (
            <article className="module-card" key={node.id}>
              <div className="module-meta">
                <span className="meta-chip">{node.role}</span>
              </div>
              <h3>{node.label}</h3>
              <p>{node.summary}</p>
              <div className="route-links">
                {node.relatedEvidence.map(link =>
                  link.targetType === 'analysis' ? (
                    <Link href={createAnalysisHref(link.targetPath)} key={`${node.id}-${link.targetPath}`}>
                      {link.label}
                    </Link>
                  ) : (
                    <Link href={createSourceHref(link.targetPath, link.symbol)} key={`${node.id}-${link.targetPath}-${link.symbol ?? ''}`}>
                      {link.label}
                    </Link>
                  ),
                )}
              </div>
            </article>
          ))}
        </div>
      </Section>

      <Section title="按运行链看" eyebrow="Runtime Chains">
        <div className="grid">
          {codeFlows.filter(flow => flow.popular).map(flow => (
            <article className="module-card" key={flow.id}>
              <div className="module-meta">
                <span className="meta-chip">{flow.granularity === 'function' ? '函数级' : '模块级'}</span>
              </div>
              <h3>{flow.title}</h3>
              <p>{flow.summary}</p>
              <div className="route-links">
                {flow.nodes.map(node => (
                  <Link href={createSourceHref(node.filePath, node.symbol)} key={`${flow.id}-${node.id}`}>
                    {node.label}
                  </Link>
                ))}
              </div>
            </article>
          ))}
        </div>
      </Section>
    </PageShell>
  )
}
