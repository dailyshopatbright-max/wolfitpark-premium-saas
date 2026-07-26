import type { Metadata } from "next"
import { ArrowRight, BarChart3, Code2, Gift, Handshake, Layers, MessageSquare, Users } from "lucide-react"
import { PageTransition } from "@/components/animation/page-transition"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { partners } from "@/lib/site-data"

export const metadata: Metadata = {
  title: "Partners",
  description: "Partner with Wolfitpark. Explore technology, solution, referral, and integration partnership opportunities.",
  alternates: { canonical: "/partners" },
}

const partnershipTypes = [
  {
    icon: Code2,
    title: "Technology Partner",
    description: "Integrate your technology with the Wolfitpark platform to deliver combined solutions to joint customers.",
    benefits: ["Co-marketing opportunities", "Technical integration support", "Joint solution development", "Access to partner portal"],
  },
  {
    icon: Handshake,
    title: "Solution Partner",
    description: "Deliver Wolfitpark-powered solutions to your clients with dedicated support, training, and resources.",
    benefits: ["Revenue sharing model", "Sales enablement", "Certification program", "Dedicated partner manager"],
  },
  {
    icon: Gift,
    title: "Referral Partner",
    description: "Refer clients to Wolfitpark and earn competitive commissions on every successful engagement.",
    benefits: ["Attractive commission structure", "Transparent tracking", "Quick payouts", "No sales quotas"],
  },
  {
    icon: Layers,
    title: "Integration Partner",
    description: "Build and maintain certified integrations that extend the Wolfitpark ecosystem for mutual customers.",
    benefits: ["API access & sandbox", "Integration certification", "Documentation support", "Marketplace listing"],
  },
]

export default function PartnersPage() {
  return (
    <PageTransition>
      <section className="relative overflow-hidden border-b border-border bg-muted/30">
        <div className="hero-grid absolute inset-0 opacity-45" />
        <div className="container-site relative py-20 sm:py-28">
          <Badge variant="outline" className="mb-4">Partners</Badge>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-6xl lg:text-7xl">Partner With Us</h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">Grow Together. Join a growing ecosystem of technology, solution, and integration partners building the future of business automation.</p>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-site">
          <div className="grid gap-6 lg:grid-cols-2">
            {partnershipTypes.map((type) => {
              const Icon = type.icon
              return (
                <div key={type.title} className="rounded-2xl border border-border bg-card p-6 sm:p-8 transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5">
                  <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="size-6" />
                  </div>
                  <h3 className="mt-6 text-xl font-semibold">{type.title}</h3>
                  <p className="mt-3 leading-relaxed text-muted-foreground">{type.description}</p>
                  <ul className="mt-6 space-y-2.5">
                    {type.benefits.map((benefit) => (
                      <li key={benefit} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                          <ArrowRight className="size-3" />
                        </span>
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="section-pad border-y border-border bg-muted/40">
        <div className="container-site">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Trusted By Industry Leaders</h2>
            <p className="mt-4 text-muted-foreground">We partner with the best technology companies in the world.</p>
          </div>
          <div className="mt-12 flex flex-wrap justify-center gap-6">
            {partners.map((name) => (
              <div key={name} className="flex h-16 w-40 items-center justify-center rounded-xl border border-border bg-card px-6 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground">
                {name}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-site max-w-2xl">
          <div className="mx-auto max-w-xl text-center">
            <div className="flex justify-center">
              <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <MessageSquare className="size-6" />
              </div>
            </div>
            <h2 className="mt-6 text-3xl font-semibold tracking-tight">Become a Partner</h2>
            <p className="mt-4 text-muted-foreground">Complete the form below and our partnerships team will reach out within 2 business days.</p>
          </div>
          <form className="mt-10 space-y-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="mb-1.5 block text-sm font-medium">Full Name</label>
                <input id="name" type="text" className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring/20" placeholder="John Smith" />
              </div>
              <div>
                <label htmlFor="company" className="mb-1.5 block text-sm font-medium">Company</label>
                <input id="company" type="text" className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring/20" placeholder="Acme Inc." />
              </div>
            </div>
            <div>
              <label htmlFor="email" className="mb-1.5 block text-sm font-medium">Email</label>
              <input id="email" type="email" className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring/20" placeholder="john@acme.com" />
            </div>
            <div>
              <label htmlFor="partner-type" className="mb-1.5 block text-sm font-medium">Partnership Type</label>
              <select id="partner-type" className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring/20">
                <option value="">Select a partnership type</option>
                <option value="technology">Technology Partner</option>
                <option value="solution">Solution Partner</option>
                <option value="referral">Referral Partner</option>
                <option value="integration">Integration Partner</option>
              </select>
            </div>
            <div>
              <label htmlFor="message" className="mb-1.5 block text-sm font-medium">Message</label>
              <textarea id="message" rows={4} className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring/20 resize-y" placeholder="Tell us about your organization and why you're interested in partnering." />
            </div>
            <Button className="w-full" size="lg">Submit Application</Button>
          </form>
        </div>
      </section>
    </PageTransition>
  )
}
