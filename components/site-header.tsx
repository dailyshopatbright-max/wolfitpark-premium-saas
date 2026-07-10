"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { ChevronDown, Menu, Moon, Search, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Logo } from "@/components/logo"
import { navGroups } from "@/lib/site-data"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

const links = [["Portfolio","/portfolio"],["About","/about"],["Insights","/blog"]] as const

export function SiteHeader() {
  const pathname = usePathname()
  const { resolvedTheme, setTheme } = useTheme()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)

  return <>
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/90 backdrop-blur-xl">
      <div className="container-site flex h-16 items-center justify-between gap-5">
        <Logo />
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main navigation">
          {navGroups.map(group => <DropdownMenu key={group.label}><DropdownMenuTrigger render={<Button variant="ghost" className={cn(pathname.startsWith(group.href) && "bg-muted")}/>}>{group.label}<ChevronDown data-icon="inline-end"/></DropdownMenuTrigger><DropdownMenuContent align="center" className="w-80 p-2"><DropdownMenuGroup>{group.items.map(([title,description])=><DropdownMenuItem key={title} render={<Link href={group.href} className="flex flex-col items-start gap-1 p-3"/>}><span className="font-medium">{title}</span><span className="text-xs font-normal text-muted-foreground">{description}</span></DropdownMenuItem>)}</DropdownMenuGroup><DropdownMenuGroup><DropdownMenuItem render={<Link href={group.href} className="font-medium text-primary"/>}>Explore all {group.label.toLowerCase()}</DropdownMenuItem></DropdownMenuGroup></DropdownMenuContent></DropdownMenu>)}
          {links.map(([label,href])=><Button key={href} variant="ghost" render={<Link href={href}/>} className={cn(pathname.startsWith(href) && "bg-muted")}>{label}</Button>)}
        </nav>
        <div className="flex items-center gap-1.5">
          <Button variant="ghost" size="icon" aria-label="Search" onClick={()=>setSearchOpen(true)}><Search/></Button>
          <Button variant="ghost" size="icon" aria-label="Toggle dark mode" onClick={()=>setTheme(resolvedTheme === "dark" ? "light" : "dark")}>{resolvedTheme === "dark" ? <Sun/> : <Moon/>}</Button>
          <Button className="hidden sm:inline-flex" render={<Link href="/consultation"/>}>Book consultation</Button>
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}><SheetTrigger render={<Button variant="outline" size="icon" className="lg:hidden" aria-label="Open navigation"/>}><Menu/></SheetTrigger><SheetContent><SheetHeader><SheetTitle><Logo /></SheetTitle><SheetDescription>Software, AI, and business systems for ambitious teams.</SheetDescription></SheetHeader><nav className="flex flex-col gap-2 px-4" aria-label="Mobile navigation">{[...navGroups.map(g=>[g.label,g.href] as const),...links,["Pricing","/pricing"] as const,["Contact","/contact"] as const].map(([label,href])=><Button key={href} variant={pathname.startsWith(href)?"secondary":"ghost"} className="justify-start" render={<Link href={href} onClick={()=>setMobileOpen(false)}/>}>{label}</Button>)}</nav><div className="mt-auto p-4"><Button className="w-full" render={<Link href="/consultation" onClick={()=>setMobileOpen(false)}/>}>Start a project</Button></div></SheetContent></Sheet>
        </div>
      </div>
    </header>
    {searchOpen && <div className="fixed inset-0 z-50 flex items-start justify-center bg-foreground/30 px-4 pt-24 backdrop-blur-sm" onMouseDown={()=>setSearchOpen(false)}><div className="w-full max-w-2xl rounded-2xl border border-border bg-popover p-4 shadow-2xl" onMouseDown={e=>e.stopPropagation()} role="dialog" aria-modal="true" aria-label="Search Wolfitpark"><div className="flex items-center gap-3 rounded-xl border border-border bg-background px-4"><Search className="size-5 text-muted-foreground"/><input autoFocus className="h-12 min-w-0 flex-1 bg-transparent text-sm outline-none" placeholder="Search services, products, and insights" onKeyDown={e=>{if(e.key === "Escape") setSearchOpen(false)}}/><button className="text-xs text-muted-foreground" onClick={()=>setSearchOpen(false)}>ESC</button></div><div className="grid gap-2 pt-4 sm:grid-cols-3">{[["Explore services","/services"],["View products","/products"],["Read insights","/blog"]].map(([label,href])=><Link key={href} href={href} onClick={()=>setSearchOpen(false)} className="rounded-lg border border-border p-3 text-sm font-medium transition-colors hover:bg-muted">{label}</Link>)}</div></div></div>}
  </>
}
