"use client"

import MagneticButton from "@/components/magnetic-button"
import { ArrowRight, ExternalLink } from "lucide-react"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"

export default function Hero() {
  const { isVisible: titleVisible, elementRef: titleRef } = useScrollReveal({ delay: 200 })
  const { isVisible: subtitleVisible, elementRef: subtitleRef } = useScrollReveal({ delay: 400 })
  const { isVisible: descVisible, elementRef: descRef } = useScrollReveal({ delay: 600 })
  const { isVisible: buttonsVisible, elementRef: buttonsRef } = useScrollReveal({ delay: 800 })
  const { isVisible: linksVisible, elementRef: linksRef } = useScrollReveal({ delay: 1000 })

  return (
    <section id="home" className="relative pt-36 md:pt-40 pb-16 md:pb-24 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl">
          <p 
            ref={titleRef as any}
            className={`
              text-sm uppercase tracking-[0.2em] text-neutral-500 dark:text-neutral-400
              transition-all duration-1000 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]
              ${titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
            `}
          >
            Software Developer
          </p>
          <h1 
            ref={subtitleRef as any}
            className={`
              mt-3 text-4xl md:text-6xl font-extrabold tracking-tight leading-[1.1]
              transition-all duration-1200 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]
              ${subtitleVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-12 scale-98'}
              bg-gradient-to-r from-neutral-900 via-neutral-700 to-neutral-900 dark:from-white dark:via-neutral-200 dark:to-white bg-clip-text text-transparent
            `}
          >
            Hi, I&apos;m Sahil Bhatane.
            <br />I build useful, data-driven products.
          </h1>
          <p 
            ref={descRef as any}
            className={`
              mt-5 text-neutral-600 dark:text-neutral-300 max-w-2xl
              transition-all duration-1000 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]
              ${descVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
            `}
          >
            Hands-on developer with capstone and professional projects, hackathon leadership, and internship experience
            across analytics, full‑stack, and research.
          </p>
          <div 
            ref={buttonsRef as any}
            className={`
              mt-8 flex flex-col sm:flex-row gap-3
              transition-all duration-1000 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]
              ${buttonsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
            `}
          >
            <MagneticButton href="#projects" ariaLabel="See my projects">
              <span className="flex items-center gap-2">
                See Projects <ArrowRight className="h-4 w-4" />
              </span>
            </MagneticButton>
            <MagneticButton
              href="#contact"
              ariaLabel="Contact me"
            >
              <span className="flex items-center gap-2">
                Contact Me <ArrowRight className="h-4 w-4" />
              </span>
            </MagneticButton>
          </div>
          <div 
            ref={linksRef as any}
            className={`
              mt-8 flex items-center gap-4
              transition-all duration-1000 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]
              ${linksVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
            `}
          >
            <a
              href="#experience"
              className="text-sm text-neutral-600 dark:text-neutral-300 underline underline-offset-4 hover:no-underline 
              transition-all duration-300 hover:text-green-400 hover:drop-shadow-[0_0_8px_rgba(57,255,20,0.6)]"
            >
              Work Experience
            </a>
            <a
              href="#skills"
              className="text-sm text-neutral-600 dark:text-neutral-300 underline underline-offset-4 hover:no-underline
              transition-all duration-300 hover:text-green-400 hover:drop-shadow-[0_0_8px_rgba(57,255,20,0.6)]"
            >
              Skills
            </a>
          </div>

          <div 
            className={`
              mt-12 w-full overflow-hidden rounded-lg border border-neutral-200/60 dark:border-neutral-800/60 bg-white/30 dark:bg-neutral-900/30 backdrop-blur-sm p-4
              transition-all duration-1000 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]
              ${linksVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
            `}
            style={{ transitionDelay: '1200ms' }}
          >
            <div className="flex items-center justify-between mb-4">
              <p className="text-xs text-neutral-500">GitHub Activity</p>
              <a 
                href="https://github.com/Sahilbhatane" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-900/50 border border-neutral-800 text-xs text-neutral-300 hover:text-green-400 hover:border-green-400/50 transition-all"
              >
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                @Sahilbhatane
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
            <div className="overflow-x-auto bg-[#0d1117] rounded-md p-3 border border-neutral-800">
               <img 
                  src="https://ghchart.rshah.org/39FF14/Sahilbhatane" 
                  alt="Sahilbhatane's Github Chart" 
                  className="min-w-[600px] w-full opacity-90 hover:opacity-100 transition-opacity"
                />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
