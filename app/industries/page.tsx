import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, CheckCircle2, HeartPulse, Landmark, ShoppingBag, Settings2, HardHat, BriefcaseBusiness, Building2, Store, Rocket, GraduationCap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CtaSection, PageHero, SectionHeading } from "@/components/page-sections"
import { FadeIn, FadeInStagger } from "@/components/animation/fade-in"
import { solutions } from "@/lib/site-data"

export const metadata: Metadata = { title: "Industries", description: "Industry-specific digital transformation solutions for healthcare, finance, retail, manufacturing, construction, education, government, and more.", alternates: { canonical: "/industries" } }

const icons = [Store, Rocket, HeartPulse, GraduationCap, Landmark, ShoppingBag, Settings2, HardHat, BriefcaseBusiness, Building2]

const industryServices: Record<string, string[]> = {
  "Small Business": ["CRM setup & automation", "E-commerce integration", "Financial reporting dashboards", "Team collaboration workflows"],
  "Startups": ["MVP & product development", "Cloud infrastructure setup", "Investor-ready analytics", "Team scaling playbooks"],
  "Healthcare": ["HIPAA-compliant platforms", "Telehealth & patient portals", "EHR/EMR integration", "Clinical workflow automation"],
  "Education": ["LMS & student portals", "Enrollment management", "Institutional analytics", "Communication platforms"],
  "Finance": ["Audit-ready transaction systems", "Risk management dashboards", "Regulatory compliance tools", "Secure payment infrastructure"],
  "Retail": ["Omnichannel POS systems", "Inventory intelligence", "Customer loyalty platforms", "Supply chain visibility"],
  "Manufacturing": ["Production scheduling", "Quality control tracking", "Supply chain optimization", "IoT data integration"],
  "Construction": ["Project management platforms", "Field reporting tools", "Budget & timeline tracking", "Document control systems"],
  "Professional Services": ["Project delivery automation", "Resource utilization tracking", "Client portal & reporting", "Revenue operations"],
  "Government": ["Constituent service portals", "Permit & license management", "Open data platforms", "Accessible civic technology"],
}

const caseStudies = [
  { industry: "Healthcare", slug: "atlas-care", title: "Atlas Care Command Center" },
  { industry: "Finance", slug: "northstar-finance", title: "Northstar Risk Cloud" },
  { industry: "Retail", slug: "meridian-retail", title: "Meridian Retail OS" },
]

export default function IndustriesPage() {
  return <>
    <PageHero eyebrow="Industries" title="Industries We Serve" description="Every industry has unique workflows, regulations, and growth dynamics. We build systems that respect your context while transforming your capabilities." actions={<Button size="lg" render={<Link href="/consultation" />}>Discuss your industry<ArrowRight data-icon="inline-end" /></Button>} />

    <section className="section-pad"><div className="container-site"><FadeInStagger>{solutions.map(([title, description], i) => { const Icon = icons[i]; const svcs = industryServices[title] || []; const cs = caseStudies.find(c => c.industry === title); return <FadeIn key={title} className="mb-6 last:mb-0"><div className="grid gap-6 rounded-3xl border border-border bg-card p-6 transition-all hover:border-primary/30 md:grid-cols-[.9fr_1.1fr] md:p-10 lg:gap-12"><div className="flex items-start gap-4"><div className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary"><Icon className="size-6" /></div><div><div className="flex items-center gap-2"><span className="text-xs font-semibold text-primary">0{i + 1}</span></div><h2 className="mt-2 text-2xl font-semibold">{title}</h2><p className="mt-3 leading-relaxed text-muted-foreground">{description}</p><div className="mt-6 flex flex-wrap gap-2">{svcs.map(s => <Badge key={s} variant="secondary">{s}</Badge>)}</div>{cs && <Link href={`/portfolio#${cs.slug}`} className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline">View case study: {cs.title} <ArrowRight className="size-4" /></Link>}</div></div><div className="rounded-2xl border border-border bg-muted/30 p-6"><h3 className="text-sm font-semibold uppercase tracking-wider text-primary">What we deliver</h3><ul className="mt-5 flex flex-col gap-3">{svcs.slice(0, 4).map(s => <li key={s} className="flex items-start gap-3 text-sm"><CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />{s}</li>)}</ul></div></div></FadeIn>; })}</FadeInStagger></div></section>

    <CtaSection title="Your industry moves fast. Your systems should too." description="Let us build the platform that keeps you ahead of the curve." />
  </>
}
