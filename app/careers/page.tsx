import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, BookOpen, Globe2, Heart, Lightbulb, MapPin, ShieldCheck, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { CareerForm } from "@/components/forms"
import { CtaSection, IconCard, PageHero, SectionHeading } from "@/components/page-sections"
import { FadeIn, FadeInStagger } from "@/components/animation/fade-in"

export const metadata: Metadata = { title: "Careers", description: "Join Wolfitpark and help build intelligent software and better business systems with a senior distributed team.", alternates: { canonical: "/careers" } }

const benefits = [
  { icon: Globe2, title: "Remote-First Culture", description: "Work from wherever you do your best work. We are distributed across time zones and built around async collaboration." },
  { icon: ShieldCheck, title: "Competitive Equity", description: "Every full-time team member receives meaningful equity. We build together, and we share the upside." },
  { icon: Heart, title: "Health & Wellness", description: "Comprehensive medical, dental, and vision coverage. Your health comes first, always." },
  { icon: BookOpen, title: "Learning Budget", description: "$5,000 annual budget for conferences, courses, books, and any growth opportunity you choose." },
  { icon: Users, title: "Global Team", description: "Collaborate with senior practitioners across North America, Europe, and Asia. Diversity is our advantage." },
]

const openRoles = [
  { title: "Senior React Engineer", type: "Remote · Full-time", dept: "Engineering", description: "Build and maintain high-performance web applications using Next.js, React, and TypeScript. Own features from design through deployment." },
  { title: "AI Engineer", type: "Remote · Full-time", dept: "AI", description: "Design and deploy production AI systems, LLM integrations, and intelligent automation for enterprise clients." },
  { title: "UX Designer", type: "Remote · Full-time", dept: "Design", description: "Lead product design for complex enterprise platforms. Research, prototype, test, and refine until the experience feels simple." },
  { title: "Sales Director", type: "Remote · Full-time", dept: "Sales", description: "Drive enterprise sales engagements from discovery through close. Build relationships with senior technology buyers." },
  { title: "Cloud Solutions Architect", type: "Remote · Full-time", dept: "Engineering", description: "Design and oversee cloud infrastructure for multi-tenant SaaS platforms. Deep AWS, GCP, or Azure expertise required." },
  { title: "Product Manager", type: "Remote · Full-time", dept: "Product", description: "Define product strategy, prioritize roadmaps, and drive execution across engineering and design teams." },
  { title: "DevOps Engineer", type: "Remote · Full-time", dept: "Engineering", description: "Build and maintain CI/CD pipelines, infrastructure as code, and observability platforms for production systems." },
  { title: "Customer Success Manager", type: "Remote · Full-time", dept: "Success", description: "Ensure enterprise clients achieve their desired outcomes through onboarding, training, and ongoing partnership." },
]

export default function CareersPage() {
  return <>
    <PageHero eyebrow="Careers" title="Build the Future of Enterprise Software" description="Join a senior, kind, and exacting team building products and systems that make organizations work better. High standards. Low ego. Real ownership." actions={<Button size="lg" render={<Link href="#open-roles" />}>View open roles<ArrowRight data-icon="inline-end" /></Button>} />

    <section className="section-pad"><div className="container-site"><FadeInStagger><SectionHeading align="center" eyebrow="Why Join Us" title="Build your best work. Grow with the best people." /><div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">{benefits.map((b, i) => <FadeIn key={b.title} delay={i * 0.06} className="rounded-2xl border border-border bg-card p-6"><div className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary"><b.icon className="size-5" /></div><h3 className="mt-6 text-lg font-semibold">{b.title}</h3><p className="mt-3 text-sm leading-relaxed text-muted-foreground">{b.description}</p></FadeIn>)}</div></FadeInStagger></div></section>

    <section id="open-roles" className="section-pad bg-muted/30 border-y border-border"><div className="container-site"><SectionHeading eyebrow="Open Positions" title="Find your next hard problem." /><div className="mt-10 grid gap-12 lg:grid-cols-[.65fr_1.35fr]"><div className="flex flex-col gap-3">{openRoles.map((role, i) => <div key={role.title} className="rounded-xl border border-border bg-card p-5 transition-all hover:border-primary/40"><div className="flex items-center justify-between gap-4"><div><div className="flex items-center gap-2"><h3 className="font-semibold">{role.title}</h3><Badge variant="secondary">{role.dept}</Badge></div><p className="mt-1 text-xs text-muted-foreground">{role.type}</p></div><span className="text-xs font-semibold text-primary">{String(i + 1).padStart(2, "0")}</span></div></div>)}</div><div className="rounded-3xl border border-border bg-card p-6 sm:p-9"><h2 className="mb-8 text-2xl font-semibold">Apply to Wolfitpark</h2><CareerForm roles={openRoles.map(r => r.title)} /></div></div></div></section>

    <section className="section-pad"><div className="container-site"><SectionHeading align="center" eyebrow="Our Culture" title="How we work when no one is watching." description="We are remote by design, built around trust, and committed to doing our best work without the theater." /><div className="mt-12 grid gap-5 md:grid-cols-3"><Card className="p-6"><CardContent className="p-0"><Lightbulb className="size-6 text-primary" /><h3 className="mt-5 text-lg font-semibold">Async by Default</h3><p className="mt-3 text-sm leading-relaxed text-muted-foreground">We write things down, make decisions visible, and respect deep focus time. Meetings are the exception, not the default.</p></CardContent></Card><Card className="p-6"><CardContent className="p-0"><MapPin className="size-6 text-primary" /><h3 className="mt-5 text-lg font-semibold">Distributed & Connected</h3><p className="mt-3 text-sm leading-relaxed text-muted-foreground">Team members span 12 time zones. We invest in connection through retreats, pairing, and deliberate communication practices.</p></CardContent></Card><Card className="p-6"><CardContent className="p-0"><Heart className="size-6 text-primary" /><h3 className="mt-5 text-lg font-semibold">Sustainable Excellence</h3><p className="mt-3 text-sm leading-relaxed text-muted-foreground">We ship great work without burnout. Quality comes from consistent pace, not heroic sprints. We are building for the long term.</p></CardContent></Card></div></div></section>

    <section className="section-pad bg-foreground text-background"><div className="container-site text-center"><h2 className="text-balance text-3xl font-semibold sm:text-4xl">Don&apos;t see the right role?</h2><p className="mx-auto mt-4 max-w-lg text-background/60">We are always looking for exceptional engineers, designers, and thinkers. Send us your details and we will reach out when something fits.</p><Button variant="secondary" size="lg" className="mt-8" render={<Link href="/contact" />}>Get in touch<ArrowRight data-icon="inline-end" /></Button></div></section>
  </>
}
