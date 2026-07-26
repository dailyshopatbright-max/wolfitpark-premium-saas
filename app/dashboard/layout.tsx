"use client"

import { useState } from "react"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { DashboardSidebar } from "@/components/dashboard/sidebar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex min-h-screen bg-background">
      <div className="fixed top-3 left-3 z-50 lg:hidden">
        <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
          <SheetTrigger
            render={
              <Button
                variant="ghost"
                size="icon"
                className="bg-card border border-border shadow-sm"
              />
            }
          >
            <Menu className="size-5" />
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-72">
            <DashboardSidebar onClose={() => setSidebarOpen(false)} />
          </SheetContent>
        </Sheet>
      </div>

      <aside className="hidden lg:flex lg:fixed lg:inset-y-0 lg:left-0 lg:z-30 lg:w-64">
        <DashboardSidebar />
      </aside>

      <main className="flex-1 min-h-screen lg:pl-64">{children}</main>
    </div>
  )
}
