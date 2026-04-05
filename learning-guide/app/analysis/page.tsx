import Link from 'next/link'
import { promises as fs } from 'fs'
import path from 'path'
import { AnalysisLensBoard } from '@/components/analysis-lens-board'
import { PageShell, Section, TutorialHeader } from '@/components/ui'
import { analysisLenses, guideSnapshotLabel } from '@/lib/content'
import { moduleEvidenceMap } from '@/content/evidenceMap'
import { createAnalysisHref, createSourceHref } from '@/lib/sourceLinks'
import { extractHeadings, titleFromPath } from '@/lib/evidence'

const REPO_ROOT = path.resolve(process.cwd(), '..')

function normalizeAnalysisPath(rawPath: string) {
  const cleaned = rawPath.replace(/^(\.\.\/)+/, '').replace(/^\.?\//, '')
  return cleaned.startsWith('analysis/') && cleaned.endsWith('.md') ? cleaned : null
}

async function readAnalysisIndex() {
  const docs = new Map<
    string,
    {
      path: string
      title: string
      rawContent: string
      headings: string[]
      linkedModules: string[]
      linkedSourceFiles: string[]
    }
  >()

  for (const lens of analysisLenses) {
    for (const ref of lens.sourceRefs) {
      const normalized = normalizeAnalysisPath(ref.path)
      if (!normalized) continue

      let rawContent: string
      try {
        rawContent = await fs.readFile(path.resolve(REPO_ROOT, normalized), 'utf8')
      } catch {
        continue
      }

      const existing = docs.get(normalized)
      const linkedModules = existing
        ? Array.from(new Set([...existing.linkedModules, ...lens.linkedModules]))
        : [...lens.linkedModules]
      const linkedSourceFiles = Array.from(
        new Set(
          linkedModules.flatMap(moduleSlug =>
            moduleEvidenceMap[moduleSlug]?.source.map(item => item.targetPath) ?? [],
          ),
        ),
      )

      docs.set(normalized, {
        path: normalized,
        title: ref.label.replace(/^analysis\//, ''),
        rawContent,
        headings: extractHeadings(rawContent),
        linkedModules,
        linkedSourceFiles,
      })
    }
  }

  return Array.from(docs.values()).sort((a, b) => a.path.localeCompare(b.path))
}

export default async function AnalysisIndexPage() {
  const docs = await readAnalysisIndex()
  const featured = docs.slice(0, 3)
  const grouped = {
    architecture: docs.filter(doc => doc.path.includes('01-') || doc.path.includes('10-')).slice(0, 5),
    runtime: docs.filter(doc => doc.path.includes('04')).slice(0, 6),
    risk: docs.filter(doc => doc.path.includes('02-') || doc.path.includes('03-') || doc.path.includes('05-') || doc.path.includes('06-') || doc.path.includes('08-') || doc.path.includes('11-')).slice(0, 6),
  }

  return (
    <PageShell>
      <TutorialHeader
        breadcrumbs={[
          { label: '开始学习', href: '/' },
          { label: '证据核验' },
          { label: 'analysis 原文' },
        ]}
        stage="证据核验"
        pathLabel="analysis 原文"
        updatedLabel={guideSnapshotLabel}
        nextLabel="先理解主线，再回到这里验证"
      />
      <section className="hero hero-compact hero-deep analysis-hero">
        <div className="analysis-hero-copy">
          <p className="eyebrow">Evidence Check</p>
          <h1>analysis 原文核验中心</h1>
          <p>
            这里展示的是当前仓库 `analysis/` 目录下的真实原文。它是章节结论的核验入口，不是第一学习入口。先走主线章节，再回到这里逐篇核对。
          </p>
          <div className="route-links">
            <Link href="/learn/architecture">先走架构主线</Link>
            <Link href="/analysis/01-architecture-overview">已经进入核验阶段？从第一篇原文开始</Link>
            <Link href="/sources">切到源码核验中心</Link>
          </div>
        </div>
        <div className="analysis-hero-panel">
          <div className="analysis-hero-list">
            <strong>先看什么</strong>
            <Link href="/analysis/01-architecture-overview">1. 软件架构与程序入口</Link>
            <Link href="/analysis/04b-tool-call-implementation">2. Tool Call 机制</Link>
            <Link href="/analysis/04f-context-management">3. Context Management</Link>
            <Link href="/analysis/04e-sandbox-implementation">4. Sandbox Implementation</Link>
          </div>
          <div className="analysis-hero-list">
            <strong>怎么使用这页</strong>
            <span className="source-list-item">先从章节页确认你要核验哪条结论。</span>
            <span className="source-list-item">再按阶段或主题找到对应原文。</span>
            <span className="source-list-item">最后顺着链接回到真实源码继续验证。</span>
          </div>
        </div>
      </section>

      <div className="analysis-layout">
        <Section title="先看什么" eyebrow="Start Here" className="analysis-primary">
          <div className="analysis-spotlight-grid">
            {featured.length ? (
              featured.map(doc => (
                <Link className="analysis-spotlight" href={createAnalysisHref(doc.path)} key={doc.path}>
                  <span className="meta-chip">原文入口</span>
                  <strong>{doc.title}</strong>
                  <span>{doc.headings.slice(0, 3).join(' / ') || '打开原文直接看标题层级'}</span>
                </Link>
              ))
            ) : (
              <div className="analysis-empty-state">
                <strong>暂无可展示原文</strong>
                <span>请确认 `analysis/` 目录下的 markdown 文件可以读取。</span>
              </div>
            )}
          </div>
        </Section>

        <Section title="阅读导航" eyebrow="Reading Map" className="analysis-aside">
          <div className="source-list">
            <strong>可点击入口</strong>
            <Link href="/analysis/01-architecture-overview">第一篇原文</Link>
            <Link href="/analysis/04b-tool-call-implementation">工具运行时</Link>
            <Link href="/analysis/04f-context-management">上下文治理</Link>
            <Link href="/analysis/04e-sandbox-implementation">安全与沙箱</Link>
          </div>
          <div className="source-list">
            <strong>只读说明</strong>
            <span className="source-list-item">这不是总结页，也不是首页替代品，导学文本只负责帮你找到原文。</span>
            <span className="source-list-item">真正需要验证的内容，请继续点原文或跳源码。</span>
          </div>
        </Section>
      </div>

      <Section title="按分析视角进入" eyebrow="Evidence Lenses">
        <AnalysisLensBoard lenses={analysisLenses} />
      </Section>

      <div className="split split-balanced">
        <Section title="按阶段进入" eyebrow="By Learning Stage">
          <div className="source-list">
            <Link href="/analysis/01-architecture-overview">
              <strong>阶段 1：系统骨架</strong>
              <span>先看架构总览，再顺着 tool call 和 prompt 管理往下读。</span>
            </Link>
            <Link href="/analysis/04f-context-management">
              <strong>阶段 2：长会话治理</strong>
              <span>从 context、memory、session resume 三篇把运行态串起来。</span>
            </Link>
            <Link href="/analysis/04e-sandbox-implementation">
              <strong>阶段 3：安全与扩展</strong>
              <span>从 sandbox、MCP、skills 三个方向看边界如何落地。</span>
            </Link>
            <Link href="/analysis/04h-multi-agent">
              <strong>阶段 4：高阶协作与判断</strong>
              <span>最后再读 multi-agent、竞品和隐藏能力。</span>
            </Link>
          </div>
        </Section>
        <Section title="和源码一起读" eyebrow="Bridge To Source">
          <div className="source-list">
            <Link href={createSourceHref('src/entrypoints/cli.tsx', 'main')}>
              <strong>入口链源码</strong>
              <span>先把 `entrypoints/cli.tsx &rarr; main.tsx &rarr; query.ts` 看通。</span>
            </Link>
            <Link href={createSourceHref('src/query.ts', 'query')}>
              <strong>统一执行内核</strong>
              <span>读 analysis 时遇到 query 主循环，立刻跳回真实源码验证。</span>
            </Link>
            <Link href={createSourceHref('src/services/tools/toolOrchestration.ts', 'runTools')}>
              <strong>工具与权限主链</strong>
              <span>配合 tool call、sandbox 两条 analysis 原文一起看。</span>
            </Link>
          </div>
        </Section>
      </div>

      <Section title="按主题浏览原文" eyebrow="Browse Raw Documents">
        <div className="grid">
          <article className="module-card">
            <div className="module-meta">
              <span className="meta-chip">架构与入口</span>
            </div>
            <div className="source-list">
              {grouped.architecture.map(doc => (
                <Link href={createAnalysisHref(doc.path)} key={doc.path}>
                  <strong>{doc.title}</strong>
                  <span>{doc.path}</span>
                </Link>
              ))}
            </div>
          </article>
          <article className="module-card">
            <div className="module-meta">
              <span className="meta-chip">运行机制</span>
            </div>
            <div className="source-list">
              {grouped.runtime.map(doc => (
                <Link href={createAnalysisHref(doc.path)} key={doc.path}>
                  <strong>{doc.title}</strong>
                  <span>{doc.path}</span>
                </Link>
              ))}
            </div>
          </article>
          <article className="module-card">
            <div className="module-meta">
              <span className="meta-chip">安全与判断</span>
            </div>
            <div className="source-list">
              {grouped.risk.map(doc => (
                <Link href={createAnalysisHref(doc.path)} key={doc.path}>
                  <strong>{doc.title}</strong>
                  <span>{doc.path}</span>
                </Link>
              ))}
            </div>
          </article>
        </div>
      </Section>

      <Section title="按原文件浏览" eyebrow="Raw Documents">
          <div className="docs-directory">
          {docs.map(doc => (
            <article className="docs-row" key={doc.path}>
              <div className="docs-row-main">
                <div className="module-meta">
                  <span className="meta-chip">{doc.path.startsWith('analysis/components/') ? 'components' : 'analysis'}</span>
                </div>
                <h3>{titleFromPath(doc.path)}</h3>
                <p>{doc.headings.slice(0, 4).join(' / ') || '原文未提取到 heading，直接打开看全文。'}</p>
              </div>
              <div className="docs-row-actions">
                <Link href={createAnalysisHref(doc.path)}>打开原文</Link>
                {doc.linkedSourceFiles.slice(0, 2).map(file => (
                  <Link href={createSourceHref(file)} key={file}>
                    {file}
                  </Link>
                ))}
              </div>
            </article>
          ))}
        </div>
      </Section>

      <Section title="阅读方式说明" eyebrow="Reading Contract">
        <div className="analysis-contract">
          <div className="analysis-contract-item">
            <strong>可点击</strong>
            <span>原文入口、分析视角、源码跳转。</span>
          </div>
          <div className="analysis-contract-item">
            <strong>仅浏览</strong>
            <span>阅读说明、阶段顺序、视角摘要。</span>
          </div>
          <div className="analysis-contract-item">
            <strong>验证方式</strong>
            <span>从 analysis 点到源码，再回看原文。</span>
          </div>
        </div>
      </Section>
    </PageShell>
  )
}
