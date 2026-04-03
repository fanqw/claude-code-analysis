'use client'

import { useEffect, useMemo, useState } from 'react'
import { readProgress, writeProgress } from '@/lib/progress'

export function ModuleVisitTracker({ slug }: { slug: string }) {
  useEffect(() => {
    const state = readProgress()
    if (state.visited.includes(slug)) {
      return
    }

    writeProgress({
      visited: [...state.visited, slug],
      quizResults: state.quizResults ?? {},
    })
  }, [slug])

  return null
}

export function ProgressOverview({
  totalModules,
}: {
  totalModules: number
}) {
  const [visited, setVisited] = useState<string[]>([])
  const [quizCorrect, setQuizCorrect] = useState(0)

  useEffect(() => {
    const progress = readProgress()
    setVisited(progress.visited)
    setQuizCorrect(
      Object.values(progress.quizResults ?? {}).filter(value => value).length,
    )
  }, [])

  const percent = useMemo(() => {
    if (!totalModules) {
      return 0
    }
    return Math.round((visited.length / totalModules) * 100)
  }, [totalModules, visited.length])

  return (
    <div className="progress-panel">
      <div className="progress-metrics">
        <strong>{visited.length}</strong>
        <span>已访问模块</span>
      </div>
      <div className="progress-metrics">
        <strong>{quizCorrect}</strong>
        <span>答对题目</span>
      </div>
      <div className="progress-track">
        <div className="progress-fill" style={{ width: `${percent}%` }} />
      </div>
      <p className="muted">当前覆盖进度 {percent}% 。这里记录的是你已经打开过的学习模块。</p>
    </div>
  )
}
