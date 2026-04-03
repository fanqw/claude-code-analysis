import { notFound } from 'next/navigation'
import { getBuildGuide } from '@/lib/content'
import { PageShell, Section, SimpleList } from '@/components/ui'

export default async function BuildGuidePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const guide = getBuildGuide(slug)

  if (!guide) {
    notFound()
  }

  return (
    <PageShell>
      <section className="hero">
        <p className="eyebrow">Build Guide</p>
        <h1>{guide.title}</h1>
        <p>{guide.summary}</p>
      </section>

      <div className="split">
        <Section title="核心建议" eyebrow="Recommendation">
          <p>{guide.recommendation}</p>
        </Section>
        <Section title="验收检查点" eyebrow="Checkpoints">
          <SimpleList items={guide.checkpoints} />
        </Section>
      </div>

      <Section title="模块拆解" eyebrow="Modules">
        <table className="table">
          <thead>
            <tr>
              <th>模块</th>
              <th>职责</th>
              <th>优先级</th>
            </tr>
          </thead>
          <tbody>
            {guide.modules.map(item => (
              <tr key={item.name}>
                <td>{item.name}</td>
                <td>{item.responsibility}</td>
                <td>{item.priority}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Section>
    </PageShell>
  )
}
