import { cn } from "@/lib/utils"

function VisaMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 16" role="img" aria-label="Visa" className={className} fill="none">
      <title>Visa</title>
      <path
        d="M17.4 1.2 13.1 14.8h-4.1L5.9 4.6c-.2-.9-.5-1.2-1.1-1.6C3.9 2.4 2.6 2 1.4 1.7v-.4h6.5c.9 0 1.6.6 1.7 1.7l1.6 8.3 3.8-10h4.4Zm8.3 8.2c0-3.2 4.5-3.4 4.5-4.8 0-.4-.4-.9-1.4-.9-1.2 0-2.6.4-3.5.8l-.6-2.9C26.1 1.3 27.6 1 29 1c4 0 6.6 1.9 6.6 5.2 0 3.7-5.2 3.9-5.2 5.3 0 .4.5.9 1.5.9.9 0 2-.2 2.7-.5l.6 2.8c-.8.3-1.9.5-3.3.5-3.9.1-6.6-1.8-6.6-5Zm12.6 5.4H45l-3.2-8.5c1.2-.3 2.4-.7 3.4-1.2l-.7 2.8c.6-.3 1.6-.6 2.4-.6l1.7 4.2 1.3-7.4h4L48.2 14.8h-4.1l-2.3-6.1L40.8 14.8h-2.5Zm-13.5.9c-1.5.3-2.8.4-3.6.4-3 0-4.4-1-4.6-2.8-.4-2.8 2.2-3.6 3.2-4.1.7-.4 1.5-.8 1.5-1.1 0-.4-.4-.6-1.1-.6-.9 0-1.9.2-2.7.6l-.5-2.8c1.1-.4 2.3-.6 3.4-.6 3.1 0 4.7 1.6 4.6 3.8-.1 3.7-2.8 4-3.6 4.8-.6.7.5 1.2 1.3 1.2.7 0 1.4-.1 2.2-.3l-.4 3.4Z"
        fill="currentColor"
      />
    </svg>
  )
}

function MastercardMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 36 22" role="img" aria-label="Mastercard" className={className} fill="none">
      <title>Mastercard</title>
      <circle cx="13" cy="11" r="10" fill="#EB001B" />
      <circle cx="23" cy="11" r="10" fill="#F79E1B" />
      <path d="M18 2.7a10 10 0 0 1 0 16.6 10 10 0 0 1 0-16.6Z" fill="#FF5F00" />
    </svg>
  )
}

function AmexMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 36 22" role="img" aria-label="American Express" className={className} fill="none">
      <title>American Express</title>
      <rect width="36" height="22" rx="3.5" fill="#2E77BC" />
      <path
        d="M4 6h4.3l1.2 2.3L10.7 6H15v8h-2.3v-4.6l-1.4 2.7h-.7l-1.4-2.7V14H7V6Zm10.3 0h2.6l2.6 3.2 2.6-3.2h2.5v8h-2.4V9.2l-2.7 3.2-2.7-3.2V14h-2.5V6ZM6.6 7.6l-.9 1.9h1.8l-.9-1.9Zm18 0v-.8h-4.5V14H24v-3h3.4v-2H24v-.8h3.7V7.6ZM25 6l2.1 4.1L29.2 6H32v8h-2.4V9.9L27.4 14h-.5l-2.2-4.1V14H22.3V6H25Zm-18.7 5.2 2.3 2.8h2.9l-2.4-2.9 2.4-2.9H9.4L6.3 11.2Z"
        fill="#fff"
      />
    </svg>
  )
}

function DiscoverMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 36 22" role="img" aria-label="Discover" className={className} fill="none">
      <title>Discover</title>
      <rect width="36" height="22" rx="3.5" fill="#20124D" />
      <circle cx="12" cy="11" r="7" fill="url(#discGrad)" />
      <defs>
        <linearGradient id="discGrad" x1="5" y1="11" x2="19" y2="11" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F76B1C" />
          <stop offset="1" stopColor="#F9A825" />
        </linearGradient>
      </defs>
      <text
        x="21"
        y="15"
        fill="#fff"
        fontSize="8.5"
        fontFamily="Arial, Helvetica, sans-serif"
        fontWeight="700"
        letterSpacing="1"
      >
        DISCOVER
      </text>
    </svg>
  )
}

const brands = [VisaMark, MastercardMark, AmexMark, DiscoverMark]

export function CardLogos({
  className,
  size = "md",
}: {
  className?: string
  size?: "sm" | "md" | "lg"
}) {
  const sizes = {
    sm: "h-4",
    md: "h-5",
    lg: "h-6",
  } as const

  return (
    <ul
      className={cn("flex items-center gap-2", className)}
      aria-label="Accepted payment methods: Visa, Mastercard, American Express, Discover"
    >
      {brands.map((Brand) => (
        <li
          key={Brand.name}
          className="flex h-8 items-center justify-center rounded-lg border border-white/15 bg-white/5 px-2"
        >
          <Brand className={cn(sizes[size], "text-white/95")} />
        </li>
      ))}
    </ul>
  )
}

export function AcceptedPaymentBadge({
  label = "Accepted Payment Methods",
  className,
  size = "sm",
}: {
  label?: string
  className?: string
  size?: "sm" | "md"
}) {
  return (
    <div className={cn("flex flex-col items-center gap-2.5", className)}>
      <p className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
        <LockGlyph />
        {label}
      </p>
      <CardLogos size={size} />
    </div>
  )
}

function LockGlyph() {
  return (
    <svg viewBox="0 0 24 24" className="size-3.5 text-primary" fill="none" aria-hidden="true">
      <path
        d="M7 10V7a5 5 0 0 1 10 0v3m-9 0h8a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}