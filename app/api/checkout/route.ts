import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { getCloudflareContext } from "@opennextjs/cloudflare"
import { createCheckout } from "@/lib/payments-store"

const schema = z.object({
  method: z.enum(["ach", "card"]),
  amount: z.number().positive(),
  invoiceNumber: z.string().min(1),
  email: z.string().email(),
  customerName: z.string().min(1),
})

export async function POST(request: NextRequest) {
  try {
    const db = (await getCloudflareContext()).env.DB as D1Database
    const parsed = schema.safeParse(await request.json())
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid payment payload" }, { status: 400 })
    }

    const { method, amount, invoiceNumber, email, customerName } = parsed.data
    const transactionId = `txn_${Date.now().toString(36)}${Math.random().toString(36).slice(2, 10)}`
    const receiptNumber = `RCPT-${Math.random().toString(36).slice(2, 9).toUpperCase()}`

    await createCheckout(db, {
      id: transactionId,
      invoiceNumber,
      method,
      amount,
      email,
      customerName,
      status: "succeeded",
      createdAt: new Date().toISOString(),
    })

    return NextResponse.json({
      success: true,
      transactionId,
      receiptNumber,
    })
  } catch {
    return NextResponse.json({ error: "Payment processing failed" }, { status: 500 })
  }
}