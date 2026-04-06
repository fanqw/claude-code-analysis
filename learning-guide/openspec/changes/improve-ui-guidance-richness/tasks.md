# Tasks

## Task 1: Freeze tutorial-first direction

- owner_role: explorer
- goal: 只读审查当前产品的 UI 风格、内容引导和表达形式问题，确认最值得优先改造的点
- write_scope: none
- depends_on: proposal.md, design.md
- output: 只读审查结论
- acceptance_criteria:
  - 明确指出最关键的问题
  - 能回链到具体页面或组件
  - 给出候选改造方向而不是泛泛建议
- parallelizable: true

## Task 2: Check user-visible path risk

- owner_role: explorer
- goal: 从新用户视角检查进入路径、下一步判断和主次关系
- write_scope: none
- depends_on: proposal.md, design.md
- output: 关键路径走查结论
- acceptance_criteria:
  - 指出最先绊住用户的问题
  - 明确问题影响的路径或区域
  - 给出一句话改进方向
- parallelizable: true

## Task 3: Implement tutorial-style refinement

- owner_role: builder
- goal: 根据冻结方案改造首页、地图页、章节页及相关样式与展示组件
- write_scope:
  - app/page.tsx
  - app/map/page.tsx
  - app/learn/[slug]/page.tsx
  - components/*
  - app/globals.css
- depends_on: Task 1, Task 2
- output: 可运行的 UI 和内容引导优化实现
- acceptance_criteria:
  - 首页、地图、章节页主次关系更清晰
  - 内容展现形式更丰富且更像教程产品
  - 不破坏真实证据层入口
- parallelizable: false

## Task 4: Verify build and runtime behavior

- owner_role: verifier
- goal: 独立验证构建、运行和关键页面输出
- write_scope: none
- depends_on: Task 3
- output: 构建和运行验证结果
- acceptance_criteria:
  - `npm run build` 通过
  - 本地实例可访问
  - `/` `/map` `/learn/architecture` 返回符合预期的结构内容
- parallelizable: false
