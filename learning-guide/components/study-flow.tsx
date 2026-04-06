import Link from 'next/link'
import type { LearningModule, LearningStage } from '@/content/types'

export function StudyFlow({
  stages,
  modules,
}: {
  stages: LearningStage[]
  modules: LearningModule[]
}) {
  return (
    <div className="study-flow study-flow-tutorial">
      {stages.map((stage, index) => {
        const firstModule = modules.find(module => module.slug === stage.modules[0])
        const stageModules = stage.modules
          .map(slug => modules.find(module => module.slug === slug))
          .filter(Boolean)

        return (
          <article className="flow-node flow-node-detailed" key={stage.id}>
            <div className="flow-node-head">
              <span className="flow-node-index">阶段 {index + 1}</span>
              <span className="meta-chip">推荐先看 {firstModule?.title ?? '当前阶段第一章'}</span>
            </div>
            <h3>{stage.title}</h3>
            <p>{stage.whyNow}</p>
            <div className="flow-node-checkpoint">
              <strong>学完这一段后你应能回答</strong>
              <p>{stage.outcome}</p>
            </div>
            <ol className="flow-node-list">
              {stageModules.map(module => (
                <li key={module!.slug}>
                  <Link href={`/learn/${module!.slug}`}>{module!.title}</Link>
                </li>
              ))}
            </ol>
            {firstModule ? (
              <div className="route-links">
                <Link href={`/learn/${firstModule.slug}`}>进入这一段的第一章</Link>
              </div>
            ) : null}
            {index < stages.length - 1 ? <div className="flow-arrow">继续进入下一阶段</div> : null}
          </article>
        )
      })}
    </div>
  )
}
