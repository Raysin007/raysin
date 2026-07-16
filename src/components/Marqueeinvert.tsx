import { useEffect, useRef } from 'react'
import gsap from 'gsap'

interface Props {
  imageSrc: string
  text: string          // e.g. "Raysin — Raysin — "
  fontSize: number      // px, match your CSS clamp value at current viewport
  fontFamily: string    // e.g. "Geist, sans-serif"
  duration: number      // seconds for one full loop, match CSS animation-duration
  unitWidth: number     // px, measured from CSS span for perfect sync
  top: string           // CSS top value, e.g. "calc(50% - 100px)"
  topOffsetPx: number   // px subtracted from 50% in `top` — must match Hero's MARQUEE_OFFSET_RATIO * fontSize
}

/**
 * Renders a canvas that:
 * 1. Tiles the marquee text endlessly (same speed as CSS marquee)
 * 2. Draws the portrait — inverted — clipped to ONLY the text glyphs
 * 3. Outside the glyphs → fully transparent → the black CSS text shows through
 *
 * Place this absolutely on top of the black marquee layer.
 */
export default function MarqueeInvert({
  imageSrc,
  text,
  fontSize,
  fontFamily,
  duration,
  unitWidth,
  top,
  topOffsetPx,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const imgRef = useRef<HTMLImageElement | null>(null)
  const offsetRef = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Load image once
    const img = new Image()
    img.src = imageSrc
    imgRef.current = img

    // Pre-create offscreen canvas elements once to prevent GC churn in tick loop
    const mask = document.createElement('canvas')
    const inv = document.createElement('canvas')

    const resize = () => {
      const dpr = window.devicePixelRatio || 1
      const rect = canvas.getBoundingClientRect()
      const w = rect.width
      const h = fontSize

      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.scale(dpr, dpr)

      // Also size offscreen canvases
      mask.width = w * dpr
      mask.height = h * dpr
      inv.width = w * dpr
      inv.height = h * dpr
    }
    resize()
    window.addEventListener('resize', resize)

    // Sync with GSAP ticker to match the Hero's CSS marquee GSAP animation perfectly
    const update = () => {
      if (unitWidth <= 0) return

      const dpr = window.devicePixelRatio || 1
      const rect = canvas.getBoundingClientRect()
      const w = rect.width
      const h = fontSize

      // Sync offscreen canvas sizes if they are not matching the master canvas
      if (canvas.width !== w * dpr || canvas.height !== h * dpr) {
        canvas.width = w * dpr
        canvas.height = h * dpr
        ctx.scale(dpr, dpr)

        mask.width = w * dpr
        mask.height = h * dpr
        inv.width = w * dpr
        inv.height = h * dpr
      }

      ctx.clearRect(0, 0, w, h)

      // Ensure font and letter spacing match Hero.css
      ctx.font = `800 ${fontSize}px ${fontFamily}`
      // @ts-ignore - letterSpacing is a newer canvas property
      ctx.letterSpacing = "-0.04em"

      // Calculate speed based on the EXACT unitWidth measured from CSS
      const speed = unitWidth / duration

      // Use GSAP's global time for perfect synchronization with the CSS tween in Hero.tsx
      const elapsed = gsap.ticker.time
      offsetRef.current = (elapsed * speed) % unitWidth

      // ── Step 1: Draw text mask ──
      const mCtx = mask.getContext('2d')!
      mCtx.save()
      mCtx.clearRect(0, 0, mask.width, mask.height)
      mCtx.scale(dpr, dpr)
      mCtx.fillStyle = '#000'
      mCtx.font = `800 ${fontSize}px ${fontFamily}`
      // @ts-ignore
      mCtx.letterSpacing = "-0.04em"

      // Match CSS line-height: 1 exactly: the line box is fontSize tall and the
      // baseline sits at halfLeading + ascent. Canvas 'middle' centers the em
      // square instead, which lands a few px higher than the CSS text.
      const metrics = mCtx.measureText(text)
      let baselineY = h / 2
      if (metrics.fontBoundingBoxAscent !== undefined) {
        const asc = metrics.fontBoundingBoxAscent
        const desc = metrics.fontBoundingBoxDescent
        baselineY = (h - (asc + desc)) / 2 + asc
        mCtx.textBaseline = 'alphabetic'
      } else {
        mCtx.textBaseline = 'middle'
      }

      // Tile text to cover full width + overlap for smooth loop
      let x = -offsetRef.current
      while (x < w + unitWidth) {
        mCtx.fillText(text, x, baselineY)
        x += unitWidth
      }
      mCtx.restore()

      // ── Step 2: Draw inverted portrait ──
      if (imgRef.current?.complete) {
        const iCtx = inv.getContext('2d')!
        iCtx.save()
        iCtx.clearRect(0, 0, inv.width, inv.height)
        iCtx.scale(dpr, dpr)
        iCtx.filter = 'invert(1) grayscale(1)'

        // Scale portrait to match Hero.css (.hero-portrait height: 105%, max-height: 900px)
        const vh = window.innerHeight
        let imgH = vh * 1.05
        if (imgH > 900) imgH = 900

        const scale = imgH / img.naturalHeight
        const imgW = img.naturalWidth * scale

        // Horizontal center
        const imgX = (w - imgW) / 2

        // Vertical position alignment — mirrors Hero's top: calc(50% - topOffsetPx)
        const marqueeTopY = vh * 0.5 - topOffsetPx
        const portraitTopY = vh - imgH
        const localY = portraitTopY - marqueeTopY

        iCtx.drawImage(img, imgX, localY, imgW, imgH)

        // ── Step 3: Match portrait bottom fade (Hero.css 18% mask) ──
        const fadeH = imgH * 0.18
        const grad = iCtx.createLinearGradient(0, localY + imgH, 0, localY + imgH - fadeH)
        grad.addColorStop(0, 'rgba(0,0,0,0)')
        grad.addColorStop(1, 'rgba(0,0,0,1)')

        iCtx.globalCompositeOperation = 'destination-in'
        iCtx.fillStyle = grad
        iCtx.fillRect(imgX, localY, imgW, imgH)

        // ── Step 4: Clip inverted portrait through the text mask ──
        iCtx.globalCompositeOperation = 'destination-in'
        iCtx.drawImage(mask, 0, 0, w, h)
        iCtx.restore()

        // ── Step 5: Output ──
        ctx.drawImage(inv, 0, 0, w, h)
      }
    }

    gsap.ticker.add(update)

    return () => {
      gsap.ticker.remove(update)
      window.removeEventListener('resize', resize)
    }
  }, [imageSrc, text, fontSize, fontFamily, duration, unitWidth, topOffsetPx])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top,
        left: 0,
        right: 0,
        width: '100%',
        height: fontSize,
        pointerEvents: 'none',
        userSelect: 'none',
        zIndex: 3,
      }}
      aria-hidden="true"
    />
  )
}