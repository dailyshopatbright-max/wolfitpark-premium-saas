"use client"

import { useRef } from "react"
import Link from "next/link"
import { ArrowRight, ChevronLeft, ChevronRight, Quote, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { FadeIn } from "@/components/animation/fade-in"
import { SectionWrapper } from "@/components/layout/section-wrapper"
import { testimonials } from "@/lib/site-data"

export function TestimonialsSection() {
  const scrollRef = useRef<HTMLDivElement>(null!)

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return
    const amount = 400
    scrollRef.current.scrollBy({ left: dir === "left" ? -amount : amount, behavior: "smooth" })
  }

  return (
    <SectionWrapper>
      <div className="container-site relative">
        <div className="pointer-events-none absolute -top-16 -right-8 size-40 overflow-hidden rounded-2xl opacity-[0.05]">
          <img src="/images/markus-circuit.jpg" alt="" loading="lazy" decoding="async" className="h-full w-full object-cover" />
        </div>
        <FadeIn className="flex items-end justify-between">
          <div>
            <p className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-[.22em] text-primary">
              Client perspective
            </p>
            <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
              Trusted by Enterprise Leaders
            </h2>
          </div>
          <div className="hidden gap-2 sm:flex">
            <Button variant="outline" size="icon" onClick={() => scroll("left")} aria-label="Previous testimonials">
              <ChevronLeft className="size-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={() => scroll("right")} aria-label="Next testimonials">
              <ChevronRight className="size-4" />
            </Button>
          </div>
        </FadeIn>
        <div
          ref={scrollRef}
          className="mt-12 flex gap-5 overflow-x-auto scrollbar-hide snap-x snap-mandatory -mx-4 px-4 pb-4"
        >
          {testimonials.map((item) => (
            <figure
              key={item.name}
              className="glass-light dark:glass min-w-[340px] snap-start rounded-2xl p-7 sm:min-w-[400px]"
            >
              <Quote className="size-7 text-primary" />
              <div className="mt-6 flex gap-1" aria-label={`${item.rating} out of 5 stars`}>
                {Array.from({ length: item.rating }).map((_, i) => (
                  <Star key={i} className="size-4 fill-primary text-primary" />
                ))}
              </div>
              <blockquote className="mt-5 text-base leading-relaxed">&ldquo;{item.quote}&rdquo;</blockquote>
              <figcaption className="mt-7 border-t border-border pt-5">
                <p className="font-semibold">{item.name}</p>
                <p className="mt-1 text-sm text-muted-foreground">{item.role}</p>
              </figcaption>
            </figure>
          ))}
        </div>
        <FadeIn className="mt-8 text-center">
          <Button variant="outline" render={<Link href="/testimonials" />} nativeButton={false}>
            Read success stories <ArrowRight data-icon="inline-end" />
          </Button>
        </FadeIn>
      </div>
    </SectionWrapper>
  )
}
