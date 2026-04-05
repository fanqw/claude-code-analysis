import { promises as fs } from 'fs'
import path from 'path'
import { analysisLenses, codeFlows, getAnalysisLens, getCodeFlow, getLearningModule, learningStages } from '@/lib/content'
import { architectureNodes, moduleEvidenceMap, stageEvidenceMap } from '@/content/evidenceMap'
import type {
  AnalysisDocument,
  CodeFlow,
  EvidenceLink,
  LearningModule,
  SourceDocument,
} from '@/content/types'

const REPO_ROOT = path.resolve(process.cwd(), '..')
const ALLOWED_PREFIXES = ['src/', 'analysis/', 'README.md']

export function normalizeRepoPath(rawPath: string) {
  const cleaned = rawPath.replace(/^\.?\/*/, '')
  if (!ALLOWED_PREFIXES.some(prefix => cleaned === prefix || cleaned.startsWith(prefix))) {
    return null
  }
  return cleaned
}

export function resolveRepoPath(relativePath: string) {
  return path.resolve(REPO_ROOT, relativePath)
}

export async function fileExists(relativePath: string) {
  try {
    await fs.access(resolveRepoPath(relativePath))
    return true
  } catch {
    return false
  }
}

export async function readRepoFile(relativePath: string) {
  return fs.readFile(resolveRepoPath(relativePath), 'utf8')
}

export function inferLanguage(relativePath: string) {
  if (relativePath.endsWith('.tsx')) return 'tsx'
  if (relativePath.endsWith('.ts')) return 'ts'
  if (relativePath.endsWith('.js')) return 'js'
  if (relativePath.endsWith('.jsx')) return 'jsx'
  if (relativePath.endsWith('.json')) return 'json'
  if (relativePath.endsWith('.md')) return 'md'
  return 'text'
}

export function extractHeadings(markdown: string) {
  return markdown
    .split('\n')
    .filter(line => /^#{1,6}\s+/.test(line))
    .map(line => line.replace(/^#{1,6}\s+/, '').trim())
}

export function titleFromPath(relativePath: string) {
  return relativePath.split('/').pop()?.replace(/\.md$/, '').replace(/[-_]/g, ' ') ?? relativePath
}

async function filterValidLinks(links: EvidenceLink[]) {
  const checks = await Promise.all(
    links.map(async link => ((await fileExists(link.targetPath)) ? link : null)),
  )
  return checks.filter((item): item is EvidenceLink => Boolean(item))
}

export async function getModuleEvidence(module: LearningModule) {
  const direct = moduleEvidenceMap[module.slug]
  const analysisLinks: EvidenceLink[] = [...(direct?.analysis ?? [])]
  const sourceLinks: EvidenceLink[] = [...(direct?.source ?? [])]

  for (const ref of module.sourceRefs) {
    const cleanPath = normalizeRepoPath(ref.path)
    if (!cleanPath) continue
    if (cleanPath.startsWith('analysis/')) {
      analysisLinks.push({
        label: ref.label,
        targetPath: cleanPath,
        targetType: 'analysis',
        reason: ref.note ?? '来自模块关联原始文档。',
      })
    } else {
      sourceLinks.push({
        label: ref.label,
        targetPath: cleanPath,
        targetType: 'source',
        reason: ref.note ?? '来自模块关联真实源码。',
      })
    }
  }

  for (const lensId of module.analysisLensIds ?? []) {
    const lens = getAnalysisLens(lensId)
    if (!lens) continue
    for (const ref of lens.sourceRefs) {
      const cleanPath = normalizeRepoPath(ref.path)
      if (!cleanPath) continue
      analysisLinks.push({
        label: ref.label,
        targetPath: cleanPath,
        targetType: cleanPath.startsWith('analysis/') ? 'analysis' : 'source',
        reason: `来自 analysis 视角：${lens.title}`,
      })
    }
  }

  for (const flowId of module.codeFlowIds ?? []) {
    const flow = getCodeFlow(flowId)
    if (!flow) continue
    for (const node of flow.nodes) {
      sourceLinks.push({
        label: `${node.label} · ${node.filePath}`,
        targetPath: node.filePath,
        targetType: 'source',
        symbol: node.symbol,
        reason: `来自源码流：${flow.title}`,
      })
    }
  }

  const validAnalysis = dedupeEvidenceLinks(await filterValidLinks(analysisLinks))
  const validSource = dedupeEvidenceLinks(await filterValidLinks(sourceLinks))

  return {
    summary: direct?.summary ?? module.summary,
    analysis: validAnalysis,
    source: validSource,
  }
}

export function dedupeEvidenceLinks(links: EvidenceLink[]) {
  const seen = new Set<string>()
  return links.filter(link => {
    const key = `${link.targetType}:${link.targetPath}:${link.symbol ?? ''}`
    if (seen.has(key)) {
      return false
    }
    seen.add(key)
    return true
  })
}

export async function getAnalysisDocuments() {
  const docs: AnalysisDocument[] = []
  for (const lens of analysisLenses) {
    for (const ref of lens.sourceRefs) {
      const normalized = normalizeRepoPath(ref.path)
      if (!normalized || !normalized.startsWith('analysis/')) continue
      const rawContent = await readRepoFile(normalized)
      docs.push({
        path: normalized,
        title: ref.label.replace(/^analysis\//, ''),
        rawContent,
        headings: extractHeadings(rawContent),
        linkedModules: lens.linkedModules,
        linkedSourceFiles: modulePathsForModules(lens.linkedModules),
      })
    }
  }
  return dedupeAnalysisDocuments(docs)
}

function dedupeAnalysisDocuments(docs: AnalysisDocument[]) {
  const map = new Map<string, AnalysisDocument>()
  for (const doc of docs) {
    if (!map.has(doc.path)) {
      map.set(doc.path, doc)
      continue
    }
    const current = map.get(doc.path)!
    map.set(doc.path, {
      ...current,
      linkedModules: Array.from(new Set([...current.linkedModules, ...doc.linkedModules])),
      linkedSourceFiles: Array.from(new Set([...current.linkedSourceFiles, ...doc.linkedSourceFiles])),
    })
  }
  return Array.from(map.values()).sort((a, b) => a.path.localeCompare(b.path))
}

function modulePathsForModules(moduleSlugs: string[]) {
  return Array.from(
    new Set(
      moduleSlugs.flatMap(slug => {
        const direct = moduleEvidenceMap[slug]
        return direct ? direct.source.map(item => item.targetPath) : []
      }),
    ),
  )
}

export async function getAnalysisDocument(relativePath: string) {
  const rawContent = await readRepoFile(relativePath)
  const linkedLenses = analysisLenses.filter(lens =>
    lens.sourceRefs.some(ref => normalizeRepoPath(ref.path) === relativePath),
  )
  const linkedModules = Array.from(new Set(linkedLenses.flatMap(lens => lens.linkedModules)))
  return {
    path: relativePath,
    title: titleFromPath(relativePath),
    rawContent,
    headings: extractHeadings(rawContent),
    linkedModules,
    linkedSourceFiles: modulePathsForModules(linkedModules),
  } satisfies AnalysisDocument
}

export async function getSourceDocument(relativePath: string, symbol?: string): Promise<SourceDocument> {
  const rawContent = await readRepoFile(relativePath)
  const lines = rawContent.split('\n')
  const highlightLine = symbol ? lines.findIndex(line => line.includes(symbol)) + 1 : 0
  const linkedModuleSlugs = Object.entries(moduleEvidenceMap)
    .filter(([, evidence]) => evidence.source.some(link => link.targetPath === relativePath))
    .map(([slug]) => slug)
  const flowModuleSlugs = codeFlows
    .filter(flow => flow.nodes.some(node => node.filePath === relativePath))
    .flatMap(flow =>
      Object.entries(moduleEvidenceMap)
        .filter(([, evidence]) => evidence.source.some(link =>
          flow.nodes.some(node => node.filePath === link.targetPath),
        ))
        .map(([slug]) => slug),
    )
  const relevantModuleSlugs = Array.from(new Set([...linkedModuleSlugs, ...flowModuleSlugs]))
  const directAnalysisDocs = relevantModuleSlugs.flatMap(
    slug => (moduleEvidenceMap[slug]?.analysis ?? []).map(link => link.targetPath),
  )
  const lensAnalysisDocs = analysisLenses
    .filter(lens =>
      lens.linkedModules.some(moduleSlug => relevantModuleSlugs.includes(moduleSlug)),
    )
    .flatMap(lens => lens.sourceRefs.map(ref => normalizeRepoPath(ref.path)).filter((ref): ref is string => Boolean(ref)))
    .filter(ref => ref.startsWith('analysis/'))

  return {
    path: relativePath,
    language: inferLanguage(relativePath),
    rawContent,
    highlightLines: highlightLine ? [highlightLine] : undefined,
    symbol,
    linkedAnalysisDocs: Array.from(new Set([...directAnalysisDocs, ...lensAnalysisDocs])),
  }
}

export function getRelatedCodeFlowsForPath(relativePath: string) {
  return codeFlows.filter(flow => flow.nodes.some(node => node.filePath === relativePath))
}

export function getArchitectureNodes() {
  return architectureNodes
}

export function getStageEvidence(stageId: string) {
  return stageEvidenceMap[stageId]
}

export function getPrimaryPathForFlow(flow: CodeFlow) {
  return flow.nodes[0]?.filePath
}

export function getPrimaryModuleForStage(stageId: string) {
  const stage = learningStages.find(item => item.id === stageId)
  return stage ? getLearningModule(stage.modules[0]) : undefined
}
