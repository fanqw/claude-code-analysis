import { componentModules } from '@/content/componentModules'
import { buildGuides } from '@/content/buildGuides'
import { moduleEvidenceMap } from '@/content/evidenceMap'
import { learningFlows } from '@/content/flows'
import { learningModules } from '@/content/modules'

const allRefs = [
  ...learningModules.flatMap(module => module.sourceRefs),
  ...componentModules.flatMap(module => module.sourceRefs),
  ...learningFlows.flatMap(flow => flow.sourceRefs),
  ...Object.values(moduleEvidenceMap).flatMap(entry => [
    ...entry.analysis.map(link => ({ label: link.label, path: `../${link.targetPath}` })),
    ...entry.source.map(link => ({ label: link.label, path: `../${link.targetPath}` })),
  ]),
]

export const sourceIndex = Array.from(
  new Map(allRefs.map(ref => [ref.path, ref])).values(),
).sort((a, b) => a.path.localeCompare(b.path))

export const coverageStats = {
  learningModules: learningModules.length,
  componentModules: componentModules.length,
  flows: learningFlows.length,
  buildGuides: buildGuides.length,
  sourceRefs: sourceIndex.length,
  readyLearningModules: learningModules.filter(module => module.status === 'ready').length,
  readyComponentModules: componentModules.filter(module => module.status === 'ready').length,
}

export const sourceGroups = [
  {
    label: 'analysis 章节',
    count: sourceIndex.filter(ref => ref.path.startsWith('../analysis/')).length,
  },
  {
    label: 'src 源码',
    count: sourceIndex.filter(ref => ref.path.startsWith('../src/')).length,
  },
  {
    label: 'README / 其他索引',
    count: sourceIndex.filter(
      ref =>
        !ref.path.startsWith('../analysis/') && !ref.path.startsWith('../src/'),
    ).length,
  },
]
