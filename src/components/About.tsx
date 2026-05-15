import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './About.css'

gsap.registerPlugin(ScrollTrigger)

export default function About() {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const bodyRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Premium character-by-character reveal
      const chars = headingRef.current?.querySelectorAll('.char')
      if (chars) {
        gsap.fromTo(chars,
          { opacity: 0.05 },
          {
            opacity: 1,
            stagger: 0.05,
            duration: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: headingRef.current,
              start: 'top 85%',
              end: 'top 15%',
              scrub: true,
            }
          }
        )
      }

      // Smooth body reveal
      gsap.fromTo(bodyRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: bodyRef.current,
            start: 'top 95%',
          }
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const scrollToProjects = () => {
    document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })
  }

  const aboutText = "I'm a multidisciplinary developer from Darjeeling who helps creators to build engaging online experiences."

  return (
    <section ref={sectionRef} id="about" className="about-v2">
      <div className="container">
        <span className="about-label">// Intro</span>

        <h2 ref={headingRef} className="about-title">
          {aboutText.split("").map((char, i) => (
            <span key={i} className="char">{char}</span>
          ))}
        </h2>

        <div ref={bodyRef} className="about-body">
          <p className="about-description">
            Bringing your vision to life quickly and efficiently — whether
            it's branding, apps, or websites — I've got it covered,
            delivering smooth and effective solutions from start to finish.
          </p>

          <div className="about-footer">
            <button onClick={scrollToProjects} className="about-cta">
              Explore my work
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M7 17L17 7M17 7H7M17 7v10" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
