import { useEffect, useRef } from 'react'
import { useState } from 'react'
import './index.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Marquee from './components/Marquee'
import Projects from './components/Projects'
import { Services } from './components/Services'
import Contact from './components/Contact'
import Footer from './components/Footer'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import Loader from './components/Loader'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const glowRef = useRef<HTMLDivElement>(null)

  // Initialize Lenis smooth scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.6, // Slower duration for a luxurious, floating smooth effect
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Premium easeOutExpo scroll curve
      smoothWheel: true,
    })
    ;(window as any).lenis = lenis

    if (isLoading) {
      lenis.stop()
    }

    // Sync Lenis scroll with ScrollTrigger and update progress bar
    lenis.on('scroll', (e) => {
      ScrollTrigger.update()
      setScrollProgress(e.progress)
    })

    // Sync GSAP ticker with Lenis raf
    const updateLenis = (time: number) => {
      lenis.raf(time * 1000)
    }
    gsap.ticker.add(updateLenis)
    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.destroy()
      gsap.ticker.remove(updateLenis)
      ;(window as any).lenis = null
    }
  }, [])

  // Performant cursor glow tracking using gsap.quickTo
  useEffect(() => {
    if (!glowRef.current) return
    const glow = glowRef.current

    // GSAP quickTo setters for ultra-performant 60fps tracking
    const xTo = gsap.quickTo(glow, 'x', { duration: 0.8, ease: 'power3.out' })
    const yTo = gsap.quickTo(glow, 'y', { duration: 0.8, ease: 'power3.out' })

    // Centering the glow circle via percent translation (handled by GSAP)
    gsap.set(glow, { xPercent: -50, yPercent: -50, x: -1000, y: -1000 })

    const onMove = (e: MouseEvent) => {
      xTo(e.clientX)
      yTo(e.clientY)
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  // High-performance layout-stable magnetic buttons using hover-based listeners
  useEffect(() => {
    const timer = setTimeout(() => {
      const btns = document.querySelectorAll<HTMLElement>(
        '.btn, .btn-contact-v2, .btn-about-work, .navbar-cta, .about-cta, .social-link-v2, .hero-social-link'
      )

      const handleMouseEnter = (e: MouseEvent) => {
        const btn = e.currentTarget as HTMLElement
        const rect = btn.getBoundingClientRect()
        // Cache absolute page center coordinates to completely bypass layout reflows on mousemove
        const cx = rect.left + rect.width / 2 + window.scrollX
        const cy = rect.top + rect.height / 2 + window.scrollY
        btn.setAttribute('data-cx', cx.toString())
        btn.setAttribute('data-cy', cy.toString())
      }

      const handleMouseMove = (e: MouseEvent) => {
        const btn = e.currentTarget as HTMLElement
        const cx = parseFloat(btn.getAttribute('data-cx') || '0') - window.scrollX
        const cy = parseFloat(btn.getAttribute('data-cy') || '0') - window.scrollY
        const dx = e.clientX - cx
        const dy = e.clientY - cy

        const dist = Math.sqrt(dx * dx + dy * dy)
        const threshold = 80

        if (dist < threshold) {
          const pull = (1 - dist / threshold) * 0.35
          // Use GSAP for ultra-smooth 60fps tracking instead of direct styling
          gsap.to(btn, {
            x: dx * pull,
            y: dy * pull,
            duration: 0.3,
            ease: 'power2.out',
            overwrite: 'auto'
          })
        }
      }

      const handleMouseLeave = (e: MouseEvent) => {
        const btn = e.currentTarget as HTMLElement
        // Premium elastic return spring animation
        gsap.to(btn, {
          x: 0,
          y: 0,
          duration: 0.6,
          ease: 'elastic.out(1, 0.3)',
          overwrite: 'auto'
        })
      }

      btns.forEach(btn => {
        btn.addEventListener('mouseenter', handleMouseEnter)
        btn.addEventListener('mousemove', handleMouseMove)
        btn.addEventListener('mouseleave', handleMouseLeave)
      })

      ;(window as any)._magneticCleanup = () => {
        btns.forEach(btn => {
          btn.removeEventListener('mouseenter', handleMouseEnter)
          btn.removeEventListener('mousemove', handleMouseMove)
          btn.removeEventListener('mouseleave', handleMouseLeave)
        })
      }
    }, 500)

    return () => {
      clearTimeout(timer)
      if ((window as any)._magneticCleanup) {
        ;(window as any)._magneticCleanup()
      }
    }
  }, [])

  // Synchronize Lenis scroll state with isLoading state changes
  useEffect(() => {
    const lenis = (window as any).lenis
    if (lenis) {
      if (isLoading) {
        lenis.stop()
      } else {
        lenis.start()
      }
    }
  }, [isLoading])

  return (
    <>
      {isLoading && <Loader onComplete={() => setIsLoading(false)} />}
      <div
        className="scroll-progress"
        style={{ transform: `scaleX(${scrollProgress})` }}
      />
      <div ref={glowRef} className="cursor-glow" />
      <Navbar startAnimation={!isLoading} />
      <Hero startAnimation={!isLoading} />
      <About />
      <Marquee />
      <Services />
      <Projects />
      <Contact />
      <Footer />
    </>
  )
}
