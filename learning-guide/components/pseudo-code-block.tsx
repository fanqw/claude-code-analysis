function getLineComment(step: string) {
  if (step.includes('read architecture_overview')) return '先读系统骨架，知道入口和主分层。'
  if (step.includes('trace query_runtime')) return '顺着主循环看系统真正如何接任务。'
  if (step.includes('assistant emits tool_use')) return '模型一旦请求工具，就会进入工具编排链。'
  if (step.includes('run tool_orchestration')) return '统一调度工具协议、参数和执行顺序。'
  if (step.includes('permission_and_sandbox')) return '在真正执行前检查权限和沙箱边界。'
  if (step.includes('tool_result_to_transcript')) return '把执行结果回写到 transcript，供下一轮推理使用。'
  if (step.includes('prompt_and_context')) return '重新拼装 prompt 和上下文，保持长会话连续性。'
  if (step.includes('repeat until task closes')) return '直到任务收口前，主循环会持续回转。'
  if (step.includes('parse cli args')) return '先解析启动参数，决定入口路径。'
  if (step.includes('setup runtime')) return '初始化运行环境与核心依赖。'
  if (step.includes('mount repl')) return '挂载交互工作台或无界面执行入口。'
  if (step.includes('enter query loop')) return '进入统一的 query 主循环。'
  if (step.includes('delegate to tools')) return '把工具、上下文、持久化和扩展能力接到主循环上。'
  if (step.includes('if ')) return '这是分支判断，决定后续流向。'
  return '把这一行当成当前阶段的关键动作。'
}

function renderToken(step: string) {
  const trimmed = step.trim()
  const leadingSpaces = step.match(/^\s+/)?.[0] ?? ''
  const keywords = ['if', 'run', 'read', 'trace', 'append', 'rebuild', 'repeat', 'parse', 'setup', 'mount', 'enter', 'delegate', 'enforce']
  const firstKeyword = keywords.find(keyword => trimmed.startsWith(`${keyword} `) || trimmed.startsWith(`${keyword}(`) || trimmed === keyword || trimmed.startsWith(`${keyword}:`))

  if (!firstKeyword) {
    return <>{step}</>
  }

  const offset = step.indexOf(firstKeyword)
  const before = step.slice(0, offset)
  const after = step.slice(offset + firstKeyword.length)

  return (
    <>
      {before || leadingSpaces}
      <span className="token-keyword">{firstKeyword}</span>
      <span className="token-atom">{after}</span>
    </>
  )
}

export function PseudoCodeBlock({
  title,
  steps,
}: {
  title: string
  steps: string[]
}) {
  if (!steps.length) {
    return null
  }

  return (
    <div className="pseudo-shell">
      <div className="pseudo-head">
        <span className="meta-chip">Pseudo Code</span>
        <strong>{title}</strong>
      </div>
      <pre className="pseudo-pre">
        {steps.map((step, index) => (
          <div className="pseudo-line" key={`${title}-${index + 1}`}>
            <span className="source-line-number">{index + 1}</span>
            <code>{renderToken(step)}</code>
            <span className="pseudo-comment"># {getLineComment(step)}</span>
          </div>
        ))}
      </pre>
    </div>
  )
}
