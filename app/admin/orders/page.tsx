"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { PageTransition } from "@/components/animation/page-transition"
import { Search, MoreHorizontal, Filter, ArrowUpDown } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const orders = [
  { id: "ORD-0042", customer: "Acme Corp", service: "LLC Formation - Wyoming", amount: 299, status: "completed", date: "2026-07-24" },
  { id: "ORD-0041", customer: "TechStart Inc", service: "EIN Filing", amount: 49, status: "processing", date: "2026-07-24" },
  { id: "ORD-0040", customer: "GreenLeaf LLC", service: "Premium Bundle - Delaware", amount: 498, status: "pending", date: "2026-07-23" },
  { id: "ORD-0039", customer: "DataFlow Systems", service: "ITIN Assistance", amount: 149, status: "completed", date: "2026-07-23" },
  { id: "ORD-0038", customer: "NorthStar Ventures", service: "LLC Formation - Wyoming", amount: 199, status: "refunded", date: "2026-07-22" },
  { id: "ORD-0037", customer: "Blue Ocean Ltd", service: "Registered Agent - 1 Year", amount: 119, status: "completed", date: "2026-07-22" },
  { id: "ORD-0036", customer: "Silver Peak Group", service: "LLC Formation - Texas", amount: 499, status: "processing", date: "2026-07-21" },
  { id: "ORD-0035", customer: "CloudNine Solutions", service: "Premium Bundle - Wyoming", amount: 498, status: "completed", date: "2026-07-21" },
  { id: "ORD-0034", customer: "Fusion Labs", service: "ITIN Assistance", amount: 149, status: "pending", date: "2026-07-20" },
  { id: "ORD-0033", customer: "Tidewater Enterprises", service: "EIN Filing", amount: 49, status: "completed", date: "2026-07-20" },
  { id: "ORD-0032", customer: "Meridian Group", service: "LLC Formation - Nevada", amount: 425, status: "refunded", date: "2026-07-19" },
  { id: "ORD-0031", customer: "Atlas Health", service: "Registered Agent - 1 Year", amount: 119, status: "processing", date: "2026-07-19" },
]

const statusConfig: Record<string, { label: string, variant: "default" | "secondary" | "outline" | "destructive" | "ghost" | "link" }> = {
  completed: { label: "Completed", variant: "default" },
  processing: { label: "Processing", variant: "secondary" },
  pending: { label: "Pending", variant: "outline" },
  refunded: { label: "Refunded", variant: "destructive" },
}

export default function AdminOrders() {
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const filtered = orders.filter((o) => {
    const q = search.toLowerCase()
    const matchesSearch = o.id.toLowerCase().includes(q) || o.customer.toLowerCase().includes(q) || o.service.toLowerCase().includes(q)
    const matchesStatus = statusFilter === "all" || o.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <PageTransition>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-1 sm:max-w-xs">
            <Search className="absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search orders..."
              className="h-8 w-full rounded-lg pl-8 text-xs"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <Select value={statusFilter} onValueChange={(v) => v !== null && setStatusFilter(v)}>
            <SelectTrigger className="h-8 w-36 text-xs">
              <Filter className="size-3" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="processing">Processing</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="refunded">Refunded</SelectItem>
            </SelectContent>
          </Select>
          <span className="text-xs text-muted-foreground">{filtered.length} orders</span>
        </div>

        <Card className="border-border/60">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border text-left text-xs text-muted-foreground">
                    <th className="px-4 py-3 font-medium">
                      <button className="flex items-center gap-1 hover:text-foreground">
                        Order ID <ArrowUpDown className="size-3" />
                      </button>
                    </th>
                    <th className="px-4 py-3 font-medium">Customer</th>
                    <th className="px-4 py-3 font-medium">Service</th>
                    <th className="px-4 py-3 font-medium">Amount</th>
                    <th className="px-4 py-3 font-medium">Status</th>
                    <th className="px-4 py-3 font-medium">Date</th>
                    <th className="px-4 py-3 font-medium"></th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((o) => {
                    const s = statusConfig[o.status]
                    return (
                      <tr key={o.id} className="border-b border-border transition-colors hover:bg-muted/30">
                        <td className="px-4 py-3 font-medium">{o.id}</td>
                        <td className="px-4 py-3">{o.customer}</td>
                        <td className="px-4 py-3 text-muted-foreground">{o.service}</td>
                        <td className="px-4 py-3">${o.amount.toLocaleString()}</td>
                        <td className="px-4 py-3">
                          <Badge variant={s.variant} className="text-[10px]">{s.label}</Badge>
                        </td>
                        <td className="px-4 py-3 text-xs text-muted-foreground">{o.date}</td>
                        <td className="px-4 py-3">
                          <Button variant="ghost" size="icon-xs">
                            <MoreHorizontal className="size-3.5" />
                          </Button>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
            {filtered.length === 0 && (
              <div className="flex items-center justify-center py-12 text-sm text-muted-foreground">
                No orders found.
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </PageTransition>
  )
}
