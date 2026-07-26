"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { ChevronDown, Menu, Search } from "lucide-react"
import { Logo } from "@/components/logo"
import { navGroups } from "@/lib/site-data"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

const links = [["About", "/about"], ["Insights", "/blog"]] as const

export function SiteHeader() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  return <>
    <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-2xl">
      <div className="container-site flex h-16 items-center justify-between gap-5">
        <Logo />
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main navigation">
          {navGroups.map(group => (
            <DropdownMenu key={group.label}>
              <DropdownMenuTrigger render={<Button variant="ghost" className={cn(pathname.startsWith(group.href) && "bg-muted")} />}>
                {group.label}
                <ChevronDown data-icon="inline-end" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="center" className="w-80 p-2">
                <DropdownMenuGroup>
                  {group.items.map(([title, description]) => (
                    <DropdownMenuItem key={title} render={<Link href={group.href} className="flex flex-col items-start gap-1 p-3" />}>
                      <span className="font-medium">{title}</span>
                      <span className="text-xs font-normal text-muted-foreground">{description}</span>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuGroup>
                <DropdownMenuGroup>
                  <DropdownMenuItem render={<Link href={group.href} className="font-medium text-primary" />}>
                    Explore all {group.label.toLowerCase()}
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          ))}
          {links.map(([label, href]) => (
            <Button key={href} variant="ghost" render={<Link href={href} />} nativeButton={false} className={cn(pathname.startsWith(href) && "bg-muted")}>
              {label}
            </Button>
          ))}
        </nav>
        <div className="flex items-center gap-1.5">
          <Button variant="ghost" size="icon" aria-label="Search"><Search /></Button>
          <Button className="hidden sm:inline-flex" render={<Link href="/consultation" />} nativeButton={false}>Get started</Button>
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger render={<Button variant="outline" size="icon" className="lg:hidden" aria-label="Open navigation" />}>
              <Menu />
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle><Logo /></SheetTitle>
                <SheetDescription>Software, AI, and business systems for ambitious teams.</SheetDescription>
              </SheetHeader>
              <nav className="flex flex-col gap-2 px-4" aria-label="Mobile navigation">
                {[...navGroups.map(g => [g.label, g.href] as const), ...links].map(([label, href]) => (
                  <Button key={href} variant={pathname.startsWith(href) ? "secondary" : "ghost"} className="justify-start" render={<Link href={href} onClick={() => setMobileOpen(false)} />} nativeButton={false}>
                    {label}
                  </Button>
                ))}
              </nav>
              <div className="mt-auto p-4">
                <Button className="w-full" render={<Link href="/consultation" onClick={() => setMobileOpen(false)} />} nativeButton={false}>
                  Start a project
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  </>
}
