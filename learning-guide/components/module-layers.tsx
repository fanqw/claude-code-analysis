'use client'

import { useState } from 'react'
import type { CodeFlow, DiagramBlock, LearningFlow } from '@/content/types'
import { CodeFlowView } from '@/components/code-flow'
import { DiagramBlock as DiagramView } from '@/components/diagram-block'

export function ModuleLayers({
  concept,
  runtimeFlows,
  codeFlows,
}: {
  concept?: DiagramBlock
  runtimeFlows: LearningFlow[]
  codeFlows: CodeFlow[]
}) {
  const [mode, setMode] = useState<'learn' | 'code'>('learn')
  const orderedCodeFlows = mode === 'code' ? codeFlows : []

  return (
    <div className="module-layers">
      <div className="pill-row">
        <button className={`mode-tab ${mode === 'learn' ? 'mode-tab-active' : ''}`} onClick={() => setMode('learn')} type="button">
          学习模式
        </button>
        <button className={`mode-tab ${mode === 'code' ? 'mode-tab-active' : ''}`} onClick={() => setMode('code')} type="button">
          源码模式
        </button>
      </div>

      {mode === 'learn' ? (
        <>
          {concept ? <DiagramView diagram={concept} /> : null}
          {runtimeFlows.map(flow => (
            <div className="flow-stack" key={flow.slug}>
              <p className="muted">{flow.summary}</p>
              {flow.steps.map((step, index) => (
                <article className="flow-step" key={`${flow.slug}-${step.title}`}>
                  <strong>
                    Step {index + 1}. {step.title}
                  </strong>
                  <p>
                    <strong>输入：</strong>
                    {step.input}
                  </p>
                  <p>
                    <strong>输出：</strong>
                    {step.output}
                  </p>
                  <p>
                    <strong>为什么这样设计：</strong>
                    {step.designReason}
                  </p>
                </article>
              ))}
            </div>
          ))}
        </>
      ) : (
        <>
          {orderedCodeFlows.map(flow => (
            <CodeFlowView flow={flow} key={flow.id} />
          ))}
        </>
      )}
    </div>
  )
}
