import { NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"
import { updateRegistrationStatus } from "@/lib/auth-store"

const JWT_SECRET = "wolfitpark-secret-key-2026"

interface JwtPayload {
  userId: string
  role: string
}

type RegistrationStatus = "pending" | "review" | "approved" | "rejected"

function getTokenFromCookies(request: NextRequest): string | null {
  const cookieHeader = request.headers.get("cookie")
  if (!cookieHeader) return null
  const match = cookieHeader.match(/(?:^|;\s*)token=([^;]+)/)
  return match ? match[1] : null
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const token = getTokenFromCookies(request)
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    let payload: JwtPayload
    try {
      payload = jwt.verify(token, JWT_SECRET) as JwtPayload
    } catch {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    if (payload.role !== "admin") {
      return NextResponse.json({ error: "Forbidden: admin access required" }, { status: 403 })
    }

    const body = await request.json()
    const { status } = body as { status?: RegistrationStatus }
    const validStatuses: RegistrationStatus[] = ["pending", "review", "approved", "rejected"]

    if (!status || !validStatuses.includes(status)) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 })
    }

    const { id } = await params
    updateRegistrationStatus(id, status)

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}