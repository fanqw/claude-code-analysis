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

        return (
          <article className="stage-card" key={stage.id}>
            <div className="stage-index">Stage {index + 1}</div>
            <h3>{stage.title}</h3>
            <p>{stage.outcome}</p>
            <div className="flow-step">
              <strong>为什么先学这一段</strong>
              <p>{stage.whyNow}</p>
            </div>
            <div className="mindmap-list">
              {stageModules.map(module => (
                <Link href={`/learn/${module!.slug}`} key={module!.slug}>
                  <span>{module!.title}</span>
                </Link>
              ))}
            </div>
            {stage.nextStage ? <p className="muted">完成后进入下一阶段，继续主线学习。</p> : null}
          </article>
        )
      })}
    </div>
  )
}
