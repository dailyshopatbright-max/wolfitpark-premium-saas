"use client"

import { useEffect, useRef } from "react"
import Lenis from "lenis"
import { useLenis } from "lenis/react"

export function LenisProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    const lenis = new Lenis({
      smoothWheel: true,
      duration: 1.2,
      orientation: "vertical",
      gestureOrientation: "vertical",
    })
    lenisRef.current = lenis

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
      lenisRef.current = null
    }
  }, [])

  useLenis()

  return <>{children}</>
}
