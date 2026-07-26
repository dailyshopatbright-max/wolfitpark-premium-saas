"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import {
  FileText,
  CheckCircle2,
  Clock,
  AlertCircle,
  Building2,
  MessageSquare,
} from "lucide-react"

interface Activity {
  id: number
  icon: typeof FileText
  title: string
  description: string
  time: string
  color: string
  bg: string
}

const activities: Activity[] = [
  {
    id: 1,
    title: "Articles of Organization filed",
    description:
      "Wyoming LLC \u2014 Articles have been submitted to the Secretary of State.",
    time: "2 hours ago",
    icon: FileText,
    color: "text-blue-400",
    bg: "bg-blue-500/10",
  },
  {
    id: 2,
    title: "EIN application approved",
    description:
      "Your Employer Identification Number has been assigned by the IRS.",
    time: "Yesterday",
    icon: CheckCircle2,
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
  },
  {
    id: 3,
    title: "Operating Agreement pending",
    description: "Review and sign your operating agreement to continue.",
    time: "2 days ago",
    icon: Clock,
    color: "text-amber-400",
    bg: "bg-amber-500/10",
  },
  {
    id: 4,
    title: "BOI report due",
    description:
      "Beneficial Ownership Information report must be filed within 30 days.",
    time: "3 days ago",
    icon: AlertCircle,
    color: "text-red-400",
    bg: "bg-red-500/10",
  },
  {
    id: 5,
    title: "New company registered",
    description:
      "Your second LLC \u2018Tech Ventures LLC\u2019 has been created.",
    time: "5 days ago",
    icon: Building2,
    color: "text-purple-400",
    bg: "bg-purple-500/10",
  },
  {
    id: 6,
    title: "Support response received",
    description:
      "Your registered agent query has been answered by the support team.",
    time: "1 week ago",
    icon: MessageSquare,
    color: "text-cyan-400",
    bg: "bg-cyan-500/10",
  },
]

export function ActivityFeed() {
  return (
    <div className="space-y-0">
      {activities.map((activity, i) => (
        <motion.div
          key={activity.id}
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: i * 0.06 }}
          className="relative flex gap-4 pb-6 last:pb-0"
        >
          {i < activities.length - 1 && (
            <div className="absolute left-[19px] top-10 bottom-0 w-px bg-border" />
          )}

          <div
            className={cn(
              "relative z-10 flex size-10 shrink-0 items-center justify-center rounded-full",
              activity.bg
            )}
          >
            <activity.icon className={cn("size-4", activity.color)} />
          </div>

          <div className="flex-1 min-w-0 pt-1">
            <p className="text-sm font-medium text-foreground">
              {activity.title}
            </p>
            <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed line-clamp-2">
              {activity.description}
            </p>
            <p className="text-xs text-muted-foreground/50 mt-1.5">
              {activity.time}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  )
}
