import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, BookOpen, BookText, FileText, GraduationCap, Monitor, Search, Users } from "lucide-react"
import { PageTransition } from "@/components/animation/page-transition"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Resources",
  description: "Explore Wolfitpark resources — documentation, API reference, guides, whitepapers, webinars, and case studies.",
  alternates: { canonical: "/resources" },
}

const categories = [
  { icon: BookOpen, title: "Documentation", description: "Comprehensive guides and references for building with Wolfitpark.", count: "48 articles", href: "/documentation" },
  { icon: BookText, title: "API Reference", description: "Complete API documentation with code examples and interactive playground.", count: "200+ endpoints", href: "/api-documentation" },
  { icon: FileText, title: "Guides", description: "Step-by-step tutorials for common workflows and integrations.", count: "24 guides", href: "/documentation" },
  { icon: GraduationCap, title: "Whitepapers", description: "In-depth technical papers on architecture, security, and best practices.", count: "12 papers" },
  { icon: Monitor, title: "Webinars", description: "On-demand and live sessions covering platform features and industry topics.", count: "18 recordings" },
  { icon: Users, title: "Case Studies", description: "Real-world examples of how organizations use Wolfitpark to transform operations.", count: "9 studies" },
] as const

const featured = [
  { title: "Getting Started with Wolfitpark AI Agents", category: "Guide", read: "10 min", href: "/documentation" },
  { title: "API Authentication & Security Best Practices", category: "API", read: "8 min", href: "/api-documentation" },
  { title: "Enterprise Architecture Patterns for Automation", category: "Whitepaper", read: "20 min", href: "/documentation" },
  { title: "Integrating Wolf CRM with Your Existing Stack", category: "Guide", read: "12 min", href: "/documentation" },
] as const

export default function ResourcesPage() {
  return (
    <PageTransition>
      <section className="relative overflow-hidden border-b border-border bg-muted/30">
        <div className="hero-grid absolute inset-0 opacity-45" />
        <div className="container-site relative py-20 sm:py-28">
          <Badge variant="outline" className="mb-4">Resources</Badge>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-6xl lg:text-7xl">Resources</h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">Everything You Need to Succeed. Documentation, guides, and learning materials for the Wolfitpark platform.</p>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-site">
          <div className="mx-auto mb-12 flex max-w-xl items-center gap-3 rounded-2xl border border-border bg-card px-5 py-3">
            <Search className="size-5 shrink-0 text-muted-foreground" />
            <input
              type="search"
              placeholder="Search resources..."
              className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((cat) => {
              const Icon = cat.icon
              return (
                <div key={cat.title} className="group rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5">
                  <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="size-5" />
                  </div>
                  <h3 className="mt-6 text-lg font-semibold">{cat.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{cat.description}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">{cat.count}</span>
                    {cat.href ? (
                      <Link href={cat.href} className="inline-flex items-center gap-1 text-xs font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
                        Browse <ArrowRight className="size-3" />
                      </Link>
                    ) : null}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="section-pad border-y border-border bg-muted/40">
        <div className="container-site">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">Featured Resources</h2>
              <p className="mt-2 text-sm text-muted-foreground">Curated content to help you get the most out of Wolfitpark.</p>
            </div>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {featured.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className="group rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5"
              >
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="text-[10px]">{item.category}</Badge>
                  <span className="text-xs text-muted-foreground">{item.read}</span>
                </div>
                <h3 className="mt-3 text-lg font-semibold group-hover:text-primary">{item.title}</h3>
                <div className="mt-4">
                  <span className="inline-flex items-center gap-1 text-sm font-medium text-primary">
                    Read more <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-site">
          <div className="relative overflow-hidden rounded-3xl bg-primary p-8 text-primary-foreground sm:p-12 lg:flex lg:items-center lg:justify-between lg:p-16">
            <div className="hero-grid absolute inset-0 opacity-20" />
            <div className="relative max-w-2xl">
              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Stay in the loop</h2>
              <p className="mt-4 text-primary-foreground/75">Get the latest guides, product updates, and platform tips delivered to your inbox.</p>
            </div>
            <div className="relative mt-8 flex min-w-0 shrink-0 gap-3 lg:mt-0">
              <input type="email" placeholder="your@email.com" className="min-w-0 flex-1 rounded-lg bg-white/15 px-4 py-2.5 text-sm text-white outline-none placeholder:text-white/50 backdrop-blur-sm focus:ring-2 focus:ring-white/30" />
              <Button variant="secondary" className="shrink-0">Subscribe</Button>
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  )
}
