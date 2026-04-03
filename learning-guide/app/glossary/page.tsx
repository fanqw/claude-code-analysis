import { glossary } from '@/content/glossary'
import { PageShell, Section } from '@/components/ui'

export default function GlossaryPage() {
  return (
    <PageShell>
      <section className="hero">
        <p className="eyebrow">Glossary</p>
        <h1>术语速查</h1>
        <p>这里收纳后续反复出现的核心工程术语，方便学习时随时对照。</p>
      </section>

      <Section title="核心术语" eyebrow="Terms">
        <div className="grid">
          {glossary.map(item => (
            <article className="module-card" key={item.term}>
              <h3>{item.term}</h3>
              <p>{item.definition}</p>
            </article>
          ))}
        </div>
      </Section>
    </PageShell>
  )
}
