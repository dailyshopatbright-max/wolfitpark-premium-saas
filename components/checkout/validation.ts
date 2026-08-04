import * as z from "zod"

export type PaymentMethod = "ach" | "card"
export type AccountType = "checking" | "savings" | "business-checking" | "business-savings"
export type CardBrand = "visa" | "mastercard" | "amex" | "discover" | "unknown"

export const ACCOUNT_TYPES: { value: AccountType; label: string }[] = [
  { value: "checking", label: "Checking" },
  { value: "savings", label: "Savings" },
  { value: "business-checking", label: "Business Checking" },
  { value: "business-savings", label: "Business Savings" },
]

export function luhnCheck(value: string): boolean {
  const digits = value.replace(/\D/g, "")
  if (digits.length < 13 || digits.length > 19) return false
  let sum = 0
  let alt = false
  for (let i = digits.length - 1; i >= 0; i--) {
    let n = parseInt(digits[i], 10)
    if (alt) {
      n *= 2
      if (n > 9) n -= 9
    }
    sum += n
    alt = !alt
  }
  return sum % 10 === 0
}

export function detectCardBrand(number: string): CardBrand {
  const d = number.replace(/\D/g, "")
  if (/^4/.test(d)) return "visa"
  if (/^5[1-5]/.test(d) || /^2[2-7]/.test(d)) return "mastercard"
  if (/^3[47]/.test(d)) return "amex"
  if (/^6(011|5)/.test(d) || /^64[4-9]/.test(d) || /^65/.test(d)) return "discover"
  return "unknown"
}

export function routingNumberValid(routing: string): boolean {
  const d = routing.replace(/\D/g, "")
  if (!/^\d{9}$/.test(d)) return false
  const sum =
    3 * (parseInt(d[0], 10) + parseInt(d[3], 10) + parseInt(d[6], 10)) +
    7 * (parseInt(d[1], 10) + parseInt(d[4], 10) + parseInt(d[7], 10)) +
    (parseInt(d[2], 10) + parseInt(d[5], 10) + parseInt(d[8], 10))
  return sum % 10 === 0
}

export function formatCardNumber(value: string): string {
  const d = value.replace(/\D/g, "").slice(0, 16)
  const brand = detectCardBrand(d)
  const group = brand === "amex" ? [4, 6, 5] : [4, 4, 4, 4]
  let out = ""
  let i = 0
  for (const g of group) {
    if (d.length <= i) break
    out += (out ? " " : "") + d.slice(i, i + g)
    i += g
  }
  return out
}

export function formatExpiry(value: string): string {
  const d = value.replace(/\D/g, "").slice(0, 4)
  if (d.length <= 2) return d
  return `${d.slice(0, 2)}/${d.slice(2)}`
}

export function expiryValid(expiry: string): boolean {
  const m = expiry.match(/^(\d{2})\/(\d{2})$/)
  if (!m) return false
  const month = parseInt(m[1], 10)
  const year = 2000 + parseInt(m[2], 10)
  if (month < 1 || month > 12) return false
  const now = new Date()
  const end = new Date(year, month, 0, 23, 59, 59)
  return end >= now
}

export function cvvValid(cvv: string, brand: CardBrand): boolean {
  const d = cvv.replace(/\D/g, "")
  const len = brand === "amex" ? 4 : 3
  return new RegExp(`^\\d{${len}}$`).test(d)
}

export function phoneValid(phone: string): boolean {
  const d = phone.replace(/\D/g, "")
  return d.length >= 10 && d.length <= 15
}

export function accountNumberValid(account: string): boolean {
  const d = account.replace(/\D/g, "")
  return d.length >= 4 && d.length <= 17
}

export const ACH_SCHEMA = z
  .object({
    customerName: z.string().min(2, "Enter your full name"),
    companyName: z.string().optional(),
    email: z.string().email("Enter a valid email address"),
    phone: z.string().refine(phoneValid, "Enter a valid phone number"),
    country: z.string().min(2, "Country is required"),
    state: z.string().min(2, "State is required"),
    city: z.string().min(2, "City is required"),
    zip: z.string().min(3, "Enter a valid ZIP code"),
    routingNumber: z
      .string()
      .refine(routingNumberValid, "Enter a valid 9-digit routing number"),
    accountNumber: z.string().refine(accountNumberValid, "Enter a valid account number"),
    confirmAccountNumber: z.string(),
    accountType: z.enum(["checking", "savings", "business-checking", "business-savings"]),
    bankName: z.string().optional(),
    invoiceNumber: z.string().min(1, "Invoice number is required"),
    amount: z.string().refine((v) => parseFloat(v) > 0, "Enter a valid amount"),
    memo: z.string().optional(),
    referenceNumber: z.string().optional(),
    poUpload: z.string().optional(),
  })
  .refine((data) => data.accountNumber === data.confirmAccountNumber, {
    path: ["confirmAccountNumber"],
    message: "Account numbers do not match",
  })

export const CARD_SCHEMA = z.object({
  cardholderName: z.string().min(2, "Enter the cardholder name"),
  cardNumber: z
    .string()
    .transform((v) => v.replace(/\s/g, ""))
    .refine((v) => luhnCheck(v), "Enter a valid card number"),
  expiry: z.string().refine(expiryValid, "Card is expired or invalid"),
  cvv: z
    .string()
    .refine((v) => /^\d{3,4}$/.test(v), "Invalid CVV"),
  zip: z.string().min(3, "Enter a valid ZIP code"),
  country: z.string().min(2, "Country is required"),
  billingAddress: z.string().min(5, "Enter your billing address"),
  email: z.string().email("Enter a valid email address"),
  phone: z.string().refine(phoneValid, "Enter a valid phone number"),
  saveCard: z.boolean().optional(),
})

export type ACHInput = z.input<typeof ACH_SCHEMA>
export type ACHOutput = z.infer<typeof ACH_SCHEMA>
export type CardInput = z.input<typeof CARD_SCHEMA>
export type CardOutput = z.infer<typeof CARD_SCHEMA>

export function maskAccount(account: string): string {
  const d = account.replace(/\D/g, "")
  if (d.length <= 4) return d
  return "•••• " + d.slice(-4)
}

export function formatMoney(value: number | string): string {
  const n = typeof value === "string" ? parseFloat(value) : value
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(Number.isFinite(n) ? n : 0)
}

export function todayStamp(): string {
  return new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

export function randomRef(prefix: string): string {
  const n = Math.random().toString(36).slice(2, 8).toUpperCase()
  return `${prefix}-${n}`
}
