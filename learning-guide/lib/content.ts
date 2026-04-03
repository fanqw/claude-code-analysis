import { buildGuides, buildGuidesBySlug } from '@/content/buildGuides'
import { componentModules, componentModulesBySlug } from '@/content/componentModules'
import { learningFlows, flowsBySlug } from '@/content/flows'
import { learningModules, modulesBySlug } from '@/content/modules'

export function getRecommendedPath() {
  return [
    'architecture',
    'tool-call',
    'prompt',
    'context',
    'session-storage',
    'agent-memory',
    'sandbox',
    'mcp',
    'skills',
    'multi-agent',
    'security',
    'competition',
  ]
}

export function getModulesByStatus() {
  return {
    ready: learningModules.filter(module => module.status === 'ready').length,
    seeded: learningModules.filter(module => module.status === 'seeded').length,
    planned: learningModules.filter(module => module.status === 'planned').length,
  }
}

export function getCoreModules() {
  return learningModules.filter(module => module.category === 'core')
}

export function getRiskModules() {
  return learningModules.filter(module => module.category === 'risk')
}

export function getGlobalModules() {
  return learningModules.filter(module => module.category === 'global')
}

export function getLearningModule(slug: string) {
  return modulesBySlug[slug]
}

export function getLearningNeighbors(slug: string) {
  const index = learningModules.findIndex(module => module.slug === slug)
  if (index === -1) {
    return { previous: undefined, next: undefined }
  }

  return {
    previous: learningModules[index - 1],
    next: learningModules[index + 1],
  }
}

export function getComponentModule(slug: string) {
  return componentModulesBySlug[slug]
}

export function getFlow(slug: string) {
  return flowsBySlug[slug]
}

export function getBuildGuide(slug: string) {
  return buildGuidesBySlug[slug]
}

export { buildGuides, componentModules, learningFlows, learningModules }
