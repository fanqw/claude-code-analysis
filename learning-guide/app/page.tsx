import Link from 'next/link'
import { ProgressOverview } from '@/components/progress'
import { Section, ModuleGrid, PageShell, SimpleList } from '@/components/ui'
import { buildGuides, componentModules, learningFlows, learningModules } from '@/lib/content'
import { coverageStats } from '@/content/sourceIndex'
import { getModulesByStatus, getRecommendedPath } from '@/lib/content'

export default function HomePage() {
  const status = getModulesByStatus()
  const recommended = getRecommendedPath()
    .map(slug => learningModules.find(module => module.slug === slug))
    .filter(Boolean)

  return (
    <PageShell>
      <section className="hero">
        <div className="hero-grid">
          <div>
            <p className="eyebrow">Full Coverage Learning Project</p>
            <h1>把 Claude Code 学成一张可落地的工程地图</h1>
            <p>
              这个学习站不是资料堆叠，而是把当前仓库里的源码分析重组成一条真正可学会的路径：
              先看架构，再拆 Tool / Prompt / Context / Session / MCP / Sandbox / Multi-Agent，
              最后映射到你自己的 Web 项目。
            </p>
          </div>
          <div className="hero-stats">
            <div className="stat">
              <strong>{coverageStats.learningModules}</strong>
              <p>主学习模块</p>
            </div>
            <div className="stat">
              <strong>{coverageStats.componentModules}</strong>
              <p>组件分析模块</p>
            </div>
            <div className="stat">
              <strong>{coverageStats.flows}</strong>
              <p>调用链演示</p>
            </div>
            <div className="stat">
              <strong>{coverageStats.sourceRefs}</strong>
              <p>源码 / 文档引用</p>
            </div>
          </div>
        </div>
      </section>

      <div className="split">
        <Section title="覆盖状态" eyebrow="Coverage Status">
          <div className="pill-row">
            <span className="pill">ready: {status.ready}</span>
            <span className="pill">seeded: {status.seeded}</span>
            <span className="pill">planned: {status.planned}</span>
          </div>
          <p className="muted">
            当前版本已经把全量知识框架铺出来，核心模块优先做到可学，非核心模块保留入口并逐步补齐。
          </p>
        </Section>
        <Section title="推荐路径" eyebrow="Recommended Path">
          <SimpleList items={recommended.map(module => `${module?.title} · ${module?.estimatedMinutes} 分钟`)} />
        </Section>
      </div>

      <div className="split">
        <Section title="完成度快照" eyebrow="Completion Snapshot">
          <SimpleList
            items={[
              `主学习模块已完成 ${coverageStats.readyLearningModules}/${coverageStats.learningModules}`,
              `组件分析模块已完成 ${coverageStats.readyComponentModules}/${coverageStats.componentModules}`,
              `调用链演示 ${coverageStats.flows} 条`,
              `落地指南 ${coverageStats.buildGuides} 组`,
            ]}
          />
        </Section>
        <Section title="当前重点" eyebrow="Current Focus">
          <SimpleList
            items={[
              '保持全量入口完整',
              '优先把 seeded 模块提升为 ready',
              '让复习与答题形成闭环',
              '确保每次开发后都可构建、可访问、可验证',
            ]}
          />
        </Section>
      </div>

      <Section title="学习进度" eyebrow="Progress">
        <ProgressOverview totalModules={learningModules.length + componentModules.length} />
      </Section>

      <Section title="主学习模块" eyebrow="Core Curriculum" actions={<Link href="/map">打开学习地图</Link>}>
        <ModuleGrid items={learningModules} basePath="/learn" />
      </Section>

      <div className="split">
        <Section title="组件分析区" eyebrow="UI / Control Plane">
          <ModuleGrid items={componentModules} basePath="/components" />
        </Section>
        <Section title="调用链演示" eyebrow="Interactive Flows">
          <ModuleGrid items={learningFlows} basePath="/flows" />
        </Section>
      </div>

      <Section title="你的项目怎么做" eyebrow="Build Your Own">
        <ModuleGrid
          items={buildGuides.map(guide => ({
            ...guide,
            status: 'ready' as const,
          }))}
          basePath="/build"
        />
      </Section>

      <Section title="这一版已经具备什么" eyebrow="Current Prototype">
        <div className="two-col-list">
          <SimpleList
            items={[
              '全量章节入口',
              '核心机制模块内容',
              '学习地图和推荐顺序',
              '调用链演示页',
            ]}
          />
          <SimpleList
            items={[
              'Web 项目落地映射',
              '术语页和来源索引',
              '组件区占位与扩展位',
              '可持续补章的内容模型',
            ]}
          />
        </div>
      </Section>
    </PageShell>
  )
}
