import { useRef, useEffect, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Projects.css'

gsap.registerPlugin(ScrollTrigger)

const projects = [
  {
    id: 1,
    year: '2026',
    title: 'Raysin',
    description:
      'For this project, I focused on creating a clean and engaging digital experience that balances aesthetics with functionality. Every design decision was made to ensure smooth interaction, modern visuals, and a strong brand presence.',
    tags: ['Landing Page', 'Website Design', 'Brand Identity'],
    video: '/portfolio.mp4',
    image: 'https://framerusercontent.com/images/La32y794CcZboMk8PScVdQ2O5Rk.png',
    href: '#',
  },
  {
    id: 2,
    year: '2024',
    title: 'Sprey Zest',
    description:
      'For Sprey Zest, we took a playful, bold approach to packaging and branding. Instead of following the typical fresh or clean aesthetic, we infused energy and personality into every detail.',
    tags: ['Website Design', 'Branding'],
    video: '/sprey-zest.mp4',
    image: 'https://framerusercontent.com/images/BUMWJfM7FAxHoEYXhMjW881wM.png',
    href: '#',
  },
  {
    id: 3,
    year: '2020',
    title: 'Super Pro',
    description:
      'For Super-Pro, we redefined what it means to be a professional by focusing on the mindset and determination behind success, not just the achievements.',
    tags: ['Desktop App', 'Mobile App'],
    video: '/super-pro.mp4',
    image: 'https://framerusercontent.com/images/VQY4WQ8E6fx261RhsoqM17bkt9E.png',
    href: '#',
  },
  {
    id: 4,
    year: '2024',
    title: 'Architech Buildings',
    description:
      'We redefined the concept of modern living by creating a design that challenges conventional boundaries. Focusing on comfort, functionality, and unexpected elements.',
    tags: ['Mobile App', 'Branding', 'Website Design'],
    video: '/architech-buildings.mp4',
    image: 'https://framerusercontent.com/images/Z1w2O7B5xsN3Y7XkKgBi9kFOgps.jpg',
    href: '#',
  },
]

interface ProjectRowProps {
  project: typeof projects[0]
  containerAnimation: gsap.core.Tween | null
}

function ProjectRow({ project, containerAnimation }: ProjectRowProps) {
  const rowRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!rowRef.current) return

    const ctx = gsap.context(() => {
      if (containerAnimation) {
        // Reveal the image from the right
        gsap.fromTo(imageRef.current,
          { x: 100, opacity: 0, scale: 0.9 },
          {
            x: 0, opacity: 1, scale: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: rowRef.current,
              containerAnimation: containerAnimation,
              start: "left 90%",
              end: "left 20%",
              scrub: true,
            }
          }
        )

        // Reveal the content with a slight offset
        gsap.fromTo(contentRef.current,
          { x: 50, opacity: 0 },
          {
            x: 0, opacity: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: rowRef.current,
              containerAnimation: containerAnimation,
              start: "left 80%",
              end: "left 30%",
              scrub: true,
            }
          }
        )
      } else {
        // Mobile vertical scroll reveal (fade up)
        gsap.fromTo(rowRef.current,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.0,
            ease: 'power4.out',
            scrollTrigger: {
              trigger: rowRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none'
            }
          }
        )
      }
    }, rowRef)

    return () => ctx.revert()
  }, [containerAnimation])

  return (
    <div ref={rowRef} className="project-card">
      <div className="project-card__inner">
        <div ref={imageRef} className="project-card__image-container">
          {project.video ? (
            <video
              src={project.video}
              poster={project.image}
              autoPlay
              loop
              muted
              playsInline
              className="project-card__image"
            />
          ) : (
            <img src={project.image} alt={project.title} className="project-card__image" />
          )}
        </div>

        <div ref={contentRef} className="project-card__content">
          <div className="project-card__header">
            <span className="project-card__year">({project.year})</span>
            <h3 className="project-card__title">{project.title}</h3>
          </div>
          <div className="project-card__description-wrap">
            <p className="project-card__description">{project.description}</p>
          </div>
          <div className="project-card__tags">
            {project.tags.map((tag: string) => (
              <div key={tag} className="project-card__tag-item">
                <span className="project-card__tag-text">{tag}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const [masterTween, setMasterTween] = useState<gsap.core.Tween | null>(null)

  useEffect(() => {
    const mm = gsap.matchMedia()

    mm.add("(min-width: 769px)", () => {
      const track = trackRef.current
      if (!track) return

      // Allow DOM to settle for accurate scrollWidth
      const timer = setTimeout(() => {
        const lastCard = track.querySelector('.project-card-horizontal:last-child')
        const lastCardWidth = lastCard ? lastCard.getBoundingClientRect().width : 0

        // Scroll until the last card is at the same starting offset (48px) as the first.
        // This ensures the previous project (and the 100px gap) is pushed fully off-screen.
        const horizontalScrollLength = track.scrollWidth - lastCardWidth - 48

        const tween = gsap.to(track, {
          x: -horizontalScrollLength,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: () => `+=${horizontalScrollLength}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
          }
        })

        setMasterTween(tween)
      }, 100)

      return () => {
        clearTimeout(timer)
      }
    })

    return () => mm.revert()
  }, [])

  return (
    <section ref={sectionRef} className="projects-section" id="projects">
      <div className="projects-sticky-wrap">
        <div className="projects-container">
          <div className="projects-heading">
            <span className="projects-label">// Projects</span>
            <h2 className="projects-title">Recent Work</h2>
          </div>
        </div>

        <div ref={trackRef} className="projects-track">
          {projects.map((project) => (
            <div key={project.id} className="project-card-horizontal">
              <ProjectRow project={project} containerAnimation={masterTween} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
