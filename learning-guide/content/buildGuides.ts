import type { BuildGuide } from '@/content/types'

export const buildGuides: BuildGuide[] = [
  {
    slug: 'web-agent-overview',
    title: 'Web Agent 总览',
    summary: '把 Claude Code 的能力拆成适合 Web 项目的最小模块。',
    recommendation: '先做单 agent、可恢复、可控工具执行的版本，再考虑 memory、MCP 和多 agent。',
    modules: [
      { name: 'Chat Orchestrator', responsibility: '负责回合循环、消息状态和模型调用组织。', priority: '必须先做' },
      { name: 'Prompt Builder', responsibility: '统一拼装 system prompt、用户上下文和运行时上下文。', priority: '必须先做' },
      { name: 'Tool Registry', responsibility: '统一管理工具 schema、风险等级和 handler。', priority: '必须先做' },
      { name: 'Permission Layer', responsibility: '对高风险调用做风险分级与审批。', priority: '必须先做' },
      { name: 'Session Store', responsibility: '保存 transcript 与元数据，支持继续会话。', priority: '必须先做' },
      { name: 'Context Manager', responsibility: '在长会话场景下做裁剪和压缩。', priority: '第二阶段' },
      { name: 'Extension Gateway', responsibility: '统一接入外部服务或 MCP 类扩展。', priority: '第二阶段' },
      { name: 'Multi-Agent Runtime', responsibility: '并行 worker 与任务协作。', priority: '暂缓' },
    ],
    checkpoints: [
      '先验证单 agent 能闭环完成：输入 -> 模型 -> 工具 -> 结果回流。',
      '确认权限层能拦截至少一类高风险操作。',
      '确认 session 能恢复最近工作状态。',
    ],
  },
  {
    slug: 'minimum-architecture',
    title: '最小可运行架构',
    summary: '定义一期必须具备的边界与职责。',
    recommendation: '不要为了“像 Claude Code”而过早引入太多运行时分层，先把闭环做稳。',
    modules: [
      { name: '前端工作台', responsibility: '展示消息、工具进度和基本控制入口。', priority: '必须先做' },
      { name: 'API 层', responsibility: '承接模型调用与工具分发。', priority: '必须先做' },
      { name: '日志化会话存储', responsibility: '最低限度支持继续对话。', priority: '必须先做' },
      { name: '摘要或裁剪策略', responsibility: '长会话时防止上下文失控。', priority: '第二阶段' },
    ],
    checkpoints: [
      '每个模块职责不交叉。',
      '工具调用结果能回到消息流中。',
      '前端状态和持久化状态不混写。',
    ],
  },
  {
    slug: 'module-mapping',
    title: 'Claude Code 到 Web 项目的模块映射',
    summary: '把学习内容映射成你自己的工程结构。',
    recommendation: '先做等价职责映射，不做表面功能复制。',
    modules: [
      { name: 'query 主循环 -> Chat Orchestrator', responsibility: '负责统一控制一次任务的运行闭环。', priority: '必须先做' },
      { name: 'Tool 抽象 -> Tool Registry', responsibility: '把工具变成结构化运行对象。', priority: '必须先做' },
      { name: 'sessionStorage -> Session Store', responsibility: '负责恢复与元数据。', priority: '必须先做' },
      { name: 'MCP Client -> Extension Gateway', responsibility: '外部服务接入统一走适配层。', priority: '第二阶段' },
    ],
    checkpoints: [
      '每项映射都能说清“Claude Code 原设计”和“Web 版本简化实现”的差别。',
      '没有把 CLI 特有能力生搬硬套到 Web 项目。',
    ],
  },
  {
    slug: 'roadmap',
    title: '演进路线图',
    summary: '从最小原型逐步增强到更完整系统。',
    recommendation: '每一阶段只引入真正能带来收益的新复杂度。',
    modules: [
      { name: 'Phase 1', responsibility: '单 agent、工具调用、权限、session 恢复。', priority: '必须先做' },
      { name: 'Phase 2', responsibility: 'context 管理、显式 memory、扩展接入。', priority: '第二阶段' },
      { name: 'Phase 3', responsibility: '更复杂权限、长期治理、协作能力。', priority: '第二阶段' },
      { name: 'Phase 4', responsibility: '多 agent、任务平面、企业级扩展。', priority: '暂缓' },
    ],
    checkpoints: [
      '每个阶段都可以单独上线并验证。',
      '复杂能力只在前一阶段稳定后再进入。',
    ],
  },
]

export const buildGuidesBySlug = Object.fromEntries(
  buildGuides.map(guide => [guide.slug, guide]),
) as Record<string, BuildGuide>
