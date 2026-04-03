# Claude Code 全量学习指引项目规格说明

## 1. 项目目标

本项目是一个独立的交互式学习站，目标不是简单展示 `claude-code-analysis` 仓库中的分析资料，而是把这些资料重构成一套可以真正帮助学习者掌握 Claude Code 设计思想、实现机制与工程落地方式的学习产品。

项目的核心目标有三层：

1. 让学习者完整理解 Claude Code 的系统结构，不遗漏关键知识点。
2. 让学习者能复述关键运行链路，包括入口、执行、权限、上下文、持久化与扩展。
3. 让学习者能把这些能力映射到自己的 Web 项目中，知道第一版该做什么、不该做什么。

## 2. 范围定义

### 2.1 全量覆盖边界

“无遗漏”以当前仓库已有资料为边界，必须覆盖：

- `README.md` 中列出的全部专题章节
- `analysis/` 下的全部专题分析文档
- `analysis/components/` 下的全部组件分析文档
- 与专题直接相关的 `src/` / `源码/` 关键模块映射

### 2.2 不在第一版范围内的内容

第一版不做以下内容：

- 真实模型 API 接入
- 真实工具执行
- Claude Code 功能复刻
- 在线多人协作
- 服务端账户系统

## 3. 用户与使用场景

### 3.1 目标用户

当前版本面向单一学习者本人使用，因此内容表达优先保证理解与迁移，而不是追求公共产品式的泛化包装。

### 3.2 使用场景

- 系统学习 Claude Code 的总体架构
- 逐章学习 Tool、Prompt、Context、Memory、MCP、Sandbox、Multi-Agent 等核心能力
- 按调用链理解“一个请求在系统里如何流转”
- 回看具体知识点并做自测
- 将某项机制映射到自己的 Web 项目设计中

## 4. 设计原则

### 4.1 教学原则

- 全量覆盖，但不平铺堆文档
- 白话优先，再补术语和源码定位
- 先解释“为什么”，再解释“怎么做”
- 每个核心主题必须给出迁移建议
- 每章都要能验证是否真正学会

### 4.2 产品原则

- 内容和界面解耦
- 章节、知识点、调用链、练习题都结构化建模
- 优先支持顺序学习，同时允许自由跳转
- 移动端可读，桌面端适合长时间学习
- 第一版不依赖后端

### 4.3 工程原则

- 使用 `Next.js` App Router 搭建独立项目
- 内容采用本地结构化数据驱动，而不是把 Markdown 原文直接贴进页面
- UI 尽量朴素、稳定、信息清楚
- 允许后续逐步补充章节，而不重写框架

## 5. 知识架构

学习站的内容不能直接照着仓库目录展示，而应按学习路径重组为六个区块。

### 5.1 A 区：全局认知

目标：先让学习者形成 Claude Code 的整体地图。

包含内容：

- 项目首页
- 学习地图
- 术语速览
- 总体架构与程序入口
- 主运行链路概览

### 5.2 B 区：主系统机制

目标：系统掌握核心能力。

包含专题：

- 安全与隐私总览
- Agent Memory
- Tool Call
- Skills
- MCP
- Sandbox
- Context Management
- Prompt Management
- Multi-Agent
- Session Storage / Resume

### 5.3 C 区：运行链路演示

目标：把静态知识变成动态理解。

包含演示：

- 用户输入进入系统
- `tool_use -> tool_result -> 下一轮回流`
- 权限系统如何介入工具调用
- Sandbox 决策如何生效
- Session 如何落盘与恢复
- Multi-Agent 如何分流与协作

### 5.4 D 区：UI 与控制面

目标：理解 TUI / REPL 的界面组织与控制面设计。

包含内容：

- 组件总览
- 核心交互组件
- 平台控制面组件
- 函数级 walkthrough

### 5.5 E 区：风险与产品判断

目标：理解该系统的治理面、产品面与外部对比。

包含内容：

- 用户信息接触面
- 风险点与攻击路径
- 防范性安全措施
- hidden features 与额外发现
- 负面关键词与挫败感信号
- 与 Codex / Gemini CLI / Aider / Cursor 的对比
- 总体优点与代价

### 5.6 F 区：你的项目怎么做

目标：把学习内容迁移到自己的 Web 项目。

包含内容：

- Web 项目中的最小 Agent 架构
- 模块映射关系
- 第一版该实现什么
- 第二阶段再做什么
- 哪些机制暂时只需理解，不建议立即实现

