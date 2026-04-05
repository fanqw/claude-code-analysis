# Reference Round

## question

- 参考 Kubernetes Tutorials 与 `zh.javascript.info` 的结构特点，在不抄外观的前提下，还应补哪些“更像教程”的约束？

## extracted_principles

- 吸收“教程层级 + 稳定路线图 + 单页主线”的组织方式，而不是模仿外观
- 页面顶部要有稳定的路径提示，帮助用户知道自己在哪、下一步去哪
- 章节页要有固定教程头部，包含路径、阶段、阅读位置和快照信息
- 正文必须极简，证据必须后置，扩展必须降级
- `/map` 要像教程树，不像第二首页
- `/analysis` 与 `/sources` 要像证据目录，不像教学正文页

## non_goals

- 不把站点做成通用文档站
- 不把每页做成大而全的目录树或参考手册
- 不用“更多链接”替代教程结构

## implementation_followups

- 给教程页增加统一头部：面包屑、阶段标签、主线位置、快照时间、最小下一步
- 强化章节页的“正文主线 + 证据核验”分层
- 强化 `/map`、`/analysis`、`/sources` 的目录感和证据中心定位
