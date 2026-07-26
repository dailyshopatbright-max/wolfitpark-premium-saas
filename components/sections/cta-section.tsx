"use client"

import Link from "next/link"
import { ArrowRight, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { FadeIn } from "@/components/animation/fade-in"
import { SectionWrapper } from "@/components/layout/section-wrapper"

export function CTASection() {
  return (
    <SectionWrapper>
      <div className="container-site">
        <FadeIn>
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0B1120] via-[#111827] to-[#0F172A] p-8 sm:p-12 lg:p-16">
            <div className="hero-grid absolute inset-0 opacity-20" />
            <div className="pointer-events-none absolute -bottom-20 -left-20 size-72 overflow-hidden rounded-3xl opacity-[0.04]">
              <img src="/images/terra.jpg" alt="" loading="lazy" decoding="async" className="h-full w-full object-cover" />
            </div>
            <div className="glow-purple absolute -top-32 -right-32 size-96 rounded-full bg-primary/5 blur-3xl" />
            <div className="gradient-border rounded-3xl p-px">
              <div className="relative rounded-3xl p-8 sm:p-12">
                <div className="mx-auto max-w-2xl text-center">
                  <div className="mb-6 flex justify-center">
                    <span className="flex size-12 items-center justify-center rounded-2xl bg-primary/10">
                      <Sparkles className="size-6 text-primary" />
                    </span>
                  </div>
                  <h2 className="text-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
                    Ready to Transform Your Business?
                  </h2>
                  <p className="mt-5 text-balance text-base leading-relaxed text-blue-200/70 sm:text-lg">
                    Bring us the complexity. We will help you turn it into a clear, scalable system
                    that drives real business outcomes.
                  </p>
                  <div className="mt-8 flex flex-wrap justify-center gap-3">
                    <Button
                      size="lg"
                      className="bg-primary text-primary-foreground shadow-lg shadow-primary/25 hover:bg-primary/90"
                      render={<Link href="/incorporate" />} nativeButton={false}
                    >
                      Start Your Company
                      <ArrowRight data-icon="inline-end" />
                    </Button>
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-blue-400/20 text-blue-100 hover:bg-blue-400/10"
                      render={<Link href="/contact" />} nativeButton={false}
                    >
                      Book Consultation
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </SectionWrapper>
  )
}
