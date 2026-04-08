const projects = [
  {
    emoji: '🛒',
    gradient: 'linear-gradient(135deg, #7c3aed22, #06b6d422)',
    title: 'E-Commerce Platform',
    desc: 'Full-stack shopping app with auth, cart, payments and admin dashboard.',
    tags: ['React', 'Node.js', 'Stripe'],
    demo: '#',
    code: '#',
  },
  {
    emoji: '💬',
    gradient: 'linear-gradient(135deg, #06b6d422, #10b98122)',
    title: 'Real-time Chat App',
    desc: 'WebSocket-powered messenger with rooms, typing indicators and media sharing.',
    tags: ['Socket.io', 'React', 'MongoDB'],
    demo: '#',
    code: '#',
  },
  {
    emoji: '📊',
    gradient: 'linear-gradient(135deg, #f59e0b22, #ef444422)',
    title: 'Analytics Dashboard',
    desc: 'Interactive data visualization with real-time charts and filtering.',
    tags: ['D3.js', 'TypeScript', 'REST API'],
    demo: '#',
    code: '#',
  },
]

export default function Projects() {
  return (
    <section id="projects" className="section">
      <div className="container">
        <span className="section-label">My Work</span>
        <h2 className="section-title">
          Featured <span className="gradient-text">Projects</span>
        </h2>
        <p className="section-desc">
          A selection of projects I've built — each one solving a real problem.
        </p>
        <div className="projects-grid">
          {projects.map(p => (
            <div key={p.title} className="project-card">
              <div className="project-thumb" style={{ background: p.gradient }}>
                {p.emoji}
              </div>
              <div className="project-body">
                <div className="project-title">{p.title}</div>
                <p className="project-desc">{p.desc}</p>
                <div className="skill-tags" style={{ marginBottom: 16 }}>
                  {p.tags.map(t => <span key={t} className="tag">{t}</span>)}
                </div>
                <div className="project-links">
                  <a href={p.demo} className="project-link">↗ Live Demo</a>
                  <a href={p.code} className="project-link" style={{ color: 'var(--text-muted)' }}>⌥ Source</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
