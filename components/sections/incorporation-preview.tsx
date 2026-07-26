"use client"

import Link from "next/link"
import { ArrowRight, Building2, FileCheck, Globe, Lock, ShieldCheck, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { FadeIn, FadeInStagger } from "@/components/animation/fade-in"
import { SectionWrapper } from "@/components/layout/section-wrapper"

const features = [
  { title: "LLC Formation", description: "File your LLC in any US state with precision.", icon: Building2 },
  { title: "Registered Agent", description: "Reliable agent service for legal compliance.", icon: ShieldCheck },
  { title: "Virtual Address", description: "A professional US business address.", icon: Globe },
  { title: "EIN Filing", description: "Get your Employer Identification Number fast.", icon: FileCheck },
  { title: "ITIN Assistance", description: "Support for international founders and non-residents.", icon: Users },
  { title: "Compliance", description: "Stay compliant with annual reports and filings.", icon: Lock },
] as const

export function IncorporationPreview() {
  return (
    <SectionWrapper>
      <div className="container-site">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <FadeIn>
              <p className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-[.22em] text-primary">
                US Business Formation
              </p>
              <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
                Start Your US Company From Anywhere
              </h2>
              <p className="mt-5 text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
                We help international founders and growing teams incorporate in the United States
                with zero friction. From LLC formation to compliance, we handle the paperwork so
                you can focus on building.
              </p>
            </FadeIn>
            <FadeInStagger className="mt-8 grid gap-3 sm:grid-cols-2">
              {features.map((feature) => (
                <div key={feature.title} className="flex items-start gap-3 rounded-xl border border-border bg-card p-4">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <feature.icon className="size-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold">{feature.title}</h3>
                    <p className="mt-1 text-xs text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              ))}
            </FadeInStagger>
            <FadeIn className="mt-8">
              <Button size="lg" render={<Link href="/register" />} nativeButton={false}>
                Get Started <ArrowRight data-icon="inline-end" />
              </Button>
            </FadeIn>
          </div>
          <FadeIn delay={0.3} className="hidden lg:block">
            <div className="relative">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/10 via-primary/5 to-transparent blur-2xl" />
              <div className="pointer-events-none absolute -top-8 -right-8 size-40 overflow-hidden rounded-2xl opacity-[0.06]">
                <img src="/images/mimi-workspace.jpg" alt="" loading="lazy" decoding="async" className="h-full w-full object-cover" />
              </div>
              <div className="relative rounded-3xl border border-border bg-card p-6 shadow-2xl">
                <div className="mb-6 flex items-center gap-3">
                  <span className="flex size-3 rounded-full bg-primary" />
                  <span className="flex size-3 rounded-full bg-border" />
                  <span className="flex size-3 rounded-full bg-border" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {["Delaware", "Wyoming", "Nevada", "Texas", "New York", "Florida"].map((state) => (
                    <div
                      key={state}
                      className="rounded-xl border border-border bg-muted/30 p-4 text-center transition-colors hover:border-primary/30 hover:bg-primary/5"
                    >
                      <p className="text-sm font-semibold">{state}</p>
                      <p className="mt-1 text-xs text-muted-foreground">$299+ filing</p>
                    </div>
                  ))}
                </div>
                <div className="mt-6 rounded-lg bg-primary/5 p-4 text-center">
                  <p className="text-xs text-muted-foreground">
                    Serving founders from 40+ countries worldwide
                  </p>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </SectionWrapper>
  )
}
