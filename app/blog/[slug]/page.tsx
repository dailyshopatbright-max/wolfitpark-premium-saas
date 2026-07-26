import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, ArrowRight, Clock3 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { CtaSection, SectionHeading } from "@/components/page-sections"
import { NewsletterForm } from "@/components/forms"
import { posts } from "@/lib/site-data"

export function generateStaticParams() { return posts.map(p => ({ slug: p.slug })) }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params; const post = posts.find(p => p.slug === slug)
  if (!post) return {}; return { title: post.title, description: post.excerpt, alternates: { canonical: `/blog/${slug}` } }
}

const contentSections: Record<string, { heading: string; body: string[] }> = {
  "designing-ai-automation": {
    heading: "Designing AI automation that earns operational trust",
    body: [
      "The strongest AI initiatives begin by defining the operational behavior that should change, not by selecting a tool. Teams often feel pressure to automate quickly, but speed without context can reinforce the very friction the system was meant to remove.",
      "Start with the moments where people wait, repeat work, reconcile conflicting information, or make decisions without sufficient context. These friction points reveal where AI can have the greatest impact with the least risk.",
      "Map the decision owner, the information needed, the acceptable level of uncertainty, and the consequence of getting it wrong. This creates a practical boundary for automation and reveals where human judgment remains essential.",
      "Deploy in narrow, observable increments. Measure not just accuracy but how the automation changes workflow behavior. Expand based on evidence, not assumptions.",
    ],
  },
  "erp-modernization": {
    heading: "A low-risk path from legacy ERP to connected operations",
    body: [
      "Legacy ERP replacements are among the highest-stakes technology initiatives an organization can undertake. The key insight is that you do not need to replace everything at once to start seeing measurable improvement.",
      "Begin with a workflow assessment rather than a technical audit. Map the handoffs, approvals, and data reconciliations that create the most friction. These are the highest-value targets for modernization.",
      "Adopt a strangler fig pattern: build new capabilities alongside legacy systems, routing new workflows through modern services while legacy continues operating. This reduces risk and builds organizational confidence.",
      "Each increment should deliver observable value faster decisions, fewer errors, or reduced manual effort. Momentum is the most powerful force in a transformation program.",
    ],
  },
  "saas-metrics": {
    heading: "The SaaS operating metrics that expose real friction",
    body: [
      "Most SaaS teams track acquisition and revenue metrics but miss the operational signals that predict churn and stagnation. The metrics that matter most are those that reveal friction in the user's workflow.",
      "Time-to-activation measures how quickly a new user reaches their first meaningful outcome. Every day of delay increases the risk of abandonment. Map the steps between signup and value to identify where users stall.",
      "Workflow depth tracks whether users are progressing from basic to advanced capabilities. Stagnation at basic feature usage often indicates that the product is not delivering compounding value.",
      "Retention by outcome segment reveals whether users who achieve specific results stay longer. This is more predictive than overall retention and points directly to which product areas to strengthen.",
    ],
  },
  "cloud-cost-control": {
    heading: "Cloud cost control starts with architecture, not discounts",
    body: [
      "The most effective cloud cost optimization happens at the architecture level, not the discount level. Reserved instances andcommitment discounts help, but they cannot fix a fundamentally inefficient design.",
      "Start with right-sizing: provision resources based on actual usage patterns rather than peak estimates. Use autoscaling to match demand, but set sensible minimums that prevent idle resource waste.",
      "Adopt cost-aware design patterns: use serverless for variable workloads, spot instances for fault-tolerant batch processing, and object storage with lifecycle policies for data that ages.",
      "Implement observability that connects infrastructure cost to business value. When every team can see the cost per customer, per transaction, or per workflow, optimization becomes a shared discipline.",
    ],
  },
  "business-system-discovery": {
    heading: "What great business-system discovery actually uncovers",
    body: [
      "Discovery is the most undervalued phase of software delivery. A thorough discovery process does not just produce requirements; it produces shared understanding, risk identification, and a clear theory of value.",
      "Great discovery reveals the hidden organization: the informal workflows, exception paths, and workarounds that exist outside the official systems. These are where the deepest automation opportunities live.",
      "Map the decision chain for each critical workflow. Who decides? What information do they need? What happens when information is incomplete? These questions expose where systems need to improve.",
      "The output of discovery should be a decision framework, not a feature list. What will we measure? What will we deprioritize? What are we choosing not to build and why? Clarity on these questions determines project success.",
    ],
  },
  "secure-api-design": {
    heading: "Secure API design for connected enterprise products",
    body: [
      "APIs are the connective tissue of modern enterprise architecture. Every integration point is also a potential attack surface, which is why security must be designed into API contracts from the start.",
      "Adopt a zero-trust model for API design: authenticate every request, authorize against the principle of least privilege, and encrypt all data in transit and at rest. Never assume the safety of the internal network.",
      "Implement rate limiting, throttling, and input validation at the gateway layer. These controls protect against both malicious attacks and unintentional overload from misconfigured clients.",
      "Design for observability: structured logging, request tracing, and metrics that distinguish between client errors, server errors, and security events. Good observability is the foundation of incident response.",
    ],
  },
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const post = posts.find(p => p.slug === slug)
  if (!post) notFound()
  const section = contentSections[slug]
  const related = posts.filter(p => p.slug !== slug && p.category === post.category).slice(0, 2)
  const fallbackRelated = posts.filter(p => p.slug !== slug).slice(0, 2)

  return <>
    <article><header className="border-b border-border bg-muted/30"><div className="container-site max-w-4xl py-20"><Link href="/blog" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"><ArrowLeft className="size-4" />All insights</Link><div className="mt-10 flex flex-wrap items-center gap-3"><Badge>{post.category}</Badge><span className="flex items-center gap-1.5 text-xs text-muted-foreground"><Clock3 className="size-3.5" />{post.read}</span></div><h1 className="mt-6 text-balance text-4xl font-semibold tracking-tight sm:text-6xl">{post.title}</h1><p className="mt-6 max-w-2xl text-xl leading-relaxed text-muted-foreground">{post.excerpt}</p><p className="mt-8 text-sm text-muted-foreground">Wolfitpark Editorial &middot; {post.date}</p></div></header>

      <div className="container-site max-w-3xl py-16"><div className="flex flex-col gap-7 text-base leading-8 text-muted-foreground">{section ? <>{section.body.map((p, i) => <p key={i}>{p}</p>)}</> : <><p className="text-xl leading-8 text-foreground">Full article content is being prepared for this post.</p><p>In the meantime, explore our other insights on AI, cloud, product development, and digital transformation. Each article reflects practical experience from real delivery work.</p><p>Our team regularly publishes detailed breakdowns of technical decisions, architectural patterns, and lessons learned from enterprise software projects.</p></>}</div></div></article>

    {(related.length > 0 || fallbackRelated.length > 0) && <section className="section-pad bg-muted/30 border-y border-border"><div className="container-site"><SectionHeading align="center" eyebrow="Continue Reading" title="Related insights." /><div className="mt-10 grid gap-5 md:grid-cols-2">{(related.length > 0 ? related : fallbackRelated).map(r => <Link key={r.slug} href={`/blog/${r.slug}`} className="group rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/5"><Badge variant="secondary">{r.category}</Badge><h3 className="mt-5 text-xl font-semibold">{r.title}</h3><p className="mt-3 text-sm leading-relaxed text-muted-foreground">{r.excerpt}</p><span className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-primary group-hover:underline">Read article <ArrowRight className="size-4" /></span></Link>)}</div></div></section>}

    <section className="section-pad bg-foreground text-background"><div className="container-site grid gap-8 lg:grid-cols-2 lg:items-center"><div><h2 className="text-3xl font-semibold">Get one useful note each month.</h2><p className="mt-3 text-background/60">No noise. Just practical perspective on building modern systems that last.</p></div><NewsletterForm compact /></div></section>

    <CtaSection title="Ready to put these ideas into practice?" description="Every insight on this page comes from real delivery experience. Let us talk about what it could mean for your organization." />
  </>
}
