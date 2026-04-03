'use client'

import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'
import type { LearningModule } from '@/content/types'
import { readProgress } from '@/lib/progress'

export function ReviewDashboard({
  modules,
}: {
  modules: LearningModule[]
}) {
  const [visited, setVisited] = useState<string[]>([])
  const [quizResults, setQuizResults] = useState<Record<string, boolean>>({})

  useEffect(() => {
    const progress = readProgress()
    setVisited(progress.visited)
    setQuizResults(progress.quizResults ?? {})
  }, [])

  const unvisitedModules = useMemo(
    () =>
      modules.filter(module => !visited.includes(`learn:${module.slug}`)).slice(0, 6),
    [modules, visited],
  )

  const retryModules = useMemo(
    () =>
      modules
        .filter(module =>
          module.quiz.some((question, index) => {
            const result = quizResults[`${module.slug}:${question.id ?? index}`]
            return result === false
          }),
        )
        .slice(0, 6),
    [modules, quizResults],
  )

  const masteredModules = useMemo(
    () =>
      modules
        .filter(module => module.quiz.length > 0)
        .filter(module =>
          module.quiz.every((question, index) => {
            const result = quizResults[`${module.slug}:${question.id ?? index}`]
            return result === true
          }),
        )
        .slice(0, 6),
    [modules, quizResults],
  )

  return (
    <div className="review-grid">
      <ReviewColumn
        title="优先复习"
        description="这些章节里至少有一道题答错过，适合优先回看。"
        modules={retryModules}
      />
      <ReviewColumn
        title="还没开始"
        description="这些模块你还没有打开过，可以按推荐路径继续。"
        modules={unvisitedModules}
      />
      <ReviewColumn
        title="已经掌握"
        description="这些模块的题目目前都答对了，可以作为后续复盘基线。"
        modules={masteredModules}
      />
    </div>
  )
}

function ReviewColumn({
  title,
  description,
  modules,
}: {
  title: string
  description: string
  modules: LearningModule[]
}) {
  return (
    <section className="module-card">
      <h3>{title}</h3>
      <p>{description}</p>
      {modules.length ? (
        <div className="route-links">
          {modules.map(module => (
            <Link href={`/learn/${module.slug}`} key={module.slug}>
              {module.title}
            </Link>
          ))}
        </div>
      ) : (
        <p className="muted">当前没有对应章节。</p>
      )}
    </section>
  )
}
