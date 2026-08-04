"use client"

import { motion } from "framer-motion"
import {
  LoaderCircle,
  Download,
  RotateCcw,
  ArrowRight,
  ShieldCheck,
  XCircle,
  Landmark,
  CreditCard,
  Construction,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { formatMoney, type PaymentMethod } from "@/components/checkout/validation"
import type { CheckoutOrder } from "@/components/checkout/order-summary"

const processingSteps = [
  "Encrypting payment details",
  "Running fraud & verification checks",
  "Confirming with the payment network",
]

export function LoadingOverlay({ method }: { method: PaymentMethod }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 p-6 backdrop-blur-md"
      role="status"
      aria-live="polite"
      aria-label="Processing payment"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-sm rounded-3xl border border-border bg-card p-8 text-center shadow-2xl"
      >
        <div className="relative mx-auto size-16">
          <motion.span
            className="absolute inset-0 rounded-full bg-primary/20"
            animate={{ scale: [1, 1.35, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 1.6, repeat: Infinity }}
          />
          <div className="relative grid size-16 place-items-center rounded-2xl bg-gradient-to-b from-primary to-primary/80 text-primary-foreground">
            {method === "ach" ? (
              <Landmark className="size-7" aria-hidden="true" />
            ) : (
              <CreditCard className="size-7" aria-hidden="true" />
            )}
          </div>
        </div>
        <h3 className="mt-6 text-lg font-semibold">Processing Secure Payment...</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Please do not close or refresh this window.
        </p>
        <motion.ul className="mt-5 space-y-2 text-left text-sm text-muted-foreground">
          {processingSteps.map((s, i) => (
            <motion.li
              key={s}
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + i * 0.5 }}
              className="flex items-center gap-2"
            >
              <LoaderCircle className="size-3.5 animate-spin text-primary" />
              {s}
            </motion.li>
          ))}
        </motion.ul>
      </motion.div>
    </div>
  )
}

export type ReceiptData = {
  transactionId: string
  method: PaymentMethod
  date: string
  amount: number
  receiptNumber: string
  invoiceNumber: string
  email: string
  order: CheckoutOrder
}

export function SuccessView({
  receipt,
  onDownload,
  onDone,
}: {
  receipt: ReceiptData
  onDownload?: () => void
  onDone: () => void
}) {
  return (
    <div className="mx-auto w-full max-w-lg py-10">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 16 }}
          className="mx-auto grid size-20 place-items-center rounded-full bg-emerald/15 text-emerald"
        >
          <motion.svg
            viewBox="0 0 24 24"
            className="size-10"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <motion.path
              d="M4 12.5 9.5 18 20 6.5"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.7, delay: 0.3 }}
            />
          </motion.svg>
        </motion.div>
        <h1 className="mt-5 text-2xl font-semibold">Payment Successful</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {receipt.method === "ach"
            ? "Your ACH authorization was received. Funds arrive within 1–3 business days."
            : "Your payment was authorized instantly."}
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        className="mt-8 rounded-3xl border border-border bg-card"
      >
        <ReceiptComponent receipt={receipt} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-4 flex items-center justify-center gap-2 text-sm text-muted-foreground"
      >
        A receipt has been emailed to {receipt.email}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"
      >
        <Button onClick={onDownload} variant="outline" size="lg">
          <Download data-icon="inline-start" />
          Download receipt
        </Button>
        <Button onClick={onDone} size="lg">
          Return to Dashboard
          <ArrowRight data-icon="inline-end" />
        </Button>
      </motion.div>
    </div>
  )
}

export function ErrorView({
  onRetry,
  onSupport,
}: {
  onRetry: () => void
  onSupport: () => void
}) {
  return (
    <div className="mx-auto w-full max-w-md py-16 text-center">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 16 }}
        className="mx-auto grid size-20 place-items-center rounded-full bg-destructive/15 text-destructive"
      >
        <XCircle className="size-10" />
      </motion.div>
      <h1 className="mt-5 text-2xl font-semibold">Transaction failed</h1>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        We couldn't complete your payment. Please verify your payment information or try another
        payment method.
      </p>
      <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <Button onClick={onRetry} size="lg">
          <RotateCcw data-icon="inline-start" />
          Try again
        </Button>
        <Button onClick={onSupport} variant="outline" size="lg">
          Contact support
        </Button>
      </div>
    </div>
  )
}

export function UnavailableView({
  onRetry,
  onSupport,
}: {
  onRetry: () => void
  onSupport: () => void
}) {
  return (
    <div className="mx-auto w-full max-w-md py-16 text-center">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 16 }}
        className="mx-auto grid size-20 place-items-center rounded-full bg-primary/10 text-primary"
      >
        <Construction className="size-10" />
      </motion.div>
      <h1 className="mt-5 text-2xl font-semibold">Payment processing unavailable</h1>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        We&apos;re working on it. Payment processing is temporarily unavailable — please try again
        later. No payment has been charged.
      </p>
      <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <Button onClick={onRetry} size="lg">
          <RotateCcw data-icon="inline-start" />
          Try again
        </Button>
        <Button onClick={onSupport} variant="outline" size="lg">
          Contact support
        </Button>
      </div>
    </div>
  )
}

export function ReceiptComponent({ receipt }: { receipt: ReceiptData }) {
  return (
    <div className="space-y-5 p-7">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-lg font-semibold">{receipt.order.project}</p>
          <p className="text-xs text-muted-foreground">Receipt #{receipt.receiptNumber}</p>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald/30 bg-emerald/10 px-3 py-1 text-xs font-medium text-emerald">
          <ShieldCheck className="size-3.5" />
          Paid
        </span>
      </div>

      <dl className="space-y-2.5 text-sm">
        {[
          ["Transaction ID", receipt.transactionId],
          [
            "Payment method",
            receipt.method === "ach" ? "ACH eCheck (Bank account)" : "Credit / Debit Card",
          ],
          ["Date", receipt.date],
          ["Invoice number", `#${receipt.invoiceNumber}`],
        ].map(([k, v]) => (
          <div key={k} className="flex items-center justify-between gap-3">
            <dt className="text-muted-foreground">{k}</dt>
            <dd className="font-mono text-foreground">{v}</dd>
          </div>
        ))}
      </dl>

      <div className="h-px bg-border" />

      <div className="flex items-center justify-between">
        <span className="text-sm text-muted-foreground">Total paid</span>
        <span className="text-xl font-semibold">{formatMoney(receipt.amount)}</span>
      </div>
    </div>
  )
}