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

export default function App() {
  const [scrollProgress, setScrollProgress] = useState(0)
  const glowRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight
      setScrollProgress(h > 0 ? window.scrollY / h : 0)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (glowRef.current) {
        glowRef.current.style.transform = `translate(${e.clientX - 350}px, ${e.clientY - 350}px)`
      }
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  // Magnetic buttons
  useEffect(() => {
    const handleMagnetic = (e: MouseEvent) => {
      const btns = document.querySelectorAll<HTMLElement>('.btn, .btn-contact-v2, .btn-about-work, .navbar-cta')
      btns.forEach(btn => {
        const rect = btn.getBoundingClientRect()
        const cx = rect.left + rect.width / 2
        const cy = rect.top + rect.height / 2
        const dx = e.clientX - cx
        const dy = e.clientY - cy
        const dist = Math.sqrt(dx * dx + dy * dy)
        const threshold = 80
        if (dist < threshold) {
          const pull = (1 - dist / threshold) * 0.35
          btn.style.transform = `translate(${dx * pull}px, ${dy * pull}px)`
        } else {
          btn.style.transform = ''
        }
      })
    }
    window.addEventListener('mousemove', handleMagnetic, { passive: true })
    return () => window.removeEventListener('mousemove', handleMagnetic)
  }, [])

  return (
    <>
      <div
        className="scroll-progress"
        style={{ transform: `scaleX(${scrollProgress})` }}
      />
      <div ref={glowRef} className="cursor-glow" />
      <Navbar />
      <Hero />
      <About />
      <Marquee />
      <Services />
      <Projects />
      <Contact />
      <Footer />
    </>
  )
}
