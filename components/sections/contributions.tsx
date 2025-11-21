"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import Image from "next/image"

export default function Contributions() {
  const { isVisible, elementRef } = useScrollReveal({ delay: 200 })

  return (
    <section id="contributions" className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div 
          ref={elementRef as any}
          className={`
            max-w-4xl mx-auto
            transition-all duration-1000 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]
            ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
          `}
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-8 bg-gradient-to-r from-neutral-900 to-neutral-600 dark:from-white dark:to-neutral-300 bg-clip-text text-transparent">
            GitHub Contributions
          </h2>
          
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="contributions" className="border-neutral-200/60 dark:border-neutral-800/60 border rounded-lg px-4">
              <AccordionTrigger className="hover:text-green-400 transition-colors">
                View Contribution Activity
              </AccordionTrigger>
              <AccordionContent>
                <div className="w-full overflow-x-auto py-4 flex justify-center bg-white/50 dark:bg-neutral-900/50 rounded-lg">
                  {/* Using ghchart.rshah.org for the contribution graph */}
                  <img 
                    src="https://ghchart.rshah.org/39FF14/Sahilbhatane" 
                    alt="Sahilbhatane's Github Chart" 
                    className="min-w-[700px]"
                  />
                </div>
                <div className="mt-4 text-center text-sm text-neutral-500">
                  <a href="https://github.com/Sahilbhatane" target="_blank" rel="noopener noreferrer" className="hover:text-green-400 underline">
                    Visit GitHub Profile
                  </a>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </section>
  )
}
