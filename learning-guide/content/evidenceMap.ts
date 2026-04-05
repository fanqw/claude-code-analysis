import type { ArchitectureNode, EvidenceLink } from '@/content/types'

type ModuleEvidence = {
  summary: string
  analysis: EvidenceLink[]
  source: EvidenceLink[]
}

function analysisLink(label: string, path: string, reason: string): EvidenceLink {
  return {
    label,
    targetPath: path,
    targetType: 'analysis',
    reason,
  }
}

function sourceLink(label: string, path: string, reason: string, symbol?: string): EvidenceLink {
  return {
    label,
    targetPath: path,
    targetType: 'source',
    symbol,
    reason,
  }
}

export const moduleEvidenceMap: Record<string, ModuleEvidence> = {
  architecture: {
    summary: '先把 CLI 入口、init、REPL 和 query 主循环连成一条真实启动链。',
    analysis: [
      analysisLink('architecture overview', 'analysis/01-architecture-overview.md', '总览架构分层与启动链。'),
      analysisLink('src file tree', 'analysis/10-src-file-tree.md', '把概念图对回真实目录层级。'),
      analysisLink('code evidence index', 'analysis/07-code-evidence-index.md', '迷路时回到证据索引。'),
    ],
    source: [
      sourceLink('src/entrypoints/cli.tsx', 'src/entrypoints/cli.tsx', 'CLI 快路径与完整主入口。', 'main'),
      sourceLink('src/main.tsx', 'src/main.tsx', '启动总控，组装运行态。', 'main'),
      sourceLink('src/entrypoints/init.ts', 'src/entrypoints/init.ts', '真实初始化过程。', 'init'),
      sourceLink('src/replLauncher.tsx', 'src/replLauncher.tsx', '把 App 与 REPL 真正挂起来。', 'launchRepl'),
      sourceLink('src/query.ts', 'src/query.ts', '用户输入最终进入的统一主循环。', 'query'),
    ],
  },
  'tool-call': {
    summary: '顺着 tool_use 到 tool_result 的真实分发、执行和回流链读代码。',
    analysis: [
      analysisLink('tool call implementation', 'analysis/04b-tool-call-implementation.md', '解释工具运行时为什么是协议而不是一次 dispatch。'),
      analysisLink('differentiators', 'analysis/05-differentiators-and-comparison.md', '从产品判断看工具系统为什么复杂。'),
    ],
    source: [
      sourceLink('src/query.ts', 'src/query.ts', '主循环里识别 tool_use。', 'query'),
      sourceLink('src/services/tools/toolOrchestration.ts', 'src/services/tools/toolOrchestration.ts', '分批与并发策略。', 'runTools'),
      sourceLink('src/services/tools/toolExecution.ts', 'src/services/tools/toolExecution.ts', '真实单工具执行。', 'runToolUse'),
      sourceLink('src/utils/sessionStorage.ts', 'src/utils/sessionStorage.ts', '工具结果进入 transcript 的真实存储层。', 'recordTranscript'),
    ],
  },
  prompt: {
    summary: '把 system prompt、system context、user context 放在一条真实链上看。',
    analysis: [
      analysisLink('prompt management', 'analysis/04g-prompt-management.md', '解释 prompt section、boundary 和覆盖策略。'),
      analysisLink('context management', 'analysis/04f-context-management.md', 'prompt 不离开 context 预算。'),
    ],
    source: [
      sourceLink('src/constants/prompts.ts', 'src/constants/prompts.ts', '真实 system prompt 组装逻辑。', 'getSystemPrompt'),
      sourceLink('src/context.ts', 'src/context.ts', '真实 system context / user context 注入点。', 'getUserContext'),
      sourceLink('src/context.ts', 'src/context.ts', '系统上下文的缓存与构建。', 'getSystemContext'),
    ],
  },
  context: {
    summary: '预算判断、compact 与 compact 后状态重注入是一整条链，不是三个零散点。',
    analysis: [
      analysisLink('context management', 'analysis/04f-context-management.md', '先理解 budget、compact、cache 与 PTL fallback。'),
      analysisLink('agent memory', 'analysis/04-agent-memory.md', '补上长会话中记忆层的解释。'),
    ],
    source: [
      sourceLink('src/query.ts', 'src/query.ts', '在主循环里判断预算并触发 compact。', 'query'),
      sourceLink('src/services/compact/compact.ts', 'src/services/compact/compact.ts', '真实 compact 实现。', 'compactConversation'),
      sourceLink('src/services/compact/postCompactCleanup.ts', 'src/services/compact/postCompactCleanup.ts', 'compact 后补回关键运行状态。', 'runPostCompactCleanup'),
    ],
  },
  'session-storage': {
    summary: '把 transcript 追加、metadata 重挂和 hydrate 放在同一个持久化视角里看。',
    analysis: [
      analysisLink('session storage / resume', 'analysis/04i-session-storage-resume.md', '解释 transcript、metadata 与 resume 的关系。'),
      analysisLink('code evidence index', 'analysis/07-code-evidence-index.md', '回到 session 相关关键文件。'),
    ],
    source: [
      sourceLink('src/utils/sessionStorage.ts', 'src/utils/sessionStorage.ts', '真实 session 存储实现。', 'recordTranscript'),
      sourceLink('src/utils/sessionStorage.ts', 'src/utils/sessionStorage.ts', '把运行态 metadata 重新挂回 transcript。', 'reAppendSessionMetadata'),
      sourceLink('src/utils/sessionStorage.ts', 'src/utils/sessionStorage.ts', '从 transcript / remote session 重建状态。', 'hydrateRemoteSession'),
      sourceLink('src/main.tsx', 'src/main.tsx', 'resume 相关入口整合在主启动流程里。', 'main'),
    ],
  },
  sandbox: {
    summary: 'permission 规则和 sandbox 配置是叠加边界，不是二选一。',
    analysis: [
      analysisLink('sandbox implementation', 'analysis/04e-sandbox-implementation.md', '从分析文档看权限规则与沙箱边界。'),
      analysisLink('security analysis', 'analysis/02-security-analysis.md', '补上更广的安全边界视角。'),
    ],
    source: [
      sourceLink('src/services/tools/toolExecution.ts', 'src/services/tools/toolExecution.ts', '工具执行时进入权限判定。', 'runToolUse'),
      sourceLink('src/utils/permissions/permissions.ts', 'src/utils/permissions/permissions.ts', '真实 permission rule 解析。', 'checkRuleBasedPermissions'),
      sourceLink('src/utils/sandbox/sandbox-adapter.ts', 'src/utils/sandbox/sandbox-adapter.ts', '把规则翻译成真实 sandbox runtime config。', 'convertToSandboxRuntimeConfig'),
      sourceLink('src/components/permissions/BashPermissionRequest/BashPermissionRequest.tsx', 'src/components/permissions/BashPermissionRequest/BashPermissionRequest.tsx', 'UI 端如何呈现审批链路。'),
    ],
  },
  mcp: {
    summary: 'MCP 不是单独的 server 连接，而是认证、连接、工具归并的组合层。',
    analysis: [
      analysisLink('mcp implementation', 'analysis/04d-mcp-implementation.md', '理解连接、认证和工具池归并。'),
      analysisLink('security analysis', 'analysis/02-security-analysis.md', '外部连接要一起看边界问题。'),
    ],
    source: [
      sourceLink('src/services/mcp/client.ts', 'src/services/mcp/client.ts', '真实 MCP client 与连接缓存。', 'ensureConnectedClient'),
      sourceLink('src/services/mcp/auth.ts', 'src/services/mcp/auth.ts', '真实 MCP OAuth 过程。', 'performMCPOAuthFlow'),
      sourceLink('src/tools.ts', 'src/tools.ts', 'MCP 工具如何进入统一工具池。', 'assembleToolPool'),
      sourceLink('src/components/mcp/MCPAgentServerMenu.tsx', 'src/components/mcp/MCPAgentServerMenu.tsx', '控制面如何触发认证和连接。'),
    ],
  },
  skills: {
    summary: 'Skills 是系统化注入知识与工作流的层，不只是 prompt 片段。',
    analysis: [
      analysisLink('skills implementation', 'analysis/04c-skills-implementation.md', '先理解 skill 的组织方式和触发方式。'),
      analysisLink('extra findings', 'analysis/06-extra-findings.md', '补充一些工程细节和落地判断。'),
    ],
    source: [
      sourceLink('src/skills/bundled/index.ts', 'src/skills/bundled/index.ts', 'bundled skills 的真实入口。'),
      sourceLink('src/constants/prompts.ts', 'src/constants/prompts.ts', 'skills 影响 system prompt。', 'getSystemPrompt'),
      sourceLink('src/commands/skills/index.ts', 'src/commands/skills/index.ts', 'CLI 如何暴露 skills 能力。'),
    ],
  },
  'multi-agent': {
    summary: '多 Agent 不是多窗口，而是任务平面、权限桥与协作运行时。',
    analysis: [
      analysisLink('multi-agent', 'analysis/04h-multi-agent.md', '先理解协作任务平面。'),
      analysisLink('differentiators', 'analysis/05-differentiators-and-comparison.md', '把多 Agent 放进产品判断里看。'),
    ],
    source: [
      sourceLink('src/tools/AgentTool/AgentTool.tsx', 'src/tools/AgentTool/AgentTool.tsx', 'AgentTool 是主入口。', 'AgentTool'),
      sourceLink('src/tools/shared/spawnMultiAgent.ts', 'src/tools/shared/spawnMultiAgent.ts', '真实 teammate / worker 创建过程。', 'spawnTeammate'),
      sourceLink('src/utils/swarm/leaderPermissionBridge.ts', 'src/utils/swarm/leaderPermissionBridge.ts', '协作时权限桥接。', 'registerLeaderToolUseConfirmQueue'),
    ],
  },
  security: {
    summary: '安全主题要回到真实数据接触面、隐私设计和沙箱实现三类原文证据。',
    analysis: [
      analysisLink('security analysis', 'analysis/02-security-analysis.md', '总安全面分析。'),
      analysisLink('user data and usage', 'analysis/02-user-data-and-usage.md', '明确数据接触面。'),
      analysisLink('privacy avoidance', 'analysis/03-privacy-avoidance.md', '看隐私回避策略。'),
    ],
    source: [
      sourceLink('src/utils/permissions/permissions.ts', 'src/utils/permissions/permissions.ts', '规则层。', 'checkRuleBasedPermissions'),
      sourceLink('src/utils/sandbox/sandbox-adapter.ts', 'src/utils/sandbox/sandbox-adapter.ts', '执行边界层。', 'convertToSandboxRuntimeConfig'),
      sourceLink('src/components/AutoModeOptInDialog.tsx', 'src/components/AutoModeOptInDialog.tsx', '产品层面对风险的表述。'),
    ],
  },
}

