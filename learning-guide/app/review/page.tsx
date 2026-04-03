import { ProgressOverview } from '@/components/progress'
import { ReviewDashboard } from '@/components/review-dashboard'
import { PageShell, Section, SimpleList } from '@/components/ui'
import { componentModules, learningModules } from '@/lib/content'

export default function ReviewPage() {
  return (
    <PageShell>
      <section className="hero">
        <p className="eyebrow">Review</p>
        <h1>复习策略</h1>
        <p>
          当前版本已经接入本地学习进度、答题结果和复习仪表盘。这里的目标不是重复章节目录，而是帮你快速发现哪些模块还没开始、哪些题目答错过、哪些知识已经掌握。
        </p>
      </section>

      <Section title="当前进度" eyebrow="Progress Snapshot">
        <ProgressOverview totalModules={learningModules.length + componentModules.length} />
      </Section>

      <Section title="复习仪表盘" eyebrow="Dashboard">
        <ReviewDashboard modules={learningModules} />
      </Section>

      <div className="split">
        <Section title="先复习什么" eyebrow="Priority">
          <SimpleList
            items={[
              '如果你说不清主分层，先回 Architecture。',
              '如果你说不清工具如何进入回合闭环，先回 Tool Call。',
              '如果你说不清长会话为何可持续，先回 Context 与 Session Storage。',
              '如果你说不清外部扩展为何安全，先回 Sandbox 与 MCP。',
            ]}
          />
        </Section>
        <Section title="后续会加入什么" eyebrow="Roadmap">
          <SimpleList
            items={[
              '更细的错题回顾页',
              '按知识域聚合的薄弱点推荐',
              '章节完成度标签',
              '从复习页直接跳转到相关调用链',
            ]}
          />
        </Section>
      </div>
    </PageShell>
  )
}
