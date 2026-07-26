"use client"

import { FadeIn, FadeInStagger } from "@/components/animation/fade-in"
import { SectionWrapper } from "@/components/layout/section-wrapper"
import { processSteps } from "@/lib/site-data"

export function ProcessSection() {
  return (
    <SectionWrapper className="bg-muted/30">
      <div className="container-site">
        <FadeIn>
          <p className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-[.22em] text-primary">
            How We Deliver
          </p>
          <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
            Momentum without mystery
          </h2>
          <p className="mt-5 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
            A focused process keeps decisions visible, risk controlled, and value moving into users&apos; hands.
          </p>
        </FadeIn>
        <FadeInStagger className="mt-12 grid gap-6 md:grid-cols-4">
          {processSteps.map(([number, title, description], i) => (
            <div key={number} className="group relative">
              <div className="border-t-2 border-primary pt-5 transition-all group-hover:border-t-4">
                <span className="text-xs font-semibold text-primary">{number}</span>
                <h3 className="mt-4 text-xl font-semibold">{title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{description}</p>
              </div>
              {i < processSteps.length - 1 && (
                <div className="hidden md:block absolute -right-3 top-8 h-px w-6 bg-gradient-to-r from-primary/40 to-transparent" />
              )}
            </div>
          ))}
        </FadeInStagger>
      </div>
    </SectionWrapper>
  )
}
