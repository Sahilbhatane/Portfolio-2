"use client"

import Image from "next/image"
import { resume } from "@/lib/resume-data"
import { useScrollReveal, useScrollRevealMultiple } from "@/hooks/use-scroll-reveal"

export default function Skills() {
  const { isVisible: headerVisible, elementRef: headerRef } = useScrollReveal({ delay: 200 })
  const { visibleItems, getRef } = useScrollRevealMultiple(resume.skills.length, { 
    threshold: 0.3, 
    once: true 
  })

  return (
    <section id="skills" className="relative py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div 
          ref={headerRef as any}
          className={`
            flex items-end justify-between mb-8
            transition-all duration-1000 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]
            ${headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
          `}
        >
          <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-neutral-900 to-neutral-600 dark:from-white dark:to-neutral-300 bg-clip-text text-transparent">
            Skills
          </h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {resume.skills.map((skill, index) => (
            <div
              key={skill.name}
              ref={getRef(index)}
              className={`
                group relative rounded-xl border border-neutral-200/60 dark:border-neutral-800/60 p-4 text-center 
                bg-white/50 dark:bg-neutral-900/40 backdrop-blur-md 
                transition-all duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]
                hover:scale-[1.08] hover:shadow-[0_0_25px_rgba(139,69,219,0.25)] hover:border-violet-400/60
                ${visibleItems.has(index) 
                  ? 'opacity-100 translate-y-0 scale-100' 
                  : 'opacity-0 translate-y-12 scale-90'
                }
              `}
              style={{
                transitionDelay: visibleItems.has(index) ? `${index * 80}ms` : '0ms'
              }}
            >
              <div className="flex flex-col items-center gap-3">
                <div className="relative w-8 h-8 flex-shrink-0 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
                  <Image
                    src={skill.image}
                    alt={`${skill.name} icon`}
                    fill
                    className="object-contain filter transition-all duration-500 group-hover:drop-shadow-[0_0_8px_rgba(139,69,219,0.4)]"
                  />
                </div>
                <span className="font-medium text-neutral-800 dark:text-neutral-100 transition-all duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] text-sm
                group-hover:text-violet-400 group-hover:drop-shadow-[0_0_8px_rgba(139,69,219,0.8)] group-hover:[text-shadow:0_0_12px_rgba(139,69,219,0.6)]">
                  {skill.name}
                </span>
              </div>
              
              {/* Hover glow effect */}
              <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none
              bg-gradient-to-br from-violet-400/10 via-transparent to-violet-600/10"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
