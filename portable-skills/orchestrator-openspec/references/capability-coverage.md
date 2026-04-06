# 能力覆盖图

这份文档回答两个问题：

- 六项核心能力当前分别由哪些资产承载
- 哪些能力已经相对成熟，哪些仍处于第一版

它不重复能力定义，也不替代具体规则文档。  
如果先理解能力本身，先看 [capability-model.md](capability-model.md)。

## 使用方式

这份覆盖图应被保留。

保留原因：

- 它是能力仪表盘，不是规则手册
- 它能快速说明“当前已有能力”和“下一步最值得补什么”
- 它能防止后续继续无差别堆材料

这份覆盖图适合在两种情况下使用：

- 想判断这套 skill 目前“已经具备什么”
- 想判断下一步应该补哪一层，而不是继续横向加材料

成熟度只用于帮助判断优先级：

- `基础覆盖`：已经有规则，但还偏原则层
- `可稳定使用`：已有规则、入口和操作面，能稳定落地
- `需要继续补强`：已有起点，但仍有明显缺口

## 1. 统一执行内核

当前承载资产：

- [../SKILL.md](../SKILL.md)
- [phase-gates.md](phase-gates.md)
- [main-agent-checklists.md](main-agent-checklists.md)
- [dispatch-playbooks.md](dispatch-playbooks.md)
- [goal-freeze-template.md](goal-freeze-template.md)
- [stage-rollback-rules.md](stage-rollback-rules.md)

当前状态：

- `可稳定使用`

已经具备：

- 单一主代理负责制
- 六阶段状态机
- 每轮唯一目标
- 派单、验收、归档都回到统一主链

当前收敛结论：

- 已补齐标准输出骨架与阶段回退规则

## 2. 规格先于执行

当前承载资产：

- [../SKILL.md](../SKILL.md)
- [opsx-examples.md](opsx-examples.md)
- [opsx-audit-guide.md](opsx-audit-guide.md)
- [phase-gates.md](phase-gates.md)
- [lightweight-task-boundaries.md](lightweight-task-boundaries.md)

当前状态：

- `可稳定使用`

已经具备：

- 中大型任务进入 OpenSpec 原生流程
- `proposal / design / tasks` 门禁
- builder 不得绕过规格直接开始

当前收敛结论：

- 已补边界案例；后续只在出现真实边界争议时再补反例

## 3. 权限与裁定门禁

当前承载资产：

- [../SKILL.md](../SKILL.md)
- [subagent-roles.md](subagent-roles.md)
- [acceptance-patterns.md](acceptance-patterns.md)
- [dispatch-playbooks.md](dispatch-playbooks.md)
- [non-delegable-decisions.md](non-delegable-decisions.md)

当前状态：

- `可稳定使用`

已经具备：

- 只有主代理能做最终裁定
- 子代理不得决定全局方向
- `accepted / revise / blocked` 三种标准裁定
- 关键冲突回到主代理亲自复核

当前收敛结论：

- 已补不可外包决定与关键路径升级规则

## 4. 长任务上下文治理

当前承载资产：

- [capability-model.md](capability-model.md)
- [context-governance.md](context-governance.md)
- [main-agent-checklists.md](main-agent-checklists.md)
- [acceptance-patterns.md](acceptance-patterns.md)
- [subagent-lifecycle.md](subagent-lifecycle.md)
- [context-packet-template.md](context-packet-template.md)
- `../scripts/generate-context-packet.sh`

当前状态：

- `可稳定使用`

已经具备：

- 每轮唯一目标
- 最小证据链
- 轮次总结
- 子代理生命周期收口
- 上下文保留与压缩原则
- 上下文失效判定
- 失效后的强制回退规则
- 统一上下文包脚手架

当前缺口：

- 长轮次切换仍较依赖主代理纪律

优先补强方向：

- 已补统一上下文包脚手架；后续只在出现真实失焦案例时补恢复实例

## 5. 协议化扩展与角色接入

当前承载资产：

- [subagent-roles.md](subagent-roles.md)
- [model-selection.md](model-selection.md)
- [dispatch-playbooks.md](dispatch-playbooks.md)
- [subagent-lifecycle.md](subagent-lifecycle.md)
- [subagent-announcement-templates.md](subagent-announcement-templates.md)
- [role-admission-rules.md](role-admission-rules.md)
- [../prompts](../prompts)
- [../scripts](../scripts)

当前状态：

- `可稳定使用`

已经具备：

- 固定角色协议
- 固定生命周期规则
- 固定用户可见公告规则
- 固定 prompt 模板
- 固定派单/验收脚本入口

当前收敛结论：

- 已补角色准入与扩展规则

## 6. 证据驱动验收与可追溯性

当前承载资产：

- [acceptance-patterns.md](acceptance-patterns.md)
- [frontend-preview-checks.md](frontend-preview-checks.md)
- [opsx-audit-guide.md](opsx-audit-guide.md)
- [main-agent-checklists.md](main-agent-checklists.md)
- [evidence-records.md](evidence-records.md)

当前状态：

- `可稳定使用`

已经具备：

- 证据优先级
- 独立验证要求
- 验收回链到规格、任务、验证和总结
- 前端预览防污染检查

当前收敛结论：

- 已补统一证据记录模板与收口判定短清单

## 当前整体判断

如果把这套 skill 当作一个系统来看：

- `统一执行内核`：已经立住
- `规格先于执行`：已经立住
- `权限与裁定门禁`：已经立住
- `长任务上下文治理`：已进入可稳定使用，但仍最值得继续自动化
- `协议化扩展与角色接入`：已经立住
- `证据驱动验收与可追溯性`：已经立住

## 当前结论

这份覆盖图现在应继续保留，但不再作为“待补清单”使用，而应作为：

- 能力状态面板
- 后续新增能力时的收口检查点
- 判断是否继续扩展或应停止扩展的依据
