import type { Metadata } from "next"
import { CalendarDays, CheckCircle, Clock, MessageSquare, Sparkles } from "lucide-react"
import { PageTransition } from "@/components/animation/page-transition"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Book a Demo",
  description: "Schedule a personalized demo of the Wolfitpark platform. See our AI agents, automation, and business tools in action.",
  alternates: { canonical: "/book-demo" },
}

const timeSlots = ["09:00", "10:00", "11:00", "13:00", "14:00", "15:00", "16:00"]

const expectItems = [
  { icon: Clock, title: "30-Minute Call", description: "Focused session tailored to your business needs and goals." },
  { icon: Sparkles, title: "Tailored Demo", description: "See the platform configured for your specific use case." },
  { icon: MessageSquare, title: "Q&A Session", description: "Get answers to your technical and business questions." },
  { icon: CheckCircle, title: "Next Steps", description: "Clear recommendations and a roadmap for moving forward." },
]

export default function BookDemoPage() {
  return (
    <PageTransition>
      <section className="relative overflow-hidden border-b border-border bg-muted/30">
        <div className="hero-grid absolute inset-0 opacity-45" />
        <div className="container-site relative py-20 sm:py-28">
          <Badge variant="outline" className="mb-4">Demo</Badge>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-6xl lg:text-7xl">Book a Demo</h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">See Wolfitpark in Action. Schedule a personalized walkthrough with our team.</p>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-site">
          <div className="grid gap-12 lg:grid-cols-5">
            <div className="lg:col-span-3">
              <div className="rounded-2xl border border-border bg-card p-6 sm:p-8">
                <div className="flex items-center gap-3">
                  <CalendarDays className="size-5 text-primary" />
                  <h2 className="text-xl font-semibold">Select a Date & Time</h2>
                </div>
                <div className="mt-6">
                  <div className="mb-4 flex items-center justify-between">
                    <button className="rounded-lg border border-border px-3 py-1.5 text-sm hover:bg-muted">&larr;</button>
                    <span className="text-sm font-medium">July 2026</span>
                    <button className="rounded-lg border border-border px-3 py-1.5 text-sm hover:bg-muted">&rarr;</button>
                  </div>
                  <div className="grid grid-cols-7 gap-1 text-center text-xs font-medium text-muted-foreground">
                    {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => <div key={d} className="py-1">{d}</div>)}
                  </div>
                  <div className="mt-1 grid grid-cols-7 gap-1 text-center text-sm">
                    {Array.from({ length: 31 }, (_, i) => {
                      const day = i + 8
                      return (
                        <button
                          key={day}
                          className={`rounded-lg py-2 transition-colors ${
                            day === 15
                              ? "bg-primary text-primary-foreground"
                              : day <= 31
                                ? "hover:bg-muted"
                                : "text-muted-foreground/30"
                          }`}
                        >
                          {day}
                        </button>
                      )
                    })}
                  </div>
                </div>
                <div className="mt-6">
                  <p className="mb-3 text-sm font-medium">Available Time Slots</p>
                  <div className="grid grid-cols-4 gap-2">
                    {timeSlots.map((time) => (
                      <button
                        key={time}
                        className={`rounded-lg border px-3 py-2 text-sm transition-colors ${
                          time === "14:00"
                            ? "border-primary bg-primary/10 text-primary"
                            : "border-border hover:border-primary/40 hover:bg-muted"
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2">
              <div className="rounded-2xl border border-border bg-card p-6 sm:p-8">
                <h2 className="text-xl font-semibold">Your Details</h2>
                <form className="mt-6 space-y-4">
                  <div>
                    <label htmlFor="name" className="mb-1.5 block text-sm font-medium">Full Name</label>
                    <input id="name" type="text" className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring/20" placeholder="Jane Doe" />
                  </div>
                  <div>
                    <label htmlFor="email" className="mb-1.5 block text-sm font-medium">Email</label>
                    <input id="email" type="email" className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring/20" placeholder="jane@company.com" />
                  </div>
                  <div>
                    <label htmlFor="company" className="mb-1.5 block text-sm font-medium">Company</label>
                    <input id="company" type="text" className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring/20" placeholder="Company Inc." />
                  </div>
                  <div>
                    <label htmlFor="phone" className="mb-1.5 block text-sm font-medium">Phone</label>
                    <input id="phone" type="tel" className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring/20" placeholder="+1 (555) 000-0000" />
                  </div>
                  <div>
                    <label htmlFor="interest" className="mb-1.5 block text-sm font-medium">Service Interest</label>
                    <select id="interest" className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring/20">
                      <option value="">Select a service</option>
                      <option value="ai-agents">AI Agents</option>
                      <option value="automation">Workflow Automation</option>
                      <option value="development">Custom Development</option>
                      <option value="cloud">Cloud Infrastructure</option>
                      <option value="incorporation">Business Incorporation</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="message" className="mb-1.5 block text-sm font-medium">Message (Optional)</label>
                    <textarea id="message" rows={3} className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring/20 resize-y" placeholder="Tell us about your project or questions." />
                  </div>
                  <Button className="w-full" size="lg">Confirm Booking</Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad border-y border-border bg-muted/40">
        <div className="container-site">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">What to Expect</h2>
            <p className="mt-4 text-muted-foreground">Every demo is tailored to your specific needs and goals.</p>
          </div>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {expectItems.map((item) => {
              const Icon = item.icon
              return (
                <div key={item.title} className="rounded-2xl border border-border bg-card p-6 text-center transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5">
                  <div className="mx-auto flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="size-6" />
                  </div>
                  <h3 className="mt-6 text-lg font-semibold">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </PageTransition>
  )
}
