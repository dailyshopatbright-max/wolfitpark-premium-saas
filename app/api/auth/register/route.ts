import { NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { getCloudflareContext } from "@opennextjs/cloudflare"
import { getUserByEmail, createUser } from "@/lib/auth-store"

export async function POST(request: NextRequest) {
  try {
    const db = (await getCloudflareContext()).env.DB as D1Database
    const body = await request.json()
    const { name, email, password } = body as {
      name?: string
      email?: string
      password?: string
    }

    if (!name || typeof name !== "string" || !name.trim()) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 })
    }

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json({ error: "A valid email is required" }, { status: 400 })
    }

    if (!password || typeof password !== "string" || password.length < 6) {
      return NextResponse.json({ error: "Password must be at least 6 characters" }, { status: 400 })
    }

    const existingUser = await getUserByEmail(db, email.toLowerCase().trim())
    if (existingUser) {
      return NextResponse.json({ error: "User with this email already exists" }, { status: 409 })
    }

    const passwordHash = await bcrypt.hash(password, 10)

    const user = {
      id: Date.now().toString(),
      email: email.toLowerCase().trim(),
      passwordHash,
      name: name.trim(),
      role: "user" as const,
      createdAt: new Date().toISOString(),
    }

    await createUser(db, user)

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    })
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
