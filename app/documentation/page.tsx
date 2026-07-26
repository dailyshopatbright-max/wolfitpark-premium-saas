import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, BookOpen, Bot, CloudCog, Cpu, Grid3X3, PlugZap, Search } from "lucide-react"
import { PageTransition } from "@/components/animation/page-transition"
import { Badge } from "@/components/ui/badge"

export const metadata: Metadata = {
  title: "Documentation",
  description: "Wolfitpark documentation — get started with AI agents, automation, API integration, cloud infrastructure, and incorporation.",
  alternates: { canonical: "/documentation" },
}

const categories = [
  { icon: BookOpen, title: "Getting Started", description: "Quick start guides, platform overview, and foundational concepts to begin building.", count: "12 articles" },
  { icon: Bot, title: "AI Agents", description: "Deploy, configure, and manage AI agents for automation and decision support.", count: "18 articles" },
  { icon: Cpu, title: "Automation", description: "Build and orchestrate automated workflows across your business systems.", count: "15 articles" },
  { icon: PlugZap, title: "API Integration", description: "Connect your tools and data with Wolfitpark APIs and webhooks.", count: "22 articles" },
  { icon: CloudCog, title: "Cloud Infrastructure", description: "Deploy and manage cloud resources with automated governance and monitoring.", count: "14 articles" },
  { icon: Grid3X3, title: "Incorporation", description: "Everything about US business formation, state selection, and compliance.", count: "20 articles" },
] as const

const popular = [
  { title: "Quick Start: Your First AI Agent", read: "8 min" },
  { title: "Connecting External APIs", read: "10 min" },
  { title: "Workflow Triggers and Conditions", read: "6 min" },
  { title: "Authentication & API Keys", read: "5 min" },
  { title: "Data Encryption & Security Best Practices", read: "12 min" },
  { title: "Monitoring Workflow Performance", read: "7 min" },
] as const

export default function DocumentationPage() {
  return (
    <PageTransition>
      <section className="relative overflow-hidden border-b border-border bg-muted/30">
        <div className="hero-grid absolute inset-0 opacity-45" />
        <div className="container-site relative py-20 sm:py-28">
          <Badge variant="outline" className="mb-4">Docs</Badge>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-6xl lg:text-7xl">Documentation</h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">Build With Wolfitpark. Everything you need to integrate, automate, and scale.</p>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-site">
          <div className="mx-auto mb-12 flex max-w-xl items-center gap-3 rounded-2xl border border-border bg-card px-5 py-3">
            <Search className="size-5 shrink-0 text-muted-foreground" />
            <input
              type="search"
              placeholder="Search documentation..."
              className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((cat) => {
              const Icon = cat.icon
              return (
                <Link
                  key={cat.title}
                  href="#"
                  className="group rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5"
                >
                  <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="size-5" />
                  </div>
                  <h3 className="mt-6 text-lg font-semibold group-hover:text-primary">{cat.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{cat.description}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">{cat.count}</span>
                    <span className="inline-flex items-center gap-1 text-sm font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
                      Browse <ArrowRight className="size-4" />
                    </span>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      <section className="section-pad border-y border-border bg-muted/40">
        <div className="container-site">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">Popular Documentation</h2>
          <p className="mt-2 text-sm text-muted-foreground">Most visited guides and references.</p>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {popular.map((doc) => (
              <Link
                key={doc.title}
                href="#"
                className="flex items-center justify-between rounded-2xl border border-border bg-card p-5 transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5"
              >
                <span className="text-sm font-medium hover:text-primary">{doc.title}</span>
                <span className="shrink-0 text-xs text-muted-foreground">{doc.read}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </PageTransition>
  )
}
