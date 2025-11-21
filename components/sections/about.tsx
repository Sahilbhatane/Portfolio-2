"use client"

import { resume } from "@/lib/resume-data"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"

export default function About() {
  const { isVisible: headerVisible, elementRef: headerRef } = useScrollReveal({ delay: 200 })
  const { isVisible: contentVisible, elementRef: contentRef } = useScrollReveal({ delay: 400 })
  const { isVisible: cardsVisible, elementRef: cardsRef } = useScrollReveal({ delay: 600 })

  return (
    <section id="about" className="relative py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 items-start">
          <div 
            ref={headerRef as any}
            className={`
              md:col-span-1
              transition-all duration-1000 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]
              ${headerVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}
            `}
          >
            <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-neutral-900 to-neutral-600 dark:from-white dark:to-neutral-300 bg-clip-text text-transparent">
              About Me
            </h2>
          </div>
          <div className="md:col-span-2 space-y-6">
            <p 
              ref={contentRef as any}
              className={`
                text-neutral-700 dark:text-neutral-300 leading-relaxed
                transition-all duration-1200 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]
                ${contentVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
              `}
            >
              {resume.about}
            </p>
            <div 
              ref={cardsRef as any}
              className={`
                grid sm:grid-cols-2 gap-4
                transition-all duration-1000 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]
                ${cardsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}
              `}
            >
              <div className="group rounded-xl border border-neutral-200/60 dark:border-neutral-800/60 p-4 
              bg-white/50 dark:bg-neutral-900/40 backdrop-blur-md
              transition-all duration-500 hover:shadow-[0_0_20px_rgba(57,255,20,0.15)] hover:border-green-400/40 hover:scale-[1.02]">
                <div className="text-xs text-neutral-500 group-hover:text-green-400 transition-colors duration-300">Location</div>
                <div className="font-medium group-hover:text-green-300 transition-colors duration-300">Pune, India</div>
              </div>
              <div className="group rounded-xl border border-neutral-200/60 dark:border-neutral-800/60 p-4 
              bg-white/50 dark:bg-neutral-900/40 backdrop-blur-md
              transition-all duration-500 hover:shadow-[0_0_20px_rgba(57,255,20,0.15)] hover:border-green-400/40 hover:scale-[1.02]">
                <div className="text-xs text-neutral-500 group-hover:text-green-400 transition-colors duration-300">Email</div>
                <a className="font-medium hover:underline group-hover:text-green-300 transition-colors duration-300" href={`mailto:${resume.contact.email}`}>
                  {resume.contact.email}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
