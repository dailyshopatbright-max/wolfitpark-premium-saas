"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { ArrowRight, BadgeCheck, Sparkles, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select"
import { FadeIn, FadeInStagger } from "@/components/animation/fade-in"
import { states, stateFees } from "@/lib/site-data"
import { cn } from "@/lib/utils"
const regions = ["All", "Northeast", "South", "Midwest", "West"] as const
const recommended = ["Delaware", "Wyoming", "Texas"] as const

export default function StatesPage() {
  const [region, setRegion] = useState<string>("All")
  const [search, setSearch] = useState("")
  const filtered = states.filter(s => {
    if (region !== "All" && s.region !== region) return false
    if (search && !s.name.toLowerCase().includes(search.toLowerCase()) && !s.code.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })
  const feeData = useMemo(() => [...stateFees], [])

  function getFee(name: string) {
    return feeData.find(s => s.state === name) as { state: string; filingFee: number; annualReport: number | string; franchiseTax: string; processing: string; privacy: string; rating: number } | undefined
  }

  return <>
    <section className="relative overflow-hidden border-b border-border bg-muted/30"><div className="hero-grid absolute inset-0 opacity-45"/><div className="container-site relative py-20 sm:py-28"><FadeIn><Badge variant="outline" className="mb-6 rounded-full px-3 py-1.5 text-primary"><Sparkles/> State Comparison</Badge><h1 className="max-w-3xl text-balance text-4xl font-semibold tracking-[-.04em] sm:text-6xl lg:text-7xl">Find the Perfect State<br/><span className="text-gradient">for Your Business</span></h1><p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground sm:text-xl">Compare filing fees, annual report costs, franchise taxes, processing times, and privacy ratings across all 50 states.</p></FadeIn></div></section>
    <section className="section-pad"><div className="container-site">
      <FadeIn><div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"><h2 className="text-2xl font-semibold tracking-tight">All States</h2><div className="flex gap-3"><div className="relative"><Search className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"/><Input placeholder="Search states..." className="w-48 pl-8" value={search} onChange={e=>setSearch(e.target.value)}/></div>        <Select value={region} onValueChange={v=>v&&setRegion(v)}><SelectTrigger className="w-36"><SelectValue/></SelectTrigger><SelectContent>{regions.map((r:string)=><SelectItem key={r} value={r}>{r}</SelectItem>)}</SelectContent></Select></div></div></FadeIn>
      <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filtered.map((s, i) => {
          const f = getFee(s.name)
          const isRecommended = (recommended as readonly string[]).includes(s.name)
          return <FadeIn key={s.code} delay={i * 0.03}>
            <Card className={cn("border-border bg-card p-5 transition-all hover:border-primary/30 hover:shadow-lg", isRecommended && "border-primary/30 bg-primary/[0.02]")}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-base font-bold">{s.code}</span>
                  <span className="text-sm text-muted-foreground">{s.name}</span>
                </div>
                {isRecommended && <Badge variant="secondary" className="shrink-0 gap-1 text-[10px]"><BadgeCheck className="size-3"/> Recommended</Badge>}
              </div>
              {f ? <div className="mt-4 space-y-1.5 text-xs text-muted-foreground">
                <div className="flex justify-between"><span>Filing fee</span><span className="font-medium text-foreground">${f.filingFee}</span></div>
                <div className="flex justify-between"><span>Annual report</span><span className="font-medium text-foreground">{typeof f.annualReport === "number" ? `$${f.annualReport}` : f.annualReport}</span></div>
                <div className="flex justify-between"><span>Franchise tax</span><span className="font-medium text-foreground">{f.franchiseTax}</span></div>
                <div className="flex justify-between"><span>Processing</span><span className="font-medium text-foreground">{f.processing}</span></div>
                <div className="flex justify-between"><span>Privacy</span><span className={cn("font-medium", f.privacy === "Very High" || f.privacy === "High" ? "text-emerald" : f.privacy === "Medium" ? "text-amber-400" : "text-muted-foreground")}>{f.privacy}</span></div>
              </div> : <p className="mt-4 text-xs text-muted-foreground">Contact us for details</p>}
            </Card>
          </FadeIn>
        })}
      </div>
      <FadeIn className="mt-12 rounded-2xl border border-primary/20 bg-primary/[0.03] p-8 text-center">
        <h3 className="text-xl font-semibold">Not sure which state is right for you?</h3>
        <p className="mt-2 text-sm text-muted-foreground">Take our quick assessment quiz and we will recommend the best state for your business.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Button size="lg" render={<Link href="/register"/>}>Start registration<ArrowRight data-icon="inline-end"/></Button>
          <Button size="lg" variant="outline" render={<Link href="/consultation"/>}>Talk to an expert</Button>
        </div>
      </FadeIn>
    </div></section>
  </>
}
