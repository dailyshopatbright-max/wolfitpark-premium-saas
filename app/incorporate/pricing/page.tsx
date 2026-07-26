import Link from "next/link"
import type { Metadata } from "next"
import { ArrowRight, Sparkles, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { PageTransition } from "@/components/animation/page-transition"
import { FadeIn, FadeInStagger } from "@/components/animation/fade-in"

export const metadata: Metadata = {
  title: "Incorporation Services",
  description: "Professional US business incorporation services. LLC formation, EIN filing, ITIN assistance, and compliance support.",
  alternates: { canonical: "/incorporate/pricing" },
}

export default function IncorporationPricingPage() {
  const plans = [
    {
      name: "Starter",
      description: "Basic LLC formation with state filing support and digital documents.",
      features: ["Basic LLC Formation", "State Filing Support", "Digital Documents", "Email Support"],
      popular: false,
    },
    {
      name: "Professional",
      description: "Complete LLC formation with EIN, operating agreement, and registered agent service.",
      features: ["Everything in Starter", "EIN Filing Included", "Registered Agent", "Operating Agreement", "Virtual Business Address", "Priority Processing"],
      popular: true,
    },
    {
      name: "Premium",
      description: "Full-service incorporation with ITIN assistance and compliance monitoring.",
      features: ["Everything in Professional", "ITIN Assistance", "Bank Account Guidance", "Compliance Monitoring", "Bookkeeping Integration", "Dedicated Account Manager", "Mail Forwarding"],
      popular: false,
    },
  ]
  return (
    <PageTransition>
      <section className="relative overflow-hidden border-b border-border bg-muted/30">
        <div className="hero-grid absolute inset-0 opacity-45" />
        <div className="container-site relative py-20 sm:py-28">
          <div className="max-w-4xl">
            <Badge variant="outline" className="mb-4 rounded-full px-3 py-1.5"><Sparkles /> Incorporation</Badge>
            <h1 className="text-balance text-4xl font-semibold tracking-[-.04em] sm:text-6xl lg:text-7xl">
              Start Your US Company
            </h1>
            <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground sm:text-xl">
              Choose the right incorporation package for your business. State filing fees vary by state and are paid directly to the state.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button size="lg" render={<Link href="/register" />}>
                Get Started <ArrowRight data-icon="inline-end" />
              </Button>
              <Button variant="outline" size="lg" render={<Link href="/incorporate/states" />}>
                Compare States
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-site">
          <FadeIn className="text-center">
            <p className="mb-4 flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-[.22em] text-primary">
              <Sparkles className="size-3.5" /> Service Packages
            </p>
            <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">Choose your incorporation package.</h2>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground">All packages include our expert support team to guide you through every step.</p>
          </FadeIn>
          <FadeInStagger className="mt-12 grid gap-5 lg:grid-cols-3">
            {plans.map((p) => (
              <FadeIn key={p.name}>
                <div className={`relative flex flex-col rounded-2xl border p-7 ${p.popular ? "border-primary bg-card shadow-xl shadow-primary/15" : "border-border bg-card"}`}>
                  {p.popular && <Badge variant="secondary" className="absolute right-5 top-5">Most popular</Badge>}
                  <p className="text-sm font-semibold">{p.name}</p>
                  <p className={`mt-5 text-sm leading-relaxed ${p.popular ? "text-foreground" : "text-muted-foreground"}`}>{p.description}</p>
                  <ul className="mt-7 flex flex-col gap-3">
                    {p.features.map((f) => (
                      <li key={f} className="flex gap-2 text-sm">
                        <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Button className="mt-8 w-full" variant={p.popular ? "default" : "outline"} render={<Link href="/register" />}>
                    Get Started
                  </Button>
                </div>
              </FadeIn>
            ))}
          </FadeInStagger>
        </div>
      </section>

      <section className="section-pad bg-foreground text-background">
        <div className="container-site">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-semibold">State filing fees are paid separately.</h2>
            <p className="mt-4 text-background/60">
              Each state charges its own filing fee, annual report fee, and franchise tax. These vary by state and are paid directly to the state government during filing.
              Our service fee covers the professional handling, document preparation, and ongoing support we provide.
            </p>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {[
              ["Transparent Costs", "All state fees are disclosed upfront. No hidden charges."],
              ["Pay As You Go", "Service fees and state fees are separate line items."],
              ["Satisfaction Guaranteed", "We stand behind our service with a satisfaction guarantee."],
            ].map(([t, d]) => (
              <div key={t} className="rounded-xl border border-background/15 bg-background/5 p-5">
                <h3 className="font-semibold text-background">{t}</h3>
                <p className="mt-2 text-sm text-background/60">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-site">
          <div className="relative overflow-hidden rounded-3xl bg-primary p-8 text-primary-foreground sm:p-12 lg:flex lg:items-center lg:justify-between lg:p-16">
            <div className="hero-grid absolute inset-0 opacity-20" />
            <div className="relative max-w-2xl">
              <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">Ready to start your company?</h2>
              <p className="mt-4 text-pretty leading-relaxed text-primary-foreground/75">Begin your registration in under 5 minutes. We handle the rest.</p>
            </div>
            <Button variant="secondary" size="lg" className="relative mt-8 lg:mt-0" render={<Link href="/register" />}>
              Begin Registration <ArrowRight data-icon="inline-end" />
            </Button>
          </div>
        </div>
      </section>
    </PageTransition>
  )
}
