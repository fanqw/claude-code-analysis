'use client'

import Link from 'next/link'
import { useState } from 'react'
import type { CodeFlow, LearningModule, LearningStage } from '@/content/types'

export function MapPanels({
  modules,
  codeFlows,
  stages,
}: {
  modules: LearningModule[]
  codeFlows: CodeFlow[]
  stages: LearningStage[]
}) {
  const [mode, setMode] = useState<'learning' | 'code'>('learning')

  return (
    <div className="map-panels">
      <div className="pill-row">
        <button className={`mode-tab ${mode === 'learning' ? 'mode-tab-active' : ''}`} onClick={() => setMode('learning')} type="button">
          学习图
        </button>
        <button className={`mode-tab ${mode === 'code' ? 'mode-tab-active' : ''}`} onClick={() => setMode('code')} type="button">
          源码图
        </button>
      </div>
      {mode === 'learning' ? (
        <div className="stage-ladder">
          {stages.map((stage, index) => (
            <article className="stage-ladder-card" key={stage.id}>
              <div className="stage-index">阶段 {index + 1}</div>
              <h3>{stage.title}</h3>
              <p>{stage.outcome}</p>
              <div className="route-links">
                {stage.modules.map(slug => {
                  const module = modules.find(item => item.slug === slug)
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
      ) : (
        <div className="grid">
          {codeFlows.map(flow => (
            <article className="module-card" key={flow.id}>
              <div className="module-meta">
                <span className="meta-chip">{flow.granularity === 'module' ? '模块级' : '函数级'}</span>
              </div>
              <h3>{flow.title}</h3>
              <p>{flow.summary}</p>
              <div className="mindmap-list">
                {flow.nodes.map(node => (
                  <Link href={`/source?path=${encodeURIComponent(node.filePath)}${node.symbol ? `&symbol=${encodeURIComponent(node.symbol)}` : ''}`} key={node.id}>
                    <span>{node.label}</span>
                  </Link>
                ))}
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  )
}
