import { AnalysisLensGrid, LearningRoadmap, ViewGallery } from '@/components/learning-structure'
import Link from 'next/link'
import { ProgressOverview } from '@/components/progress'
import { PseudoCodeBlock } from '@/components/pseudo-code-block'
import { StageRoadmap } from '@/components/stage-roadmap'
import { StudyFlow } from '@/components/study-flow'
import { ModuleGrid, PageShell, Section, SimpleList } from '@/components/ui'
import { coverageStats } from '@/content/sourceIndex'
import { starterPseudoCode } from '@/content/stages'
import { analysisLenses, buildGuides, componentModules, learningFlows, learningModules, learningStages } from '@/lib/content'

export default function HomePage() {
  return (
    <PageShell>
      <section className="hero hero-deep">
        <div className="hero-grid">
          <div>
            <p className="eyebrow">Product Owner View</p>
            <h1>先学主链，再学权衡，最后映射到你的项目</h1>
            <p>
              这个学习站现在按“阶段推进 + 多维分析 + 源码流转”来组织。你不需要再面对一堆散落概念，
              而是先拿到递进路线、脑内流程和源码入口，再回头理解分析文档里的设计判断。
            </p>
            <div className="route-links">
              <Link href="/map">进入阶段学习图</Link>
              <Link href="/learn/architecture">从架构起步</Link>
              <Link href="/sources">进入源码导航中心</Link>
            </div>
          </div>
          <div className="hero-stats">
            <div className="stat">
              <strong>{coverageStats.learningModules}</strong>
              <p>核心学习模块</p>
            </div>
            <div className="stat">
              <strong>{learningStages.length}</strong>
              <p>递进阶段</p>
            </div>
            <div className="stat">
              <strong>{analysisLenses.length}</strong>
              <p>analysis 学习视角</p>
            </div>
            <div className="stat">
              <strong>{coverageStats.sourceRefs}</strong>
              <p>可回跳源码/文档</p>
            </div>
          </div>
        </div>
      </section>

      <Section title="学习主流程" eyebrow="Start Here">
        <StudyFlow stages={learningStages} />
      </Section>

      <Section title="新手起点" eyebrow="One Path First">
        <div className="split">
          <article className="stage-card">
            <div className="stage-index">Step 1</div>
            <h3>先从架构起步</h3>
            <p>如果你只想用最稳的方式开始，先看架构，再顺着 Tool Call、Prompt、Context 走一遍。</p>
            <div className="route-links">
              <Link href="/learn/architecture">打开架构章节</Link>
              <Link href="/map">查看完整阶段图</Link>
            </div>
          </article>
          <article className="stage-card">
            <div className="stage-index">Step 2</div>
            <h3>之后再切到源码图</h3>
            <p>当你能复述主流程后，再到 `/map` 的源码图和 `/sources` 的主链入口看真实文件。</p>
            <div className="route-links">
              <Link href="/sources">进入源码导航中心</Link>
            </div>
          </article>
        </div>
      </Section>

      <Section title="先建立脑内图像" eyebrow="Mind Map / Flow / Pseudo Code">
        <ViewGallery />
      </Section>

      <div className="split">
        <Section title="为什么这次更容易学" eyebrow="Learning Contract">
          <SimpleList
            items={[
              '每章先看概念图，再看运行流，再切源码模式。',
              '每个核心专题都带 analysis 洞察，不再只剩源码和定义。',
              '学习图按阶段推进，不再把所有模块平铺成一堵墙。',
              '增加伪代码和思维导图式表达，帮助你形成脑内模型。',
            ]}
          />
        </Section>
        <Section title="先跑一遍脑内主链" eyebrow="Pseudo Code">
          <PseudoCodeBlock title="Claude Code mental loop" steps={starterPseudoCode} />
        </Section>
      </div>

      <Section title="四阶段路线图" eyebrow="Stage Roadmap">
        <StageRoadmap modules={learningModules} stages={learningStages} />
      </Section>

      <Section title="按阶段点击进入" eyebrow="Roadmap Cards">
        <LearningRoadmap />
      </Section>

      <div className="split">
        <Section title="多维分析入口" eyebrow="Analysis Views">
          <AnalysisLensGrid />
        </Section>

        <Section title="学习进度" eyebrow="Progress">
          <ProgressOverview totalModules={learningModules.length + componentModules.length} />
        </Section>
      </div>

      <Section title="你接下来该看什么" eyebrow="Next Entry">
        <div className="grid">
          {learningStages.map(stage => (
            <article className="module-card" key={stage.id}>
              <div className="module-meta">
                <span className="pill">{stage.title}</span>
              </div>
              <h3>{stage.outcome}</h3>
              <p>{stage.whyNow}</p>
              <div className="route-links">
                {stage.modules.map(slug => {
                  const module = learningModules.find(item => item.slug === slug)
                  return module ? (
                    <Link href={`/learn/${module.slug}`} key={module.slug}>
                      {module.title}
                    </Link>
                  ) : null
                })}
              </div>
            </article>
          ))}
        </div>
      </Section>

      <div className="split">
        <Section title="组件控制面" eyebrow="UI / Control Plane">
          <ModuleGrid items={componentModules} basePath="/components" />
        </Section>
        <Section title="调用链演示" eyebrow="Interactive Flows">
          <ModuleGrid items={learningFlows} basePath="/flows" />
        </Section>
      </div>

      <Section title="落地到你的项目" eyebrow="Build Your Own">
        <ModuleGrid
          items={buildGuides.map(guide => ({
            ...guide,
            status: 'ready' as const,
          }))}
          basePath="/build"
        />
      </Section>
    </PageShell>
  )
}
