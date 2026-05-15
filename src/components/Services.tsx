import { HoverSlider,
  HoverSliderImage,
  HoverSliderImageWrap,
  TextStaggerHover } from "@/components/ui/animated-slideshow"

  const SLIDES = [
  {
    id: "slide-1",
    title: "frontend dev",
    imageUrl:
      "https://images.unsplash.com/photo-1534972195531-d756b9bfa9f2?q=80&w=1170&auto=format&fit=max&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "slide-2",
    title: "backend dev",
    imageUrl:
      "https://images.unsplash.com/photo-1610563166150-b34df4f3bcd6?q=80&w=1076&auto=format&fit=max&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "slide-6",
    title: "UI UX design",
    imageUrl:
      "https://plus.unsplash.com/premium_photo-1661589354357-f56ddf86a0b4?q=80&w=1170&auto=format&fit=max&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "slide-3",
    title: "video editing",
    imageUrl:
      "https://images.unsplash.com/photo-1574717025058-2f8737d2e2b7?q=80&w=2487&auto=format&fit=max&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "slide-4",
    title: "graphic design",
    imageUrl:
      "https://plus.unsplash.com/premium_photo-1661382011487-cd3d6b1d9dff?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
]

export function Services() {
  return (
    <section id="services" className="section bg-[var(--bg)]">
      <div className="container">
        <HoverSlider className="flex flex-col justify-center py-12">
          <span className="about-intro-label">// Services</span>
          <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-12 lg:gap-24">
            <div className="flex flex-col space-y-4 md:space-y-6">
              {SLIDES.map((slide, index) => (
                <TextStaggerHover
                  key={slide.title}
                  index={index}
                  className="cursor-pointer text-[clamp(24px,5vw,60px)] font-bold uppercase tracking-tighter text-[var(--text-h)] whitespace-nowrap"
                  text={slide.title}
                />
              ))}
            </div>
            <div className="relative">
              <HoverSliderImageWrap
                className="w-full aspect-[4/3] md:aspect-[4/3] rounded-2xl overflow-hidden bg-white/5"
                style={{ boxShadow: '0 40px 100px rgba(0, 0, 0, 0.4)' }}
              >
                {SLIDES.map((slide, index) => (
                  <div key={slide.id}>
                    <HoverSliderImage
                      index={index}
                      imageUrl={slide.imageUrl}
                      src={slide.imageUrl}
                      alt={slide.title}
                      className="size-full object-contain p-4 md:p-6"
                      loading="eager"
                      decoding="async"
                    />
                  </div>
                ))}
              </HoverSliderImageWrap>
            </div>
          </div>
        </HoverSlider>
      </div>
    </section>
  )
}
