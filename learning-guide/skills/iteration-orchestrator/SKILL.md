---
name: iteration-orchestrator
description: Use when running multi-round product or UI iterations that require task decomposition, subagent delegation, centralized acceptance, and evidence-based validation. Best for projects where one agent should own direction and final quality while workers handle bounded slices.
---

# Iteration Orchestrator

Use this skill when the goal is not just to implement code, but to keep a product iteration on track across multiple workers and rounds.

## What This Skill Is For

Apply it when all of the following are true:

- The task has multiple dimensions: UI, content, structure, validation, or architecture.
- The main risk is drift, not raw implementation difficulty.
- A single agent must stay responsible for direction, acceptance, and final quality.
- Independent subtasks can be delegated without sharing the same write scope.

Do not use it for tiny single-file edits.

## Operating Model

Treat the main agent as the product owner plus release manager.

Responsibilities of the main agent:

- Define the product goal in one sentence.
- Decide the current round's success criteria before delegating.
- Split work by ownership, not by vague topic.
- Keep only one acceptance standard.
- Re-check worker output against the user goal, not just against the worker brief.
- Run final validation personally if the result affects trust, usability, or shipped behavior.

Responsibilities of worker agents:

- Implement one bounded slice.
- Report changed files and what was validated.
- Avoid cross-cutting product decisions unless explicitly assigned.

## Decomposition Rules

Split by a combination of:

- Priority: critical path first, supporting work second.
- Write scope: avoid overlapping files.
- Validation surface: code changes vs. read-only audit.
- User visibility: user-facing changes get tighter acceptance.

Good slices:

- `home/module page hierarchy`
- `source reader visual treatment`
- `read-only novice audit`
- `build + curl verification`

Bad slices:

- `improve UX`
- `fix all layout issues`
- `make it better`

## Worker Types

Use these worker roles repeatedly.

### 1. Builder Worker

Use for bounded code changes.

Give:

- Exact files owned
- User-facing goal
- Constraints
- What not to touch

Require back:

- Files changed
- What behavior changed
- What was or was not validated

### 2. Explorer / Auditor

Use for read-only critique, risk discovery, or experience review.

Best prompts:

- review this page like a novice
- identify which classes make hierarchy too heavy
- list confusing clickable vs non-clickable elements

Require back:

- findings ordered by severity
- exact file/class references
- no code edits unless asked

### 3. Verification Worker

Use for build/start/curl validation only.

Give:

- exact routes
- exact strings or sections expected
- whether service may already be running

Require back:

- build result
- runtime result
- mismatches between implementation and expectation

## Acceptance Protocol

Never accept a round because workers said it is done.

Accept only when all checks pass:

1. Goal check
   The result matches the current user request, not an older version.
2. Drift check
   The UI, content, and structure still align with the main learning model.
3. Surface check
   The changed pages actually expose the intended behavior.
4. Evidence check
   Claims about code or analysis still point to real local files.
5. Verification check
   Build passes and runtime routes render as expected.

If worker output conflicts with the product goal, override it and re-verify yourself.

## Evidence Ladder For Feedback

Use the cheapest reliable evidence first.

### Level 1: Structural evidence

Prefer first:

- `curl` HTML inspection
- route checks
- selector/class checks
- file diffs
- exact copy/text presence checks

Use when validating:

- information hierarchy
- entry points
- link presence
- whether sections exist

### Level 2: Layout evidence

Use next:

- DOM structure review
- class/style inspection
- viewport-specific checks from rendered HTML/CSS
- targeted code inspection of layout components

Use when validating:

- overflow
- sticky rails
- button semantics
- scroll regions

### Level 3: Visual evidence

Use screenshots only when the issue is inherently visual:

- typography feels oversized
- spacing feels crowded
- clickable and non-clickable elements look too similar
- code reader does not resemble the intended product pattern

When screenshots are needed:

- prefer a cropped image over a full-page capture
- annotate one or two issues, not ten at once
- pair the screenshot with route + viewport + exact complaint

## Screenshot Cost Guidance

Screenshots can consume meaningful context because:

- the image itself is additional multimodal input
- follow-up discussion usually repeats the same page context
- full-page images often include more irrelevant area than useful signal

They are worth it only for visual issues that text cannot localize well.

Prefer these lower-cost alternatives first:

- route + viewport size + exact issue description
- affected selector or component name
- a small DOM snippet
- a short screen recording summary written as text
- a cropped image of the problematic region

Default rule:

- structural issue: do not ask for screenshot first
- visual issue: ask for crop, not full page

## Round Closure Template

At the end of a round, the main agent should produce:

- What changed
- What was verified
- Current preview URL or environment
- Residual issues, if any
- The next highest-value round, if more work remains

Keep this brief. The user should see outcome, not orchestration noise.
