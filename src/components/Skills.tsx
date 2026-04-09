import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  SiReact, SiTypescript, SiNextdotjs, SiTailwindcss,
  SiNodedotjs, SiExpress, SiPostgresql,
  SiFigma, SiCss,
  SiDocker, SiGithubactions, SiVercel, SiLinux,
} from 'react-icons/si'
import { TbApi } from 'react-icons/tb'
import { MdAccessibility } from 'react-icons/md'
import { RiSparkling2Fill } from 'react-icons/ri'

gsap.registerPlugin(ScrollTrigger)

const skills = [
  {
    icon: '⚡',
    name: 'Frontend',
    desc: 'Building modern, responsive UIs',
    tags: [
      { label: 'React',       Icon: SiReact,        color: '#61DAFB' },
      { label: 'TypeScript',  Icon: SiTypescript,   color: '#3178C6' },
      { label: 'Next.js',     Icon: SiNextdotjs,    color: '#fff' },
      { label: 'Tailwind',    Icon: SiTailwindcss,  color: '#38BDF8' },
    ],
  },
  {
    icon: '🛠️',
    name: 'Backend',
    desc: 'Scalable APIs and server-side logic',
    tags: [
      { label: 'Node.js',    Icon: SiNodedotjs,   color: '#6DA55F' },
      { label: 'Express',    Icon: SiExpress,      color: '#fff' },
      { label: 'PostgreSQL', Icon: SiPostgresql,   color: '#316192' },
      { label: 'REST',       Icon: TbApi,          color: '#94a3b8' },
    ],
  },
  {
    icon: '🎨',
    name: 'Design',
    desc: 'Clean interfaces with great UX',
    tags: [
      { label: 'Figma',      Icon: SiFigma,            color: '#F24E1E' },
      { label: 'CSS',        Icon: SiCss,              color: '#264de4' },
      { label: 'Animations', Icon: RiSparkling2Fill,   color: '#a78bfa' },
      { label: 'A11y',       Icon: MdAccessibility,    color: '#22d3ee' },
    ],
  },
  {
    icon: '🚀',
    name: 'DevOps',
    desc: 'Deploying and maintaining apps',
    tags: [
      { label: 'Docker',          Icon: SiDocker,         color: '#2496ED' },
      { label: 'GitHub Actions',  Icon: SiGithubactions,  color: '#fff' },
      { label: 'Vercel',          Icon: SiVercel,         color: '#fff' },
      { label: 'Linux',           Icon: SiLinux,          color: '#FCC624' },
    ],
  },
]

export default function Skills() {
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
      gsap.fromTo('.skill-card',
        { y: 50, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.6, ease: 'power3.out',
          stagger: 0.12,
          scrollTrigger: {
            trigger: '.skills-grid', start: 'top 95%', end: 'bottom 5%',
            toggleActions: 'play reverse play reverse'
          }
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="skills" className="section skills-bg">
      <div className="container">
        <div ref={headerRef} style={{ opacity: 0 }}>
          <span className="section-label">What I Do</span>
          <h2 className="section-title">Skills &amp; Expertise</h2>
          <p className="section-desc">
            A toolkit built over years of shipping real products — from idea to production.
          </p>
        </div>
        <div className="skills-grid">
          {skills.map(s => (
            <div key={s.name} className="skill-card" style={{ opacity: 0 }}>
              <div className="skill-icon">{s.icon}</div>
              <div className="skill-name">{s.name}</div>
              <p style={{ fontSize: 14, color: 'var(--text-muted)', marginBottom: 4 }}>{s.desc}</p>
              <div className="skill-tags">
                {s.tags.map(t => (
                  <span key={t.label} className="tag skill-tag-icon">
                    <t.Icon size={13} color={t.color} style={{ flexShrink: 0 }} />
                    {t.label}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
