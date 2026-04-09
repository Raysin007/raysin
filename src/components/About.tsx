import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const stats = [
  { number: '1+', label: 'Years Experience' },
  { number: '10+', label: 'Projects Shipped' },
  { number: '10+', label: 'Happy Clients' },
  { number: '∞', label: 'Coffee Consumed' },
]

export default function About() {
  const sectionRef = useRef<HTMLElement>(null)
  const avatarRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(avatarRef.current,
        { x: -60, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 0.9, ease: 'power3.out',
          scrollTrigger: {
            trigger: avatarRef.current, start: 'top 95%', end: 'bottom 5%',
            toggleActions: 'play reverse play reverse'
          }
        }
      )
      gsap.fromTo(textRef.current,
        { x: 60, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 0.9, ease: 'power3.out',
          scrollTrigger: {
            trigger: textRef.current, start: 'top 95%', end: 'bottom 5%',
            toggleActions: 'play reverse play reverse'
          }
        }
      )
      gsap.fromTo('.stat-card',
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.5, ease: 'power3.out',
          stagger: 0.1,
          scrollTrigger: {
            trigger: statsRef.current, start: 'top 95%', end: 'bottom 5%',
            toggleActions: 'play reverse play reverse'
          }
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="about" className="section">
      <div className="container">
        <div className="about-grid">
          <div ref={avatarRef} className="about-avatar-wrap" style={{ opacity: 0 }}>
            <div className="about-avatar">
              <span className="about-avatar-inner"><img src="./rahul.png" alt="Rahul" /></span>
            </div>
            <div ref={statsRef} className="about-stats">
              {stats.map(s => (
                <div key={s.label} className="stat-card">
                  <div className="stat-number">{s.number}</div>
                  <div className="stat-label">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div ref={textRef} style={{ opacity: 0 }}>
            <span className="section-label">About Me</span>
            <h2 className="section-title">
              Passionate about <span className="gradient-text">great software</span>
            </h2>
            <p className="section-desc" style={{ marginBottom: 20 }}>
              I'm a full-stack developer based in the beautiful hills of Darjeeling who loves building
              web applications that are both beautiful and functional. My focus is on
              writing clean, maintainable code with a strong emphasis on user experience.
            </p>
            <p className="section-desc">
              When I'm not coding, you'll find me capturing beautiful moments on my camera,
              documenting my life, or spending quality time alone in the mountains.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
