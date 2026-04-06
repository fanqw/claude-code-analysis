'use client'

import { useState } from 'react'
import type { CodeFlow, DiagramBlock, LearningFlow } from '@/content/types'
import { CodeFlowView } from '@/components/code-flow'
import { DiagramBlock as DiagramView } from '@/components/diagram-block'
import { ExcalidrawFlow } from '@/components/excalidraw-flow'

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
      <div className="module-layers-intro">
        <p className="muted">第一次阅读先看概念图和运行流。只有需要回到真实文件核验时，再切到源码模式。</p>
      </div>
      <div className="pill-row">
        <button className={`mode-tab ${mode === 'learn' ? 'mode-tab-active' : ''}`} onClick={() => setMode('learn')} type="button">
          教程模式
        </button>
        <button className={`mode-tab ${mode === 'code' ? 'mode-tab-active' : ''}`} onClick={() => setMode('code')} type="button">
          核验模式
        </button>
      </div>

      {mode === 'learn' ? (
        <>
          {concept ? <DiagramView diagram={concept} /> : null}
          {runtimeFlows.map(flow => (
            <div className="flow-stack" key={flow.slug}>
              <ExcalidrawFlow
                eyebrow="Runtime Flow"
                title={flow.title}
                summary={flow.summary}
                nodes={flow.steps.map(step => ({
                  title: step.title,
                  note: `${step.input} -> ${step.output}`,
                }))}
              />
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
