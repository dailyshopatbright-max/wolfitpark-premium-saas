import { NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"
import { getCloudflareContext } from "@opennextjs/cloudflare"
import { getUserById, getRegistrations, getRegistrationsByUser, createRegistration } from "@/lib/auth-store"

const JWT_SECRET = "wolfitpark-secret-key-2026"

interface JwtPayload {
  userId: string
  role: string
}

function getTokenFromCookies(request: NextRequest): string | null {
  const cookieHeader = request.headers.get("cookie")
  if (!cookieHeader) return null
  const match = cookieHeader.match(/(?:^|;\s*)token=([^;]+)/)
  return match ? match[1] : null
}

function verifyToken(token: string): JwtPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as JwtPayload
  } catch {
    return null
  }
}

export async function GET(request: NextRequest) {
  try {
    const db = (await getCloudflareContext()).env.DB as D1Database
    const token = getTokenFromCookies(request)
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const payload = verifyToken(token)
    if (!payload) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    if (payload.role === "admin") {
      const registrations = await getRegistrations(db)
      return NextResponse.json({ registrations })
    }

    const registrations = await getRegistrationsByUser(db, payload.userId)
    return NextResponse.json({ registrations })
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const db = (await getCloudflareContext()).env.DB as D1Database
    const token = getTokenFromCookies(request)
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const payload = verifyToken(token)
    if (!payload) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const user = await getUserById(db, payload.userId)
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    const body = await request.json()
    const {
      companyName,
      entityType,
      filingState,
      registeredAgent,
      einNeeded,
      boirNeeded,
      itinNeeded,
      mailForwarding,
      paymentMethod,
      totalAmount,
      phone,
      address,
      usCitizen,
    } = body as {
      companyName: string
      entityType: string
      filingState: string
      registeredAgent: string
      einNeeded: boolean
      boirNeeded: boolean
      itinNeeded: boolean
      mailForwarding: boolean
      paymentMethod: string
      totalAmount: number
      phone: string
      address: string
      usCitizen: boolean
    }

    if (!companyName || !entityType || !filingState || !registeredAgent) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const registration = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`,
      userId: user.id,
      userEmail: user.email,
      userName: user.name,
      companyName,
      entityType,
      filingState,
      registeredAgent,
      einNeeded: !!einNeeded,
      boirNeeded: !!boirNeeded,
      itinNeeded: !!itinNeeded,
      mailForwarding: !!mailForwarding,
      paymentMethod: paymentMethod || "card",
      totalAmount: totalAmount || 0,
      phone: phone || "",
      address: address || "",
      usCitizen: !!usCitizen,
      status: "pending" as const,
      createdAt: new Date().toISOString(),
    }

    await createRegistration(db, registration)

    return NextResponse.json({ success: true, registration })
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
