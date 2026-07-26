"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard, Users, ShoppingCart, Building2, Landmark,
  Receipt, TicketPercent, CreditCard, HeadphonesIcon, FileText,
  Bell, BarChart3, DollarSign, Link2, FileEdit, ChevronLeft,
  Menu,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"

const navItems = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Users", href: "/admin/users", icon: Users },
  { label: "Orders", href: "/admin/orders", icon: ShoppingCart },
  { label: "Businesses", href: "/admin/businesses", icon: Building2 },
  { label: "State Fees", href: "/admin/state-fees", icon: Landmark },
  { label: "Service Fees", href: "/admin/service-fees", icon: Receipt },
  { label: "Coupons", href: "/admin/coupons", icon: TicketPercent },
  { label: "Payments", href: "/admin/payments", icon: CreditCard },
  { label: "Support", href: "/admin/support", icon: HeadphonesIcon },
  { label: "Documents", href: "/admin/documents", icon: FileText },
  { label: "Notifications", href: "/admin/notifications", icon: Bell },
  { label: "Analytics", href: "/admin/analytics", icon: BarChart3 },
  { label: "Revenue", href: "/admin/revenue", icon: DollarSign },
  { label: "Affiliates", href: "/admin/affiliates", icon: Link2 },
  { label: "Blog CMS", href: "/admin/blog", icon: FileEdit },
]

export function AdminSidebar() {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-40 flex h-screen flex-col border-r border-border bg-sidebar transition-all duration-300",
        collapsed ? "w-16" : "w-60"
      )}
    >
      <div className="flex h-14 items-center gap-3 border-b border-border px-4">
        <div className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-primary text-xs font-bold text-primary-foreground">
          W
        </div>
        {!collapsed && (
          <span className="text-sm font-semibold tracking-tight">Wolfitpark</span>
        )}
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={() => setCollapsed(!collapsed)}
          className="ml-auto shrink-0"
        >
          <ChevronLeft className={cn("size-4 transition-transform", collapsed && "rotate-180")} />
        </Button>
      </div>

      <nav className="flex-1 overflow-y-auto p-2 scrollbar-hide">
        {navItems.map((item) => {
          const Icon = item.icon
          const active = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "group relative flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all",
                active
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              )}
            >
              {active && (
                <motion.span
                  layoutId="sidebar-active"
                  className="absolute inset-0 rounded-lg bg-primary/10"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <Icon className="relative z-10 size-4 shrink-0" />
              {!collapsed && <span className="relative z-10">{item.label}</span>}
            </Link>
          )
        })}
      </nav>

      <div className="border-t border-border p-3">
        {!collapsed && (
          <div className="rounded-lg bg-sidebar-accent p-3 text-xs">
            <p className="font-medium text-sidebar-accent-foreground">Enterprise Plan</p>
            <p className="mt-0.5 text-muted-foreground">Active</p>
          </div>
        )}
      </div>
    </aside>
  )
}
