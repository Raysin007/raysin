import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const projects = [
  {
    image: '/1.png',
    title: 'E-Commerce Platform',
    desc: 'Full-stack shopping app with auth, cart, payments and admin dashboard. Built for scale with a clean component architecture.',
    tags: ['React', 'Node.js', 'Stripe'],
    demo: '#',
    code: '#',
  },
  {
    image: 'https://picsum.photos/seed/realtimechat/800/500',
    title: 'Real-time Chat App',
    desc: 'WebSocket-powered messenger with rooms, typing indicators and media sharing. Handles concurrent connections gracefully.',
    tags: ['Socket.io', 'React', 'MongoDB'],
    demo: '#',
    code: '#',
  },
  {
    image: 'https://picsum.photos/seed/analyticsdash/800/500',
    title: 'Analytics Dashboard',
    desc: 'Interactive data visualization with real-time charts, filtering and drill-down capabilities for complex datasets.',
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
            trigger: headerRef.current, start: 'top 90%', end: 'bottom 10%',
            toggleActions: 'play reverse play reverse'
          }
        }
      )
      gsap.fromTo('.project-card',
        { y: 50, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.7, ease: 'power3.out',
          stagger: 0.15,
          scrollTrigger: {
            trigger: '.projects-grid', start: 'top 90%', end: 'bottom 10%',
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
            Featured <span className="accent-text">Projects</span>
          </h2>
          <p className="section-desc">
            A selection of projects I've built — each one solving a real problem.
          </p>
        </div>
        <div className="projects-grid">
          {projects.map((p, i) => (
            <div key={p.title} className="project-card" style={{ opacity: 0 }}>
              <div className="project-thumb">
                <img
                  src={p.image}
                  alt={p.title}
                  loading="lazy"
                />
                <div className="project-thumb-overlay" />
              </div>
              <div className="project-body">
                <div className="project-number">Project {String(i + 1).padStart(2, '0')}</div>
                <div className="project-title">{p.title}</div>
                <p className="project-desc">{p.desc}</p>
                <div className="project-tags">
                  {p.tags.map(t => <span key={t} className="tag">{t}</span>)}
                </div>
                <div className="project-links">
                  <a href={p.demo} className="project-link">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M7 17L17 7M17 7H7M17 7v10"/>
                    </svg>
                    Live Demo
                  </a>
                  <a href={p.code} className="project-link project-link-secondary">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M16 18l6-6-6-6M8 6l-6 6 6 6"/>
                    </svg>
                    Source
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}