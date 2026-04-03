export const STORAGE_KEY = 'cc-learning-progress'

export type ProgressState = {
  visited: string[]
  quizResults?: Record<string, boolean>
}

export function readProgress(): ProgressState {
  if (typeof window === 'undefined') {
    return { visited: [], quizResults: {} }
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) {
      return { visited: [], quizResults: {} }
    }

    const parsed = JSON.parse(raw) as ProgressState
    return {
      visited: Array.isArray(parsed.visited) ? parsed.visited : [],
      quizResults: parsed.quizResults ?? {},
    }
  } catch {
    return { visited: [], quizResults: {} }
  }
}

export function writeProgress(state: ProgressState) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
}
