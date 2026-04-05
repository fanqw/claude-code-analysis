# PM 子代理协作文件说明

本目录用于管理学习指引网站的多 PM 子代理协作输入。

文件用途：

- [ui-pm.md](/Users/fanqw/Documents/Program/claude-code-analysis/learning-guide/pm-prompts/ui-pm.md)：UI 交互 PM 提示词
- [content-pm.md](/Users/fanqw/Documents/Program/claude-code-analysis/learning-guide/pm-prompts/content-pm.md)：内容引导 PM 提示词
- [planning-pm.md](/Users/fanqw/Documents/Program/claude-code-analysis/learning-guide/pm-prompts/planning-pm.md)：整体规划 PM 提示词
- [novice-ux-auditor.md](/Users/fanqw/Documents/Program/claude-code-analysis/learning-guide/pm-prompts/novice-ux-auditor.md)：小白用户验收提示词
- [shared-brief-template.md](/Users/fanqw/Documents/Program/claude-code-analysis/learning-guide/pm-prompts/shared-brief-template.md)：统一输入模板
- [decision-ledger-template.md](/Users/fanqw/Documents/Program/claude-code-analysis/learning-guide/pm-prompts/decision-ledger-template.md)：轮次裁决模板
- [final-spec-template.md](/Users/fanqw/Documents/Program/claude-code-analysis/learning-guide/pm-prompts/final-spec-template.md)：最终主文档模板

推荐使用顺序：

1. 先填写 `Shared Brief`
2. 再选择一个 `Round Question`
3. 分别投喂 3 个 PM 提示词
4. 用 `Decision Ledger` 记录裁决
5. 满足停机条件后整理进 `Final Spec`

推荐在关键轮次补一条：

6. 用 `novice-ux-auditor` 做只读验收，专门检查“新手是否会迷路”

轮次产物建议放在：

- `/Users/fanqw/Documents/Program/claude-code-analysis/learning-guide/pm-rounds/`
