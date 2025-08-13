"use client"

import { useEffect } from "react"
import Lenis from "@studio-freight/lenis"

export default function SmoothScroller() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      lerp: 0.08,
      infinite: false,
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      touchMultiplier: 2,
      wheelMultiplier: 1,
    })

    let rafId: number
    const raf = (time: number) => {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    // Handle anchor links
    const handleAnchorClick = (e: Event) => {
      const target = e.target as HTMLAnchorElement
      if (target.href && target.href.includes('#')) {
        const id = target.href.split('#')[1]
        const element = document.getElementById(id)
        if (element) {
          e.preventDefault()
          lenis.scrollTo(element, { offset: -100, duration: 1.5 })
        }
      }
    }

    document.addEventListener('click', handleAnchorClick)

    return () => {
      cancelAnimationFrame(rafId)
      document.removeEventListener('click', handleAnchorClick)
      lenis.destroy()
    }
  }, [])

  return null
}
