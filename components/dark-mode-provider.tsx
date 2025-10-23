"use client"

import type { ReactNode } from "react"
import { useEffect, useState } from "react"

export function DarkModeProvider({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Check localStorage and system preference
    const stored = localStorage.getItem("darkMode")
    const isDark = stored !== null ? stored === "true" : window.matchMedia("(prefers-color-scheme: dark)").matches

    const html = document.documentElement
    if (isDark) {
      html.classList.add("dark")
    } else {
      html.classList.remove("dark")
    }
  }, [])

  if (!mounted) {
    return <>{children}</>
  }

  return <>{children}</>
}