## 6. 知识覆盖矩阵

所有仓库章节需要映射到学习站中，不允许悬空。

| 仓库资料 | 学习站归属 | 页面类型 |
| --- | --- | --- |
| `analysis/01-architecture-overview.md` | A 区 | 专题页 |
| `analysis/02-security-analysis.md` | E 区 | 专题页 |
| `analysis/02-user-data-and-usage.md` | E 区 | 知识卡组 |
| `analysis/03-privacy-avoidance.md` | E 区 | 知识卡组 |
| `analysis/04-agent-memory.md` | B 区 | 专题页 |
| `analysis/04b-tool-call-implementation.md` | B 区 + C 区 | 专题页 + 调用链页 |
| `analysis/04c-skills-implementation.md` | B 区 | 专题页 |
| `analysis/04d-mcp-implementation.md` | B 区 | 专题页 |
| `analysis/04e-sandbox-implementation.md` | B 区 + C 区 | 专题页 + 调用链页 |
| `analysis/04f-context-management.md` | B 区 | 专题页 |
| `analysis/04g-prompt-management.md` | B 区 | 专题页 |
| `analysis/04h-multi-agent.md` | B 区 + C 区 | 专题页 + 调用链页 |
| `analysis/04i-session-storage-resume.md` | B 区 + C 区 | 专题页 + 调用链页 |
| `analysis/05-differentiators-and-comparison.md` | E 区 | 专题页 |
| `analysis/06-extra-findings.md` | E 区 | 知识卡组 |
| `analysis/06b-negative-keyword-analysis.md` | E 区 | 专题页 |
| `analysis/07-code-evidence-index.md` | A 区 + 全站引用 | 索引页 |
| `analysis/08-competitive-comparison.md` | E 区 | 专题页 |
| `analysis/08-reference-comparison-sources.md` | E 区 | 附录页 |
| `analysis/09-final-summary.md` | 首页 + 总复盘 | 总结页 |
| `analysis/10-src-file-tree.md` | A 区 | 索引页 |
| `analysis/11-hidden-features-and-easter-eggs.md` | E 区 | 专题页 |
| `analysis/components/*` | D 区 | 专题页 / 知识卡组 |

### 6.1 覆盖状态规则

为保证“全量入口先齐，再逐步补深度”，每个模块必须有明确状态：

- `ready`
  - 已有完整内容、知识点、练习题和映射建议
- `seeded`
  - 已有简介、来源、核心结论、后续补充方向
- `planned`
  - 已出现在地图和目录中，但只有占位说明

规则如下：

- 首页和学习地图中必须能看到全部模块
- 第一轮开发中，所有模块至少达到 `planned`
- 核心模块优先达到 `ready`
- 非核心模块至少达到 `seeded`

### 6.2 核心模块定义

以下模块属于第一批必须做深的核心模块：

- Architecture
- Tool Call
- Prompt Management
- Context Management
- Sandbox / Permission
- Session Storage / Resume
- Agent Memory
- MCP
- Skills
- Multi-Agent

这些模块决定学习者能否建立完整系统认知，因此不能只留目录占位。

### 6.3 非核心但必须入图的模块

以下模块第一轮允许以 `seeded` 形态存在，但必须有入口：

- Security / Privacy
- Differentiators
- Extra Findings
- Negative Signals
- Hidden Features
- Competitive Comparison
- Components 全系列
- Code Evidence Index
- Src File Tree

## 7. 章节模板

每个专题页都采用统一结构，保证学习体验稳定。

### 7.1 专题页结构

1. 这一章回答什么问题
2. 白话解释
3. 核心模块与源码映射
4. 关键调用链或结构图
5. 设计动机
6. 优点与代价
7. 常见误解
8. 在自己的项目里怎么做
9. 本章练习
10. 相关章节

### 7.2 知识卡结构

1. 结论
2. 解释
3. 对应文件
4. 为什么重要
5. 迁移建议

### 7.3 调用链页结构

1. 场景说明
2. 前置条件
3. 步骤演示
4. 关键决策点
5. 容易误解的地方
6. 迁移到 Web 项目的最小版本

## 8. 页面清单

### 8.1 全局页面

- `/`
- `/map`
- `/glossary`
- `/review`
- `/sources`

### 8.2 主题页面

