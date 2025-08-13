"use client"

import { useEffect, useState, useRef } from "react"
import Link from "next/link"
import { Moon, SunMedium, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import ThemeToggle from "@/components/theme-toggle"
import { cn } from "@/lib/utils"

export default function Navbar() {
  const [compact, setCompact] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [activeSection, setActiveSection] = useState("")
  const [isHovered, setIsHovered] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 })
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const navRef = useRef<HTMLElement>(null)

  useEffect(() => {
    setMounted(true)
    
    const onScroll = () => {
      const threshold = typeof window !== "undefined" ? window.innerHeight * 0.65 : 600
      setCompact(window.scrollY > threshold)
      
      // Close mobile menu on scroll
      if (mobileMenuOpen) {
        setMobileMenuOpen(false)
      }
      
      // Update active section based on scroll position
      const sections = ['home', 'about', 'skills', 'projects', 'experience', 'contact']
      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    // Close mobile menu when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node) && mobileMenuOpen) {
        setMobileMenuOpen(false)
      }
    }

    // Close mobile menu on escape key
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false)
      }
    }
    
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    document.addEventListener("mousedown", handleClickOutside)
    document.addEventListener("keydown", handleEscape)
    
    return () => {
      window.removeEventListener("scroll", onScroll)
      document.removeEventListener("mousedown", handleClickOutside)
      document.removeEventListener("keydown", handleEscape)
    }
  }, [mobileMenuOpen])

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!navRef.current) return
    const rect = navRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    setMousePos({ x, y })
  }

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    // Reset position after fade-out animation completes
    setTimeout(() => {
      if (!isHovered) {
        setMousePos({ x: 50, y: 50 })
      }
    }, 1600)
  }

  const navItems = [
    { href: "#about", label: "About" },
    { href: "#skills", label: "Skills" },
    { href: "#projects", label: "Projects" },
    { href: "#experience", label: "Experience" },
    { href: "#contact", label: "Contact" },
  ]

  return (
    <header
      className={cn(
        "fixed top-4 left-1/2 z-40 -translate-x-1/2 transition-all duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]",
        "w-[95%] max-w-[95vw] sm:max-w-[90vw] md:max-w-[820px]",
        compact ? "top-2" : "top-4 sm:top-6",
      )}
      aria-label="Primary"
    >
      <nav
        ref={navRef}
        className={cn(
          "relative backdrop-blur-xl border rounded-full overflow-hidden",
          "transition-all duration-1000 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]",
          compact 
            ? "px-3 py-2 sm:px-4 md:px-4 max-w-full" 
            : "px-4 py-2.5 sm:px-5 sm:py-3 md:px-6 max-w-full",
          isHovered 
            ? "border-violet-400/80 shadow-[0_0_40px_rgba(139,69,219,0.6),0_0_20px_rgba(139,69,219,0.4)_inset] bg-white/80 dark:bg-neutral-900/80" 
            : "border-white/40 dark:border-neutral-800/70 shadow-[0_8px_40px_rgba(0,0,0,0.12)] dark:shadow-[0_8px_40px_rgba(0,0,0,0.3)] bg-white/70 dark:bg-neutral-900/70"
        )}
        style={{
          background: isHovered 
            ? `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, rgba(139,69,219,0.3) 0%, rgba(139,69,219,0.2) 30%, rgba(139,69,219,0.1) 60%, transparent 80%), ${
                compact ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.8)'
              } dark:rgba(23,23,23,0.8)`
            : undefined
        }}
        role="navigation"
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Purple glow overlay on hover */}
        <span
          className={cn(
            "pointer-events-none absolute inset-0 rounded-full transition-all duration-1200 ease-[cubic-bezier(0.4,0,0.2,1)]",
            isHovered ? "opacity-100 scale-100" : "opacity-0 scale-95"
          )}
          style={{
            background: `radial-gradient(80px 80px at ${mousePos.x}% ${mousePos.y}%, rgba(139,69,219,0.6) 0%, rgba(139,69,219,0.3) 40%, transparent 70%)`,
            boxShadow: isHovered ? `0 0 50px rgba(139,69,219,0.4), 0 0 25px rgba(139,69,219,0.3) inset` : "none",
            transitionDelay: isHovered ? "0ms" : "100ms"
          }}
        />
        
        {/* Border glow effect */}
        <span
          className={cn(
            "pointer-events-none absolute inset-0 rounded-full transition-all duration-1400 ease-[cubic-bezier(0.4,0,0.2,1)]",
            isHovered ? "opacity-100 scale-100" : "opacity-0 scale-98"
          )}
          style={{
            background: "transparent",
            border: "1px solid rgba(139,69,219,0.7)",
            boxShadow: isHovered ? `0 0 30px rgba(139,69,219,0.5), 0 0 15px rgba(139,69,219,0.4) inset` : "none",
            transitionDelay: isHovered ? "50ms" : "200ms"
          }}
        />

        <div className="relative z-10 flex items-center justify-between w-full">
          {/* Logo/Brand */}
          <Link
            href="#home"
            className={cn(
              "font-semibold tracking-tight transition-all duration-500 flex-shrink-0",
              compact ? "text-sm sm:text-base" : "text-base sm:text-lg",
              isHovered 
                ? "text-violet-600 dark:text-violet-400 drop-shadow-[0_0_12px_rgba(139,69,219,0.8)] [text-shadow:0_0_16px_rgba(139,69,219,0.6)]"
                : "hover:text-violet-500 hover:drop-shadow-[0_0_8px_rgba(139,69,219,0.6)]"
            )}
            aria-label="Sahil Bhatane Home"
          >
            <span className="hidden sm:inline">Sahil Bhatane</span>
            <span className="sm:hidden">SB</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-3 xl:gap-5 flex-1 justify-center">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => {
                  if (item.href === "#contact") {
                    e.preventDefault()
                    // The contact footer component will handle this via its event listener
                  }
                }}
                className={cn(
                  "text-sm xl:text-[15px] transition-all duration-500 relative group px-2 py-1",
                  "text-foreground", // Ensure text is always visible
                  activeSection === item.href.slice(1)
                    ? "text-violet-500 drop-shadow-[0_0_8px_rgba(139,69,219,0.6)]"
                    : isHovered
                    ? "text-violet-600 dark:text-violet-400 drop-shadow-[0_0_8px_rgba(139,69,219,0.6)]"
                    : "hover:text-violet-500 hover:drop-shadow-[0_0_8px_rgba(139,69,219,0.6)]"
                )}
              >
                {item.label}
                <span className={cn(
                  "absolute -bottom-1 left-2 right-2 h-0.5 bg-gradient-to-r from-violet-400 to-violet-600 transition-all duration-500",
                  activeSection === item.href.slice(1) ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                )} />
              </a>
            ))}
          </div>

          {/* Right side actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Theme Toggle */}
            <ThemeToggle
              render={(mode, toggle) => (
                <Button 
                  variant="ghost" 
                  size="icon" 
                  aria-label="Toggle theme" 
                  onClick={toggle} 
                  className={cn(
                    "rounded-full transition-all duration-500 hover:scale-110",
                    "h-8 w-8 sm:h-9 sm:w-9",
                    isHovered
                      ? "bg-violet-400/20 text-violet-600 dark:text-violet-400 hover:bg-violet-400/30"
                      : "hover:bg-violet-400/10 hover:text-violet-500"
                  )}
                >
                  {mode === "dark" ? 
                    <SunMedium className="h-3.5 w-3.5 sm:h-4 sm:w-4 transition-transform duration-500 hover:rotate-90" /> : 
                    <Moon className="h-3.5 w-3.5 sm:h-4 sm:w-4 transition-transform duration-500 hover:-rotate-12" />
                  }
                </Button>
              )}
            />

            {/* See Work Button - Hidden on very small screens */}
            <a href="#projects" className="hidden sm:block">
              <Button className={cn(
                "rounded-full px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm transition-all duration-500 border",
                isHovered
                  ? "bg-gradient-to-r from-violet-500 to-purple-500 hover:from-violet-600 hover:to-purple-600 border-violet-400/40 text-white shadow-[0_0_25px_rgba(139,69,219,0.5)]"
                  : "bg-gradient-to-r from-violet-500 to-purple-500 hover:from-violet-600 hover:to-purple-600 border-violet-400/20 hover:shadow-[0_0_20px_rgba(139,69,219,0.4)] hover:scale-105"
              )}>
                <span className="hidden md:inline">See Work</span>
                <span className="md:hidden">Work</span>
              </Button>
            </a>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "md:hidden rounded-full transition-all duration-500",
                "h-8 w-8 sm:h-9 sm:w-9",
                isHovered
                  ? "bg-violet-400/20 text-violet-600 dark:text-violet-400 hover:bg-violet-400/30"
                  : "hover:bg-violet-400/10 hover:text-violet-500"
              )}
              onClick={() => {
                console.log('Mobile menu clicked, current state:', mobileMenuOpen)
                setMobileMenuOpen(!mobileMenuOpen)
              }}
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? 
                <X className="h-4 w-4 transition-transform duration-300" /> : 
                <Menu className="h-4 w-4 transition-transform duration-300" />
              }
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={cn(
          "md:hidden absolute top-full left-0 right-0 mt-2 backdrop-blur-xl border rounded-2xl overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]",
          "border-white/40 dark:border-neutral-800/70 bg-white/90 dark:bg-neutral-900/90",
          mobileMenuOpen 
            ? "opacity-100 scale-100 translate-y-0 pointer-events-auto" 
            : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
        )}>
          <div className="p-4 space-y-3">
            <div className="text-xs text-gray-500 mb-2">Menu State: {mobileMenuOpen ? 'Open' : 'Closed'}</div>
            {navItems.map((item, index) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => {
                  if (item.href === "#contact") {
                    e.preventDefault()
                  }
                  setMobileMenuOpen(false)
                }}
                className={cn(
                  "block px-4 py-3 rounded-xl transition-all duration-300 relative group",
                  "text-sm font-medium border border-transparent",
                  activeSection === item.href.slice(1)
                    ? "text-violet-500 bg-violet-50 dark:bg-violet-950/20 border-violet-200 dark:border-violet-800/30 drop-shadow-[0_0_8px_rgba(139,69,219,0.3)]"
                    : "hover:text-violet-500 hover:bg-violet-50/50 dark:hover:bg-violet-950/10 hover:border-violet-200/50 dark:hover:border-violet-800/20 hover:drop-shadow-[0_0_8px_rgba(139,69,219,0.2)]"
                )}
              >
                <span className="relative z-10">{item.label}</span>
                <span className={cn(
                  "absolute bottom-0 left-4 right-4 h-0.5 bg-gradient-to-r from-violet-400 to-violet-600 transition-all duration-300",
                  activeSection === item.href.slice(1) ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                )} />
              </a>
            ))}
            
            {/* Mobile See Work Button */}
            <div className="pt-2 mt-3 border-t border-neutral-200/50 dark:border-neutral-700/50">
              <a href="#projects" onClick={() => setMobileMenuOpen(false)}>
                <Button className={cn(
                  "w-full rounded-xl py-3 text-sm transition-all duration-500 border",
                  "bg-gradient-to-r from-violet-500 to-purple-500 hover:from-violet-600 hover:to-purple-600",
                  "border-violet-400/20 text-white hover:shadow-[0_0_20px_rgba(139,69,219,0.4)] hover:scale-105"
                )}>
                  See My Work
                </Button>
              </a>
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}
