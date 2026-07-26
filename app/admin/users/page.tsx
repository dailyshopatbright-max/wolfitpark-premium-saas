"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { PageTransition } from "@/components/animation/page-transition"
import {
  Search, Plus, MoreHorizontal, ChevronLeft, ChevronRight,
  ArrowUpDown, Filter,
} from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const users = [
  { name: "Alex Johnson", email: "alex@acmecorp.com", company: "Acme Corp", plan: "Professional", status: "active", joined: "2025-11-12" },
  { name: "Sarah Chen", email: "sarah@techstart.io", company: "TechStart Inc", plan: "Premium", status: "active", joined: "2025-12-03" },
  { name: "Marcus Rivera", email: "marcus@greenleaf.org", company: "GreenLeaf LLC", plan: "Starter", status: "active", joined: "2026-01-18" },
  { name: "Priya Patel", email: "priya@dataflow.com", company: "DataFlow Systems", plan: "Professional", status: "suspended", joined: "2025-10-22" },
  { name: "David Kim", email: "david@northstar.ventures", company: "NorthStar Ventures", plan: "Premium", status: "active", joined: "2026-02-05" },
  { name: "Emily Watson", email: "emily@blueocean.ltd", company: "Blue Ocean Ltd", plan: "Starter", status: "pending", joined: "2026-03-14" },
  { name: "James Wilson", email: "james@silverpeak.com", company: "Silver Peak Group", plan: "Professional", status: "active", joined: "2026-01-28" },
  { name: "Lisa Thompson", email: "lisa@cloudnine.io", company: "CloudNine Solutions", plan: "Premium", status: "active", joined: "2025-09-15" },
  { name: "Robert Garcia", email: "robert@fusionlabs.co", company: "Fusion Labs", plan: "Professional", status: "suspended", joined: "2025-08-07" },
  { name: "Amanda Lee", email: "amanda@tidewater.org", company: "Tidewater Enterprises", plan: "Starter", status: "active", joined: "2026-04-01" },
]

const statusVariant: Record<string, "default" | "secondary" | "outline" | "destructive" | "ghost" | "link"> = {
  active: "default",
  pending: "outline",
  suspended: "destructive",
}

export default function AdminUsers() {
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [planFilter, setPlanFilter] = useState("all")
  const [page, setPage] = useState(1)
  const perPage = 6

  const filtered = users.filter((u) => {
    const matchesSearch = u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase()) ||
      u.company.toLowerCase().includes(search.toLowerCase())
    const matchesStatus = statusFilter === "all" || u.status === statusFilter
    const matchesPlan = planFilter === "all" || u.plan.toLowerCase() === planFilter
    return matchesSearch && matchesStatus && matchesPlan
  })

  const totalPages = Math.ceil(filtered.length / perPage)
  const paginated = filtered.slice((page - 1) * perPage, page * perPage)

  return (
    <PageTransition>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-1 items-center gap-3 sm:max-w-md">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search users..."
                className="h-8 w-full rounded-lg pl-8 text-xs"
                value={search}
                onChange={(e) => { setSearch(e.target.value); setPage(1) }}
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Select value={statusFilter} onValueChange={(v) => { if (v !== null) { setStatusFilter(v); setPage(1) } }}>
              <SelectTrigger className="h-8 w-32 text-xs">
                <Filter className="size-3" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="suspended">Suspended</SelectItem>
              </SelectContent>
            </Select>
            <Select value={planFilter} onValueChange={(v) => { if (v !== null) { setPlanFilter(v); setPage(1) } }}>
              <SelectTrigger className="h-8 w-32 text-xs">
                <SelectValue placeholder="All Plans" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Plans</SelectItem>
                <SelectItem value="starter">Starter</SelectItem>
                <SelectItem value="professional">Professional</SelectItem>
                <SelectItem value="premium">Premium</SelectItem>
              </SelectContent>
            </Select>
            <Button size="sm" className="h-8 gap-1.5 text-xs">
              <Plus className="size-3.5" />
              Add User
            </Button>
          </div>
        </div>

        <Card className="border-border/60">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border text-left text-xs text-muted-foreground">
                    <th className="px-4 py-3 font-medium">
                      <button className="flex items-center gap-1 hover:text-foreground">
                        Name <ArrowUpDown className="size-3" />
                      </button>
                    </th>
                    <th className="px-4 py-3 font-medium">Email</th>
                    <th className="px-4 py-3 font-medium">Company</th>
                    <th className="px-4 py-3 font-medium">Plan</th>
                    <th className="px-4 py-3 font-medium">Status</th>
                    <th className="px-4 py-3 font-medium">Joined</th>
                    <th className="px-4 py-3 font-medium"></th>
                  </tr>
                </thead>
                <tbody>
                  {paginated.map((u) => (
                    <tr key={u.email} className="border-b border-border transition-colors hover:bg-muted/30">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2.5">
                          <div className="flex size-7 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                            {u.name.split(" ").map(n => n[0]).join("")}
                          </div>
                          <span className="font-medium">{u.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">{u.email}</td>
                      <td className="px-4 py-3">{u.company}</td>
                      <td className="px-4 py-3">
                        <Badge variant="secondary" className="text-[10px]">
                          {u.plan}
                        </Badge>
                      </td>
                      <td className="px-4 py-3">
                        <Badge variant={statusVariant[u.status]} className="text-[10px]">
                          {u.status}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 text-xs text-muted-foreground">{u.joined}</td>
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
            {paginated.length === 0 && (
              <div className="flex items-center justify-center py-12 text-sm text-muted-foreground">
                No users found.
              </div>
            )}
          </CardContent>
        </Card>

        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>
            Showing {(page - 1) * perPage + 1}–{Math.min(page * perPage, filtered.length)} of {filtered.length}
          </span>
          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="icon-xs"
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
            >
              <ChevronLeft className="size-3" />
            </Button>
            {Array.from({ length: totalPages }, (_, i) => (
              <Button
                key={i}
                variant={page === i + 1 ? "default" : "outline"}
                size="icon-xs"
                onClick={() => setPage(i + 1)}
                className="text-xs"
              >
                {i + 1}
              </Button>
            ))}
            <Button
              variant="outline"
              size="icon-xs"
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}
            >
              <ChevronRight className="size-3" />
            </Button>
          </div>
        </div>
      </motion.div>
    </PageTransition>
  )
}
