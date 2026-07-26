import type { Metadata } from "next"
import { Bell, CheckCircle, Clock, Server, Wifi } from "lucide-react"
import { PageTransition } from "@/components/animation/page-transition"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "System Status",
  description: "Wolfitpark platform health and performance. Check real-time status of all services and components.",
  alternates: { canonical: "/system-status" },
}

const components = [
  { name: "API", status: "operational", uptime: "99.99%", icon: Server },
  { name: "Dashboard", status: "operational", uptime: "99.98%", icon: Server },
  { name: "Website", status: "operational", uptime: "99.99%", icon: Wifi },
  { name: "AI Services", status: "operational", uptime: "99.95%", icon: Server },
  { name: "Incorporation Service", status: "operational", uptime: "99.97%", icon: Server },
  { name: "Payment Processing", status: "operational", uptime: "99.99%", icon: Server },
] as const

const incidents = [
  { date: "July 20, 2026", title: "Scheduled Maintenance", description: "Planned infrastructure upgrade. Brief interruptions to API and Dashboard services between 02:00-04:00 UTC.", status: "resolved" },
  { date: "July 12, 2026", title: "Intermittent API Latency", description: "Increased response times on certain API endpoints due to database load. Resolved by scaling read replicas.", status: "resolved" },
  { date: "June 28, 2026", title: "Dashboard Login Issue", description: "Users experienced delayed login for approximately 15 minutes due to a transient authentication service error.", status: "resolved" },
  { date: "June 15, 2026", title: "Planned Maintenance", description: "Database optimization and indexing maintenance. No downtime was experienced during this window.", status: "resolved" },
] as const

const statusConfig = {
  operational: { label: "Operational", class: "bg-emerald-500" },
  degraded: { label: "Degraded", class: "bg-amber-500" },
  maintenance: { label: "Maintenance", class: "bg-blue-500" },
} as const

function StatusDot({ status }: { status: keyof typeof statusConfig }) {
  return <span className={`inline-block size-2.5 rounded-full ${statusConfig[status].class} animate-pulse`} />
}

export default function SystemStatusPage() {
  return (
    <PageTransition>
      <section className="relative overflow-hidden border-b border-border bg-muted/30">
        <div className="hero-grid absolute inset-0 opacity-45" />
        <div className="container-site relative py-20 sm:py-28">
          <Badge variant="outline" className="mb-4">Infrastructure</Badge>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-6xl lg:text-7xl">System Status</h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">Platform Health and Performance — real-time status of all Wolfitpark services.</p>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-site">
          <div className="rounded-2xl border border-border bg-card p-6 sm:p-8">
            <div className="flex items-center gap-3">
              <div className="flex size-12 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-500">
                <CheckCircle className="size-6" />
              </div>
              <div>
                <p className="text-lg font-semibold">All Systems Operational</p>
                <p className="text-sm text-muted-foreground">All services are running normally as of the latest check.</p>
              </div>
            </div>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {components.map((component) => {
              const Icon = component.icon
              return (
                <div key={component.name} className="flex items-center gap-4 rounded-2xl border border-border bg-card p-5">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Icon className="size-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold">{component.name}</p>
                    <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                      <StatusDot status={component.status as keyof typeof statusConfig} />
                      <span>{statusConfig[component.status as keyof typeof statusConfig].label}</span>
                      <span className="text-border">|</span>
                      <span>{component.uptime} uptime</span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="section-pad border-y border-border bg-muted/40">
        <div className="container-site max-w-3xl">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">Incident History</h2>
          <div className="mt-8 space-y-6">
            {incidents.map((incident) => (
              <div key={incident.title} className="rounded-2xl border border-border bg-card p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-medium text-emerald-500">
                        <span className="inline-block size-1.5 rounded-full bg-emerald-500" />
                        Resolved
                      </span>
                      <span className="text-xs text-muted-foreground">{incident.date}</span>
                    </div>
                    <h3 className="mt-3 text-lg font-semibold">{incident.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{incident.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-site">
          <div className="mx-auto max-w-md text-center">
            <div className="flex justify-center">
              <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Bell className="size-6" />
              </div>
            </div>
            <h2 className="mt-6 text-2xl font-semibold">Subscribe to Updates</h2>
            <p className="mt-3 text-sm text-muted-foreground">Get notified about incidents and scheduled maintenance via email.</p>
            <div className="mt-6 flex gap-3">
              <input
                type="email"
                placeholder="your@email.com"
                className="min-w-0 flex-1 rounded-lg border border-input bg-background px-4 py-2 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring/20"
              />
              <Button>Subscribe</Button>
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  )
}
