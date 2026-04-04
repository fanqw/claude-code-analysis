import type { DiagramBlock } from '@/content/types'

export const diagrams: DiagramBlock[] = [
  {
    id: 'architecture-overview',
    title: 'Claude Code 总体架构图',
    summary: '先用系统分层看清 Claude Code 的位置关系，再进入各个机制的细节。',
    nodes: [
      { id: 'entry', label: 'CLI / 入口层', summary: '处理启动参数、快路径和入口分流。' },
      { id: 'ui', label: 'REPL / 交互层', summary: '负责消息工作台、输入编排和控制面。' },
      { id: 'runtime', label: 'Query / Agent Runtime', summary: '统一协调模型、工具、状态和回流。' },
      { id: 'tool', label: 'Tool / Permission', summary: '管理工具协议、审批和执行边界。' },
      { id: 'memory', label: 'Context / Memory / Session', summary: '管理长会话、压缩、记忆和恢复。' },
      { id: 'extension', label: 'MCP / Remote / Multi-Agent', summary: '连接外部能力与复杂协作。' },
    ],
    connections: [
      { from: 'entry', to: 'ui', label: '进入默认 REPL 路径' },
      { from: 'ui', to: 'runtime', label: '提交任务' },
      { from: 'runtime', to: 'tool', label: '需要调用工具时进入' },
      { from: 'runtime', to: 'memory', label: '读取上下文与持久化' },
      { from: 'runtime', to: 'extension', label: '接入扩展能力' },
    ],
  },
  {
    id: 'tool-runtime',
    title: 'Tool Runtime 示意图',
    summary: '工具调用不是直接调函数，而是一条带校验、调度、权限和回流的执行链。',
    nodes: [
      { id: 'assistant', label: 'assistant 输出', summary: '模型生成一个或多个 tool_use。' },
      { id: 'collect', label: 'tool_use 收集', summary: 'query 从消息中提取结构化工具请求。' },
      { id: 'orchestrate', label: '调度分组', summary: '按并发安全和风险等级分批。' },
      { id: 'execute', label: '工具执行', summary: 'schema、validate、permission、call 依次运行。' },
      { id: 'result', label: 'tool_result 回流', summary: '结果作为下一轮用户侧内容回到上下文。' },
    ],
    connections: [
      { from: 'assistant', to: 'collect', label: '解析 tool_use' },
      { from: 'collect', to: 'orchestrate', label: '建立执行批次' },
      { from: 'orchestrate', to: 'execute', label: '逐批执行' },
      { from: 'execute', to: 'result', label: '规范化输出' },
    ],
  },
  {
    id: 'prompt-runtime',
    title: 'Prompt Runtime 示意图',
    summary: 'Prompt 由静态段、动态段和上下文注入组成，而不是单个字符串。',
    nodes: [
      { id: 'system', label: '静态 Prompt 段', summary: '定义长期稳定的系统规则和角色边界。' },
      { id: 'dynamic', label: '动态 Prompt 段', summary: '挂载当前环境、工具、模式和状态。' },
      { id: 'context', label: '上下文注入', summary: '把用户上下文与系统上下文组合进请求。' },
      { id: 'cache', label: 'Section Cache', summary: '用 boundary 保留稳定段的缓存收益。' },
      { id: 'request', label: '最终请求', summary: '组合成模型可消费的完整请求结构。' },
    ],
    connections: [
      { from: 'system', to: 'request', label: '构成主骨架' },
      { from: 'dynamic', to: 'request', label: '补充运行态说明' },
      { from: 'context', to: 'request', label: '拼入用户 / 系统上下文' },
      { from: 'cache', to: 'request', label: '控制缓存策略' },
    ],
  },
  {
    id: 'context-runtime',
    title: 'Context 管理示意图',
    summary: '上下文是一种预算资源，需要分配、压缩和重建。',
    nodes: [
      { id: 'budget', label: '预算分配', summary: '决定上下文和输出可用的 token 空间。' },
      { id: 'history', label: '历史筛选', summary: '保留高价值消息与近期状态。' },
      { id: 'compact', label: 'Auto-Compact', summary: '在接近上限时主动压缩。' },
      { id: 'reinjection', label: '状态重注入', summary: '压缩后补回关键状态与工作上下文。' },
      { id: 'request', label: '稳定请求', summary: '在可用预算内继续运行。' },
    ],
    connections: [
      { from: 'budget', to: 'history', label: '决定保留范围' },
      { from: 'history', to: 'compact', label: '必要时压缩' },
      { from: 'compact', to: 'reinjection', label: '防止关键状态丢失' },
      { from: 'reinjection', to: 'request', label: '重建可运行上下文' },
    ],
  },
  {
    id: 'sandbox-runtime',
    title: 'Sandbox / Permission 示意图',
    summary: '权限和沙箱共同决定工具请求能否以及如何执行。',
    nodes: [
      { id: 'request', label: '工具请求', summary: '包含路径、网络、写入或外部访问意图。' },
      { id: 'classify', label: '风险分类', summary: '按资源和语义判断风险。' },
      { id: 'decision', label: 'Permission 决策', summary: '得到 allow / ask / deny。' },
      { id: 'sandbox', label: 'Sandbox 边界', summary: '把允许后的请求限制在资源边界内。' },
      { id: 'execution', label: '执行结果', summary: '在边界内返回结果或拒绝信息。' },
    ],
    connections: [
      { from: 'request', to: 'classify', label: '识别资源类型' },
      { from: 'classify', to: 'decision', label: '应用规则' },
      { from: 'decision', to: 'sandbox', label: '允许后确定执行环境' },
      { from: 'sandbox', to: 'execution', label: '真正运行' },
    ],
  },
  {
    id: 'session-runtime',
    title: 'Session / Resume 示意图',
    summary: '会话被保存为事件流，并在需要时恢复成可继续工作的运行态。',
    nodes: [
      { id: 'append', label: 'Transcript 追加', summary: '把消息、结果和 metadata 增量写入。' },
      { id: 'metadata', label: 'Metadata 重挂', summary: '补齐 title、mode、agent 等状态信息。' },
      { id: 'sidechain', label: 'Subagent Sidechain', summary: '分离主链和子代理链路。' },
      { id: 'resume', label: 'Resume / Hydrate', summary: '按需从日志恢复出当前会话状态。' },
      { id: 'runtime', label: '继续运行', summary: '恢复后能重新进入工作链。' },
    ],
    connections: [
      { from: 'append', to: 'metadata', label: '增量补状态' },
      { from: 'metadata', to: 'sidechain', label: '区分主链和子链' },
      { from: 'sidechain', to: 'resume', label: '按会话恢复' },
      { from: 'resume', to: 'runtime', label: '回到活跃执行态' },
    ],
  },
  {
    id: 'mcp-runtime',
    title: 'MCP 集成示意图',
    summary: '外部工具要先经过连接、认证和工具池融合，才能成为系统内能力。',
    nodes: [
      { id: 'connect', label: '连接建立', summary: '连接 MCP server 并准备 transport。' },
      { id: 'auth', label: '认证与缓存', summary: '处理 auth、过期和防雪崩缓存。' },
      { id: 'normalize', label: '工具标准化', summary: '统一命名和描述长度。' },
      { id: 'pool', label: '工具池融合', summary: '合并进系统工具池并处理冲突。' },
      { id: 'runtime', label: '进入主运行时', summary: '最终作为可调工具参与调用链。' },
    ],
    connections: [
      { from: 'connect', to: 'auth', label: '建立稳定会话' },
      { from: 'auth', to: 'normalize', label: '通过认证后载入工具' },
      { from: 'normalize', to: 'pool', label: '标准化合并' },
      { from: 'pool', to: 'runtime', label: '进入统一工具池' },
    ],
  },
  {
    id: 'multi-agent-runtime',
    title: 'Multi-Agent 示意图',
    summary: '多 agent 协作包含 agent 分流、通信、权限桥接和任务平面。',
    nodes: [
      { id: 'entry', label: 'Agent 分流入口', summary: '根据任务选择 subagent、coordinator 或 teammate。' },
      { id: 'spawn', label: 'Spawn / Fork', summary: '建立新的 agent 执行上下文。' },
      { id: 'mailbox', label: 'Mailbox / 通知', summary: '传递消息、任务状态和协作信息。' },
      { id: 'bridge', label: '权限桥接', summary: '由 leader 为 teammate 兜底权限。' },
      { id: 'task', label: 'Task Plane', summary: '以任务而不是纯聊天为单位协作。' },
    ],
    connections: [
      { from: 'entry', to: 'spawn', label: '选择执行模式' },
      { from: 'spawn', to: 'mailbox', label: '建立通信' },
      { from: 'mailbox', to: 'bridge', label: '转发权限与状态' },
      { from: 'bridge', to: 'task', label: '维持协作一致性' },
    ],
  },
]

export const diagramsById = Object.fromEntries(
  diagrams.map(diagram => [diagram.id, diagram]),
) as Record<string, DiagramBlock>
