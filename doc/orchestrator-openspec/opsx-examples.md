# OpenSpec 原生工作流实例

这份文档提供一组通用的 OpenSpec 原生工作流实例。

目的不是替代 OpenSpec 官方文档，而是帮助主代理回答这些问题：

- 什么时候应该进入 OpenSpec 流程
- 进入后大致怎么推进
- 何时可以进入实施
- 何时需要补 spec delta

这份文档只抽象公共能力，不绑定具体业务或仓库结构。

## 一、使用前提

在进入任何 `opsx:*` 工作流前，主代理先确认：

- 已安装 OpenSpec
- 当前仓库已执行 `openspec init`
- 当前环境已完成 `openspec artifact-experimental-setup`
- 如有需要，已执行 `openspec update`

如果前置条件未完成，先补前置条件，再进入规格阶段。

## 二、轻量任务与中大型任务的分界

通常满足任一条件时，主代理应进入 OpenSpec 流程：

- 需要方案裁定，而不是直接实现
- 会跨多个文件或多个子系统
- 需要多个子代理并行
- 涉及接口、行为契约、流程或长期规则变化
- 预期会出现多轮返工或多轮验收

如果只是小范围、低风险、单轮可收口的任务，主代理可走轻量流程，不强制建立 change。

## 三、典型流程一：创建 change 并冻结执行规格

适用条件：

- 当前任务已明确属于中大型变更
- 还没有对应的活跃 change

主代理动作顺序：

1. 创建 change
2. 补充 proposal
3. 补充 design
4. 补充 tasks
5. 审查 proposal / design / tasks 是否达到可执行状态
6. 达标后再派 builder

关键原则：

- 没有 proposal，不冻结意图
- 没有 design，不冻结方案
- 没有 tasks，不启动实现

## 四、典型流程二：已有 change，但规格尚未冻结

适用条件：

- 仓库中已经存在活跃 change
- 当前 change 已建立，但 design 或 tasks 还不够完整

主代理动作顺序：

1. 读取当前 change 工件
2. 判断缺的是 proposal、design 还是 tasks
3. 先补缺失部分
4. 再判断是否达到可派单状态
5. 未达到前，不进入 Parallel Execution

关键原则：

- change 存在，不等于已经可执行

## 五、典型流程三：从 OpenSpec 工件派生任务包

适用条件：

- 当前 change 已具备 proposal / design / tasks
- 主代理准备进入实施阶段

主代理动作顺序：

1. 以当前 tasks 为任务源
2. 拆出本轮唯一目标
3. 为每个任务选择角色
4. 为每个角色选择模型
5. 明确写入范围、依赖、产出物和验收条件
6. 再派发子代理

关键原则：

- 主代理不是从自由口头说明派单
- 主代理应从 OpenSpec 工件派生任务包

## 六、典型流程四：何时补 spec delta

满足任一条件时，主代理应考虑补 spec delta：

- 对外接口发生变化
- 行为契约发生变化
- 需要长期维护的规则发生变化
- 后续多轮迭代都需要引用这条新规范

通常可不补 spec delta 的情况：

- 单次局部实现
- 纯内部重排
- 不改变稳定行为约束的局部修正

关键原则：

- spec delta 用于沉淀稳定约束，不用于记录所有实现细节

最短判断法：

- 对外接口变了：补
- 稳定行为约束变了：补
- 以后多轮都会引用：补
- 只是一次性实现细节：通常不补

## 七、典型流程五：实施完成后的回写

适用条件：

- 当前轮实现和验证已完成
- 主代理准备收口

主代理动作顺序：

1. 检查当前结果是否符合 proposal
2. 检查实现是否偏离 design
3. 检查 tasks 是否已完成或需更新状态
4. 若有 spec delta，检查是否满足新规范
5. 记录 acceptance 结果
6. 记录 round summary
7. 必要时推动 change 进入归档

关键原则：

- 实施完成，不等于规格生命周期结束

## 八、主代理的最小判断问题

每次推进 OpenSpec 工作流时，主代理至少问自己：

1. 当前任务是否已经达到需要 change 的复杂度
2. 当前 change 是否真的可执行
3. 当前任务包是否已经从 OpenSpec 工件稳定派生
4. 当前实现是否回到了规格
5. 当前 change 是否应继续活跃，还是可以归档

## 九、与其他材料的关系

建议按这个顺序配合使用：

1. 用 [../core/phase-gates.md](../core/phase-gates.md) 判断当前所处阶段
2. 用 [opsx-audit-guide.md](opsx-audit-guide.md) 检查 OpenSpec 工件是否足以派单
3. 用 [../core/dispatch-playbooks.md](../core/dispatch-playbooks.md) 决定角色组合
4. 用 [../architecture/dispatch-examples.md](../architecture/dispatch-examples.md) 找相似实例
5. 用 [../core/acceptance-patterns.md](../core/acceptance-patterns.md) 统一验收裁定

## 十、不要做的事

- 不要把 OpenSpec 当成可选装饰，而在中大型变更里跳过规格
- 不要因为已经创建 change，就默认允许进入实现
- 不要把 tasks 当成普通待办列表，而忽略其派单来源价值
- 不要把 spec delta 用成实现日志
- 不要把最终规格裁定外包给子代理
