"use client"

import dynamic from "next/dynamic"
import { useEffect, useState } from "react"

const AuroraBackground = dynamic(() => import("@/components/ui/aurora-background").then(m => ({ default: m.AuroraBackground })), {
  ssr: false,
  loading: () => <div className="fixed inset-0 z-[100] bg-[#020617]" />,
})

export default function Loading() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer)
          return 100
        }
        return prev + 2
      })
    }, 30)
    return () => clearInterval(timer)
  }, [])

  return (
    <AuroraBackground className="fixed inset-0 z-[100] flex items-center justify-center">
      <div className="flex flex-col items-center gap-6 px-4 animate-in fade-in duration-500">
        <div className="flex items-center gap-3">
          <svg aria-hidden="true" viewBox="0 0 40 40" className="size-12 text-primary" fill="none">
            <path d="M6 8.5 14.2 12 20 7l5.8 5L34 8.5l-2.7 19.2L20 34l-11.3-6.3L6 8.5Z" fill="currentColor" opacity=".16" />
            <path d="m7.4 9.8 7.2 3 5.4-4.6 5.4 4.6 7.2-3-2.3 16.8L20 32.4 9.7 26.6 7.4 9.8Z" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round" />
            <path d="m12.2 16.1 4.7 2.1L20 15.5l3.1 2.7 4.7-2.1-2 7.8L20 28l-5.8-4.1-2-7.8Z" fill="currentColor" />
          </svg>
          <span className="text-3xl font-bold tracking-tight text-white">Wolfitpark</span>
        </div>
        <span className="text-sm font-medium uppercase tracking-[0.2em] text-blue-200/60">LLC</span>
        <p className="text-sm text-blue-200/40">Enterprise AI, Automation & Business Solutions</p>
        <div className="mt-4 h-0.5 max-w-[200px] overflow-hidden rounded-full bg-white/5">
          <div
            className="h-full rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </AuroraBackground>
  )
}