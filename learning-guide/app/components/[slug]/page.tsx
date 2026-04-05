import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getComponentModule } from '@/lib/content'
import { createAnalysisHref, createSourceHref } from '@/lib/sourceLinks'
import { PageShell, Section, SimpleList, StatusBadge } from '@/components/ui'

export default async function ComponentModulePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const module = getComponentModule(slug)

  if (!module) {
    notFound()
  }

  return (
    <PageShell>
      <section className="hero">
        <p className="eyebrow">Component Study</p>
        <div className="pill-row">
          <StatusBadge status={module.status} />
          <span className="meta-chip">{module.difficulty}</span>
          <span className="meta-chip">{module.estimatedMinutes} 分钟</span>
        </div>
        <h1>{module.title}</h1>
        <p>{module.summary}</p>
      </section>

      <div className="split">
        <Section title="这一页要解决什么" eyebrow="Goal">
          <p>{module.goal}</p>
        </Section>
        <Section title="当前状态" eyebrow="Status">
          <p>{module.status === 'planned' ? '该模块当前为全量覆盖占位，后续会逐步补细。' : module.plainExplanation}</p>
        </Section>
      </div>

      <Section title="为什么重要" eyebrow="Why It Matters">
        <SimpleList items={module.whyItMatters} />
      </Section>

      <Section title="当前知识点" eyebrow="Key Points">
        <SimpleList items={module.keyPoints.map(point => `${point.title}：${point.summary}`)} />
      </Section>

      <div className="split">
        <Section title="如何映射到你的项目" eyebrow="Project Mapping">
          {module.projectMappings.length ? (
            module.projectMappings.map(mapping => (
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
            ))
          ) : (
            <p>该模块当前还没有单独的项目映射说明。</p>
          )}
        </Section>

        <Section title="来源文档" eyebrow="Sources">
          <div className="route-links">
            {module.sourceRefs.map(ref => {
              const cleanPath = ref.path.replace(/^\.\.\//, '')
              const href = cleanPath.startsWith('analysis/')
                ? createAnalysisHref(cleanPath)
                : createSourceHref(cleanPath)
              return (
                <Link href={href} key={ref.path}>
                  {ref.label}
                </Link>
              )
            })}
          </div>
        </Section>
      </div>

      <Section title="继续探索" eyebrow="Navigation">
        <div className="route-links">
          {module.related.map(item => (
            <Link href={`/components/${item}`} key={item}>
              相关模块：{item}
            </Link>
          ))}
          <Link href="/map">回到学习地图</Link>
        </div>
      </Section>
    </PageShell>
  )
}
