"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import {
  Building2,
  Activity,
  FileText,
  MessageSquare,
  TrendingUp,
} from "lucide-react"

const cards = [
  {
    label: "Active Companies",
    value: "3",
    trend: "+1 this month",
    icon: Building2,
    color: "text-blue-400",
    bg: "bg-blue-500/10",
  },
  {
    label: "Formation Status",
    value: "In Progress",
    trend: "Wyoming LLC",
    icon: Activity,
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
  },
  {
    label: "Pending Documents",
    value: "5",
    trend: "2 require action",
    icon: FileText,
    color: "text-amber-400",
    bg: "bg-amber-500/10",
  },
  {
    label: "Messages",
    value: "12",
    trend: "3 unread",
    icon: MessageSquare,
    color: "text-purple-400",
    bg: "bg-purple-500/10",
  },
]

export function OverviewCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card, i) => (
        <motion.div
          key={card.label}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: i * 0.08 }}
        >
          <div className="group relative overflow-hidden rounded-xl bg-card border border-border p-5 transition-all duration-300 hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5">
            <div className="flex items-start justify-between">
              <div
                className={cn(
                  "flex size-10 items-center justify-center rounded-lg",
                  card.bg
                )}
              >
                <card.icon className={cn("size-5", card.color)} />
              </div>
              <TrendingUp className="size-4 text-emerald-400" />
            </div>
            <div className="mt-4">
              <p className="text-2xl font-semibold text-foreground tracking-tight">
                {card.value}
              </p>
              <p className="text-sm text-muted-foreground mt-0.5">
                {card.label}
              </p>
              <p className="text-xs text-muted-foreground/60 mt-1">
                {card.trend}
              </p>
            </div>
            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
          </div>
        </motion.div>
      ))}
    </div>
  )
}