- `/learn/architecture`
- `/learn/security`
- `/learn/agent-memory`
- `/learn/tool-call`
- `/learn/skills`
- `/learn/mcp`
- `/learn/sandbox`
- `/learn/context`
- `/learn/prompt`
- `/learn/multi-agent`
- `/learn/session-storage`
- `/learn/differentiators`
- `/learn/extra-findings`
- `/learn/negative-signals`
- `/learn/hidden-features`
- `/learn/competition`

### 8.3 组件页面

- `/components/overview`
- `/components/core-interaction`
- `/components/platform`
- `/components/index`
- `/components/functions-core`
- `/components/functions-platform`
- `/components/functions-leaf`

### 8.4 演示页面

- `/flows/runtime-overview`
- `/flows/tool-call`
- `/flows/permissions-and-sandbox`
- `/flows/session-resume`
- `/flows/multi-agent`

### 8.5 落地页面

- `/build/web-agent-overview`
- `/build/minimum-architecture`
- `/build/module-mapping`
- `/build/roadmap`

## 8.6 推荐学习顺序

默认推荐顺序如下：

1. Architecture
2. Tool Call
3. Prompt Management
4. Context Management
5. Session Storage / Resume
6. Agent Memory
7. Sandbox / Permission
8. MCP
9. Skills
10. Multi-Agent
11. Security / Privacy
12. Components
13. Differentiators / Competition / Extra Findings
14. Build Your Own Web Agent

这个顺序的原则是先建立执行主链，再理解长会话与治理，再看扩展与复杂协作，最后进入产品判断与自我落地。

## 9. 交互设计

### 9.1 首页

首页承担四个任务：

- 解释这个学习站是什么
- 显示完整学习范围
- 给出推荐学习路径
- 展示当前学习进度

首页区块：

- Hero 简介
- 学习路线图
- 全量知识覆盖说明
- 六大知识区入口
- 推荐先学章节
- 最近学习记录

### 9.2 学习地图

学习地图需要展示：

- 所有章节
- 章节之间的依赖关系
- 当前完成度
- 推荐路径和自由探索入口

### 9.3 调用链演示器

调用链演示器按 step-by-step 方式展示：

- 当前步骤标题
- 输入与输出
- 涉及模块
- 当前步骤的设计原因
- 如果迁移到你自己的项目，最小实现是什么

### 9.4 练习系统

题目类型：

- 单选题
- 判断题
- 调用链排序题
- “这个模块解决什么问题”匹配题

每题必须有解析，不允许只有对错。

### 9.5 进度系统

本地存储：

- 已学习章节
- 练习结果
- 收藏知识点
- 薄弱点

## 10. 内容模型

所有页面都由结构化内容驱动。

### 10.1 `LearningModule`

- `id`
- `title`
- `category`
- `summary`
- `goal`
- `difficulty`
- `estimatedMinutes`
- `status`
- `prerequisites`
- `knowledgePointIds`
- `flowIds`
- `quizIds`
- `sourceRefs`
- `projectMappingIds`

### 10.2 `KnowledgePoint`

- `id`
- `moduleId`
- `title`
- `summary`
- `plainExplanation`
- `technicalExplanation`
- `designReason`
- `tradeoffs`
- `commonMistakes`
- `sourceRefs`
- `projectMappingIds`

### 10.3 `FlowDiagram`

- `id`
- `title`
- `summary`
- `steps`
- `relatedModuleIds`
- `sourceRefs`

### 10.4 `QuizQuestion`

- `id`
- `moduleId`
- `type`
- `prompt`
- `options`
- `answer`
- `explanation`

### 10.5 `ProjectMapping`

- `id`
- `topic`
- `targetLayer`
- `minimumImplementation`
- `advancedImplementation`
- `antiPatterns`
- `whenToDelay`

### 10.6 `SourceReference`

- `label`
- `path`
- `section`
- `note`

## 11. 你自己的 Web 项目映射

学习站里不能只讲 Claude Code 本身，还要明确迁移路径。

### 11.1 推荐的最小 Web Agent 架构

- `Chat Orchestrator`
- `Prompt Builder`
- `Tool Registry`
- `Permission Layer`
- `Context Manager`
- `Session Store`
- `Extension Gateway`

### 11.2 迁移优先级

必须先做：

- 基础聊天链路
- Prompt 组装
- Tool 注册与调用
- 基础权限控制
- Session 持久化

第二阶段再做：

- Context 压缩
- Memory 提取
- MCP 扩展
- 更细粒度权限策略

理解即可，暂不建议直接实现：

- 完整 Multi-Agent runtime
- 复杂 Swarm 协作
- 高度工程化的 transcript hydrate/recovery

