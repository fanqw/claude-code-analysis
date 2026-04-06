# orchestrator-openspec 收口审计

## 总判断

当前 `orchestrator-openspec` 已具备完整主链能力，但体量已经超过“轻量 skill”的舒适区。

当前规模：

- skill 主体文件总量：35 个
- 文档总行数：约 3662 行

收口目标不应是“削弱能力”，而应是：

- 保住主链
- 减少默认阅读面
- 把非日常执行资产外移或降级为备查资产

## 一、必留

这些资产直接构成 skill 主链，收口时不建议删除。

### 主协议

- [`SKILL.md`](/Users/fanqw/Documents/Program/claude-code-analysis/.codex/skills/orchestrator-openspec/SKILL.md)

### 核心执行链

- [`references/core/phase-gates.md`](/Users/fanqw/Documents/Program/claude-code-analysis/.codex/skills/orchestrator-openspec/references/core/phase-gates.md)
- [`references/core/main-agent-checklists.md`](/Users/fanqw/Documents/Program/claude-code-analysis/.codex/skills/orchestrator-openspec/references/core/main-agent-checklists.md)
- [`references/core/dispatch-playbooks.md`](/Users/fanqw/Documents/Program/claude-code-analysis/.codex/skills/orchestrator-openspec/references/core/dispatch-playbooks.md)
- [`references/core/acceptance-patterns.md`](/Users/fanqw/Documents/Program/claude-code-analysis/.codex/skills/orchestrator-openspec/references/core/acceptance-patterns.md)
- [`references/core/subagent-roles.md`](/Users/fanqw/Documents/Program/claude-code-analysis/.codex/skills/orchestrator-openspec/references/core/subagent-roles.md)
- [`references/core/reference-routing.md`](/Users/fanqw/Documents/Program/claude-code-analysis/.codex/skills/orchestrator-openspec/references/core/reference-routing.md)

### 最小执行骨架

- [`prompts/builder.md`](/Users/fanqw/Documents/Program/claude-code-analysis/.codex/skills/orchestrator-openspec/prompts/builder.md)
- [`prompts/explorer.md`](/Users/fanqw/Documents/Program/claude-code-analysis/.codex/skills/orchestrator-openspec/prompts/explorer.md)
- [`prompts/verifier.md`](/Users/fanqw/Documents/Program/claude-code-analysis/.codex/skills/orchestrator-openspec/prompts/verifier.md)
- [`scripts/generate-dispatch.sh`](/Users/fanqw/Documents/Program/claude-code-analysis/.codex/skills/orchestrator-openspec/scripts/generate-dispatch.sh)
- [`scripts/generate-acceptance.sh`](/Users/fanqw/Documents/Program/claude-code-analysis/.codex/skills/orchestrator-openspec/scripts/generate-acceptance.sh)
- [`scripts/generate-context-packet.sh`](/Users/fanqw/Documents/Program/claude-code-analysis/.codex/skills/orchestrator-openspec/scripts/generate-context-packet.sh)

### 最小长任务治理

- [`references/execution/lightweight-task-boundaries.md`](/Users/fanqw/Documents/Program/claude-code-analysis/.codex/skills/orchestrator-openspec/references/execution/lightweight-task-boundaries.md)
- [`references/execution/stage-rollback-rules.md`](/Users/fanqw/Documents/Program/claude-code-analysis/.codex/skills/orchestrator-openspec/references/execution/stage-rollback-rules.md)
- [`references/execution/context-packet-template.md`](/Users/fanqw/Documents/Program/claude-code-analysis/.codex/skills/orchestrator-openspec/references/execution/context-packet-template.md)
- [`references/execution/evidence-records.md`](/Users/fanqw/Documents/Program/claude-code-analysis/.codex/skills/orchestrator-openspec/references/execution/evidence-records.md)

## 二、可外移

这些资产有价值，但不适合作为 skill 日常执行层。更适合作为仓库级方法资产、分析资产，或未来拆分出的独立 skill。

### 设计与解释层

- [`capability-model.md`](/Users/fanqw/Documents/Program/claude-code-analysis/doc/orchestrator-openspec/capability-model.md)
- [`capability-coverage.md`](/Users/fanqw/Documents/Program/claude-code-analysis/doc/orchestrator-openspec/capability-coverage.md)
- [`skill-validation-plan.md`](/Users/fanqw/Documents/Program/claude-code-analysis/doc/orchestrator-openspec/skill-validation-plan.md)

理由：

- 它们帮助理解和治理，但不直接驱动每次执行
- 保留在 skill 内会强化“系统感”，削弱“skill 感”

### 高阶扩展层

- [`references/architecture/model-selection.md`](/Users/fanqw/Documents/Program/claude-code-analysis/.codex/skills/orchestrator-openspec/references/architecture/model-selection.md)
- [`references/architecture/role-admission-rules.md`](/Users/fanqw/Documents/Program/claude-code-analysis/.codex/skills/orchestrator-openspec/references/architecture/role-admission-rules.md)
- [`references/architecture/subagent-announcement-templates.md`](/Users/fanqw/Documents/Program/claude-code-analysis/.codex/skills/orchestrator-openspec/references/architecture/subagent-announcement-templates.md)
- [`references/architecture/subagent-lifecycle.md`](/Users/fanqw/Documents/Program/claude-code-analysis/.codex/skills/orchestrator-openspec/references/architecture/subagent-lifecycle.md)

