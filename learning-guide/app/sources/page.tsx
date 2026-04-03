import { coverageStats, sourceGroups, sourceIndex } from '@/content/sourceIndex'
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

      <Section title="引用清单" eyebrow="Source References">
        <table className="table">
          <thead>
            <tr>
              <th>Label</th>
              <th>Path</th>
              <th>Note</th>
            </tr>
          </thead>
          <tbody>
            {sourceIndex.map(ref => (
              <tr key={ref.path}>
                <td>{ref.label}</td>
                <td>{ref.path}</td>
                <td>{ref.note ?? '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Section>
    </PageShell>
  )
}
