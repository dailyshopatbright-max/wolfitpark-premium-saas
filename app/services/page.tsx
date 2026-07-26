import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { PageTransition } from "@/components/animation/page-transition"
import { FadeIn, FadeInStagger } from "@/components/animation/fade-in"
import { servicePackages, processSteps, iconMap } from "@/lib/site-data"

export const metadata: Metadata = {
  title: "Services",
  description: "Comprehensive technology, automation, and business solutions from Wolfitpark.",
  alternates: { canonical: "/services" },
}

const highlights = [
  "Senior, cross-functional delivery teams",
  "Security and privacy built into every layer",
  "Continuous deployment with observable quality",
  "Post-launch support and ongoing evolution",
]

export default function ServicesPage() {
  return (
    <PageTransition>
      <section className="relative overflow-hidden border-b border-border bg-muted/30">
        <div className="hero-grid absolute inset-0 opacity-45" />
        <div className="container-site relative py-20 sm:py-28">
          <div className="max-w-4xl">
            <Badge variant="outline" className="mb-4 rounded-full px-3 py-1.5">Our Services</Badge>
            <h1 className="text-balance text-4xl font-semibold tracking-[-.04em] sm:text-6xl lg:text-7xl">
              Comprehensive Technology & Business Solutions
            </h1>
            <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground sm:text-xl">
              From AI-powered automation to US business incorporation, we deliver end-to-end solutions that transform how you operate.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button size="lg" render={<Link href="/contact" />}>
                Start Your Project <ArrowRight data-icon="inline-end" />
              </Button>
              <Button variant="outline" size="lg" render={<Link href="/portfolio" />}>
                View Our Work
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-site">
          <FadeIn>
            <p className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-[.22em] text-primary">
              What We Deliver
            </p>
            <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
              End-to-End Service Packages
            </h2>
            <p className="mt-5 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
              Every engagement is staffed with senior practitioners who take ownership of outcomes, not just tasks.
            </p>
          </FadeIn>
          <FadeInStagger className="mt-12 grid gap-6 lg:grid-cols-2">
            {servicePackages.map((pkg) => {
              const Icon = iconMap[pkg.icon as keyof typeof iconMap] || (() => null)
              return (
                <Link
                  key={pkg.id}
                  href={`/services/${pkg.id}`}
                  className="group rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Icon className="size-6" />
                    </div>
                    <Badge variant="secondary" className="rounded-full">{pkg.timeline}</Badge>
                  </div>
                  <h3 className="mt-5 text-xl font-semibold">{pkg.title}</h3>
                  <p className="mt-1 text-sm font-medium text-primary">{pkg.subtitle}</p>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{pkg.description}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {pkg.stack.map((tech) => (
                      <Badge key={tech} variant="outline" className="rounded-full text-xs">{tech}</Badge>
                    ))}
                  </div>
                  <ul className="mt-5 flex flex-col gap-2">
                    {pkg.features.slice(0, 4).map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />
                        {f}
                      </li>
                    ))}
                    {pkg.features.length > 4 && (
                      <li className="text-sm font-medium text-primary">+{pkg.features.length - 4} more features</li>
                    )}
                  </ul>
                  <span className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-primary opacity-0 transition-all group-hover:opacity-100">
                    View details <ArrowRight className="size-4" />
                  </span>
                </Link>
              )
            })}
          </FadeInStagger>
        </div>
      </section>

      <section className="section-pad bg-foreground text-background">
        <div className="container-site grid gap-12 lg:grid-cols-[.6fr_1.4fr] lg:items-center">
          <div>
            <h2 className="text-balance text-3xl font-semibold sm:text-4xl">Enterprise-grade capability, startup-level speed.</h2>
            <p className="mt-4 text-background/60">Every engagement is staffed with senior practitioners who take ownership of outcomes, not just tasks.</p>
          </div>
          <ul className="grid gap-3 sm:grid-cols-2">
            {highlights.map((h) => (
              <li key={h} className="flex items-center gap-3 rounded-xl border border-background/15 bg-background/5 p-4 text-sm">
                <CheckCircle2 className="size-5 shrink-0 text-primary" />
                {h}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-site">
          <FadeIn>
            <p className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-[.22em] text-primary">How We Deliver</p>
            <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">Clarity at every stage.</h2>
            <p className="mt-5 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground">We organize work around outcomes, keep important decisions visible, and ship in useful increments.</p>
          </FadeIn>
          <div className="mt-12 grid gap-6 md:grid-cols-4">
            {processSteps.map(([n, t, d]) => (
              <article key={n} className="border-t-2 border-primary pt-5">
                <p className="text-sm font-semibold text-primary">{n}</p>
                <h3 className="mt-4 text-xl font-semibold">{t}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{d}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-site">
          <div className="relative overflow-hidden rounded-3xl bg-primary p-8 text-primary-foreground sm:p-12 lg:flex lg:items-center lg:justify-between lg:p-16">
            <div className="hero-grid absolute inset-0 opacity-20" />
            <div className="relative max-w-2xl">
              <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">Ready to build what your business needs next?</h2>
              <p className="mt-4 text-pretty leading-relaxed text-primary-foreground/75">Bring us the complexity. We will help you turn it into a clear, scalable system.</p>
            </div>
            <Button variant="secondary" size="lg" className="relative mt-8 lg:mt-0" render={<Link href="/contact" />}>
              Start Your Project <ArrowRight data-icon="inline-end" />
            </Button>
          </div>
        </div>
      </section>
    </PageTransition>
  )
}
