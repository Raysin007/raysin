import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function Hero() {
  const badgeRef = useRef<HTMLDivElement>(null)
  const nameRef = useRef<HTMLHeadingElement>(null)
  const roleRef = useRef<HTMLParagraphElement>(null)
  const descRef = useRef<HTMLParagraphElement>(null)
  const actionsRef = useRef<HTMLDivElement>(null)

  const scrollTo = (id: string) =>
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.7 })
    tl.fromTo(badgeRef.current,
      { y: 24, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' }
    )
    .fromTo(nameRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
      '-=0.3'
    )
    .fromTo(roleRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' },
      '-=0.45'
    )
    .fromTo(descRef.current,
      { y: 24, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' },
      '-=0.35'
    )
    .fromTo(actionsRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out' },
      '-=0.3'
    )
  }, [])

  return (
    <section className="hero section">
      <div className="hero-video-bg">
        <video
          className="hero-video"
          src="/darjeeling.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        />
        <div className="hero-video-overlay" />
      </div>

      <div className="container hero-content">
        <div ref={badgeRef} className="hero-badge" style={{ opacity: 0 }}>
          <span className="hero-badge-dot" />
          Available for work
        </div>
        <h1 ref={nameRef} className="hero-name" style={{ opacity: 0 }}>
          Hi, I'm <span className="hero-name-accent">Rahul</span>
        </h1>
        <p ref={roleRef} className="hero-role" style={{ opacity: 0 }}>
          Full-Stack Developer &amp; Photographer
        </p>
        <p ref={descRef} className="hero-desc" style={{ opacity: 0 }}>
          I craft pixel-perfect web experiences with clean code and thoughtful design.
          Turning ideas into fast, accessible, and beautiful products.
        </p>
        <div ref={actionsRef} className="hero-actions" style={{ opacity: 0 }}>
          <a
            href="#projects"
            className="btn btn-primary"
            onClick={e => { e.preventDefault(); scrollTo('#projects') }}
          >
            View Projects
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 17L17 7M17 7H7M17 7v10"/>
            </svg>
          </a>
          <a
            href="#contact"
            className="btn btn-outline"
            onClick={e => { e.preventDefault(); scrollTo('#contact') }}
          >
            Get in Touch
          </a>
        </div>
      </div>
    </section>
  )
}
