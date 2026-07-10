import Link from "next/link"
import { cn } from "@/lib/utils"

export function WolfMark({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 40 40" className={cn("size-9", className)} fill="none">
      <path d="M6 8.5 14.2 12 20 7l5.8 5L34 8.5l-2.7 19.2L20 34l-11.3-6.3L6 8.5Z" fill="currentColor" opacity=".16" />
      <path d="m7.4 9.8 7.2 3 5.4-4.6 5.4 4.6 7.2-3-2.3 16.8L20 32.4 9.7 26.6 7.4 9.8Z" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round" />
      <path d="m12.2 16.1 4.7 2.1L20 15.5l3.1 2.7 4.7-2.1-2 7.8L20 28l-5.8-4.1-2-7.8Z" fill="currentColor" />
      <path d="m17 23 3 1.8 3-1.8" stroke="var(--background)" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}

export function Logo({ compact = false, className }: { compact?: boolean; className?: string }) {
  return (
    <Link href="/" className={cn("inline-flex items-center gap-2.5 text-foreground", className)} aria-label="Wolfitpark home">
      <WolfMark className="text-primary" />
      {!compact && <span className="text-lg font-semibold tracking-tight">Wolfitpark</span>}
    </Link>
  )
}
