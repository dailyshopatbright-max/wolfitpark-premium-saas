"use client"

import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { LockKeyhole } from "lucide-react"
import { PaymentMethodSwitcher } from "@/components/checkout/payment-method-switcher"
import { OrderSummary, type CheckoutOrder } from "@/components/checkout/order-summary"
import { SecurityBadges, TrustSection, SecurityFooterNote } from "@/components/checkout/security-badges"
import { ACHForm } from "@/components/checkout/ach-form"
import { CardForm } from "@/components/checkout/card-form"
import { LoadingOverlay, SuccessView, ErrorView, type ReceiptData } from "@/components/checkout/status-views"
import { Logo } from "@/components/logo"
import { todayStamp, formatMoney, type PaymentMethod, type ACHOutput, type CardOutput } from "@/components/checkout/validation"
import { cn } from "@/lib/utils"

const DEMO_ORDER: CheckoutOrder = {
  project: "Software Development Retainer",
  invoiceNumber: "INV-2026-0184",
  description: "Phase 2 — AI automation platform build, 3-month engagement. Includes architecture, development, and deployment.",
  subtotal: 12500,
  tax: 0,
  discount: 500,
  processingFee: (method) => (method === "card" ? Math.round((12500 - 500) * 0.029 + 0.3 * 100) / 100 : 0),
  supportEmail: "support@wolfitpark.online",
}

function orderTotal(order: CheckoutOrder, method: PaymentMethod) {
  return order.subtotal - order.discount + order.tax + order.processingFee(method)
}

export function Checkout() {
  const [method, setMethod] = useState<PaymentMethod>("ach")
  const [phase, setPhase] = useState<"form" | "processing" | "success" | "error">("form")
  const [receipt, setReceipt] = useState<ReceiptData | null>(null)

  const amount = orderTotal(DEMO_ORDER, method)

  async function handlePay(data: ACHOutput | CardOutput) {
    setPhase("processing")
    const email = "email" in data ? data.email : ""
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          method,
          amount,
          invoiceNumber: DEMO_ORDER.invoiceNumber,
          email,
          customerName: "customerName" in data ? data.customerName : data.cardholderName,
        }),
      })
      const body = (await res.json()) as {
        success: boolean
        transactionId?: string
        receiptNumber?: string
      }
      if (!res.ok || !body.success || !body.transactionId || !body.receiptNumber) {
        setPhase("error")
        return
      }
      const now = new Date()
      setReceipt({
        transactionId: body.transactionId,
        method,
        date: todayStamp(),
        amount,
        receiptNumber: body.receiptNumber,
        invoiceNumber: DEMO_ORDER.invoiceNumber,
        email,
        order: DEMO_ORDER,
      })
      setPhase("success")
    } catch {
      setPhase("error")
    }
  }

  function downloadReceipt() {
    if (!receipt) return
    const lines = [
      "WOLFITPARK LLC — PAYMENT RECEIPT",
      "===============================",
      `Project:            ${receipt.order.project}`,
      `Invoice number:     #${receipt.invoiceNumber}`,
      `Receipt number:     ${receipt.receiptNumber}`,
      `Transaction ID:     ${receipt.transactionId}`,
      `Payment method:     ${receipt.method === "ach" ? "ACH eCheck (Bank account)" : "Credit / Debit Card"}`,
      `Date:               ${receipt.date}`,
      `Total paid:         ${formatMoney(receipt.amount)}`,
      "",
      "Authorization note (ACH): you authorize Wolfitpark LLC to debit your",
      "designated account via the ACH Network. You may revoke future recurring",
      "authorizations by contacting support@wolfitpark.online before the next",
      "scheduled payment.",
      "",
      "Thank you for your business.",
      "support@wolfitpark.online · wolfitpark.com",
    ]
    const blob = new Blob([lines.join("\n")], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `wolfitpark-receipt-${receipt.receiptNumber}.txt`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="relative mx-auto w-full max-w-6xl px-4 pt-12 pb-24 sm:px-6">
      <AnimatePresence mode="wait">
        {phase === "processing" ? (
          <LoadingOverlay key="loading" method={method} />
        ) : null}
      </AnimatePresence>

      {phase === "success" && receipt ? (
        <SuccessView receipt={receipt} onDownload={downloadReceipt} onDone={() => setPhase("form")} />
      ) : phase === "error" ? (
        <ErrorView onRetry={() => setPhase("form")} onSupport={() => (window.location.href = "mailto:support@wolfitpark.online")} />
      ) : (
        <motion.div key="checkout" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
          <header className="mb-8 text-center">
            <div className="mb-4 flex items-center justify-center gap-2.5">
              <Logo className="h-9 w-auto" />
              <span className="text-sm font-semibold tracking-tight text-foreground">Wolfitpark LLC</span>
            </div>
            <p className="text-xs font-medium tracking-widest text-primary uppercase">Secure Checkout</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">Complete your payment</h1>
            <p className="mt-2 flex items-center justify-center gap-1.5 text-sm text-muted-foreground">
              <LockKeyhole className="size-3.5 text-primary" />
              Protected with bank-level encryption · SSL Secure · PCI DSS
            </p>
          </header>

          <div className="grid gap-6 lg:grid-cols-[1fr_1.15fr] lg:gap-10">
            <aside className="order-2 space-y-5 lg:order-1">
              <motion.section
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="rounded-3xl border border-border bg-card/70 p-6 shadow-xl backdrop-blur-sm"
              >
                <OrderSummary order={DEMO_ORDER} method={method} />
              </motion.section>

              <motion.section
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.18 }}
                className="space-y-4"
              >
                <div className="rounded-3xl border border-border bg-card/60 p-5">
                  <SecurityBadges method={method} />
                </div>
                <div className="rounded-3xl border border-border bg-card/60 p-5">
                  <TrustSection />
                </div>
                <div className="px-1">
                  <SecurityFooterNote />
                </div>
              </motion.section>
            </aside>

            <motion.section
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.12 }}
              className="order-1 lg:order-2"
            >
              <div className="rounded-3xl border border-border bg-card/70 p-6 shadow-xl backdrop-blur-sm sm:p-8">
                <PaymentMethodSwitcher value={method} onChange={setMethod} />

                <div className="mt-6">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={method}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.22 }}
                      role="tabpanel"
                      id={`panel-${method}`}
                      aria-labelledby={`tab-${method}`}
                    >
                      {method === "ach" ? (
                        <ACHForm amount={amount} invoiceNumber={DEMO_ORDER.invoiceNumber} processing={phase === "processing"} onPay={handlePay} />
                      ) : (
                        <CardForm amount={amount} invoiceNumber={DEMO_ORDER.invoiceNumber} processing={phase === "processing"} onPay={handlePay} />
                      )}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </motion.section>
          </div>

          <footer className={cn("mt-12 flex flex-col items-center justify-between gap-3 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row")}>
            <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
              <a href="/terms" className="transition-colors hover:text-foreground">Terms of Service</a>
              <a href="/privacy" className="transition-colors hover:text-foreground">Privacy Policy</a>
              <a href="/refund" className="transition-colors hover:text-foreground">Refund Policy</a>
              <a href="/support" className="transition-colors hover:text-foreground">Contact Support</a>
            </div>
            <span>Powered by Wolfitpark LLC</span>
          </footer>
        </motion.div>
      )}
    </div>
  )
}