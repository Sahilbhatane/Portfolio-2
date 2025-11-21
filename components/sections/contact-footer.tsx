"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { X, SendHorizonal } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function ContactFooter() {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [isAtPageEnd, setIsAtPageEnd] = useState(false)
  const [showPreview, setShowPreview] = useState(false)
  const { toast } = useToast()

  // Close handler that also manages visibility
  const handleClose = () => {
    setOpen(false)
    // Force close - temporarily ignore hover state for closing
    setTimeout(() => {
      // Double-check if form is still supposed to be closed
      if (!open) {
        if (!isAtPageEnd) {
          setIsVisible(false)
          setShowPreview(false)
        }
      }
    }, 150)
  }

  useEffect(() => {
    // Close on escape
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose()
    }

    // Check if user is at page end
    const checkPageEnd = () => {
      const scrollHeight = document.documentElement.scrollHeight
      const scrollTop = document.documentElement.scrollTop
      const clientHeight = document.documentElement.clientHeight
      const threshold = 100 // 100px from bottom
      
      const atEnd = scrollHeight - scrollTop - clientHeight <= threshold
      setIsAtPageEnd(atEnd)
    }

    // Listen for navbar contact click
    const handleContactClick = (e: Event) => {
      const target = e.target as HTMLElement
      const contactLink = target.closest('a[href="#contact"]')
      
      if (contactLink || target.textContent?.includes('Contact')) {
        e.preventDefault() // Prevent page scroll
        e.stopPropagation() // Stop event bubbling
        setIsVisible(true)
        setOpen(true)
      }
    }

    window.addEventListener("keydown", onKey)
    window.addEventListener("scroll", checkPageEnd, { passive: true })
    document.addEventListener("click", handleContactClick)
    
    // Initial check
    checkPageEnd()

    return () => {
      window.removeEventListener("keydown", onKey)
      window.removeEventListener("scroll", checkPageEnd)
      document.removeEventListener("click", handleContactClick)
    }
  }, [])

  // Update visibility based on conditions
  useEffect(() => {
    setIsVisible(isHovered || isAtPageEnd || open)
    // Show preview when hovering near bottom even if not fully visible
    setShowPreview(isHovered || isAtPageEnd)
  }, [isHovered, isAtPageEnd, open])

  // Enhanced hover detection for footer area
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const windowHeight = window.innerHeight
      const mouseY = e.clientY
      const footerZone = windowHeight - 100 // 100px from bottom
      
      // Show preview when mouse is in footer zone
      if (mouseY >= footerZone && !isVisible) {
        setShowPreview(true)
      } else if (mouseY < footerZone && !isHovered && !isAtPageEnd && !open) {
        setShowPreview(false)
      }
    }

    document.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => document.removeEventListener('mousemove', handleMouseMove)
  }, [isVisible, isHovered, isAtPageEnd, open])

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)
    const json = Object.fromEntries(data.entries())

    const accessKey = (process.env.NEXT_PUBLIC_WEB3FORMS_KEY as string) || ""

    if (!accessKey) {
      toast({
        title: "Missing Web3Forms key",
        description: "Set NEXT_PUBLIC_WEB3FORMS_KEY to enable form submissions.",
      })
      return
    }

    setLoading(true)
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: accessKey,
          ...json,
        }),
      })
      const result = await res.json()
      if (result.success) {
        toast({ title: "Message sent!", description: "Thanks for reaching out." })
        form.reset()
        handleClose()
      } else {
        toast({ title: "Submission failed", description: result.message || "Please try again." })
      }
    } catch (err) {
      toast({ title: "Network error", description: "Please try again." })
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {/* Preview/Collapsed State - Shows on hover */}
      <div
        className={`fixed bottom-0 inset-x-0 z-20 transition-all duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] ${
          showPreview && !isVisible 
            ? 'translate-y-0 opacity-100' 
            : 'translate-y-full opacity-0 pointer-events-none'
        }`}
        onMouseEnter={() => {
          setShowPreview(true)
          setIsHovered(true)
        }}
        onMouseLeave={() => {
          setIsHovered(false)
          if (!isAtPageEnd && !open) {
            setShowPreview(false)
          }
        }}
      >
        <div className="mx-auto mb-2 w-fit">
          <button
            onClick={() => {
              setIsVisible(true)
              setOpen(true)
            }}
            className="group relative overflow-hidden rounded-full px-6 py-3 text-sm backdrop-blur-md
              bg-white/80 dark:bg-neutral-900/80 border border-neutral-200/60 dark:border-neutral-800/60
              shadow-[0_8px_30px_rgba(0,0,0,0.15)] transition-all duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]
              hover:shadow-[0_12px_40px_rgba(57,255,20,0.3)] hover:border-green-400/50 hover:scale-105
              hover:text-green-400 hover:drop-shadow-[0_0_12px_rgba(57,255,20,0.7)]
              transform hover:-translate-y-1"
          >
            {/* Animated background gradient */}
            <span className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-emerald-500/20 
              opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            {/* Ripple effect on hover */}
            <span className="absolute inset-0 rounded-full bg-green-400/10 scale-0 
              group-hover:scale-100 transition-transform duration-700 ease-out" />
            
            <span className="relative flex items-center gap-2">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              Let's Connect
              <span className="transform group-hover:translate-x-1 transition-transform duration-300">→</span>
            </span>
          </button>
        </div>
      </div>

      {/* Main Contact Footer */}
      <footer 
        id="contact" 
        className={`fixed bottom-0 inset-x-0 z-30 transition-all duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0 pointer-events-none'
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
      {/* Collapsed bar */}
      <button
        aria-expanded={open}
        aria-controls="contact-panel"
        onClick={() => open ? handleClose() : setOpen(true)}
        className="mx-auto mb-3 block rounded-full px-5 py-2 text-sm backdrop-blur-md
          bg-white/70 dark:bg-neutral-900/70 border border-neutral-200/60 dark:border-neutral-800/60
          shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition-all duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]
          hover:shadow-[0_8px_30px_rgba(57,255,20,0.25)] hover:border-green-400/40 hover:scale-105
          hover:text-green-400 hover:drop-shadow-[0_0_8px_rgba(57,255,20,0.6)]"
      >
        {open ? "Close" : "Contact Me"}
      </button>

      {/* Panel */}
      <div
        id="contact-panel"
        className={`transition-[max-height,opacity] duration-500 overflow-hidden
        ${open ? "max-h-[560px] opacity-100" : "max-h-0 opacity-0"}`}
        role="region"
        aria-label="Contact form"
      >
        <div
          className="mx-auto max-w-3xl rounded-t-2xl border border-b-0 border-neutral-200/60 dark:border-neutral-800/60 
          bg-white/75 dark:bg-neutral-900/75 backdrop-blur-xl p-6"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Let&apos;s work together</h3>
            <button
              className="p-2 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800"
              aria-label="Close contact form"
              onClick={handleClose}
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <form className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4" onSubmit={onSubmit}>
            <input type="hidden" name="subject" value="New Portfolio Message" />
            <div className="sm:col-span-1">
              <label className="text-sm mb-1 block">Name</label>
              <Input name="name" placeholder="Your name" required />
            </div>
            <div className="sm:col-span-1">
              <label className="text-sm mb-1 block">Email</label>
              <Input name="email" type="email" placeholder="you@example.com" required />
            </div>
            <div className="sm:col-span-2">
              <label className="text-sm mb-1 block">Message</label>
              <Textarea name="message" placeholder="How can I help?" rows={4} required />
            </div>
            <div className="sm:col-span-2 flex items-center justify-between">
              <p className="text-xs text-neutral-500">
                Powered by Web3Forms.
              </p>
              <Button type="submit" disabled={loading}>
                <SendHorizonal className="h-4 w-4 mr-2" />
                {loading ? "Sending..." : "Send"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </footer>
    </>
  )
}
