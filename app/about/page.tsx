import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, BrainCircuit, HeartHandshake, Quote, Star, Target } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CtaSection, PageHero, SectionHeading } from "@/components/page-sections"
import { FadeIn, FadeInStagger } from "@/components/animation/fade-in"
import { enterpriseStats, teamMembers } from "@/lib/site-data"

export const metadata: Metadata = { title: "About", description: "Meet Wolfitpark, a product and transformation company building smarter business systems from Bryant, Arkansas.", alternates: { canonical: "/about" } }

const pillars = [
  { icon: BrainCircuit, title: "Innovation-Led Engineering", description: "We combine emerging AI capabilities with disciplined software engineering to build systems that adapt as your business evolves.", color: "text-purple" },
  { icon: Target, title: "Outcome-Obsessed Delivery", description: "Every feature is measured by the operational value it creates. We define clear success criteria upfront and track against them relentlessly.", color: "text-cyan" },
  { icon: HeartHandshake, title: "True Partnership Model", description: "We embed with your team, share ownership of results, and leave your organization stronger than we found it. No black boxes or hidden dependencies.", color: "text-emerald" },
]

const testimonialsData = [
  { quote: "Wolfitpark connected systems we thought would always remain fragmented. We now operate from one reliable view of the business.", name: "Elena Brooks", role: "COO, Meridian Group", rating: 5 },
  { quote: "They combined product thinking with serious engineering discipline. Every decision was tied to a real operational outcome.", name: "Marcus Chen", role: "Founder, Northstar Labs", rating: 5 },
  { quote: "The team listened deeply, moved quickly, and left us with a platform our people genuinely enjoy using.", name: "Priya Raman", role: "VP Operations, Atlas Health", rating: 5 },
]

export default function AboutPage() {
  return <>
    <PageHero eyebrow="About Wolfitpark" title="Building the Future of Enterprise AI" description="We are a senior team of engineers, designers, and strategists dedicated to transforming how ambitious organizations operate through intelligent software and automation." actions={<Button size="lg" render={<Link href="/contact" />}>Start a conversation<ArrowRight data-icon="inline-end" /></Button>} />

    <section className="section-pad"><div className="container-site"><FadeInStagger><SectionHeading align="center" eyebrow="Our Mission" title="Three pillars that guide everything we build." /><div className="mt-12 grid gap-5 md:grid-cols-3">{pillars.map(({ icon: Icon, title, description }) => <FadeIn key={title}><Card className="h-full p-6"><CardContent className="p-0"><div className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary"><Icon className="size-6" /></div><h3 className="mt-6 text-xl font-semibold">{title}</h3><p className="mt-3 text-sm leading-relaxed text-muted-foreground">{description}</p></CardContent></Card></FadeIn>)}</div></FadeInStagger></div></section>

    <section className="section-pad bg-muted/30 border-y border-border"><div className="container-site"><FadeInStagger><SectionHeading align="center" eyebrow="Our Team" title="Senior talent, distributed by design." description="Engineers, designers, and strategists who have shipped products used by millions." /><div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{teamMembers.map((m, i) => <FadeIn key={m.name} delay={i * 0.05}><Card className="p-6"><CardContent className="p-0"><div className="flex size-16 items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-primary/5 text-lg font-semibold text-primary ring-1 ring-primary/20">{m.name.split(" ").map(n => n[0]).join("")}</div><h3 className="mt-5 text-lg font-semibold">{m.name}</h3><p className="text-xs font-medium text-primary">{m.role}</p><p className="mt-3 text-sm leading-relaxed text-muted-foreground">{m.bio}</p></CardContent></Card></FadeIn>)}</div></FadeInStagger></div></section>

    <section className="border-y border-border bg-card"><div className="container-site grid grid-cols-2 gap-px md:grid-cols-4">{enterpriseStats.slice(0, 4).map(([v, l]) => <div key={l} className="p-7 text-center"><p className="text-3xl font-semibold text-primary">{v}</p><p className="mt-2 text-xs text-muted-foreground">{l}</p></div>)}</div></section>

    <section className="section-pad"><div className="container-site"><FadeInStagger><SectionHeading align="center" eyebrow="Client Perspective" title="Trusted by the teams that power industries." /><div className="mt-12 grid gap-5 lg:grid-cols-3">{testimonialsData.map((t, i) => <FadeIn key={t.name} delay={i * 0.08}><figure className="rounded-2xl border border-border bg-card p-7"><Quote className="size-7 text-primary" /><div className="mt-6 flex gap-1">{Array.from({ length: t.rating }).map((_, j) => <Star key={j} className="size-4 fill-primary text-primary" />)}</div><blockquote className="mt-5 text-base leading-relaxed">&ldquo;{t.quote}&rdquo;</blockquote><figcaption className="mt-7 border-t border-border pt-5"><p className="font-semibold">{t.name}</p><p className="mt-1 text-sm text-muted-foreground">{t.role}</p></figcaption></figure></FadeIn>)}</div></FadeInStagger></div></section>

    <CtaSection title="Ready to build something extraordinary?" description="Bring us your most ambitious challenge. We will help you turn it into a scalable system." />
  </>
}
