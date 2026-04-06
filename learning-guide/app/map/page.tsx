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
      <section className="hero hero-deep sketch-hero">
        <div className="hero-grid">
          <div>
            <p className="eyebrow">Learning Map</p>
            <h1>先判断你在哪一阶段，再只点当前阶段的第一章</h1>
            <p>
              这页不是资料目录，而是阶段路由器。每个阶段都只突出一个入口，帮你先决定现在该学什么，再决定后面去哪里核验。
            </p>
          </div>
          <aside className="lesson-rail-card sticky-note sticky-note-blue">
            <p className="eyebrow">Use It Like This</p>
            <h3>地图页只做三件事</h3>
            <ol className="lesson-checklist">
              <li>确认当前阶段的学习目标。</li>
              <li>只点击这一阶段的第一章。</li>
              <li>读完后再回来，决定下一步而不是同时开分支。</li>
            </ol>
          </aside>
        </div>
      </section>

      <Section className="tutorial-main-section paper-card paper-card-plain" title="阶段推进图" eyebrow="Progressive Map">
        <StageRoadmap modules={learningModules} stages={learningStages} />
      </Section>

      <details className="details-panel">
        <summary>主线走完后再展开补充分支</summary>
        <div className="details-body">
          <div className="grid">
            <article className="module-card paper-card paper-card-yellow">
              <h3>先回章节做核验</h3>
              <p>地图页只负责定向，不负责核验证据。真正需要看 analysis 和源码时，回到具体章节里的证据区。</p>
            </article>
            <article className="module-card paper-card paper-card-green">
              <h3>主线之外的分支</h3>
              <p>只有当主线已经走通，再进入组件、竞品和 build 指南这些分支，不要把它们放进当前阶段的决策里。</p>
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
