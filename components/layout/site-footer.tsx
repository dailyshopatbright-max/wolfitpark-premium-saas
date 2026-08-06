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
                  701 Amy Cir, Bryant, AR 72022
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
          <div className="mt-6 flex flex-col items-center justify-between gap-4 border-t border-white/15 pt-6 sm:flex-row">
            <div className="flex items-center gap-2 text-xs text-white/60">
              <svg viewBox="0 0 24 24" className="size-4 text-white/70" fill="none" aria-hidden="true">
                <path d="M12 2 4 5.5v5.6c0 4.9 3.4 9.6 8 10.9 4.6-1.3 8-6 8-10.9V5.5L12 2Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
                <path d="m8.7 11.8 2.3 2.3 4.3-4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span>Secure Payments · SSL Encrypted · PCI DSS Compliant</span>
            </div>
            <div className="flex flex-col items-center gap-2 sm:items-end">
              <span className="text-[11px] tracking-wide text-white/50 uppercase">We Accept</span>
              <ul className="flex items-center gap-2" aria-label="Accepted payment methods: Visa, Mastercard, American Express, Discover">
                <li className="flex h-7 items-center justify-center rounded-md border border-white/15 bg-white/5 px-2">
                  <svg viewBox="0 0 48 16" role="img" aria-label="Visa" className="h-3 text-white/95" fill="none"><title>Visa</title><path d="M17.4 1.2 13.1 14.8h-4.1L5.9 4.6c-.2-.9-.5-1.2-1.1-1.6C3.9 2.4 2.6 2 1.4 1.7v-.4h6.5c.9 0 1.6.6 1.7 1.7l1.6 8.3 3.8-10h4.4Zm8.3 8.2c0-3.2 4.5-3.4 4.5-4.8 0-.4-.4-.9-1.4-.9-1.2 0-2.6.4-3.5.8l-.6-2.9C26.1 1.3 27.6 1 29 1c4 0 6.6 1.9 6.6 5.2 0 3.7-5.2 3.9-5.2 5.3 0 .4.5.9 1.5.9.9 0 2-.2 2.7-.5l.6 2.8c-.8.3-1.9.5-3.3.5-3.9.1-6.6-1.8-6.6-5Zm12.6 5.4H45l-3.2-8.5c1.2-.3 2.4-.7 3.4-1.2l-.7 2.8c.6-.3 1.6-.6 2.4-.6l1.7 4.2 1.3-7.4h4L48.2 14.8h-4.1l-2.3-6.1L40.8 14.8h-2.5Zm-13.5.9c-1.5.3-2.8.4-3.6.4-3 0-4.4-1-4.6-2.8-.4-2.8 2.2-3.6 3.2-4.1.7-.4 1.5-.8 1.5-1.1 0-.4-.4-.6-1.1-.6-.9 0-1.9.2-2.7.6l-.5-2.8c1.1-.4 2.3-.6 3.4-.6 3.1 0 4.7 1.6 4.6 3.8-.1 3.7-2.8 4-3.6 4.8-.6.7.5 1.2 1.3 1.2.7 0 1.4-.1 2.2-.3l-.4 3.4Z" fill="currentColor" /></svg>
                </li>
                <li className="flex h-7 items-center justify-center rounded-md border border-white/15 bg-white/5 px-2">
                  <svg viewBox="0 0 36 22" role="img" aria-label="Mastercard" className="h-3.5" fill="none"><title>Mastercard</title><circle cx="13" cy="11" r="10" fill="#EB001B" /><circle cx="23" cy="11" r="10" fill="#F79E1B" /><path d="M18 2.7a10 10 0 0 1 0 16.6 10 10 0 0 1 0-16.6Z" fill="#FF5F00" /></svg>
                </li>
                <li className="flex h-7 items-center justify-center rounded-md border border-white/15 bg-white/5 px-2">
                  <svg viewBox="0 0 36 22" role="img" aria-label="American Express" className="h-3.5" fill="none"><title>American Express</title><rect width="36" height="22" rx="3.5" fill="#2E77BC" /><path d="M4 6h4.3l1.2 2.3L10.7 6H15v8h-2.3v-4.6l-1.4 2.7h-.7l-1.4-2.7V14H7V6Zm10.3 0h2.6l2.6 3.2 2.6-3.2h2.5v8h-2.4V9.2l-2.7 3.2-2.7-3.2V14h-2.5V6ZM6.6 7.6l-.9 1.9h1.8l-.9-1.9Zm18 0v-.8h-4.5V14H24v-3h3.4v-2H24v-.8h3.7V7.6ZM25 6l2.1 4.1L29.2 6H32v8h-2.4V9.9L27.4 14h-.5l-2.2-4.1V14H22.3V6H25Zm-18.7 5.2 2.3 2.8h2.9l-2.4-2.9 2.4-2.9H9.4L6.3 11.2Z" fill="#fff" /></svg>
                </li>
                <li className="flex h-7 items-center justify-center rounded-md border border-white/15 bg-white/5 px-2">
                  <svg viewBox="0 0 36 22" role="img" aria-label="Discover" className="h-3.5" fill="none"><title>Discover</title><rect width="36" height="22" rx="3.5" fill="#20124D" /><circle cx="12" cy="11" r="7" fill="#F76B1C" /></svg>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
