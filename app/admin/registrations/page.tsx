"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Building2, Clock3, AlertCircle, CheckCircle2, XCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/components/auth-provider"

type Registration = {
  id: string
  userId: string
  userEmail: string
  userName: string
  companyName: string
  entityType: string
  filingState: string
  registeredAgent: string
  einNeeded: boolean
  boirNeeded: boolean
  itinNeeded: boolean
  mailForwarding: boolean
  paymentMethod: string
  totalAmount: number
  phone: string
  address: string
  usCitizen: boolean
  status: "pending" | "review" | "approved" | "rejected"
  createdAt: string
}

const statusLabels: Record<string, { label: string; color: string }> = {
  pending: { label: "Pending", color: "bg-amber-400/10 text-amber-400 border-amber-400/20" },
  review: { label: "In Review", color: "bg-blue-400/10 text-blue-400 border-blue-400/20" },
  approved: { label: "Approved", color: "bg-emerald-400/10 text-emerald-400 border-emerald-400/20" },
  rejected: { label: "Rejected", color: "bg-red-400/10 text-red-400 border-red-400/20" },
}

export default function AdminRegistrationsPage() {
  const router = useRouter()
  const { user, loading: authLoading } = useAuth()
  const [registrations, setRegistrations] = useState<Registration[]>([])
  const [expanded, setExpanded] = useState<string | null>(null)

  useEffect(() => {
    if (!authLoading && (!user || user.role !== "admin")) {
      router.push("/login")
    }
  }, [user, authLoading, router])

  useEffect(() => {
    if (user?.role === "admin") {
      fetch("/api/registrations")
        .then((r) => r.json())
        .then((d) => setRegistrations(d.registrations || []))
    }
  }, [user])

  async function updateStatus(id: string, status: string) {
    await fetch(`/api/registrations/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    })
    setRegistrations((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: status as Registration["status"] } : r))
    )
  }

  const counts = {
    total: registrations.length,
    pending: registrations.filter((r) => r.status === "pending").length,
    review: registrations.filter((r) => r.status === "review").length,
    approved: registrations.filter((r) => r.status === "approved").length,
  }

  if (authLoading || !user || user.role !== "admin") {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="size-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    )
  }

  return (
    <div className="p-6 lg:p-8">
      <h1 className="text-2xl font-semibold">Registration Management</h1>
      <p className="text-sm text-muted-foreground">Review and process user business formation submissions</p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          ["Total", counts.total, "text-foreground"],
          ["Pending", counts.pending, "text-amber-400"],
          ["In Review", counts.review, "text-blue-400"],
          ["Approved", counts.approved, "text-emerald-400"],
        ].map(([label, count, clr]) => (
          <div key={label} className="rounded-2xl border border-border bg-card p-5">
            <p className={`text-2xl font-semibold ${clr}`}>{count}</p>
            <p className="text-xs text-muted-foreground">{label}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 space-y-3">
        {registrations.map((reg) => {
          const st = statusLabels[reg.status] || statusLabels.pending
          return (
            <div key={reg.id} className="overflow-hidden rounded-2xl border border-border bg-card">
              <button onClick={() => setExpanded(expanded === reg.id ? null : reg.id)} className="flex w-full items-center justify-between gap-4 p-5 text-left transition-colors hover:bg-muted/20">
                <div className="flex items-center gap-4 min-w-0">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                    <Building2 className="size-5 text-primary" />
                  </div>
                  <div className="min-w-0">
                    <p className="truncate font-semibold">{reg.companyName}</p>
                    <p className="text-xs text-muted-foreground">{reg.userName} · {reg.userEmail}</p>
                  </div>
                </div>
                <Badge className={`shrink-0 ${st.color}`}>{st.label}</Badge>
              </button>

              {expanded === reg.id && (
                <div className="border-t border-border px-5 py-4">
                    <div className="grid gap-2 text-sm sm:grid-cols-2">
                      <div><span className="text-muted-foreground">Entity:</span> {reg.entityType}</div>
                      <div><span className="text-muted-foreground">State:</span> {reg.filingState}</div>
                      <div><span className="text-muted-foreground">Agent:</span> {reg.registeredAgent}</div>
                      <div><span className="text-muted-foreground">Phone:</span> {reg.phone}</div>
                      <div className="sm:col-span-2"><span className="text-muted-foreground">Address:</span> {reg.address}</div>
                      <div><span className="text-muted-foreground">EIN:</span> {reg.einNeeded ? "Yes" : "No"}</div>
                      <div><span className="text-muted-foreground">BOI:</span> {reg.boirNeeded ? "Yes" : "No"}</div>
                      <div><span className="text-muted-foreground">ITIN:</span> {reg.itinNeeded ? "Yes" : "No"}</div>
                      <div><span className="text-muted-foreground">Mail Forwarding:</span> {reg.mailForwarding ? "Yes" : "No"}</div>
                      <div><span className="text-muted-foreground">Payment:</span> {reg.paymentMethod?.toUpperCase() || "N/A"}</div>
                      <div><span className="text-muted-foreground">Amount:</span> ${reg.totalAmount || 0}</div>
                      <div><span className="text-muted-foreground">US Citizen:</span> {reg.usCitizen ? "Yes" : "No"}</div>
                      <div><span className="text-muted-foreground">Submitted:</span> {new Date(reg.createdAt).toLocaleString()}</div>
                    </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {(["review", "approved", "rejected", "pending"] as const).map((s) => (
                      <Button
                        key={s}
                        size="sm"
                        variant={reg.status === s ? "secondary" : "outline"}
                        onClick={() => updateStatus(reg.id, s)}
                        className="text-xs"
                      >
                        {s.charAt(0).toUpperCase() + s.slice(1)}
                      </Button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )
        })}
        {registrations.length === 0 && (
          <div className="rounded-2xl border border-dashed border-border p-12 text-center">
            <Building2 className="mx-auto size-10 text-muted-foreground" />
            <p className="mt-4 font-medium">No registrations yet</p>
            <p className="mt-1 text-sm text-muted-foreground">User submissions will appear here</p>
          </div>
        )}
      </div>
    </div>
  )
}