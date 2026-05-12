import { useEffect, useRef, useCallback } from 'react'
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
import { LuCode, LuServer, LuPalette, LuRocket } from 'react-icons/lu'

gsap.registerPlugin(ScrollTrigger)

const skills = [
  {
    Icon: LuCode,
    name: 'Frontend',
    desc: 'Building modern, responsive UIs',
    tags: [
      { label: 'React',       TagIcon: SiReact,        color: '#61DAFB' },
      { label: 'TypeScript',  TagIcon: SiTypescript,   color: '#3178C6' },
      { label: 'Next.js',     TagIcon: SiNextdotjs,    color: '#fafafa' },
      { label: 'Tailwind',    TagIcon: SiTailwindcss,  color: '#38BDF8' },
    ],
  },
  {
    Icon: LuServer,
    name: 'Backend',
    desc: 'Scalable APIs and server-side logic',
    tags: [
      { label: 'Node.js',    TagIcon: SiNodedotjs,   color: '#6DA55F' },
      { label: 'Express',    TagIcon: SiExpress,      color: '#fafafa' },
      { label: 'PostgreSQL', TagIcon: SiPostgresql,   color: '#316192' },
      { label: 'REST',       TagIcon: TbApi,          color: '#a1a1aa' },
    ],
  },
  {
    Icon: LuPalette,
    name: 'Design',
    desc: 'Clean interfaces with great UX',
    tags: [
      { label: 'Figma',      TagIcon: SiFigma,            color: '#F24E1E' },
      { label: 'CSS',        TagIcon: SiCss,              color: '#264de4' },
      { label: 'Animations', TagIcon: RiSparkling2Fill,   color: '#a78bfa' },
      { label: 'A11y',       TagIcon: MdAccessibility,    color: '#34d399' },
    ],
  },
  {
    Icon: LuRocket,
    name: 'DevOps',
    desc: 'Deploying and maintaining apps',
    tags: [
      { label: 'Docker',          TagIcon: SiDocker,         color: '#2496ED' },
      { label: 'GitHub Actions',  TagIcon: SiGithubactions,  color: '#fafafa' },
      { label: 'Vercel',          TagIcon: SiVercel,         color: '#fafafa' },
      { label: 'Linux',           TagIcon: SiLinux,          color: '#FCC624' },
    ],
  },
]

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  const handleCardMouse = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget
    const rect = card.getBoundingClientRect()
    card.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`)
    card.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`)
  }, [])

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
      gsap.fromTo('.skill-card',
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.6, ease: 'power3.out',
          stagger: 0.1,
          scrollTrigger: {
            trigger: gridRef.current, start: 'top 90%', end: 'bottom 10%',
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
        <div ref={gridRef} className="skills-grid">
          {skills.map(s => (
            <div
              key={s.name}
              className="skill-card"
              style={{ opacity: 0 }}
              onMouseMove={handleCardMouse}
            >
              <div className="skill-icon">
                <s.Icon size={20} />
              </div>
              <div className="skill-name">{s.name}</div>
              <p className="skill-desc">{s.desc}</p>
              <div className="skill-tags">
                {s.tags.map(t => (
                  <span key={t.label} className="tag">
                    <t.TagIcon size={12} color={t.color} style={{ flexShrink: 0 }} />
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
