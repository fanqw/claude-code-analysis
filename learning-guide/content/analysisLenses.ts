import type { AnalysisLens } from '@/content/types'

export const analysisLenses: AnalysisLens[] = [
  {
    id: 'architecture-systems-view',
    title: '系统分层视角',
    summary: '先用总分层理解 Claude Code，再决定每个专题该放在哪一层。',
    guidingQuestion: '这个机制处在入口层、交互层、执行内核层还是扩展层？',
    dimension: '架构',
    sourceRefs: [
      { label: 'analysis/01-architecture-overview.md', path: '../analysis/01-architecture-overview.md' },
      { label: 'analysis/10-src-file-tree.md', path: '../analysis/10-src-file-tree.md' },
    ],
    linkedModules: ['architecture', 'tool-call', 'prompt', 'context', 'sandbox', 'mcp'],
    takeaways: [
      '不要把 UI、prompt、tools、session 混成一个“聊天功能”。',
      '源码阅读顺序应从 entry/query 主链开始，再进入子系统。',
    ],
  },
  {
    id: 'tool-runtime-tradeoff',
    title: '工具运行时权衡',
    summary: '分析为什么工具不是函数列表，而是一套调度、校验、权限和回流协议。',
    guidingQuestion: '为什么 Claude Code 宁可复杂，也不把工具调用写成一次函数 dispatch？',
    dimension: '设计权衡',
    sourceRefs: [
      { label: 'analysis/04b-tool-call-implementation.md', path: '../analysis/04b-tool-call-implementation.md' },
      { label: 'analysis/05-differentiators-and-comparison.md', path: '../analysis/05-differentiators-and-comparison.md' },
    ],
    linkedModules: ['tool-call', 'sandbox', 'session-storage'],
    takeaways: [
      '工具真正难的是安全和闭环，不是调用函数本身。',
      '调度与回流是你在自己项目里最容易漏掉的两层。',
    ],
  },
  {
    id: 'prompt-context-discipline',
    title: 'Prompt 与上下文纪律',
    summary: 'Prompt 管理和上下文管理要结合起来看，才能理解长会话为什么还可控。',
    guidingQuestion: 'Prompt 为什么要分段、缓存、覆盖，而不是做成单字符串？',
    dimension: '设计权衡',
    sourceRefs: [
      { label: 'analysis/04g-prompt-management.md', path: '../analysis/04g-prompt-management.md' },
      { label: 'analysis/04f-context-management.md', path: '../analysis/04f-context-management.md' },
      { label: 'analysis/04-agent-memory.md', path: '../analysis/04-agent-memory.md' },
    ],
    linkedModules: ['prompt', 'context', 'agent-memory', 'session-storage'],
    takeaways: [
      'Prompt 和 context 是一个运行时，不是两个独立话题。',
      'boundary、compact、memory 决定长会话是否还能保持方向感。',
    ],
  },
  {
    id: 'security-boundary-model',
    title: '安全边界模型',
    summary: '把权限、沙箱、隐私与数据接触面放在一起看，才能理解真实风险。',
    guidingQuestion: '如果这个 agent 落到你的项目里，最先失控的边界会是哪一层？',
    dimension: '安全',
    sourceRefs: [
      { label: 'analysis/02-security-analysis.md', path: '../analysis/02-security-analysis.md' },
      { label: 'analysis/02-user-data-and-usage.md', path: '../analysis/02-user-data-and-usage.md' },
      { label: 'analysis/03-privacy-avoidance.md', path: '../analysis/03-privacy-avoidance.md' },
      { label: 'analysis/04e-sandbox-implementation.md', path: '../analysis/04e-sandbox-implementation.md' },
    ],
    linkedModules: ['sandbox', 'security', 'tool-call', 'mcp'],
    takeaways: [
      '安全不是单一开关，而是 permission、sandbox、data surface 的叠加。',
      '隐私与沙箱需要一起设计，不然只是局部补丁。',
    ],
  },
  {
    id: 'extension-ecosystem-view',
    title: '扩展生态视角',
    summary: '把 MCP、Skills、多 Agent 放到一个“扩展能力层”里看，而不是各自零散理解。',
    guidingQuestion: 'Claude Code 怎样把外部能力接进来，还不让整体失控？',
    dimension: '架构',
    sourceRefs: [
      { label: 'analysis/04d-mcp-implementation.md', path: '../analysis/04d-mcp-implementation.md' },
      { label: 'analysis/04c-skills-implementation.md', path: '../analysis/04c-skills-implementation.md' },
      { label: 'analysis/04h-multi-agent.md', path: '../analysis/04h-multi-agent.md' },
    ],
    linkedModules: ['mcp', 'skills', 'multi-agent'],
    takeaways: [
      '扩展能力的关键不是“接进来”，而是统一工具池、权限和上下文桥接。',
      '多 Agent 是任务平面，不只是多开几个聊天窗口。',
    ],
  },
  {
    id: 'competitive-product-judgment',
    title: '产品判断与竞品对比',
    summary: '用竞品对比理解 Claude Code 到底在强调什么，以及你应不应该照搬。',
    guidingQuestion: 'Claude Code 的复杂度是必要复杂度，还是可以删掉的历史包袱？',
    dimension: '竞争对比',
    sourceRefs: [
      { label: 'analysis/08-competitive-comparison.md', path: '../analysis/08-competitive-comparison.md' },
      { label: 'analysis/05-differentiators-and-comparison.md', path: '../analysis/05-differentiators-and-comparison.md' },
      { label: 'analysis/08-reference-comparison-sources.md', path: '../analysis/08-reference-comparison-sources.md' },
    ],
    linkedModules: ['competition', 'differentiators', 'tool-call', 'multi-agent'],
    takeaways: [
      '不是所有机制都要原样复刻，先区分本质与实现细节。',
      '对比能帮助你决定自己项目的一期边界。',
    ],
  },
  {
    id: 'hidden-signals-and-observability',
    title: '隐藏信号与产品反馈',
    summary: '从负面关键词、隐藏功能和额外发现里理解产品团队在解决什么隐性问题。',
    guidingQuestion: '哪些细节说明这个系统在高频使用中真正痛过？',
    dimension: '隐藏能力',
    sourceRefs: [
      { label: 'analysis/06-extra-findings.md', path: '../analysis/06-extra-findings.md' },
      { label: 'analysis/06b-negative-keyword-analysis.md', path: '../analysis/06b-negative-keyword-analysis.md' },
      { label: 'analysis/11-hidden-features-and-easter-eggs.md', path: '../analysis/11-hidden-features-and-easter-eggs.md' },
    ],
    linkedModules: ['extra-findings', 'negative-signals', 'hidden-features', 'session-storage'],
    takeaways: [
      '隐藏特性往往暴露真实高频场景，而不是花活。',
      '负面信号是设计优化的证据，不只是吐槽材料。',
    ],
  },
  {
    id: 'component-reading-strategy',
    title: '组件阅读策略',
    summary: '组件分析不是另一本书，而是帮助你从界面层反推运行时。',
    guidingQuestion: '哪些组件是 orchestrator，哪些只是 leaf rendering？',
    dimension: '组件',
    sourceRefs: [
      { label: 'analysis/components/01-component-architecture-overview.md', path: '../analysis/components/01-component-architecture-overview.md' },
      { label: 'analysis/components/05-function-level-core-walkthrough.md', path: '../analysis/components/05-function-level-core-walkthrough.md' },
      { label: 'analysis/components/06-function-level-platform-walkthrough.md', path: '../analysis/components/06-function-level-platform-walkthrough.md' },
    ],
    linkedModules: ['component-architecture', 'functions-core', 'functions-platform'],
    takeaways: [
      '先分控制面和叶子组件，再进函数级细节。',
      '界面组件的职责划分能反映运行时边界设计。',
    ],
  },
  {
    id: 'evidence-index-navigation',
    title: '证据索引与源码导航',
    summary: '学习不是只靠解释，还要能顺着证据回到源码和目录结构。',
    guidingQuestion: '我应该从哪些文件和索引入手，而不是盲读整个 src？',
    dimension: '工程索引',
    sourceRefs: [
      { label: 'analysis/07-code-evidence-index.md', path: '../analysis/07-code-evidence-index.md' },
      { label: 'analysis/10-src-file-tree.md', path: '../analysis/10-src-file-tree.md' },
      { label: 'README.md', path: '../README.md' },
    ],
    linkedModules: ['architecture', 'tool-call', 'prompt', 'context', 'sandbox', 'session-storage', 'mcp'],
    takeaways: [
      '证据索引决定你能否在 3 次点击内回到关键源码。',
      '文件树和证据索引适合在迷路时快速重建方向感。',
    ],
  },
]

export const analysisLensesById = Object.fromEntries(
  analysisLenses.map(lens => [lens.id, lens]),
) as Record<string, AnalysisLens>
