"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowRight, BookOpen, CreditCard, HeadphonesIcon, Mail, MessageSquare, Phone, Search, ShieldCheck, UserCheck, Wrench } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { CtaSection, Eyebrow, PageHero, SectionHeading } from "@/components/page-sections"
import { FadeIn, FadeInStagger } from "@/components/animation/fade-in"

const categories = [
  { icon: UserCheck, title: "Account", description: "Profile settings, login issues, team management, and account security.", color: "text-purple" },
  { icon: CreditCard, title: "Billing", description: "Invoices, payment methods, subscription changes, and refund requests.", color: "text-cyan" },
  { icon: Wrench, title: "Technical", description: "Platform errors, integrations, API access, and performance issues.", color: "text-emerald" },
  { icon: ShieldCheck, title: "Incorporation", description: "LLC formation status, state filings, EIN, ITIN, and compliance.", color: "text-purple" },
  { icon: HeadphonesIcon, title: "Sales", description: "Pre-sales questions, service scoping, pricing, and consultation booking.", color: "text-cyan" },
]

const contactOptions = [
  { icon: MessageSquare, title: "Live Chat", description: "Chat with our support team.", availability: "Available 24/7", action: "Start chat" },
  { icon: Mail, title: "Email Support", description: "Send us a detailed message.", availability: "Response within 4 hours", action: "support@wolfitpark.online", href: "mailto:support@wolfitpark.online" },
  { icon: Phone, title: "Phone Support", description: "Speak with a team member.", availability: "Mon–Fri, 8 AM–5 PM MT", action: "+1 (307) 555-0142", href: "tel:+13075550142" },
  { icon: BookOpen, title: "Knowledge Base", description: "Browse guides and documentation.", availability: "Self-service, always on", action: "Browse articles", href: "/documentation" },
]

const supportFaqs: [string, string][] = [
  ["How do I reset my account password?", "Visit the login page and click Forgot Password. Enter your email address and we will send a password reset link within minutes."],
  ["How do I update my billing information?", "Navigate to Settings > Billing in your dashboard. You can update your payment method, billing address, and view your invoice history."],
  ["What is your response time for support requests?", "Standard support responds within 24 hours. Priority support responds within 4 hours. Enterprise clients receive a dedicated support channel with 1-hour response SLAs."],
  ["Can I get a refund for unused services?", "Yes. Service fees are refundable within 14 days if the service has not been initiated. Once work has begun, fees are non-refundable per our refund policy."],
  ["How do I add team members to my account?", "Account owners can invite team members from Settings > Team. Enter their email address and assign a role. They will receive an invitation to join."],
  ["Do you offer onboarding support?", "Yes. Every plan includes structured onboarding. Enterprise plans include a dedicated implementation manager who guides your team through setup, configuration, and best practices."],
]

export default function SupportPage() {
  const [q, setQ] = useState("")

  return <>
    <PageHero eyebrow="Support Center" title="We're Here to Help" description="Fast, knowledgeable support from a team that understands your business. We are here when you need us." actions={<Button size="lg" render={<Link href="#contact-options" />}>Get help now<ArrowRight data-icon="inline-end" /></Button>} />

    <section className="section-pad"><div className="container-site"><SectionHeading align="center" eyebrow="Categories" title="What can we help you with?" /><div className="mx-auto mt-8 flex max-w-md items-center gap-3 rounded-xl border border-border bg-card px-4"><Search className="size-5 shrink-0 text-muted-foreground" /><label htmlFor="support-search" className="sr-only">Search support topics</label><input id="support-search" className="h-12 w-full border-0 bg-transparent text-sm outline-none placeholder:text-muted-foreground" placeholder="Search account, billing, technical..." value={q} onChange={e => setQ(e.target.value)} /></div><FadeInStagger><div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">{categories.filter(c => c.title.toLowerCase().includes(q.toLowerCase())).map((c, i) => <FadeIn key={c.title} delay={i * 0.06} className="group rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl"><c.icon className={`size-6 ${c.color}`} /><h3 className="mt-5 text-lg font-semibold">{c.title}</h3><p className="mt-3 text-sm leading-relaxed text-muted-foreground">{c.description}</p></FadeIn>)}</div></FadeInStagger></div></section>

    <section id="contact-options" className="section-pad bg-muted/30 border-y border-border"><div className="container-site"><SectionHeading align="center" eyebrow="Contact Options" title="Reach us the way that works for you." /><FadeInStagger><div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">{contactOptions.map((opt, i) => <FadeIn key={opt.title} delay={i * 0.06}><Card className="p-6 text-center"><CardContent className="p-0"><div className="mx-auto flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary"><opt.icon className="size-5" /></div><h3 className="mt-5 text-lg font-semibold">{opt.title}</h3><p className="mt-2 text-sm text-muted-foreground">{opt.description}</p><p className="mt-3 text-xs font-medium text-primary">{opt.availability}</p>{opt.href ? <Button variant="outline" size="sm" className="mt-5" render={<Link href={opt.href} />}>{opt.action}</Button> : <Button variant="outline" size="sm" className="mt-5" onClick={() => alert("Live chat is coming soon. In the meantime, please email support@wolfitpark.online.")}>{opt.action}</Button>}</CardContent></Card></FadeIn>)}</div></FadeInStagger></div></section>

    <section className="section-pad"><div className="container-site"><SectionHeading align="center" eyebrow="FAQ" title="Quick answers to common questions." /><div className="mx-auto mt-10 max-w-3xl"><Accordion>{supportFaqs.map(([q, a], i) => <AccordionItem key={q} value={`sf-${i}`}><AccordionTrigger className="text-left text-base">{q}</AccordionTrigger><AccordionContent className="text-sm leading-relaxed text-muted-foreground">{a}</AccordionContent></AccordionItem>)}</Accordion></div></div></section>

    <CtaSection title="Still need help?" description="Our team is ready to assist with any question, issue, or opportunity you want to explore." primary="Contact support" href="/contact" />
  </>
}