export const architectureNodes: ArchitectureNode[] = [
  {
    id: 'entrypoints',
    label: 'src/entrypoints',
    path: 'src/entrypoints',
    role: '入口层',
    summary: 'CLI 进入后先走 entrypoints，再决定是否进入完整主应用。',
    relatedFlows: ['architecture-main-chain'],
    relatedEvidence: [
      sourceLink('src/entrypoints/cli.tsx', 'src/entrypoints/cli.tsx', 'CLI 真正入口。', 'main'),
      sourceLink('src/entrypoints/init.ts', 'src/entrypoints/init.ts', '初始化与环境准备。', 'init'),
      analysisLink('analysis/01-architecture-overview.md', 'analysis/01-architecture-overview.md', '架构总览原文。'),
    ],
  },
  {
    id: 'runtime-core',
    label: 'src/main.tsx + src/query.ts',
    path: 'src/main.tsx',
    role: '运行时骨架',
    summary: 'main 负责组装，query 负责真正回合循环。',
    relatedFlows: ['architecture-main-chain', 'tool-call-main-chain', 'context-main-chain'],
    relatedEvidence: [
      sourceLink('src/main.tsx', 'src/main.tsx', '主程序装配点。', 'main'),
      sourceLink('src/query.ts', 'src/query.ts', '统一 query 主循环。', 'query'),
      analysisLink('analysis/01-architecture-overview.md', 'analysis/01-architecture-overview.md', '原文中的主链说明。'),
    ],
  },
  {
    id: 'tools-layer',
    label: 'src/services/tools + src/tools.ts',
    path: 'src/services/tools',
    role: '工具层',
    summary: '工具调度、执行和工具池归并都在这里发生。',
    relatedFlows: ['tool-call-main-chain', 'sandbox-main-chain', 'mcp-main-chain'],
    relatedEvidence: [
      sourceLink('src/services/tools/toolOrchestration.ts', 'src/services/tools/toolOrchestration.ts', '工具调度。', 'runTools'),
      sourceLink('src/services/tools/toolExecution.ts', 'src/services/tools/toolExecution.ts', '单工具执行。', 'runToolUse'),
      sourceLink('src/tools.ts', 'src/tools.ts', '统一工具池。', 'assembleToolPool'),
      analysisLink('analysis/04b-tool-call-implementation.md', 'analysis/04b-tool-call-implementation.md', '工具运行时原文分析。'),
    ],
  },
  {
    id: 'context-layer',
    label: 'src/context.ts + src/services/compact',
    path: 'src/services/compact',
    role: '长会话治理层',
    summary: 'system/user context、compact 和 compact 后状态恢复共同维持长会话。',
    relatedFlows: ['prompt-main-chain', 'context-main-chain', 'session-main-chain'],
    relatedEvidence: [
      sourceLink('src/context.ts', 'src/context.ts', '上下文注入点。', 'getUserContext'),
      sourceLink('src/services/compact/compact.ts', 'src/services/compact/compact.ts', '真实 compact 实现。', 'compactConversation'),
      sourceLink('src/services/compact/postCompactCleanup.ts', 'src/services/compact/postCompactCleanup.ts', '状态补回。', 'runPostCompactCleanup'),
      analysisLink('analysis/04f-context-management.md', 'analysis/04f-context-management.md', 'context 原文分析。'),
    ],
  },
  {
    id: 'governance-layer',
    label: 'src/utils/permissions + src/utils/sandbox + src/services/mcp',
    path: 'src/utils/permissions',
    role: '治理与扩展层',
    summary: '权限、沙箱、MCP 都属于系统边界与外部能力接入层。',
    relatedFlows: ['sandbox-main-chain', 'mcp-main-chain'],
    relatedEvidence: [
      sourceLink('src/utils/permissions/permissions.ts', 'src/utils/permissions/permissions.ts', '权限规则。', 'checkRuleBasedPermissions'),
      sourceLink('src/utils/sandbox/sandbox-adapter.ts', 'src/utils/sandbox/sandbox-adapter.ts', '沙箱运行配置。', 'convertToSandboxRuntimeConfig'),
      sourceLink('src/services/mcp/client.ts', 'src/services/mcp/client.ts', 'MCP 连接与资源。', 'ensureConnectedClient'),
      analysisLink('analysis/04e-sandbox-implementation.md', 'analysis/04e-sandbox-implementation.md', 'sandbox 原文分析。'),
      analysisLink('analysis/04d-mcp-implementation.md', 'analysis/04d-mcp-implementation.md', 'MCP 原文分析。'),
    ],
  },
  {
    id: 'ui-layer',
    label: 'src/components',
    path: 'src/components',
    role: '控制面与交互层',
    summary: 'UI 不是装饰层，而是 permission、MCP、message 渲染等控制面的承载层。',
    relatedFlows: ['sandbox-main-chain', 'mcp-main-chain', 'multi-agent-main-chain'],
    relatedEvidence: [
      sourceLink('src/components/App.tsx', 'src/components/App.tsx', 'App 容器入口。'),
      sourceLink('src/components/Messages.tsx', 'src/components/Messages.tsx', '消息和 boundary 的 UI 呈现。'),
      sourceLink('src/components/permissions/BashPermissionRequest/BashPermissionRequest.tsx', 'src/components/permissions/BashPermissionRequest/BashPermissionRequest.tsx', '权限审批 UI。'),
      analysisLink('analysis/components/01-component-architecture-overview.md', 'analysis/components/01-component-architecture-overview.md', '组件分析原文。'),
    ],
  },
]

