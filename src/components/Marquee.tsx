import {
  SiReact, SiTypescript, SiNextdotjs, SiTailwindcss,
  SiNodedotjs, SiExpress, SiPostgresql,
  SiFigma, SiDocker, SiGithubactions, SiVercel, SiLinux,
} from 'react-icons/si'

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
  const doubled = [...items, ...items]

  return (
    <div className="marquee-section">
      <div className="marquee-track">
        {doubled.map((item, i) => (
          <span key={`${item.label}-${i}`} className="marquee-item">
            <item.Icon size={16} color={item.color} />
            {item.label}
            <span className="marquee-dot" />
          </span>
        ))}
      </div>
    </div>
  )
}
