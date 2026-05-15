import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import './Projects.css'

const projects = [
  {
    id: 1,
    year: '2024',
    title: 'Formula Vintage',
    description:
      'For Formula Vintage, we crafted a design that honors the rich heritage of classic cars while adding a modern twist. Combining timeless elegance with sleek, contemporary elements.',
    tags: ['Landing Page', 'Mobile App', 'Redesign'],
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
    image: 'https://framerusercontent.com/images/Z1w2O7B5xsN3Y7XkKgBi9kFOgps.jpg',
    href: '#',
  },
]

interface ProjectRowProps {
  project: typeof projects[0]
  index: number
}

function ProjectRow({ project, index }: ProjectRowProps) {
  const rowRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(rowRef, { once: true, margin: '-80px' })

  return (
    <motion.div
      ref={rowRef}
      className="project-card"
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: index * 0.15 }}
    >
      <div className="project-card__inner">
        {/* Left: Image Side */}
        <div className="project-card__image-container">
          <img src={project.image} alt={project.title} className="project-card__image" />
        </div>

        {/* Right: Content Side */}
        <div className="project-card__content">
          <div className="project-card__header">
            <span className="project-card__year">({project.year})</span>
            <h3 className="project-card__title">{project.title}</h3>
          </div>

          <div className="project-card__description-wrap">
            <p className="project-card__description">
              {project.description}
            </p>
          </div>

          <div className="project-card__tags">
            {project.tags.map((tag) => (
              <div key={tag} className="project-card__tag-item">
                <span className="project-card__tag-text">{tag}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function Projects() {
  const headingRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(headingRef, { once: true, margin: '-60px' })

  return (
    <section className="projects-section" id="projects">
      <div className="projects-container">

        {/* Section label */}
        <motion.div
          ref={headingRef}
          className="projects-heading"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="projects-label">// Projects</span>
          <h2 className="projects-title">Recent Work</h2>
        </motion.div>

        {/* Project cards */}
        <div className="projects-list">
          {projects.map((project, i) => (
            <ProjectRow key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}