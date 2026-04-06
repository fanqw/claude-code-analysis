---
name: orchestrator-openspec
description: 当一个主代理需要对中大型交付任务负最终责任时使用。该 skill 强制主代理按阶段门禁推进，并通过 OpenSpec 的原生命令与 change/spec 工件做 SDD 驱动，不允许子代理绕过规格直接自由发挥。
---

# 主代理编排 + OpenSpec SDD

如果需要先找“当前问题对应哪份材料”，先看 [references/reference-routing.md](references/reference-routing.md)。

这个 skill 用于一种明确的工作方式：

- 主代理负责目标锁定、方案裁定、任务拆分、资源调度、结果验收、归档总结
- 子代理只负责局部任务，不负责全局决策
- 中大型变更使用 OpenSpec 原生能力
- 规格先于实现，验收必须回到规格

如果需要先理解这套 skill 的系统级能力，再进入规则细节，先看 [references/capability-model.md](references/capability-model.md)。

## 何时使用

满足任一条件时启用：

- 任务跨 3 个以上文件
- 任务跨 2 个以上子系统
- 需要多个子代理并行
- 需要先讨论方案再实施
- 预期会有多轮返工或多轮验收
- 涉及 UX、接口、架构、流程或长期规则变化

小型、单文件、直接可做的任务不要使用这个 skill。

## 主代理职责

主代理是唯一最终责任人。

主代理必须负责：

- 用一句话锁定目标
- 明确成功标准、范围、约束
- 判断是否进入 OpenSpec 流程
- 决定先做什么、后做什么、哪些可并行
- 根据规格派发子代理任务
- 审核所有子代理结果
- 触发独立验证
- 必要时亲自下场复核
- 记录证据链和轮次总结

子代理不得决定全局方向。

## 六项核心能力

这套 skill 的内核不是“多开几个子代理”，而是六项系统能力：

- 统一执行内核
- 规格先于执行
- 权限与裁定门禁
- 长任务上下文治理
- 协议化扩展与角色接入
- 证据驱动验收与可追溯性

完整说明见 [references/capability-model.md](references/capability-model.md)。
如果想看每项能力当前由哪些资产承载、成熟度如何，再看 [references/capability-coverage.md](references/capability-coverage.md)。
如果需要先把本轮唯一目标写稳定，再看 [references/goal-freeze-template.md](references/goal-freeze-template.md)。

## 六阶段门禁

严格按这六个阶段推进：

1. `Intent Lock`
2. `Solution Exploration`
3. `Decision & Brief Freeze`
4. `Parallel Execution`
5. `Acceptance & Verification`
6. `Archive & Reporting`

详细门禁见 [references/phase-gates.md](references/phase-gates.md)。
如果阶段切换失败，回退规则见 [references/stage-rollback-rules.md](references/stage-rollback-rules.md)。

## OpenSpec 原生规则

这个 skill 不自己发明 OpenSpec 模板，不复制一套伪 OpenSpec 流程。  
规格驱动能力一律使用 OpenSpec 原生命令，即 `opsx:*` 工作流与 `openspec` CLI。

### 前置条件

在使用任何 `opsx:*` 命令前，主代理必须先确认：

1. 已安装 OpenSpec
2. 当前项目已执行 `openspec init`
3. 当前环境已完成 `openspec artifact-experimental-setup`
4. 如有需要，已执行 `openspec update`

如果任一前置条件未完成，先补前置条件，再进入规格阶段。

### 前置条件检查顺序

主代理先检查：

- `openspec --version`
- 仓库根目录是否存在 `openspec/`
- 当前环境是否能使用 `opsx:*` 命令

如果缺失，按这个顺序处理：

1. 安装 OpenSpec CLI
2. 在目标仓库执行 `openspec init`
3. 执行 `openspec artifact-experimental-setup`
4. 执行 `openspec update`
5. 再进入 `opsx:*` 工作流

### 使用原则

中大型变更中，主代理应优先通过原生命令驱动规格过程，例如：

- 用 `opsx:*` 创建或推进 change
- 用 OpenSpec 原生 change / design / tasks / spec delta 流程
- 用 OpenSpec 工件作为子代理派单和验收回链来源

主代理不能跳过 OpenSpec 规格而直接派发 Builder，除非当前任务被判定为轻量任务。
轻量任务与中大型任务的边界案例见 [references/lightweight-task-boundaries.md](references/lightweight-task-boundaries.md)。

## 子代理角色

