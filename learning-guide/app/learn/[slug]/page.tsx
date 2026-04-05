import Link from 'next/link'
import { notFound } from 'next/navigation'
import { AnalysisLensBoard } from '@/components/analysis-lens-board'
import { CodeViewer } from '@/components/code-viewer'
import { MarkdownEvidence } from '@/components/markdown-evidence'
import { ModuleLayers } from '@/components/module-layers'
import { PseudoCodeBlock } from '@/components/pseudo-code-block'
import {
  getAnalysisLens,
  getCodeFlow,
  getDiagram,
  getFlow,
  getLearningModule,
  getLearningNeighbors,
  getLearningStageForModule,
  getRecommendedPathLabel,
  guideSnapshotLabel,
  learningModules,
} from '@/lib/content'
import { getAnalysisDocument, getModuleEvidence, getSourceDocument } from '@/lib/evidence'
import { createAnalysisHref, createSourceHref } from '@/lib/sourceLinks'
import { PageShell, Section, SimpleList, StatusBadge, TutorialHeader } from '@/components/ui'

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
  const evidence = await getModuleEvidence(module)
  const primaryAnalysis = evidence.analysis[0]
  const primarySource = evidence.source[0]
  const analysisDoc = primaryAnalysis ? await getAnalysisDocument(primaryAnalysis.targetPath) : null
  const sourceDoc = primarySource ? await getSourceDocument(primarySource.targetPath, primarySource.symbol) : null
  const stage = getLearningStageForModule(slug)
  const pathLabel = getRecommendedPathLabel(slug)

  return (
    <PageShell>
      <TutorialHeader
        breadcrumbs={[
          { label: '开始学习', href: '/' },
          { label: '学习地图', href: '/map' },
          { label: module.title },
        ]}
        stage={stage?.title}
        pathLabel={pathLabel}
        updatedLabel={guideSnapshotLabel}
        nextLabel={next ? `读完后继续：${next.title}` : '当前已到主线末尾'}
      />
      <section className="hero hero-compact tutorial-hero">
        <p className="eyebrow">先读这一章</p>
        <div className="pill-row">
          <StatusBadge status={module.status} />
          <span className="meta-chip">{module.difficulty}</span>
          <span className="meta-chip">{module.estimatedMinutes} 分钟</span>
        </div>
        <h1>{module.title}</h1>
        <p>{module.summary}</p>
      </section>

      <div className="tutorial-main-stack">
        <div className="split tutorial-intro-split">
        <Section className="tutorial-main-section" title="一句话结论" eyebrow="先抓住这一章在解释什么">
          <p>{evidence.summary}</p>
        </Section>
        <Section className="tutorial-support-section" title="为什么现在学这章" eyebrow="它在主线里的位置">
          <SimpleList items={module.whyItMatters} />
        </Section>
      </div>

      <div className="split tutorial-intro-split">
        <Section className="tutorial-main-section" title="先这样理解" eyebrow="先按这个顺序读">
          <p>{module.plainExplanation}</p>
        </Section>
        <Section className="tutorial-support-section" title="读完这一屏后去哪里" eyebrow="最小下一步">
          <div className="route-links">
            {next ? <Link href={`/learn/${next.slug}`}>继续到：{next.title}</Link> : null}
            <Link href="/map">回到阶段图</Link>
            <Link href="/analysis">需要核验时再看 analysis 原文</Link>
            <Link href="/sources">需要核验时再看真实源码</Link>
          </div>
        </Section>
      </div>

      {(conceptDiagram || runtimeFlows.length || codeFlows.length) ? (
        <Section className="tutorial-main-section tutorial-visual-section" title="流程总览" eyebrow="这一章的主视图">
          <ModuleLayers codeFlows={codeFlows} concept={conceptDiagram} runtimeFlows={runtimeFlows} />
        </Section>
      ) : null}

      <Section className="tutorial-main-section" title="学完这一章后你能做什么" eyebrow="这一章的目标">
        <p>{module.goal}</p>
      </Section>
      </div>

      <details className="details-panel">
        <summary>展开证据与扩展</summary>
        <div className="details-body details-stack">
          <div className="split">
            <Section title="思路和伪代码" eyebrow="再补一层理解">
              {module.mindset?.length ? <SimpleList items={module.mindset} /> : <p>当前模块暂无额外思维提示。</p>}
              {module.pseudoCode?.length ? <PseudoCodeBlock steps={module.pseudoCode} title={`${module.title} mental run`} /> : null}
            </Section>
            <Section title="先修与相关" eyebrow="需要时再展开">
              {prerequisiteTitles.length ? (
                <div className="route-links">
                  {prerequisiteTitles.map(item => (
                    <Link href={`/learn/${item!.slug}`} key={item!.slug}>
                      先修：{item!.title}
                    </Link>
                  ))}
                </div>
              ) : (
                <p>这是推荐学习路径的起点模块之一，可以直接开始。</p>
              )}
              {relatedTitles.length ? (
                <div className="route-links">
                  {relatedTitles.map(item => (
                    <Link href={`/learn/${item!.slug}`} key={item!.slug}>
                      相关：{item!.title}
                    </Link>
                  ))}
                </div>
              ) : null}
            </Section>
          </div>

          {analysisLenses.length ? (
            <Section title="analysis 视角" eyebrow="需要补角度时再看">
              <AnalysisLensBoard lenses={analysisLenses} />
            </Section>
          ) : null}

          <Section className="evidence-workbench" title="真实证据" eyebrow="最后再对回原文">
            <div className="split split-balanced">
              <div className="evidence-stack">
                <Section title="analysis 原文" eyebrow="原始分析">
                  {analysisDoc ? (
                    <>
                      <div className="route-links">
                        <Link href={createAnalysisHref(analysisDoc.path)}>打开完整原文</Link>
                        {evidence.analysis.slice(1, 3).map(link => (
                          <Link href={createAnalysisHref(link.targetPath)} key={link.targetPath}>
                            {link.label}
                          </Link>
                        ))}
                      </div>
                      <MarkdownEvidence content={analysisDoc.rawContent.split('\n').slice(0, 60).join('\n')} />
                    </>
                  ) : (
                    <p>当前模块还没有挂接到真实 analysis 原文。</p>
                  )}
                </Section>

                <Section title="源码入口" eyebrow="真实代码">
                  {sourceDoc ? (
                    <>
                      <div className="route-links">
                        <Link href={createSourceHref(sourceDoc.path, sourceDoc.symbol)}>打开完整源码</Link>
                        {evidence.source.slice(1, 4).map(link => (
                          <Link href={createSourceHref(link.targetPath, link.symbol)} key={`${link.targetPath}-${link.symbol ?? ''}`}>
                            {link.label}
                          </Link>
                        ))}
                      </div>
                      <CodeViewer
                        content={sourceDoc.rawContent.split('\n').slice(0, 80).join('\n')}
                        highlightLines={sourceDoc.highlightLines}
                        language={sourceDoc.language}
                      />
                    </>
                  ) : (
                    <p>当前模块还没有挂接到真实源码入口。</p>
                  )}
                </Section>
              </div>

              <Section title="证据导航" eyebrow="从这里进入核验">
                <div className="source-list">
                  <strong>真实 analysis</strong>
                  {evidence.analysis.map(link => (
                    <Link href={createAnalysisHref(link.targetPath)} key={link.targetPath}>
                      {link.label}
                    </Link>
                  ))}
                </div>
                <div className="source-list">
                  <strong>真实源码</strong>
                  {evidence.source.map(link => (
                    <Link href={createSourceHref(link.targetPath, link.symbol)} key={`${link.targetPath}-${link.symbol ?? ''}`}>
                      {link.label}
                    </Link>
                  ))}
                </div>
              </Section>
            </div>
          </Section>

          <div className="split">
            <Section title="知识点与项目映射" eyebrow="最后补充">
              <div className="grid">
                {module.keyPoints.map(point => (
                  <article className="module-card" key={point.title}>
                    <h3>{point.title}</h3>
                    <p>{point.summary}</p>
                  </article>
                ))}
              </div>

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
                {evidence.analysis.map(ref => (
                  <Link href={createAnalysisHref(ref.targetPath)} key={ref.targetPath}>
                    {ref.label}
                  </Link>
                ))}
                {evidence.source.map(ref => (
                  <Link href={createSourceHref(ref.targetPath, ref.symbol)} key={`${ref.targetPath}-${ref.symbol ?? ''}`}>
                    {ref.label}
                  </Link>
                ))}
              </div>
            </Section>
          </div>
        </div>
      </details>

      <Section className="tutorial-support-section" title="继续阅读" eyebrow="导航只保留最小一组">
        <div className="route-links">
          {previous ? <Link href={`/learn/${previous.slug}`}>上一章：{previous.title}</Link> : null}
          {next ? <Link href={`/learn/${next.slug}`}>下一章：{next.title}</Link> : null}
          <Link href="/map">回到学习地图</Link>
        </div>
      </Section>
    </PageShell>
  )
}
