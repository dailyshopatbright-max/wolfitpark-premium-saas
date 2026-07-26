"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { Search, Bell, Menu, ChevronDown, Settings, LogOut, User } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()

  const pageTitle = pathname === "/admin"
    ? "Dashboard"
    : pathname.split("/").pop()?.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase()) || "Admin"

  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar />

      <div className="flex flex-1 flex-col lg:pl-60">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b border-border bg-background/80 px-4 backdrop-blur-xl sm:px-6">
          <Button
            variant="ghost"
            size="icon-sm"
            className="lg:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <Menu className="size-4" />
          </Button>

          <h1 className="text-base font-semibold capitalize">{pageTitle}</h1>

          <div className="ml-auto flex items-center gap-3">
            <div className="hidden sm:relative sm:flex sm:items-center">
              <Search className="absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search..."
                className="h-8 w-48 rounded-lg pl-8 text-xs lg:w-64"
              />
            </div>

            <Button variant="ghost" size="icon-sm" className="relative">
              <Bell className="size-4" />
              <span className="absolute -top-0.5 -right-0.5 flex size-3.5 items-center justify-center rounded-full bg-destructive text-[8px] font-bold text-destructive-foreground">
                3
              </span>
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <Button variant="ghost" size="sm" className="gap-2 px-2" />
                }
              >
                <div className="flex size-6 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                  AW
                </div>
                <span className="hidden text-xs font-medium sm:inline">Admin</span>
                <ChevronDown className="size-3 text-muted-foreground" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-44">
                <DropdownMenuLabel className="text-xs">Admin Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="size-3.5" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="size-3.5" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem variant="destructive">
                  <LogOut className="size-3.5" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        <main className="flex-1 p-4 sm:p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
