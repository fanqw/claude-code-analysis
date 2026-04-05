import type { LearningModule } from '@/content/types'

export const learningModules: LearningModule[] = [
  {
    slug: 'architecture',
    title: '软件架构与程序入口',
    category: 'global',
    status: 'ready',
    difficulty: '基础',
    estimatedMinutes: 25,
    summary: '先建立 Claude Code 的系统骨架，知道它为什么是本地 agent runtime，而不只是命令行聊天工具。',
    goal: '学完后你能画出 Claude Code 的主分层，并解释入口、初始化、REPL、执行内核、工具和扩展分别挂在哪一层。',
    plainExplanation:
      'Claude Code 表面上像一个 CLI，内部其实是一套本地 agent runtime。先把系统骨架和主执行链看清，后面的 Tool、Prompt、Context、Memory 才不会像零散技巧。',
    whyItMatters: [
      '它决定你后面看到的每个机制挂在哪一层。',
      '它解释了为什么 Claude Code 能同时支持 CLI、REPL、远程模式和多 Agent。',
      '它能直接映射到你自己的 Agent 项目分层。',
    ],
    keyPoints: [
      {
        title: '六层分层模型',
        summary: 'CLI 引导层、初始化层、交互层、执行内核、Tool/Permission、Memory/Persist、扩展层共同组成主框架。',
      },
      {
        title: '多入口但统一执行内核',
        summary: '不同入口最终都汇入 query / agent runtime，而不是各写一套逻辑。',
      },
      {
        title: 'REPL 只是工作台，不是系统本体',
        summary: '真正的关键是 query 主循环和与工具、上下文、持久化的耦合方式。',
      },
    ],
    sourceRefs: [
      { label: 'analysis/01-architecture-overview.md', path: '../analysis/01-architecture-overview.md' },
      { label: 'README.md', path: '../README.md', note: '用于整体章节索引' },
    ],
    prerequisites: [],
    related: ['tool-call', 'prompt', 'session-storage'],
    conceptDiagramId: 'architecture-overview',
    runtimeFlowIds: ['runtime-overview'],
    codeFlowIds: ['architecture-main-chain'],
    analysisLensIds: ['architecture-systems-view', 'evidence-index-navigation'],
    mindset: [
      '先把它当成 agent runtime 看，而不是 CLI 工具。',
      '先找主链 query，再看各子系统如何挂上去。',
    ],
    pseudoCode: [
      'parse cli args',
      'setup runtime + environment',
      'mount repl or headless runner',
      'enter query loop',
      'delegate to tools / context / session / extensions',
    ],
    projectMappings: [
      {
        targetLayer: 'Web Agent 总体架构',
        minimumImplementation: '拆出 chat orchestrator、prompt builder、tool registry、session store 四层，不要把页面、模型调用、工具执行写在一起。',
        advancedImplementation: '把权限层、扩展网关、上下文管理器独立成子系统。',
        whenToDelay: '如果你还没有多入口需求，不要一开始就做 remote / SDK / bridge。',
      },
    ],
    quiz: [
      {
        id: 'positioning',
        prompt: 'Claude Code 最核心的系统定位是什么？',
        options: [
          '本地 agent 平台',
          '单纯命令行聊天工具',
          '只做代码补全的编辑器插件',
        ],
        answer: '本地 agent 平台',
        explanation: '这个定位决定了它必须有执行内核、权限、持久化和扩展层，而不只是 UI。',
      },
      {
        id: 'why-architecture-first',
        prompt: '为什么要先学架构再学 Tool / Prompt？',
        options: [
          '因为先知道这些能力挂在哪一层，后面才不会把实现细节混成一团。',
          '因为架构章节最短，先看最省时间。',
          '因为 Tool 和 Prompt 不重要。',
        ],
        answer: '因为先知道这些能力挂在哪一层，后面才不会把实现细节混成一团。',
        explanation: '架构层提供理解坐标系，是所有后续章节的先修知识。',
      },
    ],
  },
  {
    slug: 'tool-call',
    title: 'Tool Call 机制',
    category: 'core',
    status: 'ready',
    difficulty: '基础',
    estimatedMinutes: 35,
    summary: '理解 tool_use 从模型输出到真实执行，再把结果送回下一轮推理的完整链路。',
    goal: '学完后你能复述 Tool 抽象、工具池组装、调度分批、权限校验和结果回流这条主链。',
    plainExplanation:
      'Claude Code 不是让模型直接调函数，而是把工具调用拆成一条可校验、可调度、可审计、可回流的运行链。真正重要的不是函数本身，而是围绕它的一整套运行时约束。',
    whyItMatters: [
      '它是 Claude Code 作为 agent 的核心执行能力。',
      '它决定你的项目是否需要工具 schema、权限、调度和结果规范化。',
      '它把 prompt、permission、session storage 串成了一条完整主链。',
    ],
    keyPoints: [
      {
        title: 'Tool 是运行时协议对象',
        summary: '一个 Tool 不只有 call，还包括 schema、权限、只读属性、并发安全和 UI 表现。',
      },
      {
        title: '调度默认保守',
        summary: '并发不是默认开启，工具需要显式声明 concurrency safe 才能并行。',
      },
      {
        title: 'tool_result 会回到 transcript',
        summary: '执行结果不是旁路日志，而是下一轮模型上下文的一部分。',
      },
    ],
    sourceRefs: [
      { label: 'analysis/04b-tool-call-implementation.md', path: '../analysis/04b-tool-call-implementation.md' },
      { label: 'src/services/tools/toolOrchestration.ts', path: '../src/services/tools/toolOrchestration.ts' },
      { label: 'src/query.ts', path: '../src/query.ts' },
    ],
    prerequisites: ['architecture'],
    related: ['prompt', 'sandbox', 'session-storage'],
    conceptDiagramId: 'tool-runtime',
    runtimeFlowIds: ['tool-call'],
    codeFlowIds: ['tool-call-main-chain'],
    analysisLensIds: ['tool-runtime-tradeoff', 'security-boundary-model', 'evidence-index-navigation'],
    mindset: [
      '不要把 Tool 学成“函数注册表”，要学成带治理的运行时协议。',
      '每读一步都问自己：输入从哪来，结果回到哪里。',
    ],
    pseudoCode: [
      'assistant_message -> collect tool_use blocks',
      'group requests by concurrency/risk',
      'for each tool_use:',
      '  validate input + permission + hooks',
      '  execute tool and normalize result',
      'append tool_result to transcript',
    ],
    projectMappings: [
      {
        targetLayer: 'Tool Registry',
        minimumImplementation: '为每个工具定义 name、schema、风险等级、handler，不要只做一个 switch-case。',
        advancedImplementation: '再补工具分批调度、并发策略、结果标准化和审计记录。',
        whenToDelay: '没有多个工具时，不必一开始就做复杂并发编排。',
      },
    ],
    quiz: [
      {
        id: 'tool-contract',
        prompt: '为什么说 Tool 不是简单函数映射？',
        options: [
          '因为它还承担 schema、权限、安全、并发和结果展示协议。',
          '因为工具只能由 UI 组件调用。',
          '因为工具不能返回结果。',
        ],
        answer: '因为它还承担 schema、权限、安全、并发和结果展示协议。',
        explanation: 'Claude Code 把工具当运行时对象来管理，而不是普通函数表。',
      },
      {
        id: 'tool-result-feedback',
        prompt: 'tool_result 为什么必须回流到下一轮？',
        options: [
          '因为模型需要看到工具执行结果，才能继续规划后续动作。',
          '因为这样 UI 会更好看。',
          '因为 transcript 不能存 assistant 消息。',
        ],
        answer: '因为模型需要看到工具执行结果，才能继续规划后续动作。',
        explanation: '没有回流，工具执行就无法真正参与 agent 推理闭环。',
      },
    ],
  },
  {
    slug: 'prompt',
    title: 'Prompt Management',
    category: 'core',
    status: 'ready',
    difficulty: '中等',
    estimatedMinutes: 35,
    summary: '理解 Claude Code 为什么不是写一个大 system prompt，而是在构建一个 prompt runtime。',
    goal: '学完后你能讲清静态段、动态段、覆盖优先级、缓存边界和专项 prompt 家族。',
    plainExplanation:
      'Claude Code 的 prompt 管理不是一次性拼字符串，而是像配置系统一样分层、分段、可缓存、可替换。这样既能保持稳定，又能在不同场景下重建正确上下文。',
    whyItMatters: [
      '它决定模型看到的环境说明、工具说明和动态上下文如何形成。',
      '它直接影响长会话性能和 prompt cache 命中率。',
      '如果你的项目想长期可维护，Prompt Builder 必须独立出来。',
    ],
    keyPoints: [
      {
        title: 'prompt runtime',
        summary: 'system prompt 由静态段和动态段组成，不同来源有覆盖优先级。',
      },
      {
        title: 'section cache',
        summary: '用 section 和 boundary 保证可缓存段稳定，降低重复 token 开销。',
      },
      {
        title: '专项 prompt 家族',
        summary: 'compact、memory extraction、session memory 等子流程会使用受约束 prompt，而不是共用主 prompt。',
      },
    ],
    sourceRefs: [
      { label: 'analysis/04g-prompt-management.md', path: '../analysis/04g-prompt-management.md' },
      { label: 'src/utils/systemPrompt.ts', path: '../src/utils/systemPrompt.ts' },
    ],
    prerequisites: ['architecture'],
    related: ['context', 'tool-call', 'agent-memory'],
    conceptDiagramId: 'prompt-runtime',
    runtimeFlowIds: ['runtime-overview'],
    codeFlowIds: ['prompt-main-chain'],
    analysisLensIds: ['prompt-context-discipline', 'architecture-systems-view'],
    mindset: [
      '把 prompt 想成配置树，而不是一次性模板。',
      '注意哪些段稳定、哪些段依赖运行时状态。',
    ],
    pseudoCode: [
      'build static sections',
      'merge dynamic sections and overrides',
      'inject user/system context',
      'apply cache boundaries',
      'send effective prompt to query runtime',
    ],
    projectMappings: [
      {
        targetLayer: 'Prompt Builder',
        minimumImplementation: '把 system prompt、用户上下文、运行时上下文拆开，统一从 builder 生成。',
        advancedImplementation: '为稳定片段引入缓存 section，为不同任务定义专项 prompt。',
        whenToDelay: '如果只有单回合演示，先不做复杂缓存边界。',
      },
    ],
    quiz: [
      {
        id: 'prompt-runtime',
        prompt: '为什么 Claude Code 的 prompt 管理不能理解为“一个大字符串”？',
        options: [
          '因为它包含静态段、动态段、覆盖优先级和缓存边界，需要运行时组装。',
          '因为所有 prompt 都写在数据库里。',
          '因为 Claude Code 不使用 system prompt。',
        ],
        answer: '因为它包含静态段、动态段、覆盖优先级和缓存边界，需要运行时组装。',
        explanation: '这使它更像 prompt runtime，而不是常量模板。',
      },
    ],
  },
  {
    slug: 'context',
    title: 'Context Management',
    category: 'core',
    status: 'ready',
    difficulty: '中等',
    estimatedMinutes: 30,
    summary: '理解 Claude Code 如何治理上下文预算、自动压缩和状态重建。',
    goal: '学完后你能说明 context budget、auto-compact、prompt cache 和 PTL fallback 分别在解决什么问题。',
    plainExplanation:
      'Claude Code 把上下文看成有限预算，而不是无限聊天记录。它会动态分配额度、压缩低价值内容、重建关键状态，确保长会话还能继续工作。',
    whyItMatters: [
      '不做 context 管理，长会话很快就会失控。',
      '它和 prompt cache、session storage、memory 提取是联动的。',
      '这是 Web Agent 项目里最容易被忽略、也最容易后期返工的一层。',
    ],
    keyPoints: [
      {
        title: '动态窗口边界',
        summary: '上下文和最大输出不是固定常量，而是运行时根据成本和场景分配。',
      },
      {
        title: 'auto-compact',
        summary: '系统会在接近上限时触发压缩，而不是等完全爆掉才处理。',
      },
      {
        title: '状态补偿',
        summary: '压缩后仍需要重注入关键状态，防止模型丢失工作上下文。',
      },
    ],
    sourceRefs: [
      { label: 'analysis/04f-context-management.md', path: '../analysis/04f-context-management.md' },
      { label: 'src/services/compact/compact.ts', path: '../src/services/compact/compact.ts' },
    ],
    prerequisites: ['architecture', 'prompt'],
    related: ['agent-memory', 'session-storage'],
    conceptDiagramId: 'context-runtime',
    runtimeFlowIds: ['runtime-overview'],
    codeFlowIds: ['context-main-chain'],
    analysisLensIds: ['prompt-context-discipline', 'evidence-index-navigation'],
    mindset: [
      '上下文是预算，不是历史记录备份箱。',
      '每次 compact 后都要问：哪些状态必须显式补回。',
    ],
    pseudoCode: [
      'measure available context budget',
      'keep recent + high-value state',
      'if near limit: compact transcript',
      'reinject working state and resume query',
    ],
    projectMappings: [
      {
        targetLayer: 'Context Manager',
        minimumImplementation: '先实现消息裁剪和最近上下文优先，不要直接保留整段历史。',
        advancedImplementation: '增加自动压缩、摘要边界、上下文分桶和重注入。',
        whenToDelay: '如果产品还没出现长会话，不用先做复杂的 compact 子流程。',
      },
    ],
    quiz: [
      {
        id: 'state-reinjection',
        prompt: '压缩上下文后为什么还要做状态重建？',
        options: [
          '因为模型会丢失之前隐含的重要状态，需要显式补回关键信息。',
          '因为压缩后 transcript 会自动损坏。',
          '因为只有这样才能调用 MCP。',
        ],
        answer: '因为模型会丢失之前隐含的重要状态，需要显式补回关键信息。',
        explanation: '这能避免 compact 之后系统行为漂移。',
      },
    ],
  },
  {
    slug: 'sandbox',
    title: 'Sandbox 与 Permission',
    category: 'core',
    status: 'ready',
    difficulty: '中等',
    estimatedMinutes: 35,
    summary: '理解 Claude Code 如何把权限规则和 sandbox 组合成真实执行边界。',
    goal: '学完后你能分清 permission system、sandbox、allowlist、denyWrite、网络限制和自动放行之间的关系。',
    plainExplanation:
      'Claude Code 的安全边界不是单点开关。它同时依赖工具权限、路径规则、网络规则和运行时沙箱，多个机制叠加后才构成真正的执行防线。',
    whyItMatters: [
      '它决定 agent 能不能安全落地到本地系统。',
      '它解释了为什么只做 ask/allow/deny 还不够。',
      'Web 项目即使没有本地 shell，也需要借鉴这种风险分级思路。',
    ],
    keyPoints: [
      {
        title: 'sandbox 不是唯一边界',
        summary: 'permission system 和 sandbox 是耦合协作，而不是互相替代。',
      },
      {
        title: '规则是语义重解释',
        summary: 'settings 中的权限和路径信息会被翻译成实际 sandbox 规则。',
      },
      {
        title: '自动放行仍受显式 deny 约束',
        summary: '沙箱内自动放行不是无条件通行证。',
      },
    ],
    sourceRefs: [
      { label: 'analysis/04e-sandbox-implementation.md', path: '../analysis/04e-sandbox-implementation.md' },
      { label: 'src/tools/BashTool/shouldUseSandbox.ts', path: '../src/tools/BashTool/shouldUseSandbox.ts' },
      { label: 'src/utils/permissions/permissions.ts', path: '../src/utils/permissions/permissions.ts' },
    ],
    prerequisites: ['tool-call'],
    related: ['security', 'session-storage'],
    conceptDiagramId: 'sandbox-runtime',
    runtimeFlowIds: ['permissions-and-sandbox'],
    codeFlowIds: ['sandbox-main-chain'],
    analysisLensIds: ['security-boundary-model', 'tool-runtime-tradeoff'],
    mindset: [
      '先分清 allow/ask/deny，再看是否进入 sandbox。',
      '安全边界要从资源视角看，不要只盯着 BashTool。',
    ],
    pseudoCode: [
      'inspect tool intent and resource scope',
      'resolve permission result',
      'decide sandbox mode',
      'execute inside allowed boundary',
      'return result or denial',
    ],
    projectMappings: [
      {
        targetLayer: 'Permission Layer',
        minimumImplementation: '先对工具按风险级别分组，至少区分只读、写入、外部请求三类。',
        advancedImplementation: '引入资源级 allowlist、执行环境隔离和细粒度审批。',
        whenToDelay: '如果当前只有无副作用工具，不要过度引入复杂沙箱。',
      },
    ],
    quiz: [
      {
        id: 'sandbox-boundary',
        prompt: '为什么说 sandbox 不是唯一安全边界？',
        options: [
          '因为真正的执行边界来自权限规则、路径语义、网络限制和沙箱的叠加。',
          '因为 sandbox 只负责 UI 渲染。',
          '因为 Claude Code 完全不用权限系统。',
        ],
        answer: '因为真正的执行边界来自权限规则、路径语义、网络限制和沙箱的叠加。',
        explanation: '单靠一个容器或开关不足以表达复杂工具风险。',
      },
    ],
  },
  {
    slug: 'session-storage',
    title: 'Session Storage / Resume',
    category: 'core',
    status: 'ready',
    difficulty: '进阶',
    estimatedMinutes: 40,
    summary: '理解 Claude Code 为什么把 transcript 当事件流日志，以及 resume 如何靠它重建运行状态。',
    goal: '学完后你能说清 append-only transcript、metadata 重挂、subagent sidechain 和 hydrate 的作用。',
    plainExplanation:
      'Claude Code 不是简单保存聊天记录，而是保存可恢复的运行事件流。这样它才能在中断、resume、subagent 和长会话场景下恢复出比较完整的运行态。',
    whyItMatters: [
      '长会话治理和可恢复性高度依赖这一层。',
      '它影响 UI 列表、resume 能力和多 Agent sidechain。',
      '只要你的项目要做“继续上次工作”，就绕不开 transcript 设计。',
    ],
    keyPoints: [
      {
        title: 'append-only 事件流',
        summary: 'transcript 不是可变快照，而是增量追加日志。',
      },
      {
        title: '主链与 sidechain 分离',
        summary: '主会话和 subagent transcript 独立落盘，恢复时再重建关系。',
      },
      {
        title: 'resume 是恢复运行态而不是页面态',
        summary: '它不仅恢复消息，还要恢复 metadata、agent、mode 和相关链路状态。',
      },
    ],
    sourceRefs: [
      { label: 'analysis/04i-session-storage-resume.md', path: '../analysis/04i-session-storage-resume.md' },
      { label: 'src/utils/sessionStorage.ts', path: '../src/utils/sessionStorage.ts' },
    ],
    prerequisites: ['architecture', 'tool-call', 'context'],
    related: ['agent-memory', 'multi-agent'],
    conceptDiagramId: 'session-runtime',
    runtimeFlowIds: ['session-resume'],
    codeFlowIds: ['session-main-chain'],
    analysisLensIds: ['prompt-context-discipline', 'hidden-signals-and-observability'],
    mindset: [
      '把 session 当事件流，而不是聊天快照。',
      '恢复会话时要关注运行态是否被真正重建。',
    ],
    pseudoCode: [
      'append event to transcript',
      're-attach metadata to tail',
      'persist sidechain separately if needed',
      'hydrate runtime from transcript when resuming',
    ],
    projectMappings: [
      {
        targetLayer: 'Session Store',
        minimumImplementation: '先做会话消息日志与元数据分离存储，支持继续会话。',
        advancedImplementation: '再补事件流、并行工具结果、resume 修复和 sidechain transcript。',
        whenToDelay: '如果产品还不支持恢复，不必一开始实现复杂 hydrate。',
      },
    ],
    quiz: [
      {
        id: 'append-only',
        prompt: '为什么 transcript 设计成 append-only 日志更合适？',
        options: [
          '因为它更适合恢复、追踪、并发结果挂接和长期状态演化。',
          '因为日志格式更适合截图。',
          '因为这样就不需要 metadata。',
        ],
        answer: '因为它更适合恢复、追踪、并发结果挂接和长期状态演化。',
        explanation: '这比反复重写整份会话快照更稳，也更利于审计。',
      },
    ],
  },
  {
    slug: 'agent-memory',
    title: 'Agent Memory',
    category: 'core',
    status: 'ready',
    difficulty: '中等',
    estimatedMinutes: 30,
    summary: '理解 Claude Code 的 memory 不只是记住聊天内容，而是多层级、可提取、可压缩的长期协作机制。',
    goal: '学完后你能分清 session memory、长期 memory、提取流程，以及它们和 compact 的关系。',
    plainExplanation:
      'Memory 在 Claude Code 里承担的是把短期对话变成长期可用知识的作用。它不是单独的一份笔记，而是与 session、prompt、compact 和工具执行联动的辅助系统。',
    whyItMatters: [
      '它是长期协作体验的重要来源。',
      '它也会带来隐私和治理成本。',
      '自己的项目如果一开始就上自动 memory，很容易做重。',
    ],
    keyPoints: [
      {
        title: '多层 memory',
        summary: 'session 内记忆和长期记忆不是一回事，提取路径和使用时机也不同。',
      },
      {
        title: 'memory 不是自动等于 transcript',
        summary: '系统会从对话中提取高价值信息，而不是把所有内容都算进记忆。',
      },
      {
        title: 'memory 与 compact 配合',
        summary: '长会话压缩后，memory 可以承担保留重要长期事实的角色。',
      },
    ],
    sourceRefs: [
      { label: 'analysis/04-agent-memory.md', path: '../analysis/04-agent-memory.md' },
      { label: 'src/services/SessionMemory/sessionMemory.ts', path: '../src/services/SessionMemory/sessionMemory.ts' },
    ],
    prerequisites: ['context', 'session-storage'],
    related: ['prompt', 'security'],
    projectMappings: [
      {
        targetLayer: 'Memory Layer',
        minimumImplementation: '先只做少量显式保存的重要事实，不要自动提取一切。',
        advancedImplementation: '再引入提取流程、分类记忆和长期记忆检索。',
        whenToDelay: '没有明确长期协作需求时，不要一开始就做自动 memory。',
      },
    ],
    quiz: [
      {
        id: 'memory-vs-transcript',
        prompt: 'memory 为什么不等于 transcript？',
        options: [
          '因为 memory 只保留高价值、可复用的信息，而 transcript 记录的是完整运行事件。',
          '因为 transcript 只存图片。',
          '因为 memory 只在 UI 里使用。',
        ],
        answer: '因为 memory 只保留高价值、可复用的信息，而 transcript 记录的是完整运行事件。',
        explanation: '两者用途不同，一个偏运行恢复，一个偏长期知识。',
      },
    ],
  },
  {
    slug: 'skills',
    title: 'Skills 机制',
    category: 'core',
    status: 'ready',
    difficulty: '中等',
    estimatedMinutes: 25,
    summary: '理解 Skills 作为知识扩展和 prompt 注入能力的实现方式。',
    goal: '学完后能说清 Skills 来源、发现流程、Frontmatter 字段、实例化方式和 Shell 执行能力。',
    plainExplanation:
      'Skills 不是简单模板库，而是把一组可发现、可解析、可注入的专业能力封装为标准入口，让系统在需要时把额外知识和操作提示带入运行时。',
    whyItMatters: [
      '它体现了 Claude Code 如何扩展领域能力。',
      '它和 prompt 管理、命令发现、插件体验有关。',
      '很适合迁移到你自己的项目作为“专家模板”能力。',
    ],
    keyPoints: [
      {
        title: '三种来源',
        summary: 'Skills 可以来自不同目录和来源，但都要汇入统一发现流程。',
      },
      {
        title: 'Frontmatter 解析',
        summary: '技能不是纯文本，它有结构化元数据和运行约束。',
      },
      {
        title: '技能即运行时增量',
        summary: '技能最终影响 prompt、命令和执行方式，而不只是页面展示。',
      },
    ],
    sourceRefs: [
      { label: 'analysis/04c-skills-implementation.md', path: '../analysis/04c-skills-implementation.md' },
      { label: 'src/skills/loadSkillsDir.ts', path: '../src/skills/loadSkillsDir.ts' },
    ],
    prerequisites: ['prompt'],
    related: ['mcp', 'tool-call'],
    projectMappings: [
      {
        targetLayer: 'Knowledge Extensions',
        minimumImplementation: '先把可复用提示模板做成结构化配置，而不是散落在代码里。',
        advancedImplementation: '再引入可发现目录、元数据校验和技能装载器。',
        whenToDelay: '如果项目领域单一，先不用做完整 Skills 体系。',
      },
    ],
    quiz: [
      {
        id: 'skills-value',
        prompt: 'Skills 最关键的价值是什么？',
        options: [
          '把可复用领域知识和运行提示结构化注入到系统中。',
          '让模型跳过所有权限判断。',
          '替代 transcript 存储所有记忆。',
        ],
        answer: '把可复用领域知识和运行提示结构化注入到系统中。',
        explanation: '这样扩展能力时不用改主系统逻辑。',
      },
    ],
  },
  {
    slug: 'mcp',
    title: 'MCP 集成',
    category: 'core',
    status: 'ready',
    difficulty: '中等',
    estimatedMinutes: 25,
    summary: '理解 Claude Code 如何连接外部 MCP Server，并把外部工具纳入统一工具池。',
    goal: '学完后能说清连接管理、超时、认证缓存、重连、工具命名和工具池融合策略。',
    plainExplanation:
      'MCP 让 Claude Code 可以接外部能力，但接入并不等于裸连。它仍然要经过命名、连接、认证、超时、重连和工具池融合，才能进入统一执行体系。',
    whyItMatters: [
      '它体现了 Claude Code 的外部扩展方式。',
      '它帮助你理解“外部工具如何变成系统内一等公民”。',
      '这对未来接企业内服务或第三方平台很有价值。',
    ],
    keyPoints: [
      {
        title: '连接管理',
        summary: 'MCP 连接不是一次性调用，而是要管理会话、重试、过期和并发。',
      },
      {
        title: '工具池融合',
        summary: '外部工具与内建工具最终在同一池里编排，但名字冲突时要有优先级规则。',
      },
      {
        title: '认证防雪崩',
        summary: '认证缓存和超时处理是工程层面的关键优化点。',
      },
    ],
    sourceRefs: [
      { label: 'analysis/04d-mcp-implementation.md', path: '../analysis/04d-mcp-implementation.md' },
      { label: 'src/services/mcp/client.ts', path: '../src/services/mcp/client.ts' },
    ],
    prerequisites: ['tool-call'],
    related: ['skills', 'sandbox'],
    conceptDiagramId: 'mcp-runtime',
    runtimeFlowIds: ['runtime-overview'],
    codeFlowIds: ['mcp-main-chain'],
    analysisLensIds: ['extension-ecosystem-view', 'security-boundary-model'],
    mindset: [
      '外部工具接入后也必须接受统一治理。',
      '看 MCP 时不要只看连接，重点看认证和工具池融合。',
    ],
    pseudoCode: [
      'connect to MCP server',
      'perform auth + cache session',
      'normalize remote tool definitions',
      'merge tools into global pool',
      'expose to runtime like built-in tools',
    ],
    projectMappings: [
      {
        targetLayer: 'Extension Gateway',
        minimumImplementation: '先用统一适配接口接入外部服务，不要让业务逻辑直接调用第三方 SDK。',
        advancedImplementation: '再补连接池、认证缓存、超时与健康检查。',
        whenToDelay: '如果第一版没有外部系统接入需求，先保留扩展位即可。',
      },
    ],
    quiz: [
      {
        id: 'mcp-bridge',
        prompt: '为什么 MCP 工具不能直接裸接进模型调用？',
        options: [
          '因为还要经过命名规则、连接管理、认证、超时和工具池融合。',
          '因为 MCP 只能在浏览器里运行。',
          '因为 MCP 不能提供工具。',
        ],
        answer: '因为还要经过命名规则、连接管理、认证、超时和工具池融合。',
        explanation: '否则外部能力无法稳定地变成系统内工具。',
      },
    ],
  },
  {
    slug: 'multi-agent',
    title: 'Multi-Agent',
    category: 'core',
    status: 'ready',
    difficulty: '进阶',
    estimatedMinutes: 40,
    summary: '理解 Claude Code 中 subagent、coordinator mode 和 swarm teammate 的差异及其协作方式。',
    goal: '学完后能分辨三种多 agent 模型、邮箱通信、权限桥接和任务协作平面。',
    plainExplanation:
      'Claude Code 的多 agent 不是“多开几个 worker”这么简单。它同时有不同层级的 agent 身份、任务平面、通信方式和权限兜底，这才让协作看起来像一个小型 runtime。',
    whyItMatters: [
      '它是 Claude Code 平台感最强的能力之一。',
      '它也最容易被误学成“先做并发 worker”。',
      '对你的 Web 项目来说，更重要的是知道何时不该一开始就做它。',
    ],
    keyPoints: [
      {
        title: '三种多 agent 模型',
        summary: '普通 subagent、coordinator mode 和 swarm teammate 的定位不同。',
      },
      {
        title: 'mailbox 与 direct resume',
        summary: '通信不是纯聊天消息，而是具备任务与状态含义。',
      },
      {
        title: 'leader 权限桥接',
        summary: '多 agent 下权限不能各弹各的，必须有主线程兜底逻辑。',
      },
    ],
    sourceRefs: [
      { label: 'analysis/04h-multi-agent.md', path: '../analysis/04h-multi-agent.md' },
      { label: 'src/tools/shared/spawnMultiAgent.ts', path: '../src/tools/shared/spawnMultiAgent.ts' },
    ],
    prerequisites: ['tool-call', 'session-storage'],
    related: ['sandbox', 'agent-memory'],
    conceptDiagramId: 'multi-agent-runtime',
    runtimeFlowIds: ['multi-agent'],
    codeFlowIds: ['multi-agent-main-chain'],
    analysisLensIds: ['extension-ecosystem-view', 'competitive-product-judgment'],
    mindset: [
      '先辨认任务平面，再看 agent 身份差异。',
      '多 Agent 最重要的问题是协作边界，而不是并发本身。',
    ],
    pseudoCode: [
      'select agent mode for subtask',
      'spawn agent context',
      'exchange status through mailbox',
      'bridge permission through leader if needed',
      'merge task result back to main plane',
    ],
    projectMappings: [
      {
        targetLayer: 'Advanced Coordination',
        minimumImplementation: '第一版只做单 agent 和任务拆分提示，不要直接做真多 agent runtime。',
        advancedImplementation: '等单 agent、session、permission 稳定后再评估 worker 模式。',
        whenToDelay: '只要你的产品还没有明确并行协作需求，就应该延后。',
      },
    ],
    quiz: [
      {
        id: 'multi-agent-priority',
        prompt: '为什么多 agent 不应成为大多数项目的一期重点？',
        options: [
          '因为它依赖任务平面、通信机制、权限桥接和状态恢复，复杂度很高。',
          '因为多 agent 一定比单 agent 慢。',
          '因为多 agent 不能用在 Web 项目里。',
        ],
        answer: '因为它依赖任务平面、通信机制、权限桥接和状态恢复，复杂度很高。',
        explanation: '先把单 agent 打稳，收益通常更高。',
      },
    ],
  },
  {
    slug: 'security',
    title: '安全与隐私',
    category: 'risk',
    status: 'ready',
    difficulty: '中等',
    estimatedMinutes: 30,
    summary: '理解 Claude Code 接触了哪些数据、风险在哪里、治理重点应该放在哪。',
    goal: '建立数据面、遥测、transcript、memory、外部扩展的综合风险视角。',
    plainExplanation:
      '真正的风险不是一个日志事件，而是上下文、持久化和外部同步叠加后形成的长期画像能力。',
    whyItMatters: [
      '它影响你如何使用和如何设计，因为输入、输出和持久化都可能成为数据面。',
      '它决定哪些能力不应默认开启，尤其是 transcript、memory 和远程同步。',
      '它能让你在自己的 Web 项目里提前划清“可见、可存、可外发”的边界。',
    ],
    keyPoints: [
      {
        title: '三类数据面',
        summary: '模型上下文、本地持久化、外部同步共同构成风险面，任何一层泄露都可能拼出长期画像。',
      },
      {
        title: '治理重点不是遥测单点',
        summary: '要控制的是输入、长期保存、权限边界和网络外发，而不只是 telemetry 开关。',
      },
      {
        title: '长期记忆要显式审视',
        summary: 'memory 机制一旦与 transcript、resume、team sync 组合，就会显著放大数据留存面。',
      },
    ],
    sourceRefs: [
      { label: 'analysis/02-security-analysis.md', path: '../analysis/02-security-analysis.md' },
      { label: 'analysis/02-user-data-and-usage.md', path: '../analysis/02-user-data-and-usage.md' },
      { label: 'analysis/03-privacy-avoidance.md', path: '../analysis/03-privacy-avoidance.md' },
      { label: 'analysis/07-code-evidence-index.md', path: '../analysis/07-code-evidence-index.md' },
    ],
    prerequisites: ['architecture'],
    related: ['sandbox', 'agent-memory', 'session-storage', 'prompt'],
    projectMappings: [
      {
        targetLayer: 'Security Policy',
        minimumImplementation: '先定义哪些数据能进模型、哪些要落盘、哪些能外发。',
        advancedImplementation: '再做分级治理、默认关闭策略、审计日志和组织级配置。',
        whenToDelay: '不要延后到产品上线后才考虑，尤其是已经开始写 transcript 的项目。',
      },
      {
        targetLayer: 'Product UX Guardrails',
        minimumImplementation: '在 UI 层显式提示哪些信息会进入模型和持久化。',
        advancedImplementation: '对敏感操作增加二次确认和可撤销机制。',
        whenToDelay: '如果产品还没有处理真实用户数据，就不要为了安全做过重弹窗。',
      },
    ],
    quiz: [
      {
        id: 'security-surface',
        prompt: 'Claude Code 风险最大的叠加面是什么？',
        options: [
          '模型上下文、本地持久化和外部同步三者叠加。',
          '只有 telemetry 埋点。',
          '只有本地 transcript 文件。',
        ],
        answer: '模型上下文、本地持久化和外部同步三者叠加。',
        explanation: '这比单点遥测更值得优先治理。',
      },
      {
        id: 'security-priority',
        prompt: '安全治理里最应该优先控制什么？',
        options: [
          '输入、长期保存和网络外发',
          '页面标题和按钮颜色',
          '组件命名风格',
        ],
        answer: '输入、长期保存和网络外发',
        explanation: '这三者决定了数据最主要的暴露路径。',
      },
    ],
  },
  {
    slug: 'differentiators',
    title: '程序亮点与差异化',
    category: 'risk',
    status: 'ready',
    difficulty: '基础',
    estimatedMinutes: 20,
    summary: '理解 Claude Code 真正有辨识度的工程亮点，而不是只看功能数量。',
    goal: '学完后能说清统一执行内核、memory 透明化、权限主干化和长会话治理的价值。',
    plainExplanation:
      'Claude Code 的优势不只是工具多，而是多个系统级能力一起成立，且彼此配合。',
    whyItMatters: [
      '它帮助你抓住“什么值得借鉴”，避免只学到功能外形。',
      '它提醒你真正有价值的是系统级协同，而不是单点 feature 堆叠。',
      '它能直接指导你自己的 Web 项目先做哪些底层能力、后做哪些花哨交互。',
    ],
    keyPoints: [
      {
        title: '统一执行内核',
        summary: 'query / tool / permission / memory 不是散装功能，而是一条闭环运行链。',
      },
      {
        title: 'memory 不是黑盒附属品',
        summary: '记忆、session、compact 和 prompt 互相配合，才形成长期协作体验。',
      },
      {
        title: '权限是主干不是补丁',
        summary: '安全边界直接嵌入执行链，而不是事后拦截。',
      },
      {
        title: '长会话治理',
        summary: '压缩、恢复、摘要和状态重注入共同支撑平台成熟度。',
      },
    ],
    sourceRefs: [
      { label: 'analysis/05-differentiators-and-comparison.md', path: '../analysis/05-differentiators-and-comparison.md' },
      { label: 'analysis/09-final-summary.md', path: '../analysis/09-final-summary.md' },
      { label: 'analysis/07-code-evidence-index.md', path: '../analysis/07-code-evidence-index.md' },
    ],
    prerequisites: ['architecture'],
    related: ['competition', 'security', 'tool-call', 'session-storage'],
    projectMappings: [
      {
        targetLayer: 'Product Strategy',
        minimumImplementation: '先学会抓系统性能力，而不是堆单点 feature。',
        advancedImplementation: '围绕统一执行内核设计长期演进路线，并把 memory 和治理能力看成核心资产。',
        whenToDelay: '如果你还在找方向，这一章反而要早点看，因为它决定你是否走平台路线。',
      },
      {
        targetLayer: 'Architecture Review',
        minimumImplementation: '定期检查自己的产品是否也形成了统一执行内核。',
        advancedImplementation: '检查是否把权限、上下文和状态恢复做成主干，而不是散落在功能里。',
        whenToDelay: '如果只是做一次性工具，可以延后，但要知道延后的代价。',
      },
    ],
    quiz: [
      {
        id: 'differentiator',
        prompt: 'Claude Code 的差异化更接近什么？',
        options: [
          '系统级能力协同，而不是单一功能数量。',
          '单个 UI 组件的视觉风格。',
          '只是在终端里接了更多命令。',
        ],
        answer: '系统级能力协同，而不是单一功能数量。',
        explanation: '这也是最值得迁移的部分。',
      },
      {
        id: 'differentiator-core',
        prompt: 'Claude Code 真正值得借鉴的优势更接近什么？',
        options: [
          '统一执行内核加上长期治理能力',
          '单个页面更炫',
          '命令更多',
        ],
        answer: '统一执行内核加上长期治理能力',
        explanation: '这是平台感和工程成熟度的核心来源。',
      },
    ],
  },
  {
    slug: 'extra-findings',
    title: '额外发现',
    category: 'risk',
    status: 'ready',
    difficulty: '进阶',
    estimatedMinutes: 20,
    summary: '用于承接源码中不容易放进主链但很有价值的工程细节与补充观察。',
    goal: '作为补充阅读区，帮助形成更完整的系统判断。',
    plainExplanation:
      '主线章节会优先解释稳定的大结构，但真正体现工程成熟度的，往往是一些零散却关键的补充细节。这个模块的作用，就是把这些“放不进主线，但不该漏”的内容系统化收纳起来。',
    whyItMatters: [
      '它保证全量覆盖不遗漏长尾信息。',
      '它有助于你从“功能理解”进入“工程判断”。',
      '它还能把主线里解释不够展开的设计取舍补完整，避免只看到结论看不到背景。',
    ],
    keyPoints: [
      {
        title: 'trust 前后环境隔离',
        summary: '初始化顺序和安全信任边界会影响环境变量、遥测和配置读取的启用时机。',
      },
      {
        title: '补充机制往往揭示设计取舍',
        summary: 'extra findings 不是边角料，很多都在解释核心系统为什么要这样做，以及为什么某些能力不能过早开放。',
      },
      {
        title: '长尾细节能帮助做工程判断',
        summary: '例如 hidden feature、负面关键词和额外发现这些细节，往往直接反映产品成熟度和治理习惯。',
      },
    ],
    sourceRefs: [
      { label: 'analysis/06-extra-findings.md', path: '../analysis/06-extra-findings.md' },
      { label: 'analysis/07-code-evidence-index.md', path: '../analysis/07-code-evidence-index.md' },
      { label: 'analysis/11-hidden-features-and-easter-eggs.md', path: '../analysis/11-hidden-features-and-easter-eggs.md' },
    ],
    prerequisites: ['architecture'],
    related: ['hidden-features', 'negative-signals', 'security', 'competition'],
    projectMappings: [
      {
        targetLayer: 'Engineering Notes',
        minimumImplementation: '先做引用与索引，不强行塞进主线。',
        advancedImplementation: '后续整理为专题知识卡，并把那些容易被遗漏的工程细节补进复盘页和架构图。',
        whenToDelay: '可以晚于核心机制，但不能晚到丢失对设计取舍的判断。',
      },
      {
        targetLayer: 'Learning Map Coverage',
        minimumImplementation: '为每个长尾模块保留独立入口和状态标记。',
        advancedImplementation: '支持按主题聚合浏览，把零散内容重新组织成可学习的知识块。',
        whenToDelay: '如果首页和地图都已经稳定，可随后再做细化。',
      },
    ],
    quiz: [
      {
        id: 'extra-findings-role',
        prompt: '额外发现区最主要的作用是什么？',
        options: [
          '把主线之外但重要的工程细节系统化收纳起来。',
          '替代所有主线章节。',
          '只记录 UI 样式差异。',
        ],
        answer: '把主线之外但重要的工程细节系统化收纳起来。',
        explanation: '它的价值在于补足主线之外的工程判断材料，而不是重复主线。',
      },
      {
        id: 'extra-findings-lesson',
        prompt: '额外发现区在学习产品里最实用的价值是什么？',
        options: [
          '补足主线无法展开的细节，让你能做更完整的工程判断。',
          '替代核心章节，减少学习量。',
          '只用于记录不重要的信息。',
        ],
        answer: '补足主线无法展开的细节，让你能做更完整的工程判断。',
        explanation: '它的定位是补充，而不是抢主线。',
      },
    ],
  },
  {
    slug: 'negative-signals',
    title: '负面关键词与挫败感信号',
    category: 'risk',
    status: 'ready',
    difficulty: '进阶',
    estimatedMinutes: 18,
    summary: '分析产品埋点、挫败感检测与反馈触发逻辑。',
    goal: '帮助理解产品 instrumentation 与隐私边界的交叉点。',
    plainExplanation:
      '这个模块关注的不是“模型能力”，而是产品如何感知用户是否沮丧、何时触发反馈、这些信号会不会进入更大的遥测链路。它能帮助你建立产品 instrumentation 的边界意识。',
    whyItMatters: [
      '它连接输入分析、反馈、遥测和体验治理。',
      '它提醒你不要把产品反馈机制做成隐式黑盒。',
      '它也提醒你，任何挫败感检测都必须和隐私、透明度、用途边界一起设计。',
    ],
    keyPoints: [
      {
        title: '检测逻辑并不等于安全审核',
        summary: '这里更多是产品埋点与体验监测，而不是 prompt 级内容拦截。',
      },
      {
        title: '反馈链路会影响隐私判断',
        summary: '一旦和 transcript share、survey 结合，产品信号就会进入更大的外发面。',
      },
      {
        title: '情绪信号和权限信号不是同一件事',
        summary: '挫败感检测是 UX 与增长侧能力，不应被误当成权限或安全决策机制。',
      },
    ],
    sourceRefs: [
      { label: 'analysis/06b-negative-keyword-analysis.md', path: '../analysis/06b-negative-keyword-analysis.md' },
      { label: 'analysis/02-security-analysis.md', path: '../analysis/02-security-analysis.md' },
      { label: 'analysis/03-privacy-avoidance.md', path: '../analysis/03-privacy-avoidance.md' },
    ],
    prerequisites: ['security'],
    related: ['extra-findings', 'security', 'competition'],
    projectMappings: [
      {
        targetLayer: 'Feedback Instrumentation',
        minimumImplementation: '先只理解，不要直接复制类似机制。',
        advancedImplementation: '如果未来真要做，再明确合规、透明度、触发条件和退出机制。',
        whenToDelay: '在多数自有项目中应延后，除非你明确需要做体验监测。',
      },
      {
        targetLayer: 'Data Governance',
        minimumImplementation: '把会进入埋点和反馈链路的数据范围写清楚。',
        advancedImplementation: '为情绪信号、会话信号和遥测信号做不同的保留与访问策略。',
        whenToDelay: '如果还没有真实用户数据，先不要过度设计。',
      },
    ],
    quiz: [
      {
        id: 'negative-signal-nature',
        prompt: '负面关键词检测更接近哪类机制？',
        options: [
          '产品体验埋点与反馈触发机制',
          '核心工具权限引擎',
          '主 prompt 的唯一来源',
        ],
        answer: '产品体验埋点与反馈触发机制',
        explanation: '它更偏 instrumentation，而不是运行时权限主干。',
      },
      {
        id: 'negative-signal-boundary',
        prompt: '负面关键词检测最需要先明确的边界是什么？',
        options: [
          '它是产品信号，不是权限或安全决策。',
          '它必须替代 transcript。',
          '它应该默认向所有外部系统同步。',
        ],
        answer: '它是产品信号，不是权限或安全决策。',
        explanation: '如果边界不清，容易把体验监测误做成治理机制。',
      },
    ],
  },
  {
    slug: 'hidden-features',
    title: '隐藏命令与彩蛋',
    category: 'risk',
    status: 'ready',
    difficulty: '基础',
    estimatedMinutes: 15,
    summary: '收录隐藏命令、feature flags 与彩蛋机制。',
    goal: '帮助理解产品灰度与内部调试能力。',
    plainExplanation:
      '复杂产品通常不会把所有能力一口气面向所有用户开放。隐藏命令、feature flags 和彩蛋能让你看到团队如何做灰度、调试和内部能力控制。',
    whyItMatters: [
      '它展示了工程团队如何做 feature gating。',
      '它能帮助你理解复杂产品中的实验能力与公开能力是如何分层的。',
      '它还告诉你，产品中的隐藏能力通常不是“有就行”，而是围绕灰度、调试、兼容性和内部效率建立的。',
    ],
    keyPoints: [
      {
        title: 'feature gating 是工程控制手段',
        summary: '它让能力按环境、用户群或阶段逐步开放。',
      },
      {
        title: '隐藏能力不等于无用能力',
        summary: '很多隐藏入口反映的是内部调试、实验或灰度阶段。',
      },
      {
        title: '隐藏入口的存在本身就是信号',
        summary: '它说明产品有内部调试路径、权限分层或者实验性功能位。',
      },
    ],
    sourceRefs: [
      { label: 'analysis/11-hidden-features-and-easter-eggs.md', path: '../analysis/11-hidden-features-and-easter-eggs.md' },
      { label: 'analysis/06-extra-findings.md', path: '../analysis/06-extra-findings.md' },
      { label: 'analysis/07-code-evidence-index.md', path: '../analysis/07-code-evidence-index.md' },
    ],
    prerequisites: ['architecture'],
    related: ['extra-findings', 'security', 'competition'],
    projectMappings: [
      {
        targetLayer: 'Feature Flags',
        minimumImplementation: '先理解 feature flag 在复杂产品中的作用。',
        advancedImplementation: '后续结合自己的项目再设计，并把灰度、调试与内部工具链分开。',
        whenToDelay: '没有灰度需求时先不做，但要提前保留扩展点。',
      },
      {
        targetLayer: 'Internal Tooling',
        minimumImplementation: '把内部能力和公开能力分开，不让隐藏入口污染主路径。',
        advancedImplementation: '如果将来要做内部调试页，单独放到管理区并加访问控制。',
        whenToDelay: '在产品早期应尽量保持简单。',
      },
    ],
    quiz: [
      {
        id: 'feature-gating-purpose',
        prompt: '隐藏命令和 feature flags 最核心的工程作用是什么？',
        options: [
          '支持灰度、调试和分阶段开放能力',
          '替代 session storage',
          '让所有用户默认拥有更高权限',
        ],
        answer: '支持灰度、调试和分阶段开放能力',
        explanation: '它们的主要价值是控制能力开放范围，而不是取代主系统机制。',
      },
      {
        id: 'hidden-entry-signals',
        prompt: '隐藏入口存在通常说明什么？',
        options: [
          '产品内部存在灰度、调试或实验能力分层',
          '这个功能一定没有价值',
          '它应该默认对所有用户开放',
        ],
        answer: '产品内部存在灰度、调试或实验能力分层',
        explanation: '隐藏入口更多是在暴露产品内部治理结构，而不只是功能本身。',
      },
    ],
  },
  {
    slug: 'competition',
    title: '竞品对比',
    category: 'risk',
    status: 'ready',
    difficulty: '基础',
    estimatedMinutes: 18,
    summary: '从产品和架构视角理解 Claude Code 与 Codex、Gemini CLI、Aider、Cursor 的差异。',
    goal: '学完后能抓住真正的架构级差异，而不是表层功能比较。',
    plainExplanation:
      '竞品对比不是看谁功能多，而是看谁的系统定位、能力边界和工程取舍不同。真正有价值的是对比“它为什么这样设计”，而不是只看 feature checklist。',
    whyItMatters: [
      '它帮助判断哪些设计值得借鉴，哪些只是生态差异。',
      '它能把“工具、平台、IDE、运行时”这些概念分开，防止你混淆产品定位。',
      '它能帮助你决定自己的项目是做轻量工具还是做长期协作平台。',
    ],
    keyPoints: [
      {
        title: '平台感更强',
        summary: 'Claude Code 在内核、memory、权限、多 agent 和长会话治理方面平台感更重。',
      },
      {
        title: '差异化在结构，不在单点 feature',
        summary: '对比时应关注运行模型和能力边界，而不是只数功能项。',
      },
      {
        title: '定位决定技术栈',
        summary: '工具型产品、IDE 插件和 agent 平台在存储、权限和扩展上会做出不同取舍。',
      },
    ],
    sourceRefs: [
      { label: 'analysis/08-competitive-comparison.md', path: '../analysis/08-competitive-comparison.md' },
      { label: 'analysis/08-reference-comparison-sources.md', path: '../analysis/08-reference-comparison-sources.md' },
      { label: 'analysis/05-differentiators-and-comparison.md', path: '../analysis/05-differentiators-and-comparison.md' },
    ],
    prerequisites: ['differentiators'],
    related: ['architecture', 'security', 'session-storage'],
    projectMappings: [
      {
        targetLayer: 'Positioning',
        minimumImplementation: '先明确自己做的是工具、平台还是 IDE 能力层。',
        advancedImplementation: '再决定要不要引入 memory、permission、multi-agent 等平台能力，并让架构服务定位。',
        whenToDelay: '如果产品定位还不清晰，应尽早学习，因为定位会倒推设计。',
      },
      {
        targetLayer: 'Technical Roadmap',
        minimumImplementation: '先做单 agent 闭环，再对比是否需要更重的 runtime 机制。',
        advancedImplementation: '当你开始引入长会话、扩展和权限时，再回看竞品差异会更有判断力。',
        whenToDelay: '如果只是做短任务工具，不需要立刻向平台化靠拢。',
      },
    ],
    quiz: [
      {
        id: 'competition-compare',
        prompt: '做竞品对比时最该抓住什么？',
        options: [
          '系统定位、能力边界和工程取舍',
          '谁的首页颜色更好看',
          '谁的命令名称更短',
        ],
        answer: '系统定位、能力边界和工程取舍',
        explanation: '真正有价值的对比是架构和产品定位，而不是表面 feature 数量。',
      },
      {
        id: 'competition-lesson',
        prompt: '做竞品对比最重要的输出是什么？',
        options: [
          '明确自己的产品定位和技术取舍',
          '复制对方所有功能',
          '只比较价格',
        ],
        answer: '明确自己的产品定位和技术取舍',
        explanation: '竞品分析的目的不是复述别人，而是倒推出自己的路线。',
      },
    ],
  },
]

export const modulesBySlug = Object.fromEntries(
  learningModules.map(module => [module.slug, module]),
) as Record<string, LearningModule>
