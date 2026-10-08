"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"

export default function Certifications() {
  const { isVisible, elementRef } = useScrollReveal({ delay: 200 })

  const certifications = [
    {
      title: "Intro to C++ and Data Structures and Algorithms",
      issuer: "AWS Community Builders / DevTown",
      description:
        "Certificate demonstrating completion of training in C++ along with Data Structures and Algorithms.",
      authentication: "ZCxGa5",
    },
    {
      title: "Intro to C++ and Data Structures and Algorithms",
      issuer: "DevTown / GDSC Giet University / AWS Community Builders",
      description:
        "Certificate demonstrating completion of training in C++ and Data Structures and Algorithms.",
      authentication: "r829w",
    },
    {
      title: "Production AI Model Development and Ethics",
      issuer: "Coursera",
      description:
        "Course covering the development and ethical considerations involved in production AI and machine learning systems.",
      authentication: "7SS9BFJQHDML",
    },
    {
      title: "Cyber Security Workshop",
      issuer:
        "MIT World Peace University (MIT-WPU), School of Polytechnic and Skill Development",
      description:
        "Certificate of participation and successful completion of a two-day Cyber Security workshop conducted on 11th and 12th November 2022.",
      authentication: "Not available",
    },
    {
      title: "Certificate of Appreciation for Community Support",
      issuer: "DevTown / MSME Startup India",
      description:
        "Certificate recognizing community support and contribution.",
      authentication: "Z1tLMWn",
    },
    {
      title: "Exploratory Data Analysis for Machine Learning",
      issuer: "IBM, through Coursera",
      description:
        "Course covering exploratory data analysis techniques and their application in machine learning workflows.",
      authentication: "UGOPKJ7QTWCD",
    },
    {
      title: "Intro to C++ and Data Structures and Algorithms",
      issuer: "Google Developer Student Clubs (GDSC) / DevTown",
      description:
        "Certificate demonstrating completion of training focused on C++ and Data Structures and Algorithms.",
      authentication: "Z1WKLip",
    },
    {
      title: "Foundations of Data Science",
      issuer: "Google, through Coursera",
      description:
        "Course covering foundational concepts and practices in Data Science.",
      authentication: "3MFHG8SCVIBX",
    },
    {
      title: "Build RAG Applications: Get Started",
      issuer: "IBM, through Coursera",
      description:
        "Course focused on building Retrieval-Augmented Generation (RAG) applications.",
      authentication: "QSBSCB5KPKRX",
    },
    {
      title: "Develop Generative AI Applications: Get Started",
      issuer: "IBM, through Coursera",
      description:
        "Course focused on developing applications using Generative AI technologies.",
      authentication: "9YQ18YA0V22E",
    },
    {
      title: "Geodata Processing using Python",
      issuer: "Indian Institute of Remote Sensing (IIRS), ISRO",
      description:
        "Online course covering Geodata Processing using Python, conducted from 15 January to 19 January 2024.",
      authentication: "371df13ed34bced9a8bb25595afe47d3",
    },
    {
      title: "Introduction to Concurrent Programming with GPUs",
      issuer: "Johns Hopkins University, through Coursera",
      description:
        "Course covering concurrent programming concepts and programming with GPUs.",
      authentication: "DJ497UKNGTP0",
    },
    {
      title: "Foundations of AI and Machine Learning",
      issuer: "Microsoft, through Coursera",
      description:
        "Course covering foundational concepts in Artificial Intelligence and Machine Learning.",
      authentication: "481CNMCZ05ME",
    },
    {
      title: "INNOVISION - The Project Competition",
      issuer:
        "MIT Polytechnic & MIT World Peace University (MIT-WPU), School of Polytechnic and Skill Development",
      description:
        "Certificate of participation in the INNOVISION project competition held on 5 April 2023.",
      authentication: "Not available",
    },
    {
      title: "Python (Basic)",
      issuer: "HackerRank",
      description:
        "HackerRank certification demonstrating successful completion of the Python (Basic) assessment.",
      authentication: "7FEB2C6369B",
    },
    {
      title: "Certificate for the Completion of Cpp Training",
      issuer: "Spoken Tutorial Project, IIT Bombay",
      description:
        "Certificate for successfully completing the Cpp test and training offered by the Spoken Tutorial Project, IIT Bombay.",
      authentication: "3563700MBP",
    },
    {
      title: "Intro to Snowflake for Devs, Data Scientists, Data Engineers",
      issuer: "Snowflake, through Coursera",
      description:
        "Course introducing Snowflake concepts and workflows for developers, data scientists, and data engineers.",
      authentication: "X6U2Y3Q25SP4",
    },
  ]

  return (
    <section id="certifications" className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div
          ref={elementRef as any}
          className={`
            max-w-6xl
            transition-all duration-1000 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]
            ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }
          `}
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-8 bg-gradient-to-r from-neutral-900 to-neutral-600 dark:from-white dark:to-neutral-300 bg-clip-text text-transparent">
            Certifications
          </h2>

          <Accordion
            type="single"
            collapsible
            className="grid w-full grid-cols-1 gap-x-8 sm:grid-cols-2"
          >
            {certifications.map((cert, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border-neutral-200/60 dark:border-neutral-800/60"
              >
                <AccordionTrigger className="hover:text-green-400 transition-colors">
                  <span className="text-left">
                    <span className="block font-semibold">
                      {cert.title}
                    </span>

                    <span className="block text-xs text-neutral-500 font-normal mt-1">
                      {cert.issuer}
                    </span>
                  </span>
                </AccordionTrigger>

                <AccordionContent className="text-neutral-600 dark:text-neutral-300">
                  <div className="space-y-2">
                    <p>{cert.description}</p>

                    <p className="text-sm">
                      <span className="font-medium text-neutral-800 dark:text-neutral-200">
                        Authentication Number:
                      </span>{" "}
                      <span className="font-mono text-xs">
                        {cert.authentication}
                      </span>
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}