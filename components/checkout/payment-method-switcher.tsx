"use client"

import { motion } from "framer-motion"
import { Landmark, CreditCard } from "lucide-react"
import { cn } from "@/lib/utils"
import type { PaymentMethod } from "@/components/checkout/validation"

const options: { id: PaymentMethod; label: string; sub: string; icon: typeof Landmark }[] = [
  { id: "ach", label: "ACH eCheck", sub: "Bank account", icon: Landmark },
  { id: "card", label: "Card Payment", sub: "Credit / Debit", icon: CreditCard },
]

export function PaymentMethodSwitcher({
  value,
  onChange,
}: {
  value: PaymentMethod
  onChange: (v: PaymentMethod) => void
}) {
  return (
    <div
      role="tablist"
      aria-label="Payment method"
      className="relative grid grid-cols-2 gap-1 rounded-2xl border border-input bg-muted/40 p-1.5"
    >
      {options.map(({ id, label, sub, icon: Icon }) => {
        const active = value === id
        return (
          <button
            key={id}
            role="tab"
            id={`tab-${id}`}
            aria-selected={active}
            aria-controls={`panel-${id}`}
            type="button"
            onClick={() => onChange(id)}
            className={cn(
              "relative flex items-center justify-center gap-2.5 rounded-xl px-4 py-3 text-left outline-none transition-colors",
              "focus-visible:ring-3 focus-visible:ring-ring/50"
            )}
          >
            {active && (
              <motion.span
                layoutId="method-pill"
                className="absolute inset-0 rounded-xl bg-card shadow-sm ring-1 ring-foreground/10"
                transition={{ type: "spring", stiffness: 380, damping: 32 }}
              />
            )}
            <span className="relative z-10 flex items-center gap-2.5">
              <span
                className={cn(
                  "grid size-9 shrink-0 place-items-center rounded-lg border transition-colors",
                  active
                    ? "border-primary/30 bg-primary/10 text-primary"
                    : "border-border bg-background/40 text-muted-foreground"
                )}
              >
                <Icon className="size-4.5" />
              </span>
              <span className="flex flex-col leading-tight">
                <span className={cn("text-sm font-medium", active ? "text-foreground" : "text-muted-foreground")}>
                  {label}
                </span>
                <span className={cn("text-xs", active ? "text-muted-foreground" : "text-muted-foreground/70")}>
                  {sub}
                </span>
              </span>
            </span>
          </button>
        )
      })}
    </div>
  )
}