理由：

- 这些更像“代理系统治理层”
- 日常使用频率不应高于主流程材料

### 专题型材料

- [`references/architecture/ui-iteration-rubric.md`](/Users/fanqw/Documents/Program/claude-code-analysis/.codex/skills/orchestrator-openspec/references/architecture/ui-iteration-rubric.md)
- [`frontend-preview-checks.md`](/Users/fanqw/Documents/Program/claude-code-analysis/doc/orchestrator-openspec/frontend-preview-checks.md)
- [`opsx-examples.md`](/Users/fanqw/Documents/Program/claude-code-analysis/doc/orchestrator-openspec/opsx-examples.md)
- [`dispatch-examples.md`](/Users/fanqw/Documents/Program/claude-code-analysis/doc/orchestrator-openspec/dispatch-examples.md)

理由：

- 有价值，但天然是“专题参考”
- 更适合放在 repo 级 `analysis/` 或未来拆出的专题 skill

## 三、可删除候选

这些不是“现在就删”，而是收口时优先审查是否真的需要继续保留在 skill 内。

### 重复解释候选

- [`references/architecture/goal-freeze-template.md`](/Users/fanqw/Documents/Program/claude-code-analysis/.codex/skills/orchestrator-openspec/references/architecture/goal-freeze-template.md)

判断依据：

- 目标冻结在 [`SKILL.md`](/Users/fanqw/Documents/Program/claude-code-analysis/.codex/skills/orchestrator-openspec/SKILL.md)、[`phase-gates.md`](/Users/fanqw/Documents/Program/claude-code-analysis/.codex/skills/orchestrator-openspec/references/core/phase-gates.md)、[`main-agent-checklists.md`](/Users/fanqw/Documents/Program/claude-code-analysis/.codex/skills/orchestrator-openspec/references/core/main-agent-checklists.md) 已多处覆盖
- 若模板实际使用频率不高，可以先移出 skill

### 解释重于执行的候选

- [`references/execution/context-governance.md`](/Users/fanqw/Documents/Program/claude-code-analysis/.codex/skills/orchestrator-openspec/references/execution/context-governance.md)
- [`references/architecture/memory-model.md`](/Users/fanqw/Documents/Program/claude-code-analysis/.codex/skills/orchestrator-openspec/references/architecture/memory-model.md)
- [`references/execution/knowledge-closure.md`](/Users/fanqw/Documents/Program/claude-code-analysis/.codex/skills/orchestrator-openspec/references/execution/knowledge-closure.md)

判断依据：

- 它们共同承载“长任务治理解释层”
- 功能重要，但是否都要作为独立 skill 内文档保留，值得审查
- 若要收口，可先只保留模板和脚本，把解释移到 skill 外

### 新增但尚未证明高频复用的候选

- [`references/execution/evolution-acceptance-template.md`](/Users/fanqw/Documents/Program/claude-code-analysis/.codex/skills/orchestrator-openspec/references/execution/evolution-acceptance-template.md)

判断依据：

- 它是合理补充，但仍是新资产
- 如果后续 2 到 3 轮没有稳定复用，可移出 skill

## 四、建议的收口顺序

不建议一次性大删。建议按下面顺序收口：

1. 先冻结当前主链
   - `SKILL.md`
   - `core/`
   - `prompts/`
   - `scripts/`

2. 再审查 `execution/`
   - 保留真正每轮会用到的模板、边界、证据、回退
   - 把偏解释性的长文优先列为外移候选

3. 最后审查 `architecture/`
   - 默认把它当“备查层”
   - 除非你确认高频使用，否则优先外移而不是继续保留在 skill 内

## 五、建议的目标形态

如果往 skill 方向收口，最终形态更适合是：

- 1 个主协议页
- 1 组核心执行材料 `core/`
- 1 组最小执行骨架 `prompts/ + scripts/`
- 少量必须的 `execution/`

而不是继续维持一个完整的“设计层 + 执行层 + 治理层”系统。

## 六、当前建议

下一步最值得做的不是继续加文件，而是做一次小规模物理收口：

### 第一批建议外移

- `references/architecture/capability-model.md`
- `references/architecture/capability-coverage.md`
- `references/architecture/skill-validation-plan.md`
- `references/architecture/dispatch-examples.md`
- `references/execution/opsx-examples.md`

### 第一批建议保留观察

- `references/execution/evolution-acceptance-template.md`
- `references/execution/context-governance.md`
- `references/architecture/memory-model.md`
- `references/execution/knowledge-closure.md`

### 当前不建议动

- `SKILL.md`
- `references/core/`
- `prompts/`
- `scripts/`
- `references/execution/lightweight-task-boundaries.md`
- `references/execution/stage-rollback-rules.md`
- `references/execution/context-packet-template.md`
- `references/execution/evidence-records.md`
