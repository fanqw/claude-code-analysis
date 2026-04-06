# orchestrator-openspec 外移文档说明

这份目录用于存放已经从 skill 本体中移出的高解释性材料。

这些文件仍然保留，是因为它们有参考价值；但它们不再属于 skill 的日常执行层，也不再作为 skill 内部默认入口。

## 当前外移文件

- `capability-model.md`
  - 解释这套方法的能力模型
- `capability-coverage.md`
  - 解释当前能力覆盖情况
- `dispatch-examples.md`
  - 提供派单实例
- `frontend-preview-checks.md`
  - 提供前端预览与本地探测规则
- `opsx-examples.md`
  - 提供 OpenSpec 推进实例
- `skill-validation-plan.md`
  - 定义如何验证这个 skill

## 为什么外移

- 它们更偏解释、举例、治理或验证方法
- 它们不是每次执行都必须读取的主链材料
- 继续保留在 skill 本体里，会增加认知负担和“系统感”

## 使用方式

如果你在审查 skill 设计、验证 skill 效果、或回看历史方法论时，再来这里看。

如果你只是要使用 skill 解决任务，优先回到：

- [`SKILL.md`](/Users/fanqw/Documents/Program/claude-code-analysis/.codex/skills/orchestrator-openspec/SKILL.md)
- [`reference-routing.md`](/Users/fanqw/Documents/Program/claude-code-analysis/.codex/skills/orchestrator-openspec/references/core/reference-routing.md)

## 当前定位

这个目录是“外部参考包”，不是 skill 本体的一部分。
