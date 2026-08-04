import type { Metadata } from "next"
import { Checkout } from "@/components/checkout/checkout"
import type { CheckoutOrder } from "@/components/checkout/order-summary"

export const metadata: Metadata = {
  title: "Secure Checkout — Wolfitpark LLC",
  description:
    "Pay your Wolfitpark LLC invoice securely by ACH eCheck or credit/debit card. Bank-level encryption, PCI DSS compliant checkout.",
  robots: { index: false, follow: false },
}

const DEMO_ORDER: CheckoutOrder = {
  project: "Software Development Retainer",
  invoiceNumber: "INV-2026-0184",
  description:
    "Phase 2 — AI automation platform build, 3-month engagement. Includes architecture, development, and deployment.",
  subtotal: 12500,
  tax: 0,
  discount: 500,
  processingFee: { card: Math.round((12500 - 500) * 0.029 + 0.3 * 100) / 100, ach: 0 },
  supportEmail: "support@wolfitpark.online",
}

function buildOrder(params: URLSearchParams): CheckoutOrder {
  const project = params.get("project")?.trim()
  const invoice = params.get("invoice")?.trim()
  const description = params.get("description")?.trim()
  const amount = Number(params.get("amount"))

  if (amount > 0) {
    return {
      project: project || "Wolfitpark Service Invoice",
      invoiceNumber: invoice || "INV-2026",
      description: description || "Payment for services rendered by Wolfitpark LLC.",
      subtotal: amount,
      tax: 0,
      discount: 0,
      processingFee: { ach: 0, card: 0 },
      supportEmail: "support@wolfitpark.online",
    }
  }

  return DEMO_ORDER
}

export default async function CheckoutPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const params = new URLSearchParams()
  const sp = await searchParams
  for (const [k, v] of Object.entries(sp)) {
    if (typeof v === "string") params.set(k, v)
  }
  return <Checkout order={buildOrder(params)} />
}