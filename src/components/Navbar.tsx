import { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import './Navbar.css'

const links = [
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Work', href: '#projects' },
]

interface NavbarProps {
  startAnimation: boolean
}

export default function Navbar({ startAnimation }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const navRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!startAnimation) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        navRef.current,
        { y: -60, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out', delay: 0.2 }
      )
    })
    return () => ctx.revert()
  }, [startAnimation])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 100)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNav = (href: string) => {
    setOpen(false)
    const lenis = (window as any).lenis
    if (lenis) {
      lenis.scrollTo(href)
    } else {
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <nav ref={navRef} className={`navbar ${scrolled ? 'scrolled' : ''}`} style={{ opacity: 0 }}>
      <div className="container navbar-inner">
        <a
          href="#"
          className="navbar-logo"
          onClick={(e) => {
            e.preventDefault()
            const lenis = (window as any).lenis
            if (lenis) {
              lenis.scrollTo(0)
            } else {
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }
          }}
        >
          Ray<span>sin</span>
        </a>

        <ul className={`navbar-links ${open ? 'open' : ''}`}>
          {links.map(l => (
            <li key={l.href}>
              <a href={l.href} onClick={e => { e.preventDefault(); handleNav(l.href) }}>
                {l.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href="#contact"
              className="navbar-cta"
              onClick={e => { e.preventDefault(); handleNav('#contact') }}
            >
              Contact
            </a>
          </li>
        </ul>

        <button
          className="hamburger"
          onClick={() => setOpen(o => !o)}
          aria-label="Toggle menu"
        >
          <span style={{ transform: open ? 'rotate(45deg) translate(5px, 5px)' : '' }} />
          <span style={{ opacity: open ? 0 : 1 }} />
          <span style={{ transform: open ? 'rotate(-45deg) translate(5px, -5px)' : '' }} />
        </button>
      </div>
    </nav>
  )
}
