"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowRight, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { PageHero, SectionHeading } from "@/components/page-sections"
import { FadeIn, FadeInStagger } from "@/components/animation/fade-in"
import { NewsletterForm } from "@/components/forms"
import { posts } from "@/lib/site-data"

const categories = ["All", ...new Set(posts.map(p => p.category))]

export default function BlogPage() {
  const [active, setActive] = useState("All")
  const [q, setQ] = useState("")
  const [visible, setVisible] = useState(3)
  const featured = posts[0]
  const remaining = posts.slice(1)
  const filtered = remaining.filter(p => (active === "All" || p.category === active) && (p.title + p.excerpt + p.category).toLowerCase().includes(q.toLowerCase()))
  const displayed = filtered.slice(0, visible)

  return <>
    <PageHero eyebrow="Insights" title="Thought Leadership & Technical Deep Dives" description="Perspectives on software, AI, cloud, products, and the operating decisions behind meaningful transformation." />

    <section className="section-pad pt-0"><div className="container-site -mt-8"><article className="grid overflow-hidden rounded-3xl border border-border bg-card lg:grid-cols-2"><div className="relative flex min-h-80 flex-col justify-end bg-gradient-to-br from-primary/20 to-foreground p-8 text-background"><div className="hero-grid absolute inset-0 opacity-20" /><div className="relative"><Badge>Featured perspective</Badge><p className="mt-4 text-xs uppercase tracking-widest text-primary">{featured.category}</p><h2 className="mt-3 text-3xl font-semibold leading-tight">{featured.title}</h2></div></div><div className="flex flex-col justify-center p-8 lg:p-12"><p className="text-sm text-muted-foreground">{featured.date} &middot; {featured.read}</p><p className="mt-5 leading-relaxed text-muted-foreground">{featured.excerpt}</p><Button className="mt-7 w-fit" render={<Link href={`/blog/${featured.slug}`} />}>Read featured article<ArrowRight data-icon="inline-end" /></Button></div></article></div></section>

    <section className="pb-24"><div className="container-site"><SectionHeading eyebrow="Latest Thinking" title="Ideas you can put to work." /><div className="mt-8 flex flex-wrap items-center gap-3"><div className="flex flex-wrap gap-2">{categories.map(c => <button key={c} onClick={() => { setActive(c); setVisible(3) }} className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-all ${active === c ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground"}`}>{c}</button>)}</div><div className="ml-auto flex items-center gap-2 rounded-xl border border-border bg-card px-3"><Search className="size-4 shrink-0 text-muted-foreground" /><label htmlFor="blog-search" className="sr-only">Search posts</label><Input id="blog-search" className="h-9 border-0 bg-transparent p-0 shadow-none focus-visible:ring-0" placeholder="Search..." value={q} onChange={e => { setQ(e.target.value); setVisible(3) }} /></div></div><div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3"><FadeInStagger>{displayed.map((post, i) => <FadeIn key={post.slug} delay={i * 0.05}><article className="group flex flex-col rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/5"><div className="flex items-center justify-between"><Badge variant="secondary">{post.category}</Badge><span className="text-xs text-muted-foreground">{post.read}</span></div><h2 className="mt-7 text-xl font-semibold leading-snug">{post.title}</h2><p className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">{post.excerpt}</p><div className="mt-7 flex items-center justify-between border-t border-border pt-5"><span className="text-xs text-muted-foreground">{post.date}</span><Link href={`/blog/${post.slug}`} className="flex items-center gap-1 text-sm font-medium text-primary hover:underline">Read <ArrowRight className="size-4" /></Link></div></article></FadeIn>)}</FadeInStagger></div>{filtered.length === 0 && <div className="rounded-2xl border border-dashed border-border p-12 text-center"><p className="font-semibold">No articles found</p><p className="mt-2 text-sm text-muted-foreground">Try adjusting your search or category filter.</p></div>}{visible < filtered.length && <div className="mt-8 text-center"><Button variant="outline" onClick={() => setVisible(v => v + 3)}>Load more articles<ArrowRight data-icon="inline-end" /></Button></div>}</div></section>

    <section className="section-pad bg-foreground text-background"><div className="container-site grid gap-8 lg:grid-cols-2 lg:items-center"><div><h2 className="text-3xl font-semibold">One useful note each month.</h2><p className="mt-3 text-background/60">No noise. Just practical perspective from teams designing and building modern systems.</p></div><NewsletterForm compact /></div></section>
  </>
}
