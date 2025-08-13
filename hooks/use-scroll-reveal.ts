"use client"

import { useEffect, useRef, useState } from "react"

interface UseScrollRevealOptions {
  threshold?: number
  rootMargin?: string
  delay?: number
  once?: boolean
}

export function useScrollReveal(options: UseScrollRevealOptions = {}) {
  const {
    threshold = 0.2,
    rootMargin = '-50px',
    delay = 0,
    once = true
  } = options

  const [isVisible, setIsVisible] = useState(false)
  const elementRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              setIsVisible(true)
            }, delay)
            if (once) {
              observer.unobserve(element)
            }
          } else if (!once) {
            setIsVisible(false)
          }
        })
      },
      { threshold, rootMargin }
    )

    observer.observe(element)

    return () => {
      observer.disconnect()
    }
  }, [threshold, rootMargin, delay, once])

  return { isVisible, elementRef }
}

export function useScrollRevealMultiple(count: number, options: UseScrollRevealOptions = {}) {
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set())
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = parseInt(entry.target.getAttribute('data-index') || '0')
          if (entry.isIntersecting) {
            setVisibleItems(prev => new Set([...prev, index]))
          } else if (!options.once) {
            setVisibleItems(prev => {
              const newSet = new Set(prev)
              newSet.delete(index)
              return newSet
            })
          }
        })
      },
      { threshold: options.threshold || 0.2, rootMargin: options.rootMargin || '-50px' }
    )

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [options.threshold, options.rootMargin, options.once])

  const getRef = (index: number) => (el: HTMLElement | null) => {
    if (el && observerRef.current) {
      el.setAttribute('data-index', index.toString())
      observerRef.current.observe(el)
    }
  }

  return { visibleItems, getRef }
}
