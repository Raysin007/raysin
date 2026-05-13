import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './About.css'

gsap.registerPlugin(ScrollTrigger)

export default function About() {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(headingRef.current, {
        color: '#ffffff',
        duration: 1,
        scrollTrigger: {
          trigger: headingRef.current,
          start: 'top 80%',
          end: 'top 30%',
          scrub: true,
        }
      })
      gsap.to(headingRef.current?.querySelectorAll('span') || [], {
        color: '#fb5c3c',
        duration: 1,
        stagger: 0.1,
        scrollTrigger: {
          trigger: headingRef.current,
          start: 'top 80%',
          end: 'top 30%',
          scrub: true,
        }
      })
      gsap.fromTo(contentRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
          scrollTrigger: {
            trigger: contentRef.current,
            start: 'top 90%',
          }
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const scrollToProjects = () => {
    document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section ref={sectionRef} id="about" className="about-v2">
      <div className="container">
        <span className="about-intro-label">// Intro</span>

        <h2 ref={headingRef} className="about-main-heading">
          I'm a multidisciplinary <span>developer</span> from <span>Darjeeling</span> who helps <span>creators</span> to build <span>engaging online experiences.</span>
        </h2>

        <div ref={contentRef} className="about-content-row">
          <p className="about-subtext">
            Bringing your vision to life quickly and efficiently—whether
            it's branding, apps, or websites—I've got it covered,
            delivering smooth and effective solutions from start to finish.
          </p>

          <div className="about-cta-wrap">
            <button onClick={scrollToProjects} className="btn-about-work">
              See my Work
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
