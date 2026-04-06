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
  const primaryQuestion = module.whyItMatters[0] ?? module.summary

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
        <div className="hero-grid tutorial-hero-grid">
          <div>
            <p className="eyebrow">Chapter</p>
            <div className="pill-row">
              <StatusBadge status={module.status} />
              <span className="meta-chip">{module.difficulty}</span>
              <span className="meta-chip">{module.estimatedMinutes} 分钟</span>
            </div>
            <h1>{module.title}</h1>
            <p>{module.summary}</p>
          </div>
          <aside className="lesson-rail-card">
            <p className="eyebrow">本章只做三步</p>
            <h3>先抓问题，再看顺序</h3>
            <p>{primaryQuestion}</p>
            <div className="route-links route-links-vertical">
              <Link href="#overview">01 先看结论</Link>
              <Link href="#visuals">02 再看主视图</Link>
              <Link href="#actions">03 最后翻成人话</Link>
            </div>
          </aside>
        </div>
      </section>

      <div className="lesson-layout">
        <div className="tutorial-main-stack">
          <Section className="tutorial-main-section tutorial-rhythm-card" eyebrow="Read This Chapter Like This" title="这一章按这三步读">
            <div className="chapter-rhythm">
              <article className="chapter-rhythm-step">
                <span>01</span>
                <strong>先抓结论</strong>
                <p>先知道这章解决什么问题。</p>
              </article>
              <article className="chapter-rhythm-step">
                <span>02</span>
                <strong>再看图和顺序</strong>
                <p>用图把顺序感建立起来。</p>
              </article>
              <article className="chapter-rhythm-step">
                <span>03</span>
                <strong>最后再核验证据</strong>
                <p>最后再回原文和源码核验。</p>
              </article>
            </div>
          </Section>

          <Section className="tutorial-main-section tutorial-step-card" eyebrow="Step 1" id="overview" title="先抓一句话结论">
            <p>{evidence.summary}</p>
            <div className="lesson-mini-grid">
              <article className="mini-note">
                <strong>这一章为什么现在学</strong>
                <p>{module.whyItMatters[0] ?? module.summary}</p>
              </article>
              <article className="mini-note">
                <strong>学完这章你应能做到</strong>
                <p>{module.goal}</p>
              </article>
            </div>
          </Section>

          <Section className="tutorial-main-section tutorial-step-card" eyebrow="Step 2" id="visuals" title="先看主视图和运行顺序">
            {(conceptDiagram || runtimeFlows.length || codeFlows.length) ? (
              <ModuleLayers codeFlows={codeFlows} concept={conceptDiagram} runtimeFlows={runtimeFlows} />
            ) : (
              <p>当前章节暂未挂接主视图。</p>
            )}
          </Section>

          <Section className="tutorial-main-section tutorial-step-card" eyebrow="Step 3" id="actions" title="把图翻译成人话">
            <p>{module.plainExplanation}</p>
            {module.mindset?.length ? <SimpleList items={module.mindset} /> : null}
          </Section>

          {module.pseudoCode?.length ? (
            <Section className="tutorial-main-section tutorial-step-card" eyebrow="Step 4" id="pseudo" title="再用伪代码跑一遍">
              <PseudoCodeBlock steps={module.pseudoCode} title={`${module.title} mental run`} />
            </Section>
          ) : null}

          {analysisLenses.length ? (
            <Section className="tutorial-main-section" id="lenses" title="换角度时再看这些 analysis 视角" eyebrow="补充理解">
              <AnalysisLensBoard lenses={analysisLenses} />
            </Section>
          ) : null}

          <details className="details-panel">
            <summary>最后再展开真实证据</summary>
            <div className="details-body details-stack">
              <Section className="evidence-workbench" id="evidence" title="真实证据" eyebrow="最后再对回原文">
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
                <Section title="知识点与项目映射" eyebrow="把这一章迁移到你的项目">
                  <div className="grid">
                    {module.keyPoints.map(point => (
                      <article className="module-card module-card-quiet" key={point.title}>
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

                  <Section title="需要时再展开" eyebrow="先修与相关">
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
            </div>
          </details>
        </div>

        <aside className="lesson-sidebar">
          <Section className="lesson-sidebar-card" title="本章路线" eyebrow="只保留最小导航">
            <div className="lesson-outline">
              <Link href="#overview">01 先抓结论</Link>
              <Link href="#visuals">02 看主视图</Link>
              <Link href="#actions">03 翻成人话</Link>
              {module.pseudoCode?.length ? <Link href="#pseudo">04 跑伪代码</Link> : null}
              {analysisLenses.length ? <Link href="#lenses">05 换 analysis 视角</Link> : null}
              <Link href="#evidence">最后再做证据核验</Link>
            </div>
            <div className="route-links route-links-vertical">
              {next ? <Link href={`/learn/${next.slug}`}>继续到：{next.title}</Link> : null}
              <Link href="/map">回到阶段图</Link>
              <Link href="/analysis">需要核验时再看原文</Link>
            </div>
          </Section>
        </aside>
      </div>

      <Section className="tutorial-support-section" title="继续阅读" eyebrow="只保留前后两步">
        <div className="route-links">
          {previous ? <Link href={`/learn/${previous.slug}`}>上一章：{previous.title}</Link> : null}
          {next ? <Link href={`/learn/${next.slug}`}>下一章：{next.title}</Link> : null}
          <Link href="/map">回到学习地图</Link>
        </div>
      </Section>
    </PageShell>
  )
}
