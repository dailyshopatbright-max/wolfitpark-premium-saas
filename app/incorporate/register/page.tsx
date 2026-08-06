"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ArrowRight, ArrowLeft, CheckCircle2, Building2, CreditCard, Wallet, Banknote } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CardLogos } from "@/components/card-logos"
import { useAuth } from "@/components/auth-provider"

const entityTypes = [
  { value: "LLC", label: "LLC", description: "Limited Liability Company — flexible, popular for small businesses" },
  { value: "C-Corp", label: "C-Corporation", description: "Separate tax entity, ideal for venture-backed startups" },
  { value: "S-Corp", label: "S-Corporation", description: "Pass-through taxation, suitable for US-resident founders" },
  { value: "Nonprofit", label: "Nonprofit", description: "Tax-exempt organization for charitable, educational purposes" },
]

const allStates = [
  "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware",
  "District of Columbia", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa",
  "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota",
  "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey",
  "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon",
  "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah",
  "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming",
]

const stateFees: Record<string, number> = {
  "Alabama": 150, "Alaska": 250, "Arizona": 50, "Arkansas": 45, "California": 70, "Colorado": 50,
  "Connecticut": 120, "Delaware": 90, "District of Columbia": 99, "Florida": 125, "Georgia": 100,
  "Hawaii": 50, "Idaho": 100, "Illinois": 150, "Indiana": 90, "Iowa": 50, "Kansas": 160,
  "Kentucky": 40, "Louisiana": 100, "Maine": 175, "Maryland": 100, "Massachusetts": 500,
  "Michigan": 50, "Minnesota": 135, "Mississippi": 50, "Missouri": 50, "Montana": 70,
  "Nebraska": 60, "Nevada": 425, "New Hampshire": 100, "New Jersey": 125, "New Mexico": 50,
  "New York": 200, "North Carolina": 125, "North Dakota": 135, "Ohio": 99, "Oklahoma": 100,
  "Oregon": 100, "Pennsylvania": 125, "Rhode Island": 150, "South Carolina": 110, "South Dakota": 150,
  "Tennessee": 300, "Texas": 300, "Utah": 70, "Vermont": 125, "Virginia": 100, "Washington": 180,
  "West Virginia": 50, "Wisconsin": 130, "Wyoming": 100,
}

const agentOptions = [
  { value: "wolfitpark", label: "Wolfitpark Registered Agent", description: "$100/year — professional registered agent service included with our formation package" },
  { value: "doola", label: "Doola Agent Service", description: "Third-party agent via Doola partnership" },
  { value: "atlas", label: "Stripe Atlas Agent", description: "Third-party agent via Atlas partnership" },
]

const PAYMENT_METHODS = [
  { id: "card", label: "Credit / Debit Card", icon: CreditCard, desc: "Visa, Mastercard, Amex, Discover" },
  { id: "crypto", label: "Cryptocurrency", icon: Wallet, desc: "Bitcoin, Ethereum, USDC, USDT" },
  { id: "ach", label: "ACH Bank Transfer", icon: Banknote, desc: "Direct bank transfer (USD)" },
]

const FORMATION_FEE = 249
const AGENT_FEE = 100
const MAIL_FEE = 50
const BOI_FEE = 40
const EIN_FEE_US = 40
const EIN_FEE_NON_US = 100
const ITIN_FEE = 300

