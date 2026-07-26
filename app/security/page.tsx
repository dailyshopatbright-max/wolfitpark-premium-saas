import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, CheckCircle, Cloud, FileCheck, HeadphonesIcon, LockKeyhole, RefreshCcw, ShieldCheck, Siren, Timer } from "lucide-react"
import { PageTransition } from "@/components/animation/page-transition"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Security & Trust",
  description: "Enterprise-grade security built into everything we build. Learn about our security practices, compliance, and infrastructure.",
  alternates: { canonical: "/security" },
}

const trustCards = [
  { icon: FileCheck, label: "PCI DSS", description: "Secure payment processing compliant with PCI Data Security Standards." },
  { icon: LockKeyhole, label: "SSL 256-bit", description: "Enterprise-grade encryption for all data in transit and at rest." },
  { icon: ShieldCheck, label: "SOC 2", description: "Audited security controls aligned with SOC 2 criteria." },
  { icon: Timer, label: "99.99% Uptime", description: "Reliable infrastructure with a guaranteed uptime SLA." },
  { icon: HeadphonesIcon, label: "24/7 Support", description: "Round-the-clock security monitoring and incident response." },
  { icon: CheckCircle, label: "Enterprise SLA", description: "Guaranteed performance metrics and dedicated support." },
]

const practices = [
  { icon: LockKeyhole, title: "Data Encryption", description: "All data is encrypted at rest using AES-256 and in transit using TLS 1.3. We enforce strict key management policies and rotate encryption keys regularly." },
  { icon: ShieldCheck, title: "Access Control", description: "We implement least-privilege access, multi-factor authentication, and role-based permissions across all systems. All access is logged and audited." },
  { icon: Cloud, title: "Infrastructure Security", description: "Our infrastructure runs on SOC 2-compliant cloud providers with network segmentation, intrusion detection, and automated vulnerability scanning." },
  { icon: FileCheck, title: "Compliance", description: "We maintain compliance frameworks aligned with SOC 2, GDPR, and HIPAA. Regular third-party audits validate our security posture." },
  { icon: Siren, title: "Incident Response", description: "A dedicated security team follows a documented incident response plan with defined escalation paths, containment procedures, and post-incident reviews." },
  { icon: RefreshCcw, title: "Continuous Monitoring", description: "Real-time monitoring, automated threat detection, and weekly penetration testing ensure threats are identified and addressed before they impact operations." },
]

export default function SecurityPage() {
  return (
    <PageTransition>
      <section className="relative overflow-hidden border-b border-border bg-muted/30">
        <div className="hero-grid absolute inset-0 opacity-45" />
        <div className="container-site relative py-20 sm:py-28">
          <div className="max-w-4xl">
            <Badge variant="outline" className="mb-4">Trust</Badge>
            <h1 className="text-4xl font-semibold tracking-tight sm:text-6xl lg:text-7xl">Security & Trust</h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">Enterprise-Grade Security Built In. We protect your data with industry-leading controls and practices.</p>
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-site">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {trustCards.map((card) => {
              const Icon = card.icon
              return (
                <div key={card.label} className="rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5">
                  <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="size-5" />
                  </div>
                  <h3 className="mt-6 text-lg font-semibold">{card.label}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{card.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="section-pad border-y border-border bg-muted/40">
        <div className="container-site">
          <div className="mx-auto max-w-2xl text-center">
            <Badge variant="outline" className="mb-4">Practices</Badge>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Security Practices</h2>
            <p className="mt-4 text-muted-foreground">How we protect your data across every layer of our platform.</p>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {practices.map((practice) => {
              const Icon = practice.icon
              return (
                <div key={practice.title} className="rounded-2xl border border-border bg-card p-6">
                  <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="size-5" />
                  </div>
                  <h3 className="mt-6 text-lg font-semibold">{practice.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{practice.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-site">
          <div className="relative overflow-hidden rounded-3xl bg-primary p-8 text-primary-foreground sm:p-12 lg:flex lg:items-center lg:justify-between lg:p-16">
            <div className="hero-grid absolute inset-0 opacity-20" />
            <div className="relative max-w-2xl">
              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Have security questions?</h2>
              <p className="mt-4 text-primary-foreground/75">Our security team is available to discuss your requirements, review our practices, or provide documentation.</p>
            </div>
            <Button variant="secondary" size="lg" className="relative mt-8 lg:mt-0" render={<Link href="/contact" />}>Contact Security Team <ArrowRight data-icon="inline-end" /></Button>
          </div>
        </div>
      </section>
    </PageTransition>
  )
}
