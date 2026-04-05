import Link from 'next/link'
import { StageRoadmap } from '@/components/stage-roadmap'
import { PageShell, Section, TutorialHeader } from '@/components/ui'
import { guideSnapshotLabel, learningModules, learningStages } from '@/lib/content'

export default function MapPage() {
  return (
    <PageShell>
      <TutorialHeader
        breadcrumbs={[
          { label: '开始学习', href: '/' },
          { label: '学习地图' },
        ]}
        stage="教程树"
        pathLabel="阶段推进"
        updatedLabel={guideSnapshotLabel}
        nextLabel="下一步：进入当前阶段的第一章"
      />
      <section className="hero hero-deep">
        <p className="eyebrow">Learning Map</p>
        <h1>这页只回答两件事：现在在哪一阶段，下一步读哪一章</h1>
        <p>
          `/map` 不负责证据索引和源码目录。你在这里先确认阶段推进顺序，再选择当前阶段的最小下一步进入章节页。
        </p>
      </section>

      <Section className="tutorial-main-section" title="阶段推进图" eyebrow="Progressive Map">
        <StageRoadmap modules={learningModules} stages={learningStages} />
      </Section>

      <Section className="tutorial-main-section" title="如果你只走一条路" eyebrow="Recommended Only Path">
        <article className="stage-card">
          <div className="stage-index">主线分流</div>
          <h3>Architecture → Tool Call → Prompt → Context → Session → Sandbox</h3>
          <p>先走这条 6 章主线。每一章只负责帮你建立一块稳定理解，不要在这里同时展开证据和分支目录。</p>
          <div className="route-links">
            <Link href="/learn/architecture">现在去第一章</Link>
            <Link href="/learn/tool-call">如果你已经读完架构，继续 Tool Call</Link>
          </div>
        </article>
      </Section>

      <Section className="tutorial-main-section" title="当前阶段的最小下一步" eyebrow="Pick The Next Step">
        <div className="grid">
          {learningStages.map(stage => {
            const firstModule = learningModules.find(module => module.slug === stage.modules[0])
            return (
              <article className="module-card" key={stage.id}>
                <div className="module-meta">
                  <span className="meta-chip">{stage.title}</span>
                </div>
                <h3>{stage.outcome}</h3>
                <p>{stage.whyNow}</p>
                <div className="route-links">
                  {firstModule ? <Link href={`/learn/${firstModule.slug}`}>先去：{firstModule.title}</Link> : null}
                </div>
              </article>
            )
          })}
        </div>
      </Section>

      <details className="details-panel">
        <summary>读完当前阶段后再去哪里</summary>
        <div className="details-body">
          <div className="grid">
            <article className="module-card">
              <h3>回到章节里做核验</h3>
              <p>当你已经知道当前阶段在讲什么，再从对应章节的核验区进入真实 analysis 和真实源码，不要在地图页上做证据选择。</p>
            </article>
            <article className="module-card">
              <h3>主线之外的分支</h3>
              <p>如果你已经走完主线，再进入组件、竞品和 build 指南这些分支，不要把它们放到当前决策里。</p>
              <div className="route-links">
                <Link href="/components/core-interaction">组件与控制面</Link>
                <Link href="/build/minimum-viable-agent">映射到你自己的项目</Link>
              </div>
            </article>
          </div>
        </div>
      </details>
    </PageShell>
  )
}
