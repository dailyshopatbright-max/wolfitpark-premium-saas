"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { FadeIn, FadeInStagger } from "@/components/animation/fade-in"
import { SectionWrapper } from "@/components/layout/section-wrapper"
import { services } from "@/lib/site-data"

export function ServicesGrid() {
  return (
    <SectionWrapper>
      <div className="container-site relative">
        <div className="pointer-events-none absolute -top-20 -right-20 size-64 overflow-hidden rounded-3xl opacity-[0.06] rotate-12">
          <img src="/images/markus-code.jpg" alt="" loading="lazy" decoding="async" className="h-full w-full object-cover" />
        </div>
        <FadeIn>
          <p className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-[.22em] text-primary">
            What We Build
          </p>
          <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
            Enterprise-Grade Technology Solutions
          </h2>
          <p className="mt-5 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
            Strategy, design, engineering, and automation come together in one accountable team.
          </p>
        </FadeIn>
        <FadeInStagger className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map(([title, description, Icon]) => (
            <Link
              key={title}
              href="/services"
              className="group rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5"
            >
              <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Icon className="size-5" />
              </div>
              <h3 className="mt-6 text-lg font-semibold">{title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{description}</p>
              <span className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-primary opacity-0 transition-all group-hover:opacity-100">
                Learn more <ArrowRight className="size-4" />
              </span>
            </Link>
          ))}
        </FadeInStagger>
        <FadeIn className="mt-10">
          <Button variant="outline" render={<Link href="/services" />} nativeButton={false}>
            Explore all services <ArrowRight data-icon="inline-end" />
          </Button>
        </FadeIn>
      </div>
    </SectionWrapper>
  )
}
