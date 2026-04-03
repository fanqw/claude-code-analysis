import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ModuleVisitTracker } from '@/components/progress'
import { InteractiveQuiz } from '@/components/quiz'
import { getLearningModule, getLearningNeighbors, learningModules } from '@/lib/content'
import { PageShell, Section, SimpleList, StatusBadge } from '@/components/ui'

export default async function LearnModulePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const module = getLearningModule(slug)

  if (!module) {
    notFound()
  }

  const { previous, next } = getLearningNeighbors(slug)
  const prerequisiteTitles = module.prerequisites
    .map(item => learningModules.find(entry => entry.slug === item))
    .filter(Boolean)
  const relatedTitles = module.related
    .map(item => learningModules.find(entry => entry.slug === item))
    .filter(Boolean)

  return (
    <PageShell>
      <ModuleVisitTracker slug={`learn:${module.slug}`} />
      <section className="hero">
        <p className="eyebrow">Learning Module</p>
        <div className="pill-row">
          <StatusBadge status={module.status} />
          <span className="pill">{module.difficulty}</span>
          <span className="pill">{module.estimatedMinutes} 分钟</span>
        </div>
        <h1>{module.title}</h1>
        <p>{module.summary}</p>
      </section>

      <div className="split">
        <Section title="学完你应该会什么" eyebrow="Goal">
          <p>{module.goal}</p>
        </Section>
        <Section title="先用白话讲清楚" eyebrow="Plain Explanation">
          <p>{module.plainExplanation}</p>
        </Section>
      </div>

      <Section title="为什么重要" eyebrow="Why It Matters">
        <SimpleList items={module.whyItMatters} />
      </Section>

      <div className="split">
        <Section title="先修章节" eyebrow="Prerequisites">
          {prerequisiteTitles.length ? (
            <div className="route-links">
              {prerequisiteTitles.map(item => (
                <Link href={`/learn/${item!.slug}`} key={item!.slug}>
                  {item!.title}
                </Link>
              ))}
            </div>
          ) : (
            <p>这是推荐学习路径的起点模块之一，可以直接开始。</p>
          )}
        </Section>
        <Section title="相关章节" eyebrow="Related">
          {relatedTitles.length ? (
            <div className="route-links">
              {relatedTitles.map(item => (
                <Link href={`/learn/${item!.slug}`} key={item!.slug}>
                  {item!.title}
                </Link>
              ))}
            </div>
          ) : (
            <p>当前没有额外关联模块。</p>
          )}
        </Section>
      </div>

      <Section title="核心知识点" eyebrow="Key Points">
        <div className="grid">
          {module.keyPoints.map(point => (
            <article className="module-card" key={point.title}>
              <h3>{point.title}</h3>
              <p>{point.summary}</p>
            </article>
          ))}
        </div>
      </Section>

      <div className="split">
        <Section title="如何映射到你的项目" eyebrow="Project Mapping">
          {module.projectMappings.map(mapping => (
            <div className="flow-step" key={mapping.targetLayer}>
              <strong>{mapping.targetLayer}</strong>
              <p>
                <strong>最小实现：</strong>
                {mapping.minimumImplementation}
              </p>
              <p>
                <strong>进阶实现：</strong>
                {mapping.advancedImplementation}
              </p>
              <p>
                <strong>何时延后：</strong>
                {mapping.whenToDelay}
              </p>
            </div>
          ))}
        </Section>

        <Section title="源码映射" eyebrow="Source References">
          <table className="table">
            <thead>
              <tr>
                <th>来源</th>
                <th>路径</th>
                <th>说明</th>
              </tr>
            </thead>
            <tbody>
              {module.sourceRefs.map(ref => (
                <tr key={ref.path}>
                  <td>{ref.label}</td>
                  <td>{ref.path}</td>
                  <td>{ref.note ?? '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Section>
      </div>

      <Section title="自测题" eyebrow="Quiz">
        {module.quiz.length ? (
          <InteractiveQuiz moduleSlug={module.slug} questions={module.quiz} />
        ) : (
          <p>该模块当前处于占位或种子状态，后续会补充练习题。</p>
        )}
      </Section>

      <Section title="继续学习" eyebrow="Next Step">
        <div className="route-links">
          {previous ? <Link href={`/learn/${previous.slug}`}>上一章：{previous.title}</Link> : null}
          {next ? <Link href={`/learn/${next.slug}`}>下一章：{next.title}</Link> : null}
          <Link href="/map">回到学习地图</Link>
        </div>
      </Section>
    </PageShell>
  )
}
