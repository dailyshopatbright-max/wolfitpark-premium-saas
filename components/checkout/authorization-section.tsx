"use client"

import { motion } from "framer-motion"
import { FileCheck2 } from "lucide-react"
import { cn } from "@/lib/utils"

export function AuthorizationSection({
  checked,
  onChange,
}: {
  checked: boolean
  onChange: (v: boolean) => void
}) {
  return (
    <div id="ach-authorization" className="rounded-2xl border border-primary/25 bg-primary/[0.04] p-5">
      <div className="flex items-center gap-2.5">
        <span className="grid size-8 place-items-center rounded-lg border border-primary/30 bg-primary/10 text-primary">
          <FileCheck2 className="size-4" />
        </span>
        <div>
          <h4 className="text-sm font-semibold text-foreground">ACH Payment Authorization</h4>
          <p className="text-xs text-muted-foreground">Required by NACHA underwriting — please read carefully</p>
        </div>
      </div>

      <div className="mt-3 rounded-xl border border-border bg-background/40 p-4 text-xs leading-relaxed text-muted-foreground sm:text-[13px]">
        I authorize Wolfitpark LLC to electronically debit my designated bank account through the Automated
        Clearing House (ACH) Network for the amount specified on this page.
        <br />
        <br />
        I certify that I am an authorized signer on this account.
        <br />
        <br />
        I understand this authorization will remain in effect for one-time or recurring payments, depending on my
        selected billing agreement.
        <br />
        <br />
        I understand that I may revoke future recurring authorizations by contacting Wolfitpark LLC before the next
        scheduled payment.
        <br />
        <br />
        I agree to the{" "}
        <a href="/terms" className="underline underline-offset-2 decoration-primary/50 hover:text-foreground">
          Terms of Service
        </a>{" "}
        and{" "}
        <a href="/privacy" className="underline underline-offset-2 decoration-primary/50 hover:text-foreground">
          Privacy Policy
        </a>
        .
      </div>

      <label
        className="mt-3 flex cursor-pointer items-start gap-3 select-none"
        htmlFor="ach-authorize"
      >
        <motion.button
          type="button"
          id="ach-authorize"
          role="checkbox"
          aria-checked={checked}
          aria-labelledby="ach-authorize-text"
          onClick={() => onChange(!checked)}
          whileTap={{ scale: 0.92 }}
          className={cn(
            "mt-0.5 grid size-5 shrink-0 place-items-center rounded-md border transition-colors focus-visible:ring-3 focus-visible:ring-ring/50",
            checked ? "border-primary bg-primary text-primary-foreground" : "border-input bg-background/40"
          )}
        >
          {checked && (
            <svg viewBox="0 0 12 12" className="size-3" fill="none" aria-hidden="true">
              <motion.path
                d="M2 6.5 4.5 9 10 3"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.2 }}
              />
            </svg>
          )}
        </motion.button>
        <span id="ach-authorize-text" className="text-sm font-medium text-foreground">
          I authorize this ACH payment.
        </span>
      </label>
    </div>
  )
}