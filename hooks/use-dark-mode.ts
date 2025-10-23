"use client"

import { useEffect, useState } from "react"

export function useDarkMode() {
  const [isDark, setIsDark] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Check localStorage and system preference
    const stored = localStorage.getItem("darkMode")
    if (stored !== null) {
      setIsDark(stored === "true")
    } else {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
      setIsDark(prefersDark)
    }
  }, [])

  useEffect(() => {
    if (!mounted) return

    const html = document.documentElement
    if (isDark) {
      html.classList.add("dark")
      console.log("[v0] Dark mode enabled")
    } else {
      html.classList.remove("dark")
      console.log("[v0] Dark mode disabled")
    }
    localStorage.setItem("darkMode", isDark.toString())
  }, [isDark, mounted])

  const toggle = () => {
    console.log("[v0] Toggling dark mode from", isDark, "to", !isDark)
    setIsDark(!isDark)
  }

  return { isDark, toggle, mounted }
}
