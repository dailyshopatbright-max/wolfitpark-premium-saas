"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { PageTransition } from "@/components/animation/page-transition"
import { Search, MoreHorizontal, ArrowUpDown, Eye, Edit3, Trash2, Plus } from "lucide-react"

const businesses = [
  { name: "Acme Corp LLC", owner: "Alex Johnson", type: "LLC", state: "Wyoming", status: "approved", created: "2026-01-12" },
  { name: "TechStart Inc", owner: "Sarah Chen", type: "C-Corp", state: "Delaware", status: "completed", created: "2026-01-28" },
  { name: "GreenLeaf LLC", owner: "Marcus Rivera", type: "LLC", state: "Wyoming", status: "pending", created: "2026-02-14" },
  { name: "DataFlow Systems", owner: "Priya Patel", type: "LLC", state: "Texas", status: "approved", created: "2026-02-22" },
  { name: "NorthStar Ventures", owner: "David Kim", type: "C-Corp", state: "Delaware", status: "completed", created: "2026-03-05" },
  { name: "Blue Ocean Ltd", owner: "Emily Watson", type: "LLC", state: "Nevada", status: "documents-sent", created: "2026-03-18" },
  { name: "Silver Peak Group", owner: "James Wilson", type: "S-Corp", state: "Colorado", status: "approved", created: "2026-04-01" },
  { name: "CloudNine Solutions", owner: "Lisa Thompson", type: "LLC", state: "Wyoming", status: "completed", created: "2026-02-10" },
  { name: "Fusion Labs", owner: "Robert Garcia", type: "LLC", state: "California", status: "pending", created: "2026-04-15" },
  { name: "Tidewater Enterprises", owner: "Amanda Lee", type: "LLC", state: "Florida", status: "documents-sent", created: "2026-04-22" },
]

const statusConfig: Record<string, { label: string, variant: "default" | "secondary" | "outline" | "destructive" | "ghost" | "link" }> = {
  completed: { label: "Completed", variant: "default" },
  approved: { label: "Approved", variant: "secondary" },
  pending: { label: "Pending", variant: "outline" },
  "documents-sent": { label: "Docs Sent", variant: "ghost" },
}

export default function AdminBusinesses() {
  const [search, setSearch] = useState("")

  const filtered = businesses.filter((b) => {
    const q = search.toLowerCase()
    return b.name.toLowerCase().includes(q) ||
      b.owner.toLowerCase().includes(q) ||
      b.state.toLowerCase().includes(q)
  })

  return (
    <PageTransition>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="relative flex-1 sm:max-w-xs">
            <Search className="absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search businesses..."
              className="h-8 w-full rounded-lg pl-8 text-xs"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <Button size="sm" className="h-8 gap-1.5 text-xs">
            <Plus className="size-3.5" />
            Add Business
          </Button>
        </div>

        <Card className="border-border/60">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border text-left text-xs text-muted-foreground">
                    <th className="px-4 py-3 font-medium">
                      <button className="flex items-center gap-1 hover:text-foreground">
                        Business Name <ArrowUpDown className="size-3" />
                      </button>
                    </th>
                    <th className="px-4 py-3 font-medium">Owner</th>
                    <th className="px-4 py-3 font-medium">Type</th>
                    <th className="px-4 py-3 font-medium">State</th>
                    <th className="px-4 py-3 font-medium">Status</th>
                    <th className="px-4 py-3 font-medium">Created</th>
                    <th className="px-4 py-3 font-medium"></th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((b) => {
                    const s = statusConfig[b.status]
                    return (
                      <tr key={b.name} className="border-b border-border transition-colors hover:bg-muted/30">
                        <td className="px-4 py-3 font-medium">{b.name}</td>
                        <td className="px-4 py-3 text-muted-foreground">{b.owner}</td>
                        <td className="px-4 py-3">
                          <Badge variant="secondary" className="text-[10px]">{b.type}</Badge>
                        </td>
                        <td className="px-4 py-3">{b.state}</td>
                        <td className="px-4 py-3">
                          <Badge variant={s.variant} className="text-[10px]">{s.label}</Badge>
                        </td>
                        <td className="px-4 py-3 text-xs text-muted-foreground">{b.created}</td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-0.5">
                            <Button variant="ghost" size="icon-xs">
                              <Eye className="size-3.5" />
                            </Button>
                            <Button variant="ghost" size="icon-xs">
                              <Edit3 className="size-3.5" />
                            </Button>
                            <Button variant="ghost" size="icon-xs" className="text-destructive hover:text-destructive">
                              <Trash2 className="size-3.5" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
            {filtered.length === 0 && (
              <div className="flex items-center justify-center py-12 text-sm text-muted-foreground">
                No businesses found.
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </PageTransition>
  )
}
