import { ViewGallery } from '@/components/learning-structure'
import Link from 'next/link'
import { PseudoCodeBlock } from '@/components/pseudo-code-block'
import { StudyFlow } from '@/components/study-flow'
import { PageShell, Section } from '@/components/ui'
import { starterPseudoCode } from '@/content/stages'
import { learningStages } from '@/lib/content'

export default function HomePage() {
  return (
    <PageShell>
      <section className="hero hero-deep">
        <div className="hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">先从主线开始</p>
            <h1>先读教程主线，再回源码核验</h1>
            <p>
              首页只做一件事：把你送进第一条推荐路径。先从架构起步，建立系统骨架和运行主链。等你知道每一章在解释什么，再回到源码和
              analysis 原文做核验。
            </p>
            <div className="route-links">
              <Link href="/learn/architecture">现在开始：从架构起步</Link>
            </div>
            <div className="route-links route-links-subtle">
              <Link href="/map">先看阶段图</Link>
            </div>
          </div>
          <div className="story-panel story-panel-large hero-guide-panel">
            <p className="eyebrow">首页只回答一个问题</p>
            <h3>第一次进入先点哪里</h3>
            <div className="source-list">
              <span className="source-list-item">1. 先读架构，知道系统从哪里开始运行。</span>
              <span className="source-list-item">2. 再回学习地图，确认下一章该读什么。</span>
              <span className="source-list-item">3. 最后回核验区，对照真实源码和 analysis 原文。</span>
            </div>
            <div className="route-links">
              <Link href="/learn/architecture">进入第一章</Link>
            </div>
          </div>
        </div>
      </section>

      <Section title="主线流程" eyebrow="先按这个顺序走">
        <StudyFlow stages={learningStages} />
      </Section>

      <Section title="你现在只要做这一条主线" eyebrow="不要同时打开太多入口">
        <article className="stage-card">
          <div className="stage-index">唯一主线</div>
          <h3>Architecture → Tool Call → Prompt → Context → Session → Sandbox</h3>
          <p>第一次进入时只看这 6 章。先建立入口、主循环、长会话和安全边界，再回到真实证据核对关键判断。</p>
          <div className="route-links">
            <Link href="/learn/architecture">进入第一章</Link>
            <Link href="/map">看阶段推进图</Link>
          </div>
        </article>
      </Section>

      <div className="split">
        <Section title="先建立脑内图像" eyebrow="辅助理解">
          <ViewGallery />
        </Section>
        <Section title="再跑一遍主循环" eyebrow="辅助理解">
          <PseudoCodeBlock title="Claude Code mental loop" steps={starterPseudoCode} />
        </Section>
      </div>

      <Section title="读完主线后再做什么" eyebrow="证据核验不再抢主路径">
        <div className="grid">
          <article className="module-card">
            <div className="module-meta">
              <span className="meta-chip">verify</span>
            </div>
            <h3>先学，再核验</h3>
            <p>真实 analysis 原文和真实源码仍然保留，但应该在你已经理解章节结论之后再进入。</p>
          </article>
          <Link className="module-card" href="/glossary">
            <div className="module-meta">
              <span className="meta-chip">support</span>
            </div>
            <h3>先查术语，再回主线</h3>
            <p>如果你卡在术语理解，不要先跳证据中心，先用术语表解决名词负担。</p>
          </Link>
          <Link className="module-card" href="/map">
            <div className="module-meta">
              <span className="meta-chip">next</span>
            </div>
            <h3>回到阶段图继续走主线</h3>
            <p>如果你刚读完第一章，下一步应该回到阶段图确认后续章节顺序。</p>
          </Link>
        </div>
      </Section>

      <details className="details-panel">
        <summary>学完主线后还能往哪里扩展</summary>
        <div className="details-body">
          <div className="grid">
            <article className="module-card">
              <div className="module-meta">
                <span className="meta-chip">analysis</span>
              </div>
              <h3>再补多维分析视角</h3>
              <p>主线走通后，再按系统主干、治理、安全、竞品和隐藏能力这些视角补齐整体判断。</p>
            </article>
            <article className="module-card">
              <div className="module-meta">
                <span className="meta-chip">ui</span>
              </div>
              <h3>组件与控制面</h3>
              <p>如果你想从界面反推 orchestrator 和 control plane，再进入组件区，不要放到第一跳。</p>
              <div className="route-links">
                <Link href="/components/core-interaction">从核心交互组件开始</Link>
              </div>
            </article>
            <article className="module-card">
              <div className="module-meta">
                <span className="meta-chip">apply</span>
              </div>
              <h3>映射到你自己的项目</h3>
              <p>当你已经理解主链和证据，再去看如何迁移到自己的 Web Agent 项目，避免过早抽象。</p>
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
