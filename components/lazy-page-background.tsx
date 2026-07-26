"use client"

import dynamic from "next/dynamic"

const PageBackground = dynamic(() => import("@/components/page-background").then(m => ({ default: m.PageBackground })), { ssr: false })

export function LazyPageBackground() {
  return <PageBackground />
}