import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const projects = [
  {
    image: 'https://images.unsplash.com/photo-1557821552-17105176677c?w=600&h=400&fit=crop',
    gradient: 'linear-gradient(135deg, #7c3aed22, #06b6d422)',
    title: 'E-Commerce Platform',
    desc: 'Full-stack shopping app with auth, cart, payments and admin dashboard.',
    tags: ['React', 'Node.js', 'Stripe'],
    demo: '#',
    code: '#',
  },
  {
    image: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=600&h=400&fit=crop',
    gradient: 'linear-gradient(135deg, #06b6d422, #10b98122)',
    title: 'Real-time Chat App',
    desc: 'WebSocket-powered messenger with rooms, typing indicators and media sharing.',
    tags: ['Socket.io', 'React', 'MongoDB'],
    demo: '#',
    code: '#',
  },
  {
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop',
    gradient: 'linear-gradient(135deg, #f59e0b22, #ef444422)',
    title: 'Analytics Dashboard',
    desc: 'Interactive data visualization with real-time charts and filtering.',
    tags: ['D3.js', 'TypeScript', 'REST API'],
    demo: '#',
    code: '#',
  },
]

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headerRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.7, ease: 'power3.out',
          scrollTrigger: {
            trigger: headerRef.current, start: 'top 95%', end: 'bottom 5%',
            toggleActions: 'play reverse play reverse'
          }
        }
      )
      gsap.fromTo('.project-card',
        { y: 60, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.65, ease: 'power3.out',
          stagger: 0.15,
          scrollTrigger: {
            trigger: '.projects-grid', start: 'top 95%', end: 'bottom 5%',
            toggleActions: 'play reverse play reverse'
          }
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="projects" className="section">
      <div className="container">
        <div ref={headerRef} style={{ opacity: 0 }}>
          <span className="section-label">My Work</span>
          <h2 className="section-title">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="section-desc">
            A selection of projects I've built — each one solving a real problem.
          </p>
        </div>
        <div className="projects-grid">
          {projects.map(p => (
            <div key={p.title} className="project-card" style={{ opacity: 0 }}>
              <div className="project-thumb" style={{ background: p.gradient }}>
                <img 
                  src={p.image} 
                  alt={p.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    opacity: 0.8
                  }}
                />
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