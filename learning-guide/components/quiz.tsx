'use client'

import { useEffect, useMemo, useState } from 'react'
import type { QuizQuestion } from '@/content/types'
import { readProgress, writeProgress } from '@/lib/progress'

export function InteractiveQuiz({
  moduleSlug,
  questions,
}: {
  moduleSlug: string
  questions: QuizQuestion[]
}) {
  return (
    <div className="grid">
      {questions.map((question, index) => (
        <QuizCard
          key={question.id ?? question.prompt}
          question={question}
          questionId={`${moduleSlug}:${question.id ?? index}`}
        />
      ))}
    </div>
  )
}

function QuizCard({
  question,
  questionId,
}: {
  question: QuizQuestion
  questionId: string
}) {
  const [selected, setSelected] = useState<string | null>(null)
  const [submitted, setSubmitted] = useState(false)
  const [storedCorrect, setStoredCorrect] = useState<boolean | null>(null)

  useEffect(() => {
    const progress = readProgress()
    const saved = progress.quizResults?.[questionId]
    if (typeof saved === 'boolean') {
      setStoredCorrect(saved)
    }
  }, [questionId])

  const isCorrect = useMemo(() => {
    if (!selected) {
      return false
    }
    return selected === question.answer
  }, [question.answer, selected])

  function submitAnswer() {
    if (!selected) {
      return
    }

    const progress = readProgress()
    writeProgress({
      visited: progress.visited,
      quizResults: {
        ...(progress.quizResults ?? {}),
        [questionId]: isCorrect,
      },
    })
    setStoredCorrect(isCorrect)
    setSubmitted(true)
  }

  if (!question.options?.length) {
    return (
      <article className="module-card">
        <h3>{question.prompt}</h3>
        <p>
          <strong>答案：</strong>
          {question.answer}
        </p>
        <p>{question.explanation}</p>
      </article>
    )
  }

  return (
    <article className="module-card">
      <h3>{question.prompt}</h3>
      <div className="quiz-options">
        {question.options.map(option => {
          const checked = selected === option
          return (
            <button
              className={`quiz-option ${checked ? 'quiz-option-selected' : ''}`.trim()}
              key={option}
              onClick={() => setSelected(option)}
              type="button"
            >
              {option}
            </button>
          )
        })}
      </div>
      <div className="quiz-actions">
        <button className="quiz-submit" disabled={!selected} onClick={submitAnswer} type="button">
          提交答案
        </button>
        {storedCorrect !== null ? (
          <span className={`quiz-state ${storedCorrect ? 'quiz-state-correct' : 'quiz-state-wrong'}`}>
            {storedCorrect ? '已答对' : '还没答对'}
          </span>
        ) : null}
      </div>
      {submitted ? (
        <div className={`quiz-feedback ${isCorrect ? 'quiz-feedback-correct' : 'quiz-feedback-wrong'}`}>
          <p>
            <strong>{isCorrect ? '回答正确。' : '回答不正确。'}</strong>
          </p>
          {!isCorrect ? (
            <p>
              <strong>正确答案：</strong>
              {question.answer}
            </p>
          ) : null}
          <p>{question.explanation}</p>
        </div>
      ) : null}
    </article>
  )
}
