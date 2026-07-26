import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, Building2, HeartPulse, Rocket, ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { CtaSection, Eyebrow, PageHero, SectionHeading } from "@/components/page-sections"
import { FadeIn, FadeInStagger } from "@/components/animation/fade-in"
import { solutions } from "@/lib/site-data"

export const metadata: Metadata = { title: "Industry Solutions", description: "Digital transformation and business software solutions for startups, healthcare, finance, retail, manufacturing, government, and more.", alternates: { canonical: "/solutions" } }

const outcomes = ["Connected operational data", "Fewer manual handoffs", "Clearer strategic decisions", "Secure, scalable delivery"]

const highlights = [
  { icon: Building2, title: "Enterprise", subtitle: "Scale without friction", description: "Large organizations face unique challenges around legacy systems, governance, compliance, and change management. We help enterprise teams modernize incrementally, reduce technical debt, and build platforms that serve hundreds of thousands of users without compromising security or reliability.", color: "text-purple", items: ["Legacy modernization roadmaps", "Enterprise-grade security & compliance", "Multi-team delivery orchestration", "Custom SLA & governance frameworks"] },
  { icon: Rocket, title: "Startups", subtitle: "Move fast with solid foundations", description: "Speed is your advantage, but premature complexity slows you down. We help startups launch production-ready platforms with lean architecture, rapid prototyping, and scalable infrastructure that grows with your user base and funding stage.", color: "text-cyan", items: ["Rapid MVP development", "Scalable cloud architecture", "Product-market fit validation", "Fundraising-ready demos & metrics"] },
  { icon: HeartPulse, title: "Healthcare", subtitle: "HIPAA-compliant by default", description: "Healthcare organizations need systems that protect patient data, integrate with existing clinical workflows, and improve operational efficiency. We build HIPAA-compliant platforms with privacy-first architecture, FHIR integration, and interfaces clinicians actually want to use.", color: "text-emerald", items: ["HIPAA-compliant infrastructure", "FHIR & HL7 integration", "Clinical workflow optimization", "Patient portal & telehealth platforms"] },
]

export default function SolutionsPage() {
  return <>
    <PageHero eyebrow="Solutions" title="Built for Your Industry" description="We combine deep industry understanding with a fresh view of your workflows, customers, constraints, and opportunity." actions={<Button size="lg" render={<Link href="/consultation" />}>Discuss your industry<ArrowRight data-icon="inline-end" /></Button>} />

    <section className="section-pad"><div className="container-site"><FadeInStagger><SectionHeading eyebrow="All Industries" title="Context matters. Your system should prove it." /><div className="mt-12 flex flex-col gap-4">{solutions.map(([title, description, Icon], i) => <FadeIn key={title} className="grid gap-6 rounded-2xl border border-border bg-card p-6 transition-colors hover:border-primary/40 md:grid-cols-[.7fr_1.3fr] md:p-8"><div className="flex items-start gap-4"><span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary"><Icon className="size-5" /></span><div><span className="text-xs font-semibold text-primary">{String(i + 1).padStart(2, "0")}</span><h2 className="mt-2 text-2xl font-semibold">{title}</h2></div></div><div><p className="leading-relaxed text-muted-foreground">{description}</p><ul className="mt-5 grid gap-2 sm:grid-cols-2">{outcomes.map(item => <li key={item} className="flex items-center gap-2 text-sm"><ShieldCheck className="size-4 text-primary" />{item}</li>)}</ul></div></FadeIn>)}</div></FadeInStagger></div></section>

    <section className="section-pad bg-muted/30 border-y border-border"><div className="container-site"><SectionHeading align="center" eyebrow="Featured Solutions" title="Deeper capability for the industries we know best." /><div className="mt-12 grid gap-6 lg:grid-cols-3">{highlights.map((h, i) => <Card key={h.title} className="relative overflow-hidden p-6 lg:p-8"><div className={`absolute right-0 top-0 size-32 translate-x-8 -translate-y-8 rounded-full bg-primary/5 blur-3xl`} /><CardContent className="p-0"><div className="flex size-12 items-center justify-center rounded-xl bg-primary/10"><h.icon className={`size-6 ${h.color}`} /></div><h3 className="mt-6 text-xl font-semibold">{h.title}</h3><p className="mt-1 text-sm text-primary/80">{h.subtitle}</p><p className="mt-4 text-sm leading-relaxed text-muted-foreground">{h.description}</p><ul className="mt-6 flex flex-col gap-2.5 border-t border-border pt-6">{h.items.map(item => <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground"><span className="mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary"><ShieldCheck className="size-3" /></span>{item}</li>)}</ul></CardContent></Card>)}</div></div></section>

    <CtaSection title="Your industry has rules. Your future does not need limits." description="Let us design a modern operating model around your real-world requirements." />
  </>
}
