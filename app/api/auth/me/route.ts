import { NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"
import { getUserById } from "@/lib/auth-store"

const JWT_SECRET = "wolfitpark-secret-key-2026"

interface JwtPayload {
  userId: string
  role: string
}

export async function GET(request: NextRequest) {
  try {
    const cookieHeader = request.headers.get("cookie")
    if (!cookieHeader) {
      return NextResponse.json({ user: null })
    }

    const tokenMatch = cookieHeader.match(/(?:^|;\s*)token=([^;]+)/)
    const token = tokenMatch ? tokenMatch[1] : null
    if (!token) {
      return NextResponse.json({ user: null })
    }

    let decoded: JwtPayload
    try {
      decoded = jwt.verify(token, JWT_SECRET) as JwtPayload
    } catch {
      return NextResponse.json({ user: null })
    }

    const user = getUserById(decoded.userId)
    if (!user) {
      return NextResponse.json({ user: null })
    }

    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    })
  } catch {
    return NextResponse.json({ user: null })
  }
}