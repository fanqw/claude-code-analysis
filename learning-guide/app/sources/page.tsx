import { analysisLenses, codeFlows } from '@/lib/content'
import { coverageStats, sourceGroups, sourceIndex } from '@/content/sourceIndex'
import { SourceIndexBrowser } from '@/components/source-index-browser'
import { PageShell, Section, TutorialHeader } from '@/components/ui'
import { guideSnapshotLabel } from '@/lib/content'

export default function SourcesPage() {
  return (
    <PageShell>
      <TutorialHeader
        breadcrumbs={[
          { label: '开始学习', href: '/' },
          { label: '证据核验' },
          { label: '源码入口' },
        ]}
        stage="证据核验"
        pathLabel="真实源码"
        updatedLabel={guideSnapshotLabel}
        nextLabel="只在需要验证主链时进入"
      />
      <section className="hero hero-compact">
        <p className="eyebrow">Source Evidence</p>
        <h1>真实源码核验中心</h1>
        <p>这里是源码证据中心，不是第一学习入口。先走主线章节，再回到这里顺着主链落回真实文件，核对章节结论是否成立。</p>
      </section>

      <Section title="从这里开始" eyebrow="Start From These">
        <p className="muted">如果你已经知道自己要验证哪条主链，只点下面 5 个入口。统计、筛选和全量索引都放到后面再看。</p>
        <div className="route-links">
          <a href="/source?path=src%2Fentrypoints%2Fcli.tsx&symbol=main">1. src/entrypoints/cli.tsx</a>
          <a href="/source?path=src%2Fmain.tsx&symbol=main">2. src/main.tsx</a>
          <a href="/source?path=src%2Fquery.ts&symbol=query">3. src/query.ts</a>
          <a href="/source?path=src%2Fservices%2Ftools%2FtoolOrchestration.ts&symbol=runTools">4. toolOrchestration.ts</a>
          <a href="/source?path=src%2Fconstants%2Fprompts.ts&symbol=getSystemPrompt">5. prompts.ts</a>
        </div>
      </Section>

      <details className="details-panel">
        <summary>展开完整索引、筛选器和覆盖统计</summary>
        <div className="details-body details-stack">
          <Section title="覆盖统计" eyebrow="Coverage">
            <div className="pill-row">
              <span className="meta-chip">学习模块 {coverageStats.learningModules}</span>
              <span className="meta-chip">组件模块 {coverageStats.componentModules}</span>
              <span className="meta-chip">调用链 {coverageStats.flows}</span>
              <span className="meta-chip">引用项 {coverageStats.sourceRefs}</span>
            </div>
          </Section>

          <div className="split">
            <Section title="来源构成" eyebrow="Source Groups">
              <div className="pill-row">
                {sourceGroups.map(group => (
                  <span className="meta-chip" key={group.label}>
                    {group.label} {group.count}
                  </span>
                ))}
              </div>
            </Section>
            <Section title="完成度" eyebrow="Ready Coverage">
              <div className="pill-row">
                <span className="meta-chip">
                  已完成主模块 {coverageStats.readyLearningModules}/{coverageStats.learningModules}
                </span>
                <span className="meta-chip">
                  已完成组件模块 {coverageStats.readyComponentModules}/{coverageStats.componentModules}
                </span>
              </div>
            </Section>
          </div>

          <Section title="源码核验目录" eyebrow="Source References">
            <SourceIndexBrowser codeFlows={codeFlows} refs={sourceIndex} />
          </Section>

          <Section title="analysis 视角总览" eyebrow="Jump To Analysis">
            <div className="analysis-board">
              {analysisLenses.map(lens => (
                <article className="analysis-card" key={lens.id}>
                  <div className="module-meta">
                    <span className="meta-chip">{lens.dimension}</span>
                  </div>
                  <h3>{lens.title}</h3>
                  <p>{lens.summary}</p>
                  <div className="route-links">
                    <a href="/analysis">进入原文核验中心</a>
                  </div>
                </article>
              ))}
            </div>
          </Section>
        </div>
      </details>
    </PageShell>
  )
}
