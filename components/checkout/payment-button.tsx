"use client"

import { motion } from "framer-motion"
import { LockKeyhole, LoaderCircle, ShieldCheck } from "lucide-react"
import { cn } from "@/lib/utils"

export function PaymentButton({
  method,
  processing,
  disabled,
  hint,
  invoiceNumber,
  type = "submit",
}: {
  method: "ach" | "card"
  processing: boolean
  disabled: boolean
  hint: string
  invoiceNumber?: string
  type?: "submit" | "button"
}) {
  return (
    <div className="space-y-2.5">
      <motion.button
        type={type}
        disabled={disabled || processing}
        whileTap={disabled || processing ? undefined : { scale: 0.985 }}
        className={cn(
          "group/btn relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-2xl px-5 py-4 text-sm font-semibold transition-all outline-none",
          "focus-visible:ring-4 focus-visible:ring-ring/40",
          "bg-gradient-to-b from-primary to-primary/85 text-primary-foreground",
          "shadow-[0_8px_32px_-8px_rgba(37,99,235,0.55)]",
          disabled && "cursor-not-allowed opacity-45 shadow-none",
          processing && "opacity-90"
        )}
      >
        {processing ? (
          <LoaderCircle className="size-4.5 animate-spin" aria-hidden="true" />
        ) : (
          <LockKeyhole className="size-4" aria-hidden="true" />
        )}
        <span>
          {processing
            ? "Processing Secure Payment..."
            : method === "ach"
              ? "Authorize ACH Payment"
              : "Pay Now"}
        </span>
      </motion.button>
      <p className="text-center text-xs text-muted-foreground">
        {processing ? "Please don't close this window." : hint}
      </p>
      <p className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground/80">
        <ShieldCheck className="size-3.5 text-primary" />
        Secured by Wolfitpark LLC · {invoiceNumber ? `Invoice #${invoiceNumber}` : "256-bit SSL"}
      </p>
    </div>
  )
}