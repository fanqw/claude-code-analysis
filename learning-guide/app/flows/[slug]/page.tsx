import { notFound } from 'next/navigation'
import { getFlow } from '@/lib/content'
import { PageShell, Section, StatusBadge } from '@/components/ui'

export default async function FlowPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const flow = getFlow(slug)

  if (!flow) {
    notFound()
  }

  return (
    <PageShell>
      <section className="hero">
        <p className="eyebrow">Flow Walkthrough</p>
        <div className="pill-row">
          <StatusBadge status={flow.status} />
        </div>
        <h1>{flow.title}</h1>
        <p>{flow.summary}</p>
      </section>

      <div className="split">
        <Section title="场景" eyebrow="Scenario">
          <p>{flow.scenario}</p>
        </Section>
        <Section title="关联模块" eyebrow="Related Modules">
          <div className="pill-row">
            {flow.relatedModules.map(item => (
              <span className="meta-chip" key={item}>
                {item}
              </span>
            ))}
          </div>
        </Section>
      </div>

      <Section title="步骤演示" eyebrow="Step By Step">
        {flow.steps.map((step, index) => (
          <article className="flow-step" key={step.title}>
            <strong>
              Step {index + 1}. {step.title}
            </strong>
            <p>
              <strong>输入：</strong>
              {step.input}
            </p>
            <p>
              <strong>输出：</strong>
              {step.output}
            </p>
            <p>
              <strong>为什么这样设计：</strong>
              {step.designReason}
            </p>
          </article>
        ))}
      </Section>
    </PageShell>
  )
}
