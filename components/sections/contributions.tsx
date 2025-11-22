"use client"

import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { GitCommit, GitPullRequest, GitFork, Star, Building2, ArrowRight } from "lucide-react"
import Link from "next/link"

const activities = [
  {
    type: "push",
    icon: GitCommit,
    title: "Pushed to Sahilbhatane/Federated-Meta-learning",
    description: "Federated Meta Learning using MAML and Pytorch",
    date: "2 days ago",
    color: "text-neon-green",
    link: "https://github.com/Sahilbhatane/Federated-Meta-learning-using-MAML-and-Pytorch"
  },
  {
    type: "pr",
    icon: GitPullRequest,
    title: "Opened PR in Real-time-WebRTC-VLM",
    description: "Added multi-object detection support using Vision Language Models",
    date: "1 week ago",
    color: "text-neon-cyan",
    link: "https://github.com/Sahilbhatane/Real-time-WebRTC-VLM-Multi-Object-Detection"
  },
  {
    type: "fork",
    icon: GitFork,
    title: "Forked repository facebook/react",
    description: "Forked facebook/react to Sahilbhatane/react",
    date: "2 weeks ago",
    color: "text-neon-pink",
    link: "https://github.com/Sahilbhatane"
  },
  {
    type: "contribution",
    icon: Building2,
    title: "Contributed to Brainlyhood Technology Pvt Ltd",
    description: "Full Stack Development Intern - Built portfolio sites",
    date: "Dec 2024",
    color: "text-yellow-400",
    link: "#"
  },
  {
    type: "star",
    icon: Star,
    title: "Starred vercel/next.js",
    description: "The React Framework",
    date: "1 month ago",
    color: "text-yellow-400",
    link: "https://github.com/vercel/next.js"
  }
]

export default function Contributions() {
  const { isVisible, elementRef } = useScrollReveal({ delay: 200 })

  return (
    <section id="contributions" className="py-16 md:py-24">
      <div className="container px-4">
        <div 
          ref={elementRef as any}
          className={`
            max-w-4xl
            transition-all duration-1000 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]
            ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
          `}
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-neon-cyan flex items-center gap-3">
            <GitCommit className="w-8 h-8" />
            Contribution Activity
          </h2>
          
          <div className="relative border-l-2 border-neutral-800 ml-3 md:ml-6 space-y-8 md:space-y-12">
            {activities.map((activity, index) => (
              <div key={index} className="relative pl-8 md:pl-12 group">
                {/* Timeline Dot */}
                <div className={`absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-neutral-900 border-2 border-neutral-600 group-hover:border-neon-green group-hover:scale-125 transition-all duration-300`} />
                
                <div className="flex flex-col sm:flex-row sm:items-start gap-4 bg-neutral-900/30 p-4 rounded-lg border border-neutral-800 hover:border-neon-cyan/50 transition-colors duration-300">
                  <div className={`p-2 rounded-full bg-neutral-800/50 ${activity.color}`}>
                    <activity.icon className="w-5 h-5" />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-1">
                      <h3 className="font-semibold text-neutral-200 group-hover:text-neon-cyan transition-colors">
                        {activity.title}
                      </h3>
                      <span className="text-xs text-neutral-500 font-mono">{activity.date}</span>
                    </div>
                    <p className="text-sm text-neutral-400 mb-3">
                      {activity.description}
                    </p>
                    {activity.link !== "#" && (
                      <Link 
                        href={activity.link}
                        target="_blank"
                        className="inline-flex items-center text-xs text-neon-green hover:underline gap-1"
                      >
                        View Details <ArrowRight className="w-3 h-3" />
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
