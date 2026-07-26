import { NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { getUserByEmail } from "@/lib/auth-store"

const JWT_SECRET = "wolfitpark-secret-key-2026"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password } = body as { email?: string; password?: string }

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 })
    }

    const user = getUserByEmail(email.toLowerCase().trim())
    if (!user) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 })
    }

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash)
    if (!isPasswordValid) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 })
    }

    const token = jwt.sign(
      { userId: user.id, role: user.role },
      JWT_SECRET,
      { expiresIn: "24h" }
    )

    const isProd = process.env.NODE_ENV === "production"

    const response = NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    })

    response.headers.set(
      "Set-Cookie",
      `token=${token}; HttpOnly; Path=/; ${isProd ? "Secure; " : ""}SameSite=Lax; Max-Age=86400`
    )

    return response
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}