export default function IncorporateRegisterPage() {
  const router = useRouter()
  const { user, loading: authLoading } = useAuth()
  const [step, setStep] = useState(0)
  const [submitting, setSubmitting] = useState(false)
  const [done, setDone] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState("card")
  const [form, setForm] = useState({
    phone: "", companyName: "", entityType: "", filingState: "", registeredAgent: "wolfitpark",
    einNeeded: true, boirNeeded: false, mailForwarding: false, itinNeeded: false, address: "", usCitizen: false,
  })

  useEffect(() => {
    if (!authLoading && !user) router.push("/login")
  }, [user, authLoading, router])

  function update(field: string, value: any) {
    setForm((f) => ({ ...f, [field]: value }))
  }

  const stateFee = form.filingState ? stateFees[form.filingState] || 0 : 0

  const einFee = form.einNeeded ? (form.usCitizen ? EIN_FEE_US : EIN_FEE_NON_US) : 0

  const totals = [
    { label: "Formation Service", amount: FORMATION_FEE },
    { label: "State Filing Fee", amount: stateFee },
  ]
  if (form.registeredAgent === "wolfitpark") totals.push({ label: "Registered Agent (1 year)", amount: AGENT_FEE })
  if (form.einNeeded) totals.push({ label: `EIN Application (${form.usCitizen ? "US" : "Non-US"})`, amount: einFee })
  if (form.mailForwarding) totals.push({ label: "Mail Forwarding & Business Address (1 year)", amount: MAIL_FEE })
  if (form.boirNeeded) totals.push({ label: "BOI Report Filing", amount: BOI_FEE })
  if (form.itinNeeded) totals.push({ label: "ITIN Application (3-8 months)", amount: ITIN_FEE })

  const totalAmount = totals.reduce((sum, item) => sum + item.amount, 0)

  async function handleSubmit() {
    setSubmitting(true)
    const res = await fetch("/api/registrations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, paymentMethod, totalAmount }),
    })
    const data = await res.json()
    setSubmitting(false)
    if (!data.success) {
      alert(data.error || "Submission failed.")
      return
    }
    if (paymentMethod === "card" || paymentMethod === "ach") {
      const invoice = data.registration?.id || `REG-${Date.now()}`
      const qs = new URLSearchParams({
        amount: String(totalAmount),
        invoice,
        project: `${form.companyName} — Company Formation`,
        description: `Incorporation of ${form.companyName} (${form.filingState}) including services and add-ons selected at registration.`,
      })
      router.push(`/checkout?${qs.toString()}`)
      return
    }
    setDone(true)
  }

  const steps = ["Business Info", "Entity & State", "Services", "Review & Payment"]
  const canNext = () => {
    if (step === 0) return form.companyName.trim().length > 0 && form.phone.trim().length > 0 && form.address.trim().length > 0
    if (step === 1) return form.entityType && form.filingState
    if (step === 2) return form.registeredAgent
    return true
  }

  if (done) {
    return (
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4">
        <div className="max-w-lg text-center">
          <div className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-emerald-400/10">
            <CheckCircle2 className="size-8 text-emerald-400" />
          </div>
          <h1 className="mt-6 text-2xl font-semibold">Registration Submitted!</h1>
          <p className="mt-3 text-muted-foreground">
            Your {form.companyName} incorporation has been submitted. Our team will review and begin processing.
            Check your dashboard for status updates.
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            {paymentMethod === "crypto" && "Please send the crypto payment to the wallet address provided in your confirmation email."}
            {paymentMethod !== "crypto" && "You will be redirected to our secure payment page to complete your payment via card or ACH eCheck."}
          </p>
          <Button className="mt-6" onClick={() => router.push("/dashboard")}>Go to Dashboard <ArrowRight data-icon="inline-end" /></Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] py-8 px-4">
      <div className="mx-auto max-w-2xl">
        <div className="mb-8">
          <Badge variant="outline" className="rounded-full">Company Formation</Badge>
          <h1 className="mt-4 text-3xl font-semibold">Register Your US Company</h1>
          <p className="mt-2 text-sm text-muted-foreground">We handle the filings with the state, EIN application, and compliance setup.</p>
        </div>

        <div className="mb-8 flex items-center gap-2">
          {steps.map((s, i) => (
            <div key={s} className="flex items-center gap-2 flex-1">
              <div className={`flex size-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${i < step ? "bg-primary text-primary-foreground" : i === step ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
                {i < step ? <CheckCircle2 className="size-4" /> : i + 1}
              </div>
              <span className="hidden text-xs font-medium sm:inline">{s}</span>
              {i < steps.length - 1 && <div className="h-0.5 flex-1 bg-border" />}
            </div>
          ))}
        </div>

        <div className="rounded-3xl border border-border bg-card p-6 sm:p-8">
          {step === 0 && (
            <div className="flex flex-col gap-5">
              <div>
                <label className="mb-1.5 block text-sm font-medium">Business Phone</label>
                <input value={form.phone} onChange={(e) => update("phone", e.target.value)} className="w-full rounded-xl border border-border bg-background py-2.5 px-4 text-sm outline-none focus:border-primary/50" placeholder="+1 (555) 000-0000" />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium">Company Name</label>
                <input value={form.companyName} onChange={(e) => update("companyName", e.target.value)} className="w-full rounded-xl border border-border bg-background py-2.5 px-4 text-sm outline-none focus:border-primary/50" placeholder="Acme Inc." />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium">Business Address</label>
                <textarea value={form.address} onChange={(e) => update("address", e.target.value)} className="w-full rounded-xl border border-border bg-background py-2.5 px-4 text-sm outline-none focus:border-primary/50" placeholder="123 Main St, City, State, ZIP" rows={2} />
              </div>
              <label className="flex items-center gap-3 rounded-xl border border-border p-4 cursor-pointer">
                <input type="checkbox" checked={form.usCitizen} onChange={(e) => update("usCitizen", e.target.checked)} className="size-4" />
                <span className="text-sm">I am a US citizen or permanent resident</span>
              </label>
            </div>
          )}

          {step === 1 && (
            <div className="flex flex-col gap-5">
              <div>
                <label className="mb-2 block text-sm font-medium">Entity Type</label>
                <div className="grid gap-2">
                  {entityTypes.map((et) => (
                    <button key={et.value} onClick={() => update("entityType", et.value)} className={`rounded-xl border p-4 text-left transition-all ${form.entityType === et.value ? "border-primary bg-primary/5" : "border-border hover:border-primary/20"}`}>
                      <p className="font-semibold">{et.label}</p>
                      <p className="text-xs text-muted-foreground mt-1">{et.description}</p>
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label className="text-sm font-medium">Filing State</label>
                  <span className="text-xs text-muted-foreground">Filing fees are set by each state</span>
                </div>
                <div className="grid gap-2 max-h-80 overflow-y-auto pr-1">
                  {allStates.map((s) => {
                    const fee = stateFees[s] || 0
                    return (
                      <button key={s} onClick={() => update("filingState", s)} className={`flex items-center justify-between rounded-xl border p-3 text-sm transition-all ${form.filingState === s ? "border-primary bg-primary/5 text-primary" : "border-border hover:border-primary/40"}`}>
                        <span className="font-medium">{s}</span>
                        <span className="text-xs text-muted-foreground">${fee} filing fee</span>
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="flex flex-col gap-5">
              <div>
                <label className="mb-2 block text-sm font-medium">Registered Agent</label>
                <div className="grid gap-2">
                  {agentOptions.map((a) => (
                    <button key={a.value} onClick={() => update("registeredAgent", a.value)} className={`rounded-xl border p-4 text-left transition-all ${form.registeredAgent === a.value ? "border-primary bg-primary/5" : "border-border hover:border-primary/40"}`}>
                      <p className="font-semibold">{a.label}</p>
                      <p className="text-xs text-muted-foreground mt-1">{a.description}</p>
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium">Additional Services</label>
                <div className="grid gap-3">
                  <label className={`flex items-start gap-3 rounded-xl border p-4 cursor-pointer ${form.einNeeded ? "border-primary/30 bg-primary/5" : "border-border"}`}>
                    <input type="checkbox" checked={form.einNeeded} onChange={(e) => update("einNeeded", e.target.checked)} className="mt-0.5 size-4" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">EIN (Employer Identification Number)</p>
                      <p className="text-xs text-muted-foreground">Required by IRS for US businesses. We handle the application. {form.usCitizen ? "$40 for US citizens" : "$100 for non-US citizens"}</p>
                    </div>
                    <span className="text-xs font-medium text-muted-foreground">{form.usCitizen ? "$40" : "$100"}</span>
                  </label>
                  <label className={`flex items-start gap-3 rounded-xl border p-4 cursor-pointer ${form.mailForwarding ? "border-primary/30 bg-primary/5" : "border-border"}`}>
                    <input type="checkbox" checked={form.mailForwarding} onChange={(e) => update("mailForwarding", e.target.checked)} className="mt-0.5 size-4" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">Mail Forwarding & Business Address</p>
                      <p className="text-xs text-muted-foreground">Prestigious US business address with mail scanning, forwarding, and document handling for one year.</p>
                    </div>
                    <span className="text-xs font-medium text-muted-foreground">$50/yr</span>
                  </label>
                  <label className={`flex items-start gap-3 rounded-xl border p-4 cursor-pointer ${form.boirNeeded ? "border-primary/30 bg-primary/5" : "border-border"}`}>
                    <input type="checkbox" checked={form.boirNeeded} onChange={(e) => update("boirNeeded", e.target.checked)} className="mt-0.5 size-4" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">BOI Report (Beneficial Ownership Information)</p>
                      <p className="text-xs text-muted-foreground">Required by FinCEN. Must be filed within 90 days of formation. Includes $40 processing fee.</p>
                    </div>
                    <span className="text-xs font-medium text-muted-foreground">$40</span>
                  </label>
                  <label className={`flex items-start gap-3 rounded-xl border p-4 cursor-pointer ${form.itinNeeded ? "border-primary/30 bg-primary/5" : "border-border"}`}>
                    <input type="checkbox" checked={form.itinNeeded} onChange={(e) => update("itinNeeded", e.target.checked)} className="mt-0.5 size-4" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">ITIN (Individual Taxpayer Identification Number)</p>
                      <p className="text-xs text-muted-foreground">For non-US residents who need to file US taxes. Processing takes 3-8 months. $300 fee.</p>
                    </div>
                    <span className="text-xs font-medium text-muted-foreground">$300</span>
                  </label>
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="flex flex-col gap-5">
              <h3 className="text-lg font-semibold">Review Your Registration</h3>
              <div className="grid gap-3 rounded-xl border border-border bg-muted/30 p-5 text-sm">
                {[["Company", form.companyName], ["Phone", form.phone], ["Address", form.address], ["Entity", entityTypes.find((e) => e.value === form.entityType)?.label || form.entityType], ["State", form.filingState], ["Agent", agentOptions.find((a) => a.value === form.registeredAgent)?.label], ["EIN", form.einNeeded ? `Yes (${form.usCitizen ? "$40" : "$100"})` : "No"], ["BOI Report", form.boirNeeded ? "Yes ($40)" : "No"], ["ITIN", form.itinNeeded ? "Yes ($300)" : "No"], ["Mail Forwarding", form.mailForwarding ? "Yes ($50/yr)" : "No"], ["US Citizen", form.usCitizen ? "Yes" : "No"]].map(([l, v]) => (
                  <div key={l} className="flex justify-between"><span className="text-muted-foreground">{l}</span><span className="font-medium">{v}</span></div>
                ))}
              </div>

              <div className="rounded-xl border border-border bg-muted/30 p-5">
                <h4 className="mb-3 text-sm font-semibold">Price Breakdown</h4>
                <div className="grid gap-2 text-sm">
                  {totals.map((item) => (
                    <div key={item.label} className="flex justify-between">
                      <span className="text-muted-foreground">{item.label}</span>
                      <span className="font-medium">${item.amount}</span>
                    </div>
                  ))}
                  <div className="border-t border-border pt-2 mt-1">
                    <div className="flex justify-between text-base font-semibold">
                      <span>Total</span>
                      <span>${totalAmount}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <label className="mb-3 block text-sm font-medium">Payment Method</label>
                <div className="grid gap-2">
                  {PAYMENT_METHODS.map((pm) => (
                    <button key={pm.id} onClick={() => setPaymentMethod(pm.id)} className={`flex items-center gap-4 rounded-xl border p-4 text-left transition-all ${paymentMethod === pm.id ? "border-primary bg-primary/5" : "border-border hover:border-primary/40"}`}>
                      <pm.icon className="size-5 shrink-0 text-muted-foreground" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">{pm.label}</p>
                        <p className="text-xs text-muted-foreground">{pm.desc}</p>
                      </div>
                      <div className={`size-4 rounded-full border-2 ${paymentMethod === pm.id ? "border-primary bg-primary" : "border-muted-foreground"}`}>
                        {paymentMethod === pm.id && <div className="size-2 m-auto mt-0.5 rounded-full bg-white" />}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-col items-start gap-3 rounded-xl border border-border bg-card/60 p-4">
                <CardLogos size="sm" />
                <p className="text-xs text-muted-foreground">
                  Secure Transactions &middot; 256-bit SSL Encryption &middot; PCI DSS Compliant &middot; NACHA-compliant ACH
                </p>
              </div>

              <p className="text-xs text-muted-foreground">
                By submitting, you agree to our{" "}
                <a href="/terms" className="underline hover:text-foreground">Terms & Conditions</a>,{" "}
                <a href="/privacy" className="underline hover:text-foreground">Privacy Policy</a>, and{" "}
                <a href="/refund" className="underline hover:text-foreground">Refund Policy</a>.
                Your payment will be processed securely.
              </p>
            </div>
          )}
        </div>

        <div className="mt-6 flex justify-between">
          <Button variant="outline" onClick={() => setStep(step - 1)} disabled={step === 0 || submitting}>
            <ArrowLeft data-icon="inline-start" /> Back
          </Button>
          {step < 3 ? (
            <Button onClick={() => setStep(step + 1)} disabled={!canNext()}>
              Next <ArrowRight data-icon="inline-end" />
            </Button>
          ) : (
            <Button onClick={handleSubmit} disabled={submitting}>
              {submitting ? "Processing..." : `Pay $${totalAmount}`} <ArrowRight data-icon="inline-end" />
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
