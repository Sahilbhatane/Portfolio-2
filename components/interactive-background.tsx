"use client"

import { useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

export default function InteractiveBackground({
  className,
}: {
  className?: string
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const lightRef = useRef<HTMLDivElement>(null)
  const dotRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current!
    const overlay = overlayRef.current!
    const light = lightRef.current!
    const dot = dotRef.current!

    const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches
    function generateTiles() {
      const viewportWidth = window.innerWidth
      const viewportHeight = window.innerHeight

      let tileSize: number
      let gap: number
      if (viewportWidth < 480) {
        tileSize = 40
        gap = 2
      } else if (viewportWidth < 768) {
        tileSize = 50
        gap = 3
      } else if (viewportWidth < 1200) {
        tileSize = 65
        gap = 4
      } else {
        tileSize = 75
        gap = 5
      }

      const tilesPerRow = Math.floor((viewportWidth + gap) / (tileSize + gap))
      const tilesPerColumn = Math.floor((viewportHeight + gap) / (tileSize + gap))
      const actualTileWidth = (viewportWidth - gap * (tilesPerRow - 1)) / tilesPerRow
      const actualTileHeight = (viewportHeight - gap * (tilesPerColumn - 1)) / tilesPerColumn

      container.style.gridTemplateColumns = `repeat(${tilesPerRow}, ${actualTileWidth}px)`
      container.style.gridTemplateRows = `repeat(${tilesPerColumn}, ${actualTileHeight}px)`

      const totalTiles = tilesPerRow * tilesPerColumn
      container.innerHTML = ""

      for (let i = 0; i < totalTiles; i++) {
        const tile = document.createElement("div")
        tile.className = "tile"
        ;(tile as any).dataset.index = i
        const row = Math.floor(i / tilesPerRow)
        const col = i % tilesPerRow
        if (row === 0 && col === 0) tile.classList.add("corner-tl")
        else if (row === 0 && col === tilesPerRow - 1) tile.classList.add("corner-tr")
        else if (row === tilesPerColumn - 1 && col === 0) tile.classList.add("corner-bl")
        else if (row === tilesPerColumn - 1 && col === tilesPerRow - 1) tile.classList.add("corner-br")
        else if (row === 0 || row === tilesPerColumn - 1 || col === 0 || col === tilesPerRow - 1) {
          tile.classList.add("edge")
        }
        container.appendChild(tile)
      }
    }

    let mouseX = 0
    let mouseY = 0
    let lightX = 0
    let lightY = 0
    let isInteracting = false
    let fadeTimeout: any

    function updateCursor() {
      const followSpeed = window.innerWidth < 768 ? 0.05 : 0.06
      lightX += (mouseX - lightX) * followSpeed
      lightY += (mouseY - lightY) * followSpeed

      light.style.left = `${lightX}px`
      light.style.top = `${lightY}px`
      dot.style.left = `${mouseX}px`
      dot.style.top = `${mouseY}px`
      overlay.style.setProperty("--mouse-x", `${(mouseX / window.innerWidth) * 100}%`)
      overlay.style.setProperty("--mouse-y", `${(mouseY / window.innerHeight) * 100}%`)
      requestAnimationFrame(updateCursor)
    }

    function fadeOutLighting() {
      light.classList.add("fade-out")
      dot.classList.add("fade-out")
      overlay.classList.add("fade-out")
    }
    function fadeInLighting() {
      light.classList.remove("fade-out")
      dot.classList.remove("fade-out")
      overlay.classList.remove("fade-out")
    }

    function checkCenterProximity() {
      const centerX = window.innerWidth / 2
      const centerY = window.innerHeight / 2
      const distance = Math.hypot(mouseX - centerX, mouseY - centerY)
      const maxDistance = Math.hypot(centerX, centerY) * 0.3
      return distance < maxDistance
    }

    const onPointerMove = (clientX: number, clientY: number) => {
      mouseX = clientX
      mouseY = clientY
      clearTimeout(fadeTimeout)

      const tiles = container.querySelectorAll<HTMLDivElement>(".tile")
      let nearTile = false
      const interactionRadius = window.innerWidth < 768 ? 80 : 140

      tiles.forEach((tile) => {
        const rect = tile.getBoundingClientRect()
        const tileCenterX = rect.left + rect.width / 2
        const tileCenterY = rect.top + rect.height / 2
        const distance = Math.hypot(mouseX - tileCenterX, mouseY - tileCenterY)
        if (distance < interactionRadius) {
          tile.classList.add("glow")
          nearTile = true
          const particleChance = window.innerWidth < 768 ? 0.02 : 0.04
          if (Math.random() < particleChance) {
            createParticle(tileCenterX, tileCenterY)
          }
        } else {
          tile.classList.remove("glow")
        }
      })

      const nearCenter = checkCenterProximity()
      isInteracting = nearTile || nearCenter
      if (isInteracting) {
        fadeInLighting()
      } else {
        fadeTimeout = setTimeout(() => {
          if (!isInteracting) fadeOutLighting()
        }, 1500)
      }
    }

    const onMouseMove = (e: MouseEvent) => onPointerMove(e.clientX, e.clientY)
    const onTouchStart = (e: TouchEvent) => {
      const t = e.touches[0]
      if (t) onPointerMove(t.clientX, t.clientY)
    }
    const onTouchMove = (e: TouchEvent) => {
      const t = e.touches[0]
      if (t) onPointerMove(t.clientX, t.clientY)
    }

    function createParticle(x: number, y: number) {
      const particle = document.createElement("div")
      particle.className = "particle"
      particle.style.left = `${x}px`
      particle.style.top = `${y}px`
      document.body.appendChild(particle)
      setTimeout(() => particle.remove(), 3000)
    }

    const onClick = (e: MouseEvent) => {
      const tile = (e.target as HTMLElement).closest(".tile") as HTMLElement | null
      if (tile) {
        const ripple = document.createElement("div")
        ripple.style.position = "absolute"
        ripple.style.borderRadius = "50%"
        ripple.style.background = "rgba(100, 150, 255, 0.3)"
        ripple.style.transform = "scale(0)"
        ripple.style.animation = "ripple 0.6s linear"
        ripple.style.left = "50%"
        ripple.style.top = "50%"
        ripple.style.width = "100px"
        ripple.style.height = "100px"
        ripple.style.marginLeft = "-50px"
        ripple.style.marginTop = "-50px"
        ripple.style.pointerEvents = "none"
        tile.style.position = "relative"
        tile.appendChild(ripple)
        setTimeout(() => ripple.remove(), 600)
      }
    }

    let resizeTimeout: any
    const onResize = () => {
      clearTimeout(resizeTimeout)
      resizeTimeout = setTimeout(() => {
        generateTiles()
      }, 150)
    }

    // init
    generateTiles()
    updateCursor()
    document.addEventListener("mousemove", onMouseMove as any, { passive: true })
    document.addEventListener("click", onClick as any)
    document.addEventListener("touchstart", onTouchStart as any, { passive: true })
    document.addEventListener("touchmove", onTouchMove as any, { passive: true })
    window.addEventListener("resize", onResize)

    const ambientInterval = window.innerWidth < 768 ? 7000 : 5000
    const ambient = reduceMotion
      ? (undefined as any)
      : setInterval(() => {
          const tiles = container.querySelectorAll(".tile")
          if (tiles.length === 0) return
          const index = Math.floor(Math.random() * tiles.length)
          const randomTile = tiles[index] as HTMLElement
          if (randomTile && !randomTile.classList.contains("glow")) {
            randomTile.style.animation = "pulse 2s ease-in-out"
            setTimeout(() => {
              randomTile.style.animation = ""
            }, 2000)
          }
        }, ambientInterval)

    const onLeave = () => {
      clearTimeout(fadeTimeout)
      fadeOutLighting()
      isInteracting = false
    }
    const onEnter = () => {
      clearTimeout(fadeTimeout)
      fadeInLighting()
    }
    document.addEventListener("mouseleave", onLeave)
    document.addEventListener("mouseenter", onEnter)

    return () => {
      if (ambient) clearInterval(ambient)
      document.removeEventListener("mousemove", onMouseMove as any)
      document.removeEventListener("click", onClick as any)
      document.removeEventListener("touchstart", onTouchStart as any)
      document.removeEventListener("touchmove", onTouchMove as any)
      window.removeEventListener("resize", onResize as any)
      document.removeEventListener("mouseleave", onLeave as any)
      document.removeEventListener("mouseenter", onEnter as any)
    }
  }, [])

  return (
    <div className={cn("fixed inset-0 -z-10 overflow-hidden pointer-events-none", className)} aria-hidden="true">
      <div ref={overlayRef} className="background-overlay absolute inset-0" />
      <div ref={lightRef} className="cursor-light" aria-hidden="true" />
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
      <div id="tileContainer" ref={containerRef} className="grid w-full h-full" />
    </div>
  )
}
