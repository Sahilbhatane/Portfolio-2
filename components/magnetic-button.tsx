"use client"

import type React from "react"

import { useRef, useState } from "react"
import { cn } from "@/lib/utils"

type Props = {
  children: React.ReactNode
  href?: string
  onClick?: () => void
  className?: string
  ariaLabel?: string
}

export default function MagneticButton({ children, href, onClick, className, ariaLabel }: Props) {
  const ref = useRef<HTMLButtonElement | HTMLAnchorElement>(null)
  const [pos, setPos] = useState({ x: 50, y: 50 })
  const [isHovered, setIsHovered] = useState(false)

  const handleMove = (e: React.MouseEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    setPos({ x, y })
  }

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    // Reset position after fade-out animation completes (using the longest duration + delay)
    setTimeout(() => {
      if (!isHovered) {
        setPos({ x: 50, y: 50 })
      }
    }, 1400 + 200) // 1400ms duration + 200ms delay
  }

  const base = (
    <span
      className={cn(
        "relative inline-flex items-center justify-center rounded-full px-8 py-3.5",
        "text-sm font-medium transition-all duration-1000 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]",
        "border transition-colors duration-1000 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]",
        isHovered 
          ? "border-violet-400/80 shadow-[0_0_30px_rgba(139,69,219,0.6),0_0_15px_rgba(139,69,219,0.4)_inset]" 
          : "border-neutral-200/50 dark:border-neutral-800/80 shadow-[0_0_0_1px_rgba(255,255,255,0.05)_inset,0_6px_20px_rgba(99,102,241,0.15)]",
        "backdrop-blur-md",
        "hover:scale-[1.02] active:scale-[0.98]",
        "min-w-[160px]",
        className,
      )}
      style={{
        ["--x" as any]: `${pos.x}%`,
        ["--y" as any]: `${pos.y}%`,
        background: isHovered 
          ? `radial-gradient(circle at ${pos.x}% ${pos.y}%, rgba(139,69,219,0.4) 0%, rgba(139,69,219,0.2) 30%, rgba(139,69,219,0.1) 60%, transparent 80%)`
          : `radial-gradient(circle at ${pos.x}% ${pos.y}%, rgba(99,102,241,0.25) 0%, rgba(99,102,241,0.15) 30%, transparent 60%)`
      }}
      onMouseMove={handleMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={() => setPos({ x: 50, y: 50 })}
    >
      {children}
      
      {/* Neon glow overlay on hover */}
      <span
        className={cn(
          "pointer-events-none absolute inset-0 rounded-full",
          "transition-all duration-1200 ease-[cubic-bezier(0.4,0,0.2,1)]",
          isHovered ? "opacity-100 scale-100" : "opacity-0 scale-95"
        )}
        style={{
          background: `radial-gradient(60px 60px at ${pos.x}% ${pos.y}%, rgba(139,69,219,0.7) 0%, rgba(139,69,219,0.4) 40%, transparent 70%)`,
          boxShadow: isHovered ? `0 0 40px rgba(139,69,219,0.3), 0 0 20px rgba(139,69,219,0.2) inset` : "none",
          transitionDelay: isHovered ? "0ms" : "100ms"
        }}
      />
      
      {/* Border glow effect */}
      <span
        className={cn(
          "pointer-events-none absolute inset-0 rounded-full",
          "transition-all duration-1400 ease-[cubic-bezier(0.4,0,0.2,1)]",
          isHovered ? "opacity-100 scale-100" : "opacity-0 scale-98"
        )}
        style={{
          background: "transparent",
          border: "1px solid rgba(139,69,219,0.6)",
          boxShadow: isHovered ? `0 0 20px rgba(139,69,219,0.4), 0 0 10px rgba(139,69,219,0.3) inset` : "none",
          transitionDelay: isHovered ? "50ms" : "200ms"
        }}
      />
    </span>
  )

  if (href) {
    return (
      <a
        ref={ref as any}
        href={href}
        className="inline-block"
        aria-label={ariaLabel}
        onMouseMove={handleMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={onClick}
      >
        {base}
      </a>
    )
  }

  return (
    <button 
      ref={ref as any} 
      onClick={onClick} 
      onMouseMove={handleMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      aria-label={ariaLabel} 
      className="inline-block"
    >
      {base}
    </button>
  )
}
