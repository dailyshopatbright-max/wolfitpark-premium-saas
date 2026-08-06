import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, Clock3, Mail, MapPin, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ContactForm } from "@/components/forms"
import { PageHero, SectionHeading } from "@/components/page-sections"
import { AcceptedPaymentBadge } from "@/components/card-logos"

export const metadata: Metadata = { title: "Contact", description: "Contact Wolfitpark about software development, AI automation, cloud, business systems, and digital transformation.", alternates: { canonical: "/contact" } }

const contactInfo = [
  { icon: Mail, label: "Email", value: "support@wolfitpark.online", href: "mailto:support@wolfitpark.online", description: "We respond within one business day." },
  { icon: Phone, label: "Phone", value: "+1 (307) 555-0142", href: "tel:+13075550142", description: "Monday–Friday, 8:00 AM–5:00 PM MT." },
  { icon: MapPin, label: "Office", value: "701 Amy Cir, Bryant, AR 72022", href: "https://maps.google.com/?q=701+Amy+Cir+Bryant+AR+72022", description: "Virtual meetings available globally." },
  { icon: Clock3, label: "Office Hours", value: "Monday–Friday, 8:00 AM–5:00 PM MT", description: "Weekend support available for enterprise clients." },
]

export default function ContactPage() {
  return <>
    <PageHero eyebrow="Contact Us" title="Bring us the problem worth solving." description="Tell us what is changing, what is getting in the way, and what a better outcome would mean for your organization." />

    <section className="section-pad"><div className="container-site grid gap-12 lg:grid-cols-[.55fr_1.45fr]"><div><SectionHeading eyebrow="Get in Touch" title="A thoughtful first response, not a sales script." description="We review every message and connect you with someone who understands the problem space." /><div className="mt-8 flex flex-col gap-3">{contactInfo.map(({ icon: Icon, label, value, href, description }) => <a key={label} href={href} className="group flex items-start gap-3 rounded-xl border border-border bg-card p-4 transition-colors hover:border-primary/40"><Icon className="mt-0.5 size-5 shrink-0 text-primary" /><div><p className="text-sm font-semibold">{label}</p><p className="text-sm text-muted-foreground group-hover:text-foreground">{value}</p><p className="mt-0.5 text-xs text-muted-foreground">{description}</p></div></a>)}</div></div><div className="rounded-3xl border border-border bg-card p-6 shadow-xl shadow-primary/5 sm:p-9"><ContactForm /></div></div></section>

    <section className="pb-20"><div className="container-site"><div className="relative min-h-80 overflow-hidden rounded-3xl border border-border bg-muted"><div className="hero-grid absolute inset-0" /><div className="absolute inset-0 flex items-center justify-center"><div className="rounded-2xl border border-border bg-popover p-6 text-center shadow-xl"><MapPin className="mx-auto size-6 text-primary" /><p className="mt-3 font-semibold">Wolfitpark HQ</p><p className="mt-1 text-sm text-muted-foreground">Bryant, Arkansas</p><p className="mt-1 text-xs text-muted-foreground">Serving clients worldwide</p><Button variant="outline" size="sm" className="mt-4" render={<Link href="https://maps.google.com/?q=701+Amy+Cir+Bryant+AR+72022" />}>View on map<ArrowRight data-icon="inline-end" /></Button></div></div></div></div></section>

    <section className="pb-20"><div className="container-site"><AcceptedPaymentBadge label="Accepted Payment Methods" className="mx-auto max-w-xl" /></div></section>
  </>
}
