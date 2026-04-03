import Link from 'next/link'
import { PageShell, Section } from '@/components/ui'
import { componentModules, learningModules } from '@/lib/content'

export default function MapPage() {
  const readyModules = learningModules.filter(module => module.status === 'ready')
  const growingModules = learningModules.filter(module => module.status !== 'ready')

  return (
    <PageShell>
      <section className="hero">
        <p className="eyebrow">Learning Map</p>
        <h1>全量知识地图</h1>
        <p>
          先从架构进入，再依次穿过 Tool、Prompt、Context、Session、Memory、Sandbox、MCP、Skills 和
          Multi-Agent，最后回到风险判断、组件体系和自己的项目落地。
        </p>
      </section>

      <Section title="推荐顺序" eyebrow="Path">
        <div className="route-links">
          {learningModules.map(module => (
            <Link href={`/learn/${module.slug}`} key={module.slug}>
              {module.title}
            </Link>
          ))}
        </div>
      </Section>

      <div className="split">
        <Section title="已可完整学习" eyebrow="Ready">
          <div className="route-links">
            {readyModules.map(module => (
              <Link href={`/learn/${module.slug}`} key={module.slug}>
                {module.title}
              </Link>
            ))}
          </div>
        </Section>
        <Section title="正在补强" eyebrow="Seeded / Planned">
          <div className="route-links">
            {growingModules.map(module => (
              <Link href={`/learn/${module.slug}`} key={module.slug}>
                {module.title}
              </Link>
            ))}
          </div>
        </Section>
      </div>

      <Section title="组件分析分支" eyebrow="UI Branch">
        <div className="route-links">
          {componentModules.map(module => (
            <Link href={`/components/${module.slug}`} key={module.slug}>
              {module.title}
            </Link>
          ))}
        </div>
      </Section>

      <Section title="阅读原则" eyebrow="How To Use">
        <table className="table">
          <thead>
            <tr>
              <th>阶段</th>
              <th>你要解决的问题</th>
              <th>建议先看什么</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>建立全局感</td>
              <td>Claude Code 到底是什么系统</td>
              <td>Architecture、Tool Call、Prompt</td>
            </tr>
            <tr>
              <td>进入长会话</td>
              <td>为什么它能持续工作而不崩</td>
              <td>Context、Session Storage、Agent Memory</td>
            </tr>
            <tr>
              <td>进入治理与扩展</td>
              <td>它如何安全地连外部能力并扩展</td>
              <td>Sandbox、MCP、Skills</td>
            </tr>
            <tr>
              <td>进入高级机制</td>
              <td>多 agent 和平台控制面为何复杂</td>
              <td>Multi-Agent、Components、Competition</td>
            </tr>
          </tbody>
        </table>
      </Section>
    </PageShell>
  )
}
