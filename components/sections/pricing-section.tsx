"use client"

import Link from "next/link"
import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FadeIn, FadeInStagger } from "@/components/animation/fade-in"
import { SectionWrapper } from "@/components/layout/section-wrapper"
import { AcceptedPaymentBadge } from "@/components/card-logos"

const tiers: {
  name: string
  price: string
  description: string
  features: readonly string[]
  cta: string
  popular?: boolean
}[] = [
  {
    name: "Starter",
    price: "$4,500",
    description: "A focused foundation for a growing team with one clear product or workflow goal.",
    features: ["Product discovery sprint", "One delivery squad", "Core web platform", "Cloud deployment", "30-day launch support"] as const,
    cta: "Get started",
  },
  {
    name: "Growth",
    price: "$9,500",
    description: "Ongoing product and automation capacity for organizations building momentum.",
    features: ["Continuous roadmap delivery", "Cross-functional senior team", "Integrations and automation", "Analytics and observability", "Priority support"] as const,
    cta: "Start a conversation",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Let's talk",
    description: "A tailored transformation partnership for complex systems, governance, and scale.",
    features: ["Multi-team delivery", "Architecture and modernization", "Security and governance", "Custom service levels", "Executive steering"] as const,
    cta: "Contact enterprise",
  },
]

export function PricingSection() {
  return (
    <SectionWrapper className="bg-muted/30">
      <div className="container-site">
        <FadeIn className="mx-auto max-w-2xl text-center">
          <p className="mb-4 flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-[.22em] text-primary">
            Simple, Transparent Pricing
          </p>
          <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
            Plans that scale with you
          </h2>
          <p className="mt-5 text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
            No hidden fees. No surprises. Pick the engagement model that fits your stage.
          </p>
        </FadeIn>
        <FadeInStagger className="mt-12 grid gap-5 lg:grid-cols-3">
          {tiers.map((tier) => (
            <article
              key={tier.name}
              className={`relative flex flex-col rounded-3xl border p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
                tier.popular
                  ? "gradient-border border-transparent bg-card shadow-lg shadow-primary/10"
                  : "border-border bg-card hover:border-primary/30"
              }`}
            >
              {tier.popular && (
                <Badge variant="default" className="absolute right-5 top-5">
                  Most popular
                </Badge>
              )}
              <p className="text-sm font-semibold text-muted-foreground">{tier.name}</p>
              <div className="mt-6">
                <span className="text-4xl font-semibold tracking-tight">{tier.price}</span>
                {tier.price !== "Let's talk" && (
                  <span className="text-muted-foreground"> / month</span>
                )}
              </div>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{tier.description}</p>
              <ul className="mt-8 flex flex-col gap-3">
                {tier.features.map((f) => (
                  <li key={f} className="flex gap-2 text-sm">
                    <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                    {f}
                  </li>
                ))}
              </ul>
              <Button
                className="mt-8"
                variant={tier.popular ? "default" : "outline"}
                render={<Link href="/pricing" />}
              >
                {tier.cta}
              </Button>
            </article>
          ))}
        </FadeInStagger>
        <FadeIn className="mt-10">
          <AcceptedPaymentBadge
            label="Secure Transactions · 256-bit SSL · PCI DSS Compliant"
            className="rounded-2xl border border-border bg-card/60 py-5"
          />
        </FadeIn>
      </div>
    </SectionWrapper>
  )
}
