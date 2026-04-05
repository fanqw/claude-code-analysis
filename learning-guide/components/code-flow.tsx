import Link from 'next/link'
import type { CodeFlow as CodeFlowType } from '@/content/types'
import { createSourceHref } from '@/lib/sourceLinks'

export function CodeFlowView({
  flow,
}: {
  flow: CodeFlowType
}) {
  return (
    <div className="code-flow-shell">
      <p className="muted">{flow.summary}</p>
      <div className="pill-row">
        <span className="meta-chip">粒度 {flow.granularity === 'module' ? '模块级' : '函数级'}</span>
        <span className="meta-chip">节点 {flow.nodes.length}</span>
      </div>

      <div className="route-links">
        {flow.nodes.map(node => (
          <Link href={createSourceHref(node.filePath, node.symbol)} key={`${flow.id}-${node.id}`}>
            打开 {node.label}
          </Link>
        ))}
      </div>

      <div className="code-flow-list">
        {flow.nodes.map((node, index) => {
          const previous = flow.nodes[index - 1]
          const next = flow.nodes[index + 1]
          return (
            <article className="code-flow-node" key={node.id}>
              <div className="code-flow-step">
                <span className="meta-chip">Step {index + 1}</span>
                <h3>{node.label}</h3>
              </div>
              <p>
                <strong>角色：</strong>
                {node.role}
              </p>
              <p>{node.summary}</p>
              <p>
                <strong>输入：</strong>
                {node.input}
              </p>
              <p>
                <strong>输出：</strong>
                {node.output}
              </p>
              <p>
                <strong>下一跳：</strong>
                {node.next}
              </p>
              <div className="code-flow-meta">
                <span className="meta-chip">{node.filePath}</span>
                {node.symbol ? <span className="meta-chip">{node.symbol}</span> : null}
              </div>
              <div className="route-links">
                <Link href={createSourceHref(node.filePath, node.symbol)}>查看当前步骤源码</Link>
                {previous ? (
                  <Link href={createSourceHref(previous.filePath, previous.symbol)}>
                    上一段：{previous.label}
                  </Link>
                ) : null}
                {next ? (
                  <Link href={createSourceHref(next.filePath, next.symbol)}>
                    下一段：{next.label}
                  </Link>
                ) : null}
              </div>
            </article>
          )
        })}
      </div>
    </div>
  )
}