只使用这三类标准角色：

- `builder`
- `explorer`
- `verifier`

详细角色定义见 [references/subagent-roles.md](references/subagent-roles.md)。
子代理启动、可见性和关闭规则见 [references/subagent-lifecycle.md](references/subagent-lifecycle.md)。
如果需要判断是新增角色还是扩现有角色，先看 [references/role-admission-rules.md](references/role-admission-rules.md)。

## 模型选择权

主代理在创建子代理时，可以为不同任务选择不同模型。

模型选择必须由主代理基于以下因素决定：

- 任务复杂度
- 是否处于关键路径
- 是否只读还是会写入
- 是否需要大上下文理解
- 交付速度与成本权衡

详细策略见 [references/model-selection.md](references/model-selection.md)。

职责边界：

- Builder 只实现，不宣布整体完成
- Explorer 只读探索，不代替主代理裁定
- Verifier 只做技术验证
- 只有主代理可以最终接受或驳回

绝不能外包给子代理的决定见 [references/non-delegable-decisions.md](references/non-delegable-decisions.md)。

## 子代理生命周期

默认规则：

- 有任务时启动
- `accepted` 后默认关闭
- 只有明确存在下一项紧接任务时，才短暂保留

主代理不能让空闲子代理长期占用名额。

另外，主代理在创建子代理后，必须向用户显式说明：

- 子代理角色
- 子代理可识别名称
- 它当前负责的任务范围

不要让子代理变成黑盒。

如果需要统一用户提示写法，使用 [references/subagent-announcement-templates.md](references/subagent-announcement-templates.md)。

## 派单规则

主代理派单必须来自当前 OpenSpec 任务工件，而不是纯口头自由 briefing。

每个任务包至少要明确：

- 任务名
- 负责人角色
- 写入范围
- 前置依赖
- 预期产物
- 验收条件
- 是否可并行

OpenSpec 任务工件里的字段要求和审查方式见 [references/opsx-audit-guide.md](references/opsx-audit-guide.md)。

如果需要直接生成派单内容，使用 [prompts](prompts) 目录下的标准模板：

- `builder.md`
- `explorer.md`
- `verifier.md`

如果需要派单剧本、实例、阶段检查项或派单骨架，统一从 [references/reference-routing.md](references/reference-routing.md) 进入。

如果当前任务包含 UI / UX / 内容引导类改动，先看 [references/ui-iteration-rubric.md](references/ui-iteration-rubric.md)。
如果当前任务跨多轮推进，先看 [references/context-governance.md](references/context-governance.md)。
如果需要统一续接记录，先看 [references/context-governance.md](references/context-governance.md) 与 [references/context-packet-template.md](references/context-packet-template.md)。

## 验收规则

不能因为子代理说“完成了”就接受。

主代理验收至少检查：

1. 是否符合最初目标
2. 是否符合当前规格
3. 是否完成任务包要求
4. 是否有证据回链
5. 是否通过独立验证

只允许三种裁定：

- `accepted`
- `revise`
- `blocked`

被接受的子代理进入挂起状态，等待后续任务或关闭。

如果需要统一验收口径、驳回写法和证据要求，优先查阅 [references/acceptance-patterns.md](references/acceptance-patterns.md)。
如果需要验收骨架或相关辅助材料，统一从 [references/reference-routing.md](references/reference-routing.md) 进入。
如果需要统一证据记录与收口判断，先看 [references/evidence-records.md](references/evidence-records.md)。

如果当前任务需要本地预览或页面验证，优先查阅 [references/frontend-preview-checks.md](references/frontend-preview-checks.md)。

## 证据优先级

默认按低成本证据优先：

1. 路由、文案、链接、DOM、diff
2. class、布局、滚动区、宽度约束
3. build、start、curl、测试
4. 局部截图
5. 整页截图

截图不是默认输入。只有视觉问题才使用，而且优先局部截图。

前端任务默认先查端口、再决定是否复用旧服务；如果不确定是否为最新产物，直接换新端口验证。

## 每轮必须留存的最小证据链

每轮至少要能指出：

- 当前 change 或规格入口
- 当前任务包来源
- 验收结果
- 轮次总结
- 当前验证目标或预览地址

如果需要把当前轮标准化桥接到下一轮，使用：

- [references/context-packet-template.md](references/context-packet-template.md)
- `scripts/generate-context-packet.sh`

这个 skill 负责主代理编排方法，不负责替代 OpenSpec 本身的文档系统。
