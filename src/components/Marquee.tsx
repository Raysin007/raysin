import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  SiReact, SiTypescript, SiNextdotjs, SiTailwindcss,
  SiNodedotjs, SiExpress, SiPostgresql,
  SiFigma, SiDocker, SiGithubactions, SiVercel, SiLinux,
} from 'react-icons/si'
import './Marquee.css'

gsap.registerPlugin(ScrollTrigger)

const items = [
  { label: 'React', Icon: SiReact, color: '#61DAFB' },
  { label: 'TypeScript', Icon: SiTypescript, color: '#3178C6' },
  { label: 'Next.js', Icon: SiNextdotjs, color: '#fafafa' },
  { label: 'Tailwind CSS', Icon: SiTailwindcss, color: '#38BDF8' },
  { label: 'Node.js', Icon: SiNodedotjs, color: '#6DA55F' },
  { label: 'Express', Icon: SiExpress, color: '#fafafa' },
  { label: 'PostgreSQL', Icon: SiPostgresql, color: '#316192' },
  { label: 'Figma', Icon: SiFigma, color: '#F24E1E' },
  { label: 'Docker', Icon: SiDocker, color: '#2496ED' },
  { label: 'GitHub Actions', Icon: SiGithubactions, color: '#fafafa' },
  { label: 'Vercel', Icon: SiVercel, color: '#fafafa' },
  { label: 'Linux', Icon: SiLinux, color: '#FCC624' },
]

export default function Marquee() {
  const itemsList = [...items, ...items]
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(sectionRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 90%',
          }
        }
      )
    })
    return () => ctx.revert()
  }, [])

  return (
    <div ref={sectionRef} className="marquee-section" style={{ opacity: 0 }}>
      <div className="marquee-track">
        {itemsList.map((item, i) => (
          <span key={`${item.label}-${i}`} className="marquee-item">
            <item.Icon size={32} color={item.color} />
            <span className="marquee-dot" />
          </span>
        ))}
      </div>
    </div>
  )
}
