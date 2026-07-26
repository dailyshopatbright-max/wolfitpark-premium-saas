"use client"

import { Bell, Bot, CalendarDays, ChevronRight, CircleDollarSign, FileText, LayoutDashboard, MoreHorizontal, Search, Users } from "lucide-react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

const bars = [52, 68, 46, 82, 65, 94, 74]
const rows = [["Northstar Labs", "$32,400", "Proposal"], ["Atlas Health", "$18,900", "Qualified"], ["Meridian Co.", "$45,200", "Negotiation"]]

export function DashboardPreview({ className }: { className?: string }) {
  return (
    <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .7, delay: .15 }} className={cn("relative", className)}>
      <div className="dashboard-shell overflow-hidden rounded-2xl border border-border/70 bg-card shadow-2xl shadow-primary/10">
        <div className="flex items-center justify-between border-b border-border bg-muted/40 px-4 py-3">
          <div className="flex items-center gap-2"><span className="size-2 rounded-full bg-primary"/><span className="size-2 rounded-full bg-border"/><span className="size-2 rounded-full bg-border"/></div>
          <div className="flex w-40 items-center gap-2 rounded-md border border-border bg-background px-2 py-1 text-[10px] text-muted-foreground"><Search className="size-3"/> Search anything</div>
          <div className="flex items-center gap-2 text-muted-foreground"><Bell className="size-4"/><span className="size-6 rounded-full bg-primary/15"/></div>
        </div>
        <div className="flex min-h-96">
          <aside className="hidden w-36 shrink-0 border-r border-border bg-muted/20 p-3 sm:block">
            <p className="mb-4 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">Workspace</p>
            {[[LayoutDashboard,"Overview"],[Users,"CRM"],[FileText,"Invoices"],[CalendarDays,"Calendar"],[Bot,"AI Assistant"]].map(([Icon,label], i) => <div key={String(label)} className={cn("mb-1.5 flex items-center gap-2 rounded-md px-2 py-2 text-[11px]", i === 0 ? "bg-primary text-primary-foreground" : "text-muted-foreground")}><Icon className="size-3.5"/>{String(label)}</div>)}
          </aside>
          <div className="min-w-0 flex-1 p-4 sm:p-5">
            <div className="mb-5 flex items-end justify-between"><div><p className="text-[10px] font-medium uppercase tracking-widest text-primary">Executive view</p><h3 className="mt-1 font-semibold">Good morning, Elena</h3></div><button className="rounded-md bg-foreground px-3 py-1.5 text-[10px] text-background">Create report</button></div>
            <div className="grid grid-cols-3 gap-2">
              {[["Revenue","$248.6k","+18.2%"],["Active deals","48","+12.4%"],["Efficiency","92%","+7.1%"]].map(([label,value,change]) => <div key={label} className="rounded-lg border border-border bg-background p-3"><p className="text-[9px] text-muted-foreground">{label}</p><p className="mt-1 text-sm font-semibold sm:text-base">{value}</p><p className="mt-1 text-[9px] text-primary">{change}</p></div>)}
            </div>
            <div className="mt-3 grid gap-3 lg:grid-cols-[1.25fr_.75fr]">
              <div className="rounded-lg border border-border bg-background p-3"><div className="flex items-center justify-between"><div><p className="text-[10px] text-muted-foreground">Revenue performance</p><p className="mt-1 text-sm font-semibold">$248,620</p></div><MoreHorizontal className="size-4 text-muted-foreground"/></div><div className="mt-5 flex h-24 items-end gap-2">{bars.map((h,i)=><motion.div initial={{height:0}} whileInView={{height:`${h}%`}} transition={{delay:i*.06,duration:.45}} key={h} className="flex-1 rounded-t bg-primary" style={{opacity:.35+i*.08}}/>)}</div></div>
              <div className="rounded-lg border border-border bg-foreground p-3 text-background"><div className="flex items-center justify-between"><span className="flex items-center gap-1.5 text-[10px]"><Bot className="size-3"/> Wolf AI</span><span className="size-1.5 rounded-full bg-primary"/></div><p className="mt-5 text-xs leading-relaxed">Pipeline is trending above target. Three opportunities need attention today.</p><button className="mt-4 flex items-center gap-1 text-[10px] text-primary">View briefing <ChevronRight className="size-3"/></button></div>
            </div>
            <div className="mt-3 overflow-hidden rounded-lg border border-border bg-background"><div className="flex items-center justify-between border-b border-border p-3"><p className="text-[10px] font-medium">Priority opportunities</p><CircleDollarSign className="size-4 text-primary"/></div>{rows.map(([name,amount,status])=><div key={name} className="grid grid-cols-[1fr_auto_auto] items-center gap-3 border-b border-border/60 px-3 py-2.5 text-[9px] last:border-0"><span className="font-medium">{name}</span><span>{amount}</span><span className="rounded-full bg-primary/10 px-2 py-1 text-primary">{status}</span></div>)}</div>
          </div>
        </div>
      </div>
      <motion.div animate={{ y: [0,-7,0] }} transition={{ repeat: Infinity, duration: 4 }} className="absolute -right-3 top-20 hidden rounded-xl border border-border bg-card p-3 shadow-lg md:block"><p className="text-[10px] text-muted-foreground">Automation completed</p><p className="mt-1 text-xs font-semibold">27 records enriched</p></motion.div>
    </motion.div>
  )
}