export const stageEvidenceMap: Record<string, { analysis: string[]; source: string[] }> = {
  'stage-1': {
    analysis: ['analysis/01-architecture-overview.md', 'analysis/04b-tool-call-implementation.md', 'analysis/04g-prompt-management.md'],
    source: ['src/entrypoints/cli.tsx', 'src/main.tsx', 'src/query.ts', 'src/constants/prompts.ts'],
  },
  'stage-2': {
    analysis: ['analysis/04f-context-management.md', 'analysis/04i-session-storage-resume.md', 'analysis/04-agent-memory.md'],
    source: ['src/context.ts', 'src/services/compact/compact.ts', 'src/services/compact/postCompactCleanup.ts', 'src/utils/sessionStorage.ts'],
  },
  'stage-3': {
    analysis: ['analysis/04e-sandbox-implementation.md', 'analysis/04d-mcp-implementation.md', 'analysis/04c-skills-implementation.md'],
    source: ['src/utils/permissions/permissions.ts', 'src/utils/sandbox/sandbox-adapter.ts', 'src/services/mcp/client.ts', 'src/services/mcp/auth.ts'],
  },
  'stage-4': {
    analysis: ['analysis/04h-multi-agent.md', 'analysis/05-differentiators-and-comparison.md', 'analysis/08-competitive-comparison.md'],
    source: ['src/tools/AgentTool/AgentTool.tsx', 'src/tools/shared/spawnMultiAgent.ts', 'src/utils/swarm/leaderPermissionBridge.ts', 'src/components/App.tsx'],
  },
}
