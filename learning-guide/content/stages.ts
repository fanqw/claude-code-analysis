import type { LearningStage } from '@/content/types'

export const learningStages: LearningStage[] = [
  {
    id: 'stage-1',
    title: '先建立系统骨架',
    outcome: '你能说清 Claude Code 由哪几层组成，以及主执行链从哪里开始。',
    modules: ['architecture', 'tool-call', 'prompt'],
    whyNow: '先抓骨架，后面所有机制才知道自己在系统里的位置。',
    nextStage: 'stage-2',
  },
  {
    id: 'stage-2',
    title: '再理解长会话如何不崩',
    outcome: '你能解释为什么它能持续工作、压缩上下文、恢复状态并保留记忆。',
    modules: ['context', 'session-storage', 'agent-memory'],
    whyNow: '如果不知道长会话如何治理，很多机制会看起来像散装技巧。',
    nextStage: 'stage-3',
  },
  {
    id: 'stage-3',
    title: '进入安全和扩展边界',
    outcome: '你能判断工具什么时候要审批、什么时候进沙箱、外部能力如何纳入统一运行时。',
    modules: ['sandbox', 'mcp', 'skills'],
    whyNow: '这是把 agent 变成真实工程系统的关键分水岭。',
    nextStage: 'stage-4',
  },
  {
    id: 'stage-4',
    title: '最后看高级协作与产品判断',
    outcome: '你能判断多 Agent、竞品差异和隐藏特性哪些值得迁移，哪些先不做。',
    modules: ['multi-agent', 'competition', 'hidden-features'],
    whyNow: '高阶能力适合在主链稳定后理解，否则只会增加噪音。',
  },
]

export const starterPseudoCode = [
  'read architecture_overview()',
  'trace query_runtime()',
  'if assistant emits tool_use:',
  '  run tool_orchestration()',
  '  enforce permission_and_sandbox()',
  '  append tool_result_to_transcript()',
  'rebuild prompt_and_context()',
  'repeat until task closes',
]
