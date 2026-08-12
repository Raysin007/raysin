import { useEffect, useState, useRef } from 'react'
import gsap from 'gsap'
import './Loader.css'

interface LoaderProps {
  onComplete: () => void
}

export default function Loader({ onComplete }: LoaderProps) {
  const [progress, setProgress] = useState(0)
  const [statusText, setStatusText] = useState('INITIALIZING PORTFOLIO...')
  
  const containerRef = useRef<HTMLDivElement>(null)
  const logoRef = useRef<HTMLDivElement>(null)
  const barRef = useRef<HTMLDivElement>(null)
  const counterRef = useRef<HTMLDivElement>(null)
  const statusRef = useRef<HTMLDivElement>(null)
  const gridLinesRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Disable scrolling during load
    document.body.style.overflow = 'hidden'
    const lenis = (window as any).lenis
    if (lenis) lenis.stop()

    // Preload key images
    const imagesToPreload = ['/raysin.png']
    let imagesLoaded = false
    let loadedCount = 0

    if (imagesToPreload.length === 0) {
      imagesLoaded = true
    } else {
      imagesToPreload.forEach(src => {
        const img = new Image()
        img.src = src
        img.onload = () => {
          loadedCount++
          if (loadedCount === imagesToPreload.length) {
            imagesLoaded = true
          }
        }
        img.onerror = () => {
          loadedCount++
          if (loadedCount === imagesToPreload.length) {
            imagesLoaded = true
          }
        }
      })
    }

    const obj = { value: 0 }
    
    // Create GSAP Timeline for Loader
    const tl = gsap.timeline({
      onComplete: () => {
        // Wait for images to load, if not already loaded, before finishing
        const checkLoaded = setInterval(() => {
          if (imagesLoaded) {
            clearInterval(checkLoaded)
            triggerExit()
          }
        }, 100)
      }
    })

    // 1. Animate grid lines appearing
    tl.fromTo('.loader-grid-line',
      { opacity: 0 },
      { opacity: 0.1, duration: 0.8, stagger: 0.05, ease: 'power2.out' }
    )

    // 2. Animate elements entry
    tl.fromTo(logoRef.current?.querySelectorAll('.loader-logo-char') || [],
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.08, ease: 'back.out(1.7)' },
      '-=0.4'
    )
    
    tl.fromTo([barRef.current, counterRef.current, statusRef.current],
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: 'power2.out' },
      '-=0.4'
    )

    // 3. Animate progress count
    tl.to(obj, {
      value: 100,
      duration: 2.8,
      ease: 'power1.inOut',
      onUpdate: () => {
        const currentVal = Math.floor(obj.value)
        setProgress(currentVal)
        
        // Dynamic status updates
        if (currentVal < 25) {
          setStatusText('CONNECTING TO PORTFOLIO SERVER...')
        } else if (currentVal < 50) {
          setStatusText('LOADING WEBLIB & STYLESHEETS...')
        } else if (currentVal < 75) {
          setStatusText('CACHING INTERACTIVE ASSETS...')
        } else if (currentVal < 95) {
          setStatusText('RENDERING GSAP TIMELINES...')
        } else {
          setStatusText('SYSTEM READY.')
        }
      }
    })

    const triggerExit = () => {
      const exitTl = gsap.timeline({
        onComplete: () => {
          // Re-enable scrolling
          document.body.style.overflow = ''
          const lenis = (window as any).lenis
          if (lenis) lenis.start()
          
          // Refresh scroll triggers for exact calculations
          setTimeout(() => {
            import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
              ScrollTrigger.refresh()
            })
          }, 100)

          onComplete()
        }
      })

      // Elegant fade out of inner elements
      exitTl.to([barRef.current, counterRef.current, statusRef.current], {
        opacity: 0,
        y: -15,
        duration: 0.4,
        ease: 'power3.in'
      })

      // Logo letters dispersing/flying out
      exitTl.to(logoRef.current?.querySelectorAll('.loader-logo-char') || [], {
        y: -50,
        opacity: 0,
        letterSpacing: '1.2em',
        stagger: 0.04,
        duration: 0.6,
        ease: 'power3.in'
      }, '-=0.2')

      // Grid lines fading
      exitTl.to('.loader-grid-line', {
        opacity: 0,
        duration: 0.4,
        stagger: 0.02
      }, '-=0.4')

      // Entire preloader sliding up cleanly with a premium expo curve
      exitTl.to(containerRef.current, {
        yPercent: -100,
        duration: 1.1,
        ease: 'expo.inOut'
      }, '-=0.3')
    }

    return () => {
      tl.kill()
    }
  }, [onComplete])

  // Split logo word for individual character stagger effects
  const logoWord = 'RAYSIN'

  return (
    <div ref={containerRef} className="loader-screen">
      {/* Blueprint Grid Lines for Cyberpunk Tech Aesthetics */}
      <div ref={gridLinesRef} className="loader-grid" aria-hidden="true">
        <div className="loader-grid-line loader-v-line" style={{ left: '15%' }} />
        <div className="loader-grid-line loader-v-line" style={{ left: '30%' }} />
        <div className="loader-grid-line loader-v-line" style={{ left: '50%' }} />
        <div className="loader-grid-line loader-v-line" style={{ left: '70%' }} />
        <div className="loader-grid-line loader-v-line" style={{ left: '85%' }} />
        
        <div className="loader-grid-line loader-h-line" style={{ top: '20%' }} />
        <div className="loader-grid-line loader-h-line" style={{ top: '50%' }} />
        <div className="loader-grid-line loader-h-line" style={{ top: '80%' }} />
      </div>

      <div className="loader-content">
        {/* Animated Brand Logo */}
        <div ref={logoRef} className="loader-logo">
          {logoWord.split('').map((char, index) => (
            <span key={index} className="loader-logo-char">
              {char}
            </span>
          ))}
        </div>

        {/* Loading Progress Bar Container */}
        <div ref={barRef} className="loader-bar-wrap">
          <div 
            className="loader-bar-fill" 
            style={{ width: `${progress}%` }} 
          />
        </div>

        {/* Info Rows */}
        <div className="loader-info">
          <div ref={statusRef} className="loader-status">
            {statusText}
          </div>
          <div ref={counterRef} className="loader-counter">
            {progress.toString().padStart(3, '0')}%
          </div>
        </div>
      </div>
    </div>
  )
}
