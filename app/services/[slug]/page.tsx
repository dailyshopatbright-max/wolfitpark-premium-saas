import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowRight, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { PageTransition } from "@/components/animation/page-transition"
import { servicePackages, iconMap } from "@/lib/site-data"

export function generateStaticParams() {
  return servicePackages.map((pkg) => ({ slug: pkg.id }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const pkg = servicePackages.find((p) => p.id === slug)
  if (!pkg) return { title: "Service Not Found" }
  return {
    title: pkg.title,
    description: pkg.description,
    alternates: { canonical: `/services/${slug}` },
  }
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const pkg = servicePackages.find((p) => p.id === slug)
  if (!pkg) notFound()

  const Icon = iconMap[pkg.icon as keyof typeof iconMap] || (() => null)

  return (
    <PageTransition>
      <section className="relative overflow-hidden border-b border-border bg-gradient-to-b from-[#020617] via-[#0B1120] to-background">
        <div className="hero-grid absolute inset-0 opacity-30" />
        <div className="container-site relative py-20 sm:py-28">
          <div className="max-w-4xl">
            <Badge variant="outline" className="mb-4 rounded-full border-primary/30 bg-primary/5 px-4 py-1.5 text-primary">
              <span className="mr-1.5 inline-block size-2 rounded-full bg-primary animate-pulse-slow" />
              {pkg.subtitle}
            </Badge>
            <div className="flex items-center gap-4">
              <div className="flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <Icon className="size-7" />
              </div>
              <div>
                <h1 className="text-4xl font-semibold tracking-[-.04em] sm:text-5xl lg:text-6xl">{pkg.title}</h1>
                <Badge variant="secondary" className="mt-2 rounded-full">{pkg.timeline}</Badge>
              </div>
            </div>
            <p className="mt-8 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
              {pkg.description}
            </p>
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-site grid gap-12 lg:grid-cols-[1fr_1.5fr]">
          <div>
            <h2 className="text-2xl font-semibold">Technology Stack</h2>
            <div className="mt-6 flex flex-wrap gap-2">
              {pkg.stack.map((tech) => (
                <Badge key={tech} variant="outline" className="rounded-full px-3 py-1.5 text-sm">{tech}</Badge>
              ))}
            </div>
            <div className="mt-10">
              <h2 className="text-2xl font-semibold">Timeline</h2>
              <p className="mt-3 text-lg text-muted-foreground">{pkg.timeline}</p>
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-semibold">What&apos;s Included</h2>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {pkg.features.map((feature) => (
                <li key={feature} className="flex items-start gap-3 rounded-xl border border-border bg-card p-4">
                  <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-primary" />
                  <span className="text-sm">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section-pad bg-foreground text-background">
        <div className="container-site">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-semibold">Why Choose This Service</h2>
            <p className="mt-4 text-background/60">
              Every engagement is backed by senior practitioners, proven methodologies, and a commitment to measurable outcomes.
              We don&apos;t just deliver — we partner with you for lasting success.
            </p>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {[
              ["Senior Teams", "Experienced architects, engineers, and product managers assigned to your project."],
              ["Proven Process", "Iterative delivery with regular demos, feedback loops, and transparent progress."],
              ["Ongoing Support", "Post-launch maintenance, monitoring, and continuous improvement included."],
            ].map(([title, desc]) => (
              <div key={title} className="rounded-xl border border-background/15 bg-background/5 p-5">
                <h3 className="font-semibold text-background">{title}</h3>
                <p className="mt-2 text-sm text-background/60">{desc}</p>
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
              <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">Ready to get started?</h2>
              <p className="mt-4 text-pretty leading-relaxed text-primary-foreground/75">Tell us about your project and we&apos;ll recommend the best approach.</p>
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
