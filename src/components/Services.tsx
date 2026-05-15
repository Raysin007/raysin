import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { HoverSlider, TextStaggerHover } from "@/components/ui/animated-slideshow"

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
      "https://plus.unsplash.com/premium_photo-1661382011487-cd3d6b1d9dff?q=80&w=1171&auto=format&fit=max&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
]

export function Services() {
  const [activeIdx, setActiveIdx] = useState(0)

  return (
    <section id="services" className="section bg-[var(--bg)]">
      <div className="container">
        <HoverSlider className="flex flex-col justify-center py-12">
          <span className="about-intro-label">// Services</span>
          <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-12 lg:gap-24">
            <div className="flex flex-col space-y-4 md:space-y-6">
              {SLIDES.map((slide, index) => (
                <div
                  key={slide.id}
                  onMouseEnter={() => setActiveIdx(index)}
                  className="group"
                >
                  <TextStaggerHover
                    index={index}
                    className="cursor-pointer text-[clamp(24px,5vw,60px)] font-bold uppercase tracking-tighter text-[var(--text-h)] whitespace-nowrap"
                    text={slide.title}
                  />
                </div>
              ))}
            </div>

            <div className="relative w-full flex items-center justify-center">
              {/* New Custom Image Card */}
              <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-white/10 shadow-2xl">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeIdx}
                    src={SLIDES[activeIdx].imageUrl}
                    alt={SLIDES[activeIdx].title}
                    className="absolute inset-0 block w-full h-full object-cover object-center"
                    initial={{ opacity: 0, scale: 1.1, filter: "blur(20px)" }}
                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                    exit={{ opacity: 0, scale: 1.1, filter: "blur(20px)" }}
                    transition={{
                      duration: 0.7,
                      ease: [0.19, 1, 0.22, 1]
                    }}
                  />
                </AnimatePresence>

                {/* Subtle Overlay Decoration */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-6 left-6">
                  <motion.div
                    key={activeIdx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-white/40 text-xs font-mono tracking-widest uppercase"
                  >
                    0{activeIdx + 1} / 0{SLIDES.length}
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </HoverSlider>
      </div>
    </section>
  )
}
