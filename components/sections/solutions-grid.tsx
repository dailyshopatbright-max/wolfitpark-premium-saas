"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { FadeIn, FadeInStagger } from "@/components/animation/fade-in"
import { SectionWrapper } from "@/components/layout/section-wrapper"
import { solutions } from "@/lib/site-data"

export function SolutionsGrid() {
  return (
    <SectionWrapper className="bg-muted/30">
      <div className="container-site relative">
        <div className="pointer-events-none absolute -bottom-16 -left-16 size-56 overflow-hidden rounded-3xl opacity-[0.05] -rotate-6">
          <img src="/images/paul-abstract.jpg" alt="" loading="lazy" decoding="async" className="h-full w-full object-cover" />
        </div>
        <FadeIn>
          <p className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-[.22em] text-primary">
            Solutions by Industry
          </p>
          <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
            Built for your reality
          </h2>
          <p className="mt-5 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
            We translate proven patterns into systems designed around how your organization actually works.
          </p>
        </FadeIn>
        <FadeInStagger className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {solutions.map(([title, description, Icon]) => (
            <Link
              key={title}
              href="/solutions"
              className="group rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5 lg:p-5"
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
      </div>
    </SectionWrapper>
  )
}
