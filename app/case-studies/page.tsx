"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowRight, Quote } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CtaSection, PageHero, SectionHeading } from "@/components/page-sections"
import { FadeIn, FadeInStagger } from "@/components/animation/fade-in"
import { projects } from "@/lib/site-data"

const categories = ["All", ...new Set(projects.map(p => p.category))]

export default function CaseStudiesPage() {
  const [active, setActive] = useState("All")
  const filtered = active === "All" ? projects : projects.filter(p => p.category === active)

  return <>
    <PageHero eyebrow="Case Studies" title="Real Results for Real Businesses" description="Every platform we ship starts with a clear operational goal. Here is what happened when we partnered with ambitious teams to reach theirs." actions={<Button size="lg" render={<Link href="/consultation" />}>Start your case study<ArrowRight data-icon="inline-end" /></Button>} />

    <section className="section-pad"><div className="container-site"><SectionHeading eyebrow="Selected Work" title="Transformation, measured and felt." /><div className="mt-10 flex flex-wrap gap-2">{categories.map(c => <button key={c} onClick={() => setActive(c)} className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-all ${active === c ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground"}`}>{c}</button>)}</div><div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3"><FadeInStagger>{filtered.map((p, i) => <FadeIn key={p.slug} delay={i * 0.06}><Card className="flex h-full flex-col p-6"><CardContent className="flex flex-1 flex-col p-0"><Badge className="w-fit">{p.category}</Badge><h3 className="mt-4 text-xl font-semibold">{p.title}</h3><p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{p.summary}</p><div className="mt-5 flex flex-wrap gap-1.5">{p.tech.map(t => <Badge key={t} variant="secondary">{t}</Badge>)}</div><div className="mt-6 rounded-xl bg-primary/5 p-4"><p className="text-lg font-semibold text-primary">{p.result}</p></div><figure className="mt-6 border-t border-border pt-5"><Quote className="mb-2 size-4 text-primary/60" /><blockquote className="text-sm leading-relaxed text-muted-foreground">&ldquo;{p.quote}&rdquo;</blockquote></figure></CardContent></Card></FadeIn>)}</FadeInStagger></div>{filtered.length === 0 && <div className="rounded-2xl border border-dashed border-border p-12 text-center"><p className="font-semibold">No case studies found</p><p className="mt-2 text-sm text-muted-foreground">Try selecting a different category.</p></div>}</div></section>

    <CtaSection title="Your strongest case study could be next." description="Tell us what is slowing your organization down and what better could look like." />
  </>
}
