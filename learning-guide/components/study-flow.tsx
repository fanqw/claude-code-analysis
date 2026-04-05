import type { LearningStage } from '@/content/types'

export function StudyFlow({
  stages,
}: {
  stages: LearningStage[]
}) {
  return (
    <div className="study-flow study-flow-tutorial">
      {stages.map((stage, index) => (
        <article className="flow-node" key={stage.id}>
          <span className="meta-chip">阶段 {index + 1}</span>
          <h3>{stage.title}</h3>
          <p>{stage.outcome}</p>
          {index < stages.length - 1 ? <div className="flow-arrow">继续向下</div> : null}
        </article>
      ))}
    </div>
  )
}
