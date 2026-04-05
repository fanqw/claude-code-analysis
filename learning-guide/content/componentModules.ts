import type { LearningModule } from '@/content/types'

export const componentModules: LearningModule[] = [
  {
    slug: 'overview',
    title: '组件总览与分层',
    category: 'components',
    status: 'ready',
    difficulty: '基础',
    estimatedMinutes: 20,
    summary: '建立 TUI 组件层级、依赖主干和 orchestrator / leaf 分层认知。',
    goal:
      '学完后能从组件角度解释 REPL 界面如何组织，并说清哪些是容器层、哪些是交互层、哪些是叶子层。',
    plainExplanation:
      '这一章的任务不是记组件名字，而是先把 Claude Code 的 UI 当成一条有明确分工的流水线来理解。它不是“几个 React 组件堆在一起”，而是从 Provider、工作台、消息渲染、输入编排到平台控制面的一整套分层。',
    whyItMatters: [
      '它能把抽象的运行机制映射到具体界面。',
      '它能帮你区分“状态管理”与“UI 呈现”分别应该放在哪一层。',
      '它给后面理解 Messages、PromptInput、permissions、mcp 等模块提供坐标系。',
    ],
    keyPoints: [
      {
        title: 'Provider 到会话工作台',
        summary: '组件不是平铺的，而是有明确分层与依赖主干，先有状态注入，再有工作台与消息面。',
      },
      {
        title: 'orchestrator / leaf 分层',
        summary: '高层组件做编排，底层组件做渲染和局部交互，避免逻辑扩散。',
      },
      {
        title: 'UI 既是展示层也是控制面',
        summary: 'Claude Code 的界面不是单纯聊天框，还是权限、任务、MCP、恢复等能力入口。',
      },
    ],
    sourceRefs: [
      {
        label: 'analysis/components/01-component-architecture-overview.md',
        path: '../analysis/components/01-component-architecture-overview.md',
      },
    ],
    prerequisites: ['architecture'],
    related: ['core-interaction', 'platform'],
    projectMappings: [
      {
        targetLayer: 'Frontend Architecture',
        minimumImplementation: '先分清容器组件与展示组件，不要把状态和展示混写。',
        advancedImplementation: '再补更细的虚拟列表、状态上下文、控制面和局部弹层。',
        whenToDelay: '可以晚于核心后端式机制。',
      },
      {
        targetLayer: 'Learning Site Shell',
        minimumImplementation: '首页、地图、章节页、源码阅读页分别承担不同职责，不要一个页面塞所有内容。',
        advancedImplementation: '引入专题布局、侧栏导航和内容元数据驱动的自动目录。',
        whenToDelay: '等章节数量稳定后再做更复杂的导航树。',
      },
    ],
    quiz: [
      {
        id: 'component-layering',
        prompt: '组件总览这章最关键的理解是什么？',
        options: [
          'Claude Code 的 UI 是分层组织的，不是平铺组件堆。',
          '组件只是为了让页面更好看。',
          '所有交互都写在单个页面里最简单。',
        ],
        answer: 'Claude Code 的 UI 是分层组织的，不是平铺组件堆。',
        explanation: '这章的作用是先建立 UI 组织结构，再进入具体组件。',
      },
    ],
  },
  {
    slug: 'core-interaction',
    title: '核心交互组件',
    category: 'components',
    status: 'ready',
    difficulty: '中等',
    estimatedMinutes: 20,
    summary: '聚焦 App、Messages、MessageRow、PromptInput 等主交互链。',
    goal:
      '理解 TUI 工作台如何承载消息和输入主链，并能把这一主链映射到自己的产品界面。',
    plainExplanation:
      '这一页讲的是“用户真正看见和操作的主干”。App 负责总装配，Messages 负责消息工作台，MessageRow 负责行级编排，PromptInput 负责输入编排。它们共同把“输入 -> 展示 -> 再输入”的循环跑起来。',
    whyItMatters: [
      '它连接运行态和用户感知层。',
      '它决定消息、输入、快捷键和滚动体验如何协同。',
      '它是理解终端式工作台最容易上手的一章。',
    ],
    keyPoints: [
      {
        title: 'App 只做根装配',
        summary: '根组件更像容器，负责 Provider、全局上下文和布局组合。',
      },
      {
        title: 'Messages 是消息工作台总编排器',
        summary: '它承担预处理、过滤、切片和多视图切换，不只是渲染列表。',
      },
      {
        title: 'PromptInput 是输入编排器',
        summary: '输入框背后是建议、状态、快捷键、粘贴、草稿与模式控制的集合。',
      },
      {
        title: 'MessageRow 是状态适配层',
        summary: '它负责把消息域状态转成可以稳定渲染的行级视图。',
      },
    ],
    sourceRefs: [
      {
        label: 'analysis/components/02-core-interaction-components.md',
        path: '../analysis/components/02-core-interaction-components.md',
      },
    ],
    prerequisites: ['overview'],
    related: ['platform', 'functions-core', 'functions-leaf'],
    projectMappings: [
      {
        targetLayer: 'Message Workbench',
        minimumImplementation: '把消息展示、输入、状态提示拆成独立组件，不要在一个文件里混写。',
        advancedImplementation: '增加虚拟列表、消息切片和行级 memo 化策略。',
        whenToDelay: '当消息数量很少时，不必提前做复杂虚拟化。',
      },
      {
        targetLayer: 'Product UI',
        minimumImplementation: '先保证输入流畅、消息清晰、快捷键可发现。',
        advancedImplementation: '再补多视图切换、历史消息搜索和状态栏。',
        whenToDelay: '不要在没有基础交互闭环前做过多装饰。',
      },
    ],
    quiz: [
      {
        id: 'messages-role',
        prompt: 'Messages 组件更接近什么角色？',
        options: [
          '消息工作台总编排器',
          '单纯消息列表渲染器',
          '权限弹窗容器',
        ],
        answer: '消息工作台总编排器',
        explanation: '它负责的是消息域的组织，而不只是列表渲染。',
      },
      {
        id: 'prompt-input-role',
        prompt: 'PromptInput 的关键特点是什么？',
        options: [
          '它是输入编排器，不是简单文本框。',
          '它只负责接收键盘输入。',
          '它只显示最近消息。',
        ],
        answer: '它是输入编排器，不是简单文本框。',
        explanation: '输入建议、快捷键、草稿和模式控制都属于它的职责范围。',
      },
    ],
  },
  {
    slug: 'platform',
    title: '平台控制面组件',
    category: 'components',
    status: 'ready',
    difficulty: '中等',
    estimatedMinutes: 20,
    summary: '聚焦 permissions、tasks、agents、mcp、teams 等平台控制面。',
    goal:
      '理解 Claude Code 为什么不是只有聊天区域，并能分辨这些控制面在系统中的职责。',
    plainExplanation:
      '这一页讲的是平台控制面，而不是消息流。permissions 负责审批，tasks 负责后台任务，agents 负责 agent 生命周期，mcp 负责外部连接，teams 负责协作，memory / skills / hooks / sandbox 则把知识、配置和安全控制放在同一层面上。',
    whyItMatters: [
      '它体现了平台控制面设计。',
      '它说明 Claude Code 不是“聊天工具 + 工具调用”，而是一个更完整的操作台。',
      '它帮助你理解平台能力应该如何分区，而不是全部混在聊天区。',
    ],
    keyPoints: [
      {
        title: 'permissions 是重控制面',
        summary: '审批 UI 是安全边界的可见化入口，不只是确认按钮。',
      },
      {
        title: 'tasks 是后台协作工作台',
        summary: '它把运行中的任务、队列和状态管理集中起来。',
      },
      {
        title: 'agents / teams / mcp 体现平台扩展面',
        summary: '生命周期管理、协作视图和外部服务管理都属于平台控制面。',
      },
      {
        title: 'memory / skills / hooks / sandbox 是配置与知识面板',
        summary: '这些不是“设置页装饰”，而是运行行为的关键入口。',
      },
    ],
    sourceRefs: [
      {
        label: 'analysis/components/03-platform-components.md',
        path: '../analysis/components/03-platform-components.md',
      },
    ],
    prerequisites: ['overview'],
    related: ['core-interaction', 'functions-platform'],
    projectMappings: [
      {
        targetLayer: 'Platform Control Plane',
        minimumImplementation: '把权限、任务、扩展和设置分区放在独立入口，不要挤进主聊天界面。',
        advancedImplementation: '再增加统一状态栏、弹层系统和可发现的控制中心。',
        whenToDelay: '如果还没有平台级功能，先不要强行做很多控制面。',
      },
      {
        targetLayer: 'Your Web Project',
        minimumImplementation: '如果以后要加审批、设置、外部连接，先设计控制面，不要直接塞到主页面。',
        advancedImplementation: '为权限、连接和任务建立统一的管理页。',
        whenToDelay: '当产品只是单页面工具时可以先不做。',
      },
    ],
    quiz: [
      {
        id: 'platform-role',
        prompt: '平台控制面和核心交互的区别是什么？',
        options: [
          '平台控制面负责权限、任务、扩展、配置等系统级入口。',
          '平台控制面只负责渲染聊天消息。',
          '平台控制面和输入框完全一样。',
        ],
        answer: '平台控制面负责权限、任务、扩展、配置等系统级入口。',
        explanation: '它和主聊天区分工不同，承担的是系统管理功能。',
      },
    ],
  },
  {
    slug: 'index',
    title: '组件索引',
    category: 'components',
    status: 'ready',
    difficulty: '基础',
    estimatedMinutes: 10,
    summary: '对照仓库中的组件索引与长尾组件分布。',
    goal: '便于检索与查阅，并理解组件目录是如何按功能族群分布的。',
    plainExplanation:
      '索引页不是“文件目录”，而是学习导航。它把工作台、输入基础件、检索弹层、展示辅助、恢复与远程、更新与提示等类别组织起来，帮助你用功能族群而不是文件树来理解组件。',
    whyItMatters: [
      '帮助快速查组件。',
      '帮助识别哪些是顶层入口，哪些是长尾辅助。',
      '帮助你在自己的项目里搭一个可检索的 UI 索引。',
    ],
    keyPoints: [
      {
        title: '按功能族群分组',
        summary: '组件索引按工作台、输入、弹层、展示、恢复、更新等族群看待。',
      },
      {
        title: '顶层与长尾分离',
        summary: '先记住入口组件，再按需深入长尾组件和子函数。',
      },
      {
        title: '索引本身就是学习工具',
        summary: '让人能从索引反查知识，不是简单的目录展示。',
      },
    ],
    sourceRefs: [
      {
        label: 'analysis/components/04-component-index.md',
        path: '../analysis/components/04-component-index.md',
      },
    ],
    prerequisites: ['overview'],
    related: ['core-interaction', 'platform'],
    projectMappings: [
      {
        targetLayer: 'Documentation Index',
        minimumImplementation: '给学习内容做索引页，按主题而不是按文件树展示。',
        advancedImplementation: '提供搜索、筛选和按状态浏览入口。',
        whenToDelay: '在内容很少时可以先用简单列表。',
      },
    ],
    quiz: [
      {
        id: 'index-purpose',
        prompt: '组件索引页最主要的价值是什么？',
        options: [
          '把组件按功能族群组织起来，方便检索与学习。',
          '只展示文件名。',
          '替代主学习模块。',
        ],
        answer: '把组件按功能族群组织起来，方便检索与学习。',
        explanation: '它是导航和理解入口，不只是目录。',
      },
    ],
  },
  {
    slug: 'functions-core',
    title: '核心组件函数级拆解',
    category: 'components',
    status: 'ready',
    difficulty: '进阶',
    estimatedMinutes: 20,
    summary: '函数级 walkthrough，聚焦 AppState、Messages、VirtualMessageList、MessageRow、PromptInput 等核心函数。',
    goal: '后续补充函数级阅读内容前，先让你知道这一页在讲什么：状态注入、消息裁剪、虚拟列表、行级编排与输入装配。',
    plainExplanation:
      '这一页是“把大组件拆成函数级零件”的入口。你不需要记住所有函数名字，但要明白它们分别负责状态注入、消息筛选、可视窗口、消息行和输入边界这些具体职责。',
    whyItMatters: [
      '保证组件区全量覆盖。',
      '帮助你从“会用组件”进阶到“会读实现”。',
      '让你知道复杂 UI 不是靠一个组件解决，而是靠一组小函数协作。',
    ],
    keyPoints: [
      {
        title: '根状态函数',
        summary: 'AppStateProvider 和状态 hook 决定状态从哪里来、怎么被读取。',
      },
      {
        title: '消息预处理函数',
        summary: 'filter、drop、slice、static render 等函数决定消息如何进入可见窗口。',
      },
      {
        title: '输入与脚注函数',
        summary: 'PromptInput 及其 footer/suggestion 函数决定输入编排细节。',
      },
    ],
    sourceRefs: [
      {
        label: 'analysis/components/05-function-level-core-walkthrough.md',
        path: '../analysis/components/05-function-level-core-walkthrough.md',
      },
    ],
    prerequisites: ['core-interaction'],
    related: ['overview', 'functions-platform', 'functions-leaf'],
    projectMappings: [
      {
        targetLayer: 'Implementation Reading',
        minimumImplementation: '读函数级内容时先按职责分组，不要按文件逐行死记。',
        advancedImplementation: '把关键函数抽成一张职责地图，方便后续复盘。',
        whenToDelay: '当你还没理解核心交互时，函数级可以先只看摘要。',
      },
      {
        targetLayer: 'Code Review Habit',
        minimumImplementation: '先识别状态入口、预处理入口和渲染入口，再决定阅读顺序。',
        advancedImplementation: '把每个函数标注成“状态/流程/渲染/辅助”四类之一，形成稳定复盘方法。',
        whenToDelay: '如果还在学习整体架构，不必一开始就追行号。',
      },
    ],
    quiz: [
      {
        id: 'core-function-role',
        prompt: '核心函数级拆解的学习重点是什么？',
        options: [
          '理解状态注入、消息预处理、虚拟列表和输入边界的职责拆分。',
          '记住所有函数的精确行号。',
          '只看 UI 样式。',
        ],
        answer: '理解状态注入、消息预处理、虚拟列表和输入边界的职责拆分。',
        explanation: '函数级学习是为了建立职责图，而不是背函数清单。',
      },
      {
        id: 'core-function-review',
        prompt: '读核心函数级内容时最有效的顺序是什么？',
        options: [
          '先看状态入口，再看消息预处理，最后看渲染和输入边界。',
          '从任意叶子函数开始，完全不看上下文。',
          '只看最短的函数。',
        ],
        answer: '先看状态入口，再看消息预处理，最后看渲染和输入边界。',
        explanation: '先建立职责分层，再看细节会更稳定。',
      },
    ],
  },
  {
    slug: 'functions-platform',
    title: '平台组件函数级拆解',
    category: 'components',
    status: 'ready',
    difficulty: '进阶',
    estimatedMinutes: 20,
    summary: '函数级 walkthrough，聚焦 permissions、tasks、agents、mcp、teams、memory、skills、hooks、sandbox 等控制面函数。',
    goal: '后续补充平台控制面函数阅读内容前，先让你理解这些函数分别对应哪类控制面。',
    plainExplanation:
      '这一页是平台控制面的函数地图。它讲的是审批 UI、任务列表、agent 菜单、MCP 设置、多 agent 协作、记忆选择、技能菜单、hooks 配置和 theme 对话框这些函数级组成部分。',
    whyItMatters: [
      '保证组件区全量覆盖。',
      '帮助你理解“控制面不是一个页面，而是一组专门函数”。',
      '让你在自己的项目里知道哪些配置入口该单独拆出来。',
    ],
    keyPoints: [
      {
        title: '审批函数',
        summary: 'permissionComponentForTool 和 PermissionRequest 体现审批链路的 UI 化。',
      },
      {
        title: '任务与团队函数',
        summary: '后台任务、agent 创建、协作切换函数体现平台管理能力。',
      },
      {
        title: '知识/配置函数',
        summary: 'memory、skills、hooks、design-system 的函数说明控制面与知识层的关系。',
      },
    ],
    sourceRefs: [
      {
        label: 'analysis/components/06-function-level-platform-walkthrough.md',
        path: '../analysis/components/06-function-level-platform-walkthrough.md',
      },
    ],
    prerequisites: ['platform'],
    related: ['platform', 'functions-core', 'functions-leaf'],
    projectMappings: [
      {
        targetLayer: 'Control Center Functions',
        minimumImplementation: '把审批、任务、配置、扩展等功能拆成清晰函数，不混进主消息流。',
        advancedImplementation: '为控制面函数建立统一交互模式和状态管理协议。',
        whenToDelay: '平台功能未出现前，不要提前过度抽象。',
      },
      {
        targetLayer: 'Admin Surface Design',
        minimumImplementation: '把高风险操作和常见设置分离，减少误触。',
        advancedImplementation: '为控制面函数配套统一状态、统一弹层和统一搜索入口。',
        whenToDelay: '当控制面还不多时，可以先用简单导航组织。',
      },
    ],
    quiz: [
      {
        id: 'platform-function-role',
        prompt: '平台函数级拆解主要应该帮助你理解什么？',
        options: [
          '审批、任务、agent、MCP、知识和配置入口各自对应哪些函数。',
          '页面背景色怎么设置。',
          '消息列表怎么分页。',
        ],
        answer: '审批、任务、agent、MCP、知识和配置入口各自对应哪些函数。',
        explanation: '平台函数级内容的目标是建立控制面的函数地图。',
      },
      {
        id: 'platform-function-order',
        prompt: '平台函数级拆解优先应该关注什么？',
        options: [
          '先看审批和任务入口，再看 agent、MCP 和知识配置函数。',
          '只看视觉样式函数。',
          '完全不区分职责。',
        ],
        answer: '先看审批和任务入口，再看 agent、MCP 和知识配置函数。',
        explanation: '平台控制面通常按风险和职责优先级组织。',
      },
    ],
  },
  {
    slug: 'functions-leaf',
    title: '叶子组件函数级拆解',
    category: 'components',
    status: 'ready',
    difficulty: '进阶',
    estimatedMinutes: 20,
    summary: '函数级 walkthrough，聚焦消息、提示、权限、MCP 和任务摘要类叶子函数。',
    goal: '后续补充叶子组件阅读内容前，先让你知道叶子层负责把单个展示单元做完整。',
    plainExplanation:
      '这一页讲的是最细粒度的 UI 叶子函数。它们通常负责单个消息类型、单个提示项、单个权限请求、单个任务摘要或单个状态徽标的渲染和行为。',
    whyItMatters: [
      '保证组件区全量覆盖。',
      '帮助你理解“页面不是只有大组件，细粒度函数也承担交互语义”。',
      '让你在实现自己的项目时知道哪些是可复用叶子单元。',
    ],
    keyPoints: [
      {
        title: '消息叶子函数',
        summary: 'AssistantTextMessage、AssistantToolUseMessage、UserToolResultMessage 等负责消息类型细分。',
      },
      {
        title: '提示叶子函数',
        summary: 'PromptInputFooter、SuggestionItemRow、BridgeStatusIndicator 负责提示区和状态区。',
      },
      {
        title: '权限与任务叶子函数',
        summary: 'BashPermissionRequest、FileEditPermissionRequest、BackgroundTask 等负责具体交互片段。',
      },
    ],
    sourceRefs: [
      {
        label: 'analysis/components/07-function-level-leaf-walkthrough.md',
        path: '../analysis/components/07-function-level-leaf-walkthrough.md',
      },
    ],
    prerequisites: ['overview'],
    related: ['core-interaction', 'functions-core', 'functions-platform'],
    projectMappings: [
      {
        targetLayer: 'Leaf UI Components',
        minimumImplementation: '把每种消息或状态单独封装成可复用叶子组件。',
        advancedImplementation: '再补统一样式、统一状态和统一交互辅助。',
        whenToDelay: '在消息类型很少时先别过度拆分。',
      },
      {
        targetLayer: 'Reusable UI Primitives',
        minimumImplementation: '把高频出现的小状态、小徽标、小消息块做成通用单元。',
        advancedImplementation: '把这些叶子单元和状态机对接，减少重复模板代码。',
        whenToDelay: '当页面只包含少量静态内容时，可以先不拆到这么细。',
      },
    ],
    quiz: [
      {
        id: 'leaf-function-role',
        prompt: '叶子组件函数级拆解的重点是什么？',
        options: [
          '理解单个消息、提示、权限请求或任务摘要是怎么渲染的。',
          '只看父组件布局。',
          '记住所有长尾目录名。',
        ],
        answer: '理解单个消息、提示、权限请求或任务摘要是怎么渲染的。',
        explanation: '叶子层关注的是最细粒度的展示和交互单元。',
      },
      {
        id: 'leaf-function-value',
        prompt: '叶子层函数拆解最大的价值是什么？',
        options: [
          '把可复用的最小展示单元梳理清楚。',
          '替代所有父组件。',
          '让页面只剩一层。',
        ],
        answer: '把可复用的最小展示单元梳理清楚。',
        explanation: '叶子层帮助你沉淀小而稳定的 UI 原子。',
      },
    ],
  },
]

export const componentModulesBySlug = Object.fromEntries(
  componentModules.map(module => [module.slug, module]),
) as Record<string, LearningModule>
