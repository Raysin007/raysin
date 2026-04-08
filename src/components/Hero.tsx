export default function Hero() {
  const scrollTo = (id: string) =>
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section className="hero section">
      <div className="hero-video-bg">
        <video
          className="hero-video"
          src="/darjeeling.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        />
        <div className="hero-video-overlay" />
      </div>

      <div className="container hero-content">
        <div className="hero-badge">
          <span className="hero-badge-dot" />
          Available for freelancing work
        </div>
        <h1 className="hero-name">
          Hi, I'm <span className="gradient-text">राहुल</span>
        </h1>
        <p className="hero-role">Full-Stack Developer &amp; Photographer</p>
        <p className="hero-desc">
          I craft pixel-perfect web experiences with clean code and thoughtful design.
          Turning ideas into fast, accessible, and beautiful products.
        </p>
        <div className="hero-actions">
          <a
            href="#projects"
            className="btn btn-primary"
            onClick={e => { e.preventDefault(); scrollTo('#projects') }}
          >
            View Projects →
          </a>
          <a
            href="#contact"
            className="btn btn-outline"
            onClick={e => { e.preventDefault(); scrollTo('#contact') }}
          >
            Get in Touch
          </a>
        </div>
      </div>
    </section>
  )
}
