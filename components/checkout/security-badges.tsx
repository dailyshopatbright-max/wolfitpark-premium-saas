import { ShieldCheck, LockKeyhole, BadgeCheck, RefreshCw, Headphones, Banknote } from "lucide-react"

const methodBadges = [
  { label: "SSL Secure" },
  { label: "PCI DSS Level 1" },
  { label: "Encrypted" },
  { label: "ACH Network" },
  { label: "Nacha Compliant" },
]

const cardBadges: ({ label: string; mark: string } | { label: string; mark?: undefined })[] = [
  { label: "Visa", mark: "VISA" },
  { label: "Mastercard", mark: "MC" },
  { label: "Amex", mark: "AMEX" },
  { label: "Discover", mark: "DISCOVER" },
]

export function SecurityBadges({ method }: { method: "ach" | "card" }) {
  const badges: { label: string; mark?: string }[] =
    method === "ach" ? methodBadges : [...methodBadges.slice(0, 3), ...cardBadges]
  return (
    <div className="flex flex-wrap gap-2">
      {badges.map((b) => (
        <span
          key={b.label}
          className="inline-flex items-center gap-1.5 rounded-full border border-border bg-muted/40 px-3 py-1.5 text-xs font-medium text-muted-foreground"
        >
          <ShieldCheck className="size-3.5 text-primary" />
          {b.mark ? <span className="font-semibold tracking-tight text-foreground">{b.mark}</span> : null}
          {b.label}
        </span>
      ))}
    </div>
  )
}

const trustItems = [
  { icon: Banknote, title: "Bank-level Security", desc: "256-bit AES encryption in transit and at rest" },
  { icon: LockKeyhole, title: "Encrypted Payments", desc: "Tokenized credentials, never stored in plaintext" },
  { icon: ShieldCheck, title: "Secure Checkout", desc: "Real-time fraud detection & verification" },
  { icon: BadgeCheck, title: "Privacy Protected", desc: "Your data stays yours. No selling, ever" },
  { icon: Headphones, title: "24/7 Support", desc: "Real humans. Fast responses" },
  { icon: RefreshCw, title: "Money Protected", desc: "Clear dispute & refund process" },
]

export function TrustSection() {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
      {trustItems.map(({ icon: Icon, title, desc }) => (
        <div
          key={title}
          className="rounded-xl border border-border bg-card/60 p-4"
        >
          <Icon className="size-5 text-primary" />
          <p className="mt-2.5 text-sm font-medium text-foreground">{title}</p>
          <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">{desc}</p>
        </div>
      ))}
    </div>
  )
}

export function SecurityFooterNote() {
  return (
    <p className="flex items-center gap-2 text-xs text-muted-foreground">
      <LockKeyhole className="size-3.5 shrink-0" />
      Protected by PCI DSS Level 1 infrastructure. No banking credentials are ever stored by Wolfitpark LLC.
    </p>
  )
}