import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import ParticleField from './ParticleField'
import MarqueeInvert from './Marqueeinvert'
import './Hero.css'

const roles = [
  'Full-Stack Developer',
  'UI/UX Enthusiast',
  'Photographer',
  'Creative Coder',
]

const MARQUEE_TEXT = "Raysin  —  Raysin  —  Raysin  —  Raysin  —  Raysin  —  Raysin  — "
const MARQUEE_DURATION = 50 // Speed of the black CSS text
const MARQUEE_INVERT_DURATION = 160// Speed of the inverted portrait effect (can be different)

// Black text alignment
const MARQUEE_TOP = "50%"
const MARQUEE_OFFSET_Y = "-68%"

// Inverted effect alignment
const INVERT_TOP = "50%"
const INVERT_OFFSET_Y = "-60%"

const MARQUEE_UNITS = 1 // Increased to ensure it covers any screen width seamlessly

export default function Hero() {
  const socialsRef  = useRef<HTMLDivElement>(null)
  const roleRef     = useRef<HTMLDivElement>(null)
  const badgeRef    = useRef<HTMLDivElement>(null)
  const marqueeRef  = useRef<HTMLDivElement>(null)
  const portraitRef = useRef<HTMLImageElement>(null)

  const [roleText, setRoleText] = useState('')
  const [roleIdx, setRoleIdx]   = useState(0)
  const [typing, setTyping]     = useState(true)

  // Responsive font size to match CSS clamp(100px, 14vw, 180px) on desktop, and clamp(70px, 20vw, 100px) on mobile (<= 768px)
  const getClampedFontSize = (width: number) => {
    if (width <= 768) {
      return Math.min(100, Math.max(70, width * 0.20))
    }
    return Math.min(180, Math.max(100, width * 0.14))
  }

  const [fontSize, setFontSize] = useState(() => getClampedFontSize(window.innerWidth))

  useEffect(() => {
    const onResize = () => setFontSize(getClampedFontSize(window.innerWidth))
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

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

  const marqueeTrackRef = useRef<HTMLDivElement>(null)
  const marqueeUnitRef  = useRef<HTMLSpanElement>(null)
  const [unitWidth, setUnitWidth] = useState(0)

  // Update unit width on resize
  useEffect(() => {
    const updateWidth = () => {
      if (marqueeUnitRef.current) {
        setUnitWidth(marqueeUnitRef.current.getBoundingClientRect().width)
      }
    }
    updateWidth()
    window.addEventListener('resize', updateWidth)
    return () => window.removeEventListener('resize', updateWidth)
  }, [])

  // GSAP entrance
  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.4 })
    tl.fromTo(marqueeRef.current,
      { opacity: 0, scale: 0.96 },
      { opacity: 1, scale: 1, duration: 1.1, ease: 'power3.out' }
    )
    .fromTo(portraitRef.current,
      { y: 80, xPercent: -50, opacity: 0 },
      { y: 0, xPercent: -50, opacity: 1, duration: 1.2, ease: 'power3.out' },
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

    // Continuous marquee animation
    gsap.to(marqueeTrackRef.current, {
      xPercent: -100 / MARQUEE_UNITS, // Exactly one unit
      duration: MARQUEE_DURATION,
      ease: 'none',
      repeat: -1
    }).totalTime(gsap.ticker.time) // Sync with global ticker time
  }, [])

  return (
    <section className="hero-v2">
      <ParticleField />
      <div className="hero-grid-overlay" aria-hidden="true" />

      {/* ── Layer 1: Black CSS marquee (z-index 1, behind portrait) ── */}
      <div
        ref={marqueeRef}
        className="hero-marquee-wrap"
        style={{
          opacity: 0,
          top: MARQUEE_TOP,
          transform: `translateY(${MARQUEE_OFFSET_Y})`
        }}
        aria-hidden="true"
      >
        <div ref={marqueeTrackRef} className="hero-marquee-track">
          {[...Array(MARQUEE_UNITS)].map((_, i) => (
            <span
              key={i}
              ref={i === 0 ? marqueeUnitRef : null}
              className="hero-marquee-text"
            >
              {MARQUEE_TEXT}
            </span>
          ))}
        </div>
      </div>

      {/* ── Layer 2: Portrait (z-index 2) ── */}
      <img
        ref={portraitRef}
        src="/raysin.png"
        alt="Raysin"
        className="hero-portrait"
        style={{ opacity: 0 }}
      />

      {/*
        ── Layer 3: Canvas inversion (z-index 3) ──

        MarqueeInvert draws the inverted portrait pixel-for-pixel
        but ONLY inside the text glyph shapes using canvas compositing
        (destination-in). Outside the glyphs the canvas is fully
        transparent, so the black CSS text below shows through perfectly.

        Speed, fontSize, and position mirror the CSS marquee exactly
        so both layers stay in sync.
      */}
      <MarqueeInvert
        imageSrc="/raysin.png"
        text={MARQUEE_TEXT}
        fontSize={fontSize}
        fontFamily="'Geist Sans', system-ui, -apple-system, sans-serif"
        duration={MARQUEE_INVERT_DURATION}
        unitWidth={unitWidth}
        top={INVERT_TOP}
        translateY={INVERT_OFFSET_Y}
      />

      {/* ── Social links — bottom left ── */}
      <div ref={socialsRef} className="hero-socials" style={{ opacity: 0 }}>
        <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hero-social-link">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/>
            <circle cx="4" cy="4" r="2"/>
          </svg>
          <span>LinkedIn</span>
        </a>
        <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hero-social-link">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
          </svg>
          <span>Twitter</span>
        </a>
        <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hero-social-link">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
            <circle cx="12" cy="12" r="4"/>
            <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
          </svg>
          <span>Instagram</span>
        </a>
      </div>

      {/* ── Role block — bottom right ── */}
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