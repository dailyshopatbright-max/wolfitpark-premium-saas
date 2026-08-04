import { Clock } from "lucide-react"
import { formatMoney } from "@/components/checkout/validation"

export type OrderLine = { label: string; amount: number }
export type CheckoutOrder = {
  project: string
  invoiceNumber: string
  description: string
  subtotal: number
  tax: number
  discount: number
  processingFee: (method: "ach" | "card") => number
  supportEmail: string
  linesEmail?: string
}

function Row({ label, value, strong = false }: { label: string; value: string; strong?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-3 text-sm">
      <span className={strong ? "font-medium text-foreground" : "text-muted-foreground"}>{label}</span>
      <span className={strong ? "font-semibold text-foreground" : "text-foreground"}>{value}</span>
    </div>
  )
}

export function OrderSummary({
  order,
  method,
}: {
  order: CheckoutOrder
  method: "ach" | "card"
}) {
  const discount = Math.min(order.discount, order.subtotal)
  const fee = order.processingFee(method)
  const total = order.subtotal - discount + order.tax + fee

  return (
    <div className="space-y-5">
      <div>
        <p className="text-xs font-semibold tracking-widest text-primary uppercase">Order Summary</p>
        <h3 className="mt-1 text-xl font-semibold text-foreground">{order.project}</h3>
        <p className="mt-0.5 text-sm text-muted-foreground">
          Invoice <span className="font-mono text-foreground">#{order.invoiceNumber}</span>
        </p>
      </div>

      <p className="rounded-xl border border-border bg-background/30 px-4 py-3 text-sm text-muted-foreground">
        {order.description}
      </p>

      <div className="space-y-2.5">
        <Row label="Subtotal" value={formatMoney(order.subtotal)} />
        {discount > 0 && (
          <Row label="Discount" value={`−${formatMoney(discount)}`} />
        )}
        <Row label="Tax" value={formatMoney(order.tax)} />
        <Row label="Processing fee" value={formatMoney(fee)} />
        <div className="h-px bg-border" />
        <Row label="Total due" value={formatMoney(total)} strong />
      </div>

      <div className="flex items-start gap-2.5 rounded-xl border border-border bg-muted/40 px-4 py-3 text-sm text-muted-foreground">
        <Clock className="mt-0.5 size-4 shrink-0 text-primary" />
        <span>
          {method === "ach"
            ? "Estimated processing: 1–3 business days after authorization."
            : "Instant authorization. Funds settle within 1 business day (3 for Amex)."}
        </span>
      </div>

      <div className="flex flex-col gap-1 text-sm text-muted-foreground">
        <span>Questions about this invoice?</span>
        <a href={`mailto:${order.linesEmail ?? order.supportEmail}`} className="text-primary underline-offset-4 hover:underline">
          {order.linesEmail ?? order.supportEmail}
        </a>
      </div>
    </div>
  )
}