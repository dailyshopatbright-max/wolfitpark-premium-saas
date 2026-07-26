import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "404 - Page Not Found",
  description: "The page you're looking for doesn't exist or has been moved.",
}

export default function NotFound() {
  return (
    <section className="relative flex min-h-[80svh] items-center justify-center overflow-hidden">
      {/* Animated particles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--primary)_0%,_transparent_70%)] opacity-10" />
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className="absolute size-1 rounded-full bg-primary/20 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      <div className="relative text-center">
        <h1 className="text-[10rem] font-bold leading-none tracking-tighter sm:text-[14rem]">
          <span className="text-gradient">404</span>
        </h1>
        <h2 className="mt-6 text-3xl font-semibold tracking-tight sm:text-4xl">Page not found</h2>
        <p className="mx-auto mt-4 max-w-md text-muted-foreground">The page you&apos;re looking for doesn&apos;t exist or has been moved to a new address.</p>
        <div className="mt-8">
          <Button size="lg" render={<Link href="/" />}>
            <ArrowLeft data-icon="inline-start" /> Go Home
          </Button>
        </div>
      </div>
    </section>
  )
}
