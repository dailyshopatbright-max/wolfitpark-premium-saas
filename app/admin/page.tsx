"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { PageTransition } from "@/components/animation/page-transition"
import { ArrowUpRight, ArrowDownRight, Users, Building2, DollarSign, ShoppingCart, Percent, Clock, CheckCircle2, XCircle, MoreHorizontal, Plus, Tag, Landmark, Megaphone } from "lucide-react"

const stats = [
  { label: "Total Users", value: "2,847", change: "+12.5%", up: true, icon: Users, color: "from-blue-500/20 to-blue-600/5" },
  { label: "Active Businesses", value: "1,234", change: "+8.3%", up: true, icon: Building2, color: "from-emerald-500/20 to-emerald-600/5" },
  { label: "Revenue This Month", value: "$847K", change: "+23.1%", up: true, icon: DollarSign, color: "from-violet-500/20 to-violet-600/5" },
  { label: "Pending Orders", value: "23", change: "-5.2%", up: false, icon: ShoppingCart, color: "from-amber-500/20 to-amber-600/5" },
]

const recentOrders = [
  { id: "#ORD-0042", customer: "Acme Corp", service: "LLC Formation", amount: "$299", status: "completed", date: "2 min ago" },
  { id: "#ORD-0041", customer: "TechStart Inc", service: "EIN Filing", amount: "$49", status: "processing", date: "15 min ago" },
  { id: "#ORD-0040", customer: "GreenLeaf LLC", service: "Premium Bundle", amount: "$498", status: "pending", date: "1 hour ago" },
  { id: "#ORD-0039", customer: "DataFlow Systems", service: "ITIN Assistance", amount: "$149", status: "completed", date: "3 hours ago" },
  { id: "#ORD-0038", customer: "NorthStar Ventures", service: "LLC Formation", amount: "$199", status: "refunded", date: "5 hours ago" },
  { id: "#ORD-0037", customer: "Blue Ocean Ltd", service: "Registered Agent", amount: "$119", status: "completed", date: "8 hours ago" },
]

const statusBadge = (status: string) => {
  const map: Record<string, { label: string, variant: "default" | "secondary" | "outline" | "destructive" | "ghost" | "link" }> = {
    completed: { label: "Completed", variant: "default" },
    processing: { label: "Processing", variant: "secondary" },
    pending: { label: "Pending", variant: "outline" },
    refunded: { label: "Refunded", variant: "destructive" },
  }
  const s = map[status] || { label: status, variant: "outline" }
  return <Badge variant={s.variant}>{s.label}</Badge>
}

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
}

const itemAnim = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
}

export default function AdminDashboard() {
  return (
    <PageTransition>
      <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
        <motion.div variants={itemAnim} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s) => {
            const Icon = s.icon
            return (
              <Card key={s.label} className="relative overflow-hidden border-border/60">
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
                    <span className="text-muted-foreground">vs last month</span>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </motion.div>

        <motion.div variants={itemAnim} className="grid gap-6 lg:grid-cols-7">
          <Card className="lg:col-span-4 border-border/60">
            <CardHeader>
              <CardTitle>Revenue Overview</CardTitle>
              <CardDescription>Monthly revenue for the current fiscal year</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative h-52 w-full overflow-hidden rounded-lg bg-gradient-to-br from-primary/5 via-primary/10 to-transparent">
                <div className="absolute inset-0 flex items-end p-4">
                  <div className="flex w-full items-end gap-2">
                    {[35, 42, 38, 55, 48, 62, 58, 71, 65, 78, 82, 95].map((h, i) => (
                      <div key={i} className="relative flex flex-1 flex-col items-center gap-1">
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: `${h}%` }}
                          transition={{ duration: 0.6, delay: i * 0.04 }}
                          className="w-full rounded-t-md bg-gradient-to-t from-primary/60 to-primary/30"
                        />
                        <span className="text-[10px] text-muted-foreground">
                          {["J","F","M","A","M","J","J","A","S","O","N","D"][i]}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="absolute top-3 right-3 rounded-md bg-background/80 px-2 py-1 text-[10px] font-medium text-muted-foreground">
                  +23.1% this month
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="lg:col-span-3 border-border/60">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common administrative tasks</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start gap-3 text-xs">
                <div className="flex size-7 items-center justify-center rounded-md bg-primary/10 text-primary">
                  <Tag className="size-3.5" />
                </div>
                Create Coupon
              </Button>
              <Button variant="outline" className="w-full justify-start gap-3 text-xs">
                <div className="flex size-7 items-center justify-center rounded-md bg-emerald-500/10 text-emerald-500">
                  <Landmark className="size-3.5" />
                </div>
                Add State Fee
              </Button>
              <Button variant="outline" className="w-full justify-start gap-3 text-xs">
                <div className="flex size-7 items-center justify-center rounded-md bg-violet-500/10 text-violet-500">
                  <Megaphone className="size-3.5" />
                </div>
                New Announcement
              </Button>
              <Button variant="outline" className="w-full justify-start gap-3 text-xs">
                <div className="flex size-7 items-center justify-center rounded-md bg-amber-500/10 text-amber-500">
                  <Plus className="size-3.5" />
                </div>
                Add Admin User
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemAnim}>
          <Card className="border-border/60">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Recent Orders</CardTitle>
                  <CardDescription>Latest orders across all services</CardDescription>
                </div>
                <Button variant="outline" size="sm" className="text-xs">
                  View All
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border text-left text-xs text-muted-foreground">
                      <th className="px-4 py-3 font-medium">Order ID</th>
                      <th className="px-4 py-3 font-medium">Customer</th>
                      <th className="px-4 py-3 font-medium">Service</th>
                      <th className="px-4 py-3 font-medium">Amount</th>
                      <th className="px-4 py-3 font-medium">Status</th>
                      <th className="px-4 py-3 font-medium">Date</th>
                      <th className="px-4 py-3 font-medium"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentOrders.map((o) => (
                      <tr key={o.id} className="border-b border-border transition-colors hover:bg-muted/30">
                        <td className="px-4 py-3 font-medium">{o.id}</td>
                        <td className="px-4 py-3">{o.customer}</td>
                        <td className="px-4 py-3 text-muted-foreground">{o.service}</td>
                        <td className="px-4 py-3">{o.amount}</td>
                        <td className="px-4 py-3">{statusBadge(o.status)}</td>
                        <td className="px-4 py-3 text-xs text-muted-foreground">{o.date}</td>
                        <td className="px-4 py-3">
                          <Button variant="ghost" size="icon-xs">
                            <MoreHorizontal className="size-3.5" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </PageTransition>
  )
}
