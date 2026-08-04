import type { Metadata } from "next"
import { Checkout } from "@/components/checkout/checkout"

export const metadata: Metadata = {
  title: "Secure Checkout — Wolfitpark LLC",
  description:
    "Pay your Wolfitpark LLC invoice securely by ACH eCheck or credit/debit card. Bank-level encryption, PCI DSS compliant checkout.",
  robots: { index: false, follow: false },
}

export default function CheckoutPage() {
  return <Checkout />
}