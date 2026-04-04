import Link from 'next/link'
import { componentModules, learningModules } from '@/lib/content'
import { createSourceHref } from '@/lib/sourceLinks'

type Stage = {
  id: string
  label: string
  title: string
  why: string
  modules: string[]
}

type AnalysisLens = {
  title: string
  summary: string
  files: { label: string; path: string }[]
}

const stages: Stage[] = [
  {
    id: 'foundations',
    label: '阶段 01',
    title: '先建立系统入口感',
    why: '先看架构、Tool 和 Prompt，才能知道这个系统到底怎么启动、怎么接收输入、怎么组织上下文。',
    modules: ['architecture', 'tool-call', 'prompt'],
  },
  {
    id: 'runtime',
    label: '阶段 02',
    title: '再理解运行态如何持续',
    why: 'Context、Session、Agent Memory 解决的是长会话和恢复问题，放在第二阶段最自然。',
    modules: ['context', 'session-storage', 'agent-memory'],
  },
  {
    id: 'governance',
    label: '阶段 03',
    title: '然后进入治理与扩展',
    why: 'Sandbox、MCP、Skills 负责安全边界和外部能力接入，建立在前面运行态之上。',
    modules: ['sandbox', 'mcp', 'skills'],
  },
  {
    id: 'advanced',
    label: '阶段 04',
    title: '最后再看协作与判断',
    why: 'Multi-Agent、Components、Security、Competition 适合在主链理解后进入，不然容易失焦。',
    modules: ['multi-agent', 'core-interaction', 'security', 'competition'],
  },
]

const analysisLenses: AnalysisLens[] = [
  {
    title: '架构与入口',
    summary: '先从系统边界、启动链和代码证据建立全局感。',
    files: [
      { label: 'architecture overview', path: '../analysis/01-architecture-overview.md' },
      { label: 'code evidence index', path: '../analysis/07-code-evidence-index.md' },
      { label: 'final summary', path: '../analysis/09-final-summary.md' },
    ],
  },
  {
    title: '安全与边界',
    summary: '把权限、沙箱、负面信号和隐藏特性一起看，避免只看单点机制。',
    files: [
      { label: 'security analysis', path: '../analysis/02-security-analysis.md' },
      { label: 'sandbox implementation', path: '../analysis/04e-sandbox-implementation.md' },
      { label: 'negative keyword analysis', path: '../analysis/06b-negative-keyword-analysis.md' },
      { label: 'hidden features', path: '../analysis/11-hidden-features-and-easter-eggs.md' },
    ],
  },
  {
    title: 'Prompt / Tool / Session',
    summary: '理解运行中最常见的三条链路：prompt 组装、工具执行和会话恢复。',
    files: [
      { label: 'tool call implementation', path: '../analysis/04b-tool-call-implementation.md' },
      { label: 'prompt management', path: '../analysis/04g-prompt-management.md' },
      { label: 'session storage / resume', path: '../analysis/04i-session-storage-resume.md' },
      { label: 'multi-agent', path: '../analysis/04h-multi-agent.md' },
    ],
  },
  {
    title: '组件与控制面',
    summary: '把 UI 看成控制面，不是静态页面，适合理解分层与职责边界。',
    files: [
      { label: 'component architecture overview', path: '../analysis/components/01-component-architecture-overview.md' },
      { label: 'core interaction components', path: '../analysis/components/02-core-interaction-components.md' },
      { label: 'platform components', path: '../analysis/components/03-platform-components.md' },
      { label: 'function level walkthrough', path: '../analysis/components/05-function-level-core-walkthrough.md' },
    ],
  },
  {
    title: '差异与判断',
    summary: '把 Claude Code 和同类产品放在一起比较，理解设计取舍和产品边界。',
    files: [
      { label: 'differentiators', path: '../analysis/05-differentiators-and-comparison.md' },
      { label: 'competitive comparison', path: '../analysis/08-competitive-comparison.md' },
      { label: 'reference sources', path: '../analysis/08-reference-comparison-sources.md' },
    ],
  },
  {
    title: '总结与迁移',
    summary: '把分析结果沉淀成你自己的项目架构和落地清单。',
    files: [
      { label: 'extra findings', path: '../analysis/06-extra-findings.md' },
      { label: 'build notes', path: '../analysis/09-final-summary.md' },
      { label: 'build guide', path: '../README.md' },
    ],
  },
]

function resolveModule(slug: string) {
  return [...learningModules, ...componentModules].find(module => module.slug === slug)
}

export function LearningRoadmap() {
  return (
    <div className="roadmap">
      {stages.map((stage, index) => (
        <article className="roadmap-stage" key={stage.id}>
          <div className="roadmap-stage-head">
            <span className="pill">{stage.label}</span>
            <span className="roadmap-stage-index">0{index + 1}</span>
          </div>
          <h3>{stage.title}</h3>
          <p>{stage.why}</p>
          <div className="route-links">
            {stage.modules.map(slug => {
              const module = resolveModule(slug)
              if (!module) {
                return null
              }

              return (
                <Link href={`/learn/${module.slug}`} key={module.slug}>
                  {module.title}
                </Link>
              )
            })}
          </div>
        </article>
      ))}
    </div>
  )
}

export function ViewGallery() {
  return (
    <div className="view-gallery">
      <article className="story-panel story-panel-large">
        <p className="eyebrow">Mind Map</p>
        <h3>系统如何分层</h3>
        <div className="mind-map">
          <div className="mind-root">
            <strong>Claude Code</strong>
            <span>从入口到运行态，再到治理与扩展</span>
          </div>
          <div className="mind-branches">
            <div className="mind-branch">
              <strong>入口层</strong>
              <span>Architecture</span>
              <span>Tool Call</span>
              <span>Prompt</span>
            </div>
            <div className="mind-branch">
              <strong>运行层</strong>
              <span>Context</span>
              <span>Session</span>
              <span>Memory</span>
            </div>
            <div className="mind-branch">
              <strong>治理层</strong>
              <span>Sandbox</span>
              <span>MCP</span>
              <span>Skills</span>
            </div>
            <div className="mind-branch">
              <strong>协作层</strong>
              <span>Multi-Agent</span>
              <span>Components</span>
              <span>Competition</span>
            </div>
          </div>
        </div>
      </article>

      <article className="story-panel">
        <p className="eyebrow">Flow Chart</p>
        <h3>一次任务怎么流转</h3>
        <div className="flow-rail">
          <span>输入</span>
          <span>Prompt 组装</span>
          <span>query 主循环</span>
          <span>tool_use</span>
          <span>执行与权限</span>
          <span>tool_result 回流</span>
        </div>
      </article>

      <article className="story-panel">
        <p className="eyebrow">Pseudo Code</p>
        <h3>核心循环长什么样</h3>
        <pre className="pseudo-code">
{`while (running) {
  prompt = buildPrompt(context)
  response = query(prompt)

  if (response.tool_use) {
    result = executeWithPermission(response.tool_use)
    appendTranscript(result)
    continue
  }

  renderAnswer(response)
}`}
        </pre>
      </article>
    </div>
  )
}

export function AnalysisLensGrid() {
  return (
    <div className="analysis-grid">
      {analysisLenses.map(lens => (
        <article className="analysis-card" key={lens.title}>
          <p className="eyebrow">Analysis Lens</p>
          <h3>{lens.title}</h3>
          <p>{lens.summary}</p>
          <div className="route-links">
            {lens.files.map(file => (
              <Link href={createSourceHref(file.path.replace(/^\.\.\//, ''))} key={file.path}>
                {file.label}
              </Link>
            ))}
          </div>
        </article>
      ))}
    </div>
  )
}
