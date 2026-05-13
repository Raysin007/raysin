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
import { LuCode, LuServer, LuPalette, LuRocket } from 'react-icons/lu'
import './Skills.css'

gsap.registerPlugin(ScrollTrigger)

const skills = [
  {
    Icon: LuCode,
    name: 'Frontend',
    desc: 'Crafting immersive interfaces with modern frameworks and pixel-perfect attention to detail.',
    tags: [
      { label: 'React',       TagIcon: SiReact,        color: '#61DAFB' },
      { label: 'TypeScript',  TagIcon: SiTypescript,   color: '#3178C6' },
      { label: 'Next.js',     TagIcon: SiNextdotjs,    color: '#ffffff' },
      { label: 'Tailwind',    TagIcon: SiTailwindcss,  color: '#38BDF8' },
    ],
  },
  {
    Icon: LuServer,
    name: 'Backend',
    desc: 'Architecting robust, scalable server-side systems and efficient database structures.',
    tags: [
      { label: 'Node.js',    TagIcon: SiNodedotjs,   color: '#6DA55F' },
      { label: 'Express',    TagIcon: SiExpress,      color: '#ffffff' },
      { label: 'PostgreSQL', TagIcon: SiPostgresql,   color: '#316192' },
      { label: 'REST APIs',  TagIcon: TbApi,          color: '#a1a1aa' },
    ],
  },
  {
    Icon: LuPalette,
    name: 'Design',
    desc: 'Designing user-centric digital experiences that blend aesthetic beauty with intuitive flow.',
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
    desc: 'Streamlining deployment pipelines and managing infrastructure for maximum uptime.',
    tags: [
      { label: 'Docker',          TagIcon: SiDocker,         color: '#2496ED' },
      { label: 'GitHub Actions',  TagIcon: SiGithubactions,  color: '#ffffff' },
      { label: 'Vercel',          TagIcon: SiVercel,         color: '#ffffff' },
      { label: 'Linux',           TagIcon: SiLinux,          color: '#FCC624' },
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
          y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 85%',
          }
        }
      )
      gsap.fromTo('.skill-card-v2',
        { y: 50, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.6, ease: 'power3.out',
          stagger: 0.1,
          scrollTrigger: {
            trigger: '.skills-grid-v2',
            start: 'top 85%',
          }
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="skills" className="skills-v2">
      <div className="container">
        <div ref={headerRef} className="skills-header">
          <span className="skills-label">// Skills</span>
          <h2 className="skills-main-title">
            Expertise & <span>Toolkit</span>
          </h2>
          <p className="skills-desc">
            A comprehensive suite of technologies I use to bring complex ideas to life across the entire stack.
          </p>
        </div>

        <div className="skills-grid-v2">
          {skills.map((s) => (
            <div key={s.name} className="skill-card-v2">
              <div className="skill-icon-v2">
                <s.Icon />
              </div>
              <h3 className="skill-name-v2">{s.name}</h3>
              <p className="skill-desc-v2">{s.desc}</p>
              <div className="skill-tags-v2">
                {s.tags.map(t => (
                  <span key={t.label} className="skill-tag-v2">
                    <t.TagIcon size={12} color={t.color} />
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
