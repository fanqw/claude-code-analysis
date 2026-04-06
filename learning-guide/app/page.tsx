import { ViewGallery } from '@/components/learning-structure'
import { FirstRunGuide } from '@/components/first-run-guide'
import Link from 'next/link'
import { PseudoCodeBlock } from '@/components/pseudo-code-block'
import { StudyFlow } from '@/components/study-flow'
import { PageShell, Section } from '@/components/ui'
import { starterPseudoCode } from '@/content/stages'
import { learningModules, learningStages } from '@/lib/content'

export default function HomePage() {
  return (
    <PageShell>
      <section className="hero hero-deep sketch-hero">
        <div className="hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">Tutorial First</p>
            <h1>先学主线，再做核验</h1>
            <p>第一次进入只做一件事：从架构开始，顺着主线往下读。</p>
            <div className="route-links">
              <Link href="/learn/architecture">现在开始：从架构起步</Link>
              <Link href="/map">先看阶段推进图</Link>
            </div>
          </div>
          <aside className="lesson-rail-card sticky-note sticky-note-yellow">
            <p className="eyebrow">First Session</p>
            <h3>第一次进入，只守这 3 条</h3>
            <ol className="lesson-checklist">
              <li>只点第一章，不先逛全站。</li>
              <li>读完一章，再决定下一步。</li>
              <li>结论清楚后，再回原文核验。</li>
            </ol>
            <div className="route-links">
              <Link href="/learn/architecture">进入第一章</Link>
            </div>
          </aside>
        </div>
      </section>

      <Section className="paper-card paper-card-blue" title="第一次只走这四章" eyebrow="Tutorial Route">
        <FirstRunGuide modules={learningModules} />
      </Section>

      <div className="split">
        <Section className="paper-card paper-card-plain" title="先建立脑内图像" eyebrow="思维导图">
          <ViewGallery />
        </Section>
        <Section className="paper-card paper-card-yellow" title="再跑一遍主循环" eyebrow="伪代码预演">
          <PseudoCodeBlock title="Claude Code mental loop" steps={starterPseudoCode} />
        </Section>
      </div>

      <details className="details-panel">
        <summary>主线之外的内容</summary>
        <div className="details-body">
          <Section title="完整阶段主线" eyebrow="四阶段推进">
            <StudyFlow modules={learningModules} stages={learningStages} />
          </Section>
          <div className="grid">
            <article className="module-card">
              <div className="module-meta">
                <span className="meta-chip">analysis</span>
              </div>
              <h3>再补多维分析视角</h3>
              <p>主线走通后，再按系统主干、安全和竞品这些视角补齐判断。</p>
            </article>
            <article className="module-card">
              <div className="module-meta">
                <span className="meta-chip">ui</span>
              </div>
              <h3>组件与控制面</h3>
              <p>想从界面反推 orchestrator，再进入组件区，不要放到第一跳。</p>
              <div className="route-links">
                <Link href="/components/core-interaction">从核心交互组件开始</Link>
              </div>
            </article>
            <article className="module-card">
              <div className="module-meta">
                <span className="meta-chip">apply</span>
              </div>
              <h3>映射到你自己的项目</h3>
              <p>理解主链后，再去看如何迁移到自己的 Web Agent 项目。</p>
              <div className="route-links">
                <Link href="/build/minimum-viable-agent">从最小可运行原型看起</Link>
              </div>
            </article>
          </div>
        </div>
      </details>
    </PageShell>
  )
}
