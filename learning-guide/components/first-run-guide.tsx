import Link from 'next/link'
import type { LearningModule } from '@/content/types'

export function FirstRunGuide({
  modules,
}: {
  modules: LearningModule[]
}) {
  const shortNotes: Record<string, string> = {
    architecture: '先知道系统从哪里开始。',
    'tool-call': '再理解工具链怎么接入主循环。',
    prompt: '再看 prompt runtime 如何组装上下文。',
    context: '最后理解长会话如何被治理。',
  }
  const recommended = ['architecture', 'tool-call', 'prompt', 'context']
    .map(slug => modules.find(module => module.slug === slug))
    .filter(Boolean)

  return (
    <div className="entry-guide">
      <article className="entry-guide-main">
        <p className="eyebrow">First Route</p>
        <h3>第一次进入，只走这一条主线</h3>
        <div className="entry-steps">
          {recommended.map((module, index) => (
            <Link className="entry-step" href={`/learn/${module!.slug}`} key={module!.slug}>
              <span className="entry-step-index">0{index + 1}</span>
              <div>
                <strong>{module!.title}</strong>
                <p>{shortNotes[module!.slug] ?? module!.summary}</p>
              </div>
            </Link>
          ))}
        </div>
      </article>

      <aside className="entry-guide-side">
        <p className="eyebrow">Do / Don't</p>
        <h3>先这样学</h3>
        <div className="entry-guidance-grid">
          <div className="entry-guidance entry-guidance-do">
            <strong>先做</strong>
            <p>先顺着章节主线建立入口感，再去核验证据。</p>
          </div>
          <div className="entry-guidance">
            <strong>先不要做</strong>
            <p>不要刚进站就同时打开 analysis、源码和组件区。</p>
          </div>
          <div className="entry-guidance">
            <strong>卡住时</strong>
            <p>先回地图确认阶段，再回章节。</p>
          </div>
        </div>
      </aside>
    </div>
  )
}
