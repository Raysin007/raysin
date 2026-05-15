import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { LuPhoneCall } from 'react-icons/lu'
import './Contact.css'

gsap.registerPlugin(ScrollTrigger)

const socials = [
  { label: 'GitHub', href: 'https://github.com/Raysin007' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/rahul-chettri-a354182b9/' },
  { label: 'X', href: 'https://x.com/ra88909' },
]

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header reveal
      gsap.fromTo(headerRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          }
        }
      )

      // Staggered reveal for contact items
      const items = gridRef.current?.querySelectorAll('.contact-item-v2, .social-link-v2')
      if (items) {
        gsap.fromTo(items,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: gridRef.current,
              start: 'top 90%',
            }
          }
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="contact" className="contact-v2">
      <div className="container">
        <div ref={headerRef} className="contact-header">
          <span className="contact-label">// Contact</span>
          <h2 className="contact-title">
            Let's build something <span className="text-outline">remarkable</span> together.
          </h2>
        </div>

        <div ref={gridRef} className="contact-grid">
          <div className="contact-details">
            <div className="contact-item-v2">
              <span className="item-label">Email</span>
              <a href="mailto:rahulchettri2020@gmail.com" className="item-link">
                rahulchettri2020@gmail.com
              </a>
            </div>

            <div className="contact-item-v2">
              <span className="item-label">Location</span>
              <span className="item-value">Darjeeling, India</span>
            </div>

            <div className="contact-item-v2">
              <span className="item-label">WhatsApp</span>
              <a href="https://wa.me/7047078852" className="item-link">
                +91 70470 78852
              </a>
            </div>
          </div>

          <div className="contact-socials">
            <span className="item-label">Socials</span>
            <div className="social-grid">
              {socials.map(s => (
                <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className="social-link-v2">
                  {s.label}
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M7 17L17 7M17 7H7M17 7v10" />
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="contact-footer">
          <p>© {new Date().getFullYear()} Raysin. All rights reserved.</p>
        </div>
      </div>
    </section>
  )
}
