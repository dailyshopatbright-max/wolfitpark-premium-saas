"use client"

import dynamic from "next/dynamic"
import { usePathname } from "next/navigation"

const PageBackground = dynamic(() => import("@/components/page-background").then(m => ({ default: m.PageBackground })), { ssr: false })

export function LazyPageBackground() {
  const pathname = usePathname()
  if (pathname?.startsWith("/checkout")) return null
  return <PageBackground />
}