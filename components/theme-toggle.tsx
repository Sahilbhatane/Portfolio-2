"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useTheme } from "next-themes"

type ThemeToggleProps = {
  render?: (mode: "light" | "dark" | "system", toggle: () => void) => React.ReactNode
}

export default function ThemeToggle({ render }: ThemeToggleProps) {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  const toggle = () => {
    const next = (resolvedTheme === "dark" ? "light" : "dark") as "light" | "dark"
    setTheme(next)
  }

  if (!mounted) return null

  if (render) return <>{render((resolvedTheme as any) || (theme as any), toggle)}</>

  return (
    <button
      className="inline-flex h-9 w-9 items-center justify-center rounded-full border"
      onClick={toggle}
      aria-label="Toggle theme"
    >
      {resolvedTheme}
    </button>
  )
}
