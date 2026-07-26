import Link from "next/link"
import { Logo } from "@/components/logo"

const company = [["About", "/about"], ["Careers", "/careers"], ["Partners", "/partners"], ["Contact", "/contact"]] as const
const services = [["Custom Software", "/services"], ["AI & Automation", "/services"], ["Cloud & Data", "/services"], ["All Services", "/services"]] as const
const solutions = [["For Startups", "/solutions"], ["For Operations", "/solutions"], ["By Industry", "/solutions"], ["All Solutions", "/solutions"]] as const
const resources = [["Blog", "/blog"], ["FAQ", "/faq"], ["Documentation", "/docs"], ["API", "/api"]] as const
const legal = [["Privacy Policy", "/privacy"], ["Terms & Conditions", "/terms"], ["Refund Policy", "/refund"], ["Shipping Policy", "/shipping"], ["Cookie Policy", "/cookies"]] as const
const incorporation = [["Start Company", "/incorporation"], ["State Comparison", "/incorporation/states"], ["Dashboard", "/dashboard"]] as const

const linkGroups = [
  { title: "Company", links: company },
  { title: "Services", links: services },
  { title: "Solutions", links: solutions },
  { title: "Resources", links: resources },
  { title: "Legal", links: legal },
  { title: "Incorporation", links: incorporation },
] as const

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-[#020617] text-[#f7faff]">
      <div className="relative overflow-hidden">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-[0.03] [mask-image:radial-gradient(ellipse_at_center,white,transparent)]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }} />
        <div className="container-site py-16">
          <div className="grid gap-12 lg:grid-cols-[1.2fr_2fr]">
            <div className="max-w-md">
              <Logo className="[&_span]:text-white" />
              <p className="mt-5 text-sm leading-relaxed text-white/65">
                We build intelligent software, connected operations, and digital products that help organizations move with clarity.
              </p>
              <div className="mt-6 flex flex-col gap-3 text-sm text-white/65">
                <span className="flex items-center gap-2">
                  <span className="size-1.5 rounded-full bg-primary" />
                  30 N Gould St, Sheridan, WY 82801
                </span>
                <a href="mailto:support@wolfitpark.online" className="flex items-center gap-2 hover:text-white transition-colors">
                  <span className="size-1.5 rounded-full bg-primary" />
                  support@wolfitpark.online
                </a>
                <span className="flex items-center gap-2">
                  <span className="size-1.5 rounded-full bg-primary" />
                  +1 (307) 555-0199
                </span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-3">
              {linkGroups.map(group => (
                <div key={group.title}>
                  <h3 className="text-sm font-semibold text-white/90">{group.title}</h3>
                  <ul className="mt-4 flex flex-col gap-3">
                    {group.links.map(([label, href]) => (
                      <li key={`${group.title}-${label}`}>
                        <Link className="text-sm text-white/60 transition-colors hover:text-white" href={href}>
                          {label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-6 border-t border-white/15 pt-8 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between">
            <p>&copy; 2026 Wolfitpark. All rights reserved.</p>
            <div className="flex flex-wrap items-center gap-4">
              <Link href="/privacy" className="transition-colors hover:text-white">Privacy</Link>
              <Link href="/terms" className="transition-colors hover:text-white">Terms</Link>
              <Link href="/refund" className="transition-colors hover:text-white">Refunds</Link>
              <Link href="/shipping" className="transition-colors hover:text-white">Shipping</Link>
              <Link href="/cookies" className="transition-colors hover:text-white">Cookies</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
