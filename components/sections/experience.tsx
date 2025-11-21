"use client"

import { resume } from "@/lib/resume-data"
import { useScrollReveal, useScrollRevealMultiple } from "@/hooks/use-scroll-reveal"

export default function Experience() {
  const { isVisible: headerVisible, elementRef: headerRef } = useScrollReveal({ delay: 200 })
  const { visibleItems, getRef } = useScrollRevealMultiple(resume.experience.length, { 
    threshold: 0.4, 
    once: true 
  })

  return (
    <section id="experience" className="relative py-16 md:py-24">
      <div className="container mx-auto px-4">
        <h2 
          ref={headerRef as any}
          className={`
            text-2xl md:text-3xl font-bold mb-8
            bg-gradient-to-r from-neutral-900 to-neutral-600 dark:from-white dark:to-neutral-300 bg-clip-text text-transparent
            transition-all duration-1000 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]
            ${headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
          `}
        >
          Work Experience
        </h2>

        <ol className="relative border-s border-neutral-200 dark:border-neutral-800">
          {resume.experience.map((exp, idx) => (
            <li 
              key={`${exp.company}-${idx}`} 
              ref={getRef(idx)}
              className={`
                mb-10 ms-4 group
                transition-all duration-1000 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]
                ${visibleItems.has(idx) 
                  ? 'opacity-100 translate-x-0' 
                  : 'opacity-0 translate-x-8'
                }
              `}
              style={{
                transitionDelay: visibleItems.has(idx) ? `${idx * 200}ms` : '0ms'
              }}
            >
              <div className="absolute w-3 h-3 rounded-full bg-gradient-to-r from-green-500 to-green-600 
              ring-2 ring-white dark:ring-neutral-900 -left-[7px] mt-2.5
              transition-all duration-500 group-hover:scale-125 group-hover:shadow-[0_0_12px_rgba(57,255,20,0.6)]" />
              
              <div className="p-4 rounded-xl border border-neutral-200/60 dark:border-neutral-800/60 
              bg-white/50 dark:bg-neutral-900/40 backdrop-blur-md
              transition-all duration-500 group-hover:border-green-400/40 group-hover:shadow-[0_0_20px_rgba(57,255,20,0.15)]
              group-hover:translate-x-2">
                <time className="mb-1 text-xs font-medium text-green-500 dark:text-green-400 
                transition-all duration-300 group-hover:text-green-400 group-hover:drop-shadow-[0_0_4px_rgba(57,255,20,0.6)]">
                  {exp.period}
                </time>
                <h3 className="text-lg font-semibold group-hover:text-green-300 transition-colors duration-300">
                  {exp.role} • {exp.company}
                </h3>
                <div className="text-xs text-neutral-500 mb-2 group-hover:text-green-400 transition-colors duration-300">
                  {exp.location}
                </div>
                <ul className="list-disc pl-5 text-neutral-700 dark:text-neutral-300 space-y-1">
                  {exp.highlights.map((h, i) => (
                    <li key={i} className="group-hover:text-neutral-600 dark:group-hover:text-neutral-200 transition-colors duration-300">
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
