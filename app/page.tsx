import { Suspense } from "react"
import Navbar from "@/components/navbar"
import InteractiveBackground from "@/components/interactive-background"
import SmoothScroller from "@/components/smooth-scroller"
import Hero from "@/components/sections/hero"
import About from "@/components/sections/about"
import Skills from "@/components/sections/skills"
import Projects from "@/components/sections/projects"
import Experience from "@/components/sections/experience"
import ContactFooter from "@/components/sections/contact-footer"

export default function Page() {
  return (
    <main className="relative overflow-x-hidden">
      {/* Global interactive background */}
      <InteractiveBackground />

      {/* Smooth scrolling */}
      <SmoothScroller />

      {/* Dynamic Island Navbar */}
      <Navbar />

      <div className="relative z-10 overflow-x-hidden">
        <Suspense fallback={<div className="h-[60vh]" />}>
          <Hero />
        </Suspense>
        <About />
        <Skills />
        <Projects />
        <Experience />
      </div>

      {/* Collapsible Contact Footer */}
      <ContactFooter />
    </main>
  )
}
