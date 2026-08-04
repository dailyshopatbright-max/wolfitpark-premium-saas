import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import jwt from "jsonwebtoken"
import { getCloudflareContext } from "@opennextjs/cloudflare"
import { createCheckout, listCheckouts } from "@/lib/payments-store"

const JWT_SECRET = "wolfitpark-secret-key-2026"

function getTokenFromCookies(request: NextRequest): string | null {
  const cookieHeader = request.headers.get("cookie")
  if (!cookieHeader) return null
  const match = cookieHeader.match(/(?:^|;\s*)token=([^;]+)/)
  return match ? match[1] : null
}

function verifyAdmin(request: NextRequest): boolean {
  const token = getTokenFromCookies(request)
  if (!token) return false
  try {
    const payload = jwt.verify(token, JWT_SECRET) as { role?: string }
    return payload.role === "admin"
  } catch {
    return false
  }
}

export async function GET(request: NextRequest) {
  try {
    if (!verifyAdmin(request)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
    const db = (await getCloudflareContext()).env.DB as D1Database
    const checkouts = await listCheckouts(db)
    return NextResponse.json({ checkouts })
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

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