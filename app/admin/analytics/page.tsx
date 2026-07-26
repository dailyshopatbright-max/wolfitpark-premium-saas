"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { PageTransition } from "@/components/animation/page-transition"
import { ArrowUpRight, ArrowDownRight, TrendingUp, Users, DollarSign, Building2, Globe } from "lucide-react"

const monthlyRevenue = [
  { month: "Jan", revenue: 425000, orders: 185 },
  { month: "Feb", revenue: 512000, orders: 212 },
  { month: "Mar", revenue: 478000, orders: 198 },
  { month: "Apr", revenue: 623000, orders: 245 },
  { month: "May", revenue: 587000, orders: 231 },
  { month: "Jun", revenue: 715000, orders: 278 },
  { month: "Jul", revenue: 847000, orders: 312 },
]

const newUsers = [
  { month: "Jan", count: 145 }, { month: "Feb", count: 172 },
  { month: "Mar", count: 158 }, { month: "Apr", count: 204 },
  { month: "May", count: 189 }, { month: "Jun", count: 236 },
  { month: "Jul", count: 281 },
]

const popularStates = [
  { state: "Wyoming", count: 342, growth: 18 },
  { state: "Delaware", count: 298, growth: 12 },
  { state: "Texas", count: 167, growth: 24 },
  { state: "Nevada", count: 134, growth: -3 },
  { state: "Florida", count: 98, growth: 31 },
]

const itemAnim = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
}

function ChartBar({ values, height = 48, color = "from-primary/60 to-primary/30", suffix = "" }: {
  values: { label: string; value: number }[]
  height?: number
  color?: string
  suffix?: string
}) {
  const max = Math.max(...values.map((v) => v.value))
  return (
    <div className="flex items-end gap-2" style={{ height }}>
      {values.map((v) => (
        <div key={v.label} className="relative flex flex-1 flex-col items-center gap-1">
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: `${(v.value / max) * 100}%` }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className={cn("w-full rounded-t-md bg-gradient-to-t", color)}
          />
          <span className="text-[10px] text-muted-foreground">{v.label}</span>
        </div>
      ))}
    </div>
  )
}

