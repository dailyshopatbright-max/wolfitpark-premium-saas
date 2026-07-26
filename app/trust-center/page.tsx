import type { Metadata } from "next"
import Link from "next/link"
import { ArrowDown, ArrowRight, Cloud, FileCheck, FileText, Globe, LockKeyhole, ShieldCheck, UserCheck } from "lucide-react"
import { PageTransition } from "@/components/animation/page-transition"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Trust Center",
  description: "Wolfitpark Trust Center — your security, our priority. Learn about our compliance, security practices, privacy, and infrastructure.",
  alternates: { canonical: "/trust-center" },
}

const complianceItems = [
  { icon: ShieldCheck, title: "SOC 2", description: "Our security controls are designed to meet SOC 2 Type II criteria, with annual audits by independent third parties." },
  { icon: FileCheck, title: "PCI DSS", description: "Payment processing infrastructure is PCI DSS compliant, ensuring secure handling of cardholder data." },
  { icon: Globe, title: "GDPR", description: "We provide data processing agreements, data portability, and support for data subject access requests." },
  { icon: ShieldCheck, title: "HIPAA Readiness", description: "Our platform supports HIPAA-compliant configurations for covered entities and business associates." },
] as const

const securityItems = [
  { icon: LockKeyhole, title: "Encryption", description: "AES-256 encryption at rest and TLS 1.3 in transit. All encryption keys are managed through a hardware security module." },
  { icon: UserCheck, title: "Access Control", description: "Multi-factor authentication, least-privilege access, and session management with full audit logging." },
  { icon: ShieldCheck, title: "Penetration Testing", description: "Quarterly external penetration tests and continuous vulnerability scanning by independent security firms." },
] as const

const privacyItems = [
  { title: "Data Handling", description: "Customer data is processed according to documented policies with clear data classification and retention schedules." },
  { title: "GDPR Rights", description: "Right to access, rectify, erase, restrict processing, data portability, and object to processing of personal data." },
  { title: "CCPA Rights", description: "California residents have the right to know, delete, and opt out of the sale of their personal information." },
] as const

const infraItems = [
  { icon: Cloud, title: "Cloud Infrastructure", description: "Multi-region deployment across AWS and GCP with automated failover and disaster recovery." },
  { icon: ShieldCheck, title: "Data Centers", description: "SOC 2 and ISO 27001 certified data centers with 24/7 physical security and redundant power." },
  { icon: FileText, title: "Redundancy", description: "All critical systems are deployed across multiple availability zones with automatic failover." },
] as const

const documents = [
  { name: "SOC 2 Type II Report", description: "Annual audit report covering security, availability, and confidentiality." },
  { name: "Penetration Test Summary", description: "Summary of latest external penetration test results." },
  { name: "GDPR Data Processing Agreement", description: "Standard DPA for GDPR compliance." },
  { name: "PCI DSS Attestation", description: "Attestation of Compliance for PCI DSS." },
] as const

export default function TrustCenterPage() {
  return (
    <PageTransition>
      <section className="relative overflow-hidden border-b border-border bg-muted/30">
        <div className="hero-grid absolute inset-0 opacity-45" />
        <div className="container-site relative py-20 sm:py-28">
          <Badge variant="outline" className="mb-4">Trust Center</Badge>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-6xl lg:text-7xl">Trust Center</h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">Your Security, Our Priority. Comprehensive information about our security, compliance, and privacy practices.</p>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-site">
          <div className="mx-auto max-w-2xl text-center">
            <Badge variant="outline" className="mb-4">Compliance</Badge>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Compliance & Certifications</h2>
            <p className="mt-4 text-muted-foreground">We maintain rigorous compliance programs to protect your data and meet regulatory requirements.</p>
          </div>
          <div className="mt-12 grid gap-4 sm:grid-cols-2">
            {complianceItems.map((item) => {
              const Icon = item.icon
              return (
                <div key={item.title} className="rounded-2xl border border-border bg-card p-6">
                  <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="size-5" />
                  </div>
                  <h3 className="mt-6 text-lg font-semibold">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="section-pad border-y border-border bg-muted/40">
        <div className="container-site">
          <div className="mx-auto max-w-2xl text-center">
            <Badge variant="outline" className="mb-4">Security</Badge>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Security Practices</h2>
            <p className="mt-4 text-muted-foreground">Defense-in-depth approach to protecting your data and infrastructure.</p>
          </div>
          <div className="mt-12 grid gap-4 sm:grid-cols-3">
            {securityItems.map((item) => {
              const Icon = item.icon
              return (
                <div key={item.title} className="rounded-2xl border border-border bg-card p-6">
                  <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="size-5" />
                  </div>
                  <h3 className="mt-6 text-lg font-semibold">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-site">
          <div className="mx-auto max-w-2xl text-center">
            <Badge variant="outline" className="mb-4">Privacy</Badge>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Privacy & Data Protection</h2>
            <p className="mt-4 text-muted-foreground">We treat your data with the same care we treat our own.</p>
          </div>
          <div className="mt-12 grid gap-4 sm:grid-cols-3">
            {privacyItems.map((item) => (
              <div key={item.title} className="rounded-2xl border border-border bg-card p-6">
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad border-y border-border bg-muted/40">
        <div className="container-site">
          <div className="mx-auto max-w-2xl text-center">
            <Badge variant="outline" className="mb-4">Infrastructure</Badge>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Infrastructure Security</h2>
            <p className="mt-4 text-muted-foreground">Enterprise-grade infrastructure built for reliability and security.</p>
          </div>
          <div className="mt-12 grid gap-4 sm:grid-cols-3">
            {infraItems.map((item) => {
              const Icon = item.icon
              return (
                <div key={item.title} className="rounded-2xl border border-border bg-card p-6">
                  <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="size-5" />
                  </div>
                  <h3 className="mt-6 text-lg font-semibold">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-site">
          <div className="mx-auto max-w-2xl text-center">
            <Badge variant="outline" className="mb-4">Documents</Badge>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Trust Documents</h2>
            <p className="mt-4 text-muted-foreground">Download our compliance reports and security documentation.</p>
          </div>
          <div className="mt-12 grid gap-4 sm:grid-cols-2">
            {documents.map((doc) => (
              <div key={doc.name} className="flex items-center justify-between rounded-2xl border border-border bg-card p-5 transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5">
                <div>
                  <h3 className="font-semibold">{doc.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{doc.description}</p>
                </div>
                <Button variant="outline" size="sm" className="shrink-0">
                  <ArrowDown data-icon="inline-start" /> Download
                </Button>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <p className="text-sm text-muted-foreground">These documents are available to current and prospective clients under NDA. <Link href="/contact" className="text-primary underline underline-offset-4 hover:no-underline">Request access</Link>.</p>
          </div>
        </div>
      </section>
    </PageTransition>
  )
}
