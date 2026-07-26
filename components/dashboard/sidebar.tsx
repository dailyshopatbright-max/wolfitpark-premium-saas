"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { dashboardNav, iconMap } from "@/lib/site-data"
import { Settings } from "lucide-react"

interface SidebarProps {
  onClose?: () => void
}

export function DashboardSidebar({ onClose }: SidebarProps) {
  const pathname = usePathname()

  const nav = dashboardNav as unknown as Array<{ label: string; href: string; icon: string }>

  return (
    <div className="flex h-full flex-col bg-card border-r border-border">
      <div className="flex h-14 items-center gap-3 px-4 border-b border-border">
        <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground text-sm font-bold">
          W
        </div>
        <span className="text-base font-semibold tracking-tight">Wolfitpark</span>
      </div>

      <nav className="flex-1 overflow-y-auto p-3 scrollbar-hide space-y-1">
        {nav.map((item) => {
          const Icon = iconMap[item.icon as keyof typeof iconMap]
          const isActive =
            pathname === item.href ||
            (item.href !== "/dashboard" && pathname.startsWith(item.href))

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={cn(
                "group flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200",
                isActive
                  ? "bg-primary/10 text-primary shadow-sm"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              )}
            >
              {Icon && <Icon className="size-4 shrink-0" />}
              <span>{item.label}</span>
              {isActive && (
                <span className="ml-auto size-1.5 rounded-full bg-primary" />
              )}
            </Link>
          )
        })}
      </nav>

      <div className="border-t border-border p-3 space-y-1">
        <Link
          href="/dashboard/settings"
          onClick={onClose}
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all duration-200"
        >
          <Settings className="size-4 shrink-0" />
          <span>Settings</span>
        </Link>
        <div className="flex items-center gap-3 rounded-lg px-3 py-2">
          <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-semibold">
            JD
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-foreground truncate">John Doe</p>
            <p className="text-xs text-muted-foreground truncate">john@example.com</p>
          </div>
        </div>
      </div>
    </div>
  )
}
