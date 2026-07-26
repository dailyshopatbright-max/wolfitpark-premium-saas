"use server"

import { z } from "zod"
import { sendSubmission } from "@/lib/email"

export type FormState = { status: "idle"|"success"|"error"; message: string }
const email = z.string().trim().email().max(200)
const text = z.string().trim().min(2).max(3000)

function raw(formData: FormData, key: string) { return String(formData.get(key) ?? "") }
function spamCheck(formData: FormData) { return raw(formData,"companyWebsite").length === 0 }

export async function submitContact(_: FormState, formData: FormData): Promise<FormState> {
  if(!spamCheck(formData)) return {status:"success",message:"Thank you. We will be in touch."}
  const parsed = z.object({Name:text.max(120),Email:email,Company:z.string().trim().max(160),Subject:text.max(180),Message:text}).safeParse({Name:raw(formData,"name"),Email:raw(formData,"email"),Company:raw(formData,"company"),Subject:raw(formData,"subject"),Message:raw(formData,"message")})
  if(!parsed.success) return {status:"error",message:"Please check the required fields and try again."}
  try { await sendSubmission("New contact request",parsed.data); return {status:"success",message:"Message received. Our team will respond within one business day."} } catch { return {status:"error",message:"We could not send your message. Please email support@wolfitpark.online."} }
}
export async function submitConsultation(_: FormState, formData: FormData): Promise<FormState> {
  if(!spamCheck(formData)) return {status:"success",message:"Thank you. We will be in touch."}
  const parsed = z.object({Name:text.max(120),Email:email,Company:text.max(160),Interest:text.max(180),Budget:text.max(120),Timeline:text.max(120),Goals:text}).safeParse({Name:raw(formData,"name"),Email:raw(formData,"email"),Company:raw(formData,"company"),Interest:raw(formData,"interest"),Budget:raw(formData,"budget"),Timeline:raw(formData,"timeline"),Goals:raw(formData,"message")})
  if(!parsed.success) return {status:"error",message:"Please complete each required field."}
  try { await sendSubmission("New consultation request",parsed.data); return {status:"success",message:"Your consultation request is in. We will follow up shortly."} } catch { return {status:"error",message:"We could not send your request. Please email support@wolfitpark.online."} }
}
export async function submitCareer(_: FormState, formData: FormData): Promise<FormState> {
  if(!spamCheck(formData)) return {status:"success",message:"Application received."}
  const parsed = z.object({Name:text.max(120),Email:email,Role:text.max(180),LinkedIn:z.string().trim().url().max(500),Portfolio:z.string().trim().max(500),Note:text}).safeParse({Name:raw(formData,"name"),Email:raw(formData,"email"),Role:raw(formData,"role"),LinkedIn:raw(formData,"linkedin"),Portfolio:raw(formData,"portfolio"),Note:raw(formData,"message")})
  if(!parsed.success) return {status:"error",message:"Please provide your details and a valid LinkedIn URL."}
  try { await sendSubmission("New career application",parsed.data); return {status:"success",message:"Application received. We will review it carefully and contact selected candidates."} } catch { return {status:"error",message:"We could not send your application. Please email support@wolfitpark.online."} }
}
export async function submitNewsletter(_: FormState, formData: FormData): Promise<FormState> {
  if(!spamCheck(formData)) return {status:"success",message:"You are subscribed."}
  const parsed = z.object({Email:email}).safeParse({Email:raw(formData,"email")})
  if(!parsed.success) return {status:"error",message:"Enter a valid email address."}
  try { await sendSubmission("Newsletter subscription",parsed.data); return {status:"success",message:"You are on the list. Watch your inbox."} } catch { return {status:"error",message:"Subscription failed. Please try again later."} }
}
