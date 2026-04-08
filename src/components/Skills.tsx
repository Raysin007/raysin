const skills = [
  {
    icon: '⚡',
    name: 'Frontend',
    desc: 'Building modern, responsive UIs',
    tags: ['React', 'TypeScript', 'Next.js', 'Tailwind'],
  },
  {
    icon: '🛠️',
    name: 'Backend',
    desc: 'Scalable APIs and server-side logic',
    tags: ['Node.js', 'Express', 'PostgreSQL', 'REST'],
  },
  {
    icon: '🎨',
    name: 'Design',
    desc: 'Clean interfaces with great UX',
    tags: ['Figma', 'CSS', 'Animations', 'A11y'],
  },
  {
    icon: '🚀',
    name: 'DevOps',
    desc: 'Deploying and maintaining apps',
    tags: ['Docker', 'GitHub Actions', 'Vercel', 'Linux'],
  },
]

export default function Skills() {
  return (
    <section id="skills" className="section skills-bg">
      <div className="container">
        <span className="section-label">What I Do</span>
        <h2 className="section-title">Skills &amp; Expertise</h2>
        <p className="section-desc">
          A toolkit built over years of shipping real products — from idea to production.
        </p>
        <div className="skills-grid">
          {skills.map(s => (
            <div key={s.name} className="skill-card">
              <div className="skill-icon">{s.icon}</div>
              <div className="skill-name">{s.name}</div>
              <p style={{ fontSize: 14, color: 'var(--text-muted)', marginBottom: 4 }}>{s.desc}</p>
              <div className="skill-tags">
                {s.tags.map(t => <span key={t} className="tag">{t}</span>)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
