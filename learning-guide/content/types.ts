export type ModuleStatus = 'ready' | 'seeded' | 'planned'

export type ModuleCategory =
  | 'global'
  | 'core'
  | 'risk'
  | 'components'
  | 'flow'
  | 'build'

export type SourceReference = {
  label: string
  path: string
  note?: string
}

export type AnalysisLens = {
  id: string
  title: string
  summary: string
  guidingQuestion: string
  dimension: '架构' | '安全' | '设计权衡' | '组件' | '竞争对比' | '隐藏能力' | '工程索引'
  sourceRefs: SourceReference[]
  linkedModules: string[]
  takeaways: string[]
}

export type SourceJump = {
  path: string
  displayLabel: string
  symbol?: string
  note?: string
}

export type EvidenceSource = {
  id: string
  kind: 'source' | 'analysis'
  path: string
  title: string
  moduleSlugs: string[]
  symbol?: string
  sectionAnchor?: string
  note?: string
}

export type EvidenceLink = {
  label: string
  targetPath: string
  targetType: 'source' | 'analysis'
  symbol?: string
  reason: string
}

export type KnowledgePoint = {
  title: string
  summary: string
}

export type QuizQuestion = {
  id?: string
  prompt: string
  options?: string[]
  answer: string
  explanation: string
}

export type ProjectMapping = {
  targetLayer: string
  minimumImplementation: string
  advancedImplementation: string
  whenToDelay: string
}

export type LearningModule = {
  slug: string
  title: string
  category: ModuleCategory
  status: ModuleStatus
  difficulty: '基础' | '中等' | '进阶'
  estimatedMinutes: number
  summary: string
  goal: string
  plainExplanation: string
  whyItMatters: string[]
  keyPoints: KnowledgePoint[]
  sourceRefs: SourceReference[]
  prerequisites: string[]
  related: string[]
  projectMappings: ProjectMapping[]
  quiz: QuizQuestion[]
  conceptDiagramId?: string
  runtimeFlowIds?: string[]
  codeFlowIds?: string[]
  analysisLensIds?: string[]
  pseudoCode?: string[]
  mindset?: string[]
}

export type LearningFlowStep = {
  title: string
  input: string
  output: string
  designReason: string
}

export type LearningFlow = {
  slug: string
  title: string
  status: ModuleStatus
  summary: string
  scenario: string
  steps: LearningFlowStep[]
  relatedModules: string[]
  sourceRefs: SourceReference[]
}

export type DiagramNode = {
  id: string
  label: string
  summary: string
}

export type DiagramConnection = {
  from: string
  to: string
  label: string
}

export type DiagramBlock = {
  id: string
  title: string
  summary: string
  nodes: DiagramNode[]
  connections: DiagramConnection[]
}

export type CodeAnchor = {
  path: string
  symbol?: string
  lineHint?: string
}

export type CodeFlowNode = {
  id: string
  label: string
  filePath: string
  symbol?: string
  role: string
  summary: string
  input: string
  output: string
  next: string
}

export type CodeFlowEdge = {
  from: string
  to: string
  reason: string
}

export type CodeFlow = {
  id: string
  title: string
  summary: string
  granularity: 'module' | 'function'
  nodes: CodeFlowNode[]
  edges: CodeFlowEdge[]
  popular?: boolean
}

export type BuildGuide = {
  slug: string
  title: string
  summary: string
  recommendation: string
  modules: {
    name: string
    responsibility: string
    priority: '必须先做' | '第二阶段' | '暂缓'
  }[]
  checkpoints: string[]
}

export type GlossaryTerm = {
  term: string
  definition: string
}

export type LearningStage = {
  id: string
  title: string
  outcome: string
  modules: string[]
  whyNow: string
  nextStage?: string
}

export type ArchitectureNode = {
  id: string
  label: string
  path?: string
  role: string
  summary: string
  children?: string[]
  relatedEvidence: EvidenceLink[]
  relatedFlows?: string[]
}

export type AnalysisDocument = {
  path: string
  title: string
  rawContent: string
  headings: string[]
  linkedModules: string[]
  linkedSourceFiles: string[]
}

export type SourceDocument = {
  path: string
  language: string
  rawContent: string
  highlightLines?: number[]
  symbol?: string
  linkedAnalysisDocs: string[]
}

export type ReadingMode = 'guide' | 'compare' | 'raw'