## 12. 视觉与体验方向

### 12.1 风格

- 中文为主，保留关键英文术语
- 信息密度高，但布局清楚
- 不追求花哨动效
- 重点突出结构、关系与状态

### 12.2 视觉元素

- 学习地图
- 分层架构图
- 流程步骤图
- 模块关系卡片
- 章节掌握度标记

## 13. 项目结构建议

```text
learning-guide/
  app/
    page.tsx
    map/page.tsx
    glossary/page.tsx
    review/page.tsx
    sources/page.tsx
    learn/[slug]/page.tsx
    components/[slug]/page.tsx
    flows/[slug]/page.tsx
    build/[slug]/page.tsx
  components/
    layout/
    learning/
    diagrams/
    quiz/
    review/
  content/
    modules.ts
    knowledge-points.ts
    flows.ts
    quizzes.ts
    project-mappings.ts
    sources.ts
  lib/
    content/
    progress/
    taxonomy/
  public/
  package.json
  tsconfig.json
  next.config.js
```

## 14. 开发顺序

### 14.1 第一阶段

- 搭建 Next.js 项目骨架
- 建立全局布局
- 建立内容数据结构
- 接入首页、学习地图、主题页通用模板

### 14.2 第二阶段

- 先填入首页
- 先填入学习地图
- 完成架构总览、Tool Call、Prompt、Context、Sandbox、Session Storage 六个核心专题

### 14.3 第三阶段

- 补充 Skills、MCP、Multi-Agent、Security
- 补充组件分析区
- 补充竞品和额外发现区

### 14.4 第四阶段

- 完成落地区
- 完成练习系统
- 完成复习页与本地进度

## 15. 内容生产流程

为避免后续补内容时风格漂移，每个模块都按同一流程生产：

1. 从 `analysis/` 或 `analysis/components/` 中确定来源文档
2. 提炼该模块要回答的核心问题
3. 拆成若干 `KnowledgePoint`
4. 抽出 1 到 3 条关键调用链或结构图
5. 为每个模块补“你自己的 Web 项目怎么做”
6. 设计最少 3 题练习
7. 标记该模块状态为 `planned` / `seeded` / `ready`

## 16. 质量标准

### 15.1 完整性标准

- `README` 列出的每一章必须有映射
- 每个大主题至少有一个专题页
- 每个核心机制至少有一个调用链页或结构图
- 每个专题都有项目落地建议

### 15.2 可学性标准

- 每页开头说明“学完会什么”
- 每页末尾有复盘
- 每章有练习题
- 复杂概念必须有白话解释

### 15.3 可维护性标准

- 内容和展示分离
- 新增章节时不需要重写页面组件
- 页面能根据内容模型自动渲染大部分信息块

## 17. 风险与应对

### 16.1 风险：内容过大，页面失控

应对：

- 大章拆专题页
- 专题页拆知识卡
- 用学习地图和关联跳转串起来

### 16.2 风险：全量覆盖导致学习负担过重

应对：

- 给出推荐顺序
- 标记难度
- 标记“必须掌握 / 建议了解 / 延伸阅读”

### 16.3 风险：落地建议过度设计

应对：

- 明确区分最小实现与高级实现
- 每个机制都给出“何时不该做”

## 18. 验收清单

- 是否所有仓库章节都有入口
- 是否每个核心机制都有白话解释
- 是否每个核心机制都有源码映射
- 是否每个核心机制都有落地建议
- 是否已有学习地图
- 是否已有练习系统基础
- 是否已有至少一个完整调用链演示
- 是否已明确你的 Web 项目最小原型架构

## 19. 当前实施决定

基于现阶段目标，第一轮开发直接做以下产物：

- 独立学习站目录 `learning-guide/`
- 结构化内容模型
- 首页
- 学习地图
- 章节页基础模板
- 先录入代表性核心模块内容
- 文档中已定义的全量章节入口占位

这样可以先把“全量知识框架”搭起来，再逐步补齐章节内容，而不会在初期就陷入页面零散和结构失控。

## 20. 自查结论

本规格在当前阶段已经满足开发前要求：

- 已定义全量覆盖边界
- 已定义模块状态策略，避免“全量”流于口号
- 已定义页面清单、内容模型和推荐学习顺序
- 已定义落地映射方式和最小 Web Agent 架构
- 已定义开发顺序和内容生产流程

因此可以进入原型开发阶段。后续新增内容应优先遵守本规格，而不是临时增页或临时改结构。
