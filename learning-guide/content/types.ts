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
