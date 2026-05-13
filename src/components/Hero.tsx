import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import ParticleField from './ParticleField'
import './Hero.css'

const roles = [
  'Full-Stack Developer',
  'UI/UX Enthusiast',
  'Photographer',
  'Creative Coder',
]

export default function Hero() {
  const navRef = useRef<HTMLDivElement>(null)
  const socialsRef = useRef<HTMLDivElement>(null)
  const roleRef = useRef<HTMLDivElement>(null)
  const badgeRef = useRef<HTMLDivElement>(null)
  const marqueeRef = useRef<HTMLDivElement>(null)
  const portraitRef = useRef<HTMLImageElement>(null)

  const [roleText, setRoleText] = useState('')
  const [roleIdx, setRoleIdx] = useState(0)
  const [typing, setTyping] = useState(true)

  const scrollTo = (id: string) =>
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })

  // Typewriter
  useEffect(() => {
    const target = roles[roleIdx]
    let timeout: ReturnType<typeof setTimeout>
    if (typing) {
      if (roleText.length < target.length) {
        timeout = setTimeout(() => setRoleText(target.slice(0, roleText.length + 1)), 60)
      } else {
        timeout = setTimeout(() => setTyping(false), 2200)
      }
    } else {
      if (roleText.length > 0) {
        timeout = setTimeout(() => setRoleText(roleText.slice(0, -1)), 35)
      } else {
        setRoleIdx(i => (i + 1) % roles.length)
        setTyping(true)
      }
    }
    return () => clearTimeout(timeout)
  }, [roleText, typing, roleIdx])

  // GSAP entrance
  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.4 })
    tl.fromTo(navRef.current,
      { y: -24, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' }
    )
    .fromTo(marqueeRef.current,
      { opacity: 0, scale: 0.96 },
      { opacity: 1, scale: 1, duration: 1.1, ease: 'power3.out' },
      '-=0.3'
    )
    .fromTo(portraitRef.current,
      { y: 80, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: 'power3.out' },
      '-=0.8'
    )
    .fromTo(badgeRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' },
      '-=0.5'
    )
    .fromTo(roleRef.current,
      { y: 16, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out' },
      '-=0.4'
    )
    .fromTo(socialsRef.current,
      { x: -20, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.5, ease: 'power3.out' },
      '-=0.3'
    )
  }, [])

  return (
    <section className="hero-v2">
      <ParticleField />

      {/* Grid overlay */}
      <div className="hero-grid-overlay" aria-hidden="true" />

      {/* ── Top nav bar ── */}
      <nav ref={navRef} className="hero-topnav" style={{ opacity: 0 }}>
        <span className="hero-topnav-logo">© Raysin &amp; Design</span>
        <a
          href="#contact"
          className="hero-topnav-contact"
          onClick={e => { e.preventDefault(); scrollTo('#contact') }}
        >
          Contact
        </a>
      </nav>

      {/* ── Oversized scrolling name ── */}
      <div ref={marqueeRef} className="hero-marquee-wrap" style={{ opacity: 0 }} aria-hidden="true">
        <div className="hero-marquee-track">
          <span className="hero-marquee-text">Raysin &nbsp;—&nbsp; Raysin &nbsp;—&nbsp; </span>
          <span className="hero-marquee-text">Raysin &nbsp;—&nbsp; Raysin &nbsp;—&nbsp; </span>
          <span className="hero-marquee-text">Raysin &nbsp;—&nbsp; Raysin &nbsp;—&nbsp; </span>
        </div>
      </div>

      <img
        ref={portraitRef}
        src="/raysin.png"
        alt="Rahul"
        className="hero-portrait"
        style={{ opacity: 0 }}
      />


      {/* ── Social links — bottom left ── */}
      <div ref={socialsRef} className="hero-socials" style={{ opacity: 0 }}>
        <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hero-social-link">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/>
            <circle cx="4" cy="4" r="2"/>
          </svg>
          LinkedIn
        </a>
        <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hero-social-link">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
          </svg>
          Twitter
        </a>
        <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hero-social-link">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
            <circle cx="12" cy="12" r="4"/>
            <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
          </svg>
          Instagram
        </a>
      </div>

      <div ref={roleRef} className="hero-role-block" style={{ opacity: 0 }}>
        <div ref={badgeRef} className="hero-badge-inline">
          <span className="hero-badge-dot" />
          Available for work
        </div>
        <p className="hero-role-slash">// {roleText}<span className="hero-role-cursor" /></p>
        <p className="hero-role-title">Full-Stack Dev</p>
        <div className="hero-cta-row">
          <a
            href="#projects"
            className="btn btn-outline"
            onClick={e => { e.preventDefault(); scrollTo('#projects') }}
          >
            View Projects
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
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