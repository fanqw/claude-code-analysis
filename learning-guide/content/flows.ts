import type { LearningFlow } from '@/content/types'

export const learningFlows: LearningFlow[] = [
  {
    slug: 'runtime-overview',
    title: '用户输入进入系统',
    status: 'ready',
    summary: '从 CLI / REPL 输入到 query 主循环的总体运行链。',
    scenario: '用户在 REPL 中输入一个任务，希望系统理解请求、组织上下文并进入执行内核。',
    steps: [
      {
        title: '入口接收输入',
        input: '用户文本或命令',
        output: '标准化输入事件',
        designReason: '先把不同来源的输入统一成可处理的消息对象。',
      },
      {
        title: 'Prompt 与上下文组装',
        input: '用户输入 + system prompt + session 上下文',
        output: '可发送给模型的完整请求',
        designReason: '模型看到的不是原始输入，而是运行时拼装后的上下文。',
      },
      {
        title: 'query 主循环启动',
        input: '模型输出',
        output: '普通回答或 tool_use 请求',
        designReason: 'query 是把模型、工具、状态回流串在一起的核心循环。',
      },
    ],
    relatedModules: ['architecture', 'prompt', 'tool-call'],
    sourceRefs: [
      { label: 'analysis/01-architecture-overview.md', path: '../analysis/01-architecture-overview.md' },
      { label: 'src/query.ts', path: '../src/query.ts' },
    ],
  },
  {
    slug: 'tool-call',
    title: 'tool_use 到 tool_result',
    status: 'ready',
    summary: '理解模型工具调用如何进入编排、执行、权限和结果回流。',
    scenario: '模型决定调用工具来继续完成任务。',
    steps: [
      {
        title: '收集 tool_use',
        input: 'assistant message 中的 tool_use blocks',
        output: '待执行工具列表',
        designReason: '先从模型输出中提取出结构化工具请求。',
      },
      {
        title: '分批调度',
        input: '工具列表与工具属性',
        output: '按并发安全性分组后的执行批次',
        designReason: '避免把高风险工具与可并发工具混跑。',
      },
      {
        title: '逐个执行',
        input: '单个 tool_use',
        output: 'tool_result 或拒绝结果',
        designReason: '执行前需要经过 schema、validateInput、hook 和 permission。',
      },
      {
        title: '结果回流',
        input: 'tool_result',
        output: '下一轮模型可见的 user-side 结果块',
        designReason: '让工具执行真正进入 agent 推理闭环。',
      },
    ],
    relatedModules: ['tool-call', 'sandbox', 'session-storage'],
    sourceRefs: [
      { label: 'analysis/04b-tool-call-implementation.md', path: '../analysis/04b-tool-call-implementation.md' },
      { label: 'src/services/tools/toolExecution.ts', path: '../src/services/tools/toolExecution.ts' },
    ],
  },
  {
    slug: 'permissions-and-sandbox',
    title: '权限与沙箱如何生效',
    status: 'seeded',
    summary: '从工具请求进入风险判断、权限决策到沙箱执行的链路。',
    scenario: '一个带副作用的工具请求需要安全边界。',
    steps: [
      {
        title: '风险识别',
        input: '工具类型、路径、网络意图',
        output: 'permission 判断上下文',
        designReason: '不同资源类型需要不同策略。',
      },
      {
        title: '规则解释',
        input: '用户设置与工具语义',
        output: '具体 allow / ask / deny 与 sandbox 配置',
        designReason: '配置不是直接拿来用，而是要翻译成执行规则。',
      },
      {
        title: '受限执行',
        input: '允许后的工具请求',
        output: '在允许边界内完成执行',
        designReason: '把 permission 和 sandbox 串成真正的执行防线。',
      },
    ],
    relatedModules: ['sandbox', 'security'],
    sourceRefs: [{ label: 'analysis/04e-sandbox-implementation.md', path: '../analysis/04e-sandbox-implementation.md' }],
  },
  {
    slug: 'session-resume',
    title: 'Session 落盘与恢复',
    status: 'seeded',
    summary: '会话日志如何持续保存，以及 resume 时如何重建状态。',
    scenario: '一次长会话被中断后，需要继续工作。',
    steps: [
      {
        title: '增量写入 transcript',
        input: '消息、工具结果、metadata',
        output: 'append-only transcript',
        designReason: '日志化比快照重写更利于恢复与审计。',
      },
      {
        title: '恢复会话链',
        input: 'session transcript',
        output: '可重建的消息链与 metadata',
        designReason: 'resume 不是只读聊天记录，还要恢复运行态。',
      },
    ],
    relatedModules: ['session-storage', 'context'],
    sourceRefs: [{ label: 'analysis/04i-session-storage-resume.md', path: '../analysis/04i-session-storage-resume.md' }],
  },
  {
    slug: 'multi-agent',
    title: 'Multi-Agent 协作流',
    status: 'seeded',
    summary: '理解 agent 分流、通信和权限桥接。',
    scenario: '主线程需要把任务分配给子 agent 或 teammate。',
    steps: [
      {
        title: 'Agent 分流',
        input: '任务与 agent 类型',
        output: 'subagent / coordinator / teammate',
        designReason: '不同协作模型适用于不同任务组织方式。',
      },
      {
        title: '通信与任务协作',
        input: '子任务状态与消息',
        output: 'mailbox / task notification',
        designReason: '多 agent 需要任务平面，而不是只有聊天记录。',
      },
    ],
    relatedModules: ['multi-agent', 'session-storage'],
    sourceRefs: [{ label: 'analysis/04h-multi-agent.md', path: '../analysis/04h-multi-agent.md' }],
  },
]

export const flowsBySlug = Object.fromEntries(
  learningFlows.map(flow => [flow.slug, flow]),
) as Record<string, LearningFlow>
