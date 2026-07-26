"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  ArrowRight, Building2, Clock, FileCheck, PlusCircle, LogOut,
  LayoutDashboard, FileText, Settings, Menu, X, CheckCircle2, AlertCircle, Clock3, TrendingUp,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/components/auth-provider"

type Registration = {
  id: string
  companyName: string
  entityType: string
  filingState: string
  status: string
  createdAt: string
}

const statusConfig: Record<string, { icon: typeof Clock; color: string; label: string }> = {
  pending: { icon: Clock3, color: "text-amber-400", label: "Pending" },
  review: { icon: AlertCircle, color: "text-blue-400", label: "In Review" },
  approved: { icon: CheckCircle2, color: "text-emerald-400", label: "Approved" },
  rejected: { icon: CheckCircle2, color: "text-red-400", label: "Rejected" },
}

export default function DashboardPage() {
  const router = useRouter()
  const { user, loading: authLoading, logout } = useAuth()
  const [registrations, setRegistrations] = useState<Registration[]>([])
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login")
    }
  }, [user, authLoading, router])

  useEffect(() => {
    if (user) {
      fetch("/api/registrations")
        .then((r) => r.json())
        .then((data) => setRegistrations(data.registrations || []))
    }
  }, [user])

  if (authLoading || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="size-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    )
  }

  const navItems = [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/dashboard/status", label: "Registration Status", icon: FileText },
    { href: "/dashboard/settings", label: "Settings", icon: Settings },
  ]

  return (
    <div className="flex min-h-[calc(100vh-4rem)]">
      <aside className={`fixed inset-y-16 left-0 z-40 w-64 border-r border-border bg-card transition-transform lg:static lg:translate-x-0 ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex h-full flex-col p-4">
          <div className="mb-6 flex items-center gap-3 rounded-xl bg-primary/5 p-3">
            <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-sm font-semibold text-primary">
              {user.name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()}
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="truncate text-sm font-medium">{user.name}</p>
              <p className="truncate text-xs text-muted-foreground">{user.email}</p>
            </div>
          </div>
          <nav className="flex flex-1 flex-col gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-primary/5 hover:text-foreground"
              >
                <item.icon className="size-4" />
                {item.label}
              </Link>
            ))}
          </nav>
          <button
            onClick={logout}
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-destructive/5 hover:text-destructive"
          >
            <LogOut className="size-4" />
            Sign Out
          </button>
        </div>
      </aside>

      {mobileOpen && (
        <div className="fixed inset-0 z-30 bg-black/50 lg:hidden" onClick={() => setMobileOpen(false)} />
      )}

      <main className="flex-1 p-6 lg:p-8">
        <div className="mb-6 flex items-center gap-4">
          <Button variant="outline" size="icon" className="lg:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X className="size-4" /> : <Menu className="size-4" />}
          </Button>
          <div>
            <h1 className="text-2xl font-semibold">Welcome, {user.name.split(" ")[0]}</h1>
            <p className="text-sm text-muted-foreground">Manage your business registrations</p>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border border-border bg-card p-5">
            <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10">
              <Building2 className="size-5 text-primary" />
            </div>
            <p className="mt-3 text-2xl font-semibold">{registrations.length}</p>
            <p className="text-xs text-muted-foreground">Total Registrations</p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-5">
            <div className="flex size-10 items-center justify-center rounded-xl bg-amber-400/10">
              <Clock className="size-5 text-amber-400" />
            </div>
            <p className="mt-3 text-2xl font-semibold">{registrations.filter((r) => r.status === "pending").length}</p>
            <p className="text-xs text-muted-foreground">Pending</p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-5">
            <div className="flex size-10 items-center justify-center rounded-xl bg-emerald-400/10">
              <CheckCircle2 className="size-5 text-emerald-400" />
            </div>
            <p className="mt-3 text-2xl font-semibold">{registrations.filter((r) => r.status === "approved").length}</p>
            <p className="text-xs text-muted-foreground">Approved</p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-5">
            <div className="flex size-10 items-center justify-center rounded-xl bg-blue-400/10">
              <TrendingUp className="size-5 text-blue-400" />
            </div>
            <p className="mt-3 text-2xl font-semibold">{registrations.filter((r) => r.status === "review").length}</p>
            <p className="text-xs text-muted-foreground">In Review</p>
          </div>
        </div>

        <div className="mt-8 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Your Registrations</h2>
          <Button render={<Link href="/register" />} nativeButton={false} size="sm">
            <PlusCircle className="size-4" />
            New Registration
          </Button>
        </div>

        <div className="mt-4 grid gap-3">
          {registrations.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-border p-12 text-center">
              <Building2 className="mx-auto size-10 text-muted-foreground" />
              <p className="mt-4 font-medium">No registrations yet</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Start your first US company registration
              </p>
              <Button className="mt-4" render={<Link href="/register" />} nativeButton={false}>
                Start Registration
              </Button>
            </div>
          ) : (
            registrations.map((reg) => {
              const sc = statusConfig[reg.status] || statusConfig.pending
              const Icon = sc.icon
              return (
                <div key={reg.id} className="rounded-2xl border border-border bg-card p-5 transition-all hover:border-primary/20">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="flex size-10 items-center justify-center rounded-xl bg-primary/5">
                        <Building2 className="size-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-semibold">{reg.companyName}</p>
                        <p className="text-xs text-muted-foreground">
                          {reg.entityType} · {reg.filingState} · {new Date(reg.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className={`flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium ${sc.color.replace("400", "400/10")} ${sc.color.replace("400", "400")}`}>
                      <Icon className="size-3.5" />
                      {sc.label}
                    </div>
                  </div>
                </div>
              )
            })
          )}
        </div>
      </main>
    </div>
  )
}