import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, Mail, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { CtaSection, PageHero, SectionHeading } from "@/components/page-sections"
import { FadeIn, FadeInStagger } from "@/components/animation/fade-in"
import { faqs } from "@/lib/site-data"

export const metadata: Metadata = { title: "Frequently Asked Questions", description: "Answers about Wolfitpark software projects, AI automation, security, ownership, timelines, and support.", alternates: { canonical: "/faq" } }

const categories = [
  { id: "general", label: "General", questions: [0, 1, 2] },
  { id: "services", label: "Services", questions: [3, 4, 5, 6] },
  { id: "pricing", label: "Pricing", questions: [7, 8] },
  { id: "incorporation", label: "Incorporation", questions: [9, 10, 11] },
  { id: "technical", label: "Technical", questions: [12, 13, 14, 15, 16, 17, 18, 19] },
]

export default function FAQPage() {
  return <>
    <PageHero eyebrow="Frequently Asked Questions" title="Good questions lead to better systems." description="Straight answers about how we scope, build, secure, launch, and support software and transformation work." />

    <section className="section-pad"><div className="container-site"><FadeInStagger><div className="grid gap-16 lg:grid-cols-[.65fr_1.35fr]"><div><SectionHeading eyebrow="Categories" title="Find your answer quickly." /><div className="mt-6 flex flex-wrap gap-2">{categories.map(c => <Link key={c.id} href={`#${c.id}`} className="rounded-full border border-border bg-card px-4 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground">{c.label}</Link>)}</div>            <div className="mt-8 rounded-2xl border border-border bg-card p-6"><Sparkles className="size-5 text-primary" /><h3 className="mt-5 font-semibold">Still deciding?</h3><p className="mt-2 text-sm leading-relaxed text-muted-foreground">Send us the question behind the question. We will point you in the right direction.</p><Button className="mt-5" variant="outline" render={<Link href="/contact" />}>Ask Wolfitpark<ArrowRight data-icon="inline-end" /></Button></div></div><div>{categories.map((cat, ci) => <div key={cat.id} id={cat.id}><FadeIn delay={ci * 0.05}><h2 className="mb-6 flex items-center gap-2 text-2xl font-semibold"><Badge>{cat.label}</Badge></h2><Accordion>{cat.questions.map((qi, i) => <AccordionItem key={qi} value={`${cat.id}-${i}`}><AccordionTrigger className="text-left text-base">{faqs[qi][0]}</AccordionTrigger><AccordionContent className="text-sm leading-relaxed text-muted-foreground">{faqs[qi][1]}</AccordionContent></AccordionItem>)}</Accordion></FadeIn></div>)}</div></div></FadeInStagger></div></section>

    <CtaSection title="Have a question we did not answer?" description="Reach out directly. We respond to every inquiry within one business day." primary="Contact us" href="/contact" />
  </>
}
