import "server-only"
import { Resend } from "resend"

export async function sendSubmission(subject: string, fields: Record<string, string>) {
  const key = process.env.RESEND_API_KEY
  const from = process.env.RESEND_FROM_EMAIL
  const to = process.env.CONTACT_TO_EMAIL
  if (!key || !from || !to) throw new Error("Email delivery is not configured")
  const resend = new Resend(key)
  const safe = (value: string) => value.replace(/[<>&"']/g, char => ({"<":"&lt;",">":"&gt;","&":"&amp;","\"":"&quot;","'":"&#039;"}[char] ?? char))
  const rows = Object.entries(fields).map(([label,value])=>`<tr><td style="padding:8px;border-bottom:1px solid #e5e7eb;font-weight:600;vertical-align:top">${safe(label)}</td><td style="padding:8px;border-bottom:1px solid #e5e7eb">${safe(value)}</td></tr>`).join("")
  const { error } = await resend.emails.send({ from, to: [to], subject: `[Wolfitpark] ${subject}`, html: `<div style="font-family:Arial,sans-serif;color:#111827"><h2>${safe(subject)}</h2><table style="border-collapse:collapse;width:100%">${rows}</table></div>`, replyTo: fields.Email })
  if (error) throw new Error(error.message)
}
