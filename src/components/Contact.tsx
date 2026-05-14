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
  const leftRef = useRef<HTMLDivElement>(null)
  const rightRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(leftRef.current,
        { x: -40, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
          }
        }
      )
      gsap.fromTo(rightRef.current,
        { x: 40, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
          }
        }
      )
    })
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="contact" className="contact-v2">
      <div className="container">
        <div className="contact-header">
          <span className="contact-label">// Contact</span>
          <h2 className="contact-main-title">
            Let's build something <span>remarkable</span>
          </h2>
        </div>

        <div className="contact-grid-v2">
          <div ref={leftRef} className="contact-left-v2">
            <p className="contact-desc-v2">
              Whether you have a fully-formed idea or just a spark of inspiration,
              I'm here to help you bring it to life. My inbox is always open.
            </p>
            <a href="https://wa.me/7047078852" className="btn-contact-v2">
              <LuPhoneCall size={18} />
              Get in Touch
            </a>
          </div>

          <div ref={rightRef} className="contact-right-v2">
            <div className="contact-item-v2">
              <span className="contact-item-label-v2">Email</span>
              <a href="mailto:hello@raymond.dev" className="contact-item-value-v2">
                rahulchettri2020@gmail.com
              </a>
            </div>

            <div className="contact-item-v2">
              <span className="contact-item-label-v2">Location</span>
              <span className="contact-item-value-v2">
                Darjeeling, India
              </span>
            </div>

            <div className="contact-item-v2">
              <span className="contact-item-label-v2">Socials</span>
              <div className="social-links-v2">
                {socials.map(s => (
                  <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className="social-link-v2">
                    {s.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
