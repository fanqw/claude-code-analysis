# 参考材料索引

这份索引只回答一个问题：

- 当前遇到的问题，应该先看哪一份材料

它不重复其他文档内容，只负责索引。

## 1. 不确定当前该不该启用这个 skill

先看：

- [../SKILL.md](../SKILL.md)

如果想先理解这套 skill 的系统能力，而不是直接进入规则细节，再看：

- [capability-model.md](capability-model.md)

如果想进一步判断这些能力目前覆盖到什么程度，再看：

- [capability-coverage.md](capability-coverage.md)

重点看：

- 何时使用
- 主代理职责

## 2. 不确定当前处于哪个阶段

先看：

- [phase-gates.md](phase-gates.md)

如果需要快速自检，再看：

- [main-agent-checklists.md](main-agent-checklists.md)

如果当前任务已经进入多轮推进，且你担心上下文失焦，再看：

- [context-governance.md](context-governance.md)
- [stage-rollback-rules.md](stage-rollback-rules.md)

## 3. 不确定是否该进入 OpenSpec 流程

先看：

- [../SKILL.md](../SKILL.md)
- [opsx-examples.md](opsx-examples.md)

如果需要判断当前 change 是否已可派单，再看：

- [opsx-audit-guide.md](opsx-audit-guide.md)
- [lightweight-task-boundaries.md](lightweight-task-boundaries.md)

## 4. 不确定 OpenSpec 应该怎么推进

先看：

- [opsx-examples.md](opsx-examples.md)

如果需要核查当前工件是否已足够支持实施，再看：

- [opsx-audit-guide.md](opsx-audit-guide.md)

## 5. 不确定该派哪类子代理

先看：

- [subagent-roles.md](subagent-roles.md)
- [dispatch-playbooks.md](dispatch-playbooks.md)

如果想找接近当前问题的实例，再看：

- [dispatch-examples.md](dispatch-examples.md)

## 6. 不确定不同子代理该怎么选模型

先看：

- [model-selection.md](model-selection.md)

如果问题与子代理的启动、透明度或关闭有关，再看：

- [subagent-lifecycle.md](subagent-lifecycle.md)

如果需要统一对用户说明子代理状态的写法，再看：

- [subagent-announcement-templates.md](subagent-announcement-templates.md)

如果需要确认哪些决定不能外包，再看：

- [non-delegable-decisions.md](non-delegable-decisions.md)

## 7. 需要快速生成派单内容

先看：

- [../prompts](../prompts)
- [dispatch-playbooks.md](dispatch-playbooks.md)

如果任务属于 UI / UX / 内容引导类，再补：

- [ui-iteration-rubric.md](ui-iteration-rubric.md)

如果需要直接生成结构骨架，使用：

- `../scripts/generate-dispatch.sh`

如果需要生成轮次收口后的续接骨架，使用：

- [context-packet-template.md](context-packet-template.md)
- `../scripts/generate-context-packet.sh`

## 8. 不确定如何做验收或驳回

先看：

- [acceptance-patterns.md](acceptance-patterns.md)

如果需要快速生成验收骨架，使用：

- `../scripts/generate-acceptance.sh`

如果需要本地预览、端口选择和关键页面探测规则，再看：

- [frontend-preview-checks.md](frontend-preview-checks.md)

如果需要统一证据记录与收口判断，再看：

- [evidence-records.md](evidence-records.md)

## 9. 不确定本轮主代理有没有漏检查项

先看：

- [main-agent-checklists.md](main-agent-checklists.md)

## 10. 想快速理解这套 skill 的最短阅读路径

推荐顺序：

1. [../SKILL.md](../SKILL.md)
2. [capability-model.md](capability-model.md)
3. [capability-coverage.md](capability-coverage.md)
4. [phase-gates.md](phase-gates.md)
5. [subagent-roles.md](subagent-roles.md)
6. [dispatch-playbooks.md](dispatch-playbooks.md)
7. [acceptance-patterns.md](acceptance-patterns.md)

如果当前任务明确属于中大型变更，再补：

8. [opsx-examples.md](opsx-examples.md)
9. [opsx-audit-guide.md](opsx-audit-guide.md)

如果当前任务是 UI / UX / 内容引导类，再补：

10. [ui-iteration-rubric.md](ui-iteration-rubric.md)
11. [frontend-preview-checks.md](frontend-preview-checks.md)

如果当前任务涉及多子代理协作，再补：

12. [subagent-lifecycle.md](subagent-lifecycle.md)
13. [subagent-announcement-templates.md](subagent-announcement-templates.md)

## 11. 不要怎么用这份索引

- 不要把它当完整说明书
- 不要跳过主文档直接只看索引
- 不要一次性把所有参考材料都读进上下文

重点是：先定位问题，再读取最小必要材料。
