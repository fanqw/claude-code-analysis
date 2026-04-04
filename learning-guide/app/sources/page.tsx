import { analysisLenses, codeFlows } from '@/lib/content'
import { coverageStats, sourceGroups, sourceIndex } from '@/content/sourceIndex'
import { SourceIndexBrowser } from '@/components/source-index-browser'
import { PageShell, Section } from '@/components/ui'

export default function SourcesPage() {
  return (
    <PageShell>
      <section className="hero">
        <p className="eyebrow">Sources</p>
        <h1>来源索引</h1>
        <p>学习站的每个核心模块都应能追溯到当前仓库中的分析文档或源码文件。</p>
      </section>

      <Section title="覆盖统计" eyebrow="Coverage">
        <div className="pill-row">
          <span className="pill">学习模块 {coverageStats.learningModules}</span>
          <span className="pill">组件模块 {coverageStats.componentModules}</span>
          <span className="pill">调用链 {coverageStats.flows}</span>
          <span className="pill">引用项 {coverageStats.sourceRefs}</span>
        </div>
      </Section>

      <div className="split">
        <Section title="来源构成" eyebrow="Source Groups">
          <div className="pill-row">
            {sourceGroups.map(group => (
              <span className="pill" key={group.label}>
                {group.label} {group.count}
              </span>
            ))}
          </div>
        </Section>
        <Section title="完成度" eyebrow="Ready Coverage">
          <div className="pill-row">
            <span className="pill">
              已完成主模块 {coverageStats.readyLearningModules}/{coverageStats.learningModules}
            </span>
            <span className="pill">
              已完成组件模块 {coverageStats.readyComponentModules}/{coverageStats.componentModules}
            </span>
          </div>
        </Section>
      </div>

      <Section title="新手推荐顺序" eyebrow="Start From These">
        <div className="route-links">
          <a href="/source?path=analysis%2F01-architecture-overview.md">1. architecture overview</a>
          <a href="/source?path=src%2Fquery.ts&symbol=query">2. query.ts / query</a>
          <a href="/source?path=analysis%2F04b-tool-call-implementation.md">3. tool call analysis</a>
          <a href="/source?path=src%2Futils%2FsystemPrompt.ts&symbol=getSystemPrompt">4. systemPrompt.ts</a>
          <a href="/source?path=analysis%2F04f-context-management.md">5. context analysis</a>
        </div>
      </Section>

      <Section title="源码导航中心" eyebrow="Source References">
        <SourceIndexBrowser codeFlows={codeFlows} refs={sourceIndex} />
      </Section>

      <Section title="analysis 视角总览" eyebrow="Analysis Dimensions">
        <div className="analysis-board">
          {analysisLenses.map(lens => (
            <article className="analysis-card" key={lens.id}>
              <div className="module-meta">
                <span className="pill">{lens.dimension}</span>
              </div>
              <h3>{lens.title}</h3>
              <p>{lens.summary}</p>
            </article>
          ))}
        </div>
      </Section>
    </PageShell>
  )
}
