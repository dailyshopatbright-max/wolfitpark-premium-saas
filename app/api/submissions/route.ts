import { NextRequest, NextResponse } from "next/server"
import { getCloudflareContext } from "@opennextjs/cloudflare"
import { createSubmission } from "@/lib/submissions-store"

export async function POST(request: NextRequest) {
  try {
    const db = (await getCloudflareContext()).env.DB as D1Database
    const body = await request.json()
    const { type, data } = body as { type: string; data: Record<string, string> }
    if (!type || !data) return NextResponse.json({ error: "Invalid submission" }, { status: 400 })
    await createSubmission(db, { id: Date.now().toString(), type, data: JSON.stringify(data), createdAt: new Date().toISOString() })
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: "Failed to save" }, { status: 500 })
  }
}
