import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Projects.css'

gsap.registerPlugin(ScrollTrigger)

const projects = [
  {
    image: 'https://images.unsplash.com/photo-1557821552-17105176677c?q=80&w=1600&auto=format&fit=crop',
    title: 'E-Commerce Platform',
    desc: 'A high-performance shopping experience with a focus on seamless transitions and rapid checkout.',
    tags: ['React', 'Node.js', 'Stripe'],
    demo: '#',
    code: '#',
  },
  {
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827752f?q=80&w=1600&auto=format&fit=crop',
    title: 'Digital Workspace',
    desc: 'An integrated suite of tools designed for creators and remote teams to collaborate in real-time.',
    tags: ['Socket.io', 'React', 'MongoDB'],
    demo: '#',
    code: '#',
  },
  {
    image: 'https://images.unsplash.com/photo-1551288049-bbbda5366392?q=80&w=1600&auto=format&fit=crop',
    title: 'Data Visualization',
    desc: 'Translating complex datasets into interactive, beautiful, and actionable insights for decision makers.',
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
          y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 85%',
          }
        }
      )
      gsap.fromTo('.project-card-v2',
        { y: 60, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
          stagger: 0.2,
          scrollTrigger: {
            trigger: '.projects-grid-v2',
            start: 'top 80%',
          }
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="projects" className="projects-v2">
      <div className="container">
        <div ref={headerRef} className="projects-header">
          <span className="projects-label">// Work</span>
          <h2 className="projects-main-title">
            Featured <span>Creations</span>
          </h2>
          <p className="projects-desc">
            A selection of projects that showcase my passion for clean code and exceptional design.
          </p>
        </div>

        <div className="projects-grid-v2">
          {projects.map((p, i) => (
            <div key={p.title} className="project-card-v2">
              <div className="project-image-wrap">
                <img src={p.image} alt={p.title} loading="lazy" />
                <div className="project-overlay" />
              </div>
              <div className="project-info-v2">
                <div className="project-meta">
                  <span className="project-index">0{i + 1}</span>
                  <div className="project-tags-v2">
                    {p.tags.map(t => <span key={t}>{t}</span>)}
                  </div>
                </div>
                <h3 className="project-title-v2">{p.title}</h3>
                <p className="project-desc-v2">{p.desc}</p>
                <div className="project-links-v2">
                  <a href={p.demo} target="_blank" rel="noreferrer">Live Demo</a>
                  <a href={p.code} target="_blank" rel="noreferrer">Source Code</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
