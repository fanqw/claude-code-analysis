import Link from 'next/link'
import { MapPanels } from '@/components/map-panels'
import { PseudoCodeBlock } from '@/components/pseudo-code-block'
import { StageRoadmap } from '@/components/stage-roadmap'
import { PageShell, Section } from '@/components/ui'
import { starterPseudoCode } from '@/content/stages'
import { codeFlows, componentModules, learningModules, learningStages } from '@/lib/content'

export default function MapPage() {
  return (
    <PageShell>
      <section className="hero hero-deep">
        <p className="eyebrow">Learning Map</p>
        <h1>按阶段推进的学习图，而不是一堆平铺概念</h1>
        <p>
          学习图现在按“骨架到长会话，再到安全与扩展，最后进入高阶协作”四段推进。每一段都告诉你为什么先看这部分，
          并且能直接切到源码图继续顺着主链阅读。
        </p>
      </section>

      <Section title="阶段推进图" eyebrow="Progressive Map">
        <StageRoadmap modules={learningModules} stages={learningStages} />
      </Section>

      <Section title="如果你只走一条路" eyebrow="Recommended Only Path">
        <div className="route-links">
          <Link href="/learn/architecture">1. 架构</Link>
          <Link href="/learn/tool-call">2. Tool Call</Link>
          <Link href="/learn/prompt">3. Prompt</Link>
          <Link href="/learn/context">4. Context</Link>
          <Link href="/learn/session-storage">5. Session</Link>
          <Link href="/learn/sandbox">6. Sandbox</Link>
        </div>
      </Section>

      <div className="split">
        <Section title="学习图 / 源码图" eyebrow="Dual Mode Map">
          <MapPanels codeFlows={codeFlows.filter(flow => flow.popular)} modules={learningModules} stages={learningStages} />
        </Section>
        <Section title="你在图上该怎么走" eyebrow="Reading Algorithm">
          <PseudoCodeBlock title="recommended study traversal" steps={starterPseudoCode} />
        </Section>
      </div>

      <Section title="主线之外的分支" eyebrow="Branch View">
        <div className="grid">
          <article className="module-card">
            <h3>组件与控制面</h3>
            <p>当你已经理解主运行链，再进入组件区，从界面反推 orchestrator 和 control plane。</p>
            <div className="route-links">
              {componentModules.slice(0, 4).map(module => (
                <Link href={`/components/${module.slug}`} key={module.slug}>
                  {module.title}
                </Link>
              ))}
            </div>
          </article>
          <article className="module-card">
            <h3>源码主链</h3>
            <p>如果你已经会基础概念，直接切源码图，从 Tool、Prompt、Session、Sandbox 四条主链开始。</p>
            <div className="route-links">
              {codeFlows.filter(flow => flow.popular).map(flow => (
                <Link href="/sources" key={flow.id}>
                  {flow.title}
                </Link>
              ))}
            </div>
          </article>
        </div>
      </Section>
    </PageShell>
  )
}