export default function AdminAnalytics() {
  const totalRevenue = monthlyRevenue.reduce((a, b) => a + b.revenue, 0)
  const totalOrders = monthlyRevenue.reduce((a, b) => a + b.orders, 0)
  const totalUsers = newUsers.reduce((a, b) => a + b.count, 0)

  return (
    <PageTransition>
      <motion.div
        initial="hidden"
        animate="show"
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06 } } }}
        className="space-y-6"
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: "Total Revenue", value: `$${(totalRevenue / 1000000).toFixed(1)}M`, change: "+23.1%", up: true, icon: DollarSign, color: "from-violet-500/20 to-violet-600/5" },
            { label: "Total Orders", value: totalOrders.toLocaleString(), change: "+18.7%", up: true, icon: TrendingUp, color: "from-blue-500/20 to-blue-600/5" },
            { label: "New Users (YTD)", value: totalUsers.toLocaleString(), change: "+31.2%", up: true, icon: Users, color: "from-emerald-500/20 to-emerald-600/5" },
            { label: "Avg. Order Value", value: "$2,847", change: "+4.3%", up: true, icon: Building2, color: "from-amber-500/20 to-amber-600/5" },
          ].map((s) => {
            const Icon = s.icon
            return (
              <motion.div key={s.label} variants={itemAnim}>
                <Card className="relative overflow-hidden border-border/60">
                  <div className={cn("absolute inset-0 bg-gradient-to-br opacity-40", s.color)} />
                  <CardContent className="relative p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-muted-foreground">{s.label}</span>
                      <div className="flex size-7 items-center justify-center rounded-lg bg-background/80">
                        <Icon className="size-3.5 text-foreground" />
                      </div>
                    </div>
                    <p className="mt-3 text-2xl font-semibold tracking-tight">{s.value}</p>
                    <div className="mt-1 flex items-center gap-1 text-xs">
                      <span className={cn("flex items-center gap-0.5", s.up ? "text-emerald-500" : "text-destructive")}>
                        {s.up ? <ArrowUpRight className="size-3" /> : <ArrowDownRight className="size-3" />}
                        {s.change}
                      </span>
                      <span className="text-muted-foreground">vs last period</span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <motion.div variants={itemAnim}>
            <Card className="border-border/60">
              <CardHeader>
                <CardTitle>Revenue</CardTitle>
                <CardDescription>Monthly revenue performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-lg bg-gradient-to-br from-primary/5 via-primary/10 to-transparent p-4">
                  <ChartBar
                    values={monthlyRevenue.map((m) => ({ label: m.month, value: m.revenue / 10000 }))}
                    height={52}
                    suffix="K"
                  />
                </div>
                <div className="mt-4 grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-muted-foreground">Best Month</span>
                    <p className="font-semibold">Jul — $847K</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Growth Rate</span>
                    <p className="font-semibold text-emerald-500">+23.1% MoM</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemAnim}>
            <Card className="border-border/60">
              <CardHeader>
                <CardTitle>New Users</CardTitle>
                <CardDescription>Monthly user signups</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-lg bg-gradient-to-br from-emerald-500/5 via-emerald-500/10 to-transparent p-4">
                  <ChartBar
                    values={newUsers.map((m) => ({ label: m.month, value: m.count }))}
                    height={52}
                    color="from-emerald-500/60 to-emerald-500/30"
                  />
                </div>
                <div className="mt-4 grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-muted-foreground">Best Month</span>
                    <p className="font-semibold">Jul — 281</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Growth Rate</span>
                    <p className="font-semibold text-emerald-500">+31.2% YTD</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <motion.div variants={itemAnim}>
            <Card className="border-border/60">
              <CardHeader>
                <CardTitle>Formation Stats</CardTitle>
                <CardDescription>Completion breakdown</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { label: "LLC Formations", value: "1,847", pct: 68, color: "bg-primary" },
                  { label: "C-Corp Formations", value: "423", pct: 16, color: "bg-violet-500" },
                  { label: "S-Corp Formations", value: "298", pct: 11, color: "bg-cyan-500" },
                  { label: "Non-Profit", value: "134", pct: 5, color: "bg-emerald-500" },
                ].map((item) => (
                  <div key={item.label}>
                    <div className="mb-1 flex items-center justify-between text-xs">
                      <span>{item.label}</span>
                      <span className="font-medium">{item.value}</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-muted">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${item.pct}%` }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className={cn("h-full rounded-full", item.color)}
                      />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemAnim}>
            <Card className="border-border/60">
              <CardHeader>
                <CardTitle>Popular States</CardTitle>
                <CardDescription>Top formation states</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {popularStates.map((s) => (
                    <div key={s.state} className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <Globe className="size-3 text-muted-foreground" />
                        <span className="font-medium">{s.state}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-muted-foreground">{s.count} formations</span>
                        <span className={cn(
                          "flex items-center gap-0.5 font-medium",
                          s.growth > 0 ? "text-emerald-500" : "text-destructive"
                        )}>
                          {s.growth > 0 ? <ArrowUpRight className="size-3" /> : <ArrowDownRight className="size-3" />}
                          {Math.abs(s.growth)}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemAnim}>
            <Card className="border-border/60">
              <CardHeader>
                <CardTitle>Monthly Comparison</CardTitle>
                <CardDescription>Current vs previous month</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { label: "Revenue", current: "$847K", previous: "$715K", change: 18.5 },
                  { label: "Orders", current: "312", previous: "278", change: 12.2 },
                  { label: "New Users", current: "281", previous: "236", change: 19.1 },
                  { label: "Conversion", current: "4.8%", previous: "4.2%", change: 14.3 },
                  { label: "Avg Order Value", current: "$2,847", previous: "$2,712", change: 5.0 },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">{item.label}</span>
                    <div className="flex items-center gap-3">
                      <span className="font-medium">{item.current}</span>
                      <span className={cn(
                        "flex items-center gap-0.5",
                        item.change > 0 ? "text-emerald-500" : "text-destructive"
                      )}>
                        {item.change > 0 ? <ArrowUpRight className="size-3" /> : <ArrowDownRight className="size-3" />}
                        {item.change}%
                      </span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </motion.div>
    </PageTransition>
  )
}
