import Link from 'next/link'
import type { LearningModule, LearningStage } from '@/content/types'

export function StageRoadmap({
  modules,
  stages,
}: {
  modules: LearningModule[]
  stages: LearningStage[]
}) {
  return (
    <div className="stage-roadmap">
      {stages.map((stage, index) => {
        const stageModules = stage.modules
          .map(slug => modules.find(module => module.slug === slug))
          .filter(Boolean)
        const firstModule = stageModules[0]

        return (
          <article className="stage-card" key={stage.id}>
            <div className="stage-card-head">
              <div className="stage-index">Stage {index + 1}</div>
              <span className="meta-chip">{firstModule ? `入口章节：${firstModule.title}` : '入口待补充'}</span>
            </div>
            <h3>{stage.title}</h3>
            <p>{stage.whyNow}</p>
            <div className="stage-checkpoint">
              <strong>学完这阶段后你能回答</strong>
              <p>{stage.outcome}</p>
            </div>
            <ol className="stage-module-list">
              {stageModules.map((module, moduleIndex) => (
                <li className={moduleIndex === 0 ? 'stage-module-primary' : ''} key={module!.slug}>
                  <Link href={`/learn/${module!.slug}`}>{module!.title}</Link>
                </li>
              ))}
            </ol>
            {firstModule ? (
              <div className="route-links">
                <Link href={`/learn/${firstModule.slug}`}>现在就去这阶段的第一章</Link>
              </div>
            ) : null}
            {stage.nextStage ? <p className="muted">完成这一段后，再进入下一阶段。</p> : null}
          </article>
        )
      })}
    </div>
  )
}
