"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"

export default function Certifications() {
  const { isVisible, elementRef } = useScrollReveal({ delay: 200 })

  const certifications = [
    {
      title: "IIRS Python",
      issuer: "IIRS (Indian Institute of Remote Sensing)",
      description: "Certification in Python programming for remote sensing and data analysis."
    },
    {
      title: "Google & Microsoft Certificates",
      issuer: "Google / Microsoft",
      description: "Professional certifications demonstrating proficiency in cloud computing and data analytics."
    },
    {
      title: "Machine Learning Certificate",
      issuer: "Various",
      description: "Comprehensive training in Machine Learning algorithms and applications."
    }
  ]

  return (
    <section id="certifications" className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div 
          ref={elementRef as any}
          className={`
            max-w-3xl mx-auto
            transition-all duration-1000 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]
            ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
          `}
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-8 bg-gradient-to-r from-neutral-900 to-neutral-600 dark:from-white dark:to-neutral-300 bg-clip-text text-transparent">
            Certifications
          </h2>
          
          <Accordion type="single" collapsible className="w-full">
            {certifications.map((cert, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-neutral-200/60 dark:border-neutral-800/60">
                <AccordionTrigger className="hover:text-green-400 transition-colors">
                  <span className="text-left">
                    <span className="block font-semibold">{cert.title}</span>
                    <span className="block text-xs text-neutral-500 font-normal mt-1">{cert.issuer}</span>
                  </span>
                </AccordionTrigger>
                <AccordionContent className="text-neutral-600 dark:text-neutral-300">
                  {cert.description}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
