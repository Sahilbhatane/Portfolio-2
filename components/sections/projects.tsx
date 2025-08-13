
"use client"

import Image from "next/image"
import { resume } from "@/lib/resume-data"
import MagneticButton from "@/components/magnetic-button"
import { ExternalLink } from "lucide-react"
import { useScrollReveal, useScrollRevealMultiple } from "@/hooks/use-scroll-reveal"

export default function Projects() {
  const { isVisible: headerVisible, elementRef: headerRef } = useScrollReveal({ delay: 200 })
  const { visibleItems, getRef } = useScrollRevealMultiple(resume.projects.length, { 
    threshold: 0.3, 
    once: true 
  })

  return (
    <section id="projects" className="relative py-16 md:py-24">
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
            Projects
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {resume.projects.map((p, i) => (
            <article
              key={p.title}
              ref={getRef(i)}
              className={`
                group rounded-2xl border border-neutral-200/60 dark:border-neutral-800/60 overflow-hidden
                bg-white/60 dark:bg-neutral-900/50 backdrop-blur-md 
                transition-all duration-1000 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]
                hover:shadow-[0_0_30px_rgba(139,69,219,0.25)] hover:border-violet-400/60 hover:scale-[1.02]
                ${visibleItems.has(i) 
                  ? 'opacity-100 translate-y-0 scale-100' 
                  : 'opacity-0 translate-y-16 scale-95'
                }
              `}
              style={{
                transitionDelay: visibleItems.has(i) ? `${i * 120}ms` : '0ms'
              }}
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={p.image}
                  alt={p.imageAlt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-all duration-500 
                bg-gradient-to-br from-violet-400/20 via-transparent to-violet-600/20" />
              </div>
              <div className="p-5">
                <h3 className="text-lg font-semibold group-hover:text-violet-300 transition-colors duration-300">
                  {p.title}
                </h3>
                <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-300 group-hover:text-neutral-500 dark:group-hover:text-neutral-200 transition-colors duration-300">
                  {p.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <span
                      key={t}
                      className="text-[11px] px-2 py-1 rounded-full border border-neutral-200/60 dark:border-neutral-800/60
                      transition-all duration-300 group-hover:border-violet-400/40 group-hover:bg-violet-400/10 group-hover:text-violet-300"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <div className="mt-5 flex gap-3">
                  {p.link && (
                    <MagneticButton href={p.link} ariaLabel={`Open ${p.title}`}>
                      <span className="flex items-center gap-2">
                        View Project <ExternalLink className="h-4 w-4" />
                      </span>
                    </MagneticButton>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
