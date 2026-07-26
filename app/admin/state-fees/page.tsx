"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { stateFees as stateFeesData } from "@/lib/site-data"
import { cn } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { PageTransition } from "@/components/animation/page-transition"
import { Search, Plus, MoreHorizontal, ArrowUpDown, Edit3, Save, X, CheckCircle2, XCircle } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

function StateFeesPage() {
  const [search, setSearch] = useState("")
  const [editing, setEditing] = useState<string | null>(null)
  const [editData, setEditData] = useState<Record<string, string>>({})

  const stateFees = [...stateFeesData]
  const filtered = stateFees.filter((s) =>
    s.state.toLowerCase().includes(search.toLowerCase())
  )

  const startEdit = (state: string) => {
    const fee = stateFees.find((s) => s.state === state)
    if (!fee) return
    setEditing(state)
    setEditData({
      filingFee: String(fee.filingFee),
      annualReport: String(fee.annualReport),
      franchiseTax: String(fee.franchiseTax),
      processing: fee.processing,
    })
  }

  const cancelEdit = () => {
    setEditing(null)
    setEditData({})
  }

  const saveEdit = (state: string) => {
    cancelEdit()
  }

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
              placeholder="Search states..."
              className="h-8 w-full rounded-lg pl-8 text-xs"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <Button size="sm" className="h-8 gap-1.5 text-xs">
            <Plus className="size-3.5" />
            Add State Fee
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
                        State <ArrowUpDown className="size-3" />
                      </button>
                    </th>
                    <th className="px-4 py-3 font-medium">Filing Fee</th>
                    <th className="px-4 py-3 font-medium">Annual Report</th>
                    <th className="px-4 py-3 font-medium">Franchise Tax</th>
                    <th className="px-4 py-3 font-medium">Processing</th>
                    <th className="px-4 py-3 font-medium">Privacy</th>
                    <th className="px-4 py-3 font-medium">Status</th>
                    <th className="px-4 py-3 font-medium"></th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((s) => {
                    const isEditing = editing === s.state
                    return (
                      <tr key={s.state} className="border-b border-border transition-colors hover:bg-muted/30">
                        <td className="px-4 py-3 font-medium">{s.state}</td>
                        <td className="px-4 py-3">
                          {isEditing ? (
                            <Input
                              className="h-7 w-20 text-xs"
                              value={editData.filingFee}
                              onChange={(e) => setEditData({ ...editData, filingFee: e.target.value })}
                            />
                          ) : (
                            `$${s.filingFee}`
                          )}
                        </td>
                        <td className="px-4 py-3">
                          {isEditing ? (
                            <Input
                              className="h-7 w-20 text-xs"
                              value={editData.annualReport}
                              onChange={(e) => setEditData({ ...editData, annualReport: e.target.value })}
                            />
                          ) : (
                            <>${s.annualReport}</>
                          )}
                        </td>
                        <td className="px-4 py-3 text-muted-foreground">
                          {isEditing ? (
                            <Input
                              className="h-7 w-28 text-xs"
                              value={editData.franchiseTax}
                              onChange={(e) => setEditData({ ...editData, franchiseTax: e.target.value })}
                            />
                          ) : (
                            s.franchiseTax
                          )}
                        </td>
                        <td className="px-4 py-3">
                          {isEditing ? (
                            <Select
                              value={editData.processing}
                              onValueChange={(v) => v !== null && setEditData({ ...editData, processing: v })}
                            >
                              <SelectTrigger className="h-7 w-24 text-xs">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="1-2 days">1-2 days</SelectItem>
                                <SelectItem value="3-5 days">3-5 days</SelectItem>
                                <SelectItem value="5-7 days">5-7 days</SelectItem>
                                <SelectItem value="7-10 days">7-10 days</SelectItem>
                              </SelectContent>
                            </Select>
                          ) : (
                            s.processing
                          )}
                        </td>
                        <td className="px-4 py-3">
                          <Badge
                            variant={s.privacy === "Very High" ? "default" : s.privacy === "High" ? "secondary" : "outline"}
                            className="text-[10px]"
                          >
                            {s.privacy}
                          </Badge>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-1.5">
                            <div className={cn(
                              "size-1.5 rounded-full",
                              s.rating >= 80 ? "bg-emerald-500" : s.rating >= 70 ? "bg-amber-500" : "bg-destructive"
                            )} />
                            <span className="text-xs">{s.rating}/100</span>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          {isEditing ? (
                            <div className="flex items-center gap-1">
                              <Button
                                variant="ghost"
                                size="icon-xs"
                                onClick={() => saveEdit(s.state)}
                                className="text-emerald-500"
                              >
                                <Save className="size-3.5" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon-xs"
                                onClick={cancelEdit}
                              >
                                <X className="size-3.5" />
                              </Button>
                            </div>
                          ) : (
                            <div className="flex items-center gap-1">
                              <Button
                                variant="ghost"
                                size="icon-xs"
                                onClick={() => startEdit(s.state)}
                              >
                                <Edit3 className="size-3.5" />
                              </Button>
                              <Button variant="ghost" size="icon-xs">
                                <MoreHorizontal className="size-3.5" />
                              </Button>
                            </div>
                          )}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </PageTransition>
  )
}

export default StateFeesPage
