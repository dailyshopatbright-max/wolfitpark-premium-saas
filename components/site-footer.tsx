import Link from "next/link"
import { Code2, Link2, MapPin, Mail } from "lucide-react"
import { Logo } from "@/components/logo"
import { NewsletterForm } from "@/components/forms"

const groups = [
  { title: "Company", links: [["About","/about"],["Portfolio","/portfolio"],["Careers","/careers"],["Contact","/contact"]] },
  { title: "Explore", links: [["Services","/services"],["Solutions","/solutions"],["Products","/products"],["Pricing","/pricing"]] },
  { title: "Resources", links: [["Insights","/blog"],["FAQs","/faq"],["Testimonials","/testimonials"],["Consultation","/consultation"]] },
] as const

export function SiteFooter() {
  return <footer className="border-t border-border bg-foreground text-background">
    <div className="container-site py-16">
      <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr]">
        <div className="max-w-md"><Logo className="[&_span]:text-background"/><p className="mt-5 text-sm leading-relaxed text-background/65">We build intelligent software, connected operations, and digital products that help organizations move with clarity.</p><div className="mt-6 flex flex-col gap-3 text-sm text-background/65"><span className="flex items-center gap-2"><MapPin className="size-4 text-primary"/>30 N Gould St, Sheridan, WY 82801</span><a href="mailto:support@wolfitpark.online" className="flex items-center gap-2 hover:text-background"><Mail className="size-4 text-primary"/>support@wolfitpark.online</a></div></div>
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">{groups.map(group=><div key={group.title}><h3 className="text-sm font-semibold text-background">{group.title}</h3><ul className="mt-4 flex flex-col gap-3">{group.links.map(([label,href])=><li key={href}><Link className="text-sm text-background/60 transition-colors hover:text-background" href={href}>{label}</Link></li>)}</ul></div>)}</div>
      </div>
      <div className="my-12 rounded-2xl border border-background/15 bg-background/5 p-6 lg:flex lg:items-center lg:justify-between"><div><p className="font-semibold">Ideas for people building what is next.</p><p className="mt-1 text-sm text-background/60">Monthly field notes on product, AI, cloud, and operations.</p></div><NewsletterForm compact className="mt-5 max-w-lg lg:mt-0"/></div>
      <div className="flex flex-col gap-5 border-t border-background/15 pt-7 text-xs text-background/50 sm:flex-row sm:items-center sm:justify-between"><p>© 2026 Wolfitpark. All rights reserved.</p><div className="flex flex-wrap items-center gap-4"><Link href="/privacy">Privacy</Link><Link href="/terms">Terms</Link><Link href="/cookies">Cookies</Link><a href="https://linkedin.com" aria-label="LinkedIn"><Link2 className="size-4"/></a><a href="https://github.com" aria-label="GitHub"><Code2 className="size-4"/></a></div></div>
    </div>
  </footer>
}
