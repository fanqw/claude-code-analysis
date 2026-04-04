import Link from 'next/link'
import { notFound } from 'next/navigation'
import { AnalysisLensBoard } from '@/components/analysis-lens-board'
import { ModuleLayers } from '@/components/module-layers'
import { PseudoCodeBlock } from '@/components/pseudo-code-block'
import { ModuleVisitTracker } from '@/components/progress'
import { InteractiveQuiz } from '@/components/quiz'
import { getAnalysisLens, getCodeFlow, getDiagram, getFlow, getLearningModule, getLearningNeighbors, learningModules } from '@/lib/content'
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
  const conceptDiagram = getDiagram(module.conceptDiagramId)
  const runtimeFlows = (module.runtimeFlowIds ?? [])
    .map(id => getFlow(id))
    .filter((flow): flow is NonNullable<typeof flow> => Boolean(flow))
  const codeFlows = (module.codeFlowIds ?? [])
    .map(id => getCodeFlow(id))
    .filter((flow): flow is NonNullable<typeof flow> => Boolean(flow))
  const analysisLenses = (module.analysisLensIds ?? [])
    .map(id => getAnalysisLens(id))
    .filter((lens): lens is NonNullable<typeof lens> => Boolean(lens))

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
        <Section title="一句话结论" eyebrow="Takeaway">
          <p>{module.plainExplanation}</p>
        </Section>
        <Section title="下一步应该做什么" eyebrow="Next Click">
          <div className="route-links">
            {next ? <Link href={`/learn/${next.slug}`}>继续到：{next.title}</Link> : null}
            <Link href="/sources">看相关源码</Link>
            <Link href="/map">回到阶段图</Link>
          </div>
        </Section>
      </div>

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

      {(conceptDiagram || runtimeFlows.length || codeFlows.length) ? (
        <Section title="概念图 + 运行流 + 源码流" eyebrow="Three-Layer View">
          <ModuleLayers codeFlows={codeFlows} concept={conceptDiagram} runtimeFlows={runtimeFlows} />
        </Section>
      ) : null}

      <details className="details-panel">
        <summary>切换到深入版：思维方式 + 伪代码</summary>
        <div className="split details-body">
          <Section title="这章应该怎么想" eyebrow="Mindset">
            {module.mindset?.length ? <SimpleList items={module.mindset} /> : <p>当前模块暂无额外思维提示。</p>}
          </Section>
          <Section title="把它跑成脑内伪代码" eyebrow="Pseudo Walkthrough">
            {module.pseudoCode?.length ? <PseudoCodeBlock steps={module.pseudoCode} title={`${module.title} mental run`} /> : <p>当前模块暂无伪代码。</p>}
          </Section>
        </div>
      </details>

      {analysisLenses.length ? (
        <Section title="analysis 分析洞察" eyebrow="Analysis Lenses">
          <AnalysisLensBoard lenses={analysisLenses.slice(0, 2)} />
          {analysisLenses.length > 2 ? (
            <details className="details-panel">
              <summary>打开更多 analysis 视角</summary>
              <div className="details-body">
                <AnalysisLensBoard lenses={analysisLenses.slice(2)} />
              </div>
            </details>
          ) : null}
        </Section>
      ) : null}

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
          <div className="route-links">
            {module.sourceRefs.map(ref => {
              const cleanPath = ref.path.replace(/^\.\.\//, '')
              return (
                <Link href={`/source?path=${encodeURIComponent(cleanPath)}`} key={ref.path}>
                  {ref.label}
                </Link>
              )
            })}
          </div>
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
